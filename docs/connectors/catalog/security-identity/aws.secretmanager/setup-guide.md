---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up AWS IAM credentials with the necessary permissions to access AWS Secrets Manager.

## Prerequisites

- An active AWS account. If you do not have one, [sign up for an AWS account](https://aws.amazon.com/free/).
- At least one secret stored in AWS Secrets Manager in your target region.

## Step 1: Create an IAM user for programmatic access

1. Sign in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to **IAM** (Identity and Access Management).
3. In the left sidebar, click **Users**, then click **Create user**.
4. Enter a **User name** (e.g., `ballerina-secrets-connector`).
5. Click **Next**.

## Step 2: Attach permissions for secrets manager

1. On the **Set permissions** page, select **Attach policies directly**.
2. Search for and select the **SecretsManagerReadWrite** managed policy, or create a custom policy with the minimum required permissions:
    - `secretsmanager:DescribeSecret`
    - `secretsmanager:GetSecretValue`
    - `secretsmanager:BatchGetSecretValue`
3. Click **Next**, review the configuration, and click **Create user**.

For production use, follow the principle of least privilege and grant only the specific permissions your integration requires.

## Step 3: Generate access keys

1. From the **Users** list, click on the user you just created.
2. Go to the **Security credentials** tab.
3. Under **Access keys**, click **Create access key**.
4. Select **Application running outside AWS** as the use case.
5. Click **Next**, then **Create access key**.
6. Copy the **Access key ID** and **Secret access key**.

The secret access key is shown only once. Store it securely immediately. If lost, you must create a new access key pair.

Use Ballerina's `configurable` feature and a `Config.toml` file to supply credentials at runtime. Never commit credentials to source control.

## Step 4: Identify your AWS region

Determine the AWS region where your secrets are stored. You can find this in the AWS Console
by checking the region selector in the top-right corner, or by looking at your secret's ARN
(e.g., `arn:aws:secretsmanager:us-east-1:123456789012:secret:MySecret-AbCdEf`).

Common regions include:
- `US_EAST_1` (N. Virginia)
- `US_WEST_2` (Oregon)
- `EU_WEST_1` (Ireland)
- `AP_SOUTHEAST_1` (Singapore)

## Step 5: Alternative: use EC2 IAM role or default credentials

If your Ballerina application runs on an EC2 instance or another AWS compute service, you
can use IAM role-based authentication instead of static access keys:

1. Create an IAM role with the required Secrets Manager permissions.
2. Attach the role to your EC2 instance (or ECS task, Lambda function, etc.).
3. Use `EC2_IAM_ROLE` or `DEFAULT_CREDENTIALS` as the `auth` value when initializing the connector, with no access keys needed.

IAM role-based auth and default credentials are recommended for production workloads running on AWS, as they eliminate the need to manage static credentials.
