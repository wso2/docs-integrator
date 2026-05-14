---
title: EDI Processing
---

# EDI Processing

Work with Electronic Data Interchange (EDI) formats used in supply chain, healthcare, and financial integrations. Ballerina provides the `ballerina/edi` module for parsing and serializing EDI data, and the `bal edi` CLI tool for generating type-safe code from standard EDI specs like EDIFACT and X12.

## Setting up the EDI tool

Pull the `bal edi` tool to generate Ballerina code from EDI schemas.

```bash
bal tool pull edi
```

## Generating types from an EDIFACT spec

For standard EDI formats like EDIFACT, you don't need to write a schema by hand. The `bal edi` tool has built-in knowledge of EDIFACT message types. Run the following command to generate a JSON schema for the EDIFACT ORDERS message (version D96A):

```bash
bal edi convertEdifactSchema -v d96a -t ORDERS -o schema
```

This writes a ready-to-use JSON schema to `schema/ORDERS.json`. Then generate Ballerina record types and parser/serializer functions from it. Let's add the generated code into a separate library.

1. After creating a new integration, click the **+ Add Artifact** icon.
2. Select **Library** as the type, enter `documents` as the library name, and click **Add Library**.

   ![Add New Library](/img/develop/transform/edi/add-new-library.png)

3. From inside the new `documents` library directory, run:

   ```bash
   bal edi codegen -i schema/ORDERS.json -o orders.bal
   ```

The generated file contains:

- **Record types** — matching each segment in the ORDERS message (BGM, DTM, NAD, LIN, etc.)
- **`fromEdiString`** — converts an EDI string to a typed Ballerina record
- **`toEdiString`** — converts a Ballerina record to an EDI string
- **`getSchema`** — returns the EDI schema as an `EdiSchema` object

## Parsing EDI documents

Once you have the generated library, parse an EDIFACT ORDERS message into typed Ballerina records.

The following EDIFACT ORDERS message will be used as the input:

```bash
UNB+UNOA:1+SENDER+RECEIVER+260511:1000+1'
UNH+1+ORDERS:D:96A:UN'
BGM+220+PO-001+9'
DTM+137:20260511:102'
NAD+BY+123456789::9++ACME Corp'
LIN+1++PROD-001:SA'
QTY+21:10'
PRI+AAA:25.00'
UNT+8+1'
UNZ+1+1'
```

1. Open your main integration and click **+ Add Artifact** on the canvas.
2. Select **Automation** from the artifacts panel.

   ![Artifacts panel with Automation selected](/img/develop/transform/edi/automation.png)

3. Click **+** and select **Call Function**.

   ![Call Function in the Statement panel](/img/develop/transform/edi/call-function.png)

4. In the **Functions** panel, scroll to the **io** section and select **fileReadString**.

   ![Select fileReadString from io functions](/img/develop/transform/edi/file-read-string.png)

5. Set **Path** to the path of your EDI file (e.g., `document.edi`) and **Result** to `ediContent`, then click **Save**.

   ![Configure fileReadString inputs](/img/develop/transform/edi/add-inputs-file-read-string.png)

6. Click **+** again and select **Call Function**. In the **Functions** panel under **Within Project**, select **fromEdiString**.

   ![Select fromEdiString from the orders library](/img/develop/transform/edi/from-edi-string.png)

7. Set **Edi Text** to `ediContent` and **Result** to `documents`, then click **Save**.

   ![Configure fromEdiString inputs](/img/develop/transform/edi/convert-from-edi-string.png)

8. Click **+** again. In the right panel, expand the **Logging** section and select **Log Info**.

   ![Select Log Info from the Logging panel](/img/develop/transform/edi/add-log-info.png)

9. In the **Msg** field, select **Expression**, enter `documents.toString()`, and click **Save**.

```ballerina
import ballerina/io;
import ballerina/log;

import <add-org-name>/documents;

public function main() returns error? {
    do {
        string ediContent = check io:fileReadString("order.edi");
        documents:ORDERS document = check documents:fromEdiString(ediContent);
        log:printInfo(document.toString());
    } on fail error e {
        log:printError("Error occurred", 'error = e);
        return e;
    }
}
```

## Generating EDI output

Build an EDIFACT ORDERS message from Ballerina records and serialize it to EDI text.

1. Click **+ Add Artifact** and select **Automation**.
2. In the flow designer, click **+** and select **Declare Variable**. Set **Name** to `document`, **Type** to `documents:ORDERS`, and enter the following json as the **Expression**, then click **Save**.

    ```json

        {"Message_header":{"code":"UNH","message_reference_number":"1","message_information":{"name":"ORDERS","catagory":"D","version":"96A","status":"UN"}},"Beginning_of_message":{"code":"BGM","DOCUMENT_MESSAGE_NAME":{"Document_name_code":"220"},"DOCUMENT_MESSAGE_IDENTIFICATION":{"Document_identifier":"PO-001"},"MESSAGE_FUNCTION_CODE":"9"},"Date_time_period":[{"code":"DTM","DATE_TIME_PERIOD":{"Date_or_time_or_period":"137","Date_or_time_or_period_text":"20260511","Date_or_time_or_period_format_code":"102"}}],"Additional_information":[],"Item_description":[],"Free_text":[],"Related_identification_numbers":[],"group_1":[],"group_2":[{"Name_and_address":{"code":"NAD","PARTY_FUNCTION_CODE_QUALIFIER":"BY","PARTY_IDENTIFICATION_DETAILS":{"Party_identifier":"123456789","Code_list_identification_code":"","Code_list_responsible_agency_code":"9"},"NAME_AND_ADDRESS":null,"PARTY_NAME":{"Party_name":"ACME Corp"}},"Place_location_identification":[],"Financial_institution_information":[],"group_3":[],"group_4":[],"group_5":[]}],"group_6":[],"group_7":[],"group_8":[],"group_10":[],"group_12":[],"group_13":[],"group_15":[],"group_16":[],"group_18":[],"group_19":[],"group_25":[],"group_26":[],"group_28":[{"Line_item":{"code":"LIN","LINE_ITEM_IDENTIFIER":"1","ITEM_NUMBER_IDENTIFICATION":{"Item_identifier":"PROD-001","Item_type_identification_code":"SA"}},"Additional_product_id":[],"Item_description":[],"Measurements":[],"Quantity":[{"code":"QTY","QUANTITY_DETAILS":{"Quantity_type_code_qualifier":"21","Quantity":"10"}}],"Percentage_details":[],"Additional_information":[],"Date_time_period":[],"Monetary_amount":[],"Processing_information":[],"Goods_identity_number":[],"Related_identification_numbers":[],"Document_message_details":[],"Maintenance_operation_details":[],"Free_text":[],"group_29":[],"group_30":[],"group_32":[{"Price_details":{"code":"PRI","PRICE_INFORMATION":{"Price_code_qualifier":"AAA","Price_amount":25}},"Additional_price_information":[],"Date_time_period":[]}],"group_33":[],"group_34":[],"group_37":[],"group_38":[],"group_39":[],"group_43":[],"group_49":[],"group_51":[],"group_52":[],"group_53":[],"group_55":[],"group_56":[],"group_58":[]}],"Section_control":{"code":"UNS","section_identification":"S"},"Monetary_amount":[],"Control_total":[],"group_60":[],"Message_trailer":{"code":"UNT","number1":"9","number2":"1"}}

    ```

   ![Declare order variable](/img/develop/transform/edi/declare-document-var.png)

3. Click **+** and select **Call Function**. Under the **documents** section, select **toEdiString**. Set **Data** to `document` and **Result** to `ediResult`, then click **Save**.

   ![Configure toEdiString inputs](/img/develop/transform/edi/populate-to-edi-string.png)

4. Click **+** and select **Log Info**. Set **Msg** to `ediResult`, then click **Save**.

   ![Configure Log Info with ediResult](/img/develop/transform/edi/log-print-info.png)

```ballerina
import ballerina/log;

import <add-org-name>/documents;

public function main() returns error? {
    do {
        documents:ORDERS document = {"Message_header":{"code":"UNH","message_reference_number":"1","message_information":{"name":"ORDERS","catagory":"D","version":"96A","status":"UN"}},"Beginning_of_message":{"code":"BGM","DOCUMENT_MESSAGE_NAME":{"Document_name_code":"220"},"DOCUMENT_MESSAGE_IDENTIFICATION":{"Document_identifier":"PO-001"},"MESSAGE_FUNCTION_CODE":"9"},"Date_time_period":[{"code":"DTM","DATE_TIME_PERIOD":{"Date_or_time_or_period":"137","Date_or_time_or_period_text":"20260511","Date_or_time_or_period_format_code":"102"}}],"Additional_information":[],"Item_description":[],"Free_text":[],"Related_identification_numbers":[],"group_1":[],"group_2":[{"Name_and_address":{"code":"NAD","PARTY_FUNCTION_CODE_QUALIFIER":"BY","PARTY_IDENTIFICATION_DETAILS":{"Party_identifier":"123456789","Code_list_identification_code":"","Code_list_responsible_agency_code":"9"},"NAME_AND_ADDRESS":null,"PARTY_NAME":{"Party_name":"ACME Corp"}},"Place_location_identification":[],"Financial_institution_information":[],"group_3":[],"group_4":[],"group_5":[]}],"group_6":[],"group_7":[],"group_8":[],"group_10":[],"group_12":[],"group_13":[],"group_15":[],"group_16":[],"group_18":[],"group_19":[],"group_25":[],"group_26":[],"group_28":[{"Line_item":{"code":"LIN","LINE_ITEM_IDENTIFIER":"1","ITEM_NUMBER_IDENTIFICATION":{"Item_identifier":"PROD-001","Item_type_identification_code":"SA"}},"Additional_product_id":[],"Item_description":[],"Measurements":[],"Quantity":[{"code":"QTY","QUANTITY_DETAILS":{"Quantity_type_code_qualifier":"21","Quantity":"10"}}],"Percentage_details":[],"Additional_information":[],"Date_time_period":[],"Monetary_amount":[],"Processing_information":[],"Goods_identity_number":[],"Related_identification_numbers":[],"Document_message_details":[],"Maintenance_operation_details":[],"Free_text":[],"group_29":[],"group_30":[],"group_32":[{"Price_details":{"code":"PRI","PRICE_INFORMATION":{"Price_code_qualifier":"AAA","Price_amount":25}},"Additional_price_information":[],"Date_time_period":[]}],"group_33":[],"group_34":[],"group_37":[],"group_38":[],"group_39":[],"group_43":[],"group_49":[],"group_51":[],"group_52":[],"group_53":[],"group_55":[],"group_56":[],"group_58":[]}],"Section_control":{"code":"UNS","section_identification":"S"},"Monetary_amount":[],"Control_total":[],"group_60":[],"Message_trailer":{"code":"UNT","number1":"9","number2":"1"}};
        string ediResult = check documents:toEdiString(document);
        log:printInfo(ediResult);
    } on fail error e {
        log:printError("Error occurred", 'error = e);
        return e;
    }
}
```

## EDI to JSON/XML conversion

A common integration pattern is converting EDI documents to JSON or XML for downstream systems.

1. After parsing the EDI message into `document` (see [Parsing EDI documents](#parsing-edi-documents)), click **+** and select **Declare Variable**.
2. Set **Name** to `jsonOrder`, **Type** to `json`, and **Expression** to `document.toJson()`, then click **Save**.

   ![Declare JSON variable](/img/develop/transform/edi/declare-json-variable.png)

3. Click **+** and select **Call Function**. Under the `io` section, select **fileWriteJson**. Set **Path** to `order.json` and **Content** to `jsonOrder`, then click **Save**.

   ![Configure fileWriteJson inputs](/img/develop/transform/edi/populate-file-write-json.png)

```ballerina
import ballerina/io;
import ballerina/log;

import <add-org-name>/documents;

public function main() returns error? {
    do {
        string ediContent = check io:fileReadString("order.edi");
        documents:ORDERS document = check documents:fromEdiString(ediContent);
        json jsonDocument = document.toJson();
        check io:fileWriteJson("order.json", jsonDocument);
    } on fail error e {
        log:printError("Error occurred", 'error = e);
        return e;
    }
}
```

To convert to XML instead, use the `ballerina/data.xmldata` module:

```ballerina
import ballerina/data.xmldata;
import ballerina/io;

xml orderXml = check xmldata:toXml(document);
check io:fileWriteString("order.xml", orderXml.toString());
```

## JSON schema for custom EDI formats

If you work with a non-standard or proprietary EDI format, you can define your own schema as a JSON file and generate Ballerina types from it. This is the same underlying mechanism that `convertEdifactSchema` uses internally.

Define your schema:

```json
{
  "name": "Document",
  "delimiters": {
    "segment": "~",
    "field": "*",
    "component": ":",
    "repetition": "^"
  },
  "segments": [
    {
      "code": "BEG",
      "tag": "BEG",
      "minOccurs": 1,
      "maxOccurs": 1,
      "fields": [
        {"tag": "purposeCode"},
        {"tag": "typeCode"},
        {"tag": "poNumber"},
        {"tag": "releaseNumber"},
        {"tag": "date"}
      ]
    },
    {
      "code": "SE",
      "tag": "SE",
      "minOccurs": 1,
      "maxOccurs": -1,
      "fields": [
        {"tag": "code"},
        {"tag": "segmentCount"},
        {"tag": "controlNumber"}
      ]
    }
  ]
}
```

Then generate Ballerina code from it:

```bash
bal edi codegen -i schema.json -o document.bal
```

For organizations managing multiple custom schemas, use `libgen` to generate a full reusable package:

```bash
bal edi libgen -p <org-name/package-name> -i <schemas-folder> -o <output-folder>
```

## Low-level EDI processing

For dynamic or schema-less scenarios, use the `ballerina/edi` module directly to parse EDI into JSON at runtime.

1. Click **+** and select **Call Function**. Under the `io` section, select **fileReadString**. Set **Path** to the path of your EDI file and **Result** to `ediText`, then click **Save**.
2. Click **+** and select **Call Function**. Under the `io` section, select **fileReadJson**. Set **Path** to the path of your schema file and **Result** to `schema`, then click **Save**.
3. Click **+** and select **Declare Variable**. Set **Name** to `ediSchema`, **Type** to `edi:EdiSchema`, and **Expression** to `check schema.fromJsonWithType()`, then click **Save**.
4. Click **+** and select **Call Function**. Under the `edi` section, select **fromEdiString**. Set **Edi Text** to `ediText`, **Schema** to `ediSchema`, and **Result** to `orderData`, then click **Save**.

```ballerina
import ballerina/edi;
import ballerina/io;

public function main() returns error? {
    string ediText = check io:fileReadString("order.edi");

    json schema = check io:fileReadJson("orders_schema.json");
    edi:EdiSchema ediSchema = check schema.fromJsonWithType();

    json orderData = check edi:fromEdiString(ediText, ediSchema);
    io:println(orderData.toJsonString());
}
```

## Best practices

- **Generate code from schemas** rather than parsing EDI manually — the generated records and functions handle segment delimiters, escape characters, and validation
- **Use packages for reuse** — bundle frequently used EDI schemas into shared Ballerina packages
- **Validate early** — parse EDI at the integration boundary to catch format errors before business logic executes
- **Convert to records immediately** — work with typed records throughout your integration and serialize back to EDI only at the output boundary

## What's next

- [Type System & Records](type-system-records.md) — Define EDI record types
