---
name: aaa-code-review
description: Run a read-only simplicity and ownership challenge at a material phase boundary, package gate, or when scope, production code, or repair loops are growing. Do not invoke after every trivial edit and do not treat it as a full correctness or security audit.
license: MIT
metadata:
  version: "0.2.0"
  author: FYN Labs
---

# AAA Code Review

Challenge a frozen change and its evidence for avoidable mechanism while
preserving required behavior and safety. Review read-only unless the user
explicitly authorizes fixes.

Use this review:

- at a material phase or package boundary;
- before accepting a cross-component architecture block;
- when scope, production code, owner count, state, or repair loops grow;
- when explicitly asked for a simplicity or overengineering review.

Do not run it after every small edit. It is a bounded challenge, not a
continuous management layer.

## Review sequence

1. Restate the original problem and acceptance criteria.
2. Identify the current end-to-end path and every new owner, file, dependency,
   hook, store, state, queue, validator, and approval surface.
3. Re-run the AAA Code decision ladder against repository evidence.
4. Check whether the change repairs the root cause or builds around a prior
   workaround.
5. Identify the evidence layer actually exercised. For material behavior, check
   the real entry point, success path, relevant failure path, and final
   integrated state. A harness that bypasses the changed boundary is not proof.
6. Protect the safety floor: security, validation, data-loss handling,
   accessibility, privacy, explicit requirements, and risk-proportionate tests.
7. Recommend the smallest complete path, including what can be deleted.

## Finding tags

Use one primary tag per finding:

- **DELETE:** behavior or mechanism does not need to exist.
- **REUSE:** an existing owner already fits.
- **NATIVE:** the framework, runtime, agent, platform, or configuration owns it.
- **YAGNI:** the change prepares for an unrequested hypothetical future.
- **SHRINK:** the owner is correct but the implementation can be materially smaller.
- **KEEP:** the mechanism is necessary and proportionate.

Rank actionable findings P0, P1, or P2. Mark material claims as `FACT` with
source evidence, `INFERENCE` with its supporting source, or `HYPOTHESIS` when
evidence is absent. A filename or repository shape alone is not proof. Give the
concrete cost of the mechanism and the smallest safe fix. Do not score style
preferences as architecture findings.

## Verdict

Return:

```text
AAA Code Review: PASS | REVISE | STOP_AND_REFRAME
Original problem fit:
Native owner:
Mechanism delta: owners/files/dependencies/hooks/states added or removed
Evidence layer: source/unit/integration/runtime/package/release
Reviewer relationship: author self-review | independent
Findings:
Protected safety checks:
Smallest complete path:
Residual verification:
```

`PASS` means the solution is already the smallest complete path, not merely
that tests pass. `STOP_AND_REFRAME` means another expansion should not begin
until the meta-cause is resolved. A material change expires the verdict.

An author's self-review is useful evidence but not independent approval. When a
project requires an independent gate, use a reviewer independent of the author,
operating in a fresh context against the same frozen diff and evidence. This
verdict does not grant merge, deploy, publish, spend, release, or
future-autonomy authority.

This is not a substitute for a full correctness, security, performance, or
release audit. If the review discovers a possible safety regression, flag it as
P0 and stop simplification until the owning audit verifies it.
