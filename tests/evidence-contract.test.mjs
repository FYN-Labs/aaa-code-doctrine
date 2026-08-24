import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const expectedCases = [
  "adversarial-assurance-gate",
  "assurance-family-collapse",
  "capability-gap",
  "concurrent-work",
  "existing-owner",
  "growing-architecture",
  "security-release-boundary",
  "self-review-boundary",
  "trivial-edit",
  "unrelated-doc-summary",
];

async function bytes(relativePath) {
  return readFile(path.join(root, relativePath));
}

async function text(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
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

test("the release receipt binds claims to the current product bytes", async () => {
  const packageInfo = JSON.parse(await text("package.json"));
  const receipt = JSON.parse(await text(`evidence/releases/v${packageInfo.version}.json`));

  assert.equal(receipt.schema, "aaa-code-release-evidence/v1");
  assert.equal(receipt.release, packageInfo.version);
  assert.equal(receipt.frozen_ref, `v${packageInfo.version}`);
  assert.equal(receipt.assurance_contract.minimum_additional_reviewer_arms, 2);
  assert.equal(receipt.assurance_contract.distinct_resolved_model_families, 3);
  assert.equal(receipt.assurance_contract.distinct_model_developers, 3);
  assert.equal(receipt.assurance_contract.blind_until_both_complete, true);
  assert.equal(receipt.assurance_contract.same_frozen_subject, true);
  assert.equal(receipt.assurance_contract.resolved_identity_required, true);
  assert.equal(receipt.assurance_contract.qualification_reference_required, true);
  assert.equal(receipt.assurance_contract.disagreement_handling, "preserved");
  assert.equal(receipt.assurance_contract.authority_granted, "none");
  assert.deepEqual(receipt.behavioral_cases.map((entry) => entry.case_id).sort(), expectedCases);
  assert.deepEqual(
    receipt.subject.files
      .map((entry) => entry.path)
      .filter((entry) => entry.startsWith("evals/"))
      .sort(),
    expectedCases.map((caseId) => `evals/${caseId}/case.yaml`).sort(),
  );

  for (const subject of receipt.subject.files) {
    assert.equal(subject.sha256, sha256(await bytes(subject.path)), subject.path);
  }

  for (const gate of receipt.gates) {
    assert.match(gate.status, /^(PASS|BLOCKED|UNVERIFIED)$/);
    if (["agent-skills-validators", "codex-plugin-validator"].includes(gate.id)) {
      assert.match(gate.validator_sha256, /^[a-f0-9]{64}$/);
      assert.ok(gate.validator_source);
    }
    if (gate.status === "PASS" && gate.acceptance_stages.includes("invocation")) {
      assert.ok(gate.selection_event, `${gate.id} needs an observable selection event`);
    }
  }

  const assuranceGate = receipt.gates.find((gate) => gate.id === "adversarial-assurance-runtime");
  assert.ok(assuranceGate, "receipt needs the adversarial assurance runtime gate");
  assert.equal(assuranceGate.status, receipt.assurance_contract.execution_status);
  assert.equal(
    receipt.not_claimed.includes("executed multi-model assurance for this release"),
    assuranceGate.status !== "PASS",
  );

  assert.ok(receipt.not_claimed.includes("universal automatic trigger reliability"));
  assert.ok(receipt.not_claimed.includes("measured code-quality improvement"));
  assert.ok(receipt.not_claimed.includes("security or release certification"));
});
