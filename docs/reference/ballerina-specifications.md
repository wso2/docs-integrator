---
title: Ballerina Specifications
---

# Ballerina Specifications

Ballerina is defined by a set of formal specifications that govern the language semantics, standard library behavior, and platform requirements. These specifications serve as the authoritative reference for language implementors, library authors, and developers who need precise behavioral definitions.

## Language specification

The Ballerina Language Specification defines the syntax, type system, semantics, and execution model of the Ballerina programming language.

| Attribute | Detail |
|-----------|--------|
| Current version | 2024R1 |
| Specification | [Ballerina Language Specification](https://ballerina.io/spec/lang/master/) |
| Status | Active, updated with each Swan Lake release |
| Format | HTML |

### Specification sections

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

### Language specification versions

| Version | Swan Lake Release | Key Changes |
|---------|-------------------|-------------|
| 2024R1 | Swan Lake Update 9 | Regular expressions, resource method typing enhancements |
| 2023R1 | Swan Lake Update 7 | Tuple rest descriptors, isolated inference improvements |
| 2022R4 | Swan Lake Update 4 | Configurable variables refinements, query expression enhancements |
| 2022R3 | Swan Lake Update 3 | Intersection types for errors, resource methods for client objects |
| 2022R1 | Swan Lake GA | Initial Swan Lake specification |

## Standard library specifications

Each standard library module has its own specification defining the module's API contract, behavior, and error semantics.

### Core library specifications

| Module | Description |
|--------|-------------|
| **[`ballerina/lang.value`](https://ballerina.io/spec/lang/master/#lang.value)** | Operations on all Ballerina values |
| **[`ballerina/lang.array`](https://ballerina.io/spec/lang/master/#lang.array)** | Array/Tuple operations (push, pop, sort, filter) |
| **[`ballerina/lang.map`](https://ballerina.io/spec/lang/master/#lang.map)** | Map/Record operations (get, entries, keys, values) |
| **[`ballerina/lang.string`](https://ballerina.io/spec/lang/master/#lang.string)** | String operations (substring, trim, split) |
| **[`ballerina/lang.int`](https://ballerina.io/spec/lang/master/#lang.int)** | Integer operations and limits |
| **[`ballerina/lang.float`](https://ballerina.io/spec/lang/master/#lang.float)** | Floating-point operations |
| **[`ballerina/lang.decimal`](https://ballerina.io/spec/lang/master/#lang.decimal)** | Decimal operations |
| **[`ballerina/lang.boolean`](https://ballerina.io/spec/lang/master/#lang.boolean)** | Boolean operations |
| **[`ballerina/lang.error`](https://ballerina.io/spec/lang/master/#lang.error)** | Error type operations |
| **[`ballerina/lang.xml`](https://ballerina.io/spec/lang/master/#lang.xml)** | XML type operations |
| **[`ballerina/lang.table`](https://ballerina.io/spec/lang/master/#lang.table)** | Table operations |
| **[`ballerina/lang.regexp`](https://ballerina.io/spec/lang/master/#lang.regexp)** | Regular expression operations |
| **[`ballerina/lang.runtime`](https://ballerina.io/spec/lang/master/#lang.runtime)** | Runtime management operations |
| **[`ballerina/lang.transaction`](https://ballerina.io/spec/lang/master/#lang.transaction)** | Transaction management |

### Network library specifications

| Module | Key Topics |
|--------|------------|
| **[`ballerina/http`](https://github.com/ballerina-platform/module-ballerina-http/blob/master/docs/spec/spec.md)** | HTTP service, client, request/response, security, interceptors |
| **[`ballerina/grpc`](https://github.com/ballerina-platform/module-ballerina-grpc/blob/master/docs/spec/spec.md)** | gRPC service, client, streaming patterns |
| **[`ballerina/graphql`](https://github.com/ballerina-platform/module-ballerina-graphql/blob/master/docs/spec/spec.md)** | GraphQL service, schema generation, subscriptions |
| **[`ballerina/websocket`](https://github.com/ballerina-platform/module-ballerina-websocket/blob/master/docs/spec/spec.md)** | WebSocket service, client, lifecycle |
| **[`ballerina/websub`](https://github.com/ballerina-platform/module-ballerina-websub/blob/master/docs/spec/spec.md)** | WebSub subscriber, hub integration |
| **[`ballerina/tcp`](https://github.com/ballerina-platform/module-ballerina-tcp/blob/master/docs/spec/spec.md)** | TCP listener, client, byte stream handling |
| **[`ballerina/udp`](https://github.com/ballerina-platform/module-ballerina-udp/blob/master/docs/spec/spec.md)** | UDP datagram communication |
| **[`ballerina/email`](https://github.com/ballerina-platform/module-ballerina-email/blob/master/docs/spec/spec.md)** | SMTP, POP3, IMAP protocols |
| **[`ballerina/ftp`](https://github.com/ballerina-platform/module-ballerina-ftp/blob/master/docs/spec/spec.md)** | FTP/SFTP client and listener |

### Data library specifications

| Module | Key Topics |
|--------|------------|
| **[`ballerina/io`](https://github.com/ballerina-platform/module-ballerina-io/blob/master/docs/spec/spec.md)** | File I/O, stream I/O, console I/O |
| **[`ballerina/sql`](https://github.com/ballerina-platform/module-ballerina-sql/blob/master/docs/spec/spec.md)** | Generic SQL client, parameterized queries, transactions |
| **[`ballerina/persist`](https://github.com/ballerina-platform/module-ballerina-persist/blob/master/docs/spec/spec.md)** | Data persistence layer, entity modeling |
| **[`ballerina/constraint`](https://github.com/ballerina-platform/module-ballerina-constraint/blob/master/docs/spec/spec.md)** | Data validation constraints |

## Platform specification

The Ballerina Platform Specification defines the build system, package management, and runtime environment.

| Attribute | Detail |
|-----------|--------|
| Build tool | `bal` CLI |
| Package format | BALA (Ballerina Archive) |
| Package registry | [Ballerina Central](https://central.ballerina.io) |
| Runtime | JVM-based (Java 17+) |
| Native compilation | GraalVM native image (experimental) |

### Platform components

| Component | Specification Area | Description |
|-----------|-------------------|-------------|
| Package System | Module structure, `Ballerina.toml`, `Dependencies.toml` | Package layout, dependencies, versioning |
| Build System | `bal build`, `bal run`, `bal test` | Compilation, execution, testing pipeline |
| Central Repository | Package publishing and resolution | Versioned package distribution |
| Type Narrowing | Flow typing and type guards | Compile-time type inference |
| Concurrency Model | Strand-based execution | Cooperative concurrency on JVM threads |
| Transaction Manager | Two-phase commit protocol | Distributed transaction coordination |

## Specification versioning

Ballerina specifications follow a versioning scheme tied to Swan Lake releases.

| Scheme | Format | Example | Description |
|--------|--------|---------|-------------|
| Language spec | `YYYYRN` | `2024R1` | Year and release number within that year |
| Distribution | `YYYY.N.N` | `2201.9.2` | Year, minor version, patch version |
| Module spec | Semantic versioning | `2.11.2` | Major.minor.patch per module |

## Where to find specifications

| Resource | URL |
|----------|-----|
| Language specification (latest) | [ballerina.io/spec/lang/master/](https://ballerina.io/spec/lang/master/) |
| Language specification (versioned) | [ballerina.io/spec/lang/](https://ballerina.io/spec/lang/) |
| Module specifications | Each module's GitHub repository under `docs/spec/` |
| Platform specification | [ballerina.io/spec/](https://ballerina.io/spec/) |
| Swan Lake release notes | [ballerina.io/downloads/swan-lake-release-notes/](https://ballerina.io/downloads/swan-lake-release-notes/) |

## See also

- [Ballerina by Example](ballerina-by-example.md) — Runnable code examples
- [Ballerina API Documentation](api/ballerina-documentation.md) — Module API docs
- [Release Notes](release-notes.md) — Version history and migration notes
