---
title: Setup Guide
---

# Setup Guide

This guide walks you through configuring your email server credentials and settings required to use the Email connector.

## Prerequisites

- An email account with SMTP, IMAP, or POP3 access enabled (e.g., Gmail, Outlook, or a custom mail server).

## Enable IMAP/POP3 access (Gmail example)

1. Log in to your Gmail account.
2. Select the gear icon in the top-right corner, then select **See all settings**.
3. Navigate to the **Forwarding and POP/IMAP** tab.
4. Under **IMAP access**, select **Enable IMAP**.
5. Under **POP download**, select **Enable POP for all mail** (if POP3 access is needed).
6. Click **Save Changes**.

If you are using a different email provider, consult their documentation for enabling IMAP/POP3 access.

## Generate an app password (Gmail example)

If your account has two-factor authentication enabled, you need an App Password instead of your regular password:

1. Go to your Google Account at [myaccount.google.com](https://myaccount.google.com).
2. Navigate to **Security** > **2-Step Verification** > **App passwords**.
3. Select **Mail** as the app and your device type.
4. Select **Generate**.
5. Copy the 16-character App Password displayed.

Store the App Password securely. Do not commit it to source control.
Use Ballerina's `configurable` feature and a `Config.toml` file to supply credentials at runtime.

## Note your email server settings

Record the following server details for your email provider:

| Protocol | Server Host | Default SSL Port |
|----------|-------------|------------------|
| SMTP     | `smtp.gmail.com` | `465` |
| IMAP     | `imap.gmail.com` | `993` |
| POP3     | `pop.gmail.com`  | `995` |

For other providers, consult their SMTP/IMAP/POP3 server documentation for the correct host and port values.

The default port values in the connector match standard SSL ports (SMTP: 465, IMAP: 993, POP3: 995). If your server uses STARTTLS, you may need to change the port and security settings accordingly.

## What's next

- [Action reference](action-reference.md): Available operations
- [Trigger reference](trigger-reference.md): Event-driven integration
