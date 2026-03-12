---
sidebar_position: 13
title: "ERP & Business Operations"
description: "ERP and business operations connectors for SAP, NetSuite, Workday, and more in WSO2 Integrator."
---

# ERP & Business Operations Connectors

Integrate with enterprise resource planning systems and business operations platforms. These connectors let you sync master data, automate procurement workflows, manage inventory, and bridge ERP systems with modern applications.

## Available Connectors

| Connector | Package | Use Case |
|-----------|---------|----------|
| **SAP** | `ballerinax/sap` | Access BAPIs, IDocs, RFC functions, and OData services |
| **SAP S/4HANA** | `ballerinax/sap.s4hana` | Manage business partners, sales orders, and material data |
| **NetSuite** | `ballerinax/netsuite` | Manage customers, invoices, inventory, and financial records |
| **Workday** | `ballerinax/workday` | Access HR, finance, and planning data through Workday APIs |
| **Oracle EBS** | `ballerinax/oracle.ebs` | Integrate with Oracle E-Business Suite modules |
| **ServiceNow** | `ballerinax/servicenow` | Manage incidents, change requests, and CMDB records |
| **Odoo** | `ballerinax/odoo` | Manage sales, inventory, manufacturing, and accounting |

## Quick Example

### Sync Sales Orders from an API to SAP S/4HANA

```ballerina
import ballerina/http;
import ballerinax/sap.s4hana;

configurable string sapBaseUrl = ?;
configurable string sapUser = ?;
configurable string sapPassword = ?;

final s4hana:Client sapClient = check new ({
    baseUrl: sapBaseUrl,
    auth: {
        username: sapUser,
        password: sapPassword
    }
});

type SalesOrderRequest record {|
    string customerId;
    string materialId;
    int quantity;
    string deliveryDate;
|};

service /api on new http:Listener(8090) {
    resource function post sales\-orders(SalesOrderRequest orderReq) returns json|error {
        s4hana:SalesOrder salesOrder = check sapClient->createSalesOrder({
            SoldToParty: orderReq.customerId,
            SalesOrderType: "OR",
            to_Item: [{
                Material: orderReq.materialId,
                RequestedQuantity: orderReq.quantity.toString(),
                RequestedDeliveryDate: orderReq.deliveryDate
            }]
        });

        return {
            status: "created",
            salesOrder: salesOrder.SalesOrder,
            customer: salesOrder.SoldToParty
        };
    }
}
```

### Query ServiceNow Incidents

```ballerina
import ballerinax/servicenow;

configurable string snowInstance = ?;
configurable string snowUser = ?;
configurable string snowPassword = ?;

final servicenow:Client snowClient = check new ({
    baseUrl: string `https://${snowInstance}.service-now.com`,
    auth: {
        username: snowUser,
        password: snowPassword
    }
});

function getOpenIncidents() returns json|error {
    json incidents = check snowClient->getRecords("incident", {
        sysparm_query: "state=1^priority=1",
        sysparm_limit: "50"
    });
    return incidents;
}
```

## Configuration

```toml
# SAP S/4HANA
[sap]
sapBaseUrl = "https://your-sap-instance.com/sap/opu/odata/sap"
sapUser = "<SAP_USER>"
sapPassword = "<SAP_PASSWORD>"

# ServiceNow
[servicenow]
snowInstance = "your-instance"
snowUser = "<SERVICENOW_USER>"
snowPassword = "<SERVICENOW_PASSWORD>"
```

## What's Next

- [Connection Configuration](configuration.md) -- How to set up and manage connections
- [Authentication Methods](authentication.md) -- OAuth 2.0, API keys, and other auth types
- [Data Transformation](../develop/transform/data-mapper.md) -- Map data between ERP systems and modern formats
- [Error Handling per Connector](error-handling.md) -- Handle connector-specific errors
