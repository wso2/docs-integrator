---
title: Setup Guide
---

# Setup Guide

This guide walks you through configuring the SAP S/4HANA Communication Arrangement for the Sold-to-Party Assignment of Sales Scheduling Agreement Integration API and obtaining the credentials required to use the connector.

## Prerequisites

- An active SAP S/4HANA Cloud tenant with administrator access.

## Step 1: Find the communication scenario

1. Log in to your SAP S/4HANA Cloud tenant.
2. Navigate to **Communication Management** from the home screen.
3. Open the **Communication Arrangements** app.
4. Click **New** to create a new communication arrangement.
5. In the **Scenario** field, search for and select **Sold-to Party Assignment of Sales Scheduling Agreement Integration** (scenario ID: `SAP_COM_0A37` or the matching scenario in your release).

The exact scenario ID may vary by S/4HANA Cloud release. Search by the descriptive name if the ID differs.

## Step 2: Create a communication system

1. If you do not already have a Communication System configured for your external application, open the **Communication Systems** app.
2. Click **New** and provide a unique system ID and name.
3. Set the **Host Name** to the hostname of your external application or leave it as a placeholder.
4. Under **Users for Inbound Communication**, add an inbound user or create a new one with a username and password.
5. Save the Communication System.

## Step 3: Configure the communication arrangement

1. Back in the **Communication Arrangements** app, select the scenario identified in Step 1.
2. Provide a unique **Arrangement Name**.
3. In the **Communication System** field, select the Communication System you created or an existing one.
4. Under **Inbound Communication**, confirm the authentication method is set to **User Name and Password**.
5. Note the **API URL** shown in the arrangement: it follows the pattern:
    ```
    https://<unique-id>-api.s4hana.cloud.sap/sap/opu/odata/sap/API_SD_SA_SOLDTOPARTYDETN
    ```
6. Click **Save**.

The hostname portion `<unique-id>-api.s4hana.cloud.sap` is what you supply to the Ballerina client's `hostname` parameter. Copy it from the API URL in the arrangement details.

## Step 4: Retrieve inbound communication credentials

1. In the saved Communication Arrangement, expand the **Inbound Communication** section.
2. Note the **User Name** configured for inbound communication.
3. Retrieve the corresponding password from your Communication System's inbound user settings.
4. Store the username and password securely; these are the credentials (`auth.username` and `auth.password`) used by the Ballerina connector.

Do not commit credentials to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply the username, password, and hostname at runtime.
