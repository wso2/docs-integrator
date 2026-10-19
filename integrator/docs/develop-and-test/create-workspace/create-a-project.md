---
title: Create a Project
---

# Create a Project

A project is a workspace that organizes multiple integrations and libraries in a single repository with shared dependencies. Use projects when you need to manage related packages together.

## Open project creation form

To start creating a new project:

1. Open the WSO2 Integrator.
2. Locate the **Create a Project** card on the main dashboard.
3. Click **Create** to open the project creation form.

<ThemedImage
    alt="WSO2 Integrator"
    sources={{
        light: useBaseUrl('/img/create-project/wso2-integrator.png'),
        dark: useBaseUrl('/img/create-project/wso2-integrator.png'),
    }}
/>

If you have an existing project, click **Open Existing** on the **Create a Project** card or select the project from the **Recent Projects** list. For details, see [Open a project](open-a-project.md).

:::note[Migrating from other vendors]
To import integrations from other vendors and convert them to WSO2 Integrator format, check [Migrate Integrations from Other Vendors](../../migrate/index.md).

## Configure the project

In the **Create a Project** form, define the core properties of your workspace and select your starting component.

1. Add the project details:

| Field | Description | Default |
|---|---|---|
| **Project name** | A name for your project. | `Default` |
| **Location** | The directory where the project will be created. Click **Browse** to select a specific folder. | `~/WSO2Integrator` |

2. Under the **What do you want to build?** section, select your starting component:
   * **Integration:** Build any type of integration, workflow, MCP server, or AI agent.
   * **Library:** Build reusable components and utilities that can be shared across integrations.

> **Note:** This initial selection is just a starting point. You can [add more integrations and libraries](#add-more-integrations-and-libraries) to this project later.

3. Enter a name for your initial component in the **Integration name** (or **Library Name**) field.

<ThemedImage
    alt="Create Project form"
    sources={{
        light: useBaseUrl('/img/create-project/create-project.png'),
        dark: useBaseUrl('/img/create-project/create-project.png'),
    }}
/>

### Advanced configurations

Expand the **Advanced Configurations** panel to specify the Ballerina Package details. This section defines how the underlying Ballerina package is generated:

| Field | Description |
|---|---|
| **Package Name** | Provide a name for the package. |
| **Organization Name** | Provide the name of the organization that owns this package. |
| **Package Version** | Provide a version for the package. |

4. Click **Create** to generate the project and open the workspace.

<ThemedImage
    alt="Advanced Configuration form"
    sources={{
        light: useBaseUrl('/img/create-project/advanced-configuration-form.png'),
        dark: useBaseUrl('/img/create-project/advanced-configuration-form.png'),
    }}
/>

## Add more integrations and libraries

To add more components, switch to the **Project view** by clicking **Overview** in the sidebar. The project view lists all integrations and libraries in the project.

Click **+ Add** under the **Integrations & Libraries** card. Then Add an Integration or Library form opens.

<ThemedImage
    alt="Project view"
    sources={{
        light: useBaseUrl('/img/create-project/add-integration.png'),
        dark: useBaseUrl('/img/create-project/add-integration.png'),
    }}
/>

Every project, integration, and library view has its own **README** file. Use it to document that specific project, integration, or library.

<ThemedImage
    alt="Add Integration form"
    sources={{
        light: useBaseUrl('/img/create-project/add-integration-library-form.png'),
        dark: useBaseUrl('/img/create-project/add-integration-library-form.png'),
    }}
/>

### Add an integration

1. Select **Integration** as the type.

2. Enter an **Integration Name** (defaults to `Untitled`).

3. Optionally expand **Advanced Configurations** to set Ballerina package details:

   | Field | Description |
   |---|---|
   | **Package Name** | The Ballerina package name. Defaults to the integration name (for example, `untitled`). |
   | **Organization Name** | Inherited from the parent project and shown as read-only. |
   | **Package Version** | The initial version of the package. Defaults to `0.1.0`. |

4. Click **Add**.

<ThemedImage
    alt="Add New Integration form"
    sources={{
        light: useBaseUrl('/img/create-project/choose-integration.png'),
        dark: useBaseUrl('/img/create-project/choose-integration.png'),
    }}
/>

### Add a library

1. Select **Library** as the Type.

2. Enter a **Library Name** (defaults to `Untitled`).

3. Optionally expand **Advanced Configurations** to set the same Ballerina package fields as above. **Organization Name** is inherited from the parent project.

4. Click **Add**.

<ThemedImage
    alt="Add New Library form"
    sources={{
        light: useBaseUrl('/img/create-project/choose-library.png'),
        dark: useBaseUrl('/img/create-project/choose-library.png'),
    }}
/>

## What's next

- [Open a project](open-a-project.md) — Open an existing project
- [Explore sample integrations](explore-sample-integrations.md) — Start from a pre-built sample integration
