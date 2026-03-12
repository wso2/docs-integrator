---
sidebar_position: 1
title: Integration Tools
description: "What CLI tools are available for generating code, schemas, and migrations?"
---

# Integration Tools

Accelerate integration development with Ballerina CLI tools that generate service stubs, client code, schemas, and data converters from industry-standard specifications. These tools eliminate boilerplate and ensure your integrations conform to API contracts, protocol definitions, and data standards.

## Code Generation Tools

Generate Ballerina code from API specifications and protocol definitions.

- [OpenAPI Tool](openapi-tool.md) -- Generate HTTP services and clients from OpenAPI/Swagger specifications
- [GraphQL Tool](graphql-tool.md) -- Generate GraphQL services and clients from SDL schemas
- [AsyncAPI Tool](asyncapi-tool.md) -- Generate event-driven services from AsyncAPI specifications
- [gRPC Tool](grpc-tool.md) -- Generate gRPC services and clients from Protocol Buffer definitions
- [WSDL Tool](wsdl-tool.md) -- Generate clients for SOAP/WSDL web services
- [XSD Tool](xsd-tool.md) -- Generate Ballerina record types from XML Schema definitions

## Domain-Specific Tools

Specialized tools for healthcare and B2B integration domains.

- [Health Tool](health-tool.md) -- Generate FHIR and HL7 integration code for healthcare systems
- [EDI Tool](edi-tool.md) -- Generate Ballerina code from EDI schema definitions for B2B data exchange

## Code Quality Tools

- [Scan Tool](scan-tool.md) -- Run static code analysis to detect security, quality, and best practice issues

## Migration Tools

- [Migration Tools](migration-tools.md) -- Migrate integrations from WSO2 Micro Integrator, MuleSoft, and other platforms

## Quick Reference

| Tool | Command | Input | Output |
|------|---------|-------|--------|
| OpenAPI | `bal openapi` | OpenAPI YAML/JSON | Service stub or client |
| GraphQL | `bal graphql` | GraphQL SDL | Service or client |
| AsyncAPI | `bal asyncapi` | AsyncAPI spec | Event listener service |
| gRPC | `bal grpc` | `.proto` file | Service stub and client |
| WSDL | `bal wsdl` | WSDL file | SOAP client |
| XSD | `bal xsd` | `.xsd` file | Record types |
| Health | `bal health` | FHIR/HL7 profiles | Healthcare types and templates |
| EDI | `bal edi` | EDI schema | EDI parser/generator |
| Scan | `bal scan` | Source code | Analysis report |

## What's Next

Start with the [OpenAPI Tool](openapi-tool.md) if you are building REST API integrations, or browse the full list to find the tool that matches your specification format.
