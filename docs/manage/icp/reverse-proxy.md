---
title: Configure a Reverse Proxy
---

# Configure a Reverse Proxy

ICP serves the console and API on port `9446` using HTTPS with a self-signed certificate. In production, you typically place a reverse proxy in front of ICP to handle TLS termination, expose a standard port, and integrate with your network infrastructure. This page covers the ICP-specific configuration required when a reverse proxy is in use.

## Update the console frontend

The ICP console is a single-page application whose API endpoints are read from `www/config.json` at startup. Update this file to point to the external proxy URL:

```json
{
  "VITE_GRAPHQL_URL": "https://icp.example.com/graphql",
  "VITE_AUTH_BASE_URL": "https://icp.example.com/auth",
  "VITE_OBSERVABILITY_URL": "https://icp.example.com/icp/observability"
}
```

Restart ICP after saving the file for the changes to take effect.

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
