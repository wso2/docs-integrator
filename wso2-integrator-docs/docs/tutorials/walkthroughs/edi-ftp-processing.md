---
sidebar_position: 5
title: "Process EDI Documents from FTP"
description: "End-to-end walkthrough: Build an integration that polls an FTP server for EDI documents, parses them, and syncs the data to a business application."
---

# Process EDI Documents from FTP

Build an integration that monitors an FTP server for incoming EDI files, parses them into structured data, validates the content, and pushes the results to a business application. EDI over FTP is a cornerstone of B2B integration in supply chain, retail, and logistics.

## What You'll Build

An automated pipeline that polls an SFTP server for incoming X12 850 Purchase Orders, parses them, validates mandatory fields, transforms them into a JSON format, and creates corresponding sales orders in a REST-based ERP system.

## What You'll Learn

- Connecting to FTP/SFTP servers with Ballerina
- Polling for new files on a schedule
- Parsing EDI (X12) documents into Ballerina records
- Validating EDI content against business rules
- Transforming EDI data into REST API payloads
- Moving processed files to archive folders

## Prerequisites

- WSO2 Integrator VS Code extension installed
- An FTP or SFTP server (or a local FTP server for testing)
- Basic understanding of EDI X12 format
- A target REST API (mocked in this tutorial)

**Time estimate:** 45 minutes

## Architecture

```
┌─────────────┐    ┌────────────────────────────────────┐    ┌──────────┐
│   Trading   │    │          EDI Processing Service     │    │          │
│   Partner   │    │                                     │    │   ERP    │
│             │    │  ┌─────────┐  ┌────────┐  ┌──────┐ │    │  System  │
│  Sends EDI  ├───►│  │  Poll   ├─►│ Parse  ├─►│Valdt.│ ├───►│          │
│  via SFTP   │    │  │  SFTP   │  │  EDI   │  │      │ │    │ (REST)   │
│             │    │  └─────────┘  └────────┘  └──┬───┘ │    │          │
└─────────────┘    │                              │      │    └──────────┘
                   │  ┌─────────┐  ┌────────────┐ │      │
                   │  │ Archive ◄──┤ Transform  │◄┘      │
                   │  │ File    │  │ to JSON    │        │
                   │  └─────────┘  └────────────┘        │
                   └────────────────────────────────────┘
```

## Step 1: Create the Project

```bash
bal new edi_ftp_processor
cd edi_ftp_processor
```

## Step 2: Define the Data Types

```ballerina
// types.bal

// Parsed EDI 850 Purchase Order
type PurchaseOrder record {|
    string poNumber;
    string poDate;
    string buyerId;
    string buyerName;
    string shipToAddress;
    string shipToCity;
    string shipToState;
    string shipToZip;
    LineItem[] lineItems;
    decimal totalAmount;
|};

type LineItem record {|
    int lineNumber;
    string productId;
    string description;
    int quantity;
    string unitOfMeasure;
    decimal unitPrice;
    decimal lineTotal;
|};

// Target: ERP Sales Order
type SalesOrder record {|
    string externalRef;
    string customerCode;
    string orderDate;
    SalesOrderLine[] lines;
    Address shippingAddress;
    decimal subtotal;
|};

type SalesOrderLine record {|
    string sku;
    string description;
    int qty;
    decimal price;
|};

type Address record {|
    string street;
    string city;
    string state;
    string postalCode;
|};

// Processing result
type ProcessingResult record {|
    string fileName;
    string status;       // "success", "validation_failed", "error"
    string? erpOrderId;
    string[] errors;
|};
```

## Step 3: Build the SFTP Poller

```ballerina
// sftp_poller.bal
import ballerina/ftp;
import ballerina/log;
import ballerina/task;

configurable string sftpHost = ?;
configurable int sftpPort = 22;
configurable string sftpUser = ?;
configurable string sftpPassword = ?;
configurable string inboxPath = "/edi/inbox";
configurable string archivePath = "/edi/archive";
configurable string errorPath = "/edi/error";
configurable int pollIntervalSeconds = 30;

final ftp:Client sftpClient = check new ({
    host: sftpHost,
    port: sftpPort,
    auth: {
        credentials: {
            username: sftpUser,
            password: sftpPassword
        }
    },
    protocol: ftp:SFTP
});

function init() returns error? {
    _ = check task:scheduleJobRecurByFrequency(new SftpPollJob(), pollIntervalSeconds);
    log:printInfo("EDI FTP processor started",
        host = sftpHost,
        inbox = inboxPath,
        interval = pollIntervalSeconds
    );
}

class SftpPollJob {
    *task:Job;

    public function execute() {
        ftp:FileInfo[]|error files = sftpClient->list(inboxPath);
        if files is error {
            log:printError("Failed to list SFTP directory", 'error = files);
            return;
        }

        foreach ftp:FileInfo file in files {
            if file.name.endsWith(".edi") || file.name.endsWith(".x12") {
                log:printInfo("Processing EDI file", fileName = file.name);
                ProcessingResult|error result = processEdiFile(file.name);
                if result is error {
                    log:printError("Failed to process file",
                        fileName = file.name,
                        'error = result
                    );
                    moveFile(file.name, errorPath);
                } else {
                    log:printInfo("File processed",
                        fileName = result.fileName,
                        status = result.status
                    );
                    if result.status == "success" {
                        moveFile(file.name, archivePath);
                    } else {
                        moveFile(file.name, errorPath);
                    }
                }
            }
        }
    }
}

function readFileContent(string fileName) returns string|error {
    string filePath = string `${inboxPath}/${fileName}`;
    stream<byte[] & readonly, error?> fileStream = check sftpClient->get(filePath);
    byte[] content = [];
    check from byte[] chunk in fileStream
        do {
            content.push(...chunk);
        };
    return string:fromBytes(content);
}

function moveFile(string fileName, string targetDir) {
    string sourcePath = string `${inboxPath}/${fileName}`;
    string targetPath = string `${targetDir}/${fileName}`;
    error? result = sftpClient->rename(sourcePath, targetPath);
    if result is error {
        log:printError("Failed to move file",
            fileName = fileName,
            target = targetDir,
            'error = result
        );
    }
}
```

## Step 4: Build the EDI Parser

```ballerina
// edi_parser.bal
import ballerina/log;
import ballerina/regex;

function parseX12PurchaseOrder(string ediContent) returns PurchaseOrder|error {
    // Split EDI into segments (segment terminator is typically ~)
    string[] segments = regex:split(ediContent.trim(), "~");

    string poNumber = "";
    string poDate = "";
    string buyerId = "";
    string buyerName = "";
    string shipToAddress = "";
    string shipToCity = "";
    string shipToState = "";
    string shipToZip = "";
    LineItem[] lineItems = [];
    int lineNumber = 0;

    foreach string segment in segments {
        string trimmed = segment.trim();
        string[] elements = regex:split(trimmed, "\\*");

        if elements.length() == 0 {
            continue;
        }

        string segmentId = elements[0];

        match segmentId {
            "BEG" => {
                // BEG*00*NE*PO12345**20250301~
                if elements.length() > 3 {
                    poNumber = elements[3];
                }
                if elements.length() > 5 {
                    poDate = elements[5];
                }
            }
            "N1" => {
                // N1*BY*Acme Corp*92*BUYER123~
                if elements.length() > 1 && elements[1] == "BY" {
                    buyerName = elements.length() > 2 ? elements[2] : "";
                    buyerId = elements.length() > 4 ? elements[4] : "";
                }
                if elements.length() > 1 && elements[1] == "ST" {
                    // Ship-to name (handled via N3/N4)
                }
            }
            "N3" => {
                // N3*123 Main St~
                if elements.length() > 1 {
                    shipToAddress = elements[1];
                }
            }
            "N4" => {
                // N4*Springfield*IL*62704~
                shipToCity = elements.length() > 1 ? elements[1] : "";
                shipToState = elements.length() > 2 ? elements[2] : "";
                shipToZip = elements.length() > 3 ? elements[3] : "";
            }
            "PO1" => {
                // PO1*1*10*EA*25.00*BP*SKU-001~
                lineNumber += 1;
                LineItem item = {
                    lineNumber: lineNumber,
                    productId: elements.length() > 7 ? elements[7] : "",
                    description: "",
                    quantity: elements.length() > 2 ? check int:fromString(elements[2]) : 0,
                    unitOfMeasure: elements.length() > 3 ? elements[3] : "EA",
                    unitPrice: elements.length() > 4 ? check decimal:fromString(elements[4]) : 0d,
                    lineTotal: 0d
                };
                item.lineTotal = <decimal>item.quantity * item.unitPrice;
                lineItems.push(item);
            }
        }
    }

    decimal totalAmount = 0d;
    foreach LineItem item in lineItems {
        totalAmount += item.lineTotal;
    }

    log:printInfo("EDI parsed", poNumber = poNumber, lineCount = lineItems.length());

    return {
        poNumber, poDate, buyerId, buyerName,
        shipToAddress, shipToCity, shipToState, shipToZip,
        lineItems, totalAmount
    };
}
```

## Step 5: Add Validation and Transformation

```ballerina
// validate_transform.bal
import ballerina/log;

function validatePurchaseOrder(PurchaseOrder po) returns string[] {
    string[] errors = [];

    if po.poNumber.trim().length() == 0 {
        errors.push("PO number is required");
    }
    if po.buyerId.trim().length() == 0 {
        errors.push("Buyer ID is required");
    }
    if po.lineItems.length() == 0 {
        errors.push("At least one line item is required");
    }
    foreach LineItem item in po.lineItems {
        if item.quantity <= 0 {
            errors.push(string `Line ${item.lineNumber}: quantity must be positive`);
        }
        if item.unitPrice <= 0d {
            errors.push(string `Line ${item.lineNumber}: unit price must be positive`);
        }
    }

    return errors;
}

function transformToSalesOrder(PurchaseOrder po) returns SalesOrder {
    SalesOrderLine[] lines = from LineItem item in po.lineItems
        select {
            sku: item.productId,
            description: item.description,
            qty: item.quantity,
            price: item.unitPrice
        };

    return {
        externalRef: po.poNumber,
        customerCode: po.buyerId,
        orderDate: formatDate(po.poDate),
        lines: lines,
        shippingAddress: {
            street: po.shipToAddress,
            city: po.shipToCity,
            state: po.shipToState,
            postalCode: po.shipToZip
        },
        subtotal: po.totalAmount
    };
}

function formatDate(string ediDate) returns string {
    // Convert YYYYMMDD to YYYY-MM-DD
    if ediDate.length() == 8 {
        return string `${ediDate.substring(0, 4)}-${ediDate.substring(4, 6)}-${ediDate.substring(6, 8)}`;
    }
    return ediDate;
}
```

## Step 6: Build the ERP Client and Orchestrator

```ballerina
// erp_client.bal
import ballerina/http;
import ballerina/log;

configurable string erpBaseUrl = ?;

final http:Client erpClient = check new (erpBaseUrl);

function processEdiFile(string fileName) returns ProcessingResult|error {
    // Step 1: Read EDI content from SFTP
    string ediContent = check readFileContent(fileName);

    // Step 2: Parse EDI
    PurchaseOrder po = check parseX12PurchaseOrder(ediContent);

    // Step 3: Validate
    string[] validationErrors = validatePurchaseOrder(po);
    if validationErrors.length() > 0 {
        log:printWarn("Validation failed", fileName = fileName, errors = validationErrors);
        return {
            fileName: fileName,
            status: "validation_failed",
            erpOrderId: (),
            errors: validationErrors
        };
    }

    // Step 4: Transform to ERP format
    SalesOrder salesOrder = transformToSalesOrder(po);

    // Step 5: Send to ERP
    json|error erpResponse = erpClient->post("/api/sales-orders", salesOrder.toJson());
    if erpResponse is error {
        return {
            fileName: fileName,
            status: "error",
            erpOrderId: (),
            errors: [string `ERP submission failed: ${erpResponse.message()}`]
        };
    }

    string erpOrderId = check erpResponse.orderId;
    log:printInfo("Sales order created in ERP",
        poNumber = po.poNumber,
        erpOrderId = erpOrderId
    );

    return {
        fileName: fileName,
        status: "success",
        erpOrderId: erpOrderId,
        errors: []
    };
}
```

## Step 7: Test the Pipeline

Start the service:

```bash
bal run
```

Place a sample EDI file on the SFTP server at `/edi/inbox/test-po.edi`:

```
ISA*00*          *00*          *ZZ*SENDER         *ZZ*RECEIVER       *210301*1200*U*00401*000000001*0*T*:~
GS*PO*SENDER*RECEIVER*20250301*1200*1*X*004010~
ST*850*0001~
BEG*00*NE*PO-2025-001**20250301~
N1*BY*Acme Corporation*92*ACME001~
N1*ST*Warehouse A~
N3*456 Shipping Lane~
N4*Chicago*IL*60601~
PO1*1*10*EA*25.00*BP*SKU-WIDGET-A~
PO1*2*5*EA*49.99*BP*SKU-GADGET-B~
CTT*2~
SE*10*0001~
GE*1*1~
IEA*1*000000001~
```

Check the service logs for processing status and verify the file was moved to the archive folder.

## Extend It

- **Add acknowledgment generation** -- Send back an X12 997 Functional Acknowledgment
- **Support multiple EDI document types** -- Handle 810 (Invoice), 856 (Ship Notice), and others
- **Add EDIFACT support** -- Parse international EDIFACT documents alongside X12
- **Add a monitoring dashboard** -- Track file processing rates and error counts

## What's Next

- [Data Formats & Standards Connectors](../../connectors/data-formats-standards.md) -- EDI, FHIR, and SOAP connectors
- [File Processing](../../develop/build/file-processing.md) -- File handling patterns
- [EDI Transformation](../../develop/transform/edi.md) -- EDI data transformation reference
- [FTP EDI to Salesforce](../pre-built/ftp-edi-salesforce.md) -- Pre-built sample for EDI to Salesforce
