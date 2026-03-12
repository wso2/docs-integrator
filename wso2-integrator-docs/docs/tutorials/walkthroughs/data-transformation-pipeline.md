---
sidebar_position: 2
title: "Build a Data Transformation Pipeline"
description: "End-to-end walkthrough: Build a multi-stage data transformation pipeline that converts, enriches, and validates data across systems."
---

# Build a Data Transformation Pipeline

Build a multi-stage pipeline that ingests data from one system, transforms it through several stages, and loads it into a target system. This tutorial demonstrates how to chain transformations, handle schema mismatches, and validate data at each stage.

## What You'll Build

An employee onboarding pipeline that takes HR system data, transforms it into the formats required by the payroll system, the IT provisioning system, and the company directory -- all from a single input event.

## What You'll Learn

- Multi-stage data transformation using Ballerina data mapping
- Type-safe schema conversion between systems
- Data enrichment from external sources
- Validation and error collection
- Fan-out to multiple target systems

## Prerequisites

- WSO2 Integrator VS Code extension installed
- Basic familiarity with Ballerina record types
- Understanding of JSON data structures

**Time estimate:** 30--45 minutes

## Architecture

```
┌─────────┐    ┌───────────┐    ┌────────────┐    ┌──────────┐
│ HR System├───►│ Validate  ├───►│  Enrich    ├───►│ Transform│
└─────────┘    │ & Clean   │    │  (lookup)  │    │ & Fan-out│
               └───────────┘    └────────────┘    └────┬─────┘
                                                       │
                                    ┌──────────────────┼──────────────────┐
                                    ▼                  ▼                  ▼
                              ┌──────────┐      ┌───────────┐     ┌───────────┐
                              │ Payroll  │      │ IT Provisn│     │ Directory │
                              │ System   │      │ System    │     │ Service   │
                              └──────────┘      └───────────┘     └───────────┘
```

## Step 1: Create the Project

```bash
bal new onboarding_pipeline
cd onboarding_pipeline
```

## Step 2: Define Source and Target Types

Define the input schema (HR system) and the three target schemas:

```ballerina
// types.bal

// Source: HR System employee record
type HrEmployee record {|
    string emp_id;
    string first_name;
    string last_name;
    string email;
    string department_code;
    string job_title;
    string start_date;       // "MM/DD/YYYY" format
    decimal annual_salary;
    string manager_emp_id?;
    string office_location;
|};

// Target 1: Payroll system
type PayrollEmployee record {|
    string employeeId;
    string fullName;
    string taxId?;
    decimal monthlySalary;
    string startDate;        // "YYYY-MM-DD" format
    string payFrequency;
    string department;
|};

// Target 2: IT provisioning
type ItProvisionRequest record {|
    string userId;
    string displayName;
    string email;
    string department;
    string role;
    string[] requiredSystems;
    string officeLocation;
|};

// Target 3: Company directory
type DirectoryEntry record {|
    string id;
    string name;
    string email;
    string title;
    string department;
    string managerId?;
    string photoUrl?;
    string location;
|};

// Department lookup record
type Department record {|
    string code;
    string name;
    string[] defaultSystems;
|};
```

## Step 3: Build the Validation Stage

```ballerina
// validate.bal
import ballerina/regex;

type ValidationResult record {|
    boolean isValid;
    string[] errors;
    HrEmployee employee;
|};

function validateEmployee(HrEmployee emp) returns ValidationResult {
    string[] errors = [];

    if emp.emp_id.trim().length() == 0 {
        errors.push("Employee ID is required");
    }
    if emp.email.trim().length() == 0 {
        errors.push("Email is required");
    } else if !regex:matches(emp.email, "^[\\w.-]+@[\\w.-]+\\.\\w+$") {
        errors.push("Invalid email format");
    }
    if emp.annual_salary <= 0d {
        errors.push("Salary must be positive");
    }
    if emp.first_name.trim().length() == 0 || emp.last_name.trim().length() == 0 {
        errors.push("First name and last name are required");
    }

    return {
        isValid: errors.length() == 0,
        errors: errors,
        employee: emp
    };
}
```

## Step 4: Build the Enrichment Stage

```ballerina
// enrich.bal

// Simulated department lookup (replace with actual database or API call)
final map<Department> departmentLookup = {
    "ENG": {code: "ENG", name: "Engineering", defaultSystems: ["GitHub", "Jira", "AWS", "Slack"]},
    "MKT": {code: "MKT", name: "Marketing", defaultSystems: ["HubSpot", "Slack", "Google Analytics"]},
    "FIN": {code: "FIN", name: "Finance", defaultSystems: ["SAP", "Slack", "Excel Online"]},
    "HR":  {code: "HR",  name: "Human Resources", defaultSystems: ["Workday", "Slack", "BambooHR"]}
};

type EnrichedEmployee record {|
    HrEmployee employee;
    Department department;
|};

function enrichWithDepartment(HrEmployee emp) returns EnrichedEmployee|error {
    Department? dept = departmentLookup[emp.department_code];
    if dept is () {
        return error(string `Unknown department code: ${emp.department_code}`);
    }
    return {employee: emp, department: dept};
}
```

## Step 5: Build the Transformation Stage

```ballerina
// transform.bal
import ballerina/time;

function toPayrollEmployee(EnrichedEmployee enriched) returns PayrollEmployee|error {
    HrEmployee emp = enriched.employee;
    return {
        employeeId: emp.emp_id,
        fullName: string `${emp.first_name} ${emp.last_name}`,
        monthlySalary: emp.annual_salary / 12d,
        startDate: check convertDateFormat(emp.start_date),
        payFrequency: "semi-monthly",
        department: enriched.department.name
    };
}

function toItProvisionRequest(EnrichedEmployee enriched) returns ItProvisionRequest {
    HrEmployee emp = enriched.employee;
    return {
        userId: emp.emp_id.toLowerAscii(),
        displayName: string `${emp.first_name} ${emp.last_name}`,
        email: emp.email,
        department: enriched.department.name,
        role: emp.job_title,
        requiredSystems: enriched.department.defaultSystems,
        officeLocation: emp.office_location
    };
}

function toDirectoryEntry(EnrichedEmployee enriched) returns DirectoryEntry|error {
    HrEmployee emp = enriched.employee;
    return {
        id: emp.emp_id,
        name: string `${emp.first_name} ${emp.last_name}`,
        email: emp.email,
        title: emp.job_title,
        department: enriched.department.name,
        managerId: emp.manager_emp_id,
        location: emp.office_location
    };
}

function convertDateFormat(string mmddyyyy) returns string|error {
    // Convert "MM/DD/YYYY" to "YYYY-MM-DD"
    string[] parts = regex:split(mmddyyyy, "/");
    if parts.length() != 3 {
        return error(string `Invalid date format: ${mmddyyyy}`);
    }
    return string `${parts[2]}-${parts[0]}-${parts[1]}`;
}
```

## Step 6: Wire the Pipeline Together

```ballerina
// main.bal
import ballerina/http;
import ballerina/log;

configurable string payrollUrl = "http://localhost:8091";
configurable string itProvisionUrl = "http://localhost:8092";
configurable string directoryUrl = "http://localhost:8093";

final http:Client payrollClient = check new (payrollUrl);
final http:Client itClient = check new (itProvisionUrl);
final http:Client directoryClient = check new (directoryUrl);

type PipelineResult record {|
    string employeeId;
    string status;
    string[] completedStages;
    string[] errors;
|};

service /onboarding on new http:Listener(8090) {

    resource function post employees(HrEmployee employee) returns PipelineResult|error {
        string[] completedStages = [];
        string[] errors = [];

        // Stage 1: Validate
        ValidationResult validation = validateEmployee(employee);
        if !validation.isValid {
            return {
                employeeId: employee.emp_id,
                status: "failed",
                completedStages: [],
                errors: validation.errors
            };
        }
        completedStages.push("validation");

        // Stage 2: Enrich
        EnrichedEmployee enriched = check enrichWithDepartment(employee);
        completedStages.push("enrichment");

        // Stage 3: Transform and fan-out
        PayrollEmployee|error payrollData = toPayrollEmployee(enriched);
        if payrollData is PayrollEmployee {
            error? payrollResult = payrollClient->post("/employees", payrollData);
            if payrollResult is error {
                errors.push(string `Payroll sync failed: ${payrollResult.message()}`);
            } else {
                completedStages.push("payroll-sync");
            }
        }

        ItProvisionRequest itData = toItProvisionRequest(enriched);
        error? itResult = itClient->post("/provision", itData);
        if itResult is error {
            errors.push(string `IT provisioning failed: ${itResult.message()}`);
        } else {
            completedStages.push("it-provisioning");
        }

        DirectoryEntry|error dirData = toDirectoryEntry(enriched);
        if dirData is DirectoryEntry {
            error? dirResult = directoryClient->post("/entries", dirData);
            if dirResult is error {
                errors.push(string `Directory update failed: ${dirResult.message()}`);
            } else {
                completedStages.push("directory-update");
            }
        }

        string status = errors.length() == 0 ? "completed" : "partial";
        log:printInfo("Pipeline completed", employeeId = employee.emp_id, status = status);

        return {
            employeeId: employee.emp_id,
            status: status,
            completedStages: completedStages,
            errors: errors
        };
    }
}
```

## Step 7: Test the Pipeline

Run the project:

```bash
bal run
```

Send a test onboarding request:

```bash
curl -X POST http://localhost:8090/onboarding/employees \
  -H "Content-Type: application/json" \
  -d '{
    "emp_id": "EMP-2025-001",
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane.smith@company.com",
    "department_code": "ENG",
    "job_title": "Senior Developer",
    "start_date": "03/01/2025",
    "annual_salary": 120000.00,
    "manager_emp_id": "EMP-2024-050",
    "office_location": "San Francisco"
  }'
```

Test with invalid data to verify validation:

```bash
curl -X POST http://localhost:8090/onboarding/employees \
  -H "Content-Type: application/json" \
  -d '{
    "emp_id": "",
    "first_name": "",
    "last_name": "Smith",
    "email": "invalid-email",
    "department_code": "ENG",
    "job_title": "Developer",
    "start_date": "03/01/2025",
    "annual_salary": -5000,
    "office_location": "Remote"
  }'
```

## Extend It

- **Add a dead letter queue** -- Store failed transformations for manual review
- **Add idempotency** -- Prevent duplicate processing of the same employee
- **Add async processing** -- Use Kafka to decouple the pipeline stages
- **Add data masking** -- Mask sensitive fields like salary before logging

## What's Next

- [Data Mapper](../../develop/transform/data-mapper.md) -- Visual data mapping tool
- [AI-Assisted Mapping](../../develop/transform/ai-assisted-mapping.md) -- Use AI to generate transformations
- [Type System](../../develop/transform/type-system.md) -- Ballerina's type system for safe transformations
- [Content-Based Routing](content-based-routing.md) -- Route messages based on content
