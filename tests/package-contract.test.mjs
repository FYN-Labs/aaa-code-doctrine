import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pluginRoot = path.join(root, "plugins", "aaa-code");

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

test("static skill files have no placeholders and keep implicit invocation policy", async () => {
  const mainSkill = await text("plugins/aaa-code/skills/aaa-code/SKILL.md");
  const reviewSkill = await text("plugins/aaa-code/skills/aaa-code-review/SKILL.md");
  const mainUi = await text("plugins/aaa-code/skills/aaa-code/agents/openai.yaml");
  const reviewUi = await text("plugins/aaa-code/skills/aaa-code-review/agents/openai.yaml");

  assert.doesNotMatch(mainSkill + reviewSkill, /\[TODO:|TODO\b/);
  assert.match(mainUi, /allow_implicit_invocation: true/);
  assert.match(reviewUi, /allow_implicit_invocation: true/);
});

test("versioned install URLs and evidence claims match the package release", async () => {
  const packageInfo = await json("package.json");
  const readme = await text("README.md");
  const productContract = await text("docs/product-contract.md");
  const tag = `v${packageInfo.version.replaceAll(".", "\\.")}`;
  const version = packageInfo.version.replaceAll(".", "\\.");

  assert.match(readme, new RegExp(`${tag}/plugins/aaa-code/skills/aaa-code/SKILL\\.md`));
  assert.match(readme, new RegExp(`${tag}/plugins/aaa-code/skills/aaa-code-review/SKILL\\.md`));
  assert.match(productContract, new RegExp("Version `" + version + "`"));
  assert.match(readme, /static package contract; it does not prove/);
});

test("public doctrine files exclude machine-local and credential-shaped data", async () => {
  for (const relativePath of [
    "AGENTS.md",
    "README.md",
    "docs/product-contract.md",
    "plugins/aaa-code/skills/aaa-code/SKILL.md",
    "plugins/aaa-code/skills/aaa-code-review/SKILL.md",
  ]) {
    const contents = await text(relativePath);
    assert.doesNotMatch(contents, /\/Users\/|gh[opsu]_[A-Za-z0-9]+|-----BEGIN [A-Z ]*PRIVATE KEY-----/);
  }
});

test("public documentation pins upstream identity, commit, owners, and license headings", async () => {
  const readme = await text("README.md");
  const notices = await text("THIRD_PARTY_NOTICES.md");

  assert.match(readme, /FYN Labs/);
  assert.match(readme, /Upstream benchmark results are not presented as FYN Labs results/);
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
