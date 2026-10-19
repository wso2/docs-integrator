---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a Solace PubSub+ broker and obtaining the connection details required to use the Solace connector.

## Prerequisites

- A Solace PubSub+ broker instance. You can use [Solace Cloud](https://console.solace.cloud/) (free tier available) or run a self-hosted broker with [Docker](https://solace.com/products/event-broker/software/getting-started/).

## Step 1: Set up a Solace PubSub+ broker

**Option A: Solace Cloud (managed service):**
1. Sign up at [console.solace.cloud](https://console.solace.cloud/).
2. Create a new messaging service (select the free plan for development).
3. Wait for the service to be provisioned.

**Option B: Docker (self-hosted):**
1. Run the Solace PubSub+ Standard Edition container:

    ```
    docker run -d --name solace \
      -p 55554:55555 -p 55003:55003 -p 8080:8080 \
      --shm-size=1g \
      -e username_admin_globalaccesslevel=admin \
      -e username_admin_password=admin \
      solace/solace-pubsub-standard:latest
    ```

2. Access the management console at `http://localhost:8080`.

The Docker image maps container port 55555 (SMF) to host port 55554 in this command, so the client connects on `tcp://localhost:55554`. Adjust the port mapping if 55554 is already in use.

## Step 2: Create a message VPN

1. Log in to the Solace management console (PubSub+ Manager).
2. Navigate to **Message VPNs** and select **+ Create Message VPN**.
3. Enter a VPN name (for example, `my-vpn`) and configure the basic settings.
4. Enable the SMF service and note the assigned port.
5. Select **Apply** to create the VPN.

The default VPN named `default` is pre-configured and ready to use for development. You can skip this step if you're using the default VPN.

## Step 3: Create a client username

1. In PubSub+ Manager, navigate to your message VPN.
2. Go to **Access Control** > **Client Usernames**.
3. Select **+ Client Username** and enter a username.
4. Set a password for the client username.
5. Enable the client username and select **Apply**.

## Step 4: Provision queues and topic endpoints

Unlike some messaging connectors, the Solace connector doesn't create durable queues or durable topic endpoints on the broker automatically. Provision every durable destination before your integration connects to it.

1. In PubSub+ Manager, navigate to your message VPN.
2. Go to **Queues** and select **+ Queue** to create a new durable queue.
3. Enter a queue name (for example, `my-queue`) and configure settings such as the access type and permissions.
4. To route messages published on a topic into the queue, select the queue and add a topic subscription under **Subscriptions**.
5. Select **Apply** to save.

Non-durable subscriptions don't need this step: a temporary topic endpoint is created automatically when the consumer or listener connects, and it's removed when the connection closes.

## Step 5: Obtain connection details

Gather the following details for your Ballerina connector configuration:

1. **Broker URL**: The SMF connection URL in the format `tcp://<host>:<port>` (or `tcps://<host>:<port>` for TLS). For Solace Cloud, find this under **Connect** > **Solace Messaging** in the service details.
2. **Message VPN**: The VPN name (for example, `default` or the one you created).
3. **Client Username**: The username created in the previous step.
4. **Client Password**: The password for the client username.

For Solace Cloud, the SMF host, port, and credentials are available on the service's **Connect** tab.
