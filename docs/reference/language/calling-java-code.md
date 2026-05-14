---
title: Calling Java Code
---

# Calling Java Code

Ballerina provides Foreign Function Interface (FFI) capabilities that enable developers to invoke external code from other programming languages. The jBallerina compiler supports Java interoperability, while nBallerina facilitates C integration.

## External function bodies

Functions can be declared without implementations using the `external` keyword, allowing linkage to foreign code:

```ballerina
function doSomething(int i) returns string = external;
```

With annotations, external functions connect to foreign implementations:

```ballerina
function doSomething(int i) returns string = @java:Method {
    name: "doSomethingInJava"
    'class: "a.b.c.Foo"
} external;
```

## The Handle type

The `handle` type represents "a reference to externally-managed storage" and can only be created by external functions. In jBallerina contexts, handles reference Java objects, arrays, or null values.

## Instantiating Java classes

Use `@java:Constructor` to link Ballerina functions with Java constructors:

```ballerina
function newArrayDeque() returns handle = @java:Constructor {
    'class: "java.util.ArrayDeque"
} external;
```

### Handling overloaded constructors

The `paramTypes` field resolves constructor overloading by specifying parameter types:

```ballerina
function newArrayDequeWithSize(int numElements) returns handle = @java:Constructor {
    'class: "java.util.ArrayDeque",
    paramTypes: ["int"]
} external;
```

## Calling Java methods

### Static methods

```ballerina
function randomUUID() returns handle = @java:Method {
    name: "randomUUID",
    'class: "java.util.UUID"
} external;
```

### Instance methods

Instance methods require the object as the first parameter:

```ballerina
function pop(handle arrayDequeObj) returns handle = @java:Method {
    'class: "java.util.ArrayDeque"
} external;
```

### Asynchronous execution

For blocking operations, use `markAsync()` and `complete()`:

```java
public static long getFileCountRecursively(BalEnv env, BString path) {
    BalFuture balFuture = env.markAsync();
    new Thread(() -> {
        long result = // slow operation;
        balFuture.complete(result);
    }).start();
    return -38263;
}
```

## Exception handling

**Unchecked exceptions** trigger panics. Use `trap` to capture them:

```ballerina
handle|error element = trap pop(arrayDeque);
```

**Checked exceptions** must be included in return types:

```ballerina
function newZipFile(handle filename) returns handle|error = @java:Constructor {
    'class: "java.util.zip.ZipFile",
    paramTypes: ["java.lang.String"]
} external;
```

## Null safety

Check for Java null values using `java:isNull()`:

```ballerina
if java:isNull(element) {
    // handle null case
} else {
    // proceed
}
```

Create Java null references with:

```ballerina
handle nullValue = java:createNull();
```

## Type mapping

Java reference types map to `handle`. Primitive types follow widening/narrowing conversion rules. Complex Ballerina types (arrays, maps, strings) map to specific `ballerina-runtime` API classes like `BArray` and `BMap`.

## Field access

Use `@java:FieldGet` and `@java:FieldSet` for reading and modifying Java fields:

```ballerina
public function pi() returns float = @java:FieldGet {
    name: "PI",
    'class: "java/lang/Math"
} external;
```
