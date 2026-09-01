---
name: aaa-code-review
description: Read-only overengineering and ownership review of a finished change. Use when someone asks whether a change is too complex, has too many layers, files, or abstractions, whether a new queue, store, manager, adapter, or dependency should stay, or before a merge or package gate after scope grew beyond the original ask. Not after every edit; not a correctness or security audit.
license: MIT
metadata:
  version: "0.4.0"
  author: FYN Labs
---

# AAA Code Review

Challenge a frozen change for mechanism the requested behavior does not need, while protecting required behavior and the safety floor. Read-only: recommend, do not edit, unless the user explicitly authorizes fixes.

Use it at a material boundary (the change added or removed an owner, a dependency, persistent state, or a cross-component path), when owners, files, state, or repair loops keep growing, or when asked for a simplicity or overengineering review. Not after every small edit; not a correctness, security, performance, or release audit.

## Sequence

1. Restate the original problem in one sentence, with its acceptance criteria.
2. Inventory the end-to-end path and every owner, file, dependency, hook, store, state, queue, validator, and approval surface the change added.
3. Walk the AAA Code ladder against repository evidence: for each added mechanism, name the rung that would have removed it, or the quoted evidence that none does.
4. Check whether the change repairs the root cause or builds around an earlier workaround.
5. Name the evidence layer actually exercised; for material behavior require the real entry point, success path, and first failure path on the integrated state. A harness that bypasses the changed boundary is not proof.
6. Protect the safety floor. A possible safety regression is P0: stop simplification until the owning audit verifies it.
7. Recommend the smallest complete path, including what to delete.

## Findings

One primary tag per finding:

- **DELETE:** the behavior or mechanism does not need to exist.
- **REUSE:** an existing owner already fits.
- **NATIVE:** the framework, runtime, platform, or configuration owns it.
- **YAGNI:** it prepares for an unrequested future.
- **SHRINK:** right owner, materially smaller implementation possible.
- **KEEP:** necessary and proportionate.

Rank P0, P1, P2. Label each material claim FACT (quoted source), INFERENCE (source plus reasoning), or HYPOTHESIS (no evidence). A filename or repository shape alone is not proof. State the concrete cost of the mechanism and the smallest safe fix. Style preferences are not findings.

## Verdict

```text
AAA Code Review: PASS | REVISE | STOP_AND_REFRAME
Original problem:
Owner:
Mechanism delta: owners / files / dependencies / states added or removed
Evidence layer: static | unit | integrated | release
Reviewer relationship: author self-review | independent
Findings: tag, rank, FACT | INFERENCE | HYPOTHESIS
Smallest complete path:
Residual verification:
```

PASS: already the smallest complete path, not merely green tests. REVISE: an accepted material finding or an open P0/P1; a deferred P0/P1 counts as open. STOP_AND_REFRAME: another expansion must not begin until the meta-cause is resolved. A material change expires the verdict.

```text
AAA Code Review: REVISE
Original problem: export receipts as CSV.
Owner: formatter registry and ReceiptWriter.
Mechanism delta: +3 owners (CsvManager, ExportQueue, ReceiptStore), +1 persisted state.
Evidence layer: unit; the export command was not run.
Reviewer relationship: independent.
Findings: DELETE P1 ExportQueue, nothing in the request is asynchronous (FACT: request text). REUSE P1 CsvManager becomes a csv formatter (FACT: src/formatters/index.ts registers formatters by name). DELETE P2 ReceiptStore, the caller already persists receipts (INFERENCE: OrderService.finalize).
Smallest complete path: one formatter, one registry entry, writer test with one good and one malformed row, run the export command.
Residual verification: bin/export --format csv on the integrated state.
```

## Boundary

A diff produced in this session, or by an agent whose output you can see, is author self-review, whatever the skill boundary or context reset; self-review is evidence, not independent approval. A REVISE or STOP_AND_REFRAME verdict is a report, not a work order: apply its findings only when the user, after seeing the verdict, asks for fixes. The verdict grants no merge, deploy, publish, spend, or release authority. A required multi-reviewer gate follows the project's own contract; this skill does not perform it.
