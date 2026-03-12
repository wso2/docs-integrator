---
sidebar_position: 2
title: Editor Debugging
description: Set breakpoints, watch variables, and step through Ballerina code in VS Code.
---

# Editor Debugging

Debug your integrations step-by-step in VS Code using the WSO2 Integrator extension. Set breakpoints on any line, inspect variables and payloads in real time, and step through data transformations to understand exactly how your integration processes data.

## Setting Up the Debugger

The WSO2 Integrator VS Code extension includes built-in debugging support. No additional configuration is required for basic debugging.

### From Source Code View

1. Open your Ballerina project in VS Code.
2. Open any `.bal` file.
3. Click in the gutter (left margin) next to a line number to set a breakpoint.
4. Press `F5` or click **Run > Start Debugging**.

### From the Visual Designer

1. Open your integration in the design view.
2. Click the three dots (**...**) on any node in the flow diagram.
3. Select **Add Breakpoint** from the context menu.
4. Click **Debug Integration** (top-right corner of the design view).

The debugger supports three session types:
- **Program debugging** -- standard application debugging
- **Test debugging** -- debugging test cases
- **Remote debugging** -- attaching to running integrations (see [Remote Debugging](remote-debugging.md))

## Setting Breakpoints

### Line Breakpoints

Click the gutter next to any executable line to add a red dot breakpoint.

<!-- TODO: Screenshot showing a breakpoint set on a line -->

```ballerina
import ballerina/http;

service /api on new http:Listener(9090) {

    resource function post orders(http:Request req) returns json|error {
        json payload = check req.getJsonPayload();   // Set breakpoint here
        Order order = check payload.fromJsonWithType();
        decimal total = calculateTotal(order);        // Set breakpoint here
        return {orderId: order.id, total: total};
    }
}
```

### Conditional Breakpoints

Right-click a breakpoint and select **Edit Breakpoint** to add a condition. The debugger only pauses when the condition evaluates to `true`.

<!-- TODO: Screenshot of conditional breakpoint dialog -->

Example conditions:
- `order.total > 1000` -- pause only for high-value orders
- `customer.tier == "premium"` -- pause only for premium customers
- `items.length() > 10` -- pause when processing large orders

### Logpoint Breakpoints

Logpoints print a message to the debug console without stopping execution. Right-click the gutter and select **Add Logpoint**.

<!-- TODO: Screenshot of logpoint configuration -->

Format: `Processing order {order.id} with {items.length()} items`

## Stepping Through Code

Once paused at a breakpoint, use the debug toolbar controls:

| Action | Shortcut | Description |
|--------|----------|-------------|
| **Continue** | `F5` | Resume execution until the next breakpoint |
| **Step Over** | `F10` | Execute the current line and pause on the next line |
| **Step Into** | `F11` | Enter a function call to debug inside it |
| **Step Out** | `Shift+F11` | Finish the current function and pause in the caller |
| **Restart** | `Ctrl+Shift+F5` | Restart the debug session |
| **Stop** | `Shift+F5` | End the debug session |

<!-- TODO: Screenshot of debug toolbar -->

### Step Through Example

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

## Inspecting Variables

### Variables Panel

The Variables panel shows all in-scope variables with their current values, organized into:

- **Local** -- variables in the current function scope
- **Global** -- module-level variables and constants

<!-- TODO: Screenshot of Variables panel showing record fields expanded -->

Expand records and maps to inspect nested fields. JSON and XML payloads display their full structure.

### Watch Expressions

Add custom expressions to the Watch panel to monitor specific values.

<!-- TODO: Screenshot of Watch panel -->

Useful watch expressions for integrations:
- `payload.toString()` -- see the full payload as a string
- `order.items.length()` -- count items without expanding the array
- `total * 1.08` -- compute derived values
- `response.statusCode` -- check HTTP response status

### Hover Inspection

Hover over any variable in the editor to see its current value in a tooltip.

<!-- TODO: Screenshot of hover inspection tooltip -->

## Debugging HTTP Services

When debugging an HTTP service, the debugger starts the service and waits for requests. Send requests using the built-in Try-It tool, `curl`, or any HTTP client.

```ballerina
import ballerina/http;

service /api on new http:Listener(9090) {

    resource function get users/[string id]() returns json|error {
        // 1. Set breakpoint here
        json user = check getUserFromDB(id);

        // 2. Send request: GET http://localhost:9090/api/users/U001
        // 3. Debugger pauses - inspect 'id' and 'user'

        return user;
    }
}
```

### Debugging Request Payloads

Inspect incoming HTTP request details at a breakpoint:

```ballerina
resource function post orders(http:Request req) returns json|error {
    // Set breakpoint here and inspect:
    // - req.getJsonPayload()   -> request body
    // - req.getHeader("Authorization")  -> headers
    // - req.getQueryParamValue("status") -> query params

    json payload = check req.getJsonPayload();
    // Inspect 'payload' in the Variables panel
    return payload;
}
```

## Debugging Data Transformations

Step through complex transformations to verify intermediate values.

```ballerina
import ballerina/log;

type SourceRecord record {
    string firstName;
    string lastName;
    string email;
    string phoneNumber;
};

type TargetRecord record {|
    string fullName;
    string contactEmail;
    string phone;
|};

public function transformRecord(SourceRecord src) returns TargetRecord {
    // Set breakpoint - inspect 'src' to see input data
    string fullName = src.firstName + " " + src.lastName;

    // Step over - inspect 'fullName' to verify concatenation
    string normalizedPhone = normalizePhone(src.phoneNumber);

    // Step over - inspect 'normalizedPhone'
    return {
        fullName: fullName,
        contactEmail: src.email,
        phone: normalizedPhone
    };
}

function normalizePhone(string phone) returns string {
    // Step into this function to debug phone normalization
    return phone.trim();
}
```

## Debug Configuration

### launch.json

For advanced scenarios, create a `.vscode/launch.json` configuration.

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

### Debugging Tests

Debug a specific test by clicking the debug icon next to its `@test:Config` annotation, or configure a test debug launch as shown above.

<!-- TODO: Screenshot of debug icon next to a test function -->

## Debug Console

Use the Debug Console to evaluate expressions while paused at a breakpoint.

<!-- TODO: Screenshot of Debug Console -->

Type any Ballerina expression to evaluate it:
```
> order.total
150.00d

> order.items.length()
3

> order.customer.tier == "gold"
true
```

## Troubleshooting the Debugger

| Issue | Solution |
|-------|----------|
| Breakpoints not hit | Verify the correct file is running; check for compilation errors |
| Debugger won't start | Ensure no other process is using the service port |
| Variables show "unavailable" | Step to a line where the variable is in scope |
| Slow startup | Close unused VS Code extensions during debug sessions |
| Cannot inspect external library code | Step Into only works for your project code, not imported modules |

## Best Practices

- **Set breakpoints strategically** -- focus on data transformation boundaries and error-prone areas
- **Use conditional breakpoints** to avoid pausing on every iteration of a loop
- **Use logpoints** in production-like scenarios where pausing is disruptive
- **Watch payload shapes** to catch type mismatches early in the pipeline
- **Debug tests first** -- it is easier to reproduce issues in a controlled test environment

## What's Next

- [Remote Debugging](remote-debugging.md) -- Debug services running in containers or remote servers
- [Strand Dump Analysis](strand-dumps.md) -- Diagnose concurrency issues
- [Performance Profiling](performance-profiling.md) -- Find performance bottlenecks
