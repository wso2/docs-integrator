---
title: Errors and Stack Traces
---

# Errors and Stack Traces

Issues in a Ballerina integration fall into two categories:

- **Compile-time issues.** Caught by the compiler before the program runs. The same source always produces the same diagnostic, so these are deterministic and quick to reproduce.
- **Runtime issues.** These surface only while the program is running. They appear as either an `error` value flowing through your code or a panic that unwinds the program.

This page covers both categories. Start with the section that matches what you are seeing. If `bal build` fails, jump to [Compile-time issues](#compile-time-issues). If the program runs but fails or panics, jump to [Runtime issues](#runtime-issues). For hangs, deadlocks, or stuck strands, see [Strand dump analysis](strand-dump-analysis.md).

## Compile-time issues

Compile-time issues happen before the program starts. Fix them in order. The first error often produces the rest.

### Read a compiler diagnostic

A compiler diagnostic uses the form:

```bash
ERROR [<file>.bal:(<start_line>:<start_col>,<end_line>:<end_col>)] <message>
```

For example:

```
Compiling source
    myorg/mypackage:1.0.0

ERROR [main.bal:(12:5,12:5)] missing semicolon token
ERROR [main.bal:(18:18,18:27)] incompatible types: expected 'int', found 'string'
error: compilation contains errors
```

Read the message literally. Ballerina diagnostics are precise. The columns mark the exact token. When you see a batch of errors, fix the first one and recompile before tackling the rest. Later errors are often cascades.

Fix the first compiler error first, then recompile. Many later errors are knock-on effects that disappear once the root issue is resolved.

### Common compiler errors

| Error message pattern | Likely cause | Fix |
|---|---|---|
| `incompatible types: expected 'X', found 'Y'` | Type mismatch | Check the variable declaration or function return type. |
| `undefined symbol 'X'` | Missing import or typo in identifier | Add the import (`import ballerina/X;`) or correct the spelling. |
| `missing semicolon token` | Syntax error | Check the preceding lines for unclosed brackets or parentheses. |
| `invalid access of mutable storage in 'isolated' function` | Concurrency isolation violation | Wrap the access in a `lock` block or mark the variable `isolated`. |
| `variable 'X' is not initialized` | Used before assignment | Initialize the variable, or use a nullable type (`X?`). |
| `cannot use type 'X' as a 'readonly'` | Assigning a mutable value where immutable is required | Use `.cloneReadOnly()` or change the type to `readonly`. |

The `isolated` keyword enforces concurrency safety at compile time rather than runtime. A `lock { ... }` block gives exclusive access to shared mutable state, comparable to a `synchronized` block in Java.

### Compiler crashes

A compiler crash is a bug in the compiler itself, not in your code. It produces a distinctive banner followed by a Java stack trace:

```
Compiling source
    myorg/mypackage:1.0.0

ballerina: Oh no, something really went wrong. Bad. Sad.

We appreciate it if you can report the code that broke Ballerina in
https://github.com/ballerina-platform/ballerina-lang/issues with the
log you get below and your sample code.

We thank you for helping make us better.
```

Use the top of the Java stack trace to identify which component crashed:

| Stack trace package | Origin |
|---|---|
| `io.ballerina.stdlib.<name>` or `io.ballerina.lib.<name>` | A library compiler plugin (for example `http`, `sql`, `graphql`). |
| `org.wso2.ballerinalang.<...>` | Core compiler. |
| `io.ballerina.compiler.<...>` | Compiler API. |

Crashes can't be fixed in your code, but you can often work around them by restructuring the offending construct. Collect the minimal reproducer and the full stack trace before filing or escalating.

### Compiler plugin errors

Standard and extended libraries ship compiler plugins that run during compilation. They emit their own diagnostics that look like regular compiler errors but are domain-specific. For example:

```
ERROR [service.bal:(5:1,5:1)] remote methods are not allowed in HTTP service
```

The wording usually gives away the source. Phrases like "HTTP service cannot have...", "GraphQL service must have at least one resource function", or "SQL query must..." come from plugins, not the core compiler.

| Library | Plugin validates |
|---|---|
| `ballerina/http` | Service and resource method signatures. |
| `ballerina/graphql` | Schema definitions, resolver signatures, unions, and interface types. |
| `ballerina/sql` | SQL query syntax (in some versions). |
| `ballerina/persist` | Entity definitions. |
| `ballerinax/kafka` | Listener configurations. |

### Java exceptions during compilation

Occasionally compilation fails with a raw Java exception instead of a Ballerina diagnostic. This usually means a bug in the compiler or a plugin, or a dependency version mismatch.

```
error: compilation failed
java.lang.ClassCastException: class org.wso2.ballerinalang.compiler.tree.BLangFunction
    cannot be cast to class org.wso2.ballerinalang.compiler.tree.BLangService
    at io.ballerina.stdlib.http.compiler.HttpServiceValidator.validate(HttpServiceValidator.java:120)
```

| Exception | Common cause |
|---|---|
| `ClassCastException` | Compiler or plugin bug. |
| `ClassNotFoundException` / `NoClassDefFoundError` | Dependency version mismatch. A class was renamed or removed in a newer or older library version still referenced by another library. |
| `NoSuchMethodError` | Similar. A method signature changed between library versions. |
| `NullPointerException` | Compiler or plugin bug. |
| `StackOverflowError` | Compiler bug. Typically infinite recursion in type resolution. |

To work through one of these:

1. Check the stack trace origin. `io.ballerina.stdlib.*` or `io.ballerina.lib.*` is a plugin bug. `org.wso2.ballerinalang.*` or `io.ballerina.compiler.*` is a core compiler bug.
2. Check for version conflicts. `ClassNotFoundException` and `NoClassDefFoundError` often mean two libraries depend on incompatible versions. Inspect `Dependencies.toml`, or delete it to force a fresh resolution.
3. Check the release notes. The fix may already be in a newer Ballerina distribution or library version.
4. Try restructuring the offending code. Simplifying a service or splitting a complex expression often avoids the crashing path.

## Runtime issues

Once compilation succeeds and the program is running, failures arrive as one of two things: an `error` value returned from a function, or a panic that unwinds the program. The distinction shapes how you read the stack trace.

### Errors vs panics

| | Error | Panic |
|---|---|---|
| **Nature** | Expected failure, returned as a value | Unexpected, unrecoverable failure |
| **How triggered** | `return error(...)`, `check` on a failure, library functions | `panic error(...)`, nil dereference, type cast failure, divide by zero |
| **How to handle** | `if result is error { ... }` or `do { ... } on fail var e { ... }` | `trap` expression (use sparingly) |
| **Terminates the program?** | No | Yes, unless `trap`ped |
| **In the stack trace?** | Stack trace may be attached to the error value | Always printed to stderr |

`trap` lets you convert a panic into an `error` value at a specific call site. Reach for it only when you genuinely cannot prevent the panic upstream.

### Read an error message

At runtime, an error is printed as:

```
error: <message> [<detail>]
```

- **Message.** For typed errors, the message starts with a qualified type prefix such as `{ballerina}TypeCastError` or `{ballerina/io}FileSystemError`. Generic errors created with `error("...")` have no such prefix.
- **Detail** *(optional)*. A record of extra fields, printed as JSON (for example, `{"message":"...","cause":...}`). Libraries that define typed errors usually attach a detail record; ad-hoc errors often don't.

### Identify the source library

| Prefix | Origin |
|---|---|
| `{ballerina}` | Ballerina core runtime. |
| `{ballerina/<module>}` | `ballerina/<module>` standard library. |
| `{myorg/mypackage}` | Your own integration. |

If the prefix matches your own integration, the error was raised by your own code. If it matches a library, start by checking the call site to that library.

### Read a stack trace

Stack frames use the form:

```
at <org>/<package>:<version>:<function>(<file>.bal:<line>)
```

Ballerina runtime stack traces can contain both Ballerina frames and Java frames from the underlying runtime. Focus on the Ballerina frames. They describe what your code was doing. The top frame is usually the failing line, and the bottom is the entry point that started the call chain.

### Core runtime errors

Errors with the `{ballerina}` prefix come from the core runtime.

| Error type | What it means | Common cause |
|---|---|---|
| `{ballerina}TypeCastError` | Runtime type cast failed. | `value` where `value` is not actually `MyType` at runtime. |
| `{ballerina}NullReferenceException` | A nil (`()`) value was used where a non-nil value was expected. Ballerina's type system normally prevents this. The panic only fires when an unsafe cast bypasses the check (for example, `<string>nilValue`). | Dereferencing a `nil` value via an unsafe cast. |
| `{ballerina}NumberConversionError` | Number conversion failed. | `check int:fromString("abc")`. |
| `{ballerina}StackOverflow` | Infinite recursion. | A recursive function without a proper base case. |
| `{ballerina}IllegalStateException` | Operation on a closed or invalid resource. | Using a client or channel after `close()`. |
| `{ballerina}IndexOutOfRange` | Array or tuple index out of bounds. | Reading beyond the length of an array or tuple. |
| `{ballerina}KeyNotFound` | Map key does not exist. | Member access on a `map` for a key that isn't present. |
| `{ballerina}JSONOperationError` | JSON operation failed. | Accessing a missing key or invalid path in a JSON value. |

Example: a type cast panic.

```
error: {ballerina}TypeCastError {"message":"incompatible types: 'string' cannot be cast to 'int'"}
        at myorg/mypackage:0.1.0:processData(utils.bal:42)
        at myorg/mypackage:0.1.0:main(main.bal:10)
```

Line 42 of `utils.bal` has a cast `<int>someValue` where `someValue` was a `string` at runtime. Look at where `someValue` is assigned and confirm its type is `int` on every path that reaches the cast.

**What to do for each error type:**

| Error type | Recommended action |
|---|---|
| `TypeCastError` | Replace unsafe casts (`val`) with `if val is T { ... }` checks or `value:ensureType()`. |
| `NullReferenceException` | Add nil checks before using optional values; match against `()`, or use `value:ensureType()`. |
| `NumberConversionError` | Validate input before conversion; handle the `error` return of conversion functions. |
| `StackOverflow` | Review recursive functions for missing or incorrect base cases; consider iterative alternatives. |
| `IllegalStateException` | Don't reuse a resource after `close()`; restructure the lifecycle. |
| `IndexOutOfRange` | Check the array length before indexing (`if i < arr.length()`). |
| `KeyNotFound` | Use `map.hasKey(key)` or optional access (`map[key]` returns `()` for missing keys on `map<T?>`). |
| `JSONOperationError` | Check the structure before accessing nested keys; use optional access (`json?.key`). |

If a panic's stack trace contains no frame from your own code, the failure is in the runtime itself. File an issue with the reproducer and the full trace.

## What's next

- [Strand dump analysis](strand-dump-analysis.md) - for hangs, deadlocks, and concurrency diagnosis.
- [Logging](logging.md) - when logs are the right tool for the job.
- [Profiling](profiling.md) - for performance issues.
- [Editor Debugging](../debugging/editor.md) - step through the code interactively.
