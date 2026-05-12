---
title: Setup Guide
---

# Setup Guide

This guide walks you through installing and configuring a RabbitMQ server so you can connect to it with the Ballerina RabbitMQ connector.

## Prerequisites

- A running RabbitMQ server instance. If you do not have one, [download and install RabbitMQ](https://www.rabbitmq.com/download.html) or run it via Docker: `docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management`.

## Step 1: Verify the RabbitMQ server is running

1. Open the RabbitMQ Management UI at `http://localhost:15672` (default credentials: `guest` / `guest`).
2. Confirm the server is running and accessible on the Overview tab.
3. Note the **host** (e.g., `localhost`) and **AMQP port** (default `5672`); you will need these to configure the connector.

The default `guest` user can only connect from `localhost`. For remote connections, create a dedicated user.

## Step 2: Create a user (optional)

If you need a dedicated user for your integration:

1. In the Management UI, go to the **Admin** tab.
2. Under **Add a user**, enter a **Username** and **Password**.
3. Assign a **Tag** (e.g., `administrator` or `management`) as needed.
4. Click **Add user**.
5. Click the newly created user, then under **Permissions**, set the virtual host (default `/`) and click **Set permission**.

Store your RabbitMQ credentials securely. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 3: Configure a virtual host (optional)

Virtual hosts provide logical separation of resources within a single RabbitMQ instance:

1. In the Management UI, go to the **Admin** tab and select **Virtual Hosts**.
2. Click **Add a new virtual host**, enter a name, and click **Add virtual host**.
3. Assign permissions to your user for the new virtual host.

## Step 4: Enable TLS (optional)

For production deployments, enable TLS on the RabbitMQ server:

1. Generate or obtain TLS certificates (CA certificate, server certificate, and private key).
2. Configure TLS in the RabbitMQ configuration file (`rabbitmq.conf` or `advanced.config`):

    ```
    listeners.ssl.default = 5671
    ssl_options.cacertfile = /path/to/ca_certificate.pem
    ssl_options.certfile = /path/to/server_certificate.pem
    ssl_options.keyfile = /path/to/server_key.pem
    ssl_options.verify = verify_peer
    ssl_options.fail_if_no_peer_cert = false
    ```

3. Restart the RabbitMQ server to apply the changes.

When TLS is enabled, the default AMQPS port is `5671`. You will also need to configure the `secureSocket` option in the connector.
