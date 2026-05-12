---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up an Apache Kafka cluster and obtaining the connection details required to use the Kafka connector.

## Prerequisites

- An Apache Kafka cluster (self-hosted or managed). If you do not have one, [download Apache Kafka](https://kafka.apache.org/downloads) and follow the [Kafka Quickstart](https://kafka.apache.org/quickstart) to set up a local cluster.

## Step 1: Start the Kafka broker

1. Download and extract the Apache Kafka binary distribution.
2. Start the ZooKeeper service (if using ZooKeeper-based mode):

    ```
    bin/zookeeper-server-start.sh config/zookeeper.properties
    ```

3. Start the Kafka broker:

    ```
    bin/kafka-server-start.sh config/server.properties
    ```

4. Note the broker's **bootstrap server address**: by default this is `localhost:9092`.

For Kafka 3.3+ you can use KRaft mode instead of ZooKeeper. See the Kafka documentation for KRaft setup instructions.

## Step 2: Create topics

Create the Kafka topics your application will produce to or consume from:

```
bin/kafka-topics.sh --create --topic my-topic --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
```

Verify the topic was created:

```
bin/kafka-topics.sh --list --bootstrap-server localhost:9092
```

## Step 3: Configure authentication (optional)

If your Kafka cluster requires authentication, configure SASL credentials:

1. In the Kafka broker's `server.properties`, enable SASL authentication:

    ```
    listeners=SASL_PLAINTEXT://localhost:9092
    security.inter.broker.protocol=SASL_PLAINTEXT
    sasl.mechanism.inter.broker.protocol=PLAIN
    sasl.enabled.mechanisms=PLAIN
    ```

2. Create a JAAS configuration file with your username and password.
3. Note the **username**, **password**, and **SASL mechanism**; you will use these when configuring the Ballerina connector.

Managed Kafka services (Confluent Cloud, Amazon MSK, Azure Event Hubs) provide their own authentication setup. Consult your provider's documentation for connection details.

## Step 4: Configure SSL/TLS (optional)

For encrypted connections:

1. Generate a CA certificate, server certificate, and key, or obtain them from your PKI. See [Keystores and Truststores](../../../../deploy-operate/secure/keystore-truststore.md) for step-by-step instructions using `keytool`.
2. Configure the broker's `server.properties` with the keystore and truststore paths.
3. Note the **truststore/certificate file path** and **keystore credentials**; you will use these when configuring the Ballerina connector.
