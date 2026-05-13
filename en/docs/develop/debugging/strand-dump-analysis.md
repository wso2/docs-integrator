---
sidebar_position: 7
title: Strand Dump Analysis
description: Capture and analyze strand dumps to diagnose concurrency, deadlock, and blocking issues in Ballerina services.
---

# Strand Dump Analysis

Diagnose concurrency issues in your integrations by capturing and analyzing strand dumps. A strand dump shows the status of all currently running strands and strand groups at a point in time, helping you troubleshoot runtime errors, find data races, race conditions, livelocks, and deadlocks, and inspect strand and strand group status.

:::note
The strand dump tool uses the `SIGTRAP` POSIX signal and is **not available on Windows**.
:::

## Understanding strands

Ballerina uses strands as its concurrency primitive. A strand is a lightweight execution unit (similar to a green thread or coroutine) that runs on the Ballerina scheduler. Multiple strands can run concurrently, and the scheduler multiplexes them onto OS threads. Strands are organized into strand groups.

```ballerina
import ballerina/http;
import ballerina/log;

// Each incoming HTTP request runs on its own strand
service /api on new http:Listener(9090) {

    resource function get orders() returns json|error {
        // This strand may pause while waiting for the DB response
        json orders = check getOrdersFromDB();
        return orders;
    }

    resource function post orders(json payload) returns json|error {
        // This strand runs concurrently with GET requests
        json result = check createOrder(payload);

        // Start a new named strand for async notification
        _ = start sendNotification(result);

        return result;
    }
}
```

## Capturing a strand dump

### Step 1: Find the process ID

Use the `jps` tool to find the process ID (PID) of the running Ballerina program:

```bash
jps
```

Look for:
- `$_init` — for a running service
- `BTestMain` — for a test run (`bal test`)

### Step 2: Send the SIGTRAP signal

```bash
kill -SIGTRAP <PID>
# or equivalently:
kill -5 <PID>
```

The strand dump is printed to the **standard output** of the program in text format.

:::tip
Redirect output to a file if you need to capture the strand dump for later analysis:
```bash
bal run . > output.log 2>&1
```
:::

### In Docker/Kubernetes

```bash
# Docker: send signal to the container process
docker kill --signal=SIGTRAP <container_id>
docker logs <container_id> 2>&1 | grep -A 100 "strand dump"

# Kubernetes: exec into the pod and send signal
kubectl exec <pod_name> -- kill -SIGTRAP 1
kubectl logs <pod_name> | grep -A 100 "strand dump"
```

## Reading a strand dump

A strand dump begins with a header showing the overall state, followed by detailed information for each strand group and strand.

### Dump header

The header provides a summary:

```
=== Ballerina Strand Dump [2024-03-15 10:30:00] ===
Total strand groups: 4
Total strands: 8
Active strand groups: 2
Active strands: 5
```

### Strand group states

Each strand group has one of the following states:

| State | Meaning |
|-------|---------|
| **RUNNABLE** | Strand group is ready to run or is currently running |
| **QUEUED** | Strand group execution is blocked, completed, or it comprises new strands that are not yet scheduled to run |

### Strand states

Each individual strand has one of the following states:

| State | Meaning |
|-------|---------|
| **RUNNABLE** | Strand is ready to run or is currently running |
| **WAITING** | Strand is blocked due to a `wait` action |
| **WAITING FOR LOCK** | Strand is waiting to acquire a `lock` |
| **BLOCKED** | Strand is blocked by sleep, an external call, or other reasons |
| **BLOCKED ON WORKER MESSAGE SEND** | Strand is blocked on a synchronous worker message send |
| **BLOCKED ON WORKER MESSAGE RECEIVE** | Strand is blocked waiting to receive a worker message |
| **BLOCKED ON WORKER MESSAGE FLUSH** | Strand is blocked on a worker message flush operation |
| **DONE** | Strand has completed execution |

### Strand entry details

Each strand entry shows:

```
Strand [id=3, name=http-worker-2, state=BLOCKED]
    module: myorg/mypackage:0.1.0
    parent: strand 1
    at mypackage:order_service.bal:42 (getOrdersFromDB)
    waiting on: database connection from pool
```

- **id** — unique strand identifier
- **name** — optional strand name
- **state** — current strand state (see table above)
- **module** — the module that initiated the strand
- **parent** — the parent strand ID
- **Stack trace** — shows where the strand is currently executing or blocked

### Example strand dump

```
=== Ballerina Strand Dump [2024-03-15 10:30:00] ===
Total strand groups: 3
Total strands: 5
Active strand groups: 2
Active strands: 4

Strand Group [id=1, state=RUNNABLE, strands=2]
  Strand [id=1, name=main, state=WAITING]
      at mypackage:service_listener.bal:15
      waiting on: http:Listener.start

  Strand [id=2, name=http-worker-1, state=RUNNABLE]
      at mypackage:order_service.bal:28 (processOrder)
      at mypackage:order_service.bal:35 (validateOrder)

Strand Group [id=2, state=QUEUED, strands=2]
  Strand [id=3, name=http-worker-2, state=BLOCKED]
      at mypackage:order_service.bal:42 (getOrdersFromDB)
      waiting on: database connection from pool

  Strand [id=4, name=http-worker-3, state=BLOCKED]
      at mypackage:order_service.bal:42 (getOrdersFromDB)
      waiting on: database connection from pool

Strand Group [id=3, state=QUEUED, strands=1]
  Strand [id=5, name=async-notification, state=DONE]
```

## Diagnosing common issues

### Deadlocks

A deadlock occurs when two or more strands are waiting on each other. Look for multiple strands in `WAITING FOR LOCK` state with circular dependencies.

```
Strand [id=10, state=WAITING FOR LOCK]
    at lock_a.bal:5
    holding: lockB
    waiting on: lockA

Strand [id=11, state=WAITING FOR LOCK]
    at lock_b.bal:8
    holding: lockA
    waiting on: lockB
```

**Fix:** Ensure locks are always acquired in the same order across all strands.

```ballerina
// Bad: different lock ordering causes deadlock risk
// Strand 1: lock A -> lock B
// Strand 2: lock B -> lock A

// Good: consistent lock ordering
lock {
    // Always acquire locks in alphabetical/consistent order
    // Access resourceA first, then resourceB
}
```

### Worker channel deadlocks

When using Ballerina workers, channel sends/receives can deadlock if not balanced. Look for strands in `BLOCKED ON WORKER MESSAGE SEND` or `BLOCKED ON WORKER MESSAGE RECEIVE` state.

```ballerina
// Bad: potential deadlock if worker A sends before worker B is ready
worker A {
    int x = 5;
    x -> B;           // Send to B
    int y = <- B;     // Receive from B (deadlock if B never sends)
}

worker B {
    int y = <- A;     // Receive from A
    y + 1 -> A;       // Send back to A
}
```

**Fix:** Ensure every worker send (`->`) has a matching receive (`<-`) and that send/receive pairs are balanced.

### Connection pool exhaustion

When many strands are `BLOCKED` waiting for database or HTTP connections, the pool may be exhausted.

```
Strand [id=20, state=BLOCKED] waiting on: database connection from pool
Strand [id=21, state=BLOCKED] waiting on: database connection from pool
Strand [id=22, state=BLOCKED] waiting on: database connection from pool
Strand [id=23, state=BLOCKED] waiting on: database connection from pool
Strand [id=24, state=BLOCKED] waiting on: database connection from pool
```

**Fix:** Increase the connection pool size or optimize slow queries.

```ballerina
import ballerinax/postgresql;

// Increase pool size for high-concurrency services
postgresql:Client dbClient = check new (
    host = "localhost",
    database = "orders",
    connectionPool = {
        maxOpenConnections: 25,     // Default is often 15
        maxConnectionLifeTime: 300,
        minIdleConnections: 5
    }
);
```

### Stuck strands

A strand in `BLOCKED` state for an unusually long time may indicate a slow external call or network issue.

**Fix:** Add timeouts to all external calls to prevent strands from blocking indefinitely.

```ballerina
import ballerina/http;

http:Client paymentClient = check new ("https://payments.example.com",
    timeout = 30  // Fail after 30 seconds instead of waiting indefinitely
);
```

### Program hangs without deadlock

If the strand dump shows strands in `BLOCKED` or `WAITING` state but no deadlock pattern (no circular lock dependencies):

1. Check the file and line numbers — these strands are typically waiting on an external call (HTTP, database, etc.).
2. Verify the upstream service or database is responding.
3. Add timeouts to all external calls.

## Best practices

- **Capture multiple dumps** — take 2-3 dumps a few seconds apart to distinguish transient waits from genuine blocks
- **Look for patterns** — a single blocked strand is normal; many strands blocked on the same resource indicates a bottleneck
- **Set timeouts on all external calls** — prevent strands from blocking indefinitely
- **Size connection pools appropriately** — match pool size to expected concurrency
- **Monitor strand counts** in production to detect trends before they become outages
- **Use consistent lock ordering** to prevent deadlocks

## What's next

- [Performance Profiling](performance-profiling.md) — Profile execution time to find bottlenecks
- [Editor Debugging](editor.md) — Step through concurrency issues in the debugger
- [Remote Debugging](remote.md) — Attach to remote services for live diagnosis
