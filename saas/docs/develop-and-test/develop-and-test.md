---
title: Develop and Test
---

# Build your integration

This section covers the Develop and Test phase of the [integration lifecycle](../platform-overview/index.md#4-wso2-integration-platform-across-the-lifecycle): building integrations in the WSO2 Integrator editor before anything ships. We assume you're already familiar with the editor's surfaces from the [Editor Tour](../editor/editor.md).

Start building your integration by prompting [WSO2 Integrator Copilot](../editor/copilot/copilot.md) to generate a first working version of your integration flow, refine it on the visual designer, and drop into Ballerina pro-code only when you need more precise control; everything stays in sync throughout.

## Create Integration Workspace

<PaletteCard icon="quickstart" href="/develop-and-test/create-workspace">
  <h3 class="palette-card-title">Create integrations</h3>
  <ul class="palette-card-list">
    <li>Start new integration project</li>
    <li>Explore samples</li>
    <li>Build libraries</li>
  </ul>

<PaletteCard icon="editor-window" href="/editor">
  <h3 class="palette-card-title">Editor TourPrerequisite</h3>
  <ul class="palette-card-list">
    <li>Workspace and views</li>
    <li>Editors and canvases</li>
    <li>WSO2 Integrator Copilot</li>
  </ul>

Moving from another platform? See [Migrate](../migrate/index.md).

## Build Integration

<PaletteCard icon="ai" href="/editor/copilot/getting-started">
  <h3 class="palette-card-title">Build with Copilot</h3>
  <ul class="palette-card-list">
    <li>Prompt Copilot to generate a first working version</li>
    <li>Works across artifacts, logic, and data mapping</li>
    <li>Iterate in chat, then refine visually or in code</li>
  </ul>

<p class="palette-group-label">Or build visually</p>

<PaletteCard icon="artifacts" href="/develop-and-test/integration-artifacts">
  <h3 class="palette-card-title">Add Integration artifacts</h3>
  <ul class="palette-card-list">
    <li>Automations</li>
    <li>APIs: HTTP, GraphQL, gRPC, TCP, WebSub</li>
    <li>Event-driven: Kafka, RabbitMQ, MQTT, Salesforce, GitHub</li>
    <li>File-driven integrations</li>
    <li>AI integrations</li>
    <li>Supportive artifacts</li>
  </ul>

<PaletteCard icon="canvases" href="/editor/canvases/flow-canvas">
  <h3 class="palette-card-title">Design integration logic</h3>
  <ul class="palette-card-list">
    <li>Flow Canvas with Node Palette</li>
    <li>Control flow and error handling</li>
    <li>Expressions and query expressions</li>
    <li>Ballerina pro-code</li>
  </ul>

<PaletteCard icon="tools" href="/develop-and-test/developer-tools">
  <h3 class="palette-card-title">Use Developer Tools</h3>
  <ul class="palette-card-list">
    <li>Generate code: OpenAPI, GraphQL, AsyncAPI, gRPC</li>
    <li>Generate code: WSDL, XSD, EDI, Health</li>
    <li>Data persistence (<code>bal persist</code>)</li>
    <li>Static analysis (<code>bal scan</code>)</li>
  </ul>

<PaletteCard icon="transform" href="/develop-and-test/data-transformation">
  <h3 class="palette-card-title">Transform Your Data</h3>
  <ul class="palette-card-list">
    <li>Visual Data Mapper</li>
    <li>JSON, XML, CSV, and XLSX</li>
    <li>EDI and YAML/TOML</li>
    <li>PDF and ZIP processing</li>
  </ul>

## Try, test, and debug Integration

<PaletteCard icon="test" href="/develop-and-test/test">
  <h3 class="palette-card-title">Test Your Integration</h3>
  <ul class="palette-card-list">
    <li>Built-in Try-It tool</li>
    <li>Unit and data-driven tests</li>
    <li>Mocking and code coverage</li>
    <li>AI-generated test cases</li>
  </ul>

<PaletteCard icon="debug" href="/develop-and-test/debugging">
  <h3 class="palette-card-title">Debug Your Integration</h3>
  <ul class="palette-card-list">
    <li>Breakpoints and stepping</li>
    <li>Variable inspection</li>
    <li>Test debugging</li>
    <li>Remote debugging</li>
  </ul>

<PaletteCard icon="error-handling" href="/develop-and-test/troubleshooting">
  <h3 class="palette-card-title">Troubleshoot Your Integration</h3>
  <ul class="palette-card-list">
    <li>Logging</li>
    <li>Errors and stack traces</li>
    <li>Strand dumps</li>
    <li>Performance profiling</li>
  </ul>

## What's next

- [Create a new integration](create-workspace/create-a-project.md) — Start a project in the WSO2 Integrator IDE or from the CLI
- [Design integration logic](../editor/canvases/flow-canvas/flow-canvas.md) — Wire up the flow between request and response
- [Deploy and operate](../deploy-and-run/deploy-and-run.md) — Ship your integration once it's ready
