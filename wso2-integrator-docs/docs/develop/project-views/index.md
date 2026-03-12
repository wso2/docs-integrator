---
sidebar_position: 2
title: Project Views
description: Understand the Workspace, Integration, and Library views in WSO2 Integrator.
---

# Project Views

WSO2 Integrator provides three project views to organize and manage your integrations at different levels. Each view surfaces different capabilities and is optimized for a specific workflow.

## Workspace View

The **Workspace View** gives you an overview of all integration packages in a workspace. Use it to:

- Navigate between multiple integration packages
- Manage cross-package dependencies
- Visualize the overall structure of a multi-package project
- Add or remove integrations from the workspace

Available in WSO2 Integrator 1.5.0+ with Ballerina 2201.13.0+.

### Creating a Workspace

1. Open the WSO2 Integrator sidebar.
2. Click **Create New Integration**.
3. Expand **Optional Configurations**.
4. Enable **Create Workspace** and set a workspace name.
5. Click **Create Integration**.

### Adding Integrations to a Workspace

Click the **+** button in the workspace panel to add a new integration package, or convert a standalone integration to a workspace by adding another integration alongside it.

## Integration View

The **Integration View** is the primary development interface. It shows:

- **Entry Points** -- HTTP services, event listeners, scheduled automations
- **Listeners** -- Protocol-specific listeners (HTTP, Kafka, RabbitMQ, etc.)
- **Connections** -- Configured connections to external systems
- **Types** -- Custom record types and data definitions
- **Functions** -- Reusable logic blocks
- **Data Mappers** -- Visual transformation mappings
- **Configurations** -- Configurable variables
- **Local Connectors** -- Project-specific connector packages

This is the default view when you open a single integration project.

## Library View

The **Library View** shows reusable modules that are shared across integrations. Use it when building shared libraries that multiple integrations depend on:

- Shared type definitions
- Common utility functions
- Custom connector packages
- Reusable data mapper configurations

Libraries are created with `bal new my-library -t lib` and published to Ballerina Central for organization-wide reuse.

## Switching Between Views

Use the view selector in the WSO2 Integrator sidebar to switch between Workspace, Integration, and Library views depending on your current task.

## What's Next

- [Create Integrations](/docs/develop/create-integrations) -- Create new integration packages
- [Organize Code](/docs/develop/organize-code/packages-modules) -- Structure packages and modules
