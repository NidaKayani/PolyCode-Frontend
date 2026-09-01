// PolyCode - C++ Data Structures full curriculum
// 9 chapters - 38 lessons - HYBRID: theory + quizzes on every lesson, plus an
// in-browser C++ challenge on the lessons where you implement the structure.
// YouTube links: edit cppDataStructuresVideoLinks.js (not this file).

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { CPP_DATA_STRUCTURES_VIDEO_LINKS } from "./cppDataStructuresVideoLinks";

const ACCENT = "#8b5cf6";
const C_AMBER = "#f59e0b";
const C_GREEN = "#22c55e";
const C_RED = "#ef4444";
const C_SKY = "#0ea5e9";
const C_PINK = "#ec4899";

function text(content, codeBlock = null) {
  if (codeBlock) {
    return { type: "text", content, code: { lang: "cpp", ...codeBlock } };
  }
  return { type: "text", content };
}

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

function objectives(items) {
  return { type: "objectives", items };
}

// Styled comparison table. `rows` is an array of ["Row label", cell, cell, ...].
function table(title, columns, rows, options = {}) {
  return {
    type: "table",
    title,
    columns,
    rows: rows.map((r) => ({ label: r[0], values: r.slice(1) })),
    showTotals: false,
    ...options,
  };
}

// Cell-grid visual. `rows` is an array of
// { label, values: [...], colLabels?: [...], okIndexes?: [...], missingIndexes?: [...] }.
function arrayViz(title, rows, footnote) {
  return { type: "array", title, rows, footnote };
}

const RAW_CPP_DATA_STRUCTURES_CHAPTERS = [
  {
    id: "complexity",
    title: "Complexity & the Machine Model",
    icon: "🧮",
    color: ACCENT,
    lessons: [
      {
        id: "cpp-ds-0-0",
        title: "Time and space: the two budgets",
        xp: 10,
        chapterTitle: "Complexity & the Machine Model",
        theory: [
          objectives([
            "Explain what time complexity and space complexity actually measure",
            "Read Big-O notation for the common growth classes",
            "Explain why we analyse growth instead of timing a single run",
          ]),
          text(
            "A **data structure** arranges data in memory so that the operations you care about - insert, search, delete, iterate - are cheap. \"Cheap\" has two budgets: **time** (how many steps an operation takes) and **space** (how much extra memory it needs). Almost every design decision in this course is a trade between the two.",
          ),
          text(
            "We measure **growth**, not seconds. **Big-O** is an upper bound on how the step count grows as the input size `n` grows, dropping constant factors and lower-order terms: `O(n^2 + 3n + 7)` becomes `O(n^2)`. That abstraction is what makes an analysis portable across machines and compilers.",
          ),
          text(
            "The classes you will meet again and again, fastest to slowest:\n\n- `O(1)` constant - a fixed number of steps, whatever `n` is\n- `O(log n)` logarithmic - halve the problem each step (binary search)\n- `O(n)` linear - one pass over the input\n- `O(n log n)` - the good comparison-sort bound\n- `O(n^2)` quadratic - every pair of elements\n- `O(2^n)` exponential - every subset; usable only for tiny `n`",
          ),
          diagram("Roughly how many steps at n = 1,000,000", [
            { id: "c1", label: "O(1)", color: C_GREEN, items: ["~1 step"] },
            { id: "clog", label: "O(log n)", color: C_GREEN, items: ["~20 steps"] },
            { id: "cn", label: "O(n)", color: C_AMBER, items: ["~1,000,000 steps"] },
            { id: "cnl", label: "O(n log n)", color: C_AMBER, items: ["~20,000,000 steps"] },
            { id: "cn2", label: "O(n^2)", color: C_RED, items: ["~1,000,000,000,000 steps"] },
          ]),
          text(
            "**Space complexity** counts memory used *beyond the input*. Reversing an array in place is `O(1)` extra; building a hash set of every element is `O(n)` extra. A faster algorithm often costs more memory - that trade is a running theme.",
          ),
          table(
            "Typical cost of core operations (average case)",
            ["Access by index", "Search", "Insert", "Delete", "Ordered?"],
            [
              ["Static array", "O(1)", "O(n)", "O(n)", "O(n)", "by index"],
              ["Dynamic array (vector)", "O(1)", "O(n)", "O(1)*", "O(n)", "by index"],
              ["Linked list", "O(n)", "O(n)", "O(1)@", "O(1)@", "insertion"],
              ["Hash table", "n/a", "O(1)", "O(1)", "O(1)", "no"],
              ["Balanced BST", "O(log n)", "O(log n)", "O(log n)", "O(log n)", "sorted"],
              ["Binary heap", "n/a", "O(n)", "O(log n)", "O(log n)", "min/max only"],
            ],
            { rowLabelHeader: "Structure", footnote: "* amortised, at the back.  @ once you already hold the position." },
          ),
          callout(
            "info",
            "Unless a problem says otherwise, quote the **worst case**. \"Average case\" and \"amortised\" are different, weaker promises - both covered later in this chapter.",
          ),
          quiz(
            "Simplify O(4n + n log n + 100).",
            ["O(n)", "O(n log n)", "O(4n)", "O(log n)"],
            1,
            "Keep the dominant term and drop constants: n log n grows faster than 4n, and +100 vanishes.",
          ),
        ],
      },
      {
        id: "cpp-ds-0-1",
        title: "Big-O by reading the loops",
        xp: 14,
        chapterTitle: "Complexity & the Machine Model",
        theory: [
          objectives([
            "Derive Big-O directly from control flow",
            "Combine sequential and nested loops correctly",
            "Solve the two recurrences behind binary search and merge sort",
          ]),
          text(
            "You can usually read complexity straight off the structure of the code:\n\n- one loop from `0` to `n` -> `O(n)`\n- two **nested** loops that both run to `n` -> `O(n^2)`\n- a loop that **halves** a range each step -> `O(log n)`\n- two loops **one after another** -> `O(n) + O(n) = O(n)` (add, then simplify)",
          ),
          text(
            "Function calls count. A loop that calls an `O(n)` helper on every iteration is `O(n^2)`. For recursion, solve the recurrence:\n\n- binary search: `T(n) = T(n/2) + O(1)` -> `O(log n)`\n- merge sort: `T(n) = 2T(n/2) + O(n)` -> `O(n log n)`",
            {
              label: "Each pattern in code",
              content: `for (int i = 0; i < n; i++) { /* O(1) */ }            // O(n)

for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++) { /* O(1) */ }        // O(n^2)

for (int k = n; k > 1; k /= 2) { /* O(1) */ }         // O(log n)`,
            },
          ),
          table(
            "How the work explodes as n grows",
            ["n = 10", "n = 100", "n = 1,000", "n = 1,000,000"],
            [
              ["O(1)", "1", "1", "1", "1"],
              ["O(log n)", "3", "7", "10", "20"],
              ["O(n)", "10", "100", "1,000", "1,000,000"],
              ["O(n log n)", "33", "664", "9,966", "~2e7"],
              ["O(n^2)", "100", "10,000", "1,000,000", "1e12"],
              ["O(2^n)", "1,024", "1e30", "off the chart", "off the chart"],
            ],
            { rowLabelHeader: "Class", highlightRows: [4, 5], footnote: "Anything at or below O(n log n) scales; O(n^2) is a warning sign past ~10,000 items; O(2^n) is only for tiny n." },
          ),
          callout(
            "tip",
            "The base of the logarithm never matters in Big-O - changing base only multiplies by a constant, and constants are dropped.",
          ),
          quiz(
            "The inner loop runs j from 0 to i, inside an outer loop i from 0 to n. Total work?",
            ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
            2,
            "0 + 1 + ... + (n-1) is about n^2/2 iterations, which is O(n^2).",
          ),
        ],
        challenge: {
          title: "Label the complexity",
          description:
            "Replace each `TODO` with the Big-O of that snippet: use exactly `O(n)`, `O(n^2)`, and `O(log n)`.",
          compileOptional: true,
          starterCode: `#include <iostream>
using namespace std;

int main() {
    int n = 16;

    for (int i = 0; i < n; i++) cout << i << " ";
    // Snippet 1 is TODO

    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cout << "*";
    // Snippet 2 is TODO

    for (int k = n; k > 1; k /= 2) cout << k << " ";
    // Snippet 3 is TODO

    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n = 16;

    for (int i = 0; i < n; i++) cout << i << " ";
    // Snippet 1 is O(n)

    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cout << "*";
    // Snippet 2 is O(n^2)

    for (int k = n; k > 1; k /= 2) cout << k << " ";
    // Snippet 3 is O(log n)

    return 0;
}`,
          tests: [
            { id: 1, label: "Single loop labelled O(n)", keywords: [{ pattern: "Snippet 1 is O\\(n\\)" }], hint: "One pass to n." },
            { id: 2, label: "Nested loop labelled O(n^2)", keywords: [{ pattern: "Snippet 2 is O\\(n\\^2\\)" }], hint: "Loop inside a loop." },
            { id: 3, label: "Halving loop labelled O(log n)", keywords: [{ pattern: "Snippet 3 is O\\(log n\\)" }], hint: "k /= 2 each step." },
          ],
        },
      },
      {
        id: "cpp-ds-0-2",
        title: "Inside one step: fetch, decode, execute, write-back",
        xp: 12,
        chapterTitle: "Complexity & the Machine Model",
        theory: [
          objectives([
            "Describe the four stages the CPU repeats for every machine instruction",
            "Explain how one line of C++ becomes many instructions and memory accesses",
            "Connect \"one operation\" in Big-O to real CPU work, and why constants still matter",
          ]),
          text(
            "When an analysis says an algorithm does \"`n` operations\", each operation is really the CPU grinding once through its basic loop - the **instruction cycle** - for every machine instruction.",
          ),
          diagram("The instruction cycle, repeated billions of times a second", [
            { id: "fetch", label: "1. Fetch", color: ACCENT, items: ["Read the next instruction", "from the address in the program counter (PC)", "PC advances"] },
            { id: "decode", label: "2. Decode", color: C_SKY, items: ["Control unit works out what it means", "which operation, which registers/operands"] },
            { id: "exec", label: "3. Execute", color: C_AMBER, items: ["The ALU does the work", "add, compare, shift, address calculation"] },
            { id: "write", label: "4. Write-back", color: C_GREEN, items: ["Store the result into a register", "or out to cache / memory", "update flags & PC, then repeat"] },
          ]),
          text(
            "A single line like `sum += arr[i];` is *not* one step for the CPU. Roughly: compute the address of `arr[i]`, load that value from memory into a register, add it to `sum`, write `sum` back. Several cycles - and if `arr[i]` is not in cache, the load alone can stall for hundreds of cycles.",
          ),
          text(
            "Big-O deliberately hides all of this: it collapses \"a few cycles\" and \"one cache miss\" into the same `O(1)`. That is exactly why two `O(n)` algorithms can differ 10x in wall-clock time - same number of steps, very different work per step.",
          ),
          callout(
            "info",
            "**Registers** are the tiny, instant storage the CPU computes in - a few dozen of them. Cache and RAM are progressively slower and must be loaded into a register before the ALU can touch a value. The **write-back** stage is where a result leaves a register for cache or RAM.",
          ),
          quiz(
            "Which stage of the instruction cycle stores the computed result back to a register or memory?",
            ["Fetch", "Decode", "Execute", "Write-back"],
            3,
            "Write-back (sometimes called store) commits the result and updates the PC/flags before the next fetch.",
          ),
          quiz(
            "Why can two O(n) algorithms have very different real running times?",
            [
              "Big-O is always wrong",
              "They do different constant work per step and touch memory differently",
              "One of them is secretly O(n^2)",
              "Compilers ignore Big-O",
            ],
            1,
            "Big-O drops constants and ignores cache behaviour; per-step cost and memory-access patterns still decide wall-clock time.",
          ),
        ],
      },
      {
        id: "cpp-ds-0-3",
        title: "Why the array wins: memory hierarchy and locality",
        xp: 12,
        chapterTitle: "Complexity & the Machine Model",
        theory: [
          objectives([
            "Explain why a cache miss is so expensive relative to an instruction",
            "Define spatial and temporal locality",
            "Explain why a contiguous array beats a linked list at the same Big-O",
          ]),
          text(
            "RAM is slow next to the CPU: a cache miss can cost 100-300 cycles - long enough to execute hundreds of instructions. To hide that, the CPU keeps recently used memory in small fast **caches** (L1/L2/L3) and always transfers memory a **cache line** at a time, typically 64 bytes (about 16 `int`s).",
          ),
          table(
            "The memory hierarchy (order-of-magnitude latency)",
            ["Rough latency", "Analogy: if L1 took 1 second"],
            [
              ["CPU register", "0 cycles", "instant"],
              ["L1 cache", "~4 cycles", "1 second"],
              ["L2 cache", "~12 cycles", "3 seconds"],
              ["L3 cache", "~40 cycles", "10 seconds"],
              ["Main memory (RAM)", "~200 cycles", "1 minute"],
              ["SSD", "~100,000 cycles", "7 hours"],
            ],
            { rowLabelHeader: "Level", highlightRows: [4], footnote: "Every level down is roughly 3-5x slower. Keeping the working set in cache is what \"fast\" really means." },
          ),
          text(
            "Two rules follow:\n\n- **Spatial locality** - after you touch one address, touching nearby addresses is nearly free (they arrived on the same cache line).\n- **Temporal locality** - after you touch an address, touching it again soon is nearly free (still cached).",
          ),
          arrayViz(
            "One 64-byte cache line pays for the next ~15 accesses",
            [
              {
                label: "cache line",
                values: ["a[0]", "a[1]", "a[2]", "a[3]", "a[4]", "a[5]", "a[6]", "a[7]", "a[8]", "a[9]", "a[10]", "a[11]", "a[12]", "a[13]", "a[14]", "a[15]"],
                colLabels: ["0", "4", "8", "12", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60"],
                okIndexes: [0],
              },
            ],
            "Reading a[0] (green) triggers one miss and loads all 16 ints; a[1]..a[15] are then free. A linked list would miss on every single node. Column labels are byte offsets within the line.",
          ),
          text(
            "This is why iterating a `std::vector<int>` front-to-back is far faster than walking a linked list of the same length, even though both are `O(n)`: the vector is one contiguous block (every cache line fully used, the hardware prefetcher running ahead), while list nodes are scattered across the heap - one cache miss per node, plus wasted bytes per line on the `next` pointer.",
          ),
          diagram("Same Big-O, different reality", [
            { id: "arr", label: "Array traversal", color: C_GREEN, items: ["1 cache line -> ~16 elements", "prefetcher predicts the pattern"] },
            { id: "list", label: "Linked-list traversal", color: C_RED, items: ["1 cache line -> 1 node", "pointer chasing defeats the prefetcher"] },
            { id: "gap", label: "Result", color: ACCENT, items: ["Identical O(n)", "5-10x wall-clock gap in practice"] },
          ]),
          callout(
            "warning",
            "Do not over-rotate on this. A linked list still wins when you need `O(1)` splice in the middle and rarely iterate. The point is to measure, not to assume Big-O tells the whole story.",
          ),
          quiz(
            "A cache line is about 64 bytes. Iterating a contiguous array of int (4 bytes each) brings in roughly how many elements per cache miss?",
            ["1", "4", "16", "64"],
            2,
            "64 / 4 = 16 ints per line, so one miss pays for the next ~15 accesses.",
          ),
        ],
      },
      {
        id: "cpp-ds-0-4",
        title: "Amortised cost and measuring for real",
        xp: 12,
        chapterTitle: "Complexity & the Machine Model",
        theory: [
          objectives([
            "Define amortised complexity and how it differs from worst case",
            "Explain why n doubling push_backs cost O(n) in total",
            "List the rules for a benchmark you can trust",
          ]),
          text(
            "Some operations are cheap almost always and occasionally expensive. `std::vector::push_back` is `O(1)` until capacity runs out; then it allocates a bigger block and moves every element - `O(n)` that one time. **Amortised analysis** spreads that rare cost over the many cheap operations.",
          ),
          text(
            "Because the vector **doubles**, growing from empty to `n` copies `1 + 2 + 4 + ... + n < 2n` elements *in total*. So `n` push_backs cost `O(n)` altogether, and each one is **amortised `O(1)`** - a promise about the whole sequence, not any single call.",
          ),
          text(
            "A real-time system that cannot tolerate the occasional `O(n)` spike will `reserve()` up front, or pick a structure with worst-case guarantees (a balanced tree, a deque of fixed chunks).",
          ),
          text(
            "When you benchmark, measure carefully:",
            {
              label: "Timing a block with <chrono>",
              content: `#include <chrono>
#include <iostream>
using namespace std;
using namespace std::chrono;

auto t0 = high_resolution_clock::now();
// ... work under test, enough iterations to dwarf timer noise ...
auto t1 = high_resolution_clock::now();
cout << duration_cast<microseconds>(t1 - t0).count() << " us\\n";`,
            },
          ),
          callout(
            "tip",
            "Warm up first, build with optimisations on, run enough iterations that the timer resolution is irrelevant, and be clear whether you care about **throughput** (average) or **worst-case latency** (the spike).",
          ),
          quiz(
            "n push_backs into an empty doubling vector cost how much in total?",
            ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
            0,
            "Total elements moved across all resizes is 1 + 2 + 4 + ... + n < 2n, so O(n) overall and O(1) amortised each.",
          ),
        ],
      },
    ],
  },
  {
    id: "linear-arrays",
    title: "Linear vs Non-Linear · Arrays & Lists",
    icon: "📏",
    color: C_SKY,
    lessons: [
      {
        id: "cpp-ds-1-0",
        title: "Linear vs non-linear: the map ahead",
        xp: 10,
        chapterTitle: "Linear vs Non-Linear · Arrays & Lists",
        theory: [
          objectives([
            "Define linear and non-linear data structures",
            "Place arrays, lists, stacks, queues, trees, heaps, hash tables and graphs on the map",
            "Distinguish an abstract data type from a concrete implementation",
          ]),
          text(
            "A **data structure** organises data; an **abstract data type (ADT)** is the *interface* - the operations and their guarantees - kept separate from how it is built. \"Stack\" is an ADT (`push` / `pop` / `top`, last-in-first-out). It can be *implemented* with an array or with linked nodes.",
          ),
          text(
            "Structures fall into two families, decided by how elements relate:\n\n- **Linear** - elements form one sequence; each has at most one predecessor and one successor. Arrays, linked lists, stacks, queues, deques. You traverse them one way.\n- **Non-linear** - an element can connect to many others; there is no single \"next\". Trees (one parent, many children), heaps, hash tables (buckets), graphs (any-to-any).",
          ),
          diagram("The two families", [
            { id: "lin", label: "Linear", color: C_SKY, items: ["Array", "Linked list (singly / doubly / circular)", "Stack", "Queue", "Deque"] },
            { id: "non", label: "Non-linear", color: ACCENT, items: ["Tree / BST / AVL", "Heap", "Hash table", "Graph"] },
          ]),
          text(
            "Linear structures are simple and cache-friendly. Non-linear structures buy sub-linear search (trees, hashing) or model real relationships (graphs), at the cost of more bookkeeping.",
          ),
          callout(
            "info",
            "\"Linear\" describes the *logical* structure, not the memory layout. A linked list is linear but not contiguous; a binary heap is non-linear but stored in a contiguous array.",
          ),
          quiz(
            "Which of these is a non-linear data structure?",
            ["Deque", "Circular linked list", "Binary search tree", "Stack"],
            2,
            "A BST node can have two children, so elements are not in a single sequence.",
          ),
        ],
      },
      {
        id: "cpp-ds-1-1",
        title: "The List ADT and the static array",
        xp: 14,
        chapterTitle: "Linear vs Non-Linear · Arrays & Lists",
        theory: [
          objectives([
            "State the operations of the List ADT",
            "Explain why array indexing is O(1)",
            "Give the cost of access, search, and middle insert/erase on an array",
          ]),
          text(
            "The **List ADT** is an ordered collection you can index into, insert into, and remove from. The **array** is its most basic implementation: a fixed-size, contiguous block. Element `i` lives at `base + i * sizeof(T)`, so indexing is one multiply-add - **`O(1)` random access**.",
          ),
          text(
            "Costs on a static array:\n\n- read / write by index: `O(1)`\n- search by value: `O(n)` unsorted, `O(log n)` if sorted (binary search)\n- insert or erase in the middle: `O(n)` - every later element shifts\n- append: `O(1)` *only if there is room* - and a raw array has no room, its size is fixed at creation",
            {
              label: "Fixed-size arrays in C++",
              content: `int raw[4] = {10, 20, 30, 40};   // C-style, decays to a pointer
cout << raw[2] << "\\n";           // 30, one address calculation

#include <array>
std::array<int, 4> a = {10, 20, 30, 40};  // knows its own size
cout << a.size() << "\\n";                  // 4`,
            },
          ),
          arrayViz(
            "Random access is address arithmetic, not a search",
            [
              {
                label: "value",
                values: ["10", "20", "30", "40", "23", "42"],
                colLabels: ["0", "1", "2", "3", "4", "5"],
                okIndexes: [3],
              },
              {
                label: "address",
                values: ["base", "+4", "+8", "+12", "+16", "+20"],
                colLabels: ["0", "1", "2", "3", "4", "5"],
                okIndexes: [3],
              },
            ],
            "a[3] lives at base + 3 * 4 bytes. One multiply-add gets you there - O(1), whatever the index. Column labels are the indices.",
          ),
          callout(
            "warning",
            "A raw array does not carry its length - `sizeof` tricks break as soon as it is passed to a function. Prefer `std::array<T, N>` (size in the type) or `std::vector<T>` (next lesson).",
          ),
          quiz(
            "Why is arr[i] O(1) no matter how large i is?",
            [
              "The CPU searches the array for index i",
              "The address is base + i * element_size, a single calculation",
              "Arrays are always small",
              "The compiler unrolls the access",
            ],
            1,
            "Contiguous layout turns an index into constant-time address arithmetic.",
          ),
        ],
        challenge: {
          title: "Array toolkit",
          description:
            "Implement `sumRange` (inclusive sum of a[lo..hi]) and `indexOf` (first index of target, or -1).",
          starterCode: `#include <iostream>
using namespace std;

int sumRange(const int* a, int lo, int hi) {
    // TODO: add a[lo] .. a[hi] inclusive
    return 0;
}

int indexOf(const int* a, int n, int target) {
    // TODO: return first i where a[i] == target, else -1
    return -1;
}

int main() {
    int a[] = {4, 8, 15, 16, 23, 42};
    cout << sumRange(a, 1, 3) << endl;   // 39
    cout << indexOf(a, 6, 23) << endl;   // 4
    cout << indexOf(a, 6, 99) << endl;   // -1
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int sumRange(const int* a, int lo, int hi) {
    int sum = 0;
    for (int i = lo; i <= hi; i++) sum += a[i];
    return sum;
}

int indexOf(const int* a, int n, int target) {
    for (int i = 0; i < n; i++)
        if (a[i] == target) return i;
    return -1;
}

int main() {
    int a[] = {4, 8, 15, 16, 23, 42};
    cout << sumRange(a, 1, 3) << endl;   // 39
    cout << indexOf(a, 6, 23) << endl;   // 4
    cout << indexOf(a, 6, 99) << endl;   // -1
    return 0;
}`,
          tests: [
            { id: 1, label: "sumRange accumulates in a loop", keywords: [{ pattern: "sum \\+=" }], hint: "for i from lo to hi, sum += a[i]." },
            { id: 2, label: "indexOf compares against target", keywords: [{ pattern: "== target" }], hint: "Return i on the first match." },
            { id: 3, label: "indexOf returns -1 when absent", keywords: [{ pattern: "return -1" }], hint: "Fall through the loop to -1." },
          ],
        },
      },
      {
        id: "cpp-ds-1-2",
        title: "Dynamic arrays: vector, ArrayList, amortised growth",
        xp: 16,
        chapterTitle: "Linear vs Non-Linear · Arrays & Lists",
        theory: [
          objectives([
            "Explain the size vs capacity split inside a dynamic array",
            "Trace what push_back does when capacity is full",
            "Explain why push_back is amortised O(1) but insert-middle is O(n)",
          ]),
          text(
            "A **dynamic array** - C++ `std::vector`, Java `ArrayList`, Python `list`, C# `List<T>` - wraps a raw array plus two numbers: **size** (elements in use) and **capacity** (slots allocated). `push_back` writes at index `size` and increments it - `O(1)` - until `size == capacity`. Then it allocates a larger block (usually 2x; MSVC uses 1.5x), moves the elements over, frees the old block, and continues. That resize is `O(n)`, but rare enough to be **amortised `O(1)`**.",
          ),
          text(
            "`insert` and `erase` in the middle stay `O(n)` - the tail still shifts. `pop_back` is `O(1)`. Iteration is contiguous and cache-friendly.",
            {
              label: "size, capacity, reserve",
              content: `#include <vector>
using namespace std;

vector<int> v;              // size 0, capacity 0
v.reserve(1000);            // capacity >= 1000, size still 0, no more reallocs
for (int i = 0; i < 1000; i++) v.push_back(i);   // all O(1), zero moves`,
            },
          ),
          diagram("push_back when the buffer is full", [
            { id: "room", label: "Has room", color: C_GREEN, items: ["write at data[size]", "size++", "O(1)"] },
            { id: "full", label: "size == capacity", color: C_AMBER, items: ["allocate ~2x", "move n elements", "free old block", "O(n) this once"] },
            { id: "amort", label: "Over n pushes", color: ACCENT, items: ["total moves < 2n", "amortised O(1) each"] },
          ]),
          arrayViz(
            "size is what you use; capacity is what you own",
            [
              {
                label: "buffer",
                values: ["7", "1", "9", "4", "2", "8", "5", "3", "6", "0", "-", "-", "-", "-", "-", "-"],
                colLabels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
                okIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                missingIndexes: [10, 11, 12, 13, 14, 15],
              },
            ],
            "size = 10 (green, live elements), capacity = 16 (green + grey spare slots). push_back writes into a grey slot in O(1); when the greys run out it allocates 32, moves the 16, and frees the old block.",
          ),
          callout(
            "tip",
            "If you know the final size, call `reserve(n)` once - it removes every reallocation and every element move.",
          ),
          quiz(
            "A vector has size 8 and capacity 8. You push_back one more element. What happens?",
            [
              "It fails - the vector is full",
              "It allocates ~16 slots, moves the 8 elements, then writes the 9th",
              "It shifts everything left by one",
              "It stores the element in a linked overflow list",
            ],
            1,
            "Full capacity triggers a grow-and-move; capacity roughly doubles.",
          ),
        ],
        challenge: {
          title: "Grow-your-own IntVector",
          description:
            "Finish `push_back`: when `size == capacity`, grow (start at 1, then double), copy, and free the old buffer.",
          starterCode: `#include <iostream>
using namespace std;

struct IntVector {
    int* data = nullptr;
    int size = 0;
    int capacity = 0;

    void push_back(int x) {
        // TODO: grow if full, then data[size++] = x;
    }
    int get(int i) { return data[i]; }
};

int main() {
    IntVector v;
    for (int i = 0; i < 10; i++) v.push_back(i * i);
    cout << v.size << " " << v.capacity << endl; // 10 16
    cout << v.get(9) << endl;                    // 81
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct IntVector {
    int* data = nullptr;
    int size = 0;
    int capacity = 0;

    void push_back(int x) {
        if (size == capacity) {
            int newCap = capacity == 0 ? 1 : capacity * 2;
            int* fresh = new int[newCap];
            for (int i = 0; i < size; i++) fresh[i] = data[i];
            delete[] data;
            data = fresh;
            capacity = newCap;
        }
        data[size++] = x;
    }
    int get(int i) { return data[i]; }
};

int main() {
    IntVector v;
    for (int i = 0; i < 10; i++) v.push_back(i * i);
    cout << v.size << " " << v.capacity << endl; // 10 16
    cout << v.get(9) << endl;                    // 81
    return 0;
}`,
          tests: [
            { id: 1, label: "Doubles the capacity", keywords: [{ pattern: "capacity \\* 2" }], hint: "newCap = capacity == 0 ? 1 : capacity * 2." },
            { id: 2, label: "Allocates a fresh buffer", keywords: [{ pattern: "new int\\[" }], hint: "new int[newCap]." },
            { id: 3, label: "Frees the old buffer", keywords: [{ pattern: "delete\\[\\] data" }], hint: "delete[] data before reassigning it." },
          ],
        },
      },
      {
        id: "cpp-ds-1-3",
        title: "Array or list? Choosing the backbone",
        xp: 10,
        chapterTitle: "Linear vs Non-Linear · Arrays & Lists",
        theory: [
          objectives([
            "Compare contiguous arrays and linked nodes across the core operations",
            "State a sensible default and when to deviate from it",
            "Explain where std::deque sits between the two",
          ]),
          text(
            "Almost every linear structure ahead is built on **a contiguous array** or **linked nodes**. That one choice drives every operation's cost.",
          ),
          text(
            "- index access: array `O(1)` / list `O(n)`\n- insert at front: array `O(n)` / list `O(1)`\n- insert/erase at a position you already hold: array `O(n)` / list `O(1)`\n- memory overhead: array ~0 / list 1-2 pointers per element\n- cache behaviour: array excellent / list poor\n- growth: array occasional realloc+move / list one allocation per node",
          ),
          table(
            "Contiguous array vs linked nodes",
            ["Dynamic array (vector)", "Linked list"],
            [
              ["Index access", "O(1)", "O(n)"],
              ["Insert / erase at front", "O(n)", "O(1)"],
              ["Insert / erase at a held position", "O(n)", "O(1)"],
              ["Memory overhead per element", "~0", "1-2 pointers"],
              ["Cache behaviour on a scan", "excellent", "poor"],
              ["Growth", "occasional realloc + move", "one alloc per node"],
            ],
            { rowLabelHeader: "Operation" },
          ),
          text(
            "Default to `std::vector` unless you have a specific reason not to - it wins on access, iteration, and memory. Choose a linked structure when you need `O(1)` splice or erase at a position you already hold and rarely random-access, or when you need pointers/iterators to stay valid across insertions elsewhere.",
          ),
          callout(
            "info",
            "`std::deque` is a hybrid - a sequence of fixed-size contiguous chunks - giving `O(1)` push/pop at *both* ends without moving or invalidating the middle.",
          ),
          quiz(
            "In which case does a linked list clearly beat a vector?",
            [
              "Summing every element",
              "Random access by index",
              "Repeatedly splicing nodes you already point to, with almost no iteration",
              "Binary search",
            ],
            2,
            "O(1) splice/erase at a held position is the linked list's real advantage; everything scan-heavy favours the vector.",
          ),
        ],
      },
    ],
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    icon: "🔗",
    color: C_GREEN,
    lessons: [
      {
        id: "cpp-ds-2-0",
        title: "Nodes, pointers, and \"dynamically linked\"",
        xp: 14,
        chapterTitle: "Linked Lists",
        theory: [
          objectives([
            "Define a node as data plus one or more links",
            "Allocate and free nodes on the heap with new / delete",
            "Explain why linked structures are called dynamic",
          ]),
          text(
            "A **node** is a small struct holding a value and one or more pointers to other nodes. Nodes are created on the **heap** at run time with `new` and released with `delete` - the list grows and shrinks one node at a time, with no big contiguous block and no resize. That per-node, run-time allocation is why linked structures are called **dynamic**.",
            {
              label: "A three-node chain by hand",
              content: `struct Node {
    int value;
    Node* next;
};

Node* head = new Node{10, nullptr};
head->next = new Node{20, nullptr};
head->next->next = new Node{30, nullptr};
// 10 -> 20 -> 30 -> nullptr`,
            },
          ),
          text(
            "The list *is* just a pointer to the first node - the **head**. `nullptr` marks the end. To free the list you walk it, saving `next` before you `delete` the current node.",
          ),
          diagram("Anatomy of a linked list", [
            { id: "head", label: "head pointer", color: ACCENT, items: ["points at the first node", "the whole list handle"] },
            { id: "node", label: "each node", color: C_GREEN, items: ["value + next pointer", "scattered on the heap"] },
            { id: "end", label: "last node", color: C_SKY, items: ["next == nullptr", "the terminator"] },
          ]),
          callout(
            "warning",
            "Every `new` needs a matching `delete`. Losing the only pointer to a node leaks it; deleting twice is undefined behaviour. In real code prefer `std::unique_ptr` or just `std::list`.",
          ),
          quiz(
            "What marks the end of a singly linked list?",
            ["A node whose value is 0", "The head pointer", "A node whose next is nullptr", "An empty string"],
            2,
            "Traversal stops when next is nullptr.",
          ),
        ],
        challenge: {
          title: "Build a chain",
          description:
            "Return the head of 1 -> 2 -> 3 from `buildChain`, and walk it in `sumChain`.",
          starterCode: `#include <iostream>
using namespace std;

struct Node { int value; Node* next; };

Node* buildChain() {
    // TODO: build 1 -> 2 -> 3 -> nullptr and return the head
    return nullptr;
}

int sumChain(Node* head) {
    // TODO: follow next from head, adding values
    return 0;
}

int main() {
    cout << sumChain(buildChain()) << endl; // 6
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct Node { int value; Node* next; };

Node* buildChain() {
    Node* head = new Node{1, nullptr};
    head->next = new Node{2, nullptr};
    head->next->next = new Node{3, nullptr};
    return head;
}

int sumChain(Node* head) {
    int total = 0;
    while (head != nullptr) {
        total += head->value;
        head = head->next;
    }
    return total;
}

int main() {
    cout << sumChain(buildChain()) << endl; // 6
    return 0;
}`,
          tests: [
            { id: 1, label: "Allocates nodes on the heap", keywords: [{ pattern: "new Node" }], hint: "new Node{value, nullptr}." },
            { id: 2, label: "Links nodes through next", keywords: [{ pattern: "->next" }], hint: "head->next = ..." },
            { id: 3, label: "Walks the chain in a loop", keywords: [{ pattern: "while" }], hint: "while (head != nullptr) advance head = head->next." },
          ],
        },
      },
      {
        id: "cpp-ds-2-1",
        title: "Singly linked list: the core operations",
        xp: 16,
        chapterTitle: "Linked Lists",
        theory: [
          objectives([
            "Implement push_front, traverse, search and erase on a singly linked list",
            "State the cost of each and why push_back needs a tail pointer to be O(1)",
            "Explain how a dummy head node removes edge cases",
          ]),
          text(
            "A **singly linked list** keeps a `head` pointer; each node points only forward.\n\n- **push_front(x)** - new node, its `next = head`, then `head = new node`. `O(1)`.\n- **push_back(x)** - walk to the last node, link it on. `O(n)` - or `O(1)` if you also keep a `tail` pointer.\n- **traverse / search** - follow `next` from `head`. `O(n)`.\n- **erase(value)** - keep a `prev` pointer, set `prev->next = cur->next`, `delete cur`. `O(n)` to find, `O(1)` to unlink.",
            {
              label: "push_front and print",
              content: `struct Node { int value; Node* next; };

Node* head = nullptr;
void push_front(int x) {
    head = new Node{x, head};   // new node points at old head
}

for (Node* p = head; p; p = p->next) cout << p->value << " ";`,
            },
          ),
          table(
            "Singly linked list operation costs",
            ["head pointer only", "head + tail pointers"],
            [
              ["push_front", "O(1)", "O(1)"],
              ["push_back", "O(n)", "O(1)"],
              ["pop_front", "O(1)", "O(1)"],
              ["pop_back", "O(n)", "O(n)"],
              ["search / access by index", "O(n)", "O(n)"],
            ],
            { rowLabelHeader: "Operation", footnote: "pop_back stays O(n) even with a tail pointer - a singly linked list can't step backward to find the new last node. That is what the doubly linked list fixes." },
          ),
          callout(
            "tip",
            "A **dummy head** - a sentinel node before the real first element - means `prev` always exists, so \"am I deleting the head?\" stops being a special case.",
          ),
          diagram("Pointer rewiring", [
            { id: "pf", label: "push_front", color: C_GREEN, items: ["set new->next = head", "set head = new", "2 writes, O(1)"] },
            { id: "er", label: "erase", color: C_AMBER, items: ["walk to find prev", "prev->next = cur->next", "delete cur"] },
          ]),
          quiz(
            "With only a head pointer (no tail), push_back is:",
            ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
            2,
            "You must walk the whole list to reach the last node. A tail pointer makes it O(1).",
          ),
        ],
        challenge: {
          title: "Singly linked list",
          description:
            "Implement `push_front`, `length`, and `contains` on the given list struct.",
          starterCode: `#include <iostream>
using namespace std;

struct Node { int value; Node* next; };

struct SinglyLinkedList {
    Node* head = nullptr;

    void push_front(int x) {
        // TODO
    }
    int length() {
        // TODO
        return 0;
    }
    bool contains(int x) {
        // TODO
        return false;
    }
};

int main() {
    SinglyLinkedList list;
    list.push_front(3);
    list.push_front(2);
    list.push_front(1);              // 1 -> 2 -> 3
    cout << list.length() << endl;   // 3
    cout << list.contains(2) << endl; // 1
    cout << list.contains(9) << endl; // 0
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct Node { int value; Node* next; };

struct SinglyLinkedList {
    Node* head = nullptr;

    void push_front(int x) {
        head = new Node{x, head};
    }
    int length() {
        int n = 0;
        for (Node* p = head; p; p = p->next) n++;
        return n;
    }
    bool contains(int x) {
        for (Node* p = head; p; p = p->next)
            if (p->value == x) return true;
        return false;
    }
};

int main() {
    SinglyLinkedList list;
    list.push_front(3);
    list.push_front(2);
    list.push_front(1);              // 1 -> 2 -> 3
    cout << list.length() << endl;   // 3
    cout << list.contains(2) << endl; // 1
    cout << list.contains(9) << endl; // 0
    return 0;
}`,
          tests: [
            { id: 1, label: "push_front allocates a node", keywords: [{ pattern: "new Node" }], hint: "new Node{x, head}." },
            { id: 2, label: "push_front updates head", keywords: [{ pattern: "head = " }], hint: "head must point at the new node." },
            { id: 3, label: "length / contains walk next", keywords: [{ pattern: "p->next" }], hint: "for (Node* p = head; p; p = p->next)." },
          ],
        },
      },
      {
        id: "cpp-ds-2-2",
        title: "Doubly linked list: two-way links, O(1) delete",
        xp: 16,
        chapterTitle: "Linked Lists",
        theory: [
          objectives([
            "Describe the extra cost and the payoff of a prev pointer",
            "Explain why erase of a held node is O(1) on a doubly linked list",
            "Recognise std::list and the LRU-cache use case",
          ]),
          text(
            "A **doubly linked list** node carries `prev` and `next`. It costs an extra pointer per node and more pointer updates per operation, and buys:\n\n- **`O(1)` erase given a pointer to the node** - no walk from head to find `prev`\n- **`O(1)` push_back / pop_back** with a `tail` pointer\n- backward traversal",
            {
              label: "push_back with head and tail",
              content: `struct Node { int value; Node* prev; Node* next; };
Node* head = nullptr;
Node* tail = nullptr;

void push_back(int x) {
    Node* n = new Node{x, tail, nullptr};
    if (tail) tail->next = n;
    else head = n;      // list was empty
    tail = n;
}`,
            },
          ),
          text(
            "This is what `std::list` is. It is the right pick for an **LRU cache** (`O(1)` move-to-front) or any workload that splices nodes it already holds a handle to.",
          ),
          diagram("Pointer updates", [
            { id: "ins", label: "insert between A and B", color: C_GREEN, items: ["4 pointers rewired", "A.next, B.prev, new.prev, new.next"] },
            { id: "del", label: "erase a held node X", color: C_AMBER, items: ["X.prev->next = X.next", "X.next->prev = X.prev", "O(1), no search"] },
          ]),
          callout(
            "info",
            "A **circular doubly linked list with a sentinel** (the real `std::list` layout) makes every case uniform - no nullptr checks, the ends wrap to the sentinel.",
          ),
          quiz(
            "The main thing a doubly linked list gives you over a singly linked one is:",
            [
              "Less memory per node",
              "O(1) erase of a node you already point to, plus backward traversal",
              "O(1) random access by index",
              "Automatic sorting",
            ],
            1,
            "The prev pointer removes the O(n) walk to find the predecessor.",
          ),
        ],
        challenge: {
          title: "Doubly linked list",
          description:
            "Implement `push_back` (maintaining `tail`) and `push_front` (maintaining `head`).",
          starterCode: `#include <iostream>
using namespace std;

struct Node { int value; Node* prev; Node* next; };

struct DoublyLinkedList {
    Node* head = nullptr;
    Node* tail = nullptr;

    void push_back(int x) {
        // TODO: link at tail; if empty, also set head
    }
    void push_front(int x) {
        // TODO: link at head; if empty, also set tail
    }
    int count() {
        int n = 0;
        for (Node* p = head; p; p = p->next) n++;
        return n;
    }
};

int main() {
    DoublyLinkedList d;
    d.push_back(2);
    d.push_back(3);
    d.push_front(1);              // 1 <-> 2 <-> 3
    cout << d.count() << endl;        // 3
    cout << d.head->value << endl;    // 1
    cout << d.tail->value << endl;    // 3
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct Node { int value; Node* prev; Node* next; };

struct DoublyLinkedList {
    Node* head = nullptr;
    Node* tail = nullptr;

    void push_back(int x) {
        Node* n = new Node{x, tail, nullptr};
        if (tail) tail->next = n;
        else head = n;
        tail = n;
    }
    void push_front(int x) {
        Node* n = new Node{x, nullptr, head};
        if (head) head->prev = n;
        else tail = n;
        head = n;
    }
    int count() {
        int n = 0;
        for (Node* p = head; p; p = p->next) n++;
        return n;
    }
};

int main() {
    DoublyLinkedList d;
    d.push_back(2);
    d.push_back(3);
    d.push_front(1);              // 1 <-> 2 <-> 3
    cout << d.count() << endl;        // 3
    cout << d.head->value << endl;    // 1
    cout << d.tail->value << endl;    // 3
    return 0;
}`,
          tests: [
            { id: 1, label: "Allocates nodes", keywords: [{ pattern: "new Node" }], hint: "new Node{x, prev, next}." },
            { id: 2, label: "Maintains the tail pointer", keywords: [{ pattern: "tail = n" }], hint: "push_back ends with tail = n." },
            { id: 3, label: "Sets prev links", keywords: [{ pattern: "->prev" }], hint: "push_front does head->prev = n." },
          ],
        },
      },
      {
        id: "cpp-ds-2-3",
        title: "Circular linked lists",
        xp: 10,
        chapterTitle: "Linked Lists",
        theory: [
          objectives([
            "Describe how a circular list closes the loop instead of terminating",
            "List real uses: round-robin, ring buffers, turn order",
            "Write a traversal that stops after exactly one full pass",
          ]),
          text(
            "In a **circular linked list** the last node's `next` points back to the first (and in a circular *doubly* linked list, `head->prev` points to the tail). There is no `nullptr` terminator - you stop when you arrive back where you started.",
            {
              label: "Exactly one pass",
              content: `Node* p = head;
if (p) {
    do {
        cout << p->value << " ";
        p = p->next;
    } while (p != head);
}`,
            },
          ),
          text(
            "Uses: round-robin schedulers (cycle through tasks forever), the buffer behind a **circular queue** (next lesson), turn order in a board game, repeating playlists, and Josephus-style elimination problems.",
          ),
          diagram("Linear end vs circular end", [
            { id: "lin", label: "Singly linked (linear)", color: C_GREEN, items: ["head -> A -> B -> C -> nullptr", "stop when next == nullptr"] },
            { id: "cir", label: "Circular singly linked", color: ACCENT, items: ["head -> A -> B -> C -+", "C.next points back to A", "stop when you reach head again"] },
            { id: "cird", label: "Circular doubly linked", color: C_SKY, items: ["head.prev == tail", "tail.next == head", "no nullptr anywhere - the std::list layout"] },
          ]),
          callout(
            "warning",
            "Every traversal needs an explicit stop condition. A plain `while (p != nullptr)` never ends on a circular list - it spins forever.",
          ),
          quiz(
            "How do you detect the end of one full pass over a circular list?",
            [
              "When next is nullptr",
              "When the pointer returns to the start node",
              "When the value repeats",
              "After exactly 10 steps",
            ],
            1,
            "There is no nullptr; you have looped once when you are back at the node you started from.",
          ),
        ],
      },
      {
        id: "cpp-ds-2-4",
        title: "Skip lists: a linked list that searches in O(log n)",
        xp: 12,
        chapterTitle: "Linked Lists",
        theory: [
          objectives([
            "Explain how stacked express lanes turn O(n) list search into O(log n)",
            "Describe how a random coin flip sets each node's height",
            "Compare a skip list to a balanced BST",
          ]),
          text(
            "An ordered singly linked list has `O(n)` search - you cannot binary search a list because you cannot jump to the middle. A **skip list** fixes this by stacking several sorted linked lists: level 0 has every node; level 1 has about half (an express lane); level 2 about a quarter; and so on.",
          ),
          text(
            "**Search** starts at the top-left, moves right while the next value is <= target, drops down a level when it would overshoot, and repeats. Each level roughly halves the distance left to cover, so search, insert and delete are all **`O(log n)` expected**.",
          ),
          text(
            "A new node's **height** is set by coin flips: it is always on level 0; with probability 1/2 also on level 1; with probability 1/4 also on level 2; and so on. No rotations, no rebalancing - the randomness keeps the level populations right on average.",
          ),
          diagram("Skip-list levels (searching for 25)", [
            { id: "l2", label: "Level 2", color: ACCENT, items: ["head -> 17 -> nil"] },
            { id: "l1", label: "Level 1", color: C_SKY, items: ["head -> 9 -> 17 -> 25 -> nil"] },
            { id: "l0", label: "Level 0", color: C_GREEN, items: ["3 - 9 - 12 - 17 - 21 - 25 - 30"] },
          ]),
          table(
            "Why the express lanes work: level populations",
            ["Appears on this level with probability", "Nodes in a 1,000-node list"],
            [
              ["Level 0 (every node)", "1", "1000"],
              ["Level 1", "1/2", "~500"],
              ["Level 2", "1/4", "~250"],
              ["Level 3", "1/8", "~125"],
              ["Level k", "1 / 2^k", "~1000 / 2^k"],
            ],
            { rowLabelHeader: "Level", footnote: "Each level up halves the population, so the tallest tower is about log2(n) high - and search drops one level per step." },
          ),
          callout(
            "info",
            "Redis uses skip lists for its sorted sets. They are popular in concurrent code because localised pointer updates are easier to make lock-free than tree rotations.",
          ),
          quiz(
            "What decides how many express lanes a skip-list node appears in?",
            [
              "Its value",
              "A random coin flip, one per level",
              "Its insertion order",
              "The total number of nodes",
            ],
            1,
            "Repeated 50/50 coin flips give the geometric level distribution that keeps search at O(log n) expected.",
          ),
        ],
      },
    ],
  },
  {
    id: "stack-queue-deque",
    title: "Stacks, Queues, Deques",
    icon: "📚",
    color: C_AMBER,
    lessons: [
      {
        id: "cpp-ds-3-0",
        title: "Stack: last in, first out",
        xp: 14,
        chapterTitle: "Stacks, Queues, Deques",
        theory: [
          objectives([
            "State the three O(1) stack operations and the LIFO rule",
            "Compare array-backed and list-backed stacks",
            "Name real systems built on a stack",
          ]),
          text(
            "A **stack** exposes three `O(1)` operations at **one end**, the *top*: `push` (add), `pop` (remove the most recent), `top` / `peek` (look). **LIFO** - last in, first out.",
          ),
          text(
            "Two natural implementations, both `O(1)`:\n\n- **array / vector-backed** - `push` is `push_back`, `pop` is `pop_back`. Cache-friendly, amortised `O(1)`. This is what `std::stack` uses by default.\n- **linked-list-backed** - push and pop at the head. True worst-case `O(1)`, no reallocation, but one node allocation per push.",
            {
              label: "std::stack and a vector as a stack",
              content: `#include <stack>
#include <vector>
using namespace std;

stack<int> s;
s.push(1); s.push(2);
cout << s.top() << "\\n";   // 2
s.pop();

vector<int> v;
v.push_back(10);           // push
int x = v.back(); v.pop_back();   // top + pop`,
            },
          ),
          text(
            "Where stacks show up: the **call stack** (function frames), expression parsing (shunting-yard), undo/redo, backtracking and DFS, balanced-bracket checking, the browser back button.",
          ),
          quiz(
            "You push A, then B, then C. In what order do three pops return them?",
            ["A, B, C", "C, B, A", "B, A, C", "C, A, B"],
            1,
            "LIFO: the last pushed (C) comes out first.",
          ),
        ],
        challenge: {
          title: "Balanced brackets",
          description:
            "Return true iff every `(`, `[`, `{` in `s` is closed by the matching bracket in the right order.",
          starterCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isBalanced(const string& s) {
    // TODO: push openers; on a closer, check the top matches
    return true;
}

int main() {
    cout << isBalanced("{[()()]}") << endl; // 1
    cout << isBalanced("([)]") << endl;     // 0
    cout << isBalanced("(((") << endl;      // 0
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isBalanced(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else if (c == ')' || c == ']' || c == '}') {
            if (st.empty()) return false;
            char open = st.top();
            st.pop();
            if ((c == ')' && open != '(') ||
                (c == ']' && open != '[') ||
                (c == '}' && open != '{')) return false;
        }
    }
    return st.empty();
}

int main() {
    cout << isBalanced("{[()()]}") << endl; // 1
    cout << isBalanced("([)]") << endl;     // 0
    cout << isBalanced("(((") << endl;      // 0
    return 0;
}`,
          tests: [
            { id: 1, label: "Pushes opening brackets", keywords: [{ pattern: "\\.push\\(" }], hint: "st.push(c) for openers." },
            { id: 2, label: "Pops on a closing bracket", keywords: [{ pattern: "\\.pop\\(\\)" }], hint: "st.pop() after reading the top." },
            { id: 3, label: "Rejects a mismatch", keywords: [{ pattern: "return false" }], hint: "Return false on empty stack or wrong opener." },
          ],
        },
      },
      {
        id: "cpp-ds-3-1",
        title: "Queue: first in, first out (and the ring buffer)",
        xp: 16,
        chapterTitle: "Stacks, Queues, Deques",
        theory: [
          objectives([
            "State the FIFO rule and the O(1) queue operations",
            "Explain why a plain array makes a poor queue",
            "Implement a circular buffer with wrap-around indices",
          ]),
          text(
            "A **queue** adds at the **back** (`enqueue` / `push`) and removes from the **front** (`dequeue` / `pop`) - **FIFO**. Both `O(1)`.",
          ),
          text(
            "A plain array is a bad fit: removing the front by shifting everything down is `O(n)`. Two good implementations:\n\n- **linked list with head + tail** - dequeue at head, enqueue at tail, both `O(1)`.\n- **circular buffer (ring buffer)** - a fixed array with `front` and `count` indices that wrap with `% capacity`. `O(1)`, zero per-operation allocation, contiguous memory. The backbone of bounded producer/consumer queues, audio buffers, and network stacks.",
            {
              label: "Ring buffer core",
              content: `int data[CAP], front = 0, count = 0;

void enqueue(int x) {
    data[(front + count) % CAP] = x;
    count++;
}
int dequeue() {
    int x = data[front];
    front = (front + 1) % CAP;
    count--;
    return x;
}`,
            },
          ),
          text(
            "`std::queue` is an adapter over `std::deque`. Queues drive BFS (Chapter 8), job scheduling, and request buffering.",
          ),
          arrayViz(
            "A ring buffer wraps the indices, it never shifts data",
            [
              {
                label: "slots",
                values: ["-", "-", "C", "D", "E", "-", "-", "-"],
                colLabels: ["0", "1", "2", "3", "4", "5", "6", "7"],
                okIndexes: [2, 3, 4],
              },
            ],
            "front = 2, count = 3. dequeue returns slots[2] and sets front = 3. enqueue writes at (front + count) % 8 = (2 + 3) % 8 = 5. When an index runs past 7 it wraps back to 0 - no element ever moves.",
          ),
          callout(
            "warning",
            "A ring buffer is **bounded**. Decide up front what a full buffer does: block, drop the oldest, drop the newest, or grow.",
          ),
          quiz(
            "In a circular buffer of capacity 8 with front = 6 and count = 4, which index holds the newest element?",
            ["6", "9", "1", "10"],
            2,
            "(front + count - 1) % 8 = (6 + 3) % 8 = 1.",
          ),
        ],
        challenge: {
          title: "Ring buffer queue",
          description:
            "Implement `enqueue`, `dequeue`, and `empty` on a fixed `int data[CAP]` using `front` and `count` with `% CAP`.",
          starterCode: `#include <iostream>
using namespace std;

struct RingQueue {
    static const int CAP = 8;
    int data[CAP];
    int front = 0;
    int count = 0;

    bool empty() { return count == 0; }
    void enqueue(int x) {
        // TODO: write at (front + count) % CAP, then count++
    }
    int dequeue() {
        // TODO: read data[front], advance front with % CAP, count--
        return -1;
    }
};

int main() {
    RingQueue q;
    for (int i = 1; i <= 5; i++) q.enqueue(i);
    cout << q.dequeue() << endl; // 1
    cout << q.dequeue() << endl; // 2
    q.enqueue(6);
    q.enqueue(7);
    int sum = 0;
    while (!q.empty()) sum += q.dequeue();
    cout << sum << endl;         // 3+4+5+6+7 = 25
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct RingQueue {
    static const int CAP = 8;
    int data[CAP];
    int front = 0;
    int count = 0;

    bool empty() { return count == 0; }
    void enqueue(int x) {
        data[(front + count) % CAP] = x;
        count++;
    }
    int dequeue() {
        int x = data[front];
        front = (front + 1) % CAP;
        count--;
        return x;
    }
};

int main() {
    RingQueue q;
    for (int i = 1; i <= 5; i++) q.enqueue(i);
    cout << q.dequeue() << endl; // 1
    cout << q.dequeue() << endl; // 2
    q.enqueue(6);
    q.enqueue(7);
    int sum = 0;
    while (!q.empty()) sum += q.dequeue();
    cout << sum << endl;         // 3+4+5+6+7 = 25
    return 0;
}`,
          tests: [
            { id: 1, label: "Wraps indices with % CAP", keywords: [{ pattern: "% CAP" }], hint: "(front + count) % CAP and (front + 1) % CAP." },
            { id: 2, label: "Advances front on dequeue", keywords: [{ pattern: "front = " }], hint: "front = (front + 1) % CAP." },
            { id: 3, label: "Tracks the element count", keywords: [{ pattern: "count" }], hint: "count++ on enqueue, count-- on dequeue." },
          ],
        },
      },
      {
        id: "cpp-ds-3-2",
        title: "Deque: both ends open",
        xp: 10,
        chapterTitle: "Stacks, Queues, Deques",
        theory: [
          objectives([
            "State the four O(1) deque operations",
            "Describe how std::deque is laid out and what that costs",
            "Recognise the sliding-window (monotonic deque) use case",
          ]),
          text(
            "A **deque** (double-ended queue, said \"deck\") supports `O(1)` insert and remove at **both** ends: `push_front`, `push_back`, `pop_front`, `pop_back`. It is a strict superset of a stack and a queue.",
          ),
          text(
            "`std::deque` is a **map of fixed-size chunks** - an array of pointers to blocks. That gives `O(1)` push/pop at both ends, `O(1)` indexed access (two lookups), and - unlike `vector` - references to existing elements survive a push at either end. The trade: slightly slower iteration than `vector`, more overhead, non-contiguous storage.",
          ),
          text(
            "Uses: work-stealing schedulers (owner takes from one end, thieves from the other), **sliding-window** algorithms (the monotonic deque solves sliding-window max/min in `O(n)`), palindrome checks, and any \"add or remove at either end\" buffer.",
          ),
          diagram("Deque vs its adapters", [
            { id: "dq", label: "std::deque", color: C_AMBER, items: ["push/pop both ends", "index access", "reference-stable at the ends"] },
            { id: "ad", label: "stack & queue", color: ACCENT, items: ["adapters over deque", "expose a restricted subset"] },
          ]),
          quiz(
            "Which operation is O(1) and reference-safe on std::deque but not guaranteed cheap on std::vector?",
            ["push_back", "operator[]", "push_front", "size"],
            2,
            "vector::push_front does not exist; inserting at the front is O(n) and may reallocate.",
          ),
        ],
      },
      {
        id: "cpp-ds-3-3",
        title: "Picking the right adapter",
        xp: 10,
        chapterTitle: "Stacks, Queues, Deques",
        theory: [
          objectives([
            "Choose stack / queue / deque by which ends you touch",
            "Know when the answer is actually a heap instead",
            "Recognise monotonic stack / deque as one extra invariant",
          ]),
          text(
            "All three are linear and give `O(1)` ends. Choose by *which* ends you use:\n\n- only one end -> **stack**\n- add at one end, remove at the other -> **queue**\n- both ends -> **deque**\n- you need the current **minimum or maximum** fast, not insertion order -> that is a **heap / priority queue** (Chapter 7), not one of these",
          ),
          text(
            "A **monotonic stack** (discard dominated elements so the stack stays sorted) solves \"next greater element\" and \"largest rectangle in a histogram\" in `O(n)`. A **monotonic deque** solves sliding-window maximum in `O(n)`. Same containers, one extra rule.",
          ),
          table(
            "The three adapters side by side",
            ["Add", "Remove", "Rule", "Reach for it when"],
            [
              ["Stack", "top", "top", "LIFO", "undo, DFS, expression parsing, backtracking"],
              ["Queue", "back", "front", "FIFO", "BFS, job scheduling, request buffering"],
              ["Deque", "front or back", "front or back", "both ends", "sliding window, work-stealing, palindromes"],
            ],
            { rowLabelHeader: "Structure" },
          ),
          callout(
            "tip",
            "Use `std::stack` / `std::queue` for intent-revealing code; drop to `std::vector` / `std::deque` directly when you also need to iterate or index the underlying data.",
          ),
          quiz(
            "You process tasks in arrival order but must also peek at the oldest and newest pending task. Best fit?",
            ["Stack", "Deque", "Priority queue", "Singly linked list"],
            1,
            "Both ends are needed, in O(1): a deque.",
          ),
        ],
      },
    ],
  },
  {
    id: "hashing",
    title: "Hashing: Tables, Maps, Collisions, Indexing",
    icon: "🔑",
    color: C_PINK,
    lessons: [
      {
        id: "cpp-ds-4-0",
        title: "Hash tables: turning a key into an address",
        xp: 12,
        chapterTitle: "Hashing: Tables, Maps, Collisions, Indexing",
        theory: [
          objectives([
            "Explain the roles of a hash function and a bucket array",
            "State the average and worst-case costs of hash-table operations",
            "List the three properties of a good hash function",
          ]),
          text(
            "A **hash table** stores key -> value pairs so that lookup, insert and delete are **`O(1)` on average**. The trick: a **hash function** maps a key to an integer, and `hash(key) % bucket_count` picks a slot in an array. You do not search - you *compute* where the entry lives.",
          ),
          text(
            "A good hash function is:\n\n- **deterministic** - the same key always hashes the same\n- **fast** - it runs on every single operation\n- **uniform** - it spreads keys evenly across buckets, so no slot gets overloaded; similar keys like `user1` and `user2` should land far apart",
          ),
          text(
            "Costs: **average `O(1)`** for search / insert / erase. **Worst case `O(n)`** - if every key hashes to the same bucket, the table degenerates into one long list. And there is **no order** - you cannot ask a hash table for the smallest key or iterate in sorted order (use a tree for that, Chapter 6).",
          ),
          diagram("keys -> hash -> bucket", [
            { id: "a", label: "\"alice\"", color: C_PINK, items: ["hash -> bucket 3"] },
            { id: "b", label: "\"bob\"", color: C_SKY, items: ["hash -> bucket 0"] },
            { id: "c", label: "\"carol\"", color: C_RED, items: ["hash -> bucket 3", "collision with alice"] },
          ]),
          arrayViz(
            "hash(key) % 8 picks the bucket - collisions share one",
            [
              {
                label: "bucket",
                values: ["bob", "-", "-", "alice / carol", "-", "dave", "-", "-"],
                colLabels: ["0", "1", "2", "3", "4", "5", "6", "7"],
                okIndexes: [0, 5],
                missingIndexes: [3],
              },
            ],
            "\"alice\" and \"carol\" both hash into bucket 3 (red) - a collision the table must resolve. Buckets 0 and 5 hold one key each; the rest are empty.",
          ),
          callout(
            "info",
            "`%` only distributes well if the hash is already thoroughly mixed. Real tables force `bucket_count` to a power of two (mask instead of modulo) or a prime (defends against patterned hashes).",
          ),
          quiz(
            "Hash-table lookup is O(1) average but O(?) in the worst case.",
            ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
            2,
            "If every key collides into one bucket you scan a length-n list.",
          ),
        ],
      },
      {
        id: "cpp-ds-4-1",
        title: "Collisions: chaining vs open addressing",
        xp: 16,
        chapterTitle: "Hashing: Tables, Maps, Collisions, Indexing",
        theory: [
          objectives([
            "Define a collision and why every hash table needs a resolution strategy",
            "Contrast separate chaining with open addressing",
            "Name the three probe sequences and the clustering problem",
          ]),
          text(
            "Two different keys can hash to the same bucket - a **collision**. The two resolution families:",
          ),
          text(
            "**Separate chaining** - each bucket holds a short list (or small vector) of entries. Insert pushes onto the bucket's list; lookup hashes, then scans that one short list. Simple, degrades gracefully, tolerates load factor above 1. Cost: pointers plus a node allocation per entry. This is what `std::unordered_map` uses.",
          ),
          text(
            "**Open addressing** - one entry per slot, no lists. On a collision you **probe** to another slot by a rule:\n\n- **linear probing**: slot+1, slot+2, ... great cache behaviour, but causes **primary clustering** (runs of full slots that merge and grow)\n- **quadratic probing**: slot+1, slot+4, slot+9, ... breaks up clustering\n- **double hashing**: step size is a second hash of the key - best distribution\n\nDeletions need a **tombstone** marker so probe chains do not break.",
          ),
          diagram("Same collision, two fixes", [
            { id: "ch", label: "Chaining", color: C_PINK, items: ["bucket 3 -> [carol] -> [alice]", "scan a 2-element list"] },
            { id: "oa", label: "Open addressing (linear)", color: C_AMBER, items: ["alice in slot 3", "carol spills into slot 4"] },
          ]),
          table(
            "Separate chaining vs open addressing",
            ["Separate chaining", "Open addressing"],
            [
              ["Layout", "bucket -> list of entries", "one entry per slot, probe on clash"],
              ["Load factor it tolerates", "> 1 is fine", "keep below ~0.75"],
              ["Cache behaviour", "pointer-chases the list", "stays in one contiguous array"],
              ["Deletion", "unlink a node", "leave a tombstone marker"],
              ["Extra memory", "a pointer + node per entry", "just spare empty slots"],
              ["Used by", "std::unordered_map", "Python dict, many game engines"],
            ],
            { rowLabelHeader: "Aspect" },
          ),
          callout(
            "warning",
            "Open addressing performance falls off a cliff as load factor approaches 1 - probe sequences get long. Keep it well under ~0.75 and resize early.",
          ),
          quiz(
            "Linear probing suffers from ___, where consecutive occupied slots merge into long runs.",
            ["tombstoning", "primary clustering", "rehashing", "chaining"],
            1,
            "Primary clustering: any hash landing near a run extends it, making future probes longer.",
          ),
        ],
        challenge: {
          title: "Chaining hash set",
          description:
            "Implement a 16-bucket set of ints: `add` (skip duplicates) and `contains`, using `x` mapped to a bucket and separate chaining.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

struct HashSet {
    static const int B = 16;
    vector<int> buckets[B];

    int slot(int x) { return ((x % B) + B) % B; }

    void add(int x) {
        // TODO: if not already present, push x into buckets[slot(x)]
    }
    bool contains(int x) {
        // TODO: scan only buckets[slot(x)]
        return false;
    }
};

int main() {
    HashSet s;
    int items[] = {3, 19, 35, 8, 3};   // 3, 19, 35 all collide mod 16
    for (int x : items) s.add(x);
    cout << s.contains(19) << endl; // 1
    cout << s.contains(35) << endl; // 1
    cout << s.contains(4) << endl;  // 0
    int total = 0;
    for (int i = 0; i < HashSet::B; i++) total += s.buckets[i].size();
    cout << total << endl;          // 4 (duplicate 3 skipped)
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

struct HashSet {
    static const int B = 16;
    vector<int> buckets[B];

    int slot(int x) { return ((x % B) + B) % B; }

    void add(int x) {
        if (contains(x)) return;
        buckets[slot(x)].push_back(x);
    }
    bool contains(int x) {
        for (int v : buckets[slot(x)])
            if (v == x) return true;
        return false;
    }
};

int main() {
    HashSet s;
    int items[] = {3, 19, 35, 8, 3};
    for (int x : items) s.add(x);
    cout << s.contains(19) << endl; // 1
    cout << s.contains(35) << endl; // 1
    cout << s.contains(4) << endl;  // 0
    int total = 0;
    for (int i = 0; i < HashSet::B; i++) total += s.buckets[i].size();
    cout << total << endl;          // 4
    return 0;
}`,
          tests: [
            { id: 1, label: "Uses the bucket function", keywords: [{ pattern: "slot\\(x\\)" }], hint: "Index with buckets[slot(x)]." },
            { id: 2, label: "Chains with push_back", keywords: [{ pattern: "push_back" }], hint: "buckets[slot(x)].push_back(x)." },
            { id: 3, label: "Scans one bucket in contains", keywords: [{ pattern: "buckets\\[slot" }], hint: "Only the key's own bucket is scanned." },
          ],
        },
      },
      {
        id: "cpp-ds-4-2",
        title: "Load factor, resizing, and the C++ maps",
        xp: 12,
        chapterTitle: "Hashing: Tables, Maps, Collisions, Indexing",
        theory: [
          objectives([
            "Define load factor and the space/speed trade it controls",
            "Explain rehashing and why insert stays amortised O(1)",
            "Choose between unordered_map and map",
          ]),
          text(
            "**Load factor** a = entries / buckets. It is the dial trading space for speed: low a means few collisions but wasted slots; high a means compact but slower. Chaining targets a around 1; open addressing around 0.5 to 0.7.",
          ),
          text(
            "When a crosses `max_load_factor`, the table **rehashes**: allocate a bucket array about 2x bigger, recompute every key's slot, move the entries. That one operation is `O(n)`, but amortised over the inserts that triggered it, insert stays **amortised `O(1)`** - the dynamic-array story again.",
          ),
          text(
            "The C++ tools:\n\n- `std::unordered_map` / `unordered_set` - hash table, average `O(1)`, no order, has `bucket_count()`, `load_factor()`, `reserve()`\n- `std::map` / `set` - balanced BST (Chapter 6), `O(log n)`, **keys stay sorted**, supports range queries",
            {
              label: "unordered_map with reserve",
              content: `#include <unordered_map>
#include <string>
using namespace std;

unordered_map<string, int> counts;
counts.reserve(100000);           // size the buckets once
counts["apple"]++;                // insert-or-update, O(1) average
if (counts.count("pear")) { /* ... */ }`,
            },
          ),
          table(
            "Load factor is a dial: probes vs wasted space (open addressing)",
            ["Avg probes on a hit", "Avg probes on a miss", "Feel"],
            [
              ["0.50", "1.5", "2.5", "roomy, fast, half-empty"],
              ["0.75", "2.5", "8.5", "the usual resize trigger"],
              ["0.90", "5.5", "50", "getting slow"],
              ["0.99", "50", "5000", "effectively broken"],
            ],
            { rowLabelHeader: "Load factor", highlightRows: [1, 3] },
          ),
          callout(
            "tip",
            "Going to insert n entries? Call `reserve(n)` first - it sizes the buckets once and skips every intermediate rehash.",
          ),
          quiz(
            "Rehashing is O(n). Why is a single insert still amortised O(1)?",
            [
              "Rehashing never actually happens",
              "Doubling makes the total rehash work across n inserts O(n)",
              "The compiler caches the buckets",
              "Inserts are actually O(log n)",
            ],
            1,
            "Same argument as the doubling vector: total work is linear, so per-insert it averages constant.",
          ),
        ],
      },
      {
        id: "cpp-ds-4-3",
        title: "Indexing: hash indexes and ordered indexes",
        xp: 12,
        chapterTitle: "Hashing: Tables, Maps, Collisions, Indexing",
        theory: [
          objectives([
            "Define an index as an auxiliary structure that speeds lookups",
            "Contrast a hash index with an ordered (tree) index",
            "Explain primary vs secondary indexes and their write cost",
          ]),
          text(
            "An **index** is a secondary structure mapping a search key to the location of the full record, so you do not scan everything. A hash table *is* an in-memory index; databases and file systems build the same idea on disk.",
          ),
          text(
            "**Hash index** - key -> bucket -> record location. `O(1)` average for **equality** (\"find user 42\"). Cannot do ranges or ordered scans.\n\n**Ordered index** - a sorted structure, almost always a **B-tree / B+ tree** (a broad, shallow balanced tree tuned for disk pages) or an in-memory balanced BST. `O(log n)` for equality *and* for **ranges** (\"all orders between two dates\"), plus sorted iteration.",
          ),
          text(
            "**Primary index** - built on the key that decides where the record itself is stored (often keeps the table physically sorted; one per table). **Secondary index** - an extra index on another column that points back to the row. You can have many, and each one adds write cost: every insert or update must maintain every index.",
          ),
          diagram("Query shape -> index type", [
            { id: "eq", label: "equality only", color: C_PINK, items: ["WHERE id = 42", "hash index, O(1)"] },
            { id: "rg", label: "range / sort / prefix", color: C_SKY, items: ["WHERE ts BETWEEN a AND b", "ordered (B-tree) index, O(log n)"] },
          ]),
          callout(
            "info",
            "This is why `CREATE INDEX` speeds up reads but slows down writes, and why a hash index cannot satisfy `ORDER BY` or `BETWEEN`.",
          ),
          quiz(
            "You need WHERE created_at BETWEEN x AND y. Which index type can serve it?",
            [
              "Hash index",
              "Ordered / B-tree index",
              "Neither - it must be a full scan",
              "Any index works equally",
            ],
            1,
            "Range predicates need sorted order; a hash index only supports equality.",
          ),
        ],
      },
      {
        id: "cpp-ds-4-4",
        title: "When hashing goes wrong",
        xp: 10,
        chapterTitle: "Hashing: Tables, Maps, Collisions, Indexing",
        theory: [
          objectives([
            "List the common hash-table failure modes",
            "Explain the hash-flooding denial-of-service attack and its fix",
            "Know how to supply a hash for a custom key type",
          ]),
          text(
            "Failure modes:\n\n- **bad hash function** - collisions pile up and every operation drifts toward `O(n)`\n- **clustering** - open addressing with linear probing under high load\n- **hash-flood DoS** - an attacker sends keys chosen to all collide, turning an `O(1)` service into `O(n^2)`; the fix is a **randomly seeded** hash per process, which is why hash-table iteration order is deliberately unspecified\n- **expensive keys** - hashing a huge string on every lookup; cache the hash if keys are reused",
            {
              label: "A hash for a struct key",
              content: `#include <unordered_map>
struct Point { int x, y; };

struct PointHash {
    size_t operator()(const Point& p) const {
        return std::hash<int>()(p.x) * 1000003u ^ std::hash<int>()(p.y);
    }
};
struct PointEq {
    bool operator()(const Point& a, const Point& b) const {
        return a.x == b.x && a.y == b.y;
    }
};
std::unordered_map<Point, int, PointHash, PointEq> grid;`,
            },
          ),
          callout(
            "warning",
            "Never rely on `unordered_map` iteration order, and never persist it - it changes across runs, library versions, and after any rehash.",
          ),
          quiz(
            "Why is hash-table iteration order intentionally randomised in modern libraries?",
            [
              "To make debugging harder",
              "To prevent collision-flooding denial-of-service attacks",
              "It is a bug",
              "To save memory",
            ],
            1,
            "A per-process random seed means an attacker cannot precompute a set of all-colliding keys.",
          ),
        ],
      },
    ],
  },
  {
    id: "trees",
    title: "Non-Linear: Trees",
    icon: "🌳",
    color: C_GREEN,
    lessons: [
      {
        id: "cpp-ds-5-0",
        title: "Trees and binary trees",
        xp: 14,
        chapterTitle: "Non-Linear: Trees",
        theory: [
          objectives([
            "Define root, parent/child, leaf, height, depth, balanced",
            "Describe the four traversal orders and what each is used for",
            "Implement a recursive in-order traversal",
          ]),
          text(
            "A **tree** is a non-linear structure: one **root**, every other node has exactly one **parent**, and there are no cycles. A **binary tree** limits each node to at most two children, `left` and `right`. Terms: **leaf** (no children), **height** (edges on the longest root-to-leaf path), **depth** (edges from the root to a node), **balanced** (sibling subtree heights differ by at most 1 everywhere).",
          ),
          text(
            "**Traversals**:\n\n- **pre-order** (node, left, right) - copy or serialise a tree\n- **in-order** (left, node, right) - on a BST, visits keys in **sorted** order\n- **post-order** (left, right, node) - delete children before the parent; evaluate expression trees\n- **level-order** (breadth-first, by depth) - uses a **queue**, not recursion",
            {
              label: "Recursive traversal shape",
              content: `struct Node { int key; Node* left; Node* right; };

void inorder(Node* n) {
    if (!n) return;
    inorder(n->left);
    visit(n->key);
    inorder(n->right);
}`,
            },
          ),
          table(
            "The four traversal orders",
            ["Visit order", "On this tree (4 / 2,6 / 1,3,-,7)", "Reach for it to"],
            [
              ["Pre-order", "node, left, right", "4 2 1 3 6 7", "copy or serialise a tree"],
              ["In-order", "left, node, right", "1 2 3 4 6 7", "read a BST in sorted order"],
              ["Post-order", "left, right, node", "1 3 2 7 6 4", "free children before the parent"],
              ["Level-order", "by depth, left to right", "4 2 6 1 3 7", "shortest path in edges; uses a queue"],
            ],
            { rowLabelHeader: "Traversal" },
          ),
          callout(
            "info",
            "Recursion on a tree of height h uses `O(h)` call-stack space. A balanced tree gives h = `O(log n)`; a degenerate one gives h = n.",
          ),
          quiz(
            "Which traversal of a binary search tree visits the keys in ascending order?",
            ["Pre-order", "In-order", "Post-order", "Level-order"],
            1,
            "Left subtree (smaller), then the node, then the right subtree (larger).",
          ),
        ],
        challenge: {
          title: "In-order traversal",
          description:
            "Fill `inorder` so it appends the tree's keys to `out` in left, node, right order.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

struct Node { int key; Node* left; Node* right; };

void inorder(Node* root, vector<int>& out) {
    // TODO: recurse left, push root->key, recurse right
}

int main() {
    Node d{1, nullptr, nullptr}, e{3, nullptr, nullptr}, f{7, nullptr, nullptr};
    Node b{2, &d, &e}, c{6, nullptr, &f};
    Node a{4, &b, &c};
    vector<int> out;
    inorder(&a, out);
    for (int v : out) cout << v << " ";   // 1 2 3 4 6 7
    cout << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

struct Node { int key; Node* left; Node* right; };

void inorder(Node* root, vector<int>& out) {
    if (!root) return;
    inorder(root->left, out);
    out.push_back(root->key);
    inorder(root->right, out);
}

int main() {
    Node d{1, nullptr, nullptr}, e{3, nullptr, nullptr}, f{7, nullptr, nullptr};
    Node b{2, &d, &e}, c{6, nullptr, &f};
    Node a{4, &b, &c};
    vector<int> out;
    inorder(&a, out);
    for (int v : out) cout << v << " ";   // 1 2 3 4 6 7
    cout << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Recurses left first", keywords: [{ pattern: "inorder\\(root->left" }], hint: "Visit the left subtree before the node." },
            { id: 2, label: "Emits the node key", keywords: [{ pattern: "out.push_back\\(root->key\\)" }], hint: "push_back between the two recursions." },
            { id: 3, label: "Recurses right last", keywords: [{ pattern: "inorder\\(root->right" }], hint: "Right subtree after the node." },
          ],
        },
      },
      {
        id: "cpp-ds-5-1",
        title: "Binary search tree: ordered, O(h)",
        xp: 16,
        chapterTitle: "Non-Linear: Trees",
        theory: [
          objectives([
            "State the BST ordering invariant",
            "Give the algorithm for search, insert and the three erase cases",
            "Explain why insertion order can make a plain BST degenerate",
          ]),
          text(
            "A **BST** adds an ordering invariant: for every node, all keys in the **left** subtree are smaller and all keys in the **right** subtree are larger. Search becomes a series of left/right decisions.\n\n- **search / insert** - compare at the root, go left or right, repeat. `O(h)`.\n- **erase** - leaf: remove it. One child: splice past it. Two children: replace the key with its **in-order successor** (smallest key in the right subtree), then delete that node.\n- **min / max** - walk all the way left / right.",
          ),
          text(
            "`h` is the whole story. A **balanced** BST gives h = `O(log n)`, so every operation is `O(log n)`. But inserting **already-sorted** data makes every node a right child - a degenerate \"linked list\", h = n, operations `O(n)`. That is exactly why self-balancing trees exist (next lesson).",
          ),
          diagram("Same 7 keys, two shapes", [
            { id: "bal", label: "Balanced", color: C_GREEN, items: ["inserted 4,2,6,1,3,5,7", "height 3", "O(log n) ops"] },
            { id: "deg", label: "Degenerate", color: C_RED, items: ["inserted 1,2,3,4,5,6,7", "height 7", "O(n) ops"] },
          ]),
          callout(
            "warning",
            "A plain BST is only as good as its insertion order. Never build one from sorted input without shuffling or a balancing scheme.",
          ),
          quiz(
            "Insert 1, 2, 3, 4, 5 in that order into a plain BST. Its height is:",
            ["1", "2 (log 5)", "3", "5"],
            3,
            "Each key is larger than the last, so every node is a right child - a straight line of height 5.",
          ),
        ],
        challenge: {
          title: "BST insert & search",
          description:
            "Implement recursive `insert` (returns the subtree root) and `contains`.",
          starterCode: `#include <iostream>
using namespace std;

struct Node { int key; Node* left = nullptr; Node* right = nullptr; };

Node* insert(Node* root, int key) {
    // TODO: create a node at an empty spot; else recurse left/right by comparison
    return root;
}
bool contains(Node* root, int key) {
    // TODO
    return false;
}

int main() {
    Node* root = nullptr;
    int keys[] = {5, 3, 8, 1, 4, 7, 9};
    for (int k : keys) root = insert(root, k);
    cout << contains(root, 4) << endl; // 1
    cout << contains(root, 6) << endl; // 0
    cout << root->key << endl;         // 5
    cout << root->left->key << endl;   // 3
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct Node { int key; Node* left = nullptr; Node* right = nullptr; };

Node* insert(Node* root, int key) {
    if (root == nullptr) return new Node{key, nullptr, nullptr};
    if (key < root->key) root->left = insert(root->left, key);
    else if (key > root->key) root->right = insert(root->right, key);
    return root;
}
bool contains(Node* root, int key) {
    if (root == nullptr) return false;
    if (key == root->key) return true;
    if (key < root->key) return contains(root->left, key);
    return contains(root->right, key);
}

int main() {
    Node* root = nullptr;
    int keys[] = {5, 3, 8, 1, 4, 7, 9};
    for (int k : keys) root = insert(root, k);
    cout << contains(root, 4) << endl; // 1
    cout << contains(root, 6) << endl; // 0
    cout << root->key << endl;         // 5
    cout << root->left->key << endl;   // 3
    return 0;
}`,
          tests: [
            { id: 1, label: "Creates a node at an empty spot", keywords: [{ pattern: "new Node" }], hint: "Return new Node when root == nullptr." },
            { id: 2, label: "Branches by key comparison", keywords: [{ pattern: "key < root->key" }], hint: "Go left when key < root->key." },
            { id: 3, label: "contains recurses", keywords: [{ pattern: "return contains" }], hint: "Recurse into the correct child." },
          ],
        },
      },
      {
        id: "cpp-ds-5-2",
        title: "AVL trees: staying balanced with rotations",
        xp: 14,
        chapterTitle: "Non-Linear: Trees",
        theory: [
          objectives([
            "State the AVL balance condition",
            "Explain what a rotation does and name the four cases",
            "Give AVL's guaranteed complexities and the trade against red-black trees",
          ]),
          text(
            "An **AVL tree** is a BST that repairs its own shape after every insert and erase. Invariant: for every node, `height(left) - height(right)` - the **balance factor** - is -1, 0, or +1.",
          ),
          text(
            "A **rotation** re-hangs three pointers to lower the height on the heavy side while *preserving BST order*. After an insert you walk back toward the root; at the first node whose balance factor reaches +/-2 you apply one of four fixes:\n\n- **LL** (heavy left-left) -> one right rotation\n- **RR** (heavy right-right) -> one left rotation\n- **LR** (heavy left-right) -> left-rotate the child, then right-rotate\n- **RL** (heavy right-left) -> right-rotate the child, then left-rotate",
          ),
          diagram("RR case -> single left rotation", [
            { id: "before", label: "Before", color: C_RED, items: ["A - B - C leaning right", "A balance factor -2"] },
            { id: "after", label: "After", color: C_GREEN, items: ["B is the new root", "A and C are its children", "height reduced by 1"] },
          ]),
          text(
            "Result: height is guaranteed <= about 1.44 * log2(n), so **search, insert and erase are worst-case `O(log n)`** - no degenerate case, ever. The price: a height/balance field per node and `O(log n)` rotation work on updates. **Red-black trees** (what `std::map` uses) allow slightly looser balance for fewer rotations on write-heavy workloads.",
          ),
          table(
            "The four rebalancing cases",
            ["Shape after the bad insert", "Fix"],
            [
              ["LL", "heavy left, then left again", "one right rotation"],
              ["RR", "heavy right, then right again", "one left rotation"],
              ["LR", "heavy left, then right", "left-rotate the child, then right-rotate"],
              ["RL", "heavy right, then left", "right-rotate the child, then left-rotate"],
            ],
            { rowLabelHeader: "Case", footnote: "You detect the case at the lowest node whose balance factor reached +/-2 while unwinding the insert." },
          ),
          callout(
            "info",
            "A single rotation is `O(1)` - just pointer and height updates. An insert triggers at most one (single or double) rotation; an erase may rotate once per level, still `O(log n)` total.",
          ),
          quiz(
            "A node's left subtree has height 4 and its right has height 2, with the extra height in the left child's LEFT subtree. Which fix?",
            ["RR -> left rotation", "LL -> right rotation", "LR -> double rotation", "RL -> double rotation"],
            1,
            "Heavy on the left, and the imbalance is left-left, so a single right rotation rebalances it.",
          ),
        ],
      },
      {
        id: "cpp-ds-5-3",
        title: "Trees vs hashing: which map do you want?",
        xp: 10,
        chapterTitle: "Non-Linear: Trees",
        theory: [
          objectives([
            "Choose between a hash map and a balanced-tree map by required operations",
            "Recall the memory and pause-time differences",
            "Spot when a plain array beats both",
          ]),
          text(
            "Both a balanced BST and a hash table give you a **map**. Choose by what you need beyond `get` / `put`:\n\n- equality lookups only, order irrelevant, want the best average case -> **hash table** (`unordered_map`), `O(1)` average\n- need sorted iteration, `lower_bound` / range queries, or **worst-case** guarantees -> **balanced BST** (`map`), `O(log n)` always\n- keys are integers in a small known range -> skip both, use a plain **array** (direct addressing, `O(1)` worst case)",
          ),
          text(
            "Memory: hash tables waste empty buckets and store a hash per entry; trees store two or three pointers plus balance metadata per node. Hash tables have `O(n)` rehash pauses; trees give steady `O(log n)`.",
          ),
          table(
            "unordered_map (hash) vs map (balanced tree)",
            ["unordered_map", "map"],
            [
              ["Lookup / insert / erase", "O(1) average", "O(log n) always"],
              ["Worst case", "O(n) on a bad rehash burst", "O(log n)"],
              ["Key order", "none", "sorted"],
              ["Range / lower_bound", "not supported", "O(log n)"],
              ["Pause behaviour", "O(n) rehash spikes", "steady"],
              ["Iterator stability", "all invalidated on rehash", "only the erased one"],
            ],
            { rowLabelHeader: "Property" },
          ),
          callout(
            "tip",
            "`std::map` also wins when you need iterators that stay valid while *other* elements are inserted or erased - `unordered_map` invalidates all iterators on a rehash.",
          ),
          quiz(
            "A leaderboard needs \"show me players ranked between X and Y\". Which structure?",
            ["unordered_map", "A balanced BST / ordered map", "A stack", "A hash set"],
            1,
            "Range-by-rank needs sorted order, which only the tree provides.",
          ),
        ],
      },
    ],
  },
  {
    id: "heaps",
    title: "Non-Linear: Heaps & Priority Queues",
    icon: "⛰️",
    color: C_RED,
    lessons: [
      {
        id: "cpp-ds-6-0",
        title: "Heaps: a tree that lives in an array",
        xp: 12,
        chapterTitle: "Non-Linear: Heaps & Priority Queues",
        theory: [
          objectives([
            "State the shape and order properties of a binary heap",
            "Map parent and child indices in the array representation",
            "Explain why a heap gives O(1) peek and O(log n) update but O(n) search",
          ]),
          text(
            "A **binary heap** is a **complete** binary tree (every level full except possibly the last, which fills left to right) with the **heap-order** property: every node compares `>=` (max-heap) or `<=` (min-heap) to its children. So the root is the maximum (or minimum) - **`O(1)` to peek**.",
          ),
          text(
            "Because the tree is complete, it packs perfectly into an array with **no pointers**. For a node at index `i` (0-based):\n\n- parent = `(i - 1) / 2`\n- left child = `2 * i + 1`\n- right child = `2 * i + 2`",
            {
              label: "Heap as an array",
              content: `// max-heap
// index:  0   1   2   3   4   5
// value: 50  30  40  10  20  35
//
//          50
//        /    \\
//      30      40
//     /  \\    /
//   10   20  35`,
            },
          ),
          text(
            "This is the ideal layout from Chapter 1 - contiguous, cache-friendly, zero allocation per element.",
          ),
          arrayViz(
            "The same max-heap as a tree and as a flat array",
            [
              {
                label: "value",
                values: ["50", "30", "40", "10", "20", "35"],
                colLabels: ["0", "1", "2", "3", "4", "5"],
                okIndexes: [0],
              },
            ],
            "Node at index i: parent = (i - 1) / 2, left = 2i + 1, right = 2i + 2. So index 1 (value 30) has parent 0 (50) and children 3 (10) and 4 (20). No pointers, perfect cache use.",
          ),
          callout(
            "info",
            "A heap is only *partially* ordered - siblings have no relationship. You cannot search a heap in better than `O(n)`, and in-order traversal is meaningless. It does exactly one job well: hand you the extreme element.",
          ),
          quiz(
            "In a 0-indexed array heap, the left child of index 4 is at index:",
            ["5", "8", "9", "10"],
            2,
            "left = 2 * i + 1 = 2 * 4 + 1 = 9.",
          ),
        ],
      },
      {
        id: "cpp-ds-6-1",
        title: "Min-heap and max-heap: sift-up, sift-down, build-heap",
        xp: 16,
        chapterTitle: "Non-Linear: Heaps & Priority Queues",
        theory: [
          objectives([
            "Implement push (sift-up) and pop (sift-down)",
            "Explain why build-heap is O(n), not O(n log n)",
            "Use std::priority_queue as a max-heap and as a min-heap",
          ]),
          text(
            "Two operations keep the heap ordered:\n\n- **push(x)** - append at the end, then **sift-up**: while it beats its parent, swap with the parent. `O(log n)`.\n- **pop()** - save the root, move the last element to index 0, shrink, then **sift-down**: while it loses to its better child, swap with that child. `O(log n)`.\n- **peek** - `arr[0]`. `O(1)`.",
            {
              label: "sift-up (min-heap)",
              content: `void siftUp(vector<int>& a, int i) {
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (a[i] >= a[parent]) break;
        swap(a[i], a[parent]);
        i = parent;
    }
}`,
            },
          ),
          text(
            "**build-heap** - given an array, call sift-down on every non-leaf from the middle back to index 0. It looks like `O(n log n)`; a tighter sum shows it is **`O(n)`** (most nodes are near the bottom and barely move).",
          ),
          text(
            "`std::priority_queue<T>` is a **max-heap** by default. For a min-heap use `std::priority_queue<T, vector<T>, greater<T>>`. The free functions `make_heap` / `push_heap` / `pop_heap` work on any random-access range.",
          ),
          callout(
            "warning",
            "`priority_queue` gives you `top()` / `push()` / `pop()` only - no iteration, no \"find\", no \"change the priority of an arbitrary element\" (that needs an indexed heap).",
          ),
          quiz(
            "pop() on a binary heap is O(log n) because:",
            [
              "It scans the whole array",
              "sift-down walks at most the height of the tree",
              "It rebuilds the heap from scratch",
              "It sorts the array",
            ],
            1,
            "The moved root sinks at most log n levels.",
          ),
        ],
        challenge: {
          title: "Min-heap",
          description:
            "Implement `push` (append + sift-up) and `pop` (swap root with last, shrink, sift-down) on a vector<int>.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

struct MinHeap {
    vector<int> a;

    void push(int x) {
        // TODO: a.push_back(x); sift up while smaller than parent at (i - 1) / 2
    }
    int pop() {
        // TODO: save a[0]; move last to front; pop_back; sift down using 2 * i + 1
        return 0;
    }
    bool empty() { return a.empty(); }
};

int main() {
    MinHeap h;
    int xs[] = {5, 1, 8, 3, 9, 2, 7};
    for (int x : xs) h.push(x);
    while (!h.empty()) cout << h.pop() << " ";   // 1 2 3 5 7 8 9
    cout << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

struct MinHeap {
    vector<int> a;

    void push(int x) {
        a.push_back(x);
        int i = a.size() - 1;
        while (i > 0) {
            int parent = (i - 1) / 2;
            if (a[i] >= a[parent]) break;
            swap(a[i], a[parent]);
            i = parent;
        }
    }
    int pop() {
        int top = a[0];
        a[0] = a.back();
        a.pop_back();
        int i = 0, n = a.size();
        while (true) {
            int l = 2 * i + 1, r = 2 * i + 2, smallest = i;
            if (l < n && a[l] < a[smallest]) smallest = l;
            if (r < n && a[r] < a[smallest]) smallest = r;
            if (smallest == i) break;
            swap(a[i], a[smallest]);
            i = smallest;
        }
        return top;
    }
    bool empty() { return a.empty(); }
};

int main() {
    MinHeap h;
    int xs[] = {5, 1, 8, 3, 9, 2, 7};
    for (int x : xs) h.push(x);
    while (!h.empty()) cout << h.pop() << " ";   // 1 2 3 5 7 8 9
    cout << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Uses the parent index formula", keywords: [{ pattern: "\\(i - 1\\) / 2" }], hint: "parent = (i - 1) / 2." },
            { id: 2, label: "Uses the child index formula", keywords: [{ pattern: "2 \\* i \\+ 1" }], hint: "left child = 2 * i + 1." },
            { id: 3, label: "Swaps elements to restore order", keywords: [{ pattern: "swap\\(a\\[" }], hint: "swap(a[i], a[parent]) / swap(a[i], a[smallest])." },
          ],
        },
      },
      {
        id: "cpp-ds-6-2",
        title: "Heapsort, top-k, and streaming",
        xp: 12,
        chapterTitle: "Non-Linear: Heaps & Priority Queues",
        theory: [
          objectives([
            "Describe heapsort and its place next to quicksort",
            "Use a size-k heap to find the k largest of n items",
            "List the algorithms that lean on a priority queue",
          ]),
          text(
            "**Heapsort**: build-heap in `O(n)`, then pop the max `n` times, each pop `O(log n)`, placing it at the shrinking end of the array -> **`O(n log n)`**, **in-place**, **not stable**. Its worst case is reliable (unlike quicksort), but its cache behaviour is poorer, so it is often the *fallback*: `std::sort` is introsort - quicksort that switches to heapsort when recursion goes too deep.",
          ),
          text(
            "**Top-k of n items**: keep a heap of size `k`. For the `k` **largest**, use a **min-heap** - push each item, and when the size exceeds `k`, pop the smallest. `O(n log k)` time, `O(k)` space, and it works on a **stream** you cannot hold in memory. Far better than sorting all `n` when `k` is much smaller than `n`.",
          ),
          text(
            "Other heap uses: Dijkstra and Prim pull the closest frontier node; event-driven simulation pulls the next event by timestamp; Huffman coding (next chapter) repeatedly pulls the two lowest frequencies; \"merge k sorted lists\" uses a k-way heap.",
          ),
          table(
            "Where heapsort sits among the O(n log n) sorts",
            ["Time (worst)", "Extra space", "Stable?", "Notes"],
            [
              ["Heapsort", "O(n log n)", "O(1)", "no", "reliable worst case, weak cache use"],
              ["Quicksort", "O(n^2)", "O(log n)", "no", "fastest in practice, bad pivots hurt"],
              ["Merge sort", "O(n log n)", "O(n)", "yes", "stable, great for linked lists / external"],
              ["std::sort (introsort)", "O(n log n)", "O(log n)", "no", "quicksort, falls back to heapsort"],
            ],
            { rowLabelHeader: "Algorithm", highlightRows: [0] },
          ),
          callout(
            "tip",
            "\"k largest\" -> min-heap of size k. \"k smallest\" -> max-heap of size k. The heap holds the *boundary*; its root is the next thing to evict.",
          ),
          quiz(
            "Streaming 10^9 numbers, you need the 100 largest. Best approach?",
            [
              "Sort all 10^9 numbers, O(n log n)",
              "A size-100 min-heap, O(n log k)",
              "A hash set",
              "A stack",
            ],
            1,
            "The heap keeps only the current top 100; anything smaller than its root is discarded immediately.",
          ),
        ],
      },
    ],
  },
  {
    id: "graphs",
    title: "Graphs",
    icon: "🕸️",
    color: C_SKY,
    lessons: [
      {
        id: "cpp-ds-7-0",
        title: "Graph vocabulary: directed, weighted, and the rest",
        xp: 12,
        chapterTitle: "Graphs",
        theory: [
          objectives([
            "Define vertices, edges, degree, path, cycle, connectivity",
            "Distinguish directed vs undirected and weighted vs unweighted",
            "Recognise dense vs sparse and why a DAG matters",
          ]),
          text(
            "A **graph** G = (V, E) is a set of **vertices** and **edges** connecting them - the most general data structure: trees and linked lists are just restricted graphs.",
          ),
          text(
            "Pin these down before writing any code:\n\n- **directed vs undirected** - does edge (u, v) also mean (v, u)? One-way streets vs friendship.\n- **weighted vs unweighted** - does each edge carry a number (distance, cost, capacity)? Unweighted means every edge costs 1.\n- **cyclic vs acyclic** - a **DAG** (directed acyclic graph) models dependencies, build order and schedules, and enables topological sort.\n- **connected?** - is every vertex reachable? (Undirected: connected components. Directed: strongly connected components.)",
          ),
          text(
            "**Dense** (|E| about |V|^2) vs **sparse** (|E| about |V|) decides the representation (next lesson). Most real graphs - road networks, the web, social graphs - are very sparse.",
          ),
          diagram("Four nodes, three graphs", [
            { id: "u", label: "Undirected, unweighted", color: C_SKY, items: ["edges are symmetric", "every edge costs 1"] },
            { id: "d", label: "Directed", color: ACCENT, items: ["u -> v is not v -> u", "models one-way relations"] },
            { id: "w", label: "Weighted", color: C_AMBER, items: ["each edge has a number", "distance / cost / capacity"] },
          ]),
          callout(
            "info",
            "A **tree** is a connected undirected graph with exactly |V| - 1 edges and no cycles. A linked list is a tree where every node has at most one child.",
          ),
          quiz(
            "A table of one-way flight routes, each with a ticket price, is a ___ graph.",
            ["undirected, unweighted", "undirected, weighted", "directed, unweighted", "directed, weighted"],
            3,
            "Routes have a direction and carry a number, so it is directed and weighted.",
          ),
        ],
      },
      {
        id: "cpp-ds-7-1",
        title: "Representations: adjacency list vs adjacency matrix",
        xp: 16,
        chapterTitle: "Graphs",
        theory: [
          objectives([
            "State the space and per-operation costs of each representation",
            "Match each to dense vs sparse graphs",
            "Build an adjacency list from an edge list",
          ]),
          text(
            "**Adjacency matrix** - a |V| x |V| grid, `M[u][v] = 1` (or the weight) if the edge exists.\n\n- edge lookup \"is u -> v there?\" is `O(1)`\n- space is `O(|V|^2)` regardless of edge count\n- iterating one vertex's neighbours is `O(|V|)` even if it has two\n- great for **dense** graphs and algorithms that probe random edges (Floyd-Warshall)",
          ),
          text(
            "**Adjacency list** - an array of |V| lists; `adj[u]` holds u's neighbours (with weights if any).\n\n- space is `O(|V| + |E|)`\n- iterating a vertex's neighbours is `O(degree)` - optimal\n- edge lookup is `O(degree)`\n- the default for **sparse** graphs and for BFS / DFS / Dijkstra. In C++: `vector<vector<int>>`, or `vector<vector<pair<int,int>>>` with weights.",
          ),
          diagram("5 nodes, 4 edges", [
            { id: "m", label: "Matrix", color: C_RED, items: ["25 cells", "mostly zero", "O(V^2) memory"] },
            { id: "l", label: "List", color: C_GREEN, items: ["5 short rows", "8 entries total", "O(V + E) memory"] },
          ]),
          table(
            "Adjacency list vs adjacency matrix",
            ["Adjacency list", "Adjacency matrix"],
            [
              ["Space", "O(V + E)", "O(V^2)"],
              ["\"Is there an edge u-v?\"", "O(degree)", "O(1)"],
              ["Iterate a vertex's neighbours", "O(degree)", "O(V)"],
              ["Add an edge", "O(1)", "O(1)"],
              ["Best for", "sparse graphs, BFS/DFS/Dijkstra", "dense graphs, Floyd-Warshall"],
            ],
            { rowLabelHeader: "Operation" },
          ),
          callout(
            "tip",
            "Unless you know the graph is dense, or you need `O(1)` edge-existence checks, use an adjacency list.",
          ),
          quiz(
            "A social graph has 10^9 users averaging 200 friends. Which representation is feasible?",
            ["Adjacency matrix", "Adjacency list", "Both work fine", "Neither"],
            1,
            "A matrix would need 10^18 cells; the list needs about 2 * 10^11 entries.",
          ),
        ],
        challenge: {
          title: "Build an adjacency list",
          description:
            "Fill `buildAdj` for an UNDIRECTED graph: for each edge (u, v), record v in adj[u] and u in adj[v].",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> buildAdj(int n, const vector<pair<int,int>>& edges) {
    vector<vector<int>> adj(n);
    // TODO: for each edge, push both directions
    return adj;
}

int main() {
    vector<pair<int,int>> edges = {{0,1},{0,2},{1,2},{2,3},{3,4}};
    vector<vector<int>> adj = buildAdj(5, edges);
    cout << adj[2].size() << endl; // 3
    cout << adj[0].size() << endl; // 2
    cout << adj[4].size() << endl; // 1
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> buildAdj(int n, const vector<pair<int,int>>& edges) {
    vector<vector<int>> adj(n);
    for (size_t i = 0; i < edges.size(); i++) {
        int u = edges[i].first;
        int v = edges[i].second;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    return adj;
}

int main() {
    vector<pair<int,int>> edges = {{0,1},{0,2},{1,2},{2,3},{3,4}};
    vector<vector<int>> adj = buildAdj(5, edges);
    cout << adj[2].size() << endl; // 3
    cout << adj[0].size() << endl; // 2
    cout << adj[4].size() << endl; // 1
    return 0;
}`,
          tests: [
            { id: 1, label: "Records the forward direction", keywords: [{ pattern: "adj\\[u\\].push_back\\(v\\)" }], hint: "adj[u].push_back(v)." },
            { id: 2, label: "Records the reverse direction", keywords: [{ pattern: "adj\\[v\\].push_back\\(u\\)" }], hint: "Undirected: also adj[v].push_back(u)." },
            { id: 3, label: "Iterates the edge list", keywords: [{ pattern: "edges\\[i\\]" }], hint: "Use .first and .second of each pair." },
          ],
        },
      },
      {
        id: "cpp-ds-7-2",
        title: "Traversal: BFS and DFS",
        xp: 16,
        chapterTitle: "Graphs",
        theory: [
          objectives([
            "Contrast BFS (queue) and DFS (stack / recursion)",
            "State what each traversal computes and its complexity",
            "Explain why you mark a node visited when you enqueue it",
          ]),
          text(
            "Both visit every reachable vertex once, in `O(|V| + |E|)` on an adjacency list. They differ only by the container holding the frontier:\n\n- **BFS** - a **queue** (FIFO). Explores in rings of increasing distance. Gives the **shortest path in an unweighted graph** (fewest edges), plus connected components and bipartite checks.\n- **DFS** - a **stack** (explicit, or the call stack via recursion). Plunges down one path, then backtracks. Powers cycle detection, topological sort, strongly connected components, and maze / backtracking problems.",
            {
              label: "BFS with a queue",
              content: `#include <queue>
#include <vector>
using namespace std;

vector<int> bfs(const vector<vector<int>>& adj, int src) {
    vector<int> dist(adj.size(), -1);
    queue<int> q;
    dist[src] = 0;
    q.push(src);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {      // first time seen
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}`,
            },
          ),
          text(
            "Key detail: mark a node **visited when you push it onto the frontier**, not when you pop it - otherwise it can be enqueued many times before it is first processed.",
          ),
          table(
            "BFS vs DFS",
            ["BFS", "DFS"],
            [
              ["Frontier held in", "a queue (FIFO)", "a stack / recursion (LIFO)"],
              ["Explores", "in rings of equal distance", "one path to the end, then backtracks"],
              ["Extra space", "O(width) of the graph", "O(depth) of the graph"],
              ["Signature use", "shortest path in edges", "cycle detection, topological sort, SCC"],
            ],
            { rowLabelHeader: "Aspect", footnote: "Both are O(V + E) on an adjacency list and visit each vertex once." },
          ),
          callout(
            "warning",
            "Recursive DFS on a graph with a long path can overflow the call stack (roughly 10^4 - 10^5 deep). Use an explicit stack for large graphs.",
          ),
          quiz(
            "Which traversal finds the minimum number of edges between two nodes in an unweighted graph?",
            ["DFS", "BFS", "Either one", "Neither"],
            1,
            "BFS visits nodes in nondecreasing distance order, so the first time it reaches the target is via a shortest path.",
          ),
        ],
        challenge: {
          title: "BFS reachability",
          description:
            "Return true iff `target` is reachable from `start` in the adjacency list, using a queue and a visited array.",
          starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

bool reachable(const vector<vector<int>>& adj, int start, int target) {
    // TODO: BFS from start; return true if you dequeue target
    return false;
}

int main() {
    vector<vector<int>> adj = {
        {1, 2}, {0, 3}, {0}, {1, 4}, {3}, {6}, {5}
    };
    cout << reachable(adj, 0, 4) << endl; // 1
    cout << reachable(adj, 0, 5) << endl; // 0
    cout << reachable(adj, 5, 6) << endl; // 1
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

bool reachable(const vector<vector<int>>& adj, int start, int target) {
    if (start == target) return true;
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (v == target) return true;
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
    return false;
}

int main() {
    vector<vector<int>> adj = {
        {1, 2}, {0, 3}, {0}, {1, 4}, {3}, {6}, {5}
    };
    cout << reachable(adj, 0, 4) << endl; // 1
    cout << reachable(adj, 0, 5) << endl; // 0
    cout << reachable(adj, 5, 6) << endl; // 1
    return 0;
}`,
          tests: [
            { id: 1, label: "Uses a queue for the frontier", keywords: [{ pattern: "queue<int>" }], hint: "queue<int> q;" },
            { id: 2, label: "Tracks visited nodes", keywords: [{ pattern: "visited" }], hint: "vector<bool> visited(adj.size())." },
            { id: 3, label: "Pushes neighbours", keywords: [{ pattern: "q.push\\(" }], hint: "Enqueue each unvisited neighbour." },
          ],
        },
      },
      {
        id: "cpp-ds-7-3",
        title: "Adding weights: from BFS to Dijkstra",
        xp: 12,
        chapterTitle: "Graphs",
        theory: [
          objectives([
            "Explain why BFS fails on weighted graphs",
            "Describe Dijkstra as BFS with a min-heap and edge relaxation",
            "Name the algorithm to reach for when Dijkstra's assumptions break",
          ]),
          text(
            "BFS assumes every edge costs 1, so the fewest-edges path may not be the cheapest once weights differ. **Dijkstra's algorithm** replaces BFS's plain queue with a **min-heap / priority queue** keyed by distance-so-far:\n\n- start: `dist[src] = 0`, all others infinity, push (0, src)\n- repeatedly pop the closest unfinished vertex and **relax** each outgoing edge: if `dist[u] + w < dist[v]`, update `dist[v]` and push (dist[v], v)\n- `O((|V| + |E|) log |V|)` with a binary heap",
          ),
          text(
            "Requirements and relatives:\n\n- Dijkstra needs **non-negative** weights. Negative edges -> **Bellman-Ford**, `O(|V| * |E|)`.\n- all-pairs shortest paths -> **Floyd-Warshall**, `O(|V|^3)`, matrix-friendly\n- minimum spanning tree -> **Prim** (heap, like Dijkstra) or **Kruskal** (sort edges + **union-find**)\n- shortest/longest path on a DAG -> topological order + one relax pass, `O(|V| + |E|)`",
          ),
          table(
            "Pick the path algorithm by the graph you have",
            ["Solves", "Needs", "Time", "Key structure"],
            [
              ["BFS", "shortest path, unweighted", "-", "O(V + E)", "queue"],
              ["Dijkstra", "shortest path, 1 source", "weights >= 0", "O((V + E) log V)", "min-heap"],
              ["Bellman-Ford", "shortest path, 1 source", "any weights", "O(V * E)", "edge list"],
              ["Floyd-Warshall", "shortest path, all pairs", "any weights", "O(V^3)", "matrix"],
              ["Topological + relax", "shortest / longest on a DAG", "acyclic", "O(V + E)", "queue / stack"],
              ["Kruskal / Prim", "minimum spanning tree", "undirected", "O(E log V)", "union-find / min-heap"],
            ],
            { rowLabelHeader: "Algorithm" },
          ),
          callout(
            "info",
            "Dijkstra *is* BFS when every weight is 1 - the priority queue just degenerates into a plain queue.",
          ),
          text(
            "Where to go next: union-find (disjoint set) for connectivity and Kruskal; Fenwick / segment trees for range queries; tries for string keys; A* for heuristic-guided shortest path.",
          ),
          quiz(
            "Dijkstra swaps BFS's plain queue for a:",
            ["Stack", "Min-priority-queue keyed by distance", "Hash table", "Deque"],
            1,
            "Always expanding the closest known vertex is what makes the greedy choice correct for non-negative weights.",
          ),
        ],
      },
    ],
  },
  {
    id: "compression",
    title: "Data Compression & Huffman Encoding",
    icon: "🗜️",
    color: ACCENT,
    lessons: [
      {
        id: "cpp-ds-8-0",
        title: "Why compression works: redundancy and entropy",
        xp: 12,
        chapterTitle: "Data Compression & Huffman Encoding",
        theory: [
          objectives([
            "Explain compression as removing statistical redundancy",
            "Define entropy as the lower bound on lossless size",
            "Distinguish lossless from lossy and know when each is acceptable",
          ]),
          text(
            "Real data is **redundant** - some bytes are far more common than others, sequences repeat, neighbouring values are close. Compression re-encodes the data so likely things take fewer bits and unlikely things take more, for a smaller total.",
          ),
          text(
            "**Entropy** (Shannon) is the average information per symbol, `H = -sum p(s) * log2 p(s)` bits. It is the hard floor: no lossless coder can average fewer than `H` bits per symbol. English text is around 4 - 4.5 bits/char of entropy versus 8 bits/char stored, so roughly 2x is free. Data that is already random (encrypted, or already compressed) has `H` near 8 and will not shrink.",
          ),
          text(
            "**Lossless** (ZIP, PNG, FLAC, gzip) - decompresses to the exact original bytes; required for text, code, archives. **Lossy** (JPEG, MP3, H.264) - discards detail humans barely perceive for much higher ratios; fine for photos, audio and video, never for a spreadsheet.",
          ),
          callout(
            "info",
            "Most real codecs are **two stages**: a *model / transform* that exposes redundancy (RLE, an LZ dictionary, a delta filter, the DCT) followed by an *entropy coder* (Huffman or arithmetic / range coding) that cashes in the skewed probabilities.",
          ),
          diagram("Compression pipeline", [
            { id: "model", label: "1. Model / transform", color: C_SKY, items: ["expose repetition & structure", "RLE, LZ, delta, DCT"] },
            { id: "entropy", label: "2. Entropy coder", color: ACCENT, items: ["short codes for frequent symbols", "Huffman / arithmetic"] },
          ]),
          quiz(
            "What is the theoretical lower bound on lossless bits per symbol?",
            ["0", "1 bit", "The source's entropy H", "8 bits"],
            2,
            "Shannon's source coding theorem: you cannot beat the entropy of the source without losing information.",
          ),
        ],
      },
      {
        id: "cpp-ds-8-1",
        title: "Core techniques: RLE, dictionary, delta",
        xp: 16,
        chapterTitle: "Data Compression & Huffman Encoding",
        theory: [
          objectives([
            "Describe run-length, dictionary (LZ), and delta coding",
            "Match each technique to the data shape it suits",
            "See how these front-ends feed an entropy coder",
          ]),
          text(
            "**Run-length encoding (RLE)** - replace a run of one value with (value, count). `AAAAABBB` -> `A5B3`. Brilliant on data with long runs (bitmap masks, fax, simple graphics); it *expands* data with no runs, so real formats apply it selectively.",
          ),
          text(
            "**Dictionary / LZ family** - replace a repeated sequence with a reference to its earlier occurrence.\n\n- **LZ77** (gzip, zip, PNG): emit `(distance back, length, next literal)` over a sliding window\n- **LZ78 / LZW** (GIF, old `compress`): build an explicit dictionary of seen strings, emit dictionary indices",
          ),
          text(
            "**Delta / predictive coding** - store the *difference* from a prediction (the previous sample, the pixel to the left, the previous video frame). Smoothly varying data becomes small numbers clustered near zero, which the entropy stage then crushes. **BWT + move-to-front** (bzip2) is a reversible reordering that groups similar contexts so RLE and entropy do better.",
          ),
          diagram("Technique -> data it suits", [
            { id: "rle", label: "RLE", color: C_GREEN, items: ["long runs of one value"] },
            { id: "lz", label: "LZ dictionary", color: C_SKY, items: ["repeated substrings anywhere"] },
            { id: "delta", label: "Delta", color: C_AMBER, items: ["smooth series: audio, sensors, images"] },
          ]),
          table(
            "Which technique for which data",
            ["Turns this...", "...into this", "Seen in"],
            [
              ["RLE", "long runs of one value", "(value, count) pairs", "fax, PCX, PackBits"],
              ["LZ77", "any repeated substring", "(distance, length, literal)", "gzip, zip, PNG"],
              ["LZ78 / LZW", "repeated substrings", "dictionary indices", "GIF, TIFF, old compress"],
              ["Delta", "smooth series", "small values near zero", "audio (FLAC), sensor logs, video"],
              ["BWT + MTF", "text with local structure", "runs the entropy stage loves", "bzip2"],
            ],
            { rowLabelHeader: "Technique" },
          ),
          callout(
            "tip",
            "These are *front-ends*. Their job is to hand a skewed symbol distribution to Huffman or arithmetic coding, which does the actual bit-shaving.",
          ),
          quiz(
            "`WWWWWWWWWWWWBWWWWWW` compresses well under which technique?",
            ["Delta coding", "Run-length encoding", "It cannot be compressed", "Double hashing"],
            1,
            "Two long runs of W around a single B: RLE turns 19 chars into three (value, count) pairs.",
          ),
        ],
        challenge: {
          title: "Run-length encoding",
          description:
            "Implement `rleEncode` (\"aaabbc\" -> \"a3b2c1\") and `rleDecode` (\"a3b2c1\" -> \"aaabbc\"); counts are single digits.",
          starterCode: `#include <iostream>
#include <string>
using namespace std;

string rleEncode(const string& s) {
    // TODO: for each run of equal chars, append char then its count
    return "";
}
string rleDecode(const string& s) {
    // TODO: read (char, digit) pairs, repeat char digit times
    return "";
}

int main() {
    cout << rleEncode("aaabbc") << endl;              // a3b2c1
    cout << rleDecode("a3b2c1") << endl;              // aaabbc
    cout << rleDecode(rleEncode("wwwww")) << endl;    // wwwww
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

string rleEncode(const string& s) {
    string out;
    for (size_t i = 0; i < s.size(); ) {
        size_t j = i;
        int count = 0;
        while (j < s.size() && s[j] == s[i]) { j++; count++; }
        out += s[i];
        out += to_string(count);
        i = j;
    }
    return out;
}
string rleDecode(const string& s) {
    string out;
    for (size_t i = 0; i + 1 < s.size(); i += 2) {
        char c = s[i];
        int count = s[i + 1] - '0';
        for (int k = 0; k < count; k++) out += c;
    }
    return out;
}

int main() {
    cout << rleEncode("aaabbc") << endl;              // a3b2c1
    cout << rleDecode("a3b2c1") << endl;              // aaabbc
    cout << rleDecode(rleEncode("wwwww")) << endl;    // wwwww
    return 0;
}`,
          tests: [
            { id: 1, label: "Encoder writes the run length", keywords: [{ pattern: "to_string" }], hint: "Append to_string(count) after the char." },
            { id: 2, label: "Encoder counts consecutive equal chars", keywords: [{ pattern: "count" }], hint: "Advance while s[j] == s[i]." },
            { id: 3, label: "Decoder turns a digit char into a number", keywords: [{ pattern: "- '0'" }], hint: "s[i + 1] - '0' is the repeat count." },
          ],
        },
      },
      {
        id: "cpp-ds-8-2",
        title: "Huffman encoding: optimal prefix codes with a min-heap",
        xp: 18,
        chapterTitle: "Data Compression & Huffman Encoding",
        theory: [
          objectives([
            "Build a Huffman tree from symbol frequencies using a min-heap",
            "Explain the prefix property and why it enables unambiguous decoding",
            "Argue informally why the greedy merge is optimal",
          ]),
          text(
            "**Huffman coding** assigns each symbol a variable-length **bit** code so frequent symbols get short codes. It produces an **optimal prefix code** - no code is a prefix of another, so a decoder never needs lookahead or delimiters.",
          ),
          text(
            "The algorithm is a greedy merge driven by a **min-heap** (Chapter 7):\n\n1. Make a leaf node for each symbol with its frequency; push all leaves into a min-heap keyed by frequency.\n2. While the heap has more than one node: **pop the two smallest**, make a new internal node whose frequency is their sum and whose children are those two, **push it back**.\n3. The last node left is the **root**. The path to each leaf (left = 0, right = 1) is that symbol's code.",
            {
              label: "The merge loop",
              content: `#include <queue>
#include <vector>
using namespace std;

struct HNode { int freq; HNode* l; HNode* r; };
struct Cmp { bool operator()(HNode* a, HNode* b) const { return a->freq > b->freq; } };

priority_queue<HNode*, vector<HNode*>, Cmp> pq;   // min-heap by freq
// ... push one leaf per symbol ...
while (pq.size() > 1) {
    HNode* a = pq.top(); pq.pop();
    HNode* b = pq.top(); pq.pop();
    pq.push(new HNode{a->freq + b->freq, a, b});
}
HNode* root = pq.top();`,
            },
          ),
          diagram("Merge order for A:5 B:2 C:1 D:1", [
            { id: "s1", label: "Step 1", color: C_SKY, items: ["pop C(1), D(1) -> node(2)"] },
            { id: "s2", label: "Step 2", color: C_SKY, items: ["pop node(2), B(2) -> node(4)"] },
            { id: "s3", label: "Step 3", color: C_SKY, items: ["pop node(4), A(5) -> root(9)"] },
            { id: "codes", label: "Codes", color: C_GREEN, items: ["A=0  B=10  C=110  D=111"] },
          ]),
          text(
            "**Why greedy is optimal**: the two least-frequent symbols can always be made the deepest siblings without increasing total cost (an exchange argument); merging them into one super-symbol reduces the problem to n - 1 symbols, and induction finishes it. The total encoded size is `sum freq(s) * depth(s)`, which Huffman minimises; it lands within 1 bit/symbol of entropy. **Arithmetic / range coding** closes that last gap by not rounding to whole bits.",
          ),
          table(
            "The finished code table for A:5 B:2 C:1 D:1",
            ["Frequency", "Huffman code", "Code length", "Bits contributed"],
            [
              ["A", "5", "0", "1", "5"],
              ["B", "2", "10", "2", "4"],
              ["C", "1", "110", "3", "3"],
              ["D", "1", "111", "3", "3"],
              ["Total (9 symbols)", "9", "-", "-", "15 bits"],
            ],
            { rowLabelHeader: "Symbol", highlightRows: [4], footnote: "A fixed-width 2-bit code would need 9 x 2 = 18 bits. Huffman spends 15 - and no code is a prefix of another, so decoding is unambiguous." },
          ),
          callout(
            "info",
            "The decoder needs the same tree - real formats store the code lengths in a header (**canonical Huffman**) or rebuild them adaptively. DEFLATE (zip / gzip) is LZ77 **then** Huffman.",
          ),
          quiz(
            "Repeatedly taking the two lowest-frequency nodes and reinserting their combined node is done efficiently with which structure?",
            ["A stack", "A min-heap / priority queue", "A hash table", "A plain array, rescanned each time"],
            1,
            "Each of the k - 1 merges is two pops and one push, O(log k) apiece.",
          ),
        ],
        challenge: {
          title: "Huffman code length",
          description:
            "Return the minimum total bits to Huffman-encode symbols with these frequencies: repeatedly pop the two smallest, add their sum to the answer, and push the sum back.",
          starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

long long huffmanBits(const vector<int>& freq) {
    // TODO: min-heap of frequencies; while size > 1, pop 2, bits += a + b, push a + b
    return 0;
}

int main() {
    cout << huffmanBits({5, 2, 1, 1}) << endl; // 15
    cout << huffmanBits({10}) << endl;         // 0
    cout << huffmanBits({1, 1, 1, 1}) << endl; // 8
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

long long huffmanBits(const vector<int>& freq) {
    priority_queue<long long, vector<long long>, greater<long long>> pq;
    for (int f : freq) pq.push(f);
    long long bits = 0;
    while (pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        bits += a + b;
        pq.push(a + b);
    }
    return bits;
}

int main() {
    cout << huffmanBits({5, 2, 1, 1}) << endl; // 15
    cout << huffmanBits({10}) << endl;         // 0
    cout << huffmanBits({1, 1, 1, 1}) << endl; // 8
    return 0;
}`,
          tests: [
            { id: 1, label: "Uses a priority queue", keywords: [{ pattern: "priority_queue" }], hint: "priority_queue<long long, vector<long long>, greater<long long>>." },
            { id: 2, label: "Makes it a min-heap", keywords: [{ pattern: "greater<" }], hint: "greater<> flips the default max-heap." },
            { id: 3, label: "Accumulates each merged weight", keywords: [{ pattern: "bits \\+=" }], hint: "bits += a + b on every merge." },
          ],
        },
      },
      {
        id: "cpp-ds-8-3",
        title: "Decoding, and the whole toolbox in one algorithm",
        xp: 12,
        chapterTitle: "Data Compression & Huffman Encoding",
        theory: [
          objectives([
            "Describe Huffman decoding as a bit-driven tree walk",
            "Identify every course structure that appears inside Huffman coding",
            "State the time and space complexity of the full pipeline",
          ]),
          text(
            "**Decoding Huffman**: start at the root, read one bit at a time, go left on 0 and right on 1; on reaching a leaf, emit that symbol and jump back to the root. `O(total bits)`. Faster decoders use a lookup table indexed by the next `k` bits.",
          ),
          text(
            "Huffman coding is a tour of the whole course:\n\n- a **hash map** counts symbol frequencies in one `O(n)` pass\n- a **min-heap** yields the two rarest nodes in `O(log k)` each\n- a **binary tree** encodes the prefix code; the **path** to a leaf (a walk, like tree traversal) is the codeword\n- an array-backed **bitstream** is the output\n- decoding is tree traversal driven by input bits",
          ),
          text(
            "Complexity: counting `O(n)`; building the tree `O(k log k)` for `k` distinct symbols; encoding `O(n)`; decoding `O(output bits)`. Space `O(k)` for the tree.",
          ),
          diagram("Encode / decode round trip", [
            { id: "enc", label: "Encode", color: C_SKY, items: ["count -> heap -> tree -> code table", "replace each symbol with its bits"] },
            { id: "dec", label: "Decode", color: C_GREEN, items: ["walk the tree bit by bit", "leaf -> emit symbol, back to root"] },
          ]),
          callout(
            "success",
            "If you followed the hashing, heap and tree chapters, you can now read the source of gzip's Huffman stage and recognise every moving part.",
          ),
          quiz(
            "During Huffman decoding, what do you do on reaching a leaf?",
            [
              "Stop decoding entirely",
              "Emit that leaf's symbol and return to the root",
              "Go back up one level",
              "Read 8 more bits",
            ],
            1,
            "Each root-to-leaf walk decodes exactly one symbol; then you restart at the root for the next.",
          ),
        ],
      },
    ],
  },
];

export const CPP_DATA_STRUCTURES_CHAPTERS = RAW_CPP_DATA_STRUCTURES_CHAPTERS;

export const CPP_DATA_STRUCTURES_LESSONS = applyLessonVideoLinks(
  CPP_DATA_STRUCTURES_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  CPP_DATA_STRUCTURES_VIDEO_LINKS,
);

export const CPP_DATA_STRUCTURES_TOTAL_XP = CPP_DATA_STRUCTURES_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);
