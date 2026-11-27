---
connector: true
connector_name: "stripe"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/stripe connector."
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Setup Guide

To use the Stripe connector, you must have a Stripe account and an API token for authentication. Follow the steps below to set up the connector with your Stripe account. If you don't have an account, you can create one by visiting [Stripe Sign Up page](https://dashboard.stripe.com/register) and completing the registration process.

## Prerequisites

- A Stripe account. If you do not have one, [sign up for free](https://dashboard.stripe.com/register)

## Step 1: Log in to Stripe

1. Sign in to your [Stripe dashboard](https://dashboard.stripe.com/login).

## Step 2: Go to the developer portal

1. Click on the **Developers** button in the top-right corner.

    <ThemedImage
        alt="Stripe dashboard with the Developers button"
        sources={{
            light: useBaseUrl('/img/connectors/catalog/finance-accounting/stripe/setup/stripe-dashboard.png'),
            dark: useBaseUrl('/img/connectors/catalog/finance-accounting/stripe/setup/stripe-dashboard.png'),
        }}
    />

## Step 3: Retrieve the secret key

1. Go to **API keys** section in the nav-bar.

    <ThemedImage
        alt="Stripe developer portal with the API keys section"
        sources={{
            light: useBaseUrl('/img/connectors/catalog/finance-accounting/stripe/setup/stripe-developer-portal.png'),
            dark: useBaseUrl('/img/connectors/catalog/finance-accounting/stripe/setup/stripe-developer-portal.png'),
        }}
    />

2. Retrieve the **Secret key**.

    <ThemedImage
        alt="Stripe API keys with the secret key"
        sources={{
            light: useBaseUrl('/img/connectors/catalog/finance-accounting/stripe/setup/stripe-api-keys.png'),
            dark: useBaseUrl('/img/connectors/catalog/finance-accounting/stripe/setup/stripe-api-keys.png'),
        }}
    />

:::note
If you need to have more granular permissions for the keys, you could setup and use `Restricted keys`.
:::

## Next steps

- [Action Reference](action-reference.md): Available operations
- [Example](example.md): Build an integration with the connector
