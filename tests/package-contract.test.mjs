import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pluginRoot = path.join(root, "plugins", "aaa-code");

// Word budgets keep the skills readable in full by any model. A sentence that
// does not fit has to displace one; see AGENTS.md.
const WORD_BUDGET = { "aaa-code": 800, "aaa-code-review": 650 };

async function json(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

async function text(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(absolute));
    else files.push(absolute);
  }
  return files;
}

function skillBody(skill) {
  const match = skill.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  assert.ok(match, "SKILL.md must start with YAML front matter");
  return match[1];
}

function wordCount(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

test("all host manifests point to the same dependency-free skill package", async () => {
  const packageInfo = await json("package.json");
  const codex = await json("plugins/aaa-code/.codex-plugin/plugin.json");
  const claude = await json("plugins/aaa-code/.claude-plugin/plugin.json");
  const codexMarketplace = await json(".agents/plugins/marketplace.json");
  const claudeMarketplace = await json(".claude-plugin/marketplace.json");
  const mainSkill = await text("plugins/aaa-code/skills/aaa-code/SKILL.md");
  const reviewSkill = await text("plugins/aaa-code/skills/aaa-code-review/SKILL.md");

  assert.equal(codex.name, "aaa-code");
  assert.equal(claude.name, codex.name);
  assert.equal(codex.version, packageInfo.version);
  assert.equal(claude.version, packageInfo.version);
  assert.match(mainSkill, new RegExp(`version: "${packageInfo.version.replaceAll(".", "\\.")}"`));
  assert.match(reviewSkill, new RegExp(`version: "${packageInfo.version.replaceAll(".", "\\.")}"`));
  assert.equal(codex.skills, "./skills/");
  assert.equal(codexMarketplace.plugins[0].source.path, "./plugins/aaa-code");
  assert.equal(claudeMarketplace.plugins[0].source, "./plugins/aaa-code");
  assert.equal(codex.hooks, undefined);
  assert.equal(claude.hooks, undefined);
  assert.equal(codex.mcpServers, undefined);
});

test("the plugin file topology is fail-closed and contains instructions only", async () => {
  const files = (await filesUnder(pluginRoot))
    .map((file) => path.relative(pluginRoot, file).split(path.sep).join("/"))
    .sort();

  assert.deepEqual(files, [
    ".claude-plugin/plugin.json",
    ".codex-plugin/plugin.json",
    "skills/aaa-code-review/SKILL.md",
    "skills/aaa-code-review/agents/openai.yaml",
    "skills/aaa-code/SKILL.md",
    "skills/aaa-code/agents/openai.yaml",
  ]);
});

test("AAA-CODE.md owns the core and the implementation skill and README carry it verbatim", async () => {
  const core = (await text("AAA-CODE.md")).trim();
  const mainSkill = await text("plugins/aaa-code/skills/aaa-code/SKILL.md");
  const readme = await text("README.md");

  assert.ok(core.length > 0);
  assert.equal(core.split("\n").filter((line) => /^\d+\. /.test(line)).length, 11, "the core is eleven numbered lines");
  assert.ok(mainSkill.includes(core), "aaa-code/SKILL.md must contain AAA-CODE.md verbatim");
  assert.ok(readme.includes(core), "README.md must contain AAA-CODE.md verbatim");
});

test("skills stay inside their word budget, name no model, and keep implicit invocation policy", async () => {
  const core = await text("AAA-CODE.md");
  const mainSkill = await text("plugins/aaa-code/skills/aaa-code/SKILL.md");
  const reviewSkill = await text("plugins/aaa-code/skills/aaa-code-review/SKILL.md");
  const mainUi = await text("plugins/aaa-code/skills/aaa-code/agents/openai.yaml");
  const reviewUi = await text("plugins/aaa-code/skills/aaa-code-review/agents/openai.yaml");

  assert.ok(wordCount(skillBody(mainSkill)) <= WORD_BUDGET["aaa-code"], `aaa-code body exceeds ${WORD_BUDGET["aaa-code"]} words`);
  assert.ok(wordCount(skillBody(reviewSkill)) <= WORD_BUDGET["aaa-code-review"], `aaa-code-review body exceeds ${WORD_BUDGET["aaa-code-review"]} words`);
  assert.doesNotMatch(core + mainSkill + reviewSkill, /\[TODO:|TODO\b/);
  assert.doesNotMatch(core + mainSkill + reviewSkill, /\b(?:Opus|Sonnet|Haiku|Kimi|GLM|GPT|Gemini|Claude|OpenAI|Anthropic)\b/);
  assert.match(mainUi, /allow_implicit_invocation: true/);
  assert.match(reviewUi, /allow_implicit_invocation: true/);
});

test("versioned install URLs and the product contract match the package release", async () => {
  const packageInfo = await json("package.json");
  const readme = await text("README.md");
  const productContract = await text("docs/product-contract.md");
  const tag = `v${packageInfo.version.replaceAll(".", "\\.")}`;
  const version = packageInfo.version.replaceAll(".", "\\.");

  assert.match(readme, new RegExp(`${tag}/plugins/aaa-code/skills/aaa-code/SKILL\\.md`));
  assert.match(readme, new RegExp(`${tag}/plugins/aaa-code/skills/aaa-code-review/SKILL\\.md`));
  assert.match(productContract, new RegExp("Version `" + version + "`"));
});

test("published product artifacts exclude machine-local and credential-shaped data", async () => {
  const relativeFiles = [
    ".gitignore",
    "AAA-CODE.md",
    "AGENTS.md",
    "LICENSE",
    "README.md",
    "THIRD_PARTY_NOTICES.md",
    "package.json",
  ];
  for (const directory of [
    ".agents",
    ".claude-plugin",
    ".github",
    "docs",
    "evals",
    "evidence",
    "plugins",
    "tests",
  ]) {
    for (const absolute of await filesUnder(path.join(root, directory))) {
      relativeFiles.push(path.relative(root, absolute).split(path.sep).join("/"));
    }
  }

  for (const relativePath of relativeFiles) {
    const contents = await text(relativePath);
    assert.doesNotMatch(contents, /\/Users\/|\/home\/[a-z]+\/|gh[opsu]_[A-Za-z0-9]{8,}|sk-[A-Za-z0-9]{16,}|-----BEGIN [A-Z ]*PRIVATE KEY-----/, relativePath);
  }
});

test("public documentation pins upstream identity, commit, owners, and license headings", async () => {
  const readme = await text("README.md");
  const notices = await text("THIRD_PARTY_NOTICES.md");

  assert.match(readme, /FYN Labs/);
  for (const upstream of [
    {
      url: "https://github.com/DietrichGebert/ponytail",
      commit: "2ed6c52c9d7e5e56942508591085fd45dea277d3",
      owner: "Copyright (c) 2026 DietrichGebert",
    },
    {
      url: "https://github.com/btseee/clean-code-skills",
      commit: "6df6e6aae7c03317670601eb449fad8aeeccbe30",
      owner: "Copyright (c) 2026 Battseren Badral",
    },
  ]) {
    assert.match(readme, new RegExp(upstream.commit));
    assert.match(notices, new RegExp(upstream.url.replaceAll("/", "\\/")));
    assert.match(notices, new RegExp(upstream.commit));
    assert.match(notices, new RegExp(upstream.owner.replace(/[()]/g, "\\$&")));
  }
  assert.equal([...notices.matchAll(/MIT License/g)].length, 2);
});
