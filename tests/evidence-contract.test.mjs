import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const expectedCases = [
  "capability-gap",
  "concurrent-work",
  "existing-owner",
  "growing-architecture",
  "security-release-boundary",
  "self-review-boundary",
  "trivial-edit",
  "unrelated-doc-summary",
];

async function text(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

function promptFrom(caseYaml) {
  const match = caseYaml.match(/^  prompt: \|\n([\s\S]*?)^  max_turns:/m);
  assert.ok(match, "case.yaml must contain an execution.prompt block");
  return match[1].replace(/^    /gm, "").trim();
}

test("the public eval suite covers every contract case and negative control", async () => {
  const caseIds = (await readdir(path.join(root, "evals"), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  assert.deepEqual(caseIds, expectedCases);
  for (const caseId of caseIds) {
    const caseYaml = await text(`evals/${caseId}/case.yaml`);
    const prompt = promptFrom(caseYaml);

    assert.match(caseYaml, /schema_version: "1\.1"/);
    assert.match(caseYaml, new RegExp(`name: ${caseId}`));
    assert.match(caseYaml, /plugins:\n  - \.\.\/\.\.\/plugins\/aaa-code/);
    assert.match(caseYaml, /allowed_tools: \[Skill\]/);
    assert.match(caseYaml, /runs: 1/);
    assert.match(caseYaml, /graders:/);
    assert.doesNotMatch(prompt, /AAA Code|aaa-code(?:-review)?|\$aaa-code|\/aaa-code/i);
  }
});

test("implementation cases that expect aaa-code also exclude aaa-code-review", async () => {
  for (const caseId of ["existing-owner", "capability-gap", "concurrent-work"]) {
    const caseYaml = await text(`evals/${caseId}/case.yaml`);
    assert.match(caseYaml, /name: review-skill-not-selected\n\s+tool: Skill\n\s+input_match: aaa-code-review\n\s+min: 0\n\s+max: 0/, caseId);
  }
});

test("the evidence statement covers the current version and says what did not run", async () => {
  const packageInfo = JSON.parse(await text("package.json"));
  const evidence = await text("docs/evidence.md");
  const version = packageInfo.version.replaceAll(".", "\\.");
  const section = evidence.match(new RegExp(`^## v${version}\\b[\\s\\S]*?(?=^## |(?![\\s\\S]))`, "m"));

  assert.ok(section, `docs/evidence.md needs a "## v${packageInfo.version}" section`);
  assert.match(section[0], /npm test/);
  assert.match(section[0], /[Nn]ot run/);
});

test("historical release receipts stay bound to their own tags", async () => {
  const receipts = (await readdir(path.join(root, "evidence", "releases"))).filter((name) => name.endsWith(".json")).sort();
  assert.ok(receipts.length > 0);
  for (const name of receipts) {
    const receipt = JSON.parse(await text(`evidence/releases/${name}`));
    assert.equal(receipt.schema, "aaa-code-release-evidence/v1");
    assert.equal(name, `v${receipt.release}.json`);
    assert.equal(receipt.frozen_ref, `v${receipt.release}`);
    for (const gate of receipt.gates) {
      assert.match(gate.status, /^(PASS|BLOCKED|UNVERIFIED)$/);
    }
  }
});
