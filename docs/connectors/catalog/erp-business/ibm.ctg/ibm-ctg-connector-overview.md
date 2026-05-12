---
title: Overview
---

# Overview

IBM CICS Transaction Gateway (CTG) is enterprise middleware that connects distributed applications to IBM CICS Transaction Servers running on mainframe systems. The Ballerina `ballerinax/ibm.ctg` connector (v0.1.1) enables integration with IBM CICS programs using the External Call Interface (ECI) protocol, allowing you to invoke CICS programs and exchange COMMAREA data directly from Ballerina integration flows. The connector wraps the IBM CTG Java client libraries (v9.3) via Ballerina-Java interop and is GraalVM native image compatible.

## Key features

- Invoke CICS programs on IBM mainframe systems via the ECI (External Call Interface) protocol
- Pass and receive raw COMMAREA data to and from CICS programs
- Authenticate with CICS servers using user ID and password credentials
- Secure connectivity via SSL/TLS with keyring-based certificate management and configurable cipher suites
- Configurable socket connect timeout and per-request ECI timeout
- Application-level tracing support for debugging ECI interactions
- GraalVM native image compatible for cloud-native and containerized deployments

## Actions

Actions are operations you invoke on IBM CICS from your Ballerina integration. Use these actions for executing CICS programs with COMMAREA input/output and managing the gateway connection lifecycle. The IBM CTG connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | CICS program execution via ECI, connection lifecycle management |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through the server-side configuration required to connect the IBM CTG connector to your IBM CICS Transaction Gateway and CICS server.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **IBM CTG** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [IBM CTG Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-ibm.ctg)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
