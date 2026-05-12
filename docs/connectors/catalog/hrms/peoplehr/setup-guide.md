---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating a People HR account and obtaining the API key required to use the People HR connector.

## Prerequisites

- An active People HR account. If you do not have one, [sign up at People HR](https://www.peoplehr.com/).

## Step 1: Navigate to API settings

1. Log in to your People HR account.
2. Click on **Settings** in the bottom-left sidebar menu.
3. Select **API** from the Settings sidebar menu.

If you do not see the API option, contact People HR support to request API access for your account.

## Step 2: Create a new API key

1. On the API Key Management page, click the **+** icon to add a new API key.
2. Enter a descriptive **Key Name** (e.g., `Ballerina PeopleHR Connector`).
3. Under **Application Actions**, select the permissions the key should have access to. For full connector functionality, select all actions for **Employee**, **Salary**, **Absence**, **Holiday**, and any other modules you need.
4. Click **Save**.

## Step 3: Copy and store the API key

1. After saving, copy the generated **API Key** from the API Key Management page.
2. Store the API key securely; this is the `apiKey` value you will use to configure the connector.

Store the API key securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply it at runtime.

## Step 4: Optionally restrict by IP address

For enhanced security, you can restrict the API key to specific IP addresses:

1. In the API Key Management page, locate the **IP Restriction** settings for your key.
2. Add the IP addresses from which the connector will make requests.
3. Save your changes.

IP restriction is recommended for production environments to prevent unauthorized use of the API key.
