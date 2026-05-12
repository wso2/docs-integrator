---
title: Performance Profiling
---

# Performance Profiling

Identify and eliminate performance bottlenecks in your integrations using the Ballerina profiler. The profiler monitors runtime operations and function calls, then generates an interactive flame graph that shows where execution time is spent — so you can optimize what actually matters.

The profiler is an experimental feature with limited functionality. Commands associated with the tool might change in future releases.

Profiling is a high-powered activity with a heavy overhead and can slow down your application. Do not profile in production environments.

## Running the profiler

Run the `bal profile` command from the root directory of your integration project:

```bash
bal profile
```

The profiler executes the following stages:

1. **Initializing** — sets up the profiling session
2. **Copying executable** — prepares the program for instrumentation
3. **Performing analysis** — analyzes the program structure
4. **Instrumenting functions** — instruments all functions (reports module and function counts)
5. **Running executable** — runs the instrumented program
6. **Generating output** — produces the flame graph report (displays total execution time)

When the program completes (or you stop it with `Ctrl+C` for services), the profiler generates an HTML report at:

```
target/bin/ProfilerOutput.html
```

Open this file in any web browser to view the results.

## Profiling a service

For HTTP services and other long-running integrations:

1. Run `bal profile` from the project root — the service starts with profiling enabled.
2. Send requests to your service endpoints using `curl`, the **Try It** tool, or any HTTP client.
3. Press `Ctrl+C` to stop the profiler and generate the output.
4. Open `target/bin/ProfilerOutput.html` to view the flame graph.

```bash
# Terminal 1: Start the profiler
bal profile

# Terminal 2: Send test requests to the service
curl http://localhost:9090/api/orders
curl -X POST http://localhost:9090/api/orders \
  -H "Content-Type: application/json" \
  -d '{"product": "Widget", "quantity": 5}'

# Terminal 1: Stop the profiler (Ctrl+C) and open the report
open target/bin/ProfilerOutput.html
```

## Reading the flame graph

The profiler output is an interactive flame graph that visualizes function call stacks and execution times.

![Artifacts panel showing HTTP Service under Integration as API](/img/develop/debugging/profile/report.png)

### What the flame graph shows

| Element | Description |
|---------|-------------|
| **Each bar** | Represents a function call |
| **Bar width** | Proportional to the time spent in that function |
| **Vertical stack** | Shows the call hierarchy (caller above, callee below) |
| **Execution time** | Duration in milliseconds for each function |
| **Percentage** | Proportion of total execution time |

### Interacting with the flame graph

- **Search** — locate specific functions within the visualization
- **Zoom** — click any function bar to zoom into that section and examine it in detail
- **Reset** — return to the full view after zooming

### Interpreting results

- **Wide bars at the bottom** — functions that consume the most total time (including their callees)
- **Wide bars at the top** — functions with high self-time (the actual bottlenecks)
- **Narrow, deep stacks** — deeply nested call chains that may indicate unnecessary indirection

## Connection pool tuning

Under high concurrency, the default connection pool settings may not be sufficient. Exhausted pools cause requests to queue up and eventually time out.

### HTTP connection pool

If you see `{ballerina/http}MaximumWaitTimeExceededError` or requests timing out under load, tune the HTTP client pool:

```ballerina
http:Client apiClient = check new ("http://backend.internal", {
    poolConfig: {
        maxActiveConnections: 200,   // default: -1 (unlimited)
        maxIdleConnections: 50,      // default: 100
        waitTime: 10                 // seconds to wait for an available connection
    },
    timeout: 30                      // per-request timeout in seconds
});
```

Increasing the pool size only helps if the **upstream can handle more connections**. If the upstream is the bottleneck, more connections will make it worse.

### SQL connection pool

If database queries hang under load or you see connection timeout errors, tune the SQL pool:

```ballerina
import ballerinax/postgresql;

postgresql:Client dbClient = check new (
    host = "localhost",
    database = "mydb",
    connectionPool = {
        maxOpenConnections: 25,          // default: 15
        maxConnectionLifeTime: 600.0,    // seconds; default: 1800
        minIdleConnections: 5            // default: same as maxOpenConnections
    }
);
```

| Setting | Default | When to change |
|---------|---------|----------------|
| `maxOpenConnections` | 15 | Increase for high-concurrency services; never exceed the database's `max_connections` |
| `maxConnectionLifeTime` | 1800 (30 min) | Decrease to refresh stale connections faster |
| `minIdleConnections` | Same as max | Decrease for bursty traffic to free idle DB connections |
| `connectionTimeout` | 30 seconds | Decrease to fail fast when the pool is exhausted |

## JVM memory tuning

Ballerina runs on the JVM. If your integration runs out of memory (`OutOfMemoryError`), increase the JVM heap size:

```bash
export JAVA_OPTS="-Xmx2g -Xms512m"
bal run .
```

To capture a heap dump automatically when an OOM occurs (useful for diagnosis):

```bash
export JAVA_OPTS="-Xmx2g -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/"
bal run .
```

Analyze the heap dump with tools like VisualVM or Eclipse MAT to identify memory leaks.

## Optimization checklist

Use this checklist when profiling reveals performance issues:

- [ ] **Parallelize independent external calls** using workers or `fork/join`
- [ ] **Add connection pooling** for database and HTTP clients
- [ ] **Cache frequently accessed data** that does not change often
- [ ] **Use typed records** instead of repeated JSON parsing
- [ ] **Minimize serialization** — convert once, work with typed data throughout
- [ ] **Use query expressions** instead of manual loops for collection processing
- [ ] **Set appropriate timeouts** to prevent slow calls from blocking the system
- [ ] **Use streaming** for large payloads instead of loading everything into memory

## Best practices

- **Profile before optimizing** — measure first to avoid optimizing the wrong thing
- **Profile under realistic load** — single-request profiles miss concurrency bottlenecks
- **Focus on the critical path** — optimize the operations that contribute most to total latency
- **Compare before and after** — run the profiler again after changes to verify improvement
- **Monitor in production** — use observability metrics to track performance trends over time

## What's next

- [Strand Dump Analysis](strand-dump-analysis.md) — Diagnose concurrency issues
- [Editor Debugging](editor.md) — Step through slow code paths
