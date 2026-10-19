---
title: FHIR
---

# FHIR

HL7 FHIR (Fast Healthcare Interoperability Resources) R4 support is provided through the `ballerinax/health.fhir.r4` module (v6.3.0). It includes typed resource models, serialization to JSON/XML, bundle creation, reference handling, search parameter management, and XSD validation for healthcare integration.

## Module

`ballerinax/health.fhir.r4`

## Usage

### Create a FHIR resource

```ballerina
import ballerinax/health.fhir.r4;

r4:Patient patient = {
    resourceType: "Patient",
    id: "patient-001",
    name: [{family: "Smith", given: ["Jane"]}],
    gender: "female",
    birthDate: "1990-05-15",
    address: [{
        use: "home",
        city: "Springfield",
        state: "IL"
    }]
};
```

### Serialize to JSON and XML

```ballerina
import ballerinax/health.fhir.r4;

r4:Patient patient = {
    resourceType: "Patient",
    id: "patient-001",
    name: [{family: "Smith", given: ["Jane"]}],
    gender: "female",
    birthDate: "1990-05-15"
};

// Serialize to JSON
json patientJson = check r4:executeResourceJsonSerializer(patient);

// Serialize to XML
xml patientXml = check r4:executeResourceXMLSerializer(patient);
```

### Create a FHIR bundle

```ballerina
import ballerinax/health.fhir.r4;

r4:Patient patient1 = {
    resourceType: "Patient",
    id: "p1",
    name: [{family: "Smith", given: ["Jane"]}],
    gender: "female",
    birthDate: "1990-05-15"
};

r4:Patient patient2 = {
    resourceType: "Patient",
    id: "p2",
    name: [{family: "Doe", given: ["John"]}],
    gender: "male",
    birthDate: "1985-03-20"
};

r4:Bundle bundle = r4:createFhirBundle(r4:BUNDLE_TYPE_SEARCHSET, [patient1, patient2]);
```

### Create resource references

```ballerina
import ballerinax/health.fhir.r4;

// Relative reference
r4:Reference ref = check r4:createRelativeFhirReference(r4:Patient, "Patient/patient-001");

// Absolute reference
r4:Reference absRef = check r4:createAbsoluteFhirReference(
    r4:Patient,
    "https://fhir.example.com/Patient/patient-001"
);
```

## Functions

| Function | Description |
|----------|-------------|
| `executeResourceJsonSerializer` | Serialize any FHIR resource to JSON. |
| `executeResourceXMLSerializer` | Serialize any FHIR resource to XML. |
| `createFhirBundle` | Create a FHIR Bundle from an array of resources. |
| `createRelativeFhirReference` | Create a relative resource reference. |
| `createAbsoluteFhirReference` | Create an absolute resource reference. |
| `createContainedFhirReference` | Create a contained resource reference. |
| `errorToOperationOutcome` | Convert a FHIR error to an OperationOutcome resource. |

## Core resource types

| Type | Description |
|------|-------------|
| `Patient` | Patient demographic and administrative information. |
| `Bundle` | Container for a collection of resources. |
| `OperationOutcome` | Information about the outcome of an operation. |
| `CapabilityStatement` | Server capability declaration. |
| `CodeSystem` | Code system definition. |
| `ValueSet` | Value set definition. |
| `ConceptMap` | Concept mapping between code systems. |
| `Parameters` | Operation parameters. |

## Common data types

| Type | Fields | Description |
|------|--------|-------------|
| `HumanName` | `use`, `family`, `given`, `prefix`, `suffix`, `text`, `period` | Person name with components. |
| `Address` | `use`, `type`, `line`, `city`, `state`, `postalCode`, `country`, `period` | Postal or physical address. |
| `ContactPoint` | `system`, `value`, `use`, `rank`, `period` | Phone, email, fax, or URL. |
| `Identifier` | `use`, `type`, `system`, `value`, `period`, `assigner` | Business identifier. |
| `CodeableConcept` | `coding`, `text` | Coded value with optional text. |
| `Coding` | `system`, `version`, `code`, `display`, `userSelected` | Code from a terminology system. |
| `Reference` | `reference`, `type`, `identifier`, `display` | Reference to another resource. |
| `Period` | `start`, `end` | Time range with start and end. |
| `Quantity` | `value`, `comparator`, `unit`, `system`, `code` | Measured amount with unit. |

## Bundle types

| Constant | Description |
|----------|-------------|
| `BUNDLE_TYPE_DOCUMENT` | Clinical document. |
| `BUNDLE_TYPE_MESSAGE` | Message for event notification. |
| `BUNDLE_TYPE_TRANSACTION` | Transaction request. |
| `BUNDLE_TYPE_BATCH` | Batch of independent requests. |
| `BUNDLE_TYPE_SEARCHSET` | Search results. |
| `BUNDLE_TYPE_COLLECTION` | General collection. |
| `BUNDLE_TYPE_HISTORY` | Version history. |
