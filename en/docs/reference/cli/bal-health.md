---
sidebar_position: 7
title: bal health CLI
description: Reference for the bal health CLI tool — generate Ballerina code for FHIR resources and healthcare interoperability.
---

# bal health CLI

The `bal health` tool generates Ballerina source code for working with HL7 FHIR (Fast Healthcare Interoperability Resources) standards. It produces type-safe Ballerina record types, API templates, and utility functions from FHIR Implementation Guides (IGs), enabling rapid development of healthcare integration solutions.

## Commands Overview

| Command | Description |
|---------|-------------|
| `bal health fhir -m package` | Generate a Ballerina package with FHIR resource types |
| `bal health fhir -m template` | Generate a FHIR API service template |

## Syntax

```bash
bal health fhir -m <mode> [options]
```

## Flags

| Flag | Alias | Required | Default | Description |
|------|-------|----------|---------|-------------|
| `-m`, `--mode` | — | Yes | — | Generation mode: `package` or `template` |
| `-o`, `--output` | — | No | Current directory | Output directory for generated files |
| `--org-name` | — | No | `healthcare` | Organization name for the generated package |
| `--package-name` | — | No | Derived from IG | Package name for the generated module |
| `--dependent-package` | — | No | — | Path to a dependent FHIR package |
| `--included-profile` | — | No | All profiles | Comma-separated profiles to include |
| `--excluded-profile` | — | No | None | Comma-separated profiles to exclude |

### Package Mode Flags

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `-i`, `--input` | Yes | — | Path to the FHIR Implementation Guide directory or ZIP |

### Template Mode Flags

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `--dependent-package` | Yes | — | Path to the FHIR package to generate the API for |

## Generate FHIR Resource Package

Generate Ballerina record types and utilities from a FHIR Implementation Guide.

### Example

```bash
# Generate package from a FHIR IG
bal health fhir -m package -i ./ig-uscore/ -o generated/ \
    --org-name myorg --package-name uscore

# Generate with specific profiles only
bal health fhir -m package -i ./ig-uscore/ -o generated/ \
    --included-profile Patient,Observation,Condition

# Generate excluding certain profiles
bal health fhir -m package -i ./ig-uscore/ -o generated/ \
    --excluded-profile OperationDefinition,SearchParameter
```

### Generated Package Structure

```
generated/
  uscore/
    Ballerina.toml
    Package.md
    resource_patient.bal          # Patient resource type
    resource_observation.bal      # Observation resource type
    resource_condition.bal        # Condition resource type
    data_types.bal                # FHIR data types (HumanName, Address, etc.)
    value_sets.bal                # FHIR value set enumerations
    utils.bal                     # Serialization and validation utilities
```

### Generated Types Usage

```ballerina
import myorg/uscore;

public function main() returns error? {
    // Create a FHIR Patient resource
    uscore:USCorePatientProfile patient = {
        resourceType: "Patient",
        id: "patient-001",
        name: [
            {
                use: "official",
                family: "Smith",
                given: ["Jane", "Marie"]
            }
        ],
        gender: "female",
        birthDate: "1990-05-15",
        address: [
            {
                use: "home",
                line: ["123 Main St"],
                city: "Springfield",
                state: "IL",
                postalCode: "62701"
            }
        ]
    };

    // Serialize to JSON
    json patientJson = patient.toJson();

    // Parse from JSON
    uscore:USCorePatientProfile parsed = check uscore:parsePatient(patientJson);
}
```

## Generate FHIR API Template

Generate a Ballerina HTTP service template with FHIR-compliant REST endpoints.

### Example

```bash
# Generate API template from a FHIR package
bal health fhir -m template -o api/ \
    --dependent-package ./generated/uscore/

# Generate template for specific profiles
bal health fhir -m template -o api/ \
    --dependent-package ./generated/uscore/ \
    --included-profile Patient,Observation
```

### Generated API Template

```ballerina
import ballerina/http;
import myorg/uscore;

service /fhir/r4 on new http:Listener(9090) {

    // Search patients
    resource function get Patient(http:Request req) returns uscore:Bundle|http:InternalServerError {
        // TODO: Implement patient search
    }

    // Read a patient by ID
    resource function get Patient/[string id](http:Request req)
            returns uscore:USCorePatientProfile|http:NotFound|http:InternalServerError {
        // TODO: Implement patient read
    }

    // Create a patient
    resource function post Patient(@http:Payload uscore:USCorePatientProfile patient)
            returns http:Created|http:BadRequest|http:InternalServerError {
        // TODO: Implement patient create
    }

    // Update a patient
    resource function put Patient/[string id](@http:Payload uscore:USCorePatientProfile patient)
            returns uscore:USCorePatientProfile|http:NotFound|http:InternalServerError {
        // TODO: Implement patient update
    }

    // Delete a patient
    resource function delete Patient/[string id](http:Request req)
            returns http:NoContent|http:NotFound|http:InternalServerError {
        // TODO: Implement patient delete
    }
}
```

## Supported FHIR Versions

| FHIR Version | Status | Notes |
|--------------|--------|-------|
| R4 (4.0.1) | Fully supported | Most widely adopted version |
| R4B (4.3.0) | Supported | Minor update to R4 |
| R5 (5.0.0) | Supported | Latest release |

## Common Implementation Guides

| Implementation Guide | Description |
|---------------------|-------------|
| US Core | United States core FHIR profiles |
| International Patient Summary | Cross-border patient summary |
| SMART on FHIR | App authorization framework |
| CARIN Blue Button | Consumer-directed health data exchange |
| Da Vinci | Value-based care and payer/provider exchange |
| mCODE | Minimal Common Oncology Data Elements |
| AU Base | Australian base FHIR profiles |

## See Also

- [bal Command Reference](bal-commands.md) -- All bal subcommands
- [Healthcare HL7/FHIR Tutorial](/docs/tutorials/healthcare-hl7-fhir) -- End-to-end healthcare integration
- [Data Formats Reference](/docs/reference/data-formats) -- All supported data formats including FHIR and HL7
