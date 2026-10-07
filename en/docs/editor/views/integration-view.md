---
sidebar_position: 2
title: Integration View
description: Work with the Integration view to build and manage individual integrations.
keywords: [wso2 integrator, ide, integration view, design canvas, deployment]
slug: /editor/views/integration-view
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Integration View

The Integration view is the primary development interface in WSO2 Integrator. Use it to build, test, and deploy a single integration. It combines a project explorer, a visual design canvas, and deployment options in one unified workspace.

<ThemedImage
    alt="Integration view overview"
    sources={{
        light: useBaseUrl('/img/editor/views/integration-view/overview.png'),
        dark: useBaseUrl('/img/editor/views/integration-view/overview.png'),
    }}
/>

## Design canvas

The design canvas is the central area of the Integration view. It displays a visual overview of your integration, showing how entry points, listeners, connections, and services relate to each other.

<ThemedImage
    alt="Design canvas"
    sources={{
        light: useBaseUrl('/img/editor/views/integration-view/design-canvas.png'),
        dark: useBaseUrl('/img/editor/views/integration-view/design-canvas.png'),
    }}
/>

### Service diagram

The service diagram renders your integration as an interactive graph. Each node represents a component:

- **Entry points** appear as the primary nodes on the left.
- **Listeners** connect to the entry points they serve.
- **External connections** appear on the right, showing which services your integration calls.
- **Lines** between nodes indicate data flow and dependencies.

Click any node to open that component in the visual designer. Right-click a node or click its three-dot menu (**⋮**) to access context actions such as **Edit** and **Delete**.

### Zoom and navigation controls

Use the controls in the bottom-right corner of the canvas to adjust the view:

- **+**: zoom in.
- **−**: zoom out.
- **Fit to screen**: automatically adjusts the zoom level to show all nodes.

You can also scroll to zoom and drag to pan across the canvas.

### Generate with AI

Click the **Generate with AI** button at the top of the canvas to open the [WSO2 Integrator Copilot](../copilot/copilot.md). Describe what you want in natural language, and WSO2 Integrator Copilot generates the integration with the appropriate entry points, connections, and logic.

### Add artifact

Click the **+ Add Artifact** button at the top of the canvas to add a new component to your integration. This opens a menu with all available artifact types organized by category:

- **Entry Points**: HTTP services, GraphQL services, automations, and event listeners that trigger your integration.
- **Connections**: Configured links to external systems such as databases, HTTP APIs, and message brokers.
- **Types**: Custom records, enums, arrays, service classes, and unions used in your integration.
- **Functions**: Reusable logic blocks callable from entry points or other functions.
- **Data Mappers**: Visual transformations between source and target types.
- **Configurations**: Variables sourced from `Config.toml` at runtime.

## Toolbar

The toolbar sits at the top of the Integration view and provides quick access to common actions for building, running, and debugging your integration.

<ThemedImage
    alt="Toolbar"
    sources={{
        light: useBaseUrl('/img/editor/views/integration-view/toolbar.png'),
        dark: useBaseUrl('/img/editor/views/integration-view/toolbar.png'),
    }}
/>

| Action | Description |
|---|---|
| **Undo** / **Redo** | Reverses or reapplies recent changes. Works across both the visual designer and the code editor. |
| **Configure** | Opens the configuration panel, equivalent to adding a configuration from the project explorer. |
| **Run** | Builds and runs your integration locally. WSO2 Integrator compiles the Ballerina code, starts the services, and displays the output in the terminal panel. |
| **Debug** | Starts a debug session with the debugger attached. Set breakpoints, step through execution, inspect variables and payloads, and evaluate expressions at runtime. |
| **Deployment** | Shows or hides the deployment options panel on the right side of the view. |

## Deployment options panel

Select **Deployment** in the toolbar to open the deployment options panel on the right side of the view. The panel provides shortcuts to deploy the integration to different environments. Select **Deployment** again to close it.

<ThemedImage
    alt="Deployment button in the toolbar"
    sources={{
        light: useBaseUrl('/img/editor/views/integration-view/deployment-button.png'),
        dark: useBaseUrl('/img/editor/views/integration-view/deployment-button.png'),
    }}
/>

<ThemedImage
    alt="Deployment options"
    sources={{
        light: useBaseUrl('/img/editor/views/integration-view/deployment-options.png'),
        dark: useBaseUrl('/img/editor/views/integration-view/deployment-options.png'),
    }}
/>

| Option | Target |
|---|---|
| [**Deploy to WSO2 Cloud**](../../deploy-and-run/deploy-to-wso2-cloud/deploy-to-wso2-cloud.md) | Fully managed cloud platform for hosting and running integrations. Select **Deploy** to start. |
| [**Deploy with Docker**](../../deploy-and-run/self-hosted/containerized-deployment.md) | Build Docker images and deploy integrations to Docker, Kubernetes, or OpenShift. |
| [**Deploy on a VM**](../../deploy-and-run/self-hosted/vm-deployment.md) | Deploy integrations as standalone JAR files on virtual machines. |

The panel also includes an **Integration Control Plane** section for monitoring and managing running integrations from a centralized dashboard. Select **Enable ICP monitoring** to activate the [Integration Control Plane (ICP)](../../icp/index.md) for this integration, or expand **Publish to local ICP** to push the integration to a local ICP instance.

## Readme tab

The **Readme** tab next to **Design** displays the contents of your project's `README.md` file. Use it to document the purpose, setup instructions, and usage notes for your integration.

<ThemedImage
    alt="Readme"
    sources={{
        light: useBaseUrl('/img/editor/views/integration-view/readme.png'),
        dark: useBaseUrl('/img/editor/views/integration-view/readme.png'),
    }}
/>

Click **Edit** to modify the README directly. You can also click **Generate with AI** to create a README automatically based on your project's components and configuration.

## What's next

- [Flow Canvas](../canvases/flow-canvas/flow-canvas.md) — Build logic using the visual designer.
- [Integration artifacts](../../develop-and-test/integration-artifacts/integration-artifacts.md) — Learn about artifact types and their configuration.
- [Deploy to WSO2 Cloud](../../deploy-and-run/deploy-to-wso2-cloud/deploy-to-wso2-cloud.md) — Deploy your integration to the cloud.
