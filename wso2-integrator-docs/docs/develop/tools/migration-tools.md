---
sidebar_position: 11
title: Migration Tools
description: Migrate integrations from WSO2 Micro Integrator, MuleSoft, and other platforms to WSO2 Integrator.
---

# Migration Tools

WSO2 Integrator provides migration tools that help you move existing integrations from other platforms -- including WSO2 Micro Integrator (MI), MuleSoft, and other integration solutions -- to the Ballerina-based WSO2 Integrator. The tools analyze your existing integration artifacts, generate equivalent Ballerina code, and produce a migration report highlighting items that require manual attention.

## Migrating from WSO2 Micro Integrator

### Overview

The MI migration tool converts WSO2 Micro Integrator artifacts (Synapse XML configurations) to Ballerina code. It handles APIs, proxy services, sequences, endpoints, data services, scheduled tasks, and message mediators.

### Running the MI Migration Tool

```bash
# Migrate a complete MI project (Carbon Application)
bal migrate mi -i /path/to/mi-project/ -o migrated/

# Migrate specific artifact types
bal migrate mi -i /path/to/mi-project/ --artifacts api,proxy -o migrated/

# Generate migration report only (no code generation)
bal migrate mi -i /path/to/mi-project/ --report-only
```

### Artifact Mapping

The tool maps MI artifacts to their Ballerina equivalents:

| MI Artifact | Ballerina Equivalent |
|---|---|
| API | HTTP service with resource functions |
| Proxy Service | HTTP service |
| Sequence | Function |
| Endpoint | `http:Client` / connector client |
| Data Service | Database query functions |
| Scheduled Task | `task:Listener` with scheduled job |
| Message Store + Processor | Kafka/message broker integration |
| Inbound Endpoint | Listener service |

### MI Mediator Mapping

| MI Mediator | Ballerina Equivalent |
|---|---|
| Log | `log:printInfo()` / `log:printError()` |
| Property | Variable assignment |
| Call | `client->get()` / `client->post()` |
| Filter | `if/else` |
| Switch | `match` |
| PayloadFactory | Record construction / JSON/XML template |
| XSLT | XML transformation functions |
| Iterate | `foreach` |
| Aggregate | Query expression with `collect` |
| Respond | `return` statement |
| Fault | `do/on fail` error handler |
| Enrich | Field assignment / spread operator |
| DB Lookup | `db->queryRow()` |

### Example: MI API to Ballerina Service

**MI Synapse XML:**
```xml
<api name="OrderAPI" context="/api/orders">
    <resource methods="GET" uri-template="/{orderId}">
        <inSequence>
            <log level="custom">
                <property name="message" value="Fetching order"/>
            </log>
            <call>
                <endpoint>
                    <http method="GET"
                          uri-template="http://backend:8080/orders/{uri.var.orderId}"/>
                </endpoint>
            </call>
            <respond/>
        </inSequence>
        <faultSequence>
            <log level="custom">
                <property name="message" expression="get-property('ERROR_MESSAGE')"/>
            </log>
            <payloadFactory media-type="json">
                <format>{"error": "$1"}</format>
                <args>
                    <arg expression="get-property('ERROR_MESSAGE')"/>
                </args>
            </payloadFactory>
            <respond/>
        </faultSequence>
    </resource>
</api>
```

**Generated Ballerina code:**
```ballerina
import ballerina/http;
import ballerina/log;

configurable string backendUrl = "http://backend:8080";

final http:Client backendClient = check new (backendUrl);

service /api/orders on new http:Listener(8090) {

    resource function get [string orderId]() returns json|error {
        log:printInfo("Fetching order");
        do {
            json response = check backendClient->get("/orders/" + orderId);
            return response;
        } on fail error e {
            log:printError(e.message());
            return {'error: e.message()};
        }
    }
}
```

### Migration Report

The tool generates a detailed report listing what was migrated automatically and what requires manual attention:

```
Migration Report: OrderIntegration
===================================

Migrated Successfully:
  - API: OrderAPI -> order_api_service.bal
  - API: CustomerAPI -> customer_api_service.bal
  - Sequence: LogAndTransform -> log_and_transform.bal (function)
  - Endpoint: BackendEP -> configurable http:Client

Requires Manual Review:
  - Sequence: CustomMediator (class mediator) -> Manual implementation required
  - Data Service: OrderDS -> Database queries need connection configuration
  - Message Store: OrderStore -> Kafka integration needs broker configuration

Unsupported (Manual Migration Required):
  - XSLT Mediator in TransformSequence -> Replace with Ballerina XML transformation
  - Custom Class Mediator: com.example.CustomProcessor -> Rewrite in Ballerina or use Java interop
```

## Migrating from MuleSoft

### Running the MuleSoft Migration Tool

```bash
# Migrate a MuleSoft project
bal migrate mule -i /path/to/mule-project/ -o migrated/

# Specify the MuleSoft version
bal migrate mule -i /path/to/mule-project/ --version 4 -o migrated/

# Generate report only
bal migrate mule -i /path/to/mule-project/ --report-only
```

### MuleSoft Component Mapping

| MuleSoft Component | Ballerina Equivalent |
|---|---|
| HTTP Listener | `http:Listener` + service |
| HTTP Request | `http:Client` |
| Database Connector | `mysql:Client` / `postgresql:Client` |
| Transform (DataWeave) | Ballerina query expressions + data mapper |
| Flow Reference | Function call |
| Choice Router | `if/else` or `match` |
| For Each | `foreach` |
| Scatter-Gather | Workers (parallel execution) |
| Try | `do/on fail` |
| Object Store | Configurable state management |
| Scheduler | `task:Listener` |

### Example: MuleSoft Flow to Ballerina

**MuleSoft Flow (XML):**
```xml
<flow name="getOrderFlow">
    <http:listener config-ref="HTTP_Listener" path="/orders/{orderId}" method="GET"/>
    <logger message="Received order request for #[attributes.uriParams.orderId]" level="INFO"/>
    <http:request config-ref="Backend_Request" method="GET"
                  path="/orders/#[attributes.uriParams.orderId]"/>
    <ee:transform>
        <ee:message>
            <ee:set-payload><![CDATA[%dw 2.0
                output application/json
                ---
                {
                    id: payload.orderId,
                    customer: payload.customerName,
                    total: payload.amount
                }]]>
            </ee:set-payload>
        </ee:message>
    </ee:transform>
</flow>
```

**Generated Ballerina code:**
```ballerina
import ballerina/http;
import ballerina/log;

configurable string backendUrl = ?;

final http:Client backendClient = check new (backendUrl);

service /orders on new http:Listener(8090) {

    resource function get [string orderId]() returns json|error {
        log:printInfo("Received order request", orderId = orderId);

        json payload = check backendClient->get("/orders/" + orderId);

        // Transformed from DataWeave
        return {
            id: check payload.orderId,
            customer: check payload.customerName,
            total: check payload.amount
        };
    }
}
```

## Migration Workflow

Follow these steps for a successful migration:

1. **Assess** -- Run the migration tool with `--report-only` to understand the scope.
2. **Generate** -- Run the full migration to produce Ballerina code.
3. **Review** -- Check the migration report for items needing manual attention.
4. **Configure** -- Set up `Config.toml` with connection details and environment-specific values.
5. **Implement** -- Complete any manually flagged items (custom mediators, complex transformations).
6. **Test** -- Write tests for the migrated integrations and compare behavior.
7. **Deploy** -- Deploy to WSO2 Integrator runtime.

## Command Reference

| Command | Description |
|---|---|
| `bal migrate mi -i <dir>` | Migrate from WSO2 Micro Integrator |
| `bal migrate mule -i <dir>` | Migrate from MuleSoft |
| `-o <dir>` | Output directory |
| `--report-only` | Generate migration report without code |
| `--artifacts <types>` | Migrate specific artifact types |
| `--version <ver>` | Source platform version |

## What's Next

- [Scan Tool](scan-tool.md) -- Scan migrated code for quality and security issues
- [Configuration Management](/docs/develop/design-logic/configuration-management) -- Set up environment-specific configuration for migrated integrations
- [Visual Flow Designer](/docs/develop/design-logic/flow-designer) -- Visualize and refine migrated integration flows
