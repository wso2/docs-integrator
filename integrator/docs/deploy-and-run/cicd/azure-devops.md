---
title: Azure DevOps
---

# Azure DevOps

Automate build and test of your WSO2 Integrator projects using Azure DevOps Pipelines.

## Overview

Azure DevOps Pipelines provides a fully managed CI/CD service that integrates with Git repositories. For WSO2 Integrator projects built on Ballerina, a pipeline installs Ballerina on the Microsoft-hosted Ubuntu agent, then runs tests and builds the package.

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

steps:
  - script: |
      wget -q https://dist.ballerina.io/downloads/2201.14.0/ballerina-2201.14.0-swan-lake-linux-x64.deb
      sudo dpkg -i ballerina-2201.14.0-swan-lake-linux-x64.deb
    displayName: "Install Ballerina"

  - script: bal test
    displayName: "Run tests"

  - script: bal build
    displayName: "Build Ballerina project"
```

## Test step details

The pipeline installs Ballerina from the official Linux installer, which includes the Java runtime that Ballerina needs, and then runs the tests.

The pipeline doesn't use the `ballerina/ballerina` image as a container job. That image is based on Alpine Linux, which doesn't meet the [Azure Pipelines requirements for Linux container jobs](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/container-phases?view=azure-devops#requirements-for-container-jobs).

```yaml
steps:
  - script: |
      wget -q https://dist.ballerina.io/downloads/2201.14.0/ballerina-2201.14.0-swan-lake-linux-x64.deb
      sudo dpkg -i ballerina-2201.14.0-swan-lake-linux-x64.deb
    displayName: "Install Ballerina"

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
