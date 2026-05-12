---
title: Setup Guide
---

# Setup Guide

This guide describes how to obtain and prepare a COBOL copybook schema file required by the Copybook connector.

## Prerequisites

- A COBOL copybook definition file (`.cpy`) describing the fixed-width data structure of your mainframe records. Obtain this from your mainframe team, COBOL source repository, or data dictionary.

## Step 1: Obtain the copybook schema file

A copybook schema file (`.cpy`) is a COBOL data definition that describes the structure
of your mainframe records. To obtain or create one:

1. Contact your mainframe or COBOL development team and request the copybook definition
   for the data structures you need to process. These are typically stored in mainframe
   PDS libraries or source control systems.
2. Copy the `.cpy` file to a location accessible by your Ballerina project
   (e.g., `resources/copybook.cpy`).
3. Verify the file uses standard COBOL level-number notation (e.g., `01`, `05`, `10`)
   and PIC clauses (e.g., `PIC X(10)`, `PIC 9(5)`, `PIC Z(2)99999.99`).

A minimal example of a copybook schema file:

```
01 EmployeeRecord.
   05 EmployeeId        PIC XXXX.
   05 EmployeeName.
      10 FirstName      PIC X(10).
      10 LastName       PIC X(10).
   05 EmployeeSalary    PIC Z(2)99999.99.
   05 EmployeeGrade     PIC X(1).
```

The connector supports common COBOL data constructs including nested group items, OCCURS (repeating arrays), REDEFINES, and signed/unsigned numeric PIC clauses. Ensure your copybook file uses COBOL fixed-format layout conventions.

## Step 2: Determine the encoding

Identify the encoding used by your mainframe data source:

- **ASCII**: Used by most modern systems and PC-based COBOL environments.
  This is the default encoding for the connector.
- **EBCDIC**: Used by IBM mainframes (z/OS, MVS). If your byte streams originate
  from an IBM mainframe, you must specify `EBCDIC` encoding when calling `toBytes`
  or `fromBytes`.

Confirm the encoding with your mainframe team or by inspecting sample byte streams.

If you are unsure of the encoding, start with ASCII (the default). If the deserialized output looks garbled or contains unexpected characters, switch to EBCDIC.
