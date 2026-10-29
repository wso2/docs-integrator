---
title: Setup Guide
---

# Setup Guide

This guide walks you through the details the AuthZEN connector needs from your Policy Decision Point (PDP): its URL, the credentials it expects, and the APIs it supports.

## Prerequisites

- Access to a PDP that implements the AuthZEN Authorization API 1.0

To try the connector without a PDP of your own, use one of the public PDPs of the [AuthZEN interoperability tests](https://authzen-interop.net), such as `https://authzen-proxy-demo.cerbos.dev`, which needs no credentials.

## Step 1: Get the PDP URL

The connector takes the PDP URL, which is the PDP's `policy_decision_point` identifier. It is usually the base URL of the authorization service, for example `https://pdp.example.com`, or, for a PDP that serves several tenants, a URL with a path, such as `https://pdp.example.com/tenant1`. Check your authorization product's documentation for its AuthZEN URL.

The connector calls the AuthZEN endpoints under this URL:

| API | Endpoint | Operation |
|-----|----------|-----------|
| Access Evaluation | `<PDP URL>/access/v1/evaluation` | `evaluate` |
| Access Evaluations | `<PDP URL>/access/v1/evaluations` | `evaluateBatch` |
| Subject Search | `<PDP URL>/access/v1/search/subject` | `searchSubjects` |
| Resource Search | `<PDP URL>/access/v1/search/resource` | `searchResources` |
| Action Search | `<PDP URL>/access/v1/search/action` | `searchActions` |

## Step 2: Get the credentials your PDP expects

AuthZEN leaves the authentication of the PEP to the PDP and recommends OAuth 2.0. Find out which method your PDP uses, and get its credentials from your PDP administrator or your authorization product's console:

| Method | What you need | Connection setting |
|--------|---------------|--------------------|
| OAuth 2.0 client credentials | Token URL, client ID and client secret | `auth: {tokenUrl, clientId, clientSecret}` |
| Bearer token | An access token | `auth: {token}` |
| API key | The key, and the header it goes in if it isn't `Authorization` | `auth: {apiKey, headerName}` |
| Basic auth | Username and password | `auth: {username, password}` |
| Mutual TLS | Client certificate and key | `secureSocket` |
| None | Nothing; some PDPs, such as local development servers, don't authenticate their callers | Leave `auth` unset |

For an API key in the `Authorization` header, set `apiKey` to the full header value the PDP expects, including its scheme, for example `Basic <key>`.

## Step 3: Check which APIs your PDP supports

Every AuthZEN PDP supports the Access Evaluation API. The batch and search APIs are optional. Many PDPs publish metadata that lists the APIs they support:

```bash
curl https://pdp.example.com/.well-known/authzen-configuration
```

For a PDP URL with a path, the well-known segment goes between the host and the path, for example `https://pdp.example.com/.well-known/authzen-configuration/tenant1`. A response like the following lists the endpoint of each supported API. An API whose endpoint is missing isn't supported.

```json
{
  "policy_decision_point": "https://pdp.example.com",
  "access_evaluation_endpoint": "https://pdp.example.com/access/v1/evaluation",
  "access_evaluations_endpoint": "https://pdp.example.com/access/v1/evaluations",
  "search_subject_endpoint": "https://pdp.example.com/access/v1/search/subject",
  "search_resource_endpoint": "https://pdp.example.com/access/v1/search/resource",
  "search_action_endpoint": "https://pdp.example.com/access/v1/search/action"
}
```

If the PDP serves an API at a different URL than the default endpoint, set `discoverEndpoints` to `true` in the connection config so the connector uses the URLs from the metadata.

## Next steps

- [Actions](actions.md): explore all the operations of the connector
- [Example](example.md): build an integration that checks access with the connector
