---
sidebar_position: 18
title: "Productivity & Collaboration"
description: "Productivity and collaboration connectors for Google Workspace, Microsoft 365, Notion, and more in WSO2 Integrator."
---

# Productivity & Collaboration Connectors

Integrate with the tools your teams use every day. These connectors let you automate document workflows, sync calendar events, manage tasks, and bridge collaboration platforms with your backend systems.

## Available Connectors

| Connector | Package | Use Case |
|-----------|---------|----------|
| **Google Sheets** | `ballerinax/googleapis.sheets` | Read, write, and manage spreadsheet data |
| **Google Calendar** | `ballerinax/googleapis.calendar` | Create, update, and sync calendar events |
| **Google Drive** | `ballerinax/googleapis.drive` | Upload, download, and manage files and folders |
| **Gmail** | `ballerinax/googleapis.gmail` | Send, read, and manage email messages and labels |
| **Microsoft 365 (Outlook)** | `ballerinax/microsoft365` | Access email, calendar, and contacts through Microsoft Graph |
| **OneDrive** | `ballerinax/onedrive` | Manage files and folders in OneDrive and SharePoint |
| **Notion** | `ballerinax/notion` | Manage databases, pages, and blocks |
| **Asana** | `ballerinax/asana` | Create and manage tasks, projects, and workspaces |
| **Trello** | `ballerinax/trello` | Manage boards, lists, and cards |

## Quick Example

### Sync Data from a Database to Google Sheets

```ballerina
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/googleapis.sheets;

configurable string sheetsToken = ?;
configurable string spreadsheetId = ?;
configurable string dbHost = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;

final sheets:Client sheetsClient = check new ({
    auth: {
        token: sheetsToken
    }
});

final mysql:Client dbClient = check new (dbHost, dbUser, dbPassword, "sales_db");

type MonthlySales record {|
    string month;
    string region;
    decimal revenue;
    int orderCount;
|};

function syncSalesReport() returns error? {
    // Query sales data from MySQL
    stream<MonthlySales, sql:Error?> salesStream = dbClient->query(
        `SELECT month, region, revenue, order_count as orderCount
         FROM monthly_sales WHERE year = 2025 ORDER BY month`
    );

    // Build rows for Google Sheets
    (string|int|decimal)[][] rows = [];
    check from MonthlySales sale in salesStream
        do {
            rows.push([sale.month, sale.region, sale.revenue, sale.orderCount]);
        };

    // Write header and data to the spreadsheet
    check sheetsClient->setRange(spreadsheetId, "Sales Report", {
        values: [["Month", "Region", "Revenue", "Order Count"], ...rows]
    });
}
```

### Create a Notion Page from an Event

```ballerina
import ballerina/http;
import ballerinax/notion;

configurable string notionToken = ?;
configurable string databaseId = ?;

final notion:Client notionClient = check new ({
    auth: {
        token: notionToken
    }
});

service /api on new http:Listener(8090) {
    resource function post meeting\-notes(http:Request req) returns json|error {
        json payload = check req.getJsonPayload();

        notion:Page page = check notionClient->createPage({
            parent: {database_id: databaseId},
            properties: {
                "Name": {title: [{text: {content: check payload.title}}]},
                "Date": {date: {start: check payload.date}},
                "Status": {select: {name: "Draft"}}
            }
        });

        return {status: "created", pageId: page.id};
    }
}
```

## Configuration

```toml
# Google Sheets
[googleapis.sheets]
sheetsToken = "<GOOGLE_ACCESS_TOKEN>"
spreadsheetId = "<SPREADSHEET_ID>"

# Notion
[notion]
notionToken = "<NOTION_INTEGRATION_TOKEN>"
databaseId = "<NOTION_DATABASE_ID>"
```

## What's Next

- [Connection Configuration](configuration.md) -- How to set up and manage connections
- [Authentication Methods](authentication.md) -- OAuth 2.0, API keys, and other auth types
- [Google Sheets to Salesforce](../tutorials/pre-built/google-sheets-salesforce.md) -- Pre-built Google Sheets integration
- [Google Drive to OneDrive](../tutorials/pre-built/google-drive-onedrive.md) -- Pre-built file sync integration
