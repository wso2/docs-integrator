---
title: Create a Library
description: Create reusable library packages for sharing common integration logic across projects.
---

# Create a Library

Libraries let you package reusable integration logic — connectors, utility functions, data types, and transformations — so multiple integration projects can share and depend on them.

## Prerequisites

- WSO2 Integrator VS Code extension installed
- Ballerina installed

## When to Use a Library

| Use Case | Example |
|----------|---------|
| **Shared data types** | Common record definitions used across services |
| **Utility functions** | Date formatting, ID generation, validation helpers |
| **Custom connectors** | Organization-specific API wrappers |
| **Transformation logic** | Reusable data mapping functions |

## Create a Library Project

1. Open VS Code and press **Ctrl/Cmd + Shift + P** to open the command palette.
2. Select **WSO2 Integrator: Create New Project**.
3. Choose **Library** as the project type.
4. Enter a name for your library (e.g., `my_org_utils`).
5. Select the project location.

The extension creates a library project with the following structure:

```
my_org_utils/
├── Ballerina.toml
├── Module.md
├── lib.bal
└── tests/
    └── lib_test.bal
```

## Define Public APIs

In a library, only `public` functions, types, and constants are accessible to consumers:

```ballerina
// Public function — accessible to consumers
public function formatDate(time:Utc utc) returns string {
    // ...
}

// Public type — accessible to consumers
public type OrderRecord record {|
    string orderId;
    string customerName;
    decimal amount;
|};

// Private function — internal to the library
function validateInternal(string input) returns boolean {
    // ...
}
```

## Build and Publish

### Build locally

```bash
bal pack
```

### Push to Ballerina Central

```bash
bal push
```

### Use as a local dependency

In the consuming project's `Ballerina.toml`:

```toml
[[dependency]]
org = "my_org"
name = "my_org_utils"
version = "1.0.0"
repository = "local"
```

## What's Next

- [Manage Dependencies](/docs/develop/organize-code/manage-dependencies) — add libraries as dependencies
- [Package References](/docs/develop/organize-code/package-references) — understand package structure
- [Publish to Central](/docs/connectors/publish-to-central) — share with the community
