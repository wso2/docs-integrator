---
title: Setup Guide
---

# Setup Guide

This guide walks you through obtaining the SAP S/4HANA connection details and credentials required to use the SAP Sales Organization connector.

## Prerequisites

- An active SAP S/4HANA system (on-premise or SAP BTP ABAP Environment) with the `API_SALESORGANIZATION_SRV` OData service enabled.
- An SAP user account with authorization to access Sales and Distribution master data (typically the `S_RS_ADMWB` or equivalent authorization object).

## Step 1: Locate the SAP s/4HANA hostname and port

1. Contact your SAP Basis administrator to obtain the **hostname** (or IP address) and
   **HTTPS port** of your SAP S/4HANA system.
2. The default HTTPS port for SAP S/4HANA is `443`. Confirm the actual port with your
   administrator if the default has been changed.
3. Note these values: they map directly to the `hostname` and `port` parameters of the
   connector's `init` function.

For SAP BTP ABAP Environment (formerly SAP Cloud Platform ABAP Environment), the hostname is the service URL shown in the BTP cockpit under your ABAP instance details.

## Step 2: Verify that the OData service is activated

1. Log in to your SAP S/4HANA system using SAP GUI or a browser.
2. Navigate to transaction **`/IWFND/MAINT_SERVICE`** (Gateway Service Maintenance).
3. Search for the service **`API_SALESORGANIZATION_SRV`**.
4. Confirm that the service is listed and its status is **Active**.
5. If the service is not activated, ask your SAP Basis or API team to activate it.

You can test connectivity by opening the service document URL in a browser: `https://{hostname}:{port}/sap/opu/odata/sap/API_SALESORGANIZATION_SRV/`. A successful response returns an XML or JSON service document.

## Step 3: Obtain SAP user credentials

1. Use an existing SAP dialog user or request a dedicated technical/communication user
   from your SAP administrator for integration purposes.
2. Confirm that the user has the necessary authorizations for Sales and Distribution
   master data read access.
3. Note the **username** and **password**; these are passed as `auth.username` and
   `auth.password` in the connector's `ConnectionConfig`.

Do not use your personal SAP dialog user for automated integrations. Request a dedicated technical user to avoid session conflicts and to simplify credential rotation.

Store the username and password securely. Use Ballerina's `configurable` feature and a `Config.toml` file (excluded from source control) to supply them at runtime.
