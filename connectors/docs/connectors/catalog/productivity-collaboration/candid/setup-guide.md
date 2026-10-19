---
title: Setup Guide
---

# Setup Guide

This guide walks you through obtaining API credentials from Candid to use the connector.

## Prerequisites

- A Candid account with API access. Visit [Candid's website](https://candid.org) to request API trial or production access.

## Step 1: Request API access

1. Go to the [Candid website](https://candid.org) and navigate to the API or developer section.
2. Submit a request for API access. Depending on your use case, you may qualify for trial or production access.
3. Candid will review your request and provide access credentials.

API access may require an existing Candid subscription or partnership. Contact Candid directly for eligibility details.

## Step 2: Obtain your subscription key

1. Once approved, log in to the Candid developer portal.
2. Navigate to your profile or API keys section.
3. Copy your **Subscription Key**; this is the API key used to authenticate all requests.

Store the Subscription Key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 3: Determine your API tier

Candid offers different API products with varying levels of data access:

- **Essentials API**: Search for nonprofits and retrieve summary information.
- **Premier API**: Access detailed nonprofit profiles with financials, people, and DEI data.
- **Charity Check PDF API**: Download IRS compliance verification PDF reports.

Ensure your subscription includes access to the APIs you plan to use.
