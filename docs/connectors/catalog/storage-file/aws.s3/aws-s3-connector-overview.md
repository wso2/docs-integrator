# AWS S3 Connector Overview

Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. The Ballerina `ballerinax/aws.s3` connector (v4.0.0) provides programmatic access to the Amazon S3 REST API (2006-03-01), enabling you to manage buckets and objects directly from your Ballerina integration flows.

## Key features

- Create (with optional canned ACL policies), list, and delete S3 buckets
- Upload objects from strings, JSON, XML, byte arrays, or byte streams with configurable metadata and ACL
- Retrieve objects as byte streams with conditional retrieval (`If-Match`/`If-None-Match`, `If-Modified-Since`/`If-Unmodified-Since`) and byte-range support
- List objects in a bucket with prefix filtering, delimiter grouping, pagination, max-keys limits, start-after offsets, response encoding, and owner information
- Delete objects with optional version ID support for versioned buckets
- Generate presigned URLs for secure, time-limited object retrieval or creation without sharing credentials
- Multipart upload support — initiate, upload parts, complete, or abort large object uploads

## Actions

Actions are operations you invoke on AWS S3 from your integration — creating buckets, uploading and downloading objects, generating presigned URLs, and performing multipart uploads. The AWS S3 connector exposes all actions through a single client:

| Client | Actions |
|--------|---------|
| `Client` | Bucket management, object CRUD, presigned URLs, multipart uploads |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through creating an AWS account and obtaining the access credentials required to use the AWS S3 connector.

* **[Action Reference](actions.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AWS S3** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS S3 Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.s3)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
