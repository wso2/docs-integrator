---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating the required Communication User, Communication System, and Communication Arrangement in SAP S/4HANA Cloud to obtain the credentials needed for the SAP SD Incoterms connector.

## Prerequisites

- An active SAP S/4HANA Cloud tenant with administrator or IT administrator access.
- The `API_SD_INCOTERMS_SRV` OData service available and activated in your SAP S/4HANA system.

## Step 1: Create a communication user

1. Log in to your SAP S/4HANA Cloud system as an administrator.
2. Open the **Maintain Communication Users** app from the SAP Fiori Launchpad.
3. Click **New** to create a new user.
4. Enter a **User Name** (e.g., `INCOTERMS_API_USER`) and a **Description**.
5. Set a **Password** and confirm it: record this password, as it will be used when configuring the connector.
6. Click **Create**.

Use a dedicated communication user for each integration to make credential rotation and audit tracking easier. Avoid reusing your personal SAP logon credentials.

## Step 2: Create a communication system

1. Open the **Communication Systems** app from the SAP Fiori Launchpad.
2. Click **New** and enter a **System ID** (e.g., `BALLERINA_INCOTERMS`) and a **System Name**.
3. Under **Technical Data**, enter the **Host Name** of your integration host or leave it as a placeholder.
4. Under **Users for Inbound Communication**, click **+** and assign the communication user created in the previous step.
5. Click **Save**.

## Step 3: Create a communication arrangement

1. Open the **Communication Arrangements** app from the SAP Fiori Launchpad.
2. Click **New**.
3. In the **Scenario** field, search for and select the communication scenario that exposes
   `API_SD_INCOTERMS_SRV`. This is typically associated with Sales and Distribution master data scenarios.
4. In the **Communication System** field, select the system created in the previous step.
5. After saving, note the **Service URL** shown in the arrangement details: the hostname
   portion of this URL (e.g., `my-tenant.s4hana.cloud.sap`) is required by the connector.
6. Click **Save**.

The exact communication scenario name depends on your SAP S/4HANA Cloud release. Search for scenarios containing "Incoterms" or "Sales and Distribution" master data, or consult your SAP Basis administrator to identify the scenario exposing `API_SD_INCOTERMS_SRV`.

## Step 4: Retrieve your SAP hostname

The `hostname` required by the connector is the base domain of your SAP S/4HANA Cloud tenant,
for example:

```
my-tenant.s4hana.cloud.sap
```

You can find it in the **Service URL** on the Communication Arrangement detail page, or by
asking your SAP Cloud administrator. Do not include `https://` or a trailing path.

Store your Communication User credentials securely. Use Ballerina's `configurable` feature with a `Config.toml` file to supply the username, password, and hostname at runtime; never hard-code credentials in source files.
