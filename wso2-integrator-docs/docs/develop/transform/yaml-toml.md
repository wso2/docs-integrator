---
sidebar_position: 9
title: YAML & TOML Processing
description: Parse, construct, and transform YAML and TOML data in Ballerina integrations.
---

# YAML & TOML Processing

Work with YAML and TOML configuration formats commonly used in cloud-native deployments, CI/CD pipelines, and application configuration management. Ballerina provides native support for reading, writing, and transforming both formats through dedicated library modules.

## YAML Processing

YAML is widely used for Kubernetes manifests, CI/CD configurations, and application settings. Ballerina's `ballerina/yaml` module handles parsing and serialization.

### Parsing YAML

Read YAML content and convert it into Ballerina values with type safety.

```ballerina
import ballerina/yaml;
import ballerina/io;

type ServerConfig record {|
    string host;
    int port;
    string[] allowedOrigins;
    DatabaseConfig database;
|};

type DatabaseConfig record {|
    string url;
    string username;
    int poolSize;
|};

public function main() returns error? {
    // Parse a YAML file into a typed record
    ServerConfig config = check yaml:readFile("config.yaml").fromJsonWithType();

    io:println("Server: ", config.host, ":", config.port);
    io:println("DB Pool Size: ", config.database.poolSize);
}
```

### Parsing YAML Strings

Parse YAML content directly from a string value.

```ballerina
import ballerina/yaml;

public function main() returns error? {
    string yamlContent = string `
        name: order-service
        version: 1.2.0
        replicas: 3
        env:
          - name: DB_HOST
            value: postgres.svc.local
          - name: LOG_LEVEL
            value: INFO
    `;

    json yamlValue = check yaml:readString(yamlContent);
    // Access nested values
    json envVars = check yamlValue.env;
}
```

### Writing YAML

Serialize Ballerina values back to YAML format.

```ballerina
import ballerina/yaml;
import ballerina/io;

public function main() returns error? {
    map<json> deployment = {
        "apiVersion": "apps/v1",
        "kind": "Deployment",
        "metadata": {
            "name": "integration-service",
            "labels": {
                "app": "integrator"
            }
        },
        "spec": {
            "replicas": 3
        }
    };

    // Write to a YAML file
    check yaml:writeFile("deployment.yaml", deployment);

    // Convert to YAML string
    string yamlString = check yaml:writeString(deployment);
    io:println(yamlString);
}
```

### Multi-Document YAML

Handle YAML files with multiple documents separated by `---`.

```ballerina
import ballerina/yaml;
import ballerina/io;

public function main() returns error? {
    // Read all documents from a multi-document YAML file
    json[] documents = check yaml:readFile("k8s-manifests.yaml",
        multiDocument = true).fromJsonWithType();

    foreach json doc in documents {
        string kind = check doc.kind;
        io:println("Processing: ", kind);
    }
}
```

## TOML Processing

TOML is the standard configuration format for Ballerina projects (`Ballerina.toml`, `Dependencies.toml`) and many modern tools. The `ballerina/toml` module provides parsing and writing support.

### Parsing TOML

Read TOML files into Ballerina maps and records.

```ballerina
import ballerina/toml;
import ballerina/io;

type ProjectConfig record {|
    string name;
    string version;
    map<string> dependencies;
    BuildConfig build;
|};

type BuildConfig record {|
    boolean observability;
    string target;
|};

public function main() returns error? {
    // Parse a TOML file
    map<json> tomlData = check toml:readFile("project.toml");

    io:println("Project: ", tomlData["name"]);

    // Type-safe parsing
    ProjectConfig config = check tomlData.fromJsonWithType();
    io:println("Version: ", config.version);
}
```

### Writing TOML

Generate TOML content from Ballerina data structures.

```ballerina
import ballerina/toml;

public function main() returns error? {
    map<json> config = {
        "name": "data-pipeline",
        "version": "2.0.0",
        "dependencies": {
            "ballerinax/kafka": "4.2.0",
            "ballerinax/postgresql": "1.14.0"
        },
        "build": {
            "observability": true,
            "target": "cloud"
        }
    };

    check toml:writeFile("pipeline.toml", config);
}
```

## YAML-to-JSON and TOML-to-JSON Conversion

Convert between configuration formats for systems that expect different inputs.

```ballerina
import ballerina/yaml;
import ballerina/io;

// Convert YAML configuration to JSON for API consumption
public function yamlToJson(string yamlFilePath) returns json|error {
    json yamlData = check yaml:readFile(yamlFilePath);
    // YAML is already parsed as json — return directly
    // or transform as needed
    return yamlData;
}

// Convert JSON API response to YAML for config files
public function jsonToYaml(json data, string outputPath) returns error? {
    check yaml:writeFile(outputPath, data);
}
```

## Integration Example: Dynamic Configuration Loader

Build a configuration loader that reads from YAML or TOML based on file extension.

```ballerina
import ballerina/yaml;
import ballerina/toml;
import ballerina/file;
import ballerina/io;

type AppConfig record {|
    string appName;
    int port;
    string logLevel;
    map<string> features;
|};

public function loadConfig(string filePath) returns AppConfig|error {
    string ext = check file:extension(filePath);

    json rawConfig;
    if ext == "yaml" || ext == "yml" {
        rawConfig = check yaml:readFile(filePath);
    } else if ext == "toml" {
        map<json> tomlData = check toml:readFile(filePath);
        rawConfig = tomlData;
    } else {
        return error("Unsupported config format: " + ext);
    }

    return rawConfig.fromJsonWithType();
}

public function main() returns error? {
    AppConfig config = check loadConfig("app-config.yaml");
    io:println("Starting ", config.appName, " on port ", config.port);
}
```

## Best Practices

- **Use typed records** for parsing -- define Ballerina record types that match your YAML/TOML structure for compile-time safety
- **Validate early** -- parse configuration at startup and fail fast on missing or invalid values
- **Handle multi-document YAML carefully** -- Kubernetes manifests often contain multiple documents in a single file
- **Prefer TOML for Ballerina configs** -- TOML aligns with Ballerina's native configuration format (`Ballerina.toml`)

## What's Next

- [JSON Processing](json.md) -- Work with JSON data
- [CSV & Flat File Processing](csv-flat-file.md) -- Handle tabular data formats
- [Configuration Management](/docs/develop/build/configuration-management) -- Manage environment-specific settings
