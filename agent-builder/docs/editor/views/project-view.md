---
title: Project View
---

# Project View

The Project view is the top-level view in WSO2 Agent Builder. It appears when you open a project that contains multiple agentic integrations or libraries, giving you an overview of everything in the project and project-level deployment actions in one place.

<ThemedImage
    alt="Project view overview"
    sources={{
        light: useBaseUrl('/img/editor/views/project-view/overview-v1.0.png'),
        dark: useBaseUrl('/img/editor/views/project-view/overview-v1.0.png'),
    }}
/>

## Project overview canvas

The project overview canvas is the central area of the Project view. It displays the project name as a heading and lists every agentic integration and library in the project.

<ThemedImage
    alt="Project overview canvas"
    sources={{
        light: useBaseUrl('/img/editor/views/project-view/project-overview-canvas-v1.0.png'),
        dark: useBaseUrl('/img/editor/views/project-view/project-overview-canvas-v1.0.png'),
    }}
/>

### Agentic integrations and libraries

The **Agentic Integrations & Libraries** section displays a card grid showing each agentic integration and library in the project. Each card shows:

- The name (for example, `Common Utils` or `Support Assistant`).
- For a library, a `Library` badge. For an agentic integration, the agents it contains, or `No agents yet` if it has none.

Click any card to navigate to the [Integration view](integration-view.md) or [Library view](library-view.md), where you can build and manage its artifacts.

### Add agentic integration or library

Click the **+ Add** button at the top of the canvas to add a new agentic integration or library to the project. Select the type, provide a name and configuration, and the new entry appears in the card grid and project explorer.

## Deploy menu

Click **Deploy** at the top right of the Project view to deploy or package the agentic integrations in the project.

<ThemedImage
    alt="Deploy menu"
    sources={{
        light: useBaseUrl('/img/editor/views/project-view/deployment-options-v1.0.png'),
        dark: useBaseUrl('/img/editor/views/project-view/deployment-options-v1.0.png'),
    }}
/>

| Option | Target |
|---|---|
| [**Deploy to WSO2 Cloud**](../../deploy-and-run/deploy-to-wso2-cloud/deploy-to-wso2-cloud.md) | Fully managed cloud platform for hosting and running agentic integrations. |
| [**Build Docker Image**](product://integrator/deploy-and-run/self-hosted/containerized-deployment) | Build Docker images to deploy on Docker, Kubernetes, or OpenShift. |
| [**Build Executable**](product://integrator/deploy-and-run/self-hosted/vm-deployment) | Build standalone JAR files to run on virtual machines. |

## What's next

- [Integration view](integration-view.md) — The primary development interface for individual agentic integrations.
- [Library view](library-view.md) — Build and manage reusable libraries.
