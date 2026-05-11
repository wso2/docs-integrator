---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up AWS IAM credentials and permissions required to use the AWS Marketplace Metering connector.

## Prerequisites

- An active AWS account with a product listed on [AWS Marketplace](https://aws.amazon.com/marketplace/).
- An IAM user or role with permissions to access the AWS Marketplace Metering Service.

## Step 1: Create an IAM user for metering API access

1. Sign in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to **IAM** > **Users** and click **Create user**.
3. Enter a user name (e.g., `marketplace-metering-user`).
4. Select **Attach policies directly** and attach the following managed policy:
    - **AWSMarketplaceMeteringFullAccess**
5. Complete the user creation wizard.

For production workloads, consider using an IAM role with temporary credentials (AWS STS) instead of long-lived access keys.

## Step 2: Generate access keys

1. In the IAM console, select the user you created.
2. Go to the **Security credentials** tab.
3. Under **Access keys**, click **Create access key**.
4. Select **Application running outside AWS** as the use case.
5. Copy the **Access key ID** and **Secret access key**.

Store the access key ID and secret access key securely. The secret access key is shown only once at creation time. Use Ballerina's `configurable` feature and a `Config.toml` file to supply credentials at runtime.

## Step 3: Verify your AWS marketplace product

1. Ensure your SaaS product is listed and active on AWS Marketplace.
2. Note your **Product Code**; you will need it when calling `batchMeterUsage`.
3. Confirm the metering dimensions configured for your product match the dimension
   strings you plan to submit in usage records.

The `resolveCustomer` operation requires a valid registration token, which is provided by AWS Marketplace when a customer subscribes to your SaaS product and is redirected to your registration URL.
