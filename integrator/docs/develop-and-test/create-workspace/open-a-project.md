---
title: Open a Project
---

# Open a Project

If you already have a project, you can open it from the WSO2 Integrator home screen. You can open projects stored locally on your machine or clone cloud projects from your WSO2 Cloud organization.

On the WSO2 Integrator home screen, click **Open Existing** on the `Create a Project card`.

   <ThemedImage
       alt="Home screen with More Actions expanded"
       sources={{
           light: useBaseUrl('/img/open-project/home-screen.png'),
           dark: useBaseUrl('/img/open-project/home-screen.png'),
       }}
   />

:::note[Migrating from other vendors]
To import integrations from other vendors and convert them to WSO2 Integrator format, check [Migrate Integrations from Other Vendors](../../migrate/index.md).

## Choose a source

The form opens with the prompt `Choose how you'd like to open a project` and presents two cards.

      <ThemedImage
          alt="Open Project options"
          sources={{
              light: useBaseUrl('/img/open-project/open-project-options.png'),
              dark: useBaseUrl('/img/open-project/open-project-options.png'),
          }}
      />

- **Open Local Project** — *Browse your computer and open an existing integration project folder.*
- **Open Cloud Project** — *Browse and clone a project from your WSO2 Cloud organization.*

### Open a local project

1. Click **Open Local Project**.
2. A native file browser appears. Navigate to the directory that contains your project.
3. Select the project folder and click **Open**.

WSO2 Integrator detects the project structure and opens the [project view](../../editor/views/project-view.md).

### Open a cloud project

1. Click **Open Cloud Project**. The form updates with the prompt *Select a cloud project to clone to your machine.* and a **Cloud Projects** section.
2. If you are not signed in, the empty state shows *Sign In to browse cloud projects — Connect your WSO2 account to clone and open projects directly from the cloud.* Click **Sign In** to connect your account.

   <ThemedImage
       alt="Sign in to browse cloud projects"
       sources={{
           light: useBaseUrl('/img/open-project/cloud-sign-in.png'),
           dark: useBaseUrl('/img/open-project/cloud-sign-in.png'),
       }}
   />

3. After signing in, the form lists the cloud projects available in your organization. The active organization is shown at the top right (for example, **Demo Organization**), and each entry displays the project name and description.

   <ThemedImage
       alt="Cloud projects list"
       sources={{
           light: useBaseUrl('/img/open-project/cloud-projects-list.png'),
           dark: useBaseUrl('/img/open-project/cloud-projects-list.png'),
       }}
   />

4. Click a project to clone it to your local machine and open it in WSO2 Integrator.

## Troubleshooting

If the editor shows **WSO2 Integrator cannot start** or **Your project dependencies need to be updated** instead of your project, your installed Ballerina version, or the version that resolved the project's dependencies, is earlier than 2201.14.0. See [Moving to Ballerina 2201.14.0](../../editor/troubleshooting/moving-to-ballerina-2201-14.md) to update, or to stay on your current version.

## What's next

- [Project view](../../editor/views/project-view.md) — Manage, run, and debug your project
- [Create a project](create-a-project.md) — Create a new project from scratch
