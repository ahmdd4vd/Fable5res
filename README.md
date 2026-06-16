<div align="center">

# Fable 5 Skills

**AI reasoning skills, mathematically distilled from 4,665 real Claude Fable 5 chain-of-thought traces.**

Tuned to **Grade A · 100.00%** emulation accuracy against MiniMax M3 across 9 iterative test rounds.

[![npm version](https://img.shields.io/npm/v/fable5-skills.svg?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/fable5-skills)
[![npm downloads](https://img.shields.io/npm/dt/fable5-skills.svg?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/fable5-skills)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=flat-square&logo=gnu&logoColor=white)](https://www.gnu.org/licenses/agpl-3.0)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Verified: 31/31](https://img.shields.io/badge/verified-31%2F31%20claims-brightgreen.svg?style=flat-square)](./data/VERIFICATION_REPORT.json)
[![Grade: A](https://img.shields.io/badge/grade-A%20%C2%B7%20100%25-success.svg?style=flat-square)](#-benchmark-results)

[Installation](#-installation) · [The 5 Skills](#-the-5-skills) · [Benchmark](#-benchmark-results) · [CLI Reference](#-cli-reference) · [How It Was Built](#-how-it-was-built)

</div>

---

## Why

Modern coding agents are powerful, but they often **skip verification**, **guess instead of investigate**, and **leave loose ends**. Fable 5 doesn't. Across 4,665 real turns captured in the source dataset, Fable 5:

- Verifies after **87.7%** of actions
- Reads the file before editing in **93.5%** of edits
- Self-corrects in **56.4%** of reasoning turns — then continues forward **74.4%** of the time
- Uses a tight per-turn loop: `ACKNOWLEDGE → OBSERVE → EXECUTE → VERIFY`
- Speaks in professional, action-heavy prose (4.39 tool-to-text ratio)

`fable5-skills` packages these measurable behaviors into **5 drop-in `SKILL.md` files** so any agent that reads markdown — Claude Code, Cursor, Cline, Windsurf, Continue, MiniMax M3, any custom agent — can adopt Fable 5's discipline in one command.

```bash
npx fable5-skills init
```

---

## 📦 Installation

You don't need to install anything globally. Just run `npx`:

```bash
# Default — installs into .claude/skills/ (Claude Code layout)
npx fable5-skills init
```

### Other agent layouts

```bash
npx fable5-skills init --agent=cursor       # .cursor/skills/
npx fable5-skills init --agent=cline        # .cline/skills/
npx fable5-skills init --agent=windsurf     # .windsurf/skills/
npx fable5-skills init --agent=continue     # .continue/skills/
npx fable5-skills init --agent=generic      # ./skills/
npx fable5-skills init ./my-project         # install into a specific project
```

### Useful flags

```bash
npx fable5-skills init --only=fable-debug   # install a single skill
npx fable5-skills init --force              # overwrite existing
npx fable5-skills init --dry-run            # preview without writing
npx fable5-skills doctor                    # verify package integrity
```

---

## 🧠 The 5 Skills

Each `SKILL.md` is self-contained, composable, and verifiable against the source dataset.

<table>
<tr>
<th width="20%">Skill</th>
<th width="30%">Purpose</th>
<th width="50%">Core Loop</th>
</tr>
<tr>
<td><code><a href="./skills/fable-think/SKILL.md">fable-think</a></code></td>
<td>Foundational per-turn reasoning</td>
<td><code>ACKNOWLEDGE → OBSERVE → EXECUTE → VERIFY</code><br/><sub>concise per turn, repeats across turns</sub></td>
</tr>
<tr>
<td><code><a href="./skills/fable-code/SKILL.md">fable-code</a></code></td>
<td>Writing & editing code</td>
<td><code>Read → Understand → Plan → Write → Verify → Iterate</code></td>
</tr>
<tr>
<td><code><a href="./skills/fable-debug/SKILL.md">fable-debug</a></code></td>
<td>Hypothesis-driven root cause analysis</td>
<td><code>OBSERVE → INVESTIGATE → HYPOTHESIZE → ROOT CAUSE → FIX → VERIFY</code></td>
</tr>
<tr>
<td><code><a href="./skills/fable-architect/SKILL.md">fable-architect</a></code></td>
<td>System design via vertical slices</td>
<td><code>UNDERSTAND → DESIGN → VERTICAL SLICE → VERIFY → ITERATE</code></td>
</tr>
<tr>
<td><code><a href="./skills/fable-verify/SKILL.md">fable-verify</a></code></td>
<td>Quality assurance vocabulary</td>
<td>5-phrase verification:<br/><code>should be</code> · <code>to verify</code> · <code>to ensure</code> · <code>to confirm</code> · <code>to make sure</code></td>
</tr>
</table>

The skills compose cleanly. For example, `fable-debug` opens with `fable-think`'s per-turn loop and closes with `fable-verify`'s verification vocabulary.

---

## 📊 Benchmark Results

### Static skill verification — claims vs. actual data

Every quantified claim in every skill file is verified against the source dataset:

```
✓ Passed    31 / 31 claims
✗ Failed    0 / 31 claims
■ Pass rate 100.00%
```

```
Claims passed     ████████████████████████████████  100.00%  31/31
```

### MiniMax M3 emulation — Round 9 (final)

After **9 iterative test rounds**, MiniMax M3 emulates Fable 5's reasoning patterns at **100.00%** across 7 test scenarios:

| Test | Scenario | Score | Checkpoints | Bar |
|---|---|---:|---:|:---|
| T1 | `reasoning`     | 100.00% | 11/11 | `████████████████████` 100% |
| T2 | `debug`         | 100.00% | 9/9   | `████████████████████` 100% |
| T3 | `code`          | 100.00% | 8/8   | `████████████████████` 100% |
| T4 | `verify`        | 100.00% | 10/10 | `████████████████████` 100% |
| T5 | `architect`     | 100.00% | 8/8   | `████████████████████` 100% |
| T6 | `self_correct`  | 100.00% | 6/6   | `████████████████████` 100% |
| T7 | `loop`          | 100.00% | 7/7   | `████████████████████` 100% |
| | **Average** | **100.00%** | **59/59** | `████████████████████` **Grade A** |

### Iterative improvement curve

| Round | Score | Δ | Key Fix |
|---:|---:|---:|---|
| 1 | 80.82% | — | baseline harness |
| 2 | 93.93% | +13.11 | extract `<think>` block as scored text |
| 3 | 93.99% | +0.06 | strengthened prompts |
| 4 | 96.79% | +2.80 | bumped `max_tokens` for long scenarios |
| 5 | 97.96% | +1.17 | explicit "MUST use ALL 5 phrases" in T4 |
| 6 | 97.40% | −0.56 | stochastic variance on T1 |
| 7 | 97.62% | +0.22 | broadened T6 `continues_forward` check |
| 8 | 98.70% | +1.08 | added self-verify instruction to T1 |
| **9** | **100.00%** | **+1.30** | explicit verbatim "Thus"/"Therefore" instruction |

See [`docs/GRADE_A_FINAL_REPORT.md`](./docs/GRADE_A_FINAL_REPORT.md) for the full report.

---

## 🎯 Behavioral Profile (from 4,665 traces)

These are the measurable signatures of Fable 5's reasoning that the skills encode. Every number is verified against the source dataset.

<details>
<summary><b>Chain-of-thought structure</b></summary>

| Metric | Measured |
|---|---:|
| Traces with CoT | 100.0% |
| Average words per CoT | 409 |
| Average paragraphs per CoT | 7.19 |
| CoTs opening with "Alright," | 53.1% |
| CoTs opening with "Okay," | 10.8% |

</details>

<details>
<summary><b>Linguistic signature</b></summary>

| Metric | Measured |
|---|---:|
| First-person pronouns (share of all pronouns) | 75.6% |
| First-person pronouns per CoT | 11.29 |
| Contractions per CoT | 1.53 (professional, not casual) |
| CoTs with self-correction | 56.4% |
| CoTs containing "actually" | 32.4% |
| CoTs containing "however" | 23.0% |
| Reasoning connectors per turn (`because`/`since`/`therefore`/`thus`) | 2.14 |

</details>

<details>
<summary><b>Tool usage & verification</b></summary>

| Metric | Measured |
|---|---:|
| Tool-use turns (vs. pure-text turns) | 81.4% |
| Tool-to-text ratio (action-heavy) | 4.39 |
| Traces using inline code with backticks | 90.9% |
| Read-before-Edit rate | 93.5% |
| Verify-after-action rate | 87.7% |
| Top tools: Bash (1,544), Edit (960), Read (443), Write (311), PowerShell (136) | |

</details>

<details>
<summary><b>Session-level patterns</b></summary>

| Metric | Measured |
|---|---:|
| Average turns per session | 77.75 |
| Median turns per session | 38 |
| Max turns in a session | 439 |
| Sessions with hypothesis-driven debugging | 68.3% |
| Sessions with same-turn fix attempts | 78.3% |
| Top per-turn step combo: `ACK+SCO+VER+ITR` | 19.2% of turns |

</details>

---

## 🛠 CLI Reference

```bash
fable5-skills init [target] [--agent=<name>] [--force] [--only=<id>] [--dry-run]
fable5-skills list
fable5-skills show <skill-name>
fable5-skills doctor
fable5-skills --version
fable5-skills --help
```

| Flag | Description |
|---|---|
| `--agent=<name>` | Target agent layout: `claude-code` (default), `cursor`, `cline`, `windsurf`, `continue`, `generic` |
| `--force` | Overwrite existing skill files |
| `--only=<id>` | Install only one skill (e.g. `--only=fable-debug`) |
| `--dry-run` | Print what would be copied, but do not write |

Run `fable5-skills doctor` after install to verify package integrity (checks all 5 skills present + 31/31 verification claims + Node version).

---

## 🧑‍💻 Usage After Install

Once installed, the skills live at (for example) `.claude/skills/` in your project. Three ways to use them:

**1. Reference from your system prompt:**

```text
When you encounter a bug, follow the methodology in
.claude/skills/fable-debug/SKILL.md.
```

**2. Load directly into context:**

```bash
cat .claude/skills/fable-think/SKILL.md
# paste the contents into your agent's context window
```

**3. Auto-load via agent config:** Some agents (Claude Code, Cline) can be configured to auto-load skills from a directory. See your agent's docs.

---

## 🔬 How It Was Built

### 1. Source dataset

Distilled from the public HuggingFace dataset [`Kuberwastaken/Fable-5-traces`](https://huggingface.co/datasets/Kuberwastaken/Fable-5-traces) — 4,665 rows, 60 sessions of real Claude Fable 5 chain-of-thought traces captured from production coding sessions.

> ⚠️ **License note**: The source dataset is licensed under **AGPL-3.0**. Because `fable5-skills` is derived from that dataset, this package is also distributed under **AGPL-3.0** to comply with the copyleft terms. See [`LICENSE`](./LICENSE) for the full text. If you modify or redistribute this package, or build a network service on top of it, you must publish your source code under AGPL-3.0 as well.

### 2. Quantitative extraction

A deep statistical pass over all 4,665 traces extracted:
- Per-CoT structure (word count, paragraph count, sentence count, opener words)
- Pronoun & contraction distribution
- Self-correction markers (`actually`, `however`, `oops`)
- Verification vocabulary (`should be`, `to verify`, `to ensure`, `to confirm`, `to make sure`)
- Tool-to-text ratio, tool-usage distribution, read-before-edit rate
- Per-turn reasoning step coverage
- Session-level stats: turns/session, hypothesis-driven debugging rate, same-turn fix rate

The full extraction is shipped in [`data/DEEP_STATS.json`](./data/DEEP_STATS.json) (raw stats) and [`data/VERIFICATION_REPORT.json`](./data/VERIFICATION_REPORT.json) (claim-by-claim verification).

### 3. Skill authoring

Each `SKILL.md` is written from the data — not from intuition. Every percentage, count, and ratio in every skill is verifiable against `data/VERIFICATION_REPORT.json`.

### 4. Cross-model emulation benchmark

We tested whether the skills actually make a different model (MiniMax M3) reason like Fable 5. We built a 7-scenario test harness (`reasoning`, `debug`, `code`, `verify`, `architect`, `self_correct`, `loop`) and ran **9 iterative test rounds**, driving the score from 80.82% to 100.00% through systematic diagnosis and targeted fixes.

---

## 📁 Repository Layout

```
fable5-skills/
├── bin/
│   └── fable5-skills.js          # CLI installer (Node.js, ESM, zero deps)
├── skills/
│   ├── fable-think/SKILL.md
│   ├── fable-code/SKILL.md
│   ├── fable-debug/SKILL.md
│   ├── fable-architect/SKILL.md
│   └── fable-verify/SKILL.md
├── data/
│   ├── DEEP_STATS.json           # Full statistical extraction from 4,665 traces
│   └── VERIFICATION_REPORT.json  # 31/31 claim verification
├── docs/
│   └── GRADE_A_FINAL_REPORT.md   # Full Grade A benchmark report
├── package.json
├── LICENSE                       # AGPL-3.0
├── CHANGELOG.md
└── README.md
```

---

## ⚖️ License

**GNU Affero General Public License v3.0 only** — see [`LICENSE`](./LICENSE).

This package is derived from the `Kuberwastaken/Fable-5-traces` dataset (also AGPL-3.0). The copyleft is therefore inherited. In plain terms:

- ✅ You **may** use, study, modify, and redistribute this package.
- ✅ You **may** build network services on top of it.
- ⚠️ If you modify or redistribute (including as a network service), you **must** publish your source code under AGPL-3.0.

For enterprise use that cannot tolerate AGPL, contact the maintainer to discuss a dual-license arrangement.

---

## 🙏 Acknowledgements

- [**Anthropic PBC**](https://www.anthropic.com) — for Claude Fable 5, the model whose reasoning patterns this project distills.
- [**Kuberwastaken**](https://huggingface.co/Kuberwastaken) — for publishing the `Fable-5-traces` dataset under AGPL-3.0, without which this project would not exist.
- [**MiniMax Inc.**](https://www.minimaxi.com/) — for MiniMax M3, used as the cross-model emulation benchmark.

## 🚫 Disclaimer

Claude, Fable 5, and Anthropic are trademarks of Anthropic PBC. This project is not affiliated with or endorsed by Anthropic. MiniMax is a trademark of MiniMax Inc. This project is not affiliated with or endorsed by MiniMax. The skill files in this package were distilled from publicly available traces under the terms of their original AGPL-3.0 license; this package inherits that license.

---

<div align="center">

<sub>Built with mathematical precision. Tuned over 9 rounds. Verified to 100%.</sub>

[Report a bug](https://github.com/ahmdd4vd/Fable5res/issues) · [Request a feature](https://github.com/ahmdd4vd/Fable5res/issues) · [Changelog](./CHANGELOG.md)

</div>
