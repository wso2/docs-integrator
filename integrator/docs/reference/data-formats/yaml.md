---
title: YAML
---

# YAML

The `ballerina/yaml` module (v0.8.0) provides YAML parsing and serialization with support for multiple YAML schemas, custom types, anchor/alias handling, and multi-document streams.

## Module

`ballerina/yaml`

## Usage

### Read YAML from a string

```ballerina
import ballerina/yaml;

string yamlContent = string `
  name: MyService
  version: 1.0.0
  endpoints:
    - path: /api
      port: 8080
    - path: /health
      port: 8081`;

json config = check yaml:readString(yamlContent);
```

### Read YAML from a file

```ballerina
import ballerina/yaml;

json config = check yaml:readFile("resources/config.yaml");
```

### Write YAML to a string

```ballerina
import ballerina/yaml;

json data = {
    database: {
        host: "localhost",
        port: 5432,
        name: "mydb"
    }
};

string[] yamlLines = check yaml:writeString(data);
```

### Write YAML to a file

```ballerina
import ballerina/yaml;

json config = {
    server: {host: "0.0.0.0", port: 8080},
    logging: {level: "INFO"}
};

check yaml:writeFile("output.yaml", config);
```

### Multi-document YAML streams

```ballerina
import ballerina/yaml;

// Read a YAML stream with multiple documents
string multiDoc = string `
---
name: doc1
---
name: doc2`;

json docs = check yaml:readString(multiDoc, isStream = true);

// Write multiple documents
json[] documents = [{name: "doc1"}, {name: "doc2"}];
check yaml:writeFile("multi.yaml", documents, isStream = true);
```

### Custom write configuration

```ballerina
import ballerina/yaml;

json data = {name: "service", version: "2.0"};

string[] yamlLines = check yaml:writeString(data,
    indentationPolicy = 4,
    useSingleQuotes = true,
    forceQuotes = true
);
```

## Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `readString` | `readString(string yamlString, *ReadConfig config) returns json\|Error` | Parse a YAML string into JSON. |
| `readFile` | `readFile(string filePath, *ReadConfig config) returns json\|Error` | Parse a YAML file into JSON. |
| `writeString` | `writeString(json yamlStructure, *WriteConfig config) returns string[]\|Error` | Serialize JSON to YAML string lines. |
| `writeFile` | `writeFile(string filePath, json yamlStructure, *WriteConfig config) returns Error?` | Write JSON as YAML to a file. |

## ReadConfig

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `schema` | `YAMLSchema` | `CORE_SCHEMA` | YAML schema used for parsing. |
| `isStream` | `boolean` | `false` | Whether to read a stream of YAML documents. |
| `allowAnchorRedefinition` | `boolean` | `true` | Whether anchors can be redefined. |
| `allowMapEntryRedefinition` | `boolean` | `false` | Whether duplicate map keys are allowed. |

## WriteConfig

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `indentationPolicy` | `int` | `2` | Number of spaces per indentation level. |
| `blockLevel` | `int` | `1` | Maximum depth for block collection style. |
| `canonical` | `boolean` | `false` | Whether to write tags alongside nodes. |
| `useSingleQuotes` | `boolean` | `false` | Whether to use single quotes for scalars. |
| `forceQuotes` | `boolean` | `false` | Whether to quote all scalars. |
| `schema` | `YAMLSchema` | `CORE_SCHEMA` | YAML schema used for writing. |
| `isStream` | `boolean` | `false` | Whether to write a stream of YAML documents. |

## YAML schemas

| Schema | Description |
|--------|-------------|
| `FAILSAFE_SCHEMA` | Generic schema that works for any YAML document. |
| `JSON_SCHEMA` | Supports all basic JSON types. |
| `CORE_SCHEMA` | Extension of JSON schema with more human-readable presentation. |
