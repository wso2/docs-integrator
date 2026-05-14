---
title: Setup Guide
---

# Setup Guide

This guide walks you through creating an Amazon Redshift cluster and obtaining the JDBC connection URL required to use the AWS Redshift connector.

## Prerequisites

- An active AWS account. If you do not have one, [sign up for a free account](https://aws.amazon.com/free/).

## Step 1: Log in to the AWS Console

Access the [AWS Management Console](https://console.aws.amazon.com/).

## Step 2: Navigate to Amazon Redshift and create a cluster

1. In the AWS Management Console, search for **Redshift** in the services search bar and select it.

   ![Navigate to Redshift](/img/connectors/catalog/database/aws.redshift/setup/create-cluster-1.png)

2. Select **Create cluster** to start creating a new cluster.

   ![Create cluster](/img/connectors/catalog/database/aws.redshift/setup/create-cluster-2.png)

## Step 3: Configure cluster settings

1. Configure the cluster identifier, database name, and credentials.

   ![Basic configuration](/img/connectors/catalog/database/aws.redshift/setup/basic-configs.png)

2. Configure security groups to control inbound and outbound traffic to your Redshift cluster.

   ![Security configuration](/img/connectors/catalog/database/aws.redshift/setup/security-configs.png)

3. Record the username and password you set during cluster configuration — you will need them to authenticate.

   ![Record credentials](/img/connectors/catalog/database/aws.redshift/setup/credentials.png)

4. Review your settings and select **Create cluster**.

Store the admin username and password securely. Do not commit them to source control. Use Ballerina's `configurable` feature and a `Config.toml` file to supply them at runtime.

## Step 4: Wait for cluster availability

1. Monitor the cluster status in the AWS Console until it shows as **Available**.

   ![Cluster availability](/img/connectors/catalog/database/aws.redshift/setup/availability.png)

2. Once the cluster is available, copy the **JDBC URL** from the cluster details. It follows this format:

   ```
   jdbc:redshift://<cluster-endpoint>:5439/<database-name>
   ```

   ![Copy JDBC URL](/img/connectors/catalog/database/aws.redshift/setup/jdbc-url.png)

Cluster creation may take several minutes. The JDBC URL is only available after the cluster status becomes **Available**.
