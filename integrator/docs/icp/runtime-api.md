---
title: ICP Runtime API
---

# ICP Runtime API

The Integration Control Plane (ICP) exposes a dedicated REST service for runtime agents (Micro Integrator and Ballerina Integrator) to register themselves and continuously report their state. The ICP uses the data from this service to drive reconciliation — pushing control commands back to runtimes to align their state with the desired configuration.

This API is consumed by runtime agents, not by end users. It is separate from the [Management API](management-api.md) (GraphQL) and the [Authentication API](auth-api.md) (user-facing REST).

## Base URL

```bash
https://<icp-host>:9445/icp
```

The default runtime listener port is `9445`.

---

## Authentication

All requests must include a signed JWT in the `Authorization` header:

```bash
Authorization: Bearer <runtime-jwt>
```

The token is validated using **kid-based lookup**:

1. The JWT header must contain a `kid` claim identifying the org secret key.
2. The ICP looks up the HMAC secret associated with that `kid`.
3. The JWT is validated against that secret with:
   - **Issuer**: `icp-runtime-jwt-issuer`
   - **Audience**: `icp-server`
   - **Required scope claim**: `runtime_agent`
   - **Clock skew tolerance**: 10 seconds

The ICP does not issue runtime tokens. The runtime signs its own token with an org secret, which you generate in the ICP console or with the `createOrgSecret` mutation of the Management API. The secret has the form `<keyId>.<keyMaterial>`. Sign the JWT with HS256, using `keyMaterial` as the HMAC key, and set:

- `kid` in the JWT header to `keyId`
- `iss` to `icp-runtime-jwt-issuer`, `aud` to `icp-server`, and `scope` to `runtime_agent` in the payload

The ICP runtime bridge does this for you from the `secret` in its configuration. A key can be unbound (not yet associated with a project/component) or bound.

---

## Endpoints

### `POST /icp/heartbeat`

Submits a full heartbeat from a runtime. This is the primary registration and state-reporting mechanism. On the first heartbeat from an unbound key, the ICP auto-provisions the project and component and binds the key to them.

After processing the heartbeat, the ICP runs reconciliation and returns any pending control commands for the runtime to execute.

**Request body:**

```json
{
  "heartbeatVersion": "v1.0",
  "runtimeId": "3f2b8c1e-6d4a-4e9b-9a71-0c5d2e8f4b10",
  "runtimeType": "MI",
  "status": "RUNNING",
  "environment": "dev",
  "project": "MyProject",
  "component": "OrderService",
  "version": "1.0.0",
  "runtimeHostname": "mi-host.example.com",
  "runtimePort": "9164",
  "nodeInfo": {
    "platformName": "wso2-mi",
    "platformVersion": "4.3.0",
    "osName": "Linux",
    "osVersion": "5.15.0",
    "osArch": "amd64",
    "javaVersion": "17.0.9",
    "javaVendor": "Eclipse Adoptium",
    "totalMemory": 2147483648,
    "freeMemory": 1073741824,
    "maxMemory": 2147483648,
    "usedMemory": 1073741824
  },
  "artifacts": {
    "listeners": [],
    "services": [],
    "apis": [{ "name": "OrderAPI", "context": "/orders", "state": "enabled" }],
    "proxyServices": [],
    "sequences": [],
    "tasks": [],
    "templates": [],
    "messageStores": [],
    "messageProcessors": [],
    "localEntries": [],
    "dataServices": [],
    "carbonApps": [],
    "dataSources": [],
    "connectors": [],
    "registryResources": [],
    "endpoints": [],
    "inboundEndpoints": []
  },
  "runtimeHash": "sha256-abc123...",
  "timestamp": [1746093600, 0]
}
```

**Request fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heartbeatVersion` | string | No | Heartbeat format version. Default: `"v1.0"` |
| `runtimeId` | string | Yes | Unique identifier for this runtime instance, as a 36-character UUID |
| `runtimeType` | string | Yes | `"MI"` or `"BI"` |
| `status` | string | Yes | Current runtime status (`"RUNNING"`). The ICP marks the runtime `OFFLINE` when its heartbeats stop |
| `environment` | string | Yes | Handler of the environment the runtime belongs to. It must match the environment of the key |
| `project` | string | Yes | Project name. For an unbound key, it is converted to a handler (for example, `MyProject` becomes `myproject`) and the project is created if it does not exist. For a bound key, the bound project is used |
| `component` | string | Yes | Component/integration name, handled the same way as `project` |
| `version` | string | No | Runtime version |
| `runtimeHostname` | string | No | Hostname of the MI management API |
| `runtimePort` | string | No | Port of the MI management API |
| `nodeInfo` | object | Yes | Host system information (see below) |
| `artifacts` | object | Yes | All deployed artifacts grouped by type (see below) |
| `runtimeHash` | string | Yes | Hash of the full runtime state, used for delta comparison |
| `timestamp` | array | Yes | UTC time of the heartbeat as `[epochSeconds, fractionOfSecond]`, for example `[1746093600, 0]` |
| `logLevels` | object | No | Current log levels as a `{ "loggerName": "LEVEL" }` map (Ballerina runtimes) |

**`nodeInfo` fields:**

| Field | Type | Description |
|-------|------|-------------|
| `platformName` | string | Platform identifier (default: `"wso2-mi"`) |
| `platformVersion` | string | Platform/product version |
| `platformHome` | string | Installation directory |
| `ballerinaHome` | string | Ballerina home directory (default profile runtimes) |
| `osName` | string | Operating system name |
| `osVersion` | string | OS version |
| `osArch` | string | CPU architecture |
| `javaVersion` | string | JVM version |
| `javaVendor` | string | JVM vendor |
| `carbonHome` | string | Carbon home directory (MI runtimes) |
| `totalMemory` | integer | Total JVM heap memory in bytes |
| `freeMemory` | integer | Free JVM heap memory in bytes |
| `maxMemory` | integer | Maximum JVM heap memory in bytes |
| `usedMemory` | integer | Used JVM heap memory in bytes |

**`artifacts` fields:**

| Field | Type | Description |
|-------|------|-------------|
| `listeners` | array | Active HTTP/HTTPS listeners (default profile) |
| `services` | array | Deployed Ballerina services (default profile) |
| `main` | object | Main Ballerina package info: `packageOrg`, `packageName`, `packageVersion` (default profile) |
| `apis` | array | REST APIs (MI) |
| `proxyServices` | array | Proxy services (MI) |
| `sequences` | array | Sequences (MI) |
| `tasks` | array | Scheduled tasks (MI) |
| `templates` | array | Templates (MI) |
| `messageStores` | array | Message stores (MI) |
| `messageProcessors` | array | Message processors (MI) |
| `localEntries` | array | Local entries (MI) |
| `dataServices` | array | Data services (MI) |
| `carbonApps` | array | Carbon applications (MI) |
| `dataSources` | array | Data sources (MI) |
| `connectors` | array | Connectors (MI) |
| `registryResources` | array | Registry resources (MI) |
| `endpoints` | array | Named endpoints (MI) |
| `inboundEndpoints` | array | Inbound endpoints (MI) |

Each artifact entry includes a `name` field and, optionally, a `state` field (`"enabled"` or `"disabled"`). Some types need more fields; for example, `apis` entries also need a `context`.

**Response `201 Created`:**

```json
{
  "acknowledged": true,
  "fullHeartbeatRequired": false,
  "commands": [
    {
      "commandId": "01f1c859-4034-1260-b29d-9b94be3f8329",
      "runtimeId": "3f2b8c1e-6d4a-4e9b-9a71-0c5d2e8f4b10",
      "targetArtifact": { "name": "httpListener", "package": "" },
      "action": "STOP",
      "issuedAt": [1792042108, 0.4409251],
      "status": "PENDING",
      "signature": "rzY2WwZEWSayUSGWFjy1OS3wUbXR1NElZvCykgyIoX4="
    }
  ],
  "errors": []
}
```

| Field | Type | Description |
|-------|------|-------------|
| `acknowledged` | boolean | `true` if the heartbeat was accepted and processed. If processing fails, the response is still `201` with `acknowledged: false` and the reason in `errors` |
| `fullHeartbeatRequired` | boolean | If `true`, the runtime must send a full heartbeat on the next cycle |
| `commands` | array | Control commands to execute (may be empty) |
| `errors` | array | Error messages if processing failed |

**`commands` entry fields:**

| Field | Type | Description |
|-------|------|-------------|
| `commandId` | string | Unique command identifier |
| `runtimeId` | string | Target runtime |
| `targetArtifact.name` | string | Name of the artifact to act on |
| `targetArtifact.package` | string | Package of the artifact, if any |
| `action` | string | `START`, `STOP`, `SET_LOGGER_LEVEL`, `WORKFLOW_MGMT`, or `MI_MGMT` |
| `issuedAt` | array | UTC time as `[epochSeconds, fractionOfSecond]` |
| `status` | string | `PENDING`, `SENT`, `ACKNOWLEDGED`, `FAILED`, or `COMPLETED` |
| `payload` | string | JSON-encoded additional data for the action (e.g., log level settings) |
| `signature` | string | Base64 HMAC-SHA256 signature of the command, keyed with the org secret, so the runtime can verify that the command came from the ICP |

**Error responses:**

| Status | Reason |
|--------|--------|
| `400 Bad Request` | Invalid heartbeat payload (for example, a `runtimeId` that is not a UUID or a `heartbeatVersion` other than `v1.0`), unknown `kid`, or invalid project/component name |
| `401 Unauthorized` | Missing or invalid JWT, or insufficient scope (requires `runtime_agent`) |
| `409 Conflict` | Environment or runtime type mismatch between the JWT key binding and the heartbeat |

---

### `POST /icp/deltaHeartbeat`

Submits a lightweight delta heartbeat containing only the runtime ID and a hash of its current state. If the hash matches the ICP's last known state, no full resync is needed, reducing overhead for stable runtimes.

If the key is unbound (not yet associated with a project/component), the ICP cannot resolve the context from a delta heartbeat alone. It returns `acknowledged: false` and `fullHeartbeatRequired: true` to instruct the runtime to send a full heartbeat.

**Request body:**

```json
{
  "heartbeatVersion": "v1.0",
  "runtimeId": "3f2b8c1e-6d4a-4e9b-9a71-0c5d2e8f4b10",
  "runtimeHash": "sha256-abc123...",
  "timestamp": [1746093900, 0]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `heartbeatVersion` | string | No | Heartbeat format version. Default: `"v1.0"` |
| `runtimeId` | string | Yes | Unique identifier for this runtime instance |
| `runtimeHash` | string | Yes | Hash of the full runtime state |
| `timestamp` | array | Yes | UTC time as `[epochSeconds, fractionOfSecond]` |

**Response `201 Created`:**

Same structure as the full heartbeat response. If `fullHeartbeatRequired` is `true`, the runtime must send a `POST /icp/heartbeat` on the next cycle.

```json
{
  "acknowledged": true,
  "fullHeartbeatRequired": false,
  "commands": [],
  "errors": []
}
```

**Error responses:**

| Status | Reason |
|--------|--------|
| `400 Bad Request` | Unknown `kid` |
| `401 Unauthorized` | Missing or invalid JWT |
| `409 Conflict` | Runtime type mismatch |
