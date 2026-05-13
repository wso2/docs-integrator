# Global Rules for All Documentation Pages

**Include this file as context in EVERY AI prompt.** These rules override any default behavior of the AI model.

---

## Product Identity

- **Product name:** WSO2 Integrator (always use this exact name)
- **Powered by:** Ballerina programming language
- **IDE:** WSO2 Integrator IDE (VS Code fork with built-in integration plugin)
- **Deployment platform:** WSO2 Integration Platform (cloud), Docker, Kubernetes, cloud providers
- **Target audience:** Integration developers (Java/enterprise background, new to Ballerina)

## Design Principles

### Principle 1: Question-Driven Navigation
Every top-level section answers one developer question. If content doesn't clearly belong to one question, the structure is wrong.

| Developer asks... | Section |
|---|---|
| "I'm new — what is this?" | Get Started |
| "How do I build, transform and test X?" | Develop |
| "Can I connect to Y?" | Connectors |
| "How do I build AI agents, RAG, or MCP?" | GenAI |
| "Show me a complete, real example" | Tutorials |
| "How do I ship, run, and secure this?" | Deploy & Operate |
| "What's the exact syntax / config / API?" | Reference |

### Principle 2: The Boundary Rule
If your code is still on your machine → **Develop**. Once you're pushing it somewhere else → **Deploy & Operate**.

### Principle 3: The AI Split Rule
If AI is helping YOU code faster (Copilot, AI suggestions, AI test gen) → stays in **Develop**. If YOU are building an AI-powered integration (agents, RAG, MCP) → **GenAI**.

### Principle 4: Develop ≠ Tutorials
**Develop** = handbook lookup (3 min read, specific answer). **Tutorials** = end-to-end narrative (30–45 min, follow along). Different developer modes, different content types.

### Principle 5: Two Layers of Explanation
**Get Started → Key Concepts** = vocabulary (2–3 sentences per component). **Develop/GenAI** = skills (complete working knowledge).

### Principle 6: Connectors Are Top-Level
"Can I connect to X?" is the most frequent evaluator question. LLM connectors live in Connectors. GenAI references them.

---

## Terminology Rules

**ALWAYS use the left column. NEVER use the right column.**

| Use this | NOT this |
|---|---|
| WSO2 Integrator | BI, Ballerina Integrator |
| WSO2 Integrator IDE | VS Code, VS Code extension, the extension |
| WSO2 Integration Platform | WSO2 Devant, iPaaS, Choreo |
| push to cloud | deploy to Devant, deploy to iPaaS |
| integration | flow, pipeline, process |
| service | API (unless about API management) |
| connector | adapter, driver |
| visual designer | drag-and-drop editor, canvas |
| pro-code | source code view, text mode |
| agent | bot, assistant |

**NEVER use MI/ESB terms:** mediators, sequences, proxy services, message stores, message processors, inbound endpoints, API artifacts.

---

## Page Template

Every page MUST follow this structure:

```markdown
---
title: "<Page Title>"
description: "<One sentence — what and when>"
keywords: [wso2 integrator, <topic>, <subtopic>]
---

# <Page Title>

<Intro paragraph: 2–3 sentences explaining what this page covers and when you'd use it.>

:::info Prerequisites
- WSO2 Integrator installed ([Install guide](../get-started/install.md))
- <Any other specific prerequisites>
:::

## <Main concept>

<Explanation: concept → steps → examples → advanced.>

### Step-by-step (if applicable)

1. Step one with explanation
2. Step two with explanation

### Code Example

<details>
<summary>Low-code (Visual Designer)</summary>

<!-- Screenshot or description of the visual designer steps -->

</details>

```ballerina
// Pro-code equivalent — complete, runnable example
import ballerina/http;

service /hello on new http:Listener(8080) {
    resource function get .() returns string {
        return "Hello, World!";
    }
}
```

## <Next concept or section>

...

## What's Next

- [Next logical page](./next-page.md) — One-line description
- [Related page](./related-page.md) — One-line description
```

### Rules for the Template

1. **Title** — Action-oriented for Develop/GenAI ("Add Error Handling"), descriptive for Reference ("Error Handling Reference")
2. **Intro** — 2–3 sentences: what and when. No fluff.
3. **Prerequisites** — Collapsible box. Only include if the page truly requires prior setup.
4. **Main content** — Progressive: concept → steps → examples → advanced
5. **Code examples** — Complete, runnable Ballerina code. Include BOTH low-code (visual designer screenshot/description) AND pro-code (Ballerina source). Use `bal` or `ballerina` as the code fence language.
6. **What's Next** — 2–3 links to the logical next pages. Every page must have this.

---

## Microsoft Style Guide (mandatory)

All new and modified content must comply with the [Microsoft Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/):

- Active voice, present tense.
- **Sentence case for headings** (capitalize only first word and proper nouns).
- No decorative symbols (¶, →, ») in headings or text.
- Numbered lists for sequential tasks, bulleted for non-sequential.
- **Bold** for UI labels and button names (e.g., **Create**).
- Backticks for code elements, file paths, and URLs in prose.
- Descriptive link text — never raw URLs.
- Plain language; avoid jargon and ambiguous pronouns.

Scope: 100% compliance for new pages. For existing pages, apply rules only to lines you add or modify.


### Em dash usage
 
Avoid em dashes (—). They are a strong signal of AI-generated text and make prose feel unnatural. Use shorter sentences, commas, or periods instead.
 
| Instead of | Write |
|---|---|
| The connector compiles — but fails at runtime. | The connector compiles, but fails at runtime. |
| Use record types — they are the most flexible option. | Use record types. They are the most flexible option. |
| Configure the base URL — this is required. | Configure the base URL. This field is required. |
 
The only accepted exception is the **What's next** section, where em dashes separate a link from its description as a consistent formatting convention across all pages.

## Code Example Standards

- Every code example must be **complete and runnable** — not snippets
- Include `import` statements
- Use realistic variable names (not `foo`, `bar`)
- Show both happy path and error handling where relevant
- For visual designer: describe the steps or include a screenshot placeholder `<!-- TODO: Add visual designer screenshot -->`
- Mark unverified code with `<!-- TODO: verify this compiles with bal build -->`

## Cross-Linking Rules

- Use relative paths: `../deploy-operate/deploy/docker-kubernetes.md`
- Link to the MOST SPECIFIC page, not a parent
- Every page should have 3–5 cross-links minimum
- Connector references should link to the connector's overview page in `connectors/catalog/`

## Formatting Rules

- Use Docusaurus admonitions: `:::tip`, `:::info`, `:::warning`, `:::danger`
- Use tables for comparisons and feature lists
- Use `<details>` for collapsible sections (prerequisites, advanced topics)
- Keep paragraphs short (3–4 sentences max)
- Use bullet lists for 3+ items, inline for 2
- Heading hierarchy: `##` for main sections, `###` for subsections, `####` rarely


## Visual Media Standards

### Screenshots

Use screenshots **only when configuration or UI state is non-obvious** and cannot be adequately described in text. Do not repeat the same screenshot across multiple pages.

| Rule | Detail |
|---|---|
| **Capture area** | Full WSO2 Integrator IDE window — no partial crops |
| **Theme** | Light Modern (default) |
| **Highlights** | Use red boxes and arrows to mark specific areas of focus |
| **Format** | PNG, compressed without quality loss before committing |
| **Repetition** | The same screenshot must not appear on more than one page — link to the source page instead |

### Screencasts (Animated GIFs)

Use GIFs **only when a single action triggers multiple sequential screen changes** (e.g., the Try-it feature, drag-and-drop flows). Do not use GIFs for static configuration steps.

| Rule | Detail |
|---|---|
| **Capture area** | Full WSO2 Integrator IDE window — no partial crops |
| **Theme** | Light Modern (default) |
| **Format** | Compressed GIF — minimize file size without visible quality loss |
| **File picker usage** | If the GIF involves a folder selection dialog, ensure the folder structure shown is clean and realistic (no personal or test clutter) |

### When to Use Each

| Situation | Use |
|---|---|
| Non-obvious UI configuration | Screenshot |
| Multi-step action with screen transitions | GIF |
| Simple setting or field description | Neither — use text |
| Step already shown on another page | Neither — cross-link instead |

## Page Title and URL Rules
 
URLs are permanent. A wrong URL is a broken link — in third-party sites, search indexes, and bookmarks — that cannot be fixed without a redirect. Get the URL right before merging.
 
### The Two-Step Rule
 
1. **Start from the title.** Convert spaces to hyphens, lowercase everything.
2. **Then optimize the URL** — shorten it, remove words already implied by the hierarchy, and eliminate redundancy. The title stays human-readable; the URL stays lean.
The title and URL must use the same core words. They should never describe different things.
 
### Rules
 
- **Lowercase, hyphen-separated.** No underscores, no camelCase, no special characters.
- **Remove filler words from URLs** — omit articles (`a`, `an`, `the`) and prepositions (`on`, `for`, `with`) unless they change meaning.
- **Let the path carry context.** If the parent path already says `get-started/install/`, the slug does not need to repeat `install`.
- **Never optimize a title to match a short URL.** Titles are for humans — keep them clear and complete. Optimize the URL independently.
- **Lock URLs before publishing.** Once a page is live, the URL must not change. If a rename is unavoidable, add a redirect.
### Examples
 
| Page Title | URL | Notes |
|---|---|---|
| Install WSO2 Integrator | `/install-wso2-integrator` | Exact match — title is already concise |
| Install WSO2 Integrator on macOS | `/install-macos` | Remove redundant words implied by context |
| Configure API Endpoints | `/api/configure-endpoints` | Parent path carries `api` — no need to repeat |
| Add Error Handling to Your Integration | `/error-handling` | Strip filler; topic is clear from the slug |
| WSO2 Integrator IDE Overview | `/ide-overview` | Product name dropped — implied by the site |
 
### What to Avoid
 
| Avoid | Why |
|---|---|
| `/getting-started-with-wso2-integrator-installation` | Too long — redundant words, already in breadcrumb |
| `/page1` or `/untitled` | Non-descriptive — breaks search and cross-linking |
| `/Install_MacOS` or `/installMacOS` | Wrong case and separator style |
| `/install-wso2-integrator-on-macos-operating-system` | Over-specified — `macos` alone is sufficient |
| Changing a URL post-launch without a redirect | Breaks all external links permanently |
