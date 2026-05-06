---
title: Migrate from Azure Logic Apps
---

# Migrate from Azure Logic Apps

## Overview

The Azure Logic Apps migration tool converts Logic Apps workflow definitions (ARM templates and workflow JSON) to Ballerina code. It handles triggers, actions, connectors, control flow, error handling patterns and more.

## Run the Azure Logic Apps migration tool

Currently, wizard-based migration is not available for Azure Logic Apps. Please use the CLI instructions in the next tab.

You can migrate Azure Logic Apps projects using the Ballerina CLI tool. Follow these steps:

### CLI prerequisite
- Ensure Ballerina is installed, and the `bal` command is available in your environment.

### Steps
1. **Install the migration tool:**
   Install the migration tool by running:
   ```bash
   bal tool pull migrate-logicapps
   ```
2. **Run the migration command:**
   Use the following command syntax to migrate your projects:
   ```bash
   bal migrate-logicapps <source-project-directory-or-file> [-o|--out <output-directory>] [-v|--verbose] [-m|--multi-root]
   ```

#### Key parameters
- `<source-project-directory-or-file>`: Path to the directory containing multiple Logic App JSON files or a single Logic App JSON file to be migrated.
- `-o, --out <output-directory>`: (Optional) Directory where the new Ballerina package will be created.
  - For a project directory input, the new Ballerina package is created inside the source project directory.
  - For a single JSON file, the new Ballerina package is created in the same directory as the source file.
- `-v, --verbose`: (Optional) Enable verbose output during conversion.
- `-m, --multi-root`: (Optional) Treat each child directory as a separate project and convert all of them. The source must be a directory containing multiple Logic App JSON files.

### Examples

Here are some example commands you can use:

- Migrate a Logic Apps JSON file to a specific output directory:
  ```bash
  bal migrate-logicapps /path/to/logic-app-control-flow.json --out /path/to/output-dir
  ```

- Migrate all Logic Apps JSON files in a directory (multi-root mode):
  ```bash
  bal migrate-logicapps /path/to/logic-apps-file-directory --out /path/to/output-dir --multi-root
  ```

> **NOTE:** In multi-root mode, ensure that only Logic Apps JSON files are present in the directory. Do not include any unrelated JSON files.

## Component mapping

| Logic Apps component | Ballerina equivalent |
|---|---|
| HTTP Trigger | `http:Listener` + service |
| Recurrence Trigger | `task:Listener` with scheduled job |
| HTTP Action | `http:Client` |
| SQL Connector | `mysql:Client` / `mssql:Client` |
| Service Bus | JMS / message broker connector |
| Compose Action | Variable assignment / record construction |
| Parse JSON | JSON data binding / record types |
| Condition | `if/else` |
| Switch | `match` |
| For Each | `foreach` |
| Until (Loop) | `while` |
| Scope (Try-Catch) | `do/on fail` error handler |
| Initialize Variable | Variable declaration |
| Set Variable | Variable assignment |
| Send Email | Email connector client |
| Blob Storage | Azure Storage connector |
| Response Action | `return` statement |

## Example: Logic Apps workflow to Ballerina service

**Azure Logic Apps workflow (JSON):**
```json
{
  "definition": {
    "triggers": {
      "manual": {
        "type": "Request",
        "kind": "Http",
        "inputs": {
          "method": "GET",
          "relativePath": "/orders/{orderId}"
        }
      }
    },
    "actions": {
      "Get_order": {
        "type": "Http",
        "inputs": {
          "method": "GET",
          "uri": "https://backend/orders/@{triggerOutputs()['relativePathParameters']['orderId']}"
        }
      },
      "Response": {
        "type": "Response",
        "inputs": {
          "statusCode": 200,
          "body": "@body('Get_order')"
        }
      }
    }
  }
}
```

**Generated Ballerina code:**
```ballerina
import ballerina/http;
import ballerina/log;

configurable string backendUrl = "https://backend";

final http:Client backendClient = check new (backendUrl);

service /orders on new http:Listener(8090) {

    resource function get [string orderId]() returns json|error {
        log:printInfo("Processing order request", orderId = orderId);

        json response = check backendClient->get("/orders/" + orderId);
        return response;
    }
}
```

## Migration report

After migration, the tool generates a report listing successfully migrated components and items that require manual attention.

```
Migration Report: OrderWorkflow
===================================

Migrated Successfully:
  - Trigger: HTTP Request -> http:Listener resource
  - Action: Get_order -> http:Client request
  - Action: Response -> return statement

Requires Manual Review:
  - Connection: SQL_Connection -> Needs Config.toml configuration
  - Action: Send_Email -> Email connector needs credentials

Unsupported (Manual Migration Required):
  - Custom Connector: SAP_Connector -> Replace with appropriate connector
  - Azure Function Action: ProcessData -> Rewrite in Ballerina
```
