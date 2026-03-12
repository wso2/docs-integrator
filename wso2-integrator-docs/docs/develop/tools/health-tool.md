---
sidebar_position: 8
title: Health Tool
description: Generate FHIR and HL7 healthcare integration code from standard profiles and implementation guides.
---

# Health Tool

The `bal health` tool generates Ballerina code for healthcare integrations based on FHIR (Fast Healthcare Interoperability Resources) and HL7 standards. It creates type-safe resource types, service templates, and data transformation utilities that conform to healthcare interoperability profiles, accelerating the development of clinical and administrative healthcare integrations.

## Prerequisites

The Health tool is included with the Ballerina distribution:

```bash
bal health --help
```

## FHIR Integration

### Generating FHIR Resource Types

Generate Ballerina records from FHIR implementation guides and profiles:

```bash
# Generate types from a FHIR implementation guide
bal health fhir -i us-core-ig/ --mode types

# Generate from a specific FHIR profile
bal health fhir -i patient-profile.json --mode types -o generated/

# Generate from a FHIR package
bal health fhir --package hl7.fhir.us.core --mode types
```

### Generated FHIR Types

For a FHIR Patient resource, the tool generates Ballerina records with all profile constraints:

```ballerina
// Auto-generated from FHIR Patient resource
type Patient record {|
    string resourceType = "Patient";
    string? id = ();
    Meta? meta = ();
    Identifier[] identifier = [];
    boolean? active = ();
    HumanName[] name = [];
    ContactPoint[] telecom = [];
    "male"|"female"|"other"|"unknown" gender?;
    string? birthDate = ();
    boolean|string? deceased = ();
    Address[] address = [];
    CodeableConcept? maritalStatus = ();
    Reference? managingOrganization = ();
|};

type HumanName record {|
    "usual"|"official"|"temp"|"nickname"|"anonymous"|"old"|"maiden" use?;
    string? text = ();
    string? family = ();
    string[] given = [];
    string[] prefix = [];
    string[] suffix = [];
|};

type Identifier record {|
    "usual"|"official"|"temp"|"secondary"|"old" use?;
    CodeableConcept? 'type = ();
    string? system = ();
    string? value = ();
|};
```

### Generating a FHIR Service

Generate a Ballerina service that implements FHIR RESTful API interactions:

```bash
# Generate a FHIR server stub
bal health fhir -i us-core-ig/ --mode service -o generated/
```

The generated service includes resource endpoints for standard FHIR interactions:

```ballerina
import ballerina/http;
import ballerinax/health.fhir.r4;

service /fhir/r4 on new http:Listener(9090) {

    // Read a Patient by ID
    resource function get Patient/[string id]()
            returns r4:Patient|r4:OperationOutcome|error {
        // TODO: Implement read
    }

    // Search for Patients
    resource function get Patient(
            string? name,
            string? identifier,
            string? birthdate,
            string? gender
    ) returns r4:Bundle|error {
        // TODO: Implement search
    }

    // Create a Patient
    resource function post Patient(r4:Patient patient)
            returns r4:Patient|r4:OperationOutcome|error {
        // TODO: Implement create
    }

    // Update a Patient
    resource function put Patient/[string id](r4:Patient patient)
            returns r4:Patient|r4:OperationOutcome|error {
        // TODO: Implement update
    }
}
```

### Implementing a FHIR Service

```ballerina
import ballerina/http;
import ballerina/log;
import ballerinax/health.fhir.r4;
import ballerinax/mysql;

configurable string dbHost = ?;
configurable string dbUser = ?;
configurable string dbPassword = ?;

final mysql:Client db = check new (host = dbHost, user = dbUser,
    password = dbPassword, database = "fhir_store");

service /fhir/r4 on new http:Listener(9090) {

    resource function get Patient/[string id]()
            returns Patient|http:NotFound|error {
        Patient? patient = check db->queryRow(
            `SELECT * FROM patients WHERE id = ${id}`
        );
        if patient is () {
            return <http:NotFound>{
                body: {
                    resourceType: "OperationOutcome",
                    issue: [{severity: "error", code: "not-found",
                        diagnostics: "Patient " + id + " not found"}]
                }
            };
        }
        return patient;
    }

    resource function post Patient(Patient patient)
            returns Patient|error {
        string id = check generateResourceId();
        Patient newPatient = {...patient, id: id};
        _ = check db->execute(
            `INSERT INTO patients (id, data) VALUES (${id}, ${newPatient.toJsonString()})`
        );
        log:printInfo("Patient created", id = id);
        return newPatient;
    }
}
```

## HL7 Integration

### Generating HL7v2 Message Types

```bash
# Generate HL7v2 message types
bal health hl7 -i hl7v2-definitions/ --mode types

# Generate specific message types
bal health hl7 --message-types ADT_A01,ORM_O01 --mode types
```

### Working with HL7v2 Messages

```ballerina
import ballerinax/health.hl7v2;

// Parse an incoming HL7v2 message
function parseHL7Message(string rawMessage) returns hl7v2:Message|error {
    return hl7v2:parse(rawMessage);
}

// Create an ADT^A01 (Patient Admission) message
function createAdmitMessage(PatientInfo patient) returns string|error {
    hl7v2:ADT_A01 message = {
        msh: {
            fieldSeparator: "|",
            encodingCharacters: "^~\\&",
            sendingApplication: {namespaceId: "HIS"},
            sendingFacility: {namespaceId: "HOSPITAL"},
            messageType: {messageCode: "ADT", triggerEvent: "A01"},
            messageControlId: generateMessageId()
        },
        pid: {
            patientId: {idNumber: patient.id},
            patientName: [{familyName: patient.lastName, givenName: patient.firstName}],
            dateOfBirth: patient.birthDate,
            sex: patient.gender
        },
        pv1: {
            patientClass: "I",  // Inpatient
            assignedPatientLocation: {
                pointOfCare: patient.ward,
                room: patient.room,
                bed: patient.bed
            }
        }
    };

    return hl7v2:encode(message);
}
```

### HL7v2 Listener Service

```ballerina
import ballerinax/health.hl7v2;

listener hl7v2:Listener hl7Listener = new (3200);

service on hl7Listener {

    remote function onMessage(hl7v2:Message message) returns hl7v2:Message|error {
        // Route based on message type
        if message is hl7v2:ADT_A01 {
            check handleAdmission(message);
        } else if message is hl7v2:ORM_O01 {
            check handleOrder(message);
        }
        // Return ACK
        return hl7v2:createAck(message);
    }
}

function handleAdmission(hl7v2:ADT_A01 message) returns error? {
    string patientId = message.pid.patientId.idNumber;
    log:printInfo("Patient admission", patientId = patientId);
    // Process admission logic
}
```

## FHIR to HL7v2 Transformation

A common healthcare integration pattern is converting between FHIR and HL7v2:

```ballerina
function fhirPatientToHl7(Patient fhirPatient) returns hl7v2:PID {
    string family = fhirPatient.name.length() > 0
        ? (fhirPatient.name[0].family ?: "") : "";
    string given = fhirPatient.name.length() > 0 && fhirPatient.name[0].given.length() > 0
        ? fhirPatient.name[0].given[0] : "";

    return {
        patientId: {idNumber: fhirPatient.id ?: ""},
        patientName: [{familyName: family, givenName: given}],
        dateOfBirth: fhirPatient.birthDate ?: "",
        sex: mapGender(fhirPatient.gender ?: "unknown")
    };
}

function mapGender(string fhirGender) returns string {
    match fhirGender {
        "male" => { return "M"; }
        "female" => { return "F"; }
        "other" => { return "O"; }
        _ => { return "U"; }
    }
}
```

## Command Reference

| Command | Description |
|---|---|
| `bal health fhir -i <ig-dir> --mode types` | Generate FHIR resource types |
| `bal health fhir -i <ig-dir> --mode service` | Generate FHIR server stub |
| `bal health fhir --package <name> --mode types` | Generate from FHIR package |
| `bal health hl7 --message-types <types>` | Generate HL7v2 message types |
| `-o <dir>` | Output directory |

## What's Next

- [EDI Tool](edi-tool.md) -- Generate B2B data exchange code
- [OpenAPI Tool](openapi-tool.md) -- Expose healthcare services as REST APIs
- [Configuration Management](/docs/develop/design-logic/configuration-management) -- Manage healthcare endpoint configuration
