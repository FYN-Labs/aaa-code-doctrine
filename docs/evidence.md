# Evidence

Say what ran, on which host and version, and what did not run. A static check
never implies that an agent selected a skill or made a good decision. A
doctrine-conforming answer without a host selection event is behavior
evidence, not invocation evidence. A material diff expires earlier evidence.

One section per version, newest first. The tag-bound JSON receipts under
`evidence/releases/` are the historical records for v0.2.1 and v0.3.0 and are
not continued.

## v0.4.0

Candidate; not tagged yet.

Ran and passed, static only:

- `npm test` on Node 22: package topology, version alignment, the core carried
  verbatim by the implementation skill and README, word budgets, public-data
  hygiene, eval fixture shape, this file.
- `claude plugin validate --strict` on `plugins/aaa-code` and
  `.claude-plugin/marketplace.json` (Claude Code 2.1.257).

Not run for this candidate:

- Agent Skills validator and Codex plugin validator (no Codex installation in
  the review environment).
- Any host eval, trigger matrix, or selection event on Codex, Claude Code, or
  Hermes.
- Any multi-reviewer assurance gate; that contract is a draft in
  `docs/assurance-gate.md`.

Behavior evidence, not a product claim: during the rewrite, three neutral
prompts from `evals/` (existing-owner, trivial-edit, growing-architecture)
were answered by two models of one developer with the skill text loaded and
blind-graded against each case's criteria. Single run per cell, one grader, no
model-family diversity, no selection event. The rewritten skills are not yet
covered by that probe.

Changed since v0.3.0: `AAA-CODE.md` added as the owner of the core; both
skills rewritten around it; the adversarial assurance gate and its two eval
cases moved to `docs/assurance-gate.md` as a draft; release receipts replaced
by this file; prose regexes removed from the tests.

## v0.3.0 and earlier

See `evidence/releases/v0.3.0.json` and `evidence/releases/v0.2.1.json`. All
runtime gates in both receipts are UNVERIFIED and every behavioral case is
SPECIFIED; the only PASS gates are static.
