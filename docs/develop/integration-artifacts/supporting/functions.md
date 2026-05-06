---
title: Functions
---

# Functions

Function artifacts encapsulate reusable logic that can be called from any integration artifact. By default, every function is added to the `functions.bal` file in the project root.

## Adding a function

1. Open the **Artifacts** page and select **Function** under **Other Artifacts**, or select **+** next to **Functions** in the left sidebar.

   ![Artifacts page with the Function option highlighted under Other Artifacts](/img/develop/integration-artifacts/supporting/functions/functions-artifact-selection.png)

2. Fill in the **Create New Function** form.

   ![Create New Function form with Name, Description, Public, Parameters, and Return Type fields](/img/develop/integration-artifacts/supporting/functions/create-new-function-form.png)

   | Field | Description |
   |---|---|
   | **Name** | A unique identifier for the function (for example, `validateOrder`). Required. |
   | **Description** | Optional description of the function's purpose. |
   | **Public** | Select **Make visible across the project** to use this function from other integrations. |
   | **Parameters** | Select **+ Add Parameter** to define each input. Each parameter has a name and a type. |
   | **Return Type** | The type of the value returned by the function. Leave empty for functions that return nothing. |

3. Select **Create**. The function is added to `functions.bal` and opens in the flow designer canvas, where you add integration steps.

```ballerina
// functions.bal

function validateEmail(string email) returns boolean {
    return email.includes("@") && email.includes(".");
}

function validateOrderRequest(OrderRequest request) returns string[] {
    string[] errors = [];

    if request.items.length() == 0 {
        errors.push("Order must have at least one item");
    }

    foreach LineItem item in request.items {
        if item.quantity <= 0 {
            errors.push("Invalid quantity for product: " + item.productId);
        }
        if item.unitPrice < 0d {
            errors.push("Invalid price for product: " + item.productId);
        }
    }

    if request.shippingAddress.zipCode.length() != 5 {
        errors.push("ZIP code must be 5 digits");
    }

    return errors;
}
```

## Function configuration

To open a function's flow view, select its name in the sidebar under **Functions**. To change the function's name, description, parameters, or return type, select **Configure** in the top-right of the flow view.

![Function flow view with a function selected in the sidebar and the Configure button highlighted](/img/develop/integration-artifacts/supporting/functions/function-configure.png)

## Project organization

By default, all functions are added to a single `functions.bal` file at the project root. For larger projects, you can split functions into additional `.bal` files grouped by domain.

```
my-integration/
├── functions.bal              # Default file for all functions
├── types.bal
├── connections.bal
└── main.bal
```

To split functions across multiple files, create new `.bal` files at the project root and move related functions into them.

```
my-integration/
├── functions.bal              # General-purpose functions
├── validation.bal             # Input validation functions
├── types.bal
├── connections.bal
└── main.bal
```

## Best practices

| Practice | Description |
|---|---|
| **Single responsibility** | Each function should do one thing well |
| **Typed parameters** | Use specific record types instead of `json` or `anydata` |
| **Error returns** | Return `error?` for operations that can fail |
| **Isolated functions** | Mark pure functions as `isolated` for thread safety |
| **Descriptive names** | Use verb-based names like `validateOrder`, `calculateTotal` |

## What's next

- [Data mapper](./data-mapper/data-mapper.md) — Transform data between record types using a visual canvas.
- [Types](./types.md) — Define record types for function parameters and return values.
- [Connections](./connections.md) — Reuse connection configurations across integration artifacts.
