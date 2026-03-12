---
sidebar_position: 9
title: bal scan CLI
description: Reference for the bal scan CLI tool — static code analysis with rules configuration, custom rules, and reports.
---

# bal scan CLI

The `bal scan` tool performs static code analysis on Ballerina projects. It identifies code quality issues, potential bugs, security vulnerabilities, and integration anti-patterns using a configurable set of rules. Scan results can be output to the console or exported as structured reports.

## Syntax

```bash
bal scan [options] [<ballerina-file-or-project>]
```

## Flags

| Flag | Alias | Required | Default | Description |
|------|-------|----------|---------|-------------|
| `--platform-triggered` | — | No | `false` | Indicate that the scan was triggered by a platform (e.g., CI/CD) |
| `--scan-report` | — | No | `false` | Generate a detailed HTML scan report |
| `--include-rules` | — | No | All rules | Comma-separated list of rule IDs to include |
| `--exclude-rules` | — | No | None | Comma-separated list of rule IDs to exclude |
| `--custom-rules-path` | — | No | — | Path to a directory containing custom rule packages |
| `--list-rules` | — | No | `false` | List all available scan rules and exit |

## Basic Usage

```bash
# Scan the current project
bal scan

# Scan a specific Ballerina file
bal scan service.bal

# Scan and generate an HTML report
bal scan --scan-report
```

## Rules Configuration

### List Available Rules

```bash
$ bal scan --list-rules
Rule ID            | Category       | Severity | Description
-------------------|----------------|----------|------------------------------------------
ballerina:1        | Code Quality   | WARNING  | Unused variable
ballerina:2        | Code Quality   | WARNING  | Unused import
ballerina:3        | Code Quality   | WARNING  | Unused function parameter
ballerina:101      | Best Practice  | INFO     | Missing error handling for remote calls
ballerina:102      | Best Practice  | WARNING  | Hardcoded credentials detected
ballerina:103      | Best Practice  | INFO     | Missing documentation for public functions
ballerina:201      | Security       | ERROR    | SQL injection vulnerability
ballerina:202      | Security       | ERROR    | Unvalidated redirect
ballerina:203      | Security       | WARNING  | Sensitive data in logs
ballerina:301      | Performance    | WARNING  | Synchronous call inside loop
ballerina:302      | Performance    | INFO     | Missing connection pool configuration
```

### Include Specific Rules

```bash
# Run only security rules
bal scan --include-rules ballerina:201,ballerina:202,ballerina:203

# Run only code quality rules
bal scan --include-rules ballerina:1,ballerina:2,ballerina:3
```

### Exclude Specific Rules

```bash
# Run all rules except unused variable warnings
bal scan --exclude-rules ballerina:1

# Exclude informational rules
bal scan --exclude-rules ballerina:101,ballerina:103,ballerina:302
```

## Rule Categories

| Category | Rule ID Range | Description |
|----------|--------------|-------------|
| Code Quality | `ballerina:1` - `ballerina:99` | Unused variables, imports, parameters, dead code |
| Best Practice | `ballerina:100` - `ballerina:199` | Error handling, documentation, naming conventions |
| Security | `ballerina:200` - `ballerina:299` | Injection vulnerabilities, credential exposure, data leaks |
| Performance | `ballerina:300` - `ballerina:399` | Synchronous bottlenecks, resource management, connection pooling |

## Rule Severity Levels

| Severity | Description | Exit code effect |
|----------|-------------|-----------------|
| `ERROR` | Critical issue that should block deployment | Non-zero exit code |
| `WARNING` | Issue that should be reviewed and addressed | Warning-only (configurable) |
| `INFO` | Informational suggestion for improvement | No effect on exit code |

## Custom Rules

Create custom scan rules by implementing the Ballerina scan rule SPI.

### Creating a Custom Rule Package

1. Create a new Ballerina package:

```bash
bal new custom_rules --template lib
```

2. Implement the rule:

```ballerina
import ballerina/scan;

@scan:Rule {
    id: "custom:1",
    title: "Missing retry for external calls",
    description: "HTTP client calls should include retry configuration",
    category: "Best Practice",
    severity: "WARNING"
}
public isolated function checkRetryConfig(scan:AnalysisContext ctx, scan:Node node) {
    // Rule implementation
    if isHttpClientInit(node) && !hasRetryConfig(node) {
        ctx.reportIssue(node, "HTTP client missing retry configuration");
    }
}
```

3. Build the rule package:

```bash
bal pack
```

### Using Custom Rules

```bash
# Scan with custom rules
bal scan --custom-rules-path ./custom_rules/target/bala/

# Combine with built-in rules
bal scan --custom-rules-path ./custom_rules/target/bala/ --include-rules ballerina:201,custom:1
```

## Reports

### Console Output

By default, issues are printed to the console:

```
service.bal:15:5  WARNING  ballerina:101  Missing error handling for remote call
service.bal:23:9  ERROR    ballerina:201  Potential SQL injection vulnerability
service.bal:45:1  INFO     ballerina:302  Missing connection pool configuration

Scan Summary:
  Errors:   1
  Warnings: 1
  Info:     1
  Total:    3
```

### HTML Report

Generate a detailed HTML report with `--scan-report`:

```bash
bal scan --scan-report
```

The report is generated at `target/report/scan-results.html` and includes:

| Section | Content |
|---------|---------|
| Summary | Total issues by severity, category breakdown |
| Issues List | Each issue with file location, rule description, and code snippet |
| Rule Coverage | Which rules were applied and their results |
| Trend Data | Historical comparison (when platform-triggered) |

### JSON Output

Scan results are also written to `target/report/scan-results.json` for CI/CD integration:

```json
{
    "projectName": "myproject",
    "scanTimestamp": "2024-01-15T10:30:00Z",
    "summary": {
        "errors": 1,
        "warnings": 1,
        "info": 1,
        "total": 3
    },
    "issues": [
        {
            "ruleId": "ballerina:201",
            "severity": "ERROR",
            "category": "Security",
            "message": "Potential SQL injection vulnerability",
            "file": "service.bal",
            "line": 23,
            "column": 9
        }
    ]
}
```

## CI/CD Integration

### GitHub Actions Example

```yaml
- name: Run Ballerina Scan
  run: bal scan --scan-report --platform-triggered

- name: Upload Scan Report
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: scan-report
    path: target/report/scan-results.html
```

### Exit Codes

| Exit Code | Meaning |
|-----------|---------|
| `0` | No errors found (warnings and info may exist) |
| `1` | One or more ERROR-level issues found |
| `2` | Scan tool error (invalid configuration, file not found) |

## See Also

- [bal Command Reference](bal-commands.md) -- All bal subcommands
- [Unit Testing](/develop/test/unit-testing.md) -- Testing Ballerina projects
- [CI/CD Integration](/deploy-operate/cicd/github-actions.md) -- Continuous integration workflows
