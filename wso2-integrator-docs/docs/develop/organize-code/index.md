---
sidebar_position: 1
title: Organize Code
description: "How do I structure, manage, and maintain my integration codebase?"
---

# Organize Code

Structure your integrations for maintainability, reuse, and team collaboration. This section covers how to organize Ballerina packages and modules, manage dependencies, enforce coding standards, and generate documentation for your integration projects.

## Package & Module Structure

- [Packages & Modules](packages-modules.md) -- Understand the Ballerina package and module hierarchy
- [Package References & Imports](package-references.md) -- Import and use packages from Ballerina Central and local sources
- [Manage Dependencies](manage-dependencies.md) -- Work with Dependencies.toml and version management
- [Workspaces](workspaces.md) -- Organize multi-package projects with workspaces

## Code Quality

- [Style Guide](style-guide.md) -- Follow Ballerina coding conventions and naming standards
- [Static Code Analysis](static-code-analysis.md) -- Detect issues early with the `bal scan` tool

## Documentation

- [Generate Documentation](generate-documentation.md) -- Create API documentation from your source code

## Quick Reference: Project Layout

A well-organized Ballerina integration project follows this structure:

```
my-integration/
├── Ballerina.toml            # Package manifest
├── Dependencies.toml         # Locked dependency versions (auto-generated)
├── main.bal                  # Entry point (for automation triggers)
├── service.bal               # Service definitions
├── types.bal                 # Shared record types
├── transformations.bal       # Data transformation functions
├── utils.bal                 # Utility functions
├── modules/
│   ├── db/                   # Database operations submodule
│   │   ├── Module.md
│   │   ├── queries.bal
│   │   └── tests/
│   │       └── query_test.bal
│   └── notifications/        # Notification submodule
│       ├── Module.md
│       ├── email.bal
│       └── tests/
│           └── email_test.bal
├── resources/
│   └── config-schema.json    # Resource files
├── tests/
│   ├── Config.toml           # Test-specific configuration
│   ├── service_test.bal      # Integration tests
│   └── resources/
│       └── test-data.json    # Test data files
└── .github/
    └── workflows/
        └── ci.yml            # CI/CD pipeline
```

## When to Split Code

| Signal | Action |
|--------|--------|
| File exceeds 300 lines | Split into logical files by concern |
| Functions used across services | Extract into a shared module |
| Team members frequently merge-conflict on same file | Split by ownership boundary |
| Code could be reused in other projects | Create a separate package and publish to Central |
| Tests need different setup/teardown | Use test groups and separate test files |

## What's Next

Start with [Packages & Modules](packages-modules.md) to understand the fundamental building blocks of Ballerina project organization.
