---
title: Format Indicator
description: "Implement the Format Indicator pattern with WSO2 Integrator."
---

import TabItem from '@theme/TabItem';
import {
  EipReferenceLink,
  PatternImage,
  PatternImplementationTabs,
} from '@site/src/utils/eipPatternComponents';

# Format Indicator

Use a Format Indicator to design a message's data format so it can evolve: each message carries a version indicator, and receivers use it to interpret the message correctly even after the format changes. <EipReferenceLink href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/FormatIndicator.html" label="Enterprise Integration Patterns Format Indicator reference" />

In WSO2 Integrator, a format indicator is a discriminating field on a union of record types. Each record fixes its `version` field to a specific value, so the runtime binds the incoming message to the right format, and the flow branches on the resulting type.

## Example: Accepting two versions of a patient record

This example accepts patient data in two formats. Version `1.0` carries flat `firstName`/`lastName` fields, while version `2.0` nests a full `Patient` record. The `version` field in the payload is the format indicator: the service converts whichever version arrives into the current `Patient` format before forwarding it.

<PatternImplementationTabs>
<TabItem value="ui" label="Visual Designer" default>

1. Define the `PatientReqV1` and `PatientReqV2` record types, each with a fixed `version` field, and the `PatientReq` union type.
2. Create an [HTTP service](../../develop/integration-artifacts/service/http.md#creating-an-http-service) with a `post` resource that accepts a `PatientReq` payload.
3. Add an [If node](../../develop/understand-ide/editors/flow-diagram-editor/control.md#if) that checks whether the request is a `PatientReqV1`.
4. In each branch, map the versioned request into the current `Patient` format.
5. Post the converted patient to the downstream patient service connection.

The flow branches on the message version: version 1.0 and version 2.0 are each mapped into the current `Patient` format before being forwarded:

<PatternImage src="/img/eip-patterns/format_indicator_flow.png" alt="Format Indicator flow in the WSO2 Integrator visual designer" width={740} />

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
// docs-fold-start: Supporting definitions
import ballerina/http;

type PatientReqV1 record {|
    "1.0" version = "1.0";
    string firstName;
    string lastName;
    string dob;
    string diagnosis;
|};

type PatientReqV2 record {|
    "2.0" version = "2.0";
    Patient patient;
|};

type PatientReq PatientReqV1|PatientReqV2;

type Patient record {|
    string fullName;
    string dob;
    string diagnosis;
|};

final http:Client patientClient = check new ("http://api.patients.com.balmock.io");
// docs-fold-end

listener http:Listener httpListener = new (port = 8080);

service /api/v1 on httpListener {
    resource function post data/patient(PatientReq patintReq) returns error? {
        Patient patient;
        if patintReq is PatientReqV1 {
            patient = {
                dob: patintReq.dob,
                fullName: patintReq.firstName + " " + patintReq.lastName,
                diagnosis: patintReq.diagnosis
            };
        } else {
            patient = {
                dob: patintReq.patient.dob,
                fullName: patintReq.patient.fullName,
                diagnosis: patintReq.patient.diagnosis
            };
        }
        http:Response response = check patientClient->/patient.post(patient, targetType = http:Response);
    }

    resource function post patient(Patient patient) returns error? {
        http:Response response = check patientClient->/patient.post(patient, targetType = http:Response);
    }
}
```

</TabItem>
</PatternImplementationTabs>

## Complete sample

The complete project is available in the [format indicator sample](https://github.com/wso2/integration-samples/tree/main/integrator-default-profile/enterprise-integration-pattern/format_indicator) on GitHub.
