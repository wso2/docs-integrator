---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a Milvus instance and obtaining the connection details required to use the Milvus connector.

## Prerequisites

- A running Milvus instance. You can [deploy Milvus locally using Docker](https://milvus.io/docs/install_standalone-docker.md) or use the managed [Zilliz Cloud](https://zilliz.com/) service.

## Step 1: Start a Milvus instance

**Option A: Local with Docker:**

1. Download the Milvus standalone Docker Compose file:

    ```
    wget https://github.com/milvus-io/milvus/releases/download/v2.4.0/milvus-standalone-docker-compose.yml -O docker-compose.yml
    ```

2. Start Milvus:

    ```
    docker compose up -d
    ```

3. The Milvus service will be available at `localhost:19530`.

**Option B: Zilliz Cloud (managed):**

1. Sign up at [Zilliz Cloud](https://cloud.zilliz.com/).
2. Create a new cluster and select your preferred cloud provider and region.
3. Once the cluster is running, note the **Public Endpoint** URL (e.g., `https://your-cluster.api.gcp-us-west1.zillizcloud.com`).

For development and testing, the Docker-based local deployment is the quickest way to get started.

## Step 2: Configure authentication (optional)

Milvus supports two authentication methods:

**Token-based authentication:**

1. If your Milvus instance has authentication enabled, obtain an API token from your Milvus admin or Zilliz Cloud dashboard.
2. In Zilliz Cloud, navigate to your cluster and copy the **API Key** from the cluster details page.

**Username and password:**

1. If using the built-in credential authentication, use the default credentials (`root` / `Milvus`) or create a new user through the Milvus CLI or admin tools.

Authentication is optional for local Milvus deployments but required for Zilliz Cloud.

## Step 3: Note your connection details

Gather the following information for connector configuration:

- **Service URL**: The Milvus gRPC endpoint (e.g., `http://localhost:19530` for local, or the Zilliz Cloud endpoint).
- **Authentication credentials**: Either an API token or username/password, depending on your setup.
- **Database name** (optional): If using a non-default database, note its name.
