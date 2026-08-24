---
name: aaa-code
description: Choose the smallest complete change at the correct native owner when writing, editing, debugging, testing, or refactoring code. Use for implementation work, placement decisions, duplicate cleanup, and scope control; keep security and explicit requirements intact.
license: MIT
metadata:
  version: "0.3.0"
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
6. **Vet:** If a proven capability gap remains, can a maintained upstream,
   community solution, skill, or tool close it with less ownership than custom
   code?
7. **Create:** Otherwise implement the smallest complete solution at the
   correct owner, including its wiring and proportionate verification.

Do not create a helper, wrapper, manager, store, queue, cache, validator,
broker, plugin, hook, dependency, background job, or state machine until the
earlier rungs have been disproven by repository evidence.

## Work loop

1. **Frame:** state the requested behavior, the smallest acceptable outcome,
   scope boundaries, and the check that will prove it.
2. **Orient:** load repository-local rules and named sources of truth, then
   inspect the owning layer, callers, tests, configuration, lockfile, exact
   runtime or framework version, current worktree state, and recent matching
   work. For bugs, find the root cause and affected callers before patching the
   symptom. For a rename, move, refactor, or migration, inspect direct and
   transitive users, dynamic references, and the behavior baseline first.
3. **Place:** extend the unit that already changes for this reason. One
   invariant has one owner. Keep generic layers generic, and repair data or
   behavior lost at a boundary at that boundary. Do not add parallel ownership
   because the correct owner is inconvenient.
4. **Edit:** make the narrow change, preserve unrelated behavior, formatting,
   and worktree changes, and remove only artifacts made obsolete by this
   change. Never reset, overwrite, or discard work whose ownership is unclear.
5. **Verify:** run a check proportionate to the risk against the final integrated
   state. For material behavior, exercise the real entry point, the success
   path, and a relevant error or recovery path. A test or harness that bypasses
   the changed boundary is not proof. State whether the evidence covers source,
   unit, integration, runtime, package, or release behavior; one layer does not
   imply another. A material diff expires earlier PASS evidence.
6. **Review:** inspect the final diff for duplicate ownership, partial wiring,
   hidden state, swallowed errors, speculative machinery, and scope creep.

Continue autonomously inside the granted scope. Ask only when a missing choice
materially changes behavior, ownership, authority, data exposure, cost, or
rollout risk.

## Capability gaps

Run one bounded acquisition pass only after the earlier ladder rungs fail.
Record the concrete gap and compare only plausible maintained options. Before
adopting anything, check provenance, license, maintenance and update path,
privacy, supply-chain exposure, rollback, cost, and current authority.

Research does not authorize installation, purchase, credentials, private-data
transfer, or publication. After an authorized adoption, rerun the original
quality and behavior checks. If custom code is still necessary, record its
owner, tests, migration path, and the condition for deleting or replacing it.

## Shared work

Parallel read-only work can share a frozen artifact; parallel writers need
disjoint path ownership. Serialize competing writes to the same shared
lockfile, schema, manifest, snapshot, or generated index. Reviewers inspect a
frozen diff or artifact, not a moving writer worktree. A coordinating integrator
combines the slices and reruns the relevant checks on the combined state.
Delegation never expands authority.

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

Report the owner reused, mechanism avoided or removed, files changed, evidence
layer, exact verification run, and anything still unverified. Do not claim
general correctness from a narrow green check.
