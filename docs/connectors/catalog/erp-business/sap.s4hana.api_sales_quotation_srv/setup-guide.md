---
title: Setup Guide
---

# Setup Guide

This guide walks you through enabling the SAP Sales Quotation OData service in your SAP S/4HANA system and obtaining the credentials required to connect the Ballerina connector.

## Prerequisites

- An SAP S/4HANA system with the Sales & Distribution (SD) module configured and at least one active sales organization.
- An SAP user account with sufficient authorizations to access and manage sales quotations (transaction `VA21`/`VA22`/`VA23` or equivalent).

## Step 1: Activate the sales quotation OData service

1. Log on to the SAP S/4HANA system with a basis administrator user.
2. Open transaction **SOAMANAGER** (Service-Oriented Architecture Manager).
3. Under **Web Service Configuration**, search for the service `API_SALES_QUOTATION_SRV`.
4. Select the service entry and click **Activate** to expose it for external HTTP calls.
5. Alternatively, open transaction **SICF** (HTTP Service Hierarchy), navigate to
   `/sap/opu/odata/sap/API_SALES_QUOTATION_SRV`, right-click the node, and select **Activate Service**.

If the service node is already shown as active in SOAMANAGER or SICF, no further activation step is needed. You can confirm accessibility by opening the service document URL in a browser and verifying you receive an XML metadata response.

## Step 2: Assign authorization roles to the API user

1. Open transaction **SU01** (User Maintenance) and select the SAP user account that will call the API.
2. Go to the **Roles** tab and assign one of the following:
   - The standard SAP role `SAP_SD_BC_SALES_QUOTATION_ALL`, which grants full access to the Sales Quotation API.
   - A custom authorization role containing authorization object `S_SERVICE` with `SRV_NAME = API_SALES_QUOTATION_SRV` and `SRV_TYPE = HT`.
3. Additionally, ensure the user has SD document authorizations, for example:
   - Authorization object `V_VBAK_AAT` with activity `01` (Create), `02` (Change), `03` (Display) for document type `QT`.
   - Authorization object `V_VBAK_VKO` covering the relevant sales organizations.
4. Save the user record and, if required, regenerate the authorization profile via transaction **SU25** or **PFCG**.

Use transaction SU53 immediately after a failed API call to display any missing authorization objects for the user. This makes it straightforward to identify and add the correct authorizations.

## Step 3: Retrieve the hostname and port

1. The **hostname** is the fully qualified domain name (FQDN) or IP address of your SAP S/4HANA application server (e.g., `s4hana.example.com`).
2. The default HTTPS port is **443**. Confirm the actual port with your SAP basis team if a non-standard port is configured.
3. Validate connectivity by opening the service metadata document in a browser:
    ```
    https://<hostname>:<port>/sap/opu/odata/sap/API_SALES_QUOTATION_SRV/$metadata
    ```
   A successful response returns an XML document describing the OData entity model.

## Step 4: Obtain API user credentials

1. Use an existing SAP dialog user or create a dedicated **Communication User** of type *System* or *Communication* via transaction **SU01**.
2. Set a password for the user and ensure the account is not locked.
3. Note the **username** and **password**; these are supplied as `auth.username` and `auth.password` in the connector `ConnectionConfig`.

For production environments, prefer a dedicated Communication User with only the minimum required authorizations rather than a shared dialog user. Store credentials using Ballerina's `configurable` keyword and a `Config.toml` file; never hard-code them in source.
