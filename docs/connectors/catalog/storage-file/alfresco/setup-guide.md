---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Alfresco account and obtaining the Basic Authentication credentials required to use the Alfresco connector.

## Prerequisites

- An active Alfresco Content Services instance. If you do not have one, [sign up for a free trial](https://www.alfresco.com/try-alfresco-acs).

## Step 1: Set up your Alfresco environment

1. Go to [Alfresco's trial page](https://www.alfresco.com/try-alfresco-acs) and register for an account.
2. Once registered, you will receive an email with instructions to set up your Alfresco environment.
3. Follow the instructions to provision your Alfresco Content Services instance.

If you are using a self-hosted Alfresco deployment, ensure that the Alfresco REST API is enabled and accessible.

## Step 2: Obtain your credentials

1. After your environment is set up, note the default **username** and **password** provided in the setup email or configured during installation.
2. For self-hosted deployments, the default admin credentials are typically `admin` / `admin`: change these immediately in production.
3. These credentials (username and password) are used for Basic Authentication with the connector.

Store your credentials securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 3: Get your service URL

1. The service URL is the base URL of your Alfresco Content Services REST API. It typically follows this pattern:

    ```
    https://<your-alfresco-host>/alfresco/api/-default-/public/alfresco/versions/1
    ```

2. For Alfresco Cloud (Hyland Experience Platform), the URL will be provided in your setup instructions.
3. For local or self-hosted deployments, replace `<your-alfresco-host>` with your server's hostname and port (e.g., `http://localhost:8080`).

You can verify the service URL by opening `<serviceUrl>/nodes/-root-` in a browser and authenticating with your credentials. A successful response confirms the URL is correct.
