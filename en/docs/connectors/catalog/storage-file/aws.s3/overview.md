---
connector: true
connector_name: "aws.s3"
title: "Overview"
description: "Overview of the ballerinax/aws.s3 connector for WSO2 Integrator."
---

# AWS S3

Amazon S3 (Simple Storage Service) is a highly scalable, durable, and secure object storage service provided by Amazon Web Services. The AWS S3 connector provides programmatic access to the Amazon S3 REST API (`2006-03-01`), enabling you to create and manage buckets, upload and retrieve objects, generate presigned URLs, and perform multipart uploads directly from your integration flows.

## Key Features

- Create, list, and delete S3 buckets with configurable ACL and object ownership policies
- Upload objects from strings, JSON, XML, byte arrays, record types, or byte streams with configurable metadata, ACL, and storage class
- Retrieve objects with automatic type binding, conditional retrieval (ETag, modification time), and byte-range support
- List bucket objects with prefix filtering, delimiter grouping, pagination, and owner information
- Delete objects with optional version ID support for versioned buckets
- Generate presigned URLs for secure, time-limited object access or upload without exposing credentials
- Manage multipart uploads: initiate, upload parts individually, complete, or abort large object uploads
- Copy objects between buckets and retrieve object metadata without downloading content
- Flexible authentication using any standard credential source supported by AWS

## Actions

The AWS S3 connector exposes all operations through a single client for bucket management, object storage, presigned URLs, and multipart uploads.

| Client | Actions |
|--------|---------|
| `Client` | Bucket management, object CRUD, presigned URLs, multipart uploads, object metadata |

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating an AWS IAM user and obtaining the access credentials required to use the AWS S3 connector.

* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AWS S3** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS S3 Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.s3)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
