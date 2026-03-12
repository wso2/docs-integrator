---
sidebar_position: 10
title: Scan Tool
description: Run static code analysis on Ballerina projects with configurable rules for security, quality, and best practices.
---

# Scan Tool

The `bal scan` tool performs static code analysis on your Ballerina integration projects. It detects security vulnerabilities, code quality issues, performance anti-patterns, and violations of best practices. Results are reported with severity levels and actionable recommendations, helping you maintain high-quality integration code.

## Prerequisites

The Scan tool is included with the Ballerina distribution:

```bash
bal scan --help
```

## Running a Scan

### Basic Usage

```bash
# Scan the current project
bal scan

# Scan a specific directory
bal scan --path ./my-integration/

# Scan with JSON output
bal scan --format json

# Scan and fail on warnings (useful in CI/CD)
bal scan --fail-on-warnings
```

### Example Output

```
Scanning project: my-integration

  main.bal
    [WARNING] Line 12: Hardcoded credentials detected. Use configurable variables.     (SEC001)
    [WARNING] Line 35: HTTP client created without timeout configuration.               (PERF003)
    [INFO]    Line 48: Consider using query expressions instead of foreach + push.      (STYLE002)

  utils.bal
    [ERROR]   Line 7: SQL query constructed with string concatenation. Use parameterized queries. (SEC002)

Summary:
  Errors:   1
  Warnings: 2
  Info:     1

Scan completed with 1 error(s). Fix errors before deploying.
```

## Rule Categories

### Security Rules

| Rule ID | Description |
|---|---|
| `SEC001` | Hardcoded credentials or secrets in source code |
| `SEC002` | SQL injection vulnerability (string concatenation in queries) |
| `SEC003` | Insecure HTTP connection (no TLS) |
| `SEC004` | Missing input validation on service endpoints |
| `SEC005` | Sensitive data logged without masking |
| `SEC006` | Overly permissive CORS configuration |

### Performance Rules

| Rule ID | Description |
|---|---|
| `PERF001` | Database client created inside a loop or request handler |
| `PERF002` | Missing connection pool configuration for database clients |
| `PERF003` | HTTP client without timeout configuration |
| `PERF004` | Large payload processed without streaming |
| `PERF005` | Blocking operation in isolated function |

### Code Quality Rules

| Rule ID | Description |
|---|---|
| `QUAL001` | Unused variable or import |
| `QUAL002` | Empty catch block (error swallowed silently) |
| `QUAL003` | Function exceeds recommended line count |
| `QUAL004` | Missing error handling on remote call |
| `QUAL005` | Deprecated API usage |

### Style and Best Practice Rules

| Rule ID | Description |
|---|---|
| `STYLE001` | Non-descriptive variable name |
| `STYLE002` | Foreach + push pattern replaceable with query expression |
| `STYLE003` | Missing documentation on public function |
| `STYLE004` | Inconsistent naming convention |

## Configuring Rules

### Scan Configuration File

Create a `Scan.toml` file in your project root to customize which rules are enabled and their severity:

```toml
# Scan.toml

[scan]
# Include or exclude rule categories
include = ["SEC", "PERF", "QUAL"]
exclude = ["STYLE"]

# Override severity for specific rules
[scan.rules.SEC001]
severity = "error"    # Promote to error

[scan.rules.PERF003]
severity = "info"     # Demote to info

[scan.rules.QUAL003]
enabled = false       # Disable this rule

[scan.rules.QUAL003]
maxFunctionLines = 50  # Configure threshold
```

### Inline Suppression

Suppress specific warnings in code with annotations:

```ballerina
// Suppress a specific rule for this line
@scan:SuppressWarnings {rules: ["PERF003"]}
final http:Client quickClient = check new ("https://api.example.com");

// Suppress with a justification
@scan:SuppressWarnings {
    rules: ["SEC003"],
    reason: "Internal network communication, TLS not required"
}
final http:Client internalClient = check new ("http://internal-service:8080");
```

## Fixing Common Issues

### SEC002: SQL Injection

```ballerina
// Bad: String concatenation
string query = "SELECT * FROM users WHERE name = '" + userName + "'";
_ = check db->query(query);

// Good: Parameterized query
stream<User, error?> result = db->query(
    `SELECT * FROM users WHERE name = ${userName}`
);
```

### PERF003: Missing Timeout

```ballerina
// Bad: No timeout
final http:Client client = check new ("https://api.example.com");

// Good: Timeout configured
final http:Client client = check new ("https://api.example.com", {
    timeout: 30,
    retryConfig: {
        count: 3,
        interval: 2
    }
});
```

### QUAL002: Empty Catch Block

```ballerina
// Bad: Error silently swallowed
do {
    check riskyOperation();
} on fail error e {
    // Empty -- error is lost
}

// Good: Error logged or propagated
do {
    check riskyOperation();
} on fail error e {
    log:printError("Operation failed", 'error = e);
    check sendAlert("Operation failure: " + e.message());
}
```

## CI/CD Integration

### GitHub Actions

```yaml
- name: Run Ballerina Scan
  run: bal scan --format json --fail-on-warnings
```

### Jenkins Pipeline

```groovy
stage('Static Analysis') {
    steps {
        sh 'bal scan --format json > scan-results.json'
        archiveArtifacts artifacts: 'scan-results.json'
    }
}
```

### Pre-Commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit
result=$(bal scan --fail-on-warnings 2>&1)
if [ $? -ne 0 ]; then
    echo "Scan failed. Fix issues before committing:"
    echo "$result"
    exit 1
fi
```

## Command Reference

| Command | Description |
|---|---|
| `bal scan` | Scan current project |
| `--path <dir>` | Scan a specific directory |
| `--format json` | Output results as JSON |
| `--format sarif` | Output in SARIF format (for IDE integration) |
| `--fail-on-warnings` | Return non-zero exit code on warnings |
| `--include <categories>` | Include specific rule categories |
| `--exclude <categories>` | Exclude specific rule categories |

## What's Next

- [Migration Tools](migration-tools.md) -- Scan and migrate from other integration platforms
- [Static Code Analysis](/docs/develop/organize-code/static-code-analysis) -- Configure analysis in your project workflow
- [Error Handling](/docs/develop/design-logic/error-handling) -- Fix error handling issues flagged by the scanner
