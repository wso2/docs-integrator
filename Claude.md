# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Layout

- `en/` — Docusaurus 3.9.2 site (primary working directory for all site work)
- `en/docs/` — 700+ Markdown documentation source files
- `en/docusaurus.config.ts` — site configuration (URL, navbar, plugins)
- `en/sidebars.ts` — navigation structure
- `en/src/` — React components and CSS overrides
- `en/static/` — static assets (images, etc.)
- `.github/instructions/*.instructions.md` — style guidelines enforced for all doc changes
- `.github/claude/system_prompt.txt` — instructions for the Claude GitHub automation agent
- `Information Architecture Guidelines.md` — **primary reference** for IA, design principles, section boundaries, page templates, and terminology

## Commands

All commands run from `en/`:

```bash
npm install        # install dependencies
npm run start      # local dev server at localhost:3000 (hot reload)
npm run build      # production build to ./build
npm run serve      # serve the production build locally
npm run typecheck  # TypeScript type checking
npm run clear      # clear Docusaurus cache (use when seeing stale build issues)
```

Validate before opening a PR:
```bash
npm run typecheck && npm run build
```

## Information Architecture

See [`Information Architecture Guidelines.md`](./Information%20Architecture%20Guidelines.md) for the complete IA specification — section structure, page-level content plans, design principles, page templates, and the full terminology table.

The sidebar (defined in `en/sidebars.ts`) follows seven sections, each answering a distinct developer question:

1. **Get Started** — "What is this and how do I begin?"
2. **Develop** — "How do I build, transform, and test X?" *(code still on your machine)*
3. **Connectors** — "Can I connect to Y?" *(LLM connectors live here too; GenAI references them)*
4. **GenAI** — "How do I build AI agents, RAG, or MCP?" *(building AI-powered integrations, not AI that helps you code)*
5. **Tutorials** — "Show me a complete, real example" *(end-to-end narratives; AI tutorials live under GenAI)*
6. **Deploy & Operate** — "How do I ship, run, and secure this?" *(once code leaves your machine)*
7. **Reference** — "What's the exact syntax/config/API for Z?"

When adding a new page, update `en/sidebars.ts` to include it in the appropriate section. When unsure which section a topic belongs to, consult the **Section Differentiation Rules** table in the IA guidelines.

### Terminology

Always use the canonical terms from the IA guidelines:

| Use this | Not this |
|---|---|
| WSO2 Integrator | BI, Ballerina Integrator, VS Code |
| integration | flow, pipeline, process |
| service | API (unless about API management) |
| connector | adapter, driver |
| visual designer | drag-and-drop editor, canvas |
| pro-code | source code view, text mode |
| agent | bot, assistant |
| *(avoid MI/ESB terms)* | mediators, sequences, proxy services |

## Documentation Style (Microsoft Style Guide — mandatory)

All documentation must comply with the [Microsoft Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/):

- Active voice, present tense
- Sentence case for headings (capitalize only first word and proper nouns)
- No decorative symbols (¶, →, ») in headings or text
- Numbered lists for sequential tasks, bulleted for non-sequential
- **Bold** for UI labels and button names (e.g., **Create**)
- Backticks for code elements, file paths, and URLs in prose
- Descriptive link text, not raw URLs
- Plain language; avoid jargon and ambiguous pronouns

**Scope:**
- New documents: 100% compliance required throughout
- Existing documents: apply style guidelines only to newly added/modified content


## Branch and Commit Conventions

```bash
git checkout -b docs/<short-topic>
```

Commit message format: `docs(scope): description` (e.g., `docs(api): clarify OAuth token rotation steps`)
