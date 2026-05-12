---
title: Setup Guide
---

# Setup Guide

This guide walks you through configuring an SAP S/4HANA Communication Arrangement to expose the Sales Order Simulation API and obtaining the credentials required by the connector.

## Prerequisites

- An active SAP S/4HANA Cloud tenant or an on-premise SAP S/4HANA system with the Sales and Distribution (SD) module enabled.
- Administrator access to the SAP Fiori Launchpad to configure communication settings.

## Step 1: Create a communication user

1. Log in to your SAP S/4HANA Fiori Launchpad with administrator credentials.
2. Search for and open the **Maintain Communication Users** app.
3. Click **New** to create a new communication user.
4. Enter a **User Name** (e.g., `SALES_SIM_USER`) and a **Description**.
5. Set a secure **Password** and confirm it.
6. Click **Create** to save the communication user.

Store the username and password securely. These credentials will be used as the `auth` configuration when initializing the Ballerina connector client.

## Step 2: Create a communication system

1. Search for and open the **Communication Systems** app in the SAP Fiori Launchpad.
2. Click **New** and enter a **System ID** (e.g., `BALLERINA_SALES_SIM`) and a **System Name**.
3. Under **Technical Data**, set the **Host Name** to the hostname of your client or integration platform.
4. Under **Users for Inbound Communication**, click **+** and select the communication user you created in the previous step.
5. Click **Save**.

## Step 3: Create a communication arrangement

1. Search for and open the **Communication Arrangements** app in the SAP Fiori Launchpad.
2. Click **New** and search for the communication scenario that includes the Sales Order Simulation API
   (e.g., **SAP_COM_0109: Sales Order Integration** or the applicable scenario for your release).
3. Select the scenario and click **Create**.
4. In the arrangement form, set the **Communication System** to the system you created in the previous step.
5. Under **Inbound Communication**, confirm the communication user is listed and that
   **Basic Authentication** (or **OAuth 2.0** if preferred) is selected as the authentication method.
6. Click **Save**.

The correct communication scenario may vary by SAP S/4HANA release and system configuration. Consult your SAP Basis administrator to confirm which scenario exposes the API_SALES_ORDER_SIMULATION_SRV service.

## Step 4: Obtain the API hostname

1. In the **Communication Arrangements** app, open the arrangement you just created.
2. Navigate to the **Inbound Services** tab.
3. Locate the entry for **API_SALES_ORDER_SIMULATION_SRV** and note the **Service URL**.
   It follows the pattern:
   ```
   https://<your-tenant>-api.s4hana.cloud.sap/sap/opu/odata/sap/API_SALES_ORDER_SIMULATION_SRV
   ```
4. Extract the **hostname** portion (e.g., `<your-tenant>-api.s4hana.cloud.sap`).
   This value is passed as the `hostname` parameter when initializing the connector client.

For on-premise SAP S/4HANA systems, the hostname is the IP address or fully qualified domain name of your SAP application server. Ensure HTTPS access on port 443 is permitted from your integration environment.
