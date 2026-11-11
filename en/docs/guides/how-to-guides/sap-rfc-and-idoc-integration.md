---
sidebar_position: 7
title: "Call RFC Function Modules and Receive IDocs with SAP S/4HANA Private Cloud"
sidebar_label: "Call RFC Function Modules and Receive IDocs with SAP S/4HANA Private Cloud"
description: Build one integration that reads material master data from SAP S/4HANA Private Cloud (or SAP ECC) by calling a BAPI over RFC, and receives MATMAS IDocs that SAP sends to it through ALE, designed visually with the SAP JCo connector.
keywords: [wso2 integrator, sap, sap s/4hana private cloud, sap private cloud, sap ecc, sap s/4hana, rfc, bapi, idoc, ale, matmas, sap jco, registered server program, low-code]
slug: /guides/how-to-guides/sap-rfc-and-idoc-integration
card_icon: event
card_summary: Read material data with a BAPI over RFC and receive MATMAS IDocs from SAP S/4HANA Private Cloud in one low-code integration
card_keywords: [sap, private cloud, s/4hana, ecc, rfc, idoc]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Call RFC Function Modules and Receive IDocs with SAP S/4HANA Private Cloud

**Time:** About 60 minutes | **What you'll build:** One integration that talks to SAP in both directions. An HTTP API calls the `BAPI_MATERIAL_GET_DETAIL` function module over RFC and returns a material as JSON. An IDoc listener registers with the SAP gateway and receives the `MATMAS` IDocs that SAP sends whenever a material is distributed.

## How it works

The integration has two independent paths that share the same SAP credentials.

- **RFC path (you call SAP).** A client calls `GET /materials/{material}`. The HTTP service calls `BAPI_MATERIAL_GET_DETAIL` through the SAP JCo client, picks the general data out of the result, and returns it as JSON.
- **IDoc path (SAP calls you).** The SAP JCo listener registers at the SAP gateway as an external server program. When SAP distributes a material, ALE builds a `MATMAS` IDoc and sends it over transactional RFC (tRFC) to that registered program. The listener renders the IDoc as XML and passes it to the `onReceive` handler, which parses the XML into typed records, maps the material fields with the Data Mapper, and logs the result.

## Before you begin

:::info Prerequisites

- The SAP Java Connector (SAP JCo) 3.1 and the SAP Java IDoc Class Library 3.1, downloaded from the [SAP Support Portal](https://support.sap.com/en/product/connectors/jco.html) (an SAP user ID is required). You need `sapjco3.jar`, `sapidoc3.jar`, and the native JCo library for your operating system (`libsapjco3.dylib` on macOS, `libsapjco3.so` on Linux, `sapjco3.dll` on Windows). Keep the native library in the same folder as `sapjco3.jar`.
- Network access from the machine that runs the integration to the SAP application server (port `32<NN>`) and the SAP gateway (port `33<NN>`), where `<NN>` is the SAP instance number.
- An SAP user that can log on with RFC and call `BAPI_MATERIAL_GET_DETAIL` (authorization object `S_RFC`), and read material master data.
- Access to the SAP GUI transactions `SM59`, `SMGW`, `WE21`, `BD54`, `WE20`, `BD64` and `BD10`, or a colleague from your SAP Basis team who can run them for you.
- A material number that exists in your SAP client. The examples in this guide use material `FG233` in client `100`.

:::

## Find your SAP connection details

The integration needs five values to log on to SAP, and two more for the IDoc listener. You can read all of them from SAP GUI.

- **Application server host** (`sapHost`): the **Application Server** of the system entry in SAP Logon, or ask your SAP Basis team for the host name or IP address reachable from the integration.
- **System (instance) number** (`sapSystemNumber`): the **Instance Number** of the system entry in SAP Logon. It is also the last two digits of the server name in **System > Status**.
- **Client** (`sapClient`): **Client** in **System > Status**.
- **User and password** (`sapUser`, `sapPassword`): an SAP user that is allowed to log on with RFC.
- **Gateway service** (`sapGatewayService`): `sapgw` followed by the instance number, for example `sapgw00` (port `3300`). Transaction `SMGW` shows the gateway of the instance.
- **Program ID** (`sapProgramId`): the name you choose in [Create the RFC destination](#create-the-rfc-destination).

1. In any SAP GUI session, choose **System > Status**. **Client** and **User** are under **Usage data**. Under **Host data**, **Server name** has the form `<host>_<system ID>_<instance number>`, so a server name such as `saphost_S4H_00` means instance number `00`.

    <ThemedImage
        alt="System Status dialog in SAP GUI showing client 100 under Usage data, with the logon user, server name and database host blurred"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-config-01-system-status.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-config-01-system-status.png'),
        }}
    />

2. Start transaction `SMGW`. The title shows the instance the gateway belongs to. With instance number `00`, the gateway service is `sapgw00`.

    <ThemedImage
        alt="Gateway Monitor in transaction SMGW for the local gateway, with the instance name blurred"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-config-02-gateway-monitor.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-config-02-gateway-monitor.png'),
        }}
    />

## Set up SAP

Before SAP can send IDocs to the integration, SAP needs to know where to send them: an RFC destination that points at the integration's registered program ID, a port that uses that destination, and a partner profile that routes `MATMAS` IDocs to the port. The RFC path needs none of this, only the SAP user.

These are SAP GUI transactions. On SAP S/4HANA you can also start them from the SAP Fiori launchpad, where they open as SAP GUI for HTML, but the setup is usually done by the SAP Basis team in SAP GUI.

### Create the RFC destination

1. Start transaction `SM59`, select **TCP/IP Connections**, and select **Create**.
2. Enter `WSO2_INTEGRATOR` as the **Destination** and a description such as `WSO2 Integrator (registered server program)`.
3. On **Technical Settings**, select **Registered Server Program** and enter `WSO2_INTEGRATOR` as the **Program ID**. The program ID is the name the integration registers under at the gateway, so it must match the `sapProgramId` value you configure later.

    <ThemedImage
        alt="RFC destination WSO2_INTEGRATOR in transaction SM59 with connection type TCP/IP, activation type Registered Server Program and program ID WSO2_INTEGRATOR"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-01-sm59-technical-settings.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-01-sm59-technical-settings.png'),
        }}
    />

4. On the **Unicode** tab, select **Unicode**, then **Save**.

    <ThemedImage
        alt="Unicode tab of the RFC destination with Unicode selected, and the message Destination WSO2_INTEGRATOR saved"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-02-sm59-unicode.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-02-sm59-unicode.png'),
        }}
    />

    :::warning Use a Unicode destination
    SAP JCo is a Unicode program. With a non-Unicode destination, SAP sends the IDoc control record in the wrong code page, and the listener fails with `IDOC_ERROR_METADATA_UNAVAILABLE`.
    :::

### Allow the program to register at the gateway

The SAP gateway only accepts registrations that its `reginfo` access control list allows. By default it allows programs from the SAP server itself only, so a registration from the integration host is refused with `JCO_ERROR_REGISTRATION_DENIED ... registration of tp WSO2_INTEGRATOR from host ... not allowed`.

1. Start transaction `SMGW` and choose **Goto > Expert Functions > External Security > Maintenance of ACL Files**.
2. On the **Reginfo File** tab, insert this line, replacing `<integration-host>` with the host name or IP address the SAP gateway sees for the machine that runs the integration:

    ```text
    P TP=WSO2_INTEGRATOR HOST=<integration-host> ACCESS=internal CANCEL=internal
    ```

    `ACCESS=internal` and `CANCEL=internal` mean that only the SAP system itself may call the registered program or cancel its registration.

3. Select **Save**, confirm, and choose **Local** (or **Global** on a system with several application servers) so the gateway reloads the file.

    <ThemedImage
        alt="Reginfo File tab of the ACL editor in transaction SMGW with the line P TP=WSO2_INTEGRATOR HOST=203.0.113.10 ACCESS=internal CANCEL=internal, and the message External security files were reread"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-03-smgw-reginfo.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-03-smgw-reginfo.png'),
        }}
    />

### Create the tRFC port

1. Start transaction `WE21`, select **Transactional RFC**, and select **Create**.
2. Let SAP generate the port name, enter a description, and set **RFC destination** to `WSO2_INTEGRATOR`. Keep **IDoc record types SAP Release 4.x**, then **Save**.

    <ThemedImage
        alt="Transactional RFC port A000000004 in transaction WE21 with the description WSO2 Integrator and the RFC destination WSO2_INTEGRATOR"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-04-we21-port.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-04-we21-port.png'),
        }}
    />

### Create the logical system and partner profile

SAP addresses IDocs to a partner. For an external system such as the integration, the partner is a logical system.

1. Start transaction `BD54`, select **New Entries**, enter a logical system name for the integration, for example `WSO2INT`, and a description, then **Save**. Logical systems are cross-client, so SAP asks for a workbench request; create one or pick an existing one.

    <ThemedImage
        alt="New logical system WSO2INT with the name WSO2 Integrator in transaction BD54, and the message Data was saved"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-05a-bd54-logical-system.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-05a-bd54-logical-system.png'),
        }}
    />

2. Start transaction `WE20`, select **Partner Type LS**, and select **Create**. Enter `WSO2INT` as the partner number, and a user under **Post Processing: Valid Processors** who is notified about IDoc errors.
3. Under **Outbound**, add a line with message type `MATMAS`, the port you created as **Receiver port**, output mode **Pass IDoc Immediately**, and basic type `MATMAS05`, then **Save**.

    <ThemedImage
        alt="Partner profile WSO2INT of partner type LS in transaction WE20 with an outbound parameter for message type MATMAS, receiver port A000000004 and basic type MATMAS05"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-05-we20-partner-profile.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-05-we20-partner-profile.png'),
        }}
    />

### Add MATMAS to the distribution model

`BD10` and the change pointers only create IDocs for receivers that the ALE distribution model names. Without an entry, `BD10` reports `0 communication IDoc(s) generated`.

1. Start transaction `BD64` and switch to change mode.
2. Select **Create Model View**, enter a short text and a technical name, for example `WSO2INT`.
3. Select the new model view, then **Add Message Type**. Set **Sender** to the logical system of your SAP client (for example `S4HCLNT100`, shown in transaction `SCC4`), **Receiver** to `WSO2INT`, and **Message Type** to `MATMAS`.
4. **Save** the distribution model.

    <ThemedImage
        alt="Distribution model in transaction BD64 with the model view WSO2 Integrator material distribution, sending message type MATMAS from client 100 S/4HANA (S4HCLNT100) to WSO2 Integrator (WSO2INT)"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-06a-bd64-distribution-model.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-06a-bd64-distribution-model.png'),
        }}
    />

## Build the integration

Build the flow in the **Visual Designer**, or switch to the **Ballerina Code** tab to see the equivalent source the designer generates for you.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

## Step 1: Create the integration and the HTTP service

1. Create a new integration named `SapMaterials` in a project named `SapMaterials`.

    <ThemedImage
        alt="Create a Project form with the project name and the integration name both set to SapMaterials"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/01-create-integration.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/01-create-integration.png'),
        }}
    />

2. On the **Artifacts** page, select **HTTP Service** under **Integration as API**.

    <ThemedImage
        alt="Artifacts page with the HTTP Service card selected under Integration as API"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/02-add-http-service.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/02-add-http-service.png'),
        }}
    />

3. Keep **Design From Scratch**, set **Service Base Path** to `/materials`, and select **Create**.

    <ThemedImage
        alt="Create HTTP Service form with Design From Scratch selected and the service base path set to /materials"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/03-create-http-service.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/03-create-http-service.png'),
        }}
    />

## Step 2: Add the material resource

1. Select **Add Resource**, then **GET**.
2. Set **Resource Path** to `[string material]`. The part in square brackets is a [path parameter](../../develop-and-test/integration-artifacts/integration-as-api/http.md#path-parameters), so the material number arrives as the `material` variable.
3. Keep the default responses (`200` with `json`, `500` with `error`) and select **Save**.

    <ThemedImage
        alt="New Resource Configuration panel with the GET method and the resource path [string material]"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/04-add-get-resource.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/04-add-get-resource.png'),
        }}
    />

The resource opens in the flow designer, with **Start**, an empty step and the **Error Handler**.

## Step 3: Connect to SAP

1. Select the **+** below **Start**, then [**Add Connection**](../../develop-and-test/integration-artifacts/supportive-artifacts/connections.md#adding-a-connection). Search for `jco` and select the **SAP Jco** connector (`ballerinax/sap.jco`).

    <ThemedImage
        alt="Add Connection dialog searching for jco, with the SAP Jco connector card shown under Pre-built Connectors"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/05-search-jco-connector.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/05-search-jco-connector.png'),
        }}
    />

2. Create five `string` configurables, so the SAP logon details are supplied at runtime instead of stored in the flow: in a field's [Expression editor](../../editor/panels/expression-panel.md) helper pane, select **Configurables**, then **New Configurable**. Name them `sapHost` (the application server host), `sapSystemNumber` (the instance number, for example `00`), `sapClient` (the SAP client, for example `100`), `sapUser` and `sapPassword`.
3. Switch **Config** to **Expression** and enter:

    ```ballerina
    <jco:DestinationConfig>{ashost: sapHost, sysnr: sapSystemNumber, jcoClient: sapClient, user: sapUser, passwd: sapPassword}
    ```

    The connector accepts either a `jco:DestinationConfig` record or a map of raw JCo properties (`jco:AdvancedConfig`). A record of strings matches both, so the `<jco:DestinationConfig>` type cast tells the connector which one you mean.

4. Keep the connection name `jcoClient` and select **Save Connection**.

    <ThemedImage
        alt="Configure SAP Jco dialog with Config set to a DestinationConfig expression that uses the sapHost, sapSystemNumber, sapClient, sapUser and sapPassword configurables"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/06-sap-connection.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/06-sap-connection.png'),
        }}
    />

## Step 4: Call the BAPI

`BAPI_MATERIAL_GET_DETAIL` takes a material number and returns the material's general data in the `MATERIAL_GENERAL_DATA` structure, plus a `RETURN` structure with any message.

1. In the node panel, expand **jcoClient** under **Connections** and select **Execute**. **Execute** calls any RFC-enabled function module and returns its export and table parameters.

    <ThemedImage
        alt="Node panel with the jcoClient connection expanded, listing Execute, Send I Doc and the other SAP JCo operations"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/07-jco-operations.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/07-jco-operations.png'),
        }}
    />

2. Set **Function Name** to `BAPI_MATERIAL_GET_DETAIL`.
3. Switch **Parameters** to **Expression** and enter the import parameters. SAP parameter names are not Ballerina identifiers, so write them as quoted keys:

    ```ballerina
    {importParameters: {"MATERIAL": material}}
    ```

4. Set **Result** to `materialDetail` and **Return Type** to `jco:RfcRecord`, then select **Save**.

    <ThemedImage
        alt="jcoClient execute form with the function name BAPI_MATERIAL_GET_DETAIL, the import parameter MATERIAL bound to the material path parameter, the result materialDetail and the return type jco:RfcRecord"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/08-execute-bapi.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/08-execute-bapi.png'),
        }}
    />

## Step 5: Return the material

The result is a record keyed by the SAP parameter names. Structures, such as `MATERIAL_GENERAL_DATA`, are nested records keyed by SAP field names.

1. Select the **+** after the **execute** step, then [**Declare Variable**](../../editor/canvases/flow-canvas/node-palette.md#declare-variable). Name it `generalData`, set **Type** to `jco:RfcRecord`, and enter:

    ```ballerina
    check materialDetail["MATERIAL_GENERAL_DATA"].ensureType()
    ```

    <ThemedImage
        alt="Declare Variable form for generalData of type jco:RfcRecord taken from materialDetail MATERIAL_GENERAL_DATA"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/09-declare-general-data.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/09-declare-general-data.png'),
        }}
    />

2. Add a [**Return**](../../editor/canvases/flow-canvas/node-palette.md#return) step after it and enter:

    ```ballerina
    {material: material, description: generalData["MATL_DESC"].toString(), materialType: generalData["MATL_TYPE"].toString(), materialGroup: generalData["MATL_GROUP"].toString(), baseUnit: generalData["BASE_UOM"].toString()}
    ```

    <ThemedImage
        alt="Return form with a record expression containing the material, description, material type, material group and base unit"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/10-return-material.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/10-return-material.png'),
        }}
    />

3. Select **Save**. The completed resource calls the BAPI, extracts the general data and returns it.

    <ThemedImage
        alt="Completed resource flow: Start, the jco execute call to jcoClient, the generalData declaration, Return, and the Error Handler"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/11-completed-rfc-flow.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/11-completed-rfc-flow.png'),
        }}
    />

If SAP cannot be reached or rejects the logon, **execute** returns an error, the **Error Handler** returns it, and the client receives `500 Internal Server Error`.

## Step 6: Add the IDoc listener

1. Go back to the integration overview, select **Add Artifact**, and select **SAP ECC (JCo)** under **Event Integration**. The same event integration works for SAP S/4HANA.

    <ThemedImage
        alt="Artifacts page filtered by SAP, showing the SAP ECC (JCo) card under Event Integration"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/12-add-sap-ecc-event.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/12-add-sap-ecc-event.png'),
        }}
    />

2. Keep **Create New Listener** and name it `sapListener`. Keep **Server Configuration**, and fill in where the listener registers. Create two more `string` configurables, `sapGatewayService` and `sapProgramId`, and switch each field to **Expression**:

    | Field | Value |
    |---|---|
    | **Gateway Host** | `sapHost` (the gateway usually runs on the application server) |
    | **Gateway Service** | `sapGatewayService` (for example `sapgw00`, or the port `3300`) |
    | **Program ID** | `sapProgramId` (the program ID from the RFC destination, `WSO2_INTEGRATOR`) |

    <ThemedImage
        alt="Create SAP ECC (JCo) Event Integration form with the listener name sapListener and the gateway host, gateway service and program ID bound to configurables"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/13-listener-gateway.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/13-listener-gateway.png'),
        }}
    />

3. Under the repository destination, keep **Destination Configurations** and bind **Application Server Host**, **System Number**, **Client Number**, **User** and **Password** to `sapHost`, `sapSystemNumber`, `sapClient`, `sapUser` and `sapPassword`. The listener logs on with these details to read the IDoc type definitions it needs to turn an incoming IDoc into XML.

    <ThemedImage
        alt="Repository destination section with Destination Configurations selected and each logon field bound to a configurable"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/14-listener-repository-destination.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/14-listener-repository-destination.png'),
        }}
    />

4. Under **SAP Driver Libraries**, select `sapidoc3.jar` and `sapjco3.jar` with **Select File**. WSO2 Integrator copies them into the integration's `libs` folder and adds them to `Ballerina.toml` with `provided` scope, because SAP does not allow redistributing them. Copy the native JCo library into the same `libs` folder.
5. Keep **Service Type** as **IDoc Service** and select **Create**.

    <ThemedImage
        alt="SAP Driver Libraries section with sapidoc3.jar and sapjco3.jar in the libs folder, and the service type set to IDoc Service"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/15-listener-libraries.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/15-listener-libraries.png'),
        }}
    />

The service opens with two event handlers: `onReceive` for incoming IDocs and `onError` for listener errors.

<ThemedImage
    alt="SAP ECC (JCo) IDoc Service designer listing the onReceive and onError event handlers on sapListener"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/16-idoc-service.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/16-idoc-service.png'),
    }}
/>

## Step 7: Handle incoming IDocs

`onReceive` gets each IDoc as XML: the control record in `EDI_DC40`, then one element per segment. A `MATMAS05` IDoc keeps the material in `E1MARAM` and its descriptions in `E1MAKTM`. In this step you turn the XML into typed records, map them to a flat `MaterialUpdate` record with the Data Mapper, and log the result. The listener confirms the IDoc to SAP after `onReceive` returns.

### Create the IDoc types

1. In the project tree, select **Types**, then select **Add Type**. In the **New Type** panel, open the **Import** tab and set **Format** to **XML**.
2. Paste a sample `MATMAS05` IDoc and select **Import**. This sample has the fields that the guide uses:

    ```xml
    <MATMAS05>
        <IDOC BEGIN="1">
            <EDI_DC40 SEGMENT="1">
                <DOCNUM>0000000000058002</DOCNUM>
                <IDOCTYP>MATMAS05</IDOCTYP>
                <MESTYP>MATMAS</MESTYP>
                <SNDPRN>S4HCLNT100</SNDPRN>
            </EDI_DC40>
            <E1MARAM SEGMENT="1">
                <MATNR>FG233</MATNR>
                <MTART>FERT</MTART>
                <MATKL>L004</MATKL>
                <MEINS>ST</MEINS>
                <NTGEW>9.000</NTGEW>
                <GEWEI>KG</GEWEI>
                <E1MAKTM SEGMENT="1">
                    <SPRAS_ISO>EN</SPRAS_ISO>
                    <MAKTX>FERT 233, PD, Repetitive Manuf.</MAKTX>
                </E1MAKTM>
            </E1MARAM>
        </IDOC>
    </MATMAS05>
    ```

    <ThemedImage
        alt="New Type panel on the Import tab with the XML format and a sample MATMAS05 IDoc pasted in"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/17-import-idoc-type.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/17-import-idoc-type.png'),
        }}
    />

    WSO2 Integrator creates one record type per element: `MATMAS05`, `IDOC`, `EDI_DC40`, `E1MARAM` and `E1MAKTM`.

3. Adjust the types the import inferred from the sample values, so that every real IDoc parses. Open each type from the **Types** diagram, change the field, and select **Save**:

    - `EDI_DC40`: set `DOCNUM` to `string`. As an `int`, the IDoc number would lose its leading zeros.
    - `E1MARAM`: set `NTGEW` to `string`, because SAP pads numeric IDoc fields with spaces, and set `E1MAKTM` to `E1MAKTM[]`, because a material has one description segment per language.

    <ThemedImage
        alt="Edit Type panel for E1MARAM with NTGEW set to string and E1MAKTM set to an E1MAKTM array, next to the imported IDoc types in the Types diagram"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/18-edit-idoc-types.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/18-edit-idoc-types.png'),
        }}
    />

4. Select **Add Type** again and, on the **Create from scratch** tab, create the output record `MaterialUpdate` with eight `string` fields: `idocNumber`, `material`, `description`, `materialType`, `materialGroup`, `baseUnit`, `netWeight` and `weightUnit`.

    <ThemedImage
        alt="Edit Type panel for the MaterialUpdate record with eight string fields, shown next to the IDoc types in the Types diagram"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/19-material-update-type.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/19-material-update-type.png'),
        }}
    />

### Map the IDoc

1. Select **onReceive**. Select the **+** below **Start**, then **Call Function**, search for `parseAsType`, and select it under `data.xmldata`. Set **V** to `iDoc`, **Result** to `matmas`, and **T** to `MATMAS05`, and select **Save**. The function reads the XML into a `MATMAS05` record and ignores the IDoc fields that the type does not declare.

    <ThemedImage
        alt="data.xmldata parseAsType form with the source XML value iDoc, the result variable matmas and the target type MATMAS05"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/20-parse-idoc.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/20-parse-idoc.png'),
        }}
    />

2. Select the **+** below the new step, then **Map Data**, and choose to create a data mapper. Name it `toMaterialUpdate`, add the input `matmas` of type `MATMAS05`, set **Output** to `MaterialUpdate` and **Result** to `materialUpdate`, and select **Open in Data Mapper**.

    <ThemedImage
        alt="Data Mapper Creation form with the name toMaterialUpdate, the input matmas of type MATMAS05, the output type MaterialUpdate and the result variable materialUpdate"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/20a-create-data-mapper.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/20a-create-data-mapper.png'),
        }}
    />

3. In the [Data Mapper](../../develop-and-test/integration-artifacts/supportive-artifacts/data-mapper/data-mapper.md), expand `matmas` and draw a line from each source field to its target field:

    | Source field | Target field |
    |---|---|
    | `IDOC.EDI_DC40.DOCNUM` | `idocNumber` |
    | `IDOC.E1MARAM.MATNR` | `material` |
    | `IDOC.E1MARAM.E1MAKTM` | `description` |
    | `IDOC.E1MARAM.MTART` | `materialType` |
    | `IDOC.E1MARAM.MATKL` | `materialGroup` |
    | `IDOC.E1MARAM.MEINS` | `baseUnit` |
    | `IDOC.E1MARAM.NTGEW` | `netWeight` |
    | `IDOC.E1MARAM.GEWEI` | `weightUnit` |

    Mapping the `E1MAKTM` array to the `description` string adds an `[0]` index node that picks the first description segment (see [Array to single value](../../develop-and-test/integration-artifacts/supportive-artifacts/data-mapper/array-mappings/array-to-single-value.md)). Select `description` and, in the [expression bar](../../develop-and-test/integration-artifacts/supportive-artifacts/data-mapper/mapping-capabilities.md#expression-bar), set its expression to `matmas.IDOC.E1MARAM.E1MAKTM[0].MAKTX`. Then select `netWeight` and set its expression to `matmas.IDOC.E1MARAM.NTGEW.trim()` to drop the padding.

    <ThemedImage
        alt="Data Mapper toMaterialUpdate with lines from DOCNUM, MATNR, MTART, MATKL, MEINS, NTGEW, GEWEI and the E1MAKTM array, through an index 0 node, to the eight MaterialUpdate fields"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/20b-map-idoc-fields.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/20b-map-idoc-fields.png'),
        }}
    />

4. Go back to **onReceive**. Below **Map Data**, add a [**Log Info**](../../editor/canvases/flow-canvas/node-palette.md#log-info) step, switch **Msg** to **Expression**, and enter:

    ```ballerina
    string `IDoc ${materialUpdate.idocNumber} mapped: ${materialUpdate.toJsonString()}`
    ```

    <ThemedImage
        alt="log printInfo form with a string template that includes materialUpdate.idocNumber and materialUpdate.toJsonString()"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/20c-log-material-update.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/20c-log-material-update.png'),
        }}
    />

5. Select **Save**. In a real integration, you would send `materialUpdate` to the target system here instead of logging it. If `parseAsType` fails, `onReceive` returns the error.

    <ThemedImage
        alt="Completed onReceive flow: Start, xmldata parseAsType into matmas, Map Data into materialUpdate, and log printInfo"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/20d-completed-idoc-flow.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/20d-completed-idoc-flow.png'),
        }}
    />

## Step 8: Log listener errors

Select **onError**, add a **Log Error** step, set **Msg** to `IDoc listener error` and **Error** to `err`, and select **Save**. The listener calls `onError` when it cannot register at the gateway or cannot turn an incoming IDoc into XML.

<ThemedImage
    alt="onError flow with a log printError step that logs the message IDoc listener error with the err error"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/21-onerror-log.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/21-onerror-log.png'),
    }}
/>

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// config.bal
configurable string sapHost = ?;
configurable string sapSystemNumber = ?;
configurable string sapClient = ?;
configurable string sapUser = ?;
configurable string sapPassword = ?;
configurable string sapGatewayService = ?;
configurable string sapProgramId = ?;
```

```ballerina
// connections.bal
import ballerinax/sap.jco;

final jco:Client jcoClient = check new (<jco:DestinationConfig>{ashost: sapHost, sysnr: sapSystemNumber, jcoClient: sapClient, user: sapUser, passwd: sapPassword});
```

```ballerina
// types.bal
import ballerina/data.xmldata;

type EDI_DC40 record {
    string DOCNUM;
    string IDOCTYP;
    string MESTYP;
    string SNDPRN;
    @xmldata:Attribute
    string SEGMENT;
};

type E1MAKTM record {
    string SPRAS_ISO;
    string MAKTX;
    @xmldata:Attribute
    string SEGMENT;
};

type E1MARAM record {
    string MATNR;
    string MTART;
    string MATKL;
    string MEINS;
    string NTGEW;
    string GEWEI;
    E1MAKTM[] E1MAKTM;
    @xmldata:Attribute
    string SEGMENT;
};

type IDOC record {
    EDI_DC40 EDI_DC40;
    E1MARAM E1MARAM;
    @xmldata:Attribute
    string BEGIN;
};

type MATMAS05 record {
    IDOC IDOC;
};

type MaterialUpdate record {|
    string idocNumber;
    string material;
    string description;
    string materialType;
    string materialGroup;
    string baseUnit;
    string netWeight;
    string weightUnit;
|};
```

```ballerina
// data_mappings.bal
function toMaterialUpdate(MATMAS05 matmas) returns MaterialUpdate => {
    idocNumber: matmas.IDOC.EDI_DC40.DOCNUM,
    material: matmas.IDOC.E1MARAM.MATNR,
    description: matmas.IDOC.E1MARAM.E1MAKTM[0].MAKTX,
    materialType: matmas.IDOC.E1MARAM.MTART,
    materialGroup: matmas.IDOC.E1MARAM.MATKL,
    baseUnit: matmas.IDOC.E1MARAM.MEINS,
    netWeight: matmas.IDOC.E1MARAM.NTGEW.trim(),
    weightUnit: matmas.IDOC.E1MARAM.GEWEI
};
```

```ballerina
// main.bal
import ballerina/data.xmldata;
import ballerina/http;
import ballerina/log;
import ballerinax/sap.jco;

listener http:Listener httpDefaultListener = http:getDefaultListener();

service /materials on httpDefaultListener {
    resource function get [string material]() returns json|error {
        do {
            jco:RfcRecord materialDetail = check jcoClient->execute("BAPI_MATERIAL_GET_DETAIL", {importParameters: {"MATERIAL": material}});
            jco:RfcRecord generalData = check materialDetail["MATERIAL_GENERAL_DATA"].ensureType();
            return {material: material, description: generalData["MATL_DESC"].toString(), materialType: generalData["MATL_TYPE"].toString(), materialGroup: generalData["MATL_GROUP"].toString(), baseUnit: generalData["BASE_UOM"].toString()};
        } on fail error err {
            // handle error
            return error("unhandled error", err);
        }
    }

}

listener jco:Listener sapListener = new ({gwhost: sapHost, gwserv: sapGatewayService, progid: sapProgramId, repositoryDestination: {ashost: sapHost, sysnr: sapSystemNumber, jcoClient: sapClient, user: sapUser, passwd: sapPassword}});

service jco:IDocService on sapListener {
    remote function onReceive(xml iDoc) returns error? {
        MATMAS05 matmas = check xmldata:parseAsType(iDoc);
        MaterialUpdate materialUpdate = toMaterialUpdate(matmas);
        log:printInfo(string `IDoc ${materialUpdate.idocNumber} mapped: ${materialUpdate.toJsonString()}`);
    }

    remote function onError(error err) returns error? {
        log:printError("IDoc listener error", err);
    }
}
```

```toml
# Ballerina.toml (added by the SAP Driver Libraries step)
[[platform.java21.dependency]]
path = "./libs/sapjco3.jar"
groupId = "com.sap"
artifactId = "com.sap.conn.jco"
version = "3.1.*"
scope = "provided"

[[platform.java21.dependency]]
path = "./libs/sapidoc3.jar"
groupId = "com.sap"
artifactId = "com.sap.conn.idoc"
version = "3.1.*"
scope = "provided"
```

</TabItem>
</Tabs>

## Run and verify

1. Open **Configurations** and supply values for the seven configurables, or add them to `Config.toml` with **Edit Config.toml**. See [Configurations](../../develop-and-test/integration-artifacts/supportive-artifacts/configurations.md#providing-values). Keep `Config.toml` out of source control.

    <ThemedImage
        alt="Configurable Variables page listing sapHost, sapSystemNumber, sapClient, sapUser, sapPassword, sapGatewayService and sapProgramId as required string values"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/22-configurable-variables.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/22-configurable-variables.png'),
        }}
    />

    ```toml
    sapHost = "sap.example.com"
    sapSystemNumber = "00"
    sapClient = "100"
    sapUser = "<SAP user>"
    sapPassword = "<SAP password>"
    sapGatewayService = "sapgw00"
    sapProgramId = "WSO2_INTEGRATOR"
    ```

2. Select **Run**. The HTTP service starts on port `9090`, and the listener registers at the SAP gateway.

    <ThemedImage
        alt="WSO2 Integrator terminal showing bal run compiling sapmaterials and running the executable, with no listener errors"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/23-run-console.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/23-run-console.png'),
        }}
    />

3. Call the RFC path. On the resource, select **Try It**, enter the material number, and run the request, or use any HTTP client:

    ```bash
    curl http://localhost:9090/materials/FG233
    ```

    <ThemedImage
        alt="Terminal showing curl http://localhost:9090/materials/FG233 returning the material FG233 with description FERT 233, PD, Repetitive Manuf., material type FERT, material group L004 and base unit ST"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/24-api-response.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/24-api-response.png'),
        }}
    />

    ```json
    {
        "material": "FG233",
        "description": "FERT 233, PD, Repetitive Manuf.",
        "materialType": "FERT",
        "materialGroup": "L004",
        "baseUnit": "ST"
    }
    ```

4. Check the registration from SAP. In `SM59`, open `WSO2_INTEGRATOR` and select **Connection Test**. The test succeeds only while the integration is running and registered.

    <ThemedImage
        alt="RFC Connection Test for WSO2_INTEGRATOR in transaction SM59 showing successful logon and transfer times"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-07-sm59-connection-test.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-07-sm59-connection-test.png'),
        }}
    />

5. Send a material from SAP. Start transaction `BD10`, enter the material `FG233`, message type `MATMAS` and the logical system `WSO2INT`, and select **Execute**. SAP creates a `MATMAS05` IDoc and sends it to the integration straight away.

    <ThemedImage
        alt="Send Material screen in transaction BD10 with material FG233, message type MATMAS and logical system WSO2INT"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-08-bd10-send-material.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-08-bd10-send-material.png'),
        }}
    />

    SAP confirms that it generated one communication IDoc.

    <ThemedImage
        alt="Information dialog in BD10 stating 1 communication IDoc(s) generated for message type MATMAS"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-09-bd10-result.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/sap-09-bd10-result.png'),
        }}
    />

6. The integration parses the IDoc, maps it, and logs the `MaterialUpdate` record in the console:

    <ThemedImage
        alt="WSO2 Integrator terminal under the onReceive flow, with the log line IDoc 0000000000058003 mapped, followed by the MaterialUpdate JSON for material FG233"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/26-console-idoc-received.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/26-console-idoc-received.png'),
        }}
    />

    ```text
    time=2026-11-11T11:34:16.172+05:30 level=INFO module=<org>/sapmaterials message="IDoc 0000000000058003 mapped: {\"idocNumber\":\"0000000000058003\", \"material\":\"FG233\", \"description\":\"FERT 233, PD, Repetitive Manuf.\", \"materialType\":\"FERT\", \"materialGroup\":\"L004\", \"baseUnit\":\"ST\", \"netWeight\":\"9.000\", \"weightUnit\":\"KG\"}"
    ```

    In transaction `WE02`, the outbound IDoc has status `03` (data passed to port OK).

The integration overview now shows both paths: the HTTP service that uses the SAP JCo connection, and the IDoc service on the SAP JCo listener.

<ThemedImage
    alt="SapMaterials integration overview showing httpDefaultListener with the /materials HTTP service that uses the jcoClient connection, and sapListener with the jco IDocService and its onReceive and onError handlers"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/25-integration-overview.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-rfc-and-idoc-integration/25-integration-overview.png'),
    }}
/>

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| `JCO_ERROR_REGISTRATION_DENIED ... registration of tp WSO2_INTEGRATOR from host ... not allowed` | The gateway `reginfo` list does not allow the program from this host. Add the line from [Allow the program to register at the gateway](#allow-the-program-to-register-at-the-gateway), with the host the error message names. |
| `IDOC_ERROR_METADATA_UNAVAILABLE` with an unreadable IDoc type in the message | The RFC destination in `SM59` is non-Unicode. Switch it to **Unicode**. |
| `BD10` reports `0 communication IDoc(s) generated` | The distribution model has no `MATMAS` entry for the receiver. Add it in [Add MATMAS to the distribution model](#add-matmas-to-the-distribution-model). |
| The IDoc stays in `SM58` with status `SYSFAIL` | SAP could not deliver the IDoc, or the integration rejected it. Check the integration console, fix the cause, and select **Execute LUW** in `SM58` to send it again. |
| `no sapjco3 in java.library.path` or a similar native library error | The native JCo library is missing or not next to `sapjco3.jar` in the `libs` folder. |

## What's next

- **Deploy it.** Ship it to [WSO2 Cloud](../../deploy-and-run/deploy-to-wso2-cloud/deploy-to-wso2-cloud.md), a [Docker container](../../deploy-and-run/self-hosted/containerized-deployment.md#docker-deployment), [Kubernetes](../../deploy-and-run/self-hosted/containerized-deployment.md#kubernetes-deployment), or a [virtual machine](../../deploy-and-run/self-hosted/vm-deployment.md). The SAP gateway must allow the deployed host in `reginfo`, and the image or VM needs the SAP JCo libraries.
- **Handle BAPI messages.** BAPIs report business errors, such as an unknown material, in the `RETURN` structure instead of failing the call. Check `RETURN.TYPE` for `E` and return `404 Not Found`.
- **Receive other IDocs.** Add outbound parameters for more message types in `WE20`, such as `DEBMAS` for customers or `ORDERS` for purchase orders, and route on `MESTYP` in `onReceive`.
- **Let SAP call your logic.** Select **RFC Service** as the service type to answer function module calls from ABAP. See [SAP ECC](../../develop-and-test/integration-artifacts/event-driven-integration/sap-ecc-events.md).
- **Explore the connector.** The [SAP JCo action reference](product://connectors/catalog/erp-business/sap.jco/action-reference) covers every client operation, including sending IDocs and transactional RFC to SAP.
