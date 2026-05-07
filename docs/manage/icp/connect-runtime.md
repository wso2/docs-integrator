---
title: Connect an Integration to ICP
---

# Connect an Integration to ICP

This guide covers manual configuration. If you are developing in the WSO2 Integrator IDE, the setup is automated — see [Integration Control Plane (ICP)](../../deploy-operate/observe/icp.md).

An integration connects to ICP by including the `icp-runtime-bridge` module and
providing a `Config.toml` with a **secret** generated from the ICP console. Once
configured, the bridge sends periodic heartbeats so ICP can monitor and manage the
runtime.

## Prerequisites

- ICP server running and reachable on port **9445**
- An integration with the `wso2/icp.runtime.bridge` dependency

## 1. Generate a Secret

Sign in to the ICP console and generate a secret. There are two places to do this;
choose whichever matches your workflow.

### Option A — Organization Level

Best when you want to register a runtime before assigning it to a specific component,
or when the component does not exist in ICP yet.

1. Navigate to **Runtimes** in the sidebar.
2. Find the target environment card (e.g. *dev*) and click **Add Runtime**.
3. Click **Generate Secret**.
4. The **BI** tab is selected by default. Copy the `Config.toml` snippet shown.

> The secret is displayed only once. Copy it before closing the dialog.

### Option B — Project / Component Level

Best when the component already exists in ICP. The generated snippet has `project`
and `integration` pre-filled and the secret is scoped to that component.

1. Navigate to the component: **Projects → \<project\> → Components → \<component\> → Runtimes**.
2. Find the target environment card and click **Add Runtime**.
3. Click **Generate Secret**.
4. Copy the `Config.toml` snippet shown.

## 2. Configure the Integration

### Ballerina.toml

Enable remote management in `Ballerina.toml`:

```toml
[build-options]
remoteManagement = true
```

### main.bal

Import the ICP runtime bridge in the integration entrypoint:

```ballerina
import wso2/icp.runtime.bridge as _;
```

This is a blank import (`as _`) — it activates automatically at startup.

When you enable ICP monitoring through the WSO2 Integrator IDE, the `Ballerina.toml` and `main.bal` changes are applied automatically.

### Config.toml

Place the snippet in the `Config.toml` next to your application jar, filling in any
placeholder values.

```toml
[wso2.icp.runtime.bridge]
serverUrl   = "https://<icp-host>:9445"
environment = "dev"
project     = "my-project"
integration = "my-integration"
secret      = "<generated secret>"
```

### Field Reference

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `serverUrl` | no | `https://localhost:9445` | ICP runtime listener endpoint |
| `environment` | yes | — | Environment name (must match an ICP environment) |
| `project` | yes | — | Project handle in ICP |
| `integration` | yes | — | Component handle in ICP |
| `secret` | yes | — | Secret from step 1 |
| `runtime` | no | auto-generated UUID | Stable identifier for this runtime instance |
| `heartbeatInterval` | no | `10` | Seconds between heartbeats |
| `cert` | no | `""` | Path to a PEM certificate for the ICP server |
| `enableSSL` | no | `false` | Enforce TLS certificate verification (non-production) |

## 3. Start the Application

```bash
java -jar my-app.jar
```

On startup the bridge logs:

```
ICP agent initialized with server URL: https://<icp-host>:9445
Sending full heartbeat to ICP server
Full heartbeat acknowledged by ICP server
```

The runtime now appears under **Runtimes** in the ICP console with status **RUNNING**.

## Multiple BI Nodes

Each BI node needs a unique `runtime` value but can share the same `project`,
`integration`, `environment`, and `secret`. All nodes appear as separate runtimes
under the same component in ICP.

```toml
# Node 1
[wso2.icp.runtime.bridge]
runtime = "bi-node-1"

# Node 2
[wso2.icp.runtime.bridge]
runtime = "bi-node-2"
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Full heartbeat rejected` | Wrong or revoked secret | Generate a new secret in the console |
| Runtime shows but status is not RUNNING | Heartbeats stopped | Check the BI process is alive and network is reachable |
| `PKIX path building failed` | Self-signed ICP certificate | Set `enableSSL = false` (non-production) or provide the CA via `cert` |

## Next Step

Add centralized logs and metrics for your integration:

➡️ **[Observability Setup](observability-setup.md)** — Configure OpenSearch, Fluent Bit, and log collection.
