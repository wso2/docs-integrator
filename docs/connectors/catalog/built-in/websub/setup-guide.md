---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a WebSub hub subscription so that the Ballerina WebSub connector can receive content distribution events.

## Prerequisites

- Access to a WebSub-compliant hub. If you do not have one, you can use a public hub such as [Google WebSub Hub](https://pubsubhubbub.appspot.com/) or set up your own using the `ballerina/websubhub` module for development.
- A publicly accessible URL (or a tunneling tool such as [ngrok](https://ngrok.com/) for local development) that the hub can send content distribution notifications to.

## Identify the hub and topic URLs

Determine the WebSub hub URL and the topic URL you want to subscribe to:

1. If the publisher advertises WebSub support, check the resource URL's HTTP `Link` headers for `rel="hub"` and `rel="self"` values.
2. Alternatively, consult the publisher's documentation for the hub endpoint and available topic URLs.
3. Note the **hub URL** and **topic URL**; you will need these when configuring the subscriber.

You can use the `websub:DiscoveryService` client to programmatically discover hub and topic URLs from any resource URL that advertises them via HTTP Link headers.

## Set up your callback endpoint

The WebSub hub needs a publicly accessible callback URL to send intent verification requests and content distribution notifications:

1. If deploying to a public server, note the **base URL** where your Ballerina service will be accessible (e.g., `https://my-app.example.com`).
2. For local development, use a tunneling service like [ngrok](https://ngrok.com/) to expose your local port:

    ```
    ngrok http 9090
    ```

3. Note the generated public URL (e.g., `https://abc123.ngrok.io`): this will be your callback base URL.

The hub will send HTTP GET requests for intent verification and HTTP POST requests for content distribution to your callback URL.

## Configure a subscription secret (optional)

For authenticated content distribution, set up an HMAC secret:

1. Generate a random string to use as the subscription **secret** (e.g., using a password generator or `openssl rand -hex 32`).
2. Store the secret securely: you will provide it when configuring the subscriber service.
3. When a secret is configured, the hub will include an `X-Hub-Signature` header in content distribution requests, and the connector will verify the signature automatically.

Using a subscription secret is recommended for production deployments to ensure that content distribution notifications are genuinely from the hub.

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Trigger Reference](trigger-reference.md): Event-driven integration
