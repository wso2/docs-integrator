---
sidebar_position: 10
title: Ballerina Specifications
description: Reference to Ballerina language specification, library specifications, and platform specifications with version info and links.
---

# Ballerina Specifications

Ballerina is defined by a set of formal specifications that govern the language semantics, standard library behavior, and platform requirements. These specifications serve as the authoritative reference for language implementors, library authors, and developers who need precise behavioral definitions.

## Language Specification

The Ballerina Language Specification defines the syntax, type system, semantics, and execution model of the Ballerina programming language.

| Attribute | Detail |
|-----------|--------|
| Current version | 2024R1 |
| Specification | [Ballerina Language Specification](https://ballerina.io/spec/lang/master/) |
| Status | Active, updated with each Swan Lake release |
| Format | HTML |

### Specification Sections

| Section | Topics Covered |
|---------|---------------|
| Lexical Structure | Tokens, keywords, identifiers, literals, comments |
| Values, Types, and Variables | Type system, basic types, structured types, behavioral types |
| Expressions | Operators, literals, member access, function calls, query expressions |
| Statements | Variable declarations, assignments, control flow, transactions |
| Module and Program Structure | Modules, imports, visibility, program entry points |
| Concurrency | Strands, workers, isolation, transactions |
| Error Handling | Error type, check, trap, on fail |
| Type Narrowing | Type guards, type test expressions |
| Object Types | Object definitions, methods, constructors |
| Other Types | Stream, future, typedesc, handle |

### Language Specification Versions

| Version | Swan Lake Release | Key Changes |
|---------|-------------------|-------------|
| 2024R1 | Swan Lake Update 9 | Regular expressions, resource method typing enhancements |
| 2023R1 | Swan Lake Update 7 | Tuple rest descriptors, isolated inference improvements |
| 2022R4 | Swan Lake Update 4 | Configurable variables refinements, query expression enhancements |
| 2022R3 | Swan Lake Update 3 | Intersection types for errors, resource methods for client objects |
| 2022R1 | Swan Lake GA | Initial Swan Lake specification |

## Standard Library Specifications

Each standard library module has its own specification defining the module's API contract, behavior, and error semantics.

### Core Library Specifications

| Module | Specification | Description |
|--------|--------------|-------------|
| `ballerina/lang.value` | [Spec](https://ballerina.io/spec/lang/master/#lang.value) | Operations on all Ballerina values |
| `ballerina/lang.array` | [Spec](https://ballerina.io/spec/lang/master/#lang.array) | Array operations (push, pop, sort, filter) |
| `ballerina/lang.map` | [Spec](https://ballerina.io/spec/lang/master/#lang.map) | Map operations (get, entries, keys, values) |
| `ballerina/lang.string` | [Spec](https://ballerina.io/spec/lang/master/#lang.string) | String operations (substring, trim, split) |
| `ballerina/lang.int` | [Spec](https://ballerina.io/spec/lang/master/#lang.int) | Integer operations and limits |
| `ballerina/lang.float` | [Spec](https://ballerina.io/spec/lang/master/#lang.float) | Floating-point operations |
| `ballerina/lang.decimal` | [Spec](https://ballerina.io/spec/lang/master/#lang.decimal) | Decimal operations |
| `ballerina/lang.boolean` | [Spec](https://ballerina.io/spec/lang/master/#lang.boolean) | Boolean operations |
| `ballerina/lang.error` | [Spec](https://ballerina.io/spec/lang/master/#lang.error) | Error type operations |
| `ballerina/lang.xml` | [Spec](https://ballerina.io/spec/lang/master/#lang.xml) | XML type operations |
| `ballerina/lang.table` | [Spec](https://ballerina.io/spec/lang/master/#lang.table) | Table operations |
| `ballerina/lang.regexp` | [Spec](https://ballerina.io/spec/lang/master/#lang.regexp) | Regular expression operations |
| `ballerina/lang.runtime` | [Spec](https://ballerina.io/spec/lang/master/#lang.runtime) | Runtime management operations |
| `ballerina/lang.transaction` | [Spec](https://ballerina.io/spec/lang/master/#lang.transaction) | Transaction management |

### Network Library Specifications

| Module | Specification | Key Topics |
|--------|--------------|------------|
| `ballerina/http` | [Spec](https://github.com/ballerina-platform/module-ballerina-http/blob/master/docs/spec/spec.md) | HTTP service, client, request/response, security, interceptors |
| `ballerina/grpc` | [Spec](https://github.com/ballerina-platform/module-ballerina-grpc/blob/master/docs/spec/spec.md) | gRPC service, client, streaming patterns |
| `ballerina/graphql` | [Spec](https://github.com/ballerina-platform/module-ballerina-graphql/blob/master/docs/spec/spec.md) | GraphQL service, schema generation, subscriptions |
| `ballerina/websocket` | [Spec](https://github.com/ballerina-platform/module-ballerina-websocket/blob/master/docs/spec/spec.md) | WebSocket service, client, lifecycle |
| `ballerina/websub` | [Spec](https://github.com/ballerina-platform/module-ballerina-websub/blob/master/docs/spec/spec.md) | WebSub subscriber, hub integration |
| `ballerina/tcp` | [Spec](https://github.com/ballerina-platform/module-ballerina-tcp/blob/master/docs/spec/spec.md) | TCP listener, client, byte stream handling |
| `ballerina/udp` | [Spec](https://github.com/ballerina-platform/module-ballerina-udp/blob/master/docs/spec/spec.md) | UDP datagram communication |
| `ballerina/email` | [Spec](https://github.com/ballerina-platform/module-ballerina-email/blob/master/docs/spec/spec.md) | SMTP, POP3, IMAP protocols |
| `ballerina/ftp` | [Spec](https://github.com/ballerina-platform/module-ballerina-ftp/blob/master/docs/spec/spec.md) | FTP/SFTP client and listener |

### Data Library Specifications

| Module | Specification | Key Topics |
|--------|--------------|------------|
| `ballerina/io` | [Spec](https://github.com/ballerina-platform/module-ballerina-io/blob/master/docs/spec/spec.md) | File I/O, stream I/O, console I/O |
| `ballerina/sql` | [Spec](https://github.com/ballerina-platform/module-ballerina-sql/blob/master/docs/spec/spec.md) | Generic SQL client, parameterized queries, transactions |
| `ballerina/persist` | [Spec](https://github.com/ballerina-platform/module-ballerina-persist/blob/master/docs/spec/spec.md) | Data persistence layer, entity modeling |
| `ballerina/constraint` | [Spec](https://github.com/ballerina-platform/module-ballerina-constraint/blob/master/docs/spec/spec.md) | Data validation constraints |

## Platform Specification

The Ballerina Platform Specification defines the build system, package management, and runtime environment.

| Attribute | Detail |
|-----------|--------|
| Build tool | `bal` CLI |
| Package format | BALA (Ballerina Archive) |
| Package registry | [Ballerina Central](https://central.ballerina.io) |
| Runtime | JVM-based (Java 17+) |
| Native compilation | GraalVM native image (experimental) |

### Platform Components

| Component | Specification Area | Description |
|-----------|-------------------|-------------|
| Package System | Module structure, `Ballerina.toml`, `Dependencies.toml` | Package layout, dependencies, versioning |
| Build System | `bal build`, `bal run`, `bal test` | Compilation, execution, testing pipeline |
| Central Repository | Package publishing and resolution | Versioned package distribution |
| Type Narrowing | Flow typing and type guards | Compile-time type inference |
| Concurrency Model | Strand-based execution | Cooperative concurrency on JVM threads |
| Transaction Manager | Two-phase commit protocol | Distributed transaction coordination |

## Specification Versioning

Ballerina specifications follow a versioning scheme tied to Swan Lake releases.

| Scheme | Format | Example | Description |
|--------|--------|---------|-------------|
| Language spec | `YYYYRN` | `2024R1` | Year and release number within that year |
| Distribution | `YYYY.N.N` | `2201.9.2` | Year, minor version, patch version |
| Module spec | Semantic versioning | `2.11.2` | Major.minor.patch per module |

## Where to Find Specifications

| Resource | URL |
|----------|-----|
| Language specification (latest) | [ballerina.io/spec/lang/master/](https://ballerina.io/spec/lang/master/) |
| Language specification (versioned) | [ballerina.io/spec/lang/](https://ballerina.io/spec/lang/) |
| Module specifications | Each module's GitHub repository under `docs/spec/` |
| Platform specification | [ballerina.io/spec/](https://ballerina.io/spec/) |
| Swan Lake release notes | [ballerina.io/downloads/swan-lake-release-notes/](https://ballerina.io/downloads/swan-lake-release-notes/) |

## See Also

- [Ballerina by Example](by-example.md) -- Runnable code examples
- [Ballerina API Documentation](api/ballerina-api-docs.md) -- Module API docs
- [Release Notes](release-notes.md) -- Version history and migration notes
