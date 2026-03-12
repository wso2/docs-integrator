# WSO2 Integrator Docs

Documentation source for WSO2 Integrator, built with Docusaurus.

## Repository Layout

- `wso2-integrator-docs/` - Docusaurus site source
- `issue_template.md` - issue template
- `pull_request_template.md` - PR template

## Prerequisites

- Node.js `>= 20` (project is tested with Node 20)
- npm `>= 10`

## Quick Start

```bash
cd wso2-integrator-docs
npm install
npm run start
```

Then open the local URL printed in the terminal (usually `http://localhost:3000`).

## Common Commands

Run these from `wso2-integrator-docs/`:

```bash
npm run start      # local dev server (hot reload)
npm run build      # production build in ./build
npm run serve      # serve built site locally
npm run typecheck  # TypeScript checks
npm run clear      # clear Docusaurus cache
```

## Contributing Guide

### 1) Create a Branch

```bash
git checkout -b docs/<short-topic>
```

### 2) Make Changes

Typical files:

- Markdown docs: `wso2-integrator-docs/docs/`
- Site config: `wso2-integrator-docs/docusaurus.config.ts`
- Sidebar structure: `wso2-integrator-docs/sidebars.ts`
- Styling overrides: `wso2-integrator-docs/src/css/custom.css`

### 3) Validate Locally

```bash
cd wso2-integrator-docs
npm run typecheck
npm run build
```

Use `npm run start` while editing for quick preview.

### 4) Commit

Use clear, scoped commit messages.

Examples:

- `docs(api): clarify OAuth token rotation steps`
- `docs(nav): reorganize integration examples sidebar`
- `style: improve table readability on mobile`

### 5) Open a Pull Request

- Fill in `pull_request_template.md`
- Link related issue(s)
- Add screenshots for UI/styling changes
- Call out breaking or structural doc changes

## Content Quality Checklist

Before opening a PR, confirm:

- Links work and are not broken
- Headings are consistent and scannable
- Code snippets are complete and tested where possible
- New pages are added to sidebar/navigation if needed
- Build and type checks pass

## Working with AI Agents

AI-assisted contributions are welcome.

### Rules for Agent-Assisted Changes

- Treat AI output as a draft; a human reviewer remains responsible
- Verify technical accuracy against source code and official docs
- Do not commit secrets, tokens, or internal-only data
- Keep changes small and reviewable
- Include a short "AI usage note" in the PR description

### Suggested AI Prompt Template

```text
Task: <what to change>
Scope: <exact files/folders allowed>
Constraints: <style, terminology, version, formatting>
Validation: run `npm run typecheck` and `npm run build`
Output: summarize changed files and rationale
```

### AI Usage Note (for PR description)

```text
AI-assisted: Yes
Tool: <Codex/Claude/Copilot/Other>
How used: <drafting/editing/refactoring/checking>
Human verification: <what you manually validated>
```

## Troubleshooting

- `npm run dev` fails: this project uses `npm run start` for local development.
- Dependency issues: delete `node_modules` and `package-lock.json`, then run `npm install`.
- Node version mismatch: run `nvm use 20`.

## License

Apache 2.0. See `LICENSE`.
