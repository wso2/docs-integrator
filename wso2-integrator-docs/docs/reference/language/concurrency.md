---
sidebar_position: 5
title: Concurrency
description: Ballerina concurrency reference — workers, strands, locks, transactions, wait expressions, and fork/join patterns.
---

# Concurrency

Ballerina provides built-in concurrency constructs designed for integration workloads. Rather than relying on low-level thread primitives, the language uses **workers**, **strands**, and structured concurrency patterns that make parallel execution, synchronization, and transactional flows safe and expressive.

## Workers

Workers are named concurrent execution units within a function. Each worker runs on its own strand and can execute independently alongside other workers and the default worker.

```ballerina
function fetchData() returns error? {
    // The default worker
    string urlA = "https://api.example.com/a";

    worker workerA returns json|error {
        http:Client clientA = check new (urlA);
        json resp = check clientA->get("/data");
        return resp;
    }

    worker workerB returns json|error {
        http:Client clientB = check new ("https://api.example.com/b");
        json resp = check clientB->get("/data");
        return resp;
    }

    // Wait for both workers to complete
    json|error resultA = wait workerA;
    json|error resultB = wait workerB;
}
```

### Worker Message Passing

Workers communicate via asynchronous message channels using the `->` (send) and `<-` (receive) operators.

```ballerina
function pipeline() {
    worker producer {
        foreach int i in 1 ... 5 {
            i -> consumer;
        }
    }

    worker consumer {
        foreach int i in 1 ... 5 {
            int value = <- producer;
            io:println("Received: ", value);
        }
    }
}
```

### Worker Send/Receive Operators

| Operator | Syntax | Description |
|----------|--------|-------------|
| Send | `expression -> workerName` | Send a value to the named worker |
| Sync send | `expression ->> workerName` | Send and block until the receiver accepts |
| Receive | `<- workerName` | Receive a value from the named worker |
| Multiple receive | `<- {workerA, workerB}` | Receive from multiple workers as a record |
| Alternate receive | `<- workerA \| workerB` | Receive from whichever worker completes first |
| Flush | `flush workerName` | Wait until all sends to the named worker are accepted |

## Strands

A strand is a lightweight logical thread of execution. Every worker runs on a strand. Strands within the same isolation group share the same thread, providing cooperative concurrency without data races.

```ballerina
// Start a function on a new strand
future<int> f = start computeValue(100);
int result = check wait f;
```

### Strand Scheduling

| Concept | Description |
|---------|-------------|
| Strand | Lightweight logical thread; the unit of concurrent execution |
| Default strand | The implicit strand in every function |
| Named worker strand | Each named worker gets its own strand |
| `start` expression | Creates a new strand for an async function call |
| Yield point | Strands yield at I/O operations and explicit `wait` calls |

## Wait Expressions

Wait expressions block the current strand until one or more asynchronous results are available.

```ballerina
function parallelRequests() returns error? {
    // Start parallel calls
    future<json> f1 = start callServiceA();
    future<json> f2 = start callServiceB();
    future<json> f3 = start callServiceC();

    // Wait for all — result is a record
    record {json f1; json f2; json f3} results = wait {f1, f2, f3};

    // Wait for any one — alternate wait
    json firstResult = wait f1|f2|f3;
}
```

### Wait Expression Types

| Form | Syntax | Returns |
|------|--------|---------|
| Single wait | `wait futureExpr` | The resolved value or error |
| Multiple wait | `wait {f1, f2, ...}` | A record containing all results |
| Alternate wait | `wait f1 \| f2 \| ...` | The first completed result |

## Fork/Join

The `fork` statement creates a block in which multiple workers execute concurrently. After the fork block, you join the results using `wait`.

```ballerina
function aggregateData() returns json|error {
    fork {
        worker fetchOrders returns json|error {
            http:Client cl = check new ("https://orders.example.com");
            return check cl->get("/recent");
        }

        worker fetchInventory returns json|error {
            http:Client cl = check new ("https://inventory.example.com");
            return check cl->get("/status");
        }

        worker fetchShipping returns json|error {
            http:Client cl = check new ("https://shipping.example.com");
            return check cl->get("/tracking");
        }
    }

    // Join all results
    record {
        json|error fetchOrders;
        json|error fetchInventory;
        json|error fetchShipping;
    } results = wait {fetchOrders, fetchInventory, fetchShipping};

    json orders = check results.fetchOrders;
    json inventory = check results.fetchInventory;
    json shipping = check results.fetchShipping;

    return {orders, inventory, shipping};
}
```

## Locks

The `lock` statement provides mutual exclusion for accessing shared mutable state. All variables accessed inside a lock block are protected from concurrent modification.

```ballerina
int counter = 0;

function incrementCounter() {
    lock {
        counter += 1;
    }
}

function getCounter() returns int {
    lock {
        return counter;
    }
}
```

### Lock Semantics

| Aspect | Behavior |
|--------|----------|
| Scope | Module-level or object-level mutable variables |
| Granularity | All `lock` blocks in the same scope share the same implicit lock |
| Nesting | Lock blocks can be nested; deadlock-free by design |
| Isolation | `isolated` functions and objects enforce lock discipline at compile time |

### Isolated Functions and Objects

Ballerina's `isolated` qualifier enforces that shared state is always accessed within `lock` blocks at compile time.

```ballerina
isolated int requestCount = 0;

isolated function recordRequest() {
    lock {
        requestCount += 1;
    }
}

isolated class Counter {
    private int value = 0;

    isolated function increment() {
        lock {
            self.value += 1;
        }
    }

    isolated function get() returns int {
        lock {
            return self.value;
        }
    }
}
```

## Transactions

Ballerina has first-class transaction support with `transaction`, `commit`, `rollback`, and `retry` statements.

```ballerina
function transferFunds(string fromAcc, string toAcc, decimal amount) returns error? {
    transaction {
        check debit(fromAcc, amount);
        check credit(toAcc, amount);
        check commit;
    }
}
```

### Transaction with Rollback and On-fail

```ballerina
function processOrder(Order order) returns error? {
    transaction {
        check reserveInventory(order.items);
        check chargePayment(order.payment);
        check createShipment(order.address);

        var result = commit;
        if result is error {
            log:printError("Commit failed", result);
        }
    } on fail error e {
        log:printError("Transaction failed, rolling back", e);
        // Automatic rollback occurs
    }
}
```

### Retry Transactions

```ballerina
function reliableUpdate(string id, json data) returns error? {
    retry transaction {
        check updateExternalService(id, data);
        check commit;
    }
}

// Retry with custom policy
function retryWithBackoff(string id, json data) returns error? {
    retry<retryManager:ExponentialBackoff> (maxRetries = 3, initialDelay = 1) transaction {
        check updateExternalService(id, data);
        check commit;
    }
}
```

### Transaction Statements Reference

| Statement | Description |
|-----------|-------------|
| `transaction { }` | Start a transaction block |
| `commit` | Commit the current transaction; returns `error?` |
| `rollback` | Explicitly roll back the current transaction |
| `retry transaction { }` | Retry the transaction on failure using the default retry policy |
| `retry<T>(...) transaction { }` | Retry with a custom retry manager type and parameters |
| `transactional` | Qualifier for functions that participate in the enclosing transaction |

### Transactional Functions

Functions marked `transactional` execute within the calling transaction context.

```ballerina
transactional function debit(string account, decimal amount) returns error? {
    sql:ExecutionResult _ = check dbClient->execute(
        `UPDATE accounts SET balance = balance - ${amount} WHERE id = ${account}`
    );
}

transactional function credit(string account, decimal amount) returns error? {
    sql:ExecutionResult _ = check dbClient->execute(
        `UPDATE accounts SET balance = balance + ${amount} WHERE id = ${account}`
    );
}
```

## Concurrency Patterns for Integration

### Scatter-Gather

Call multiple services in parallel and aggregate results.

```ballerina
function scatterGather() returns json|error {
    fork {
        worker svcA returns json|error {
            return check httpA->get("/data");
        }
        worker svcB returns json|error {
            return check httpB->get("/data");
        }
    }

    record {json|error svcA; json|error svcB} results = wait {svcA, svcB};
    return {
        a: check results.svcA,
        b: check results.svcB
    };
}
```

### Competing Consumers

Process messages from a queue using multiple workers.

```ballerina
function startConsumers(kafka:Consumer consumer) returns error? {
    foreach int i in 0 ..< 4 {
        _ = start processMessages(consumer, i);
    }
}

function processMessages(kafka:Consumer consumer, int workerId) returns error? {
    while true {
        kafka:ConsumerRecord[] records = check consumer->poll(1);
        foreach var rec in records {
            // Process each record
            check handleRecord(rec, workerId);
        }
    }
}
```

## See Also

- [Ballerina Syntax Quick Reference](syntax.md) -- Core language syntax
- [Error Handling](error-handling.md) -- Error handling patterns
- [Integration-Specific Features](integration-features.md) -- Services, clients, listeners
- [Ballerina by Example](/reference/by-example.md) -- Runnable concurrency examples
