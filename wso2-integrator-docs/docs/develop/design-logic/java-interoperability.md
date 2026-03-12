---
sidebar_position: 10
title: Java Interoperability
description: Call Java libraries from Ballerina using FFI, the BindGen tool, and Java class wrapping.
---

# Java Interoperability

Ballerina runs on the JVM and provides first-class interoperability with Java. You can call any Java library from your integration code -- legacy enterprise libraries, open-source frameworks, or your organization's internal Java packages. WSO2 Integrator supports two approaches: **direct FFI bindings** for precise control and the **BindGen tool** for automatic wrapper generation.

## When to Use Java Interop

Common scenarios for calling Java from Ballerina:

- **Legacy systems** -- Reuse existing Java business logic without rewriting it.
- **Specialized libraries** -- Use Java libraries with no Ballerina equivalent (e.g., Apache POI for spreadsheets, iText for PDFs).
- **Performance-critical code** -- Leverage optimized Java implementations for cryptography, compression, or math.
- **In-house libraries** -- Call your organization's internal Java SDKs directly.

## Adding Java Dependencies

Add Java JAR files to your Ballerina project using the `Ballerina.toml` manifest.

### Local JAR Files

Place JARs in a `libs/` directory and reference them in `Ballerina.toml`:

```toml
[package]
org = "myorg"
name = "my_integration"
version = "1.0.0"

[[platform.java17.dependency]]
path = "libs/my-library-2.1.0.jar"

[[platform.java17.dependency]]
path = "libs/commons-codec-1.15.jar"
```

### Maven Dependencies

Pull JARs directly from Maven Central:

```toml
[[platform.java17.dependency]]
groupId = "org.apache.commons"
artifactId = "commons-lang3"
version = "3.14.0"

[[platform.java17.dependency]]
groupId = "com.google.code.gson"
artifactId = "gson"
version = "2.10.1"
```

## Direct FFI Bindings

Use `@java:Method`, `@java:FieldGet`, `@java:FieldSet`, and `@java:Constructor` annotations to bind Ballerina functions directly to Java methods.

### Calling Static Methods

```ballerina
import ballerina/jballerina.java;

// Bind to java.util.UUID.randomUUID().toString()
function generateUUID() returns string = @java:Method {
    name: "randomUUID",
    'class: "java.util.UUID"
} external;

// Bind to java.lang.System.currentTimeMillis()
function currentTimeMillis() returns int = @java:Method {
    name: "currentTimeMillis",
    'class: "java.lang.System"
} external;

// Bind to Base64 encoder
function base64Encode(byte[] input) returns byte[] = @java:Method {
    name: "encode",
    'class: "java.util.Base64$Encoder",
    paramTypes: ["[B"]
} external;
```

### Calling Instance Methods

```ballerina
import ballerina/jballerina.java;

// Create a Java object using handle
function newArrayList() returns handle = @java:Constructor {
    'class: "java.util.ArrayList"
} external;

function arrayListAdd(handle list, handle element) returns boolean = @java:Method {
    name: "add",
    'class: "java.util.ArrayList"
} external;

function arrayListSize(handle list) returns int = @java:Method {
    name: "size",
    'class: "java.util.ArrayList"
} external;

// Usage
function example() {
    handle list = newArrayList();
    _ = arrayListAdd(list, java:fromString("item1"));
    _ = arrayListAdd(list, java:fromString("item2"));
    int size = arrayListSize(list);   // 2
}
```

### Accessing Fields

```ballerina
import ballerina/jballerina.java;

// Read a static field
function getMaxIntValue() returns int = @java:FieldGet {
    name: "MAX_VALUE",
    'class: "java.lang.Integer"
} external;

// Write a field
function setFieldValue(handle obj, handle value) = @java:FieldSet {
    name: "myField",
    'class: "com.example.MyClass"
} external;
```

### Mapping Java Types to Ballerina

| Java Type | Ballerina Type |
|---|---|
| `int`, `Integer` | `int` |
| `long`, `Long` | `int` |
| `double`, `Double` | `float` |
| `boolean`, `Boolean` | `boolean` |
| `String` | `handle` (convert with `java:fromString`/`java:toString`) |
| `byte[]` | `byte[]` |
| Any object | `handle` |

### Converting Strings

Java strings and Ballerina strings are different types. Use conversion functions:

```ballerina
import ballerina/jballerina.java;

// Ballerina string -> Java String (handle)
handle javaString = java:fromString("Hello from Ballerina");

// Java String (handle) -> Ballerina string
string? ballerinaString = java:toString(javaString);
```

## The BindGen Tool

The `bal bindgen` command automatically generates Ballerina wrapper classes for Java libraries, saving you from writing FFI bindings manually.

### Basic Usage

```bash
# Generate bindings for a specific class
bal bindgen -o generated/ com.example.MyClass

# Generate bindings for multiple classes
bal bindgen -o generated/ com.example.MyClass com.example.AnotherClass

# Generate bindings with classpath
bal bindgen -cp libs/my-library.jar -o generated/ com.example.MyClass

# Generate bindings for a Maven dependency
bal bindgen --mvn org.apache.commons:commons-lang3:3.14.0 \
    -o generated/ org.apache.commons.lang3.StringUtils
```

### Using Generated Bindings

After running `bindgen`, you get Ballerina classes that mirror the Java API:

```ballerina
// Generated wrapper provides a native Ballerina API
import generated.org.apache.commons.lang3;

function processText(string input) returns string|error {
    // Use the generated StringUtils wrapper
    StringUtils utils = check new ();
    string reversed = check utils.reverse(input);
    string capitalized = check utils.capitalize(reversed);
    return capitalized;
}
```

### BindGen Options

| Flag | Description |
|---|---|
| `-o <dir>` | Output directory for generated files |
| `-cp <path>` | Additional classpath for resolving dependencies |
| `--mvn <coords>` | Maven coordinate (`groupId:artifactId:version`) |
| `--public` | Generate `public` wrapper classes |

## Wrapping Java Libraries

For cleaner integration, wrap Java interop calls behind idiomatic Ballerina functions.

### Example: Apache POI for Excel

```toml
# Ballerina.toml
[[platform.java17.dependency]]
groupId = "org.apache.poi"
artifactId = "poi-ooxml"
version = "5.2.5"
```

```ballerina
import ballerina/jballerina.java;

// Low-level FFI bindings
function newWorkbook() returns handle = @java:Constructor {
    'class: "org.apache.poi.xssf.usermodel.XSSFWorkbook"
} external;

function createSheet(handle workbook, handle name) returns handle = @java:Method {
    name: "createSheet",
    'class: "org.apache.poi.xssf.usermodel.XSSFWorkbook"
} external;

function createRow(handle sheet, int rowNum) returns handle = @java:Method {
    name: "createRow",
    'class: "org.apache.poi.xssf.usermodel.XSSFSheet"
} external;

// High-level Ballerina API wrapping the FFI calls
public function generateExcelReport(ReportData data) returns byte[]|error {
    handle workbook = newWorkbook();
    handle sheet = createSheet(workbook, java:fromString("Report"));

    // Create header row
    handle headerRow = createRow(sheet, 0);
    foreach int i in 0 ..< data.columns.length() {
        setCellValue(headerRow, i, data.columns[i]);
    }

    // Create data rows
    foreach int rowIdx in 0 ..< data.rows.length() {
        handle row = createRow(sheet, rowIdx + 1);
        foreach int colIdx in 0 ..< data.rows[rowIdx].length() {
            setCellValue(row, colIdx, data.rows[rowIdx][colIdx]);
        }
    }

    return writeWorkbookToBytes(workbook);
}
```

### Example: Custom Encryption Library

```ballerina
import ballerina/jballerina.java;

// Wrap a custom Java encryption utility
function newEncryptor(handle secretKey) returns handle|error = @java:Constructor {
    'class: "com.myorg.security.AESEncryptor",
    paramTypes: ["java.lang.String"]
} external;

function encryptBytes(handle encryptor, byte[] plaintext) returns byte[]|error = @java:Method {
    name: "encrypt",
    'class: "com.myorg.security.AESEncryptor"
} external;

function decryptBytes(handle encryptor, byte[] ciphertext) returns byte[]|error = @java:Method {
    name: "decrypt",
    'class: "com.myorg.security.AESEncryptor"
} external;

// Clean Ballerina API
configurable string encryptionKey = ?;

final handle encryptor = check newEncryptor(java:fromString(encryptionKey));

public function encrypt(string plaintext) returns byte[]|error {
    byte[] input = plaintext.toBytes();
    return check encryptBytes(encryptor, input);
}

public function decrypt(byte[] ciphertext) returns string|error {
    byte[] decrypted = check decryptBytes(encryptor, ciphertext);
    return check string:fromBytes(decrypted);
}
```

## Error Handling with Java Interop

Java exceptions are mapped to Ballerina errors. Use `check` or `do/on fail` to handle them:

```ballerina
function parseDate(string input) returns handle|error {
    handle formatter = getDateFormatter(java:fromString("yyyy-MM-dd"));
    // If Java throws a ParseException, it becomes a Ballerina error
    handle date = check parse(formatter, java:fromString(input));
    return date;
}

function safeParsing(string input) returns string {
    handle|error result = parseDate(input);
    if result is error {
        log:printWarn("Date parsing failed", input = input, 'error = result);
        return "INVALID_DATE";
    }
    return java:toString(result) ?: "UNKNOWN";
}
```

## Best Practices

1. **Wrap Java calls** -- Always expose Java interop through idiomatic Ballerina functions rather than using `handle` types in your integration logic.
2. **Use BindGen for large APIs** -- For libraries with many classes, `bal bindgen` saves significant effort.
3. **Minimize handle usage** -- Convert between `handle` and Ballerina types at the boundary layer.
4. **Handle nulls** -- Java methods can return `null`. Use `handle?` or check for nil after conversion.
5. **Test interop code** -- Write unit tests for your Java wrappers to catch type mapping issues early.

## What's Next

- [Functions](functions.md) -- Organize Java interop wrappers as reusable functions
- [Ballerina Pro-Code](ballerina-pro-code.md) -- Combine Java interop with advanced Ballerina features
- [Configuration Management](configuration-management.md) -- Externalize Java library configuration
