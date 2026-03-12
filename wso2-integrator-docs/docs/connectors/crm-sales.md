---
sidebar_position: 10
title: "CRM & Sales"
description: "CRM and sales connectors for Salesforce, HubSpot, Pipedrive, and more in WSO2 Integrator."
---

# CRM & Sales Connectors

Integrate your workflows with leading CRM and sales platforms. These connectors let you sync contacts, manage leads and opportunities, automate sales pipelines, and keep customer data consistent across systems.

## Available Connectors

| Connector | Package | Use Case |
|-----------|---------|----------|
| **Salesforce** | `ballerinax/salesforce` | Manage accounts, contacts, leads, opportunities, and custom objects |
| **HubSpot** | `ballerinax/hubspot.crm` | Sync contacts, deals, and companies; automate marketing workflows |
| **Pipedrive** | `ballerinax/pipedrive` | Track deals, manage sales pipelines, and sync activities |
| **Zoho CRM** | `ballerinax/zohocrm` | Manage leads, contacts, deals, and custom modules |
| **Microsoft Dynamics 365** | `ballerinax/dynamics365` | Access accounts, contacts, opportunities, and business processes |
| **Freshsales** | `ballerinax/freshsales` | Manage leads, contacts, accounts, and deals |
| **SugarCRM** | `ballerinax/sugarcrm` | Automate sales workflows and manage customer relationships |

## Quick Example

### Sync a New Lead from an HTTP Request to Salesforce

```ballerina
import ballerina/http;
import ballerinax/salesforce;

configurable string sfBaseUrl = ?;
configurable string sfToken = ?;

final salesforce:Client sf = check new ({
    baseUrl: sfBaseUrl,
    auth: {
        token: sfToken
    }
});

service /api on new http:Listener(8090) {
    resource function post leads(http:Request req) returns json|error {
        json payload = check req.getJsonPayload();

        salesforce:SObjectResult result = check sf->create("Lead", {
            "FirstName": check payload.firstName,
            "LastName": check payload.lastName,
            "Email": check payload.email,
            "Company": check payload.company,
            "LeadSource": "Web"
        });

        return {status: "created", id: result.id};
    }
}
```

### Query Salesforce Records

```ballerina
function getHighValueOpportunities() returns record {}[]|error {
    string soql = "SELECT Id, Name, Amount, StageName FROM Opportunity WHERE Amount > 100000";
    stream<record {}, error?> resultStream = check sf->query(soql);

    record {}[] opportunities = [];
    check from record {} rec in resultStream
        do {
            opportunities.push(rec);
        };
    return opportunities;
}
```

## Configuration

```toml
# Salesforce
[salesforce]
sfBaseUrl = "https://your-instance.salesforce.com"
sfToken = "<SALESFORCE_ACCESS_TOKEN>"
```

## What's Next

- [Connection Configuration](configuration.md) -- How to set up and manage connections
- [Authentication Methods](authentication.md) -- OAuth 2.0, API keys, and other auth types
- [Salesforce-Database Sync Tutorial](../tutorials/salesforce-db-sync.md) -- End-to-end Salesforce integration tutorial
- [SaaS Connectors](saas.md) -- Browse all SaaS connectors
