---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a Milvus instance and obtaining the connection details required to use the Milvus connector. You can use a local Docker instance or the managed Zilliz Cloud service.

## Prerequisites

- A running Milvus instance (Docker or Zilliz Cloud).

## Option 1: Local instance with Docker

1. Ensure Docker is installed on your system.
2. Start a Milvus standalone instance:

   ```bash
   curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
   bash standalone_embed.sh start
   ```

   :::note
   The script URL above points to the `master` branch. For a version-pinned installation command specific to your target release, refer to the official Milvus documentation:
   - **Linux/macOS**: [Run Milvus in Docker](https://milvus.io/docs/install_standalone-docker.md)
   - **Windows**: [Run Milvus in Docker on Windows](https://milvus.io/docs/install_standalone-windows.md)
   :::

3. The default connection endpoint is `http://localhost:19530`.

## Option 2: Managed instance with Zilliz Cloud

1. Visit [Zilliz Cloud](https://cloud.zilliz.com/) and create an account.

   ![Zilliz Cloud sign up](/img/connectors/catalog/ai-ml/milvus/setup/sign_up.png)

2. Complete the account setup process.

   ![Account setup](/img/connectors/catalog/ai-ml/milvus/setup/setup_account.png)

3. From the welcome page, select **Create Cluster**.

   ![Welcome page](/img/connectors/catalog/ai-ml/milvus/setup/welcome_page.png)

4. Configure cluster details including cluster name, cloud provider, and region.

   ![Configure cluster](/img/connectors/catalog/ai-ml/milvus/setup/create_cluster.png)

5. Once the cluster is created, download the connection details and credentials.

   ![Cluster creation complete](/img/connectors/catalog/ai-ml/milvus/setup/cluster_creation.png)

6. Navigate to the **API Keys** section in your cluster dashboard and generate an API key for authentication.

Store the API key and endpoint securely. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## What's next

- [Action reference](actions.md): Available operations
