#!/usr/bin/env node
/**
 * fable5-skills — CLI installer
 *
 * Distilled reasoning skills from 4,665 real Claude Fable 5 chain-of-thought traces.
 * Mathematically tuned. Grade A (100%) emulation accuracy against MiniMax M3.
 *
 * Usage:
 *   fable5-skills init [target] [--agent=claude-code|cursor|cline|generic] [--force]
 *   fable5-skills list
 *   fable5-skills doctor
 *   fable5-skills show <skill-name>
 *   fable5-skills --version
 *   fable5-skills --help
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, copyFileSync, statSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const PKG_ROOT   = resolve(__dirname, '..');
const SKILLS_DIR = join(PKG_ROOT, 'skills');

// ---------- metadata ----------------------------------------------------------
const SKILLS = [
  { id: 'fable-think',     name: 'Fable Think',     purpose: 'Foundational per-turn reasoning loop (ACKNOWLEDGE → OBSERVE → EXECUTE → VERIFY)' },
  { id: 'fable-code',      name: 'Fable Code',      purpose: 'Code writing & editing (Read → Understand → Plan → Write → Verify → Iterate)' },
  { id: 'fable-debug',     name: 'Fable Debug',     purpose: 'Hypothesis-driven root cause analysis (OBSERVE → INVESTIGATE → HYPOTHESIZE → ROOT CAUSE → FIX → VERIFY)' },
  { id: 'fable-architect', name: 'Fable Architect', purpose: 'System design via vertical slices (UNDERSTAND → DESIGN → SLICE → VERIFY → ITERATE)' },
  { id: 'fable-verify',    name: 'Fable Verify',    purpose: '5-phrase verification vocabulary (should be / to verify / to ensure / to confirm / to make sure)' },
];

const VERSION = (() => {
  try { return JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf8')).version; }
  catch { return '0.0.0'; }
})();

// ---------- agent targets -----------------------------------------------------
const AGENT_TARGETS = {
  'claude-code': '.claude/skills',
  'cursor':      '.cursor/skills',
  'cline':       '.cline/skills',
  'windsurf':    '.windsurf/skills',
  'continue':    '.continue/skills',
  'generic':     'skills',
};

// ---------- helpers -----------------------------------------------------------
function readArgs(argv) {
  const args = { _: [], flags: {} };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=');
      args.flags[k] = v !== undefined ? v : true;
    } else {
      args._.push(a);
    }
  }
  return args;
}

function printHelp() {
  console.log(`
fable5-skills v${VERSION}

AI reasoning skills distilled from 4,665 real Claude Fable 5 chain-of-thought traces.
Mathematically tuned. Grade A (100%) emulation accuracy against MiniMax M3.

USAGE
  fable5-skills init [target]      Install all 5 skills into [target] directory
                                    (default target depends on --agent, see below)
  fable5-skills list                List all available skills
  fable5-skills show <skill-name>   Print a skill's SKILL.md to stdout
  fable5-skills doctor              Verify package integrity (all skills present)
  fable5-skills --version           Print version
  fable5-skills --help              Show this help

OPTIONS
  --agent=<name>    Target agent layout. One of:
                      claude-code  -> .claude/skills   (default)
                      cursor       -> .cursor/skills
                      cline        -> .cline/skills
                      windsurf     -> .windsurf/skills
                      continue     -> .continue/skills
                      generic      -> ./skills
  --force           Overwrite existing skill files
  --only=<id>       Install only one skill (e.g. --only=fable-debug)
  --dry-run         Print what would be copied, but do not write

EXAMPLES
  npx fable5-skills init
  npx fable5-skills init ./my-project --agent=cursor
  npx fable5-skills init --only=fable-think --force
  npx fable5-skills show fable-debug
  fable5-skills doctor

SKILLS INCLUDED
${SKILLS.map(s => `  ${s.id.padEnd(16)} ${s.purpose}`).join('\n')}
`.trim());
}

function printVersion() { console.log(VERSION); }

function listSkills() {
  console.log('Available skills:\n');
  for (const s of SKILLS) {
    const skillPath = join(SKILLS_DIR, s.id, 'SKILL.md');
    const ok = existsSync(skillPath);
    console.log(`  ${ok ? '[ok]' : '[MISSING]'}  ${s.id.padEnd(16)} ${s.purpose}`);
  }
}

function showSkill(name) {
  if (!name) { console.error('Error: skill name required.'); process.exit(1); }
  const id = name.startsWith('fable-') ? name : `fable-${name}`;
  const p = join(SKILLS_DIR, id, 'SKILL.md');
  if (!existsSync(p)) { console.error(`Error: skill "${id}" not found.`); process.exit(1); }
  process.stdout.write(readFileSync(p, 'utf8'));
}

function doctor() {
  let ok = true;
  console.log(`fable5-skills v${VERSION} — doctor\n`);
  console.log(`Package root: ${PKG_ROOT}`);
  console.log(`Skills dir:  ${SKILLS_DIR}\n`);

  // 1. all skills present
  let present = 0;
  for (const s of SKILLS) {
    const p = join(SKILLS_DIR, s.id, 'SKILL.md');
    if (existsSync(p)) {
      const size = statSync(p).size;
      present++;
      console.log(`  [ok]   ${s.id.padEnd(16)} (${size} bytes)`);
    } else {
      ok = false;
      console.log(`  [FAIL] ${s.id.padEnd(16)} SKILL.md missing`);
    }
  }
  console.log(`\n  Skills present: ${present}/${SKILLS.length}`);

  // 2. data files
  const dataFiles = ['VERIFICATION_REPORT.json', 'DEEP_STATS.json'];
  for (const f of dataFiles) {
    const p = join(PKG_ROOT, 'data', f);
    if (existsSync(p)) {
      console.log(`  [ok]   data/${f}`);
    } else {
      ok = false;
      console.log(`  [FAIL] data/${f} missing`);
    }
  }

  // 3. verification report summary
  try {
    const vr = JSON.parse(readFileSync(join(PKG_ROOT, 'data', 'VERIFICATION_REPORT.json'), 'utf8'));
    console.log(`\nVerification report: ${vr.passed}/${vr.claims_checked} claims pass (${vr.pass_rate_pct}% pass rate)`);
    if (vr.pass_rate_pct !== 100) ok = false;
  } catch (e) {
    ok = false;
    console.log(`\n  [FAIL] Cannot parse verification report: ${e.message}`);
  }

  // 4. node version
  const nodeMajor = Number.parseInt(process.versions.node.split('.')[0], 10);
  if (nodeMajor < 18) {
    ok = false;
    console.log(`  [FAIL] Node.js >=18 required (current: ${process.versions.node})`);
  } else {
    console.log(`  [ok]   Node.js ${process.versions.node}`);
  }

  console.log(ok ? '\nResult: ALL CHECKS PASSED ✅' : '\nResult: SOME CHECKS FAILED ❌');
  process.exit(ok ? 0 : 1);
}

function init(target, opts) {
  const agent = opts.flags.agent || 'claude-code';
  if (!AGENT_TARGETS[agent]) {
    console.error(`Error: unknown --agent "${agent}". Valid: ${Object.keys(AGENT_TARGETS).join(', ')}`);
    process.exit(1);
  }

  // Resolve final install directory
  let installRoot;
  if (target) {
    installRoot = isAbsolute(target) ? target : resolve(process.cwd(), target);
    installRoot = join(installRoot, AGENT_TARGETS[agent]);
  } else {
    installRoot = join(process.cwd(), AGENT_TARGETS[agent]);
  }

  // Filter to --only if specified
  let skillsToInstall = SKILLS;
  if (opts.flags.only) {
    const wanted = opts.flags.only.startsWith('fable-') ? opts.flags.only : `fable-${opts.flags.only}`;
    skillsToInstall = SKILLS.filter(s => s.id === wanted);
    if (skillsToInstall.length === 0) {
      console.error(`Error: --only="${opts.flags.only}" did not match any skill.`);
      console.error('Valid skill ids: ' + SKILLS.map(s => s.id).join(', '));
      process.exit(1);
    }
  }

  const dryRun  = !!opts.flags.dryRun;
  const force   = !!opts.flags.force;

  console.log(`fable5-skills v${VERSION} — init\n`);
  console.log(`Agent layout : ${agent}`);
  console.log(`Install root : ${installRoot}`);
  console.log(`Mode         : ${dryRun ? 'DRY-RUN' : 'WRITE'}${force ? ' (force overwrite)' : ''}`);
  console.log(`Skills       : ${skillsToInstall.map(s => s.id).join(', ')}\n`);

  let installed = 0;
  let skipped   = 0;

  for (const s of skillsToInstall) {
    const srcSkillDir  = join(SKILLS_DIR, s.id);
    const dstSkillDir  = join(installRoot, s.id);
    const srcSkillFile = join(srcSkillDir, 'SKILL.md');
    const dstSkillFile = join(dstSkillDir, 'SKILL.md');

    if (!existsSync(srcSkillFile)) {
      console.error(`  [FAIL] source missing for ${s.id}`);
      continue;
    }

    if (existsSync(dstSkillFile) && !force) {
      console.log(`  [skip] ${s.id}  (exists; use --force to overwrite)`);
      skipped++;
      continue;
    }

    if (dryRun) {
      console.log(`  [dry ] ${s.id}  -> ${relative(process.cwd(), dstSkillFile)}`);
      installed++;
      continue;
    }

    mkdirSync(dstSkillDir, { recursive: true });
    copyFileSync(srcSkillFile, dstSkillFile);
    console.log(`  [ok]   ${s.id}  -> ${relative(process.cwd(), dstSkillFile)}`);
    installed++;
  }

  // Also drop a small README in the install root so the user knows what's there
  if (!dryRun && installed > 0) {
    const installReadme = join(installRoot, 'README.md');
    const installReadmeContent = `# Fable 5 Skills

Installed by \`fable5-skills@${VERSION}\` on ${new Date().toISOString()}.

These skills were distilled from 4,665 real Claude Fable 5 chain-of-thought traces
and tuned to Grade A (100% emulation accuracy against MiniMax M3).

## Installed skills
${skillsToInstall.map(s => `- \`${s.id}\` — ${s.purpose}`).join('\n')}

## Usage
Load the relevant SKILL.md into your agent's context, or reference it from your
system prompt. See https://github.com/Kuberwastaken/fable5-skills for full docs.

## Verify
Run \`npx fable5-skills doctor\` to re-verify package integrity.
`;
    mkdirSync(installRoot, { recursive: true });
    writeFileSync(installReadme, installReadmeContent, 'utf8');
    console.log(`\n  [ok]   README  -> ${relative(process.cwd(), installReadme)}`);
  }

  console.log(`\nDone. ${installed} skill(s) ${dryRun ? 'would be ' : ''}installed, ${skipped} skipped.`);
  if (installed > 0 && !dryRun) {
    console.log('\nNext steps:');
    console.log(`  1. Open ${relative(process.cwd(), installRoot)} in your editor`);
    console.log('  2. Reference the relevant SKILL.md from your agent\'s system prompt');
    console.log('  3. Test with a real coding task — verify the agent follows the loop');
  }
}

// ---------- main --------------------------------------------------------------
function main() {
  const args = readArgs(process.argv);
  const cmd = args._[0];

  if (args.flags.version || cmd === 'version') return printVersion();
  if (args.flags.help || cmd === 'help' || !cmd)  return printHelp();

  switch (cmd) {
    case 'init':    return init(args._[1] || null, args);
    case 'list':    return listSkills();
    case 'show':    return showSkill(args._[1]);
    case 'doctor':  return doctor();
    default:
      console.error(`Unknown command: ${cmd}\n`);
      printHelp();
      process.exit(1);
  }
}

main();
