---
title: Setup Guide
---

# Setup Guide

This guide walks you through the SAP system configuration required before using the `ballerinax/sap.jco` connector.

## Prerequisites

- An SAP system (e.g., SAP ECC, SAP S/4HANA) with administrative access
- SAP GUI or SAP Logon Pad installed for transaction execution
- SAP JCo libraries (`sapjco3.jar` and the platform-specific native library) obtained from the SAP Support Portal

## Obtain SAP connection details

Gather the following connection parameters from your SAP system administrator:

- **Application Server Host (`ashost`)** — the hostname or IP address of the SAP application server
- **System Number (`sysnr`)** — the two-digit SAP system number (e.g., `00`)
- **Client Number (`jcoClient`)** — the three-digit SAP client number (e.g., `100`)
- **Logon credentials** — a valid SAP user name and password with the required RFC authorization profiles

The user account should have the `S_RFC` authorization object with access to the function modules and IDoc types your integration requires.

## Register a program ID for inbound connections

If you plan to receive IDocs or inbound RFC calls from SAP, register a program ID in the SAP system so the SAP gateway can route requests to your Ballerina listener.

1. Open transaction **SM59** in SAP GUI
2. Create a new RFC destination of type **T** (TCP/IP Connection)
3. Set the **Program ID** to a unique identifier (e.g., `BALLERINA_SERVER`)
4. Set **Activation Type** to **Registered Server Program**
5. On the **Technical Settings** tab, enter the SAP gateway host and service (e.g., `sapgw00`)
6. Save and test the connection

The program ID configured here must match the `progid` value in your `ServerConfig`. The gateway host and service must match the `gwhost` and `gwserv` values.

## Configure IDoc partner profile

To receive IDocs from SAP, configure a partner profile and port that routes outbound IDocs to your registered program ID.

1. Open transaction **WE20** to create or edit a partner profile
2. Add an outbound parameter for the relevant IDoc message type
3. Set the port to point to the RFC destination created in SM59
4. Open transaction **WE21** to verify the port configuration uses your RFC destination

## Install SAP JCo libraries

The SAP JCo libraries must be available on the machine running your Ballerina application.

1. Download the SAP JCo package for your platform from the [SAP Support Portal](https://support.sap.com/en/product/connectors/jco.html)
2. Extract the archive and place both `sapjco3.jar` and `sapidoc3.jar`, along with the platform-specific native library (e.g., `libsapjco3.so` on Linux, `sapjco3.dll` on Windows, `libsapjco3.jnilib` on macOS), in a directory accessible to the JVM
3. Ensure the native library directory is on the system library path (`LD_LIBRARY_PATH`, `PATH`, or `DYLD_LIBRARY_PATH` respectively)

## Configure Ballerina.toml with JAR paths

After placing the SAP JCo libraries, add them to your Ballerina project's `Ballerina.toml` so they are available during compilation.

```toml
[[platform.java21.dependency]]
path = "<path-to-sapidoc3.jar>"
groupId = "com.sap"
artifactId = "com.sap.conn.idoc"
version = "3.1.*"
scope = "provided"

[[platform.java21.dependency]]
path = "<path-to-sapjco3.jar>"
groupId = "com.sap"
artifactId = "com.sap.conn.jco"
version = "3.1.*"
scope = "provided"
```

Replace `<path-to-sapidoc3.jar>` and `<path-to-sapjco3.jar>` with the absolute or relative paths to the respective JAR files on your machine.

The `scope = "provided"` setting ensures the JARs are available at compile time but are not bundled into the final artifact, since they must be present at runtime on the target machine.

## Next steps

- [Action Reference](action-reference.md) - Available operations
- [Trigger Reference](trigger-reference.md) - Event-driven integration
