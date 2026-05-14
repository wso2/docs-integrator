---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up your SAP S/4HANA system to allow API access by creating a Communication System and Communication Arrangement.

## Prerequisites

- An active SAP S/4HANA Cloud instance or access to an SAP system with OData APIs enabled. If you do not have one, contact your SAP administrator or [explore SAP trial options](https://www.sap.com/products/erp/s4hana.html).

## Step 1: Log in to your S/4HANA dashboard

1. Sign in to your S/4HANA dashboard using your administrator credentials.

## Step 2: Create a communication system

1. Under the **Communication Management** section, select **Display Communications Scenario**.

   ![Communication systems](/img/connectors/catalog/erp-business/sap/setup/2-1-communications-system.png)

2. In the top-right corner of the screen, select **New**.

   ![Select New](/img/connectors/catalog/erp-business/sap/setup/2-2-create-new.png)

3. Enter a **System ID** for the new communication system.

   ![Enter system ID](/img/connectors/catalog/erp-business/sap/setup/2-3-system-id.png)

4. Set the **Hostname** to your S/4HANA hostname.

   ![Enter hostname](/img/connectors/catalog/erp-business/sap/setup/2-4-give-hostname.png)

5. Under **Users for Inbound Communication**, select **+** to add a user.

   ![Add user](/img/connectors/catalog/erp-business/sap/setup/2-5-add-user.png)

6. Select the **Authentication Method** (for example, User ID and Password) and choose or create a **Communication User**.

   ![Select user](/img/connectors/catalog/erp-business/sap/setup/2-6-select-user.png)

7. Select **Save**.

Record the Communication User credentials (username and password) — you will need them to configure the Ballerina client.

## Step 3: Create a communication arrangement

1. Under the **Communication Management** section, select **Display Communications Scenario**.

   ![Display scenarios](/img/connectors/catalog/erp-business/sap/setup/3-1-display-scenarios.png)

2. In the search bar, type the name of the API scenario you want to use (for example, `Sales Order Integration`) and select the corresponding scenario from the results.

   ![Search for Sales Order Integration](/img/connectors/catalog/erp-business/sap/setup/3-2-search-sales-order.png)

3. In the top-right corner of the screen, select **Create Communication Arrangement**.

   ![Select Create Communication Arrangement](/img/connectors/catalog/erp-business/sap/setup/3-3-click-create-arrangement.png)

4. Enter a unique name for the arrangement.

   ![Enter arrangement name](/img/connectors/catalog/erp-business/sap/setup/3-4-give-arrangement-name.png)

5. Choose the **Communication System** you created in the previous step from the dropdown menu and save your arrangement.

   ![Select communication system](/img/connectors/catalog/erp-business/sap/setup/3-5-select-communication-system.png)

6. Select **Save**. The hostname (`<unique-id>-api.s4hana.cloud.sap`) is displayed in the top-right corner of the screen.

   ![View hostname](/img/connectors/catalog/erp-business/sap/setup/3-6-view-hostname.png)

## Step 4: Obtain the API hostname

After saving the Communication Arrangement, the API hostname is displayed in the top-right corner of the screen. It follows the format:

```
<unique-id>-api.s4hana.cloud.sap
```

Copy this hostname — you will use it as the base URL when configuring your connector.

The full API endpoint URL is typically constructed as `https://<hostname>/sap/opu/odata/sap/<SERVICE_NAME>` for OData V2 services or the appropriate path for your target API.

## What's next

- [Action reference](actions.md): Available operations
