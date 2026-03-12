---
sidebar_position: 3
title: Package References & Imports
description: Import and use packages from Ballerina Central, local repositories, and Git sources.
---

# Package References & Imports

Use packages from Ballerina Central, the standard library, and your own local projects to extend your integrations with pre-built connectors, utilities, and shared code. This page covers import syntax, package resolution, and how to reference packages from different sources.

## Import Syntax

Every Ballerina import follows the pattern `org/package` or `org/package.module`.

```ballerina
// Standard library (ballerina org)
import ballerina/http;
import ballerina/io;
import ballerina/log;
import ballerina/time;

// Extended library (ballerinax org -- connectors)
import ballerinax/kafka;
import ballerinax/postgresql;
import ballerinax/salesforce;

// Your organization's packages
import myorg/shared_types;
import myorg/order_service.db;

// Import with alias
import ballerinax/postgresql as pg;
import ballerina/lang.value as val;
```

## Standard Library Packages

The Ballerina standard library (`ballerina/` org) ships with the distribution and requires no additional dependency declaration.

### Common Standard Library Packages

| Package | Purpose |
|---------|---------|
| `ballerina/http` | HTTP client and server |
| `ballerina/io` | File and console I/O |
| `ballerina/log` | Logging framework |
| `ballerina/time` | Date and time operations |
| `ballerina/regex` | Regular expressions |
| `ballerina/crypto` | Cryptographic operations |
| `ballerina/uuid` | UUID generation |
| `ballerina/url` | URL encoding/decoding |
| `ballerina/mime` | MIME type handling |
| `ballerina/cache` | In-memory caching |
| `ballerina/task` | Scheduled tasks and timers |
| `ballerina/file` | File system operations |
| `ballerina/yaml` | YAML processing |
| `ballerina/toml` | TOML processing |
| `ballerina/xmldata` | XML data processing |
| `ballerina/constraint` | Data validation constraints |

### Lang Library

The `ballerina/lang.*` packages provide operations on built-in types.

```ballerina
import ballerina/lang.array;
import ballerina/lang.value;
import ballerina/lang.'string;

public function main() {
    // String operations
    string name = "  Hello World  ";
    string trimmed = name.trim();        // "Hello World"
    string upper = name.toUpperAscii();  // "  HELLO WORLD  "

    // Array operations
    int[] numbers = [3, 1, 4, 1, 5, 9];
    int[] sorted = numbers.sort();       // [1, 1, 3, 4, 5, 9]
    int total = numbers.reduce(
        isolated function (int acc, int val) returns int => acc + val, 0
    );

    // Value operations
    json data = {name: "test"};
    string jsonStr = data.toJsonString();
}
```

## Ballerina Central Packages

Packages from [Ballerina Central](https://central.ballerina.io/) are automatically downloaded when you build your project. Add them by importing in your code.

```ballerina
// Simply import -- the package is resolved automatically
import ballerinax/kafka;
import ballerinax/salesforce;
import ballerinax/openai.chat;
```

On first build, Ballerina resolves the latest compatible version and records it in `Dependencies.toml`.

### Searching for Packages

```bash
# Search Ballerina Central from the CLI
bal search kafka
bal search salesforce
bal search postgresql

# Search with organization filter
bal search ballerinax/
```

### Specifying a Version

Pin a specific version in `Ballerina.toml`.

```toml
[package]
org = "myorg"
name = "order_service"
version = "1.0.0"

[[dependency]]
org = "ballerinax"
name = "kafka"
version = "4.2.0"

[[dependency]]
org = "ballerinax"
name = "postgresql"
version = "1.14.0"
```

## Local Package References

Reference a package from your local file system during development.

### Using Bal Pack + Local Repository

```bash
# In the shared-types package directory
cd /path/to/shared-types
bal pack

# Push to the local repository
bal push --repository local
```

Then import it like any other package:

```ballerina
import myorg/shared_types;
```

### Using Dependencies.toml for Local Path

For active development, reference a local path directly.

```toml
# Dependencies.toml (manual entry for local development)
[[dependency]]
org = "myorg"
name = "shared_types"
version = "1.0.0"
repository = "local"
```

## Importing Submodules

Packages can expose multiple modules. Import specific modules using dot notation.

```ballerina
// Import the chat module from the openai package
import ballerinax/openai.chat;

// Import specific modules from a multi-module package
import ballerinax/aws.s3;
import ballerinax/aws.sqs;
import ballerinax/aws.ses;
```

## Managing Import Aliases

Use aliases to avoid naming conflicts or improve readability.

```ballerina
// Resolve naming conflicts
import ballerinax/postgresql as pg;
import ballerinax/mysql as mysql;

// Shorten long module paths
import ballerinax/salesforce.sobjects as sfdc;
import ballerinax/openai.chat as ai;

pg:Client pgClient = check new (...);
mysql:Client mysqlClient = check new (...);
sfdc:Client sfdcClient = check new (...);
```

## Unused Import Detection

The Ballerina compiler reports unused imports as errors. Remove any imports that your code does not use.

```ballerina
import ballerina/http;
import ballerina/io;    // ERROR: unused import if 'io' is never referenced

service /api on new http:Listener(9090) {
    resource function get health() returns string {
        return "OK";
    }
}
```

## Platform Dependencies (Java Interop)

For packages that use Java libraries, declare platform dependencies in `Ballerina.toml`.

```toml
[package]
org = "myorg"
name = "custom_connector"
version = "1.0.0"

[[platform.java17.dependency]]
groupId = "com.example"
artifactId = "custom-lib"
version = "2.0.0"
```

## Best Practices

- **Use the standard library first** -- check if `ballerina/` packages meet your needs before adding external dependencies
- **Pin dependency versions** in `Ballerina.toml` for production projects to ensure reproducible builds
- **Use meaningful aliases** -- `pg` for PostgreSQL is clear; avoid single-letter aliases that obscure meaning
- **Remove unused imports** -- the compiler enforces this, keeping your code clean
- **Search Central before building custom** -- many common connectors already exist on Ballerina Central

## What's Next

- [Manage Dependencies](manage-dependencies.md) -- Update, lock, and audit dependencies
- [Packages & Modules](packages-modules.md) -- Create your own package structure
- [Workspaces](workspaces.md) -- Develop multiple packages together
