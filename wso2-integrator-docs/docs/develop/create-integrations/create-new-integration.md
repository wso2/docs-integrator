---
sidebar_position: 1
title: Create a New Integration
description: Create a new integration project from scratch or use a pre-built template to get started quickly.
---

# Create a New Integration

Start a new integration project using the WSO2 Integrator wizard in VS Code. Choose from a blank project or a pre-built template that scaffolds the boilerplate code for common integration scenarios.

## Using the New Integration Wizard

Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and select **WSO2 Integrator: New Integration** to launch the wizard.

<!-- TODO: Screenshot of the New Integration wizard showing template selection -->

### Step 1: Choose a Template

The wizard presents a list of templates organized by category:

| Category | Templates |
|---|---|
| **Services** | HTTP Service, GraphQL Service, gRPC Service, WebSocket Service, WebSub Hub |
| **Event Handlers** | Kafka Consumer, RabbitMQ Consumer, MQTT Subscriber |
| **Automations** | Scheduled Task, Manual Trigger |
| **File Handlers** | FTP File Processor, SFTP File Processor, Local File Watcher |
| **Data** | Database CRUD Service, Data Persistence Service |
| **AI** | AI Agent, RAG Application |

Select **Blank Project** if you want to start from an empty Ballerina project.

### Step 2: Configure the Project

Enter the following details:

- **Project Name** -- A descriptive name (e.g., `order-sync-service`). This becomes the Ballerina package name.
- **Organization** -- Your Ballerina Central organization (e.g., `mycompany`).
- **Location** -- The directory where the project will be created.

<!-- TODO: Screenshot of the project configuration step -->

### Step 3: Review and Create

The wizard shows a summary of the project that will be created. Click **Create** to generate the project files and open them in VS Code.

## What Gets Generated

For an HTTP Service template, the wizard generates:

```ballerina
// main.bal
import ballerina/http;

configurable int port = 8090;

service /api on new http:Listener(port) {

    resource function get greeting() returns string {
        return "Hello, WSO2 Integrator!";
    }

    resource function post orders(http:Request req) returns http:Created|http:BadRequest {
        // TODO: Add your integration logic here
        return http:CREATED;
    }
}
```

The generated `Ballerina.toml` includes the project metadata:

```toml
[package]
org = "mycompany"
name = "order_sync_service"
version = "0.1.0"
distribution = "2201.10.0"

[build-options]
observabilityIncluded = true
```

And a starter `Config.toml` for runtime configuration:

```toml
port = 8090
```

## Creating from the Command Line

You can also create projects using the Ballerina CLI:

```bash
# Create a new Ballerina package
bal new order-sync-service

# Create from a specific template
bal new -t service order-sync-service
```

After creating the project, open it in VS Code to use the visual designer and WSO2 Integrator tooling.

## Creating a Multi-Module Project

For larger integrations, organize your code into multiple Ballerina modules within a single package:

```bash
# Create the main package
bal new inventory-system

# Add modules
cd inventory-system
bal add products
bal add orders
bal add notifications
```

This produces the following structure:

```
inventory-system/
├── Ballerina.toml
├── Config.toml
├── main.bal
├── modules/
│   ├── products/
│   │   └── products.bal
│   ├── orders/
│   │   └── orders.bal
│   └── notifications/
│       └── notifications.bal
└── tests/
    └── main_test.bal
```

Modules can import each other using the package-qualified name:

```ballerina
import mycompany/inventory_system.products;
import mycompany/inventory_system.orders;
```

## Project Naming Conventions

Follow these conventions for consistent, discoverable projects:

- Use lowercase with hyphens for project directories: `order-sync-service`
- Use underscores in Ballerina package names: `order_sync_service`
- Prefix with the integration domain: `crm-contact-sync`, `erp-order-export`
- Keep names concise but descriptive

## What's Next

- [Open an Existing Integration](open-integration.md) -- Work with projects already on disk
- [Explore Sample Integrations](explore-samples.md) -- Learn from built-in examples
- [Integration Artifacts](/docs/develop/integration-artifacts) -- Understand the artifact types in your project
