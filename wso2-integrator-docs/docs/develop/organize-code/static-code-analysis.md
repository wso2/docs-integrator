---
sidebar_position: 8
title: Static Code Analysis
description: Detect code quality issues, security vulnerabilities, and best practice violations with the Ballerina Scan tool.
---

# Static Code Analysis

Catch bugs, security vulnerabilities, and best practice violations before they reach production using the Ballerina Scan tool. Static analysis examines your source code without executing it, identifying issues ranging from unused variables to potential security flaws in your integrations.

## Running the Scan Tool

```bash
# Scan the current package
bal scan

# Scan with specific rule categories
bal scan --categories security

# Scan and generate a report
bal scan --report
```

The scan results appear in the console and optionally as an HTML report.

## Understanding Scan Results

```
Scanning myorg/order_service:1.0.0

[WARNING] service.bal:15:5 - Unused variable 'tempData' (BAL001)
[WARNING] service.bal:28:1 - Hard-coded credential detected (SEC001)
[ERROR]   auth.bal:42:10 - SQL injection risk: unparameterized query (SEC005)
[WARNING] types.bal:8:1 - Public type missing documentation comment (DOC001)
[INFO]    utils.bal:55:5 - Function exceeds recommended complexity (MAINT003)

Scan complete: 1 error, 3 warnings, 1 info
```

### Severity Levels

| Level | Meaning | Action |
|-------|---------|--------|
| **ERROR** | Critical issue that should block deployment | Fix immediately |
| **WARNING** | Potential problem that may cause issues | Fix before release |
| **INFO** | Suggestion for improvement | Fix when convenient |

## Rule Categories

### Security Rules

Detect security vulnerabilities in your integration code.

```ballerina
// SEC001: Hard-coded credentials
// Bad
http:Client client = check new ("https://api.example.com",
    auth = {
        username: "admin",        // WARNING: hard-coded credential
        password: "secret123"     // WARNING: hard-coded credential
    }
);

// Good: use configurable values
configurable string username = ?;
configurable string password = ?;

http:Client client = check new ("https://api.example.com",
    auth = {username, password}
);
```

```ballerina
// SEC005: SQL injection risk
// Bad
function getUser(string userId) returns json|error {
    // WARNING: string concatenation in SQL query
    return dbClient->queryRow(`SELECT * FROM users WHERE id = ${userId}`);
}

// Good: use parameterized queries
function getUser(string userId) returns json|error {
    return dbClient->queryRow(
        `SELECT * FROM users WHERE id = ${userId}`
    );
}
```

### Maintainability Rules

Identify code that is hard to maintain.

```ballerina
// MAINT001: Function too long
// Bad: function exceeds 50 lines
public function processEverything(json payload) returns json|error {
    // 80+ lines of logic...
}

// Good: break into focused functions
public function processEverything(json payload) returns json|error {
    Order order = check parseOrder(payload);
    check validateOrder(order);
    decimal total = calculateTotal(order);
    check persistOrder(order, total);
    check sendConfirmation(order);
    return order.toJson();
}
```

```ballerina
// MAINT003: High cyclomatic complexity
// Bad: deeply nested conditions
public function categorize(Order order) returns string {
    if order.total > 1000 {
        if order.items.length() > 10 {
            if order.customer.tier == "gold" {
                return "premium-bulk";
            } else {
                return "bulk";
            }
        } else {
            return "high-value";
        }
    } else {
        return "standard";
    }
}

// Good: early returns reduce nesting
public function categorize(Order order) returns string {
    if order.total <= 1000 {
        return "standard";
    }
    if order.items.length() <= 10 {
        return "high-value";
    }
    if order.customer.tier == "gold" {
        return "premium-bulk";
    }
    return "bulk";
}
```

### Documentation Rules

Ensure public APIs are documented.

```ballerina
// DOC001: Missing documentation comment
// Bad
public function calculateTotal(Order order) returns decimal {
    // ...
}

// Good
# Calculates the total price for an order including all line items.
#
# + order - The order to calculate
# + return - The total price as a decimal
public function calculateTotal(Order order) returns decimal {
    // ...
}
```

### Best Practice Rules

Enforce Ballerina best practices.

```ballerina
// BP001: Unused import
import ballerina/io;     // WARNING: 'io' is imported but never used

// BP002: Unused variable
function process() {
    string temp = "unused";  // WARNING: 'temp' is never read
}

// BP003: Empty catch block
function riskyOperation() {
    do {
        check dangerousCall();
    } on fail error e {
        // WARNING: empty error handler -- at minimum log the error
    }
}

// Good: handle or log errors
function riskyOperation() {
    do {
        check dangerousCall();
    } on fail error e {
        log:printError("Operation failed", 'error = e);
    }
}
```

## Configuring Scan Rules

### Suppressing Individual Warnings

Suppress a specific warning when you have a valid reason.

```ballerina
// @suppress("SEC001") -- credentials are loaded from a test fixture
string testToken = "test-token-for-unit-tests";
```

### Configuration File

Create a `ScanConfig.toml` to configure rules project-wide.

```toml
# ScanConfig.toml

[rules]
# Disable a specific rule
DOC001 = "off"

# Set severity level
MAINT003 = "info"    # Downgrade complexity warning to info

[security]
# Enable all security rules at error level
level = "error"

[exclude]
# Skip scanning generated code
paths = ["generated/", "tests/resources/"]
```

## Integrating with CI/CD

### GitHub Actions

```yaml
- name: Run static analysis
  run: bal scan --report

- name: Upload scan report
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: scan-report
    path: target/report/scan/

- name: Fail on errors
  run: |
    # bal scan exits with non-zero code when errors are found
    bal scan
```

### Pre-Commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running static analysis..."
bal scan

if [ $? -ne 0 ]; then
    echo "Static analysis found issues. Fix them before committing."
    exit 1
fi
```

## IDE Integration

The WSO2 Integrator VS Code extension shows scan results inline as you type.

<!-- TODO: Screenshot of inline scan warnings in VS Code -->

- Yellow underlines indicate warnings
- Red underlines indicate errors
- Hover over the underline to see the rule description and suggested fix
- Use the Quick Fix action (`Ctrl+.`) to apply automated fixes

## Custom Rules

Write custom scan rules for organization-specific standards.

```ballerina
// Custom rule: All HTTP services must have a health check endpoint
// Configured in ScanConfig.toml:
// [custom-rules]
// "require-health-check" = "warning"
```

## Best Practices

- **Run scans in CI** -- make static analysis a required check before merging
- **Fix errors immediately** -- treat scan errors like compilation errors
- **Address warnings before release** -- warnings often point to real problems
- **Suppress intentionally** -- always add a comment explaining why a warning is suppressed
- **Start with defaults** -- use the built-in rules before customizing
- **Review scan reports in PRs** -- include scan results in code review

## What's Next

- [Style Guide](style-guide.md) -- Coding conventions and formatting rules
- [Generate Documentation](generate-documentation.md) -- Produce API docs from source code
- [Code Coverage](/docs/develop/test/code-coverage) -- Measure test coverage alongside code quality
