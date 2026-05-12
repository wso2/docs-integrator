---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up your SAP S/4HANA system to allow API access by creating a Communication System and Communication Arrangement.

## Prerequisites

- An active SAP S/4HANA Cloud instance or access to an SAP system with OData APIs enabled. If you do not have one, contact your SAP administrator or [explore SAP trial options](https://www.sap.com/products/erp/s4hana.html).

## Step 1: Log in to your s/4HANA dashboard

1. Sign in to your S/4HANA dashboard using your administrator credentials.

## Step 2: Create a communication system

1. Under the **Communication Management** section, click on **Display Communications Scenario**.
2. In the top right corner of the screen, click **New**.
3. Enter a **System ID** for the new communication system.
4. Set the **Hostname** to your S/4HANA hostname.
5. Under **Users for Inbound Communication**, add a user by clicking the **+** button.
6. Select the **Authentication Method** (e.g., User ID and Password) and choose or create a **Communication User**.
7. Click **Save**.

Record the Communication User credentials (username and password); you will need them to configure the Ballerina client.

## Step 3: Create a communication arrangement

1. Under the **Communication Management** section, click on **Display Communications Scenario**.
2. In the search bar, type the name of the API scenario you want to use (e.g., `Sales Order Integration`) and select the corresponding scenario from the results.
3. In the top right corner of the screen, click **Create Communication Arrangement**.
4. Enter a unique name for the arrangement.
5. Choose the **Communication System** you created in the previous step from the dropdown menu.
6. Click **Save**.

## Step 4: Obtain the API hostname

After saving the Communication Arrangement, the API hostname will be displayed in the top right corner of the screen. It follows the format:

```
<unique-id>-api.s4hana.cloud.sap
```

Copy this hostname; you will use it as the base URL when configuring your connector.

The full API endpoint URL is typically constructed as `https://<hostname>/sap/opu/odata/sap/<SERVICE_NAME>` for OData V2 services or the appropriate path for your target API.
