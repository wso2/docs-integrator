---
title: Logging
---

# Logging

The **Logging** section of the node panel emits a message to the integration's log output at a specific severity level. Use it to trace execution, surface errors, and aid debugging in development and production.

The four logging nodes are shortcuts to the corresponding `log:print*` functions in the Ballerina `log` library. Each form takes a single required **Msg** field. Additional options (an attached error, a stack trace, structured key-value pairs) are available under **Advanced Configurations** in the form.

## Log Info

Prints info logs. Use **Log Info** for routine progress updates such as "request received", "step completed", or a summary metric.

![Log Info button in the Logging section](/img/develop/flow-design-elements/log-info-node.png)

| Field | Description |
|---|---|
| **Msg** | The message to be logged. Supports Ballerina string templates with embedded expressions; author them in the [Expression editor](../expression-editor.md). |

![Log Info form with Msg field and Advanced Configurations](/img/develop/flow-design-elements/log-info-form.png)

## Log Error

Prints error logs. Use **Log Error** for failures that the integration handled or escalated, such as a failed downstream call, a validation failure, or a caught exception.

![Log Error button in the Logging section](/img/develop/flow-design-elements/log-error-node.png)

| Field | Description |
|---|---|
| **Msg** | The message to be logged. |

![Log Error form](/img/develop/flow-design-elements/log-error-form.png)

## Log Warn

Prints warn logs. Use **Log Warn** for conditions that are unexpected but recoverable, such as a fallback path being taken, a retry being attempted, or deprecated input being encountered.

![Log Warn button in the Logging section](/img/develop/flow-design-elements/log-warn-node.png)

| Field | Description |
|---|---|
| **Msg** | The message to be logged. |

![Log Warn form](/img/develop/flow-design-elements/log-warn-form.png)

## Log Debug

Prints debug logs. Use **Log Debug** for verbose information you want available in development and typically suppressed in production.

![Log Debug button in the Logging section](/img/develop/flow-design-elements/log-debug-node.png)

| Field | Description |
|---|---|
| **Msg** | The message to be logged. |

![Log Debug form](/img/develop/flow-design-elements/log-debug-form.png)

## What's next

- [Show more functions](./show-more-functions) — Reach every `log:print*` variant beyond the four shortcuts.
- [Statement](./statement) — Function calls and variable updates.
- [Error handling](./error-handling) — Pair logging with **ErrorHandler** branches.
- [Control](./control) — Conditional logging inside branches and loops.
- [Expression editor](../expression-editor) — Build log messages with string templates and expressions.
