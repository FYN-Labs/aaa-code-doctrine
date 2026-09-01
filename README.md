# AAA Code

**Aligned. Autonomous. Auditable.**

## Stop small fixes from becoming second systems.

AAA Code is a no-runtime doctrine for keeping agent-written software on the
smallest complete path at its existing owner. It gives Codex, Claude Code,
Hermes Agent, and any other skill-aware agent one hard default:

**One owner. One complete path. No mechanism the requested behavior does not need.**

The whole doctrine is the eleven lines in [`AAA-CODE.md`](AAA-CODE.md).
Everything else in this repository is packaging, verification, or process.

## The core

**One owner. One complete path. No mechanism the requested behavior does not need.**

1. Write the problem in one sentence. Solve that sentence, nothing wider.
2. The owner of a behavior is the one unit that already changes for that reason. Change it there, even when inconvenient. If the framework or configuration already does it, the framework is the owner.
3. Before creating anything, stop at the first rung that fully solves the sentence: does it need to exist? can the owner be extended? can the framework or configuration do it? can the standard library or an installed dependency do it? can a deletion or one targeted change do it? Only then build, at the owner.
4. Do not add a helper, wrapper, manager, store, queue, cache, adapter, hook, dependency, background job, or state machine to avoid touching the owner.
5. Complete means: reachable from the real entry point, every existing caller still works, the first failure a user would hit is handled, and you ran it at least once. Smaller than complete is not simpler; it is unfinished.
6. Never make something smaller by removing authentication, authorization, validation at a trust boundary, error handling, data-loss protection, or a required test.
7. Prove the change through its real entry point: the success path and one failure path. Name the command you ran, the layer it covers (static, unit, integrated, release), and what is still unverified.
8. A change is material when it adds or removes an owner, a dependency, persistent state, or a cross-component path, or touches authentication, money, data loss, or rollback. Everything else is trivial: verify it and move on.
9. At a material boundary, stop before the next expansion and ask whether you are still solving the sentence from line 1, and what can disappear. Not after every small edit.
10. Research is not permission. Never install, buy, push, publish, or send data outside the repository without an explicit grant.
11. Report: owner reused, mechanism avoided, files changed, check run, still unverified.

## Three ways to load it

1. **Always on, any harness.** Paste `AAA-CODE.md` under a heading such as
   `## AAA Code` into `AGENTS.md`, `CLAUDE.md`, your Hermes rules file, or the
   system prompt. This is the only path every host loads unconditionally.
2. **As skills.** `aaa-code` carries the same core plus the safety floor, an
   example, a work loop, and a completion report. `aaa-code-review` is a
   read-only overengineering review for material boundaries. Skill selection
   is a per-host heuristic; do not rely on it alone.
3. **Both.** The core in the rules file, the review as a skill.

No lifecycle hooks. No daemon. No background calls. No MCP server. No
telemetry. No approval store. No persistent mode.

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
hermes skills install https://raw.githubusercontent.com/FYN-Labs/aaa-code-doctrine/v0.4.0/plugins/aaa-code/skills/aaa-code/SKILL.md --yes
hermes skills install https://raw.githubusercontent.com/FYN-Labs/aaa-code-doctrine/v0.4.0/plugins/aaa-code/skills/aaa-code-review/SKILL.md --yes
```

### Other skill-aware agents

Install or copy the two directories under `plugins/aaa-code/skills/`. Each
skill follows the Agent Skills `SKILL.md` layout and has no executable
dependency.

## Use

Ordinary coding work can select `aaa-code` automatically. Ask for
`aaa-code-review` when a change looks overengineered, when owners, files,
state, or repair loops keep growing, or before a merge or package gate. Use
whatever your host uses to invoke a skill: `$aaa-code-review` in Codex,
`/aaa-code-review` in Claude Code, or ask Hermes to load it.

The review is intentionally not always-on. Growing scope, owners, state, or
repair loops is the signal to stop and challenge the design; a trivial edit is
not.

## What AAA Code does not claim

- It is not a correctness, security, performance, accessibility, or release
  review. Those gates stay where they are.
- It is guidance, not enforcement. It grants no authority to install, spend,
  publish, deploy, merge, or weaken project rules, and self-review never
  becomes independent approval.
- Fewer lines are not the goal. One complete owner is.

## Proof, not promises

```bash
npm test
```

That is the dependency-free clean-clone gate and the command CI runs with
Node.js 22. It proves the package is what it says: two instruction-only skills
that carry the core verbatim, no hooks, no executable code, versions aligned,
no private data, word budgets kept. It does not prove that an agent selects or
follows the skill.

What ran and what did not run for each version is in
[`docs/evidence.md`](docs/evidence.md); the terms are in
[the product contract](docs/product-contract.md). Maintainer release gates and
the trigger matrix are in [the release playbook](docs/releasing.md).

The eight neutral prompts under [`evals/`](evals/) are behavioral and
negative-control cases encoded as Claude-compatible static case files. Other
hosts can run the same prompt text when they expose a traceable skill event.
A doctrine-conforming answer without a recorded selection event is behavior
evidence, not invocation evidence.

A draft contract for a multi-reviewer assurance gate, never executed, lives in
[`docs/assurance-gate.md`](docs/assurance-gate.md). It is not part of either
skill.

## Public contribution boundary

Do not add credentials, private customer data, personal files, raw chats, local
machine paths, or private operating records. Extract the reusable principle and
keep private context in its owning workspace.

## Provenance

AAA Code is original FYN Labs product work informed by two MIT-licensed
projects:

- [Ponytail](https://github.com/DietrichGebert/ponytail), pinned during design
  review at `2ed6c52c9d7e5e56942508591085fd45dea277d3`.
- [clean-code-skills](https://github.com/btseee/clean-code-skills), pinned at
  `6df6e6aae7c03317670601eb449fad8aeeccbe30`.

AAA Code differs materially in its phase-bound review, owner-first ladder,
explicit definitions of complete and material, audit evidence, and rejection of
persistent hook/state machinery. Upstream benchmark results are not presented
as FYN Labs results; product claims require an independently reproducible AAA
Code benchmark. Full notices are in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## License

MIT © 2026 FYN Labs / Mathias Heinke.

---

Deutsch: AAA Code hält Agenten-Code am ursprünglichen Problem, am kleinsten
nativen Owner und an realer Verifikation. Der Simplicity-Check läuft an sicheren
Phasengrenzen, nicht nach jedem Dreizeiler.
