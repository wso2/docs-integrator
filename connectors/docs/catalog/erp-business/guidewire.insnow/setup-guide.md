---
title: Setup Guide
---

# Setup Guide

This guide walks you through obtaining the credentials required to connect to the Guidewire InsuranceNow REST API.

## Prerequisites

- An active Guidewire InsuranceNow environment (sandbox or production) provisioned by your organization or Guidewire.
- An InsuranceNow user account with API access permissions granted by your system administrator.

## Step 1: Obtain your insuranceNow environment URL

1. Contact your Guidewire InsuranceNow administrator or implementation team.
2. Obtain the base URL for your InsuranceNow REST API environment. It typically follows the pattern:

    ```
    https://<your-instance>.insurancenow.com/api/v5
    ```

3. Confirm whether you have access to a **sandbox** (testing) or **production** environment.

Use a sandbox environment for development and testing before connecting to production.

## Step 2: Configure API user credentials

The InsuranceNow REST API supports authentication via username/password (basic credentials) or bearer tokens.

**For username/password authentication:**

1. Log in to the InsuranceNow administration console.
2. Navigate to **Security > Users** (or ask your administrator).
3. Create or identify a service account user with the necessary API permissions.
4. Note the **username** and **password** for this account.

**For bearer token authentication:**

1. Obtain a bearer token from your InsuranceNow identity provider or authentication endpoint.
2. Consult your organization's Guidewire administrator for the token generation process, as it varies by deployment.

The authentication method available depends on your InsuranceNow deployment configuration. Contact your Guidewire administrator for the recommended approach.

## Step 3: Verify API access

1. Test your credentials by making a simple API call to the InsuranceNow environment:

    ```
    GET https://<your-instance>.insurancenow.com/api/v5/addresses/countries
    ```

2. If you receive a successful response with a list of countries, your credentials and access are correctly configured.
3. If you receive a `401 Unauthorized` or `403 Forbidden` error, contact your administrator to verify your user permissions.

Store your credentials securely. Do not commit usernames, passwords, or tokens to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## What's next

- [Action reference](actions.md): Available operations
