# Actions

The `ballerinax/sap.businessone.localization` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages SAP Business One country-specific and electronic document objects — electronic documents, file formats & communication; Brazil Nota Fiscal codes & indexers; India HSN/SAC codes & EWB transporters; Israel deduction documents; customs declarations & import/export determinations; DATEV runs, e-books & certificate series; self invoices & self credit memos; fiscal printer & local era settings — over the session-authenticated Service Layer (OData V3). |

---

## Client

The `Client` provides access to the localization and electronic document objects exposed by the SAP Business One Service Layer — electronic documents, electronic file formats, and occurrence codes; Brazil Nota Fiscal CFOP/CST/usage codes, CEST/NCM code setup, and beverage/fuel/string/multi/numeric indexers; India HSN and SAC codes, and EWB transporters; Israel deduction (ISD) invoices, credit memos, and recipient invoices/credit memos; customs declarations, import and export determinations, and transportation documents; DATEV runs, e-books, certificate series, and BEM replication periods; self invoices and self credit memos; and fiscal printer, intrastat configuration, material/service groups, legal data, and local era settings.

### Configuration

#### SessionConfig

SAP Business One Service Layer session credentials, passed as the first argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `companyDb` | <code>string</code> | Required | The SAP Business One company database to log in to |
| `username` | <code>string</code> | Required | The Service Layer user name |
| `password` | <code>string</code> | Required | The Service Layer user password |

#### ConnectionConfig

Provides a set of configurations for controlling the behaviours when communicating with the Service Layer HTTP endpoint. Passed as the optional second argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>{}</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>{}</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>{}</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>{}</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>{}</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side, treating `nil` values and absent fields as optional |

The client also accepts a `serviceUrl` string parameter — the base URL of the target Service Layer instance — which defaults to `https://localhost:50000/b1s/v1`.

### Initializing the client

```ballerina
import ballerinax/sap.businessone;
import ballerinax/sap.businessone.localization;

businessone:SessionConfig session = {
    companyDb: "SBODemoUS",
    username: "manager",
    password: "<password>"
};

localization:Client client = check new (session, serviceUrl = "https://<host>:50000/b1s/v1");
```

### Operations
#### EWBTransporters

<details>
<summary>eWBTransporterServiceGetEWBTransporterList</summary>

Invokes the `EWBTransporterService_GetEWBTransporterList` function import to retrieve the full list of e-way bill transporter master records.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `inline_response_200_11|error`

**Sample code:**

```ballerina
inline_response_200_11 result = check client->eWBTransporterServiceGetEWBTransporterList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#EWBTransporterService_GetEWBTransporterList",
  "value": [
    {
      "TransporterID": "T0001",
      "TransporterName": "ABC Transporters",
      "AbsEntry": 1,
      "TransporterCode": "TR01"
    }
  ]
}
```

</details>

<details>
<summary>listEWBTransporters</summary>

Queries the EWBTransporters collection and returns a paged list of e-way bill transporter records.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListEWBTransportersHeaders</code> | No | Headers to be sent with the request. |
| `queries` | <code>ListEWBTransportersQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`). |

**Returns:** `EWBTransportersCollectionResponse|error`

**Sample code:**

```ballerina
EWBTransportersCollectionResponse result = check client->listEWBTransporters();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#EWBTransporters",
  "value": [
    {
      "TransporterID": "T0001",
      "TransporterName": "ABC Transporters",
      "AbsEntry": 1,
      "TransporterCode": "TR01",
      "EWBTransporter_Lines": [
        {
          "VehicleNo": "KA01AB1234",
          "Mode": 1,
          "VehicleType": "Regular",
          "AbsEntry": 1,
          "LineNumber": 0
        }
      ]
    }
  ],
  "odata.nextLink": "EWBTransporters?$skip=20"
}
```

</details>

<details>
<summary>createEWBTransporters</summary>

Creates a new EWBTransporter master record in the Service Layer.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EWBTransporter</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `EWBTransporter|error`

**Sample code:**

```ballerina
EWBTransporter result = check client->createEWBTransporters(payload);
```

**Sample response:**

```json
{
  "TransporterID": "T0001",
  "TransporterName": "ABC Transporters",
  "AbsEntry": 1,
  "TransporterCode": "TR01",
  "EWBTransporter_Lines": [
    {
      "VehicleNo": "KA01AB1234",
      "Mode": 1,
      "VehicleType": "Regular",
      "AbsEntry": 1,
      "LineNumber": 0
    }
  ]
}
```

</details>

<details>
<summary>getEWBTransporters</summary>

Retrieves a single EWBTransporter by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetEWBTransportersQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`). |

**Returns:** `EWBTransporter|error`

**Sample code:**

```ballerina
EWBTransporter result = check client->getEWBTransporters(1);
```

**Sample response:**

```json
{
  "TransporterID": "T0001",
  "TransporterName": "ABC Transporters",
  "AbsEntry": 1,
  "TransporterCode": "TR01"
}
```

</details>

<details>
<summary>deleteEWBTransporters</summary>

Deletes the EWBTransporter identified by `AbsEntry`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteEWBTransporters(1);
```

</details>

<details>
<summary>updateEWBTransporters</summary>

Partially updates an EWBTransporter using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `payload` | <code>EWBTransporter</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateEWBTransporters(1, payload);
```

</details>

#### IntrastatConfiguration

<details>
<summary>listIntrastatConfiguration</summary>

Queries the IntrastatConfiguration collection and returns a paged list of Intrastat configuration records.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListIntrastatConfigurationHeaders</code> | No | Headers to be sent with the request. |
| `queries` | <code>ListIntrastatConfigurationQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`). |

**Returns:** `IntrastatConfigurationCollectionResponse|error`

**Sample code:**

```ballerina
IntrastatConfigurationCollectionResponse result = check client->listIntrastatConfiguration();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#IntrastatConfiguration",
  "value": [
    {
      "PrcstVal": 100,
      "ConfType": "enCommodityCodes",
      "Import": "tYES",
      "AbsEntry": 1,
      "Descr": "Commodity Code Setup",
      "Code": "CC01",
      "SuppUnit": 0,
      "TriangDeal": "enNone",
      "DateFrom": "2026-01-01",
      "Export": "tYES",
      "Country": "DE",
      "ConfID": "CFG01",
      "StatCode": "ST01",
      "DateTo": "2026-12-31"
    }
  ],
  "odata.nextLink": "IntrastatConfiguration?$skip=20"
}
```

</details>

<details>
<summary>createIntrastatConfiguration</summary>

Creates a new IntrastatConfiguration record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>IntrastatConfiguration</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `IntrastatConfiguration|error`

**Sample code:**

```ballerina
IntrastatConfiguration result = check client->createIntrastatConfiguration(payload);
```

**Sample response:**

```json
{
  "PrcstVal": 100,
  "ConfType": "enCommodityCodes",
  "Import": "tYES",
  "AbsEntry": 1,
  "Descr": "Commodity Code Setup",
  "Code": "CC01",
  "SuppUnit": 0,
  "TriangDeal": "enNone",
  "DateFrom": "2026-01-01",
  "Export": "tYES",
  "Country": "DE",
  "ConfID": "CFG01",
  "StatCode": "ST01",
  "DateTo": "2026-12-31"
}
```

</details>

<details>
<summary>getIntrastatConfiguration</summary>

Retrieves a single IntrastatConfiguration record by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetIntrastatConfigurationQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`). |

**Returns:** `IntrastatConfiguration|error`

**Sample code:**

```ballerina
IntrastatConfiguration result = check client->getIntrastatConfiguration(1);
```

**Sample response:**

```json
{
  "PrcstVal": 100,
  "ConfType": "enCommodityCodes",
  "Import": "tYES",
  "AbsEntry": 1,
  "Descr": "Commodity Code Setup",
  "Code": "CC01",
  "SuppUnit": 0,
  "TriangDeal": "enNone",
  "DateFrom": "2026-01-01",
  "Export": "tYES",
  "Country": "DE",
  "ConfID": "CFG01",
  "StatCode": "ST01",
  "DateTo": "2026-12-31"
}
```

</details>

<details>
<summary>deleteIntrastatConfiguration</summary>

Deletes the IntrastatConfiguration record identified by `AbsEntry`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteIntrastatConfiguration(1);
```

</details>

<details>
<summary>updateIntrastatConfiguration</summary>

Partially updates an IntrastatConfiguration record using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `payload` | <code>IntrastatConfiguration</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateIntrastatConfiguration(1, payload);
```

</details>

<details>
<summary>intrastatConfigurationServiceGetList</summary>

Invokes the `IntrastatConfigurationService_GetList` function import to retrieve the list of Intrastat configuration parameter sets.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `inline_response_200_36|error`

**Sample code:**

```ballerina
inline_response_200_36 result = check client->intrastatConfigurationServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#IntrastatConfigurationService_GetList",
  "value": [
    {
      "ConfType": "enCommodityCodes",
      "DateFrom": "2026-01-01",
      "Country": "DE",
      "AbsEntry": 1,
      "StatCode": "ST01",
      "Code": "CC01",
      "DateTo": "2026-12-31"
    }
  ]
}
```

</details>

#### OccurrenceCodes

<details>
<summary>listOccurrenceCodes</summary>

Queries the OccurrenceCodes collection and returns a paged list of bank collection occurrence codes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListOccurrenceCodesHeaders</code> | No | Headers to be sent with the request. |
| `queries` | <code>ListOccurrenceCodesQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`). |

**Returns:** `OccurrenceCodesCollectionResponse|error`

**Sample code:**

```ballerina
OccurrenceCodesCollectionResponse result = check client->listOccurrenceCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#OccurrenceCodes",
  "value": [
    {
      "RequestedBoeStatus": "boeSt_Open",
      "IsMovement": "tYES",
      "Description": "Payment confirmed",
      "Note": "Bank slip paid",
      "AbsEntry": 1,
      "Code": "OC01"
    }
  ],
  "odata.nextLink": "OccurrenceCodes?$skip=20"
}
```

</details>

<details>
<summary>createOccurrenceCodes</summary>

Creates a new OccurenceCode record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>OccurenceCode</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `OccurenceCode|error`

**Sample code:**

```ballerina
OccurenceCode result = check client->createOccurrenceCodes(payload);
```

**Sample response:**

```json
{
  "RequestedBoeStatus": "boeSt_Open",
  "IsMovement": "tYES",
  "Description": "Payment confirmed",
  "Note": "Bank slip paid",
  "AbsEntry": 1,
  "Code": "OC01"
}
```

</details>

<details>
<summary>getOccurrenceCodes</summary>

Retrieves a single OccurenceCode by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetOccurrenceCodesQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`). |

**Returns:** `OccurenceCode|error`

**Sample code:**

```ballerina
OccurenceCode result = check client->getOccurrenceCodes(1);
```

**Sample response:**

```json
{
  "RequestedBoeStatus": "boeSt_Open",
  "IsMovement": "tYES",
  "Description": "Payment confirmed",
  "Note": "Bank slip paid",
  "AbsEntry": 1,
  "Code": "OC01"
}
```

</details>

<details>
<summary>deleteOccurrenceCodes</summary>

Deletes the OccurenceCode identified by `AbsEntry`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteOccurrenceCodes(1);
```

</details>

<details>
<summary>updateOccurrenceCodes</summary>

Partially updates an OccurenceCode using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32). |
| `payload` | <code>OccurenceCode</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateOccurrenceCodes(1, payload);
```

</details>

<details>
<summary>occurrenceCodesServiceGetList</summary>

Invokes the `OccurrenceCodesService_GetList` function import to retrieve the list of occurrence codes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `inline_response_200_41|error`

**Sample code:**

```ballerina
inline_response_200_41 result = check client->occurrenceCodesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#OccurrenceCodesService_GetList",
  "value": [
    {
      "RequestedBoeStatus": "boeSt_Open",
      "IsMovement": "tYES",
      "Description": "Payment confirmed",
      "Note": "Bank slip paid",
      "AbsEntry": 1
    }
  ]
}
```

</details>

#### ElectronicDocuments

<details>
<summary>electronicDocumentServiceAddEmergencyNumber</summary>

Adds an emergency number entry used for contingency electronic-document issuance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_AddEmergencyNumber_body</code> | Yes | Request payload wrapping an <code>EmergencyNumber</code>. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->electronicDocumentServiceAddEmergencyNumber(payload);
```

</details>

<details>
<summary>electronicDocumentServiceAddImportEntry</summary>

Adds an import entry to the electronic document framework for a contingency or imported document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_AddImportEntry_body</code> | Yes | Request payload wrapping an <code>EDFImportEntry</code>. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->electronicDocumentServiceAddImportEntry(payload);
```

</details>

<details>
<summary>electronicDocumentServiceAddLog</summary>

Adds a log entry to an electronic document entry's processing history.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_AddLog_body</code> | Yes | Request payload wrapping an <code>EDFEntryAddLogInputParams</code>. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->electronicDocumentServiceAddLog(payload);
```

</details>

<details>
<summary>electronicDocumentServiceCreateEntry</summary>

Creates a new electronic document framework (EDF) entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_CreateEntry_body</code> | Yes | Request payload wrapping an <code>EDFEntry</code>. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->electronicDocumentServiceCreateEntry(payload);
```

</details>

<details>
<summary>electronicDocumentServiceExportEntryLog</summary>

Exports the log data of an electronic document entry to a file.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_ExportEntryLog_body</code> | Yes | Request payload wrapping an <code>EDFEntryLogInputParams</code>. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->electronicDocumentServiceExportEntryLog(payload);
```

</details>

<details>
<summary>electronicDocumentServiceGetDocMappingList</summary>

Retrieves the list of document type mappings configured for an electronic document protocol.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_GetDocMappingList_body</code> | Yes | Request payload wrapping an <code>EDFDocMappingInputParams</code> (protocol `Code` and `DocType`). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `inline_response_200_18|error`

**Sample code:**

```ballerina
inline_response_200_18 result = check client->electronicDocumentServiceGetDocMappingList(payload);
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ElectronicDocumentService_GetDocMappingList",
  "value": [
    {
      "Description": "AR Invoice",
      "ID": 1,
      "Name": "ARInvoice"
    }
  ]
}
```

</details>

<details>
<summary>electronicDocumentServiceGetEmergencyNumbers</summary>

Retrieves the list of configured emergency numbers for contingency issuance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `inline_response_200_19|error`

**Sample code:**

```ballerina
inline_response_200_19 result = check client->electronicDocumentServiceGetEmergencyNumbers();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ElectronicDocumentService_GetEmergencyNumbers",
  "value": [
    {
      "Status": "Active",
      "Number": "0001",
      "AbsEntry": 1,
      "Code": "edpcs_GEN"
    }
  ]
}
```

</details>

<details>
<summary>electronicDocumentServiceGetEntry</summary>

Retrieves a single electronic document framework entry by GUID and protocol code.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_GetEntry_body</code> | Yes | Request payload wrapping an <code>EDFEntryInputParams</code> (`GUID`, `Code`). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `EDFEntry|error`

**Sample code:**

```ballerina
EDFEntry result = check client->electronicDocumentServiceGetEntry(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "edpcs_GEN",
  "ParentAbsEntry": 0,
  "Type": "edetARInvoice",
  "Status": "edesSent",
  "BranchID": 1,
  "Description": "AR Invoice electronic document",
  "Submits": 1,
  "AssignedID": "DOC-0001",
  "IsRemoved": "tNO",
  "IsCancelation": "tNO",
  "CreateDate": "2026-07-01"
}
```

</details>

<details>
<summary>electronicDocumentServiceGetEntryList</summary>

Retrieves a filtered list of electronic document framework entries.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_GetEntryList_body</code> | Yes | Request payload wrapping an <code>EDFEntryListInputParams</code> (`MaxLines`, `FromEntryID`, `BranchID`, etc). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `inline_response_200_20|error`

**Sample code:**

```ballerina
inline_response_200_20 result = check client->electronicDocumentServiceGetEntryList(payload);
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ElectronicDocumentService_GetEntryList",
  "value": [
    {
      "AbsEntry": 1,
      "Code": "edpcs_GEN",
      "Type": "edetARInvoice",
      "Status": "edesSent"
    }
  ]
}
```

</details>

<details>
<summary>electronicDocumentServiceGetLastLog</summary>

Retrieves the most recent log entry recorded for an electronic document entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_GetLastLog_body</code> | Yes | Request payload wrapping an <code>EDFEntryLogInputParams</code>. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `EDFEntryLog|error`

**Sample code:**

```ballerina
EDFEntryLog result = check client->electronicDocumentServiceGetLastLog(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "LogNumber": 3,
  "LogType": "edeltSend",
  "LogMessage": "Document sent successfully",
  "LogOperationDate": "2026-07-10",
  "LogOperationTime": 930,
  "IsSensitive": "tNO"
}
```

</details>

<details>
<summary>electronicDocumentServiceGetLogs</summary>

Retrieves the full list of log entries recorded for an electronic document entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_GetLogs_body</code> | Yes | Request payload wrapping an <code>EDFEntryLogInputParams</code>. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `inline_response_200_21|error`

**Sample code:**

```ballerina
inline_response_200_21 result = check client->electronicDocumentServiceGetLogs(payload);
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ElectronicDocumentService_GetLogs",
  "value": [
    {
      "AbsEntry": 1,
      "LogNumber": 1,
      "LogType": "edeltSend",
      "LogMessage": "Document sent successfully"
    }
  ]
}
```

</details>

<details>
<summary>electronicDocumentServiceGetMappingByHash</summary>

Retrieves an electronic document format mapping by its hash value.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_GetMappingByHash_body</code> | Yes | Request payload wrapping an <code>EDFMappingInputParams</code> (`Hash`). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `EDFMapping|error`

**Sample code:**

```ballerina
EDFMapping result = check client->electronicDocumentServiceGetMappingByHash(payload);
```

**Sample response:**

```json
{
  "Mapping": "<mapping/>",
  "Hash": "a1b2c3d4",
  "FormatID": 1,
  "Name": "ARInvoiceMapping"
}
```

</details>

<details>
<summary>electronicDocumentServiceGetProtocolParameter</summary>

Retrieves a single configuration parameter of an electronic document protocol.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_GetProtocolParameter_body</code> | Yes | Request payload wrapping an <code>EDFProtocolParameterInputParams</code> (`LineNum`, `Branch`, `Code`). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `EDFProtocolParameter|error`

**Sample code:**

```ballerina
EDFProtocolParameter result = check client->electronicDocumentServiceGetProtocolParameter(payload);
```

**Sample response:**

```json
{
  "UserSignature": 1,
  "ParameterType": "String",
  "UIOrder": 1,
  "ParamValue": "https://endpoint.example.com",
  "BranchID": 1,
  "Code": "edpcs_GEN",
  "ParameterID": 1,
  "Visible": "tYES",
  "ParamName": "EndpointURL"
}
```

</details>

<details>
<summary>electronicDocumentServiceGetProtocols</summary>

Retrieves the list of all electronic document protocols configured in the system.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `inline_response_200_22|error`

**Sample code:**

```ballerina
inline_response_200_22 result = check client->electronicDocumentServiceGetProtocols();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ElectronicDocumentService_GetProtocols",
  "value": [
    {
      "Description": "Generic protocol",
      "IsActive": "tYES",
      "Code": "edpcs_GEN"
    }
  ]
}
```

</details>

<details>
<summary>electronicDocumentServiceUpdateEntry</summary>

Updates an existing electronic document framework entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_UpdateEntry_body</code> | Yes | Request payload wrapping an <code>EDFEntry</code>. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->electronicDocumentServiceUpdateEntry(payload);
```

</details>

<details>
<summary>electronicDocumentServiceUpdateExtendedProperties</summary>

Updates the extended properties and parameter collection of an electronic document protocol.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_UpdateExtendedProperties_body</code> | Yes | Request payload wrapping an <code>EDFProtocolWithParameters</code>. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->electronicDocumentServiceUpdateExtendedProperties(payload);
```

</details>

<details>
<summary>electronicDocumentServiceUpdateProtocolParameter</summary>

Updates a single configuration parameter of an electronic document protocol.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicDocumentService_UpdateProtocolParameter_body</code> | Yes | Request payload wrapping an <code>EDFProtocolParameter</code>. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->electronicDocumentServiceUpdateProtocolParameter(payload);
```

</details>

<details>
<summary>listElectronicDocuments</summary>

Queries the ElectronicDocuments collection and returns a paged list of electronic document protocols.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListElectronicDocumentsHeaders</code> | No | Headers to be sent with the request. |
| `queries` | <code>ListElectronicDocumentsQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`). |

**Returns:** `ElectronicDocumentsCollectionResponse|error`

**Sample code:**

```ballerina
ElectronicDocumentsCollectionResponse result = check client->listElectronicDocuments();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ElectronicDocuments",
  "value": [
    {
      "Description": "Generic protocol",
      "IsActive": "tYES",
      "Code": "edpcs_GEN"
    }
  ],
  "odata.nextLink": "ElectronicDocuments?$skip=20"
}
```

</details>

<details>
<summary>createElectronicDocuments</summary>

Creates a new EDFProtocol record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EDFProtocol</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `EDFProtocol|error`

**Sample code:**

```ballerina
EDFProtocol result = check client->createElectronicDocuments(payload);
```

**Sample response:**

```json
{
  "Description": "Generic protocol",
  "IsActive": "tYES",
  "Code": "edpcs_GEN"
}
```

</details>

<details>
<summary>getElectronicDocuments</summary>

Retrieves a single EDFProtocol by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>ElectronicDocProtocolCodeStrEnum</code> | Yes | Key property 'Code' (SAPB1.ElectronicDocProtocolCodeStrEnum). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetElectronicDocumentsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`). |

**Returns:** `EDFProtocol|error`

**Sample code:**

```ballerina
EDFProtocol result = check client->getElectronicDocuments("edpcs_GEN");
```

**Sample response:**

```json
{
  "Description": "Generic protocol",
  "IsActive": "tYES",
  "Code": "edpcs_GEN"
}
```

</details>

<details>
<summary>deleteElectronicDocuments</summary>

Deletes the EDFProtocol identified by `Code`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>ElectronicDocProtocolCodeStrEnum</code> | Yes | Key property 'Code' (SAPB1.ElectronicDocProtocolCodeStrEnum). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteElectronicDocuments("edpcs_GEN");
```

</details>

<details>
<summary>updateElectronicDocuments</summary>

Partially updates an EDFProtocol using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>ElectronicDocProtocolCodeStrEnum</code> | Yes | Key property 'Code' (SAPB1.ElectronicDocProtocolCodeStrEnum). |
| `payload` | <code>EDFProtocol</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateElectronicDocuments("edpcs_GEN", payload);
```

</details>

#### NotaFiscalCFOP

<details>
<summary>listNotaFiscalCFOP</summary>

Queries the NotaFiscalCFOP collection and returns a paged list of Brazilian Nota Fiscal CFOP codes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListNotaFiscalCFOPHeaders</code> | No | Headers to be sent with the request. |
| `queries` | <code>ListNotaFiscalCFOPQueries</code> | No | Queries to be sent with the request (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`). |

**Returns:** `NotaFiscalCFOPCollectionResponse|error`

**Sample code:**

```ballerina
NotaFiscalCFOPCollectionResponse result = check client->listNotaFiscalCFOP();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#NotaFiscalCFOP",
  "value": [
    {
      "ID": 1,
      "Description": "Sale of production",
      "Code": "5101",
      "Application": "Internal"
    }
  ],
  "odata.nextLink": "NotaFiscalCFOP?$skip=20"
}
```

</details>

<details>
<summary>createNotaFiscalCFOP</summary>

Creates a new NotaFiscalCFOP record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>NotaFiscalCFOP</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `NotaFiscalCFOP|error`

**Sample code:**

```ballerina
NotaFiscalCFOP result = check client->createNotaFiscalCFOP(payload);
```

**Sample response:**

```json
{
  "ID": 1,
  "Description": "Sale of production",
  "Code": "5101",
  "Application": "Internal"
}
```

</details>

<details>
<summary>getNotaFiscalCFOP</summary>

Retrieves a single NotaFiscalCFOP by its `ID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |
| `queries` | <code>GetNotaFiscalCFOPQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`). |

**Returns:** `NotaFiscalCFOP|error`

**Sample code:**

```ballerina
NotaFiscalCFOP result = check client->getNotaFiscalCFOP(1);
```

**Sample response:**

```json
{
  "ID": 1,
  "Description": "Sale of production",
  "Code": "5101",
  "Application": "Internal"
}
```

</details>

<details>
<summary>deleteNotaFiscalCFOP</summary>

Deletes the NotaFiscalCFOP identified by `ID`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32). |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteNotaFiscalCFOP(1);
```

</details>

<details>
<summary>updateNotaFiscalCFOP</summary>

Partially updates a NotaFiscalCFOP using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32). |
| `payload` | <code>NotaFiscalCFOP</code> | Yes | Request payload. |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request. |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateNotaFiscalCFOP(1, payload);
```

</details>

#### SelfCreditMemos

<details>
<summary>selfCreditMemoServiceApproveAndAdd</summary>

Approves and adds a Self Credit Memo document supplied in the request payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SelfCreditMemoService_ApproveAndAdd_body</code> | Yes | Wraps the `Document` to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->selfCreditMemoServiceApproveAndAdd({document: {CardCode: "C0001", DocDate: "2026-07-10"}});
```

</details>

<details>
<summary>selfCreditMemoServiceApproveAndUpdate</summary>

Approves and updates an existing Self Credit Memo document supplied in the request payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SelfCreditMemoService_ApproveAndUpdate_body</code> | Yes | Wraps the `Document` to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->selfCreditMemoServiceApproveAndUpdate({document: {DocEntry: 123, Comments: "Approved"}});
```

</details>

<details>
<summary>selfCreditMemoServiceCloseByDate</summary>

Closes Self Credit Memo document lines up to a specified date.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SelfCreditMemoService_CloseByDate_body</code> | Yes | Wraps the `DocumentCloseParams` (document key, closing date and closing option) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->selfCreditMemoServiceCloseByDate({documentCloseParams: {docEntry: 123, specifiedClosingDate: "2026-07-10", closingOption: "coBySpecifiedDate"}});
```

</details>

<details>
<summary>selfCreditMemoServiceExportEWayBill</summary>

Exports the E-Way Bill for the Self Credit Memo document supplied in the request payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SelfCreditMemoService_ExportEWayBill_body</code> | Yes | Wraps the `Document` to export the E-Way Bill for |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->selfCreditMemoServiceExportEWayBill({document: {DocEntry: 123}});
```

</details>

<details>
<summary>selfCreditMemoServiceGetApprovalTemplates</summary>

Retrieves the applicable approval templates for the Self Credit Memo document supplied in the request payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SelfCreditMemoService_GetApprovalTemplates_body</code> | Yes | Wraps the `Document` to get approval templates for |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->selfCreditMemoServiceGetApprovalTemplates({document: {CardCode: "C0001"}});
```

**Sample response:**

```json
{
  "DocEntry": 123,
  "DocNum": 456,
  "CardCode": "C0001",
  "CardName": "Example Customer",
  "DocTotal": 1500.00
}
```

</details>

<details>
<summary>selfCreditMemoServiceHandleApprovalRequest</summary>

Handles an incoming approval request event for Self Credit Memos.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->selfCreditMemoServiceHandleApprovalRequest();
```

</details>

<details>
<summary>selfCreditMemoServiceInitData</summary>

Initializes and returns default data for a new Self Credit Memo document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->selfCreditMemoServiceInitData();
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocType": "dDocument_Items",
  "DocDate": "2026-07-10",
  "DocCurrency": "USD"
}
```

</details>

<details>
<summary>listSelfCreditMemos</summary>

Queries the SelfCreditMemos collection and returns a page of Document entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListSelfCreditMemosHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSelfCreditMemosQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `SelfCreditMemosCollectionResponse|error`

**Sample code:**

```ballerina
SelfCreditMemosCollectionResponse result = check client->listSelfCreditMemos();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SelfCreditMemos",
  "value": [
    {"DocEntry": 123, "DocNum": 456, "CardCode": "C0001", "DocTotal": 1500.00}
  ]
}
```

</details>

<details>
<summary>createSelfCreditMemos</summary>

Creates a new SelfCreditMemos Document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createSelfCreditMemos({CardCode: "C0001", DocDate: "2026-07-10"});
```

**Sample response:**

```json
{
  "DocEntry": 123,
  "DocNum": 456,
  "CardCode": "C0001",
  "DocDate": "2026-07-10",
  "DocTotal": 1500.00
}
```

</details>

<details>
<summary>getSelfCreditMemos</summary>

Retrieves a single SelfCreditMemos Document by its DocEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSelfCreditMemosQueries</code> | No | OData query options ($expand, $select) |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getSelfCreditMemos(123);
```

**Sample response:**

```json
{
  "DocEntry": 123,
  "DocNum": 456,
  "CardCode": "C0001",
  "DocTotal": 1500.00
}
```

</details>

<details>
<summary>deleteSelfCreditMemos</summary>

Deletes a SelfCreditMemos Document by its DocEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSelfCreditMemos(123);
```

</details>

<details>
<summary>updateSelfCreditMemos</summary>

Partially updates a SelfCreditMemos Document (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSelfCreditMemos(123, {Comments: "Updated comments"});
```

</details>

<details>
<summary>selfCreditMemosCancel</summary>

Bound action 'Cancel' on SelfCreditMemos that cancels the Document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->selfCreditMemosCancel(123);
```

</details>

<details>
<summary>selfCreditMemosClose</summary>

Bound action 'Close' on SelfCreditMemos that closes the Document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->selfCreditMemosClose(123);
```

</details>

<details>
<summary>selfCreditMemosCreateCancellationDocument</summary>

Bound action 'CreateCancellationDocument' on SelfCreditMemos that creates a cancellation Document for the entity identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->selfCreditMemosCreateCancellationDocument(123);
```

**Sample response:**

```json
{
  "DocEntry": 789,
  "DocNum": 999,
  "CardCode": "C0001",
  "DocTotal": -1500.00
}
```

</details>

<details>
<summary>selfCreditMemosReopen</summary>

Bound action 'Reopen' on SelfCreditMemos that reopens the Document identified by DocEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->selfCreditMemosReopen(123);
```

</details>

#### FiscalPrinter

<details>
<summary>listFiscalPrinter</summary>

Queries the FiscalPrinter collection and returns a page of FiscalPrinter entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListFiscalPrinterHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListFiscalPrinterQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `FiscalPrinterCollectionResponse|error`

**Sample code:**

```ballerina
FiscalPrinterCollectionResponse result = check client->listFiscalPrinter();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#FiscalPrinter",
  "value": [
    {"EquipmentNo": "FP001", "Model": "Epson TM-T88", "RegisterNo": 1}
  ]
}
```

</details>

<details>
<summary>createFiscalPrinter</summary>

Creates a new FiscalPrinter entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>FiscalPrinter</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `FiscalPrinter|error`

**Sample code:**

```ballerina
FiscalPrinter result = check client->createFiscalPrinter({equipmentNo: "FP001", model: "Epson TM-T88", registerNo: 1});
```

**Sample response:**

```json
{
  "EquipmentNo": "FP001",
  "Model": "Epson TM-T88",
  "RegisterNo": 1,
  "FiscalDocumentModel": "2D"
}
```

</details>

<details>
<summary>getFiscalPrinter</summary>

Retrieves a single FiscalPrinter entity by its EquipmentNo key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `equipmentNo` | <code>string</code> | Yes | Key property 'EquipmentNo' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFiscalPrinterQueries</code> | No | OData query options ($expand, $select) |

**Returns:** `FiscalPrinter|error`

**Sample code:**

```ballerina
FiscalPrinter result = check client->getFiscalPrinter("FP001");
```

**Sample response:**

```json
{
  "EquipmentNo": "FP001",
  "Model": "Epson TM-T88",
  "RegisterNo": 1
}
```

</details>

<details>
<summary>deleteFiscalPrinter</summary>

Deletes a FiscalPrinter entity by its EquipmentNo key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `equipmentNo` | <code>string</code> | Yes | Key property 'EquipmentNo' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFiscalPrinter("FP001");
```

</details>

<details>
<summary>updateFiscalPrinter</summary>

Partially updates a FiscalPrinter entity (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `equipmentNo` | <code>string</code> | Yes | Key property 'EquipmentNo' (Edm.String) |
| `payload` | <code>FiscalPrinter</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateFiscalPrinter("FP001", {model: "Epson TM-T88 v2"});
```

</details>

<details>
<summary>fiscalPrinterServiceGetFiscalPrinterList</summary>

Retrieves the fiscal printer list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_25|error`

**Sample code:**

```ballerina
inline_response_200_25 result = check client->fiscalPrinterServiceGetFiscalPrinterList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#FiscalPrinterService_GetFiscalPrinterList",
  "value": [
    {"EquipmentNo": "FP001"}
  ]
}
```

</details>

#### ISDRecipientCreditMemos

<details>
<summary>listISDRecipientCreditMemos</summary>

Queries the ISDRecipientCreditMemos collection and returns a page of ISDRecipientCreditMemo entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListISDRecipientCreditMemosHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListISDRecipientCreditMemosQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `ISDRecipientCreditMemosCollectionResponse|error`

**Sample code:**

```ballerina
ISDRecipientCreditMemosCollectionResponse result = check client->listISDRecipientCreditMemos();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ISDRecipientCreditMemos",
  "value": [
    {"DocumentEntry": 123, "DocumentNumber": 456, "DocumentStatus": "isd_Open"}
  ]
}
```

</details>

<details>
<summary>createISDRecipientCreditMemos</summary>

Creates a new ISDRecipientCreditMemo entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ISDRecipientCreditMemo</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ISDRecipientCreditMemo|error`

**Sample code:**

```ballerina
ISDRecipientCreditMemo result = check client->createISDRecipientCreditMemos({ReferenceEntry: 100, SourceLocationCode: 1, TargetLocationCode: 2});
```

**Sample response:**

```json
{
  "DocumentEntry": 123,
  "DocumentNumber": 456,
  "DocumentStatus": "isd_Open"
}
```

</details>

<details>
<summary>getISDRecipientCreditMemos</summary>

Retrieves a single ISDRecipientCreditMemo entity by its DocumentEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetISDRecipientCreditMemosQueries</code> | No | OData query options ($expand, $select) |

**Returns:** `ISDRecipientCreditMemo|error`

**Sample code:**

```ballerina
ISDRecipientCreditMemo result = check client->getISDRecipientCreditMemos(123);
```

**Sample response:**

```json
{
  "DocumentEntry": 123,
  "DocumentNumber": 456,
  "DocumentStatus": "isd_Open"
}
```

</details>

<details>
<summary>deleteISDRecipientCreditMemos</summary>

Deletes an ISDRecipientCreditMemo entity by its DocumentEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteISDRecipientCreditMemos(123);
```

</details>

<details>
<summary>updateISDRecipientCreditMemos</summary>

Partially updates an ISDRecipientCreditMemo entity (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `payload` | <code>ISDRecipientCreditMemo</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateISDRecipientCreditMemos(123, {Remarks: "Updated"});
```

</details>

<details>
<summary>iSDRecipientCreditMemosCancel</summary>

Bound action 'Cancel' on ISDRecipientCreditMemos that cancels the entity identified by DocumentEntry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->iSDRecipientCreditMemosCancel(123);
```

</details>

<details>
<summary>iSDRecipientCreditMemosServiceGetList</summary>

Retrieves the ISDRecipientCreditMemos service list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_30|error`

**Sample code:**

```ballerina
inline_response_200_30 result = check client->iSDRecipientCreditMemosServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ISDRecipientCreditMemosService_GetList",
  "value": [
    {"DocumentEntry": 123, "DocumentNumber": 456}
  ]
}
```

</details>

#### BrazilFuelIndexers

<details>
<summary>listBrazilFuelIndexers</summary>

Queries the BrazilFuelIndexers collection and returns a page of BrazilFuelIndexer entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBrazilFuelIndexersHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBrazilFuelIndexersQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `BrazilFuelIndexersCollectionResponse|error`

**Sample code:**

```ballerina
BrazilFuelIndexersCollectionResponse result = check client->listBrazilFuelIndexers();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#BrazilFuelIndexers",
  "value": [
    {"FuelID": 1, "Description": "Gasoline", "FuelCode": "GAS", "FuelGroupCode": 1}
  ]
}
```

</details>

<details>
<summary>createBrazilFuelIndexers</summary>

Creates a new BrazilFuelIndexer entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BrazilFuelIndexer</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BrazilFuelIndexer|error`

**Sample code:**

```ballerina
BrazilFuelIndexer result = check client->createBrazilFuelIndexers({description: "Gasoline", fuelCode: "GAS", fuelGroupCode: 1});
```

**Sample response:**

```json
{
  "FuelID": 1,
  "Description": "Gasoline",
  "FuelCode": "GAS",
  "FuelGroupCode": 1
}
```

</details>

<details>
<summary>getBrazilFuelIndexers</summary>

Retrieves a single BrazilFuelIndexer entity by its FuelID key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `fuelID` | <code>int:Signed32</code> | Yes | Key property 'FuelID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBrazilFuelIndexersQueries</code> | No | OData query options ($expand, $select) |

**Returns:** `BrazilFuelIndexer|error`

**Sample code:**

```ballerina
BrazilFuelIndexer result = check client->getBrazilFuelIndexers(1);
```

**Sample response:**

```json
{
  "FuelID": 1,
  "Description": "Gasoline",
  "FuelCode": "GAS",
  "FuelGroupCode": 1
}
```

</details>

<details>
<summary>deleteBrazilFuelIndexers</summary>

Deletes a BrazilFuelIndexer entity by its FuelID key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `fuelID` | <code>int:Signed32</code> | Yes | Key property 'FuelID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBrazilFuelIndexers(1);
```

</details>

<details>
<summary>updateBrazilFuelIndexers</summary>

Partially updates a BrazilFuelIndexer entity (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `fuelID` | <code>int:Signed32</code> | Yes | Key property 'FuelID' (Edm.Int32) |
| `payload` | <code>BrazilFuelIndexer</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBrazilFuelIndexers(1, {description: "Gasoline Common"});
```

</details>

<details>
<summary>brazilFuelIndexersServiceGetList</summary>

Retrieves the BrazilFuelIndexers service list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_2|error`

**Sample code:**

```ballerina
inline_response_200_2 result = check client->brazilFuelIndexersServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#BrazilFuelIndexersService_GetList",
  "value": [
    {"FuelID": 1, "Description": "Gasoline"}
  ]
}
```

</details>

#### CESTCodes

<details>
<summary>listCESTCodes</summary>

Queries the CESTCodes collection and returns a page of CESTCodeData entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCESTCodesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCESTCodesQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `CESTCodesCollectionResponse|error`

**Sample code:**

```ballerina
CESTCodesCollectionResponse result = check client->listCESTCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#CESTCodes",
  "value": [
    {"AbsEntry": 1, "Code": "1300100", "Description": "Gasolina"}
  ]
}
```

</details>

<details>
<summary>createCESTCodes</summary>

Creates a new CESTCodeData entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CESTCodeData</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CESTCodeData|error`

**Sample code:**

```ballerina
CESTCodeData result = check client->createCESTCodes({code: "1300100", description: "Gasolina"});
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "1300100",
  "Description": "Gasolina"
}
```

</details>

<details>
<summary>getCESTCodes</summary>

Retrieves a single CESTCodeData entity by its AbsEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCESTCodesQueries</code> | No | OData query options ($expand, $select) |

**Returns:** `CESTCodeData|error`

**Sample code:**

```ballerina
CESTCodeData result = check client->getCESTCodes(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "1300100",
  "Description": "Gasolina"
}
```

</details>

<details>
<summary>deleteCESTCodes</summary>

Deletes a CESTCodeData entity by its AbsEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCESTCodes(1);
```

</details>

<details>
<summary>updateCESTCodes</summary>

Partially updates a CESTCodeData entity (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>CESTCodeData</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCESTCodes(1, {description: "Gasolina Comum"});
```

</details>

#### IdentificationCodes

<details>
<summary>identificationCodeServiceGetList</summary>

Retrieves the IdentificationCode service list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_32|error`

**Sample code:**

```ballerina
inline_response_200_32 result = check client->identificationCodeServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#IdentificationCodeService_GetList",
  "value": [
    {"AbsEntry": 1, "Code": "01", "Description": "Order Identification"}
  ]
}
```

</details>

<details>
<summary>listIdentificationCodes</summary>

Queries the IdentificationCodes collection and returns a page of IdentificationCode entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListIdentificationCodesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListIdentificationCodesQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `IdentificationCodesCollectionResponse|error`

**Sample code:**

```ballerina
IdentificationCodesCollectionResponse result = check client->listIdentificationCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#IdentificationCodes",
  "value": [
    {"AbsEntry": 1, "Codelist": "idctOrder", "Code": "01", "Description": "Order Identification"}
  ]
}
```

</details>

<details>
<summary>createIdentificationCodes</summary>

Creates a new IdentificationCode entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>IdentificationCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `IdentificationCode|error`

**Sample code:**

```ballerina
IdentificationCode result = check client->createIdentificationCodes({codelist: "idctOrder", code: "01", description: "Order Identification"});
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Codelist": "idctOrder",
  "Code": "01",
  "Description": "Order Identification"
}
```

</details>

<details>
<summary>getIdentificationCodes</summary>

Retrieves a single IdentificationCode entity by its AbsEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetIdentificationCodesQueries</code> | No | OData query options ($expand, $select) |

**Returns:** `IdentificationCode|error`

**Sample code:**

```ballerina
IdentificationCode result = check client->getIdentificationCodes(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Codelist": "idctOrder",
  "Code": "01",
  "Description": "Order Identification"
}
```

</details>

<details>
<summary>deleteIdentificationCodes</summary>

Deletes an IdentificationCode entity by its AbsEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteIdentificationCodes(1);
```

</details>

<details>
<summary>updateIdentificationCodes</summary>

Partially updates an IdentificationCode entity (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>IdentificationCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateIdentificationCodes(1, {description: "Order Identification Updated"});
```

</details>

#### NCMCodesSetup

<details>
<summary>listNCMCodesSetup</summary>

Queries the NCMCodesSetup collection and returns a page of NCMCodeSetup entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListNCMCodesSetupHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListNCMCodesSetupQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `NCMCodesSetupCollectionResponse|error`

**Sample code:**

```ballerina
NCMCodesSetupCollectionResponse result = check client->listNCMCodesSetup();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#NCMCodesSetup",
  "value": [
    {"AbsEntry": 1, "NCMCode": "12345678", "Description": "Vehicle parts", "GroupCode": "01"}
  ]
}
```

</details>

<details>
<summary>createNCMCodesSetup</summary>

Creates a new NCMCodeSetup entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>NCMCodeSetup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `NCMCodeSetup|error`

**Sample code:**

```ballerina
NCMCodeSetup result = check client->createNCMCodesSetup({nCMCode: "12345678", description: "Vehicle parts", groupCode: "01"});
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "NCMCode": "12345678",
  "Description": "Vehicle parts",
  "GroupCode": "01"
}
```

</details>

<details>
<summary>getNCMCodesSetup</summary>

Retrieves a single NCMCodeSetup entity by its AbsEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetNCMCodesSetupQueries</code> | No | OData query options ($expand, $select) |

**Returns:** `NCMCodeSetup|error`

**Sample code:**

```ballerina
NCMCodeSetup result = check client->getNCMCodesSetup(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "NCMCode": "12345678",
  "Description": "Vehicle parts",
  "GroupCode": "01"
}
```

</details>

<details>
<summary>deleteNCMCodesSetup</summary>

Deletes an NCMCodeSetup entity by its AbsEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteNCMCodesSetup(1);
```

</details>

<details>
<summary>updateNCMCodesSetup</summary>

Partially updates an NCMCodeSetup entity (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>NCMCodeSetup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateNCMCodesSetup(1, {description: "Vehicle parts updated"});
```

</details>

<details>
<summary>nCMCodesSetupServiceGetNCMCodeSetupList</summary>

Retrieves the NCM code setup list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_38|error`

**Sample code:**

```ballerina
inline_response_200_38 result = check client->nCMCodesSetupServiceGetNCMCodeSetupList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#NCMCodesSetupService_GetNCMCodeSetupList",
  "value": [
    {"NCMCode": "12345678", "Description": "Vehicle parts", "AbsEntry": 1}
  ]
}
```

</details>

#### CustomsDeclaration

<details>
<summary>listCustomsDeclaration</summary>

Queries the CustomsDeclaration collection and returns a page of CustomsDeclaration entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCustomsDeclarationHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCustomsDeclarationQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `CustomsDeclarationCollectionResponse|error`

**Sample code:**

```ballerina
CustomsDeclarationCollectionResponse result = check client->listCustomsDeclaration();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#CustomsDeclaration",
  "value": [
    {"CCDNum": "CCD0001", "Date": "2026-07-10", "CustomsBroker": "Broker Co", "DocNum": "1001"}
  ]
}
```

</details>

<details>
<summary>createCustomsDeclaration</summary>

Creates a new CustomsDeclaration entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CustomsDeclaration</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CustomsDeclaration|error`

**Sample code:**

```ballerina
CustomsDeclaration result = check client->createCustomsDeclaration({CCDNum: "CCD0001", Date: "2026-07-10", CustomsBroker: "Broker Co"});
```

**Sample response:**

```json
{
  "CCDNum": "CCD0001",
  "Date": "2026-07-10",
  "CustomsBroker": "Broker Co",
  "DocNum": "1001"
}
```

</details>

<details>
<summary>getCustomsDeclaration</summary>

Retrieves a single CustomsDeclaration entity by its CCDNum key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `cCDNum` | <code>string</code> | Yes | Key property 'CCDNum' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCustomsDeclarationQueries</code> | No | OData query options ($expand, $select) |

**Returns:** `CustomsDeclaration|error`

**Sample code:**

```ballerina
CustomsDeclaration result = check client->getCustomsDeclaration("CCD0001");
```

**Sample response:**

```json
{
  "CCDNum": "CCD0001",
  "Date": "2026-07-10",
  "CustomsBroker": "Broker Co",
  "DocNum": "1001"
}
```

</details>

<details>
<summary>deleteCustomsDeclaration</summary>

Deletes a CustomsDeclaration entity by its CCDNum key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `cCDNum` | <code>string</code> | Yes | Key property 'CCDNum' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCustomsDeclaration("CCD0001");
```

</details>

<details>
<summary>updateCustomsDeclaration</summary>

Partially updates a CustomsDeclaration entity (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `cCDNum` | <code>string</code> | Yes | Key property 'CCDNum' (Edm.String) |
| `payload` | <code>CustomsDeclaration</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCustomsDeclaration("CCD0001", {CustomsBroker: "New Broker Co"});
```

</details>

#### ImportDeterminations

<details>
<summary>importDeterminationServiceGetDeterminations</summary>

Retrieves the applicable import determinations for the protocol code supplied in the request payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ImportDeterminationService_GetDeterminations_body</code> | Yes | Wraps the `ImportDeterminationsParams` (electronic document protocol code) to get determinations for |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_33|error`

**Sample code:**

```ballerina
inline_response_200_33 result = check client->importDeterminationServiceGetDeterminations({importDeterminationsParams: {Code: "edpcs_NFe"}});
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ImportDeterminationService_GetDeterminations",
  "value": [
    {"AbsEntry": 1, "Code": "edpcs_NFe", "LineNumber": 1, "FieldType": "iftCNPJ"}
  ]
}
```

</details>

<details>
<summary>listImportDeterminations</summary>

Queries the ImportDeterminations collection and returns a page of ImportDetermination entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListImportDeterminationsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListImportDeterminationsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `ImportDeterminationsCollectionResponse|error`

**Sample code:**

```ballerina
ImportDeterminationsCollectionResponse result = check client->listImportDeterminations();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ImportDeterminations",
  "value": [
    {"AbsEntry": 1, "Code": "edpcs_NFe", "LineNumber": 1, "FieldType": "iftCNPJ"}
  ]
}
```

</details>

<details>
<summary>createImportDeterminations</summary>

Creates a new ImportDetermination entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ImportDetermination</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ImportDetermination|error`

**Sample code:**

```ballerina
ImportDetermination result = check client->createImportDeterminations({Code: "edpcs_NFe", LineNumber: 1, FieldType: "iftCNPJ"});
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "edpcs_NFe",
  "LineNumber": 1,
  "FieldType": "iftCNPJ"
}
```

</details>

<details>
<summary>getImportDeterminations</summary>

Retrieves a single ImportDetermination entity by its AbsEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetImportDeterminationsQueries</code> | No | OData query options ($expand, $select) |

**Returns:** `ImportDetermination|error`

**Sample code:**

```ballerina
ImportDetermination result = check client->getImportDeterminations(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "edpcs_NFe",
  "LineNumber": 1,
  "FieldType": "iftCNPJ"
}
```

</details>

<details>
<summary>deleteImportDeterminations</summary>

Deletes an ImportDetermination entity by its AbsEntry key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteImportDeterminations(1);
```

</details>

<details>
<summary>updateImportDeterminations</summary>

Partially updates an ImportDetermination entity (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>ImportDetermination</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateImportDeterminations(1, {LineNumber: 2});
```

</details>

#### NotaFiscalUsage

<details>
<summary>listNotaFiscalUsage</summary>

Queries the NotaFiscalUsage collection and returns a page of NotaFiscalUsage entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListNotaFiscalUsageHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListNotaFiscalUsageQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `NotaFiscalUsageCollectionResponse|error`

**Sample code:**

```ballerina
NotaFiscalUsageCollectionResponse result = check client->listNotaFiscalUsage();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#NotaFiscalUsage",
  "value": [
    {"ID": 1, "Usage": "Venda", "Description": "Sale usage"}
  ]
}
```

</details>

<details>
<summary>createNotaFiscalUsage</summary>

Creates a new NotaFiscalUsage entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>NotaFiscalUsage</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `NotaFiscalUsage|error`

**Sample code:**

```ballerina
NotaFiscalUsage result = check client->createNotaFiscalUsage({Usage: "Venda", Description: "Sale usage"});
```

**Sample response:**

```json
{
  "ID": 1,
  "Usage": "Venda",
  "Description": "Sale usage"
}
```

</details>

<details>
<summary>getNotaFiscalUsage</summary>

Retrieves a single NotaFiscalUsage entity by its ID key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetNotaFiscalUsageQueries</code> | No | OData query options ($expand, $select) |

**Returns:** `NotaFiscalUsage|error`

**Sample code:**

```ballerina
NotaFiscalUsage result = check client->getNotaFiscalUsage(1);
```

**Sample response:**

```json
{
  "ID": 1,
  "Usage": "Venda",
  "Description": "Sale usage"
}
```

</details>

<details>
<summary>deleteNotaFiscalUsage</summary>

Deletes a NotaFiscalUsage entity by its ID key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteNotaFiscalUsage(1);
```

</details>

<details>
<summary>updateNotaFiscalUsage</summary>

Partially updates a NotaFiscalUsage entity (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `payload` | <code>NotaFiscalUsage</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateNotaFiscalUsage(1, {Description: "Sale usage updated"});
```

</details>

#### RetornoCodes

<details>
<summary>listRetornoCodes</summary>

Queries the RetornoCodes collection, returning a page of Brazilian boleto return-code entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListRetornoCodesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRetornoCodesQueries</code> | No | Queries to be sent with the request |

**Returns:** `RetornoCodesCollectionResponse|error`

**Sample code:**

```ballerina
RetornoCodesCollectionResponse result = check client->listRetornoCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#RetornoCodes",
  "value": [
    {
      "AbsEntry": 1,
      "MovementCode": 2,
      "Description": "Cheque devolvido",
      "OccurenceCode": 12,
      "BoeStatus": "boes_Created",
      "Color": 1,
      "BankCode": "001",
      "FileFormat": "240"
    }
  ],
  "odata.nextLink": "RetornoCodes?$skip=20"
}
```

</details>

<details>
<summary>createRetornoCodes</summary>

Creates a new RetornoCode entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>RetornoCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `RetornoCode|error`

**Sample code:**

```ballerina
RetornoCode result = check client->createRetornoCodes(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "MovementCode": 2,
  "Description": "Cheque devolvido",
  "OccurenceCode": 12,
  "BoeStatus": "boes_Created",
  "Color": 1,
  "BankCode": "001",
  "FileFormat": "240"
}
```

</details>

<details>
<summary>getRetornoCodes</summary>

Retrieves a single RetornoCode entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRetornoCodesQueries</code> | No | Queries to be sent with the request |

**Returns:** `RetornoCode|error`

**Sample code:**

```ballerina
RetornoCode result = check client->getRetornoCodes(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "MovementCode": 2,
  "Description": "Cheque devolvido",
  "OccurenceCode": 12,
  "BoeStatus": "boes_Created",
  "Color": 1,
  "BankCode": "001",
  "FileFormat": "240"
}
```

</details>

<details>
<summary>deleteRetornoCodes</summary>

Deletes the RetornoCode entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteRetornoCodes(1);
```

</details>

<details>
<summary>updateRetornoCodes</summary>

Partially updates a RetornoCode entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>RetornoCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateRetornoCodes(1, payload);
```

</details>

<details>
<summary>retornoCodesServiceGetList</summary>

Invokes the RetornoCodesService_GetList unbound function to retrieve a compact list of retorno codes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_42|error`

**Sample code:**

```ballerina
inline_response_200_42 result = check client->retornoCodesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#RetornoCodesService_GetList",
  "value": [
    {
      "MovementCode": 2,
      "Description": "Cheque devolvido",
      "OccurenceCode": 12,
      "BoeStatus": "boes_Created",
      "Color": 1,
      "BankCode": "001",
      "AbsEntry": 1,
      "FileFormat": "240"
    }
  ]
}
```

</details>

#### ElectronicFileFormats

<details>
<summary>listElectronicFileFormats</summary>

Queries the ElectronicFileFormats collection, returning a page of electronic file format entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListElectronicFileFormatsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListElectronicFileFormatsQueries</code> | No | Queries to be sent with the request |

**Returns:** `ElectronicFileFormatsCollectionResponse|error`

**Sample code:**

```ballerina
ElectronicFileFormatsCollectionResponse result = check client->listElectronicFileFormats();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ElectronicFileFormats",
  "value": [
    {
      "FormatID": 1,
      "Name": "NFe 4.0",
      "Description": "Nota Fiscal Eletronica",
      "SchemaVersion": "4.00",
      "Version": "1",
      "OutputFilePath": "C:\\NFe\\Output",
      "MenuPath": "Administration"
    }
  ],
  "odata.nextLink": "ElectronicFileFormats?$skip=20"
}
```

</details>

<details>
<summary>createElectronicFileFormats</summary>

Creates a new ElectronicFileFormat entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ElectronicFileFormat</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ElectronicFileFormat|error`

**Sample code:**

```ballerina
ElectronicFileFormat result = check client->createElectronicFileFormats(payload);
```

**Sample response:**

```json
{
  "FormatID": 1,
  "Name": "NFe 4.0",
  "Description": "Nota Fiscal Eletronica",
  "SchemaVersion": "4.00",
  "Version": "1",
  "OutputFilePath": "C:\\NFe\\Output",
  "MenuPath": "Administration"
}
```

</details>

<details>
<summary>getElectronicFileFormats</summary>

Retrieves a single ElectronicFileFormat entity identified by its `FormatID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `formatID` | <code>int:Signed32</code> | Yes | Key property 'FormatID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetElectronicFileFormatsQueries</code> | No | Queries to be sent with the request |

**Returns:** `ElectronicFileFormat|error`

**Sample code:**

```ballerina
ElectronicFileFormat result = check client->getElectronicFileFormats(1);
```

**Sample response:**

```json
{
  "FormatID": 1,
  "Name": "NFe 4.0",
  "Description": "Nota Fiscal Eletronica",
  "SchemaVersion": "4.00",
  "Version": "1",
  "OutputFilePath": "C:\\NFe\\Output",
  "MenuPath": "Administration"
}
```

</details>

<details>
<summary>deleteElectronicFileFormats</summary>

Deletes the ElectronicFileFormat entity identified by its `FormatID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `formatID` | <code>int:Signed32</code> | Yes | Key property 'FormatID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteElectronicFileFormats(1);
```

</details>

<details>
<summary>updateElectronicFileFormats</summary>

Partially updates an ElectronicFileFormat entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `formatID` | <code>int:Signed32</code> | Yes | Key property 'FormatID' (Edm.Int32) |
| `payload` | <code>ElectronicFileFormat</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateElectronicFileFormats(1, payload);
```

</details>

<details>
<summary>electronicFileFormatsServiceGetElectronicFileFormatList</summary>

Invokes the ElectronicFileFormatsService_GetElectronicFileFormatList unbound function to retrieve a compact list of electronic file formats.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_23|error`

**Sample code:**

```ballerina
inline_response_200_23 result = check client->electronicFileFormatsServiceGetElectronicFileFormatList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ElectronicFileFormatsService_GetElectronicFileFormatList",
  "value": [
    {
      "FormatID": 1,
      "Name": "NFe 4.0"
    }
  ]
}
```

</details>

#### ISDInvoices

<details>
<summary>listISDInvoices</summary>

Queries the ISDInvoices collection, returning a page of Indian ISD invoice entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListISDInvoicesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListISDInvoicesQueries</code> | No | Queries to be sent with the request |

**Returns:** `ISDInvoicesCollectionResponse|error`

**Sample code:**

```ballerina
ISDInvoicesCollectionResponse result = check client->listISDInvoices();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ISDInvoices",
  "value": [
    {
      "DocumentEntry": 1,
      "DocumentNumber": 1001,
      "Series": 1,
      "PostingDate": "2026-07-01",
      "DocDate": "2026-07-01",
      "SourceLocationCode": 10,
      "TargetLocationCode": 20,
      "ISDEntry": 5,
      "BPLId": 1,
      "VATRegNum": "27AAAAA0000A1Z5"
    }
  ],
  "odata.nextLink": "ISDInvoices?$skip=20"
}
```

</details>

<details>
<summary>createISDInvoices</summary>

Creates a new ISDInvoice entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ISDInvoice</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ISDInvoice|error`

**Sample code:**

```ballerina
ISDInvoice result = check client->createISDInvoices(payload);
```

**Sample response:**

```json
{
  "DocumentEntry": 1,
  "DocumentNumber": 1001,
  "Series": 1,
  "PostingDate": "2026-07-01",
  "DocDate": "2026-07-01",
  "SourceLocationCode": 10,
  "TargetLocationCode": 20,
  "ISDEntry": 5,
  "BPLId": 1,
  "VATRegNum": "27AAAAA0000A1Z5"
}
```

</details>

<details>
<summary>getISDInvoices</summary>

Retrieves a single ISDInvoice entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetISDInvoicesQueries</code> | No | Queries to be sent with the request |

**Returns:** `ISDInvoice|error`

**Sample code:**

```ballerina
ISDInvoice result = check client->getISDInvoices(1);
```

**Sample response:**

```json
{
  "DocumentEntry": 1,
  "DocumentNumber": 1001,
  "Series": 1,
  "PostingDate": "2026-07-01",
  "DocDate": "2026-07-01",
  "SourceLocationCode": 10,
  "TargetLocationCode": 20,
  "ISDEntry": 5,
  "BPLId": 1,
  "VATRegNum": "27AAAAA0000A1Z5"
}
```

</details>

<details>
<summary>deleteISDInvoices</summary>

Deletes the ISDInvoice entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteISDInvoices(1);
```

</details>

<details>
<summary>updateISDInvoices</summary>

Partially updates an ISDInvoice entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `payload` | <code>ISDInvoice</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateISDInvoices(1, payload);
```

</details>

<details>
<summary>iSDInvoicesCancel</summary>

Invokes the bound action 'Cancel' on an ISDInvoice to cancel it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->iSDInvoicesCancel(1);
```

</details>

<details>
<summary>iSDInvoicesServiceGetList</summary>

Invokes the ISDInvoicesService_GetList unbound function to retrieve a compact list of ISD invoices.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_29|error`

**Sample code:**

```ballerina
inline_response_200_29 result = check client->iSDInvoicesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ISDInvoicesService_GetList",
  "value": [
    {
      "DocumentEntry": 1,
      "DocumentNumber": 1001
    }
  ]
}
```

</details>

#### BrazilBeverageIndexers

<details>
<summary>listBrazilBeverageIndexers</summary>

Queries the BrazilBeverageIndexers collection, returning a page of beverage indexer entities used for Brazilian tax localization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBrazilBeverageIndexersHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBrazilBeverageIndexersQueries</code> | No | Queries to be sent with the request |

**Returns:** `BrazilBeverageIndexersCollectionResponse|error`

**Sample code:**

```ballerina
BrazilBeverageIndexersCollectionResponse result = check client->listBrazilBeverageIndexers();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BrazilBeverageIndexers",
  "value": [
    {
      "BeverageID": 1,
      "BeverageTableCode": "01",
      "BeverageGroupCode": "02",
      "BeverageCommercialBrandCode": 100
    }
  ],
  "odata.nextLink": "BrazilBeverageIndexers?$skip=20"
}
```

</details>

<details>
<summary>createBrazilBeverageIndexers</summary>

Creates a new BrazilBeverageIndexer entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BrazilBeverageIndexer</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BrazilBeverageIndexer|error`

**Sample code:**

```ballerina
BrazilBeverageIndexer result = check client->createBrazilBeverageIndexers(payload);
```

**Sample response:**

```json
{
  "BeverageID": 1,
  "BeverageTableCode": "01",
  "BeverageGroupCode": "02",
  "BeverageCommercialBrandCode": 100
}
```

</details>

<details>
<summary>getBrazilBeverageIndexers</summary>

Retrieves a single BrazilBeverageIndexer entity identified by its `BeverageID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `beverageID` | <code>int:Signed32</code> | Yes | Key property 'BeverageID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBrazilBeverageIndexersQueries</code> | No | Queries to be sent with the request |

**Returns:** `BrazilBeverageIndexer|error`

**Sample code:**

```ballerina
BrazilBeverageIndexer result = check client->getBrazilBeverageIndexers(1);
```

**Sample response:**

```json
{
  "BeverageID": 1,
  "BeverageTableCode": "01",
  "BeverageGroupCode": "02",
  "BeverageCommercialBrandCode": 100
}
```

</details>

<details>
<summary>deleteBrazilBeverageIndexers</summary>

Deletes the BrazilBeverageIndexer entity identified by its `BeverageID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `beverageID` | <code>int:Signed32</code> | Yes | Key property 'BeverageID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteBrazilBeverageIndexers(1);
```

</details>

<details>
<summary>updateBrazilBeverageIndexers</summary>

Partially updates a BrazilBeverageIndexer entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `beverageID` | <code>int:Signed32</code> | Yes | Key property 'BeverageID' (Edm.Int32) |
| `payload` | <code>BrazilBeverageIndexer</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateBrazilBeverageIndexers(1, payload);
```

</details>

<details>
<summary>brazilBeverageIndexersServiceGetList</summary>

Invokes the BrazilBeverageIndexersService_GetList unbound function to retrieve a compact list of beverage indexers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_1|error`

**Sample code:**

```ballerina
inline_response_200_1 result = check client->brazilBeverageIndexersServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BrazilBeverageIndexersService_GetList",
  "value": [
    {
      "BeverageID": 1
    }
  ]
}
```

</details>

#### BrazilStringIndexers

<details>
<summary>listBrazilStringIndexers</summary>

Queries the BrazilStringIndexers collection, returning a page of string indexer entities used for Brazilian tax localization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBrazilStringIndexersHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBrazilStringIndexersQueries</code> | No | Queries to be sent with the request |

**Returns:** `BrazilStringIndexersCollectionResponse|error`

**Sample code:**

```ballerina
BrazilStringIndexersCollectionResponse result = check client->listBrazilStringIndexers();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BrazilStringIndexers",
  "value": [
    {
      "IndexerType": "bsitBeverageTable",
      "Description": "Beverage table indexer",
      "ID": 1,
      "Code": "01"
    }
  ],
  "odata.nextLink": "BrazilStringIndexers?$skip=20"
}
```

</details>

<details>
<summary>createBrazilStringIndexers</summary>

Creates a new BrazilStringIndexer entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BrazilStringIndexer</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BrazilStringIndexer|error`

**Sample code:**

```ballerina
BrazilStringIndexer result = check client->createBrazilStringIndexers(payload);
```

**Sample response:**

```json
{
  "IndexerType": "bsitBeverageTable",
  "Description": "Beverage table indexer",
  "ID": 1,
  "Code": "01"
}
```

</details>

<details>
<summary>getBrazilStringIndexers</summary>

Retrieves a single BrazilStringIndexer entity identified by its `ID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBrazilStringIndexersQueries</code> | No | Queries to be sent with the request |

**Returns:** `BrazilStringIndexer|error`

**Sample code:**

```ballerina
BrazilStringIndexer result = check client->getBrazilStringIndexers(1);
```

**Sample response:**

```json
{
  "IndexerType": "bsitBeverageTable",
  "Description": "Beverage table indexer",
  "ID": 1,
  "Code": "01"
}
```

</details>

<details>
<summary>deleteBrazilStringIndexers</summary>

Deletes the BrazilStringIndexer entity identified by its `ID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteBrazilStringIndexers(1);
```

</details>

<details>
<summary>updateBrazilStringIndexers</summary>

Partially updates a BrazilStringIndexer entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `payload` | <code>BrazilStringIndexer</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateBrazilStringIndexers(1, payload);
```

</details>

<details>
<summary>brazilStringIndexersGetIndexerTypeList</summary>

Invokes the bound action 'GetIndexerTypeList' on a BrazilStringIndexer to retrieve its list of valid indexer type values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_5|error`

**Sample code:**

```ballerina
inline_response_200_5 result = check client->brazilStringIndexersGetIndexerTypeList(1);
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BrazilStringIndexers/GetIndexerTypeList",
  "value": [
    {
      "ID": 1
    }
  ]
}
```

</details>

#### DNFCodeSetup

<details>
<summary>listDNFCodeSetup</summary>

Queries the DNFCodeSetup collection, returning a page of Brazilian DNF (Documento de Natureza Fiscal) code setup entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDNFCodeSetupHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListDNFCodeSetupQueries</code> | No | Queries to be sent with the request |

**Returns:** `DNFCodeSetupCollectionResponse|error`

**Sample code:**

```ballerina
DNFCodeSetupCollectionResponse result = check client->listDNFCodeSetup();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#DNFCodeSetup",
  "value": [
    {
      "NCMCode": 1001,
      "UoM": "KG",
      "DNFCode": "01",
      "Factor": 1.0,
      "AbsEntry": 1
    }
  ],
  "odata.nextLink": "DNFCodeSetup?$skip=20"
}
```

</details>

<details>
<summary>createDNFCodeSetup</summary>

Creates a new DNFCodeSetup entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DNFCodeSetup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DNFCodeSetup|error`

**Sample code:**

```ballerina
DNFCodeSetup result = check client->createDNFCodeSetup(payload);
```

**Sample response:**

```json
{
  "NCMCode": 1001,
  "UoM": "KG",
  "DNFCode": "01",
  "Factor": 1.0,
  "AbsEntry": 1
}
```

</details>

<details>
<summary>getDNFCodeSetup</summary>

Retrieves a single DNFCodeSetup entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDNFCodeSetupQueries</code> | No | Queries to be sent with the request |

**Returns:** `DNFCodeSetup|error`

**Sample code:**

```ballerina
DNFCodeSetup result = check client->getDNFCodeSetup(1);
```

**Sample response:**

```json
{
  "NCMCode": 1001,
  "UoM": "KG",
  "DNFCode": "01",
  "Factor": 1.0,
  "AbsEntry": 1
}
```

</details>

<details>
<summary>deleteDNFCodeSetup</summary>

Deletes the DNFCodeSetup entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteDNFCodeSetup(1);
```

</details>

<details>
<summary>updateDNFCodeSetup</summary>

Partially updates a DNFCodeSetup entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>DNFCodeSetup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateDNFCodeSetup(1, payload);
```

</details>

<details>
<summary>dNFCodeSetupServiceGetDNFCodeSetupList</summary>

Invokes the DNFCodeSetupService_GetDNFCodeSetupList unbound function to retrieve a compact list of DNF code setups.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_9|error`

**Sample code:**

```ballerina
inline_response_200_9 result = check client->dNFCodeSetupServiceGetDNFCodeSetupList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#DNFCodeSetupService_GetDNFCodeSetupList",
  "value": [
    {
      "NCMCode": 1001,
      "DNFCode": "01",
      "AbsEntry": 1
    }
  ]
}
```

</details>

#### MaterialGroups

<details>
<summary>listMaterialGroups</summary>

Queries the MaterialGroups collection, returning a page of material group entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListMaterialGroupsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListMaterialGroupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `MaterialGroupsCollectionResponse|error`

**Sample code:**

```ballerina
MaterialGroupsCollectionResponse result = check client->listMaterialGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#MaterialGroups",
  "value": [
    {
      "Description": "Raw materials",
      "AbsEntry": 1,
      "MaterialGroupCode": "RM01"
    }
  ],
  "odata.nextLink": "MaterialGroups?$skip=20"
}
```

</details>

<details>
<summary>createMaterialGroups</summary>

Creates a new MaterialGroup entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>MaterialGroup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `MaterialGroup|error`

**Sample code:**

```ballerina
MaterialGroup result = check client->createMaterialGroups(payload);
```

**Sample response:**

```json
{
  "Description": "Raw materials",
  "AbsEntry": 1,
  "MaterialGroupCode": "RM01"
}
```

</details>

<details>
<summary>getMaterialGroups</summary>

Retrieves a single MaterialGroup entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetMaterialGroupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `MaterialGroup|error`

**Sample code:**

```ballerina
MaterialGroup result = check client->getMaterialGroups(1);
```

**Sample response:**

```json
{
  "Description": "Raw materials",
  "AbsEntry": 1,
  "MaterialGroupCode": "RM01"
}
```

</details>

<details>
<summary>deleteMaterialGroups</summary>

Deletes the MaterialGroup entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteMaterialGroups(1);
```

</details>

<details>
<summary>updateMaterialGroups</summary>

Partially updates a MaterialGroup entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>MaterialGroup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateMaterialGroups(1, payload);
```

</details>

<details>
<summary>materialGroupsServiceGetMaterialGroupList</summary>

Invokes the MaterialGroupsService_GetMaterialGroupList unbound function to retrieve a compact list of material groups.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_37|error`

**Sample code:**

```ballerina
inline_response_200_37 result = check client->materialGroupsServiceGetMaterialGroupList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#MaterialGroupsService_GetMaterialGroupList",
  "value": [
    {
      "AbsEntry": 1,
      "MaterialGroupCode": "RM01"
    }
  ]
}
```

</details>

#### CUPCodes

<details>
<summary>cUPCodeServiceGetList</summary>

Invokes the CUPCodeService_GetList unbound function to retrieve a compact list of CUP codes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_7|error`

**Sample code:**

```ballerina
inline_response_200_7 result = check client->cUPCodeServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#CUPCodeService_GetList",
  "value": [
    {
      "AbsEntry": 1
    }
  ]
}
```

</details>

<details>
<summary>listCUPCodes</summary>

Queries the CUPCodes collection, returning a page of CUP code entities and their linked documents.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCUPCodesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCUPCodesQueries</code> | No | Queries to be sent with the request |

**Returns:** `CUPCodesCollectionResponse|error`

**Sample code:**

```ballerina
CUPCodesCollectionResponse result = check client->listCUPCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#CUPCodes",
  "value": [
    {
      "AbsEntry": 1,
      "Invoices": [
        {"DocEntry": 100}
      ],
      "Orders": [
        {"DocEntry": 200}
      ]
    }
  ],
  "odata.nextLink": "CUPCodes?$skip=20"
}
```

</details>

<details>
<summary>createCUPCodes</summary>

Creates a new CUPCode entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CUPCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CUPCode|error`

**Sample code:**

```ballerina
CUPCode result = check client->createCUPCodes(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Invoices": [
    {"DocEntry": 100}
  ],
  "Orders": [
    {"DocEntry": 200}
  ]
}
```

</details>

<details>
<summary>getCUPCodes</summary>

Retrieves a single CUPCode entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCUPCodesQueries</code> | No | Queries to be sent with the request |

**Returns:** `CUPCode|error`

**Sample code:**

```ballerina
CUPCode result = check client->getCUPCodes(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Invoices": [
    {"DocEntry": 100}
  ],
  "Orders": [
    {"DocEntry": 200}
  ]
}
```

</details>

<details>
<summary>deleteCUPCodes</summary>

Deletes the CUPCode entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteCUPCodes(1);
```

</details>

<details>
<summary>updateCUPCodes</summary>

Partially updates a CUPCode entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>CUPCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateCUPCodes(1, payload);
```

</details>

#### ExportDeterminations

<details>
<summary>exportDeterminationServiceGetDeterminations</summary>

Invokes the ExportDeterminationService_GetDeterminations unbound function to look up export determinations for a given electronic document protocol code.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ExportDeterminationService_GetDeterminations_body</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_24|error`

**Sample code:**

```ballerina
inline_response_200_24 result = check client->exportDeterminationServiceGetDeterminations(payload);
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ExportDeterminationService_GetDeterminations",
  "value": [
    {
      "AbsEntry": 1,
      "Code": "edpcs_NFe",
      "Priority": 1,
      "BusinessPartner": "C0001",
      "Country": "BR",
      "DocumentType": "Invoice",
      "ExportFormat": 1
    }
  ]
}
```

</details>

<details>
<summary>listExportDeterminations</summary>

Queries the ExportDeterminations collection, returning a page of export determination entities that map documents to electronic file formats.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListExportDeterminationsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListExportDeterminationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `ExportDeterminationsCollectionResponse|error`

**Sample code:**

```ballerina
ExportDeterminationsCollectionResponse result = check client->listExportDeterminations();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ExportDeterminations",
  "value": [
    {
      "AbsEntry": 1,
      "Code": "edpcs_NFe",
      "Priority": 1,
      "BusinessPartner": "C0001",
      "Country": "BR",
      "Series": 1,
      "DocumentType": "Invoice",
      "ExportFormat": 1
    }
  ],
  "odata.nextLink": "ExportDeterminations?$skip=20"
}
```

</details>

<details>
<summary>createExportDeterminations</summary>

Creates a new ExportDetermination entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ExportDetermination</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ExportDetermination|error`

**Sample code:**

```ballerina
ExportDetermination result = check client->createExportDeterminations(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "edpcs_NFe",
  "Priority": 1,
  "BusinessPartner": "C0001",
  "Country": "BR",
  "Series": 1,
  "DocumentType": "Invoice",
  "ExportFormat": 1
}
```

</details>

<details>
<summary>getExportDeterminations</summary>

Retrieves a single ExportDetermination entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetExportDeterminationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `ExportDetermination|error`

**Sample code:**

```ballerina
ExportDetermination result = check client->getExportDeterminations(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "edpcs_NFe",
  "Priority": 1,
  "BusinessPartner": "C0001",
  "Country": "BR",
  "Series": 1,
  "DocumentType": "Invoice",
  "ExportFormat": 1
}
```

</details>

<details>
<summary>deleteExportDeterminations</summary>

Deletes the ExportDetermination entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteExportDeterminations(1);
```

</details>

<details>
<summary>updateExportDeterminations</summary>

Partially updates an ExportDetermination entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>ExportDetermination</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateExportDeterminations(1, payload);
```

</details>

#### NotaFiscalCST

<details>
<summary>listNotaFiscalCST</summary>

Queries the NotaFiscalCST collection, returning a page of Brazilian Nota Fiscal CST (tax situation code) entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListNotaFiscalCSTHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListNotaFiscalCSTQueries</code> | No | Queries to be sent with the request |

**Returns:** `NotaFiscalCSTCollectionResponse|error`

**Sample code:**

```ballerina
NotaFiscalCSTCollectionResponse result = check client->listNotaFiscalCST();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#NotaFiscalCST",
  "value": [
    {
      "ID": 1,
      "Code": "00",
      "Situation": "Tributada integralmente",
      "TaxCategory": 1,
      "CSTCodeOutgoing": "00",
      "DescriptionOutgoing": "Tributada integralmente"
    }
  ],
  "odata.nextLink": "NotaFiscalCST?$skip=20"
}
```

</details>

<details>
<summary>createNotaFiscalCST</summary>

Creates a new NotaFiscalCST entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>NotaFiscalCST</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `NotaFiscalCST|error`

**Sample code:**

```ballerina
NotaFiscalCST result = check client->createNotaFiscalCST(payload);
```

**Sample response:**

```json
{
  "ID": 1,
  "Code": "00",
  "Situation": "Tributada integralmente",
  "TaxCategory": 1,
  "CSTCodeOutgoing": "00",
  "DescriptionOutgoing": "Tributada integralmente"
}
```

</details>

<details>
<summary>getNotaFiscalCST</summary>

Retrieves a single NotaFiscalCST entity identified by its `ID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetNotaFiscalCSTQueries</code> | No | Queries to be sent with the request |

**Returns:** `NotaFiscalCST|error`

**Sample code:**

```ballerina
NotaFiscalCST result = check client->getNotaFiscalCST(1);
```

**Sample response:**

```json
{
  "ID": 1,
  "Code": "00",
  "Situation": "Tributada integralmente",
  "TaxCategory": 1,
  "CSTCodeOutgoing": "00",
  "DescriptionOutgoing": "Tributada integralmente"
}
```

</details>

<details>
<summary>deleteNotaFiscalCST</summary>

Deletes the NotaFiscalCST entity identified by its `ID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteNotaFiscalCST(1);
```

</details>

<details>
<summary>updateNotaFiscalCST</summary>

Partially updates a NotaFiscalCST entity using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `payload` | <code>NotaFiscalCST</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateNotaFiscalCST(1, payload);
```

</details>

#### SelfInvoices

<details>
<summary>selfInvoiceServiceApproveAndAdd</summary>

Approves and adds the self-invoice document supplied in the payload in a single call to the SelfInvoiceService_ApproveAndAdd function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SelfInvoiceService_ApproveAndAdd_body</code> | Yes | Request payload containing the `Document` to approve and add |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->selfInvoiceServiceApproveAndAdd(payload);
```

</details>

<details>
<summary>selfInvoiceServiceApproveAndUpdate</summary>

Approves and updates the self-invoice document supplied in the payload in a single call to the SelfInvoiceService_ApproveAndUpdate function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SelfInvoiceService_ApproveAndUpdate_body</code> | Yes | Request payload containing the `Document` to approve and update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->selfInvoiceServiceApproveAndUpdate(payload);
```

</details>

<details>
<summary>selfInvoiceServiceCloseByDate</summary>

Closes self-invoice documents up to a specified date using the closing parameters supplied in the payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SelfInvoiceService_CloseByDate_body</code> | Yes | Request payload containing the `DocumentCloseParams` (DocEntry, SpecifiedClosingDate, ClosingOption) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->selfInvoiceServiceCloseByDate(payload);
```

</details>

<details>
<summary>selfInvoiceServiceExportEWayBill</summary>

Exports the e-way bill for the self-invoice document supplied in the payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SelfInvoiceService_ExportEWayBill_body</code> | Yes | Request payload containing the `Document` to export the e-way bill for |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->selfInvoiceServiceExportEWayBill(payload);
```

</details>

<details>
<summary>selfInvoiceServiceGetApprovalTemplates</summary>

Retrieves the approval templates applicable to the self-invoice document supplied in the payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SelfInvoiceService_GetApprovalTemplates_body</code> | Yes | Request payload containing the `Document` to evaluate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->selfInvoiceServiceGetApprovalTemplates(payload);
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "DocNum": 1001,
  "DocType": "dDocument_Items",
  "CardCode": "C0001",
  "CardName": "Example Vendor",
  "DocDate": "2026-07-01",
  "DocTotal": 500.00
}
```

</details>

<details>
<summary>selfInvoiceServiceHandleApprovalRequest</summary>

Handles a pending approval request for a self-invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->selfInvoiceServiceHandleApprovalRequest();
```

</details>

<details>
<summary>selfInvoiceServiceInitData</summary>

Initializes and returns default data for a new self-invoice document.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->selfInvoiceServiceInitData();
```

**Sample response:**

```json
{
  "DocEntry": 0,
  "DocNum": 0,
  "DocType": "dDocument_Items",
  "CardCode": "",
  "DocDate": "2026-07-14",
  "DocTotal": 0
}
```

</details>

<details>
<summary>listSelfInvoices</summary>

Queries the SelfInvoices collection, returning a page of `Document` entities with optional OData filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListSelfInvoicesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSelfInvoicesQueries</code> | No | Queries to be sent with the request |

**Returns:** `SelfInvoicesCollectionResponse|error`

**Sample code:**

```ballerina
SelfInvoicesCollectionResponse result = check client->listSelfInvoices();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SelfInvoices",
  "value": [
    {
      "DocEntry": 1,
      "DocNum": 1001,
      "DocType": "dDocument_Items",
      "CardCode": "C0001",
      "CardName": "Example Vendor",
      "DocDate": "2026-07-01",
      "DocTotal": 500.00
    }
  ],
  "odata.nextLink": "SelfInvoices?$skip=20"
}
```

</details>

<details>
<summary>createSelfInvoices</summary>

Creates a new SelfInvoices document (a `Document` record) from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Document</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->createSelfInvoices(payload);
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "DocNum": 1001,
  "DocType": "dDocument_Items",
  "CardCode": "C0001",
  "CardName": "Example Vendor",
  "DocDate": "2026-07-01",
  "DocTotal": 500.00
}
```

</details>

<details>
<summary>getSelfInvoices</summary>

Retrieves a single SelfInvoices `Document` identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSelfInvoicesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->getSelfInvoices(1);
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "DocNum": 1001,
  "DocType": "dDocument_Items",
  "CardCode": "C0001",
  "CardName": "Example Vendor",
  "DocDate": "2026-07-01",
  "DocTotal": 500.00
}
```

</details>

<details>
<summary>deleteSelfInvoices</summary>

Deletes the SelfInvoices `Document` identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteSelfInvoices(1);
```

</details>

<details>
<summary>updateSelfInvoices</summary>

Partially updates (PATCH/MERGE semantics) the SelfInvoices `Document` identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>Document</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateSelfInvoices(1, payload);
```

</details>

<details>
<summary>selfInvoicesCancel</summary>

Invokes the bound `Cancel` action (binding type `Document`) on the SelfInvoices document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->selfInvoicesCancel(1);
```

</details>

<details>
<summary>selfInvoicesClose</summary>

Invokes the bound `Close` action (binding type `Document`) on the SelfInvoices document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->selfInvoicesClose(1);
```

</details>

<details>
<summary>selfInvoicesCreateCancellationDocument</summary>

Invokes the bound `CreateCancellationDocument` action (binding type `Document`), creating and returning a cancellation document for the SelfInvoices document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Document|error`

**Sample code:**

```ballerina
Document result = check client->selfInvoicesCreateCancellationDocument(1);
```

**Sample response:**

```json
{
  "DocEntry": 2,
  "DocNum": 1002,
  "DocType": "dDocument_Items",
  "CardCode": "C0001",
  "CardName": "Example Vendor",
  "DocDate": "2026-07-14",
  "DocTotal": -500.00
}
```

</details>

<details>
<summary>selfInvoicesReopen</summary>

Invokes the bound `Reopen` action (binding type `Document`) on the SelfInvoices document identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->selfInvoicesReopen(1);
```

</details>

#### ServiceGroups

<details>
<summary>listServiceGroups</summary>

Queries the ServiceGroups collection, returning a page of `ServiceGroup` entities with optional OData filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListServiceGroupsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListServiceGroupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `ServiceGroupsCollectionResponse|error`

**Sample code:**

```ballerina
ServiceGroupsCollectionResponse result = check client->listServiceGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ServiceGroups",
  "value": [
    {
      "Description": "Consulting Services",
      "ServiceGroupCode": "SG001",
      "AbsEntry": 1
    }
  ],
  "odata.nextLink": "ServiceGroups?$skip=20"
}
```

</details>

<details>
<summary>createServiceGroups</summary>

Creates a new `ServiceGroup` from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ServiceGroup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ServiceGroup|error`

**Sample code:**

```ballerina
ServiceGroup result = check client->createServiceGroups(payload);
```

**Sample response:**

```json
{
  "Description": "Consulting Services",
  "ServiceGroupCode": "SG001",
  "AbsEntry": 1
}
```

</details>

<details>
<summary>getServiceGroups</summary>

Retrieves a single `ServiceGroup` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetServiceGroupsQueries</code> | No | Queries to be sent with the request |

**Returns:** `ServiceGroup|error`

**Sample code:**

```ballerina
ServiceGroup result = check client->getServiceGroups(1);
```

**Sample response:**

```json
{
  "Description": "Consulting Services",
  "ServiceGroupCode": "SG001",
  "AbsEntry": 1
}
```

</details>

<details>
<summary>deleteServiceGroups</summary>

Deletes the `ServiceGroup` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteServiceGroups(1);
```

</details>

<details>
<summary>updateServiceGroups</summary>

Partially updates (PATCH/MERGE semantics) the `ServiceGroup` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>ServiceGroup</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateServiceGroups(1, payload);
```

</details>

<details>
<summary>serviceGroupsServiceGetServiceGroupList</summary>

Retrieves the list of service groups (AbsEntry/ServiceGroupCode pairs) via the ServiceGroupsService_GetServiceGroupList function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_43|error`

**Sample code:**

```ballerina
inline_response_200_43 result = check client->serviceGroupsServiceGetServiceGroupList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ServiceGroupsService_GetServiceGroupList",
  "value": [
    {
      "ServiceGroupCode": "SG001",
      "AbsEntry": 1
    }
  ]
}
```

</details>

#### ISDDocuments

<details>
<summary>listISDDocuments</summary>

Queries the ISDDocuments collection, returning a page of `ISDDocument` entities with optional OData filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListISDDocumentsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListISDDocumentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `ISDDocumentsCollectionResponse|error`

**Sample code:**

```ballerina
ISDDocumentsCollectionResponse result = check client->listISDDocuments();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ISDDocuments",
  "value": [
    {
      "DocumentEntry": 1,
      "DocumentNumber": 101,
      "SourceLocationCode": 1,
      "SourceLocationName": "Head Office",
      "Series": 1,
      "PostingDate": "2026-07-01",
      "DocDate": "2026-07-01",
      "DocumentStatus": "isdds_Open",
      "Revised": "tNO"
    }
  ],
  "odata.nextLink": "ISDDocuments?$skip=20"
}
```

</details>

<details>
<summary>createISDDocuments</summary>

Creates a new `ISDDocument` from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ISDDocument</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ISDDocument|error`

**Sample code:**

```ballerina
ISDDocument result = check client->createISDDocuments(payload);
```

**Sample response:**

```json
{
  "DocumentEntry": 1,
  "DocumentNumber": 101,
  "SourceLocationCode": 1,
  "SourceLocationName": "Head Office",
  "Series": 1,
  "PostingDate": "2026-07-01",
  "DocDate": "2026-07-01",
  "DocumentStatus": "isdds_Open"
}
```

</details>

<details>
<summary>getISDDocuments</summary>

Retrieves a single `ISDDocument` identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetISDDocumentsQueries</code> | No | Queries to be sent with the request |

**Returns:** `ISDDocument|error`

**Sample code:**

```ballerina
ISDDocument result = check client->getISDDocuments(1);
```

**Sample response:**

```json
{
  "DocumentEntry": 1,
  "DocumentNumber": 101,
  "SourceLocationCode": 1,
  "SourceLocationName": "Head Office",
  "Series": 1,
  "PostingDate": "2026-07-01",
  "DocDate": "2026-07-01",
  "DocumentStatus": "isdds_Open"
}
```

</details>

<details>
<summary>deleteISDDocuments</summary>

Deletes the `ISDDocument` identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteISDDocuments(1);
```

</details>

<details>
<summary>updateISDDocuments</summary>

Partially updates (PATCH/MERGE semantics) the `ISDDocument` identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `payload` | <code>ISDDocument</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateISDDocuments(1, payload);
```

</details>

<details>
<summary>iSDDocumentsServiceCancel</summary>

Cancels an ISD document identified by the `DocumentEntry`/`DocumentNumber` pair supplied in the payload's `ISDParams`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ISDDocumentsService_Cancel_body</code> | Yes | Request payload containing the `ISDParams` (DocumentEntry, DocumentNumber) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->iSDDocumentsServiceCancel(payload);
```

</details>

<details>
<summary>iSDDocumentsServiceGetList</summary>

Retrieves the list of ISD document identifiers (DocumentEntry/DocumentNumber) via the ISDDocumentsService_GetList function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_28|error`

**Sample code:**

```ballerina
inline_response_200_28 result = check client->iSDDocumentsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ISDDocumentsService_GetList",
  "value": [
    {
      "DocumentEntry": 1,
      "DocumentNumber": 101
    }
  ]
}
```

</details>

#### BEMReplicationPeriods

<details>
<summary>bEMReplicationPeriodServiceGetList</summary>

Retrieves the list of BEM replication period identifiers via the BEMReplicationPeriodService_GetList function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200|error`

**Sample code:**

```ballerina
inline_response_200 result = check client->bEMReplicationPeriodServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#BEMReplicationPeriodService_GetList",
  "value": [
    {
      "AbsEntry": 1
    }
  ]
}
```

</details>

<details>
<summary>listBEMReplicationPeriods</summary>

Queries the BEMReplicationPeriods collection, returning a page of `BEMReplicationPeriod` entities with optional OData filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBEMReplicationPeriodsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBEMReplicationPeriodsQueries</code> | No | Queries to be sent with the request |

**Returns:** `BEMReplicationPeriodsCollectionResponse|error`

**Sample code:**

```ballerina
BEMReplicationPeriodsCollectionResponse result = check client->listBEMReplicationPeriods();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#BEMReplicationPeriods",
  "value": [
    {
      "StartDate": "2026-07-01",
      "Status": "bemStatus_Complete",
      "UpdateDate": "2026-07-02",
      "ScopeName": "FinancialData",
      "ScopeKey": "1",
      "LastRepId": "abc123",
      "RepMessage": "Replication completed",
      "AbsEntry": 1,
      "Periodic": "bemPeriodic_Daily"
    }
  ],
  "odata.nextLink": "BEMReplicationPeriods?$skip=20"
}
```

</details>

<details>
<summary>createBEMReplicationPeriods</summary>

Creates a new `BEMReplicationPeriod` from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BEMReplicationPeriod</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BEMReplicationPeriod|error`

**Sample code:**

```ballerina
BEMReplicationPeriod result = check client->createBEMReplicationPeriods(payload);
```

**Sample response:**

```json
{
  "StartDate": "2026-07-01",
  "Status": "bemStatus_New",
  "ScopeName": "FinancialData",
  "ScopeKey": "1",
  "AbsEntry": 1,
  "Periodic": "bemPeriodic_Daily"
}
```

</details>

<details>
<summary>getBEMReplicationPeriods</summary>

Retrieves a single `BEMReplicationPeriod` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBEMReplicationPeriodsQueries</code> | No | Queries to be sent with the request |

**Returns:** `BEMReplicationPeriod|error`

**Sample code:**

```ballerina
BEMReplicationPeriod result = check client->getBEMReplicationPeriods(1);
```

**Sample response:**

```json
{
  "StartDate": "2026-07-01",
  "Status": "bemStatus_Complete",
  "ScopeName": "FinancialData",
  "ScopeKey": "1",
  "AbsEntry": 1,
  "Periodic": "bemPeriodic_Daily"
}
```

</details>

<details>
<summary>deleteBEMReplicationPeriods</summary>

Deletes the `BEMReplicationPeriod` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteBEMReplicationPeriods(1);
```

</details>

<details>
<summary>updateBEMReplicationPeriods</summary>

Partially updates (PATCH/MERGE semantics) the `BEMReplicationPeriod` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>BEMReplicationPeriod</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateBEMReplicationPeriods(1, payload);
```

</details>

#### BrazilMultiIndexers

<details>
<summary>listBrazilMultiIndexers</summary>

Queries the BrazilMultiIndexers collection, returning a page of `BrazilMultiIndexer` entities with optional OData filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBrazilMultiIndexersHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBrazilMultiIndexersQueries</code> | No | Queries to be sent with the request |

**Returns:** `BrazilMultiIndexersCollectionResponse|error`

**Sample code:**

```ballerina
BrazilMultiIndexersCollectionResponse result = check client->listBrazilMultiIndexers();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#BrazilMultiIndexers",
  "value": [
    {
      "SecondRefIndexerCode": "IDX2",
      "IndexerType": "bmit_Percentage",
      "FirstRefIndexerCode": "IDX1",
      "Description": "Multi indexer example",
      "ThirdRefIndexerCode": "IDX3",
      "ID": 1,
      "Code": "MI001"
    }
  ],
  "odata.nextLink": "BrazilMultiIndexers?$skip=20"
}
```

</details>

<details>
<summary>createBrazilMultiIndexers</summary>

Creates a new `BrazilMultiIndexer` from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BrazilMultiIndexer</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BrazilMultiIndexer|error`

**Sample code:**

```ballerina
BrazilMultiIndexer result = check client->createBrazilMultiIndexers(payload);
```

**Sample response:**

```json
{
  "SecondRefIndexerCode": "IDX2",
  "IndexerType": "bmit_Percentage",
  "FirstRefIndexerCode": "IDX1",
  "Description": "Multi indexer example",
  "ID": 1,
  "Code": "MI001"
}
```

</details>

<details>
<summary>getBrazilMultiIndexers</summary>

Retrieves a single `BrazilMultiIndexer` identified by its `ID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBrazilMultiIndexersQueries</code> | No | Queries to be sent with the request |

**Returns:** `BrazilMultiIndexer|error`

**Sample code:**

```ballerina
BrazilMultiIndexer result = check client->getBrazilMultiIndexers(1);
```

**Sample response:**

```json
{
  "SecondRefIndexerCode": "IDX2",
  "IndexerType": "bmit_Percentage",
  "FirstRefIndexerCode": "IDX1",
  "Description": "Multi indexer example",
  "ID": 1,
  "Code": "MI001"
}
```

</details>

<details>
<summary>deleteBrazilMultiIndexers</summary>

Deletes the `BrazilMultiIndexer` identified by its `ID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteBrazilMultiIndexers(1);
```

</details>

<details>
<summary>updateBrazilMultiIndexers</summary>

Partially updates (PATCH/MERGE semantics) the `BrazilMultiIndexer` identified by its `ID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `payload` | <code>BrazilMultiIndexer</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateBrazilMultiIndexers(1, payload);
```

</details>

<details>
<summary>brazilMultiIndexersGetIndexerTypeList</summary>

Invokes the bound `GetIndexerTypeList` action (binding type `BrazilMultiIndexer`) on the BrazilMultiIndexer identified by its `ID` key, returning the applicable indexer types.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_3|error`

**Sample code:**

```ballerina
inline_response_200_3 result = check client->brazilMultiIndexersGetIndexerTypeList(1);
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#BrazilMultiIndexers_GetIndexerTypeList",
  "value": [
    {
      "ID": 1
    }
  ]
}
```

</details>

#### CIGCodes

<details>
<summary>cIGCodeServiceGetList</summary>

Retrieves the list of CIG code identifiers via the CIGCodeService_GetList function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_6|error`

**Sample code:**

```ballerina
inline_response_200_6 result = check client->cIGCodeServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#CIGCodeService_GetList",
  "value": [
    {
      "AbsEntry": 1
    }
  ]
}
```

</details>

<details>
<summary>listCIGCodes</summary>

Queries the CIGCodes collection, returning a page of `CIGCode` entities with optional OData filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCIGCodesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCIGCodesQueries</code> | No | Queries to be sent with the request |

**Returns:** `CIGCodesCollectionResponse|error`

**Sample code:**

```ballerina
CIGCodesCollectionResponse result = check client->listCIGCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#CIGCodes",
  "value": [
    {
      "AbsEntry": 1,
      "Orders": [],
      "Invoices": [],
      "CreditNotes": []
    }
  ],
  "odata.nextLink": "CIGCodes?$skip=20"
}
```

</details>

<details>
<summary>createCIGCodes</summary>

Creates a new `CIGCode` (a grouping of related purchase/sales documents) from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CIGCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CIGCode|error`

**Sample code:**

```ballerina
CIGCode result = check client->createCIGCodes(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Orders": [],
  "Invoices": [],
  "CreditNotes": []
}
```

</details>

<details>
<summary>getCIGCodes</summary>

Retrieves a single `CIGCode` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCIGCodesQueries</code> | No | Queries to be sent with the request |

**Returns:** `CIGCode|error`

**Sample code:**

```ballerina
CIGCode result = check client->getCIGCodes(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Orders": [],
  "Invoices": [],
  "CreditNotes": []
}
```

</details>

<details>
<summary>deleteCIGCodes</summary>

Deletes the `CIGCode` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteCIGCodes(1);
```

</details>

<details>
<summary>updateCIGCodes</summary>

Partially updates (PATCH/MERGE semantics) the `CIGCode` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>CIGCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateCIGCodes(1, payload);
```

</details>

#### IndiaHsn

<details>
<summary>listIndiaHsn</summary>

Queries the IndiaHsn collection, returning a page of `IndiaHsn` entities with optional OData filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListIndiaHsnHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListIndiaHsnQueries</code> | No | Queries to be sent with the request |

**Returns:** `IndiaHsnCollectionResponse|error`

**Sample code:**

```ballerina
IndiaHsnCollectionResponse result = check client->listIndiaHsn();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#IndiaHsn",
  "value": [
    {
      "Heading": "01",
      "Description": "Live animals",
      "Chapter": "1",
      "ChapterID": "01",
      "SubHeading": "0101",
      "AbsEntry": 1
    }
  ],
  "odata.nextLink": "IndiaHsn?$skip=20"
}
```

</details>

<details>
<summary>createIndiaHsn</summary>

Creates a new `IndiaHsn` (HSN classification code) from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>IndiaHsn</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `IndiaHsn|error`

**Sample code:**

```ballerina
IndiaHsn result = check client->createIndiaHsn(payload);
```

**Sample response:**

```json
{
  "Heading": "01",
  "Description": "Live animals",
  "Chapter": "1",
  "ChapterID": "01",
  "SubHeading": "0101",
  "AbsEntry": 1
}
```

</details>

<details>
<summary>getIndiaHsn</summary>

Retrieves a single `IndiaHsn` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetIndiaHsnQueries</code> | No | Queries to be sent with the request |

**Returns:** `IndiaHsn|error`

**Sample code:**

```ballerina
IndiaHsn result = check client->getIndiaHsn(1);
```

**Sample response:**

```json
{
  "Heading": "01",
  "Description": "Live animals",
  "Chapter": "1",
  "ChapterID": "01",
  "SubHeading": "0101",
  "AbsEntry": 1
}
```

</details>

<details>
<summary>deleteIndiaHsn</summary>

Deletes the `IndiaHsn` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteIndiaHsn(1);
```

</details>

<details>
<summary>updateIndiaHsn</summary>

Partially updates (PATCH/MERGE semantics) the `IndiaHsn` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>IndiaHsn</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateIndiaHsn(1, payload);
```

</details>

<details>
<summary>indiaHsnServiceGetList</summary>

Retrieves the list of India HSN code identifiers via the IndiaHsnService_GetList function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_34|error`

**Sample code:**

```ballerina
inline_response_200_34 result = check client->indiaHsnServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#IndiaHsnService_GetList",
  "value": [
    {
      "ChapterID": "01",
      "AbsEntry": 1
    }
  ]
}
```

</details>

#### NFModels

<details>
<summary>listNFModels</summary>

Queries the NFModels collection, returning a page of `NFModel` entities with optional OData filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListNFModelsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListNFModelsQueries</code> | No | Queries to be sent with the request |

**Returns:** `NFModelsCollectionResponse|error`

**Sample code:**

```ballerina
NFModelsCollectionResponse result = check client->listNFModels();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#NFModels",
  "value": [
    {
      "AbsEntry": "1",
      "NFMCode": "55",
      "NFMDescription": "NF-e Model 55",
      "Orders": [],
      "Invoices": []
    }
  ],
  "odata.nextLink": "NFModels?$skip=20"
}
```

</details>

<details>
<summary>createNFModels</summary>

Creates a new `NFModel` (Brazilian Nota Fiscal model, grouping related documents) from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>NFModel</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `NFModel|error`

**Sample code:**

```ballerina
NFModel result = check client->createNFModels(payload);
```

**Sample response:**

```json
{
  "AbsEntry": "1",
  "NFMCode": "55",
  "NFMDescription": "NF-e Model 55",
  "Orders": [],
  "Invoices": []
}
```

</details>

<details>
<summary>getNFModels</summary>

Retrieves a single `NFModel` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>string</code> | Yes | Key property 'AbsEntry' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetNFModelsQueries</code> | No | Queries to be sent with the request |

**Returns:** `NFModel|error`

**Sample code:**

```ballerina
NFModel result = check client->getNFModels("1");
```

**Sample response:**

```json
{
  "AbsEntry": "1",
  "NFMCode": "55",
  "NFMDescription": "NF-e Model 55",
  "Orders": [],
  "Invoices": []
}
```

</details>

<details>
<summary>deleteNFModels</summary>

Deletes the `NFModel` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>string</code> | Yes | Key property 'AbsEntry' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteNFModels("1");
```

</details>

<details>
<summary>updateNFModels</summary>

Partially updates (PATCH/MERGE semantics) the `NFModel` identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>string</code> | Yes | Key property 'AbsEntry' (Edm.String) |
| `payload` | <code>NFModel</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateNFModels("1", payload);
```

</details>

<details>
<summary>nFModelsServiceGetList</summary>

Retrieves the list of NF model identifiers via the NFModelsService_GetList function import.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_39|error`

**Sample code:**

```ballerina
inline_response_200_39 result = check client->nFModelsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#NFModelsService_GetList",
  "value": [
    {
      "NFMDescription": "NF-e Model 55",
      "NFMCode": "55",
      "NFMName": "Model 55"
    }
  ]
}
```

</details>

#### DatevRuns

<details>
<summary>listDatevRuns</summary>

Queries the DatevRuns collection, returning a page of `DatevRun` entities with optional OData filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDatevRunsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListDatevRunsQueries</code> | No | Queries to be sent with the request |

**Returns:** `DatevRunsCollectionResponse|error`

**Sample code:**

```ballerina
DatevRunsCollectionResponse result = check client->listDatevRuns();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#DatevRuns",
  "value": [
    {
      "RunId": 1,
      "Status": "Completed",
      "Description": "Monthly DATEV export",
      "ExportPath": "C:\\Datev\\Export",
      "StartDate": "2026-07-01",
      "EndDate": "2026-07-31"
    }
  ],
  "odata.nextLink": "DatevRuns?$skip=20"
}
```

</details>

<details>
<summary>createDatevRuns</summary>

Creates a new `DatevRun` (a DATEV export run configuration) from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DatevRun</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DatevRun|error`

**Sample code:**

```ballerina
DatevRun result = check client->createDatevRuns(payload);
```

**Sample response:**

```json
{
  "RunId": 1,
  "Status": "New",
  "Description": "Monthly DATEV export",
  "StartDate": "2026-07-01",
  "EndDate": "2026-07-31"
}
```

</details>

<details>
<summary>getDatevRuns</summary>

Retrieves a single `DatevRun` identified by its `RunId` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `runId` | <code>int:Signed32</code> | Yes | Key property 'RunId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDatevRunsQueries</code> | No | Queries to be sent with the request |

**Returns:** `DatevRun|error`

**Sample code:**

```ballerina
DatevRun result = check client->getDatevRuns(1);
```

**Sample response:**

```json
{
  "RunId": 1,
  "Status": "Completed",
  "Description": "Monthly DATEV export",
  "StartDate": "2026-07-01",
  "EndDate": "2026-07-31"
}
```

</details>

<details>
<summary>deleteDatevRuns</summary>

Deletes the `DatevRun` identified by its `RunId` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `runId` | <code>int:Signed32</code> | Yes | Key property 'RunId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteDatevRuns(1);
```

</details>

<details>
<summary>updateDatevRuns</summary>

Partially updates (PATCH/MERGE semantics) the `DatevRun` identified by its `RunId` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `runId` | <code>int:Signed32</code> | Yes | Key property 'RunId' (Edm.Int32) |
| `payload` | <code>DatevRun</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateDatevRuns(1, payload);
```

</details>

#### LegalData

<details>
<summary>listLegalData</summary>

Queries the LegalData collection, returning a page of `LegalData` entities with optional OData filtering, sorting, and paging.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListLegalDataHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLegalDataQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalDataCollectionResponse|error`

**Sample code:**

```ballerina
LegalDataCollectionResponse result = check client->listLegalData();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#LegalData",
  "value": [
    {
      "DocEntry": 1,
      "DocumentNumber": "FISC-0001",
      "FiscalNumber": "123456789",
      "PrinterType": "Bematech",
      "PrinterBrand": "Bematech",
      "PrinterModel": "MP-4200",
      "DateOfPrinting": "2026-07-01",
      "TimeOfPrinting": "10:15:00"
    }
  ],
  "odata.nextLink": "LegalData?$skip=20"
}
```

</details>

<details>
<summary>createLegalData</summary>

Creates a new `LegalData` (fiscal printer/legal document metadata) record from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LegalData</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `LegalData|error`

**Sample code:**

```ballerina
LegalData result = check client->createLegalData(payload);
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "DocumentNumber": "FISC-0001",
  "FiscalNumber": "123456789",
  "PrinterType": "Bematech",
  "PrinterBrand": "Bematech",
  "PrinterModel": "MP-4200"
}
```

</details>

<details>
<summary>getLegalData</summary>

Retrieves a single `LegalData` record identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLegalDataQueries</code> | No | Queries to be sent with the request |

**Returns:** `LegalData|error`

**Sample code:**

```ballerina
LegalData result = check client->getLegalData(1);
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "DocumentNumber": "FISC-0001",
  "FiscalNumber": "123456789",
  "PrinterType": "Bematech",
  "PrinterBrand": "Bematech",
  "PrinterModel": "MP-4200"
}
```

</details>

<details>
<summary>deleteLegalData</summary>

Deletes the `LegalData` record identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteLegalData(1);
```

</details>

<details>
<summary>updateLegalData</summary>

Partially updates (PATCH/MERGE semantics) the `LegalData` record identified by its `DocEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>LegalData</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateLegalData(1, payload);
```

</details>

#### EBooks

<details>
<summary>listEBooks</summary>

Queries the EBooks collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListEBooksHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListEBooksQueries</code> | No | Queries to be sent with the request |

**Returns:** `EBooksCollectionResponse|error`

**Sample code:**

```ballerina
EBooksCollectionResponse result = check client->listEBooks();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#EBooks",
  "value": [
    {
      "AbsEntry": 1,
      "Series": "10",
      "InvoiceType": "itSale",
      "IssueDate": "2026-07-01",
      "TotalGrossValue": 1500.00,
      "Currency": "USD"
    }
  ],
  "odata.nextLink": "EBooks?$skip=20"
}
```

</details>

<details>
<summary>createEBooks</summary>

Creates a new EBooks entity from the supplied payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>EBooks</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `EBooks|error`

**Sample code:**

```ballerina
EBooks result = check client->createEBooks(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Series": "10",
  "InvoiceType": "itSale",
  "IssueDate": "2026-07-01",
  "TotalGrossValue": 1500.00,
  "Currency": "USD"
}
```

</details>

<details>
<summary>getEBooks</summary>

Retrieves a single EBooks entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetEBooksQueries</code> | No | Queries to be sent with the request |

**Returns:** `EBooks|error`

**Sample code:**

```ballerina
EBooks result = check client->getEBooks(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Series": "10",
  "InvoiceType": "itSale",
  "IssueDate": "2026-07-01",
  "TotalGrossValue": 1500.00,
  "Currency": "USD"
}
```

</details>

<details>
<summary>deleteEBooks</summary>

Deletes an EBooks entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteEBooks(1);
```

</details>

<details>
<summary>updateEBooks</summary>

Partially updates an EBooks entity identified by its `AbsEntry` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>EBooks</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateEBooks(1, payload);
```

</details>

<details>
<summary>eBooksGetByDocKey</summary>

Invokes the bound action `GetByDocKey` on an EBooks entity to look it up by its document key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_10|error`

**Sample code:**

```ballerina
inline_response_200_10 result = check client->eBooksGetByDocKey(1);
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#EBooks",
  "value": [
    {
      "LinkedDocType": 13,
      "LinkedDocEntry": 45,
      "MARK": "M-001"
    }
  ]
}
```

</details>

<details>
<summary>eBooksGetByMark</summary>

Invokes the bound action `GetByMark` on an EBooks entity to look it up by its MARK value.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `EBooks|error`

**Sample code:**

```ballerina
EBooks result = check client->eBooksGetByMark(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Series": "10",
  "InvoiceType": "itSale",
  "IssueDate": "2026-07-01",
  "TotalGrossValue": 1500.00,
  "Currency": "USD"
}
```

</details>

#### ISDRecipientInvoices

<details>
<summary>listISDRecipientInvoices</summary>

Queries the ISDRecipientInvoices collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListISDRecipientInvoicesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListISDRecipientInvoicesQueries</code> | No | Queries to be sent with the request |

**Returns:** `ISDRecipientInvoicesCollectionResponse|error`

**Sample code:**

```ballerina
ISDRecipientInvoicesCollectionResponse result = check client->listISDRecipientInvoices();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#ISDRecipientInvoices",
  "value": [
    {
      "DocumentEntry": 1,
      "DocumentNumber": 100,
      "Series": 1,
      "PostingDate": "2026-07-01",
      "DocDate": "2026-07-01",
      "DocumentStatus": "iddsOpen"
    }
  ],
  "odata.nextLink": "ISDRecipientInvoices?$skip=20"
}
```

</details>

<details>
<summary>createISDRecipientInvoices</summary>

Creates a new ISDRecipientInvoice entity from the supplied payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ISDRecipientInvoice</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ISDRecipientInvoice|error`

**Sample code:**

```ballerina
ISDRecipientInvoice result = check client->createISDRecipientInvoices(payload);
```

**Sample response:**

```json
{
  "DocumentEntry": 1,
  "DocumentNumber": 100,
  "Series": 1,
  "PostingDate": "2026-07-01",
  "DocDate": "2026-07-01",
  "DocumentStatus": "iddsOpen"
}
```

</details>

<details>
<summary>getISDRecipientInvoices</summary>

Retrieves a single ISDRecipientInvoice entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetISDRecipientInvoicesQueries</code> | No | Queries to be sent with the request |

**Returns:** `ISDRecipientInvoice|error`

**Sample code:**

```ballerina
ISDRecipientInvoice result = check client->getISDRecipientInvoices(1);
```

**Sample response:**

```json
{
  "DocumentEntry": 1,
  "DocumentNumber": 100,
  "Series": 1,
  "PostingDate": "2026-07-01",
  "DocDate": "2026-07-01",
  "DocumentStatus": "iddsOpen"
}
```

</details>

<details>
<summary>deleteISDRecipientInvoices</summary>

Deletes an ISDRecipientInvoice entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteISDRecipientInvoices(1);
```

</details>

<details>
<summary>updateISDRecipientInvoices</summary>

Partially updates an ISDRecipientInvoice entity identified by its `DocumentEntry` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `payload` | <code>ISDRecipientInvoice</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateISDRecipientInvoices(1, payload);
```

</details>

<details>
<summary>iSDRecipientInvoicesCancel</summary>

Invokes the bound action `Cancel` on an ISDRecipientInvoice entity to cancel it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->iSDRecipientInvoicesCancel(1);
```

</details>

<details>
<summary>iSDRecipientInvoicesServiceGetList</summary>

Calls the `ISDRecipientInvoicesService_GetList` function-import to retrieve a list of ISD recipient invoice params.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_31|error`

**Sample code:**

```ballerina
inline_response_200_31 result = check client->iSDRecipientInvoicesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#ISDRecipientInvoices",
  "value": [
    {
      "DocumentEntry": 1,
      "DocumentNumber": 100
    }
  ]
}
```

</details>

#### ISDCreditMemos

<details>
<summary>listISDCreditMemos</summary>

Queries the ISDCreditMemos collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListISDCreditMemosHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListISDCreditMemosQueries</code> | No | Queries to be sent with the request |

**Returns:** `ISDCreditMemosCollectionResponse|error`

**Sample code:**

```ballerina
ISDCreditMemosCollectionResponse result = check client->listISDCreditMemos();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#ISDCreditMemos",
  "value": [
    {
      "DocumentEntry": 1,
      "DocumentNumber": 200,
      "Series": 1,
      "PostingDate": "2026-07-01",
      "DocDate": "2026-07-01",
      "DocumentStatus": "iddsOpen"
    }
  ],
  "odata.nextLink": "ISDCreditMemos?$skip=20"
}
```

</details>

<details>
<summary>createISDCreditMemos</summary>

Creates a new ISDCreditMemo entity from the supplied payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ISDCreditMemo</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ISDCreditMemo|error`

**Sample code:**

```ballerina
ISDCreditMemo result = check client->createISDCreditMemos(payload);
```

**Sample response:**

```json
{
  "DocumentEntry": 1,
  "DocumentNumber": 200,
  "Series": 1,
  "PostingDate": "2026-07-01",
  "DocDate": "2026-07-01",
  "DocumentStatus": "iddsOpen"
}
```

</details>

<details>
<summary>getISDCreditMemos</summary>

Retrieves a single ISDCreditMemo entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetISDCreditMemosQueries</code> | No | Queries to be sent with the request |

**Returns:** `ISDCreditMemo|error`

**Sample code:**

```ballerina
ISDCreditMemo result = check client->getISDCreditMemos(1);
```

**Sample response:**

```json
{
  "DocumentEntry": 1,
  "DocumentNumber": 200,
  "Series": 1,
  "PostingDate": "2026-07-01",
  "DocDate": "2026-07-01",
  "DocumentStatus": "iddsOpen"
}
```

</details>

<details>
<summary>deleteISDCreditMemos</summary>

Deletes an ISDCreditMemo entity identified by its `DocumentEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteISDCreditMemos(1);
```

</details>

<details>
<summary>updateISDCreditMemos</summary>

Partially updates an ISDCreditMemo entity identified by its `DocumentEntry` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `payload` | <code>ISDCreditMemo</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateISDCreditMemos(1, payload);
```

</details>

<details>
<summary>iSDCreditMemosCancel</summary>

Invokes the bound action `Cancel` on an ISDCreditMemo entity to cancel it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `documentEntry` | <code>int:Signed32</code> | Yes | Key property 'DocumentEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->iSDCreditMemosCancel(1);
```

</details>

<details>
<summary>iSDCreditMemosServiceGetList</summary>

Calls the `ISDCreditMemosService_GetList` function-import to retrieve a list of ISD credit memo params.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_27|error`

**Sample code:**

```ballerina
inline_response_200_27 result = check client->iSDCreditMemosServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#ISDCreditMemos",
  "value": [
    {
      "DocumentEntry": 1,
      "DocumentNumber": 200
    }
  ]
}
```

</details>

#### TransportationDocument

<details>
<summary>listTransportationDocument</summary>

Queries the TransportationDocument collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListTransportationDocumentHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTransportationDocumentQueries</code> | No | Queries to be sent with the request |

**Returns:** `TransportationDocumentCollectionResponse|error`

**Sample code:**

```ballerina
TransportationDocumentCollectionResponse result = check client->listTransportationDocument();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#TransportationDocument",
  "value": [
    {
      "TranspDocNumber": 1,
      "TransportationNumber": "TR-001",
      "VehicleID": "V-100",
      "WarehouseCode": "WH01",
      "Weight": 1200.5,
      "Canceled": "tNO"
    }
  ],
  "odata.nextLink": "TransportationDocument?$skip=20"
}
```

</details>

<details>
<summary>createTransportationDocument</summary>

Creates a new TransportationDocumentData entity from the supplied payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TransportationDocumentData</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `TransportationDocumentData|error`

**Sample code:**

```ballerina
TransportationDocumentData result = check client->createTransportationDocument(payload);
```

**Sample response:**

```json
{
  "TranspDocNumber": 1,
  "TransportationNumber": "TR-001",
  "VehicleID": "V-100",
  "WarehouseCode": "WH01",
  "Weight": 1200.5,
  "Canceled": "tNO"
}
```

</details>

<details>
<summary>getTransportationDocument</summary>

Retrieves a single TransportationDocumentData entity identified by its `TranspDocNumber` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `transpDocNumber` | <code>int:Signed32</code> | Yes | Key property 'TranspDocNumber' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTransportationDocumentQueries</code> | No | Queries to be sent with the request |

**Returns:** `TransportationDocumentData|error`

**Sample code:**

```ballerina
TransportationDocumentData result = check client->getTransportationDocument(1);
```

**Sample response:**

```json
{
  "TranspDocNumber": 1,
  "TransportationNumber": "TR-001",
  "VehicleID": "V-100",
  "WarehouseCode": "WH01",
  "Weight": 1200.5,
  "Canceled": "tNO"
}
```

</details>

<details>
<summary>deleteTransportationDocument</summary>

Deletes a TransportationDocumentData entity identified by its `TranspDocNumber` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `transpDocNumber` | <code>int:Signed32</code> | Yes | Key property 'TranspDocNumber' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteTransportationDocument(1);
```

</details>

<details>
<summary>updateTransportationDocument</summary>

Partially updates a TransportationDocumentData entity identified by its `TranspDocNumber` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `transpDocNumber` | <code>int:Signed32</code> | Yes | Key property 'TranspDocNumber' (Edm.Int32) |
| `payload` | <code>TransportationDocumentData</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateTransportationDocument(1, payload);
```

</details>

<details>
<summary>transportationDocumentCancelTransportationDocument</summary>

Invokes the bound action `CancelTransportationDocument` on a TransportationDocumentData entity to cancel it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `transpDocNumber` | <code>int:Signed32</code> | Yes | Key property 'TranspDocNumber' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->transportationDocumentCancelTransportationDocument(1);
```

</details>

#### BrazilNumericIndexers

<details>
<summary>listBrazilNumericIndexers</summary>

Queries the BrazilNumericIndexers collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBrazilNumericIndexersHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBrazilNumericIndexersQueries</code> | No | Queries to be sent with the request |

**Returns:** `BrazilNumericIndexersCollectionResponse|error`

**Sample code:**

```ballerina
BrazilNumericIndexersCollectionResponse result = check client->listBrazilNumericIndexers();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#BrazilNumericIndexers",
  "value": [
    {
      "IndexerType": "bnitFuelGroup",
      "Description": "Fuel group indexer",
      "ID": 1,
      "Code": 10
    }
  ],
  "odata.nextLink": "BrazilNumericIndexers?$skip=20"
}
```

</details>

<details>
<summary>createBrazilNumericIndexers</summary>

Creates a new BrazilNumericIndexer entity from the supplied payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BrazilNumericIndexer</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BrazilNumericIndexer|error`

**Sample code:**

```ballerina
BrazilNumericIndexer result = check client->createBrazilNumericIndexers(payload);
```

**Sample response:**

```json
{
  "IndexerType": "bnitFuelGroup",
  "Description": "Fuel group indexer",
  "ID": 1,
  "Code": 10
}
```

</details>

<details>
<summary>getBrazilNumericIndexers</summary>

Retrieves a single BrazilNumericIndexer entity identified by its `ID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBrazilNumericIndexersQueries</code> | No | Queries to be sent with the request |

**Returns:** `BrazilNumericIndexer|error`

**Sample code:**

```ballerina
BrazilNumericIndexer result = check client->getBrazilNumericIndexers(1);
```

**Sample response:**

```json
{
  "IndexerType": "bnitFuelGroup",
  "Description": "Fuel group indexer",
  "ID": 1,
  "Code": 10
}
```

</details>

<details>
<summary>deleteBrazilNumericIndexers</summary>

Deletes a BrazilNumericIndexer entity identified by its `ID` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteBrazilNumericIndexers(1);
```

</details>

<details>
<summary>updateBrazilNumericIndexers</summary>

Partially updates a BrazilNumericIndexer entity identified by its `ID` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `payload` | <code>BrazilNumericIndexer</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateBrazilNumericIndexers(1, payload);
```

</details>

<details>
<summary>brazilNumericIndexersGetIndexerTypeList</summary>

Invokes the bound action `GetIndexerTypeList` on a BrazilNumericIndexer entity to retrieve its list of indexer type params.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `iD` | <code>int:Signed32</code> | Yes | Key property 'ID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_4|error`

**Sample code:**

```ballerina
inline_response_200_4 result = check client->brazilNumericIndexersGetIndexerTypeList(1);
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#BrazilNumericIndexers",
  "value": [
    {
      "ID": 1
    }
  ]
}
```

</details>

#### CertificateSeries

<details>
<summary>listCertificateSeries</summary>

Queries the CertificateSeries collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCertificateSeriesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCertificateSeriesQueries</code> | No | Queries to be sent with the request |

**Returns:** `CertificateSeriesCollectionResponse|error`

**Sample code:**

```ballerina
CertificateSeriesCollectionResponse result = check client->listCertificateSeries();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#CertificateSeries",
  "value": [
    {
      "AbsEntry": 1,
      "Code": "CS-01",
      "Section": 1,
      "DefaultSeries": 1,
      "Location": 1
    }
  ],
  "odata.nextLink": "CertificateSeries?$skip=20"
}
```

</details>

<details>
<summary>createCertificateSeries</summary>

Creates a new CertificateSeries entity from the supplied payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CertificateSeries</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CertificateSeries|error`

**Sample code:**

```ballerina
CertificateSeries result = check client->createCertificateSeries(payload);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "CS-01",
  "Section": 1,
  "DefaultSeries": 1,
  "Location": 1
}
```

</details>

<details>
<summary>getCertificateSeries</summary>

Retrieves a single CertificateSeries entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCertificateSeriesQueries</code> | No | Queries to be sent with the request |

**Returns:** `CertificateSeries|error`

**Sample code:**

```ballerina
CertificateSeries result = check client->getCertificateSeries(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "CS-01",
  "Section": 1,
  "DefaultSeries": 1,
  "Location": 1
}
```

</details>

<details>
<summary>deleteCertificateSeries</summary>

Deletes a CertificateSeries entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteCertificateSeries(1);
```

</details>

<details>
<summary>updateCertificateSeries</summary>

Partially updates a CertificateSeries entity identified by its `AbsEntry` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>CertificateSeries</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateCertificateSeries(1, payload);
```

</details>

<details>
<summary>certificateSeriesServiceGetCertificateSeriesList</summary>

Calls the `CertificateSeriesService_GetCertificateSeriesList` function-import to retrieve the certificate series list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_8|error`

**Sample code:**

```ballerina
inline_response_200_8 result = check client->certificateSeriesServiceGetCertificateSeriesList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#CertificateSeries",
  "value": [
    {
      "AbsEntry": 1,
      "Code": "CS-01",
      "Section": 1
    }
  ]
}
```

</details>

#### IndiaSacCode

<details>
<summary>listIndiaSacCode</summary>

Queries the IndiaSacCode collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListIndiaSacCodeHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListIndiaSacCodeQueries</code> | No | Queries to be sent with the request |

**Returns:** `IndiaSacCodeCollectionResponse|error`

**Sample code:**

```ballerina
IndiaSacCodeCollectionResponse result = check client->listIndiaSacCode();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#IndiaSacCode",
  "value": [
    {
      "ServiceCode": "SAC001",
      "ServiceName": "Consulting services",
      "AbsEntry": 1
    }
  ],
  "odata.nextLink": "IndiaSacCode?$skip=20"
}
```

</details>

<details>
<summary>createIndiaSacCode</summary>

Creates a new IndiaSacCode entity from the supplied payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>IndiaSacCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `IndiaSacCode|error`

**Sample code:**

```ballerina
IndiaSacCode result = check client->createIndiaSacCode(payload);
```

**Sample response:**

```json
{
  "ServiceCode": "SAC001",
  "ServiceName": "Consulting services",
  "AbsEntry": 1
}
```

</details>

<details>
<summary>getIndiaSacCode</summary>

Retrieves a single IndiaSacCode entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetIndiaSacCodeQueries</code> | No | Queries to be sent with the request |

**Returns:** `IndiaSacCode|error`

**Sample code:**

```ballerina
IndiaSacCode result = check client->getIndiaSacCode(1);
```

**Sample response:**

```json
{
  "ServiceCode": "SAC001",
  "ServiceName": "Consulting services",
  "AbsEntry": 1
}
```

</details>

<details>
<summary>deleteIndiaSacCode</summary>

Deletes an IndiaSacCode entity identified by its `AbsEntry` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteIndiaSacCode(1);
```

</details>

<details>
<summary>updateIndiaSacCode</summary>

Partially updates an IndiaSacCode entity identified by its `AbsEntry` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>IndiaSacCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateIndiaSacCode(1, payload);
```

</details>

<details>
<summary>indiaSacCodeServiceGetList</summary>

Calls the `IndiaSacCodeService_GetList` function-import to retrieve a list of India SAC code params.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_35|error`

**Sample code:**

```ballerina
inline_response_200_35 result = check client->indiaSacCodeServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#IndiaSacCode",
  "value": [
    {
      "ServiceCode": "SAC001",
      "AbsEntry": 1
    }
  ]
}
```

</details>

#### NFTaxCategories

<details>
<summary>listNFTaxCategories</summary>

Queries the NFTaxCategories collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListNFTaxCategoriesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListNFTaxCategoriesQueries</code> | No | Queries to be sent with the request |

**Returns:** `NFTaxCategoriesCollectionResponse|error`

**Sample code:**

```ballerina
NFTaxCategoriesCollectionResponse result = check client->listNFTaxCategories();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#NFTaxCategories",
  "value": [
    {
      "Locked": "tNO",
      "GPCId": 5,
      "Code": "NFT01",
      "AbsId": 1,
      "CESTrel": "tNO"
    }
  ],
  "odata.nextLink": "NFTaxCategories?$skip=20"
}
```

</details>

<details>
<summary>createNFTaxCategories</summary>

Creates a new NFTaxCategory entity from the supplied payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>NFTaxCategory</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `NFTaxCategory|error`

**Sample code:**

```ballerina
NFTaxCategory result = check client->createNFTaxCategories(payload);
```

**Sample response:**

```json
{
  "Locked": "tNO",
  "GPCId": 5,
  "Code": "NFT01",
  "AbsId": 1,
  "CESTrel": "tNO"
}
```

</details>

<details>
<summary>getNFTaxCategories</summary>

Retrieves a single NFTaxCategory entity identified by its `AbsId` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absId` | <code>int:Signed32</code> | Yes | Key property 'AbsId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetNFTaxCategoriesQueries</code> | No | Queries to be sent with the request |

**Returns:** `NFTaxCategory|error`

**Sample code:**

```ballerina
NFTaxCategory result = check client->getNFTaxCategories(1);
```

**Sample response:**

```json
{
  "Locked": "tNO",
  "GPCId": 5,
  "Code": "NFT01",
  "AbsId": 1,
  "CESTrel": "tNO"
}
```

</details>

<details>
<summary>deleteNFTaxCategories</summary>

Deletes an NFTaxCategory entity identified by its `AbsId` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absId` | <code>int:Signed32</code> | Yes | Key property 'AbsId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteNFTaxCategories(1);
```

</details>

<details>
<summary>updateNFTaxCategories</summary>

Partially updates an NFTaxCategory entity identified by its `AbsId` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absId` | <code>int:Signed32</code> | Yes | Key property 'AbsId' (Edm.Int32) |
| `payload` | <code>NFTaxCategory</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateNFTaxCategories(1, payload);
```

</details>

<details>
<summary>nFTaxCategoriesServiceGetList</summary>

Calls the `NFTaxCategoriesService_GetList` function-import to retrieve a list of NF tax category params.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_40|error`

**Sample code:**

```ballerina
inline_response_200_40 result = check client->nFTaxCategoriesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#NFTaxCategories",
  "value": [
    {
      "Code": "NFT01",
      "AbsId": 1
    }
  ]
}
```

</details>

#### DefaultElementsforCR

<details>
<summary>listDefaultElementsforCR</summary>

Queries the DefaultElementsforCR collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDefaultElementsforCRHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListDefaultElementsforCRQueries</code> | No | Queries to be sent with the request |

**Returns:** `DefaultElementsforCRCollectionResponse|error`

**Sample code:**

```ballerina
DefaultElementsforCRCollectionResponse result = check client->listDefaultElementsforCR();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#DefaultElementsforCR",
  "value": [
    {
      "Code": 1,
      "Name": "Default CR Element"
    }
  ],
  "odata.nextLink": "DefaultElementsforCR?$skip=20"
}
```

</details>

<details>
<summary>createDefaultElementsforCR</summary>

Creates a new DefaultElementsforCR entity from the supplied payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DefaultElementsforCR</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DefaultElementsforCR|error`

**Sample code:**

```ballerina
DefaultElementsforCR result = check client->createDefaultElementsforCR(payload);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Default CR Element"
}
```

</details>

<details>
<summary>getDefaultElementsforCR</summary>

Retrieves a single DefaultElementsforCR entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDefaultElementsforCRQueries</code> | No | Queries to be sent with the request |

**Returns:** `DefaultElementsforCR|error`

**Sample code:**

```ballerina
DefaultElementsforCR result = check client->getDefaultElementsforCR(1);
```

**Sample response:**

```json
{
  "Code": 1,
  "Name": "Default CR Element"
}
```

</details>

<details>
<summary>deleteDefaultElementsforCR</summary>

Deletes a DefaultElementsforCR entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteDefaultElementsforCR(1);
```

</details>

<details>
<summary>updateDefaultElementsforCR</summary>

Partially updates a DefaultElementsforCR entity identified by its `Code` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>DefaultElementsforCR</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateDefaultElementsforCR(1, payload);
```

</details>

#### LocalEra

<details>
<summary>listLocalEra</summary>

Queries the LocalEra collection and returns a page of entities, optionally filtered, sorted, or paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListLocalEraHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListLocalEraQueries</code> | No | Queries to be sent with the request |

**Returns:** `LocalEraCollectionResponse|error`

**Sample code:**

```ballerina
LocalEraCollectionResponse result = check client->listLocalEra();
```

**Sample response:**

```json
{
  "odata.metadata": "https://service-layer-host:50000/b1s/v1/$metadata#LocalEra",
  "value": [
    {
      "EraName": "Reiwa",
      "StartDate": "2019-05-01",
      "Code": "R"
    }
  ],
  "odata.nextLink": "LocalEra?$skip=20"
}
```

</details>

<details>
<summary>createLocalEra</summary>

Creates a new LocalEra entity from the supplied payload and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>LocalEra</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `LocalEra|error`

**Sample code:**

```ballerina
LocalEra result = check client->createLocalEra(payload);
```

**Sample response:**

```json
{
  "EraName": "Reiwa",
  "StartDate": "2019-05-01",
  "Code": "R"
}
```

</details>

<details>
<summary>getLocalEra</summary>

Retrieves a single LocalEra entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetLocalEraQueries</code> | No | Queries to be sent with the request |

**Returns:** `LocalEra|error`

**Sample code:**

```ballerina
LocalEra result = check client->getLocalEra("R");
```

**Sample response:**

```json
{
  "EraName": "Reiwa",
  "StartDate": "2019-05-01",
  "Code": "R"
}
```

</details>

<details>
<summary>deleteLocalEra</summary>

Deletes a LocalEra entity identified by its `Code` key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->deleteLocalEra("R");
```

</details>

<details>
<summary>updateLocalEra</summary>

Partially updates a LocalEra entity identified by its `Code` key using PATCH/MERGE semantics.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>LocalEra</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
error? result = check client->updateLocalEra("R", payload);
```

</details>
