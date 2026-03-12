---
sidebar_position: 16
title: "HRMS"
description: "HRMS connectors for BambooHR, Workday HCM, ADP, and more in WSO2 Integrator."
---

# HRMS Connectors

Integrate with human resource management systems to automate employee onboarding, sync workforce data, manage time-off requests, and streamline HR operations across your organization.

## Available Connectors

| Connector | Package | Use Case |
|-----------|---------|----------|
| **BambooHR** | `ballerinax/bamboohr` | Manage employee records, time-off requests, and onboarding |
| **Workday HCM** | `ballerinax/workday` | Access worker data, compensation, benefits, and org structures |
| **ADP** | `ballerinax/adp` | Sync payroll data, employee records, and workforce management |
| **SAP SuccessFactors** | `ballerinax/sap.successfactors` | Manage employee profiles, goals, performance, and learning |
| **Gusto** | `ballerinax/gusto` | Automate payroll, benefits, and HR compliance |
| **Personio** | `ballerinax/personio` | Manage employee data, absences, and recruiting |

## Quick Example

### Automate Employee Onboarding with BambooHR

```ballerina
import ballerina/http;
import ballerinax/bamboohr;

configurable string bamboohrDomain = ?;
configurable string bamboohrApiKey = ?;

final bamboohr:Client hrClient = check new ({
    domain: bamboohrDomain,
    auth: {
        apiKey: bamboohrApiKey
    }
});

type NewEmployee record {|
    string firstName;
    string lastName;
    string email;
    string department;
    string jobTitle;
    string startDate;
|};

service /api on new http:Listener(8090) {
    resource function post employees(NewEmployee emp) returns json|error {
        // Create the employee in BambooHR
        bamboohr:EmployeeResult result = check hrClient->createEmployee({
            firstName: emp.firstName,
            lastName: emp.lastName,
            workEmail: emp.email,
            department: emp.department,
            jobTitle: emp.jobTitle,
            hireDate: emp.startDate
        });

        return {
            status: "created",
            employeeId: result.id,
            message: string `Employee ${emp.firstName} ${emp.lastName} onboarded successfully`
        };
    }

    // Get employee directory
    resource function get employees() returns json|error {
        bamboohr:EmployeeDirectory directory = check hrClient->getEmployeeDirectory();
        return directory.toJson();
    }
}
```

### Sync Employee Data Between Systems

```ballerina
import ballerinax/bamboohr;

function syncUpdatedEmployees(string sinceDate) returns json[]|error {
    // Get recently changed employees
    bamboohr:ChangedEmployee[] changes = check hrClient->getChangedEmployees(sinceDate);

    json[] syncResults = [];
    foreach bamboohr:ChangedEmployee change in changes {
        bamboohr:Employee emp = check hrClient->getEmployee(change.id, [
            "firstName", "lastName", "workEmail", "department", "jobTitle"
        ]);
        syncResults.push(emp.toJson());
    }
    return syncResults;
}
```

## Configuration

```toml
# BambooHR
[bamboohr]
bamboohrDomain = "your-company"
bamboohrApiKey = "<BAMBOOHR_API_KEY>"

# Workday
[workday]
workdayTenantUrl = "https://wd5-impl-services1.workday.com"
workdayClientId = "<WORKDAY_CLIENT_ID>"
workdayClientSecret = "<WORKDAY_CLIENT_SECRET>"
```

## What's Next

- [Connection Configuration](configuration.md) -- How to set up and manage connections
- [Authentication Methods](authentication.md) -- OAuth 2.0, API keys, and other auth types
- [ERP & Business Operations](erp-business.md) -- Integrate with Workday, SAP, and other enterprise systems
- [Error Handling per Connector](error-handling.md) -- Handle connector-specific errors
