---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up your AWS account and obtaining the credentials required to use the AWS Marketplace Entitlement Service connector.

## Prerequisites

- An active AWS account registered as a seller in the [AWS Marketplace Management Portal](https://aws.amazon.com/marketplace/management/)
- At least one published product in AWS Marketplace with an entitlement-based pricing model (SaaS Contract) and active customer subscriptions

## Step 1: Create an IAM user

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to **IAM** (Identity and Access Management).
3. Select **Users** in the left sidebar, then select **Create user**.
4. Enter a user name (for example, `ballerina-mpe-connector`) and select **Next**.
5. Select **Attach policies directly**.
6. Search for and attach the **AWSMarketplaceGetEntitlements** managed policy, or create a custom policy granting `aws-marketplace:GetEntitlements`.
7. Select **Next**, review the settings, and select **Create user**.

For a screenshot-by-screenshot walkthrough of the IAM user creation and access key generation steps, see the [AWS SQS setup guide](../../messaging/aws.sqs/setup-guide.md). The console flow is identical, only the attached policy differs.

For production workloads, consider using an IAM role with temporary credentials via AWS STS instead of long-lived access keys.

## Step 2: Generate access keys

1. In the IAM console, select the user you created.
2. Go to the **Security credentials** tab.
3. Under **Access keys**, select **Create access key**.
4. Select the **Application running outside AWS** use case and select **Next**.
5. Optionally add a description tag, then select **Create access key**.
6. Copy the **Access key ID** and **Secret access key**.

The secret access key is shown only once at creation time. Store it securely and do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply credentials at runtime.

## Step 3: Identify your AWS region

Determine the AWS region where your Marketplace product is registered. Common region include:

- `aws:US_EAST_1` (US East: N. Virginia)

AWS Marketplace Entitlement Service is available in most AWS regions.

## Step 4: Obtain your product code

1. Log in to the [AWS Marketplace Management Portal](https://aws.amazon.com/marketplace/management/).
2. Navigate to **Products** and select your product.
3. Locate the **Product Code** in the product details — this is the identifier you pass to the `getEntitlements` operation.
