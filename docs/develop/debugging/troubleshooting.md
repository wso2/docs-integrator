---
title: Debugging & Troubleshooting
---

# Debugging & Troubleshooting

Diagnose and fix issues in your integrations using editor debugging, remote debugging, strand dump analysis, and performance profiling. Whether you are stepping through a data transformation or investigating a concurrency deadlock in production, this section provides the tools and techniques you need.

## Before you start debugging

Collect the following information before investigating an issue. Missing even one item can significantly delay diagnosis.

| Item | How to get it | Why it matters |
|------|---------------|----------------|
| **WSO2 Integrator version** | `bal --version` | Bugs are version-specific |
| **OS and architecture** | `uname -a` (Linux/macOS) or `winver` (Windows) | Some issues are OS-specific |
| **`Ballerina.toml`** | Root of the project | Package metadata and dependency declarations |
| **`Dependencies.toml`** | Root of the project | Exact resolved dependency versions |
| **Full error output** | Terminal or log output | The complete stack trace, not just the last line |
| **Steps to reproduce** | Document what triggers the issue | A minimal description helps isolate the root cause |

## Debugging tools

- [Errors and Stack Traces](errors-and-stack-traces.md) -- Understand error messages, read stack traces, and diagnose common errors
- [Editor Debugging](editor.md) -- Set breakpoints, step through code, and inspect variables in WSO2 Integrator
- [Remote Debugging](remote.md) -- Attach a debugger to running services in remote environments
- [Strand Dump Analysis](strand-dump-analysis.md) -- Analyze strand dumps to diagnose concurrency and deadlock issues
- [Performance Profiling](performance-profiling.md) -- Profile execution time and identify bottlenecks with the Ballerina profiler

## Quick troubleshooting guide

| Symptom | Start here |
|---------|------------|
| Compiler error message | [Errors and Stack Traces](errors-and-stack-traces.md) -- understand the error format and common fixes |
| Runtime panic or unexpected crash | [Errors and Stack Traces](errors-and-stack-traces.md) -- learn to read panics and stack traces |
| Unexpected output or wrong data | [Editor Debugging](editor.md) -- set breakpoints and inspect variables |
| Service not responding | [Strand Dump Analysis](strand-dump-analysis.md) -- check for blocked strands |
| Slow response times | [Performance Profiling](performance-profiling.md) -- identify bottlenecks |
| Works locally, fails in deployment | [Remote Debugging](remote.md) -- attach to the deployed service |
| Intermittent failures | [Strand Dump Analysis](strand-dump-analysis.md) -- look for race conditions |
| Configurable values not loaded | Check [Top configuration mistakes](#top-configuration-mistakes) below |
| Dependency or package resolution failure | Delete `Dependencies.toml` and rebuild; check network access |
| IDE shows errors but `bal build` succeeds | Reload the editor window (`Ctrl+Shift+P` > **Developer: Reload Window**) |

## Top configuration mistakes

These five mistakes account for a large share of issues. Rule them out before diving deeper.

| # | Mistake | What goes wrong | Fix |
|---|---------|-----------------|-----|
| 1 | Confusing `Ballerina.toml` with `Config.toml` | Build config placed in `Config.toml`, or runtime config placed in `Ballerina.toml` | `Ballerina.toml` = build-time package config. `Config.toml` = runtime configurable values. |
| 2 | Wrong module path in `Config.toml` | Configurable value not picked up; uses default instead | Keys must match `[org.package.module]` hierarchy. For the default module, use `[org.package]`. |
| 3 | Missing SQL driver import | `No suitable driver found for jdbc:...` | Add `import ballerinax/mysql.driver as _;` (or the appropriate driver for your database). |
| 4 | `Config.toml` not in the working directory | Configurable values use defaults silently | Ensure `Config.toml` is in the directory where `bal run` is executed. In Docker, mount it to `/home/ballerina/`. |
| 5 | TOML syntax errors | Parse error on startup, or values silently wrong | Use `=` for key-value pairs (not `:`). Table headers use `[section]`. Strings must be quoted. |

## Log-based debugging

For quick debugging, add strategic log statements to trace execution flow.

Add a log node to your flow to trace execution:

1. Click **+** on the flow where you want to add a log statement.
2. Select **Utilities** > **Log** from the step picker.
3. Configure the log level (for example, **Info** or **Debug**).
4. Enter the log message and any key-value pairs to include in the output.

![Artifacts panel showing HTTP Service under Integration as API](/img/develop/debugging/overview/flow-diagram.png)

```ballerina
import ballerina/log;

public function processOrder(json orderPayload) returns error? {
    log:printDebug("Received order payload", payload = orderPayload);

    Order orderData = check orderPayload.fromJsonWithType();
    log:printInfo("Order parsed successfully",
        orderId = orderData.id,
        itemCount = orderData.items.length());

    decimal total = check calculateTotal(orderData);
    log:printInfo("Total calculated", orderId = orderData.id, total = total);

    error? result = submitOrder(orderData);
    if result is error {
        log:printError("Order submission failed",
            orderId = orderData.id,
            'error = result);
        return result;
    }

    log:printInfo("Order submitted successfully", orderId = orderData.id);
}
```

### Log levels

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

## Common integration issues

### Connection failures

Configure timeout and retry settings for a connector:

1. Select the connector node in the flow diagram.
2. Click **Advanced Settings** in the node properties panel.
3. Set the **Timeout** value (for example, `30` seconds).
4. Enable **Retry** and configure the retry count and interval.

![Artifacts panel showing HTTP Service under Integration as API](/img/develop/debugging/overview/call-backend.png)

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

### Data type mismatches

Diagnose type mismatches using the data mapper and log nodes:

1. Open the data mapper to check the expected source type against the actual payload structure.
2. Add a **Log** node before the transformation to print the raw payload and verify its shape.
3. Compare the logged output with the expected record type to identify mismatched fields.

![Artifacts panel showing HTTP Service under Integration as API](/img/develop/debugging/overview/data-mismatch.png)

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

## What's next

- Start with [Errors and Stack Traces](errors-and-stack-traces.md) to learn how to read and diagnose error messages.
- Use [Editor Debugging](editor.md) if you are developing locally.
- Jump to [Remote Debugging](remote.md) if you need to troubleshoot a deployed service.
