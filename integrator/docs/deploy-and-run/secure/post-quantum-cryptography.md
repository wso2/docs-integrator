---
title: Post-Quantum Cryptography
---

# Post-Quantum Cryptography

Large-scale quantum computers are expected to break the public-key algorithms that most systems use today, such as RSA and elliptic-curve cryptography. An attacker can record encrypted traffic now and decrypt it later when a quantum computer is available. This is known as a *harvest now, decrypt later* attack.

WSO2 Integrator protects integrations against this risk with post-quantum algorithms standardized by NIST:

- **Hybrid post-quantum TLS** for HTTP services and clients.
- **ML-KEM-768** key encapsulation and **ML-DSA-65** digital signatures that you can use in your integration logic.

The `http` package provides post-quantum TLS, and the `crypto` package provides the post-quantum algorithms. Both packages are part of WSO2 Integrator.

## Supported algorithms

| Capability | Algorithm | Standard | Package |
|---|---|---|---|
| Key exchange in TLS 1.3 | X25519MLKEM768 (ML-KEM-768 combined with X25519) | NIST FIPS 203 | `http` |
| Key encapsulation | ML-KEM-768 | NIST FIPS 203 | `crypto` |
| Hybrid key encapsulation | RSA-KEM combined with ML-KEM-768 | NIST FIPS 203 (ML-KEM part) | `crypto` |
| Digital signatures | ML-DSA-65 | NIST FIPS 204 | `crypto` |

## Hybrid post-quantum TLS

HTTP listeners and HTTP clients offer the X25519MLKEM768 key exchange group for TLS 1.3 by default. X25519MLKEM768 combines the post-quantum ML-KEM-768 algorithm with the classical X25519 algorithm. The connection stays secure as long as either algorithm remains unbroken.

You don't need to change your integration code or configuration. WSO2 Integrator offers the following key exchange groups, in order of preference:

1. `X25519MLKEM768`
2. `x25519`
3. `secp256r1`
4. `secp384r1`
5. `secp521r1`

When the other side of the connection also supports X25519MLKEM768, the connection can negotiate it. The server selects the key exchange group, so it can select a classical group instead. Check the group that each connection actually negotiates.

Post-quantum protection applies only to connections that negotiate X25519MLKEM768. Both sides of the connection must support it, including any load balancer, API gateway, or proxy that terminates TLS. Current versions of Chrome, Firefox, Edge, and OpenSSL 3.5 or later support X25519MLKEM768.

If you set the `jdk.tls.namedGroups` Java system property, its value replaces the default list of key exchange groups. If you leave out `X25519MLKEM768`, the integration doesn't use post-quantum TLS.

### Verify X25519MLKEM768 support

Use OpenSSL 3.5 or later to check whether a WSO2 Integrator service accepts X25519MLKEM768 when it's the only offered group.

```bash
openssl s_client -connect localhost:9443 -tls1_3 -groups X25519MLKEM768 </dev/null 2>/dev/null | grep -i "group"
```

The output shows `X25519MLKEM768` when the service supports it. This check doesn't show which group the service selects for a client that offers several groups.

### Verify the negotiated key exchange

To check which group the service selects, offer the same group list as a real client.

```bash
openssl s_client -connect localhost:9443 -tls1_3 -groups X25519MLKEM768:x25519:secp256r1:secp384r1:secp521r1 </dev/null 2>/dev/null | grep -i "group"
```

The output shows `X25519MLKEM768` as the negotiated group when the service selects the hybrid group.

## Use post-quantum algorithms in integrations

Use the `crypto` package to protect data at the application level, for example to sign a payload or to agree on a shared key with a partner system. Import the package in your integration.

```ballerina
import ballerina/crypto;
```

ML-KEM-768 and ML-DSA-65 keys can be loaded from PKCS #12 keystores, private key files, and certificate files.

### Sign and verify data with ML-DSA-65

The following integration signs data with an ML-DSA-65 private key and verifies the signature with the matching public key.

```ballerina
import ballerina/crypto;
import ballerina/io;

public function main() returns error? {
    crypto:KeyStore keyStore = {
        path: "/path/to/mldsa-keystore.p12",
        password: "keyStorePassword"
    };
    crypto:PrivateKey privateKey = check crypto:decodeMlDsa65PrivateKeyFromKeyStore(keyStore, "keyAlias", "keyPassword");

    byte[] data = "Hello WSO2 Integrator".toBytes();
    byte[] signature = check crypto:signMlDsa65(data, privateKey);

    crypto:TrustStore trustStore = {
        path: "/path/to/mldsa-truststore.p12",
        password: "trustStorePassword"
    };
    crypto:PublicKey publicKey = check crypto:decodeMlDsa65PublicKeyFromTrustStore(trustStore, "keyAlias");

    boolean isValid = check crypto:verifyMlDsa65Signature(data, signature, publicKey);
    io:println("Signature valid: ", isValid);
}
```

### Establish a shared key with ML-KEM-768

ML-KEM-768 lets two parties agree on a shared secret. The sender creates the shared secret and an encapsulated copy of it with the receiver's public key, and then sends the encapsulated secret to the receiver. The receiver recovers the same shared secret with its private key.

The following integration shows both sides in one program. In a real exchange, the sender and the receiver run separately, and only the encapsulated secret travels between them.

```ballerina
import ballerina/crypto;
import ballerina/io;

public function main() returns error? {
    // Sender: create a shared secret with the receiver's public key.
    crypto:PublicKey receiverPublicKey = check crypto:decodeMlKem768PublicKeyFromCertFile("/path/to/receiver-mlkem.crt");
    crypto:EncapsulationResult result = check crypto:encapsulateMlKem768(receiverPublicKey);
    byte[] senderSecret = result.sharedSecret;
    byte[] encapsulatedSecret = result.encapsulatedSecret;

    // Receiver: recover the shared secret with the private key.
    crypto:PrivateKey receiverPrivateKey = check crypto:decodeMlKem768PrivateKeyFromKeyFile("/path/to/receiver-mlkem.key", "keyPassword");
    byte[] receiverSecret = check crypto:decapsulateMlKem768(encapsulatedSecret, receiverPrivateKey);

    // Both sides derive the same 256-bit key from the shared secret.
    byte[] senderKey = check crypto:hkdfSha256(senderSecret, 32);
    byte[] receiverKey = check crypto:hkdfSha256(receiverSecret, 32);
    io:println("Keys match: ", senderKey == receiverKey);
}
```

Use the derived key with `crypto:encryptAesGcm` to encrypt the payload.

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
