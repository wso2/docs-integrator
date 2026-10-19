---
title: Migrate from Azure Logic Apps
---

# Migrate from Azure Logic Apps

Azure Logic Apps describes an integration as a declarative workflow definition assembled in JSON. WSO2 Integrator describes the same integration as real Ballerina code you can compile. An automated migration tool does most of that conversion for you. This page covers running it, and how Logic Apps concepts map to their WSO2 Integrator equivalents.

**Prerequisites:**
- Ballerina installed with `bal` on your PATH

Unlike MuleSoft and TIBCO BusinessWorks, Azure Logic Apps migration doesn't have a WSO2 Integrator wizard yet — it's CLI-only, and the tool's AI-powered conversion is mandatory rather than an optional enhancement.

## Overview

The migration tool converts Azure Logic Apps workflow definitions (ARM templates and workflow JSON) to Ballerina code. It handles triggers, actions, connectors, control flow, error handling patterns, and more, using the `bal migrate-logicapps` CLI command. Conversion is AI-powered — there's no separate rule-based mode to opt out of.

## Run the migration tool

Install the tool once, then run it against a workflow definition:

```bash
bal tool pull migrate-logicapps
bal migrate-logicapps <source-project-directory-or-file> [-o|--out <output-directory>] [-v|--verbose] [-m|--multi-root]
```

### Key parameters

| Parameter | Description |
|---|---|
| `<source-project-directory-or-file>` | Path to the directory containing multiple Logic App JSON files or a single Logic App JSON file to migrate |
| `-o, --out <output-directory>` | (Optional) Directory where the new Ballerina package will be created. For a project directory input, it's created inside the source directory; for a single JSON file, in the same directory as the source file |
| `-v, --verbose` | (Optional) Enable verbose output during conversion |
| `-m, --multi-root` | (Optional) Treat each child directory as a separate project and convert all of them. The source must be a directory containing multiple Logic App JSON files |

### Examples

```bash
# Migrate a single workflow file to a specific output directory
bal migrate-logicapps /path/to/logic-app-control-flow.json --out /path/to/output-dir

# Migrate all Logic Apps JSON files in a directory (multi-root mode)
bal migrate-logicapps /path/to/logic-apps-file-directory --out /path/to/output-dir --multi-root
```

> **Note:** In multi-root mode, ensure that only Logic Apps JSON files are present in the directory. Do not include any unrelated JSON files.

## Handle manual migration items

After migration, the tool generates a report listing successfully migrated components and items that require manual attention:

```
Migration Report: order-workflow
===================================

Migrated Successfully:
  - Trigger: HTTP Request -> http:Listener resource
  - Action: Get_order -> http:Client request
  - Action: Response -> return statement

Requires Manual Review:
  - Action: Notify_on_low_stock -> Office 365 Outlook connection needs credentials

Unsupported (Manual Migration Required):
  - Custom Connector: SAP_Connector -> Replace with appropriate connector
```

Work through the non-migratable items:

1. **Connector-backed actions** (Office 365, SQL, Service Bus, and similar managed API connections): these need their connection turned into an explicit Ballerina client and credentials moved into `Config.toml`. See the [concept and component mapping](#concept-and-component-mapping) below for the connector you're using.
2. **Custom connectors and unsupported actions**: implement the equivalent Ballerina logic manually.
3. **Dynamic content expressions** (`@{...}`, `@body(...)`, `@triggerOutputs()`): these become typed Ballerina expressions over the request/response records. Complex expressions may need a short function instead of an inline expression.

### Configure credentials

Add the values connector-backed actions need to `Config.toml`:

```toml
# Config.toml
backendUrl = "https://backend"
smtpUsername = "ops@example.com"
smtpPassword = "changeme"
```

## Test the migrated integration

Run the migrated integration's tests, if the tool generated any from the workflow's test definitions:

```bash
bal test
```

Use the **Try-It** tool built into WSO2 Integrator to send requests to your HTTP service interactively without leaving the editor. Open the service file, click **Try it**, and test each endpoint against the responses returned by the original Logic Apps workflow.

## Deploy

Once tests pass, run the integration locally:

```bash
bal run
```

To build a deployable artifact:

```bash
bal build
```

See [Deploy](../deploy-and-run/deploy-and-run.md) for Docker, Kubernetes, and cloud deployment options.

## Concept and component mapping

| Logic Apps | WSO2 Integrator | Notes |
|---|---|---|
| Workflow | Service / Automation | HTTP-triggered workflows become **services**; recurrence-triggered workflows become **automations** |
| HTTP Trigger (Request) | `http:Listener` + service resource | The trigger's method and relative path become the resource's method and path |
| Recurrence Trigger | `task:Listener` | Interval or cron-based trigger for automations |
| HTTP Action | `http:Client` | Outbound HTTP calls to external services |
| API Connection (Office 365, SQL, Service Bus, and similar) | The matching Ballerina connector client | Managed connections become explicit clients configured via `Config.toml` |
| Compose | Variable assignment / record construction | Building a value from expressions |
| Parse JSON | JSON data binding / record types | Typed records replace the schema-validated JSON parse action |
| Condition | `if`/`else` | Conditional branching |
| Switch | `match` | Multi-branch conditional |
| For Each | `foreach` / query expressions | Iteration over collections |
| Until | `while` | Loop with an exit condition |
| Scope with a configured run-after failure path | `do`/`on fail` | Typed, structural error handling |
| Initialize Variable / Set Variable | Local variable declaration / assignment | Ballerina variables are typed |
| Response | `return` statement | Ends the resource function with a typed response |
| Dynamic content expressions (`@{...}`) | Ballerina expressions | Statically typed, evaluated over request/response records instead of the implicit workflow context |
| Logic App (ARM template / workflow JSON) | `Ballerina.toml` + service | Workflow definition and deployment metadata become a Ballerina package |

## Key differences

### Workflow definition vs. Ballerina service

Logic Apps defines a workflow declaratively as JSON: triggers and actions connected by `runAfter` conditions. In WSO2 Integrator, a **service** is a collection of HTTP resources, and control flow is ordinary Ballerina code rather than a graph of steps.

**Logic Apps action (conceptual JSON):**
```json
{
  "Get_order": {
    "type": "Http",
    "inputs": { "method": "GET", "uri": "https://backend/orders/@{...}" },
    "runAfter": {}
  }
}
```

**WSO2 Integrator equivalent:**
```ballerina
import ballerina/http;

configurable string backendUrl = "https://backend";

final http:Client backendClient = check new (backendUrl);

service /orders on new http:Listener(8090) {
    resource function get [string orderId]() returns json|error {
        return check backendClient->get("/orders/" + orderId);
    }
}
```

Differences:
- Logic Apps sequences actions with `runAfter` conditions on each action. Ballerina sequences statements the same way any program does — top to bottom, with explicit `if`/`do`/`on fail` for branching.
- Logic Apps passes data through dynamic content expressions that reach back into prior actions' outputs (`@body('Get_order')`). Ballerina uses ordinary variables and typed return values — there's no implicit workflow-wide context to reach into.
- Logic Apps connectors are configured through managed API connections in the Azure portal. Ballerina connectors are explicit clients constructed in code, configured via `Config.toml`.

### Error handling

**Logic Apps** (a Scope with a configured failure path):
```json
{
  "Try_get_order": { "type": "Scope", "actions": { "Get_order": { "type": "Http" } } },
  "Handle_failure": {
    "type": "Response",
    "runAfter": { "Try_get_order": ["Failed"] },
    "inputs": { "statusCode": 503, "body": "Backend unavailable" }
  }
}
```

**WSO2 Integrator:**
```ballerina
do {
    json result = check backendClient->get("/orders/" + orderId);
    return result;
} on fail error e {
    log:printError("Backend unavailable", e);
    return <http:ServiceUnavailable>{body: {message: "Backend unavailable"}};
}
```

The key advantage is that Ballerina errors are typed and caught at the statement level with `do`/`on fail`, rather than modeled as a separate branch of the action graph keyed off another action's run status.

## Common gotchas

- **No implicit workflow context**: Logic Apps expressions like `@triggerBody()` or `@body('ActionName')` reach into the workflow's shared run history. In Ballerina, pass data explicitly as function parameters and local variables — there is no equivalent implicit state.
- **Managed API connections**: Logic Apps connectors (Office 365, SQL, Service Bus, and similar) are configured once in the Azure portal and referenced by name. Their Ballerina equivalents are explicit clients you construct with credentials from `Config.toml` — there is no connection picker.
- **`runAfter` conditions**: Logic Apps can branch on an action's status (`Succeeded`, `Failed`, `Skipped`, `TimedOut`). Model this in Ballerina with `do`/`on fail` for failure branches, and ordinary sequencing for the success path.
- **Custom connectors and unsupported actions**: implement the equivalent Ballerina logic manually, or call the target service's REST API directly using `http:Client`.

## Examples

### HTTP-triggered workflow with a connector-backed action

**Logic Apps workflow (JSON):** an HTTP trigger, a plain HTTP action, a connector-backed action (an Office 365 Outlook email notification via a managed API connection), and a Response action.

```json
{
  "definition": {
    "triggers": {
      "manual": {
        "type": "Request",
        "kind": "Http",
        "inputs": {
          "method": "GET",
          "relativePath": "/orders/{orderId}"
        }
      }
    },
    "actions": {
      "Get_order": {
        "type": "Http",
        "inputs": {
          "method": "GET",
          "uri": "https://backend/orders/@{triggerOutputs()['relativePathParameters']['orderId']}"
        }
      },
      "Notify_on_low_stock": {
        "type": "ApiConnection",
        "inputs": {
          "host": { "connection": { "referenceName": "office365" } },
          "method": "post",
          "path": "/Mail",
          "body": {
            "To": "ops@example.com",
            "Subject": "Order requires review",
            "Body": "@body('Get_order')"
          }
        },
        "runAfter": { "Get_order": ["Succeeded"] }
      },
      "Response": {
        "type": "Response",
        "inputs": {
          "statusCode": 200,
          "body": "@body('Get_order')"
        }
      }
    }
  }
}
```

**Generated Ballerina code:**

```ballerina
import ballerina/http;
import ballerina/log;
import ballerinax/email;

configurable string backendUrl = ?;
configurable string smtpUsername = ?;
configurable string smtpPassword = ?;

final http:Client backendClient = check new (backendUrl);
final email:SmtpClient smtpClient = check new (smtpUsername, smtpPassword);

service /orders on new http:Listener(8090) {
    resource function get [string orderId]() returns json|error {
        json orderDetails = check backendClient->get("/orders/" + orderId);

        // Notify_on_low_stock, migrated from an Office 365 Outlook connector action
        check smtpClient->sendMessage({
            to: ["ops@example.com"],
            subject: "Order requires review",
            body: orderDetails.toJsonString()
        });

        return orderDetails;
    }
}
```
