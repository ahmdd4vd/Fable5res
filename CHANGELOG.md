# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] — 2026-06-16

### Added
- **YAML frontmatter** added to all 5 `SKILL.md` files (`name` + `description` fields), making
  the skills discoverable by the [`skills` CLI](https://github.com/vercel-labs/skills) and
  indexable by the [skills.sh](https://skills.sh) open agent skills marketplace.
- New README section "Install via skills.sh" with `npx skills add ahmdd4vd/Fable5res` examples
  for installing individual skills into 70+ supported coding agents.
- New skills.sh badge in the README hero header.
- All 5 Fable 5 skills are now also installable via:
  ```bash
  npx skills add ahmdd4vd/Fable5res --skill fable-debug -a claude-code -a cursor
  npx skills add ahmdd4vd/Fable5res --all
  ```

### Compatibility
- Skills now compatible with the [Agent Skills specification](https://agentskills.io) used by
  the `skills` CLI (vercel-labs/skills, 22k+ stars).
- Skills can be installed into 70+ coding agents via the `skills` CLI:
  Claude Code, Cursor, Cline, Codex, Windsurf, Continue, Gemini CLI, GitHub Copilot,
  OpenCode, Roo Code, Goose, Amp, Replit, Trae, Kimi Code CLI, Qwen Code, and many more.

### Verified (unchanged)
- 31/31 quantified claims pass against source dataset (`data/VERIFICATION_REPORT.json`).
- 100.00% MiniMax M3 emulation across 7 scenarios (`docs/GRADE_A_FINAL_REPORT.md`).

---

## [1.1.0] — 2026-06-16

### Changed (breaking — license)
- **License changed from MIT to AGPL-3.0-only.**
- Reason: the source dataset (`Kuberwastaken/Fable-5-traces`) is licensed under
  AGPL-3.0, and `fable5-skills` is derived from that dataset. To comply with the
  copyleft terms, this package inherits AGPL-3.0.
- All downstream users who modify, redistribute, or build network services on top
  of this package must publish their source code under AGPL-3.0.
- For enterprise use that cannot tolerate AGPL, contact the maintainer to discuss
  a dual-license arrangement.

### Changed
- README completely redesigned: modern professional layout with visual benchmark
  bars, collapsible detail sections, badges, and clearer structure.
- `package.json` `license` field updated to `AGPL-3.0-only`. Added `licenses`
  array with SPDX URL.
- `LICENSE` file replaced with full AGPL-3.0 text (680 lines) including copyright
  header.
- Author field updated from `Kuberwastaken + Fable 5 Skills Working Group` to
  `ahmdd4vd + Fable 5 Skills Working Group`.

### Added
- Explicit "License note" callout in README explaining the AGPL-3.0 inheritance
  from the source dataset.
- Collapsible detail sections in README for the behavioral profile (CoT structure,
  linguistic signature, tool usage, session-level patterns).

### Verified (unchanged from 1.0.0)
- 31/31 quantified claims pass against source dataset (`data/VERIFICATION_REPORT.json`).
- 100.00% MiniMax M3 emulation across 7 scenarios (`docs/GRADE_A_FINAL_REPORT.md`).

---

## [1.0.0] — 2026-06-16

### Added
- Initial public release (under MIT — superseded by 1.1.0).
- 5 reasoning skills distilled from 4,665 real Claude Fable 5 chain-of-thought traces:
  - `fable-think` — Foundational per-turn reasoning loop
  - `fable-code` — Read → Understand → Plan → Write → Verify → Iterate
  - `fable-debug` — Hypothesis-driven root cause analysis
  - `fable-architect` — Vertical-slice system design
  - `fable-verify` — 5-phrase verification vocabulary
- CLI installer (`fable5-skills`) with `init`, `list`, `show`, `doctor` subcommands.
- Multi-agent layout support: `claude-code`, `cursor`, `cline`, `windsurf`, `continue`, `generic`.
- Quantitative verification report — 31/31 claims pass (100% pass rate) against the source dataset.
- MiniMax M3 emulation harness — 9 iterative test rounds, final score 100.00% (Grade A).

### Verified
- Every quantified claim in every SKILL.md is within 5% of the actual measured value
  from the 4,665-trace source dataset (`data/VERIFICATION_REPORT.json`).
- All 7 emulation test scenarios against MiniMax M3 pass at 100% in the final round
  (`docs/GRADE_A_FINAL_REPORT.md`).
