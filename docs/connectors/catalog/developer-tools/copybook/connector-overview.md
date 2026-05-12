---
title: Overview
---

# Overview

The Ballerina `ballerinax/copybook` connector (v1.1.0) is a serialization/deserialization library for working with COBOL copybook data formats commonly used in mainframe integration. It enables Ballerina programs to convert between typed Ballerina records and COBOL copybook byte streams using either ASCII or EBCDIC encoding, bridging modern integration flows with legacy mainframe systems.

## Key features

- Parse COBOL copybook schema definitions from `.cpy` files to drive serialization and deserialization
- Convert Ballerina `record {}` values to COBOL copybook-formatted byte arrays
- Deserialize COBOL copybook byte streams back into Ballerina `map<json>` values
- Support for both ASCII and EBCDIC encoding for mainframe compatibility
- Handle complex COBOL data structures including nested groups, OCCURS (arrays), and REDEFINES clauses
- CLI tool (`bal copybook -i <file>`) to auto-generate typed Ballerina record types from a copybook schema
- GraalVM-compatible native image support via the `copybook-native` Java library

## Actions

Actions are operations you invoke on the `copybook:Converter` class to serialize Ballerina records into COBOL copybook byte streams and deserialize byte streams back into Ballerina JSON maps. The connector provides a single converter class initialized with a copybook schema file:

| Client | Actions |
|--------|---------|
| `Converter` | Serialize Ballerina records to COBOL copybook byte arrays and deserialize copybook byte arrays to Ballerina JSON maps |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide describes how to obtain and prepare a COBOL copybook schema file required by the Copybook connector.

* **[Action Reference](actions.md)**: Full reference for the `Converter` client: operations, parameters, return types, and sample code.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [Copybook Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-copybook)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
