---
title: Create a Project
---

# Create a Project

A project is the top-level container for your integrations on WSO2 Cloud. Use projects to group related integrations and manage them together. WSO2 Cloud creates a project named **Default** when you first sign up, and you can create more at any time.

If your project already exists in a Git repository, import it instead. See [Import a project](import-a-project.md).

## Create the project

1. Sign in to [WSO2 Cloud](https://console.devant.dev) and click **Organization** in the top navigation to open the organization overview. It lists all the projects in your organization.
2. Click **+ Create**.

    <ThemedImage
        alt="Create button on the All Projects page"
        sources={{
            light: useBaseUrl('/img/create-project/create-project-saas-button.png'),
            dark: useBaseUrl('/img/create-project/create-project-saas-button.png'),
        }}
    />

3. In the **Create a Project** form, enter the project details:

    | Field | Description |
    |---|---|
    | **Display Name** | A human-readable label shown in the console. |
    | **Name** | A unique identifier for the project. It is generated from the display name, and you can edit it. It must be unique within the organization. |
    | **Description** | An optional summary of the project's purpose. |

4. Optionally, under **Connect Your Repository**, link a Git repository to the project. Choose **Authorize With GitHub**, **Authorize with Bitbucket**, **Authorize with GitLab**, or **Use Public GitHub Repository**. For Bitbucket and GitLab, select a saved credential. See [Connect a Git provider](../../deploy-and-run/deploy-to-wso2-cloud/connect-git-provider.md) to add one.

    <ThemedImage
        alt="Create a Project form"
        sources={{
            light: useBaseUrl('/img/create-project/create-project-saas-form.png'),
            dark: useBaseUrl('/img/create-project/create-project-saas-form.png'),
        }}
    />

    :::note
    Connecting a repository here only links its metadata to the project. To bring existing integrations in from a repository, use [Import a project](import-a-project.md) or [Import an integration](import-an-integration.md).
    :::

5. Click **Create**.

WSO2 Cloud creates the project and opens the project home.

## Add integrations to the project

The **Create Integration** page, which a new project opens on, offers several ways to add your first integration:

<ThemedImage
    alt="Create Integration page with Create on Cloud, Import an Integration, and Get Started Quickly"
    sources={{
        light: useBaseUrl('/img/create-project/create-project-saas-landing.png'),
        dark: useBaseUrl('/img/create-project/create-project-saas-landing.png'),
    }}
/>

- **Create on Cloud** — Build an integration in the browser-based cloud editor, without installing anything locally. See [Deploy from the cloud editor](../../deploy-and-run/deploy-to-wso2-cloud/deploy-from-cloud-editor.md).
- **Import an Integration** — Connect a Git provider and bring in an existing integration. See [Import an integration](import-an-integration.md).
- **Get Started Quickly** — Start from a prebuilt integration or a sample. See [Pre-built integrations](../../get-started/prebuilt-integrations.md) and [Start with sample integrations](start-with-sample-integrations.md).

## What's next

- [Import a project](import-a-project.md) — Bring an existing project from a Git repository
- [Import an integration](import-an-integration.md) — Bring a single integration from a Git repository
- [Manage projects](../../manage/projects.md) — View, edit, and delete projects
