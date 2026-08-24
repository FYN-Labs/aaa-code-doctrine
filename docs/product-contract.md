# AAA Code product contract

```yaml
product_spec:
  version: 0.1
  project: AAA Code
  publisher: FYN Labs
  workspace: repository-root
  data_classification: public
  claims_risk: public-copy
  source_of_truth:
    - plugins/aaa-code/skills/aaa-code/SKILL.md
    - plugins/aaa-code/skills/aaa-code-review/SKILL.md
  explicit_non_goals:
    - Always-on hooks, daemons, telemetry, MCP, persistent modes, or approval stores
    - Package-registry publication in v0.1.0
    - Replacing correctness, security, performance, accessibility, or release review
```

## Outcome

Publish one dependency-free FYN Labs package that gives skill-aware coding
agents a shared native-first doctrine and a separate phase-bound simplicity
review. A clean clone must contain everything required to inspect, validate,
and install the skills for Codex, Claude Code, Hermes Agent, or a generic Agent
Skills consumer.

## Users

- Founders and engineering leads delegating implementation to coding agents.
- Teams that need high autonomy without parallel ownership or hidden mechanism.
- Reviewers challenging scope growth before a package or release gate.

## Architecture

The canonical behavior lives only in two skill files. Codex and Claude Code use
thin marketplace manifests that point to the same package. Hermes installs the
same skill files through its native skill manager. No host adapter executes
code or changes the doctrine.

## Acceptance

- The implementation skill encodes Aligned, Autonomous, Auditable behavior and
  the ordered reduction ladder.
- The review skill is read-only, phase-bound, severity-ranked, and clearly not
  a full correctness or security audit.
- Safety, validation, data-loss handling, accessibility, privacy, explicit
  requirements, and risk-proportionate tests cannot be simplified away.
- All manifests validate with current local host CLIs.
- Tests enforce the complete plugin file allowlist and reject hooks, MCP,
  executable plugin code, persistent state, version drift, and missing
  provenance.
- A clean clone passes dependency-free `npm test`; native host validators are
  additional maintainer release gates, not clean-clone dependencies.
- The review skill is discoverable only through its narrow material-boundary
  description and is never injected through an always-on hook or state mode.

## Release boundary

Version `0.1.0` publishes source and GitHub installation paths only. It does not
publish npm/PyPI packages, websites, telemetry, benchmark claims, or a global
installation. Those require separate evidence and authority.
