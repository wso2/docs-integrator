---
sidebar_position: 7
title: "Quick Start: Build a Data Service"
description: Create a CRUD data service using bal persist in under 10 minutes.
---

# Build a Data Service

In this quick start, you'll create a data service that exposes CRUD operations over a database using `bal persist` — Ballerina's built-in data persistence layer.

## Prerequisites

- [WSO2 Integrator set up](install.md)
- A running database (MySQL, PostgreSQL, or H2 for quick testing)

## Step 1: Create a New Project

```bash
bal new data_service
cd data_service
```

## Step 2: Initialize Persistence

```bash
bal persist init
```

This creates a `persist` directory with a model definition file.

## Step 3: Define Your Data Model

Edit `persist/model.bal`:

```ballerina
import ballerina/persist as _;

type Employee record {|
    readonly int id;
    string firstName;
    string lastName;
    string email;
    string department;
    decimal salary;
|};
```

## Step 4: Generate the Client

```bash
bal persist generate
```

This generates type-safe client code for CRUD operations against your database.

## Step 5: Create the Service

Edit `main.bal`:

```ballerina
import ballerina/http;
import ballerina/persist;

configurable int port = 8080;

service /employees on new http:Listener(port) {
    private final Client dbClient;

    function init() returns error? {
        self.dbClient = check new ();
    }

    resource function get .() returns Employee[]|error {
        stream<Employee, persist:Error?> employees = self.dbClient->/employees;
        return from Employee emp in employees select emp;
    }

    resource function get [int id]() returns Employee|error {
        return self.dbClient->/employees/[id];
    }

    resource function post .(Employee employee) returns Employee|error {
        int[] ids = check self.dbClient->/employees.post([employee]);
        return self.dbClient->/employees/[ids[0]];
    }

    resource function put [int id](Employee employee) returns Employee|error {
        return self.dbClient->/employees/[id].put(employee);
    }

    resource function delete [int id]() returns Employee|error {
        return self.dbClient->/employees/[id].delete();
    }
}
```

## Step 6: Configure the Database

Edit `Config.toml`:

```toml
port = 8080

[modelClient]
host = "localhost"
port = 3306
user = "root"
password = ""
database = "employees_db"
```

## Step 7: Run and Test

```bash
bal run
```

Test the endpoints:

```bash
# List all employees
curl http://localhost:8080/employees

# Create an employee
curl -X POST http://localhost:8080/employees \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "firstName": "Jane", "lastName": "Doe", "email": "jane@example.com", "department": "Engineering", "salary": 95000}'

# Get by ID
curl http://localhost:8080/employees/1
```

## Supported Data Stores

`bal persist` supports seven data stores out of the box:

| Data Store | Module |
|-----------|---------|
| MySQL | `ballerinax/persist.sql` |
| PostgreSQL | `ballerinax/persist.sql` |
| MSSQL | `ballerinax/persist.sql` |
| H2 | `ballerinax/persist.sql` |
| Google Sheets | `ballerinax/persist.googlesheets` |
| Redis | `ballerinax/persist.redis` |
| In-Memory | Built-in |

## What's Next

- [Data Persistence](../develop/integration-artifacts/data-persistence.md) — Deep dive into `bal persist`
- [Services](../develop/integration-artifacts/services.md) — Advanced service configuration
- [Quick Start: Build an AI Agent](quick-start-ai-agent.md) — Add AI capabilities
