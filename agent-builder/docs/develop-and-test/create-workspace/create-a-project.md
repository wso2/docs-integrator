---
title: Create a Project
---

# Create a Project

A project is a workspace that organizes multiple agentic integrations and libraries in a single repository with shared dependencies. Use projects when you need to manage related packages together.

## Open project creation form

To start creating a new project:

1. Open WSO2 Agent Builder.
2. Locate the **Start Building your Agent** card on the home page.
3. Click **Create** to open the project creation form.

<ThemedImage
    alt="WSO2 Agent Builder home page"
    sources={{
        light: useBaseUrl('/img/create-project/wso2-agent-builder-v1.0.png'),
        dark: useBaseUrl('/img/create-project/wso2-agent-builder-v1.0.png'),
    }}
/>

If you have an existing project, click **Open** on the **Start Building your Agent** card or select the project from the **Recent Projects** list. For details, see [Open a project](open-a-project.md).

## Configure the project

In the **Create a Project** form, define the core properties of your workspace and select your starting component.

1. Add the project details:

| Field | Description | Default |
|---|---|---|
| **Project name** | A name for your project. | `Default` |
| **Location** | The directory where the project will be created. Click **Browse** to select a specific folder. | `~/WSO2AgentBuilder` |

2. Under the **What do you want to build?** section, select your starting component:
   * **Agentic Integration:** Build AI agents with tools, memory, and the triggers that invoke them.
   * **Library:** Build reusable components and utilities that can be shared across agentic integrations.

> **Note:** This initial selection is just a starting point. You can [add more agentic integrations and libraries](#add-more-integrations-and-libraries) to this project later.

3. Enter a name for your initial component in the **Agentic integration name** (or **Library Name**) field.

<ThemedImage
    alt="Create Project form"
    sources={{
        light: useBaseUrl('/img/create-project/create-project-v1.0.png'),
        dark: useBaseUrl('/img/create-project/create-project-v1.0.png'),
    }}
/>

### Advanced configurations

Expand the **Advanced Configurations** panel to specify the Ballerina Package details. This section defines how the underlying Ballerina package is generated:

| Field | Description |
|---|---|
| **Package Name** | Provide a name for the package. |
| **Organization Name** | Provide the name of the organization that owns this package. Sign in to pick from your organizations. |
| **Package Version** | Provide a version for the package. |

4. Click **Create Agentic Integration** (or **Create** for a library) to generate the project. The project opens in the view of the new agentic integration or library.

<ThemedImage
    alt="Advanced Configuration form"
    sources={{
        light: useBaseUrl('/img/create-project/advanced-configuration-form-v1.0.png'),
        dark: useBaseUrl('/img/create-project/advanced-configuration-form-v1.0.png'),
    }}
/>

## Add more integrations and libraries

To add more components, switch to the **Project view** by clicking the home icon at the top left of the editor. The project view lists all agentic integrations and libraries in the project.

Click **+ Add** in the **Agentic Integrations & Libraries** section. The **Add an Integration or Library** form opens.

<ThemedImage
    alt="Project view"
    sources={{
        light: useBaseUrl('/img/create-project/add-integration-v1.0.png'),
        dark: useBaseUrl('/img/create-project/add-integration-v1.0.png'),
    }}
/>

<ThemedImage
    alt="Add an Integration or Library form"
    sources={{
        light: useBaseUrl('/img/create-project/add-integration-library-form-v1.0.png'),
        dark: useBaseUrl('/img/create-project/add-integration-library-form-v1.0.png'),
    }}
/>

### Add an integration

1. Select **Agentic Integration** as the type.

2. Enter an **Agentic Integration Name** (defaults to `Untitled`).

3. Optionally expand **Advanced Configurations** to set Ballerina package details:

   | Field | Description |
   |---|---|
   | **Package Name** | The Ballerina package name. Defaults to the integration name (for example, `untitled`). |
   | **Organization Name** | Inherited from the parent project and shown as read-only. |
   | **Package Version** | The initial version of the package. Defaults to `0.1.0`. |

4. Click **Add**.

<ThemedImage
    alt="Add New Agentic Integration form"
    sources={{
        light: useBaseUrl('/img/create-project/choose-integration-v1.0.png'),
        dark: useBaseUrl('/img/create-project/choose-integration-v1.0.png'),
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
        light: useBaseUrl('/img/create-project/choose-library-v1.0.png'),
        dark: useBaseUrl('/img/create-project/choose-library-v1.0.png'),
    }}
/>

## What's next

- [Open a project](open-a-project.md) — Open an existing project
- [Explore sample integrations](explore-sample-integrations.md) — Start from a pre-built agent or sample
