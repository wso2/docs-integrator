---
name: wso2-integrator-docs
description: Use when contributing to the WSO2 Integrator documentation site (docs-integrator repo). Triggers for any task that creates or edits Markdown under en/docs/, generates new documentation pages, adds Visual Designer tabs to transform docs, places contributor-supplied UI screenshots into en/static/img/, captures real UI screenshots for integration-artifact pages via Puppeteer + code-server, updates the sidebar in en/sidebars.ts, or asks "how do I write a doc page for X here?".
---

# WSO2 Integrator documentation skill

---

## 1. Content rules

All content rules — information architecture, terminology, Microsoft Style Guide, page template, visual media standards, admonition usage, URL rules, and cross-linking rules — live in one place:

**`en/content-gen/00-rules.md`**

Read it before doing any work. Attach it as context in every AI generation prompt. Do not duplicate any rule from it here.

---

## 2. Repository orientation

- **Working directory for all site work:** `en/`
- **Docs source:** `en/docs/`
- **Site config:** `en/docusaurus.config.ts`
- **Sidebar** (update for every new page): `en/sidebars.ts`
- **React/CSS overrides:** `en/src/`
- **Static assets** (screenshots, GIFs): `en/static/`
- **Content generation prompts:** `en/content-gen/`

Commands (run from `en/`):

```bash
npm install
npm run start       # dev server at localhost:3000
npm run build       # production build
npm run typecheck
npm run clear       # clear Docusaurus cache when builds go stale
```

Validate before opening a PR:

```bash
npm run typecheck && npm run build
```

Branch and commit format:

```bash
git checkout -b docs/<short-topic>
# commit: docs(scope): description
```

CI: pushes to `dev` deploy to Vercel automatically.

---

## 3. Workflows

### A. Generating a new doc page

The prompt scaffolds for each IA section live under `en/content-gen/`.

| File | Section |
|---|---|
| `en/content-gen/00-rules.md` | Global rules — **always attach this to any generation prompt** |
| `en/content-gen/01-get-started.md` | Get Started |
| `en/content-gen/02-develop.md` | Develop |
| `en/content-gen/03-connectors.md` | Connectors |
| `en/content-gen/04-genai.md` | GenAI |
| `en/content-gen/05-tutorials.md` | Tutorials |
| `en/content-gen/06-deploy-operate.md` | Deploy & Operate |
| `en/content-gen/07-reference.md` | Reference |
| `en/content-gen/prompt-quick-start.md` | Template prompt for Quick Start pages |
| `en/content-gen/prompt-http-service.md` | Ready-to-run prompt for the HTTP service page |

**Procedure:**
1. Attach `en/content-gen/00-rules.md` as context — always.
2. Attach the relevant section file (e.g., `02-develop.md`) as context.
3. Use the matching prompt from `en/content-gen/` for the page type.
4. Generate the page. Review for terminology violations. Verify code compiles (`bal build`) where possible.
5. Save under `en/docs/<section>/...` per the path in the section file.
6. Add the page to `en/sidebars.ts`.
7. Verify cross-links resolve. Run `npm run typecheck && npm run build`.

**Prompt shape for new pages.** Every generation prompt must include:
- Page identity (title, file path, URL slug, section, audience, tone)
- Content scope (topics to cover, in order)
- Per-topic designer options (exact field names — not "all options")
- Any frontend constraints (e.g., map types not supported in visual designer)
- Cross-links to include
- Screenshot placeholder paths

Do not put output formatting rules inside individual prompts — those live in `00-rules.md`. Reference them; do not repeat them.

### B. Adding screenshots — two options

**Option 1 — contributor attaches images (default, recommended)**

The contributor attaches images directly to the chat with a short description of what each shows and which page it belongs to.

When given attached images:
1. Determine the correct path under `en/static/img/` from the page being documented.
   - Integration artifacts: `en/static/img/develop/integration-artifacts/<category>/<artifact>/`
   - Transform pages: `en/static/img/develop/transform/<topic>/`
   - Get Started: `en/static/img/get-started/<page>/`
   - When in doubt, mirror the URL path of the doc page.
2. Save each image with a meaningful filename. Always provide light and dark variants:
   - `create-the-project-light.png` / `create-the-project-dark.png`
   - `add-resource-light.gif` / `add-resource-dark.gif`
3. Reference with absolute paths (Docusaurus serves `en/static/` from site root):
   ```markdown
   ![Create the project](/img/get-started/build-automation/create-the-project-light.gif)
   ```
4. Alt text describes what the screenshot shows, not what the user does.

**Option 2 — Puppeteer + code-server (advanced)**

Use only when you need to drive the WSO2 Integrator IDE in code-server to capture real UI screenshots end-to-end. Read `ARTIFACT_SCREENSHOT_PROCESS.md` and `ARTIFACT_PROMPT_TEMPLATE.md` before starting.

Key gotchas:
- **Workspace trust:** disable by writing `'security.workspace.trust.enabled': false` into `vscode-userdata-store` in IndexedDB, then reload. Verify "Restricted Mode" is gone before proceeding.
- **Cross-origin webview:** the artifact creation form lives in a `vscode-cdn.net` iframe. `puppeteer_screenshot` can capture it but `puppeteer_evaluate` and `puppeteer_click` cannot reach inside — the user must click the artifact card manually.
- **Screenshot caching:** encoded screenshots (`encoded: true`) can return cached identical base64 across calls. Take a non-encoded preview screenshot between encoded ones to force a fresh render.
- **Decode immediately:** save each screenshot right after capturing — do not batch. Protects against timeouts.
- **Doc structure for event/service artifacts:** Creating → Service configuration → Listener configuration → Event handler configuration. For HTTP-style: Creating → Service configuration → Listener configuration → Resource configuration. UI labels observed in the running IDE take precedence over anything in existing files.
- **Reference implementation:** `en/docs/develop/integration-artifacts/event/kafka.md`.

### C. Adding Visual Designer tabs to transform pages

For docs under `en/docs/develop/transform/`. Reference implementation: `xml.md`. Read `transform-docs-guide.md` for the status tracker and per-construct content patterns.

Wrap every section that has a code block in:

```jsx
<Tabs>
<TabItem value="ui" label="Visual Designer" default>

[Visual Designer instructions — numbered steps + screenshots]

</TabItem>
<TabItem value="code" label="Ballerina code">

[Existing code block — UNCHANGED]

</TabItem>
</Tabs>
```

**Gets tabs:** any section with a code block — variable declarations, parsing, foreach, function calls, type definitions with code, data mapping, integration examples.

**Does NOT get tabs:** title/intro, advice-only sections, What's next, text-only subsections, CLI/bash-only sections like `bal tool pull edi`.

Add the Tabs import directly after the frontmatter on any file that uses tabs:

```js
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

### D. Documenting artifact creation flows

`plan.md` (repo root) maps the canonical screen-by-screen flow in WSO2 Integrator IDE: main flows → Add Integration → Artifacts page → service initialization → service designer → Configure page → Add Handler side panel → flow model → Add Connection popup.

Use it as the visual outline when writing any artifact-creation walkthrough so steps stay consistent across pages.

---

## 4. Companion files

| File | When to read |
|---|---|
| `CLAUDE.md` | Always — project instructions Claude Code loads automatically |
| `en/content-gen/00-rules.md` | Always — attach in every AI generation prompt |
| `Information Architecture Guidelines.md` | Any IA decision — primary source of truth for section boundaries and page-level content plans |
| `en/content-gen/01–07-*.md` | Per-section generation prompts |
| `en/content-gen/prompt-quick-start.md` | Template prompt for Quick Start pages |
| `en/content-gen/prompt-http-service.md` | Ready-to-run prompt for the HTTP service page |
| `ARTIFACT_PROMPT_TEMPLATE.md` | Workflow B Option 2 — fill-in-the-blanks prompt + artifact queue |
| `ARTIFACT_SCREENSHOT_PROCESS.md` | Workflow B Option 2 — Puppeteer + code-server screenshot pipeline |
| `transform-docs-guide.md` | Workflow C — adding Visual Designer tabs to transform pages |
| `plan.md` | Workflow D — canonical artifact-creation UI walkthrough |

---

## 5. Definition of done

Before opening a PR, verify every item:

- [ ] Read `en/content-gen/00-rules.md` — all content rules applied
- [ ] Terminology matches the table in `00-rules.md` — no forbidden terms
- [ ] Microsoft Style Guide applied — sentence case headings, bold UI labels, backticks for code
- [ ] Page follows the template in `00-rules.md` — frontmatter, intro, prerequisites, tabs, What's next
- [ ] Tabs import present on every page with a code example
- [ ] Every code example is complete and runnable with `import` statements
- [ ] Unverified code marked with `<!-- TODO: verify this compiles with bal build -->`
- [ ] Screenshots and GIFs follow the visual media standards in `00-rules.md` — correct path, light + dark variants, descriptive alt text
- [ ] URL slug follows the URL rules in `00-rules.md` — lowercase, hyphen-separated, optimized
- [ ] `en/sidebars.ts` updated for any new page
- [ ] Cross-links use relative paths and resolve (3–5 minimum per page)
- [ ] `npm run typecheck && npm run build` passes from `en/`
- [ ] Branch named `docs/<short-topic>`, commit message `docs(scope): description`
