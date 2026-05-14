---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up an AWS account and obtaining the credentials required to use the AWS SNS connector.

## Step 1: Create an AWS account

If you don't already have an AWS account, visit the [AWS Management Console](https://console.aws.amazon.com/console/home), select **Create a new AWS Account**, and complete the registration process.

## Step 2: Get the access key ID and the secret access key

After logging into your AWS account, create a user group and IAM user with SNS permissions.

### Create an AWS user group

1. Navigate to the **Identity and Access Management (IAM)** service.
2. Select **Groups**, then **Create New Group**.

   ![Create user group](/img/connectors/catalog/communication/aws-sns/setup/create-group.png)

3. Enter a group name and attach the necessary policies (for example, **AmazonSNSFullAccess** for full SNS access).

   ![Attach policy](/img/connectors/catalog/communication/aws-sns/setup/create-group-policies.png)

### Create an IAM user

1. In the IAM console, navigate to **Users** and select **Add user**.

   ![Add user](/img/connectors/catalog/communication/aws-sns/setup/create-user.png)

2. Enter a username and select **Provide user access to the AWS Management Console** (optional). Then select **I want to create an IAM user** for programmatic access through access keys.

   ![Create IAM user](/img/connectors/catalog/communication/aws-sns/setup/create-user-iam-user.png)

3. Complete the permission setup and add the user to the group you created.

   ![Attach user group](/img/connectors/catalog/communication/aws-sns/setup/create-user-set-permission.png)

4. Review the details and select **Create user**.

   ![Review user](/img/connectors/catalog/communication/aws-sns/setup/create-user-review.png)

### Generate access key ID and secret access key

1. After user creation, navigate to the **Users** tab and select your new user.

   ![View user](/img/connectors/catalog/communication/aws-sns/setup/view-user.png)

2. Select **Create access key** to generate credentials.

   ![Create access key](/img/connectors/catalog/communication/aws-sns/setup/create-access-key.png)

3. Follow the steps and download the CSV file containing your credentials.

   ![Download credentials](/img/connectors/catalog/communication/aws-sns/setup/download-access-key.png)
