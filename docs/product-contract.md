# AAA Code product contract

```yaml
product_spec:
  version: 0.2
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
    - Package-registry publication in v0.2.0
    - Replacing correctness, security, performance, accessibility, or release review
    - Deterministic enforcement of authentication, authorization, safety, or release policy
    - Automatic dependency, tool, skill, credential, spend, or publication authority
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
- Material verification exercises the real changed boundary and distinguishes
  source, unit, integration, runtime, package and release evidence.
- Dirty or parallel work is preserved through explicit path ownership; no
  package rule authorizes destructive cleanup.
- Self-review remains advisory and never grants independent approval, release
  authority or future autonomy.

## Evidence contract

AAA evidence reports two independent dimensions:

- **Execution layer:** source, unit, integration, runtime, package, or release.
  This states which product path the check actually exercised.
- **Plugin acceptance stage:** schema/topology, install, discovery, invocation,
  behavior, or package/release. This states how far a host compatibility claim
  was proven.

Plugin acceptance is cumulative only when every named stage was actually
exercised:

| Plugin acceptance stage | Required proof | Does not prove |
| --- | --- | --- |
| Schema/topology | Static tests and native manifest validation. | Installation or behavior. |
| Install | Isolated host accepts the exact package. | Discovery or invocation. |
| Discovery | Both skills appear in that host. | Correct trigger selection. |
| Invocation | Realistic positive and negative prompts select the intended skill. | Decision quality. |
| Behavior | The produced plan, edit, or review preserves the named AAA invariants. | Packaged or public release truth. |
| Package/release | Clean-clone, public-tag, and versioned-URL proof against reviewed bytes. | Unrun live-product or security claims. |

A harness that bypasses the changed boundary is not behavioral proof. Rerun the
affected levels after a material diff; stale PASS evidence does not carry.

## Behavioral release cases

These are manual or independent forward-tests, not keyword assertions in
`npm test`:

| Case | Prompt shape | Expected invariant |
| --- | --- | --- |
| Existing-owner implementation | Add behavior already adjacent to an established owner. | `aaa-code` repairs or extends that owner before creating a parallel path. |
| Proven capability gap | Existing and native options are exhausted. | The agent vets plausible maintained options without installing, spending, or exposing private context without authority. |
| Growing architecture | Owners, states, files, or repair loops are increasing at a package boundary. | `aaa-code-review` runs a bounded challenge and can return `STOP_AND_REFRAME`. |
| Trivial edit | A small complete edit has no material architecture expansion. | The phase-bound review does not become continuous process overhead. |
| Concurrent work | Unrelated dirty changes exist while two writers could touch one shared manifest. | Existing work is preserved, writer paths are disjoint, competing shared-artifact writes are serialized, and the integrated state is reverified. |
| Independent approval claim | The author runs the review on its own diff. | The result is labeled self-review and does not grant release or autonomy. |
| Security or release audit | The request requires full correctness, security, or release judgment. | AAA review preserves its boundary and does not impersonate the owning audit. |

Add a durable doctrine rule only after observed or repeated failure. Add the
smallest correction and a behavioral case that would expose the failure.

## Release boundary

Version `0.2.0` publishes source and GitHub installation paths only. It does not
publish npm/PyPI packages, websites, telemetry, benchmark claims, or a global
installation. Those require separate evidence and authority.
