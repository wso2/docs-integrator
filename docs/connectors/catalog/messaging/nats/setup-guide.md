---
title: Setup Guide
---

# Setup Guide

This guide walks you through running a NATS server and configuring the Ballerina connector to connect to it.

## Prerequisites

- Docker installed on your machine (for the quickstart approach), or a NATS server binary downloaded from [nats.io](https://nats.io/download/).
- Ballerina Swan Lake installed. See the [Ballerina installation guide](https://ballerina.io/downloads/).
- The `ballerinax/nats` package added to your `Ballerina.toml` dependencies.

## Step 1: Start a NATS server

The fastest way to run a local NATS server is with Docker:

```bash
docker run -d --name nats-server -p 4222:4222 nats:latest
```

Alternatively, download the NATS server binary and run it directly:

```bash
nats-server
```

By default, the server listens on `nats://localhost:4222`.

For production workloads, consider [Synadia Cloud](https://www.synadia.com/cloud) (the managed NATS-as-a-service),
or deploy a NATS cluster with JetStream enabled by passing the `-js` flag: `nats-server -js`.

## Step 2: Enable authentication (optional)

NATS supports several authentication mechanisms. Choose one that fits your deployment:

**Username and Password**

Start the server with credentials:
```bash
nats-server --user admin --pass secret
```

**Token Authentication**

Start the server with a token:
```bash
nats-server --auth mytoken123
```

**No Authentication (Development)**

The default NATS server requires no credentials: omit the `auth` field in your connector config for local development.

For production deployments, use NATS operator/account-based security with NKeys and JWTs. Refer to the [NATS security documentation](https://docs.nats.io/nats-concepts/security) for advanced configurations.

## Step 3: Enable jetStream (optional)

JetStream provides persistent, at-least-once messaging on top of core NATS. To enable it,
start the server with the `-js` flag:

```bash
docker run -d --name nats-js -p 4222:4222 nats:latest -js
```

Or using a config file (`nats-server.conf`):

```
jetstream {
  store_dir: "/data"
  max_mem_store: 1GB
  max_file_store: 10GB
}
```

Then run:
```bash
nats-server -c nats-server.conf
```

JetStream is required only if you use `nats:JetStreamClient` or `nats:JetStreamListener`. Core NATS pub/sub works without it.

## Step 4: Add the dependency

Add the `ballerinax/nats` package to your project's `Ballerina.toml`:

```toml
[[dependency]]
org = "ballerinax"
name = "nats"
version = "3.3.0"
```

Or use the Ballerina CLI:

```bash
bal add ballerinax/nats
```
