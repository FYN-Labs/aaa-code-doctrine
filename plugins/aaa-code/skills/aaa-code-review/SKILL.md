---
name: aaa-code-review
description: Run a read-only simplicity and ownership challenge at a material phase boundary, package gate, or when scope, production code, or repair loops are growing. At material architecture, inference-routing, eval, CAO, or audit gates, require blind cross-family assurance. Do not invoke after every trivial edit or treat it as a full correctness or security audit.
license: MIT
metadata:
  version: "0.3.0"
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

## Adversarial assurance gate

Ordinary reviews remain single-reviewer. Activate this gate only when the
owning policy classifies the decision package as material and it concerns a
cross-component architecture decision, inference/model/provider route, eval or
grader decision, CAO or equivalent audit gate, or other audit package.

A valid gate has one primary agent and at least two additional reviewer arms:

1. Freeze the subject, scope, acceptance criteria, authority limits, and
   evidence reference before either arm starts.
2. The primary agent does not count as an arm. Each arm is read-only,
   author-independent, and runs in a fresh context against the same frozen
   subject.
3. The primary and both arms use three distinct underlying model families from
   distinct model developers. Record the execution host separately: a shared
   gateway is neither diversity nor disqualification. Count the actually
   resolved model, never the configured alias; a silent fallback or two
   sessions of one family do not create another arm.
4. An arm may see the proposal but not the other arm's findings, a desired
   verdict, or the integrator's decision before both reports are complete.
5. Use only reviewer models qualified by the owning project for this decision
   class. Model names and public benchmarks are not durable qualification
   evidence. Every arm must cite a dated, decision-class-specific qualification
   reference owned by that project.
6. Each arm returns an independent verdict, evidence-labeled findings, exact
   resolved identity, relationship, qualification reference, completion
   evidence, and report reference. Empty, truncated, failed,
   identity-unverified, qualification-unverified, or materially unevidenced
   output is invalid.
7. After both arms finish, the integrator preserves disagreements and resolves
   every material finding as accepted, rejected with evidence, or deferred.
   Never average verdicts or reveal one arm's report to obtain agreement from
   the other.

Use `BLOCKED_ASSURANCE` when a required qualified arm cannot run. Use
`UNVERIFIED` when identity, family separation, qualification reference,
frozen-subject match, blind independence, or completion evidence is missing.
Do not simulate a reviewer, silently substitute a lane, or claim PASS. A
material accepted finding or unresolved P0/P1 returns `REVISE`. A material
artifact change freezes a new subject and expires both arm verdicts.

The host supplies already-authorized reviewer lanes and orchestration; this
skill defines only the review contract. It does not perform or replace the
owning correctness, security, performance, CAO, or release audit. It never
authorizes model access, paid use, credentials, private-data transfer, merge,
deploy, publish, spend, release, or future autonomy.

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
Reviewer relationship: author self-review | independent single-review | adversarial assurance
Frozen subject:
Assurance trigger: none | architecture | inference-routing | eval | CAO | audit
Assurance status: NOT_REQUIRED | SATISFIED | REVISE | BLOCKED_ASSURANCE | UNVERIFIED
Primary identity: model family / model developer / execution host / resolved model
Reviewer arms: relationship / model family / model developer / execution host / resolved model / qualification reference / frozen subject / completion / verdict / report reference
Blind independence and family separation:
Disagreements:
Integrator resolution:
Findings:
Protected safety checks:
Smallest complete path:
Residual verification:
```

`PASS` means the solution is already the smallest complete path, not merely
that tests pass. `STOP_AND_REFRAME` means another expansion should not begin
until the meta-cause is resolved. Map assurance to the main verdict
deterministically: an accepted material finding or unresolved P0/P1 is
`REVISE`; otherwise a required `BLOCKED_ASSURANCE` or `UNVERIFIED` gate is
`STOP_AND_REFRAME`; only `SATISFIED` can be `PASS`. A material change expires
the verdict and all arm evidence.

An author's self-review is useful evidence but not independent approval. When a
project requires an independent gate, use a reviewer independent of the author,
operating in a fresh context against the same frozen diff and evidence. This
verdict does not grant merge, deploy, publish, spend, release, or
future-autonomy authority.

This is not a substitute for a full correctness, security, performance, or
release audit. If the review discovers a possible safety regression, flag it as
P0 and stop simplification until the owning audit verifies it.
