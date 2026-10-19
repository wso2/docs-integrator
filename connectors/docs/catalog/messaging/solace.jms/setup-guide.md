---
title: Setup Guide
---

# Setup Guide

The `ballerinax/solace.jms` connector talks to the same Solace PubSub+ broker as the `ballerinax/solace` (JCSMP) connector — only the client API differs. If you already have a broker, message VPN, client username, and provisioned queues or topics set up for the Solace connector, you can reuse them here as-is.

For broker setup, message VPN creation, client username creation, and queue/topic provisioning, follow the [Solace connector Setup Guide](../solace/setup-guide.md). Then come back here for the two details that differ for `ballerinax/solace.jms`.

## Broker URL scheme

The Solace JMS connector uses the SMF protocol with a **`smf://`** (plain-text) or **`smfs://`** (TLS) URL scheme, instead of the JCSMP connector's `tcp://`/`tcps://`:

```
smf://<host>:<port>
```

For a broker started with the [Docker command in the Solace connector setup guide](../solace/setup-guide.md#step-1-set-up-a-solace-pubsub-broker), the connection URL is `smf://localhost:55554`.

## Acknowledgement modes

`ballerinax/solace.jms` uses standard JMS session acknowledgement modes, configured through the `ackMode` field on the consumer's subscription configuration or the service's `@jms:ServiceConfig`:

| Mode | Description |
|------|-------------|
| `AUTO_ACKNOWLEDGE` | The session automatically acknowledges a message once it's been received (the default). |
| `CLIENT_ACKNOWLEDGE` | The application acknowledges a message explicitly by calling `ack`. |
| `DUPS_OK_ACKNOWLEDGE` | The session acknowledges messages lazily, which can result in duplicate deliveries after a failure. |
| `SESSION_TRANSACTED` | Messages are received within a session-transacted unit of work, committed or rolled back explicitly. Requires `directTransport: false`. |

Everything else — the broker instance, message VPN, client username and password, and queue/topic provisioning — is exactly as described in the [Solace connector Setup Guide](../solace/setup-guide.md).
