# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] — 2026-06-16

### Added
- Initial public release.
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
