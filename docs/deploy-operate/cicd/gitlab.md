---
title: GitLab CI/CD
---

# GitLab CI/CD

Automate build and test of your WSO2 Integrator projects using GitLab CI/CD pipelines.

## Overview

GitLab CI/CD uses a `.gitlab-ci.yml` file at the root of your repository to define pipeline stages. For WSO2 Integrator projects, the pipeline runs tests and builds the Ballerina package using the official Ballerina Docker image.

## Prerequisites

- A GitLab project with your WSO2 Integrator (Ballerina) source code
- GitLab Runner available (shared or project-specific)

## Pipeline configuration

Create a `.gitlab-ci.yml` file at the root of your repository:

```yaml
# .gitlab-ci.yml
image: ballerina/ballerina:latest

stages:
  - test
  - build

test:
  stage: test
  script:
    - bal test

build:
  stage: build
  script:
    - bal build
  artifacts:
    paths:
      - target/
    expire_in: 1 hour
```

## Test stage

The test stage runs all test functions defined in your Ballerina project.

```yaml
test:
  stage: test
  script:
    - bal test
```

## Build stage

The build stage compiles the Ballerina project and produces artifacts in the `target/` directory.

```yaml
build:
  stage: build
  script:
    - bal build
  artifacts:
    paths:
      - target/
    expire_in: 1 hour
```

## What's next

- [GitHub Actions](github-actions.md) -- CI/CD with GitHub-hosted runners
- [Azure DevOps](azure-devops.md) -- Pipeline configuration for Azure DevOps
- [Jenkins](jenkins.md) -- Pipeline configuration for Jenkins
