---
title: Azure DevOps
---

# Azure DevOps

Automate build, test, and deployment of your WSO2 Integrator projects using Azure DevOps Pipelines.

## Overview

Azure DevOps Pipelines provides a fully managed CI/CD service that integrates with Git repositories. For WSO2 Integrator projects built on Ballerina, a typical pipeline includes building the Ballerina package, running tests, creating a Docker image, and deploying to a target environment such as Azure Kubernetes Service (AKS) or Azure Container Apps.

## Prerequisites

Before configuring the pipeline, ensure the following are in place:

- An Azure DevOps organization and project
- A Git repository containing your WSO2 Integrator (Ballerina) project
- An Azure Container Registry (ACR) for storing Docker images
- A target deployment environment (AKS cluster, Container Apps, or VM)
- A service connection configured in Azure DevOps for your Azure subscription

## Pipeline configuration

Create a file named `azure-pipelines.yml` at the root of your repository:

```yaml
# azure-pipelines.yml
trigger:
  branches:
    include:
      - main
      - release/*

variables:
  acrName: "myregistry.azurecr.io"
  imageName: "wso2-integrator-app"
  imageTag: "$(Build.BuildId)"

stages:
  - stage: Build
    displayName: "Build & Test"
    jobs:
      - job: BuildJob
        pool:
          vmImage: "ubuntu-latest"
        container: ballerina/ballerina:latest
        steps:
          - script: bal build
            displayName: "Build Ballerina project"

          - script: bal test
            displayName: "Run tests"

          - task: PublishTestResults@2
            inputs:
              testResultsFormat: "JUnit"
              testResultsFiles: "**/target/report/**/TEST-*.xml"
            condition: always()
            displayName: "Publish test results"

  - stage: Docker
    displayName: "Build & Push Docker Image"
    dependsOn: Build
    jobs:
      - job: DockerJob
        pool:
          vmImage: "ubuntu-latest"
        container: ballerina/ballerina:latest
        steps:
          - script: bal build
            displayName: "Build Ballerina project"

          - task: Docker@2
            inputs:
              containerRegistry: "AzureContainerRegistryConnection"
              repository: "$(imageName)"
              command: "buildAndPush"
              Dockerfile: "target/docker/$(imageName)/Dockerfile"
              tags: |
                $(imageTag)
                latest
            displayName: "Build and push Docker image"

  - stage: Deploy
    displayName: "Deploy to AKS"
    dependsOn: Docker
    condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
    jobs:
      - deployment: DeployToAKS
        environment: "production"
        pool:
          vmImage: "ubuntu-latest"
        strategy:
          runOnce:
            deploy:
              steps:
                - task: KubernetesManifest@0
                  inputs:
                    action: "deploy"
                    kubernetesServiceConnection: "AKSConnection"
                    namespace: "integrations"
                    manifests: |
                      k8s/deployment.yaml
                      k8s/service.yaml
                    containers: |
                      $(acrName)/$(imageName):$(imageTag)
                  displayName: "Deploy to AKS"
```

## Build step details

The build stage runs inside the `ballerina/ballerina:latest` container, which provides Ballerina and the required JDK with no installation steps. The `bal build` command resolves dependencies from Ballerina Central, compiles the code, and produces artifacts in the `target/` directory.

If your project uses a `Cloud.toml` file for Docker or Kubernetes artifact generation, `bal build` also generates the corresponding Dockerfile and Kubernetes manifests automatically.

```yaml
container: ballerina/ballerina:latest
steps:
  - script: bal build
    displayName: "Build Ballerina project"
```

## Test step details

Running `bal test` executes all test functions in your project. The job runs inside the same `ballerina/ballerina:latest` container so no additional setup is needed.

```yaml
- script: bal test
  displayName: "Run tests"
```

Test results are written in JUnit XML format under `target/report/`, which the `PublishTestResults` task picks up automatically.

## Deploy step details

The deployment stage uses Kubernetes manifests stored in your repository. A minimal deployment manifest for your integration service:

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wso2-integrator-app
  namespace: integrations
spec:
  replicas: 2
  selector:
    matchLabels:
      app: wso2-integrator-app
  template:
    metadata:
      labels:
        app: wso2-integrator-app
    spec:
      containers:
        - name: app
          image: myregistry.azurecr.io/wso2-integrator-app:latest
          ports:
            - containerPort: 9090
          env:
            - name: BAL_CONFIG_FILES
              value: "/config/Config.toml"
          volumeMounts:
            - name: config
              mountPath: /config
      volumes:
        - name: config
          configMap:
            name: integrator-config
```

## Secrets management

Store sensitive values such as registry credentials, database passwords, and API keys as Azure DevOps pipeline variables or variable groups. Mark variables as secret to prevent them from appearing in logs.

```yaml
variables:
  - group: "integrator-secrets"
  - name: dbPassword
    value: $(DB_PASSWORD)
```

Reference these in your `Config.toml` via environment variable overrides at runtime:

```toml
[myModule]
dbPassword = "${DB_PASSWORD}"
```

In the pipeline, pass secrets as environment variables to the container:

```yaml
- script: bal test
  env:
    DB_PASSWORD: $(dbPassword)
  displayName: "Run tests with secrets"
```

## What's next

- [GitHub Actions](github-actions.md) -- CI/CD with GitHub-hosted runners
- [GitLab CI/CD](gitlab.md) -- Pipeline configuration for GitLab
- [Jenkins](jenkins.md) -- Pipeline configuration for Jenkins
