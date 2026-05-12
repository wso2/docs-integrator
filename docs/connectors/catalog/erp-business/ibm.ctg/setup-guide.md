---
title: Setup Guide
---

# Setup Guide

This guide walks you through the server-side configuration required to connect the IBM CTG connector to your IBM CICS Transaction Gateway and CICS server.

## Prerequisites

- Access to an IBM CICS Transaction Gateway (CTG) server (v9.3 or compatible). Contact your IBM system administrator or refer to the [IBM CTG documentation](https://www.ibm.com/docs/en/cics-tg-multi) for installation and licensing details.
- IBM CTG Java client libraries (`ctgclient-9.3.jar`, `ccf2-9.3.jar`, `cicsjee-9.3.jar`) sourced from your IBM CTG installation: these proprietary JARs must be provided separately and are not distributed with the connector.
- A CICS user ID and password with permission to execute the target CICS programs on the CICS server.

## Step 1: Identify the CTG gateway host and port

Obtain the hostname or IP address and port number of your IBM CICS Transaction Gateway daemon:

1. Contact your IBM system administrator or check the CTG server configuration files (typically `ctg.ini` or equivalent).
2. The default port for CTG is `2006` (non-SSL) or `8050` (SSL). Confirm the port configured for your environment.
3. Verify network connectivity from your integration host to the CTG gateway host and port.

The CTG gateway host and port are set by your IBM system administrator in the CTG gateway configuration file. Ensure that firewall rules allow inbound connections on the configured port from your integration host.

## Step 2: Identify the CICS server name

The CICS server name is the logical name of the CICS region registered with the CTG gateway:

1. Ask your IBM CICS administrator for the CICS server name (also referred to as the CICS region name or APPLID) that is registered in the CTG configuration.
2. In the CTG gateway configuration file (`ctg.ini`), this value appears under the `[Server]` section as the `Name` parameter.
3. Note this value; it is required as the `cicsServer` parameter in the connector configuration.

## Step 3: Set up CICS user credentials

The connector authenticates with the CICS server using a CICS user ID and password:

1. Work with your CICS security administrator to obtain or create a CICS user ID that has permission to execute the target CICS programs.
2. The user ID must be defined in the CICS External Security Manager (ESM), such as RACF, CA ACF2, or CA Top Secret.
3. Ensure the user has the appropriate transaction-level security access for each CICS program you intend to invoke.

Use a dedicated service account user ID for integration purposes rather than a personal user ID. Store the credentials securely and do not commit them to source control.

## Step 4: Configure SSL (optional)

If your CTG gateway is configured to require SSL/TLS connections, prepare the following:

1. Obtain the SSL keyring file (e.g., a `.kdb` file) from your IBM security administrator.
2. Note the full path to the keyring file; this is the `sslKeyring` value.
3. If the keyring is password-protected, note the password; this is the `sslkeyringPassword` value.
4. If specific cipher suites are required by your security policy, obtain the list from your administrator.
5. Confirm with your administrator that the CTG gateway is configured to accept SSL connections on the appropriate port.

SSL configuration requires the CTG gateway to be set up with matching SSL certificates on the server side. Consult your IBM CTG documentation for server-side SSL configuration details.

## Step 5: Obtain IBM CTG Java client libraries

The connector requires proprietary IBM CTG Java libraries that are not redistributed with the connector package:

1. Locate the following JAR files in your IBM CTG installation directory (typically under `<CTG_INSTALL>/classes/`):
   - `ctgclient-9.3.jar`
   - `ccf2-9.3.jar`
   - `cicsjee-9.3.jar`
2. Copy these JARs to the `libs/` directory of your Ballerina project before building.

These JAR files are proprietary IBM software covered by the IBM license agreement. Do not redistribute them or include them in public source code repositories.
