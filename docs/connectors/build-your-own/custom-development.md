---
title: Custom development
---

# Custom development

Ballerina connectors are packages containing one or more clients that communicate with external services via REST APIs. Build one from scratch when you need full control over authentication, error handling, or data transformation logic, or when you want to publish a reusable connector to [Ballerina Central](https://central.ballerina.io/) for your team or the broader community. This guide walks through generating a connector from an OpenAPI specification, which is the fastest and most reliable approach.

## Prerequisites

- Basic knowledge of [Ballerina Swan Lake](https://ballerina.io/) with the latest version installed
- An OpenAPI specification for the target API, plus any relevant API credentials
- WSO2 Integrator IDE installed and configured
- A GitHub account with Git installed locally (required only if you plan to publish to Ballerina Central)

## Step 1: Set up the project structure

Create a GitHub repository for your connector. The naming convention is:

```
module-ballerinax-<connector-name>
```

For example: `module-ballerinax-twitter`

Clone the repository and copy the project structure from the [Ballerina generated connector template](https://github.com/ballerina-platform/ballerina-library/tree/main/library-templates/generated-connector-template/files):

```bash
git clone https://github.com/<your-username>/module-ballerinax-<connector-name>.git
cd module-ballerinax-<connector-name>
```

The expected project structure:

```
module-ballerinax-myconnector/
├── .github/
├── ballerina/
│   ├── tests/
│   ├── Ballerina.toml
│   ├── README.md
│   ├── build.gradle
│   └── client.bal
├── build-config/
├── docs/
│   └── spec/
│       └── sanitations.md
├── examples/
│   ├── README.md
│   ├── build.gradle
│   └── build.sh
├── gradle/
├── .gitignore
├── LICENSE
├── README.md
├── build.gradle
├── gradle.properties
├── gradlew
├── gradlew.bat
└── settings.gradle
```

The template contains placeholders. Use the [provided Ballerina script](https://github.com/ballerina-platform/ballerina-library/blob/main/library-templates/generated-connector-template/scripts/replace_placeholders.bal) to update them with your connector-specific metadata.

## Step 2: Prepare the OpenAPI definition

1. Obtain the OpenAPI definition from the target API's documentation and save it as `openapi.yaml` (or `openapi.json`) in the `docs/spec` directory.

2. Flatten the OpenAPI definition to relocate all inline embedded schemas to the `components` section:

    ```bash
    bal openapi flatten -i docs/spec/openapi.yaml -o docs/spec
    ```

3. Align the flattened definition according to Ballerina best practices:

    ```bash
    bal openapi align -i docs/spec/flattened_openapi.yaml -o docs/spec
    ```

4. Remove the original `openapi.yaml` and `flattened_openapi.yaml`, then rename `aligned_ballerina_openapi.yaml` to `openapi.yaml`.

Preprocessing often reduces the need for manual sanitization. If further changes are required (e.g., security schemes or schema redefinitions), document them in `docs/spec/sanitations.md`.

## Step 3: Generate the Ballerina client

Run the following command from the project root to generate the client code:

```bash
bal openapi -i docs/spec/openapi.yaml --mode client -o ballerina
```

This generates the following files in the `ballerina/` directory:

| File | Description |
|---|---|
| `client.bal` | Client implementation with API operations |
| `types.bal` | Data types used by the client |
| `utils.bal` | Utility functions |

The Ballerina OpenAPI tool supports multiple customization options when generating clients. See the [OpenAPI tool documentation](https://ballerina.io/learn/openapi-tool/) for details.

## Step 4: Test the connector

Add test files to the `ballerina/tests` directory with test cases covering key operations. Aim for comprehensive API use case coverage.

Run the tests:

```bash
bal test
```

See the [Ballerina testing guide](https://ballerina.io/learn/test-ballerina-code/test-a-simple-function/) for detailed testing information.

## Step 5: Document the connector

### Package README (`ballerina/README.md`)

This is displayed on the Ballerina Central package landing page. Include:

- Overview: Concise introduction, purpose, and key features
- Key features: Bullet list of the connector's main capabilities
- Setup: Step-by-step configuration instructions and prerequisites (API keys, environment setup)
- Quickstart: A basic, clear example for immediate use
- Examples: Links to additional use cases and scenarios

### Repository README (root `README.md`)

This is displayed on the GitHub repository landing page. Include the same information as the package README, plus:

- Building from Source
- Contributing
- License

### Examples (`examples/` directory)

Add practical examples that demonstrate real-world scenarios. Each example should be a separate Ballerina package with its own `README.md`.

## Step 6: Publish the connector

Update `Ballerina.toml` with your connector metadata:

```toml
[package]
org = "your_org"
name = "myconnector"
version = "1.0.0"
license = ["Apache-2.0"]
authors = ["Your Name"]
keywords = ["integration", "myservice", "Vendor/MyService", "Area/Communication", "Type/Connector"]
repository = "https://github.com/your-username/module-ballerinax-myconnector"
icon = "icon.png"
```

#### Keywords for the WSO2 Integration Platform

The `Vendor/`, `Area/`, and `Type/` keywords classify your connector in the WSO2 Integration Platform connector catalog. Use the following format:

| Keyword | Purpose | Example |
|---|---|---|
| `Vendor/<name>` | The service or company the connector targets | `Vendor/Salesforce` |
| `Area/<category>` | The functional category of the connector | `Area/CRM & Sales` |
| `Type/Connector` | Marks the package as a connector (use this fixed value) | `Type/Connector` |
| `Name/<display name>` | Optional. Use when the display name should differ from the package name | `Name/Salesforce CRM` |

The WSO2 Integration Platform connector catalog currently lists pre-built WSO2 connectors. Support for community-published connectors is planned, and adding these keywords now ensures your connector is ready when that support rolls out.

Then follow the [package publishing guide](https://ballerina.io/learn/publish-packages-to-ballerina-central/) to publish to Ballerina Central.

## What's next

- [Create from OpenAPI spec](create-from-openapi-spec.md): Generate a connector directly in the WSO2 Integrator IDE without writing code
- [Build your own connector](build-own.md): Compare approaches for creating custom connectors
- [Connector catalog](../catalog/index.mdx): Browse all available pre-built connectors
