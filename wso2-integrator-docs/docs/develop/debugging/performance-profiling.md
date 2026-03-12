---
sidebar_position: 5
title: Performance Profiling
description: Profile Ballerina integrations to identify performance bottlenecks and optimize execution time.
---

# Performance Profiling

Identify and eliminate performance bottlenecks in your integrations using the Ballerina profiler. Profiling reveals where execution time is spent -- whether in data transformations, external calls, serialization, or your own logic -- so you can optimize what actually matters.

## Profiling with the Ballerina Profiler

The Ballerina profiler instruments your code at runtime and generates a detailed execution profile.

### Running the Profiler

```bash
# Profile your integration
bal profile

# Profile with a specific entry point
bal profile --target-dir target/profile
```

The profiler starts your service and collects performance data while you send requests. When you stop the profiler (Ctrl+C), it generates a report.

### Generating a Flame Graph

The profiler output includes data for generating flame graphs, which visualize call stacks and time distribution.

```bash
# Run the profiler
bal profile

# Send test traffic to your service (in another terminal)
for i in {1..100}; do
    curl -s http://localhost:9090/api/orders > /dev/null
done

# Stop the profiler (Ctrl+C)
# Output: Profile data written to target/profile/
```

<!-- TODO: Screenshot of a flame graph showing hot paths -->

### Reading the Profile Report

The profile report shows:

| Metric | Description |
|--------|-------------|
| **Self time** | Time spent in the function itself (not in callees) |
| **Total time** | Time including all called functions |
| **Call count** | Number of times the function was invoked |
| **Avg time** | Average time per invocation |

## Identifying Common Bottlenecks

### Slow External Calls

External HTTP calls are often the biggest bottleneck in integrations.

```ballerina
import ballerina/http;
import ballerina/time;
import ballerina/log;

http:Client backendClient = check new ("https://api.example.com");

public function fetchAndEnrich(string id) returns json|error {
    time:Utc start = time:utcNow();

    // This call may dominate total execution time
    json rawData = check backendClient->/data/[id];

    time:Utc afterFetch = time:utcNow();
    log:printDebug("External call duration",
        ms = time:utcDiffInSeconds(start, afterFetch));

    // Transformation is usually fast
    json enriched = check enrichData(rawData);

    time:Utc afterEnrich = time:utcNow();
    log:printDebug("Enrichment duration",
        ms = time:utcDiffInSeconds(afterFetch, afterEnrich));

    return enriched;
}
```

**Optimization:** Parallelize independent external calls.

```ballerina
import ballerina/http;

http:Client userClient = check new ("https://users.example.com");
http:Client orderClient = check new ("https://orders.example.com");
http:Client inventoryClient = check new ("https://inventory.example.com");

public function aggregateData(string userId) returns json|error {
    // Sequential: ~900ms (300ms + 300ms + 300ms)
    // json user = check userClient->/users/[userId];
    // json orders = check orderClient->/orders?userId=[userId];
    // json inventory = check inventoryClient->/inventory;

    // Parallel: ~300ms (all three run concurrently)
    fork {
        worker userWorker returns json|error {
            return userClient->/users/[userId];
        }
        worker orderWorker returns json|error {
            return orderClient->/orders?userId = userId;
        }
        worker inventoryWorker returns json|error {
            return inventoryClient->/inventory;
        }
    }

    json user = check wait userWorker;
    json orders = check wait orderWorker;
    json inventory = check wait inventoryWorker;

    return {user, orders, inventory};
}
```

### Inefficient Data Transformations

Large data set transformations can be slow if not optimized.

```ballerina
// Slow: creates intermediate collections
public function slowTransform(json[] records) returns json[] {
    json[] result = [];
    foreach json rec in records {
        // Repeated JSON parsing in the loop
        json transformed = transformSingleRecord(rec);
        result.push(transformed);
    }
    return result;
}

// Fast: use query expressions and typed records
type InputRecord record {
    string id;
    string name;
    decimal value;
};

type OutputRecord record {|
    string id;
    string displayName;
    decimal adjustedValue;
|};

public function fastTransform(InputRecord[] records) returns OutputRecord[] {
    return from InputRecord r in records
        where r.value > 0
        select {
            id: r.id,
            displayName: r.name.toUpperAscii(),
            adjustedValue: r.value * 1.1
        };
}
```

### Serialization Overhead

Repeated JSON/XML serialization and deserialization adds up.

```ballerina
// Slow: serialize and deserialize multiple times
public function processPayload(json input) returns json|error {
    // Parse to record
    Order order = check input.fromJsonWithType();
    // ... modify ...
    // Serialize back to JSON
    json modified = order.toJson();
    // Parse again for validation
    Order validated = check modified.fromJsonWithType();
    return validated.toJson();
}

// Fast: work with typed records throughout
public function processPayloadFast(json input) returns Order|error {
    Order order = check input.fromJsonWithType();
    // Work with the typed record directly
    // Serialize only once when returning (framework handles it)
    return order;
}
```

## Manual Instrumentation

Add timing instrumentation to measure specific code sections.

```ballerina
import ballerina/time;
import ballerina/log;

public function timedOperation() returns error? {
    time:Utc overallStart = time:utcNow();

    // Section 1: Database query
    time:Utc s1 = time:utcNow();
    json data = check queryDatabase();
    decimal dbTime = time:utcDiffInSeconds(s1, time:utcNow());

    // Section 2: Data transformation
    time:Utc s2 = time:utcNow();
    json transformed = check transformData(data);
    decimal transformTime = time:utcDiffInSeconds(s2, time:utcNow());

    // Section 3: External API call
    time:Utc s3 = time:utcNow();
    check publishResult(transformed);
    decimal publishTime = time:utcDiffInSeconds(s3, time:utcNow());

    decimal totalTime = time:utcDiffInSeconds(overallStart, time:utcNow());

    log:printInfo("Performance breakdown",
        dbMs = dbTime,
        transformMs = transformTime,
        publishMs = publishTime,
        totalMs = totalTime);
}
```

## Profiling HTTP Services Under Load

Use load testing tools alongside the profiler to identify bottlenecks under realistic conditions.

```bash
# Terminal 1: Start the profiler
bal profile

# Terminal 2: Run load test with Apache Bench
ab -n 1000 -c 50 http://localhost:9090/api/orders

# Terminal 2: Or use wrk for more realistic load
wrk -t4 -c100 -d30s http://localhost:9090/api/orders

# Terminal 1: Stop profiler (Ctrl+C) and review the report
```

## Memory Profiling

Monitor memory usage to detect leaks and excessive allocation.

```ballerina
import ballerina/jballerina.java;
import ballerina/log;

// Log memory usage for diagnostics
public function logMemoryUsage() {
    // Runtime memory info is available through Java interop
    log:printInfo("Memory diagnostics",
        message = "Check JVM metrics for heap usage");
}
```

For detailed memory profiling, use JVM tools alongside the Ballerina profiler:

```bash
# Capture a heap dump from a running Ballerina process
jmap -dump:format=b,file=heap.hprof <PID>

# Analyze with VisualVM, Eclipse MAT, or similar tools
```

## Optimization Checklist

Use this checklist when profiling reveals performance issues:

- [ ] **Parallelize independent external calls** using workers or `fork/join`
- [ ] **Add connection pooling** for database and HTTP clients
- [ ] **Cache frequently accessed data** that does not change often
- [ ] **Use typed records** instead of repeated JSON parsing
- [ ] **Minimize serialization** -- convert once, work with typed data throughout
- [ ] **Use query expressions** instead of manual loops for collection processing
- [ ] **Set appropriate timeouts** to prevent slow calls from blocking the system
- [ ] **Use streaming** for large payloads instead of loading everything into memory

## Best Practices

- **Profile before optimizing** -- measure first to avoid optimizing the wrong thing
- **Profile under realistic load** -- single-request profiles miss concurrency bottlenecks
- **Focus on the critical path** -- optimize the operations that contribute most to total latency
- **Compare before and after** -- run the profiler again after changes to verify improvement
- **Monitor in production** -- use observability metrics to track performance trends over time

## What's Next

- [Strand Dump Analysis](strand-dumps.md) -- Diagnose concurrency issues
- [Editor Debugging](editor-debugging.md) -- Step through slow code paths
- [Observability Metrics](/docs/deploy-operate/observe/metrics) -- Monitor performance in production
