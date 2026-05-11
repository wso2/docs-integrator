---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up an MQTT broker that the Ballerina MQTT connector will connect to.

## Prerequisites

- An MQTT v5 compatible broker. You can use a cloud-hosted broker (e.g., [HiveMQ Cloud](https://www.hivemq.com/mqtt-cloud-broker/), [EMQX Cloud](https://www.emqx.com/en/cloud)) or install one locally (e.g., [Eclipse Mosquitto](https://mosquitto.org/download/)).

## Install or provision an MQTT broker

**Option A: Local broker (Mosquitto):**

1. Download and install [Eclipse Mosquitto](https://mosquitto.org/download/) for your platform.
2. Start the broker with the default configuration:
    ```bash
    mosquitto
    ```
   By default, the broker listens on `tcp://localhost:1883`.

**Option B: Cloud-hosted broker:**

1. Sign up for a managed MQTT service such as [HiveMQ Cloud](https://www.hivemq.com/mqtt-cloud-broker/) or [EMQX Cloud](https://www.emqx.com/en/cloud).
2. Create a new MQTT cluster/instance.
3. Note the broker URL (e.g., `ssl://your-broker.hivemq.cloud:8883`).

For development and testing, a local Mosquitto broker is the quickest way to get started.

## Configure authentication (if required)

If your broker requires authentication:

1. Create a username and password on your broker.
    - **Mosquitto**: Edit the `mosquitto.conf` file to set `allow_anonymous false` and create a password file using `mosquitto_passwd`.
    - **Cloud brokers**: Use the broker's web console to create credentials.
2. Note the **username** and **password**; you will supply these in the connector's `ConnectionConfiguration`.

Many local development brokers allow anonymous connections by default. For production, always enable authentication.

## Configure TLS/SSL (if required)

For secure connections (recommended for production and required by most cloud brokers):

1. Obtain the broker's CA certificate, or configure your own certificates.
    - **Cloud brokers**: Download the CA certificate from the broker's dashboard.
    - **Mosquitto**: Configure TLS by setting `cafile`, `certfile`, and `keyfile` in `mosquitto.conf`.
2. Note the paths to your certificate and key files: you will use these in the connector's `SecureSocket` configuration.
3. Ensure the broker URL uses the `ssl://` scheme (e.g., `ssl://localhost:8883`).

Store certificates and private keys securely. Do not commit them to source control.

## Verify broker connectivity

Test that your broker is reachable:

1. Use an MQTT client tool such as [MQTTX](https://mqttx.app/) or the Mosquitto CLI clients. Start the subscriber first (in one terminal):
    ```bash
    mosquitto_sub -h localhost -t "test/topic"
    ```
   Then, in a second terminal, publish a test message:
    ```bash
    mosquitto_pub -h localhost -t "test/topic" -m "hello"
    ```
   :::note
   Start the subscriber before publishing. Non-retained messages are delivered only to active subscribers: if you publish first, the message will be missed.
   :::
2. Confirm that the message `hello` appears in the subscriber terminal.

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Trigger Reference](trigger-reference.md): Event-driven integration
