---
name: aaa-code
description: Implementation doctrine for changing an existing codebase: one owner, one complete path, no unnecessary machinery. Use whenever you write, fix, refactor, or test code, especially the moment before you add a new file, class, helper, wrapper, manager, store, queue, cache, validator, adapter, hook, dependency, or background job, or when a small fix keeps growing.
license: MIT
metadata:
  version: "0.4.0"
  author: FYN Labs
---

# AAA Code

**One owner. One complete path. No mechanism the requested behavior does not need.**

1. Write the problem in one sentence. Solve that sentence, nothing wider.
2. The owner of a behavior is the one unit that already changes for that reason. Change it there, even when inconvenient. If the framework or configuration already does it, the framework is the owner.
3. Before creating anything, stop at the first rung that fully solves the sentence: does it need to exist? can the owner be extended? can the framework or configuration do it? can the standard library or an installed dependency do it? can a deletion or one targeted change do it? Only then build, at the owner.
4. Do not add a helper, wrapper, manager, store, queue, cache, adapter, hook, dependency, background job, or state machine to avoid touching the owner.
5. Complete means: reachable from the real entry point, every existing caller still works, the first failure a user would hit is handled, and you ran it at least once. Smaller than complete is not simpler; it is unfinished.
6. Never make something smaller by removing authentication, authorization, validation at a trust boundary, error handling, data-loss protection, or a required test.
7. Prove the change through its real entry point: the success path and one failure path. Name the command you ran, the layer it covers (static, unit, integrated, release), and what is still unverified.
8. A change is material when it adds or removes an owner, a dependency, persistent state, or a cross-component path, or touches authentication, money, data loss, or rollback. Everything else is trivial: verify it and move on.
9. At a material boundary, stop before the next expansion and ask whether you are still solving the sentence from line 1, and what can disappear. Not after every small edit.
10. Research is not permission. Never install, buy, push, publish, or send data outside the repository without an explicit grant.
11. Report: owner reused, mechanism avoided, files changed, check run, still unverified.

Aligned to the one-sentence problem. Autonomous inside the granted scope. Auditable by a real check.

## Safety floor

Never simplify away:

- authentication, authorization, trust boundaries, or required validation;
- data-loss prevention, rollback, idempotency, or required error handling;
- accessibility, privacy, legal, or regulated-data obligations;
- explicit acceptance criteria or risk-proportionate tests;
- observability needed to prove a material runtime path.

If the smaller solution weakens one of these, it is not complete.

## Example

Request: add CSV receipts. The repository already has `ReceiptWriter` and a formatter registry. A proposal adds `CsvManager`, `ExportQueue`, and `ReceiptStore`: three new owners and one new persisted state for a request that asks for a format.

Smallest complete path: register a `csv` formatter in the existing registry; `ReceiptWriter` already owns writing. Evidence: `grep -ri csv src/` finds no formatter, and `src/formatters/index.ts` registers formatters by name. Check: one good row, one malformed row, then the real export command.

Counter-example: a retry count changed from 2 to 3 in configuration adds no owner, state, or dependency. Run the test that reads the value and stop. No review.

## Work loop

1. **Frame:** the one-sentence problem, the smallest acceptable outcome, and the check that will prove it.
2. **Orient:** read the repository rules, then the owner, its callers, its tests, and the lockfile. For a bug, find the root cause first. For a rename, move, or migration, find every direct, transitive, and dynamic reference first.
3. **Place:** put the change in the owner. Keep generic layers generic; repair data lost at a boundary at that boundary.
4. **Edit:** make the narrow change. Preserve unrelated behavior, formatting, and worktree changes. Never discard work you did not create.
5. **Verify:** line 7, on the final integrated state. A harness that bypasses the changed boundary is not proof. A rung is disproven only by a named search, file, or package check you can quote, never by failing to look.

Default authority is to read and edit tracked files in this repository and run its existing checks. Ask when a choice would change behavior, ownership, authority, data exposure, cost, or rollout risk. For an explicit challenge at a material boundary, use the `aaa-code-review` skill by whatever means your host invokes a skill.

## Completion report

```text
Owner reused:
Mechanism avoided or removed: what, and the rung that ruled it out
Files changed:
Ladder evidence for anything created: the search, framework check, or lockfile check, one line each
Check run: exact command and result, or NO CHECK EXECUTED THE CHANGE
Evidence layer: static | unit | integrated | release
Still unverified:
```
