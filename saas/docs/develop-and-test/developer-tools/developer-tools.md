---
title: Use Developer Tools
---

# Use Developer Tools

Accelerate integration development with Ballerina CLI tools that generate service stubs, client code, schemas, and data converters from industry-standard specifications. These tools eliminate boilerplate and ensure your integrations conform to API contracts, protocol definitions, and data standards.

In WSO2 Integrator, most tools are accessible both from the command line and from the Visual Designer in VS Code.

<ThemedImage
    alt="VS Code command palette showing bal tool commands"
    sources={{
        light: useBaseUrl('/img/develop/tools/overview/command-palette.png'),
        dark: useBaseUrl('/img/develop/tools/overview/command-palette.png'),
    }}
/>

## Integration tools

Generate Ballerina code from API specifications, protocol definitions, and domain-specific standards.

<PaletteCard icon="api" href="/develop-and-test/developer-tools/integration-tools/openapi-tool">
  <h3 class="palette-card-title">OpenAPI Tool</h3>
  <p class="palette-card-desc">Generate HTTP services and clients from OpenAPI/Swagger specifications.</p>

<PaletteCard icon="graphql" href="/develop-and-test/developer-tools/integration-tools/graphql-tool">
  <h3 class="palette-card-title">GraphQL Tool</h3>
  <p class="palette-card-desc">Generate GraphQL services and clients from SDL schemas.</p>

<PaletteCard icon="asyncapi" href="/develop-and-test/developer-tools/integration-tools/asyncapi-tool">
  <h3 class="palette-card-title">AsyncAPI Tool</h3>
  <p class="palette-card-desc">Generate event-driven services from AsyncAPI specifications.</p>

<PaletteCard icon="concurrency" href="/develop-and-test/developer-tools/integration-tools/grpc-tool">
  <h3 class="palette-card-title">gRPC Tool</h3>
  <p class="palette-card-desc">Generate gRPC services and clients from Protocol Buffer definitions.</p>

<PaletteCard icon="wsdl" href="/develop-and-test/developer-tools/integration-tools/wsdl-tool">
  <h3 class="palette-card-title">WSDL Tool</h3>
  <p class="palette-card-desc">Generate clients for SOAP/WSDL web services.</p>

<PaletteCard icon="xsd" href="/develop-and-test/developer-tools/integration-tools/xsd-tool">
  <h3 class="palette-card-title">XSD Tool</h3>
  <p class="palette-card-desc">Generate Ballerina record types from XML Schema definitions.</p>

<PaletteCard icon="health" href="/develop-and-test/developer-tools/integration-tools/health-tool">
  <h3 class="palette-card-title">Health Tool</h3>
  <p class="palette-card-desc">Generate FHIR and HL7 integration code for healthcare systems.</p>

<PaletteCard icon="edi" href="/develop-and-test/developer-tools/integration-tools/edi-tool">
  <h3 class="palette-card-title">EDI Tool</h3>
  <p class="palette-card-desc">Generate Ballerina code from EDI schema definitions for B2B data exchange.</p>

<PaletteCard icon="connections" href="/develop-and-test/developer-tools/integration-tools/connector-tool">
  <h3 class="palette-card-title">Connector Tool</h3>
  <p class="palette-card-desc">Generate production-ready Ballerina connectors from OpenAPI specifications using an AI-assisted pipeline.</p>

## Utility tools

Tools that support code quality and data persistence, independent of any particular schema or spec format.

<PaletteCard icon="persist" href="/develop-and-test/developer-tools/utility-tools/persist-tool">
  <h3 class="palette-card-title">Persist Tool</h3>
  <p class="palette-card-desc">Generate type-safe data persistence clients for multiple data stores.</p>

<PaletteCard icon="scan" href="/develop-and-test/developer-tools/utility-tools/scan-tool">
  <h3 class="palette-card-title">Scan Tool</h3>
  <p class="palette-card-desc">Run static code analysis to detect security, quality, and best practice issues.</p>

## Quick reference

| Tool | Command | Input | Output | UI support |
|------|---------|-------|--------|------------|
| OpenAPI | `bal openapi` | OpenAPI YAML/JSON | Service stub or client | Visual Designer |
| GraphQL | `bal graphql` | GraphQL SDL | Service or client | Visual Designer |
| AsyncAPI | `bal asyncapi` | AsyncAPI spec | Event listener service | Visual Designer |
| gRPC | `bal grpc` | `.proto` file | Service stub and client | Visual Designer |
| WSDL | `bal wsdl` | WSDL file | SOAP client | Visual Designer |
| XSD | `bal xsd` | `.xsd` file | Record types | Visual Designer |
| Health | `bal health` | FHIR/HL7 profiles | Healthcare types and templates | CLI only |
| EDI | `bal edi` | EDI schema | EDI parser/generator | CLI only |
| Scan | `bal scan` | Source code | Analysis report | CLI only |
| Persist | `bal persist` | Record types | Data store client | CLI only |
| Connector | `bal connector` | OpenAPI YAML/JSON | Full connector package (client, tests, examples, docs) | CLI only |

Moving an existing integration from MuleSoft, TIBCO BusinessWorks, or Azure Logic Apps? See [Migrate to WSO2 Integrator](../../migrate/index.md).
