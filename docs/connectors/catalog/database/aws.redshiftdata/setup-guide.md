---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an IAM user, obtaining access keys, and setting up an Amazon Redshift cluster for use with the AWS Redshift data connector.

## Prerequisites

- An active AWS account. If you do not have one, [sign up for a free account](https://aws.amazon.com/free/).

## Step 1: Log in to the AWS Console

Access the [AWS Management Console](https://console.aws.amazon.com/).

## Step 2: Create an IAM user

1. In the AWS Management Console, search for **IAM** in the services search bar and select it.

   ![Search IAM](/img/connectors/catalog/database/aws.redshiftdata/setup/create-user-1.png)

2. Select **Users** in the left navigation pane.

   ![Select Users](/img/connectors/catalog/database/aws.redshiftdata/setup/create-user-2.png)

3. Select **Create user**.

   ![Create user](/img/connectors/catalog/database/aws.redshiftdata/setup/create-user-3.png)

4. Enter a suitable **User name** and select **Next**.

   ![Specify user details](/img/connectors/catalog/database/aws.redshiftdata/setup/specify-user-details.png)

5. Add the required permissions by adding the user to a group, copying permissions, or attaching policies directly (for example, **AmazonRedshiftDataFullAccess**). Select **Next**.

   ![Set user permissions](/img/connectors/catalog/database/aws.redshiftdata/setup/set-user-permissions.png)

6. Review the details and select **Create user**.

   ![Review and create user](/img/connectors/catalog/database/aws.redshiftdata/setup/review-create-user.png)

## Step 3: Get the access key ID and secret access key

1. Select the user you just created from the **Users** list.

   ![Select user](/img/connectors/catalog/database/aws.redshiftdata/setup/users.png)

2. Go to the **Security credentials** tab and select **Create access key**.

   ![Create access key](/img/connectors/catalog/database/aws.redshiftdata/setup/create-access-key-1.png)

3. Select your use case and select **Next**.

   ![Select use case](/img/connectors/catalog/database/aws.redshiftdata/setup/select-usecase.png)

4. Copy the **Access key ID** and **Secret access key**. Use these credentials to authenticate your integration.

   ![Retrieve access key](/img/connectors/catalog/database/aws.redshiftdata/setup/retrieve-access-key.png)

The secret access key is shown only once. Copy both values immediately or download the CSV file. If lost, you must create a new access key pair.

## Step 4: Set up a Redshift cluster

### Navigate to Amazon Redshift and create a cluster

1. In the AWS Management Console, search for **Redshift** and select it.

   ![Navigate to Redshift](/img/connectors/catalog/database/aws.redshiftdata/setup/create-cluster-1.png)

2. Select **Create cluster** to start creating a new cluster.

   ![Create cluster](/img/connectors/catalog/database/aws.redshiftdata/setup/create-cluster-2.png)

### Configure cluster settings

1. Configure the cluster identifier, database name, credentials, and other relevant parameters.

   ![Configure cluster](/img/connectors/catalog/database/aws.redshiftdata/setup/configure-cluster-1.png)

2. Configure security groups to control inbound and outbound traffic to your Redshift cluster.

   ![Configure security groups](/img/connectors/catalog/database/aws.redshiftdata/setup/configure-security-groups.png)

3. Record the database username set during cluster configuration — it will be used to authenticate your integration.

   ![Database configuration](/img/connectors/catalog/database/aws.redshiftdata/setup/database-configurations.png)

4. Review your settings and select **Create cluster**.

### Wait for cluster availability

Monitor the cluster status in the AWS Console until it shows as **Available**.

![Wait for availability](/img/connectors/catalog/database/aws.redshiftdata/setup/wait-for-availability.png)

Amazon Redshift also offers a serverless option that scales automatically without managing infrastructure. To configure Redshift Serverless, see the [AWS documentation](https://docs.aws.amazon.com/redshift/latest/gsg/new-user-serverless.html).
