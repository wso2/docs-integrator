---
connector: true
connector_name: "authzen"
title: "Overview"
description: "Ask any OpenID AuthZEN Policy Decision Point for access decisions, search for permitted subjects, resources and actions, and read PDP metadata with the AuthZEN connector."
---

# Overview

[AuthZEN](https://openid.net/wg/authzen/) is the OpenID Foundation standard for asking a Policy Decision Point (PDP) whether an access is permitted. The [Authorization API 1.0](https://openid.net/specs/authorization-api-1_0.html) defines how a Policy Enforcement Point (PEP) asks a PDP whether a subject may perform an action on a resource, without depending on how the PDP stores or evaluates its policies. Authorization products such as Cerbos, Topaz, Open Policy Agent, OpenFGA, Axiomatics, PlainID and PingAuthorize implement it.

The WSO2 AuthZEN Connector lets your integration act as a PEP against any AuthZEN 1.0 PDP: check whether an access is permitted before you run an operation, check many accesses in one call, and find who or what an access applies to, directly from your integration flows.

## Key features

- Ask whether a subject may perform an action on a resource, in a given context, with a single access evaluation
- Ask many questions in one call, with shared defaults and the `execute_all`, `deny_on_first_deny` and `permit_on_first_permit` semantics
- Find the subjects that may perform an action on a resource, the resources a subject may access, and the actions a subject may perform, page by page
- Read the PDP metadata from its well-known URL, including for PDPs that serve several tenants under a path, and reject metadata that names another PDP
- Send each request to the endpoint the PDP advertises in its metadata
- Authenticate with a Bearer token, OAuth 2.0, Basic auth, a self-signed JWT, an API key or mutual TLS, or not at all
- Correlate requests with the `X-Request-ID` header

A denied access is not an error: the operation returns a decision of `false`. Operations return an error only when the PDP can't evaluate the request or can't be reached.

## Actions

Actions are operations you invoke on a PDP from your Ballerina integration. Use them to enforce access decisions in APIs and automations, filter lists down to what a user may see, and review who can access a resource.

| Client | Actions |
|--------|---------|
| `Client` | Access evaluation (single and batch), subject, resource and action search, PDP metadata |

See the **[Action Reference](actions.md)** for the full list of operations, parameters, and sample code for each client.

## Documentation

* **[Setup Guide](setup-guide.md)**: This guide walks you through finding your PDP URL, the credentials your PDP expects, and the APIs it supports.

* **[Action Reference](actions.md)**: Full reference for all clients: operations, parameters, return types, and sample code.

* **[Example](example.md)**: Learn how to build and configure an integration using the **AuthZEN** connector, including connection setup, operation configuration, and execution flow.

## How to contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AuthZEN Connector GitHub repository](https://github.com/ballerina-platform/module-ballerina-authzen)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
