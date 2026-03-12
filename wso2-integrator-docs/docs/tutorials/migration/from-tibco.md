---
title: Coming from TIBCO
description: Migration guide for developers moving from TIBCO BusinessWorks to WSO2 Integrator.
---

# Coming from TIBCO

A guide for developers migrating integrations from TIBCO BusinessWorks to WSO2 Integrator.

## Concept Mapping

| In TIBCO BusinessWorks | In WSO2 Integrator | Notes |
|---|---|---|
| Process Definition | Service / Automation | Depends on trigger type |
| Activity | Node in flow designer | Visual flow nodes map to activities |
| Palette | Connector catalog | Pre-built integrations |
| Process Variable | Ballerina variable | Typed variables |
| Shared Variable | Configurable variable | `Config.toml` values |
| JDBC Connection | Database connector | `ballerinax/mysql`, etc. |
| HTTP Connection | HTTP client connection | `ballerina/http:Client` |
| JMS Connection | Messaging connector | `ballerinax/kafka`, `ballerinax/rabbitmq` |
| WSDL/SOAP Palette | WSDL tool | `bal wsdl` generates clients |
| Global Variables | Config.toml | Externalized configuration |
| Engine | Ballerina runtime | JVM-based runtime |
| Administrator | VS Code + ICP | Development IDE + monitoring |

## Key Differences

| Aspect | TIBCO BusinessWorks | WSO2 Integrator |
|---|---|---|
| **IDE** | TIBCO Business Studio (Eclipse) | VS Code with WSO2 extension |
| **Language** | XML process definitions | Ballerina (code + visual) |
| **Deployment** | TIBCO Admin + AppNode | JAR, Docker, Kubernetes |
| **Configuration** | Global variables + properties | Config.toml + env vars |
| **Testing** | TIBCO Test Suite | Built-in Ballerina test framework |
| **Version Control** | Limited XML diff support | Standard Git workflows |
| **Low-Code** | Palette-based drag-and-drop | Visual designer + pro-code |

## Migration with the TIBCO Migration Tool

WSO2 Integrator includes an automated migration tool:

```bash
bal migrate tibco --source /path/to/tibco-project --output /path/to/output
```

The tool:
1. Parses TIBCO process definitions and activity configurations
2. Converts activities to Ballerina code
3. Maps connections to WSO2 Integrator connectors
4. Generates a migration report with coverage details

### Supported Activity Mappings

| TIBCO Activity | WSO2 Integrator Equivalent |
|---|---|
| HTTP Receiver | HTTP Service resource |
| SOAP Send/Receive | HTTP Client with SOAP |
| JDBC Query/Update | SQL Client query/execute |
| JMS Send/Receive | Kafka/RabbitMQ producer/consumer |
| File Read/Write | File I/O operations |
| Mapper | Visual Data Mapper |
| Timer | Automation with schedule |
| Log | `log:printInfo` / `log:printError` |
| Assign | Variable assignment |
| Checkpoint | Transaction boundary |

## Before / After Examples

### TIBCO: HTTP Service with Database Query

**TIBCO (Process Definition):**
```
HTTP Receiver → JDBC Query → Mapper → Send HTTP Response
```

**WSO2 Integrator (Ballerina):**
```ballerina
import ballerina/http;
import ballerina/sql;
import ballerinax/mysql;

configurable string dbHost = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;

final mysql:Client db = check new (host = dbHost, user = dbUser, password = dbPassword, database = "orders");

service /api on new http:Listener(8090) {
    resource function get orders/[string id]() returns json|error {
        record {|string orderId; string customer; decimal total;|} result =
            check db->queryRow(`SELECT order_id, customer, total FROM orders WHERE order_id = ${id}`);
        return result.toJson();
    }
}
```

## Step-by-Step Migration

1. **Export** your TIBCO project from Business Studio.
2. **Run the migration tool** to generate Ballerina code.
3. **Review the migration report** for unsupported activities.
4. **Manually implement** any activities that require custom logic.
5. **Test** using the built-in Try-It tool and unit tests.
6. **Deploy** using Docker, Kubernetes, or as a standalone JAR.

## What's Next

- [Coming from WSO2 MI](from-wso2-mi.md) -- If migrating from WSO2 Micro Integrator
- [Coming from MuleSoft](from-mulesoft.md) -- MuleSoft migration guide
- [Migration Tools](/docs/develop/tools/migration-tools) -- Automated migration tool reference
