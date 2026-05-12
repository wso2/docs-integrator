---
title: YAML & TOML Processing
---

# YAML & TOML Processing

Work with YAML and TOML configuration formats commonly used in cloud-native deployments, CI/CD pipelines, and application configuration management. Ballerina provides native support for reading, writing, and transforming both formats through dedicated library modules.

## YAML processing

YAML is widely used for Kubernetes manifests, CI/CD configurations, and application settings. Ballerina's `ballerina/data.yaml` module handles parsing and serialization. File I/O is composed with `ballerina/io` (`fileReadBytes` / `fileWriteString`) because `data.yaml` operates on strings, byte arrays, and streams rather than on file paths directly.

### Parsing YAML

Read YAML content and convert it into Ballerina values with type safety.

1. **Define the record types**: Navigate to **Types** in the sidebar and click **+** to add a new type. Select **Create from scratch**, set **Kind** to **Record**, and name it `DatabaseConfig`. Add fields using the **+** button:

   | Field | Type |
   |---|---|
   | `url` | `string` |
   | `username` | `string` |
   | `poolSize` | `int` |

   Then add a second record type named `ServerConfig` with fields:

   | Field | Type |
   |---|---|
   | `host` | `string` |
   | `port` | `int` |
   | `allowedOrigins` | `string[]` |
   | `database` | `DatabaseConfig` |

   For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

2. **Add a Function Call step to read the file as bytes**: In the flow designer, click **+** and select **Function Call**. Search for `io:fileReadBytes` in the library picker and select it (this adds the `ballerina/io` import). Pass `"config.yaml"` as the path argument and assign the return value to a variable named `fileContent`. The variable type is fixed at `byte[] & readonly` by the function's return signature.

3. **Add a Function Call step to parse into the typed record**: Click **+** and select **Function Call**. Search for `yaml:parseBytes` in the library picker and select it (this adds the `ballerina/data.yaml` import). Pass `fileContent` as the argument and assign the return value to a variable named `config` of type `ServerConfig`. The target type is inferred from the variable, so no separate type-conversion step is needed.

4. **Add a Function Call step to print the server info**: Click **+** and select **Function Call**. Search for `io:println`. The function accepts a list of values — add two arguments. Set the first argument to `"Server: " + config.host + ":"` (string concatenation works between strings) and the second argument to `config.port` (kept separate because `+` cannot mix a string with an `int`).

5. **Add a Function Call step to print the database pool size**: Click **+** and select **Function Call**. Search for `io:println` and add two arguments: `"DB Pool Size: "` and `config.database.poolSize`.

   ![Flow designer showing YAML file read, typed conversion, and console output steps](/img/develop/transform/yaml-toml/yaml-parsing-flow.png)

```ballerina
import ballerina/io;
import ballerina/data.yaml;

type DatabaseConfig record {|
    string url;
    string username;
    int poolSize;
|};

type ServerConfig record {|
    string host;
    int port;
    string[] allowedOrigins;
    DatabaseConfig database;
|};

public function main() returns error? {
    // Read the YAML file as bytes
    byte[] & readonly fileContent = check io:fileReadBytes("config.yaml");

    // Parse directly into the typed record (target type is inferred)
    ServerConfig config = check yaml:parseBytes(fileContent);

    io:println("Server: " + config.host + ":", config.port);
    io:println("DB Pool Size: ", config.database.poolSize);
}
```

### Parsing YAML strings

Parse YAML content directly from a string value.

1. **Add a Variable step for the YAML content**: In the flow designer, click **+** and select **Declare Variable**. Set the name to `yamlContent`, the type to `string`, and enter the following YAML as a multi-line string template in the expression field:

   ```yaml
   name: order-service
   version: 1.2.0
   replicas: 3
   env:
     - name: DB_HOST
       value: postgres.svc.local
     - name: LOG_LEVEL
       value: INFO
   ```

2. **Add a Function Call step for parsing**: Click **+** and select **Function Call**. Search for `yaml:parseString` in the library picker and select it (this adds the `ballerina/data.yaml` import). Pass `yamlContent` as the argument and assign the return value to a variable named `yamlValue` of type `json`.

3. **Add a Variable step for nested access**: Click **+** and select **Declare Variable**. Set the name to `envVars`, the type to `json`, and the expression to `check yamlValue.env`.

4. **Add a Function Call step to print the env vars**: Click **+** and select **Function Call**. Search for `io:println` and add two arguments: `"Env vars: "` and `envVars` (kept separate because `+` cannot mix a string with a `json` value).

   ![Flow designer showing YAML string parsing, nested value access, and console output steps](/img/develop/transform/yaml-toml/yaml-parsing-strings-flow.png)

```ballerina
import ballerina/io;
import ballerina/data.yaml;

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

    json yamlValue = check yaml:parseString(yamlContent);
    // Access nested values
    json envVars = check yamlValue.env;

    io:println("Env vars: ", envVars);
}
```

### Writing YAML

Serialize Ballerina values back to YAML format.

1. **Add a Variable step for the deployment object**: In the flow designer, click **+** and select **Declare Variable**. Set the name to `deployment`, the type to `map<json>`, and enter the following as the expression:

   ```json
   {
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
   }
   ```

2. **Add a Function Call step to serialize to a YAML string**: Click **+** and select **Function Call**. Search for `yaml:toYamlString` in the library picker and select it (this adds the `ballerina/data.yaml` import). Pass `deployment` as the argument and assign the return value to a variable named `yamlString` of type `string`.

3. **Add a Function Call step to write to a file**: Click **+** and select **Function Call**. Search for `io:fileWriteString` in the library picker and select it (this adds the `ballerina/io` import). Pass `"deployment.yaml"` as the path argument and `yamlString` as the content argument.

4. **Add a Function Call step to print the YAML**: Click **+** and select **Function Call**. Search for `io:println` and pass `yamlString` as the argument.

   ![Flow designer showing YAML serialization, file write, and console output steps](/img/develop/transform/yaml-toml/yaml-writing-flow.png)

```ballerina
import ballerina/io;
import ballerina/data.yaml;

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

    // Serialize the map to a YAML string
    string yamlString = check yaml:toYamlString(deployment);

    // Write the YAML string to a file
    check io:fileWriteString("deployment.yaml", yamlString);

    io:println(yamlString);
}
```

### Multi-Document YAML

Handle YAML files with multiple documents separated by `---`.

1. **Add a Function Call step to read the file as bytes**: In the flow designer, click **+** and select **Function Call**. Search for `io:fileReadBytes` in the library picker and select it (this adds the `ballerina/io` import). Pass an appropriate YAML file path (such as `"k8s-manifests.yaml"`) as the path argument and assign the return value to a variable named `fileContent`. The variable type is fixed at `byte[] & readonly` by the function's return signature.

2. **Add a Function Call step to parse the documents**: Click **+** and select **Function Call**. Search for `yaml:parseBytes` in the library picker and select it (this adds the `ballerina/data.yaml` import). In the **S** (Source byte[] value) field, switch the input to **expression** mode and pick `fileContent` from the variable picker. Set **Result\*** (the result variable name) to `documents` and **T\*** (the target type) to `json[]`. The function parses all `---`-separated documents into the array automatically.

3. **Add a Foreach step**: Click **+** and select **Foreach** under **Control**. Set the **Collection** to `documents`, the **Variable** name to `document`, and the **Variable** type to `json`.

4. **Add a Variable step inside the loop for the document map**: Click **+** inside the loop body and select **Declare Variable**. Set the name to `documentMap`, the type to `map<json>`, and the expression to `check document.ensureType()`.

5. **Add a Variable step inside the loop for the kind value**: Click **+** and select **Declare Variable**. Set the name to `kindJson`, the type to `json`, and the expression to `documentMap["kind"]`.

6. **Add a Variable step inside the loop to convert the kind to a string**: Click **+** and select **Declare Variable**. Set the name to `kind`, the type to `string`, and the expression to `kindJson.toString()`.

7. **Add a Function Call step inside the loop to print the kind**: Click **+** and select **Function Call**. Search for `io:println` and add two arguments: `"Processing: "` and `kind`.

   ![Flow designer showing multi-document YAML parsing with foreach iteration](/img/develop/transform/yaml-toml/yaml-multi-doc-flow.png)

```ballerina
import ballerina/io;
import ballerina/data.yaml;

public function main() returns error? {
    // Read the file as bytes and parse all --- separated documents into a json array
    byte[] & readonly fileContent = check io:fileReadBytes("k8s-manifests.yaml");
    json[] documents = check yaml:parseBytes(fileContent);

    foreach json document in documents {
        map<json> documentMap = check document.ensureType();
        json kindJson = documentMap["kind"];
        string kind = kindJson.toString();
        io:println("Processing: ", kind);
    }
}
```

## TOML processing

TOML is the standard configuration format for Ballerina projects (`Ballerina.toml`, `Dependencies.toml`) and many modern tools. The `ballerina/toml` module provides parsing and writing support.

### Parsing TOML

Read TOML files into Ballerina maps and records.

1. **Define the record types**: Navigate to **Types** in the sidebar and click **+** to add a new type. Select **Create from scratch**, set **Kind** to **Record**, and name it `BuildConfig`. Add fields using the **+** button:

   | Field | Type |
   |---|---|
   | `observability` | `boolean` |
   | `target` | `string` |

   Then add a second record type named `ProjectConfig` with fields:

   | Field | Type |
   |---|---|
   | `name` | `string` |
   | `version` | `string` |
   | `dependencies` | `map<string>` |
   | `build` | `BuildConfig` |

   For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

2. **Add a Function Call step to read the file**: In the flow designer, click **+** and select **Function Call**. Search for `toml:readFile` in the library picker and select it (this adds the `ballerina/toml` import). Pass `"project.toml"` as the path argument and assign the return value to a variable named `tomlData` of type `map<json>`.

3. **Add a Function Call step to print the project name**: Click **+** and select **Function Call**. Search for `io:println` and add two arguments: `"Project: "` and `tomlData["name"]`.

4. **Add a Variable step for typed conversion**: Click **+** and select **Declare Variable**. Set the name to `config`, the type to `ProjectConfig`, and the expression to `check tomlData.ensureType()`.

5. **Add a Function Call step to print the project version**: Click **+** and select **Function Call**. Search for `io:println` and add two arguments: `"Version: "` and `config.version`.

   ![Flow designer showing TOML file read, raw print, typed conversion, and version print steps](/img/develop/transform/yaml-toml/toml-parsing-flow.png)

```ballerina
import ballerina/io;
import ballerina/toml;

type BuildConfig record {|
    boolean observability;
    string target;
|};

type ProjectConfig record {|
    string name;
    string version;
    map<string> dependencies;
    BuildConfig build;
|};

public function main() returns error? {
    // Parse a TOML file
    map<json> tomlData = check toml:readFile("project.toml");

    io:println("Project: ", tomlData["name"]);

    // Type-safe parsing
    ProjectConfig config = check tomlData.ensureType();
    io:println("Version: ", config.version);
}
```

### Writing TOML

Generate TOML content from Ballerina data structures.

1. **Add a Variable step for the configuration object**: In the flow designer, click **+** and select **Declare Variable**. Set the name to `config`, the type to `map<json>`, and enter your content (for example, the following) as an expression:

   ```json
   {
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
   }
   ```

2. **Add a Function Call step to write the file**: Click **+** and select **Function Call**. Search for `toml:writeFile` in the library picker and select it (this adds the `ballerina/toml` import). Pass `"pipeline.toml"` as the path argument. For the **TOML structure** field, switch the input to **expression** mode and pick `config` from the variable picker.

   ![Flow designer showing the config map declaration and TOML write step](/img/develop/transform/yaml-toml/toml-writing-flow.png)

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

## YAML-to-JSON and TOML-to-JSON conversion

Convert between configuration formats for systems that expect different inputs.

Create both functions first via **+** on the **Functions** entry in the left sidebar: `yamlToJson(string yamlFilePath) returns json|error` and `jsonToYaml(json data, string outputPath) returns error?`. Then open each flow to add the steps below.

In the `yamlToJson` function flow:

1. **Add a Function Call step to read the file as bytes**: Click **+** and select **Function Call**. Search for `io:fileReadBytes` in the library picker and select it (this adds the `ballerina/io` import). Pass `yamlFilePath` as the path argument and assign the return value to a variable named `fileContent`. The variable type is fixed at `byte[] & readonly`.

2. **Add a Function Call step to parse**: Click **+** and select **Function Call**. Search for `yaml:parseBytes` in the library picker and select it (this adds the `ballerina/data.yaml` import). In the **S** (Source byte[] value) field, switch the input to **expression** mode and pick `fileContent`. Set **Result\*** to `yamlData` and **T\*** to `json`.

3. **Add a Return step**: Click **+** and select **Return**. Set the expression to `yamlData`.

In the `jsonToYaml` function flow:

4. **Add a Function Call step to serialize**: Click **+** and select **Function Call**. Search for `yaml:toYamlString` in the library picker and select it. Pass `data` as the argument and assign the return value to a variable named `yamlString` of type `string`.

5. **Add a Function Call step to write to the file**: Click **+** and select **Function Call**. Search for `io:fileWriteString` in the library picker and select it. Pass `outputPath` as the path argument and `yamlString` as the content argument.

   ![Flow designer showing YAML-to-JSON conversion function flows](/img/develop/transform/yaml-toml/yaml-json-conversion-flow.png)

```ballerina
import ballerina/io;
import ballerina/data.yaml;

// Convert YAML configuration to JSON for API consumption
public function yamlToJson(string yamlFilePath) returns json|error {
    byte[] & readonly fileContent = check io:fileReadBytes(yamlFilePath);
    json yamlData = check yaml:parseBytes(fileContent);
    return yamlData;
}

// Convert JSON API response to YAML for config files
public function jsonToYaml(json data, string outputPath) returns error? {
    string yamlString = check yaml:toYamlString(data);
    check io:fileWriteString(outputPath, yamlString);
}
```

## Integration example: Dynamic configuration loader

Build a configuration loader that reads from YAML or TOML based on file extension.

1. **Define the record type**: Navigate to **Types** in the sidebar and click **+** to add a new type. Select **Create from scratch**, set **Kind** to **Record**, and name it `AppConfig`. Add fields using the **+** button:

   | Field | Type |
   |---|---|
   | `appName` | `string` |
   | `port` | `int` |
   | `logLevel` | `string` |
   | `features` | `map<string>` |

   For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

2. **Create the `loadConfig` function**: Click **+** on the **Functions** entry in the left sidebar and create `loadConfig(string filePath) returns AppConfig|error`.

3. **Find the position of the file extension**: In the `loadConfig` flow, click **+** and select **Declare Variable**. Set the name to `dotIndex`, the type to `int?`, and the expression to `filePath.lastIndexOf(".")`.

4. **Add an If step for paths without an extension**: Click **+** and select **If** under **Control**. Set the condition to `dotIndex is ()`. Inside the branch, add a Return step with expression `error("Unsupported config format: " + filePath)`.

5. **Extract the extension**: Click **+** and select **Declare Variable**. Set the name to `ext`, the type to `string`, and the expression to `filePath.substring(dotIndex + 1)`.

6. **Add an If step for the YAML branch**: Click **+** and select **If** under **Control**. Set the condition to `ext == "yaml" || ext == "yml"`. Inside the branch:
   - Add a Function Call for `io:fileReadBytes`. Pass `filePath` and assign the return value to a variable named `fileContent`. The variable type is fixed at `byte[] & readonly`.
   - Add a Function Call for `yaml:parseBytes` (adds the `ballerina/data.yaml` import). In **S**, switch the input to **expression** mode and pick `fileContent`. Set **Result\*** to `appConfig` and **T\*** to `AppConfig`.
   - Add a Return step with expression `appConfig`.

7. **Add an Else If branch for TOML**: From the If step, add an **else if** branch with condition `ext == "toml"`. Inside:
   - Add a Function Call for `toml:readFile` (adds the `ballerina/toml` import). Pass `filePath` and assign the return value to `tomlData` of type `map<json>`.
   - Add a Declare Variable step. Set the name to `appConfig`, type to `AppConfig`, and expression to `check tomlData.ensureType()`.
   - Add a Return step with expression `appConfig`.

8. **Add an Else branch for unsupported formats**: Add a Return step with expression `error("Unsupported config format: " + ext)`.

9. **In the `main` function flow, call `loadConfig`**: Add a Function Call step, search for `loadConfig` (it appears as a user-defined function), pass `"app-config.yaml"` as the file path, and assign the result value to a variable named `config` of type `AppConfig`.

10. **Add a Function Call to print the startup message**: Click **+** and select **Function Call**. Search for `io:println` and add two arguments: `"Starting " + config.appName + " on port "` (string concatenation between strings) and `config.port`.

   ![Flow designer showing the dynamic configuration loader with If/Else branching for YAML and TOML formats](/img/develop/transform/yaml-toml/yaml-toml-config-loader-flow.png)

```ballerina
import ballerina/io;
import ballerina/toml;
import ballerina/data.yaml;

type AppConfig record {|
    string appName;
    int port;
    string logLevel;
    map<string> features;
|};

public function loadConfig(string filePath) returns AppConfig|error {
    int? dotIndex = filePath.lastIndexOf(".");
    if dotIndex is () {
        return error("Unsupported config format: " + filePath);
    }
    string ext = filePath.substring(dotIndex + 1);

    if ext == "yaml" || ext == "yml" {
        byte[] & readonly fileContent = check io:fileReadBytes(filePath);
        AppConfig appConfig = check yaml:parseBytes(fileContent);
        return appConfig;
    } else if ext == "toml" {
        map<json> tomlData = check toml:readFile(filePath);
        AppConfig appConfig = check tomlData.ensureType();
        return appConfig;
    }
    return error("Unsupported config format: " + ext);
}

public function main() returns error? {
    AppConfig config = check loadConfig("app-config.yaml");
    io:println("Starting " + config.appName + " on port ", config.port);
}
```

## Best practices

- **Use typed records** for parsing: define Ballerina record types that match your YAML/TOML structure for compile-time safety
- **Validate early**: parse configuration at startup and fail fast on missing or invalid values
- **Handle multi-document YAML carefully**: Kubernetes manifests often contain multiple documents in a single file
- **Prefer TOML for Ballerina configs**: TOML aligns with Ballerina's native configuration format (`Ballerina.toml`)

## What's next

- [JSON Processing](json.md) - Work with JSON data
- [CSV & Flat File Processing](csv-flat-file.md) - Handle tabular data formats
