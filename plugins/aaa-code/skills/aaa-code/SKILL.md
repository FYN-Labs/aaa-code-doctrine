---
name: aaa-code
description: Choose the smallest complete change at the correct native owner when writing, editing, debugging, testing, or refactoring code. Use for implementation work, placement decisions, duplicate cleanup, and scope control; keep security and explicit requirements intact.
license: MIT
metadata:
  version: "0.1.0"
  author: FYN Labs
---

# AAA Code

AAA Code means **Aligned, Autonomous, Auditable**:

- **Aligned:** solve the original problem at its existing native owner.
- **Autonomous:** make the maximum safe progress without inventing approval or
  coordination machinery.
- **Auditable:** keep the path small, explicit, and proven by a real check.

Simple is not the fewest characters. It is one clear owner, one complete path,
and no mechanism that the requested behavior does not need.

## Decision ladder

Before adding code, walk the ladder in order and stop at the first complete
solution:

1. **Need:** Does this behavior or artifact need to exist at all?
2. **Reuse:** Does the repository already implement it or have a clear owner
   that can be repaired or extended?
3. **Native:** Can the framework, runtime, agent, platform, protocol, or
   configuration already do it?
4. **Available:** Can the standard library or an already-installed dependency
   do it without adding another owner?
5. **Reduce:** Can deletion, configuration, one targeted change, or removal of
   a workaround solve it?
6. **Create:** Otherwise implement the smallest complete solution at the
   correct owner, including its wiring and proportionate verification.

Do not create a helper, wrapper, manager, store, queue, cache, validator,
broker, plugin, hook, dependency, background job, or state machine until the
earlier rungs have been disproven by repository evidence.

## Work loop

1. **Frame:** state the requested behavior, the smallest acceptable outcome,
   scope boundaries, and the check that will prove it.
2. **Orient:** inspect the owning layer, callers, tests, configuration,
   lockfile, and exact runtime or framework version. For bugs, find the root
   cause and affected callers before patching the symptom.
3. **Place:** extend the unit that already changes for this reason. Do not add
   parallel ownership because the correct owner is inconvenient.
4. **Edit:** make the narrow change, preserve unrelated behavior and formatting,
   and remove only artifacts made obsolete by this change.
5. **Verify:** run a check proportionate to the risk. A passing command proves
   only the path it actually exercised.
6. **Review:** inspect the final diff for duplicate ownership, partial wiring,
   hidden state, swallowed errors, speculative machinery, and scope creep.

Continue autonomously inside the granted scope. Ask only when a missing choice
materially changes behavior, ownership, authority, data exposure, cost, or
rollout risk.

## Stop signals

At a safe material phase boundary, stop before the next expansion when scope,
production lines, owner count, state count, or repair loops keep growing.
Recheck whether you are still solving the original problem, whether an upstream
or native owner was missed, and whether code can disappear.

Do not run this meta-check after every trivial edit. Use
`$aaa-code-review` for an explicit or package-gate challenge.

## Safety floor

Never simplify away:

- authentication, authorization, trust boundaries, or required validation;
- data-loss prevention, rollback, idempotency, or required error handling;
- accessibility, privacy, legal, or regulated-data obligations;
- explicit acceptance criteria or risk-proportionate tests;
- observability needed to prove a material runtime path.

If the smaller solution weakens one of these, it is not complete.

## Completion report

Report the owner reused, mechanism avoided or removed, files changed, exact
verification run, and anything still unverified. Do not claim general
correctness from a narrow green check.
