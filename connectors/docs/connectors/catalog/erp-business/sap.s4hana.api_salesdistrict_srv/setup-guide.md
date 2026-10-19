---
title: Setup Guide
---

# Setup Guide

This guide walks you through configuring SAP S/4HANA access and obtaining the credentials required to use the SAP Sales District connector.

## Prerequisites

- Access to an SAP S/4HANA system (on-premise or cloud) with the Sales District Read API (`API_SALESDISTRICT_SRV`) activated.
- An SAP user account with permissions to call OData services in the relevant S/4HANA client.

## Step 1: Verify the OData service is active

1. Log in to your SAP S/4HANA system using SAP Logon or the SAP Fiori Launchpad.
2. Open transaction **SICF** (HTTP Service Framework).
3. In the service tree, navigate to **default_host → sap → opu → odata → sap**.
4. Locate the service **API_SALESDISTRICT_SRV** and verify it is active (not grayed out).
5. If the service is inactive, right-select it and select **Activate Service**.

You need Basis administrator privileges to activate or deactivate ICF services.

## Step 2: Register the OData service in SAP gateway (on-premise only)

1. Open transaction **/IWFND/MAINT_SERVICE** (SAP Gateway: Activate and Maintain Services).
2. Select **Add Service**.
3. Search for **API_SALESDISTRICT_SRV** in the service catalog.
4. Select the service and select **Add Selected Services**.
5. Assign the service to a system alias (e.g., **LOCAL** for the same system).
6. Save the configuration.

On SAP S/4HANA Cloud, standard OData APIs are pre-activated. This step is only required for on-premise installations.

## Step 3: Obtain SAP credentials

The SAP Sales District connector uses HTTP basic authentication. You need a username and
password with permission to call OData services.

**For SAP S/4HANA Cloud:**
1. Navigate to the **Communication Arrangements** app in the Fiori Launchpad.
2. Create a new communication arrangement for the relevant communication scenario
   (e.g., **SAP_COM_0204** for Sales Master Data Integration).
3. Under **Communication Users**, create or assign a communication user and note the
   auto-generated password.

**For SAP S/4HANA On-Premise:**
1. Use transaction **SU01** to create or manage a technical user.
2. Assign the appropriate authorization roles for calling OData services.
3. Note the username and password.

Use a dedicated technical user (service account) rather than a personal dialog user to avoid disruptions when passwords are rotated or accounts are locked.

## Step 4: Determine the SAP S/4HANA hostname

The connector requires the hostname of your SAP S/4HANA system.

- **SAP S/4HANA Cloud**: The hostname is your tenant URL, typically in the form
  `your-tenant.s4hana.ondemand.com`.
- **SAP S/4HANA On-Premise**: The hostname is the DNS name or IP address of your SAP
  system's Internet Communication Manager (ICM) HTTP/S listener, for example
  `s4hana.example.com`.

The default HTTPS port is `443`. Note the port number if your system uses a non-standard port.

## What's next

- [Action reference](actions.md): Available operations
