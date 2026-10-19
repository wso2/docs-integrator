---
title: Understand the Editor
---

# Understand the Editor

The **WSO2 Integrator editor** brings together everything you need to develop, build, test, debug and deploy your integrations in one place. This tour works outward from the window you see when you open it, to the surfaces you build on, to the tools available throughout. The map below gives you the shape of it before you go deeper into any one piece.

<ThemedImage
    alt="WSO2 Integrator Editor components: the Editor Window contains Views (Project, Integration, Library) and the surfaces you work on inside a view (Canvases, Panels, Designers), alongside WSO2 Integrator Copilot"
    sources={{
        light: useBaseUrl('/img/editor/editor-components.png'),
        dark: useBaseUrl('/img/editor/editor-components.png'),
    }}
/>

Explore each part of the editor below.

<PaletteCard icon="editor-window" href="/editor/editor-window" standalone>
  <h3 class="palette-card-title">Editor Window</h3>
  <p class="palette-card-desc">The frame that surrounds every view: a top menu bar, an activity bar, the project explorer, the editor tab area, and a status bar that all stay constant no matter which view is active.</p>

<PaletteGrid cols={4}>

<PaletteCard icon="views">
  <h3 class="palette-card-title">Views</h3>
  <p class="palette-card-desc">Views are the workspace shells that run inside the editor window. Switch between them depending on whether you are managing a multi-package project, building a single integration, or developing a reusable library.</p>
  <div class="palette-chip-row">
    <PaletteChip href="/editor/views/project-view">Project View
    <PaletteChip href="/editor/views/integration-view">Integration View
    <PaletteChip href="/editor/views/library-view">Library View


<PaletteCard icon="canvases">
  <h3 class="palette-card-title">Canvases</h3>
  <p class="palette-card-desc">Canvases are spatial, node-based surfaces where you arrange and connect elements to build the visual model of an artifact.</p>

    <PaletteChip href="/editor/canvases/flow-canvas">Flow Canvas
    <PaletteChip href="/editor/canvases/type-canvas">Type Canvas
    <PaletteChip href="/editor/canvases/graphql-canvas">GraphQL Canvas


<PaletteCard icon="panels">
  <h3 class="palette-card-title">Panels</h3>
  <p class="palette-card-desc">Panels are focused forms for defining or configuring a single artifact.</p>

    <PaletteChip href="/editor/panels/type-panel">Type Panel
    <PaletteChip href="/editor/panels/expression-panel">Expression Panel
    <PaletteChip href="/editor/panels/configuration-panel">Configuration Panel


<PaletteCard icon="designers">
  <h3 class="palette-card-title">Designers</h3>
  <p class="palette-card-desc">Designers are dedicated surfaces for building one artifact end to end.</p>

    <PaletteChip href="/editor/designers/service-designer">Service Designer
    <PaletteChip href="/editor/designers/data-mapper">Data Mapper


</div>

<PaletteCard icon="ai" highlight>
  <h3 class="palette-card-title">AI Assistance</h3>
  <p class="palette-card-desc">WSO2 Integrator Copilot is the AI assistant built into the editor, for generating, testing, and fixing integrations.</p>

    <PaletteChip href="/editor/copilot">WSO2 Integrator Copilot
    <PaletteChip href="/editor/copilot/copilot-capabilities">Built-in Capabilities
    <PaletteChip href="/editor/copilot/customize-copilot">Customize Copilot


## What's next

- [The editor window](editor-window.md) — Explore the shared chrome that surrounds every view.
- [Flow Canvas](canvases/flow-canvas/flow-canvas.md) — Design integration logic using the visual flow canvas.
- [Create a new integration](../develop-and-test/create-workspace/create-a-project.md) — Start building your first integration.
