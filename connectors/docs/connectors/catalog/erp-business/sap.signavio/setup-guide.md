---
title: Setup Guide
---

# Setup Guide

This guide walks you through getting the details the connector needs to authenticate and communicate with your SAP Signavio workspace.

## Sign in to SAP Signavio

Sign in to your [SAP Signavio](https://www.signavio.com/) workspace and note the region your tenant is hosted in — `au`, `ca`, `eu`, `jp`, `kr`, `sgp`, or `us`. The region determines the hostnames the connector connects to.

## Have your account credentials ready

The connector authenticates with your SAP Signavio user name (typically an email address) and password.

If your account belongs to more than one workspace, you'll also need the workspace's tenant identifier.

The SIGNAL Engine OData operations (`getServiceDocument`, `getMetadata`, `queryEntitySet`) are the one exception — SAP Signavio authenticates these with a dedicated OData API access token rather than your account password, since that token can't be derived automatically. Generate one from the SAP Signavio UI if you need those operations.

## Next steps

- [Action Reference](action-reference.md) - Available operations
