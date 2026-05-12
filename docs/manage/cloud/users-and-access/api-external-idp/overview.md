---
title: Access Integration as APIs with External IdP
---

# Access Integration as APIs with External IdP

WSO2 Cloud - Integration Platform lets you connect an external identity provider (IdP) so that API consumers can use tokens issued by their own identity system to access integrations secured with OAuth2.

When an external IdP is registered, the platform validates incoming Bearer tokens against that IdP's well-known endpoint and checks whether the token carries the required OAuth2 scopes before granting access to a resource. This lets you enforce fine-grained, scope-based access control on your APIs without issuing separate credentials for each consumer.

## How it works

1. An organization administrator registers an external IdP in the WSO2 Cloud console by providing the IdP's well-known URL.
2. A developer secures an integration endpoint with OAuth2 and assigns scopes to individual resources.
3. An API consumer obtains an access token from the registered IdP using their own credentials.
4. The consumer includes the token as a Bearer token when calling the API. WSO2 Cloud validates the token and checks the assigned scopes before allowing the request through.

You can restrict a registered IdP to specific environments. For example, use one IdP in development and a different one in production.

## Supported identity providers

| Identity provider | Guide |
|---|---|
| Asgardeo | [Configure Asgardeo as an external IdP](./asgardeo.md) |
| Microsoft Azure Active Directory | [Configure Azure Active Directory as an external IdP](./azure.md) |

Any OIDC-compatible identity provider that exposes a standard well-known endpoint can also be configured using the same steps.

## What's next

- [Security configurations](../../configurations/security-configurations.md) — Secure integration endpoints with OAuth2 and assign scopes to resources.
