---
title: Setup Guide
---

# Setup Guide

This guide walks you through configuring SAP S/4HANA Cloud to expose the Sales Order Integration API and obtaining the credentials required to use the connector.

## Prerequisites

- An active SAP S/4HANA Cloud tenant with system administrator access.

## Step 1: Create a communication user

1. Log in to your SAP S/4HANA Cloud tenant as a system administrator.
2. Open the **Communication Management** app and select **Maintain Communication Users**.
3. Click **New** to create a new communication user.
4. Enter a **User Name** (e.g., `SALES_ORDER_API_USER`) and a **Description**.
5. Set a secure **Password** and confirm it.
6. Click **Create**.

Record the username and password securely; you will need them when configuring the Ballerina connector. Do not reuse an existing dialog user for API communication.

## Step 2: Create a communication system

1. In the **Communication Management** app, select **Communication Systems**.
2. Click **New** and enter a **System ID** (e.g., `BALLERINA_INTEGRATION`) and a **System Name**.
3. Under **Technical Data**, set the **Host Name** to the hostname of your integration system.
4. Under **Users for Inbound Communication**, click **+** to add the communication user you created in the previous step.
5. Click **Save**.

## Step 3: Create a communication arrangement for sales order integration

1. In the **Communication Management** app, select **Communication Arrangements**.
2. Click **New**.
3. In the **Scenario** field, search for and select **Sales Order Integration (SAP_COM_0109)**.
4. Enter an **Arrangement Name** (e.g., `BALLERINA_SALES_ORDER`).
5. Select the communication system you created in the previous step under **Communication System**.
6. Confirm the inbound communication user is assigned under **Inbound Communication**.
7. Click **Save**.
8. After saving, the arrangement details page displays the **API URL**; this is your SAP S/4HANA hostname for the connector (format: `<unique-id>-api.s4hana.cloud.sap`).

Communication scenario SAP_COM_0109 (Sales Order Integration) activates the OData v4 Sales Order API endpoint (`/sap/opu/odata4/sap/api_salesorder/srvd_a2x/sap/salesorder/0001`) used by this connector.
