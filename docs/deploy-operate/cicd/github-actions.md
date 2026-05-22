---
title: GitHub Actions
---

# GitHub Actions

Automate build and test of your WSO2 Integrator projects using GitHub Actions workflows.

## Overview

GitHub Actions uses YAML workflow files stored in `.github/workflows/` to define CI/CD pipelines. For WSO2 Integrator projects, a workflow uses the [`setup-ballerina`](https://github.com/ballerina-platform/setup-ballerina/) action to install Ballerina, then runs tests and builds the project.

## Prerequisites

- A GitHub repository containing your WSO2 Integrator (Ballerina) project
- GitHub Actions enabled on the repository

## Workflow configuration

Create `.github/workflows/ci.yml` in your repository:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    name: Build & Test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Ballerina
        uses: ballerina-platform/setup-ballerina@v1.1.4
        with:
          version: "2201.13.4"

      - name: Test
        run: bal test

      - name: Build
        run: bal build
```

## Test step details

The [`setup-ballerina`](https://github.com/ballerina-platform/setup-ballerina/) action installs the specified Ballerina version (including the required JDK) with no manual installation steps.

```yaml
- name: Set up Ballerina
  uses: ballerina-platform/setup-ballerina@v1.1.4
  with:
    version: "2201.13.4"

- name: Test
  run: bal test
```

## Build step details

The build step compiles the Ballerina project and produces artifacts in the `target/` directory.

```yaml
- name: Build
  run: bal build
```

## What's next

- [Azure DevOps](azure-devops.md) -- Pipeline configuration for Azure DevOps
- [GitLab CI/CD](gitlab.md) -- Pipeline configuration for GitLab
- [Jenkins](jenkins.md) -- Pipeline configuration for Jenkins
