---
title: Project view
---

# Project view

The Project view is the top-level view in WSO2 Integrator. It appears when you open a project that contains multiple integrations or libraries, giving you an overview of everything in the project, deployment options, and project-level actions in one place.

![Project view overview](/img/develop/understand-ide/views/project-view/overview.png)

The Project view, [Integrator view](integration-view.md), and [Library view](library-view.md) share the same UI chrome: activity bar, project explorer, editor toolbar, and deployment options panel. These elements are described once here and behave the same across all three views.

## Activity bar

The activity bar is the narrow vertical strip on the far-left edge of the WSO2 Integrator IDE. Each icon opens a different panel or tool.

| Name | Description |
|---|---|
| **Explorer** | Opens the file explorer for browsing project files. |
| **WSO2 Integrator** | Opens the project explorer for the current view. |
| **Source Control** | Opens the Git source control panel. |
| **Run and Debug** | Opens the debug panel for setting breakpoints and inspecting variables. |
| **Testing** | Opens the test explorer to view, run, and debug the test cases defined for your integration. |

Click the **WSO2 Integrator** icon to return to the Project view at any time.

![Activity bar](/img/develop/understand-ide/views/project-view/activity-bar.png)

## Project explorer

The project explorer is the left sidebar that organizes the contents of your project into a structured tree.

- At the **project level**, the project explorer lists all integrations and libraries in the project, grouped by name. Each entry is expandable to reveal its own artifact tree.
- Inside an **integration or library**, the project explorer organizes its components into sections by artifact type, making it easy to locate and manage the building blocks of your integration.

![Project explorer](/img/develop/understand-ide/views/project-view/project-explorer.png)

When an integration or library is open, the project explorer groups its artifacts into the following sections. Click an artifact name to open it in its dedicated view, or click the **+** icon next to a section to add a new one.

| Section | What it shows |
|---|---|
| **Entry points** | HTTP services, GraphQL services, automations, and event listeners that trigger your integration. |
| **Listeners** | Protocol-specific configurations (host, port) that entry points bind to. |
| **Connections** | Configured links to external systems such as databases, HTTP APIs, and message brokers. |
| **Types** | Custom records, enums, arrays, service classes and unions used in your integration. |
| **Functions** | Reusable logic blocks callable from entry points or other functions. |
| **Data mappers** | Visual transformations between source and target types. |
| **Configurations** | Variables sourced from `Config.toml` at runtime. |

For details on each artifact type, see [Integration artifacts](/docs/develop/integration-artifacts).

## Project overview canvas

The project overview canvas is the central area of the Project view. It displays the project name as a heading and provides a unified dashboard for managing all integrations and libraries in the project.

### Integrations and libraries

The **Integrations & Libraries** section displays a card grid showing each integration and library in the project. Each card shows:

- The name (for example, `Integration1`, `Library1`).
- A type badge on libraries (for example, `Library`) to distinguish them from integrations.

Click any card to navigate to the [Integrator view](integration-view.md) or [Library view](library-view.md), where you can build and manage its artifacts.

### Generate with AI

Click the **Generate with AI** button at the top of the canvas to create a new integration using AI. Describe what you want in natural language, and WSO2 Integrator generates the integration with the appropriate entry points, connections, and logic.

### Add integration or library

Click the **+ Add** button at the top of the canvas to add a new integration or library to the project. Select the type, provide a name and configuration, and the new entry appears in the card grid and project explorer.

## Editor toolbar

The editor toolbar appears on the right side of the editor tab bar. It provides quick actions for the active integration.

![Editor toolbar](/img/develop/understand-ide/views/project-view/editor-toolbar.png)

| Action | Description |
|---|---|
| **WSO2 Integrator Copilot** | Opens the WSO2 Integrator Copilot chat panel to get AI-powered assistance for building and troubleshooting your integration. |
| **Run** | Builds and runs the integration locally, starting all services and displaying output in the terminal. |
| **Debug** | Launches the integration with the debugger attached so you can set breakpoints and inspect variables. |
| **Show Source** | Switches to the Ballerina source code view for direct code editing. |

## Deployment options panel

The deployment options panel appears on the right sidebar and provides shortcuts to deploy your integrations to different environments.

![Deployment options](/img/develop/understand-ide/views/project-view/deployment-options.png)

| Option | Target |
|---|---|
| [**Deploy to WSO2 Integration Platform**](/docs/deploy-operate/deploy/devant) | Fully managed cloud platform. |
| [**Deploy with Docker**](/docs/deploy-operate/deploy/docker-kubernetes) | Container orchestration platforms such as Kubernetes and OpenShift. |
| [**Deploy on a VM**](/docs/deploy-operate/deploy/vm-based) | Virtual machines or bare-metal servers. |
| [**Integration Control Plane (ICP)**](/docs/deploy-operate/observe/icp) | Centralized observability and management for deployed integrations. |

At the project level, click **Enable ICP for all integrations** to activate ICP monitoring for every integration in the project at once.

## README section

The README section at the bottom of the Project view displays the contents of your project's `README.md` file. Use it to document the purpose, setup instructions, and usage notes for your project, integrations, and libraries.

![README](/img/develop/understand-ide/views/project-view/readme.png)

Click **Edit** to modify the README directly. If the project does not have a README yet, click **Add a README** to create one.

## What's next

- [Integrator view](integration-view.md): the primary development interface for individual integrations.
- [Library view](library-view.md): build and manage reusable libraries.
- [Packages & Modules](/docs/develop/organize-code/packages-modules): understand package structure.
