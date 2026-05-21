---
title: Encrypt Secrets
---

# Encrypt Secrets with the Cipher Tool

The Integration Control Plane (ICP) ships with a cipher tool that lets you encrypt sensitive configuration values — such as passwords, JWT signing secrets, and SSO client secrets — before storing them in `deployment.toml`. At startup, ICP decrypts these values automatically using the private key in its keystore.

## Prerequisites

- Java (JDK 11 or later) must be installed and the `JAVA_HOME` environment variable must be set.
- ICP must be installed. The cipher tool is located in the `bin/` directory of your ICP installation.

## Encryptable configuration fields

Only the following fields in `deployment.toml` support encryption. Attempting to use `$secret{alias}` for any other field will have no effect.

**Fields stored under `[icp_server.secrets]`:**

| Configuration key | Description |
|---|---|
| `keystorePassword` | ICP keystore password |
| `truststorePassword` | ICP truststore password |
| `frontendJwtHMACSecret` | JWT HMAC secret for frontend authentication |
| `userServiceJwtHMACSecret` | JWT HMAC secret for user service authentication |
| `ssoClientId` | SSO (OIDC) client ID |
| `ssoClientSecret` | SSO (OIDC) client secret |
| `observabilityJwtHMACSecret` | JWT HMAC secret for the observability adapter |
| `observabilityTruststorePassword` | Truststore password for observability connections |
| `opensearchUsername` | OpenSearch username |
| `opensearchPassword` | OpenSearch password |
| `credentialsDbUser` | Credentials database username |
| `credentialsDbPassword` | Credentials database password |
| `ldapConnectionPassword` | LDAP connection (bind) password |
| `ldapTrustStorePassword` | Truststore password for LDAP TLS connections |

**Fields stored under `[icp_server.storage.secrets]`:**

| Configuration key | Description |
|---|---|
| `dbUser` | Primary database username |
| `dbPassword` | Primary database password |

## Encrypt a secret

Run the cipher tool from the ICP installation directory without any flags for the interactive mode.

**Linux/macOS:**
```bash
./bin/ciphertool.sh
```

**Windows:**
```bat
bin\ciphertool.bat
```

The tool loads the keystore, prompts for the keystore password and the plaintext value, then prints the encrypted ciphertext:

```bash
Encrypting using Primary KeyStore.
{type: PKCS12, alias: localhost, path: conf/security/keystore.p12}

[Please Enter Primary KeyStore Password of Carbon Server : ]

Primary KeyStore of Carbon Server is initialized Successfully

[Enter Plain Text Value : ]
[Please Enter Value Again : ]

Encryption is done Successfully

Encrypted value is :
...
```

Copy the encrypted value — you will need it in the next step. Repeat this for every secret you want to encrypt.

## Update deployment.toml

For each secret you encrypted, make two changes to `conf/deployment.toml`:

1. **Replace the plaintext value** with a `$secret{alias}` reference, where `alias` is the name you will use to identify this secret in the secrets table.
2. **Add an entry** to the appropriate secrets table (see below), using that same alias as the key and the ciphertext as the value.

The alias can be any descriptive name, but using the configuration key name as the alias is the clearest convention.

**Fields from the [Encryptable configuration fields](#encryptable-configuration-fields) table above go into their respective secrets tables:**

```toml
# Ciphertext references for server configurables
# References scattered throughout the main configuration
keystorePassword   = "$secret{keystorePassword}"
ssoClientSecret    = "$secret{ssoClientSecret}"
ldapConnectionPassword = "$secret{ldapConnectionPassword}"

# Ciphertexts for server configurables
[icp_server.secrets]
keystorePassword   = "RIbyQ0Te..."
ssoClientSecret    = "duNHb..."
ldapConnectionPassword = "P8/7g6rkGB..."

# Ciphertext references for database configurables
[icp_server.storage]
dbUser     = "$secret{dbUser}"
dbPassword = "$secret{dbPassword}"

# Ciphertexts for database configurables
[icp_server.storage.secrets]
dbUser     = "a1B4y5Z6..."
dbPassword = "ZH84B2a1..."
```

Every value in a secrets table must be a ciphertext produced by the cipher tool. ICP will fail if a plaintext value is found there.

## How ICP decrypts secrets at startup

For each configuration field that contains a `$secret{alias}` reference, ICP retrieves the corresponding ciphertext from the secrets table, decrypts it using the private key in the cipher keystore, and uses the resulting plaintext value for the rest of the server lifetime. Decryption happens once during server startup.

## Cipher keystore configuration

By default, the cipher tool and ICP use the same keystore:

| Setting | Default |
|---|---|
| Keystore path | `conf/security/keystore.p12` |
| Keystore alias | `<default-alias>` |
| Keystore password | `<default-password>` |
| Private key password | `<default-password>` |

All four settings can be overridden in `deployment.toml` under `[icp_server.utils]`. The keystore passwords can additionally be set via environment variables, which take precedence over the `deployment.toml` values.

**Option 1 — deployment.toml:**

```toml
[icp_server.utils]
cipherKeystorePath       = "conf/security/my-keystore.p12"
cipherKeystoreAlias      = "my-alias"
cipherKeystorePassword   = "my-keystore-password"
cipherPrivateKeyPassword = "my-private-key-password"
```

**Option 2 — environment variables (passwords only):**

```bash
export ICP_CIPHER_KEYSTORE_PASSWORD="<your-keystore-password>"
export ICP_PRIVATE_KEY_PASSWORD="<your-private-key-password>"
```

These settings must match the keystore that was used when encrypting the values with the cipher tool. If they differ, ICP will fail to decrypt the secrets at startup.
