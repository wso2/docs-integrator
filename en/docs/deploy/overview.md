---
title: Deploy Overview
description: Learn about the different deployment options for your WSO2 Integrator projects and how to choose the right one for your needs.
keywords: [wso2 integrator, deployment, wso2 cloud, docker, kubernetes, vm-based deployment, integration control plane]
---
# Deploy

Once your integration is ready, choose how to ship and run it. WSO2 Integrator supports multiple deployment targets and CI/CD options.

## WSO2 Cloud

Deploy to WSO2 Cloud - Integration Platform, a fully managed SaaS. No infrastructure setup required.

- **[Deploy from the IDE](./cloud/push-from-ide.md)** — Push directly from the locally installed WSO2 Integrator IDE.
- **[Deploy from the cloud editor](./cloud/deploy-from-cloud-editor.md)** — Build and deploy entirely in the browser.
- **[Import a project](./cloud/import-project.md)** — Import an existing project from a Git repository.
- **[Import an integration](./cloud/import-integration.md)** — Import a single integration from an existing repository.

## Self-Hosted

Run your integration on your own infrastructure. Generate Docker images or Kubernetes manifests and deploy to any platform.

- **[VM deployment](./self-hosted/vm-deployment.md)** — Run on your local machine, a VM, or bare-metal server.
- **[Containerized deployment](./self-hosted/containerized-deployment.md)** — Package as a container and deploy to Docker, Kubernetes, or Red Hat OpenShift.
- **[Serverless deployment](../deploy-operate/deploy/serverless-deployment.md)** — Run as serverless functions.
- **[GraalVM native images](../deploy-operate/deploy/graalvm-native-images.md)** — Compile to a native binary for faster startup and lower memory usage.

## CI/CD

Automate your deployment pipeline using your preferred CI/CD platform:

- [GitHub Actions](../deploy-operate/cicd/github-actions.md)
- [Jenkins](../deploy-operate/cicd/jenkins.md)
- [GitLab](../deploy-operate/cicd/gitlab.md)
- [Azure DevOps](../deploy-operate/cicd/azure-devops.md)
