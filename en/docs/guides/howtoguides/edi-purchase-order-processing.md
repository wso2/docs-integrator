---
sidebar_position: 3
title: "Process Inbound EDI Purchase Orders from Trading Partners"
sidebar_label: "Process Inbound EDI Purchase Orders"
description: Build a file-driven integration that identifies the trading partner from an EDI interchange's envelope headers, then parses the purchase orders inside it into typed records, quarantining any message it cannot read.
keywords: [wso2 integrator, edi, edifact, x12, purchase order, orders, trading partner, envelope, interchange, b2b, use case, low-code]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Process Inbound EDI Purchase Orders from Trading Partners

**Time:** About 30 minutes | **What you'll build:** A file-driven integration that reads EDI purchase orders dropped by trading partners, identifies the sender from the envelope, and parses each order into typed Ballerina records — without losing the whole batch to one malformed message.

Trading partners send purchase orders as EDI files, and two things have to happen before any business logic runs: work out who sent the file, and turn the orders inside it into data the integration can use. Those are separate jobs, and this guide builds them in that order — the first needs no schema at all, and the second needs one that matches what the partner actually sends.

**Sample project:** [edi-purchase-order-processing](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/samples/edi-purchase-order-processing) — the finished workspace, ready to run.

## How it works

```text
inbox/*.edi ──▶ read the envelope headers  ──▶ known partner?  ──┬── no  ──▶ log and stop
                (no schema needed)                               │
                                                                 └── yes ──▶ parse the interchange ──┬──▶ orders processed
                                                                            (generated library)      └──▶ malformed messages
                                                                                                          quarantined
```

An EDI file is an *interchange*: an envelope (`UNB`/`UNZ` in EDIFACT, `ISA`/`IEA` in X12) wrapping one or more messages. The envelope carries the sender and recipient, so reading just those few segments is enough to route the file. Only once the partner is known does the integration need a schema to read the orders themselves.

## Before you begin

:::info Prerequisites

- A working WSO2 Integrator environment. Choose the path that fits how you want to work:
    - [Cloud setup](../../get-started/setup/cloud-setup.md) to launch WSO2 Integrator in a browser-based cloud editor.
    - [Local setup](../../get-started/setup/local-setup.md) to install and launch the WSO2 Integrator IDE on your machine.
- The `bal edi` tool, pulled once per machine:

    ```bash
    bal tool pull edi
    ```

- The UN/EDIFACT D03A directory archive, downloaded from [UN/EDIFACT directory downloads](https://unece.org/trade/uncefact/unedifact/download). The tool builds the schema from the specification in this archive.

:::

:::tip
For standard EDIFACT D03A message types, a [prebuilt EDIFACT package](../../reference/data-formats/edi.md#prebuilt-edifact-packages) reads a whole interchange with no code generation at all — envelope headers, batch splitting, and quarantining included. Reach for it whenever a partner sends the standard message unchanged. This guide generates its own module because step 5 tightens the schema to what the partner actually sends, which a prebuilt package cannot express — and a partner deviating from the standard is the common case in practice.

X12 specifications are licensed from ASC X12, so no X12 specification ships with the tool and no prebuilt X12 packages are published. The flow in this guide is identical for X12, starting from the schema your organization is licensed to use. If you need help with that, [contact us](https://wso2.com/contact/).
:::

### The sample interchange

Save the following as `orders.edi`. It is one interchange from the partner `SUPERMART` holding two purchase orders — and a third message that is missing its mandatory `BGM` segment, so there is something for the quarantine path to catch.

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

The segments are shown one per line for readability; an EDI file has no line breaks — the `'` terminator ends each segment. The third message is identical to the other two apart from the missing `BGM`.

## Part 1: Identify the trading partner

The envelope headers are read without a schema, so this part works before any code is generated. `ballerina/edi` provides `edifactHeadersFromEdiString` for EDIFACT and `x12HeadersFromEdiString` for X12, along with `edifactHeadersFromEdiFile` and `x12HeadersFromEdiFile`, which read only the first 512 characters of a file — enough for any conforming envelope.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

### Step 1: Create the automation

1. Create a new integration named `EdiOrderProcessing` in a project named `edi-order-processing`.
2. Add an **Automation** artifact to the integration.

You land in the flow editor with a single **Start** node.

### Step 2: Read the envelope headers

1. Click **+** and select **Call Function**. In the **Functions** panel, under the **edi** section, select **edifactHeadersFromEdiFile**.
2. Set **File Path** to `orders.edi` and **Result** to `headers`, then click **Save**.

Reading the headers straight from the file skips loading the whole document into memory. Use `edifactHeadersFromEdiString` instead when the EDI text is already in hand — from an HTTP request body, for example.

### Step 3: Route on the sender

1. Click **+** and select **If**.
2. Set the condition to `headers.unb.sender.id == "SUPERMART"`.
3. On the **Else** branch, add a **Log Info** node and stop there. Its message expression is:

    ```ballerina
    string `Unknown partner: ${headers.unb.sender.id}`
    ```

Everything in part 2 goes on the **If** branch: the partner is known, so the file is worth parsing.

<ThemedImage
    alt="Automation flow with a Start node, an edifactHeadersFromEdiFile call producing headers, and an If node branching on the sender to a Log Info and Return"
    sources={{
        light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/identify-partner-flow.png'),
        dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/identify-partner-flow.png'),
    }}
/>

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/edi;
import ballerina/log;

public function main() returns error? {
    do {
        // No schema needed: the EDIFACT envelope layout is built in, and only the
        // first 512 characters of the file are read.
        edi:EdifactHeaders headers = check edi:edifactHeadersFromEdiFile("orders.edi");

        if headers.unb.sender.id != "SUPERMART" {
            log:printInfo(string `Unknown partner: ${headers.unb.sender.id}`);
            return;
        }
        log:printInfo(string `Order file from ${headers.unb.sender.id}, reference ${headers.unb.controlRef}`);

        // Part 2 continues here.
    } on fail error e {
        log:printError("Error occurred", 'error = e);
        return e;
    }
}
```

</TabItem>
</Tabs>

## Part 2: Parse the purchase orders

Reading the orders themselves needs a schema. Generate one from the D03A specification, adapt it to what the partner actually sends, and generate a typed library from it.

### Step 4: Generate the schema

Convert the `ORDERS` message type of the D03A directory, passing the archive you downloaded with `-i`:

```bash
bal edi convertEdifactSchema -v d03a -t ORDERS -i d03a.zip -o schema
```

This writes `schema/ORDERS.json`, named after the message type.

### Step 5: Adapt the schema to the partner

Trading partners rarely send a standard message exactly as specified. Because the schema is written out as JSON before any code is generated, a partner's deviations are handled by editing that file — the specification itself is never touched.

For the sample interchange, the partner sends a `QTY` segment on every line item, which the standard marks optional. Tighten it so a line item without a quantity is rejected rather than parsed as an order with no quantity.

A converted schema declares its segments as references into `segmentDefinitions`, so the edit is on the reference inside the line-item segment group — the group whose first entry is `{"ref": "LIN", ...}`. Add `minOccurances` to its `QTY` entry:

```json
{"ref": "QTY", "tag": "Quantity", "minOccurances": 1, "maxOccurances": 99}
```

The fields most often adjusted are `delimiters`, `minOccurances` / `maxOccurances`, a field's `dataType`, and `ignoreSegments` for segments the partner adds that the integration does not care about. See [Adapting the schema to a trading partner](../../develop/transform/edi.md#adapting-the-schema-to-a-trading-partner) for the full list, and the [Ballerina EDI specification](https://ballerina.io/spec/edi/#7-schema-definition) for the whole grammar.

Keep the edited schema in version control next to the integration: it is the record of what that partner sends.

### Step 6: Generate the library

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. Click the **+ Add** icon, select **Library** as the type, enter `orders` as the library name, and click **Add Library**.
2. Open the terminal, move into the `orders` directory, and generate the code from the edited schema:

    ```bash
    cd orders
    bal edi codegen -i ../schema/ORDERS.json -o orders.bal
    ```

The library now holds a record type per segment, `fromEdiString` and `toEdiString` for a single message, and — because an EDIFACT schema carries an envelope — the envelope-aware `interchangeFromEdiString`, `interchangeToEdiString`, and `headersFromEdiString`.

</TabItem>
<TabItem value="code" label="Ballerina Code">

```bash
bal edi codegen -i schema/ORDERS.json -o orders.bal
```

</TabItem>
</Tabs>

### Step 7: Parse the interchange

`interchangeFromEdiString` reads the whole envelope hierarchy. Envelope segments are fail-fast — a malformed `UNB` or `UNT` fails the call. Transaction bodies are **fail-safe**: a body the schema cannot read leaves its parse error on that transaction, typed `ORDERS|error`, and every other message in the interchange still arrives.

That is what keeps one bad message from costing a batch: the good orders go on to be processed, and the bad one is quarantined with the reason attached.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. On the **If** branch from step 3, click **+** and select **Call Function**. In the **Functions** panel, under the **io** section, select **fileReadString**. Set **Path** to `orders.edi` and **Result** to `ediContent`, then click **Save**.
2. Click **+** and select **Call Function**. Under **Within Project**, select **interchangeFromEdiString**.
3. Set **Edi Text** to `ediContent` and **Result** to `interchange`, then click **Save**.
4. Click **+** and select **Foreach**. Set the collection to `interchange.transactions` and the variable to `txn`.
5. Inside the loop, add an **If** node with the condition `txn.body is error`.
6. On the **If** branch, add a **Log Error** node — this is the quarantine path. On the **Else** branch, add the processing for a valid order; a **Log Info** node is enough to see it working.

<ThemedImage
    alt="Automation flow reading the EDI file into ediContent, calling interchangeFromEdiString, and looping over the interchange transactions with a Foreach node and an If node on the transaction body"
    sources={{
        light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/parse-orders-flow.png'),
        dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/parse-orders-flow.png'),
    }}
/>

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/edi;
import ballerina/io;
import ballerina/log;

// The library generated in step 6.
import <add-org-name>/orders;

public function main() returns error? {
    do {
        edi:EdifactHeaders headers = check edi:edifactHeadersFromEdiFile("orders.edi");
        if headers.unb.sender.id != "SUPERMART" {
            log:printInfo(string `Unknown partner: ${headers.unb.sender.id}`);
            return;
        }

        string ediContent = check io:fileReadString("orders.edi");
        orders:ORDERSInterchange interchange = check orders:interchangeFromEdiString(ediContent);

        foreach orders:ORDERSTransaction txn in interchange.transactions {
            orders:ORDERS|error body = txn.body;
            if body is error {
                // Quarantine: this message could not be read, the rest still can.
                log:printError("Quarantined message", 'error = body,
                        reference = txn.transactionHeader.Message_header.message_reference_number);
                continue;
            }
            string orderId = body.Beginning_of_message?.DOCUMENT_MESSAGE_IDENTIFICATION?.Document_identifier ?: "";
            log:printInfo(string `Order ${orderId} received from ${headers.unb.sender.id}`);
        }
    } on fail error e {
        log:printError("Error occurred", 'error = e);
        return e;
    }
}
```

</TabItem>
</Tabs>

## Run and verify

Place `orders.edi` beside the workspace and select **Run** on the integration.

Two orders are logged and the third message is quarantined, with the parse error naming the segment that was missing:

```text
level=INFO  message="Order file from SUPERMART, reference REF2"
level=INFO  message="Order PO20001 received from SUPERMART"
level=INFO  message="Order PO20002 received from SUPERMART"
level=ERROR message="Quarantined message" reference="0003" error="Mandatory unit is missing in the EDI. Unit: Segment BGM ..."
```

<ThemedImage
    alt="Integration terminal output showing the order file accepted from SUPERMART, two orders received, and one quarantined message naming the missing BGM segment"
    sources={{
        light: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/run-terminal-output.png'),
        dark: useBaseUrl('/img/guides/usecases/edi-purchase-order-processing/run-terminal-output.png'),
    }}
/>

Change the sender in the `UNB` segment of `orders.edi` to something else and run again: the file is rejected on the envelope alone, without the schema being consulted at all.

## What's next

- **Pick the files up automatically.** Swap the hard-coded path for a [local file service](../../develop/integration-artifacts/file/local-files.md) or an [FTP/SFTP service](../../develop/integration-artifacts/file/ftp-sftp.md), so partner drops are processed as they arrive.
- **Acknowledge the orders.** Trading partners usually expect a reply saying what was accepted and what was rejected. The quarantine list from step 7 is exactly the input for an EDIFACT `APERAK`; see the [EDI acknowledgement example](https://github.com/ballerina-platform/module-ballerina-edi/tree/main/examples/edi-acknowledgement).
- **Handle several formats at once.** Bundle the schemas for every message type a partner sends into one package with [`libgen`](../../develop/transform/edi.md#building-a-reusable-library-package).
