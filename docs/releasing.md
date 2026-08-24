# Releasing AAA Code

AAA Code releases are small, immutable, and claim-matched. A release may only
claim the evidence stages it actually reached.

## 1. Freeze the candidate

Work from a clean `codex/` branch based on `origin/main`. Record the reviewed
head SHA before merge and do not reuse a PASS after a material diff.

```bash
git status --short --branch
git diff --check
npm test
```

`npm test` is the dependency-free clean-clone contract. It validates package
topology, version alignment, public-data hygiene, eval fixtures, and release
receipt consistency. It does not execute an agent.

## 2. Validate the skills and manifests

Point these variables at the validators bundled with the maintainer's current
Codex installation:

```bash
SKILL_VALIDATOR_DIR=/path/to/skill-creator
PLUGIN_VALIDATOR_DIR=/path/to/plugin-creator

uv run --with 'PyYAML==6.0.3' python \
  "$SKILL_VALIDATOR_DIR/scripts/quick_validate.py" \
  plugins/aaa-code/skills/aaa-code

uv run --with 'PyYAML==6.0.3' python \
  "$SKILL_VALIDATOR_DIR/scripts/quick_validate.py" \
  plugins/aaa-code/skills/aaa-code-review

uv run --with 'PyYAML==6.0.3' python \
  "$PLUGIN_VALIDATOR_DIR/scripts/validate_plugin.py" \
  plugins/aaa-code

claude plugin validate --strict plugins/aaa-code
claude plugin validate --strict .claude-plugin/marketplace.json
```

Record validator versions and exact results in the release receipt. A missing
validator is a gap, not a carried-forward PASS.

## 3. Run behavioral evals where the host exposes evidence

The neutral execution prompts under `evals/` intentionally do not name AAA
Code or either skill. Claude Code versions that expose the native plugin-eval
surface can run:

```bash
RUN_ROOT=/path/to/empty/eval-output

claude plugin eval . \
  --ablation with-without \
  --runs 1 \
  --threshold 1 \
  --json "$RUN_ROOT/claude-eval.json" \
  --output-dir "$RUN_ROOT/claude-eval"
```

Equivalent Codex and Hermes runs must use the same prompts and record an
observable host selection event. A doctrine-conforming answer without such an
event proves behavior only. If a host does not expose the event, record
`invocation: UNVERIFIED`.

The minimum cross-host trigger matrix is:

| Case | Expected selection |
| --- | --- |
| `existing-owner` | `aaa-code`, not `aaa-code-review` |
| `growing-architecture` | `aaa-code-review` |
| `trivial-edit` | no `aaa-code-review`; `aaa-code` is allowed |
| `unrelated-doc-summary` | neither skill |

The other four cases test decision quality and authority boundaries.

## 4. Merge and tag the exact candidate

Open a pull request, wait for checks, and bind the merge to the reviewed head:

```bash
pr_head="$(gh pr view PR_NUMBER --json headRefOid --jq .headRefOid)"
gh pr checks PR_NUMBER --watch
gh pr merge PR_NUMBER --merge --match-head-commit "$pr_head"

git fetch origin main
merge_sha="$(gh pr view PR_NUMBER --json mergeCommit --jq .mergeCommit.oid)"
test "$(git rev-parse origin/main)" = "$merge_sha"
git diff --exit-code "$pr_head" "$merge_sha" --

git switch --detach "$merge_sha"
git diff --check "$merge_sha^" "$merge_sha"
npm test

git tag -a VERSION "$merge_sha" -m "AAA Code VERSION"
git push origin "refs/tags/VERSION"
```

Rerun the remaining skill and manifest validators from sections 1 and 2 on the
detached merge commit before tagging. If `origin/main` has advanced beyond the
PR merge, stop and resolve that new state explicitly; never tag whatever
`origin/main` happens to contain. Never rewrite a published tag. Correct
release mistakes with the next patch.

## 5. Verify public bytes

After tag CI passes, verify a clean clone and compare both public raw skills to
the reviewed local bytes:

```bash
curl -fsSL \
  "https://raw.githubusercontent.com/FYN-Labs/aaa-code-doctrine/VERSION/plugins/aaa-code/skills/aaa-code/SKILL.md" \
  | cmp plugins/aaa-code/skills/aaa-code/SKILL.md -

curl -fsSL \
  "https://raw.githubusercontent.com/FYN-Labs/aaa-code-doctrine/VERSION/plugins/aaa-code/skills/aaa-code-review/SKILL.md" \
  | cmp plugins/aaa-code/skills/aaa-code-review/SKILL.md -
```

Create the GitHub release only after the tag and public bytes are proven:

```bash
gh release create VERSION \
  --verify-tag \
  --title "AAA Code VERSION" \
  --notes-file /path/to/release-notes.md
```

## Evidence rule

The versioned JSON record under `evidence/releases/` binds claims to product
file digests and lists PASS, BLOCKED, and UNVERIFIED gates separately. Never
store credentials, auth files, account identifiers, raw private context,
machine-local paths, or unsanitized debug traces in the repository.
