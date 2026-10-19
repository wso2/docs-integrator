---
title: Setup Guide
---

# Setup Guide

This guide walks you through setting up a JMS broker and obtaining the connection details required to use the JMS connector.

## Prerequisites

- A JMS-compliant message broker (e.g., [Apache ActiveMQ](https://activemq.apache.org/)) installed and running.
- The broker's JNDI initial context factory class name and provider URL.

## Step 1: Install and start the JMS broker

1. Download and install a JMS-compliant broker such as [Apache ActiveMQ](https://activemq.apache.org/components/classic/download/).
2. Extract the downloaded archive to a directory of your choice.
3. Start the broker:
   - **Linux/macOS**: Run `./bin/activemq start` from the installation directory.
   - **Windows**: Run `bin\activemq.bat start` from the installation directory.
4. Verify the broker is running by accessing the admin console (e.g., `http://localhost:8161/admin` for ActiveMQ, default credentials: `admin`/`admin`).

The default ActiveMQ provider URL is `tcp://localhost:61616`. Adjust the host and port if your broker runs on a different address.

## Step 2: Identify connection parameters

Gather the following connection details from your broker setup:

- **Initial Context Factory**: The JNDI initial context factory class for your broker. For ActiveMQ, this is `org.apache.activemq.jndi.ActiveMQInitialContextFactory`.
- **Provider URL**: The broker's connection endpoint (e.g., `tcp://localhost:61616` for ActiveMQ).
- **Connection Factory Name**: The JNDI name of the connection factory. The default is `ConnectionFactory`.
- **Credentials** (if applicable): The username and password for broker authentication.

Consult your broker's documentation for the correct initial context factory class and provider URL format.

## Step 3: Create queues and topics

1. Log in to your broker's admin console.
2. Create the queues and/or topics your application will use.
   - For ActiveMQ: Navigate to **Queues** or **Topics** in the admin console and enter the destination name.
3. Note the exact destination names; you will reference them in your Ballerina code.

Some brokers auto-create destinations on first use. Check your broker's configuration if you prefer to pre-create destinations.
