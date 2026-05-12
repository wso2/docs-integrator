---
title: Setup Guide
---

# Setup Guide

This guide walks you through obtaining SAP S/4HANA system access and enabling the API_SALES_INQUIRY_SRV OData service so you can connect the Ballerina connector to your SAP landscape.

## Prerequisites

- An SAP S/4HANA system (on-premise or private cloud) with Sales and Distribution (SD) configured.
- An SAP user account with sufficient authorization to access the API_SALES_INQUIRY_SRV OData service.

## Step 1: Verify or activate the API_SALES_INQUIRY_SRV OData service

1. Log on to the SAP S/4HANA back-end system (via SAP GUI or SAP Fiori Launchpad as an administrator).
2. Run transaction **SOAMANAGER** (for older systems) or navigate to **API Management** in the Fiori Launchpad.
3. Search for the service `API_SALES_INQUIRY_SRV`.
4. If the service is not yet active, select it and choose **Activate**.
5. Confirm the service endpoint path: `/sap/opu/odata/sap/API_SALES_INQUIRY_SRV`.

In SAP S/4HANA Cloud (public edition), standard OData APIs are active by default. For on-premise or private cloud systems, activation via SOAMANAGER or the ICF node (transaction SICF) may be required.

## Step 2: Assign OData authorizations to the SAP user

1. Open transaction **SU01** (User Maintenance) and navigate to the target user.
2. On the **Roles** or **Profiles** tab, assign one of the following depending on your landscape:
   - SAP standard role `SAP_SD_BC_SALES_INQUIRY_READ` (read access to sales inquiry API), or
   - A custom role containing authorization object `S_SERVICE` with the field `SRV_NAME` = `API_SALES_INQUIRY_SRV`.
3. Save the user record.

Ask your SAP Basis administrator to review the required authorization objects. The API also requires general OData access authorizations such as `S_RFC` for the remote function group `SADL_GW_ODATA_SRV_CALL`.

## Step 3: Obtain the SAP system hostname

The connector requires the hostname (or IP address) of the SAP system's HTTP/HTTPS endpoint.

1. Confirm the HTTPS port with your SAP Basis team: the default is `443` for HTTPS.
2. The base URL for the service will be:
    ```bash
    https://<hostname>:<port>/sap/opu/odata/sap/API_SALES_INQUIRY_SRV
    ```
3. Verify connectivity from your integration host by opening the above URL in a browser or
   using a REST client: you should receive an OData service document (XML or JSON).

If your SAP system uses a self-signed or internal CA certificate, you will need to configure the `secureSocket` option in `ConnectionConfig` to trust that certificate, or import it into the Java trust store used by your Ballerina runtime.

## Step 4: Collect credentials for the integration user

1. Confirm the SAP username (e.g., `BALI_INT_USR`) and its password with your SAP administrator.
2. Verify the user is not locked and does not have an expired password by checking **SU01**.
3. Optionally, test the credentials against the OData service using a REST client:
    ```
    GET https://<hostname>/sap/opu/odata/sap/API_SALES_INQUIRY_SRV/A_SalesInquiry?$top=1
    Authorization: Basic <base64(username:password)>
    ```

Store the SAP username and password as Ballerina `configurable` variables backed by a `Config.toml` file or environment variables. Never hard-code credentials in source files.
