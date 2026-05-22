---
title: Jenkins
---

# Jenkins

Automate build and test of your WSO2 Integrator projects using Jenkins declarative pipelines.

## Overview

Jenkins provides a flexible CI/CD platform that can be self-hosted or run in the cloud. For WSO2 Integrator projects, a Jenkins pipeline runs tests and builds the Ballerina project using the official `ballerina/ballerina` Docker image as the build agent.

## Prerequisites

- Jenkins server (version 2.387 or later) with the following plugins installed:
  - Pipeline plugin
  - Docker Pipeline plugin
- Docker available on the Jenkins build agents

## Pipeline configuration

Create a `Jenkinsfile` at the root of your repository:

```groovy
// Jenkinsfile
pipeline {
    agent {
        docker {
            image 'ballerina/ballerina:latest'
        }
    }

    stages {
        stage('Test') {
            steps {
                sh 'bal test'
            }
        }

        stage('Build') {
            steps {
                sh 'bal build'
            }
        }
    }
}
```

## Test stage details

The pipeline uses the `ballerina/ballerina:latest` Docker image as its agent, so Ballerina and the required JDK are available with no installation steps.

```groovy
agent {
    docker {
        image 'ballerina/ballerina:latest'
    }
}
```

## Build stage details

The build stage compiles the Ballerina project and produces artifacts in the `target/` directory.

```groovy
stage('Build') {
    steps {
        sh 'bal build'
    }
}
```

## What's next

- [GitHub Actions](github-actions.md) -- CI/CD with GitHub-hosted runners
- [GitLab CI/CD](gitlab.md) -- Pipeline configuration for GitLab
- [Azure DevOps](azure-devops.md) -- Pipeline configuration for Azure DevOps
