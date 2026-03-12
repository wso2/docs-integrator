---
sidebar_position: 5
title: Workspaces
description: Organize and develop multiple related Ballerina packages together using workspaces.
---

# Workspaces

Develop multiple related Ballerina packages side-by-side in a single VS Code workspace. Workspaces are essential when you maintain shared libraries alongside the services that consume them, or when multiple microservices need to be developed and tested together.

## When to Use Workspaces

Use a workspace when:
- Multiple services share a common types/utilities package
- You are developing a connector alongside the service that uses it
- A team owns several related microservices
- You need cross-package refactoring support in the IDE

## Workspace Structure

A workspace is simply a VS Code workspace file (`.code-workspace`) that references multiple Ballerina package directories.

```
integration-platform/
├── integration-platform.code-workspace   # VS Code workspace file
├── shared-types/                         # Shared type definitions
│   ├── Ballerina.toml
│   ├── types.bal
│   └── tests/
├── order-service/                        # Order processing service
│   ├── Ballerina.toml
│   ├── service.bal
│   └── tests/
├── inventory-service/                    # Inventory management service
│   ├── Ballerina.toml
│   ├── service.bal
│   └── tests/
└── notification-service/                 # Notification dispatch service
    ├── Ballerina.toml
    ├── service.bal
    └── tests/
```

### VS Code Workspace File

```json
{
    "folders": [
        {"path": "shared-types", "name": "Shared Types"},
        {"path": "order-service", "name": "Order Service"},
        {"path": "inventory-service", "name": "Inventory Service"},
        {"path": "notification-service", "name": "Notification Service"}
    ],
    "settings": {
        "ballerina.home": "/usr/lib/ballerina"
    }
}
```

Open with: **File > Open Workspace from File** in VS Code.

## Developing Shared Packages Locally

When services depend on a shared package, use the local repository to develop both simultaneously.

### Step 1: Build and Push the Shared Package

```bash
cd shared-types
bal pack
bal push --repository local
```

### Step 2: Reference from Services

```toml
# order-service/Ballerina.toml
[package]
org = "myorg"
name = "order_service"
version = "1.0.0"

[[dependency]]
org = "myorg"
name = "shared_types"
version = "1.0.0"
repository = "local"
```

```ballerina
// order-service/service.bal
import myorg/shared_types;

service /api on new http:Listener(9090) {

    resource function post orders(shared_types:OrderRequest req)
            returns shared_types:OrderResponse|error {
        // Use shared types across services
        return {orderId: "ORD-001", status: "confirmed"};
    }
}
```

### Step 3: Iterate

After changing the shared package, rebuild and push it again:

```bash
cd shared-types
bal pack && bal push --repository local

# Then rebuild the consuming service
cd ../order-service
bal build
```

## Multi-Service Development Workflow

### Running Multiple Services

Use separate terminals or a script to start all services.

```bash
#!/bin/bash
# start-all.sh

echo "Starting services..."

cd order-service && bal run &
cd inventory-service && bal run &
cd notification-service && bal run &

echo "All services started."
wait
```

### Docker Compose for Multi-Service Development

```yaml
# docker-compose.dev.yaml
version: '3.8'
services:
  order-service:
    build: ./order-service
    ports: ["9090:9090"]
    volumes:
      - ./order-service:/app
    environment:
      - INVENTORY_URL=http://inventory-service:9091

  inventory-service:
    build: ./inventory-service
    ports: ["9091:9091"]
    volumes:
      - ./inventory-service:/app

  notification-service:
    build: ./notification-service
    ports: ["9092:9092"]
    volumes:
      - ./notification-service:/app
    environment:
      - KAFKA_BOOTSTRAP=kafka:9093

  kafka:
    image: confluentinc/cp-kafka:7.5.0
    ports: ["9093:9093"]
```

## Cross-Package Testing

Test interactions between services using integration tests.

```ballerina
// order-service/tests/integration_test.bal
import ballerina/http;
import ballerina/test;

// Tests that verify order-service correctly calls inventory-service
http:Client orderClient = check new ("http://localhost:9090");

@test:Config {
    groups: ["integration"]
}
function testOrderCreationUpdatesInventory() returns error? {
    json order = {
        "productId": "WIDGET-001",
        "quantity": 5
    };

    // Create order
    http:Response orderResp = check orderClient->/api/orders.post(order);
    test:assertEquals(orderResp.statusCode, 201);

    // Verify inventory was updated (requires inventory-service to be running)
    http:Client inventoryClient = check new ("http://localhost:9091");
    json stock = check inventoryClient->/api/inventory/["WIDGET-001"];
    // Assert stock was decremented
}
```

## Monorepo vs Multi-Repo

| Approach | When to Use |
|----------|------------|
| **Monorepo** (single Git repository) | Small team, tightly coupled services, shared release cycle |
| **Multi-repo** (one repo per package) | Large team, independent deployment, different release cadences |
| **Hybrid** (shared libs in one repo, services separate) | Shared types change rarely, services evolve independently |

### Monorepo Structure

```
integration-platform/
├── .github/workflows/       # Shared CI/CD
├── packages/
│   ├── shared-types/
│   ├── order-service/
│   └── inventory-service/
└── integration-platform.code-workspace
```

### Multi-Repo with Shared Types Published to Central

```
# Repo: myorg/shared-types
shared-types/
├── Ballerina.toml     # Published to Central as myorg/shared_types
└── types.bal

# Repo: myorg/order-service
order-service/
├── Ballerina.toml     # Depends on myorg/shared_types from Central
└── service.bal
```

## Best Practices

- **Use workspaces for active co-development** -- when you are modifying multiple packages simultaneously
- **Publish shared packages to Central or a local registry** once they stabilize
- **Keep shared packages minimal** -- only types and interfaces, not business logic
- **Automate the rebuild cycle** -- script the `bal pack && bal push --repository local` step
- **Test cross-service interactions** with integration test groups that require all services running
- **Use Docker Compose** for local multi-service development to match production topology

## What's Next

- [Packages & Modules](packages-modules.md) -- Package structure fundamentals
- [Manage Dependencies](manage-dependencies.md) -- Version locking and updates
- [Style Guide](style-guide.md) -- Consistent code style across packages
