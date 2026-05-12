---
title: Tools
---

# Tools

Accelerate integration development with Ballerina CLI tools that generate service stubs, client code, schemas, and data converters from industry-standard specifications. These tools eliminate boilerplate and ensure your integrations conform to API contracts, protocol definitions, and data standards.

In WSO2 Integrator, most tools are accessible both from the command line and from the Visual Designer in VS Code.

![VS Code command palette showing bal tool commands](/img/develop/tools/overview/command-palette.png)

## Integration tools

Generate Ballerina code from API specifications, protocol definitions, and domain-specific standards.

- [OpenAPI Tool](integration-tools/openapi-tool.md) -- Generate HTTP services and clients from OpenAPI/Swagger specifications
- [GraphQL Tool](integration-tools/graphql-tool.md) -- Generate GraphQL services and clients from SDL schemas
- [AsyncAPI Tool](integration-tools/asyncapi-tool.md) -- Generate event-driven services from AsyncAPI specifications
- [gRPC Tool](integration-tools/grpc-tool.md) -- Generate gRPC services and clients from Protocol Buffer definitions
- [Health Tool](integration-tools/health-tool.md) -- Generate FHIR and HL7 integration code for healthcare systems
- [EDI Tool](integration-tools/edi-tool.md) -- Generate Ballerina code from EDI schema definitions for B2B data exchange
- [WSDL Tool](integration-tools/wsdl-tool.md) -- Generate clients for SOAP/WSDL web services
- [XSD Tool](integration-tools/xsd-tool.md) -- Generate Ballerina record types from XML Schema definitions

## Migration tools

Migrate existing integrations from other platforms to WSO2 Integrator.

- [Migration Tools Overview](migration-tools/migration-tools.md) -- Shared workflow and command reference
- [Migrate from WSO2 MI](migration-tools/migrate-from-mi.md) -- Migrate WSO2 MI Synapse XML configurations
- [Migrate from MuleSoft](migration-tools/migrate-from-mulesoft.md) -- Migrate MuleSoft Anypoint flows
- [Migrate from TIBCO](migration-tools/migrate-from-tibco-businessworks.md) -- Migrate TIBCO BusinessWorks processes
- [Migrate from Azure Logic Apps](migration-tools/migrate-from-azure-logic-apps.md) -- Migrate Azure Logic Apps workflows

## Other tools

- [Scan Tool](other/scan-tool.md) -- Run static code analysis to detect security, quality, and best practice issues
- [Persist Tool](integration-tools/persist-tool.md) -- Generate type-safe data persistence clients for multiple data stores

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
