---
title: HL7
---

# HL7

HL7 v2.x pipe-delimited message support is provided for healthcare systems integration through the `ballerinax/health.hl7v2commons` module (v2.0.1) and version-specific modules. These modules provide typed segment models, message parsing, and cross-version interoperability for all HL7 v2 versions from v2.3 through v2.8.

## Module

`ballerinax/health.hl7v2commons` (cross-version types)

Version-specific modules: `ballerinax/health.hl7v23`, `ballerinax/health.hl7v231`, `ballerinax/health.hl7v24`, `ballerinax/health.hl7v25`, `ballerinax/health.hl7v251`, `ballerinax/health.hl7v26`, `ballerinax/health.hl7v27`, `ballerinax/health.hl7v271`, `ballerinax/health.hl7v28`

## Usage

### Parse an HL7 v2 message

```ballerina
import ballerinax/health.hl7v2;

string hl7Message = "MSH|^~\\&|SENDING|FACILITY|RECEIVING|FACILITY|20240115||ADT^A01|MSG001|P|2.5\rPID|||12345||Smith^Jane||19900515|F";

hl7v2:Message msg = check hl7v2:parse(hl7Message);
```

### Work with typed segments

```ballerina
import ballerinax/health.hl7v25;

// Access typed segments for HL7 v2.5
hl7v25:MSH msh = {
    msh1: "|",
    msh2: "^~\\&",
    msh3: {hd1: "SENDING_APP"},
    msh4: {hd1: "SENDING_FACILITY"},
    msh5: {hd1: "RECEIVING_APP"},
    msh6: {hd1: "RECEIVING_FACILITY"},
    msh9: {msg1: "ADT", msg2: "A01"},
    msh10: "MSG001",
    msh11: {pt1: "P"},
    msh12: {vid1: "2.5"}
};

hl7v25:PID pid = {
    pid3: [{cx1: "12345"}],
    pid5: [{xpn1: {fn1: "Smith"}, xpn2: "Jane"}],
    pid7: "19900515",
    pid8: "F"
};
```

### Cross-version interoperability

```ballerina
import ballerinax/health.hl7v2commons;

// Union types work across HL7 versions
// Msh covers MSH from v2.3 through v2.8
hl7v2commons:Msh mshSegment = ...;

// Pid covers PID from v2.3 through v2.8
hl7v2commons:Pid pidSegment = ...;
```

## Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `parse` | `parse(string message) returns Message\|hl7v2:HL7Error` | Parse an HL7 v2 pipe-delimited message string into a typed `Message`. |

## Key segment types

The `hl7v2commons` module provides version-agnostic union types for the most common HL7 segments:

| Union type | HL7 segment | Description |
|------------|-------------|-------------|
| `Msh` | MSH | Message header — sending/receiving app, message type, version. |
| `Pid` | PID | Patient identification — name, DOB, gender, identifiers. |
| `Pv1` | PV1 | Patient visit — admission, attending physician, location. |
| `Pv2` | PV2 | Patient visit additional info — expected length, accommodation. |
| `Evn` | EVN | Event type — trigger event, date/time, operator. |
| `Nk1` | NK1 | Next of kin — contact name, relationship, phone. |
| `Al1` | AL1 | Allergy information — type, code, severity. |
| `Dg1` | DG1 | Diagnosis — code, description, type. |
| `Obx` | OBX | Observation/result — test, value, units, status. |
| `Orc` | ORC | Common order — order control, placer/filler number. |
| `Obr` | OBR | Observation request — test ordered, specimens, results. |
| `In1` | IN1 | Insurance — plan ID, company, group, policy. |
| `Gt1` | GT1 | Guarantor — name, address, phone, employer. |
| `Msa` | MSA | Message acknowledgment — ack code, message control ID. |
| `Mrg` | MRG | Merge patient — prior patient identifiers. |
| `Nte` | NTE | Notes and comments — comment type and text. |

## Supported versions

| Module | HL7 version | Latest version |
|--------|-------------|----------------|
| `health.hl7v23` | v2.3 | 4.0.1 |
| `health.hl7v231` | v2.3.1 | 4.0.1 |
| `health.hl7v24` | v2.4 | 4.0.1 |
| `health.hl7v25` | v2.5 | 4.0.1 |
| `health.hl7v251` | v2.5.1 | 4.0.1 |
| `health.hl7v26` | v2.6 | 4.0.1 |
| `health.hl7v27` | v2.7 | 4.0.1 |
| `health.hl7v28` | v2.8 | 4.0.1 |
