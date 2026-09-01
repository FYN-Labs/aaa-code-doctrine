# AAA Code product contract

```yaml
product_spec:
  version: 0.4.0
  project: AAA Code
  publisher: FYN Labs
  workspace: repository-root
  data_classification: public
  claims_risk: public-copy
  source_of_truth:
    - AAA-CODE.md
    - plugins/aaa-code/skills/aaa-code/SKILL.md
    - plugins/aaa-code/skills/aaa-code-review/SKILL.md
  explicit_non_goals:
    - Always-on hooks, daemons, telemetry, MCP, persistent modes, or approval stores
    - Package-registry publication in v0.4.0
    - Replacing correctness, security, performance, accessibility, or release review
    - Deterministic enforcement of authentication, authorization, safety, or release policy
    - Automatic dependency, tool, skill, credential, spend, or publication authority
    - Running, routing, purchasing, or hosting reviewer models
```

## Outcome

Publish one dependency-free FYN Labs package that gives skill-aware coding
agents one shared doctrine: one owner, one complete path, no mechanism the
requested behavior does not need. The doctrine is a plain text block any host
can load; two skills carry it and add a phase-bound simplicity review. A clean
clone contains everything required to inspect, validate, and install it for
Codex, Claude Code, Hermes Agent, or a generic Agent Skills consumer.

## Users

- Founders and engineering leads delegating implementation to coding agents.
- Teams that need high autonomy without parallel ownership or hidden mechanism.
- Reviewers challenging scope growth before a package or release gate.

## Architecture

`AAA-CODE.md` owns the core. The implementation skill and the README contain
it verbatim; `npm test` enforces that. Codex and Claude Code use thin
marketplace manifests that point to the same package. Hermes installs the same
skill files through its native skill manager. No host adapter executes code or
changes the doctrine.

Skill selection is a per-host heuristic. The only surface every named host
loads unconditionally is its project rules file, so the README tells users to
paste the core there.

## Acceptance

- `AAA-CODE.md` states the principle, the ladder, the definitions of owner,
  complete, and material, the safety floor, the proof rule, the authority rule,
  and the report, in eleven numbered lines.
- The implementation skill contains the core verbatim, the full safety floor,
  one example and one counter-example, a work loop, a stop signal, and a
  completion report, within 800 words.
- The review skill is read-only, phase-bound, severity-ranked, contains a
  filled-in verdict, and is clearly not a correctness or security audit, within
  650 words.
- Safety, validation, data-loss handling, accessibility, privacy, explicit
  requirements, and risk-proportionate tests cannot be simplified away.
- Neither skill names a model, vendor, or benchmark, and neither asks a model
  to report its own resolved identity.
- All manifests validate with current local host CLIs.
- Tests enforce the complete plugin file allowlist, version alignment, the word
  budgets, the verbatim core, and public-data hygiene, and reject hooks, MCP,
  executable plugin code, and persistent state. They do not assert prose.
- A clean clone passes dependency-free `npm test`; native host validators are
  additional maintainer release gates, not clean-clone dependencies.
- The review skill is discoverable only through its narrow description and is
  never injected through an always-on hook or state mode.
- Dirty or parallel work is preserved; no package rule authorizes destructive
  cleanup.
- Self-review remains advisory and never grants independent approval, release
  authority, or future autonomy.
- Ordinary and trivial reviews trigger no multi-model overhead. The
  multi-reviewer assurance contract is a draft outside both skills.

## Evidence

Say what ran, on which host and version, and what did not run. Each version
has one section in `docs/evidence.md`. The tag-bound JSON receipts under
`evidence/releases/` are the historical records of v0.2.1 and v0.3.0.

Two things are always kept apart:

- **Evidence layer:** static (validators or type checks ran, nothing was
  executed), unit (the changed unit ran in isolation), integrated (the real
  entry point ran on the final combined state), release (the artifact that
  ships was exercised). Name the highest layer actually run.
- **Host acceptance:** schema, install, discovery, invocation, behavior. Each
  stage proves only itself. A validated manifest does not prove installation,
  discovery does not prove correct selection, and a doctrine-conforming answer
  without a recorded selection event is behavior evidence, not invocation
  evidence.

A harness that bypasses the changed boundary is not behavioral proof. A
material diff expires earlier evidence.

## Behavioral cases

The eight cases under `evals/` own their prompt, expected outcome, and
graders; none names the product. Four of them form the minimum cross-host
trigger matrix in `docs/releasing.md`. `unrelated-doc-summary` is the negative
invocation control. Invocation counts only when the host exposes a selection
event.

Add a durable doctrine sentence only after an observed or repeated failure,
together with the case that fails without it.

## Release boundary

Version `0.4.0` publishes source, GitHub installation paths, the plain-text
core, the two rewritten skills, an eight-case neutral prompt corpus in
Claude-compatible static case files, and a per-version evidence statement. It
moves the multi-reviewer assurance contract to a draft document. It does not
publish npm/PyPI packages, websites, telemetry, benchmark claims, universal
trigger reliability, or reviewer-model execution. Those require separate
evidence and authority.
