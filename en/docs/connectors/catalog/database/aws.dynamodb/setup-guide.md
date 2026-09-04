---
connector: true
connector_name: "aws.dynamodb"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/aws.dynamodb connector."
---

# Setup Guide

This guide explains how to configure Amazon DynamoDB and obtain the AWS credentials required to use the connector.

## Prerequisites

- An active AWS account ([sign up at aws.amazon.com](https://aws.amazon.com/))
- Sufficient IAM permissions to create users, policies, and DynamoDB tables in your target region

## Create a DynamoDB table

You can create the table your application operates on either through the connector itself (using `createTable`) or ahead of time in the [DynamoDB console](https://console.aws.amazon.com/dynamodbv2).

A DynamoDB table is defined by its primary key, which is either a partition key alone or a partition key combined with a sort key. Every attribute named in the key schema must also appear in the attribute definitions. The billing mode can be set to `PAY_PER_REQUEST` (on-demand) or `PROVISIONED` (with explicit read and write capacity units).

:::note
If you create the table through the AWS console before running your Ballerina application, note the table name and region — you will need them when configuring the connector.
:::

## Obtain IAM user credentials

To generate an IAM access key, follow the [obtaining IAM user credentials](https://central.ballerina.io/ballerinax/aws/latest#obtaining-iam-user-credentials) guide on Ballerina Central.

Once you have a user, attach an IAM policy granting the DynamoDB permissions your application needs. The control-plane actions (creating and describing tables) and the data-plane actions (reading and writing items) are granted separately:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:CreateTable",
                "dynamodb:DescribeTable",
                "dynamodb:UpdateTable",
                "dynamodb:DeleteTable",
                "dynamodb:DescribeTimeToLive",
                "dynamodb:CreateBackup",
                "dynamodb:PutItem",
                "dynamodb:GetItem",
                "dynamodb:UpdateItem",
                "dynamodb:DeleteItem",
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:BatchGetItem",
                "dynamodb:BatchWriteItem"
            ],
            "Resource": "arn:aws:dynamodb:<REGION>:<ACCOUNT_ID>:table/<TABLE_NAME>"
        },
        {
            "Effect": "Allow",
            "Action": "dynamodb:DeleteBackup",
            "Resource": "arn:aws:dynamodb:<REGION>:<ACCOUNT_ID>:table/<TABLE_NAME>/backup/*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:ListTables",
                "dynamodb:DescribeLimits"
            ],
            "Resource": "*"
        }
    ]
}
```

:::note
`dynamodb:ListTables` and `dynamodb:DescribeLimits` are account-level actions and cannot be scoped to a table ARN — AWS denies them when the resource is anything other than `*`. Omit that statement entirely if your application calls neither operation.
:::

## Choose an authentication method

The connector supports multiple credential strategies. Use whichever matches your deployment environment:

- **Static credentials** — provide `accessKeyId` and `secretAccessKey` directly in the connection config.
- **AWS profile** — specify a `profileName` and optional `credentialsFilePath` to read credentials from a local AWS credentials file.
- **Default provider chain** — use `auth:DEFAULT_CREDENTIALS` to let the connector resolve credentials automatically from environment variables, EKS Pod Identity, ECS task roles, or EC2 instance profiles. This is the recommended approach for workloads running on AWS infrastructure.

## Next steps

- [Action Reference](actions.md) - Available operations