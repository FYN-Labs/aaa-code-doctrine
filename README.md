# AAA Code

**Aligned. Autonomous. Auditable.**

AAA Code is a FYN Labs doctrine for agent-written software. It pushes Codex,
Claude Code, Hermes Agent, and other skill-aware agents toward the smallest
complete change at the correct native owner — without weakening security,
validation, accessibility, or required verification.

It is two skills and no runtime:

- `aaa-code` guides implementation, debugging, tests, and refactoring.
- `aaa-code-review` runs a bounded simplicity challenge at a material phase or
  package gate.

There are no lifecycle hooks, daemons, background calls, MCP servers, approval
stores, telemetry, or persistent modes.

## The ladder

Before creating code, check in order:

1. Does it need to exist?
2. Can the existing owner be reused or repaired?
3. Can the native framework, runtime, agent, platform, or configuration do it?
4. Can the standard library or an installed dependency do it?
5. Can deletion or one targeted change solve it?
6. Can a vetted, maintained upstream, skill, or tool close a proven gap with
   less ownership than custom code?
7. Otherwise, build the smallest complete path and prove it.

## Install

### Codex

```bash
codex plugin marketplace add FYN-Labs/aaa-code-doctrine
codex plugin add aaa-code@fyn-labs-aaa-code
```

Start a new Codex task after installation so the skill catalog refreshes.

### Claude Code

```bash
claude plugin marketplace add FYN-Labs/aaa-code-doctrine
claude plugin install aaa-code@fyn-labs-aaa-code
```

Restart Claude Code after installation or update.

### Hermes Agent

Hermes already owns skill installation, so AAA Code uses that native surface
instead of adding a Python plugin:

```bash
hermes skills install https://raw.githubusercontent.com/FYN-Labs/aaa-code-doctrine/v0.2.0/plugins/aaa-code/skills/aaa-code/SKILL.md --yes
hermes skills install https://raw.githubusercontent.com/FYN-Labs/aaa-code-doctrine/v0.2.0/plugins/aaa-code/skills/aaa-code-review/SKILL.md --yes
```

### Other skill-aware agents

Install or copy the two directories under `plugins/aaa-code/skills/`. Each
skill follows the Agent Skills `SKILL.md` layout and has no executable
dependency.

## Use

Ordinary coding work can select `aaa-code` automatically. At a material phase
or package boundary, the narrow review description lets an agent select
`aaa-code-review`; invoke it directly when you want the check immediately:

```text
Use $aaa-code to implement this at the smallest native owner.
Use $aaa-code-review at this package gate.
```

The review is intentionally not always-on. Growing scope, production code,
owners, state, or repair loops is the signal to stop and challenge the design.

## What AAA Code does not claim

- It is not a replacement for correctness, security, performance, or release
  review.
- It is agent guidance, not deterministic enforcement. Authentication,
  authorization, safety, and release invariants remain in the repository's CI
  and host policy.
- Fewer lines are not automatically better; one complete owner is better.
- It does not grant authority to publish, spend, deploy, access credentials,
  or weaken project rules.
- Research does not authorize installing a dependency or tool, accepting a
  license, spending money, or transferring private context.
- Self-review is evidence, not independent approval or future autonomy.
- Upstream benchmark results are not presented as FYN Labs results. Product
  claims require an independently reproducible AAA Code benchmark.

## Public contribution boundary

Do not add credentials, private customer data, personal files, raw chats, local
machine paths, or private operating records. Extract the reusable principle and
keep private context in its owning workspace.

## Development and verification

```bash
npm test
```

That is the dependency-free clean-clone gate and the command CI runs with
Node.js 22. Before a version tag, maintainers additionally run the current
bundled Codex plugin validator, the Agent Skills validator for both skills, and
`claude plugin validate --strict`; those host tools are release prerequisites,
not vendored project dependencies.

`npm test` proves the static package contract; it does not prove that an agent
selects the right skill or makes the right decision. Release evidence reports
two separate dimensions: the code-execution layer actually exercised and the
plugin acceptance stage actually reached. Their canonical definitions are in
[the product contract](docs/product-contract.md#evidence-contract).

Each release record names the host version, date, dimensions actually
exercised, commands, and residual gaps. A lower stage never implies a higher
one.

## Provenance

AAA Code is original FYN Labs product work informed by two MIT-licensed
projects:

- [Ponytail](https://github.com/DietrichGebert/ponytail), pinned during design
  review at `2ed6c52c9d7e5e56942508591085fd45dea277d3`.
- [clean-code-skills](https://github.com/btseee/clean-code-skills), pinned at
  `6df6e6aae7c03317670601eb449fad8aeeccbe30`.

AAA Code differs materially in its phase-bound review, native-owner priority,
maximum-autonomy boundary, audit evidence, and explicit rejection of persistent
hook/state machinery. Full notices are in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## License

MIT © 2026 FYN Labs / Mathias Heinke.

---

Deutsch: AAA Code hält Agenten-Code am ursprünglichen Problem, am kleinsten
nativen Owner und an realer Verifikation. Der Simplicity-Check läuft an sicheren
Phasengrenzen — nicht nach jedem Dreizeiler.
