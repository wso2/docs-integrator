---
sidebar_position: 10
title: "FTP EDI to Salesforce Opportunity"
description: "Pre-built integration sample: Process EDI purchase order files from an FTP server and create Salesforce opportunities using Ballerina."
---

# FTP EDI to Salesforce Opportunity

Process EDI (Electronic Data Interchange) 850 purchase order files from an FTP server and automatically create corresponding Salesforce opportunity records. This integration monitors an FTP directory for new EDI files, parses the EDI X12 850 format to extract order details, and creates opportunities in Salesforce with the appropriate line items.

<!-- TODO: diagram -->

## Prerequisites

- WSO2 Integrator VS Code extension installed
- FTP or SFTP server with a directory containing EDI 850 files
- Salesforce developer account with a connected app and OAuth 2.0 credentials
- Familiarity with the EDI X12 850 (Purchase Order) format

## Quick Run

```bash
# Clone the samples repository
git clone https://github.com/wso2/integrator-samples.git
cd integrator-samples/ftp-edi-to-salesforce-opportunity

# Copy and edit the configuration file with your credentials
cp Config-example.toml Config.toml
# Edit Config.toml with your FTP and Salesforce credentials

# Run the integration
bal run
```

## Configuration

Add the following to your `Config.toml`:

```toml
[ftp]
host = "ftp.example.com"
port = 21
username = "<FTP_USER>"
password = "<FTP_PASSWORD>"
inboundDirectory = "/edi/inbound"
processedDirectory = "/edi/processed"
pollingIntervalSeconds = 30

[salesforce]
clientId = "<SF_CLIENT_ID>"
clientSecret = "<SF_CLIENT_SECRET>"
refreshToken = "<SF_REFRESH_TOKEN>"
baseUrl = "https://your-instance.salesforce.com"
```

## Code Walkthrough

### Project Structure

```
ftp-edi-to-salesforce-opportunity/
├── Ballerina.toml
├── Config.toml
├── Config-example.toml
├── main.bal
├── ftp_client.bal
├── edi_parser.bal
├── sf_client.bal
└── types.bal
```

### Defining the Data Types

```ballerina
// Parsed EDI 850 Purchase Order
type PurchaseOrder record {|
    string poNumber;
    string buyerName;
    string buyerAccountId;
    string orderDate;
    string currency;
    PurchaseOrderLine[] lineItems;
    decimal totalAmount;
|};

type PurchaseOrderLine record {|
    string productCode;
    string description;
    int quantity;
    decimal unitPrice;
    decimal lineTotal;
|};

// Salesforce Opportunity record
type SalesforceOpportunity record {|
    string Name;
    string StageName;
    string CloseDate;
    decimal Amount;
    string AccountId;
    string Description;
    string PO_Number__c;
|};

// Salesforce OpportunityLineItem
type SalesforceLineItem record {|
    string OpportunityId;
    string PricebookEntryId;
    int Quantity;
    decimal UnitPrice;
|};
```

### Monitoring FTP for New EDI Files

```ballerina
import ballerina/ftp;
import ballerina/log;

configurable ftp:ClientConfiguration ftpConfig = ?;
configurable string inboundDirectory = ?;
configurable string processedDirectory = ?;

final ftp:Client ftpClient = check new (ftpConfig);

listener ftp:Listener ftpListener = new ({
    host: ftpConfig.host,
    auth: ftpConfig.auth,
    path: inboundDirectory,
    pollingInterval: 30,
    fileNamePattern: "*.edi"
});

service on ftpListener {
    remote function onFileChange(ftp:WatchEvent event) returns error? {
        foreach ftp:FileInfo file in event.addedFiles {
            log:printInfo("New EDI file detected", fileName = file.name);

            // Download the file content
            byte[] content = check ftpClient->get(file.pathDecoded);
            string ediContent = check string:fromBytes(content);

            // Parse and process the EDI file
            PurchaseOrder po = check parseEdi850(ediContent);
            check createSalesforceOpportunity(po);

            // Move file to processed directory
            check ftpClient->rename(
                file.pathDecoded,
                processedDirectory + "/" + file.name
            );
            log:printInfo("EDI file processed and moved",
                fileName = file.name,
                poNumber = po.poNumber);
        }
    }
}
```

### Parsing EDI X12 850 Format

```ballerina
import ballerina/log;
import ballerina/regex;

function parseEdi850(string ediContent) returns PurchaseOrder|error {
    // Split the EDI document into segments
    string[] segments = regex:split(ediContent, "~");

    string poNumber = "";
    string buyerName = "";
    string orderDate = "";
    PurchaseOrderLine[] lineItems = [];
    decimal totalAmount = 0;

    foreach string segment in segments {
        string trimmed = segment.trim();
        string[] elements = regex:split(trimmed, "\\*");

        if elements.length() == 0 {
            continue;
        }

        match elements[0] {
            "BEG" => {
                // BEG segment: Beginning of Purchase Order
                poNumber = elements.length() > 3 ? elements[3] : "";
                orderDate = elements.length() > 5 ? elements[5] : "";
            }
            "N1" => {
                // N1 segment: Party identification (buyer)
                if elements.length() > 2 && elements[1] == "BY" {
                    buyerName = elements[2];
                }
            }
            "PO1" => {
                // PO1 segment: Line item detail
                if elements.length() >= 5 {
                    int qty = check int:fromString(elements[2]);
                    decimal price = check decimal:fromString(elements[4]);
                    string productCode = elements.length() > 7 ? elements[7] : "";
                    string description = elements.length() > 8 ? elements[8] : "";

                    PurchaseOrderLine line = {
                        productCode: productCode,
                        description: description,
                        quantity: qty,
                        unitPrice: price,
                        lineTotal: <decimal>qty * price
                    };
                    lineItems.push(line);
                    totalAmount += line.lineTotal;
                }
            }
        }
    }

    log:printInfo("Parsed EDI 850",
        poNumber = poNumber,
        lineItemCount = lineItems.length(),
        totalAmount = totalAmount);

    return {
        poNumber: poNumber,
        buyerName: buyerName,
        buyerAccountId: "",
        orderDate: formatEdiDate(orderDate),
        currency: "USD",
        lineItems: lineItems,
        totalAmount: totalAmount
    };
}

// Convert EDI date format (YYYYMMDD) to Salesforce format (YYYY-MM-DD)
function formatEdiDate(string ediDate) returns string {
    if ediDate.length() == 8 {
        return ediDate.substring(0, 4) + "-" + ediDate.substring(4, 6) + "-" + ediDate.substring(6, 8);
    }
    return ediDate;
}
```

### Creating the Salesforce Opportunity

```ballerina
import ballerinax/salesforce;
import ballerina/log;

configurable salesforce:ConnectionConfig sfConfig = ?;

final salesforce:Client sfClient = check new (sfConfig);

function createSalesforceOpportunity(PurchaseOrder po) returns error? {
    // Look up or create the account
    string accountId = check resolveAccount(po.buyerName);

    // Create the Opportunity
    SalesforceOpportunity opp = {
        Name: string `PO-${po.poNumber}`,
        StageName: "Qualification",
        CloseDate: po.orderDate,
        Amount: po.totalAmount,
        AccountId: accountId,
        Description: string `EDI 850 Purchase Order with ${po.lineItems.length()} line items`,
        PO_Number__c: po.poNumber
    };

    salesforce:CreationResponse oppResponse = check sfClient->create("Opportunity", opp);
    string opportunityId = oppResponse.id;

    // Create line items for the opportunity
    foreach PurchaseOrderLine line in po.lineItems {
        string? pbeId = check lookupPricebookEntry(line.productCode);
        if pbeId is string {
            SalesforceLineItem lineItem = {
                OpportunityId: opportunityId,
                PricebookEntryId: pbeId,
                Quantity: line.quantity,
                UnitPrice: line.unitPrice
            };
            _ = check sfClient->create("OpportunityLineItem", lineItem);
        } else {
            log:printWarn("Product not found, skipping line item",
                productCode = line.productCode);
        }
    }

    log:printInfo("Created Salesforce opportunity from EDI",
        opportunityId = opportunityId,
        poNumber = po.poNumber,
        amount = po.totalAmount);
}

function resolveAccount(string buyerName) returns string|error {
    string query = string `SELECT Id FROM Account WHERE Name = '${buyerName}' LIMIT 1`;
    stream<record {string Id;}, error?> results = check sfClient->query(query);
    record {string Id;}? account = check results.next();
    check results.close();

    if account is record {string Id;} {
        return account.Id;
    }

    // Create a new account if not found
    salesforce:CreationResponse response = check sfClient->create("Account", {Name: buyerName});
    return response.id;
}

function lookupPricebookEntry(string productCode) returns string?|error {
    string query = string `SELECT Id FROM PricebookEntry
        WHERE Product2.ProductCode = '${productCode}'
        AND Pricebook2.IsStandard = true LIMIT 1`;
    stream<record {string Id;}, error?> results = check sfClient->query(query);
    record {string Id;}? entry = check results.next();
    check results.close();

    return entry is record {string Id;} ? entry.Id : ();
}
```

### Key Points

- **FTP listener**: The integration uses the Ballerina FTP listener to detect new EDI files as they arrive in the inbound directory.
- **EDI parsing**: The X12 850 format is parsed segment by segment, extracting key fields from BEG (order header), N1 (buyer info), and PO1 (line items) segments.
- **File lifecycle**: After processing, files are moved from the inbound directory to a processed directory to prevent reprocessing.
- **Account resolution**: The buyer name from the EDI file is used to look up or create a Salesforce Account.

## Customization Notes

- **Support SFTP**: Switch from FTP to SFTP by updating the listener and client configuration to use secure connections.
- **Handle EDI 855 responses**: Extend the integration to generate EDI 855 (Purchase Order Acknowledgment) files and upload them back to the FTP server.
- **Add validation**: Implement EDI document validation to check for mandatory segments and reject malformed files.
- **Error file directory**: Move files that fail parsing to a separate error directory instead of leaving them in the inbound folder.

## What's Next

- [Shopify to Outlook Welcome Email](shopify-outlook-email.md) -- Send welcome emails for new customers
- [MySQL to Salesforce Products](mysql-salesforce-products.md) -- Sync product catalogs from a database
- [Connectors Reference](../../connectors/index.md) -- Explore all available connectors
