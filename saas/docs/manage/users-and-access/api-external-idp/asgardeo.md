---
title: Configure Asgardeo as an External IdP
---

# Configure Asgardeo as an External IdP

Asgardeo is an identity-as-a-service (IDaaS) solution that creates seamless login experiences for your applications. It integrates with WSO2 Cloud - Integration Platform to provide API access control through API scopes, which lets you restrict API access to designated user groups. By configuring Asgardeo as an external identity provider (IdP), you can use your Asgardeo user stores to manage API access control effectively.

This guide walks you through the steps to set up Asgardeo as your external IdP in WSO2 Cloud.

## Prerequisites

Before you proceed, complete the following:

- **Create an Asgardeo application.** Follow the Asgardeo guide to [register a standard-based application](https://wso2.com/asgardeo/docs/guides/applications/register-standard-based-app/#register-an-application).

- **Find the well-known URL.** Go to the **Info** tab of your Asgardeo application to view the endpoints, and copy the **Discovery** endpoint URL.

- **Find the client ID.** Go to the **Protocol** tab of your Asgardeo application and copy the **Client ID**.

## Add Asgardeo as an external IdP

1. Sign in to [WSO2 Cloud](https://console.devant.dev/).
2. In the top navigation, click your **Organization**.
3. In the left navigation menu under **Admin**, click **Settings**.
4. Click the **Application Security** tab and then click the **Identity Providers** tab.
5. Click **+ Identity Provider**.
6. Click **Asgardeo**.
7. In the dialog that opens, enter a name and a description for the IdP.
8. In the **Well-Known URL** field, paste the discovery endpoint URL you copied from your Asgardeo application.
9. Leave the **Apply to all environments** checkbox selected. This allows tokens generated via this IdP to invoke APIs across all environments.

    :::note
    To restrict token use to specific environments, clear the **Apply to all environments** checkbox and select the required environments from the **Environments** list.
    :::

10. Click **Next**. The server endpoints are displayed. You can use these to implement and configure authentication for your application.
11. Click **Add**.

You have successfully configured Asgardeo as an external IdP in WSO2 Cloud.

## What's next

- [Configure Azure Active Directory for API Access Control](./azure.md) — Configure Azure Active Directory as an external IdP to consume APIs on WSO2 Cloud
