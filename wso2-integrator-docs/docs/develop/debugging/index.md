---
sidebar_position: 1
title: Debugging & Troubleshooting
description: "How do I debug and troubleshoot my integration?"
---

# Debugging & Troubleshooting

Diagnose and fix issues in your integrations using VS Code debugging, remote debugging, strand dump analysis, and performance profiling. Whether you are stepping through a data transformation or investigating a concurrency deadlock in production, this section provides the tools and techniques you need.

## Debugging Tools

- [Editor Debugging](editor-debugging.md) -- Set breakpoints, step through code, and inspect variables in VS Code
- [Remote Debugging](remote-debugging.md) -- Attach a debugger to running services in remote environments
- [Strand Dump Analysis](strand-dumps.md) -- Analyze strand dumps to diagnose concurrency and deadlock issues
- [Performance Profiling](performance-profiling.md) -- Profile execution time and identify bottlenecks with the Ballerina profiler

## Quick Troubleshooting Guide

| Symptom | Start Here |
|---------|------------|
| Unexpected output or wrong data | [Editor Debugging](editor-debugging.md) -- set breakpoints and inspect variables |
| Service not responding | [Strand Dump Analysis](strand-dumps.md) -- check for blocked strands |
| Slow response times | [Performance Profiling](performance-profiling.md) -- identify bottlenecks |
| Works locally, fails in deployment | [Remote Debugging](remote-debugging.md) -- attach to the deployed service |
| Intermittent failures | [Strand Dump Analysis](strand-dumps.md) -- look for race conditions |

## Log-Based Debugging

For quick debugging, add strategic log statements to trace execution flow.

```ballerina
import ballerina/log;

public function processOrder(json orderPayload) returns error? {
    log:printDebug("Received order payload", payload = orderPayload);

    Order order = check orderPayload.fromJsonWithType();
    log:printInfo("Order parsed successfully",
        orderId = order.id,
        itemCount = order.items.length());

    decimal total = check calculateTotal(order);
    log:printInfo("Total calculated", orderId = order.id, total = total);

    error? result = submitOrder(order);
    if result is error {
        log:printError("Order submission failed",
            orderId = order.id,
            'error = result);
        return result;
    }

    log:printInfo("Order submitted successfully", orderId = order.id);
}
```

### Log Levels

Use appropriate log levels to control verbosity:

| Level | Usage |
|-------|-------|
| `log:printDebug` | Detailed diagnostic info, disabled in production |
| `log:printInfo` | Normal operational events |
| `log:printWarn` | Unexpected but recoverable situations |
| `log:printError` | Failures that need attention |

Configure the log level at runtime:

```bash
# Set log level via environment variable
BAL_LOG_LEVEL=DEBUG bal run

# Or in Config.toml
[ballerina.log]
level = "DEBUG"
```

## Common Integration Issues

### Connection Failures

```ballerina
import ballerina/http;
import ballerina/log;

http:Client backendClient = check new ("https://api.example.com",
    timeout = 30,
    retryConfig = {
        count: 3,
        interval: 2
    }
);

public function callBackend() returns json|error {
    json|error response = backendClient->/api/data;
    if response is error {
        log:printError("Backend call failed",
            url = "https://api.example.com/api/data",
            'error = response);
    }
    return response;
}
```

### Data Type Mismatches

```ballerina
import ballerina/log;

// Use trap to catch type conversion errors
public function parsePayload(json raw) returns Order|error {
    Order|error order = raw.fromJsonWithType();
    if order is error {
        log:printError("Payload does not match Order type",
            payload = raw.toString(),
            'error = order);
    }
    return order;
}
```

## What's Next

Start with [Editor Debugging](editor-debugging.md) if you are developing locally, or jump to [Remote Debugging](remote-debugging.md) if you need to troubleshoot a deployed service.
