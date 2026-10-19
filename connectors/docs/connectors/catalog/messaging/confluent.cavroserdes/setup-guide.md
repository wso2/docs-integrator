---
title: Setup Guide
---

# Setup Guide

This guide walks you through enabling the Confluent Schema Registry on Confluent Cloud and obtaining the credentials required to use the Confluent Avro SerDes connector.

## Prerequisites

- A Confluent Cloud account. If you do not have one, [sign up for a free trial](https://www.confluent.io/confluent-cloud/).
- An active Confluent Cloud environment with a Kafka cluster created.

## Step 1: Enable schema registry for your environment

Confluent Cloud provides one Schema Registry per environment. To enable it:

1. Log in to [Confluent Cloud](https://confluent.cloud/).
2. In the left navigation, select **Environments** and click your target environment.
3. On the environment page, locate the **Schema Registry** panel on the right side.
4. Click **Enable Schema Registry** (if not already active) and select the cloud provider
   and region closest to your Kafka cluster.
5. Click **Enable**.

Schema Registry is enabled per environment, not per cluster. All clusters in the same environment share the same Schema Registry endpoint.

## Step 2: Retrieve the schema registry endpoint URL

1. In Confluent Cloud, navigate to your environment.
2. In the **Schema Registry** panel on the right side of the environment page, copy the
   **Endpoint** URL. It follows the format:

    ```
    https://<region>.<cloud-provider>.confluent.cloud
    ```

This is the `baseUrl` you will use when initializing the `cregistry:Client`.

## Step 3: Create schema registry API keys

1. In the **Schema Registry** panel on the environment page, click **View & manage schemas**
   or navigate to **Schema Registry** > **API Keys**.
2. Click **Add key** (or **+ Add API key**).
3. Select the appropriate access level:
   - **Global access**: grants read/write access to all subjects.
   - **Granular access**: restricts to specific subjects or operations.
4. Click **Next**, then click **Download and continue** to save your API key and secret.
   Store these securely: the secret is shown only once.

Store the API key and secret securely. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime rather than hard-coding them in your source.

## Step 4: Configure schema registry authentication properties

The `cregistry:Client` accepts authentication details through the `originals` map using
standard Confluent Schema Registry client properties. Set the following keys in your
`originals` configuration:

| Property key | Value |
|---|---|
| `schema.registry.url` | Your Schema Registry endpoint URL |
| `basic.auth.credentials.source` | `USER_INFO` |
| `schema.registry.basic.auth.user.info` | `<API_KEY>:<API_SECRET>` (colon-separated) |

In your `Config.toml`, supply these as a TOML inline table under the `originals` key.

If you are using a self-hosted Confluent Platform Schema Registry without authentication, you can omit the `basic.auth.credentials.source` and `schema.registry.basic.auth.user.info` properties and provide only `schema.registry.url`.
