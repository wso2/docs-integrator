---
sidebar_position: 3
title: Library View
description: Build and manage reusable library packages in WSO2 Integrator.
---

# Library View

The Library View is for building reusable modules that multiple integrations can depend on. Libraries contain shared type definitions, utility functions, custom connectors, and data mapper configurations that you publish to Ballerina Central for organization-wide reuse.

## Creating a Library Package

Create a library project using the CLI:

```bash
bal new my-shared-library -t lib
```

This generates a library project structure:

```
my-shared-library/
├── Ballerina.toml
├── Package.md
├── Module.md
└── lib.bal
```

## Library Components

Libraries typically contain:

### Shared Types

```ballerina
// types.bal
public type Customer record {|
    string id;
    string name;
    string email;
    string tier;
|};

public type Order record {|
    string orderId;
    string customerId;
    OrderItem[] items;
    decimal total;
    OrderStatus status;
|};

public type OrderStatus "pending"|"confirmed"|"shipped"|"delivered"|"cancelled";
```

### Utility Functions

```ballerina
// utils.bal
public isolated function formatCurrency(decimal amount, string currency = "USD") returns string {
    return string `${currency} ${amount.toBalString()}`;
}

public isolated function validateEmail(string email) returns boolean {
    return email.includes("@") && email.includes(".");
}
```

### Custom Connectors

```ballerina
// connector.bal
public client class InternalCrmClient {
    private final http:Client httpClient;

    public function init(string baseUrl) returns error? {
        self.httpClient = check new (baseUrl);
    }

    remote function getCustomer(string id) returns Customer|error {
        return check self.httpClient->get("/customers/" + id);
    }
}
```

## Publishing a Library

1. Set your organization in `Ballerina.toml`:

```toml
[package]
org = "myorg"
name = "shared-types"
version = "1.0.0"
```

2. Push to Ballerina Central:

```bash
bal pack
bal push
```

3. Use in other integrations:

```ballerina
import myorg/shared_types;

shared_types:Customer customer = check getCustomer("C001");
```

## What's Next

- [Packages & Modules](/docs/develop/organize-code/packages-modules) -- Understand package structure
- [Publish to Ballerina Central](/docs/connectors/publish-to-central) -- Share your libraries
