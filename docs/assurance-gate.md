# Adversarial assurance gate (draft)

**Status: draft. Not executed on any host as of v0.3.0. Not part of either skill since v0.4.0.**

This contract was part of `aaa-code-review` in v0.3.0. It was moved here because no
target host can orchestrate it from inside a skill, a reviewing model cannot observe its
own resolved identity or the other arm's context, and the v0.3.0 release receipt records
the gate as never executed. It re-enters a skill only after one recorded execution on a
real decision, together with the eval case that fails without it.

Its two eval cases live under `docs/assurance-gate/evals/`. They are not part of the
`evals/` corpus that `npm test` checks.

## The Zange at material gates

Ordinary reviews stay single-reviewer. At a material architecture,
inference-routing, eval, or audit gate, the primary agent must be challenged
by at least two additional blind, read-only reviewer arms (the Zange, German
for pincers). The primary and both arms must resolve to three distinct model
families from distinct model developers against the same frozen subject.

Each arm reports independently before either sees the other's findings. The
integrator preserves disagreements instead of averaging them. Missing,
same-family, silently rerouted, incomplete, or identity-unverified arms leave
the gate `BLOCKED_ASSURANCE` or `UNVERIFIED`, never PASS.

Model names are deliberately not part of the durable contract. A project may
qualify any frontier model as a reviewer, but configured names and public
benchmarks do not count. The actual resolved identity, family, qualification
evidence, completion, and individual verdict do.

## Gate contract

Activate this gate only when the owning policy classifies the decision
package as material and it concerns a cross-component architecture decision,
inference/model/provider route, eval or grader decision, or an audit gate.

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
   every material finding as accepted, rejected with evidence, or deferred with
   a named owner and date. A deferred P0 or P1 counts as unresolved. Never
   average verdicts or reveal one arm's report to obtain agreement from the
   other.

Use `BLOCKED_ASSURANCE` when a required qualified arm cannot run. Use
`UNVERIFIED` when identity, family separation, qualification reference,
frozen-subject match, blind independence, or completion evidence is missing.
Do not simulate a reviewer, silently substitute a lane, or claim PASS. A
material accepted finding or unresolved P0/P1 returns `REVISE`. A material
artifact change freezes a new subject and expires both arm verdicts.

Reviewer identity, independence, and model family are recorded by the host
that ran the review, never by the reviewer. A reviewer's statement of its own
model name is not evidence.

The host supplies already-authorized reviewer lanes and orchestration; this
document defines only the review contract. It does not perform or replace the
owning correctness, security, performance, or release audit. It never
authorizes model access, paid use, credentials, private-data transfer, merge,
deploy, publish, spend, release, or future autonomy.

## Report fields

Append these to the `aaa-code-review` verdict when the gate runs:

```text
Frozen subject:
Assurance trigger: architecture | inference-routing | eval | audit
Assurance status: SATISFIED | REVISE | BLOCKED_ASSURANCE | UNVERIFIED
Primary identity: model family / model developer / execution host / resolved model (host-recorded)
Reviewer arms: relationship / model family / model developer / execution host / resolved model / qualification reference / frozen subject / completion / verdict / report reference
Blind independence and family separation:
Disagreements:
Integrator resolution:
```

Map the gate to the main verdict: an accepted material finding or unresolved
P0/P1 is `REVISE`; otherwise a required `BLOCKED_ASSURANCE` or `UNVERIFIED`
gate is `STOP_AND_REFRAME`; `SATISFIED` allows `PASS`. When no gate is
required, the ordinary verdict rule applies unchanged.

## Assurance status

Assurance relationship is reported separately from evidence layer and host
acceptance stage. It raises neither.

| Assurance status | Required proof | Does not prove |
| --- | --- | --- |
| `SATISFIED` | Frozen subject, primary plus two valid blind arms, three distinct resolved model families and developers, dated decision-class qualification references, complete individual reports, and evidence-backed integration of every material disagreement. | Correctness, security, performance, release, or action authority. |
| `REVISE` | A material finding is accepted or a P0/P1 disagreement remains unresolved. | That the revised artifact passed; a material change requires a new frozen subject and rerun. |
| `BLOCKED_ASSURANCE` | A required qualified reviewer lane cannot run within current authority or availability. | Permission to buy, authorize, or silently substitute another lane. |
| `UNVERIFIED` | Required identity, family separation, qualification reference, frozen-subject match, blind independence, completion evidence, or report integrity is missing. | PASS or permission to infer the missing evidence. |

Configured routes do not count. Receipts record the actually resolved model,
family, developer, execution host, relationship, dated decision-class
qualification reference, completion evidence, verdict, and report reference
for every arm. A shared gateway is neither diversity nor automatic
disqualification.

## Recording an executed gate

For a required gate, record the frozen subject, challenge prompt digest,
primary identity, and both additional reviewer arms. Each arm records
configured route, actually resolved model, model family and developer,
execution host, relationship, dated decision-class qualification reference,
completion evidence, verdict, and report digest. Record whether both arms
remained blind until completion and how every material disagreement was
resolved. Configured aliases, consensus, or a shared gateway are not identity,
qualification, or diversity evidence.

A contract in a document is specification evidence until two valid
cross-family arm reports actually exist. Static tests must never promote it to
an executed assurance PASS.
