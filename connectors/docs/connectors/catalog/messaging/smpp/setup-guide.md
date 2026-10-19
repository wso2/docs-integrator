---
title: Setup Guide
---

# Setup Guide

This guide walks you through the SMSC configuration required before using the SMPP connector.

## Prerequisites

- An account with an SMSC, carrier, or aggregator that exposes SMPP (either a production short code/sender ID, or a test account from a provider with a free SMPP sandbox)

## Obtain SMSC connection details

Gather the following from your SMSC provider:

- **Host**: the SMSC's hostname or IP address
- **Port**: the SMSC's SMPP port. `2775` is the common default; your provider may use a different port
- **System ID**: the SMPP `system_id` (username) used to bind
- **Password**: the password used to bind

Ask your provider which bind type your account is provisioned for: `TRANSMITTER` (send only), `RECEIVER` (receive only), or `TRANSCEIVER` (both on one session). A `Client` can use any of the three; a `Listener` accepts only `RECEIVER` or `TRANSCEIVER`.

## (Optional) Obtain TLS material

If your SMSC offers SMPP over TLS (recommended, since a plaintext bind sends `system_id`/`password` in cleartext), also obtain:

- A PKCS12/JKS truststore, or a PEM CA certificate, that verifies the SMSC's server certificate
- For mutual TLS, a PKCS12/JKS keystore containing your client certificate and key

## Next steps

- [Action Reference](action-reference.md) - Available operations
- [Trigger Reference](trigger-reference.md) - Event-driven integration
