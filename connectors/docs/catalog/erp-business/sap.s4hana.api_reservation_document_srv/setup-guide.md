---
title: Setup Guide
---

# Setup Guide

This guide walks you through configuring SAP S/4HANA Cloud Communication Management to expose the `API_RESERVATION_DOCUMENT_SRV` service and obtaining the hostname and credentials the SAP Reservation Document connector needs.

The connector uses **Basic Authentication** with an SAP S/4HANA Cloud communication user. SAP exposes each API through a communication scenario, so the user must be assigned to a communication arrangement for the **Reservation Integration** (`SAP_COM_0112`) scenario before the connector can call the service.

## Prerequisites

- An SAP S/4HANA Cloud system.
- A business user with the `SAP_BR_ADMINISTRATOR` role (or equivalent) to create communication users, systems and arrangements.

All the apps used in this guide are in the **Communication Management** group of the SAP Fiori launchpad.

<ThemedImage
    alt="Communication Management apps in the SAP Fiori launchpad"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup_01_communication_management.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup_01_communication_management.png'),
    }}
/>

## Step 1: Create a communication user

1. Open the **Maintain Communication Users** app and select **New**.
2. Enter a **User Name** and a **Description**.
3. Set a **Password** and confirm it.
4. Select **Create**.

Note the user name and password. These are the credentials the connector uses.

## Step 2: Create a communication system

1. Open the **Communication Systems** app and select **New**.
2. Enter a **System ID** and a **System Name**, then select **Create**.

<ThemedImage
    alt="New communication system with the system ID and name"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup_02_communication_system.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup_02_communication_system.png'),
    }}
/>

3. Under **General** > **Technical Data**, enter a **Host Name** and a **Logical System** (an uppercase ID of up to 10 characters, for example, `INTEGRATOR`). Some scenarios refuse to activate when the logical system is empty.
4. Under **Users for Inbound Communication**, add the communication user from Step 1 with the **User Name and Password** authentication method.

<ThemedImage
    alt="Communication user added under Users for Inbound Communication"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup_03_communication_system_users.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup_03_communication_system_users.png'),
    }}
/>

5. Select **Save**.

## Step 3: Create a communication arrangement

1. Open the **Communication Arrangements** app and select **New**.
2. In the **Scenario** value help, search for **Reservation Integration** and select **`SAP_COM_0112`**. This is the scenario that exposes `API_RESERVATION_DOCUMENT_SRV`, the service this connector calls.

<ThemedImage
    alt="Scenario value help in the new communication arrangement dialog"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup_04_search_scenario.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup_04_search_scenario.png'),
    }}
/>

3. Enter a unique **Arrangement Name** and select **Create**.

<ThemedImage
    alt="New communication arrangement dialog with the scenario and arrangement name"
    style={{maxWidth: '480px'}}
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup_05_new_arrangement.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup_05_new_arrangement.png'),
    }}
/>

4. Select the communication system from Step 2. The communication user from Step 1 is filled in as the inbound user. If the scenario lists outbound services that the integration does not need, clear their **Active** check boxes so that no outbound user is required.

<ThemedImage
    alt="Communication arrangement with the communication system and inbound user"
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup_06_arrangement_details.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup_06_arrangement_details.png'),
    }}
/>

5. Select **Save**.

## Step 4: Note the hostname

Open the saved arrangement. The **API-URL** next to **Own SAP Cloud System** shows the hostname (`<unique id>-api.s4hana.cloud.sap`).

<ThemedImage
    alt="API-URL of the SAP S/4HANA Cloud system in the communication arrangement"
    style={{maxWidth: '600px'}}
    sources={{
        light: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup_07_view_hostname.png'),
        dark: useBaseUrl('/img/connectors/catalog/erp-business/sap.s4hana.api_reservation_document_srv/setup_07_view_hostname.png'),
    }}
/>

You now have everything the connector needs:

- **hostname**: the API hostname, for example, `my123456-api.s4hana.cloud.sap`
- **username**: the communication user name
- **password**: the communication user password

Store the hostname, username and password securely. Bind them to `configurable` variables and supply the values in `Config.toml` at runtime instead of hardcoding them.

## What's next

- [Action Reference](actions.md): available operations
- [Example](example.md): build an integration with this connector
