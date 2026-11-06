---
title: Configure TLS Certificates
description: Serve a CA-signed certificate from the ICP server and make runtimes trust it, without a reverse proxy.
keywords: [wso2 integrator, integration control plane, icp, tls, ssl, certificate, keystore, truststore, ca]
slug: /icp/configure-tls
sidebar_position: 12
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure TLS Certificates

ICP ships with a self-signed certificate. For production, replace it with a certificate issued by your own or a public certificate authority (CA). ICP can serve that certificate directly, so a [reverse proxy](reverse-proxy.md) is optional.

All ICP HTTPS listeners share one keystore, so one change covers every port:

| Port   | Used by                          | Who connects          |
| ------ | -------------------------------- | --------------------- |
| `9446` | Console, GraphQL API, WebSocket  | Browsers, API clients |
| `9445` | Runtime listener (heartbeats)    | MI and BI runtimes    |
| `9447` | Built-in user store auth service | ICP itself            |
| `9449` | OpenSearch adapter service       | ICP itself            |

ICP also calls ports `9447` and `9449` over HTTPS. These internal calls verify the certificate too, so ICP must trust your CA and reach those ports by a host name in the certificate.

:::info Prerequisites

- The server certificate and its private key, in PEM format.
- The CA certificates in PEM format: the root CA, and any intermediate CAs.
- `openssl` and `keytool` (included with Java).
:::

## Certificate host names

The certificate's Subject Alternative Names (SANs) must cover every host name that clients use to reach ICP:

- The external host name of ICP, for example `icp.example.com`. Browsers and runtimes use this name.
- `localhost`. By default, ICP calls its own services at `https://localhost:9447` and `https://localhost:9449`.

If your CA does not issue certificates for `localhost`, leave it out and point the internal URLs to the external host name instead. See [Step 3](#step-3-configure-icp).

## Step 1: Create the keystore

1. Create a CA chain file. List the CA that issued the server certificate first and the root CA last. If your CA gave you a bundle in this order, use it instead:

    ```bash
    cat intermediate-ca.crt ca-root.crt > ca-chain.crt
    ```

    If the server certificate is issued directly by the root CA, use `ca-root.crt` as the chain file.

2. Combine the certificate, its private key, and the CA chain into a PKCS12 keystore. OpenSSL prompts for the keystore password:

    ```bash
    openssl pkcs12 -export \
      -in icp.crt \
      -inkey icp.key \
      -certfile ca-chain.crt \
      -name icp \
      -out <ICP_HOME>/conf/security/icp-keystore.p12
    ```

- Keep only one private key entry in the keystore. ICP has no setting to choose a key alias.
- The private key password must be the same as the keystore password. `openssl pkcs12 -export` uses the same password for both.
- `-certfile` adds the CA chain, so that clients receive the full chain during the TLS handshake.

## Step 2: Add the CA to the ICP truststore

ICP uses its truststore to verify certificates on its internal HTTPS calls. Import your root CA:

```bash
keytool -importcert -noprompt \
  -alias corp-root-ca \
  -file ca-root.crt \
  -keystore <ICP_HOME>/conf/security/client-truststore.jks \
  -storepass wso2carbon
```

The default truststore password is `wso2carbon`.

## Step 3: Configure ICP

Add the following top-level keys to `<ICP_HOME>/conf/deployment.toml`, before any `[section]` header:

```toml
keystorePath = "<ICP_HOME>/conf/security/icp-keystore.p12"
keystorePassword = "<keystore-password>"
truststorePath = "<ICP_HOME>/conf/security/client-truststore.jks"
truststorePassword = "wso2carbon"
publicBaseUrl = "https://icp.example.com:9446"
```

If you use a relative path, it is resolved from `<ICP_HOME>/bin`, because ICP is started from the `bin` directory. You can also use an absolute path.

If the certificate does not include `localhost`, point ICP's calls to its own services at a host name in the certificate. The host name must resolve to the ICP server from the ICP server itself, through DNS or `/etc/hosts`.

```toml
observabilityBackendURL = "https://icp.example.com:9449"
# Built-in user store only. Keep your existing value if authBackendUrl points to a custom backend.
authBackendUrl = "https://icp.example.com:9447"
# LDAP user store only (ldapUserStoreEnabled = true).
ldapAuthBackendUrl = "https://icp.example.com:9450"
```

Set only the keys for the user store you use. For the available backends, see [Authentication Backends](authentication-config.md#authentication-backends).

If `authBackendUrl` points to a custom authentication backend, ICP verifies that backend's certificate against the ICP truststore, not the ICP server certificate. Import the CA that issued the backend's certificate into the ICP truststore, as in [Step 2](#step-2-add-the-ca-to-the-icp-truststore).

To store the passwords encrypted, see [Encrypt Secrets](encrypt-secrets.md).

Restart ICP. For all keys, see [Server Configuration](server-configuration.md#tls-settings).

## Step 4: Configure runtimes to trust the CA

Each runtime verifies the ICP certificate when it connects to port `9445`. The `serverUrl` or `icp_url` that the runtime uses must contain a host name that is in the certificate.

<Tabs>
<TabItem value="bi" label="BI" default>

Copy the root CA in PEM format to the runtime host, then update the integration's `Config.toml`:

```toml
[wso2.icp.runtime.bridge]
serverUrl = "https://icp.example.com:9445"
enableSSL = true
cert = "/opt/certs/ca-root.crt"
```

`enableSSL` is `false` by default, which means the runtime does not verify the ICP certificate. When `enableSSL` is `true`, `cert` is required: the runtime does not fall back to the JVM's default truststore.

For the other settings, see [Connect an Integration to ICP](connect-runtime.md).

</TabItem>
<TabItem value="mi" label="MI">

Import the root CA into the MI truststore on every MI node:

```bash
keytool -importcert -noprompt \
  -alias corp-root-ca \
  -file ca-root.crt \
  -keystore <MI_HOME>/repository/resources/security/client-truststore.jks \
  -storepass wso2carbon
```

Then enable certificate verification in `<MI_HOME>/conf/deployment.toml`:

```toml
[icp_config]
icp_url = "https://icp.example.com:9445"
ssl_verify = true
```

`ssl_verify = false` turns off certificate verification. Do not use it in production.

For the other settings, see [Connecting an integration to ICP](https://mi.docs.wso2.com/en/4.7.0/install-and-setup/install/connecting-an-integration-to-icp/) in the MI documentation.

</TabItem>
</Tabs>

## Verify the setup

1. Check that each port serves your certificate, signed by your CA and valid for the host name. Each port should print `Verify return code: 0 (ok)`:

    ```bash
    for p in 9445 9446 9447 9449; do
      echo "== $p"
      echo | openssl s_client -connect icp.example.com:$p -servername icp.example.com \
        -verify_hostname icp.example.com \
        -CAfile ca-root.crt 2>/dev/null | grep -E "subject=|issuer=|Verify return code"
    done
    ```

2. Sign in to the console at `https://icp.example.com:9446`. Signing in also tests ICP's internal call to the auth service.

3. Open **Runtimes** in the console. Each connected runtime shows the status **RUNNING**.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Sign-in fails with `Authentication service unavailable`, and the ICP log shows `SSLHandshakeException` for `localhost/127.0.0.1:9447` | ICP does not trust your CA | Import the CA into the ICP truststore. See [Step 2](#step-2-add-the-ca-to-the-icp-truststore) |
| Same error, with the CA already in the ICP truststore | The certificate does not include `localhost` | Add `localhost` to the SANs, or set `authBackendUrl` and `observabilityBackendURL`. See [Step 3](#step-3-configure-icp) |
| BI runtime stops at startup with `Certificate file location must be provided for secure connection` | `enableSSL` is `true`, but `cert` is not set | Set `cert` to the CA certificate in PEM format |
| BI runtime logs `Failed to send initial heartbeat` with `SSLHandshakeException` | The `serverUrl` host name is not in the certificate | Use a host name from the certificate's SANs |
| MI logs `PKIX path building failed` | MI does not trust your CA | Import the CA into the MI truststore |
| MI logs `Certificate for <host> doesn't match any of the subject alternative names` | The `icp_url` host name is not in the certificate | Use a host name from the certificate's SANs |

## What's next

- [Configure a reverse proxy](reverse-proxy.md): terminate TLS at a proxy instead of ICP
- [Encrypt secrets](encrypt-secrets.md): encrypt the keystore and truststore passwords
- [Server configuration](server-configuration.md): all ICP server settings
