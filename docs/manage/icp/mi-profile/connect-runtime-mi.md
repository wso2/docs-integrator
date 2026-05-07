---
title: Connect MI Integration to ICP
---

# Connect MI Integration to ICP

An MI runtime connects to ICP by adding an `[icp_config]` block to `deployment.toml`
with a **secret** generated from the ICP console. Once configured, the MI instance
sends periodic heartbeats so ICP can monitor and manage it.

## Prerequisites

- ICP server running and reachable on port **9445**
- MI distribution installed

## 1. Generate a Secret

Sign in to the ICP console and generate a secret. There are two places to do this;
choose whichever matches your workflow.

### Option A — Organization Level

Best when you want to register a runtime before assigning it to a specific component,
or when the component does not exist in ICP yet.

1. Navigate to **Runtimes** in the sidebar.
2. Find the target environment card (e.g. *dev*) and click **Add Runtime**.
3. Click **Generate Secret**.
4. Switch to the **MI** tab. Copy the `deployment.toml` snippet shown.

> The secret is displayed only once. Copy it before closing the dialog.

### Option B — Project / Component Level

Best when the component already exists in ICP. The generated snippet has `project`
and `integration` pre-filled and the secret is scoped to that component.

1. Navigate to the component: **Projects → \<project\> → Components → \<component\>**.
2. On the component overview, find the target environment card (e.g. *dev*) and click **Add Runtime**.
   Alternatively, click **Runtimes** in the sidebar, find the environment card, and click **Add Runtime**.
3. Click **Generate Secret**.
4. The dialog shows a `deployment.toml` snippet with the secret pre-filled. Copy it.

## 2. Configure the MI Runtime

Open `<MI_HOME>/conf/deployment.toml` and append the configuration block from step 1,
replacing the placeholder values:

```toml
[icp_config]
enabled     = true
environment = "dev"
project     = "my-project"
integration = "my-integration"
runtime     = "mi-node-1"
secret      = "<generated secret>"
icp_url     = "https://<icp-host>:9445"
ssl_verify  = false   # non-production only
```

### Field Reference

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `enabled` | yes | — | Must be `true` to activate ICP connectivity |
| `environment` | yes | — | Environment **handle** (must match an ICP environment) |
| `project` | yes | — | Project handle in ICP |
| `integration` | yes | — | Component handle in ICP |
| `runtime` | no | auto-generated UUID | Unique identifier for this MI instance |
| `secret` | yes | — | Secret from step 1 (`<key-id>.<key-material>`) |
| `icp_url` | no | `https://localhost:9445` | ICP runtime listener endpoint |
| `ssl_verify` | no | `true` | Set to `false` for development with self-signed certificates |

### Optional Fields

| Field | Default | Description |
|-------|---------|-------------|
| `heartbeat_interval` | `10` | Seconds between heartbeats |
| `jwt_issuer` | `icp-runtime-jwt-issuer` | JWT issuer claim |
| `jwt_audience` | `icp-server` | JWT audience claim |
| `jwt_expiry_seconds` | `3600` | JWT token lifetime |
| `jwt_clock_skew_tolerance_ms` | `60000` | Clock skew tolerance in milliseconds |

## 3. Start MI

```bash
# Linux / macOS
./bin/micro-integrator.sh

# Windows
.\bin\micro-integrator.bat
```

On successful connection you will see:

```
INFO {ICPHeartBeatComponent} - Starting ICP heartbeat service. Interval: 10s
INFO {ICPHeartBeatComponent} - Full heartbeat acknowledged by ICP.
```

The runtime now appears under **Runtimes** in the ICP console with status **RUNNING**.

## Multiple MI Nodes

Each MI node needs a unique `runtime` value but can share the same `project`,
`integration`, `environment`, and `secret`. All nodes appear as separate runtimes
under the same component in ICP.

```toml
# Node 1
[icp_config]
runtime = "mi-node-1"

# Node 2
[icp_config]
runtime = "mi-node-2"
```

If `runtime` is omitted, MI auto-generates a UUID. This is convenient for ephemeral
instances but means the runtime ID changes on every restart.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Full heartbeat rejected` | Wrong or revoked secret | Generate a new secret in the console |
| Runtime does not appear in ICP | `environment` doesn't match an ICP environment **handle** | Use the handle (e.g. `dev`), not the display name |
| Runtime does not appear in ICP | Secret copied incorrectly | Ensure both key ID and key material are included (separated by a dot) |
| Runtime does not appear in ICP | Network issue | Verify `icp_url` is reachable and port 9445 is open |
| SSL errors in MI logs | Self-signed ICP certificate | Set `ssl_verify = false` (dev only) or add the ICP cert to MI's truststore |
| Secret was lost | Secrets are shown only once | Generate a new secret and update `deployment.toml` |
