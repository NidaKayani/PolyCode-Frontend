// Messages written while offline wait here until they can be sent.
//
// Only the already-sealed payload is stored ({ to, forRecipient, forSender }),
// i.e. the exact ciphertext the server would hold anyway — never plaintext.
// The dock shows the text again by decrypting `forSender` with the user's own
// key. Each entry keeps its `clientMessageId`, which the backend uses to
// ignore duplicates, so retrying after a lost response can't double-send.

const PREFIX = "polycode_qc_outbox_";

function storageKey(userId) {
  return `${PREFIX}${userId}`;
}

export function readOutbox(userId) {
  if (!userId) return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey(userId)) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeOutbox(userId, entries) {
  try {
    if (entries.length) localStorage.setItem(storageKey(userId), JSON.stringify(entries));
    else localStorage.removeItem(storageKey(userId));
  } catch {
    // Storage full or blocked — the message still shows as pending this session.
  }
}

export function addToOutbox(userId, entry) {
  const entries = readOutbox(userId).filter((e) => e.clientMessageId !== entry.clientMessageId);
  writeOutbox(userId, [...entries, entry]);
}

export function removeFromOutbox(userId, clientMessageId) {
  writeOutbox(
    userId,
    readOutbox(userId).filter((e) => e.clientMessageId !== clientMessageId),
  );
}

export function newClientMessageId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `qc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}
