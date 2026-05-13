---
sidebar_position: 9
title: Log-Based Debugging
description: Add strategic log statements to trace execution flow, then control verbosity at runtime with log levels and module-level configuration.
keywords: [ballerina, logging, debug, trace, log levels, configurable]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Log-Based Debugging

Add log statements to trace execution flow. This is the most universal debugging technique: it works in the IDE, in containers, and in production. The Ballerina logging API plus runtime log-level control lets you turn verbosity up while diagnosing an issue and back down once it's fixed.

For configuring log output to a file or controlling output format, see [Debug logging](troubleshooting.md#debug-logging) on the troubleshooting hub.

## Add log statements

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Add a Log node to your flow to trace execution:

1. Click **+** on the flow where you want to add a log statement.
2. Select **Utilities** > **Log** from the step picker.
3. Configure the log level (for example, **Info** or **Debug**).
4. Enter the log message and any key-value pairs to include in the output.

</TabItem>
<TabItem value="code" label="Ballerina Code">

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

</TabItem>
</Tabs>

## Log levels

Use appropriate log levels to control verbosity:

| Level | API | Usage |
|---|---|---|
| Debug | `log:printDebug` | Detailed diagnostic info. Disabled in production. |
| Info | `log:printInfo` | Normal operational events |
| Warn | `log:printWarn` | Unexpected but recoverable situations |
| Error | `log:printError` | Failures that need attention |

## Control verbosity at runtime

Set the global log level via environment variable:

```bash
BAL_LOG_LEVEL=DEBUG bal run
```

Or in `Config.toml`:

```toml
[ballerina.log]
level = "DEBUG"
format = "json"
```

For module-scoped verbosity (raise DEBUG on `ballerina/http` only while keeping the rest at INFO):

```toml
[[ballerina.log.modules]]
name = "ballerina/http"
level = "DEBUG"
```

Log output goes to **stderr** by default. Redirect to a file:

```bash
bal run . 2> app.log
```

## See also

- [Debugging & Troubleshooting](troubleshooting.md): Diagnostic tools overview
- [Errors and Stack Traces](errors-and-stack-traces.md): Reading errors logged at runtime
- [Editor Debugging](editor.md): Breakpoint-based debugging in the IDE
