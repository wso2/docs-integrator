---
sidebar_position: 8
title: "Receive IDocs over HTTP from SAP S/4HANA Private Cloud"
sidebar_label: "Receive IDocs over HTTP from SAP S/4HANA Private Cloud"
description: Build an HTTP service that receives IDocs that SAP S/4HANA Private Cloud (or SAP ECC) sends as XML through an XML HTTP port, with no SAP connector libraries on the integration side.
keywords: [wso2 integrator, sap, sap s/4hana private cloud, sap private cloud, sap ecc, idoc, idoc xml, xml http port, ale, matmas, http service, low-code]
slug: /guides/how-to-guides/sap-idoc-over-http
card_icon: api
card_summary: Receive MATMAS IDocs from SAP S/4HANA Private Cloud as XML over HTTP in a plain HTTP service, with no SAP libraries
card_keywords: [sap, private cloud, s/4hana, ecc, idoc, xml, http]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Receive IDocs over HTTP from SAP S/4HANA Private Cloud

**Time:** About 45 minutes | **What you'll build:** An HTTP service that receives the `MATMAS` IDocs SAP sends whenever a material is distributed, converts the IDoc XML into typed records, maps it to a simple material record with the Data Mapper, logs it, and acknowledges the IDoc to SAP.

SAP usually sends IDocs to an external system over transactional RFC, which needs the SAP JCo libraries on the receiving side, as shown in [Call RFC Function Modules and Receive IDocs with SAP S/4HANA Private Cloud](sap-rfc-and-idoc-integration.md). SAP can also send IDocs as XML documents over plain HTTP, through an **XML HTTP port**. The integration is then an ordinary HTTP service: there are no SAP libraries to download, no SAP gateway to register with, and the same service works behind any load balancer or API gateway.

## How it works

<ThemedImage
    alt="Architecture diagram: SAP S/4HANA Private Cloud sends a MATMAS IDoc as XML through an XML HTTP port and an SM59 destination to the WSO2 Integrator HTTP service POST /sap/idocs, which returns 201 Created; the Data Mapper turns the IDoc XML into JSON, ready to send on to a target system such as an ERP, database or message broker"
    style={{border: 'none', boxShadow: 'none', borderRadius: 0}}
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/architecture.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/architecture.png'),
    }}
/>

1. A material is distributed in SAP, for example with transaction `BD10`, or automatically through change pointers.
2. ALE builds a `MATMAS05` IDoc for the receiving partner and hands it to the partner's **XML HTTP** port.
3. The port turns the IDoc into IDoc XML and sends it with an HTTP `POST` to the URL defined in an SM59 **HTTP connection to an external server**.
4. The integration's `POST /sap/idocs` resource receives the XML, converts it into a `MATMAS05` record, maps it to a `MaterialEvent` record with the Data Mapper, logs it, and returns `201 Created`.
5. Because the HTTP call returned a `2xx` status, SAP sets the IDoc to status `03` (data passed to port OK). Any other status, or no response, leaves the IDoc in an error status, from where it can be sent again.

## Before you begin

:::info Prerequisites

- A URL for the integration that the SAP system can reach over the network, for example through your API gateway or load balancer.
- Access to the SAP GUI transactions `SM59`, `WE21`, `BD54`, `WE20`, `BD64` and `BD10`, or a colleague from your SAP Basis team who can run them for you.
- A material that exists in your SAP client. The examples in this guide use material `FG233` in client `100`.

:::

## Build the integration

Build the service first, so that it is running when you test the connection from SAP.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

## Step 1: Create the integration and the HTTP service

1. Create a new integration named `SapIdocReceiver` in a project named `SapIdocReceiver`.

    <ThemedImage
        alt="Create a Project form with the project name and the integration name both set to SapIdocReceiver"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/01-create-integration.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/01-create-integration.png'),
        }}
    />

2. On the integration overview, select **Add Artifact manually**. On the **Artifacts** page, select **HTTP Service** under **Integration as API**.

    <ThemedImage
        alt="Artifacts page with the HTTP Service card selected under Integration as API"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/02-add-http-service.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/02-add-http-service.png'),
        }}
    />

3. Keep **Design From Scratch**, set **Service Base Path** to `/sap`, and select **Create**.

    <ThemedImage
        alt="Create HTTP Service form with Design From Scratch selected and the service base path set to /sap"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/03-create-http-service.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/03-create-http-service.png'),
        }}
    />

## Step 2: Add the IDoc resource

SAP posts each IDoc as an XML document, so the resource takes an `xml` payload.

1. Select **Add Resource**, then **POST**, and set **Resource Path** to `idocs`.
2. Select **Define Payload**, open **Browse Existing Types**, search for `xml`, select **xml**, and select **Save**.

    <ThemedImage
        alt="Define Payload dialog on the Browse Existing Types tab with the xml data type selected"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/04a-payload-xml.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/04a-payload-xml.png'),
        }}
    />

3. Select the edit icon on the payload, change **Name** to `idoc`, and select **Save**. Keep the default responses (`201` with `json`, `500` with `error`) and select **Save**.

    <ThemedImage
        alt="New Resource Configuration panel with the POST method, the resource path idocs, an xml payload named idoc, and 201 json and 500 error responses"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/04-add-post-resource.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/04-add-post-resource.png'),
        }}
    />

## Step 3: Create the IDoc types

The XML that SAP sends has the IDoc type as its root element, for example `<MATMAS05>`, with one `<IDOC>` element. Inside it, `EDI_DC40` is the control record and every other element is a segment. Creating record types for this structure lets the Data Mapper show the IDoc fields.

1. In the project explorer, select **+** next to **Types**, then select **Add Type**. In the **New Type** panel, open the **Import** tab and set **Format** to **XML**.
2. Paste a sample `MATMAS05` IDoc and select **Import**. Include only the segments and fields you need; the import creates one record type per element, and segments and fields that are not in a type are ignored when an IDoc is converted:

    ```xml
    <MATMAS05>
      <IDOC BEGIN="1">
        <EDI_DC40 SEGMENT="1">
          <DOCNUM>0000000000057020</DOCNUM>
          <MESTYP>MATMAS</MESTYP>
          <IDOCTYP>MATMAS05</IDOCTYP>
          <SNDPRN>S4HCLNT100</SNDPRN>
          <RCVPRN>WSO2HTTP</RCVPRN>
        </EDI_DC40>
        <E1MARAM SEGMENT="1">
          <MATNR>FG233</MATNR>
          <MTART>FERT</MTART>
          <MATKL>L004</MATKL>
          <MEINS>ST</MEINS>
        </E1MARAM>
      </IDOC>
    </MATMAS05>
    ```

    <ThemedImage
        alt="New Type panel on the Import tab with format XML and a sample MATMAS05 IDoc pasted in"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/05-import-idoc-types.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/05-import-idoc-types.png'),
        }}
    />

3. The import infers `DOCNUM` as `int`, which would drop the leading zeros of the IDoc number. In the type diagram, open the **⋮** menu on the **EDI_DC40** card and select **Edit**. Change the type of `DOCNUM` to `string`, and select **Save**.

    <ThemedImage
        alt="Edit Type panel for EDI_DC40 with DOCNUM changed to string, next to the type diagram of IDOC, EDI_DC40 and E1MARAM"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/06-idoc-number-as-string.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/06-idoc-number-as-string.png'),
        }}
    />

4. Create the output type. Select **Add Type**, keep **Create from scratch**, name it `MaterialEvent`, and add five `string` fields: `idocNumber`, `materialNumber`, `materialType`, `materialGroup` and `baseUnit`. Select **Save**.

    <ThemedImage
        alt="New Type panel for the MaterialEvent record with five string fields: idocNumber, materialNumber, materialType, materialGroup and baseUnit"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/07-material-event-type.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/07-material-event-type.png'),
        }}
    />

## Step 4: Convert the payload to the IDoc type

1. Open the `idocs` resource. Select the **+** below **Start**, then [**Declare Variable**](../../editor/canvases/flow-canvas/node-palette.md#declare-variable). Name it `matmas` and set **Type** to `MATMAS05`.
2. In **Expression**, open the helper pane, select **Functions**, search for `parseAsType`, and select **parseAsType()** under **data.xmldata**. This adds the `ballerina/data.xmldata` import. Then set the expression to:

    ```ballerina
    check xmldata:parseAsType(idoc, {}, MATMAS05)
    ```

    `parseAsType` converts the XML payload into a `MATMAS05` record. If the XML does not match the type, the step fails, the **Error Handler** returns `500`, and SAP keeps the IDoc in an error status.

    <ThemedImage
        alt="Declare Variable form for matmas of type MATMAS05 with the expression check xmldata:parseAsType(idoc, {}, MATMAS05)"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/08-parse-idoc.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/08-parse-idoc.png'),
        }}
    />

3. Select **Save**.

## Step 5: Map the IDoc with the Data Mapper

1. Select the **+** after the conversion step, then [**Map Data**](../../editor/canvases/flow-canvas/node-palette.md#map-data). Expand **Within Project** and select **Create Data Mapper**.
2. Name the data mapper `toMaterialEvent`. Under **Inputs**, select **Add Argument**, enter `matmas`, and select **Add**. Set **Output** to `MaterialEvent` and **Result** to `materialEvent`, then select **Open in Data Mapper**.

    <ThemedImage
        alt="Data Mapper Creation form with the name toMaterialEvent, the input matmas of type MATMAS05, the output type MaterialEvent and the result materialEvent"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/09-create-data-mapper.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/09-create-data-mapper.png'),
        }}
    />

3. Draw a line from each input field to its output field:

    | Input (`matmas`) | Output (`MaterialEvent`) |
    |---|---|
    | `IDOC.EDI_DC40.DOCNUM` | `idocNumber` |
    | `IDOC.E1MARAM.MATNR` | `materialNumber` |
    | `IDOC.E1MARAM.MTART` | `materialType` |
    | `IDOC.E1MARAM.MATKL` | `materialGroup` |
    | `IDOC.E1MARAM.MEINS` | `baseUnit` |

    <ThemedImage
        alt="Data Mapper toMaterialEvent with DOCNUM, MATNR, MTART, MATKL and MEINS mapped to idocNumber, materialNumber, materialType, materialGroup and baseUnit"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/10-data-mapper.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/10-data-mapper.png'),
        }}
    />

4. Go back to the resource. The flow now has a **Map Data** step that produces `materialEvent`.

## Step 6: Log and acknowledge the IDoc

SAP treats any `2xx` response as a successful delivery.

1. Add a [**Log Info**](../../editor/canvases/flow-canvas/node-palette.md#log-info) step after **Map Data**, switch **Msg** to **Expression**, and enter:

    ```ballerina
    string `IDoc ${materialEvent.idocNumber} received over HTTP for material ${materialEvent.materialNumber}`
    ```

    <ThemedImage
        alt="log printInfo form with a string template that uses materialEvent.idocNumber and materialEvent.materialNumber"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/11-log-idoc.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/11-log-idoc.png'),
        }}
    />

2. Add a [**Return**](../../editor/canvases/flow-canvas/node-palette.md#return) step and enter `materialEvent`, then select **Save**. The resource returns `201 Created` with the mapped material.

    <ThemedImage
        alt="Return form with the expression materialEvent"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/12-return-event.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/12-return-event.png'),
        }}
    />

The completed resource converts the IDoc, maps it, logs it and acknowledges it. In a real integration, this is where you would send `materialEvent` on to the target system before returning.

<ThemedImage
    alt="Completed resource flow for POST idocs: Start, xmldata parseAsType into matmas, Map Data into materialEvent, log printInfo, Return materialEvent, and the Error Handler"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/13-completed-flow.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/13-completed-flow.png'),
    }}
/>

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// types.bal
import ballerina/data.xmldata;

type EDI_DC40 record {
    string DOCNUM;
    string MESTYP;
    string IDOCTYP;
    string SNDPRN;
    string RCVPRN;
    @xmldata:Attribute
    string SEGMENT;
};

type E1MARAM record {
    string MATNR;
    string MTART;
    string MATKL;
    string MEINS;
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

type MaterialEvent record {|
    string idocNumber;
    string materialNumber;
    string materialType;
    string materialGroup;
    string baseUnit;
|};
```

```ballerina
// data_mappings.bal
function toMaterialEvent(MATMAS05 matmas) returns MaterialEvent => {
    idocNumber: matmas.IDOC.EDI_DC40.DOCNUM,
    materialNumber: matmas.IDOC.E1MARAM.MATNR,
    materialType: matmas.IDOC.E1MARAM.MTART,
    materialGroup: matmas.IDOC.E1MARAM.MATKL,
    baseUnit: matmas.IDOC.E1MARAM.MEINS
};
```

```ballerina
// main.bal
import ballerina/data.xmldata;
import ballerina/http;
import ballerina/log;

listener http:Listener httpDefaultListener = http:getDefaultListener();

service /sap on httpDefaultListener {
    resource function post idocs(@http:Payload xml idoc) returns json|error {
        do {
            MATMAS05 matmas = check xmldata:parseAsType(idoc, {}, MATMAS05);
            MaterialEvent materialEvent = toMaterialEvent(matmas);
            log:printInfo(string `IDoc ${materialEvent.idocNumber} received over HTTP for material ${materialEvent.materialNumber}`);
            return materialEvent;
        } on fail error err {
            // handle error
            return error("unhandled error", err);
        }
    }

}
```

</TabItem>
</Tabs>

Select **Run**. The service starts on port `9090`, so the IDoc endpoint is `http://<integration-host>:9090/sap/idocs`.

<ThemedImage
    alt="WSO2 Integrator terminal showing bal run compiling sapidocreceiver and running the executable"
    sources={{
        light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/14-run-console.png'),
        dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/14-run-console.png'),
    }}
/>

## Set up SAP

SAP needs three things: an HTTP destination that points at the integration, an XML HTTP port that uses it, and a partner profile and distribution model that route `MATMAS` IDocs to the port.

### Create the HTTP destination

1. Start transaction `SM59`, select **HTTP Connections to External Server**, and select **Create**. Enter `WSO2_IDOC_HTTP` as the **Destination**, keep connection type **G**, and confirm.
2. Enter a description. On **Technical Settings**, set **Host** to the integration host, **Port** to the port SAP should connect to, and **Path Prefix** to `/sap/idocs`.

    <ThemedImage
        alt="RFC destination WSO2_IDOC_HTTP of connection type G in transaction SM59, with host idoc-receiver.example.com, port 80 and path prefix /sap/idocs"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-01-sm59-http-destination.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-01-sm59-http-destination.png'),
        }}
    />

3. On **Logon & Security**, keep **Do Not Use a User** if the endpoint does not check credentials, or select **Basic Authentication** with the user and password your API gateway or service expects. For HTTPS, select **SSL Active** under **Security Options** with an SSL client PSE, and set **Port** to `443`.

    <ThemedImage
        alt="Security Options on the Logon and Security tab of the RFC destination, with SSL Active and the DFAULT SSL Client (Standard) PSE"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-02-sm59-ssl.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-02-sm59-ssl.png'),
        }}
    />

    :::info Trust the integration's certificate
    With **SSL Active**, SAP checks the integration's certificate against the SSL client PSE. If the root certificate authority of that certificate is not in the PSE, the connection test fails with `SSSLERR_PEER_CERT_UNTRUSTED`. Import the root certificate into the PSE with transaction `STRUST`, or ask your SAP Basis team to do it.
    :::

4. Select **Save**, then **Connection Test**. The test sends an HTTP `GET`, and the service only accepts `POST`, so a `405 Method Not Allowed` response means SAP reached the integration.

    <ThemedImage
        alt="Connection test for HTTP destination WSO2_IDOC_HTTP with HTTP response status 405 Method Not Allowed returned by the integration"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-03-sm59-connection-test.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-03-sm59-connection-test.png'),
        }}
    />

### Create the XML HTTP port

1. Start transaction `WE21`, select **XML HTTP**, and select **Create**.
2. Enter a port name, for example `WSO2_HTTP`, a description, and set **RFC destination** to `WSO2_IDOC_HTTP`. Keep the content type **Text/XML**, then **Save**.

    <ThemedImage
        alt="XML HTTP port WSO2_HTTP in transaction WE21 with the RFC destination WSO2_IDOC_HTTP and content type Text/XML, and the message Data was saved"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-04-we21-xml-http-port.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-04-we21-xml-http-port.png'),
        }}
    />

### Create the logical system and partner profile

1. Start transaction `BD54`, select **New Entries**, add a logical system for the integration, for example `WSO2HTTP`, and **Save**. Logical systems are cross-client, so SAP asks for a workbench request.

    <ThemedImage
        alt="New logical system WSO2HTTP in transaction BD54, and the message Data was saved"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-05-bd54-logical-system.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-05-bd54-logical-system.png'),
        }}
    />

2. Start transaction `WE20`, select **Partner Type LS**, and create a partner profile for `WSO2HTTP`. Under **Outbound**, add message type `MATMAS` with the XML HTTP port as **Receiver port**, output mode **Pass IDoc Immediately**, and basic type `MATMAS05`, then **Save**.

    <ThemedImage
        alt="Partner profile WSO2HTTP of partner type LS in transaction WE20 with an outbound parameter for message type MATMAS, receiver port WSO2_HTTP and basic type MATMAS05"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-06-we20-partner-profile.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-06-we20-partner-profile.png'),
        }}
    />

### Add MATMAS to the distribution model

1. Start transaction `BD64`, switch to change mode, and select **Create Model View**.
2. Select the new model view, then **Add Message Type**, with the logical system of your SAP client as **Sender**, `WSO2HTTP` as **Receiver**, and `MATMAS` as **Message Type**, then **Save**.

    <ThemedImage
        alt="Distribution model in transaction BD64 with the model view WSO2 Integrator IDoc over HTTP, sending MATMAS from client 100 S/4HANA (S4HCLNT100) to WSO2HTTP, and the message Distribution model has been saved"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-07-bd64-distribution-model.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-07-bd64-distribution-model.png'),
        }}
    />

## Run and verify

1. With the integration running, start transaction `BD10` in SAP, enter material `FG233`, message type `MATMAS` and logical system `WSO2HTTP`, and select **Execute**.

    <ThemedImage
        alt="Send Material screen in transaction BD10 with material FG233, message type MATMAS and logical system WSO2HTTP"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-08-bd10-send-material.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-08-bd10-send-material.png'),
        }}
    />

    SAP confirms that it generated one communication IDoc.

    <ThemedImage
        alt="Information dialog in BD10 stating 1 communication IDoc(s) generated for message type MATMAS"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-09-bd10-result.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-09-bd10-result.png'),
        }}
    />

2. The integration logs the IDoc and returns the mapped material to SAP. To see the response yourself, post a saved IDoc XML file to the service, for example with `curl -X POST -H "Content-Type: text/xml" --data-binary @matmas05.xml http://localhost:9090/sap/idocs`:

    <ThemedImage
        alt="WSO2 Integrator terminal with the log line IDoc 0000000000057020 received over HTTP for material FG233, and the JSON response with idocNumber, materialNumber FG233, materialType FERT, materialGroup L004 and baseUnit ST"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/15-console-idoc-received.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/15-console-idoc-received.png'),
        }}
    />

    ```json
    {
        "idocNumber": "0000000000057020",
        "materialNumber": "FG233",
        "materialType": "FERT",
        "materialGroup": "L004",
        "baseUnit": "ST"
    }
    ```

3. In transaction `WE02`, filter on partner number `WSO2HTTP`. The IDoc has status `03`, and its status text reads **IDoc sent by HTTP in XML format**.

    <ThemedImage
        alt="IDoc list in transaction WE02 with two MATMAS05 IDocs for partner WSO2HTTP on port WSO2_HTTP in status 03, and the status text IDoc sent by HTTP in XML format"
        sources={{
            light: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-10-we02-status.png'),
            dark: useBaseUrl('/img/guides/usecases/sap-idoc-over-http/sap-10-we02-status.png'),
        }}
    />

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| The SM59 connection test fails with `SSSLERR_PEER_CERT_UNTRUSTED` | The SSL client PSE does not trust the integration's certificate. Import its root certificate authority with transaction `STRUST`. |
| The SM59 connection test fails with a timeout or `ICM_HTTP_CONNECTION_FAILED` | SAP cannot reach the integration host and port. Check the host, port and firewall from the SAP network, and that the integration is running. |
| The IDoc status is `02` (error passing data to port) | The service did not return a `2xx` status. Check the integration log for the error, fix the cause, and resend the IDoc with transaction `BD87`. |
| `BD10` reports `0 communication IDoc(s) generated` | The distribution model has no `MATMAS` entry for the receiver. Add it in [Add MATMAS to the distribution model](#add-matmas-to-the-distribution-model). |
| `400 Bad Request` in the integration log | The request body is not well-formed XML. Check that the port's content type is **Text/XML**. |
| `500 Internal Server Error` and a conversion error in the log | The IDoc does not match the record types, for example a required field is missing or a segment the types expect once appears more than once. Edit the record types to match the IDoc, for example by making a field optional or changing a segment to an array. |

## What's next

- **Secure the endpoint.** Put the service behind your API gateway, or add basic authentication to the HTTP service, and set the matching credentials in the SM59 destination.
- **Deploy it.** Ship it to [WSO2 Cloud](../../deploy-and-run/deploy-to-wso2-cloud/deploy-to-wso2-cloud.md), a [Docker container](../../deploy-and-run/self-hosted/containerized-deployment.md#docker-deployment), [Kubernetes](../../deploy-and-run/self-hosted/containerized-deployment.md#kubernetes-deployment), or a [virtual machine](../../deploy-and-run/self-hosted/vm-deployment.md).
- **Receive other IDocs.** Add outbound parameters for more message types in `WE20`, such as `DEBMAS` for customers or `ORDERS` for purchase orders, and route on the `MESTYP` field of `EDI_DC40`.
- **Use the RFC route instead.** To also call BAPIs or answer RFC calls from SAP, use the SAP JCo connector, as shown in [Call RFC Function Modules and Receive IDocs with SAP S/4HANA Private Cloud](sap-rfc-and-idoc-integration.md).
