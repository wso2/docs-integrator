---
title: Flow Diagram editor
---

# Flow Diagram editor

The Flow Diagram editor is the visual designer for an integration's logic. Each step in the integration is a node on the canvas, and the editor generates valid Ballerina source as you build. Switch to pro-code at any time to read or edit the generated code.

The editor opens anywhere you are expected to author a flow in WSO2 Integrator, such as when you open an entry point or any other artifact whose body is a sequence of steps.

## Anatomy of the editor

The editor has two main parts.

### Canvas

The canvas shows the flow as a sequence of nodes connected from a **Start** node down to an end terminator. The canvas tracks the order of execution, the data that flows between nodes, and any branching or concurrency in the integration.

To add a step to the flow, select **+** between two nodes (or below **Start**) to open the node palette.

![Canvas with Start, intermediate nodes, and an end terminator](/img/develop/flow-design-elements/canvas.png)

### Node palette

The node palette on the right lists every node you can add to the flow. From top to bottom, the palette contains:

1. A **Search** field for finding any node by name.
2. The **Connections** section, which lists every connection configured in the project and the actions available on each.
3. The category sections (**Statement**, **Control**, **AI**, **Error Handling**, **Concurrency**, **Logging**) that group the nodes covered in the pages below.
4. The **Show More Functions** action at the bottom, which opens the full functions picker.

![Node palette with Search, Connections, and category sections](/img/develop/flow-design-elements/node-palette.png)

## Palette sections

Each section of the node palette covers one kind of work. The pages below describe the nodes in each section and the fields exposed on their configuration forms.

| Section | Use it for | Nodes |
|---|---|---|
| [Connections](./connections) | Invoking actions on a configured client. | Connection, plus the actions exposed by each connection type |
| [Statement](./statement) | Declaring and updating variables, calling functions, and mapping data. | Declare Variable, Update Variable, Call Function, Map Data |
| [Control](./control) | Branching on conditions, matching values, looping, and returning from a flow. | If, Match, While, Foreach, Return |
| [AI](./ai) | Calling LLMs directly, building RAG pipelines, and running agents. | Model Provider, Knowledge Base, Data Loader, Augment Query, Agent |
| [Error handling](./error-handling) | Catching errors, raising failures, and aborting on unrecoverable conditions. | ErrorHandler, Fail, Panic |
| [Concurrency](./concurrency) | Running work in parallel, joining workers, and protecting shared state. | Fork, Wait, Lock |
| [Logging](./logging) | Emitting log messages at info, error, warn, or debug severity. | Log Info, Log Error, Log Warn, Log Debug |
| [Show more functions](./show-more-functions) | Reaching any function the project has access to when the panel does not list it as a shortcut. | Full functions picker (Within Project, Imported Functions, Standard Library) |

## Configuring a node

Most nodes open a configuration form in a side panel when you add them. Forms commonly include:

- **Expression fields** for writing Ballerina expressions. The [Expression editor](../expression-editor) provides type-aware autocomplete and inline validation in any expression field.
- **Type fields** for choosing or defining record, enum, or unions etc. Use the [Type editor](../type-editor) to create new types inline.
- **Variable fields** that bind a result to a named variable for downstream nodes to read.

Save the form to add the node to the flow. The visual designer keeps the canvas and the source in sync, so any change in either view is immediately reflected in the other.

## What's next

- [Connections](./connections) — Invoke actions on configured clients.
- [Statement](./statement) — Variables, function calls, and data mapping.
- [Control](./control) — Conditionals, loops, and returns.
- [AI](./ai) — LLM calls, RAG, and agents.
