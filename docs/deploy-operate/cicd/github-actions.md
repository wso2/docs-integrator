---
title: GitHub Actions
---

# GitHub Actions

Automate build, test, and deployment of your WSO2 Integrator projects using GitHub Actions workflows.

## Overview

GitHub Actions uses YAML workflow files stored in `.github/workflows/` to define CI/CD pipelines. For WSO2 Integrator projects, a workflow uses the [`setup-ballerina`](https://github.com/ballerina-platform/setup-ballerina/) action to install Ballerina, then builds the project, runs tests, creates a Docker image, and deploys to a target environment.

## Prerequisites

- A GitHub repository containing your WSO2 Integrator (Ballerina) project
- A container registry (GitHub Container Registry, Docker Hub, or a cloud provider registry)
- Deployment target configured (Kubernetes, cloud service, or WSO2 Devant)
- Repository secrets configured under **Settings > Secrets and variables > Actions**

## Workflow configuration

Create `.github/workflows/deploy.yml` in your repository:

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}/wso2-integrator-app

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

      - name: Build
        run: bal build

      - name: Run tests
        run: bal test

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-artifacts
          path: target/bin/*.jar

  docker:
    name: Build & Push Docker Image
    runs-on: ubuntu-latest
    needs: build-and-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    permissions:
      contents: read
      packages: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Ballerina
        uses: ballerina-platform/setup-ballerina@v1.1.4
        with:
          version: "2201.13.4"

      - name: Build project
        run: bal build

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: target/docker/wso2-integrator-app/Dockerfile
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest

  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    needs: docker
    environment: production
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up kubectl
        uses: azure/setup-kubectl@v3

      - name: Configure kubeconfig
        run: |
          mkdir -p $HOME/.kube
          echo "${{ secrets.KUBE_CONFIG }}" | base64 -d > $HOME/.kube/config

      - name: Deploy
        run: |
          kubectl set image deployment/wso2-integrator-app \
            app=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
          kubectl rollout status deployment/wso2-integrator-app --timeout=300s
```

## Build step details

The build job uses the [`setup-ballerina`](https://github.com/ballerina-platform/setup-ballerina/) action to install the specified Ballerina version (including the required JDK), then runs `bal build` to compile the project. Build artifacts (the executable JAR) are uploaded for downstream jobs and for manual download.

If your project includes a `Cloud.toml`, the build also generates Docker and Kubernetes artifacts under `target/docker/` and `target/kubernetes/`.

## Test step details

Tests run against the compiled project. The `setup-ballerina` action ensures the correct Ballerina version is available without manual installation steps.

```yaml
- name: Set up Ballerina
  uses: ballerina-platform/setup-ballerina@v1.1.4
  with:
    version: "2201.13.4"

- name: Run tests
  run: bal test
```

To display test results directly in pull request checks, add a test reporting action:

```yaml
- name: Publish test report
  if: always()
  uses: dorny/test-reporter@v1
  with:
    name: Ballerina Tests
    path: target/report/**/TEST-*.xml
    reporter: java-junit
```

## Deploy step details

The deploy job runs after a successful Docker push and uses `kubectl` to roll out the new image. Configure the `production` environment under **Settings > Environments** to add optional approval gates before the deploy runs.

## Secrets management

Configure repository and environment secrets under **Settings > Secrets and variables > Actions**:

| Secret | Scope | Description |
|---|---|---|
| `GITHUB_TOKEN` | Repository (automatic) | Used for GHCR authentication |
| `KUBE_CONFIG` | Environment | Base64-encoded kubeconfig file |
| `DB_PASSWORD` | Environment | Database connection password |
| `API_KEY` | Environment | External service API key |

## Pull request workflow

For pull requests, only the build and test jobs run. Docker build and deployment stages are skipped due to the `if` condition:

```yaml
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
```

This provides fast feedback on code changes without triggering deployments.

## Reusable workflow

For organizations managing multiple Ballerina projects, extract the common pipeline into a reusable workflow:

```yaml
# .github/workflows/ballerina-ci.yml
name: Ballerina CI (Reusable)

on:
  workflow_call:
    inputs:
      bal-version:
        required: false
        type: string
        default: "2201.13.4"

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ballerina-platform/setup-ballerina@v1.1.4
        with:
          version: ${{ inputs.bal-version }}
      - run: bal build
      - run: bal test
```

Call it from other repositories:

```yaml
jobs:
  ci:
    uses: my-org/.github/.github/workflows/ballerina-ci.yml@main
    with:
      bal-version: "2201.13.4"
```

## What's next

- [Azure DevOps](azure-devops.md) -- Pipeline configuration for Azure DevOps
- [GitLab CI/CD](gitlab.md) -- Pipeline configuration for GitLab
- [Jenkins](jenkins.md) -- Pipeline configuration for Jenkins
