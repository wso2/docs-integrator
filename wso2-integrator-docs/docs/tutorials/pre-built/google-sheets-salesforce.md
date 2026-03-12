---
sidebar_position: 2
title: "Google Sheets to Salesforce Contacts"
description: "Pre-built integration sample: Automatically sync new Google Sheets rows to Salesforce contacts using Ballerina."
---

# Google Sheets to Salesforce Contacts

Automatically create or update Salesforce contacts whenever a new row is added to a Google Sheets spreadsheet. This sample listens for changes in your spreadsheet and maps each row to a Salesforce contact record, keeping your CRM up to date without manual data entry.

<!-- TODO: diagram -->

## Prerequisites

- WSO2 Integrator VS Code extension installed
- Google Cloud project with the Google Sheets API enabled and OAuth 2.0 credentials configured
- Salesforce developer account with a connected app and OAuth 2.0 credentials
- A Google Sheets spreadsheet with columns for contact fields (e.g., First Name, Last Name, Email, Phone)

## Quick Run

```bash
# Clone the samples repository
git clone https://github.com/wso2/integrator-samples.git
cd integrator-samples/google-sheets-to-salesforce-contacts

# Copy and edit the configuration file with your credentials
cp Config-example.toml Config.toml
# Edit Config.toml with your Google Sheets and Salesforce credentials

# Run the integration
bal run
```

## Configuration

Add the following to your `Config.toml`:

```toml
[googleSheets]
clientId = "<GOOGLE_CLIENT_ID>"
clientSecret = "<GOOGLE_CLIENT_SECRET>"
refreshToken = "<GOOGLE_REFRESH_TOKEN>"
spreadsheetId = "<SPREADSHEET_ID>"
sheetName = "Sheet1"

[salesforce]
clientId = "<SF_CLIENT_ID>"
clientSecret = "<SF_CLIENT_SECRET>"
refreshToken = "<SF_REFRESH_TOKEN>"
baseUrl = "https://your-instance.salesforce.com"
```

## Code Walkthrough

### Project Structure

```
google-sheets-to-salesforce-contacts/
├── Ballerina.toml
├── Config.toml
├── Config-example.toml
├── main.bal
└── types.bal
```

### Defining the Data Types

The `types.bal` file defines records that map spreadsheet columns to Salesforce contact fields:

```ballerina
// Represents a row in the Google Sheets spreadsheet
type SheetContactRow record {|
    string firstName;
    string lastName;
    string email;
    string phone;
    string company;
|};

// Salesforce contact record for the create/update operation
type SalesforceContact record {|
    string FirstName;
    string LastName;
    string Email;
    string Phone;
    string Account;
|};
```

### Listening for New Rows and Creating Contacts

The `main.bal` file sets up a scheduled job that polls the spreadsheet for new rows and creates corresponding contacts in Salesforce:

```ballerina
import ballerinax/googleapis.sheets;
import ballerinax/salesforce;
import ballerina/log;
import ballerina/task;

configurable sheets:ConnectionConfig googleSheetsConfig = ?;
configurable string spreadsheetId = ?;
configurable string sheetName = ?;

configurable salesforce:ConnectionConfig salesforceConfig = ?;

final sheets:Client sheetsClient = check new (googleSheetsConfig);
final salesforce:Client sfClient = check new (salesforceConfig);

int processedRowCount = 0;

public function main() returns error? {
    // Schedule polling every 5 minutes
    _ = check task:scheduleJobRecurByFrequency(new SyncJob(), 300);
}

class SyncJob {
    *task:Job;

    isolated function execute() {
        error? result = syncSheetToSalesforce();
        if result is error {
            log:printError("Sync failed", result);
        }
    }
}

function syncSheetToSalesforce() returns error? {
    // Fetch all rows from the spreadsheet
    sheets:Range range = check sheetsClient->getRange(spreadsheetId, sheetName, "A2:E");

    (string|int|decimal)[][] rows = range.values;

    // Process only new rows since the last poll
    foreach int i in processedRowCount ..< rows.length() {
        SheetContactRow contact = {
            firstName: rows[i][0].toString(),
            lastName: rows[i][1].toString(),
            email: rows[i][2].toString(),
            phone: rows[i][3].toString(),
            company: rows[i][4].toString()
        };

        SalesforceContact sfContact = transform(contact);
        _ = check sfClient->create("Contact", sfContact);
        log:printInfo("Created contact", firstName = contact.firstName, lastName = contact.lastName);
    }

    processedRowCount = rows.length();
}

// Transform spreadsheet row to Salesforce contact format
function transform(SheetContactRow row) returns SalesforceContact => {
    FirstName: row.firstName,
    LastName: row.lastName,
    Email: row.email,
    Phone: row.phone,
    Account: row.company
};
```

### Key Points

- **Polling approach**: The integration uses `task:scheduleJobRecurByFrequency` to poll for new rows at a configurable interval.
- **Incremental processing**: A `processedRowCount` tracker ensures only newly added rows are synced, avoiding duplicate contact creation.
- **Data transformation**: The `transform` function maps spreadsheet column names to Salesforce field names.

## Customization Notes

- **Change the polling interval**: Modify the frequency parameter in `task:scheduleJobRecurByFrequency` (value is in seconds).
- **Map additional fields**: Extend the `SheetContactRow` and `SalesforceContact` records to include fields like address, title, or department.
- **Upsert instead of create**: Replace `sfClient->create` with `sfClient->upsert` using an external ID field to avoid duplicate contacts when the same email is added again.
- **Add error notifications**: Integrate with Slack or email to send alerts when a sync operation fails.

## What's Next

- [Gmail to Salesforce Leads](gmail-salesforce-leads.md) -- Parse incoming emails and create leads with AI
- [MySQL to Salesforce Products](mysql-salesforce-products.md) -- Sync database records to Salesforce
- [Connectors Reference](../../connectors/index.md) -- Explore all available connectors
