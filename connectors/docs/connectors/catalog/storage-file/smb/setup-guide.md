---
title: Setup Guide
---

# Setup Guide

Before connecting to an SMB share, ensure the server is accessible and you have valid credentials configured.

## Prerequisites

- An accessible SMB file server (Windows Server, NAS appliance, or Samba host) reachable over TCP port 445
- A configured SMB share on the server that your account has permission to access
- Either NTLMv2 credentials (username, password, and domain) or a Kerberos principal and keytab file

## Configure NTLMv2 credentials

NTLMv2 is the default authentication method for most Windows and Samba environments.

1. Identify the Windows domain or workgroup name. If no domain is in use, the domain is typically `WORKGROUP`.
2. Create or locate a user account that has read/write access to the target share.
3. Note the username, password, and domain — these map directly to the `credentials` field in the connector configuration.

Domain-joined environments use the Active Directory domain name (e.g., `CORP`). Standalone Samba servers often use `WORKGROUP` or the server's own name.

## Configure Kerberos authentication

Kerberos authentication is used in domain environments that require stronger mutual authentication.

1. Obtain a Kerberos principal in `user@REALM` format (e.g., `alice@EXAMPLE.COM`) from your domain administrator.
2. Request a keytab file for the principal, or confirm you can authenticate with a password.
3. Locate the Kerberos configuration file (`krb5.conf`) on the machine that will run the connector — typically at `/etc/krb5.conf` on Linux.
4. Ensure the machine's clock is synchronized with the domain controller (Kerberos requires clocks to be within 5 minutes of each other).

## Identify the share name and path

All paths used by the connector are relative to the configured share root.

1. Connect to the server with a file explorer or `smbclient` to confirm the share exists and is accessible.
2. Note the exact share name (e.g., `reports`) and the subdirectory paths you will read from or write to.

Use `smbclient -L //<server> -U <username>` to list available shares on a server.

## Next steps

- [Action Reference](action-reference.md) - Available operations
- [Trigger Reference](trigger-reference.md) - Event-driven integration
