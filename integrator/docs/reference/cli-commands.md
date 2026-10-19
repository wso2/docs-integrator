---
title: CLI Commands
---

# CLI Commands

The `bal` command line tool builds, runs, tests, and generates code for integration projects. This page lists the commands used across the WSO2 Integrator documentation, with the flags shown in the guides. Run a command with `--help` for its full option list.

## Build and run

| Command | Description |
|---|---|
| `bal build` | Compile the project into an executable. |
| `bal build --graalvm` | Build a GraalVM native executable. See [GraalVM native images](../deploy-and-run/self-hosted/graalvm-native-images.md). |
| `bal build --cloud=<target>` | Generate deployment artifacts. Targets used in the docs: `docker`, `k8s`, `openshift`, `aws_lambda`, `azure_functions`. See [Cloud.toml reference](configuration-reference.md#cloudtoml-reference) and [Containerized deployment](../deploy-and-run/self-hosted/containerized-deployment.md). |
| `bal run` | Build and run the project. Pass configurable values after `--`, for example `bal run -- -Cport=9090`. |
| `bal run --debug <port> <path>` | Run with a remote debugger attached to the given port. See [Debug Your Integration](../develop-and-test/debugging/debugging.md). |
| `bal new <name> -t lib` | Create a new project from a template, here a library. |
| `bal profile` | Profile the running integration. See [Profiling](../develop-and-test/troubleshooting/profiling.md). |

## Test

See [Test](../develop-and-test/test/test.md) for the guides.

| Command | Description |
|---|---|
| `bal test` | Run the project's tests. |
| `bal test --tests <name>` | Run specific tests, for example `--tests testDiscountCalculation#"half-price"` for one data set. |
| `bal test --groups <g1>,<g2>` / `--disable-groups <g>` / `--list-groups` | Select, exclude, or list test groups. |
| `bal test --parallel` | Run tests in parallel. |
| `bal test --rerun-failed` | Re-run only the tests that failed. |
| `bal test --code-coverage --min-coverage=<n>` | Collect coverage and fail below a minimum percentage. |
| `bal test --test-report` | Generate a test report. |
| `bal test --graalvm` | Run tests on a native image. |
| `bal test --debug <port> <path>` | Run tests with a remote debugger attached. |
| `bal test -C<name>=<value>` | Override a configurable variable, for example `-CdbPort=5432`. |

## Static analysis

`bal scan` analyzes your code. See the [Scan tool](../develop-and-test/developer-tools/utility-tools/scan-tool.md).

| Command | Description |
|---|---|
| `bal scan [<integration>\|<source-file>]` | Analyze a project or a source file. |
| `bal scan --list-rules` | List the available rules. |
| `bal scan --include-rules=<rules>` / `--exclude-rules=<rules>` | Run only, or skip, the listed rules. |
| `bal scan --format=sarif` | Write results in SARIF format. |
| `bal scan --platforms=<list>` | Report to external platforms such as `sonarqube`, `semgrep`, or `codeql`. |
| `bal scan --scan-report` | Generate a scan report. |
| `bal scan --target-dir=<path>` | Choose the output directory. |

## Code generation tools

Install a tool with `bal tool pull <name>` and list installed tools with `bal tool list`. See [Developer tools](../develop-and-test/developer-tools/developer-tools.md).

| Command | Description | Guide |
|---|---|---|
| `bal openapi -i <spec> --mode service` | Generate an HTTP service or client from an OpenAPI specification. | [OpenAPI tool](../develop-and-test/developer-tools/integration-tools/openapi-tool.md) |
| `bal graphql -i <schema> --mode service` | Generate a GraphQL service or client from a schema. | [GraphQL tool](../develop-and-test/developer-tools/integration-tools/graphql-tool.md) |
| `bal grpc --input <file.proto> --mode service --output .` | Generate gRPC code from a Protocol Buffers definition. | [gRPC tool](../develop-and-test/developer-tools/integration-tools/grpc-tool.md) |
| `bal asyncapi -i <spec> --mode service` | Generate event-driven services from an AsyncAPI specification. | [AsyncAPI tool](../develop-and-test/developer-tools/integration-tools/asyncapi-tool.md) |
| `bal wsdl -i <file.wsdl>` | Generate client code from a WSDL. | [WSDL tool](../develop-and-test/developer-tools/integration-tools/wsdl-tool.md) |
| `bal xsd -i <file.xsd>` | Generate record types from an XSD. | [XSD tool](../develop-and-test/developer-tools/integration-tools/xsd-tool.md) |
| `bal edi codegen`, `libgen`, `convertX12Schema`, `convertEdifactSchema`, `convertESL` | Generate code from EDI schemas and convert X12, EDIFACT, and ESL schemas. | [EDI tool](../develop-and-test/developer-tools/integration-tools/edi-tool.md) |
| `bal health fhir` / `bal health hl7` | Generate types from FHIR implementation guides or HL7v2 definitions. | [Health tool](../develop-and-test/developer-tools/integration-tools/health-tool.md) |
| `bal connector openapi -i <spec>` | Generate a connector from an OpenAPI specification. | [Connector tool](../develop-and-test/developer-tools/integration-tools/connector-tool.md) |
| `bal persist init` / `add` / `generate` / `pull` / `push` / `migrate` | Model data and generate persistence code. Use `--datastore <name>`, for example `mysql`. | [Persist tool](../develop-and-test/developer-tools/utility-tools/persist-tool.md) |

## Migration

| Command | Description |
|---|---|
| `bal migrate-mule <source> [-o <dir>] [-f <3\|4>] [-k] [-v] [-d] [-m]` | Migrate a MuleSoft project. |
| `bal migrate-tibco <source> [-o <dir>] [-k] [-v] [-d] [-m] [-g <org>] [-p <project>]` | Migrate a TIBCO BusinessWorks project. |
| `bal migrate-logicapps <source> [-o <dir>] [-v] [-m]` | Migrate Azure Logic Apps workflows. |

Common flags: `-o` output directory, `-v` verbose, `-m` treat each child directory (or JSON file) as a separate project, `-d` dry run (report only), `-k` keep the source project structure. See [Migrate](../migrate/index.md) for what each supports.
