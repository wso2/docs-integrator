---
title: Configure Enterprise Login
---

# Configure Enterprise Login

WSO2 Cloud - Integration Platform lets you configure enterprise login so that users from an external identity provider (IdP) can sign in to WSO2 Cloud without changing their credentials.

This guide walks you through the steps to configure enterprise login for your organization, bring your own identity provider, and set up role-based access control for enterprise users.

## Prerequisites

Before you proceed, set up the following:

- A valid email domain for your organization.
- Access to [WSO2 Cloud](https://console.devant.dev/) via your Google, GitHub, or Microsoft account. If you are a new user, create an organization with a unique name. For example, "Stark Industries".

## Configure enterprise login for your organization

To configure enterprise login, contact the WSO2 support team using one of the following options:

- **If you already have a support account**, send your organization name or handle and the email domains specific to your organization through the support portal.

- **If you do not have a support account yet**, send an email to `devant-help@wso2.com` requesting to enable enterprise login for your organization.

    :::tip
    Include the following information in your request:

    - Organization name or handle. For example, "Stark Industries" or "starkindustries".
    - Email domains specific to your organization. For example, `@stark.com`, `@starkindustries.com`, and `@stark.eu`.
    :::

    :::note Sample email
    **Subject:** [Stark Industries] Configure enterprise login

    Hi CS team,

    I need to configure enterprise login for my organization. Can you please do the necessary configurations to proceed?

    My organization details are as follows:

    - Organization name: Stark Industries
    - Organization handle: starkindustries
    - Email domains specific to my organization: `@stark.com`, `@starkindustries.com`, and `@stark.eu`

    Thank you.
    :::

The WSO2 support team performs the necessary configurations and responds with a verification code. Sign in to your domain host account and configure the DNS record for your email domain using the following values:

| Field | Value |
|---|---|
| **Name/Host/Alias** | Specify `@` or leave it blank |
| **Time to Live (TTL)** | Keep the default value or use `86400` |
| **Value/Answer/Destination** | `wso2-domain-verification:<verification_code>` |

Once done, you are ready to bring your own identity to WSO2 Cloud.

## Bring your own identity to WSO2 Cloud

When you create an organization in WSO2 Cloud, the platform provisions an organization with the same name in Asgardeo. To bring your own identity, configure a federated enterprise IdP in that Asgardeo organization.

Follow these steps to configure the federated IdP:

1. Sign in to [Asgardeo](https://asgardeo.io/).
2. Configure a federated enterprise identity provider by following the steps in [Asgardeo documentation: Add standard-based login](https://wso2.com/asgardeo/docs/guides/authentication/enterprise-login/).
3. In the Asgardeo Console left navigation menu, click **Applications**. You will see an application named **WSO2_LOGIN_FOR_DEVANT**.
4. Click on the application to edit it.
5. Click the **Sign-in Method** tab to view the configured connection.

Users in your enterprise IdP can now sign in to WSO2 Cloud using their enterprise credentials.

## Configure role-based access control for enterprise login

WSO2 Cloud lets you configure role-based access control (RBAC) for users who reside in an external IdP. This ensures that enterprise users receive the appropriate permissions when they sign in.

### Prerequisites

Before you configure RBAC, complete the following:

1. Configure enterprise login for your organization. For instructions, see [Configure enterprise login for your organization](#configure-enterprise-login-for-your-organization).
2. Ensure your enterprise IdP includes group or role attributes in the tokens it sends to Asgardeo via the respective protocol.
3. Confirm that you have administrator privileges in WSO2 Cloud.

### Step 1: Configure Asgardeo

1. Sign in to [Asgardeo](https://asgardeo.io/).
2. [Configure your IdP as an external IdP in Asgardeo](https://wso2.com/asgardeo/docs/guides/authentication/enterprise-login/). You can select OpenID Connect or SAML as the protocol between Asgardeo and your IdP.

    :::note
    If you use OpenID Connect, configure the requested scopes so that Asgardeo can retrieve the relevant group or role details from the external IdP.
    :::

3. Configure the application:
    1. In the Asgardeo Console left navigation menu, click **Applications**. You will see an application named **WSO2_LOGIN_FOR_DEVANT_CONSOLE**.
    2. Click on the application to edit it.
    3. Click the **Sign-in Method** tab.
    4. Configure the IdP for login based on the protocol you selected:
        - For OpenID Connect, follow the instructions in [Enable the OIDC IdP for login](https://wso2.com/asgardeo/docs/guides/authentication/enterprise-login/add-oidc-idp-login/#enable-the-oidc-idp-for-login).
        - For SAML, follow the instructions in [Enable the SAML IdP for login](https://wso2.com/asgardeo/docs/guides/authentication/enterprise-login/add-saml-idp-login/#enable-the-saml-idp-for-login).
    5. Click the **User Attributes** tab.
    6. Select the **Groups** attribute and click the arrow to expand the section. Select the **Requested** checkbox.
    7. Click **Update**.

4. Add the user attributes as OpenID Connect scopes:
    1. In the Asgardeo Console left navigation menu, click **Scopes**.
    2. In the **OpenID Connect Scopes** pane, click **OpenID** to edit it.
    3. Click **New Attribute** and select the **Groups** attribute.
    4. Click **Save** and then click **Save Changes**.

### Step 2: Map groups to enterprise IdP groups

Before you map groups, confirm that you have permission to perform actions of the organization administrator role.

1. Sign in to [WSO2 Cloud](https://console.devant.dev/).
2. In the top navigation menu, click **Organization**. This opens the organization's home page.
3. In the left navigation menu under **Admin**, click **Settings**. This opens the organization-level settings page.
4. Click the **Access Control** tab and then click **Groups**.
5. Click **Manage IdP Group Mapping**.
6. Click the edit icon for the group you want to map to an enterprise IdP group.
7. In the **IdP Group Name** field, enter the exact name you configured in the enterprise IdP and press Enter to add it.

    :::tip
    Changes to IdP group mappings take effect from the next login session onwards.
    :::

8. Click **Save**.

You have successfully configured role-based access control for enterprise login. Users from the external IdP can now sign in to WSO2 Cloud with the appropriate permissions.

## What's next

- [Access APIs with an External IdP](./api-external-idp/overview.md) — Use external IdPs to access Integration as APIs with OAuth2.
