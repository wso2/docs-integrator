---
title: Concurrency
---

# Concurrency

The **Concurrency** section of the node palette starts parallel work, waits for results, and protects mutable state. Use it when an integration needs to call multiple downstream services at the same time, gather their results, or guard shared state from concurrent updates.

## Fork

Spawns one or more named worker strands that execute in parallel with the main flow. Each worker has its own block of steps and runs independently until joined with **Wait**.

![Fork button in the Concurrency section](/img/develop/flow-design-elements/fork-node.png)

Each worker is configured with a name and a return type. Select **Add Worker** to add more workers.

| Field | Description |
|---|---|
| **Worker** | Name of the worker. |
| **Return Type** | Type of the value the worker returns. Define new types inline with the [Type editor](../type-editor.md). |

![Fork form with Worker 1 and Worker 2 entries and Add Worker action](/img/develop/flow-design-elements/fork-form.png)

When the **Fork** is added to the flow, the canvas also receives a default **Wait** node that joins every worker in the fork. The generated code is equivalent to:

```ballerina
map<any|error> waitResult = wait {worker1, worker2};
```

Reconfigure the **Wait** node to join only a subset of workers or to name the joined values, as described below.

Use **Fork** to fan out independent calls. For example, hit two different APIs in parallel and combine their results downstream.

## Wait

Joins one or more worker strands started by **Fork** and collects their return values into a single result. The matching **Wait** node is the join point for the workers spawned by an earlier **Fork**.

![Wait button in the Concurrency section](/img/develop/flow-design-elements/wait-node.png)

Each row in the form pairs a **Key** with the worker whose result should be bound to that key. Select **+ Add** to add more key/worker pairs.

| Field | Description |
|---|---|
| **Key** | Name of the field in the joined result record. |
| **Variable** | Worker whose result is bound to the key. |
| **Variable Name** | Name of the variable that holds the joined result on the canvas. |

![Wait form with Key and Variable pairs](/img/develop/flow-design-elements/wait-form.png)

The configured pairs generate a wait expression of the form:

```ballerina
var var1 = wait {work1: worker1, work2: worker2};
```

Each key in the resulting record holds the return value of its paired worker.

## Lock

Acquires a lock to serialize access to a block of steps that touches shared mutable state. The lock is released when the block exits. Wrap any code path that mutates a shared variable from multiple strands in a **Lock** to prevent race conditions.

![Lock button in the Concurrency section](/img/develop/flow-design-elements/lock-node.png)

The configuration form requires no parameters and does not return a result. Add the steps that need protection inside the **Lock** block on the canvas.

![Lock info panel showing Configuration Complete](/img/develop/flow-design-elements/lock-form.png)

For most integration flows, prefer immutable values to avoid the need for locks entirely.

## What's next

- [Control](./control) — Branch and loop inside parallel workers.
- [Error handling](./error-handling) — Handle errors raised inside workers.
- [Logging](./logging) — Trace concurrent execution.
- [Statement](./statement) — Declare and update variables shared across workers.
