---
title: Azure DevOps
---

# Azure DevOps

Automate build and test of your WSO2 Integrator projects using Azure DevOps Pipelines.

## Overview

Azure DevOps Pipelines provides a fully managed CI/CD service that integrates with Git repositories. For WSO2 Integrator projects built on Ballerina, a pipeline runs tests and builds the package using the official `ballerina/ballerina` Docker image with no manual installation steps required.

## Prerequisites

- An Azure DevOps organization and project
- A Git repository containing your WSO2 Integrator (Ballerina) project

## Pipeline configuration

Create a file named `azure-pipelines.yml` at the root of your repository:

```yaml
# azure-pipelines.yml
trigger:
  branches:
    include:
      - main

pool:
  vmImage: "ubuntu-latest"

container: ballerina/ballerina:latest

steps:
  - script: bal test
    displayName: "Run tests"

  - script: bal build
    displayName: "Build Ballerina project"
```

## Test step details

The pipeline runs inside the `ballerina/ballerina:latest` container, which provides Ballerina and the required JDK with no installation steps.

```yaml
container: ballerina/ballerina:latest

steps:
  - script: bal test
    displayName: "Run tests"
```

## Build step details

The build step compiles the Ballerina project and produces artifacts in the `target/` directory.

```yaml
- script: bal build
  displayName: "Build Ballerina project"
```

## What's next

- [GitHub Actions](github-actions.md) -- CI/CD with GitHub-hosted runners
- [GitLab CI/CD](gitlab.md) -- Pipeline configuration for GitLab
- [Jenkins](jenkins.md) -- Pipeline configuration for Jenkins
