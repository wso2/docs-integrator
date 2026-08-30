---
title: Setup Guide
---

# Setup Guide

This guide walks you through registering an application in Microsoft Entra ID (Azure AD), granting it access to your Microsoft Dynamics 365 Finance environment, and obtaining the credentials required by the connector.

## Prerequisites

- A Microsoft Dynamics 365 Finance & Operations environment (cloud-hosted or sandbox), with the Vendor payments / Accounts payable module enabled.
- A Microsoft Entra ID (Azure AD) tenant associated with your Dynamics 365 environment, and permission to register applications in it (or access to an administrator who can do so on your behalf).

## Step 1: Register an application in Microsoft Entra ID

1. Sign in to the [Azure portal](https://portal.azure.com/) and navigate to **Microsoft Entra ID → App registrations → New registration**.
2. Give the application a name (e.g., `d365-finance-vendorpayment-integration`), select the appropriate supported account type, and select **Register**.
3. On the application's **Overview** page, note the **Application (client) ID** and **Directory (tenant) ID** — you will need both to configure the connector.
4. Go to **Certificates & secrets → Client secrets → New client secret**, add a description and an expiry, and select **Add**.
5. Copy the generated **Value** immediately; it is shown only once and cannot be retrieved later.

:::tip
Store the client secret in a secrets manager or a configurable value — never commit it to source control. If it is lost or expires, generate a new one from the same **Certificates & secrets** page.
:::

## Step 2: Grant Dynamics 365 Finance API permissions

1. In the app registration, go to **API permissions → Add a permission → APIs my organization uses**.
2. Search for **Dynamics ERP** (the enterprise application that represents Dynamics 365 Finance and Operations in your tenant) and select it.
3. Choose **Application permissions**, select the `user_impersonation` (or `.default`) permission scope, and select **Add permissions**.
4. Select **Grant admin consent for `<your tenant>`** and confirm.

:::note
Admin consent is required because the connector uses the OAuth2 client credentials grant (application permissions). This grant has no interactive sign-in step where an individual user can consent, so a tenant administrator must approve access on behalf of the organization.
:::

## Step 3: Add the application as a Dynamics 365 Finance user

Registering the application in Entra ID only lets it obtain an access token; it also needs a matching user record inside Dynamics 365 Finance with the appropriate security roles, or every request will be rejected with an authorization error.

1. Sign in to your Dynamics 365 Finance environment and go to **System administration → Users → New**.
2. Set a **User ID** and **User name** for the application user.
3. Paste the Azure AD **Application (client) ID** you noted in Step 1 into the **Azure AD object ID** (or **Identity provider object ID**) field.
4. Save the user, then assign it one or more security roles that grant access to the vendor payment entities you plan to use — for example, the **Accounts payable clerk** or **Accounts payable manager** role — via **System administration → Security → Assign users to roles**.

## Step 4: Locate the service URL

The connector talks directly to your environment's OData root, not to the API permission scope itself.

1. Sign in to your Dynamics 365 Finance environment and note the base URL shown in your browser, for example `https://<your-org>.operations.dynamics.com`.
2. Append `/data` to that base URL to form the OData root used as the `serviceUrl` value: `https://<your-org>.operations.dynamics.com/data`.

:::tip
You can verify the URL by opening it directly in a browser while signed in — it should return an OData service document listing the available entity sets, including `PayAgreements`, `VendPWPTxts`, `VendorPaymentJournalHeaders`, `VendorPaymentJournalLines`, and `VendorPaymentMethods`.
:::

## What's next

- [Action reference](actions.md): Available operations
