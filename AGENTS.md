# AAA Code repository rules

The canonical product behavior lives in:

- `plugins/aaa-code/skills/aaa-code/SKILL.md`
- `plugins/aaa-code/skills/aaa-code-review/SKILL.md`

Do not duplicate that doctrine into host adapters. Codex and Claude files are
thin manifests; Hermes uses the same skill files through its native skill
manager.

Before changing the package, apply `aaa-code`. At material phase or package
boundaries, apply `aaa-code-review`. Preserve the no-runtime cutline: no hooks,
MCP, daemons, telemetry, persistent modes, approval stores, or executable
plugin code without a new proven requirement.

Admit durable doctrine only after an observed or repeated failure. Make the
smallest specific correction and add a realistic behavioral release case;
keyword or heading assertions remain static contract checks, not behavior
proof.

Inspect branch, worktree, status, and recent matching work before editing.
Preserve unrelated or unclear changes, keep parallel write paths disjoint, and
never turn package maintenance into destructive cleanup.

This is a public repository. Do not add credentials, private customer data,
personal files, raw chats, local machine paths, or private operating records.

Run `npm test` and the native manifest validators named in `README.md` before a
release. Do not publish benchmark, compatibility, or safety claims that the
executed gates did not prove.
