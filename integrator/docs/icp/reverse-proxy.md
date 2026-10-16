---
title: Configure a Reverse Proxy
---

# Configure a Reverse Proxy

ICP serves the console and API on port `9446` using HTTPS with a self-signed certificate. In production, you typically place a reverse proxy in front of ICP to handle TLS termination, expose a standard port, and integrate with your network infrastructure. This page covers the ICP-specific configuration required when a reverse proxy is in use.

## Update the backend configuration

Set `publicBaseUrl` in `conf/deployment.toml` to the external URL of the console. Add it as a top-level entry, before any `[section]` header:

```toml
publicBaseUrl = "https://icp.example.com"
```

ICP derives all the console's backend URLs (GraphQL, auth, observability, workflows, try-it, and the `/runtime-status` WebSocket) and the CORS allowed origins from this value. If not set, it defaults to `https://localhost:9446`.

When ICP starts, it reads these settings from `conf/deployment.toml` and propagates them into the console frontend automatically (you do not need to edit `www/config.json` directly). Restart ICP for the changes to take effect.

If you use SSO, set `ssoRedirectUri` to the external hostname as well (for example, `https://icp.example.com/sso/callback`). See [SSO configuration](user-stores/sso-configuration.md).

## Configure the proxy

Forward console traffic to ICP over HTTPS on port `9446`. The proxy must also pass WebSocket upgrade requests through, because the console receives live runtime status over a WebSocket at `/runtime-status`. Without this, the WebSocket connection fails.

A minimal nginx example:

```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 443 ssl;
    server_name icp.example.com;

    ssl_certificate     /etc/nginx/certs/icp.example.com.crt;
    ssl_certificate_key /etc/nginx/certs/icp.example.com.key;

    location / {
        proxy_pass https://<icp-host>:9446;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade           $http_upgrade;
        proxy_set_header Connection        $connection_upgrade;
        proxy_read_timeout 3600s;
    }
}
```

## Update runtime connections

WSO2 Integrator runtimes send heartbeats to ICP on the runtime port `9445`, not the console port `9446`. If runtimes connect to ICP through a proxy, the proxy must forward their traffic to port `9445` (for example, on a separate hostname), and `serverUrl` in the runtime's `Config.toml` must point to that address:

```toml
[wso2.icp.runtime.bridge]
serverUrl = "https://icp-runtimes.example.com"
```

If runtimes connect directly to ICP (bypassing the proxy), leave `serverUrl` pointing at the ICP host and port `9445`.

## What's next

- [Access control](access-control.md) — manage users, roles, and groups for externally exposed ICP
- [Connect an integration to ICP](connect-runtime.md) — register a runtime with heartbeats
- [Observability setup](observability-setup/index.md) — add centralized logs and metrics
