---
title: Configure Azure Active Directory as an External IdP
---

# Configure Azure Active Directory as an External IdP

Organizations that use Microsoft Azure Active Directory (Azure AD) for identity and access management can integrate it with WSO2 Cloud - Integration Platform to enable API access control. This uses API scopes to restrict API access to designated user groups.

This guide walks you through the steps to configure Azure AD as your external IdP in WSO2 Cloud.

## Prerequisites

Before you proceed, make sure you have the following:

- **An Azure Active Directory account.** If you do not have one, set up an Azure Active Directory account at [https://azure.microsoft.com](https://azure.microsoft.com/en-gb/).
- **Administrator rights to your WSO2 Cloud organization.** You need this to configure the Azure AD account in your organization.

## Add Azure Active Directory as an external IdP

1. Sign in to [WSO2 Cloud](https://console.devant.dev/).
2. In the top navigation, click your **Organization**.
3. In the left navigation menu under **Admin**, click **Settings**.
4. Click the **Application Security** tab, click **Identity Providers**, and then click **+ Identity Provider**.
5. Select **Microsoft Entra ID (Azure AD)** as the identity provider.
6. Enter a name and a description for the IdP.
7. To obtain the well-known URL of your Azure AD instance, go to your Azure account, navigate to **Azure Active Directory**, click **App registrations**, and then click **Endpoints**. Copy the URI listed under **OpenID Connect metadata document**.

    :::info
    Azure provides two versions of access tokens. By default, IdP applications use the v1 access token.

    - **For v1 tokens:** When entering the well-known URL, omit the `v2.0` path segment. For example, convert `https://login.microsoftonline.com/<tenant-id>/v2.0/.well-known/openid-configuration` to `https://login.microsoftonline.com/<tenant-id>/.well-known/openid-configuration`.
    - **For v2.0 tokens:** Update the IdP application manifest as described in the [Azure access tokens documentation](https://learn.microsoft.com/en-us/azure/active-directory/develop/access-tokens#token-formats).
    :::

8. Leave the **Apply to all environments** checkbox selected. This allows tokens generated via this IdP to invoke APIs across all environments.

    :::note
    To restrict token use to specific environments, clear the **Apply to all environments** checkbox and select the required environments from the **Environments** list.
    :::

9. Click **Next**. The server endpoints are displayed. You can use these to implement and configure authentication for your application.

10. Click **Add**.

You have successfully configured Azure Active Directory as an external IdP in WSO2 Cloud.

## What's next

- [Configure Asgardeo for API Access Control](./asgardeo.md) — Configure Asgardeo as an external IdP to consume APIs on WSO2 Cloud
