---
sidebar_position: 2
title: Errors and Stack Traces
description: "Understand Ballerina error messages, read stack traces, and diagnose common runtime and compiler errors."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Errors and stack traces

Learn how to read and interpret error messages in your integrations. This page covers the difference between errors and panics, how to read stack traces, and quick fixes for the most common errors you will encounter.

:::tip
This page is about **diagnosing** errors. For how to **handle** errors in your code (using `check`, `do/on fail`, retry, etc.), see [Error Handling](../design-logic/error-handling.md).
:::

## Errors vs. panics

Ballerina distinguishes between two kinds of failures. Understanding this distinction is critical to reading stack traces and choosing the right fix.

|  | Error | Panic |
|--|-------|-------|
| **Nature** | Expected failure, returned as a value | Unexpected or unrecoverable failure |
| **How triggered** | `return error(...)`, `check` on failure, library functions | `panic error(...)`, nil dereference, type cast failure, divide by zero |
| **How to handle** | `if result is error { ... }` or `do { ... } on fail var e { ... }` | `trap` expression (use sparingly) |
| **Terminates program?** | No | Yes (unless trapped) |
| **In stack trace?** | Stack trace may be attached to the error value | Always printed to stderr |

**In practice:** most failures in integrations are **errors** (a backend returned an HTTP 500, a database query matched no rows, a JSON payload did not match the expected type). **Panics** are rarer and usually indicate a bug in the code (unsafe type cast, accessing a nil value, index out of bounds).

## Reading error messages

Ballerina error messages follow a consistent format that tells you where the error originated and what went wrong.

### Error message anatomy

```
error: {ballerina/http}ClientRequestError Connection refused: localhost/127.0.0.1:8080
       ^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
       Error origin    Error type name      Error message
```

The `{org/module}` prefix identifies which library the error came from:

| Prefix | Origin |
|--------|--------|
| `{ballerina}` | Core runtime (type casts, nil access, index out of bounds) |
| `{ballerina/http}` | HTTP standard library |
| `{ballerina/sql}` | SQL standard library |
| `{ballerina/graphql}` | GraphQL standard library |
| `{ballerinax/kafka}` | Kafka extended library |
| `{ballerinax/rabbitmq}` | RabbitMQ extended library |
| `{myorg/mypackage}` | Your own package |

### Stack trace format

```
error: {ballerina/http}ClientRequestError Connection refused: localhost/127.0.0.1:8080
    at myorg/mypackage:0.1.0:callBackendAPI(service.bal:42)
    at myorg/mypackage:0.1.0:processOrder(service.bal:18)
    at myorg/mypackage:0.1.0:$anonType$_0.$post$orders(service.bal:10)
```

**How to read it:**
1. **Start from the top** — the first line is the error itself.
2. **The first `at` line** is where the error occurred — in this example, line 42 of `service.bal` inside the `callBackendAPI` function.
3. **Subsequent lines** show the call chain — `processOrder` called `callBackendAPI`, and the HTTP resource function called `processOrder`.
4. **Ignore Java frames** — if you see lines like `at io.ballerina.runtime...`, these are internal runtime frames. Focus on lines that reference your `.bal` files.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

When an error occurs during a debug session, the flow diagram highlights the node where the error happened. The **Variables** panel shows the error value with its message and cause chain.

![Artifacts panel showing HTTP Service under Integration as API](/img/develop/debugging/stacktrace/flow-diagram.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

To inspect an error value programmatically:

```ballerina
import ballerina/log;

function diagnoseError(error err) {
    // Get the error message
    string msg = err.message();

    // Get the detail record (library-specific fields)
    map<anydata> detail = err.detail();

    // Get the cause (if this error wraps another)
    error? cause = err.cause();

    log:printError("Error diagnosis",
        message = msg,
        detail = detail.toString(),
        cause = cause is error ? cause.message() : "none");
}
```

</TabItem>
</Tabs>

## Common runtime errors

These errors occur after compilation, while your integration is running.

### Core runtime errors

These originate from the Ballerina runtime itself (`{ballerina}` prefix).

| Error type | What it means | Common cause | Fix |
|------------|---------------|--------------|-----|
| `{ballerina}TypeCastError` | Runtime type cast failed | `<MyType>value` where `value` is not actually `MyType` at runtime | Replace unsafe casts with type-safe checks: `if val is MyType { ... }` |
| `{ballerina}NullReferenceException` | Nil (`()`) used where a non-nil value was expected | Dereferencing a nil value via an unsafe cast | Add nil checks before using optional values |
| `{ballerina}IndexOutOfRange` | Array or tuple index out of bounds | Accessing an index beyond the array length | Check `arr.length()` before accessing by index |
| `{ballerina}KeyNotFound` | Map key does not exist | Accessing a non-existent key on a `map` | Use `map.hasKey(key)` before access, or use optional access (`map[key]`) |
| `{ballerina}NumberConversionError` | Number conversion failed | `check int:fromString("abc")` | Validate input before conversion; handle the `error` return |
| `{ballerina}StackOverflow` | Infinite recursion | Recursive function without a proper base case | Review recursive functions for missing or incorrect base cases |
| `{ballerina}IllegalStateException` | Operation on a closed or invalid resource | Using a client or channel after `close()` | Ensure resources are not used after closing |

### Example: Diagnosing a TypeCastError

```
error: {ballerina}TypeCastError {"message":"incompatible types: 'string' cannot be cast to 'int'"}
    at myorg/mypackage:0.1.0:processData(utils.bal:42)
    at myorg/mypackage:0.1.0:main(main.bal:10)
```

**What happened:** line 42 of `utils.bal` has a type cast like `<int>someValue` where `someValue` is actually a `string` at runtime.

**Fix:** replace the unsafe cast with a type-safe check:

```ballerina
// Before (unsafe — causes TypeCastError if value is not int)
int count = <int>someValue;

// After (safe — handles the case where value is not int)
if someValue is int {
    int count = someValue;
} else {
    log:printError("Expected int, got", value = someValue.toString());
}
```

### Data binding errors

These occur when converting between Ballerina types and external data formats (JSON, XML).

| Error | What it means | Fix |
|-------|---------------|-----|
| `ConversionError` with "missing required field" | A non-optional field in your record has no matching key in the JSON | Make the field optional (`string? name`) or add a default value (`string name = ""`) |
| `ConversionError` with "incompatible type" | JSON value type does not match the record field type | Adjust the record field type to match the actual data |
| Extra fields cause error | Record is a closed record (`record {\| ... \|}`) that rejects unknown fields | Use an open record (`record { ... }`) to allow extra fields |
| `PayloadBindingError` on service side | Incoming request body does not match the resource function parameter type | Check the `Content-Type` header and JSON structure against the parameter type |

**Example:**

```ballerina
// The JSON payload has "fullName" but the record expects "name"
type Customer record {
    string name;       // This field won't match "fullName" in the JSON
    string email;
};

// Fix: match the field name to the JSON key, or use @jsondata:Name annotation
type Customer record {
    string fullName;
    string email;
};
```

:::tip
Enable HTTP trace logs to see the actual payload your service receives. Add `-Cballerina.http.traceLogConsole=true` to your run command:
```bash
bal run -- -Cballerina.http.traceLogConsole=true
```
:::

### Diagnosing a type mismatch

When the binding error isn't obvious, inspect the raw payload and compare it field-by-field against the target record.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Open the data mapper to view the expected source type against the actual payload structure.
2. Add a **Log** node before the transformation to print the raw payload.
3. Compare the logged output with the expected record type to find mismatched fields.

</TabItem>
<TabItem value="code" label="Ballerina Code">

Trap the binding error and log both the raw payload and the failure cause:

```ballerina
import ballerina/log;

public function parsePayload(json raw) returns Order|error {
    Order|error result = raw.fromJsonWithType();
    if result is error {
        log:printError("Payload does not match Order type",
            payload = raw.toString(),
            'error = result);
    }
    return result;
}
```

</TabItem>
</Tabs>

## Common compiler errors

Compiler errors occur before the program starts. They are deterministic — the same code always produces the same error.

### Reading compiler error messages

```
ERROR [main.bal:(18:18,18:27)] incompatible types: expected 'int', found 'string'
      ^^^^^^^^^  ^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      File       Line:Column   Error message
```

:::tip
Multiple compiler errors often cascade from one root cause. **Fix the first error** and recompile before addressing the rest.
:::

### Common compiler errors

| Error message pattern | Likely cause | Fix |
|-----------------------|--------------|-----|
| `incompatible types: expected 'X', found 'Y'` | Type mismatch in assignment or return | Check the variable declaration or function return type |
| `expected 'T', found 'T?'` | Unhandled optional value | Use an `is` type guard (`if val is T`) or the Elvis operator (`val ?: defaultValue`) to handle the nil case |
| `expected 'T', found 'T\|error'` | Unhandled error return | Use `check`, or handle the `error` branch with `if result is error` |
| `undefined symbol 'X'` | Missing import or typo in identifier | Add the import: `import ballerina/X;` or fix the typo |
| `missing semicolon token` | Syntax error | Check the preceding lines for unclosed brackets or parentheses |
| `invalid access of mutable storage in 'isolated' function` | Concurrency isolation violation | Wrap the access in a `lock` block or mark the variable as `isolated` |
| `variable 'X' is not initialized` | Variable used before assignment | Initialize the variable or use a nullable type (`X?`) |

## Compiler crashes

Occasionally, the compiler itself crashes instead of reporting a diagnostic error. This looks like:

```
ballerina: Oh no, something really went wrong. Bad. Sad.
```

Followed by a Java stack trace. This is **a bug in the compiler, not in your code**. You cannot fix this from your code — report it with the minimal code that triggers the crash and the full stack trace.

:::note
If you see a compiler crash, try simplifying your code to identify the minimal code that triggers it. A workaround may be possible by restructuring the problematic code section.
:::

## Quick fixes cheat sheet

| Error or symptom | One-line fix |
|------------------|--------------|
| `incompatible types: expected 'X', found 'Y'` | Check the variable type or function return type at the indicated line |
| `undefined symbol 'X'` | Add `import ballerina/X;` or fix the identifier typo |
| `No suitable driver found for jdbc:...` | Add `import ballerinax/mysql.driver as _;` (or appropriate driver) |
| `Connection refused: host/IP:port` | Verify the target service is running and the URL/port is correct |
| `{ballerina}TypeCastError` | Replace unsafe `<T>val` with `if val is T { ... }` |
| `{ballerina/sql}NoRowsError` | Handle `NoRowsError` as a valid case — `queryRow()` matched no rows |
| `SSL/TLS handshake failure` | Configure `secureSocket` in client config or import the CA cert |
| `cannot resolve module` / `package not found` | Delete `Dependencies.toml` and rebuild; check network access |
| `bal: command not found` | Add `<ballerina_home>/bin` to PATH; re-source shell profile |
| Config values not loaded | Ensure `Config.toml` is in the working directory; check `[org.package.module]` key paths |
| `OutOfMemoryError` | Increase JVM heap: `export JAVA_OPTS="-Xmx2g"` |
| Service starts but unreachable externally | Change listener host to `"0.0.0.0"` instead of `"localhost"` |

## What's next

- [Editor Debugging](editor.md) -- Set breakpoints and step through your code to find the root cause
- [Error Handling](../design-logic/error-handling.md) -- Learn how to handle errors gracefully in your integration code
- [Strand Dump Analysis](strand-dump-analysis.md) -- Diagnose concurrency issues when your service hangs
