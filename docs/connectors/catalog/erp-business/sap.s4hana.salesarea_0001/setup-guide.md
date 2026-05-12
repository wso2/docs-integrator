---
title: Setup Guide
---

# Setup Guide

This guide walks you through enabling the SAP Sales Area OData API on your SAP S/4HANA system and obtaining the credentials needed to use the connector.

## Prerequisites

- Access to an SAP S/4HANA system (on-premise or private cloud) with administrator or BASIS privileges.
- An SAP user account with authorizations for the Sales and Distribution (SD) module and OData service access.

## Step 1: Enable the sales area OData service

1. Log in to your SAP S/4HANA system with a user that has BASIS/administrator access.
2. Open transaction **SOAMANAGER** or navigate to the SAP Fiori Launchpad and search for **Manage OAuth 2.0 Client**.
3. Alternatively, open transaction **/n/IWFND/MAINT_SERVICE** (SAP Gateway Service Maintenance) to activate OData services.
4. In the service catalog, search for the service technical name `API_SALESAREA` or the service path `sap/opu/odata4/sap/api_salesarea/srvd_a2x/sap/salesarea/0001`.
5. Select the service and click **Add Service** or **Activate** to make it available on the SAP Gateway.
6. Confirm the system alias and click **Save**.

The exact menu path may differ between SAP S/4HANA releases (1909, 2020, 2021, 2022, 2023). Consult your SAP Basis administrator if the service is not visible in the catalog.

## Step 2: Assign required authorizations to the technical user

1. Open transaction **SU01** to manage user accounts, or ask your SAP Basis administrator to create a technical (service) user for API access.
2. Assign the following authorization objects to the user:
   - **S_SERVICE**: authorization to call the OData service `API_SALESAREA`.
   - **V_VKORG_VKO**: Sales Organization authorization for the relevant sales organizations.
   - **V_VTWEG_VKO**: Distribution Channel authorization.
   - **V_SPART_VKO**: Division authorization.
3. Assign a role that includes SD display authorizations (e.g., a copy of `SAP_SD_BC_DISP_SALESAREA`) using transaction **PFCG**.
4. Save the user and role assignments.

Use a dedicated service/technical user (not a named user) for API integrations. This avoids disruption when individual employees leave the organization.

## Step 3: Obtain the hostname and port

1. The SAP S/4HANA hostname is the server address of your SAP Gateway (ICM: Internet Communication Manager). It may look like `my-sap-system.example.com` or an IP address.
2. The default HTTPS port for SAP ICM is typically `443` or `44300` (for on-premise systems). Confirm the port with your Basis administrator by checking transaction **SMICM → Goto → Services**.
3. Verify connectivity by opening the following URL in a browser (substituting your hostname and port):
    ```
    https://{hostname}:{port}/sap/opu/odata4/sap/api_salesarea/srvd_a2x/sap/salesarea/0001/SalesArea
    ```
   You should be prompted for credentials and then receive an OData JSON response.

For SAP BTP-managed systems or SAP S/4HANA Cloud, the hostname is provided in the BTP service binding or communication arrangement. Follow the SAP BTP documentation for communication system setup.

## Step 4: Note the technical user credentials

1. Record the **username** and **password** of the technical user you created or identified in Step 2. These correspond to the `username` and `password` fields in the connector's `ConnectionConfig.auth`.
2. Ensure the password does not expire by setting the appropriate password policy for the service user in transaction **SU01 → Logon Data tab → Password** (set **Password Status** to **Productive** or configure no expiry).

Store the username and password securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.
