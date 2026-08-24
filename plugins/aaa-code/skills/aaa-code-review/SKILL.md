---
name: aaa-code-review
description: Run a read-only simplicity and ownership challenge at a material phase boundary, package gate, or when scope, production code, or repair loops are growing. Do not invoke after every trivial edit and do not treat it as a full correctness or security audit.
license: MIT
metadata:
  version: "0.1.0"
  author: FYN Labs
---

# AAA Code Review

Challenge a frozen change for avoidable mechanism while preserving required
behavior and safety. Review read-only unless the user explicitly authorizes
fixes.

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
5. Protect the safety floor: security, validation, data-loss handling,
   accessibility, privacy, explicit requirements, and risk-proportionate tests.
6. Recommend the smallest complete path, including what can be deleted.

## Finding tags

Use one primary tag per finding:

- **DELETE:** behavior or mechanism does not need to exist.
- **REUSE:** an existing owner already fits.
- **NATIVE:** the framework, runtime, agent, platform, or configuration owns it.
- **YAGNI:** the change prepares for an unrequested hypothetical future.
- **SHRINK:** the owner is correct but the implementation can be materially smaller.
- **KEEP:** the mechanism is necessary and proportionate.

Rank actionable findings P0, P1, or P2. Give file and line evidence when source
is available, the concrete cost of the mechanism, and the smallest safe fix.
Do not score style preferences as architecture findings.

## Verdict

Return:

```text
AAA Code Review: PASS | REVISE | STOP_AND_REFRAME
Original problem fit:
Native owner:
Mechanism delta: owners/files/dependencies/hooks/states added or removed
Findings:
Protected safety checks:
Smallest complete path:
Residual verification:
```

`PASS` means the solution is already the smallest complete path, not merely
that tests pass. `STOP_AND_REFRAME` means another expansion should not begin
until the meta-cause is resolved.

This is not a substitute for a full correctness, security, performance, or
release audit. If the review discovers a possible safety regression, flag it as
P0 and stop simplification until the owning audit verifies it.
