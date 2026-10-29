---
title: Configure a Network Proxy for WSO2 Agent Builder
---

# Configure a Network Proxy for WSO2 Agent Builder

## Overview

In corporate environments, direct HTTP internet access is often restricted, with organizations preferring to route traffic through proxy servers. This guide helps you configure your system to access Ballerina Central even when working behind a proxy.

## Configure Proxy Settings

To enable operations with an HTTP proxy, modify the `<USER_HOME>/.ballerina/Settings.toml` file using this TOML syntax:

```toml
[proxy]
host = "HOST_NAME"
port = PORT
username = "PROXY_USERNAME"
password = "PROXY_PASSWORD"
```

For proxies without authentication requirements, leave the credentials blank:

```toml
[proxy]
host = "HOST_NAME"
port = PORT
username = ""
password = ""
```

## Add Necessary Certificates to the Truststore

If you encounter certificate validation errors like:

> "PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target."

Follow these steps:

1. Navigate to the `dependencies/` directory in your WSO2 Agent Builder installation (where the JRE is located):
   - macOS: `/Applications/WSO2 Agent Builder.app/Contents/components/dependencies`
   - Linux: `/usr/share/wso2-agent-builder/components/dependencies`
   - Windows: `%USERPROFILE%\AppData\Local\Programs\WSO2\Agent Builder\components\dependencies`
2. Identify proxy-associated certificates from your proxy vendor's documentation
3. Run this administrative command:

```bash
/bin/keytool -import -trustcacerts -file <CERTS_PATH> -alias <ALIAS_NAME> -keystore /lib/security/cacerts
```

## Configure CA Certificate Settings Via Environment Variables

Set CA certificate configurations system-wide using these environment variables:

```bash
BALLERINA_CA_BUNDLE # Path to the CA bundle file
BALLERINA_CA_PASSWORD # Password for the CA bundle file
BALLERINA_CA_CERT # Path to the CA certificate file
```

## Domain Access

Make sure the domains listed under [Domain access](restricted-networks.md#domain-access) are reachable through your proxy.
