---
sidebar_position: 4
title: Manage Dependencies
description: Manage package dependencies using Dependencies.toml, Ballerina Central, and version resolution.
---

# Manage Dependencies

Keep your integration dependencies up-to-date, secure, and reproducible. Ballerina uses `Dependencies.toml` as a lock file to pin exact versions, `Ballerina.toml` for version constraints, and Ballerina Central as the default package registry.

## How Dependency Resolution Works

When you build a Ballerina package, the compiler:

1. Reads `import` statements in your source code
2. Checks `Ballerina.toml` for version constraints
3. Resolves compatible versions from Ballerina Central (or local repository)
4. Locks resolved versions in `Dependencies.toml`
5. Downloads packages to the local cache

```
Source code imports
        ↓
Ballerina.toml constraints
        ↓
Resolve from Central / local
        ↓
Lock in Dependencies.toml
        ↓
Build with exact versions
```

## Dependencies.toml

The `Dependencies.toml` file locks every direct and transitive dependency to an exact version. This file is auto-generated and should be committed to version control.

```toml
# AUTO-GENERATED FILE. DO NOT MODIFY.

[ballerina]
dependencies-toml-version = "2"
distribution-version = "2201.11.0"

[[package]]
org = "ballerina"
name = "http"
version = "2.12.2"

[[package]]
org = "ballerina"
name = "io"
version = "1.6.2"

[[package]]
org = "ballerinax"
name = "kafka"
version = "4.2.0"
dependencies = [
    {org = "ballerina", name = "jballerina.java"},
    {org = "ballerina", name = "log"}
]

[[package]]
org = "ballerinax"
name = "postgresql"
version = "1.14.0"
```

:::caution
Do not manually edit `Dependencies.toml`. Use the CLI commands described below to manage dependencies.
:::

## Adding Dependencies

Dependencies are added by importing them in your source code.

```ballerina
// Adding a new dependency -- just import it
import ballerinax/kafka;
```

```bash
# Build to resolve and lock the new dependency
bal build
# Dependencies.toml is updated automatically
```

### Specifying Version Constraints

Add version constraints in `Ballerina.toml` to control which versions are acceptable.

```toml
[package]
org = "myorg"
name = "order_service"
version = "1.0.0"

# Pin to a specific version
[[dependency]]
org = "ballerinax"
name = "kafka"
version = "4.2.0"

# Pin to a specific version
[[dependency]]
org = "ballerinax"
name = "postgresql"
version = "1.14.0"
```

## Updating Dependencies

### Update All Dependencies

```bash
# Update all dependencies to their latest compatible versions
bal build --sticky=false

# This regenerates Dependencies.toml with updated versions
```

### Update a Specific Dependency

Change the version in `Ballerina.toml` and rebuild.

```toml
# Update kafka version constraint
[[dependency]]
org = "ballerinax"
name = "kafka"
version = "4.3.0"   # Updated from 4.2.0
```

```bash
# Rebuild to resolve the new version
bal build
```

## Removing Dependencies

Remove the `import` statement from your code and rebuild.

```bash
# After removing the import from source code
bal build

# Dependencies.toml is regenerated without the removed package
```

## Using the Local Repository

Push packages to the local repository for development and testing before publishing to Central.

```bash
# Build and push a package to the local repository
cd /path/to/shared-types
bal pack
bal push --repository local

# The package is now available at:
# ~/.ballerina/repositories/local/
```

Reference local packages in the consuming project:

```toml
# Ballerina.toml of the consuming project
[[dependency]]
org = "myorg"
name = "shared_types"
version = "1.0.0"
repository = "local"
```

## Publishing to Ballerina Central

Share your packages with the community or your organization by publishing to Central.

```bash
# 1. Ensure your Ballerina.toml has the correct org, name, version
# 2. Build the package
bal pack

# 3. Push to Ballerina Central
bal push

# Requires authentication -- set your access token:
# Settings.toml at ~/.ballerina/Settings.toml
# [central]
# accesstoken = "your-token-from-central.ballerina.io"
```

## Dependency Tree

View the complete dependency tree to understand transitive dependencies.

```bash
# Show the dependency graph
bal graph

# Example output:
# myorg/order_service:1.0.0
# ├── ballerina/http:2.12.2
# │   ├── ballerina/io:1.6.2
# │   ├── ballerina/mime:2.10.1
# │   └── ballerina/log:2.10.0
# ├── ballerinax/kafka:4.2.0
# │   ├── ballerina/log:2.10.0
# │   └── ballerina/jballerina.java:0.0.0
# └── ballerinax/postgresql:1.14.0
```

## Offline Builds

Build without network access using cached dependencies.

```bash
# Build using only locally cached packages
bal build --offline
```

This is useful for:
- CI/CD environments with restricted network access
- Ensuring builds use only pre-approved packages
- Faster builds when dependencies have not changed

## Dependency Conflicts

When two dependencies require different versions of the same transitive dependency, Ballerina resolves to the latest compatible version.

```
myorg/order_service
├── ballerinax/kafka:4.2.0
│   └── ballerina/log:2.10.0   ← conflict
└── ballerinax/postgresql:1.14.0
    └── ballerina/log:2.9.0    ← conflict

Resolved: ballerina/log:2.10.0 (latest compatible)
```

If automatic resolution fails, pin the conflicting dependency explicitly in `Ballerina.toml`.

## Best Practices

- **Commit `Dependencies.toml`** to version control for reproducible builds
- **Pin versions for production** -- use exact versions in `Ballerina.toml` for stability
- **Update dependencies regularly** -- run `bal build --sticky=false` periodically to pick up security patches
- **Review dependency updates** before merging -- check changelogs for breaking changes
- **Use the local repository** for internal packages that should not be published to Central
- **Run `bal graph`** to audit transitive dependencies before deploying

## What's Next

- [Package References & Imports](package-references.md) -- Import syntax and package sources
- [Workspaces](workspaces.md) -- Multi-package development workflows
- [Packages & Modules](packages-modules.md) -- Package structure fundamentals
