---
title: Compliance Considerations
---

# Compliance Considerations

Design your integrations with regulatory compliance in mind, covering audit logging, data protection, and governance patterns.

## Audit logging

Log all sensitive operations for compliance audits:

```ballerina
import ballerina/log;
import ballerina/time;

function auditLog(string action, string userId, string resource, json? details = ()) {
    log:printInfo("AUDIT",
        action = action,
        userId = userId,
        resource = resource,
        timestamp = time:utcToString(time:utcNow()),
        details = details.toString()
    );
}

// Usage in service resources
resource function post orders(http:Request req, OrderRequest order) returns http:Created|error {
    string userId = check extractUserId(req);
    string orderId = check createOrder(order);
    auditLog("CREATE_ORDER", userId, "orders/" + orderId, order.toJson());
    return <http:Created>{body: {orderId: orderId}};
}
```

### Structured audit log format

Enable JSON logging for machine-parseable audit trails:

```toml
[ballerina.log]
format = "json"
level = "INFO"
```

Ship audit logs to a dedicated, immutable log store (S3, Azure Blob, or a SIEM) for retention compliance.

## Data protection

### PII masking

Mask personally identifiable information in logs and responses:

```ballerina
function maskEmail(string email) returns string {
    int? atIndex = email.indexOf("@");
    if atIndex is int && atIndex > 2 {
        return email.substring(0, 2) + "***" + email.substring(atIndex);
    }
    return "***";
}

function maskCreditCard(string cc) returns string {
    return "****-****-****-" + cc.substring(cc.length() - 4);
}
```

### Data minimization

Only process and store the minimum data needed:

```ballerina
// Instead of logging full customer records
log:printInfo("Processing customer", customerId = customer.id);
// NOT: log:printInfo("Processing", customer = customer.toJson());
```

## Data residency

### Region-specific configuration

Use environment-specific `Config.toml` files to route data to region-appropriate services:

```toml
# config/eu-Config.toml
dbHost = "eu-west-1.db.example.com"
storageRegion = "eu-west-1"
apiEndpoint = "https://eu.api.example.com"

# config/us-Config.toml
dbHost = "us-east-1.db.example.com"
storageRegion = "us-east-1"
apiEndpoint = "https://us.api.example.com"
```

### Cross-border data transfer

When integrations span regions, implement data classification:

```ballerina
type DataClassification "public"|"internal"|"confidential"|"restricted";

function canTransferCrossBorder(DataClassification classification) returns boolean {
    return classification == "public" || classification == "internal";
}
```

## SOC 2 / GDPR / HIPAA considerations

| Requirement | Implementation |
|------------|----------------|
| **Access control** | JWT/OAuth2 auth on all endpoints |
| **Audit trail** | Structured audit logging with immutable storage |
| **Data encryption** | TLS in transit, encryption at rest for databases |
| **Data minimization** | Only collect and process necessary fields |
| **Right to erasure** | Implement delete endpoints with cascade logic |
| **Breach notification** | Alert on authentication failures and anomalies |
| **Data retention** | Configure log and data lifecycle policies |

## What's next

- [Secrets and encryption](secrets-encryption.md) — Encrypt data at rest and in transit
- [Authentication](authentication.md) — Enforce access control
- [Logging](../observe/logging-structured-logs.md) — Set up audit log shipping
