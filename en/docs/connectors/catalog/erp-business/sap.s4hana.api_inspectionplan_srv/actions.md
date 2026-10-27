---
connector: true
connector_name: "sap.s4hana.api_inspectionplan_srv"
title: "Actions"
description: "Reference for the SAP Inspection Plan connector client: configuration, initialization, and every operation with parameters, return types and samples."
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.s4hana.api_inspectionplan_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to SAP S/4HANA inspection plans, their material assignments, operations, inspection characteristics, dependent characteristic specifications and production resources/tools via the `API_INSPECTIONPLAN_SRV` OData API. |

---

## Client

Provides access to SAP S/4HANA inspection plans, their material assignments, operations, inspection characteristics, dependent characteristic specifications and production resources/tools via the `API_INSPECTIONPLAN_SRV` OData API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA `hostname` and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_INSPECTIONPLAN_SRV` from these values.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication configuration; use `http:CredentialsConfig` (username/password) for Basic Auth with the communication user. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x protocol settings. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `60` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | Optional | Redirection settings. |
| `poolConfig` | `http:PoolConfiguration` | Optional | Request pooling settings. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching settings. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | Optional | Circuit breaker settings. |
| `retryConfig` | `http:RetryConfig` | Optional | Retry settings. |
| `cookieConfig` | `http:CookieConfig` | Optional | Cookie settings. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | Optional | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | Optional | Proxy server configuration. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation using the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, treating `nil` values as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_inspectionplan_srv as inspectionplan;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

inspectionplan:Client inspectionplanClient = check new (
    {
        auth: {
            username: username,
            password: password
        }
    },
    hostname
);
```

### Operations

An inspection plan is identified by its task list group (`InspectionPlanGroup`) and group counter (`InspectionPlan`), plus an internal counter (`InspectionPlanInternalVersion`). The entities below the header add their own keys: an operation is identified by its task list node (`BOOOperationInternalID`), an inspection characteristic by its characteristic number (`BOOCharacteristic`) within the operation, and so on. Read the key values of existing entities with the `list` operations before you call the `get`, `patch` or `delete` operations.

The `create` records list the fields you can set on a new entity. They are open records, so the keys of the parent entity are passed as additional fields with string literal keys (for example `"InspectionPlanGroup": "50000012"`), as shown in the samples. The `patch` operations take a `Modified\ ...Type` record that wraps the matching `Update...` record in a `d` field, for example `{d: {OperationText: "Pressure test"}}`.

In the query records, `$select` and `$orderby` take arrays of the allowed property names, and `$top` and `$skip` take integers. Indicator fields such as `InspSpecIsQuantitative` are strings that hold `"X"` when set and `""` when not set.

#### Inspection plans

<details>
<summary>listA_InspectionPlans</summary>

<div>

Retrieves a collection of inspection plan headers. Each header identifies a plan by its task list group and group counter and holds the plant, task list usage, status and lot size range the plan applies to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspectionPlansQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionPlanWrapper|error`

Sample code:

```ballerina
inspectionplan:CollectionOfA_InspectionPlanWrapper result = check inspectionplanClient->listA_InspectionPlans(
    queries = {
        \$filter: "Plant eq '1710' and BillOfOperationsUsage eq '5'",
        \$top: 2,
        \$select: ["InspectionPlanGroup", "InspectionPlan", "BillOfOperationsDesc", "Plant", "BillOfOperationsStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionPlanGroup": "50000012",
        "InspectionPlan": "1",
        "BillOfOperationsDesc": "Incoming inspection valve housing",
        "Plant": "1710",
        "BillOfOperationsStatus": "4"
      },
      {
        "InspectionPlanGroup": "50000013",
        "InspectionPlan": "1",
        "BillOfOperationsDesc": "Incoming inspection pump shaft",
        "Plant": "1710",
        "BillOfOperationsStatus": "4"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_InspectionPlan</summary>

<div>

Retrieves a single inspection plan header by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspectionPlanQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspectionPlanWrapper|error`

Sample code:

```ballerina
inspectionplan:A_InspectionPlanWrapper plan = check inspectionplanClient->getA_InspectionPlan(
    "50000012",
    "1",
    "00000001"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionPlanGroup": "50000012",
    "InspectionPlan": "1",
    "InspectionPlanInternalVersion": "00000001",
    "IsDeleted": false,
    "BillOfOperationsDesc": "Incoming inspection valve housing",
    "Plant": "1710",
    "BillOfOperationsUsage": "5",
    "BillOfOperationsStatus": "4",
    "ResponsiblePlannerGroup": "",
    "MinimumLotSizeQuantity": "0",
    "MaximumLotSizeQuantity": "99999999",
    "BillOfOperationsUnit": "EA",
    "ReplacedBillOfOperations": "",
    "IsMarkedForDeletion": false,
    "InspPlanHasMultipleSpec": "",
    "InspSubsetFieldCombination": "",
    "InspectionPartialLotAssignment": "",
    "SmplDrawingProcedure": "",
    "SmplDrawingProcedureVersion": "",
    "InspectionLotDynamicLevel": "",
    "InspLotDynamicRule": "",
    "InspExternalNumberingOfValues": "",
    "CreationDate": "/Date(1729296000000)/",
    "CreatedByUser": "CB9980000010",
    "LastChangeDate": null,
    "LastChangedByUser": "",
    "ChangeNumber": "",
    "ValidityStartDate": "/Date(1729296000000)/",
    "ValidityEndDate": "/Date(253402214400000)/",
    "ChangedDateTime": "20241019091500"
  }
}
```

</div>

</details>

<details>
<summary>createA_InspectionPlan</summary>

<div>

Creates an inspection plan header. `InspectionPlanGroup`, `InspectionPlan`, `Plant`, `BillOfOperationsUsage` (task list usage, for example `5` for goods receipt), `BillOfOperationsStatus` (for example `4` for released) and `BillOfOperationsUnit` are required.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_InspectionPlan` | Yes | Inspection plan header data. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspectionPlanWrapper|error`

Sample code:

```ballerina
inspectionplan:A_InspectionPlanWrapper created = check inspectionplanClient->createA_InspectionPlan({
    InspectionPlanGroup: "50000012",
    InspectionPlan: "1",
    BillOfOperationsDesc: "Incoming inspection valve housing",
    Plant: "1710",
    BillOfOperationsUsage: "5",
    BillOfOperationsStatus: "4",
    BillOfOperationsUnit: "EA"
});
```

Sample response:

```ballerina
{
  "d": {
    "InspectionPlanGroup": "50000012",
    "InspectionPlan": "1",
    "InspectionPlanInternalVersion": "00000001",
    "BillOfOperationsDesc": "Incoming inspection valve housing",
    "Plant": "1710",
    "BillOfOperationsUsage": "5",
    "BillOfOperationsStatus": "4",
    "BillOfOperationsUnit": "EA",
    "ValidityStartDate": "/Date(1729296000000)/"
  }
}
```

</div>

</details>

<details>
<summary>patchA_InspectionPlan</summary>

<div>

Updates an inspection plan header using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `payload` | `Modified\ A_InspectionPlanType` | Yes | Wraps an `UpdateA_InspectionPlan` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionplanClient->patchA_InspectionPlan(
    "50000012",
    "1",
    "00000001",
    {d: {BillOfOperationsDesc: "Incoming inspection valve housing rev. B", MaximumLotSizeQuantity: "5000"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_InspectionPlan</summary>

<div>

Deletes an inspection plan header by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionplanClient->deleteA_InspectionPlan(
    "50000012",
    "1",
    "00000001",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Material assignments

<details>
<summary>listA_InspPlanMaterialAssgmts</summary>

<div>

Retrieves a collection of material assignments. A material assignment links an inspection plan to a material in a plant, optionally restricted to a supplier or customer, so that the plan is used for inspection lots of that material.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspPlanMaterialAssgmtsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspPlanMaterialAssgmtWrapper|error`

Sample code:

```ballerina
inspectionplan:CollectionOfA_InspPlanMaterialAssgmtWrapper result = check inspectionplanClient->listA_InspPlanMaterialAssgmts(
    queries = {
        \$filter: "Material eq 'QM-VALVE-01' and Plant eq '1710'",
        \$select: ["Material", "Plant", "InspectionPlanGroup", "InspectionPlan", "Supplier"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "Material": "QM-VALVE-01",
        "Plant": "1710",
        "InspectionPlanGroup": "50000012",
        "InspectionPlan": "1",
        "Supplier": "17300001"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_InspPlanMaterialAssgmt</summary>

<div>

Retrieves a single material assignment by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number, up to 40 characters (e.g., `"QM-VALVE-01"`). |
| `Plant` | `string` | Yes | Plant, up to 4 characters (e.g., `"1710"`). |
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `InspPlanMatlAssignment` | `string` | Yes | Counter for additional criteria of the material assignment, up to 7 characters (e.g., `"0000001"`). |
| `InspPlanMatlAssgmtIntVersion` | `string` | Yes | Internal counter of the material assignment (e.g., `"00000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspPlanMaterialAssgmtQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspPlanMaterialAssgmtWrapper|error`

Sample code:

```ballerina
inspectionplan:A_InspPlanMaterialAssgmtWrapper assignment = check inspectionplanClient->getA_InspPlanMaterialAssgmt(
    "QM-VALVE-01",
    "1710",
    "50000012",
    "1",
    "0000001",
    "00000001"
);
```

Sample response:

```ballerina
{
  "d": {
    "Material": "QM-VALVE-01",
    "Plant": "1710",
    "InspectionPlanGroup": "50000012",
    "InspectionPlan": "1",
    "InspPlanMatlAssignment": "0000001",
    "InspPlanMatlAssgmtIntVersion": "00000001",
    "InspectionPlanInternalVersion": "00000001",
    "ValidityStartDate": "/Date(1729296000000)/",
    "ValidityEndDate": "/Date(253402214400000)/",
    "ChangeNumber": "",
    "CreationDate": "/Date(1729296000000)/",
    "CreatedByUser": "CB9980000010",
    "LastChangeDate": null,
    "LastChangedByUser": "",
    "IsDeleted": false,
    "Supplier": "17300001",
    "Customer": "",
    "MultipleSpecificationObject": "",
    "MultipleSpecificationObjType": "",
    "BOOSearchText": "",
    "ChangedDateTime": "20241019091500"
  }
}
```

</div>

</details>

<details>
<summary>createA_InspPlanMaterialAssgmt</summary>

<div>

Assigns a material in a plant to an inspection plan. `Material` and `Plant` are required fields of the record type. The record is open, so the keys of the target plan (`InspectionPlanGroup` and `InspectionPlan`) are passed as additional fields with string literal keys.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_InspPlanMaterialAssgmt` | Yes | Material assignment data. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspPlanMaterialAssgmtWrapper|error`

Sample code:

```ballerina
inspectionplan:A_InspPlanMaterialAssgmtWrapper created = check inspectionplanClient->createA_InspPlanMaterialAssgmt({
    "InspectionPlanGroup": "50000012",
    "InspectionPlan": "1",
    Material: "QM-VALVE-01",
    Plant: "1710",
    Supplier: "17300001"
});
```

Sample response:

```ballerina
{
  "d": {
    "Material": "QM-VALVE-01",
    "Plant": "1710",
    "InspectionPlanGroup": "50000012",
    "InspectionPlan": "1",
    "InspPlanMatlAssignment": "0000001",
    "InspPlanMatlAssgmtIntVersion": "00000001",
    "Supplier": "17300001"
  }
}
```

</div>

</details>

<details>
<summary>patchA_InspPlanMaterialAssgmt</summary>

<div>

Updates a material assignment using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number, up to 40 characters (e.g., `"QM-VALVE-01"`). |
| `Plant` | `string` | Yes | Plant, up to 4 characters (e.g., `"1710"`). |
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `InspPlanMatlAssignment` | `string` | Yes | Counter for additional criteria of the material assignment, up to 7 characters (e.g., `"0000001"`). |
| `InspPlanMatlAssgmtIntVersion` | `string` | Yes | Internal counter of the material assignment (e.g., `"00000001"`). |
| `payload` | `Modified\ A_InspPlanMaterialAssgmtType` | Yes | Wraps an `UpdateA_InspPlanMaterialAssgmt` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionplanClient->patchA_InspPlanMaterialAssgmt(
    "QM-VALVE-01",
    "1710",
    "50000012",
    "1",
    "0000001",
    "00000001",
    {d: {Supplier: "17300002"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_InspPlanMaterialAssgmt</summary>

<div>

Deletes a material assignment by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Material` | `string` | Yes | Material number, up to 40 characters (e.g., `"QM-VALVE-01"`). |
| `Plant` | `string` | Yes | Plant, up to 4 characters (e.g., `"1710"`). |
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `InspPlanMatlAssignment` | `string` | Yes | Counter for additional criteria of the material assignment, up to 7 characters (e.g., `"0000001"`). |
| `InspPlanMatlAssgmtIntVersion` | `string` | Yes | Internal counter of the material assignment (e.g., `"00000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionplanClient->deleteA_InspPlanMaterialAssgmt(
    "QM-VALVE-01",
    "1710",
    "50000012",
    "1",
    "0000001",
    "00000001",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Operations

<details>
<summary>listA_InspPlanOperations</summary>

<div>

Retrieves a collection of inspection plan operations. An operation is an inspection step, carried out at a work center, that groups the inspection characteristics to be checked.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspPlanOperationsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspPlanOperationWrapper|error`

Sample code:

```ballerina
inspectionplan:CollectionOfA_InspPlanOperationWrapper result = check inspectionplanClient->listA_InspPlanOperations(
    queries = {
        \$filter: "InspectionPlanGroup eq '50000012' and InspectionPlan eq '1'",
        \$orderby: ["Operation"],
        \$select: ["BOOOperationInternalID", "Operation", "OperationText", "WorkCenterInternalID", "OperationControlProfile"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BOOOperationInternalID": "00000001",
        "Operation": "0010",
        "OperationText": "Dimensional check",
        "WorkCenterInternalID": "10000020",
        "OperationControlProfile": "QM01"
      },
      {
        "BOOOperationInternalID": "00000002",
        "Operation": "0020",
        "OperationText": "Pressure test",
        "WorkCenterInternalID": "10000021",
        "OperationControlProfile": "QM01"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_InspPlanOperation</summary>

<div>

Retrieves a single inspection plan operation by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `BOOOperationInternalID` | `string` | Yes | Number of the task list node that identifies the operation (e.g., `"00000001"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `BOOOpInternalVersionCounter` | `string` | Yes | Internal counter of the operation (e.g., `"00000001"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspPlanOperationQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspPlanOperationWrapper|error`

Sample code:

```ballerina
inspectionplan:A_InspPlanOperationWrapper operation = check inspectionplanClient->getA_InspPlanOperation(
    "50000012",
    "00000001",
    "00000001",
    "00000001",
    "1"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionPlanGroup": "50000012",
    "BOOOperationInternalID": "00000001",
    "InspectionPlanInternalVersion": "00000001",
    "BOOOpInternalVersionCounter": "00000001",
    "InspectionPlan": "1",
    "WorkCenterInternalID": "10000020",
    "WorkCenterTypeCode": "A",
    "IsDeleted": false,
    "IsImplicitlyDeleted": false,
    "OperationExternalID": "",
    "Operation": "0010",
    "OperationText": "Dimensional check",
    "Plant": "1710",
    "OperationControlProfile": "QM01",
    "OperationStandardTextCode": "",
    "BillOfOperationsRefType": "",
    "BillOfOperationsRefGroup": "",
    "BillOfOperationsRefVariant": "",
    "InspResultRecordingView": "",
    "InspSbstCompletionConfirmation": "",
    "InspSbstHasNoTimeOrQuantity": "",
    "OperationReferenceQuantity": "1",
    "OperationUnit": "EA",
    "OpQtyToBaseQtyDnmntr": "1",
    "OpQtyToBaseQtyNmrtr": "1",
    "CreationDate": "/Date(1729296000000)/",
    "CreatedByUser": "CB9980000010",
    "LastChangeDate": null,
    "LastChangedByUser": "",
    "ChangedDateTime": "20241019091500",
    "ChangeNumber": "",
    "ValidityStartDate": "/Date(1729296000000)/",
    "ValidityEndDate": "/Date(253402214400000)/"
  }
}
```

</div>

</details>

<details>
<summary>createA_InspPlanOperation</summary>

<div>

Creates an operation in an inspection plan. `Operation` (activity number), `Plant` and `OperationControlProfile` (control key) are required fields of the record type. The record is open, so the keys of the target plan (`InspectionPlanGroup` and `InspectionPlan`) are passed as additional fields with string literal keys.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_InspPlanOperation` | Yes | Operation data. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspPlanOperationWrapper|error`

Sample code:

```ballerina
inspectionplan:A_InspPlanOperationWrapper created = check inspectionplanClient->createA_InspPlanOperation({
    "InspectionPlanGroup": "50000012",
    "InspectionPlan": "1",
    Operation: "0020",
    OperationText: "Pressure test",
    Plant: "1710",
    OperationControlProfile: "QM01",
    WorkCenterInternalID: "10000021",
    WorkCenterTypeCode: "A"
});
```

Sample response:

```ballerina
{
  "d": {
    "InspectionPlanGroup": "50000012",
    "BOOOperationInternalID": "00000002",
    "InspectionPlanInternalVersion": "00000001",
    "BOOOpInternalVersionCounter": "00000002",
    "InspectionPlan": "1",
    "Operation": "0020",
    "OperationText": "Pressure test",
    "Plant": "1710",
    "OperationControlProfile": "QM01",
    "WorkCenterInternalID": "10000021",
    "WorkCenterTypeCode": "A"
  }
}
```

</div>

</details>

<details>
<summary>patchA_InspPlanOperation</summary>

<div>

Updates an inspection plan operation using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `BOOOperationInternalID` | `string` | Yes | Number of the task list node that identifies the operation (e.g., `"00000001"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `BOOOpInternalVersionCounter` | `string` | Yes | Internal counter of the operation (e.g., `"00000001"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `payload` | `Modified\ A_InspPlanOperationType` | Yes | Wraps an `UpdateA_InspPlanOperation` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionplanClient->patchA_InspPlanOperation(
    "50000012",
    "00000001",
    "00000001",
    "00000001",
    "1",
    {d: {OperationText: "Dimensional and visual check"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_InspPlanOperation</summary>

<div>

Deletes an inspection plan operation by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `BOOOperationInternalID` | `string` | Yes | Number of the task list node that identifies the operation (e.g., `"00000001"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `BOOOpInternalVersionCounter` | `string` | Yes | Internal counter of the operation (e.g., `"00000001"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionplanClient->deleteA_InspPlanOperation(
    "50000012",
    "00000001",
    "00000001",
    "00000001",
    "1",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Inspection characteristics

<details>
<summary>listA_InspPlanOpCharacteristics</summary>

<div>

Retrieves a collection of inspection characteristics. An inspection characteristic is a property checked in an operation, such as a diameter or a surface finish. It usually refers to a master inspection characteristic and holds the specification (target value, tolerance limits and unit) and the sampling procedure.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspPlanOpCharacteristicsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspPlanOpCharacteristicWrapper|error`

Sample code:

```ballerina
inspectionplan:CollectionOfA_InspPlanOpCharacteristicWrapper result = check inspectionplanClient->listA_InspPlanOpCharacteristics(
    queries = {
        \$filter: "InspectionPlanGroup eq '50000012' and BOOOperationInternalID eq '00000001'",
        \$select: ["BOOCharacteristic", "InspectionSpecification", "InspectionSpecificationText", "InspSpecLowerLimit", "InspSpecUpperLimit", "InspectionSpecificationUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BOOCharacteristic": "0010",
        "InspectionSpecification": "QM-DIAMETER",
        "InspectionSpecificationText": "Outer diameter",
        "InspSpecLowerLimit": "49.95",
        "InspSpecUpperLimit": "50.05",
        "InspectionSpecificationUnit": "MM"
      },
      {
        "BOOCharacteristic": "0020",
        "InspectionSpecification": "QM-SURFACE",
        "InspectionSpecificationText": "Surface finish",
        "InspSpecLowerLimit": "0",
        "InspSpecUpperLimit": "0",
        "InspectionSpecificationUnit": ""
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_InspPlanOpCharacteristic</summary>

<div>

Retrieves a single inspection characteristic by its key. The entity has many specification fields, so use `$select` to read only the ones you need.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `BOOOperationInternalID` | `string` | Yes | Number of the task list node that identifies the operation (e.g., `"00000001"`). |
| `BOOCharacteristic` | `string` | Yes | Inspection characteristic number, up to 4 characters (e.g., `"0010"`). |
| `BOOCharacteristicVersion` | `string` | Yes | Internal counter of the inspection characteristic (e.g., `"00000001"`). |
| `BOOOpInternalVersionCounter` | `string` | Yes | Internal counter of the operation (e.g., `"00000001"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspPlanOpCharacteristicQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspPlanOpCharacteristicWrapper|error`

Sample code:

```ballerina
inspectionplan:A_InspPlanOpCharacteristicWrapper characteristic = check inspectionplanClient->getA_InspPlanOpCharacteristic(
    "50000012",
    "00000001",
    "0010",
    "00000001",
    "00000001",
    "00000001",
    "1",
    queries = {
        \$select: ["BOOCharacteristic", "InspectionSpecification", "InspectionSpecificationPlant", "InspectionSpecificationText",
            "InspSpecIsQuantitative", "InspSpecDecimalPlaces", "InspectionSpecificationUnit", "InspSpecTargetValue",
            "InspSpecLowerLimit", "InspSpecUpperLimit", "SamplingProcedure"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "BOOCharacteristic": "0010",
    "InspectionSpecification": "QM-DIAMETER",
    "InspectionSpecificationPlant": "1710",
    "InspectionSpecificationText": "Outer diameter",
    "InspSpecIsQuantitative": "X",
    "InspSpecDecimalPlaces": 2,
    "InspectionSpecificationUnit": "MM",
    "InspSpecTargetValue": "50",
    "InspSpecLowerLimit": "49.95",
    "InspSpecUpperLimit": "50.05",
    "SamplingProcedure": "FIX-5"
  }
}
```

</div>

</details>

<details>
<summary>createA_InspPlanOpCharacteristic</summary>

<div>

Creates an inspection characteristic in an operation. All fields of the record type are optional. The record is open, so the keys of the target operation (`InspectionPlanGroup`, `InspectionPlan` and `BOOOperationInternalID`) are passed as additional fields with string literal keys.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_InspPlanOpCharacteristic` | Yes | Inspection characteristic data. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspPlanOpCharacteristicWrapper|error`

Sample code:

```ballerina
inspectionplan:A_InspPlanOpCharacteristicWrapper created = check inspectionplanClient->createA_InspPlanOpCharacteristic({
    "InspectionPlanGroup": "50000012",
    "InspectionPlan": "1",
    "BOOOperationInternalID": "00000001",
    InspectionSpecification: "QM-DIAMETER",
    InspectionSpecificationPlant: "1710",
    InspectionSpecificationVersion: "1",
    InspSpecIsQuantitative: "X",
    InspSpecDecimalPlaces: 2,
    InspectionSpecificationUnit: "MM",
    InspSpecTargetValue: "50",
    InspSpecLowerLimit: "49.95",
    InspSpecUpperLimit: "50.05",
    SamplingProcedure: "FIX-5"
});
```

Sample response:

```ballerina
{
  "d": {
    "InspectionPlanGroup": "50000012",
    "BOOOperationInternalID": "00000001",
    "BOOCharacteristic": "0010",
    "BOOCharacteristicVersion": "00000001",
    "BOOOpInternalVersionCounter": "00000001",
    "InspectionPlanInternalVersion": "00000001",
    "InspectionPlan": "1",
    "InspectionSpecification": "QM-DIAMETER",
    "InspectionSpecificationText": "Outer diameter",
    "InspSpecTargetValue": "50",
    "InspSpecLowerLimit": "49.95",
    "InspSpecUpperLimit": "50.05",
    "InspectionSpecificationUnit": "MM"
  }
}
```

</div>

</details>

<details>
<summary>patchA_InspPlanOpCharacteristic</summary>

<div>

Updates an inspection characteristic using a PATCH request, for example to tighten its tolerance limits.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `BOOOperationInternalID` | `string` | Yes | Number of the task list node that identifies the operation (e.g., `"00000001"`). |
| `BOOCharacteristic` | `string` | Yes | Inspection characteristic number, up to 4 characters (e.g., `"0010"`). |
| `BOOCharacteristicVersion` | `string` | Yes | Internal counter of the inspection characteristic (e.g., `"00000001"`). |
| `BOOOpInternalVersionCounter` | `string` | Yes | Internal counter of the operation (e.g., `"00000001"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `payload` | `Modified\ A_InspPlanOpCharacteristicType` | Yes | Wraps an `UpdateA_InspPlanOpCharacteristic` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionplanClient->patchA_InspPlanOpCharacteristic(
    "50000012",
    "00000001",
    "0010",
    "00000001",
    "00000001",
    "00000001",
    "1",
    {d: {InspSpecLowerLimit: "49.97", InspSpecUpperLimit: "50.03"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_InspPlanOpCharacteristic</summary>

<div>

Deletes an inspection characteristic by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `BOOOperationInternalID` | `string` | Yes | Number of the task list node that identifies the operation (e.g., `"00000001"`). |
| `BOOCharacteristic` | `string` | Yes | Inspection characteristic number, up to 4 characters (e.g., `"0010"`). |
| `BOOCharacteristicVersion` | `string` | Yes | Internal counter of the inspection characteristic (e.g., `"00000001"`). |
| `BOOOpInternalVersionCounter` | `string` | Yes | Internal counter of the operation (e.g., `"00000001"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionplanClient->deleteA_InspPlanOpCharacteristic(
    "50000012",
    "00000001",
    "0010",
    "00000001",
    "00000001",
    "00000001",
    "1",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Dependent characteristic specifications

<details>
<summary>listA_InspPlanDepdntCharcs</summary>

<div>

Retrieves a collection of dependent characteristic specifications. A dependent characteristic specification overrides the specification of an inspection characteristic (for example its limits) for a specific material, supplier, customer or multiple specification object.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspPlanDepdntCharcsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspPlanDepdntCharcWrapper|error`

Sample code:

```ballerina
inspectionplan:CollectionOfA_InspPlanDepdntCharcWrapper result = check inspectionplanClient->listA_InspPlanDepdntCharcs(
    queries = {
        \$filter: "InspectionPlanGroup eq '50000012' and BOOCharacteristic eq '0010'",
        \$select: ["BOODpndantCharcSpec", "Material", "Supplier", "InspSpecLowerLimit", "InspSpecUpperLimit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BOODpndantCharcSpec": "0001",
        "Material": "QM-VALVE-01",
        "Supplier": "17300001",
        "InspSpecLowerLimit": "49.98",
        "InspSpecUpperLimit": "50.02"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_InspPlanDepdntCharc</summary>

<div>

Retrieves a single dependent characteristic specification by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `BOOOperationInternalID` | `string` | Yes | Number of the task list node that identifies the operation (e.g., `"00000001"`). |
| `BOOOpInternalVersionCounter` | `string` | Yes | Internal counter of the operation (e.g., `"00000001"`). |
| `BOOCharacteristic` | `string` | Yes | Inspection characteristic number, up to 4 characters (e.g., `"0010"`). |
| `BOOCharacteristicVersion` | `string` | Yes | Internal counter of the inspection characteristic (e.g., `"00000001"`). |
| `BOODpndantCharcSpec` | `string` | Yes | Number of the dependent characteristic specification, up to 4 characters (e.g., `"0001"`). |
| `BOODpndantCharcSpecVers` | `string` | Yes | Internal counter of the dependent characteristic specification (e.g., `"00000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspPlanDepdntCharcQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspPlanDepdntCharcWrapper|error`

Sample code:

```ballerina
inspectionplan:A_InspPlanDepdntCharcWrapper dependentSpec = check inspectionplanClient->getA_InspPlanDepdntCharc(
    "50000012",
    "1",
    "00000001",
    "00000001",
    "00000001",
    "0010",
    "00000001",
    "0001",
    "00000001",
    queries = {
        \$select: ["BOODpndantCharcSpec", "Material", "Plant", "Supplier", "InspectionSpecificationText",
            "InspSpecTargetValue", "InspSpecLowerLimit", "InspSpecUpperLimit", "InspectionSpecificationUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "BOODpndantCharcSpec": "0001",
    "Material": "QM-VALVE-01",
    "Plant": "1710",
    "Supplier": "17300001",
    "InspectionSpecificationText": "Outer diameter (supplier 17300001)",
    "InspSpecTargetValue": "50",
    "InspSpecLowerLimit": "49.98",
    "InspSpecUpperLimit": "50.02",
    "InspectionSpecificationUnit": "MM"
  }
}
```

</div>

</details>

<details>
<summary>createA_InspPlanDepdntCharc</summary>

<div>

Creates a dependent characteristic specification for an inspection characteristic. All fields of the record type are optional. The record is open, so the keys of the target characteristic (`InspectionPlanGroup`, `InspectionPlan`, `BOOOperationInternalID` and `BOOCharacteristic`) are passed as additional fields with string literal keys.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_InspPlanDepdntCharc` | Yes | Dependent characteristic specification data. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspPlanDepdntCharcWrapper|error`

Sample code:

```ballerina
inspectionplan:A_InspPlanDepdntCharcWrapper created = check inspectionplanClient->createA_InspPlanDepdntCharc({
    "InspectionPlanGroup": "50000012",
    "InspectionPlan": "1",
    "BOOOperationInternalID": "00000001",
    "BOOCharacteristic": "0010",
    Material: "QM-VALVE-01",
    Plant: "1710",
    Supplier: "17300001",
    InspSpecTargetValue: "50",
    InspSpecLowerLimit: "49.98",
    InspSpecUpperLimit: "50.02"
});
```

Sample response:

```ballerina
{
  "d": {
    "InspectionPlanGroup": "50000012",
    "InspectionPlan": "1",
    "InspectionPlanInternalVersion": "00000001",
    "BOOOperationInternalID": "00000001",
    "BOOOpInternalVersionCounter": "00000001",
    "BOOCharacteristic": "0010",
    "BOOCharacteristicVersion": "00000001",
    "BOODpndantCharcSpec": "0001",
    "BOODpndantCharcSpecVers": "00000001",
    "Material": "QM-VALVE-01",
    "Plant": "1710",
    "Supplier": "17300001",
    "InspSpecTargetValue": "50",
    "InspSpecLowerLimit": "49.98",
    "InspSpecUpperLimit": "50.02"
  }
}
```

</div>

</details>

<details>
<summary>patchA_InspPlanDepdntCharc</summary>

<div>

Updates a dependent characteristic specification using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `BOOOperationInternalID` | `string` | Yes | Number of the task list node that identifies the operation (e.g., `"00000001"`). |
| `BOOOpInternalVersionCounter` | `string` | Yes | Internal counter of the operation (e.g., `"00000001"`). |
| `BOOCharacteristic` | `string` | Yes | Inspection characteristic number, up to 4 characters (e.g., `"0010"`). |
| `BOOCharacteristicVersion` | `string` | Yes | Internal counter of the inspection characteristic (e.g., `"00000001"`). |
| `BOODpndantCharcSpec` | `string` | Yes | Number of the dependent characteristic specification, up to 4 characters (e.g., `"0001"`). |
| `BOODpndantCharcSpecVers` | `string` | Yes | Internal counter of the dependent characteristic specification (e.g., `"00000001"`). |
| `payload` | `Modified\ A_InspPlanDepdntCharcType` | Yes | Wraps an `UpdateA_InspPlanDepdntCharc` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionplanClient->patchA_InspPlanDepdntCharc(
    "50000012",
    "1",
    "00000001",
    "00000001",
    "00000001",
    "0010",
    "00000001",
    "0001",
    "00000001",
    {d: {InspSpecLowerLimit: "49.99", InspSpecUpperLimit: "50.01"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_InspPlanDepdntCharc</summary>

<div>

Deletes a dependent characteristic specification by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `BOOOperationInternalID` | `string` | Yes | Number of the task list node that identifies the operation (e.g., `"00000001"`). |
| `BOOOpInternalVersionCounter` | `string` | Yes | Internal counter of the operation (e.g., `"00000001"`). |
| `BOOCharacteristic` | `string` | Yes | Inspection characteristic number, up to 4 characters (e.g., `"0010"`). |
| `BOOCharacteristicVersion` | `string` | Yes | Internal counter of the inspection characteristic (e.g., `"00000001"`). |
| `BOODpndantCharcSpec` | `string` | Yes | Number of the dependent characteristic specification, up to 4 characters (e.g., `"0001"`). |
| `BOODpndantCharcSpecVers` | `string` | Yes | Internal counter of the dependent characteristic specification (e.g., `"00000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionplanClient->deleteA_InspPlanDepdntCharc(
    "50000012",
    "1",
    "00000001",
    "00000001",
    "00000001",
    "0010",
    "00000001",
    "0001",
    "00000001",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Production resources/tools

<details>
<summary>listA_InspPlanOpPRTs</summary>

<div>

Retrieves a collection of production resource/tool (PRT) assignments. A PRT is an item needed to carry out an operation, such as a piece of test equipment, a gauge, a material or a document.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspPlanOpPRTsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspPlanOpPRTWrapper|error`

Sample code:

```ballerina
inspectionplan:CollectionOfA_InspPlanOpPRTWrapper result = check inspectionplanClient->listA_InspPlanOpPRTs(
    queries = {
        \$filter: "InspectionPlanGroup eq '50000012' and BOOOperationInternalID eq '00000001'",
        \$select: ["BOOOperationPRTInternalID", "ProdnRsceToolItemNumber", "ProdnRsceToolCategory", "Equipment", "EquipmentName"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "BOOOperationPRTInternalID": "00000001",
        "ProdnRsceToolItemNumber": "0010",
        "ProdnRsceToolCategory": "E",
        "Equipment": "10000045",
        "EquipmentName": "Digital caliper 0-150 mm"
      }
    ]
  }
}
```

</div>

</details>

<details>
<summary>getA_InspPlanOpPRT</summary>

<div>

Retrieves a single production resource/tool assignment by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `BOOOpInternalVersionCounter` | `string` | Yes | Internal counter of the operation (e.g., `"00000001"`). |
| `BOOOperationInternalID` | `string` | Yes | Number of the task list node that identifies the operation (e.g., `"00000001"`). |
| `BOOOperationPRTInternalID` | `string` | Yes | Internal number of the production resource/tool assignment (e.g., `"00000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspPlanOpPRTQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspPlanOpPRTWrapper|error`

Sample code:

```ballerina
inspectionplan:A_InspPlanOpPRTWrapper prt = check inspectionplanClient->getA_InspPlanOpPRT(
    "50000012",
    "1",
    "00000001",
    "00000001",
    "00000001",
    "00000001",
    queries = {
        \$select: ["BOOOperationPRTInternalID", "ProdnRsceToolItemNumber", "ProdnRsceToolCategory", "Equipment",
            "EquipmentName", "ProdnRsceToolUsageQuantity", "ProdnRsceToolUsageQuantityUnit", "Plant"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "BOOOperationPRTInternalID": "00000001",
    "ProdnRsceToolItemNumber": "0010",
    "ProdnRsceToolCategory": "E",
    "Equipment": "10000045",
    "EquipmentName": "Digital caliper 0-150 mm",
    "ProdnRsceToolUsageQuantity": "1",
    "ProdnRsceToolUsageQuantityUnit": "EA",
    "Plant": "1710"
  }
}
```

</div>

</details>

<details>
<summary>createA_InspPlanOpPRT</summary>

<div>

Assigns a production resource/tool to an operation. All fields of the record type are optional. The record is open, so the keys of the target operation (`InspectionPlanGroup`, `InspectionPlan` and `BOOOperationInternalID`) are passed as additional fields with string literal keys.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_InspPlanOpPRT` | Yes | Production resource/tool assignment data. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspPlanOpPRTWrapper|error`

Sample code:

```ballerina
inspectionplan:A_InspPlanOpPRTWrapper created = check inspectionplanClient->createA_InspPlanOpPRT({
    "InspectionPlanGroup": "50000012",
    "InspectionPlan": "1",
    "BOOOperationInternalID": "00000001",
    ProdnRsceToolItemNumber: "0010",
    ProdnRsceToolCategory: "E",
    Equipment: "10000045",
    ProdnRsceToolUsageQuantity: "1",
    ProdnRsceToolUsageQuantityUnit: "EA"
});
```

Sample response:

```ballerina
{
  "d": {
    "InspectionPlanGroup": "50000012",
    "InspectionPlan": "1",
    "InspectionPlanInternalVersion": "00000001",
    "BOOOpInternalVersionCounter": "00000001",
    "BOOOperationInternalID": "00000001",
    "BOOOperationPRTInternalID": "00000001",
    "ProdnRsceToolItemNumber": "0010",
    "ProdnRsceToolCategory": "E",
    "Equipment": "10000045",
    "ProdnRsceToolUsageQuantity": "1",
    "ProdnRsceToolUsageQuantityUnit": "EA"
  }
}
```

</div>

</details>

<details>
<summary>patchA_InspPlanOpPRT</summary>

<div>

Updates a production resource/tool assignment using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `BOOOpInternalVersionCounter` | `string` | Yes | Internal counter of the operation (e.g., `"00000001"`). |
| `BOOOperationInternalID` | `string` | Yes | Number of the task list node that identifies the operation (e.g., `"00000001"`). |
| `BOOOperationPRTInternalID` | `string` | Yes | Internal number of the production resource/tool assignment (e.g., `"00000001"`). |
| `payload` | `Modified\ A_InspPlanOpPRTType` | Yes | Wraps an `UpdateA_InspPlanOpPRT` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionplanClient->patchA_InspPlanOpPRT(
    "50000012",
    "1",
    "00000001",
    "00000001",
    "00000001",
    "00000001",
    {d: {Equipment: "10000046"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

<details>
<summary>deleteA_InspPlanOpPRT</summary>

<div>

Deletes a production resource/tool assignment by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionPlanGroup` | `string` | Yes | Key for the task list group, up to 8 characters (e.g., `"50000012"`). |
| `InspectionPlan` | `string` | Yes | Group counter that identifies the plan within the group, up to 2 characters (e.g., `"1"`). |
| `InspectionPlanInternalVersion` | `string` | Yes | Internal counter of the inspection plan (e.g., `"00000001"`). |
| `BOOOpInternalVersionCounter` | `string` | Yes | Internal counter of the operation (e.g., `"00000001"`). |
| `BOOOperationInternalID` | `string` | Yes | Number of the task list node that identifies the operation (e.g., `"00000001"`). |
| `BOOOperationPRTInternalID` | `string` | Yes | Internal number of the production resource/tool assignment (e.g., `"00000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionplanClient->deleteA_InspPlanOpPRT(
    "50000012",
    "1",
    "00000001",
    "00000001",
    "00000001",
    "00000001",
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</div>

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

<div>

Sends multiple OData requests as a single HTTP `$batch` call, reducing round trips to the SAP server.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | An `http:Request` object containing the `multipart/mixed` batch payload with individual OData request parts. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
string boundary = "batch_ip001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_InspectionPlan(InspectionPlanGroup='50000012',InspectionPlan='1',InspectionPlanInternalVersion='00000001') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_InspPlanOperation?$filter=InspectionPlanGroup%20eq%20'50000012' HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check inspectionplanClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</div>

</details>
