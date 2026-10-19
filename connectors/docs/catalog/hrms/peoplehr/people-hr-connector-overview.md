---
title: Overview
---

# Overview

People HR is a cloud-based human resource management system that provides tools for managing employee records, holidays, salaries, vacancies, applicants, appraisals, and custom screens. The Ballerina `ballerinax/peoplehr` connector (v2.2.1) provides programmatic access to the People HR REST API (v3.1), enabling you to integrate People HR data into your Ballerina integration flows.

## Key features

- Full employee lifecycle management: create, retrieve, update, and mark employees as leavers
- Holiday management: add, retrieve, and delete employee holiday records
- Salary detail retrieval with optional history
- Vacancy and applicant management: create vacancies, list all vacancies, create applicants, upload documents, and check for duplicates
- Custom screen transaction support: add, update, delete, and retrieve employee custom screen details
- Appraisal detail retrieval by employee ID or appraisal ID
- Saved query execution by query name for flexible data retrieval
- Authentication verification for validating user credentials

## Actions

Actions are operations you invoke on People HR from your integration, including managing employees, holidays, salaries, vacancies, applicants, custom screens, and more. The People HR connector exposes actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Employee CRUD, holiday management, salary details, vacancy and applicant management, custom screens, appraisals, queries, authentication |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating a People HR account and obtaining the API key required to use the People HR connector.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **People HR** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [People HR Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-peoplehr)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
