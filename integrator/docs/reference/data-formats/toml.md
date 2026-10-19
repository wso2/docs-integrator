---
title: TOML
---

# TOML

The `ballerina/toml` module (v0.8.0) provides TOML parsing and serialization, commonly used for configuration files. Supports reading and writing TOML with dotted keys and offset date-time conversion.

## Module

`ballerina/toml`

## Usage

### Read TOML from a string

```ballerina
import ballerina/toml;

string tomlContent = string `
  [database]
  host = "localhost"
  port = 5432
  name = "mydb"

  [server]
  host = "0.0.0.0"
  port = 8080`;

map<json> config = check toml:readString(tomlContent);
// config: {"database": {"host": "localhost", "port": 5432, "name": "mydb"}, "server": ...}
```

### Read TOML from a file

```ballerina
import ballerina/toml;

map<json> config = check toml:readFile("resources/config.toml");
```

### Write TOML to a string

```ballerina
import ballerina/toml;

map<json> config = {
    database: {host: "localhost", port: 5432},
    logging: {level: "INFO", "file": "/var/log/app.log"}
};

string[] tomlLines = check toml:writeString(config);
```

### Write TOML to a file

```ballerina
import ballerina/toml;

map<json> config = {
    server: {host: "0.0.0.0", port: 8080},
    features: {"enable-cache": true, "max-connections": 100}
};

check toml:writeFile("output.toml", config);
```

### Dotted keys

```ballerina
import ballerina/toml;

map<json> config = {
    database: {host: "localhost", port: 5432}
};

// With dotted keys enabled (default)
string[] lines = check toml:writeString(config, allowDottedKeys = true);
// Output: database.host = "localhost"\ndatabase.port = 5432

// Without dotted keys
string[] lines2 = check toml:writeString(config, allowDottedKeys = false);
// Output: [database]\nhost = "localhost"\nport = 5432
```

## Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `readString` | `readString(string tomlString, *ReadConfig config) returns map<json>\|Error` | Parse a TOML string into a map. |
| `readFile` | `readFile(string filePath, *ReadConfig config) returns map<json>\|Error` | Parse a TOML file into a map. |
| `writeString` | `writeString(map<json> tomlStructure, *WriteConfig config) returns string[]\|Error` | Serialize a map to TOML string lines. |
| `writeFile` | `writeFile(string filePath, map<json> tomlStructure, *WriteConfig config) returns Error?` | Write a map as TOML to a file. |

## ReadConfig

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `parseOffsetDateTime` | `boolean` | `true` | Whether to convert offset date-time values to `time:Utc`. |

## WriteConfig

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `indentationPolicy` | `int` | `2` | Number of spaces per indentation level. |
| `allowDottedKeys` | `boolean` | `true` | Whether to use dotted keys instead of standard tables. |
