---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up your AWS account and obtaining the credentials required to use the AWS Marketplace MPE connector.

## Prerequisites

- An active AWS account with an AWS Marketplace seller registration. If you do not have one, [sign up for an AWS account](https://aws.amazon.com/).
- At least one published product in AWS Marketplace with active customer subscriptions.

## Step 1: Create an IAM user or role

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to **IAM** (Identity and Access Management).
3. Click **Users** in the left sidebar, then **Create user**.
4. Enter a user name (e.g., `ballerina-mpe-connector`) and click **Next**.
5. Select **Attach policies directly**.
6. Search for and attach the **AWSMarketplaceEntitlementServiceFullAccess** managed policy (or create a custom policy granting `aws-marketplace:GetEntitlements`).
7. Click **Next**, review the settings, and click **Create user**.

For production workloads, consider using an IAM role with temporary credentials (STS) instead of long-lived access keys.

## Step 2: Generate access keys

1. In the IAM console, click on the user you just created.
2. Go to the **Security credentials** tab.
3. Under **Access keys**, click **Create access key**.
4. Select the **Application running outside AWS** use case and click **Next**.
5. Optionally add a description tag, then click **Create access key**.
6. Copy the **Access key ID** and **Secret access key**.

The secret access key is shown only once at creation time. Store it securely. Do not commit it to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply credentials at runtime.

## Step 3: Identify your AWS region

Determine the AWS region where your Marketplace product is registered. Common regions include:

- `us-east-1` (US East: N. Virginia)
- `us-west-2` (US West: Oregon)
- `eu-west-1` (Europe: Ireland)

You will need this region value when initializing the connector client.

AWS Marketplace Entitlement Service is available in most AWS regions. Ensure you use the region that matches your product's registration.

## Step 4: Obtain your product code

1. Log in to the [AWS Marketplace Management Portal](https://aws.amazon.com/marketplace/management/).
2. Navigate to **Products** and select your product.
3. Locate the **Product Code** in the product details: this is the identifier you will pass to the `getEntitlements` operation.
