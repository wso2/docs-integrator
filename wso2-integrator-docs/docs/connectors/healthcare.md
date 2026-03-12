---
sidebar_position: 15
title: "Healthcare"
description: "Healthcare connectors for FHIR, HL7, Epic, Cerner, and more in WSO2 Integrator."
---

# Healthcare Connectors

Build healthcare integrations that are interoperable, standards-compliant, and production-ready. These connectors support FHIR R4, HL7 v2, and direct integrations with major EHR systems like Epic and Cerner.

## Available Connectors

| Connector | Package | Use Case |
|-----------|---------|----------|
| **FHIR R4** | `ballerinax/health.fhir.r4` | Create, read, update, and search FHIR resources |
| **HL7 v2** | `ballerinax/health.hl7v2` | Parse and generate HL7 v2 messages (ADT, ORM, ORU) |
| **HL7 v2 to FHIR** | `ballerinax/health.hl7v2tofhir` | Transform HL7 v2 messages into FHIR R4 bundles |
| **Epic** | `ballerinax/health.epic` | Access patient records, appointments, and clinical data via Epic APIs |
| **Cerner** | `ballerinax/health.cerner` | Integrate with Cerner Millennium for patient and clinical data |
| **CDS Hooks** | `ballerinax/health.cdshooks` | Implement Clinical Decision Support services |
| **SMART on FHIR** | `ballerinax/health.smartonfhir` | Build SMART-enabled applications with OAuth 2.0 launch flows |

## Quick Example

### Expose a FHIR-Compliant Patient API

```ballerina
import ballerina/http;
import ballerinax/health.fhir.r4;

configurable string fhirServerUrl = ?;

final http:Client fhirClient = check new (fhirServerUrl);

service /fhir/r4 on new http:Listener(8090) {
    // Search patients by name
    resource function get Patient(string? name, string? birthdate) returns r4:Bundle|error {
        string query = "/Patient?";
        if name is string {
            query += string `name=${name}&`;
        }
        if birthdate is string {
            query += string `birthdate=${birthdate}&`;
        }

        r4:Bundle bundle = check fhirClient->get(query);
        return bundle;
    }

    // Get a patient by ID
    resource function get Patient/[string id]() returns r4:Patient|error {
        r4:Patient patient = check fhirClient->get(string `/Patient/${id}`);
        return patient;
    }

    // Create a new patient
    resource function post Patient(r4:Patient patient) returns r4:Patient|error {
        r4:Patient created = check fhirClient->post("/Patient", patient);
        return created;
    }
}
```

### Transform HL7 v2 ADT Message to FHIR

```ballerina
import ballerinax/health.hl7v2;
import ballerinax/health.hl7v2tofhir;
import ballerinax/health.fhir.r4;

function processAdtMessage(string rawHl7) returns r4:Bundle|error {
    // Parse the HL7 v2 message
    hl7v2:Message parsed = check hl7v2:parse(rawHl7);

    // Transform to FHIR R4 Bundle
    r4:Bundle fhirBundle = check hl7v2tofhir:transform(parsed);

    return fhirBundle;
}
```

## Configuration

```toml
# FHIR Server
[fhir]
fhirServerUrl = "https://fhir.example.com/r4"

# Epic (OAuth 2.0)
[epic]
epicBaseUrl = "https://fhir.epic.com/interconnect-fhir-oauth"
epicClientId = "<EPIC_CLIENT_ID>"
epicPrivateKey = "<PATH_TO_PRIVATE_KEY>"
```

## What's Next

- [Connection Configuration](configuration.md) -- How to set up and manage connections
- [Authentication Methods](authentication.md) -- OAuth 2.0, SMART on FHIR launch, and other auth types
- [Healthcare HL7/FHIR Tutorial](../tutorials/healthcare-hl7-fhir.md) -- End-to-end healthcare integration walkthrough
- [Data Formats & Standards](data-formats-standards.md) -- EDI, FHIR/HL7, and SOAP connectors
