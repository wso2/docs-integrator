---
connector: true
connector_name: "xero.appstore"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/xero.appstore connector."
---

# Setup Guide

To use the Xero App Store connector, you need the credentials of an existing Xero app that was set up for XASS billing. Apps can no longer enroll in XASS, and a new app has no XASS subscriptions to read. Whether the endpoints still respond for a migrated app is up to Xero, so confirm with Xero developer support before you rely on them. The connector authenticates with the OAuth 2.0 client credentials grant.

## Prerequisites

- A Xero developer account with an existing app that was set up for Xero App Store Subscriptions (XASS) billing.

## Step 1: Open your app in the Xero developer portal

1. Sign in to the [Xero developer portal](https://developer.xero.com/) with the account that owns your XASS app.

2. Open **My Apps** and select the app.

## Step 2: Get the client credentials

1. On the app's **Configuration** page, copy the **Client id**.

2. Select **Generate a secret**, then copy the **Client secret**. Xero shows it only once.

3. The connector requests the `marketplace.billing` scope from `https://identity.xero.com/connect/token`, which is its default token URL.

## Step 3: Find the subscription details

1. Note the ID of the subscription you want to work with. Xero sends it to your app when a customer subscribes.

2. Use the connector's `getSubscription` operation to retrieve the subscription. It returns the subscription items that usage records are reported against.

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
