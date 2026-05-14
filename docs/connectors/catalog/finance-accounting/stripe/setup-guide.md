---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a Stripe account and obtaining the API secret key required to use the Stripe connector.

## Prerequisites

- A Stripe account. If you do not have one, [sign up for free](https://dashboard.stripe.com/register).

## Step 1: Log in to the Stripe dashboard

Sign in to your [Stripe dashboard](https://dashboard.stripe.com/login).

## Step 2: Navigate to the developer portal

Select **Developers** in the top-right corner of the Stripe dashboard.

## Step 3: Get your secret key

1. Select **API keys** in the left sidebar.
2. Copy the **Secret key** — this is the token used to authenticate the Stripe connector.

For testing, use the test-mode secret key (prefixed with `sk_test_`). Switch to the live-mode key (prefixed with `sk_live_`) when ready for production.

If you need more granular permissions, use **Restricted keys** instead of the full secret key. Restricted keys let you limit access to specific API resources.

Store your secret key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## What's next

- [Action reference](actions.md): Available operations
