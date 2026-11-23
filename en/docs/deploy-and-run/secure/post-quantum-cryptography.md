---
sidebar_position: 4
title: Post-Quantum Cryptography
description: Understand the post-quantum cryptography support in WSO2 Integrator, including hybrid post-quantum TLS, ML-KEM, and ML-DSA.
keywords: [wso2 integrator, post-quantum, pqc, ml-kem, ml-dsa, x25519mlkem768, tls 1.3, quantum-safe]
slug: /deploy-and-run/secure/post-quantum-cryptography
---

# Post-Quantum Cryptography

Large-scale quantum computers are expected to break the public-key algorithms that most systems use today, such as RSA and elliptic-curve cryptography. An attacker can record encrypted traffic now and decrypt it later when a quantum computer is available. This is known as a *harvest now, decrypt later* attack.

WSO2 Integrator protects integrations against this risk with post-quantum algorithms standardized by NIST:

- **Hybrid post-quantum TLS** for HTTP services and clients.
- **ML-KEM-768** key encapsulation and **ML-DSA-65** digital signatures that you can use in your integration logic.

The `http` package provides post-quantum TLS, and the `crypto` package provides the post-quantum algorithms. Both packages are part of WSO2 Integrator.

## Availability by version

| Capability | WSO2 Integrator 5.1.0 and later | WSO2 Integrator 5.0.0 |
|---|---|---|
| Hybrid post-quantum TLS (X25519MLKEM768) | Enabled by default | Supported. Requires a Java system property. See [Enable post-quantum TLS in WSO2 Integrator 5.0.0](#enable-post-quantum-tls-in-wso2-integrator-500). |
| ML-KEM-768 and ML-DSA-65 in the `crypto` package | Available | Available |

## Supported algorithms

| Capability | Algorithm | Standard | Package |
|---|---|---|---|
| Key exchange in TLS 1.3 | X25519MLKEM768 (ML-KEM-768 combined with X25519) | NIST FIPS 203 | `http` |
| Key encapsulation | ML-KEM-768 | NIST FIPS 203 | `crypto` |
| Hybrid key encapsulation | RSA-KEM combined with ML-KEM-768 | NIST FIPS 203 (ML-KEM part) | `crypto` |
| Digital signatures | ML-DSA-65 | NIST FIPS 204 | `crypto` |

The `crypto` package uses the final NIST algorithm identifiers (OIDs) for ML-KEM and ML-DSA.

## Hybrid post-quantum TLS

In WSO2 Integrator 5.1.0 and later, HTTP listeners and HTTP clients offer the X25519MLKEM768 key exchange group for TLS 1.3 by default. X25519MLKEM768 combines the post-quantum ML-KEM-768 algorithm with the classical X25519 algorithm. The connection stays secure as long as either algorithm remains unbroken.

You don't need to change your integration code or configuration. WSO2 Integrator offers the following key exchange groups, in order of preference:

1. `X25519MLKEM768`
2. `x25519`
3. `secp256r1`
4. `secp384r1`
5. `secp521r1`

When the other side of the connection also supports X25519MLKEM768, the connection uses it. Otherwise, the connection falls back to a classical group.

:::note
Post-quantum protection applies only to connections that negotiate X25519MLKEM768. Both sides of the connection must support it, including any load balancer, API gateway, or proxy that terminates TLS. Current versions of Chrome, Firefox, Edge, and OpenSSL 3.5 or later support X25519MLKEM768.
:::

### Enable post-quantum TLS in WSO2 Integrator 5.0.0

WSO2 Integrator 5.0.0 supports X25519MLKEM768, but HTTP listeners and HTTP clients don't offer it by default. To enable it, set the `jdk.tls.namedGroups` Java system property when you start the integration. The setting applies to all HTTP listeners and HTTP clients in the integration.

```bash
java -Djdk.tls.namedGroups=X25519MLKEM768,x25519,secp256r1,secp384r1,secp521r1 -jar my_integration.jar
```

If you run the integration in a container, set the property through the `JAVA_TOOL_OPTIONS` environment variable.

```bash
JAVA_TOOL_OPTIONS="-Djdk.tls.namedGroups=X25519MLKEM768,x25519,secp256r1,secp384r1,secp521r1"
```

Keep `X25519MLKEM768` first in the list so that it's preferred, and keep the classical groups so that peers without post-quantum support can still connect. To get post-quantum TLS without this setting, upgrade to WSO2 Integrator 5.1.0 or later.

:::warning
In any version, the `jdk.tls.namedGroups` value replaces the default list of key exchange groups. If you set this property and leave out `X25519MLKEM768`, the integration doesn't use post-quantum TLS.
:::

### Verify the negotiated key exchange

Use OpenSSL 3.5 or later to check whether a WSO2 Integrator service negotiates X25519MLKEM768.

```bash
openssl s_client -connect localhost:9443 -tls1_3 -groups X25519MLKEM768 </dev/null 2>/dev/null | grep -i "group"
```

The output shows `X25519MLKEM768` as the negotiated group when post-quantum TLS is active.

## Use post-quantum algorithms in integrations

Use the `crypto` package to protect data at the application level, for example to sign a payload or to agree on a shared key with a partner system. Import the package in your integration.

```ballerina
import ballerina/crypto;
```

ML-KEM-768 and ML-DSA-65 keys can be loaded from PKCS #12 keystores, private key files, and certificate files.

### Sign and verify data with ML-DSA-65

Sign data with an ML-DSA-65 private key.

```ballerina
crypto:KeyStore keyStore = {
    path: "/path/to/mldsa-keystore.p12",
    password: "keyStorePassword"
};
crypto:PrivateKey privateKey = check crypto:decodeMlDsa65PrivateKeyFromKeyStore(keyStore, "keyAlias", "keyPassword");

byte[] data = "Hello WSO2 Integrator".toBytes();
byte[] signature = check crypto:signMlDsa65(data, privateKey);
```

Verify the signature with the matching ML-DSA-65 public key.

```ballerina
crypto:TrustStore trustStore = {
    path: "/path/to/mldsa-truststore.p12",
    password: "trustStorePassword"
};
crypto:PublicKey publicKey = check crypto:decodeMlDsa65PublicKeyFromTrustStore(trustStore, "keyAlias");

boolean isValid = check crypto:verifyMlDsa65Signature(data, signature, publicKey);
```

### Establish a shared key with ML-KEM-768

ML-KEM-768 lets two parties agree on a shared secret. The sender creates the shared secret and an encapsulated copy of it with the receiver's public key, and then sends the encapsulated secret to the receiver.

```ballerina
crypto:PublicKey receiverPublicKey = check crypto:decodeMlKem768PublicKeyFromCertFile("/path/to/receiver-mlkem.crt");

crypto:EncapsulationResult result = check crypto:encapsulateMlKem768(receiverPublicKey);
byte[] sharedSecret = result.sharedSecret;
byte[] encapsulatedSecret = result.encapsulatedSecret;
```

The receiver recovers the same shared secret with its private key.

```ballerina
crypto:PrivateKey receiverPrivateKey = check crypto:decodeMlKem768PrivateKeyFromKeyFile("/path/to/receiver-mlkem.key", "keyPassword");

byte[] sharedSecret = check crypto:decapsulateMlKem768(encapsulatedSecret, receiverPrivateKey);
```

Derive an encryption key from the shared secret with `crypto:hkdfSha256`, and then encrypt the payload with `crypto:encryptAesGcm`.

```ballerina
byte[] aesKey = check crypto:hkdfSha256(sharedSecret, 32);
```

To combine ML-KEM-768 with RSA in a single key exchange, use `crypto:encapsulateRsaKemMlKem768` and `crypto:decapsulateRsaKemMlKem768`.

For the full list of functions, see the [`crypto` package API documentation](https://central.ballerina.io/ballerina/crypto/latest).

## Limitations

- Post-quantum TLS is available for HTTP listeners and HTTP clients. Other transports and connectors, such as database drivers and message broker clients, use the TLS support of their client libraries and of the remote system.
- TLS certificates, mutual TLS, JWT, and OAuth 2.0 use classical signature algorithms such as RSA and ECDSA.
- SFTP connections use classical SSH key exchange.
- The `crypto` package supports the ML-KEM-768 and ML-DSA-65 parameter sets. ML-KEM-512, ML-KEM-1024, ML-DSA-44, ML-DSA-87, SLH-DSA (FIPS 205), and composite signatures aren't supported.

## What's next

- [Keystores and truststores](keystore-truststore.md) — Create and manage keystores and truststores for TLS
- [Secrets and encryption](secrets-encryption.md) — Configure TLS for listeners and clients
- [Runtime security](runtime-security.md) — Harden the runtime environment
