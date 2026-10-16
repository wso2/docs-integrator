---
title: Connect an Integration to ICP
---

# Connect an Integration to ICP

An integration connects to ICP by including the `wso2/icp.runtime.bridge` module and providing a `Config.toml` with a secret generated from the ICP console. Once configured, the bridge sends periodic heartbeats so ICP can monitor and manage the runtime. This page guides you through generating a secret, configuring the integration, and starting the runtime.

This guide covers manual configuration. If you are developing in the WSO2 Integrator, the setup is automated. See [Integration Control Plane (ICP)](index.md).

:::info Prerequisites

- ICP server running and reachable on port `9445`

## 1. Generate a secret

ICP uses a one-time secret to authenticate the runtime bridge. Generate one from the console before configuring the integration.

1. Navigate to the **Runtimes** view for your target environment. Two entry points are available depending on whether the integration exists in ICP yet:

   - **Organization home:** Click **Runtimes** in the sidebar. Use this when the integration does not exist in ICP yet.
   - **Project:** Go to **Projects** > **\<project\>** > **Integrations** > **\<integration\>** > **Runtimes**. Use this when the integration already exists. The generated snippet has **project** and **integration** pre-filled.

2. Find the environment card (e.g. **dev**) and click **Add Runtime**.

3. Click **Generate Secret**. If you opened the dialog from the organization home, the **Default** tab is selected by default. Use the **MI** tab only for MI runtimes.

4. Copy the `Config.toml` snippet shown.

The secret is displayed only once. Copy it before closing the dialog.

## 2. Configure the integration

Open your integration project. You need to update three files to enable the ICP runtime bridge.

### Add the runtime configuration (Config.toml)

Create a `Config.toml` file in your integration directory if one doesn't exist. Paste the snippet copied from the ICP console in step 1, then add the `requireSignedCommands`, `enableSSL`, and `cert` settings shown below:

```toml
[wso2.icp.runtime.bridge]
environment = "dev"
project     = "order-service"
integration = "order-create"
runtime     = "<unique-runtime-name>"
secret      = "<generated-secret>"
# Set to false to disable workflow management from the ICP. START, STOP, and SET_LOGGER_LEVEL remain available.
enableWorkflowManagement = true
# Refuse control commands that ICP has not signed. ICP 2.1.0 signs every command.
requireSignedCommands = true
# Verify the ICP server certificate. Required outside local development.
# enableSSL = true
# cert = "<path-to-icp-ca-cert>.pem"
# serverUrl = "https://<hostname>:9445"
# runtimeHostUrl = "http://<hostname>"
```

Keep `requireSignedCommands = true` and, outside local development, set `enableSSL = true` with `cert` pointing to the CA certificate that issued the ICP server certificate. If commands are not required to be signed and the heartbeat connection is not verified, anything that can answer the runtime's heartbeats can start and stop its listeners, change its log levels, and manage its workflows. Leave `enableSSL` off only for local development against ICP's default self-signed certificate.

Set `runtime` to a short, meaningful name that identifies this instance in the ICP console (for example, `order-create-prod-1`). Each node in a scaled deployment must have a unique `runtime` value.

`serverUrl` is commented out and defaults to `https://localhost:9445`. Uncomment and update it if ICP is running on a different host.

### Field reference

| Field | Required | Default | Description |
| --- | --- | --- | --- |
| `environment` | Yes | none | Environment name (must match an ICP environment) |
| `project` | Yes | none | Project handle in ICP |
| `integration` | Yes | none | Integration handle in ICP |
| `runtime` | No | none | Unique name for this runtime instance. If omitted, ICP identifies the runtime only by its generated runtime ID |
| `secret` | Yes | none | Secret generated in step 1 |
| `serverUrl` | No | `https://localhost:9445` | ICP runtime listener endpoint |
| `heartbeatInterval` | No | `10` | Seconds between heartbeats |
| `cert` | No | none | Path to a PEM certificate for the ICP server |
| `enableSSL` | No | `false` | Enforce TLS certificate verification |
| `enableWorkflowManagement` | No | `true` | Allow ICP to manage this runtime's workflows over the heartbeat channel. Set to `false` to disable workflow management from ICP; `START`, `STOP`, and `SET_LOGGER_LEVEL` commands remain available |
| `runtimeHostUrl` | No | `http://localhost` | URL whose host ICP uses to reach this runtime for Try-It requests. Only the host is used |
| `requireSignedCommands` | No | `false` | Refuse control commands from ICP that are not signed |

### Enable remote management (Ballerina.toml)

Add the `remoteManagement` build option to `Ballerina.toml`:

```toml
[build-options]
remoteManagement = true
```

### Import the runtime bridge (main.bal)

Add the following import to your integration entrypoint:

```ballerina
import wso2/icp.runtime.bridge as _;
```

This is a blank import (`as _`). It registers the bridge module, which activates automatically at startup.

When you enable ICP monitoring through the WSO2 Integrator, the `Ballerina.toml` and `main.bal` changes are applied automatically.

## 3. Start the application

Open a terminal in your integration directory and run:

```bash
bal run
```

Click the **Run** button in the WSO2 Integrator. Because ICP is already running externally, a popup appears saying **ICP is not running**. Click **Run Anyway** to proceed.

On startup the bridge logs:

```
ICP agent initialized with server URL: https://<icp-host>:9445
Sending full heartbeat to ICP server
Full heartbeat acknowledged by ICP server
```

The runtime now appears under **Runtimes** in the ICP console with status **RUNNING**.

## Multiple default profile nodes

When you run multiple instances of the same integration for high availability or horizontal scaling, ICP needs to track each instance separately. Each node shares the same `project`, `integration`, `environment`, and `secret`, but must have a unique `runtime` value so ICP can distinguish them in the **Runtimes** view.

A typical use case is running two nodes behind a load balancer. If one goes down, ICP reflects the status change for that specific node without affecting the others.

Configure each node's `Config.toml` with a distinct `runtime` name:

```toml
[wso2.icp.runtime.bridge]
environment = "prod"
project     = "order-service"
integration = "order-create"
runtime     = "order-create-node-1"
secret      = "<shared-secret>"
```

```toml
[wso2.icp.runtime.bridge]
environment = "prod"
project     = "order-service"
integration = "order-create"
runtime     = "order-create-node-2"
secret      = "<shared-secret>"
```

All nodes appear as separate entries under the same integration in the ICP **Runtimes** view, each with its own status.

## Troubleshooting

If the runtime fails to connect or does not appear in ICP, check logs on both sides. The integration logs show bridge activity and connection errors. The ICP server logs show whether heartbeats are being received and rejected.

| Symptom | Cause | Fix |
| --- | --- | --- |
| `Heartbeat response error` with `"statusCode":401` in integration logs | The secret is wrong, expired, or has been revoked in ICP | Generate a new secret from the ICP console and update `secret` in `Config.toml` |
| Runtime does not appear in ICP | The runtime cannot reach ICP, or `serverUrl` is pointing to the wrong host or port | Check ICP is running and reachable on port `9445`. Verify `serverUrl` in `Config.toml` is correct. Check for firewall rules blocking the connection. |
| Runtime appears but status is not **RUNNING** | The runtime started but heartbeats have stopped | Check the integration process is still running. Look for errors in the integration logs. Verify network connectivity to ICP. |
| `PKIX path building failed` in integration logs | The runtime does not trust the ICP server's self-signed certificate | Set `enableSSL = false` in `Config.toml` for non-production, or point `cert` to the ICP server's CA certificate |

## What's next

- [Observability setup](observability-setup/index.md) — add centralized logs and metrics for connected runtimes
- [Manage runtimes](manage-runtimes.md) — view runtime status, restart, and remove runtimes
- [Access control](access-control.md) — manage who can connect and manage runtimes
