---
sidebar_position: 1
title: Understand the Editor
description: Take a tour of the Choreo Integrator editor, its workspace, canvases, designers, panels, and Copilot.
keywords: [choreo integrator, editor, editor window, views, canvases, designers, panels, copilot]
hide_table_of_contents: true
wide_layout: true
slug: /editor
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Understand the Editor

The **Choreo Integrator editor** brings together everything you need to develop, build, test, debug and deploy your integrations in one place. This tour works outward from the window you see when you open it, to the surfaces you build on, to the tools available throughout. The map below gives you the shape of it before you go deeper into any one piece.

<ThemedImage
    alt="Choreo Integrator Editor components: the Editor Window contains Views (Project, Integration, Library) and the surfaces you work on inside a view (Canvases, Panels, Designers), alongside Choreo Integrator Copilot"
    sources={{
        light: useBaseUrl('/img/editor/editor-components.png'),
        dark: useBaseUrl('/img/editor/editor-components.png'),
    }}
/>

Explore each part of the editor below.

<div class="palette-group">

<PaletteCard icon="editor-window" href="/editor/editor-window" standalone>
  <h3 class="palette-card-title">Editor Window</h3>
  <p class="palette-card-desc">The frame that surrounds every view: a top menu bar, an activity bar, the project explorer, the editor tab area, and a status bar that all stay constant no matter which view is active.</p>
</PaletteCard>

<PaletteGrid cols={4}>

<PaletteCard icon="views">
  <h3 class="palette-card-title">Views</h3>
  <p class="palette-card-desc">Views are the workspace shells that run inside the editor window. Switch between them depending on whether you are managing a multi-package project, building a single integration, or developing a reusable library.</p>
  <div class="palette-chip-row">
    <PaletteChip href="/editor/views/project-view">Project View</PaletteChip>
    <PaletteChip href="/editor/views/integration-view">Integration View</PaletteChip>
    <PaletteChip href="/editor/views/library-view">Library View</PaletteChip>
  </div>
</PaletteCard>

<PaletteCard icon="canvases">
  <h3 class="palette-card-title">Canvases</h3>
  <p class="palette-card-desc">Canvases are spatial, node-based surfaces where you arrange and connect elements to build the visual model of an artifact.</p>
  <div class="palette-chip-row">
    <PaletteChip href="/editor/canvases/flow-canvas">Flow Canvas</PaletteChip>
    <PaletteChip href="/editor/canvases/type-canvas">Type Canvas</PaletteChip>
    <PaletteChip href="/editor/canvases/graphql-canvas">GraphQL Canvas</PaletteChip>
  </div>
</PaletteCard>

<PaletteCard icon="panels">
  <h3 class="palette-card-title">Panels</h3>
  <p class="palette-card-desc">Panels are focused forms for defining or configuring a single artifact.</p>
  <div class="palette-chip-row">
    <PaletteChip href="/editor/panels/type-panel">Type Panel</PaletteChip>
    <PaletteChip href="/editor/panels/expression-panel">Expression Panel</PaletteChip>
    <PaletteChip href="/editor/panels/configuration-panel">Configuration Panel</PaletteChip>
  </div>
</PaletteCard>

<PaletteCard icon="designers">
  <h3 class="palette-card-title">Designers</h3>
  <p class="palette-card-desc">Designers are dedicated surfaces for building one artifact end to end.</p>
  <div class="palette-chip-row">
    <PaletteChip href="/editor/designers/service-designer">Service Designer</PaletteChip>
    <PaletteChip href="/editor/designers/data-mapper">Data Mapper</PaletteChip>
  </div>
</PaletteCard>

</PaletteGrid>

</div>

<PaletteCard icon="ai" highlight>
  <h3 class="palette-card-title">AI Assistance</h3>
  <p class="palette-card-desc">Choreo Integrator Copilot is the AI assistant built into the editor, for generating, testing, and fixing integrations.</p>
  <div class="palette-chip-row">
    <PaletteChip href="/editor/copilot">Choreo Integrator Copilot</PaletteChip>
    <PaletteChip href="/editor/copilot/copilot-capabilities">Built-in Capabilities</PaletteChip>
    <PaletteChip href="/editor/copilot/customize-copilot">Customize Copilot</PaletteChip>
  </div>
</PaletteCard>

## What's next

- [The editor window](editor-window.md) — Explore the shared chrome that surrounds every view.
- [Flow Canvas](canvases/flow-canvas/flow-canvas.md) — Design integration logic using the visual flow canvas.
- [Create a new integration](../develop-and-test/create-workspace/create-a-project.md) — Start building your first integration.
