---
title: High Availability and Coordination
description: Coordinate multiple FTP/SFTP listener instances so that only one actively polls while others act as warm standby nodes, preventing duplicate file processing.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# High Availability and Coordination

When you deploy multiple instances of an FTP/SFTP listener (for example, in a Kubernetes cluster), each instance polls the same remote directory independently. Without coordination, every instance detects the same files and processes them — causing duplicate processing, race conditions, and inconsistent state.

Distributed coordination ensures that **only one instance actively polls** at any time. The other instances act as warm standby nodes and automatically take over if the active node fails.

## How it works

The coordination mechanism uses a **database-backed leader election** pattern:

1. **Leader election** — All listener instances in the same coordination group register with a shared database. One instance is elected as the active node.
2. **Heartbeat** — The active node updates a heartbeat record in the database at a regular interval, proving it is alive.
3. **Liveness check** — Standby nodes periodically check the active node's heartbeat. If the heartbeat is stale (not updated within the liveness check interval), the active node is considered failed.
4. **Failover** — A standby node is promoted to active and begins polling. No manual intervention is required.
5. **Polling behaviour** — Only the active node executes polling. Standby nodes skip polling cycles entirely, consuming no FTP server resources.

```text
┌──────────────┐     heartbeat      ┌──────────────────┐
│  Node A      │ ────────────────── │                  │
│  (active)    │                    │  Coordination DB │
│  polls FTP   │                    │  (MySQL/PostgreSQL)
└──────────────┘                    │                  │
                                    │                  │
┌──────────────┐     liveness check │                  │
│  Node B      │ ────────────────── │                  │
│  (standby)   │                    └──────────────────┘
│  skips polls │
└──────────────┘
        │
        │  Node A heartbeat goes stale
        ▼
┌──────────────┐
│  Node B      │
│  (active)    │  ← promoted automatically
│  polls FTP   │
└──────────────┘
```

## Enabling coordination

Add a `coordination` record to the listener configuration. Each node in the cluster must have a unique `memberId`, and all nodes that coordinate together must share the same `coordinationGroup`.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

In the **FTP Integration Configuration** panel, expand **Advanced Configurations** and enable **Coordination**. Configure the database connection, member ID, and coordination group name.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/ftp;

configurable string memberId = ?;  // unique per deployment node

listener ftp:Listener ftpListener = new ({
    host: "ftp.example.com",
    port: 21,
    auth: {
        credentials: {username: "user", password: "pass"}
    },
    path: "/incoming",
    pollingInterval: 30,
    coordination: {
        databaseConfig: {
            host: "mysql.example.com",
            user: "coordinator",
            password: "secret",
            database: "ftp_coordination"
        },
        memberId: memberId,
        coordinationGroup: "incoming-files-group"
    }
});

service on ftpListener {
    remote function onFileText(string content, ftp:FileInfo fileInfo) returns error? {
        // Only one node in the cluster executes this
    }
}
```

</TabItem>
</Tabs>

### CoordinationConfig fields

| Field | Type | Default | Description |
|---|---|---|---|
| `databaseConfig` | `task:DatabaseConfig` | — | Connection details for the coordination database. Accepts `MysqlConfig` or `PostgresqlConfig`. Required. |
| `memberId` | `string` | — | Unique identifier for this node. Must be distinct across all nodes in the coordination group. Required. |
| `coordinationGroup` | `string` | — | Name of the coordination group. All listeners with the same group coordinate together. Use a unique name per logical listener. Required. |
| `livenessCheckInterval` | `int` | `30` | Interval in seconds for standby nodes to check the active node's heartbeat. |
| `heartbeatFrequency` | `int` | `1` | Interval in seconds for the active node to update its heartbeat record. |

### Database configuration

The coordination database stores leader election state and heartbeat records. The schema is managed automatically — you only need to provide a database and credentials.

**MySQL:**

```ballerina
coordination: {
    databaseConfig: {
        host: "mysql.example.com",
        port: 3306,
        user: "coordinator",
        password: "secret",
        database: "ftp_coordination"
    },
    memberId: "node-1",
    coordinationGroup: "order-files"
}
```

**PostgreSQL:**

```ballerina
coordination: {
    databaseConfig: {
        host: "postgres.example.com",
        port: 5432,
        user: "coordinator",
        password: "secret",
        database: "ftp_coordination"
    },
    memberId: "node-1",
    coordinationGroup: "order-files"
}
```

### Making memberId unique per node

Use a configurable value and set it per deployment via `Config.toml` or environment variables:

```ballerina
configurable string memberId = ?;
```

**Config.toml (per node):**

```toml
memberId = "node-1"   # "node-2" on the second instance, etc.
```

**Environment variable:**

```bash
BAL_CONFIG_VAR_MEMBER_ID=node-1 bal run
```

In Kubernetes, use the pod name or a unique identifier from the downward API.

## Design considerations

### Active-passive only

Coordination uses an **active-passive** (warm standby) model. Only one node polls at a time. Active-active coordination (multiple nodes processing different files simultaneously) is not supported, as it requires per-file locking that may not be compatible with all FTP server configurations.

### Coordination group isolation

Listeners with different `coordinationGroup` values coordinate independently. This lets you run separate groups for different directories or file types on the same cluster, each with its own active/standby election.

### Clock synchronization

Heartbeat-based coordination assumes reasonably synchronized clocks across nodes. Significant clock skew may cause premature failover or delayed detection. Use NTP or a similar time synchronization service in your deployment.

### Database availability

If the coordination database is temporarily unavailable:

- The **active node** continues polling (it already holds the lease).
- **Standby nodes** cannot check liveness or participate in failover until the database is reachable again.
- Ensure the coordination database has its own availability guarantees (replicas, backups).

## What's next

- [FTP / SFTP](ftp-sftp.md) — service configuration, authentication, and file handlers
- [Resiliency](resiliency.md) — automatic retry and circuit breaker for FTP client operations
- [Scaling and high availability](../../../deploy-operate/deploy/scaling-ha.md) — deployment-level scaling and HA strategies
