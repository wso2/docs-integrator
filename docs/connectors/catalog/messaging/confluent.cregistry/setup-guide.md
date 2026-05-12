---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a Confluent Schema Registry instance and obtaining the credentials required to use the connector.

## Prerequisites

- A Confluent Cloud account. If you do not have one, [sign up for a free trial at Confluent](https://www.confluent.io/confluent-cloud/tryfree/).

## Step 1: Create an environment and Kafka cluster

1. Log in to the [Confluent Cloud Console](https://confluent.cloud/).
2. Create a new **Environment** (or use the default).
3. Inside the environment, create a **Kafka Cluster** (the Basic tier is sufficient for development).
4. Wait for the cluster to be provisioned.

## Step 2: Enable schema registry

1. In your environment, navigate to **Schema Registry** in the left sidebar.
2. Select a cloud provider and region for the Schema Registry instance.
3. Click **Enable Schema Registry**.
4. Once enabled, copy the **Schema Registry endpoint URL**; this is your `baseUrl` (e.g., `https://psrc-xxxxx.us-east-2.aws.confluent.cloud`).

Schema Registry is enabled at the environment level. All clusters within the environment share the same Schema Registry instance.

## Step 3: Create schema registry API key and secret

1. In the Schema Registry section, click **API credentials** or navigate to **API Keys**.
2. Click **Add Key** and select **Schema Registry** as the resource scope.
3. Copy the generated **API Key** and **API Secret**.

Store the API Key and API Secret securely. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 4: Configure SSL truststore (if required)

If your Schema Registry instance requires SSL/TLS with a custom certificate authority:

1. Download the CA certificate from Confluent Cloud or your self-managed Schema Registry.
2. Import it into a Java truststore:

    ```
    keytool -import -trustcacerts -alias ConfluentCA -file ca-cert.pem -keystore truststore.jks -storepass <password>
    ```

3. Note the truststore file path and password for use in the connector configuration.

For Confluent Cloud with standard certificates, a custom truststore is typically not required.
