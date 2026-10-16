---
title: Get Started with ICP
---

# Get Started with ICP

This guide walks you through connecting a running Ballerina project to ICP, enabling observability, and configuring access control. By the end, you will have a project and integration created in ICP, a Ballerina runtime connected and sending heartbeats, and optionally centralized logs, metrics, and access control configured.

:::info Prerequisites

- **ICP installed and running.** Follow the [Install ICP](install-icp.md) guide to download, configure, and start the server.
- **A running Ballerina project.** If you don't have one, follow the [Build an Integration as API](../get-started/quickstarts/build-integration-api.md) guide to create one.
- **Fluent Bit** (optional, required only for step 5). See the [Fluent Bit installation page](https://docs.fluentbit.io/manual/installation/downloads).

For local development, start ICP from WSO2 Integrator. The ICP console opens in your browser at `https://localhost:9446`. Sign in with the default credentials (username `admin`, password `admin`).

<ThemedImage
    alt="ICP sign-in page"
    sources={{
        light: useBaseUrl('/img/icp/quick-start/sign-in.png'),
        dark: useBaseUrl('/img/icp/quick-start/sign-in.png'),
    }}
/>

:::caution Security Recommendation
Change the default `admin` password before using ICP in production. Click the user avatar at the top right, select **Profile**, and use **Change Password**.

## 1. Create a project

Projects group related integrations. Every integration belongs to exactly one project.

1. On the organization home, click **+ Create Project**.

   <ThemedImage
       alt="All Projects page with the Create Project button highlighted"
       sources={{
           light: useBaseUrl('/img/icp/quick-start/create-project-button.png'),
           dark: useBaseUrl('/img/icp/quick-start/create-project-button.png'),
       }}
   />

2. Enter a **Display Name** (e.g. `My Project`). The name slug is auto-generated.

   <ThemedImage
       alt="Create a Project form with Display Name set to My Project"
       sources={{
           light: useBaseUrl('/img/icp/quick-start/create-project-form.png'),
           dark: useBaseUrl('/img/icp/quick-start/create-project-form.png'),
       }}
   />

3. Click **Create**.

ICP redirects to the new project's home page.

ICP also auto-creates a `<project-name-slug> Admins` group (for example, `my-project Admins`) with the *Project Admin* role. You can use this group to manage access to the project. See [Access control](access-control.md).

For full project management options, see [Manage projects](manage-projects.md).

## 2. Create an integration

1. On the project home page, click **+ Create Integration**.

   <ThemedImage
       alt="Project home page with the Create Integration button highlighted"
       sources={{
           light: useBaseUrl('/img/icp/quick-start/create-integration-button.png'),
           dark: useBaseUrl('/img/icp/quick-start/create-integration-button.png'),
       }}
   />

2. Enter a **Display Name** (e.g. `My Integration`).

3. Under **Technology**, select the runtime type:

   <table style={{width: '100%', display: 'table'}}>
     <colgroup><col style={{width: '30%'}} /><col style={{width: '70%'}} /></colgroup>
     <thead><tr><th>Technology</th><th>Description</th></tr></thead>
     <tbody>
       <tr><td><strong>WSO2 Integrator</strong></td><td>A Ballerina-based integration. This is the default profile.</td></tr>
       <tr><td><strong>WSO2 Integrator: MI</strong></td><td>A Micro Integrator-based integration for existing MI deployments.</td></tr>
     </tbody>
   </table>

4. Optionally, under **Integration Type**, select what you want to build. **Workflow** is available only for **WSO2 Integrator**.

   <table style={{width: '100%', display: 'table'}}>
     <colgroup><col style={{width: '30%'}} /><col style={{width: '70%'}} /></colgroup>
     <thead><tr><th>Integration type</th><th>Description</th></tr></thead>
     <tbody>
       <tr><td><strong>Integration as API</strong></td><td>Expose your integration as a REST, GraphQL or WebSocket API.</td></tr>
       <tr><td><strong>Automation</strong></td><td>Run integrations on a schedule or as a recurring task.</td></tr>
       <tr><td><strong>Workflow</strong></td><td>Orchestrate long-running processes with durable state and human tasks.</td></tr>
       <tr><td><strong>File Integration</strong></td><td>Process files from storage systems like FTP or AWS S3 when they arrive.</td></tr>
       <tr><td><strong>Event Integration</strong></td><td>React to events from sources like Kafka, Azure Service Bus, RabbitMQ or NATS.</td></tr>
       <tr><td><strong>AI Agent</strong></td><td>Build AI agents that reason over your integrations and call tools and services.</td></tr>
       <tr><td><strong>MCP Server</strong></td><td>Expose tools to AI agents and clients over the Model Context Protocol.</td></tr>
     </tbody>
   </table>

   <ThemedImage
       alt="Create New Integration form with Technology and Integration Type options"
       sources={{
           light: useBaseUrl('/img/icp/quick-start/create-new-integration-form-v5.1.png'),
           dark: useBaseUrl('/img/icp/quick-start/create-new-integration-form-v5.1.png'),
       }}
   />

5. Click **Create**.

ICP opens the new integration's overview page. The integration is also listed under **Integrations** on the project home page. It has no runtime yet. You will connect one in the next step.

For full integration management options, see [Manage integrations](manage-integrations.md).

## 3. Connect a runtime

After creating the integration, connect your integration runtime to it so ICP can monitor and manage it. To do this, generate a secret from the integration's **Runtimes** page in the ICP console, add it to your project's configuration, and start the runtime.

For the step-by-step procedure, see [Connect an Integration to ICP](connect-runtime.md).

Once connected, the runtime appears in the **Runtimes** view with status **RUNNING**.

<ThemedImage
    alt="Runtimes view showing a connected runtime with status RUNNING"
    sources={{
        light: useBaseUrl('/img/icp/quick-start/runtimes.png'),
        dark: useBaseUrl('/img/icp/quick-start/runtimes.png'),
    }}
/>

## 4. Create an environment (optional)

ICP ships with **dev** and **prod** environments. If you need additional environments such as *staging*, follow these steps:

1. Go to **Environments** in the organization sidebar.

2. Click **+ Create Environment** and enter the environment name and details.

   <ThemedImage
       alt="Environments page with the Create Environment button highlighted"
       sources={{
           light: useBaseUrl('/img/icp/quick-start/create-environment-button.png'),
           dark: useBaseUrl('/img/icp/quick-start/create-environment-button.png'),
       }}
   />

3. Click **Create**.

<ThemedImage
    alt="Environments page showing the newly created environment"
    sources={{
        light: useBaseUrl('/img/icp/quick-start/environment-created.png'),
        dark: useBaseUrl('/img/icp/quick-start/environment-created.png'),
    }}
/>

New environments are available immediately to every integration across all projects.

For full environment management options, see [Manage environments](manage-environments.md).

## 5. Enable observability (optional)

Observability adds centralized logs and metrics to the **Logs** and **Metrics** pages in the ICP console. It requires OpenSearch and Fluent Bit.

At a high level, the setup involves:

1. Deploying an OpenSearch instance and configuring the ICP server to connect to it.
2. Creating index templates for application logs and metrics.
3. Adding observability configuration to your Ballerina integration (`observabilityIncluded = true`, log file paths).
4. Configuring Fluent Bit to tail the log files and ship them to OpenSearch.

For the full step-by-step procedure, see [Observability setup](observability-setup/index.md).

## 6. Configure access control (optional)

By default, the `admin` user has full access. To control who can view and manage each project and integration, set up role-to-group mappings.

At a high level, the setup involves:

1. Creating users and groups at the organization level.
2. Assigning roles to groups (built-in roles: Admin, Developer, Viewer, Project Admin, Super Admin).
3. Creating mappings at the organization, project, or integration level to scope access.

For the full access control model and step-by-step procedures, see [Access control](access-control.md).

## What's next

- [Observability setup](observability-setup/index.md) — enable centralized logs and metrics for connected runtimes
- [Access control](access-control.md) — set up roles, groups, and permissions
- [ICP console overview](icp-console-overview.md) — understand the console layout, scope levels, and navigation
