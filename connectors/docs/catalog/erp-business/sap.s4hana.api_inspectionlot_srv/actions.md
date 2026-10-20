---
title: Actions
---

# Actions

The `ballerinax/sap.s4hana.api_inspectionlot_srv` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to SAP S/4HANA inspection lots, inspection results, inspection points, usage decisions and inspection lot stock postings via the `API_INSPECTIONLOT_SRV` OData API. |

---

## Client

Provides access to SAP S/4HANA inspection lots, inspection results, inspection points, usage decisions and inspection lot stock postings via the `API_INSPECTIONLOT_SRV` OData API.

### Configuration

The client is initialized with a `ConnectionConfig` record, the SAP S/4HANA `hostname` and an optional `port` (default `443`). The client builds the service URL `https://<hostname>:<port>/sap/opu/odata/sap/API_INSPECTIONLOT_SRV` from these values.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig\|http:CredentialsConfig` | Required | Authentication configuration; use `http:CredentialsConfig` (username/password) for Basic Auth with the communication user. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version understood by the client. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x protocol settings. |
| `http2Settings` | `http:ClientHttp2Settings` | `{}` | HTTP/2 protocol settings. |
| `timeout` | `decimal` | `60` | Maximum time (in seconds) to wait for a response before closing the connection. |
| `forwarded` | `string` | `"disable"` | Choice of setting the `forwarded`/`x-forwarded` header. |
| `followRedirects` | `http:FollowRedirects` | `()` | Redirection settings. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Request pooling settings. |
| `cache` | `http:CacheConfig` | `{}` | HTTP caching settings. |
| `compression` | `http:Compression` | `http:COMPRESSION_AUTO` | How the `accept-encoding` header is handled. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker settings. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry settings. |
| `cookieConfig` | `http:CookieConfig` | `()` | Cookie settings. |
| `responseLimits` | `http:ResponseLimitConfigs` | `{}` | Inbound response size limits. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `socketConfig` | `http:ClientSocketConfig` | `{}` | Client socket settings. |
| `validation` | `boolean` | `true` | Enables inbound payload validation using the constraint package. |
| `laxDataBinding` | `boolean` | `true` | Enables relaxed data binding, treating `nil` values as optional and absent fields as nilable. |

### Initializing the client

```ballerina
import ballerinax/sap.s4hana.api_inspectionlot_srv as inspectionlot;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

inspectionlot:Client inspectionlotClient = check new (
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

An inspection lot is identified by `InspectionLot` (up to 12 characters). Its operations add `InspPlanOperationInternalID` (up to 8 characters), inspection characteristics add `InspectionCharacteristic` (up to 4 characters), inspection points add `InspectionSubsetInternalID` (up to 6 characters) and single results add `InspResultValueInternalID` (up to 8 characters).

The `patch` operations take a `Modified\ ...Type` record that wraps the matching `Update...` record in a `d` field, for example `{d: {InspectionLotText: "Rechecked"}}`. In the query records, `$select`, `$expand` and `$orderby` take arrays of the allowed property names, and `$top` and `$skip` take integers. Only inspection lots, inspection characteristics and stock postings support `$expand`.

#### Inspection lots

<details>
<summary>listA_InspectionLots</summary>

Retrieves a collection of inspection lots with their header data, such as material, plant, origin, quantities and the purchasing or production document the lot was created for. Expand `to_InspectionLotWithStatus` to include the system statuses of each lot.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspectionLotsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionLotWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspectionLotWrapper result = check inspectionlotClient->listA_InspectionLots(
    queries = {
        \$filter: "Plant eq '1010' and InspectionLotOrigin eq '01'",
        \$top: 2,
        \$select: ["InspectionLot", "Material", "Plant", "InspectionLotQuantity", "InspectionLotQuantityUnit"],
        \$orderby: ["InspectionLot desc"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionLot": "010000000123",
        "Material": "TG11",
        "Plant": "1010",
        "InspectionLotQuantity": "100",
        "InspectionLotQuantityUnit": "PC"
      },
      {
        "InspectionLot": "010000000122",
        "Material": "TG12",
        "Plant": "1010",
        "InspectionLotQuantity": "40",
        "InspectionLotQuantityUnit": "KG"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspectionLot</summary>

Retrieves the header data of a specific inspection lot.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspectionLotQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_InspectionLotWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspectionLotWrapper inspectionLot = check inspectionlotClient->getA_InspectionLot(
    "010000000123",
    queries = {
        \$expand: ["to_InspectionLotWithStatus"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "Material": "TG11",
    "Batch": "",
    "Plant": "1010",
    "InspectionLotOrigin": "01",
    "InspectionLotType": "01",
    "InspectionLotText": "Goods receipt inspection TG11",
    "InspectionLotQuantity": "100",
    "InspectionLotActualQuantity": "100",
    "InspectionLotQuantityUnit": "PC",
    "InspLotHasSubsets": false,
    "InspectionLotHasUsageDecision": false,
    "Supplier": "17300001",
    "PurchasingDocument": "4500000123",
    "PurchasingDocumentItem": "10",
    "MaterialDocument": "5000000456",
    "MaterialDocumentYear": "2026",
    "MaterialDocumentItem": "1",
    "InspectionLotCreatedBy": "QM_INSPECTOR",
    "InspectionLotCreatedOn": "/Date(1760918400000)/",
    "InspectionLotStartDate": "/Date(1760918400000)/",
    "InspectionLotEndDate": "/Date(1761523200000)/",
    "to_InspectionLotWithStatus": {
      "InspectionLot": "010000000123",
      "InspectionLotStatusCreated": "X",
      "InspectionLotStatusReleased": "X",
      "InspectionLotStatusSkip": "",
      "InspLotStatusRsltsConfirmed": "",
      "InspLotStsDefectsRecorded": "",
      "InspLotStsShrtTrmInspCmpltd": "",
      "InspLotStatusInspCompleted": "",
      "InspLotStatusCanceled": "",
      "InspLotStatusRepair": ""
    }
  }
}
```

</details>

<details>
<summary>createA_InspectionLot</summary>

Creates an inspection lot, for example a manually created lot for a material and plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_InspectionLot` | Yes | Inspection lot header data. `InspectionLot` is a required field of the record type; the sample passes an empty string and reads the number SAP assigns from the response. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspectionLotWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspectionLotWrapper created = check inspectionlotClient->createA_InspectionLot({
    InspectionLot: "",
    Material: "TG11",
    Plant: "1010",
    InspectionLotOrigin: "89",
    InspectionLotQuantity: "20",
    InspectionLotQuantityUnit: "PC",
    InspectionLotText: "Manual inspection TG11"
});
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "890000000017",
    "Material": "TG11",
    "Plant": "1010",
    "InspectionLotOrigin": "89",
    "InspectionLotType": "89",
    "InspectionLotText": "Manual inspection TG11",
    "InspectionLotQuantity": "20",
    "InspectionLotQuantityUnit": "PC",
    "InspectionLotHasUsageDecision": false
  }
}
```

</details>

<details>
<summary>patchA_InspectionLot</summary>

Updates the header data of a specific inspection lot using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `payload` | `Modified\ A_InspectionLotType` | Yes | Wraps an `UpdateA_InspectionLot` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionlotClient->patchA_InspectionLot(
    "010000000123",
    {d: {InspectionLotText: "GR inspection TG11, priority"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>getInspectionLotWithStatusOfA_InspectionLot</summary>

Retrieves the system statuses of a specific inspection lot through the `to_InspectionLotWithStatus` association.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetInspectionLotWithStatusOfA_InspectionLotQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspectionLotWithStatusWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspectionLotWithStatusWrapper status = check inspectionlotClient->getInspectionLotWithStatusOfA_InspectionLot(
    "010000000123"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspectionLotStatusCreated": "X",
    "InspectionLotStatusReleased": "X",
    "InspectionLotStatusSkip": "",
    "InspLotStatusRsltsConfirmed": "",
    "InspLotStsDefectsRecorded": "",
    "InspLotStsShrtTrmInspCmpltd": "",
    "InspLotStatusInspCompleted": "",
    "InspLotStatusCanceled": "",
    "InspLotStatusRepair": ""
  }
}
```

</details>

#### Inspection lot status

<details>
<summary>listA_InspectionLotWithStatuses</summary>

Retrieves the system statuses of inspection lots, for example to find lots that are released for inspection or whose inspection is completed.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspectionLotWithStatusesQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionLotWithStatusWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspectionLotWithStatusWrapper result = check inspectionlotClient->listA_InspectionLotWithStatuses(
    queries = {
        \$filter: "InspectionLotStatusReleased eq 'X' and InspLotStatusInspCompleted eq ''",
        \$top: 2,
        \$select: ["InspectionLot", "InspectionLotStatusReleased", "InspLotStatusRsltsConfirmed"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionLot": "010000000123",
        "InspectionLotStatusReleased": "X",
        "InspLotStatusRsltsConfirmed": ""
      },
      {
        "InspectionLot": "010000000122",
        "InspectionLotStatusReleased": "X",
        "InspLotStatusRsltsConfirmed": "X"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspectionLotWithStatus</summary>

Retrieves the system statuses of a specific inspection lot by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspectionLotWithStatusQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspectionLotWithStatusWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspectionLotWithStatusWrapper status = check inspectionlotClient->getA_InspectionLotWithStatus("010000000123");
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspectionLotStatusCreated": "X",
    "InspectionLotStatusReleased": "X",
    "InspectionLotStatusSkip": "",
    "InspLotStatusRsltsConfirmed": "",
    "InspLotStsDefectsRecorded": "",
    "InspLotStsShrtTrmInspCmpltd": "",
    "InspLotStatusInspCompleted": "",
    "InspLotStatusCanceled": "",
    "InspLotStatusRepair": ""
  }
}
```

</details>

#### Inspection operations

<details>
<summary>listA_InspectionOperations</summary>

Retrieves a collection of inspection operations, the steps of the inspection plan that are copied into each inspection lot.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspectionOperationsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionOperationWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspectionOperationWrapper result = check inspectionlotClient->listA_InspectionOperations(
    queries = {
        \$filter: "InspectionLot eq '010000000123'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionLot": "010000000123",
        "InspPlanOperationInternalID": "00000001",
        "InspectionOperation": "0010",
        "InspectionOperationPlant": "1010",
        "BillOfOperationsType": "Q",
        "OperationControlProfile": "QM01",
        "OperationText": "Incoming dimensional check"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspectionOperation</summary>

Retrieves a specific inspection operation of an inspection lot.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspectionOperationQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspectionOperationWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspectionOperationWrapper operation = check inspectionlotClient->getA_InspectionOperation(
    "010000000123",
    "00000001"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspPlanOperationInternalID": "00000001",
    "InspectionOperation": "0010",
    "InspectionOperationPlant": "1010",
    "BillOfOperationsType": "Q",
    "OperationControlProfile": "QM01",
    "OperationText": "Incoming dimensional check"
  }
}
```

</details>

#### Inspection characteristics

<details>
<summary>listA_InspectionCharacteristics</summary>

Retrieves a collection of inspection characteristics, the individual checks to perform in an inspection operation, with their target values and specification limits. Expand `to_InspResultValue` or `to_InspSmplResult` to include the recorded results.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspectionCharacteristicsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionCharacteristicWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspectionCharacteristicWrapper result = check inspectionlotClient->listA_InspectionCharacteristics(
    queries = {
        \$filter: "InspectionLot eq '010000000123'",
        \$select: ["InspectionLot", "InspPlanOperationInternalID", "InspectionCharacteristic", "InspectionSpecificationText", "InspSpecLowerLimit", "InspSpecUpperLimit", "InspectionSpecificationUnit"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionLot": "010000000123",
        "InspPlanOperationInternalID": "00000001",
        "InspectionCharacteristic": "0010",
        "InspectionSpecificationText": "Overall length",
        "InspSpecLowerLimit": "99.5",
        "InspSpecUpperLimit": "100.5",
        "InspectionSpecificationUnit": "MM"
      },
      {
        "InspectionLot": "010000000123",
        "InspPlanOperationInternalID": "00000001",
        "InspectionCharacteristic": "0020",
        "InspectionSpecificationText": "Surface finish",
        "InspSpecLowerLimit": "0",
        "InspSpecUpperLimit": "0",
        "InspectionSpecificationUnit": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspectionCharacteristic</summary>

Retrieves a specific inspection characteristic of an inspection lot.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `InspectionCharacteristic` | `string` | Yes | Inspection characteristic number (e.g., `"0010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspectionCharacteristicQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_InspectionCharacteristicWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspectionCharacteristicWrapper characteristic = check inspectionlotClient->getA_InspectionCharacteristic(
    "010000000123",
    "00000001",
    "0010"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspPlanOperationInternalID": "00000001",
    "InspectionCharacteristic": "0010",
    "InspectionSpecificationText": "Overall length",
    "InspSpecIsQuantitative": true,
    "InspectionSpecification": "LENGTH",
    "InspectionSpecificationVersion": "000001",
    "InspectionSpecificationPlant": "1010",
    "InspectionCharacteristicStatus": "1",
    "InspSpecDecimalPlaces": 1,
    "InspectionSpecificationUnit": "MM",
    "InspCharacteristicSampleSize": 5,
    "InspSpecTargetValue": "100.0",
    "InspSpecUpperLimit": "100.5",
    "InspSpecLowerLimit": "99.5"
  }
}
```

</details>

#### Inspection results

<details>
<summary>listA_InspectionResults</summary>

Retrieves a collection of summarized inspection results, one per inspection characteristic, with the valuation and the mean, minimum and maximum of the recorded values.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspectionResultsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionResultWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspectionResultWrapper result = check inspectionlotClient->listA_InspectionResults(
    queries = {
        \$filter: "InspectionLot eq '010000000123'",
        \$select: ["InspectionCharacteristic", "InspectionValuationResult", "InspResultFrmtdMeanValue", "InspResultValidValuesNumber"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionCharacteristic": "0010",
        "InspectionValuationResult": "A",
        "InspResultFrmtdMeanValue": "100.1",
        "InspResultValidValuesNumber": 5
      },
      {
        "InspectionCharacteristic": "0020",
        "InspectionValuationResult": "A",
        "InspResultFrmtdMeanValue": "",
        "InspResultValidValuesNumber": 5
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspectionResult</summary>

Retrieves the summarized inspection result of a specific inspection characteristic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `InspectionCharacteristic` | `string` | Yes | Inspection characteristic number (e.g., `"0010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspectionResultQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspectionResultWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspectionResultWrapper inspectionResult = check inspectionlotClient->getA_InspectionResult(
    "010000000123",
    "00000001",
    "0010"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspPlanOperationInternalID": "00000001",
    "InspectionCharacteristic": "0010",
    "Inspector": "QM_INSPECTOR",
    "InspectionValuationResult": "A",
    "InspResultFrmtdMeanValue": "100.1",
    "InspResultFrmtdMaximumValue": "100.3",
    "InspResultFrmtdMinimumValue": "99.9",
    "InspResultValidValuesNumber": 5,
    "InspRsltNonconformingValsNmbr": 0,
    "InspectionResultText": "All samples within tolerance"
  }
}
```

</details>

<details>
<summary>createA_InspectionResult</summary>

Creates a summarized inspection result for an inspection characteristic, for example the mean value and valuation reported by a laboratory system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_InspectionResult` | Yes | Summarized result. `InspectionLot`, `InspPlanOperationInternalID` and `InspectionCharacteristic` are required. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspectionResultWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspectionResultWrapper created = check inspectionlotClient->createA_InspectionResult({
    InspectionLot: "010000000123",
    InspPlanOperationInternalID: "00000001",
    InspectionCharacteristic: "0010",
    InspResultFrmtdMeanValue: "100.1",
    InspResultValidValuesNumber: 5,
    InspectionValuationResult: "A",
    Inspector: "QM_INSPECTOR"
});
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspPlanOperationInternalID": "00000001",
    "InspectionCharacteristic": "0010",
    "Inspector": "QM_INSPECTOR",
    "InspectionValuationResult": "A",
    "InspResultFrmtdMeanValue": "100.1",
    "InspResultFrmtdMaximumValue": "100.3",
    "InspResultFrmtdMinimumValue": "99.9",
    "InspResultValidValuesNumber": 5,
    "InspRsltNonconformingValsNmbr": 0,
    "InspectionResultText": "All samples within tolerance"
  }
}
```

</details>

<details>
<summary>patchA_InspectionResult</summary>

Updates the summarized inspection result of a specific inspection characteristic using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `InspectionCharacteristic` | `string` | Yes | Inspection characteristic number (e.g., `"0010"`). |
| `payload` | `Modified\ A_InspectionResultType` | Yes | Wraps an `UpdateA_InspectionResult` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionlotClient->patchA_InspectionResult(
    "010000000123",
    "00000001",
    "0010",
    {d: {InspectionResultText: "Rechecked after calibration", InspectionValuationResult: "A"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Single result values

<details>
<summary>listA_InspectionResultValues</summary>

Retrieves a collection of single inspection result values, one per inspected sample unit, with the measured value and its valuation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspectionResultValuesQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionResultValueWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspectionResultValueWrapper result = check inspectionlotClient->listA_InspectionResultValues(
    queries = {
        \$filter: "InspectionLot eq '010000000123' and InspectionCharacteristic eq '0010'",
        \$top: 2,
        \$select: ["InspResultValueInternalID", "InspResultFrmtdMeasuredValue", "InspectionValuationResult"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspResultValueInternalID": "00000001",
        "InspResultFrmtdMeasuredValue": "100.2",
        "InspectionValuationResult": "A"
      },
      {
        "InspResultValueInternalID": "00000002",
        "InspResultFrmtdMeasuredValue": "99.9",
        "InspectionValuationResult": "A"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspectionResultValue</summary>

Retrieves a specific single inspection result value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `InspectionCharacteristic` | `string` | Yes | Inspection characteristic number (e.g., `"0010"`). |
| `InspResultValueInternalID` | `string` | Yes | Number of the individual result (e.g., `"00000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspectionResultValueQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspectionResultValueWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspectionResultValueWrapper resultValue = check inspectionlotClient->getA_InspectionResultValue(
    "010000000123",
    "00000001",
    "0010",
    "00000001"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspPlanOperationInternalID": "00000001",
    "InspectionCharacteristic": "0010",
    "InspResultValueInternalID": "00000001",
    "InspResultItemInternalID": "1",
    "InspResultFrmtdMeasuredValue": "100.2",
    "InspectionValuationResult": "A",
    "Inspector": "QM_INSPECTOR"
  }
}
```

</details>

<details>
<summary>createA_InspectionResultValue</summary>

Calls `POST` on the `A_InspectionResultValue` entity set. SAP documents creation through this entity set as not supported; use [`createInspResultValueOfA_InspectionCharacteristic`](#single-result-values) to record single results for an inspection characteristic instead.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_InspectionResultValue` | Yes | Single result value. `InspectionLot`, `InspPlanOperationInternalID`, `InspectionCharacteristic` and `InspResultValueInternalID` are required. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspectionResultValueWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspectionResultValueWrapper|error created = inspectionlotClient->createA_InspectionResultValue({
    InspectionLot: "010000000123",
    InspPlanOperationInternalID: "00000001",
    InspectionCharacteristic: "0010",
    InspResultValueInternalID: "00000001",
    InspResultFrmtdMeasuredValue: "100.2"
});
```

SAP rejects the request, so the operation returns an `error` that carries the HTTP status and the OData error message from SAP.

</details>

<details>
<summary>patchA_InspectionResultValue</summary>

Updates a specific single inspection result value using a PATCH request, for example to correct a measured value.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `InspectionCharacteristic` | `string` | Yes | Inspection characteristic number (e.g., `"0010"`). |
| `InspResultValueInternalID` | `string` | Yes | Number of the individual result (e.g., `"00000001"`). |
| `payload` | `Modified\ A_InspectionResultValueType` | Yes | Wraps an `UpdateA_InspectionResultValue` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionlotClient->patchA_InspectionResultValue(
    "010000000123",
    "00000001",
    "0010",
    "00000001",
    {d: {InspResultFrmtdMeasuredValue: "100.1", InspectionResultText: "Corrected reading"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listInspResultValuesOfA_InspectionCharacteristic</summary>

Retrieves the single inspection result values recorded for a specific inspection characteristic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `InspectionCharacteristic` | `string` | Yes | Inspection characteristic number (e.g., `"0010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListInspResultValuesOfA_InspectionCharacteristicQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionResultValueWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspectionResultValueWrapper values = check inspectionlotClient->listInspResultValuesOfA_InspectionCharacteristic(
    "010000000123",
    "00000001",
    "0010",
    queries = {
        \$select: ["InspResultValueInternalID", "InspResultFrmtdMeasuredValue"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspResultValueInternalID": "00000001",
        "InspResultFrmtdMeasuredValue": "100.2"
      },
      {
        "InspResultValueInternalID": "00000002",
        "InspResultFrmtdMeasuredValue": "99.9"
      }
    ]
  }
}
```

</details>

<details>
<summary>createInspResultValueOfA_InspectionCharacteristic</summary>

Creates a single inspection result (one measured value for one sample unit) for a specific inspection characteristic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `InspectionCharacteristic` | `string` | Yes | Inspection characteristic number (e.g., `"0010"`). |
| `payload` | `CreateA_InspectionResultValue` | Yes | Single result value. The key fields must match the path parameters; `InspResultValueInternalID` numbers the result within the characteristic. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspectionResultValueWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspectionResultValueWrapper created = check inspectionlotClient->createInspResultValueOfA_InspectionCharacteristic(
    "010000000123",
    "00000001",
    "0010",
    {
        InspectionLot: "010000000123",
        InspPlanOperationInternalID: "00000001",
        InspectionCharacteristic: "0010",
        InspResultValueInternalID: "00000001",
        InspResultFrmtdMeasuredValue: "100.2",
        Inspector: "QM_INSPECTOR"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspPlanOperationInternalID": "00000001",
    "InspectionCharacteristic": "0010",
    "InspResultValueInternalID": "00000001",
    "InspResultItemInternalID": "1",
    "InspResultFrmtdMeasuredValue": "100.2",
    "InspectionValuationResult": "A",
    "Inspector": "QM_INSPECTOR"
  }
}
```

</details>

#### Inspection points

<details>
<summary>listA_InspectionSubsets</summary>

Retrieves a collection of inspection points. An inspection point identifies one sample taken during the inspection, for example by date, time, shift or equipment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspectionSubsetsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspectionSubsetWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspectionSubsetWrapper result = check inspectionlotClient->listA_InspectionSubsets(
    queries = {
        \$filter: "InspectionLot eq '010000000123'",
        \$top: 2
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionLot": "010000000123",
        "InspPlanOperationInternalID": "00000001",
        "InspectionSubsetInternalID": "000001",
        "InspectionSubsetDate": "/Date(1760918400000)/",
        "InspectionSubsetTime": "PT08:00:00",
        "InspectionSubsetShortCharKey": "SHIFT1",
        "Inspector": "QM_INSPECTOR",
        "InspSubsetUsageDcsnValuation": ""
      },
      {
        "InspectionLot": "010000000123",
        "InspPlanOperationInternalID": "00000001",
        "InspectionSubsetInternalID": "000002",
        "InspectionSubsetDate": "/Date(1760918400000)/",
        "InspectionSubsetTime": "PT16:00:00",
        "InspectionSubsetShortCharKey": "SHIFT2",
        "Inspector": "QM_INSPECTOR",
        "InspSubsetUsageDcsnValuation": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspectionSubset</summary>

Retrieves a specific inspection point.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `InspectionSubsetInternalID` | `string` | Yes | Inspection point (sample) number (e.g., `"000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspectionSubsetQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspectionSubsetWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspectionSubsetWrapper inspectionPoint = check inspectionlotClient->getA_InspectionSubset(
    "010000000123",
    "00000001",
    "000001"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspPlanOperationInternalID": "00000001",
    "InspectionSubsetInternalID": "000001",
    "InspectionSubsetDate": "/Date(1760918400000)/",
    "InspectionSubsetTime": "PT08:00:00",
    "InspectionSubsetShortCharKey": "SHIFT1",
    "Inspector": "QM_INSPECTOR",
    "InspSubsetUsageDcsnValuation": ""
  }
}
```

</details>

<details>
<summary>createA_InspectionSubset</summary>

Creates an inspection point and the related inspection point characteristics for an operation of an inspection lot that is inspected with inspection points.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_InspectionSubset` | Yes | Inspection point. `InspectionLot`, `InspPlanOperationInternalID` and `InspectionSubsetInternalID` are required; the identification fields that are active depend on the inspection point field combination of the lot. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspectionSubsetWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspectionSubsetWrapper created = check inspectionlotClient->createA_InspectionSubset({
    InspectionLot: "010000000123",
    InspPlanOperationInternalID: "00000001",
    InspectionSubsetInternalID: "000001",
    InspectionSubsetDate: "/Date(1760918400000)/",
    InspectionSubsetTime: "PT08:00:00",
    InspectionSubsetShortCharKey: "SHIFT1",
    Inspector: "QM_INSPECTOR"
});
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspPlanOperationInternalID": "00000001",
    "InspectionSubsetInternalID": "000001",
    "InspectionSubsetDate": "/Date(1760918400000)/",
    "InspectionSubsetTime": "PT08:00:00",
    "InspectionSubsetShortCharKey": "SHIFT1",
    "Inspector": "QM_INSPECTOR",
    "InspSubsetUsageDcsnValuation": ""
  }
}
```

</details>

<details>
<summary>patchA_InspectionSubset</summary>

Updates a specific inspection point using a PATCH request, for example to record the yield, scrap and rework quantities or the inspection point valuation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `InspectionSubsetInternalID` | `string` | Yes | Inspection point (sample) number (e.g., `"000001"`). |
| `payload` | `Modified\ A_InspectionSubsetType` | Yes | Wraps an `UpdateA_InspectionSubset` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionlotClient->patchA_InspectionSubset(
    "010000000123",
    "00000001",
    "000001",
    {d: {InspectionSubsetYieldQty: "48", InspectionSubsetScrapQty: "2", InspectionSubsetQtyUnit: "PC"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>createA_InspectionSubsetTrigger_valuation</summary>

Calls the `A_InspectionSubsetTrigger_valuation` function import, which triggers the automatic valuation of an inspection point based on the results recorded for its characteristics.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `CreateA_InspectionSubsetTrigger_valuationQueries` | Yes | Function import parameters: `InspectionLot`, `InspPlanOperationInternalID` and `InspectionSubsetInternalID`, all required. Each value must be enclosed in single quotes (for example, `"'010000000123'"`). |

Returns: `A_InspectionSubsetWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspectionSubsetWrapper valuated = check inspectionlotClient->createA_InspectionSubsetTrigger_valuation(
    queries = {
        InspectionLot: "'010000000123'",
        InspPlanOperationInternalID: "'00000001'",
        InspectionSubsetInternalID: "'000001'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspPlanOperationInternalID": "00000001",
    "InspectionSubsetInternalID": "000001",
    "InspectionSubsetDate": "/Date(1760918400000)/",
    "InspectionSubsetTime": "PT08:00:00",
    "InspectionSubsetShortCharKey": "SHIFT1",
    "Inspector": "QM_INSPECTOR",
    "InspSubsetUsageDcsnValuation": "A"
  }
}
```

</details>

#### Inspection point characteristics

<details>
<summary>listA_InspSampleCharacteristics</summary>

Retrieves a collection of inspection point characteristics, the inspection characteristics as they apply to an individual inspection point, with the sample size and the acceptance and rejection numbers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspSampleCharacteristicsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspSampleCharacteristicWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspSampleCharacteristicWrapper result = check inspectionlotClient->listA_InspSampleCharacteristics(
    queries = {
        \$filter: "InspectionLot eq '010000000123' and InspectionSubsetInternalID eq '000001'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionLot": "010000000123",
        "InspPlanOperationInternalID": "00000001",
        "InspectionCharacteristic": "0010",
        "InspectionSubsetInternalID": "000001",
        "InspectionCharacteristicStatus": "1",
        "InspectionSampleSize": 5,
        "InspSampleAcceptanceNumber": 0,
        "InspSampleRejectionNumber": 1
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspSampleCharacteristic</summary>

Retrieves a specific inspection characteristic of an inspection point.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `InspectionCharacteristic` | `string` | Yes | Inspection characteristic number (e.g., `"0010"`). |
| `InspectionSubsetInternalID` | `string` | Yes | Inspection point (sample) number (e.g., `"000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspSampleCharacteristicQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspSampleCharacteristicWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspSampleCharacteristicWrapper sampleCharacteristic = check inspectionlotClient->getA_InspSampleCharacteristic(
    "010000000123",
    "00000001",
    "0010",
    "000001"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspPlanOperationInternalID": "00000001",
    "InspectionCharacteristic": "0010",
    "InspectionSubsetInternalID": "000001",
    "InspectionCharacteristicStatus": "1",
    "InspectionSampleSize": 5,
    "InspSampleAcceptanceNumber": 0,
    "InspSampleRejectionNumber": 1
  }
}
```

</details>

#### Inspection point results

<details>
<summary>listA_InspSampleResults</summary>

Retrieves a collection of summarized inspection results recorded for inspection points.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspSampleResultsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspSampleResultWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspSampleResultWrapper result = check inspectionlotClient->listA_InspSampleResults(
    queries = {
        \$filter: "InspectionLot eq '010000000123'",
        \$top: 2,
        \$select: ["InspectionCharacteristic", "InspectionSubsetInternalID", "InspResultFrmtdMeanValue", "InspectionValuationResult"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionCharacteristic": "0010",
        "InspectionSubsetInternalID": "000001",
        "InspResultFrmtdMeanValue": "100.1",
        "InspectionValuationResult": "A"
      },
      {
        "InspectionCharacteristic": "0010",
        "InspectionSubsetInternalID": "000002",
        "InspResultFrmtdMeanValue": "100.4",
        "InspectionValuationResult": "A"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspSampleResult</summary>

Retrieves a specific summarized inspection result recorded for an inspection point.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `InspectionCharacteristic` | `string` | Yes | Inspection characteristic number (e.g., `"0010"`). |
| `InspectionSubsetInternalID` | `string` | Yes | Inspection point (sample) number (e.g., `"000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspSampleResultQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspSampleResultWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspSampleResultWrapper sampleResult = check inspectionlotClient->getA_InspSampleResult(
    "010000000123",
    "00000001",
    "0010",
    "000001"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspPlanOperationInternalID": "00000001",
    "InspectionCharacteristic": "0010",
    "InspectionSubsetInternalID": "000001",
    "Inspector": "QM_INSPECTOR",
    "InspectionValuationResult": "A",
    "InspResultFrmtdMeanValue": "100.1",
    "InspResultValidValuesNumber": 5
  }
}
```

</details>

<details>
<summary>createA_InspSampleResult</summary>

Calls `POST` on the `A_InspSampleResult` entity set. SAP documents creation through this entity set as not supported; use [`createInspSmplResultOfA_InspectionCharacteristic`](#inspection-point-results) to record an inspection point result for an inspection characteristic instead.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_InspSampleResult` | Yes | Inspection point result. `InspectionLot`, `InspPlanOperationInternalID`, `InspectionCharacteristic` and `InspectionSubsetInternalID` are required. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspSampleResultWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspSampleResultWrapper|error created = inspectionlotClient->createA_InspSampleResult({
    InspectionLot: "010000000123",
    InspPlanOperationInternalID: "00000001",
    InspectionCharacteristic: "0010",
    InspectionSubsetInternalID: "000001",
    InspResultFrmtdMeanValue: "100.1"
});
```

SAP rejects the request, so the operation returns an `error` that carries the HTTP status and the OData error message from SAP.

</details>

<details>
<summary>patchA_InspSampleResult</summary>

Updates a specific summarized inspection result recorded for an inspection point using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `InspectionCharacteristic` | `string` | Yes | Inspection characteristic number (e.g., `"0010"`). |
| `InspectionSubsetInternalID` | `string` | Yes | Inspection point (sample) number (e.g., `"000001"`). |
| `payload` | `Modified\ A_InspSampleResultType` | Yes | Wraps an `UpdateA_InspSampleResult` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionlotClient->patchA_InspSampleResult(
    "010000000123",
    "00000001",
    "0010",
    "000001",
    {d: {InspResultFrmtdMeanValue: "100.2", InspectionValuationResult: "A"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

<details>
<summary>listInspSmplResultsOfA_InspectionCharacteristic</summary>

Retrieves the inspection point results recorded for a specific inspection characteristic.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `InspectionCharacteristic` | `string` | Yes | Inspection characteristic number (e.g., `"0010"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListInspSmplResultsOfA_InspectionCharacteristicQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspSampleResultWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspSampleResultWrapper sampleResults = check inspectionlotClient->listInspSmplResultsOfA_InspectionCharacteristic(
    "010000000123",
    "00000001",
    "0010"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionLot": "010000000123",
        "InspPlanOperationInternalID": "00000001",
        "InspectionCharacteristic": "0010",
        "InspectionSubsetInternalID": "000001",
        "Inspector": "QM_INSPECTOR",
        "InspectionValuationResult": "A",
        "InspResultFrmtdMeanValue": "100.1",
        "InspResultValidValuesNumber": 5
      }
    ]
  }
}
```

</details>

<details>
<summary>createInspSmplResultOfA_InspectionCharacteristic</summary>

Creates a summarized inspection result for an inspection characteristic at a specific inspection point.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspPlanOperationInternalID` | `string` | Yes | Current node number of the inspection operation from the order counter (e.g., `"00000001"`). |
| `InspectionCharacteristic` | `string` | Yes | Inspection characteristic number (e.g., `"0010"`). |
| `payload` | `CreateA_InspSampleResult` | Yes | Inspection point result. The key fields must match the path parameters; `InspectionSubsetInternalID` identifies the inspection point. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspSampleResultWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspSampleResultWrapper created = check inspectionlotClient->createInspSmplResultOfA_InspectionCharacteristic(
    "010000000123",
    "00000001",
    "0010",
    {
        InspectionLot: "010000000123",
        InspPlanOperationInternalID: "00000001",
        InspectionCharacteristic: "0010",
        InspectionSubsetInternalID: "000001",
        InspResultFrmtdMeanValue: "100.1",
        InspResultValidValuesNumber: 5,
        InspectionValuationResult: "A",
        Inspector: "QM_INSPECTOR"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspPlanOperationInternalID": "00000001",
    "InspectionCharacteristic": "0010",
    "InspectionSubsetInternalID": "000001",
    "Inspector": "QM_INSPECTOR",
    "InspectionValuationResult": "A",
    "InspResultFrmtdMeanValue": "100.1",
    "InspResultValidValuesNumber": 5
  }
}
```

</details>

#### Usage decisions

<details>
<summary>listA_InspLotUsageDecisions</summary>

Retrieves a collection of usage decisions. The usage decision closes the inspection of a lot and states whether the material is accepted or rejected.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspLotUsageDecisionsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspLotUsageDecisionWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspLotUsageDecisionWrapper result = check inspectionlotClient->listA_InspLotUsageDecisions(
    queries = {
        \$filter: "InspLotUsageDecisionValuation eq 'R'",
        \$top: 2,
        \$select: ["InspectionLot", "InspectionLotUsageDecisionCode", "InspLotUsageDecisionValuation", "InspectionLotUsageDecidedOn"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionLot": "010000000098",
        "InspectionLotUsageDecisionCode": "R",
        "InspLotUsageDecisionValuation": "R",
        "InspectionLotUsageDecidedOn": "/Date(1760313600000)/"
      },
      {
        "InspectionLot": "010000000104",
        "InspectionLotUsageDecisionCode": "R",
        "InspLotUsageDecisionValuation": "R",
        "InspectionLotUsageDecidedOn": "/Date(1760572800000)/"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspLotUsageDecision</summary>

Retrieves the usage decision of a specific inspection lot.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspLotUsageDecisionQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspLotUsageDecisionWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspLotUsageDecisionWrapper usageDecision = check inspectionlotClient->getA_InspLotUsageDecision("010000000123");
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspLotUsageDecisionLevel": "L",
    "InspLotUsageDecisionCatalog": "3",
    "SelectedCodeSetPlant": "1010",
    "InspLotUsgeDcsnSelectedSet": "01",
    "InspLotUsageDecisionCodeGroup": "01",
    "InspectionLotUsageDecisionCode": "A",
    "InspLotUsageDecisionValuation": "A",
    "InspectionLotQualityScore": "100",
    "InspectionLotUsageDecidedBy": "QM_INSPECTOR",
    "InspectionLotUsageDecidedOn": "/Date(1761004800000)/",
    "InspLotUsageDecisionTime": "PT14:30:00"
  }
}
```

</details>

<details>
<summary>createA_InspLotUsageDecision</summary>

Creates the usage decision for an inspection lot, using a usage decision code from the selected set assigned to the plant.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_InspLotUsageDecision` | Yes | Usage decision. `InspectionLot` is required; the selected set, code group and code identify the decision. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspLotUsageDecisionWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspLotUsageDecisionWrapper created = check inspectionlotClient->createA_InspLotUsageDecision({
    InspectionLot: "010000000123",
    InspLotUsageDecisionLevel: "L",
    InspLotUsageDecisionCatalog: "3",
    SelectedCodeSetPlant: "1010",
    InspLotUsgeDcsnSelectedSet: "01",
    InspLotUsageDecisionCodeGroup: "01",
    InspectionLotUsageDecisionCode: "A"
});
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspLotUsageDecisionLevel": "L",
    "InspLotUsageDecisionCatalog": "3",
    "SelectedCodeSetPlant": "1010",
    "InspLotUsgeDcsnSelectedSet": "01",
    "InspLotUsageDecisionCodeGroup": "01",
    "InspectionLotUsageDecisionCode": "A",
    "InspLotUsageDecisionValuation": "A",
    "InspectionLotQualityScore": "100",
    "InspectionLotUsageDecidedBy": "QM_INSPECTOR",
    "InspectionLotUsageDecidedOn": "/Date(1761004800000)/",
    "InspLotUsageDecisionTime": "PT14:30:00"
  }
}
```

</details>

<details>
<summary>patchA_InspLotUsageDecision</summary>

Updates the usage decision of a specific inspection lot using a PATCH request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `payload` | `Modified\ A_InspLotUsageDecisionType` | Yes | Wraps an `UpdateA_InspLotUsageDecision` record (the fields to change) in the `d` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. Include `If-Match` with the entity ETag (or `*`) for optimistic locking. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Response response = check inspectionlotClient->patchA_InspLotUsageDecision(
    "010000000123",
    {d: {InspectionLotQualityScore: "90"}},
    headers = {"If-Match": "*"}
);
```

Returns an `http:Response`. On success, SAP responds with HTTP status `204 No Content` and an empty body.

</details>

#### Stock postings

<details>
<summary>listA_InspLotMatlDocItems</summary>

Retrieves a collection of stock postings for inspection lots, each in the form of a material document item that moves inspected quantity out of quality inspection stock. Expand `to_InspLotMatlDocItmSrlNmbr` to include the posted serial numbers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspLotMatlDocItemsQueries` | No | OData query parameters: `$filter`, `$select`, `$expand`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspLotMatlDocItemWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspLotMatlDocItemWrapper result = check inspectionlotClient->listA_InspLotMatlDocItems(
    queries = {
        \$filter: "InspectionLot eq '010000000123'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionLot": "010000000123",
        "InspLotMatlDocItem": "000001",
        "InspLotQtyPosted": "100",
        "InspLotMatlDocItmQtyUnit": "PC",
        "UsageDecisionStockType": "01",
        "StorageLocation": "101A",
        "MaterialDocument": "4900000789",
        "MaterialDocumentYear": "2026",
        "MaterialDocumentItem": "1"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspLotMatlDocItem</summary>

Retrieves a specific stock posting for an inspection lot.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspLotMatlDocItem` | `string` | Yes | Internal counter of the stock posting for the inspection lot (e.g., `"000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspLotMatlDocItemQueries` | No | OData query parameters: `$select`, `$expand`. |

Returns: `A_InspLotMatlDocItemWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspLotMatlDocItemWrapper posting = check inspectionlotClient->getA_InspLotMatlDocItem(
    "010000000123",
    "000001",
    queries = {
        \$expand: ["to_InspLotMatlDocItmSrlNmbr"]
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspLotMatlDocItem": "000001",
    "InspLotQtyPosted": "100",
    "InspLotMatlDocItmQtyUnit": "PC",
    "UsageDecisionStockType": "01",
    "StorageLocation": "101A",
    "MaterialDocument": "4900000789",
    "MaterialDocumentYear": "2026",
    "MaterialDocumentItem": "1",
    "to_InspLotMatlDocItmSrlNmbr": {
      "results": [
        {
          "InspectionLot": "010000000123",
          "InspLotMatlDocItem": "000001",
          "Equipment": "10000041",
          "SerialNumber": "100000000001",
          "InspLotMatlDocItemType": ""
        }
      ]
    }
  }
}
```

</details>

<details>
<summary>createA_InspLotMatlDocItem</summary>

Creates a stock posting for an inspection lot, for example to post the accepted quantity to unrestricted-use stock after the usage decision.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CreateA_InspLotMatlDocItem` | Yes | Stock posting. `InspectionLot` and `InspLotMatlDocItem` are required; `UsageDecisionStockType` is the posting proposal (the stock the quantity is posted to). Serial numbers can be passed in the nested `to_InspLotMatlDocItmSrlNmbr` field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `A_InspLotMatlDocItemWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspLotMatlDocItemWrapper created = check inspectionlotClient->createA_InspLotMatlDocItem({
    InspectionLot: "010000000123",
    InspLotMatlDocItem: "000001",
    InspLotQtyPosted: "100",
    UsageDecisionStockType: "01",
    StorageLocation: "101A"
});
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspLotMatlDocItem": "000001",
    "InspLotQtyPosted": "100",
    "InspLotMatlDocItmQtyUnit": "PC",
    "UsageDecisionStockType": "01",
    "StorageLocation": "101A",
    "MaterialDocument": "4900000789",
    "MaterialDocumentYear": "2026",
    "MaterialDocumentItem": "1"
  }
}
```

</details>

<details>
<summary>listInspLotMatlDocItmSrlNmbrsOfA_InspLotMatlDocItem</summary>

Retrieves the serial numbers posted with a specific stock posting for an inspection lot.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspLotMatlDocItem` | `string` | Yes | Internal counter of the stock posting for the inspection lot (e.g., `"000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListInspLotMatlDocItmSrlNmbrsOfA_InspLotMatlDocItemQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspLotMatlDocItmSrlNmbrWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspLotMatlDocItmSrlNmbrWrapper serials = check inspectionlotClient->listInspLotMatlDocItmSrlNmbrsOfA_InspLotMatlDocItem(
    "010000000123",
    "000001"
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionLot": "010000000123",
        "InspLotMatlDocItem": "000001",
        "Equipment": "10000041",
        "SerialNumber": "100000000001",
        "InspLotMatlDocItemType": ""
      },
      {
        "InspectionLot": "010000000123",
        "InspLotMatlDocItem": "000001",
        "Equipment": "10000042",
        "SerialNumber": "100000000002",
        "InspLotMatlDocItemType": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>listA_InspLotMatlDocItmSrlNmbrs</summary>

Retrieves serial number information for stock postings across inspection lots.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspLotMatlDocItmSrlNmbrsQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspLotMatlDocItmSrlNmbrWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspLotMatlDocItmSrlNmbrWrapper result = check inspectionlotClient->listA_InspLotMatlDocItmSrlNmbrs(
    queries = {
        \$filter: "SerialNumber eq '100000000001'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionLot": "010000000123",
        "InspLotMatlDocItem": "000001",
        "Equipment": "10000041",
        "SerialNumber": "100000000001",
        "InspLotMatlDocItemType": ""
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspLotMatlDocItmSrlNmbr</summary>

Retrieves information on a specific serial number posted with a stock posting for an inspection lot.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `InspLotMatlDocItem` | `string` | Yes | Internal counter of the stock posting for the inspection lot (e.g., `"000001"`). |
| `Equipment` | `string` | Yes | Equipment number of the serialized item (e.g., `"10000041"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspLotMatlDocItmSrlNmbrQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspLotMatlDocItmSrlNmbrWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspLotMatlDocItmSrlNmbrWrapper serial = check inspectionlotClient->getA_InspLotMatlDocItmSrlNmbr(
    "010000000123",
    "000001",
    "10000041"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "InspLotMatlDocItem": "000001",
    "Equipment": "10000041",
    "SerialNumber": "100000000001",
    "InspLotMatlDocItemType": ""
  }
}
```

</details>

#### Serial numbers

<details>
<summary>listA_InspLotSerialNumbers</summary>

Retrieves the serial numbers assigned to inspection lots, for lots that inspect serialized material.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListA_InspLotSerialNumbersQueries` | No | OData query parameters: `$filter`, `$select`, `$orderby`, `$top`, `$skip`, `$inlinecount`. |

Returns: `CollectionOfA_InspLotSerialNumberWrapper|error`

Sample code:

```ballerina
inspectionlot:CollectionOfA_InspLotSerialNumberWrapper result = check inspectionlotClient->listA_InspLotSerialNumbers(
    queries = {
        \$filter: "InspectionLot eq '010000000123'"
    }
);
```

Sample response:

```ballerina
{
  "d": {
    "results": [
      {
        "InspectionLot": "010000000123",
        "SerialNumber": "100000000001"
      },
      {
        "InspectionLot": "010000000123",
        "SerialNumber": "100000000002"
      }
    ]
  }
}
```

</details>

<details>
<summary>getA_InspLotSerialNumber</summary>

Retrieves a specific serial number of an inspection lot.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `InspectionLot` | `string` | Yes | Inspection lot number (e.g., `"010000000123"`). |
| `SerialNumber` | `string` | Yes | Serial number (e.g., `"100000000001"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetA_InspLotSerialNumberQueries` | No | OData query parameters: `$select`. |

Returns: `A_InspLotSerialNumberWrapper|error`

Sample code:

```ballerina
inspectionlot:A_InspLotSerialNumberWrapper serial = check inspectionlotClient->getA_InspLotSerialNumber(
    "010000000123",
    "100000000001"
);
```

Sample response:

```ballerina
{
  "d": {
    "InspectionLot": "010000000123",
    "SerialNumber": "100000000001"
  }
}
```

</details>

#### Batch operations

<details>
<summary>performBatchOperation</summary>

Sends multiple OData requests as a single HTTP `$batch` call, reducing round trips to the SAP server. Write requests go inside change sets in the batch payload.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `request` | `http:Request` | Yes | An `http:Request` object containing the `multipart/mixed` batch payload with individual OData request parts. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `http:Response|error`

Sample code:

```ballerina
http:Request batchRequest = new;
string boundary = "batch_il001";
batchRequest.setHeader("Content-Type", "multipart/mixed; boundary=" + boundary);
batchRequest.setTextPayload(
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_InspectionLot('010000000123') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "\r\n" +
    "Content-Type: application/http\r\n" +
    "Content-Transfer-Encoding: binary\r\n\r\n" +
    "GET A_InspLotUsageDecision('010000000123') HTTP/1.1\r\n" +
    "Accept: application/json\r\n\r\n" +
    "--" + boundary + "--"
);
http:Response batchResponse = check inspectionlotClient->performBatchOperation(batchRequest);
```

Returns the raw `http:Response` from the `$batch` endpoint. On success the status code is `202 Accepted` and the body is a `multipart/mixed` payload containing one part per request in the batch, each with its own HTTP status line, headers and JSON body. Read it with `batchResponse.getTextPayload()` and parse each part as needed.

</details>
