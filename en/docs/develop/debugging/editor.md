---
sidebar_position: 5
title: Editor Debugging
description: Set breakpoints, watch variables, and step through Ballerina code in WSO2 Integrator.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Editor Debugging

Debug your integrations step-by-step in WSO2 Integrator. Set breakpoints on any line, inspect variables and payloads in real time, and step through data transformations to understand exactly how your integration processes data.

## Setting up the debugger

WSO2 Integrator includes built-in debugging support. No additional configuration is required for basic debugging.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Open your integration in the design view.
2. Click the three dots (**...**) on any node in the flow diagram.
3. Select **Add Breakpoint** from the context menu.
4. Click **Debug Integration** (top-right corner of the design view).

<!-- TODO: Screenshot showing Debug Integration button in design view -->

</TabItem>
<TabItem value="code" label="Ballerina Code">

1. Open your integration project in WSO2 Integrator.
2. Open any `.bal` file.
3. Click in the gutter (left margin) next to a line number to set a breakpoint.
4. Press `F5` or click **Run > Start Debugging**.

</TabItem>
</Tabs>

The debugger supports three session types:
- **Program debugging** -- standard application debugging
- **Test debugging** -- debugging test cases
- **Remote debugging** -- attaching to running integrations (see [Remote Debugging](remote.md))

## Setting breakpoints

### Line breakpoints

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

Set breakpoints on flow nodes to pause execution at specific steps:

1. Open your integration in the design view.
2. Click the three dots (**...**) on the node where you want to pause.
3. Select **Add Breakpoint** from the context menu.

A red dot appears on the node to indicate the breakpoint.

![Artifacts panel showing HTTP Service under Integration as API](/img/develop/debugging/editor-debugging/flow-diagram.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

Click the gutter next to any executable line to add a red dot breakpoint.

![Artifacts panel showing HTTP Service under Integration as API](/img/develop/debugging/editor-debugging/bal-code.png)

```ballerina
import ballerina/http;

service /api on new http:Listener(9090) {

    resource function post orders(http:Request req) returns json|error {
        json payload = check req.getJsonPayload();   // Set breakpoint here
        Order orderData = check payload.fromJsonWithType();
        decimal total = calculateTotal(orderData);        // Set breakpoint here
        return {orderId: orderData.id, total: total};
    }
}
```

</TabItem>
</Tabs>

### Conditional breakpoints

Right-click a breakpoint and select **Edit Breakpoint** to add a condition. The debugger only pauses when the condition evaluates to `true`.

![Artifacts panel showing HTTP Service under Integration as API](/img/develop/debugging/editor-debugging/condition.png)

Example conditions:
- `orderData.total > 1000` -- pause only for high-value orders
- `customer.tier == "premium"` -- pause only for premium customers
- `items.length() > 10` -- pause when processing large orders

### Logpoint breakpoints

Logpoints print a message to the debug console without stopping execution. Right-click the gutter and select **Add Logpoint**.

![Artifacts panel showing HTTP Service under Integration as API](/img/develop/debugging/editor-debugging/log-points.png)

Format: `Processing order {orderData.id} with {items.length()} items`

## Stepping through code

Once paused at a breakpoint, use the debug toolbar controls:

| Action | Shortcut | Description |
|--------|----------|-------------|
| **Continue** | `F5` | Resume execution until the next breakpoint |
| **Step Over** | `F10` | Execute the current line and pause on the next line |
| **Step Into** | `F11` | Enter a function call to debug inside it |
| **Step Out** | `Shift+F11` | Finish the current function and pause in the caller |
| **Restart** | `Ctrl+Shift+F5` | Restart the debug session |
| **Stop** | `Shift+F5` | End the debug session |

![Artifacts panel showing HTTP Service under Integration as API](/img/develop/debugging/editor-debugging/debug-toolbar.png)

### Step through example

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

When paused at a breakpoint, the active node is highlighted in the flow diagram. Use the debug toolbar to step through the flow:

1. **Step Over** (`F10`) -- execute the current node and move to the next node in the flow.
2. **Step Into** (`F11`) -- enter a function node to debug its internal logic.
3. **Step Out** (`Shift+F11`) -- finish the current function and return to the calling flow.

The flow diagram updates in real time to show which node is currently executing.

![Artifacts panel showing HTTP Service under Integration as API](/img/develop/debugging/editor-debugging/debug-session.png)


</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
public function processOrder(Order order) returns OrderResult|error {
    // Step 1: F10 - validate order
    check validateOrder(order);

    // Step 2: F11 - step INTO calculateTotal to debug the calculation
    decimal total = calculateTotal(order);

    // Step 3: F10 - step over the notification (not interested)
    check sendNotification(order.customerId, total);

    // Step 4: inspect 'total' in Variables panel
    return {orderId: order.id, total: total, status: "confirmed"};
}
```

</TabItem>
</Tabs>

## Inspecting variables

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

When paused at a breakpoint, the **Variables** panel appears alongside the flow diagram. Click any node in the flow to see the variables in scope at that point.

- **Local** -- variables in the current function scope
- **Global** -- module-level variables and constants

Expand records and maps to inspect nested fields. JSON and XML payloads display their full structure.

![Artifacts panel showing HTTP Service under Integration as API](/img/develop/debugging/editor-debugging/variable-section.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

### Variables panel

The Variables panel shows all in-scope variables with their current values, organized into:

- **Local** -- variables in the current function scope
- **Global** -- module-level variables and constants


Expand records and maps to inspect nested fields. JSON and XML payloads display their full structure.

### Hover inspection

Hover over any variable in the editor to see its current value in a tooltip.


</TabItem>
</Tabs>

### Watch expressions

Add custom expressions to the Watch panel to monitor specific values.

![Artifacts panel showing HTTP Service under Integration as API](/img/develop/debugging/editor-debugging/watch-panel.png)

Useful watch expressions for integrations:
- `payload.toString()` -- see the full payload as a string
- `order.items.length()` -- count items without expanding the array
- `total * 1.08` -- compute derived values
- `response.statusCode` -- check HTTP response status

## Debug configuration

### Launch.json

For advanced scenarios, create a `launch.json` configuration.

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Ballerina Debug",
            "type": "ballerina",
            "request": "launch",
            "programArgs": [],
            "commandOptions": [],
            "env": {
                "BAL_LOG_LEVEL": "DEBUG"
            }
        },
        {
            "name": "Ballerina Test Debug",
            "type": "ballerina",
            "request": "launch",
            "debugTests": true,
            "commandOptions": ["--groups", "unit"]
        }
    ]
}
```

### Debugging tests

Debug a specific test by clicking the debug icon next to its `@test:Config` annotation, or configure a test debug launch as shown above.


## Debug console

Use the Debug Console to evaluate expressions while paused at a breakpoint.

![Artifacts panel showing HTTP Service under Integration as API](/img/develop/debugging/editor-debugging/debug-console.png)

Type any Ballerina expression to evaluate it:
```
> order.total
150.00d

> order.items.length()
3

> order.customer.tier == "gold"
true
```

## Troubleshooting the debugger

| Issue | Solution |
|-------|----------|
| Breakpoints not hit | Verify the correct file is running; check for compilation errors |
| Debugger won't start | Ensure no other process is using the service port |
| Variables show "unavailable" | Step to a line where the variable is in scope |
| Slow startup | Close unused extensions during debug sessions |
| Cannot inspect external library code | Step Into only works for your project code, not imported modules |

## Best practices

- **Set breakpoints strategically** -- focus on data transformation boundaries and error-prone areas
- **Use conditional breakpoints** to avoid pausing on every iteration of a loop
- **Use logpoints** in production-like scenarios where pausing is disruptive
- **Watch payload shapes** to catch type mismatches early in the pipeline
- **Debug tests first** -- it is easier to reproduce issues in a controlled test environment

## What's next

- [Remote Debugging](remote.md) -- Debug services running in containers or remote servers
- [Strand Dump Analysis](strand-dump-analysis.md) -- Diagnose concurrency issues
- [Performance Profiling](performance-profiling.md) -- Find performance bottlenecks
