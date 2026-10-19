---
title: Connector Tool
---

# Connector Tool

:::note Pre-Release

The `bal connector` tool automates the full lifecycle of building a Ballerina connector from an OpenAPI specification. It runs a five-stage pipeline (sanitizing the spec, generating and validating a typed client, creating tests and usage examples, and producing documentation) using an LLM to handle AI-assisted steps such as fixing compilation errors, generating realistic examples, and filling in missing operation identifiers.

## Prerequisites

Export your Anthropic API key as an environment variable:

```bash
export ANTHROPIC_API_KEY=<your-api-key>
```

## Generating a connector from an OpenAPI specification

### Basic usage

```bash
bal connector openapi -i ./openapi.yaml
```

This runs all five pipeline stages and writes the connector artifacts to the current directory.

### Pipeline stages

The tool runs the following stages in sequence:

1. **Sanitize**: Flattens nested `$ref` chains, aligns naming with Ballerina conventions, AI-generates missing `operationId` values, and records every transformation in `docs/spec/sanitations.md`.
2. **Client**: Generates a typed Ballerina client from the sanitized spec. If the generated code has compilation errors, the tool attempts to fix them automatically using AI before re-validating.
3. **Tests**: Generates a mock-server test suite and a live-server test suite for the client.
4. **Examples**: AI-creates realistic, runnable usage examples for the connector.
5. **Docs**: Auto-generates a `README.md` for the connector package.

### Skipping stages

Use `-x` (repeatable) to skip one or more stages:

```bash
# Fast iteration: generate only the sanitized spec and client
bal connector openapi -i ./openapi.yaml -x tests -x examples -x docs
```

### Interactive mode

Pause after each stage to review the output before continuing:

```bash
bal connector openapi -i ./openapi.yaml --interactive
```

## Updating a connector when the API changes

When the upstream API publishes a new spec version, pass the new file and point `--spec-dir` at the directory containing the existing `sanitations.md`. The tool reapplies all recorded sanitations before running the pipeline, preserving naming and alignment fixes accumulated over prior runs.

```bash
bal connector openapi -i ./openapi-v2.yaml -o ./my-connector --spec-dir ./my-connector/docs/spec
```

## Workflow examples

**Full connector package from scratch**

Run with defaults to get a complete package including client, tests, examples, and README:

```bash
bal connector openapi -i stripe-openapi.yaml -o ./stripe-connector
```

**Filtered connector for a subset of the API**

Use `--tags` or `--operations` to generate a connector for a specific slice of a large API:

```bash
# Generate only endpoints tagged "payments"
bal connector openapi -i stripe-openapi.yaml -o ./stripe-payments --tags payments

# Generate specific operations
bal connector openapi -i stripe-openapi.yaml -o ./stripe-minimal \
    --operations createPaymentIntent,retrievePaymentIntent
```

**Remote-method client**

By default the generated client uses Ballerina resource methods. Use `--remote` to generate remote methods instead:

```bash
bal connector openapi -i ./openapi.yaml --remote
```

## Command reference

```bash
bal connector openapi -i <openapi-spec> [options]
```

| Flag | Alias | Required | Default | Description |
|------|-------|----------|---------|-------------|
| `--input` | `-i` | Yes | | Path to the OpenAPI specification file (YAML or JSON) |
| `--output` | `-o` | No | Current directory | Output directory for the generated connector |
| `--quiet` | `-q` | No | | Suppress all output except errors |
| `--verbose` | `-v` | No | | Show detailed diagnostic output for each stage |
| `--spec-dir` | | No | `./docs/spec` | Directory for the aligned spec and `sanitations.md` |
| `--example-dir` | | No | `./examples` | Output directory for generated examples |
| `--exclude` | `-x` | No | | Exclude a pipeline stage: `sanitize`, `client`, `tests`, `examples`, `docs` (repeatable) |
| `--license` | | No | | Path to a license header file to prepend to generated source files |
| `--tags` | `-t` | No | All tags | Filter generation to specific OpenAPI tags (repeatable) |
| `--operations` | | No | All operations | Generate only the specified operation IDs (repeatable) |
| `--remote` | | No | | Generate remote methods instead of resource methods |
| `--interactive` | | No | | Pause after each stage and prompt before continuing |

## What's next

- [OpenAPI Tool](openapi-tool.md): Generate Ballerina services and clients directly from OpenAPI specs without the full connector pipeline
- [gRPC Tool](grpc-tool.md): Generate gRPC services and clients from Protocol Buffer definitions
