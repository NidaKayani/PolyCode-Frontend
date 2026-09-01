import React, { useEffect, useState } from "react";

const CONFIDENCE_OPTIONS = [
  ["review", "😅 Need another read"],
  ["almost", "🙂 Getting it"],
  ["ready", "🚀 Ready for the challenge"],
];

/**
 * Mark-as-read gate, then confidence check + challenge CTA.
 * Used at the end of theory content across all courses.
 */
export default function LessonReadGate({
  markedAsRead = false,
  onMarkAsRead,
  confidence = "",
  onConfidenceChange,
  onGoChallenge,
  accentColor = "#818cf8",
  challengeLabel = "Ready? Try the coding challenge →",
  quizzesRequired = 0,
  quizzesAttempted = 0,
}) {
  const [quizGateError, setQuizGateError] = useState(false);
  const quizzesPending =
    quizzesRequired > 0 && quizzesAttempted < quizzesRequired;
  // Theory-only lessons don't pass a challenge navigator; hide the CTA and
  // adjust the copy so we never show a dead "try the challenge" button.
  const hasChallenge = typeof onGoChallenge === "function";

  useEffect(() => {
    if (!quizzesPending) setQuizGateError(false);
  }, [quizzesPending]);

  function handleMarkAsRead() {
    if (quizzesPending) {
      setQuizGateError(true);
      return;
    }
    setQuizGateError(false);
    onMarkAsRead?.();
  }

  if (!markedAsRead) {
    return (
      <div
        className="lesson-read-gate"
        style={{ "--lesson-accent": accentColor }}
      >
        <p className="lesson-read-gate-hint">
          {quizzesRequired > 0
            ? `Answer all ${quizzesRequired} quick checks above, then mark this lesson as read${hasChallenge ? " to unlock the challenge" : " to complete it"}.`
            : hasChallenge
              ? "Finished reading? Mark this lesson as read to unlock the challenge."
              : "Finished reading? Mark this lesson as read to complete it."}
        </p>
        {quizGateError ? (
          <p className="lesson-read-gate-error" role="alert">
            Solve the MCQs to go ahead.
          </p>
        ) : null}
        <button
          type="button"
          className="lesson-mark-read-btn"
          onClick={handleMarkAsRead}
        >
          Mark as read
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="lesson-confidence-panel">
        <h3>How do you feel about this lesson?</h3>
        <div className="lesson-confidence-options">
          {CONFIDENCE_OPTIONS.map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={confidence === value ? "active" : ""}
              onClick={() => onConfidenceChange(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {hasChallenge ? (
        <div className="lesson-read-actions">
          <button
            type="button"
            className="lesson-challenge-cta"
            style={{ "--lesson-accent": accentColor }}
            onClick={onGoChallenge}
          >
            {challengeLabel}
          </button>
        </div>
      ) : (
        <div className="lesson-read-actions">
          <p className="lesson-read-gate-hint lesson-read-gate-done">
            ✓ Lesson complete — use the arrows below to continue.
          </p>
        </div>
      )}
    </>
  );
}
