---
title: Process Inbound EDI Purchase Orders from Trading Partners
---

# Process Inbound EDI Purchase Orders from Trading Partners

**Time:** About 30 minutes | **What you'll build:** An integration that picks up EDI purchase orders a trading partner drops on an SFTP server, identifies the sender from the envelope, and parses each order into typed Ballerina records.

Trading partners send purchase orders as EDI files, usually by dropping them in an SFTP mailbox. Two things have to happen: work out who sent the file, and turn the orders inside it into data the integration can use. This guide builds them in that order. The first needs no schema at all, and the second uses a prebuilt package for the standard purchase order message.

**Sample project:** [edi-purchase-order-processing](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/samples/edi-purchase-order-processing) is the finished project, ready to run.

## How it works

<ThemedImage
    alt="Architecture diagram: the trading partner SUPERMART uploads EDIFACT ORDERS files to an SFTP server; a WSO2 Integrator FTP integration picks up new .edi files with an SFTP listener, reads the envelope headers with the EDI module, rejects files from unknown partners, parses the orders with the EDIFACT D03A package, and moves each file when done"
    sources={{
        light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/architecture.png'),
        dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/architecture.png'),
    }}
/>

The partner drops each EDI file in an SFTP inbox, and every new `.edi` file runs through the same flow:

1. Read the envelope headers to find the sender. No schema is needed for this.
2. If the sender is not the expected partner, reject the file: it moves to the `rejected` folder.
3. Parse the interchange into typed purchase orders. A message that cannot be read is logged with its parse error, and the rest are still processed.
4. Move the file to the `processed` folder.

An EDI file is an *interchange*: an envelope (`UNB`/`UNZ` in EDIFACT, `ISA`/`IEA` in X12) wrapping one or more messages. The envelope carries the sender and recipient, so reading just those segments is enough to route the file. Only once the partner is known does the integration need the message schema to read the orders themselves. EDIFACT treats each message in an interchange independently, which is why one unreadable message does not hold up the others.

## Before you begin

:::info Prerequisites

- A working WSO2 Integrator environment. See [Setup](../../get-started/setup/setup.md).
- Docker, to run a local SFTP server that stands in for the partner's mailbox.

This guide reads the orders with the [prebuilt EDIFACT package](../../reference/data-formats/edi.md#prebuilt-edifact-packages) `ballerinax/edifact.d03a.supplychain`, which covers the standard D03A `ORDERS` message. When a partner deviates from the standard, or sends a message type or directory version no prebuilt package covers, [generate your own parser](../../develop-and-test/data-transformation/edi.md#generating-code-from-an-edifact-spec) from the specification and [adapt the schema to the partner](../../develop-and-test/data-transformation/edi.md#adapting-the-schema-to-a-trading-partner). The generated library has the same `interchangeFromEdiString` function, so the flow below stays the same.

X12 specifications are licensed from ASC X12, so no X12 specification ships with the tool and no prebuilt X12 packages are published. The flow is identical for X12, starting from a parser generated from the schema your organization is licensed to use. If you need help with that, [contact us](https://wso2.com/contact/).

### Start the SFTP server

Save the following as `docker-compose.yml` and run `docker compose up -d`. It creates the user `partner` with an inbox for new files and folders for processed and rejected ones.

```yaml
services:
  sftp:
    image: atmoz/sftp:alpine
    container_name: edi-sftp
    ports:
      - "2222:22"
    command: partner:partner123:::edi/inbox,edi/processed,edi/rejected
```

### The sample interchange

Save the following as `orders.edi`. It is one interchange from the partner `SUPERMART` holding two purchase orders, and a third message that is missing its mandatory `BGM` segment, so there is a message for the integration to reject.

```text
UNB+UNOA:3+SUPERMART:14+SUPPLIER456:14+260101:1200+REF2+++ORDERS'
UNH+0001+ORDERS:D:03A:UN'
BGM+220+PO20001+9'
DTM+137:20260101:102'
NAD+BY+BUYER123::91'
LIN+1++ITEM-A:VP'
QTY+21:100'
UNS+S'
UNT+8+0001'
UNH+0002+ORDERS:D:03A:UN'
BGM+220+PO20002+9'
DTM+137:20260101:102'
NAD+BY+BUYER123::91'
LIN+1++ITEM-B:VP'
QTY+21:40'
UNS+S'
UNT+8+0002'
UNH+0003+ORDERS:D:03A:UN'
DTM+137:20260101:102'
NAD+BY+BUYER123::91'
LIN+1++ITEM-C:VP'
QTY+21:10'
UNS+S'
UNT+7+0003'
UNZ+3+REF2'
```

The segments are shown one per line for readability. An EDI file has no line breaks: the `'` terminator ends each segment.

## Part 1: Receive files and identify the trading partner

The envelope headers are read without a schema, so this part works before any message type is involved. `ballerina/edi` provides `edifactHeadersFromEdiString` for EDIFACT and `x12HeadersFromEdiString` for X12.

## Step 1: Create the project

Create a new project named `edi-purchase-order-processing` with an integration named `Edi Order Processing`.

## Step 2: Add the SFTP service

1. Select **+ Add Artifact**, filter by **File**, and select **FTP / SFTP**.

    <ThemedImage
        alt="Artifacts page filtered to File Integration, showing the FTP / SFTP, SMB, Local Files, and Azure Files cards"
        sources={{
            light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/01-add-ftp-artifact.png'),
            dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/01-add-ftp-artifact.png'),
        }}
    />

2. Configure the listener:

    | Field | Value |
    |---|---|
    | **Host** | `localhost` |
    | **Protocol** | **SFTP** |
    | **Port** | `2222` |
    | **Authentication** | **Basic Authentication** |
    | **Username** | A configurable named `sftpUsername` (`string`) |
    | **Password** | A configurable named `sftpPassword` (`string`) |
    | **Monitored Path** | `/edi/inbox` |

3. For **Username** and **Password**, clear the default text, then open the field's helper pane, select **Configurables**, then **New Configurable**, so the credentials are supplied at runtime instead of stored in the flow.

4. Select **Create**.

## Step 3: Add the file handler

1. Select **+ Add Handler**, then **On Create**.

    <ThemedImage
        alt="Select Handler to Add panel listing On Create, On Delete, and On Error"
        sources={{
            light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/02-add-handler.png'),
            dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/02-add-handler.png'),
        }}
    />

2. Set **Format** to **Raw Bytes**. The text handler is invoked only for `.txt`, `.log`, and `.md` files, while the raw handler receives a file of any extension, including `.edi`.
3. Under **File Handling Options**, keep **Move** selected for both outcomes, and set **On Success** to `/edi/processed` and **On Error** to `/edi/rejected`. A file the handler finishes with lands in the processed folder, and a file the handler returns an error for lands in the rejected one.
4. Under **Advanced Configurations**, select **File Metadata (fileInfo)**, then select **Save**.

    <ThemedImage
        alt="Configure On Create Handler panel with the format set to Raw Bytes, successful files moved to /edi/processed, and failed files moved to /edi/rejected"
        sources={{
            light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/03-handler-config.png'),
            dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/03-handler-config.png'),
        }}
    />

## Step 4: Accept only EDI files

The raw handler receives every file in the inbox, so filter the service down to `.edi` files.

1. Open the **FTP Integration - /edi/inbox** service and select **Configure**.
2. Select the **Service Configuration** field to open the **Record Configuration** builder, select **fileNamePattern**, and set the record to:

    ```ballerina
    {path: "/edi/inbox", fileNamePattern: "^.*\\.edi$"}
    ```

    <ThemedImage
        alt="Record Configuration builder for the service configuration with fileNamePattern selected and the pattern for .edi files"
        sources={{
            light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/04-file-name-pattern.png'),
            dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/04-file-name-pattern.png'),
        }}
    />

3. Close the builder and select **Save Changes**. Files that do not match, such as a stray `.txt` file, are left in the inbox.

    <ThemedImage
        alt="FTP Integration Configuration page with the service configuration path /edi/inbox and the fileNamePattern for .edi files"
        sources={{
            light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/05-service-configuration.png'),
            dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/05-service-configuration.png'),
        }}
    />

## Step 5: Read the envelope headers

1. Open the `onFile` handler. Select **+** to open the node panel, then **Declare Variable**.

2. Name the variable `ediText` of type `string`, with the expression `check string:fromBytes(content)`.

    <ThemedImage
        alt="Declare Variable form creating ediText of type string from check string:fromBytes(content)"
        sources={{
            light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/06-edi-text-variable.png'),
            dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/06-edi-text-variable.png'),
        }}
    />

3. Select **+**, then **Call Function**, and search for `edifactHeadersFromEdiString`. Set **Edi Text** to the expression `ediText`, set **Result** to `headers`, and select **Save**.

    <ThemedImage
        alt="edifactHeadersFromEdiString form with Edi Text set to ediText and the result named headers of type edi:EdifactHeaders"
        sources={{
            light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/07-read-headers.png'),
            dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/07-read-headers.png'),
        }}
    />

## Step 6: Reject files from unknown partners

1. Select **+** and add an **If** node. From the condition's helper pane, create a configurable named `tradingPartner` of type `string` with the default value `"SUPERMART"`. Then set the condition to `headers.unb.sender.id != tradingPartner`.

    <ThemedImage
        alt="If node form with the condition headers.unb.sender.id != tradingPartner"
        sources={{
            light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/08-partner-condition.png'),
            dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/08-partner-condition.png'),
        }}
    />

2. Inside the **If** branch, add a **Return** node with the expression ``error(string `Unknown trading partner: ${headers.unb.sender.id}`)``. Returning an error is what moves the file to `/edi/rejected`.

    <ThemedImage
        alt="Return node form returning an Unknown trading partner error"
        sources={{
            light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/09-reject-unknown-partner.png'),
            dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/09-reject-unknown-partner.png'),
        }}
    />

3. After the **If** node, add a **Log Info** node. Switch **Msg** to **Expression** and enter ``string `Order file from ${headers.unb.sender.id}, reference ${headers.unb.controlRef}` ``.

<ThemedImage
    alt="onFile flow: fromBytes into ediText, edifactHeadersFromEdiString into headers, an If node that returns an error for an unknown partner, then a Log Info node"
    sources={{
        light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/10-identify-partner-flow.png'),
        dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/10-identify-partner-flow.png'),
    }}
/>

```ballerina
// config.bal
configurable string sftpUsername = ?;
configurable string sftpPassword = ?;
# Sender ID of the trading partner this integration accepts files from.
configurable string tradingPartner = "SUPERMART";
```

```ballerina
// main.bal
import ballerina/edi;
import ballerina/ftp;
import ballerina/log;

listener ftp:Listener ftpListener = new (host = "localhost", protocol = ftp:SFTP, port = 2222, auth = {credentials: {username: string `${sftpUsername}`, password: string `${sftpPassword}`}});

@ftp:ServiceConfig {path: "/edi/inbox", fileNamePattern: "^.*\\.edi$"}
service ftp:Service on ftpListener {
    @ftp:FunctionConfig {afterProcess: {moveTo: "/edi/processed"}, afterError: {moveTo: "/edi/rejected"}}
    remote function onFile(byte[] content, ftp:FileInfo fileInfo) returns error? {
        do {
            string ediText = check string:fromBytes(content);
            edi:EdifactHeaders headers = check edi:edifactHeadersFromEdiString(ediText);
            if headers.unb.sender.id != tradingPartner {
                return error(string `Unknown trading partner: ${headers.unb.sender.id}`);
            }
            log:printInfo(string `Order file from ${headers.unb.sender.id}, reference ${headers.unb.controlRef}`);
            // Part 2 continues here.
        } on fail error err {
            return error("unhandled error", err);
        }
    }
}
```

## Part 2: Parse the purchase orders

Reading the orders themselves needs the `ORDERS` message schema. The prebuilt `ballerinax/edifact.d03a.supplychain` package carries it, along with typed records for every segment and the envelope-aware `interchangeFromEdiString` function.

`interchangeFromEdiString` reads the whole envelope hierarchy. Envelope segments are fail-fast: a malformed `UNB` or `UNT` fails the call. Transaction bodies are **fail-safe**: a body the schema cannot read leaves its parse error on that transaction, typed `EDI_ORDERS_ORDERS|error`, and every other message in the interchange still arrives.

## Step 7: Parse the interchange

1. After the **Log Info** node from step 6, select **+**, then **Call Function**, and search for `ORDERS`. Under **Extended Library**, in the **edifact.d03a.supplychain.mORDERS** section, select **interchangeFromEdiString**. The package is pulled from Ballerina Central and imported the first time you use it.

    <ThemedImage
        alt="Functions panel searching for ORDERS, listing the edifact.d03a.supplychain.mORDERS functions under Extended Library, including interchangeFromEdiString"
        sources={{
            light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/11-search-orders-package.png'),
            dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/11-search-orders-package.png'),
        }}
    />

2. Set **Edi Text** to the expression `ediText`, set **Result** to `interchange`, and select **Save**.

    <ThemedImage
        alt="interchangeFromEdiString form with Edi Text set to ediText and the result named interchange of type mORDERS:EDI_ORDERS_ORDERSInterchange"
        sources={{
            light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/12-parse-interchange.png'),
            dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/12-parse-interchange.png'),
        }}
    />

## Step 8: Process each order

1. Add a **Foreach** node over the collection `interchange.transactions`, with the variable `txn` of type `mORDERS:EDI_ORDERS_ORDERSTransaction`.

    <ThemedImage
        alt="Foreach form iterating over interchange.transactions with the variable txn"
        sources={{
            light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/13-foreach.png'),
            dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/13-foreach.png'),
        }}
    />

2. Inside the loop, add a **Declare Variable** node named `body` of type `mORDERS:EDI_ORDERS_ORDERS|error` with the expression `txn.body`.
3. Add an **If** node with the condition `body is error`. Inside its branch:
    1. Add a **Log Error** node with the message `Message rejected`, the **Error** set to `body`, and an **Additional Values** entry with the key `reference` and the value `txn.transactionHeader.Message_header.message_reference_number`.

        <ThemedImage
            alt="Log Error form with the message Message rejected, the error set to body, and a reference value taken from the transaction header"
            sources={{
                light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/14-log-rejected-message.png'),
                dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/14-log-rejected-message.png'),
            }}
        />

    2. Add a **Continue** node, so the loop moves on to the next message.
4. After the **If** node, still inside the loop, add the processing for a valid order. A **Declare Variable** node and a **Log Info** node are enough to see it working:
    - `orderId` of type `string` with the expression `body.Beginning_of_message?.DOCUMENT_MESSAGE_IDENTIFICATION?.Document_identifier ?: ""`.
    - A **Log Info** node with the expression ``string `Order ${orderId} received from ${headers.unb.sender.id}` ``.

<ThemedImage
    alt="onFile flow continuing with interchangeFromEdiString, a Foreach over the transactions, an If node that logs and skips an unreadable message, and a Log Info node for each order"
    sources={{
        light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/15-process-orders-flow.png'),
        dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/15-process-orders-flow.png'),
    }}
/>

```ballerina
// main.bal, inside the do block
mORDERS:EDI_ORDERS_ORDERSInterchange interchange = check mORDERS:interchangeFromEdiString(ediText);
foreach mORDERS:EDI_ORDERS_ORDERSTransaction txn in interchange.transactions {
    mORDERS:EDI_ORDERS_ORDERS|error body = txn.body;
    if body is error {
        log:printError("Message rejected", body, reference = txn.transactionHeader.Message_header.message_reference_number);
        continue;
    }
    string orderId = body.Beginning_of_message?.DOCUMENT_MESSAGE_IDENTIFICATION?.Document_identifier ?: "";
    log:printInfo(string `Order ${orderId} received from ${headers.unb.sender.id}`);
}
```

The package is imported as `import ballerinax/edifact.d03a.supplychain.mORDERS;`.

:::note Acknowledge the orders
Trading partners usually expect a reply that lists the orders that were accepted and the messages that were rejected. In EDIFACT that reply is an `APERAK` (application error and acknowledgement) message. The same package provides the `APERAK` records in its `mAPERAK` module and an `interchangeToEdiString` function to write one. To send it, select **FTP Connection (caller)** under the handler's **Advanced Configurations** and write the reply to the partner's outbox with `caller->putText`. See the [EDI acknowledgement example](https://github.com/ballerina-platform/module-ballerina-edi/tree/main/examples/edi-acknowledgement) for a function that builds the `APERAK` from the parsed interchange.

## Run and verify

1. Supply the SFTP credentials. Go to **Configurations** and set `sftpUsername` to `partner` and `sftpPassword` to `partner123`, or add them to a [`Config.toml`](../../develop-and-test/integration-artifacts/supportive-artifacts/configurations.md#providing-values) file in the integration directory:

    ```toml
    sftpUsername = "partner"
    sftpPassword = "partner123"
    ```

2. Select **Run** on the integration.
3. Drop the sample interchange into the partner's inbox:

    ```bash
    docker cp orders.edi edi-sftp:/home/partner/edi/inbox/
    docker exec edi-sftp chown partner /home/partner/edi/inbox/orders.edi
    ```

4. Within a minute, the listener's next poll picks the file up. Two orders are logged, and the third message is rejected with the parse error naming the segment that was missing:

    ```text
    level=INFO  message="Order file from SUPERMART, reference REF2"
    level=INFO  message="Order PO20001 received from SUPERMART"
    level=INFO  message="Order PO20002 received from SUPERMART"
    level=ERROR message="Message rejected" error={..."message":"Mandatory unit is missing in the EDI. Unit: Segment BGM ..."} reference="0003"
    ```

    The file moves to `/edi/processed`.

5. Change the sender in the `UNB` segment of `orders.edi` to something else, such as `OTHERCO`, and drop it again. The file is rejected on the envelope alone, without the schema being consulted, and moves to `/edi/rejected`:

    ```text
    error: Unknown trading partner: OTHERCO
    ```

    A file without the `.edi` extension stays in the inbox.

## What's next

- **Pick files up from other places.** The same handler works on a [local directory](../../develop-and-test/integration-artifacts/file-driven-integration/local-files.md), and the [FTP/SFTP service](../../develop-and-test/integration-artifacts/file-driven-integration/ftp-sftp.md) supports FTPS and key-based authentication for real partner mailboxes. For partners that post EDI over HTTP, the parsing logic is unchanged: read the request body into `ediText`.
- **Support a partner's own variant.** When a partner's messages deviate from the standard, [generate a parser](../../develop-and-test/data-transformation/edi.md#generating-code-from-an-edifact-spec) from the specification, [adapt the schema](../../develop-and-test/data-transformation/edi.md#adapting-the-schema-to-a-trading-partner) to what they send, and swap it in for the prebuilt package. Bundle the schemas for every message type a partner sends into one package with [`libgen`](../../develop-and-test/data-transformation/edi.md#building-a-reusable-library-package).
- **Deploy it.** Ship the integration to [WSO2 Cloud](../../deploy-and-run/deploy-to-wso2-cloud/deploy-to-wso2-cloud.md), a [Docker container](../../deploy-and-run/self-hosted/containerized-deployment.md#docker-deployment), or a [virtual machine](../../deploy-and-run/self-hosted/vm-deployment.md), and point the listener at the partner's real SFTP server through the configurables.
