---
sidebar_position: 0
sidebar_label: Skills
title: Skills
description: Downloadable Claude Code skills for generating docs and diagrams for this repo, and how to add one to Claude.
slug: /tools/skills
---

# Skills

Two downloadable Claude skills for working on this repo.

{/* Raw <a class="palette-card"> instead of <PaletteCard> -- these need a
    real `download` attribute so the browser saves the file instead of
    trying to navigate to it as a page. See custom.css's PALETTE CARDS
    section for this escape hatch. */}

<PaletteGrid cols={2}>

<a class="palette-card" href="/skills/wso2-docs-generator.skill" download>
  <PaletteIcon name="book" />
  <h3 class="palette-card-title">Docs Generator</h3>
  <p class="palette-card-desc">Adds or updates a docs-integrator page following this repo's conventions -- frontmatter, folder structure, cards, icons, and more.</p>
</a>

<a class="palette-card" href="/skills/wso2-diagram-generator.skill" download>
  <PaletteIcon name="external" />
  <h3 class="palette-card-title">Diagram Generator</h3>
  <p class="palette-card-desc">Draws WSO2-branded architecture and concept diagrams in the house style.</p>
</a>

</PaletteGrid>

## Docs Generator

<a href="/skills/wso2-docs-generator.skill" download>Download <code>wso2-docs-generator.skill</code></a>

Knows this repo's doc-writing rules (from `CONTRIBUTING.md` and
`AGENTS.md`) so you don't have to look them up by hand -- just describe
the page or section you want, and it follows this repo's conventions.
Run it from inside a `docs-integrator` checkout, since it reads and
edits this repo's own files.

It also knows about the **Diagram Generator**: if a page needs an
architecture/concept diagram, it reaches for that skill instead of
describing the diagram in prose or leaving a placeholder. Since
diagram generation needs Claude Design (not available in Claude Code,
where this skill normally runs), it'll point you at
[claude.ai/design](https://claude.ai/design) to generate one yourself
when it can't do so directly.

## Diagram Generator

<a href="/skills/wso2-diagram-generator.skill" download>Download <code>wso2-diagram-generator.skill</code></a>

Draws WSO2-branded diagrams (platform overview, architecture, concept
diagrams) in the light "soft-neumorphic" house style. Works best in a
claude.ai chat with the Design/Artifact canvas open. If the result
isn't quite right, just ask for changes -- or edit it directly on the
canvas yourself.

## Installing a skill locally (Claude Code)

A `.skill` download is a zip already shaped like `<skill-name>/SKILL.md`
-- installing it is just putting that folder somewhere Claude Code
looks for skills, so a straight unzip does the whole job:

```bash
mkdir -p .claude/skills
unzip wso2-docs-generator.skill -d .claude/skills/
# -> .claude/skills/wso2-docs-generator/SKILL.md
```

Where you unzip it decides who can use it:

- **`.claude/skills/` inside this repo** -- project-only. Only sessions
  working in `docs-integrator` see it, which is what you want for the
  Docs Generator, since it's meaningless anywhere else.
- **`~/.claude/skills/` in your home folder** -- available in every
  project on your machine. Makes more sense for something
  general-purpose than for a repo-specific skill.

Then **restart or reload Claude Code** -- skills are only discovered
when a session starts, so one installed mid-session won't show up
until the next one.

**On claude.ai:** Settings → Capabilities → Skills, then import/upload
the `.skill` file (or open a marketplace skill's own link and select
Enable). This is an account-level install, not a local file, so there's
nothing to unzip or restart.

## Using a skill locally

Once installed, Claude picks the right skill automatically when your
request matches its description, or you call one by name directly,
e.g. `/wso2-docs-generator` or `/wso2-diagram-generator`.

**Docs Generator needs an actual clone of this repo, not just internet
access.** `docs-integrator` is public, so its files are readable from
anywhere -- but that only gets you the rules to read. The skill's real
job is *editing* files under `en/docs/` and then *verifying* that with
a real `npx docusaurus build`, and both of those need an actual git
working tree with `node_modules` installed: somewhere for the changes
to land, and the actual toolchain to check them. Run Claude Code with
your working directory inside a `docs-integrator` checkout (any
branch) before invoking it.

**Diagram Generator needs Claude Design -- use it there, not in plain
chat.** It's built entirely on Design Component tools (`dc_write`,
`view_image`, `ready_for_verification`); those only exist inside
Design, so without it the skill has nothing to draw with. If the
result isn't quite right, you're not limited to re-prompting: since
it's a live, editable component rather than a flattened image, you can
also open it on the canvas and adjust it directly yourself.

### Accessing Claude Design on claude.ai

Go straight to
[claude.ai/design](https://claude.ai/design?via=design_artifacts_banner&noredir=1)
-- this opens the Design canvas directly, where the Diagram Generator's
Design Component tools become available. From there, ask for the
diagram you want (or attach a reference image and ask to redraw/restyle
it) -- the skill takes it from there.

If that link doesn't work for your account, check
**Settings → Capabilities** and make sure **Design** is turned on.
