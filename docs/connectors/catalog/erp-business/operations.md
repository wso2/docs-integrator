---
title: ERP & Business Operations
---

# ERP & Business Operations

## Available connectors

| Connector | Description | Operations | Authentication |
|-----------|-------------|------------|----------------|
| [Guidewire InsuranceNow](guidewire.insnow/guidewire-insurancenow-connector-overview.md) | Insurance platform with applications, policies, claims, drivers, and document management | Create, Read, Update, Delete, Bind, Convert | Basic Auth / Bearer Token |
| [IBM CTG](ibm.ctg/ibm-ctg-connector-overview.md) | IBM CICS Transaction Gateway connector for invoking mainframe CICS programs via ECI | Execute, Close | Basic (User ID/Password) |
| [SAP](sap/connector-overview.md) | SAP HTTP client with built-in CSRF token handling for S/4HANA and other SAP APIs | GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS | Basic Auth / OAuth 2.0 |
| [SAP Sales Area](sap.s4hana.salesarea_0001/sap-sales-area-connector-overview.md) | SAP S/4HANA Sales Area master data: retrieve and query Sales Organization, Distribution Channel, and Division combinations | Read, List, Batch Query | Basic Auth |
| [SAP Sales District](sap.s4hana.api_salesdistrict_srv/sap-sales-district-connector-overview.md) | SAP S/4HANA sales district master data and multilingual text descriptions via OData v2 | List Districts, Get District, List Texts, Get Text, Navigate | Basic Auth |
| [SAP Sales Inquiry](sap.s4hana.api_sales_inquiry_srv/sap-sales-inquiry-connector-overview.md) | Read SAP S/4HANA pre-sales inquiry documents including items, partners, and pricing elements via OData v2 | List, Read | Basic Auth (username/password) |
| [SAP Sales Order](sap.s4hana.api_sales_order_srv/sap-sales-order-connector-overview.md) | SAP S/4HANA Sales Order (A2X) API for full order lifecycle management including items, billing, pricing, and scheduling | Create, Read, Update, Delete, List | Basic Auth, OAuth 2.0 |
| [SAP Sales Order Analytics](sap.s4hana.ce_salesorder_0001/sap-sales-order-analytics-connector-overview.md) | SAP S/4HANA Sales Order OData v4 API for full lifecycle management of sales orders and related entities | Create, Read, Update, Delete, List, Batch | Basic Auth, OAuth 2.0, Bearer Token |
| [SAP Sales Order Simulation](sap.s4hana.api_sales_order_simulation_srv/sap-sales-order-simulation-connector-overview.md) | SAP S/4HANA Sales Order Simulation API for synchronous pricing, material availability, and credit limit checks | Simulate, Read, Create, Update, Delete, Batch | Basic Auth, OAuth 2.0, Bearer Token |
| [SAP Sales Organization](sap.s4hana.api_salesorganization_srv/sap-sales-organization-connector-overview.md) | SAP S/4HANA Sales Organization master data: lookup and listing of organizational units and multilingual texts | List Sales Organizations, Get Sales Organization, List Texts, Get Text, Navigate | Basic Auth |
| [SAP Sales Quotation](sap.s4hana.api_sales_quotation_srv/sap-sales-quotation-connector-overview.md) | SAP S/4HANA Sales Quotation API with full CRUD, partners, pricing, texts, process flow, and approval actions | Create, Read, Update, Delete, Approve, Reject, Batch | Basic Auth |
| [SAP SD Incoterms](sap.s4hana.api_sd_incoterms_srv/sap-sd-incoterms-connector-overview.md) | SAP S/4HANA OData API for reading Incoterms classification and version master data with multilingual text support | List, Read | Basic Authentication |
| [SAP SD Sold-to-Party Determination](sap.s4hana.api_sd_sa_soldtopartydetn/sap-sd-sold-party-determination-connector-overview.md) | SAP S/4HANA OData service for querying sold-to party assignments in sales scheduling agreements | Read, List | Basic Auth |
