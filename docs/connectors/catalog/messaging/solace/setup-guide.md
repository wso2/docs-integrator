---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a Solace PubSub+ broker and obtaining the connection details required to use the Solace connector.

## Prerequisites

- A Solace PubSub+ broker instance. You can use [Solace Cloud](https://console.solace.cloud/) (free tier available) or run a self-hosted broker via [Docker](https://solace.com/products/event-broker/software/getting-started/).

## Step 1: Set up a Solace pubSub+ broker

**Option A: Solace Cloud (managed service):**
1. Sign up at [console.solace.cloud](https://console.solace.cloud/).
2. Create a new messaging service (select the free plan for development).
3. Wait for the service to be provisioned.

**Option B: Docker (self-hosted):**
1. Run the Solace PubSub+ Standard Edition container:

    ```
    docker run -d -p 8080:8080 -p 55555:55555 -p 55003:55003 -p 55443:55443 \
      --shm-size=2g --env username_admin_globalaccesslevel=admin \
      --env username_admin_password=admin \
      --name=solace solace/solace-pubsub-standard
    ```

2. Access the management console at `http://localhost:8080`.

The Docker image exposes port 55555 for SMF (plain text) and 55443 for SMF over TLS.

## Step 2: Create a message VPN

1. Log in to the Solace management console (PubSub+ Manager).
2. Navigate to **Message VPNs** and click **+ Create Message VPN**.
3. Enter a VPN name (e.g., `my-vpn`) and configure the basic settings.
4. Enable the SMF service and note the assigned port.
5. Click **Apply** to create the VPN.

The default VPN named `default` is pre-configured and ready to use for development. You can skip this step if using the default VPN.

## Step 3: Create a client username

1. In PubSub+ Manager, navigate to your Message VPN.
2. Go to **Access Control** > **Client Usernames**.
3. Click **+ Client Username** and enter a username.
4. Set a password for the client username.
5. Enable the client username and click **Apply**.

## Step 4: Create queues and topics

1. In PubSub+ Manager, navigate to your Message VPN.
2. Go to **Queues** and click **+ Queue** to create a new queue.
3. Enter a queue name (e.g., `my-queue`) and configure settings such as max message size and access type.
4. To subscribe a queue to a topic, select the queue and add a topic subscription under **Subscriptions**.
5. Click **Apply** to save.

For topic-based publish/subscribe without queues, no queue creation is needed: topics are created dynamically when a subscriber connects.

## Step 5: Obtain connection details

Gather the following details for your Ballerina connector configuration:

1. **Broker URL**: The SMF connection URL in the format `smf://<host>:<port>` (or `smfs://<host>:<port>` for TLS). For Solace Cloud, find this under **Connect** > **Solace Messaging** in the service details.
2. **Message VPN**: The VPN name (e.g., `default` or the one you created).
3. **Client Username**: The username created in the previous step.
4. **Client Password**: The password for the client username.

For Solace Cloud, connection details including the SMF host, port, and credentials are available on the service's **Connect** tab.
