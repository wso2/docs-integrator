---
title: "Connect a Workflow Runtime"
description: Register an integration that runs durable workflows with the WSO2 Integration Control Plane so its executions, human tasks, and reviews appear in the console.
keywords: [wso2 integrator, integration control plane, icp, workflow runtime, enable workflow management, config.toml, task queue]
sidebar_label: "Getting Started"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connect a Workflow Runtime

A durable workflow runs inside your integration. The Integration Control Plane (ICP) can list its executions, hand out its human tasks, and control running instances only after the runtime tells ICP where to reach it. This page walks through the whole setup: creating the integration in ICP, generating a secret with workflow management enabled, applying the configuration to your integration, and verifying that the workflows show up.

:::info Prerequisites

- An ICP server that is running and reachable on port `9445` ([Install ICP](../../manage/icp/install-icp.md))
- A project and at least one environment in ICP ([Manage projects](../../manage/icp/manage-projects.md))
- An integration that defines at least one durable workflow ([Build an order processing workflow](../getting-started/build-an-order-processing-workflow.md))
:::

## 1. Create a workflow integration

The **Workflow** integration type tells ICP that this integration hosts workflows. It gives the integration its own **Workflows** page and lists workflow definitions instead of service endpoints on the overview.

1. Go to **Projects** > *your project*.
2. Click **+ Create Integration**.
3. Fill in the form:

   | Field | Value |
   | --- | --- |
   | **Display Name** | A readable name, for example `Order Processing` |
   | **Name** | The URL-safe handle derived from the display name. Note this value. It becomes the workflow task queue. |
   | **Technology** | **WSO2 Integrator** |
   | **Integration Type** | **Workflow** |

4. Click **Create**.

:::note
The **Workflow** integration type is offered only for **WSO2 Integrator**. The workflow engine and its management API are not available on **WSO2 Integrator: MI**.
:::

## 2. Generate a secret with workflow management enabled

1. Open the integration and go to **Runtimes**.
2. Find the environment card, for example **dev**, and click **Add Runtime**.
3. Click **Generate Secret**.
4. Check that **Enable Workflow Management** is on. For an integration created with the **Workflow** type the toggle is not shown, because workflow management is always enabled. For any other integration type, switch it on.
5. Copy the generated `Config.toml` snippet.

:::warning
The secret is shown once. Copy it before you close the dialog. The same secret authenticates the runtime bridge and protects the workflow management API, so you need it in two places in `Config.toml`.
:::

:::tip
You can also generate a secret from **Runtimes** in the organization sidebar. That dialog is organization-scoped, so `project` and `integration` come through as placeholders that you fill in yourself. Keep `taskQueue` identical to the `integration` value.
:::

## 3. Apply the configuration

Three files in your integration change: `Config.toml`, `Ballerina.toml`, and `main.bal`.

### Config.toml

Paste the copied snippet into `Config.toml`, then replace `runtime` with a unique name for this instance:

```toml
[wso2.icp.runtime.bridge]
environment = "dev"
project = "order-processing"
integration = "order-api"
runtime = "order-api-node-1"
secret = "<generated-secret>"
enableWorkflowManagement = true
# workflowManagementApiPort = 8234
# serverUrl = "https://<hostname>:9445"
# runtimeHostUrl = "http://<hostname>"

[ballerina.workflow]
# mode = "LOCAL"
taskQueue = "order-api"

[ballerina.workflow.management]
enableManagementApi = true
enableApiKey = true
apiKeyValue = "<generated-secret>"
apiKeyHeader = "X-API-Key"
enableBasicAuth = false
# port = 8234
```

The three blocks do different jobs:

- `[wso2.icp.runtime.bridge]` registers the runtime with ICP and reports where the workflow management API can be reached.
- `[ballerina.workflow]` configures the workflow engine, including the task queue this integration polls.
- `[ballerina.workflow.management]` turns on the REST management API that ICP calls, and protects it with an API key.

### Workflow configuration reference

| Key | Block | Default | Description |
| --- | --- | --- | --- |
| `enableWorkflowManagement` | bridge | `false` | Report the workflow management API's URL to ICP in the heartbeat. Without it, ICP has no address to call and every workflow view returns "No running workflow runtime with a callback URL for this environment". |
| `workflowManagementApiPort` | bridge | `8234` | The port ICP is told to call. Keep it equal to `port` in `[ballerina.workflow.management]`. |
| `runtimeHostUrl` | bridge | `http://localhost` | The host ICP is told to call. Set it when ICP cannot reach the runtime at `localhost`, such as in containers or Kubernetes. If this value already includes a port, that port is used and `workflowManagementApiPort` is ignored. |
| `taskQueue` | workflow | none | The queue this integration polls. It must match the integration handle in the bridge block. ICP uses it to map an execution back to the integration that owns it. |
| `mode` | workflow | `LOCAL` | How the runtime connects to the workflow engine. Add `url`, `namespace`, and the authentication keys your deployment needs to the same block. |
| `enableManagementApi` | management | `false` | Expose the workflow management REST API. |
| `enableApiKey`, `apiKeyValue`, `apiKeyHeader` | management | `false`, none, `x-api-key` | Protect the management API with an API key. Set `apiKeyValue` to the secret ICP generated. ICP sends that exact value in the `X-API-Key` header. |
| `port` | management | `8234` | The port the management API listens on. |

:::warning
Set `apiKeyValue` to the secret from step 2, unchanged. ICP reconstructs the key from the secret the runtime registered with, so a different value makes every workflow request fail with an authentication error. If you revoke and regenerate the secret, update both `secret` and `apiKeyValue`.
:::

### Ballerina.toml

Enable remote management so ICP can manage the runtime:

```toml
[build-options]
remoteManagement = true
```

### main.bal

Add both imports. Workflow management is a separate module, and its `[ballerina.workflow.management]` configuration only takes effect when the module is part of the build:

```ballerina
import ballerina/workflow.management as _;

import wso2/icp.runtime.bridge as _;
```

Both are blank imports (`as _`). They register their modules, which activate at startup.

## 4. Start the runtime and verify

<Tabs>
<TabItem value="terminal" label="Terminal" default>

Run the integration from its directory:

```bash
bal run
```

</TabItem>
<TabItem value="ide" label="WSO2 Integrator IDE">

Click **Run**. Because ICP is already running externally, a popup reports that ICP is not running. Click **Run Anyway**.

</TabItem>
</Tabs>

Then check the console:

1. Under **Runtimes**, the runtime appears with status **RUNNING**.
2. A **Workflows** item appears in the integration's sidebar.
3. On the integration overview, the environment card lists your workflow definitions under **Workflow Definitions**. Selecting one shows its running instances, with **View Workflows** and **Start New Workflow** actions.

If all three are true, the setup is complete. Continue with [Start a workflow](start-workflow.md).

## How ICP reaches the runtime

Requests from the console are relayed by ICP rather than sent to the runtime by your browser:

```text
Browser  ->  https://<icp-host>/icp/workflow/{integrationId}/{environmentId}/<path>
         ->  <runtime callback URL>/workflow/<path>
```

Along the way ICP does three things:

- **Authorizes the caller** against the workflow permissions for that integration, and rejects the request with `403` if the caller lacks them.
- **Replaces the caller's ICP token** with the runtime's API key, and adds `x-user-id` and `x-user-roles` headers so the runtime can filter tasks by role.
- **Picks the target runtime**, which is the running runtime that reported a workflow callback URL for that integration and environment.

Two consequences are worth knowing:

- Requests time out after 30 seconds by default. Tune `workflowProxyTimeout` on the ICP server if your runtime needs longer.
- A plain `http` callback URL sends the API key unencrypted, and ICP logs a warning when it does. Use an `https` callback URL in production. ICP validates the runtime's certificate by default. To accept a self-signed certificate in a development or in-cluster deployment, set `workflowProxyAllowInsecureTLS = true` on the ICP server.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| The **Workflows** page reports that no running workflow runtime has a callback URL | The runtime is offline, or it registered without `enableWorkflowManagement = true` | Confirm the runtime is **RUNNING**, add the key to `Config.toml`, and restart the runtime |
| Every workflow request fails with an authentication error | `apiKeyValue` does not match the secret the runtime registered with | Set `apiKeyValue` to the same secret as `secret`, then restart |
| Lists load, but requests time out or cannot connect | ICP cannot reach the address the runtime reported | Set `runtimeHostUrl` to a host ICP can resolve, and confirm `workflowManagementApiPort` matches the management API `port` |
| Executions appear at project level but the integration has no **Workflows** item | The integration is not typed as **Workflow** | Create the integration with the **Workflow** integration type, or use the project-level page |
| Tasks and reviews are missing for a user who can open the page | The user holds no ICP role matching the task's eligible roles | Create roles named exactly as the workflow declares them, and map them to the user's group |
| The runtime does not appear at all | The bridge cannot reach ICP, or the secret is wrong | See [Connect an integration to ICP](../../manage/icp/connect-runtime.md#troubleshooting) |

## What's next

- [Start a workflow](start-workflow.md) — launch a new execution from the console
- [Workflow executions](executions.md) — inspect the timeline, execution graph, and history of a run
- [Manage workflows with the Integration Control Plane](managing-workflows.md) — the permissions and roles that control each view
- [Management API](../reference/management-api.md) — the REST API the console calls
