---
title: Configure a Reverse Proxy
---

# Configure a Reverse Proxy

ICP serves the console and API on port `9446` using HTTPS with a self-signed certificate. In production, you typically place a reverse proxy in front of ICP to handle TLS termination, expose a standard port, and integrate with your network infrastructure. This page covers the ICP-specific configuration required when a reverse proxy is in use.

## Update the backend configuration

Update the backend endpoint settings in `conf/deployment.toml` to reflect the external hostname:

```toml
backendGraphqlEndpoint       = "https://icp.example.com/graphql"
backendAuthBaseUrl           = "https://icp.example.com/auth"
backendObservabilityEndpoint = "https://icp.example.com/icp/observability"
```

If not set, these values default to the values shown above under `https://localhost:9446/...`.

When ICP starts, it reads these settings from `conf/deployment.toml` and propagates them into the console frontend automatically (you do not need to edit `www/config.json` directly). Restart ICP for the changes to take effect.

## Update runtime connections

WSO2 Integrator runtimes send heartbeats to ICP over a dedicated registration port. If runtimes connect to ICP through the proxy, update `serverUrl` in the runtime's `Config.toml`:

```toml
[wso2.icp.runtime.bridge]
serverUrl = "https://icp.example.com"
```

If runtimes connect directly to ICP (bypassing the proxy), leave `serverUrl` pointing at the ICP host and port.

## What's next

- [Access control](./access-control.md) — manage users, roles, and groups for externally exposed ICP
- [Connect an integration to ICP](./connect-runtime.md) — register a runtime with heartbeats
- [Observability setup](./observability-setup.md) — add centralized logs and metrics
