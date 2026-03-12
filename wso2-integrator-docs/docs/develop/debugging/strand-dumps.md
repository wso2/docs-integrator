---
sidebar_position: 4
title: Strand Dump Analysis
description: Analyze strand dumps to diagnose concurrency, deadlock, and blocking issues in Ballerina services.
---

# Strand Dump Analysis

Diagnose concurrency issues in your Ballerina integrations by capturing and analyzing strand dumps. A strand dump shows the state of all active strands (Ballerina's lightweight execution units) at a point in time, helping you identify deadlocks, blocked operations, and concurrency bottlenecks.

## Understanding Strands

Ballerina uses strands as its concurrency primitive. A strand is a lightweight execution unit (similar to a green thread or coroutine) that runs on the Ballerina scheduler. Multiple strands can run concurrently, and the scheduler multiplexes them onto OS threads.

```ballerina
import ballerina/http;
import ballerina/io;

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

## Capturing a Strand Dump

### Using a Signal (Linux/macOS)

Send a `SIGUSR1` signal to the running Ballerina process to trigger a strand dump.

```bash
# Find the Ballerina process ID
ps aux | grep ballerina

# Send SIGUSR1 to capture a strand dump
kill -SIGUSR1 <PID>

# The strand dump is printed to stderr
```

### Using the Admin API

Ballerina provides a built-in admin endpoint for runtime diagnostics when enabled.

```bash
# Start the service with the admin API enabled
bal run --experimental --admin-port 9190

# Request a strand dump via HTTP
curl http://localhost:9190/strand-dump
```

### In Docker/Kubernetes

```bash
# Docker: send signal to the container process
docker kill --signal=SIGUSR1 <container_id>
docker logs <container_id> 2>&1 | grep -A 100 "strand dump"

# Kubernetes: exec into the pod and send signal
kubectl exec <pod_name> -- kill -SIGUSR1 1
kubectl logs <pod_name> | grep -A 100 "strand dump"
```

## Reading a Strand Dump

A strand dump lists every active strand with its current state and call stack.

```
=== Strand Dump ===
Total strands: 5

Strand [id=1, name=main, state=WAITING]
    at mypackage:service_listener.bal:15
    waiting on: http:Listener.start

Strand [id=2, name=http-worker-1, state=RUNNING]
    at mypackage:order_service.bal:28 (processOrder)
    at mypackage:order_service.bal:35 (validateOrder)

Strand [id=3, name=http-worker-2, state=BLOCKED]
    at mypackage:order_service.bal:42 (getOrdersFromDB)
    waiting on: database connection from pool
    blocked for: 15.2s

Strand [id=4, name=async-notification, state=WAITING]
    at mypackage:notifications.bal:12 (sendEmail)
    waiting on: SMTP response

Strand [id=5, name=http-worker-3, state=BLOCKED]
    at mypackage:order_service.bal:42 (getOrdersFromDB)
    waiting on: database connection from pool
    blocked for: 14.8s
```

### Strand States

| State | Meaning |
|-------|---------|
| **RUNNING** | Actively executing code |
| **WAITING** | Paused on an async I/O operation (normal) |
| **BLOCKED** | Waiting on a resource that is not available (potential issue) |
| **PAUSED** | Suspended by the scheduler |

## Diagnosing Common Issues

### Deadlocks

A deadlock occurs when two or more strands are waiting on each other. Look for circular dependencies in the strand dump.

```
Strand [id=10, state=BLOCKED]
    at lock_a.bal:5
    holding: lockB
    waiting on: lockA

Strand [id=11, state=BLOCKED]
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

### Connection Pool Exhaustion

When many strands are blocked waiting for database or HTTP connections, the pool may be exhausted.

```
Strand [id=20, state=BLOCKED] waiting on: database connection from pool (15.2s)
Strand [id=21, state=BLOCKED] waiting on: database connection from pool (14.8s)
Strand [id=22, state=BLOCKED] waiting on: database connection from pool (12.1s)
Strand [id=23, state=BLOCKED] waiting on: database connection from pool (11.5s)
Strand [id=24, state=BLOCKED] waiting on: database connection from pool (10.2s)
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

### Stuck Strands

A strand blocked for an unusually long time may indicate a slow external call or network issue.

```
Strand [id=30, state=BLOCKED]
    at mypackage:payment.bal:55 (chargeCard)
    waiting on: HTTP response from payments.example.com
    blocked for: 120.5s
```

**Fix:** Add timeouts to external calls.

```ballerina
import ballerina/http;

http:Client paymentClient = check new ("https://payments.example.com",
    timeout = 30  // Fail after 30 seconds instead of waiting indefinitely
);
```

### Worker Channel Deadlocks

When using Ballerina workers, channel sends/receives can deadlock if not balanced.

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

## Automated Strand Monitoring

Set up periodic strand dump capture for proactive monitoring.

```bash
#!/bin/bash
# Capture a strand dump every 60 seconds for diagnostics
PID=$(pgrep -f "ballerina")
while true; do
    echo "=== $(date) ===" >> strand-dumps.log
    kill -SIGUSR1 $PID
    sleep 60
done
```

## Analyzing Strand Dumps Programmatically

Parse strand dumps to detect patterns and trigger alerts.

```ballerina
import ballerina/io;
import ballerina/regex;

// Parse strand dump output to count blocked strands
public function analyzeStrandDump(string dump) returns map<int> {
    string[] lines = regex:split(dump, "\n");
    map<int> stateCounts = {};

    foreach string line in lines {
        if line.includes("state=BLOCKED") {
            stateCounts["blocked"] = (stateCounts["blocked"] ?: 0) + 1;
        } else if line.includes("state=WAITING") {
            stateCounts["waiting"] = (stateCounts["waiting"] ?: 0) + 1;
        } else if line.includes("state=RUNNING") {
            stateCounts["running"] = (stateCounts["running"] ?: 0) + 1;
        }
    }

    return stateCounts;
}
```

## Best Practices

- **Capture multiple dumps** -- take 2-3 dumps a few seconds apart to distinguish transient waits from genuine blocks
- **Look for patterns** -- a single blocked strand is normal; many strands blocked on the same resource indicates a bottleneck
- **Set timeouts on all external calls** -- prevent strands from blocking indefinitely
- **Size connection pools appropriately** -- match pool size to expected concurrency
- **Monitor strand counts** in production to detect trends before they become outages
- **Use consistent lock ordering** to prevent deadlocks

## What's Next

- [Performance Profiling](performance-profiling.md) -- Profile execution time to find bottlenecks
- [Editor Debugging](editor-debugging.md) -- Step through concurrency issues in the debugger
- [Remote Debugging](remote-debugging.md) -- Attach to remote services for live diagnosis
