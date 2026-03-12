---
sidebar_position: 5
title: Automation
description: Build scheduled and manually triggered automation tasks for periodic sync, batch jobs, and recurring workflows.
---

# Automation

Automation artifacts run without an external request. They execute on a cron schedule or are triggered manually, making them ideal for periodic data synchronization, batch processing, report generation, and recurring maintenance tasks.

## Scheduled Automations

### Creating a Scheduled Task

Use the `task:Schedule` API to define automations that run on a cron schedule.

```ballerina
import ballerina/task;
import ballerina/time;
import ballerina/log;

configurable string cronExpression = "0 0 * * *"; // Daily at midnight

class DailySyncJob {
    *task:Job;

    public function execute() {
        do {
            log:printInfo("Daily sync started",
                          timestamp = time:utcToString(time:utcNow()));
            check syncAllCustomers();
            check generateDailyReport();
            log:printInfo("Daily sync completed");
        } on fail error e {
            log:printError("Daily sync failed", 'error = e);
        }
    }
}

function init() returns error? {
    _ = check task:scheduleJobRecurByFrequency(new DailySyncJob(), 86400);
    log:printInfo("Daily sync job scheduled");
}
```

### Cron-Based Scheduling

For precise scheduling with cron expressions:

```ballerina
import ballerina/task;

// Run every 15 minutes during business hours (Mon-Fri, 9am-5pm)
class OrderSyncJob {
    *task:Job;

    public function execute() {
        do {
            int synced = check syncPendingOrders();
            log:printInfo("Orders synced", count = synced);
        } on fail error e {
            log:printError("Order sync failed", 'error = e);
        }
    }
}

function init() returns error? {
    // Schedule using frequency (every 900 seconds = 15 minutes)
    _ = check task:scheduleJobRecurByFrequency(new OrderSyncJob(), 900);
}
```

### Common Cron Patterns

| Pattern | Schedule |
|---|---|
| Every minute | Frequency: `60` seconds |
| Every 5 minutes | Frequency: `300` seconds |
| Every hour | Frequency: `3600` seconds |
| Daily at midnight | Frequency: `86400` seconds |
| Every weekday at 9am | Custom logic with `time` module |

## Manual Trigger Automations

Create automations that execute on demand via an HTTP endpoint.

```ballerina
import ballerina/http;

service /admin on new http:Listener(8090) {

    // POST /admin/sync - Trigger manual sync
    resource function post sync() returns json|error {
        log:printInfo("Manual sync triggered");
        int count = check syncAllCustomers();
        return {status: "completed", recordsSynced: count};
    }

    // POST /admin/report - Generate report on demand
    resource function post report(ReportRequest req) returns json|error {
        log:printInfo("Manual report triggered", reportType = req.reportType);
        string reportUrl = check generateReport(req);
        return {status: "completed", reportUrl: reportUrl};
    }

    // POST /admin/cleanup - Run cleanup task
    resource function post cleanup() returns json|error {
        int removed = check cleanupExpiredRecords();
        return {status: "completed", recordsRemoved: removed};
    }
}

type ReportRequest record {|
    string reportType;
    string startDate;
    string endDate;
|};
```

## Real-World Automation Examples

### Database-to-Database Sync

Periodically synchronize records between two databases.

```ballerina
import ballerinax/mysql;
import ballerina/sql;
import ballerina/task;
import ballerina/time;

configurable string sourceDbHost = ?;
configurable string targetDbHost = ?;

final mysql:Client sourceDb = check new (host = sourceDbHost, user = "reader",
    password = "pass", database = "source_db");
final mysql:Client targetDb = check new (host = targetDbHost, user = "writer",
    password = "pass", database = "target_db");

type CustomerRecord record {|
    int id;
    string name;
    string email;
    string updatedAt;
|};

class CustomerSyncJob {
    *task:Job;
    private string lastSyncTime = "2000-01-01T00:00:00Z";

    public function execute() {
        do {
            string currentTime = time:utcToString(time:utcNow());

            // Fetch changed records since last sync
            stream<CustomerRecord, sql:Error?> changedRecords = sourceDb->query(
                `SELECT * FROM customers WHERE updated_at > ${self.lastSyncTime}`
            );

            int syncCount = 0;
            check from CustomerRecord rec in changedRecords
                do {
                    _ = check targetDb->execute(
                        `INSERT INTO customers (id, name, email, updated_at)
                         VALUES (${rec.id}, ${rec.name}, ${rec.email}, ${rec.updatedAt})
                         ON DUPLICATE KEY UPDATE
                         name = ${rec.name}, email = ${rec.email}, updated_at = ${rec.updatedAt}`
                    );
                    syncCount += 1;
                };

            self.lastSyncTime = currentTime;
            log:printInfo("Customer sync completed", count = syncCount);
        } on fail error e {
            log:printError("Customer sync failed", 'error = e);
        }
    }
}
```

### Report Generation

Generate and deliver periodic reports.

```ballerina
import ballerina/email;
import ballerina/task;

class WeeklyReportJob {
    *task:Job;

    public function execute() {
        do {
            // Aggregate data for the report
            ReportData data = check aggregateWeeklyData();

            // Generate CSV report
            byte[] csvContent = check generateCsvReport(data);

            // Send via email
            check smtpClient->sendMessage({
                to: "management@example.com",
                subject: "Weekly Integration Report - " + data.weekEnding,
                body: string `Weekly report summary:
- Total orders processed: ${data.orderCount}
- Revenue: $${data.totalRevenue}
- Error rate: ${data.errorRate}%

See attached CSV for details.`,
                'from: "reports@example.com",
                attachments: [{
                    fileName: "weekly-report-" + data.weekEnding + ".csv",
                    contentType: "text/csv",
                    content: csvContent
                }]
            });

            log:printInfo("Weekly report sent", week = data.weekEnding);
        } on fail error e {
            log:printError("Report generation failed", 'error = e);
        }
    }
}

type ReportData record {|
    string weekEnding;
    int orderCount;
    decimal totalRevenue;
    float errorRate;
|};
```

### Data Cleanup

Remove expired records and archive old data.

```ballerina
import ballerina/task;
import ballerinax/mysql;
import ballerina/sql;

class DataCleanupJob {
    *task:Job;

    public function execute() {
        do {
            // Archive records older than 90 days
            sql:ExecutionResult archiveResult = check targetDb->execute(
                `INSERT INTO orders_archive SELECT * FROM orders
                 WHERE created_at < DATE_SUB(NOW(), INTERVAL 90 DAY)`
            );
            log:printInfo("Records archived", count = archiveResult.affectedRowCount);

            // Delete archived records from active table
            sql:ExecutionResult deleteResult = check targetDb->execute(
                `DELETE FROM orders WHERE created_at < DATE_SUB(NOW(), INTERVAL 90 DAY)`
            );
            log:printInfo("Old records cleaned up", count = deleteResult.affectedRowCount);

            // Clean up expired sessions
            sql:ExecutionResult sessionResult = check targetDb->execute(
                `DELETE FROM sessions WHERE expires_at < NOW()`
            );
            log:printInfo("Expired sessions removed", count = sessionResult.affectedRowCount);
        } on fail error e {
            log:printError("Cleanup job failed", 'error = e);
        }
    }
}
```

## Execution Context

### Handling Long-Running Tasks

For tasks that may take a long time, implement checkpointing to enable recovery on failure.

```ballerina
function syncWithCheckpoint() returns error? {
    int lastProcessedId = check getCheckpoint("customer-sync");

    stream<CustomerRecord, sql:Error?> records = sourceDb->query(
        `SELECT * FROM customers WHERE id > ${lastProcessedId} ORDER BY id LIMIT 1000`
    );

    check from CustomerRecord rec in records
        do {
            check processRecord(rec);
            check saveCheckpoint("customer-sync", rec.id);
        };
}
```

### Idempotent Execution

Design automations to be safe to re-run by using upserts and idempotency keys.

```ballerina
function processOrderIdempotent(Order order) returns error? {
    // Check if already processed
    boolean exists = check checkProcessed(order.orderId);
    if exists {
        log:printInfo("Order already processed, skipping", orderId = order.orderId);
        return;
    }

    check fulfillOrder(order);
    check markAsProcessed(order.orderId);
}
```

## What's Next

- [Data Persistence](data-persistence.md) -- Store and retrieve data from your automations
- [Configuration Management](/docs/develop/design-logic/configuration-management) -- Environment-specific scheduling
- [Error Handling](/docs/develop/design-logic/error-handling) -- Handle automation failures
