---
title: bal Command Reference
---

# bal Command Reference

The `bal` command is the primary CLI tool for building, running, testing, and managing Ballerina projects in WSO2 Integrator.

```bash
bal <command> [args]
bal help <command>
```

## Core commands

### `bal new`

Creates a new Ballerina package in a new directory.

```bash
bal new <package-name> [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--template <template>` | Use a predefined template (`lib`, `service`, `main`) |
| `--path <path>` | Create the package at the specified path |

### `bal init`

Initializes a Ballerina package in the current directory.

```bash
bal init [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--template <template>` | Use a predefined template (`lib`, `service`, `main`) |

### `bal add`

Adds a new module to the current package.

```bash
bal add <module-name>
```

### `bal build`

Compiles a Ballerina package or standalone `.bal` file into an executable.

```bash
bal build [OPTIONS] [<package>|<.bal file>]
```

| Flag | Description |
|------|-------------|
| `-o <output>`, `--output <output>` | Write the output to the given file name |
| `--offline` | Build offline without downloading dependencies |
| `--skip-tests` | Skip test execution during build |
| `--test-report` | Generate an HTML test report |
| `--code-coverage` | Enable code coverage measurement |
| `--observability-included` | Include the observability package |
| `--cloud <provider>` | Enable cloud artifact generation (`k8s`, `docker`, `choreo`) |
| `--graalvm` | Build a GraalVM native executable |
| `--graalvm-build-options <options>` | Additional GraalVM native-image arguments |
| `--export-openapi` | Export the OpenAPI specification |
| `--export-component-model` | Export the component model |
| `--target-dir <dir>` | Set the target directory for output |
| `--sticky` | Stick to dependency versions in Dependencies.toml |

### `bal run`

Builds and executes a Ballerina package or standalone `.bal` file.

```bash
bal run [OPTIONS] [<package>|<.bal file>] [-- <args>]
```

| Flag | Description |
|------|-------------|
| `--offline` | Run offline without downloading dependencies |
| `--observability-included` | Include observability |
| `--debug <port>` | Enable remote debugging on the specified port |
| `--sticky` | Stick to dependency versions in Dependencies.toml |
| `-- <args>` | Arguments passed to the program's `main` function |

### `bal test`

Executes tests defined in the `tests/` directory of a Ballerina package.

```bash
bal test [OPTIONS] [<package>|<.bal file>]
```

| Flag | Description |
|------|-------------|
| `--offline` | Test offline without downloading dependencies |
| `--test-report` | Generate an HTML test report |
| `--code-coverage` | Enable code coverage and generate a report |
| `--coverage-format <format>` | Code coverage report format (`xml`, `json`) |
| `--debug <port>` | Enable remote debugging on the specified port |
| `--tests <test-list>` | Run only specified test functions (comma-separated) |
| `--rerun-failed` | Re-run only previously failed tests |
| `--groups <groups>` | Run tests belonging to specified groups (comma-separated) |
| `--disable-groups <groups>` | Exclude tests in specified groups |
| `--list-groups` | List all test groups |
| `--parallel` | Execute tests in parallel |

### `bal clean`

Removes the `target/` directory and all build artifacts from a package.

```bash
bal clean
```

### `bal doc`

Generates API documentation for all public symbols in a Ballerina package.

```bash
bal doc [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `-o <output>`, `--output <output>` | Set the output directory for generated docs |
| `-e`, `--exclude` | Exclude specified modules from documentation |

### `bal pack`

Creates a `.bala` archive (Ballerina Archive) for distribution.

```bash
bal pack [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--offline` | Pack offline without downloading dependencies |
| `--sticky` | Stick to dependency versions in Dependencies.toml |
| `-o <output>`, `--output <output>` | Set the output directory |

### `bal bindgen`

Generates Ballerina bindings for Java classes, enabling Java interoperability.

```bash
bal bindgen [OPTIONS] <class-names...>
```

| Flag | Description |
|------|-------------|
| `-cp <classpath>` | Java classpath for dependency resolution |
| `-o <output>`, `--output <output>` | Output directory for generated bindings |
| `--public` | Make generated functions public |
| `-m <module>`, `--modules <module>` | Target module for the bindings |

## Package management commands

### `bal push`

Publishes a `.bala` package to Ballerina Central or a custom repository.

```bash
bal push [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--repository <repo>` | Push to a custom repository (e.g., `local`) |

### `bal pull`

Downloads a package from Ballerina Central or a custom repository.

```bash
bal pull <org-name>/<package-name>[:<version>]
```

| Flag | Description |
|------|-------------|
| `--repository <repo>` | Pull from a custom repository |

### `bal search`

Searches for packages in Ballerina Central.

```bash
bal search <keyword>
```

### `bal deprecate`

Marks a published package version as deprecated on Ballerina Central.

```bash
bal deprecate <org-name>/<package-name>:<version> [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--message <msg>` | Deprecation message |
| `--undo` | Remove the deprecation notice |

### `bal graph`

Prints the dependency graph of the current package to the console.

```bash
bal graph [OPTIONS]
```

| Flag | Description |
|------|-------------|
| `--dump-raw-graphs` | Print raw dependency graphs before resolution |

### `bal semver`

Validates semantic versioning compatibility of local changes against published versions.

```bash
bal semver
```

## Formatting and quality

### `bal format`

Reformats Ballerina source files according to the standard coding conventions.

```bash
bal format [OPTIONS] [<module-name>]
```

| Flag | Description |
|------|-------------|
| `--dry-run` | Show formatting changes without applying them |

## Interactive and diagnostic commands

### `bal shell`

Launches an interactive REPL (Read-Eval-Print Loop) for evaluating Ballerina expressions and statements.

```bash
bal shell
```

### `bal profile`

Profiles a Ballerina program and generates flame graphs for performance analysis.

```bash
bal profile [OPTIONS] [<package>|<.bal file>]
```

## Tool management

### `bal tool`

Manages CLI tool extensions installed from Ballerina Central.

```bash
bal tool <subcommand>
```

| Subcommand | Description |
|------------|-------------|
| `pull <tool-id>[:<version>]` | Install a tool from Ballerina Central |
| `remove <tool-id>[:<version>]` | Uninstall a tool |
| `update <tool-id>` | Update a tool to the latest patch version |
| `use <tool-id>:<version>` | Switch to a specific installed version |
| `list` | List all locally installed tools |
| `search <keyword>` | Search for tools in Ballerina Central |

## Distribution management

### `bal dist`

Manages Ballerina distribution versions installed on the system.

```bash
bal dist <subcommand>
```

| Subcommand | Description |
|------------|-------------|
| `list` | List available distributions |
| `pull <version>` | Download a specific distribution |
| `update` | Update to the latest distribution |
| `use <version>` | Switch to an installed distribution |
| `remove <version>` | Remove an installed distribution |

### `bal update`

Updates the Ballerina update tool itself to the latest version.

```bash
bal update
```

## Informational commands

### `bal version`

Displays the current Ballerina distribution version, language specification version, and update tool version.

```bash
bal version
```

### `bal help`

Displays usage details for any command.

```bash
bal help [<command>]
```

## Global flags

The following flags are available across most commands:

| Flag | Description |
|------|-------------|
| `--help`, `-h` | Display help for the command |
| `--debug <port>` | Start in remote debug mode |
| `--offline` | Proceed without accessing the network |
| `--sticky` | Stick to the dependency versions in Dependencies.toml |

## Integration tooling

The following tools extend `bal` with integration-specific code generation. Each has a dedicated guide with full flag reference, examples, and visual designer instructions.

| Tool | Command | Description |
|---|---|---|
| [OpenAPI Tool](../../develop/tools/integration-tools/openapi-tool.md) | `bal openapi` | Generate services and clients from OpenAPI specifications |
| [GraphQL Tool](../../develop/tools/integration-tools/graphql-tool.md) | `bal graphql` | Generate services and clients from GraphQL SDL schemas |
| [gRPC Tool](../../develop/tools/integration-tools/grpc-tool.md) | `bal grpc` | Generate service stubs and clients from Protocol Buffer definitions |
| [AsyncAPI Tool](../../develop/tools/integration-tools/asyncapi-tool.md) | `bal asyncapi` | Generate event-driven services from AsyncAPI specifications |
| [EDI Tool](../../develop/tools/integration-tools/edi-tool.md) | `bal edi` | Generate types and parsers from EDI schema definitions |
| [Health Tool](../../develop/tools/integration-tools/health-tool.md) | `bal health` | Generate FHIR and HL7 healthcare integration code |
| [Persist Tool](../../develop/tools/integration-tools/persist-tool.md) | `bal persist` | Generate type-safe data persistence clients |
| [WSDL Tool](../../develop/tools/integration-tools/wsdl-tool.md) | `bal wsdl` | Generate clients from WSDL service definitions |
| [XSD Tool](../../develop/tools/integration-tools/xsd-tool.md) | `bal xsd` | Generate Ballerina types from XML schema definitions |
