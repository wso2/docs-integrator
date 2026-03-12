---
sidebar_position: 3
title: File Handlers
description: Build integrations that process files from FTP, SFTP, and local directories.
---

# File Handlers

File handlers trigger integrations when files arrive on FTP/SFTP servers or local directories. They are essential for ETL pipelines, batch processing, and B2B file-based integrations where partners exchange data as CSV, XML, JSON, or EDI files.

## FTP File Handler

Poll an FTP server for new files and process them as they arrive.

```ballerina
import ballerinax/ftp;
import ballerina/io;

configurable string ftpHost = "ftp.example.com";
configurable int ftpPort = 21;
configurable string ftpUser = ?;
configurable string ftpPassword = ?;

listener ftp:Listener ftpListener = new ({
    host: ftpHost,
    port: ftpPort,
    auth: {
        credentials: {
            username: ftpUser,
            password: ftpPassword
        }
    },
    path: "/incoming/orders",
    pollingInterval: 30,
    fileNamePattern: "*.csv"
});

service on ftpListener {

    remote function onFileChange(ftp:WatchEvent event, ftp:Caller caller) returns error? {
        foreach ftp:FileInfo file in event.addedFiles {
            log:printInfo("New file detected", name = file.name, size = file.size);

            // Download file content
            stream<io:Block, io:Error?> fileStream = check caller->get(file.pathDecoded);
            byte[] content = check readStream(fileStream);

            // Process the file
            check processOrderFile(file.name, content);

            // Move to processed directory
            check caller->rename(file.pathDecoded, "/processed/" + file.name);
        }
    }
}
```

### FTP Listener Configuration

| Parameter | Description | Default |
|---|---|---|
| `host` | FTP server hostname | Required |
| `port` | FTP server port | `21` |
| `path` | Directory to monitor | `/` |
| `pollingInterval` | Seconds between polls | `60` |
| `fileNamePattern` | Glob pattern for file matching | `*` |

## SFTP File Handler

Poll an SFTP server using SSH-based secure file transfer.

```ballerina
import ballerinax/ftp;
import ballerina/io;

configurable string sftpHost = "sftp.partner.com";
configurable int sftpPort = 22;
configurable string sftpUser = ?;
configurable string privateKeyPath = ?;

listener ftp:Listener sftpListener = new ({
    protocol: ftp:SFTP,
    host: sftpHost,
    port: sftpPort,
    auth: {
        privateKey: {
            path: privateKeyPath,
            password: ""
        },
        credentials: {
            username: sftpUser
        }
    },
    path: "/data/inbound",
    pollingInterval: 60,
    fileNamePattern: "*.xml"
});

service on sftpListener {

    remote function onFileChange(ftp:WatchEvent event, ftp:Caller caller) returns error? {
        foreach ftp:FileInfo file in event.addedFiles {
            log:printInfo("SFTP file received", name = file.name);

            stream<io:Block, io:Error?> fileStream = check caller->get(file.pathDecoded);
            byte[] content = check readStream(fileStream);

            // Parse and process XML content
            xml xmlContent = check xml:fromBytes(content);
            check processXmlData(xmlContent);

            // Archive after processing
            check caller->rename(file.pathDecoded, "/data/archive/" + file.name);
        }
    }
}
```

## Local File Handler

Watch a local directory for new files using the file system listener.

```ballerina
import ballerina/file;
import ballerina/io;

configurable string watchDir = "/data/incoming";

listener file:Listener localListener = new ({
    path: watchDir,
    recursive: false
});

service "fileWatcher" on localListener {

    remote function onCreate(file:FileEvent event) returns error? {
        string filePath = event.name;
        log:printInfo("New file created", path = filePath);

        // Read the file
        string content = check io:fileReadString(filePath);

        // Process based on file extension
        if filePath.endsWith(".csv") {
            check processCsvFile(filePath, content);
        } else if filePath.endsWith(".json") {
            json jsonContent = check content.fromJsonString();
            check processJsonFile(filePath, jsonContent);
        }
    }

    remote function onModify(file:FileEvent event) returns error? {
        log:printInfo("File modified", path = event.name);
    }

    remote function onDelete(file:FileEvent event) returns error? {
        log:printInfo("File deleted", path = event.name);
    }
}
```

## Processing File Content

### CSV File Processing

```ballerina
import ballerina/io;

type OrderRecord record {|
    string orderId;
    string customerId;
    string product;
    int quantity;
    decimal unitPrice;
|};

function processCsvFile(string filePath, string content) returns error? {
    // Read CSV with typed records
    OrderRecord[] orders = check io:fileReadCsv(filePath);

    foreach OrderRecord order in orders {
        decimal total = order.unitPrice * <decimal>order.quantity;
        log:printInfo("Order processed",
                      orderId = order.orderId,
                      total = total);
        check insertOrder(order);
    }

    log:printInfo("CSV processing complete", records = orders.length());
}
```

### JSON File Processing

```ballerina
import ballerina/io;

type ProductCatalog record {|
    string catalogId;
    string updatedAt;
    Product[] products;
|};

function processJsonFile(string filePath, json content) returns error? {
    ProductCatalog catalog = check content.fromJsonWithType();

    log:printInfo("Processing catalog",
                  catalogId = catalog.catalogId,
                  products = catalog.products.length());

    foreach Product product in catalog.products {
        check upsertProduct(product);
    }
}
```

### Batch Processing with Chunking

For large files, process records in chunks to manage memory and enable partial recovery.

```ballerina
function processBatchFile(string filePath) returns error? {
    stream<OrderRecord, io:Error?> recordStream = check io:fileReadCsvAsStream(filePath);
    int batchSize = 100;
    OrderRecord[] batch = [];
    int totalProcessed = 0;

    check from OrderRecord rec in recordStream
        do {
            batch.push(rec);
            if batch.length() >= batchSize {
                check insertOrderBatch(batch);
                totalProcessed += batch.length();
                log:printInfo("Batch processed", count = totalProcessed);
                batch = [];
            }
        };

    // Process remaining records
    if batch.length() > 0 {
        check insertOrderBatch(batch);
        totalProcessed += batch.length();
    }

    log:printInfo("File processing complete", total = totalProcessed);
}
```

## Error Handling for File Operations

```ballerina
service on ftpListener {

    remote function onFileChange(ftp:WatchEvent event, ftp:Caller caller) returns error? {
        foreach ftp:FileInfo file in event.addedFiles {
            do {
                check processFile(file, caller);
                check caller->rename(file.pathDecoded, "/processed/" + file.name);
            } on fail error e {
                log:printError("File processing failed",
                              file = file.name, 'error = e);
                // Move to error directory instead
                check caller->rename(file.pathDecoded, "/errors/" + file.name);
                // Send alert notification
                check sendAlert("File processing failed: " + file.name);
            }
        }
    }
}
```

## Writing Output Files

After processing, write results to files on FTP/SFTP or local directories.

```ballerina
import ballerinax/ftp;
import ballerina/io;

final ftp:Client ftpClient = check new ({
    host: "ftp.partner.com",
    port: 21,
    auth: {credentials: {username: "user", password: "pass"}}
});

function writeOutputFile(OrderSummary[] summaries) returns error? {
    // Write to local CSV first
    check io:fileWriteCsv("/tmp/summary.csv", summaries);

    // Upload to FTP
    byte[] content = check io:fileReadBytes("/tmp/summary.csv");
    stream<io:Block, io:Error?> byteStream = new (content);
    check ftpClient->put("/outbound/summary.csv", byteStream);

    log:printInfo("Output file uploaded", records = summaries.length());
}
```

## What's Next

- [Email](email.md) -- Send and receive email
- [Data Persistence](data-persistence.md) -- Store processed file data
- [CSV & Flat File Processing](/docs/develop/transform/csv-flat-file) -- Format-specific transformations
