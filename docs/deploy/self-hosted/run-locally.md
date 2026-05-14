---
title: Run Locally
---

# Run Your Integration Locally

This page explains how to run a WSO2 Integrator project using the Ballerina CLI. You can run it directly on your local machine during development or on a remote virtual machine for a self-hosted deployment.

:::info Prerequisites
- [Ballerina installed](https://ballerina.io/downloads/) on any machine where you want to run the project
- A WSO2 Integrator project based on Ballerina

## Run locally

To run the project on your local machine:

1. Open a terminal and navigate to the project directory.

    ```bash
    cd my-integration
    ```

2. Start the project.

    ```bash
    bal run
    ```

The Ballerina CLI compiles the project and starts the integration runtime. You will see the program output in the terminal. Integrations with listeners keep running until you terminate it by **`CTRL + C`**

## Run on a VM

To run the project on a remote virtual machine, install the Ballerina distribution on the VM and run the project directly from source using `bal run`.

### Step 1: Push the project to a remote Git repository

From your local machine, push the project to a remote Git repository such as GitHub, GitLab, or Bitbucket.

```bash
git add .
git commit -m "Initial integration project"
git push origin main
```

### Step 2: Clone the repository on the VM

SSH into the target VM and clone the repository.

```bash
git clone https://github.com/your-org/my-integration.git
cd my-integration
```

### Step 3: Start the integration

Run the project using the Ballerina CLI.

```bash
bal run
```

The runtime starts and the integration begins serving traffic on the configured port.

Ballerina must be installed on the VM. Download it from [ballerina.io](https://ballerina.io/downloads/). The version on the VM should match the version used during development.

## What's next

- [Docker](./docker.md) — Build a Docker image from your project using Code to Cloud
- [Kubernetes](./kubernetes.md) — Generate Kubernetes manifests and deploy to a cluster using Code to Cloud
- [Red Hat OpenShift](./openshift.md) — Generate OpenShift manifests and deploy using the `oc` CLI
