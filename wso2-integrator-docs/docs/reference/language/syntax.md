---
sidebar_position: 1
title: Ballerina Syntax Quick Reference
description: Cheat sheet of Ballerina syntax for integration developers.
---

# Ballerina Syntax Quick Reference

A cheat sheet for integration developers — not a full language tutorial. For deep dives, see the [Ballerina documentation](https://ballerina.io/learn/).

## Variables and Types

```ballerina
// Primitive types
int count = 42;
float price = 19.99;
string name = "WSO2";
boolean active = true;

// Optional types
string? middleName = ();

// Union types
int|string identifier = "ABC-123";
```

## Records

```ballerina
type Customer record {
    string name;
    string email;
    int? age;
};
```

## Functions

```ballerina
function greet(string name) returns string {
    return "Hello, " + name;
}
```

## Services

```ballerina
service /api on new http:Listener(8080) {
    resource function get hello() returns string {
        return "Hello, World!";
    }
}
```

## Error Handling

```ballerina
do {
    json result = check callExternalAPI();
} on fail error e {
    log:printError("API call failed", e);
}
```

## Control Flow

```ballerina
// If/else
if age >= 18 {
    // adult
} else {
    // minor
}

// Match
match status {
    "active" => { /* ... */ }
    "inactive" => { /* ... */ }
    _ => { /* default */ }
}

// Foreach
foreach var item in items {
    // process item
}
```
