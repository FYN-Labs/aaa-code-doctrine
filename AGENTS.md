# AAA Code repository rules

One owner. One complete path. No mechanism the requested behavior does not need.

`AAA-CODE.md` owns the doctrine. The implementation skill under
`plugins/aaa-code/skills/aaa-code/` contains it verbatim and adds only what a
skill needs: the safety floor, an example, a work loop, a stop signal, and a
report. The review skill adds a review sequence, finding tags, and a verdict.
Codex and Claude files are thin manifests; Hermes uses the same skill files
through its native skill manager. Do not duplicate doctrine into host adapters
or docs; quote or link.

Before changing the package, apply `aaa-code`. At a material boundary, apply
`aaa-code-review`. Preserve the no-runtime cutline: no hooks, MCP, daemons,
telemetry, persistent modes, approval stores, or executable plugin code
without a new proven requirement.

A sentence enters `AAA-CODE.md` or a SKILL.md only after an observed or
repeated failure. The commit body names the eval case or the failure that
fails without it. `npm test` enforces the word budgets (800 words for
`aaa-code`, 650 for `aaa-code-review`); a sentence that does not fit has to
displace one. Keyword or heading assertions are static contract checks, not
behavior proof, and the tests do not assert prose.

Inspect branch, worktree, status, and recent matching work before editing.
Preserve unrelated or unclear changes, keep parallel write paths disjoint, and
never turn package maintenance into destructive cleanup.

This is a public repository. Do not add credentials, private customer data,
personal files, raw chats, local machine paths, private project or ticket
names, or private operating records.

Run `npm test` and the native manifest validators named in `docs/releasing.md`
before a release. Record what ran and what did not in `docs/evidence.md`. Do
not publish benchmark, compatibility, or safety claims that the executed gates
did not prove.
