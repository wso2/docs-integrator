---
title: The Integration Workspace
---

# The Integration Workspace

WSO2 Integrator organizes your work into three concepts that build on each other:

- **Project** — a workspace that groups multiple integrations and libraries together, sharing a single repository and dependencies.
- **Integration** — a deployable unit built from artifacts (services, automations, event handlers, and more) that can be built, tested, and deployed on its own.
- **Library** — a reusable package of shared logic (utility functions, type definitions, data mappers, connections) that one or more integrations import.

A project can hold any number of integrations and libraries side by side. You can also skip the project wrapper and create a standalone integration or library, then convert it into a project later once you need to add more alongside it.

<ThemedImage
    alt="How WSO2 Integrator organizes a project, its integrations, and its libraries"
    sources={{
        light: useBaseUrl('/img/develop/organize/integartor-work-organization.png'),
        dark: useBaseUrl('/img/develop/organize/integartor-work-organization.png'),
    }}
/>

## Create Your Project

- **[Create a project](create-a-project.md)** — Set up a new project workspace to hold multiple integrations and libraries.

    - **[Create a new integration](create-a-project.md#add-an-integration)** — Add a new integration to your project.
    - **[Create a library](create-a-project.md#add-a-library)** — Add a library to your project to share common logic across its integrations.

- **[Open a project](open-a-project.md)** — Open an existing project from your local filesystem, or clone one from WSO2 Cloud.

- **[Explore sample integrations](explore-sample-integrations.md)** — Start from a curated, pre-built sample instead of a blank integration.

## What's next

- [Integration artifacts](../integration-artifacts/integration-artifacts.md) — Understand the artifact types you build inside an integration
- [Project view](../../editor/views/project-view.md) — Manage, run, and debug a multi-package project
