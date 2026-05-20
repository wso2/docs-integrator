---
title: Get Started with ICP
---

# Get Started with ICP

This guide walks you through connecting a running Ballerina project to ICP, enabling observability, and configuring access control. By the end, you will have a project and integration created in ICP, a Ballerina runtime connected and sending heartbeats, and optionally centralized logs, metrics, and access control configured.

:::info Prerequisites

- **ICP installed and running.** Follow the [Install ICP](install-icp.md) guide to download, configure, and start the server.
- **A running Ballerina project.** If you don't have one, follow the [Build an Integration as API](../../get-started/build-integration-api.md) guide to create one.
- **Fluent Bit** (optional, required only for step 5). See the [Fluent Bit installation page](https://docs.fluentbit.io/manual/installation/downloads).

Change the default `admin` password before using ICP in any non-evaluation environment. Go to **Access control** > **Users**, select the `admin` user, and click **Reset Password**.

## 1. Create a project

Projects group related integrations. Every integration belongs to exactly one project.

1. On the organization home, click **+ Create Project**.
2. Enter a **Display Name** (e.g. `My Project`). The name slug is auto-generated.
3. Click **Create**.

ICP redirects to the new project's home page. It also auto-creates an `<Project Name> Admins` group with the *Project Admin* role.

For full project management options, see [Manage projects](manage-projects.md).

## 2. Create an integration

1. On the project home page, click **+ Create Integration**.
2. Enter a **Display Name** (e.g. `My Integration`). Integration type defaults to **Default profile** (Ballerina).
3. Click **Create**.

The integration appears in the project's integrations table. You will connect a runtime to it in the next step.

For full integration management options, see [Manage integrations](manage-integrations.md).

## 3. Connect a runtime

This step links your Ballerina application to the integration you just created in ICP.

### Generate a secret

1. Open the integration and navigate to **Runtimes** in the sidebar.
2. Find the environment card (e.g. **dev**) and click **+ Add Runtime**.
3. Click **Generate Secret** and copy the `Config.toml` snippet shown.

The secret is displayed only once. Copy it before closing the dialog.

### Configure the integration

Open your Ballerina project and apply the following changes:

In **Config.toml**, paste the snippet copied from ICP and set a unique runtime name:

```toml
[wso2.icp.runtime.bridge]
environment = "dev"
project     = "my-project"
integration = "my-integration"
runtime     = "my-integration-1"
secret      = "<generated-secret>"
```

In **Ballerina.toml**, enable remote management:

```toml
[build-options]
remoteManagement = true
```

In **main.bal**, import the runtime bridge:

```ballerina
import wso2/icp.runtime.bridge as _;
```

### Start the runtime

```bash
bal run
```

On startup, the bridge logs a confirmation:

```
ICP agent initialized with server URL: https://localhost:9445
Sending full heartbeat to ICP server
Full heartbeat acknowledged by ICP server
```

### Verify the connection

Navigate to **Runtimes** in the integration sidebar. The runtime appears with status **RUNNING**.

For the full connection procedure including troubleshooting, see [Connect an integration to ICP](connect-runtime.md).

## 4. Create an environment (optional)

ICP ships with **dev** and **prod** environments. If you need additional environments such as *staging*, follow these steps:

1. Go to **Environments** in the organization sidebar.
2. Click **+ Create** and enter the environment name and details.
3. Click **Create**.

The new environment appears immediately on every integration across all projects.

For full environment management options, see [Manage environments](manage-environments.md).

## 5. Enable observability (optional)

Observability adds centralized logs and metrics to the **Logs** and **Metrics** pages in the ICP console. It requires OpenSearch and Fluent Bit.

At a high level, the setup involves:

1. Deploying an OpenSearch instance and configuring the ICP server to connect to it.
2. Creating index templates for application logs and metrics.
3. Adding observability configuration to your Ballerina integration (`observabilityIncluded = true`, log file paths).
4. Configuring Fluent Bit to tail the log files and ship them to OpenSearch.

For the full step-by-step procedure, see [Observability setup](observability-setup.md).

## 6. Configure access control (optional)

By default, the `admin` user has full access. To control who can view and manage each project and integration, set up role-to-group mappings.

At a high level, the setup involves:

1. Creating users and groups at the organization level.
2. Assigning roles to groups (built-in roles: Admin, Developer, Viewer, Project Admin, Super Admin).
3. Creating mappings at the organization, project, or integration level to scope access.

For the full access control model and step-by-step procedures, see [Access control](access-control.md).

## What's next

- [Observability setup](observability-setup.md) — enable centralized logs and metrics for connected runtimes
- [Access control](access-control.md) — set up roles, groups, and permissions
- [ICP console overview](icp-console-overview.md) — understand the console layout, scope levels, and navigation
