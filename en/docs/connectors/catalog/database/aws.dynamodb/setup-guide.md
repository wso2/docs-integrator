---
connector: true
connector_name: "aws.dynamodb"
title: "Setup Guide"
description: "How to set up and configure the ballerinax/aws.dynamodb connector."
---

# Setup Guide

This guide walks you through setting up your AWS account and obtaining the credentials required to use the AWS DynamoDB connector.

## Prerequisites

- An active AWS account ([sign up at aws.amazon.com](https://aws.amazon.com/))
- Sufficient IAM permissions to create users, policies, and DynamoDB tables in your target region

## Step 1: Create a DynamoDB table

You can create the table your application operates on either through the connector itself (using `createTable`) or ahead of time in the [DynamoDB console](https://console.aws.amazon.com/dynamodbv2).

A DynamoDB table is defined by its primary key, which is either a partition key alone or a partition key combined with a sort key. Every attribute named in the key schema must also appear in the attribute definitions. The billing mode can be set to `PAY_PER_REQUEST` (on-demand) or `PROVISIONED` (with explicit read and write capacity units).

:::note
If you create the table through the AWS console before running your Ballerina application, note the table name and region — you will need them when configuring the connector.
:::

## Step 2: Create an IAM user

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to **IAM** (Identity and Access Management).
3. Select **Users** in the left sidebar, then select **Create user**.
4. Enter a user name (for example, `ballerina-dynamodb-connector`) and select **Next**.
5. Select **Attach policies directly**.
6. Select **Create policy**, open the **JSON** tab, and paste the policy below, then attach it. Replace `<REGION>`, `<ACCOUNT_ID>`, and `<TABLE_NAME>` with the values for your table, or use `table/*` to grant access to every table in the account.

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

   `dynamodb:ListTables` and `dynamodb:DescribeLimits` are account-level actions and cannot be scoped to a table ARN, so they stay in their own statement scoped to `*`; omit that statement entirely if your application calls neither operation. `dynamodb:DeleteBackup` is scoped to the backup resource rather than the table, which is why it needs a statement of its own.

7. Select **Next**, review the settings, and select **Create user**.

:::note
For a screenshot-by-screenshot walkthrough of the IAM user creation and access key generation steps, see the [AWS SQS setup guide](../../messaging/aws.sqs/setup-guide.md). The console flow is identical, only the attached policy differs.
:::

:::tip
For production workloads, consider using an IAM role with temporary credentials via AWS STS instead of long-lived access keys.
:::

## Step 3: Generate access keys

1. In the IAM console, select the user you created.
2. Go to the **Security credentials** tab.
3. Under **Access keys**, select **Create access key**.
4. Select the **Application running outside AWS** use case and select **Next**.
5. Optionally add a description tag, then select **Create access key**.
6. Copy the **Access key ID** and **Secret access key**.

:::warning
The secret access key is shown only once at creation time. Store it securely and do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply credentials at runtime.
:::

## Step 4: Choose an authentication method

The connector supports multiple credential strategies. Use whichever matches your deployment environment:

- **Static credentials** — provide `accessKeyId` and `secretAccessKey` directly in the connection config.
- **AWS profile** — specify a `profileName` and optional `credentialsFilePath` to read credentials from a local AWS credentials file.
- **Default provider chain** — use `auth:DEFAULT_CREDENTIALS` to let the connector resolve credentials automatically from environment variables, EKS Pod Identity, ECS task roles, or EC2 instance profiles. This is the recommended approach for workloads running on AWS infrastructure.

## Next steps

- [Action Reference](actions.md) - Available operations
