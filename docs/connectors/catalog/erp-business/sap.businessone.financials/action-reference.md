# Actions

The `ballerinax/sap.businessone.financials` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages SAP Business One financial accounting objects — chart of accounts & journal entries, budgets & scenarios, cost accounting dimensions, profit centers & distribution rules, currencies, and sales/withholding tax setup — over the session-authenticated Service Layer (OData V3). |

---

## Client

The `Client` provides access to the financial accounting objects exposed by the SAP Business One Service Layer — the chart of accounts, journal entries, budgets and budget scenarios, cost accounting dimensions, profit centers, distribution rules, currencies, and the full sales tax and withholding tax setup.

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
import ballerinax/sap.businessone.financials;

businessone:SessionConfig session = {
    companyDb: "SBODemoUS",
    username: "manager",
    password: "<password>"
};

financials:Client client = check new (session, serviceUrl = "https://<host>:50000/b1s/v1");
```

### Operations
#### AccrualTypes

<details>
<summary>listAccrualTypes</summary>

Queries the AccrualTypes collection and returns a page of accrual type entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAccrualTypesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for Service Layer paging control) |
| `queries` | <code>ListAccrualTypesQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `AccrualTypesCollectionResponse|error`

**Sample code:**

```ballerina
AccrualTypesCollectionResponse result = check client->listAccrualTypes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#AccrualTypes",
  "value": [
    {
      "Code": "ACR01",
      "Name": "Monthly Accrual",
      "PostingAccount": "_SYS00000000001",
      "CalculationAccount": "_SYS00000000002",
      "InterimAccount": "_SYS00000000003"
    }
  ],
  "odata.nextLink": "AccrualTypes?$skip=20"
}
```

</details>

<details>
<summary>createAccrualTypes</summary>

Creates a new AccrualType entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AccrualType</code> | Yes | The accrual type entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AccrualType|error`

**Sample code:**

```ballerina
AccrualType result = check client->createAccrualTypes({Code: "ACR01", Name: "Monthly Accrual"});
```

**Sample response:**

```json
{
  "Code": "ACR01",
  "Name": "Monthly Accrual",
  "PostingAccount": "_SYS00000000001",
  "CalculationAccount": "_SYS00000000002",
  "InterimAccount": "_SYS00000000003"
}
```

</details>

<details>
<summary>getAccrualTypes</summary>

Retrieves a single AccrualType entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAccrualTypesQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `AccrualType|error`

**Sample code:**

```ballerina
AccrualType result = check client->getAccrualTypes("ACR01");
```

**Sample response:**

```json
{
  "Code": "ACR01",
  "Name": "Monthly Accrual",
  "PostingAccount": "_SYS00000000001",
  "CalculationAccount": "_SYS00000000002",
  "InterimAccount": "_SYS00000000003"
}
```

</details>

<details>
<summary>deleteAccrualTypes</summary>

Deletes an AccrualType entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAccrualTypes("ACR01");
```

</details>

<details>
<summary>updateAccrualTypes</summary>

Partially updates an AccrualType entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>AccrualType</code> | Yes | The accrual type fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAccrualTypes("ACR01", {Name: "Updated Accrual"});
```

</details>

<details>
<summary>accrualTypesServiceGetAccrualTypeList</summary>

Invokes the `AccrualTypesService_GetAccrualTypeList` service action to retrieve the accrual type list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_1|error`

**Sample code:**

```ballerina
inline_response_200_1 result = check client->accrualTypesServiceGetAccrualTypeList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.AccrualTypeParams)",
  "value": [
    {
      "Code": "ACR01"
    }
  ]
}
```

</details>

#### Budgets

<details>
<summary>listBudgets</summary>

Queries the Budgets collection and returns a page of budget entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBudgetsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for Service Layer paging control) |
| `queries` | <code>ListBudgetsQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `BudgetsCollectionResponse|error`

**Sample code:**

```ballerina
BudgetsCollectionResponse result = check client->listBudgets();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Budgets",
  "value": [
    {
      "Numerator": 1,
      "AccountCode": "_SYS00000000001",
      "BudgetScenario": 1,
      "StartofFiscalYear": "2026-01-01",
      "TotalAnnualBudgetDebitLoc": 120000.0
    }
  ],
  "odata.nextLink": "Budgets?$skip=20"
}
```

</details>

<details>
<summary>createBudgets</summary>

Creates a new Budget entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Budget</code> | Yes | The budget entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Budget|error`

**Sample code:**

```ballerina
Budget result = check client->createBudgets({AccountCode: "_SYS00000000001", BudgetScenario: 1});
```

**Sample response:**

```json
{
  "Numerator": 1,
  "AccountCode": "_SYS00000000001",
  "BudgetScenario": 1,
  "StartofFiscalYear": "2026-01-01",
  "TotalAnnualBudgetDebitLoc": 120000.0,
  "BudgetLines": []
}
```

</details>

<details>
<summary>getBudgets</summary>

Retrieves a single Budget entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBudgetsQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `Budget|error`

**Sample code:**

```ballerina
Budget result = check client->getBudgets(1);
```

**Sample response:**

```json
{
  "Numerator": 1,
  "AccountCode": "_SYS00000000001",
  "BudgetScenario": 1,
  "StartofFiscalYear": "2026-01-01",
  "TotalAnnualBudgetDebitLoc": 120000.0
}
```

</details>

<details>
<summary>deleteBudgets</summary>

Deletes a Budget entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBudgets(1);
```

</details>

<details>
<summary>updateBudgets</summary>

Partially updates a Budget entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `payload` | <code>Budget</code> | Yes | The budget fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBudgets(1, {TotalAnnualBudgetDebitLoc: 150000.0});
```

</details>

#### DeductibleTaxes

<details>
<summary>deductibleTaxServiceGetList</summary>

Invokes the `DeductibleTaxService_GetList` service action to retrieve the deductible tax list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_6|error`

**Sample code:**

```ballerina
inline_response_200_6 result = check client->deductibleTaxServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.DeductibleTaxParams)",
  "value": [
    {
      "Code": "DT01",
      "Name": "Deductible Input Tax"
    }
  ]
}
```

</details>

<details>
<summary>listDeductibleTaxes</summary>

Queries the DeductibleTaxes collection and returns a page of deductible tax entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDeductibleTaxesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for Service Layer paging control) |
| `queries` | <code>ListDeductibleTaxesQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `DeductibleTaxesCollectionResponse|error`

**Sample code:**

```ballerina
DeductibleTaxesCollectionResponse result = check client->listDeductibleTaxes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#DeductibleTaxes",
  "value": [
    {
      "Code": "DT01",
      "Name": "Deductible Input Tax",
      "Category": "bovcInputTax",
      "Inactive": "tNO",
      "DeductibleTaxRate": 50.0
    }
  ],
  "odata.nextLink": "DeductibleTaxes?$skip=20"
}
```

</details>

<details>
<summary>createDeductibleTaxes</summary>

Creates a new DeductibleTax entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DeductibleTax</code> | Yes | The deductible tax entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DeductibleTax|error`

**Sample code:**

```ballerina
DeductibleTax result = check client->createDeductibleTaxes({code: "DT01", name: "Deductible Input Tax", deductibleTaxRate: 50.0});
```

**Sample response:**

```json
{
  "Code": "DT01",
  "Name": "Deductible Input Tax",
  "Category": "bovcInputTax",
  "Inactive": "tNO",
  "DeductibleTaxRate": 50.0
}
```

</details>

<details>
<summary>getDeductibleTaxes</summary>

Retrieves a single DeductibleTax entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDeductibleTaxesQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `DeductibleTax|error`

**Sample code:**

```ballerina
DeductibleTax result = check client->getDeductibleTaxes("DT01");
```

**Sample response:**

```json
{
  "Code": "DT01",
  "Name": "Deductible Input Tax",
  "Category": "bovcInputTax",
  "Inactive": "tNO",
  "DeductibleTaxRate": 50.0
}
```

</details>

<details>
<summary>deleteDeductibleTaxes</summary>

Deletes a DeductibleTax entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDeductibleTaxes("DT01");
```

</details>

<details>
<summary>updateDeductibleTaxes</summary>

Partially updates a DeductibleTax entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>DeductibleTax</code> | Yes | The deductible tax fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDeductibleTaxes("DT01", {deductibleTaxRate: 60.0});
```

</details>

#### DeductionTaxSubGroups

<details>
<summary>listDeductionTaxSubGroups</summary>

Queries the DeductionTaxSubGroups collection and returns a page of deduction tax sub group entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDeductionTaxSubGroupsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for Service Layer paging control) |
| `queries` | <code>ListDeductionTaxSubGroupsQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `DeductionTaxSubGroupsCollectionResponse|error`

**Sample code:**

```ballerina
DeductionTaxSubGroupsCollectionResponse result = check client->listDeductionTaxSubGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#DeductionTaxSubGroups",
  "value": [
    {
      "GroupCode": "SG01",
      "GroupName": "Professional Services",
      "DeductionTaxGroups": []
    }
  ],
  "odata.nextLink": "DeductionTaxSubGroups?$skip=20"
}
```

</details>

<details>
<summary>createDeductionTaxSubGroups</summary>

Creates a new DeductionTaxSubGroup entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DeductionTaxSubGroup</code> | Yes | The deduction tax sub group entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DeductionTaxSubGroup|error`

**Sample code:**

```ballerina
DeductionTaxSubGroup result = check client->createDeductionTaxSubGroups({groupCode: "SG01", groupName: "Professional Services"});
```

**Sample response:**

```json
{
  "GroupCode": "SG01",
  "GroupName": "Professional Services",
  "DeductionTaxGroups": []
}
```

</details>

<details>
<summary>getDeductionTaxSubGroups</summary>

Retrieves a single DeductionTaxSubGroup entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `groupCode` | <code>string</code> | Yes | Key property 'GroupCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDeductionTaxSubGroupsQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `DeductionTaxSubGroup|error`

**Sample code:**

```ballerina
DeductionTaxSubGroup result = check client->getDeductionTaxSubGroups("SG01");
```

**Sample response:**

```json
{
  "GroupCode": "SG01",
  "GroupName": "Professional Services",
  "DeductionTaxGroups": []
}
```

</details>

<details>
<summary>deleteDeductionTaxSubGroups</summary>

Deletes a DeductionTaxSubGroup entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `groupCode` | <code>string</code> | Yes | Key property 'GroupCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDeductionTaxSubGroups("SG01");
```

</details>

<details>
<summary>updateDeductionTaxSubGroups</summary>

Partially updates a DeductionTaxSubGroup entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `groupCode` | <code>string</code> | Yes | Key property 'GroupCode' (Edm.String) |
| `payload` | <code>DeductionTaxSubGroup</code> | Yes | The deduction tax sub group fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDeductionTaxSubGroups("SG01", {groupName: "Updated Sub Group"});
```

</details>

<details>
<summary>deductionTaxSubGroupsServiceGetDeductionTaxSubGroupList</summary>

Invokes the `DeductionTaxSubGroupsService_GetDeductionTaxSubGroupList` service action to retrieve the deduction tax sub group list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_7|error`

**Sample code:**

```ballerina
inline_response_200_7 result = check client->deductionTaxSubGroupsServiceGetDeductionTaxSubGroupList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.DeductionTaxSubGroupParams)",
  "value": [
    {
      "GroupCode": "SG01",
      "GroupName": "Professional Services"
    }
  ]
}
```

</details>

#### FinancialYears

<details>
<summary>listFinancialYears</summary>

Queries the FinancialYears collection and returns a page of financial year entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListFinancialYearsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for Service Layer paging control) |
| `queries` | <code>ListFinancialYearsQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `FinancialYearsCollectionResponse|error`

**Sample code:**

```ballerina
FinancialYearsCollectionResponse result = check client->listFinancialYears();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#FinancialYears",
  "value": [
    {
      "AbsEntry": 1,
      "Code": "FY2026",
      "Description": "Financial Year 2026-27",
      "StartDate": "2026-04-01",
      "EndDate": "2027-03-31",
      "AssessYear": "2027"
    }
  ],
  "odata.nextLink": "FinancialYears?$skip=20"
}
```

</details>

<details>
<summary>createFinancialYears</summary>

Creates a new FinancialYear entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>FinancialYear</code> | Yes | The financial year entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `FinancialYear|error`

**Sample code:**

```ballerina
FinancialYear result = check client->createFinancialYears({code: "FY2026", startDate: "2026-04-01", endDate: "2027-03-31"});
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "FY2026",
  "Description": "Financial Year 2026-27",
  "StartDate": "2026-04-01",
  "EndDate": "2027-03-31",
  "AssessYear": "2027"
}
```

</details>

<details>
<summary>getFinancialYears</summary>

Retrieves a single FinancialYear entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetFinancialYearsQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `FinancialYear|error`

**Sample code:**

```ballerina
FinancialYear result = check client->getFinancialYears(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "FY2026",
  "Description": "Financial Year 2026-27",
  "StartDate": "2026-04-01",
  "EndDate": "2027-03-31",
  "AssessYear": "2027"
}
```

</details>

<details>
<summary>deleteFinancialYears</summary>

Deletes a FinancialYear entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteFinancialYears(1);
```

</details>

<details>
<summary>updateFinancialYears</summary>

Partially updates a FinancialYear entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>FinancialYear</code> | Yes | The financial year fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateFinancialYears(1, {description: "Updated Financial Year"});
```

</details>

<details>
<summary>financialYearsServiceGetFinancialYearList</summary>

Invokes the `FinancialYearsService_GetFinancialYearList` service action to retrieve the financial year list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_11|error`

**Sample code:**

```ballerina
inline_response_200_11 result = check client->financialYearsServiceGetFinancialYearList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.FinancialYearParams)",
  "value": [
    {
      "AbsEntry": 1,
      "Code": "FY2026",
      "Description": "Financial Year 2026-27"
    }
  ]
}
```

</details>

#### PostingTemplates

<details>
<summary>listPostingTemplates</summary>

Queries the PostingTemplates collection and returns a page of posting template entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPostingTemplatesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for Service Layer paging control) |
| `queries` | <code>ListPostingTemplatesQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `PostingTemplatesCollectionResponse|error`

**Sample code:**

```ballerina
PostingTemplatesCollectionResponse result = check client->listPostingTemplates();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#PostingTemplates",
  "value": [
    {
      "Code": "PT01",
      "Description": "Monthly rent allocation",
      "AutomaticVAT": "tNO",
      "StampTax": "tNO",
      "ManageWTax": "tNO",
      "DeferredTax": "tNO",
      "PostingTemplatesLineCollection": []
    }
  ],
  "odata.nextLink": "PostingTemplates?$skip=20"
}
```

</details>

<details>
<summary>createPostingTemplates</summary>

Creates a new PostingTemplates entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PostingTemplates</code> | Yes | The posting template entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PostingTemplates|error`

**Sample code:**

```ballerina
PostingTemplates result = check client->createPostingTemplates({code: "PT01", description: "Monthly rent allocation"});
```

**Sample response:**

```json
{
  "Code": "PT01",
  "Description": "Monthly rent allocation",
  "AutomaticVAT": "tNO",
  "StampTax": "tNO",
  "ManageWTax": "tNO",
  "DeferredTax": "tNO",
  "PostingTemplatesLineCollection": []
}
```

</details>

<details>
<summary>getPostingTemplates</summary>

Retrieves a single PostingTemplates entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPostingTemplatesQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `PostingTemplates|error`

**Sample code:**

```ballerina
PostingTemplates result = check client->getPostingTemplates("PT01");
```

**Sample response:**

```json
{
  "Code": "PT01",
  "Description": "Monthly rent allocation",
  "AutomaticVAT": "tNO",
  "StampTax": "tNO",
  "ManageWTax": "tNO",
  "DeferredTax": "tNO",
  "PostingTemplatesLineCollection": []
}
```

</details>

<details>
<summary>deletePostingTemplates</summary>

Deletes a PostingTemplates entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePostingTemplates("PT01");
```

</details>

<details>
<summary>updatePostingTemplates</summary>

Partially updates a PostingTemplates entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>PostingTemplates</code> | Yes | The posting template fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updatePostingTemplates("PT01", {description: "Updated template"});
```

</details>

<details>
<summary>postingTemplatesServiceGetList</summary>

Invokes the `PostingTemplatesService_GetList` service action to retrieve the posting template list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_15|error`

**Sample code:**

```ballerina
inline_response_200_15 result = check client->postingTemplatesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.PostingTemplatesParams)",
  "value": [
    {
      "Code": "PT01",
      "Description": "Monthly rent allocation"
    }
  ]
}
```

</details>

#### RecurringPostings

<details>
<summary>listRecurringPostings</summary>

Queries the RecurringPostings collection and returns a page of recurring posting entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListRecurringPostingsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for Service Layer paging control) |
| `queries` | <code>ListRecurringPostingsQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `RecurringPostingsCollectionResponse|error`

**Sample code:**

```ballerina
RecurringPostingsCollectionResponse result = check client->listRecurringPostings();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#RecurringPostings",
  "value": [
    {
      "Code": "RP01",
      "Instance": 1,
      "Description": "Monthly rent posting",
      "Frequency": "ftMonthly",
      "NextExecution": "2026-08-01",
      "RecurringPostingsLineCollection": []
    }
  ],
  "odata.nextLink": "RecurringPostings?$skip=20"
}
```

</details>

<details>
<summary>createRecurringPostings</summary>

Creates a new RecurringPostings entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>RecurringPostings</code> | Yes | The recurring posting entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `RecurringPostings|error`

**Sample code:**

```ballerina
RecurringPostings result = check client->createRecurringPostings({code: "RP01", description: "Monthly rent posting", frequency: "ftMonthly"});
```

**Sample response:**

```json
{
  "Code": "RP01",
  "Instance": 1,
  "Description": "Monthly rent posting",
  "Frequency": "ftMonthly",
  "NextExecution": "2026-08-01",
  "RecurringPostingsLineCollection": []
}
```

</details>

<details>
<summary>getRecurringPostings</summary>

Retrieves a single RecurringPostings entity by its composite key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Composite key part 'Code' (Edm.String) |
| `instance` | <code>int:Signed32</code> | Yes | Composite key part 'Instance' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRecurringPostingsQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `RecurringPostings|error`

**Sample code:**

```ballerina
RecurringPostings result = check client->getRecurringPostings("RP01", 1);
```

**Sample response:**

```json
{
  "Code": "RP01",
  "Instance": 1,
  "Description": "Monthly rent posting",
  "Frequency": "ftMonthly",
  "NextExecution": "2026-08-01",
  "RecurringPostingsLineCollection": []
}
```

</details>

<details>
<summary>deleteRecurringPostings</summary>

Deletes a RecurringPostings entity identified by its composite key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Composite key part 'Code' (Edm.String) |
| `instance` | <code>int:Signed32</code> | Yes | Composite key part 'Instance' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteRecurringPostings("RP01", 1);
```

</details>

<details>
<summary>updateRecurringPostings</summary>

Partially updates a RecurringPostings entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Composite key part 'Code' (Edm.String) |
| `instance` | <code>int:Signed32</code> | Yes | Composite key part 'Instance' (Edm.Int32) |
| `payload` | <code>RecurringPostings</code> | Yes | The recurring posting fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateRecurringPostings("RP01", 1, {description: "Updated recurring posting"});
```

</details>

<details>
<summary>recurringPostingsServiceGetList</summary>

Invokes the `RecurringPostingsService_GetList` service action to retrieve the recurring posting list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_17|error`

**Sample code:**

```ballerina
inline_response_200_17 result = check client->recurringPostingsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.RecurringPostingsParams)",
  "value": [
    {
      "Code": "RP01",
      "Instance": 1,
      "Description": "Monthly rent posting"
    }
  ]
}
```

</details>

#### SalesTaxAuthorities

<details>
<summary>listSalesTaxAuthorities</summary>

Queries the SalesTaxAuthorities collection and returns a page of sales tax authority entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListSalesTaxAuthoritiesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for Service Layer paging control) |
| `queries` | <code>ListSalesTaxAuthoritiesQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `SalesTaxAuthoritiesCollectionResponse|error`

**Sample code:**

```ballerina
SalesTaxAuthoritiesCollectionResponse result = check client->listSalesTaxAuthorities();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#SalesTaxAuthorities",
  "value": [
    {
      "Type": 1,
      "Code": "NY",
      "Name": "New York State Tax",
      "Rate": 8.875,
      "AOrRTaxAccount": "_SYS00000000001",
      "AOrPTaxAccount": "_SYS00000000002"
    }
  ],
  "odata.nextLink": "SalesTaxAuthorities?$skip=20"
}
```

</details>

<details>
<summary>createSalesTaxAuthorities</summary>

Creates a new SalesTaxAuthority entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SalesTaxAuthority</code> | Yes | The sales tax authority entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `SalesTaxAuthority|error`

**Sample code:**

```ballerina
SalesTaxAuthority result = check client->createSalesTaxAuthorities({Type: 1, Code: "NY", Name: "New York State Tax", Rate: 8.875});
```

**Sample response:**

```json
{
  "Type": 1,
  "Code": "NY",
  "Name": "New York State Tax",
  "Rate": 8.875,
  "AOrRTaxAccount": "_SYS00000000001",
  "AOrPTaxAccount": "_SYS00000000002"
}
```

</details>

<details>
<summary>getSalesTaxAuthorities</summary>

Retrieves a single SalesTaxAuthority entity by its composite key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `'type` | <code>int:Signed32</code> | Yes | Composite key part 'Type' (Edm.Int32) |
| `code` | <code>string</code> | Yes | Composite key part 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSalesTaxAuthoritiesQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `SalesTaxAuthority|error`

**Sample code:**

```ballerina
SalesTaxAuthority result = check client->getSalesTaxAuthorities(1, "NY");
```

**Sample response:**

```json
{
  "Type": 1,
  "Code": "NY",
  "Name": "New York State Tax",
  "Rate": 8.875,
  "AOrRTaxAccount": "_SYS00000000001",
  "AOrPTaxAccount": "_SYS00000000002"
}
```

</details>

<details>
<summary>deleteSalesTaxAuthorities</summary>

Deletes a SalesTaxAuthority entity identified by its composite key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `'type` | <code>int:Signed32</code> | Yes | Composite key part 'Type' (Edm.Int32) |
| `code` | <code>string</code> | Yes | Composite key part 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSalesTaxAuthorities(1, "NY");
```

</details>

<details>
<summary>updateSalesTaxAuthorities</summary>

Partially updates a SalesTaxAuthority entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `'type` | <code>int:Signed32</code> | Yes | Composite key part 'Type' (Edm.Int32) |
| `code` | <code>string</code> | Yes | Composite key part 'Code' (Edm.String) |
| `payload` | <code>SalesTaxAuthority</code> | Yes | The sales tax authority fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSalesTaxAuthorities(1, "NY", {Rate: 9.0});
```

</details>

#### TaxCodeDeterminations

<details>
<summary>listTaxCodeDeterminations</summary>

Queries the TaxCodeDeterminations collection and returns a page of tax code determination entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListTaxCodeDeterminationsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for Service Layer paging control) |
| `queries` | <code>ListTaxCodeDeterminationsQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `TaxCodeDeterminationsCollectionResponse|error`

**Sample code:**

```ballerina
TaxCodeDeterminationsCollectionResponse result = check client->listTaxCodeDeterminations();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#TaxCodeDeterminations",
  "value": [
    {
      "DocEntry": 1,
      "Description": "NY sales determination",
      "Condition1": "tcdcShipToState",
      "TaxCode": "NY",
      "LineNumber": 1
    }
  ],
  "odata.nextLink": "TaxCodeDeterminations?$skip=20"
}
```

</details>

<details>
<summary>createTaxCodeDeterminations</summary>

Creates a new TaxCodeDetermination entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TaxCodeDetermination</code> | Yes | The tax code determination entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `TaxCodeDetermination|error`

**Sample code:**

```ballerina
TaxCodeDetermination result = check client->createTaxCodeDeterminations({description: "NY sales determination", taxCode: "NY", condition1: "tcdcShipToState"});
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "Description": "NY sales determination",
  "Condition1": "tcdcShipToState",
  "TaxCode": "NY",
  "LineNumber": 1
}
```

</details>

<details>
<summary>getTaxCodeDeterminations</summary>

Retrieves a single TaxCodeDetermination entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTaxCodeDeterminationsQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `TaxCodeDetermination|error`

**Sample code:**

```ballerina
TaxCodeDetermination result = check client->getTaxCodeDeterminations(1);
```

**Sample response:**

```json
{
  "DocEntry": 1,
  "Description": "NY sales determination",
  "Condition1": "tcdcShipToState",
  "TaxCode": "NY",
  "LineNumber": 1
}
```

</details>

<details>
<summary>deleteTaxCodeDeterminations</summary>

Deletes a TaxCodeDetermination entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTaxCodeDeterminations(1);
```

</details>

<details>
<summary>updateTaxCodeDeterminations</summary>

Partially updates a TaxCodeDetermination entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `docEntry` | <code>int:Signed32</code> | Yes | Key property 'DocEntry' (Edm.Int32) |
| `payload` | <code>TaxCodeDetermination</code> | Yes | The tax code determination fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTaxCodeDeterminations(1, {description: "Updated determination"});
```

</details>

<details>
<summary>taxCodeDeterminationsServiceGetTaxCodeDeterminationList</summary>

Invokes the `TaxCodeDeterminationsService_GetTaxCodeDeterminationList` service action to retrieve the tax code determination list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_22|error`

**Sample code:**

```ballerina
inline_response_200_22 result = check client->taxCodeDeterminationsServiceGetTaxCodeDeterminationList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.TaxCodeDeterminationParams)",
  "value": [
    {
      "DocEntry": 1
    }
  ]
}
```

</details>

#### TaxReplStateSubs

<details>
<summary>listTaxReplStateSubs</summary>

Queries the TaxReplStateSubs collection and returns a page of tax replication state substitution entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListTaxReplStateSubsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for Service Layer paging control) |
| `queries` | <code>ListTaxReplStateSubsQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `TaxReplStateSubsCollectionResponse|error`

**Sample code:**

```ballerina
TaxReplStateSubsCollectionResponse result = check client->listTaxReplStateSubs();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#TaxReplStateSubs",
  "value": [
    {
      "State": "SP",
      "IEST": "123456789"
    }
  ],
  "odata.nextLink": "TaxReplStateSubs?$skip=20"
}
```

</details>

<details>
<summary>createTaxReplStateSubs</summary>

Creates a new TaxReplStateSubData entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TaxReplStateSubData</code> | Yes | The tax replication state substitution entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `TaxReplStateSubData|error`

**Sample code:**

```ballerina
TaxReplStateSubData result = check client->createTaxReplStateSubs({state: "SP", iEST: "123456789"});
```

**Sample response:**

```json
{
  "State": "SP",
  "IEST": "123456789"
}
```

</details>

<details>
<summary>getTaxReplStateSubs</summary>

Retrieves a single TaxReplStateSubData entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `state` | <code>string</code> | Yes | Key property 'State' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTaxReplStateSubsQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `TaxReplStateSubData|error`

**Sample code:**

```ballerina
TaxReplStateSubData result = check client->getTaxReplStateSubs("SP");
```

**Sample response:**

```json
{
  "State": "SP",
  "IEST": "123456789"
}
```

</details>

<details>
<summary>deleteTaxReplStateSubs</summary>

Deletes a TaxReplStateSubData entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `state` | <code>string</code> | Yes | Key property 'State' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTaxReplStateSubs("SP");
```

</details>

<details>
<summary>updateTaxReplStateSubs</summary>

Partially updates a TaxReplStateSubData entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `state` | <code>string</code> | Yes | Key property 'State' (Edm.String) |
| `payload` | <code>TaxReplStateSubData</code> | Yes | The tax replication state substitution fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTaxReplStateSubs("SP", {iEST: "987654321"});
```

</details>

#### WitholdingTaxDefinition

<details>
<summary>listWitholdingTaxDefinition</summary>

Queries the WitholdingTaxDefinition collection and returns a page of withholding tax definition (WTDCode) entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWitholdingTaxDefinitionHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for Service Layer paging control) |
| `queries` | <code>ListWitholdingTaxDefinitionQueries</code> | No | OData query options such as `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, and `$select` |

**Returns:** `WitholdingTaxDefinitionCollectionResponse|error`

**Sample code:**

```ballerina
WitholdingTaxDefinitionCollectionResponse result = check client->listWitholdingTaxDefinition();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#WitholdingTaxDefinition",
  "value": [
    {
      "AbsEntry": 1,
      "WTaxCode": "WT01",
      "WTaxName": "Withholding 5%",
      "OfficialCode": "194C",
      "Category": "wtcc_Payment",
      "BaseType": "wtcbt_Net",
      "Inactive": "tNO",
      "BaseAmountPrct": 100.0
    }
  ],
  "odata.nextLink": "WitholdingTaxDefinition?$skip=20"
}
```

</details>

<details>
<summary>createWitholdingTaxDefinition</summary>

Creates a new WTDCode (withholding tax definition) entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WTDCode</code> | Yes | The withholding tax definition entity to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WTDCode|error`

**Sample code:**

```ballerina
WTDCode result = check client->createWitholdingTaxDefinition({WTaxCode: "WT01", WTaxName: "Withholding 5%", OfficialCode: "194C"});
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "WTaxCode": "WT01",
  "WTaxName": "Withholding 5%",
  "OfficialCode": "194C",
  "Category": "wtcc_Payment",
  "BaseType": "wtcbt_Net",
  "Inactive": "tNO",
  "BaseAmountPrct": 100.0
}
```

</details>

<details>
<summary>getWitholdingTaxDefinition</summary>

Retrieves a single WTDCode (withholding tax definition) entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWitholdingTaxDefinitionQueries</code> | No | OData query options `$expand` and `$select` |

**Returns:** `WTDCode|error`

**Sample code:**

```ballerina
WTDCode result = check client->getWitholdingTaxDefinition(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "WTaxCode": "WT01",
  "WTaxName": "Withholding 5%",
  "OfficialCode": "194C",
  "Category": "wtcc_Payment",
  "BaseType": "wtcbt_Net",
  "Inactive": "tNO",
  "BaseAmountPrct": 100.0
}
```

</details>

<details>
<summary>deleteWitholdingTaxDefinition</summary>

Deletes a WTDCode (withholding tax definition) entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWitholdingTaxDefinition(1);
```

</details>

<details>
<summary>updateWitholdingTaxDefinition</summary>

Partially updates a WTDCode (withholding tax definition) entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>WTDCode</code> | Yes | The withholding tax definition fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWitholdingTaxDefinition(1, {WTaxName: "Updated Withholding"});
```

</details>
#### JournalEntries

<details>
<summary>listJournalEntries</summary>

Queries the JournalEntries collection and returns a page of entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListJournalEntriesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer: odata.maxpagesize=100`) |
| `queries` | <code>ListJournalEntriesQueries</code> | No | OData query options such as `$filter`, `$select`, `$top`, `$skip`, `$orderby`, `$expand`, `$inlinecount` |

**Returns:** `JournalEntriesCollectionResponse|error`

**Sample code:**

```ballerina
JournalEntriesCollectionResponse response = check client->listJournalEntries();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#JournalEntries",
  "value": [
    {
      "JdtNum": 1234,
      "ReferenceDate": "2026-01-15",
      "Memo": "Monthly accrual",
      "DueDate": "2026-01-31"
    }
  ],
  "odata.nextLink": "JournalEntries?$skip=20"
}
```

</details>

<details>
<summary>createJournalEntries</summary>

Creates a new JournalEntry and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JournalEntry</code> | Yes | Request payload representing the journal entry to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `JournalEntry|error`

**Sample code:**

```ballerina
JournalEntry result = check client->createJournalEntries({ReferenceDate: "2026-01-15", Memo: "Monthly accrual"});
```

**Sample response:**

```json
{
  "JdtNum": 1234,
  "ReferenceDate": "2026-01-15",
  "Memo": "Monthly accrual",
  "DueDate": "2026-01-31",
  "TaxDate": "2026-01-15"
}
```

</details>

<details>
<summary>getJournalEntries</summary>

Retrieves a single JournalEntry by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `jdtNum` | <code>int:Signed32</code> | Yes | Key property 'JdtNum' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJournalEntriesQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `JournalEntry|error`

**Sample code:**

```ballerina
JournalEntry entry = check client->getJournalEntries(1234);
```

**Sample response:**

```json
{
  "JdtNum": 1234,
  "ReferenceDate": "2026-01-15",
  "Memo": "Monthly accrual",
  "Number": 1234
}
```

</details>

<details>
<summary>deleteJournalEntries</summary>

Deletes the JournalEntry identified by the given key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `jdtNum` | <code>int:Signed32</code> | Yes | Key property 'JdtNum' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJournalEntries(1234);
```

</details>

<details>
<summary>updateJournalEntries</summary>

Partially updates a JournalEntry using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `jdtNum` | <code>int:Signed32</code> | Yes | Key property 'JdtNum' (Edm.Int32) |
| `payload` | <code>JournalEntry</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJournalEntries(1234, {Memo: "Corrected memo"});
```

</details>

<details>
<summary>journalEntriesCancel</summary>

Invokes the bound action 'Cancel' on a JournalEntries entity (binding type JournalEntry) to cancel the journal entry; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `jdtNum` | <code>int:Signed32</code> | Yes | Key property 'JdtNum' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->journalEntriesCancel(1234);
```

</details>

<details>
<summary>journalEntriesServiceClose</summary>

Closes a journal entry via the JournalEntriesService_Close service action; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JournalEntriesService_Close_body</code> | Yes | Request payload wrapping the journal entry to close (field: `journalEntry`) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->journalEntriesServiceClose({journalEntry: {JdtNum: 1234}});
```

</details>

#### AccountCategory

<details>
<summary>listAccountCategory</summary>

Queries the AccountCategory collection and returns a page of entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAccountCategoryHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer: odata.maxpagesize=100`) |
| `queries` | <code>ListAccountCategoryQueries</code> | No | OData query options such as `$filter`, `$select`, `$top`, `$skip`, `$orderby`, `$expand`, `$inlinecount` |

**Returns:** `AccountCategoryCollectionResponse|error`

**Sample code:**

```ballerina
AccountCategoryCollectionResponse response = check client->listAccountCategory();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#AccountCategory",
  "value": [
    {
      "CategoryCode": 100,
      "CategoryName": "Assets",
      "CategorySource": "acsBalanceSheet"
    }
  ]
}
```

</details>

<details>
<summary>createAccountCategory</summary>

Creates a new AccountCategory and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AccountCategory</code> | Yes | Request payload representing the account category to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AccountCategory|error`

**Sample code:**

```ballerina
AccountCategory result = check client->createAccountCategory({categoryName: "Assets"});
```

**Sample response:**

```json
{
  "CategoryCode": 100,
  "CategoryName": "Assets",
  "CategorySource": "acsBalanceSheet"
}
```

</details>

<details>
<summary>getAccountCategory</summary>

Retrieves a single AccountCategory by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `categoryCode` | <code>int:Signed32</code> | Yes | Key property 'CategoryCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAccountCategoryQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `AccountCategory|error`

**Sample code:**

```ballerina
AccountCategory category = check client->getAccountCategory(100);
```

**Sample response:**

```json
{
  "CategoryCode": 100,
  "CategoryName": "Assets",
  "CategorySource": "acsBalanceSheet"
}
```

</details>

<details>
<summary>deleteAccountCategory</summary>

Deletes the AccountCategory identified by the given key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `categoryCode` | <code>int:Signed32</code> | Yes | Key property 'CategoryCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAccountCategory(100);
```

</details>

<details>
<summary>updateAccountCategory</summary>

Partially updates an AccountCategory using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `categoryCode` | <code>int:Signed32</code> | Yes | Key property 'CategoryCode' (Edm.Int32) |
| `payload` | <code>AccountCategory</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAccountCategory(100, {categoryName: "Fixed Assets"});
```

</details>

<details>
<summary>accountCategoryServiceGetCategoryList</summary>

Invokes the AccountCategoryService_GetCategoryList service action and returns the category list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200|error`

**Sample code:**

```ballerina
inline_response_200 result = check client->accountCategoryServiceGetCategoryList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Collection(SAPB1.AccountCategoryParams)",
  "value": [
    {
      "CategoryCode": 100,
      "CategoryName": "Assets"
    }
  ]
}
```

</details>

#### CashDiscounts

<details>
<summary>listCashDiscounts</summary>

Queries the CashDiscounts collection and returns a page of entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCashDiscountsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer: odata.maxpagesize=100`) |
| `queries` | <code>ListCashDiscountsQueries</code> | No | OData query options such as `$filter`, `$select`, `$top`, `$skip`, `$orderby`, `$expand`, `$inlinecount` |

**Returns:** `CashDiscountsCollectionResponse|error`

**Sample code:**

```ballerina
CashDiscountsCollectionResponse response = check client->listCashDiscounts();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#CashDiscounts",
  "value": [
    {
      "Code": "CD01",
      "Name": "2% 10 Net 30",
      "Tax": "tYES",
      "Freight": "tNO"
    }
  ]
}
```

</details>

<details>
<summary>createCashDiscounts</summary>

Creates a new CashDiscount and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CashDiscount</code> | Yes | Request payload representing the cash discount to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CashDiscount|error`

**Sample code:**

```ballerina
CashDiscount result = check client->createCashDiscounts({code: "CD01", name: "2% 10 Net 30"});
```

**Sample response:**

```json
{
  "Code": "CD01",
  "Name": "2% 10 Net 30",
  "Tax": "tYES",
  "ByDate": "tNO",
  "Freight": "tNO"
}
```

</details>

<details>
<summary>getCashDiscounts</summary>

Retrieves a single CashDiscount by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCashDiscountsQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `CashDiscount|error`

**Sample code:**

```ballerina
CashDiscount discount = check client->getCashDiscounts("CD01");
```

**Sample response:**

```json
{
  "Code": "CD01",
  "Name": "2% 10 Net 30",
  "Tax": "tYES"
}
```

</details>

<details>
<summary>deleteCashDiscounts</summary>

Deletes the CashDiscount identified by the given key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCashDiscounts("CD01");
```

</details>

<details>
<summary>updateCashDiscounts</summary>

Partially updates a CashDiscount using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>CashDiscount</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCashDiscounts("CD01", {name: "2% 15 Net 30"});
```

</details>

<details>
<summary>cashDiscountsServiceGetCashDiscountList</summary>

Invokes the CashDiscountsService_GetCashDiscountList service action and returns the cash discount list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_2|error`

**Sample code:**

```ballerina
inline_response_200_2 result = check client->cashDiscountsServiceGetCashDiscountList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Collection(SAPB1.CashDiscountParams)",
  "value": [
    {
      "Code": "CD01",
      "Name": "2% 10 Net 30"
    }
  ]
}
```

</details>

#### DeterminationCriterias

<details>
<summary>listDeterminationCriterias</summary>

Queries the DeterminationCriterias collection and returns a page of entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDeterminationCriteriasHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer: odata.maxpagesize=100`) |
| `queries` | <code>ListDeterminationCriteriasQueries</code> | No | OData query options such as `$filter`, `$select`, `$top`, `$skip`, `$orderby`, `$expand`, `$inlinecount` |

**Returns:** `DeterminationCriteriasCollectionResponse|error`

**Sample code:**

```ballerina
DeterminationCriteriasCollectionResponse response = check client->listDeterminationCriterias();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#DeterminationCriterias",
  "value": [
    {
      "DmcId": 1,
      "IsActive": "tYES",
      "Priority": 1,
      "DeterminationCriteria": "BusinessPartner"
    }
  ]
}
```

</details>

<details>
<summary>createDeterminationCriterias</summary>

Creates a new DeterminationCriteria and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DeterminationCriteria</code> | Yes | Request payload representing the determination criteria to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DeterminationCriteria|error`

**Sample code:**

```ballerina
DeterminationCriteria result = check client->createDeterminationCriterias({determinationCriteria: "BusinessPartner", priority: 1});
```

**Sample response:**

```json
{
  "DmcId": 1,
  "IsActive": "tYES",
  "Priority": 1,
  "DeterminationCriteria": "BusinessPartner"
}
```

</details>

<details>
<summary>getDeterminationCriterias</summary>

Retrieves a single DeterminationCriteria by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `dmcId` | <code>int:Signed32</code> | Yes | Key property 'DmcId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDeterminationCriteriasQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `DeterminationCriteria|error`

**Sample code:**

```ballerina
DeterminationCriteria criteria = check client->getDeterminationCriterias(1);
```

**Sample response:**

```json
{
  "DmcId": 1,
  "IsActive": "tYES",
  "Priority": 1
}
```

</details>

<details>
<summary>deleteDeterminationCriterias</summary>

Deletes the DeterminationCriteria identified by the given key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `dmcId` | <code>int:Signed32</code> | Yes | Key property 'DmcId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDeterminationCriterias(1);
```

</details>

<details>
<summary>updateDeterminationCriterias</summary>

Partially updates a DeterminationCriteria using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `dmcId` | <code>int:Signed32</code> | Yes | Key property 'DmcId' (Edm.Int32) |
| `payload` | <code>DeterminationCriteria</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDeterminationCriterias(1, {priority: 2});
```

</details>

<details>
<summary>determinationCriteriasServiceGetList</summary>

Invokes the DeterminationCriteriasService_GetList service action and returns the determination criteria list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_8|error`

**Sample code:**

```ballerina
inline_response_200_8 result = check client->determinationCriteriasServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Collection(SAPB1.DeterminationCriteriaParams)",
  "value": [
    {
      "DmcId": 1
    }
  ]
}
```

</details>

#### GLAccountAdvancedRules

<details>
<summary>listGLAccountAdvancedRules</summary>

Queries the GLAccountAdvancedRules collection and returns a page of entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListGLAccountAdvancedRulesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer: odata.maxpagesize=100`) |
| `queries` | <code>ListGLAccountAdvancedRulesQueries</code> | No | OData query options such as `$filter`, `$select`, `$top`, `$skip`, `$orderby`, `$expand`, `$inlinecount` |

**Returns:** `GLAccountAdvancedRulesCollectionResponse|error`

**Sample code:**

```ballerina
GLAccountAdvancedRulesCollectionResponse response = check client->listGLAccountAdvancedRules();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#GLAccountAdvancedRules",
  "value": [
    {
      "AbsoluteEntry": 1,
      "PurchaseAcct": "510000",
      "CostAccount": "520000",
      "ReturningAccount": "410001"
    }
  ]
}
```

</details>

<details>
<summary>createGLAccountAdvancedRules</summary>

Creates a new GLAccountAdvancedRule and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>GLAccountAdvancedRule</code> | Yes | Request payload representing the G/L account advanced rule to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `GLAccountAdvancedRule|error`

**Sample code:**

```ballerina
GLAccountAdvancedRule result = check client->createGLAccountAdvancedRules({purchaseAcct: "510000", costAccount: "520000"});
```

**Sample response:**

```json
{
  "AbsoluteEntry": 1,
  "PurchaseAcct": "510000",
  "CostAccount": "520000"
}
```

</details>

<details>
<summary>getGLAccountAdvancedRules</summary>

Retrieves a single GLAccountAdvancedRule by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetGLAccountAdvancedRulesQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `GLAccountAdvancedRule|error`

**Sample code:**

```ballerina
GLAccountAdvancedRule rule = check client->getGLAccountAdvancedRules(1);
```

**Sample response:**

```json
{
  "AbsoluteEntry": 1,
  "PurchaseAcct": "510000",
  "ReturningAccount": "410001"
}
```

</details>

<details>
<summary>deleteGLAccountAdvancedRules</summary>

Deletes the GLAccountAdvancedRule identified by the given key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteGLAccountAdvancedRules(1);
```

</details>

<details>
<summary>updateGLAccountAdvancedRules</summary>

Partially updates a GLAccountAdvancedRule using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `payload` | <code>GLAccountAdvancedRule</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateGLAccountAdvancedRules(1, {costAccount: "520100"});
```

</details>

<details>
<summary>gLAccountAdvancedRulesServiceGetList</summary>

Invokes the GLAccountAdvancedRulesService_GetList service action and returns the G/L account advanced rule list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_12|error`

**Sample code:**

```ballerina
inline_response_200_12 result = check client->gLAccountAdvancedRulesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Collection(SAPB1.GLAccountAdvancedRuleParams)",
  "value": [
    {
      "FederalTaxID": "123456789",
      "ItemCode": "A00001",
      "Warehouse": "01"
    }
  ]
}
```

</details>

#### ProfitCenters

<details>
<summary>listProfitCenters</summary>

Queries the ProfitCenters collection and returns a page of entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListProfitCentersHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer: odata.maxpagesize=100`) |
| `queries` | <code>ListProfitCentersQueries</code> | No | OData query options such as `$filter`, `$select`, `$top`, `$skip`, `$orderby`, `$expand`, `$inlinecount` |

**Returns:** `ProfitCentersCollectionResponse|error`

**Sample code:**

```ballerina
ProfitCentersCollectionResponse response = check client->listProfitCenters();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ProfitCenters",
  "value": [
    {
      "CenterCode": "PC001",
      "CenterName": "Sales Department",
      "InWhichDimension": 1,
      "Active": "tYES"
    }
  ]
}
```

</details>

<details>
<summary>createProfitCenters</summary>

Creates a new ProfitCenter and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ProfitCenter</code> | Yes | Request payload representing the profit center to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ProfitCenter|error`

**Sample code:**

```ballerina
ProfitCenter result = check client->createProfitCenters({CenterCode: "PC001", CenterName: "Sales Department"});
```

**Sample response:**

```json
{
  "CenterCode": "PC001",
  "CenterName": "Sales Department",
  "InWhichDimension": 1,
  "Active": "tYES",
  "EffectiveFrom": "2026-01-01"
}
```

</details>

<details>
<summary>getProfitCenters</summary>

Retrieves a single ProfitCenter by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `centerCode` | <code>string</code> | Yes | Key property 'CenterCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetProfitCentersQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `ProfitCenter|error`

**Sample code:**

```ballerina
ProfitCenter center = check client->getProfitCenters("PC001");
```

**Sample response:**

```json
{
  "CenterCode": "PC001",
  "CenterName": "Sales Department",
  "Active": "tYES"
}
```

</details>

<details>
<summary>deleteProfitCenters</summary>

Deletes the ProfitCenter identified by the given key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `centerCode` | <code>string</code> | Yes | Key property 'CenterCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteProfitCenters("PC001");
```

</details>

<details>
<summary>updateProfitCenters</summary>

Partially updates a ProfitCenter using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `centerCode` | <code>string</code> | Yes | Key property 'CenterCode' (Edm.String) |
| `payload` | <code>ProfitCenter</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateProfitCenters("PC001", {CenterName: "Sales and Marketing"});
```

</details>

<details>
<summary>profitCentersServiceGetProfitCenterList</summary>

Invokes the ProfitCentersService_GetProfitCenterList service action and returns the profit center list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_16|error`

**Sample code:**

```ballerina
inline_response_200_16 result = check client->profitCentersServiceGetProfitCenterList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Collection(SAPB1.ProfitCenterParams)",
  "value": [
    {
      "CenterCode": "PC001",
      "CenterName": "Sales Department"
    }
  ]
}
```

</details>

#### TaxInvoiceReport

<details>
<summary>listTaxInvoiceReport</summary>

Queries the TaxInvoiceReport collection and returns a page of entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListTaxInvoiceReportHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer: odata.maxpagesize=100`) |
| `queries` | <code>ListTaxInvoiceReportQueries</code> | No | OData query options such as `$filter`, `$select`, `$top`, `$skip`, `$orderby`, `$expand`, `$inlinecount` |

**Returns:** `TaxInvoiceReportCollectionResponse|error`

**Sample code:**

```ballerina
TaxInvoiceReportCollectionResponse response = check client->listTaxInvoiceReport();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#TaxInvoiceReport",
  "value": [
    {
      "TaxInvoiceReportNumber": "TIR-001",
      "Date": "2026-01-31",
      "NTSApproval": "Approved",
      "BaseAmount": 10000.00
    }
  ]
}
```

</details>

<details>
<summary>createTaxInvoiceReport</summary>

Creates a new TaxInvoiceReport and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TaxInvoiceReport</code> | Yes | Request payload representing the tax invoice report to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `TaxInvoiceReport|error`

**Sample code:**

```ballerina
TaxInvoiceReport result = check client->createTaxInvoiceReport({date: "2026-01-31", businessPlace: 1});
```

**Sample response:**

```json
{
  "TaxInvoiceReportNumber": "TIR-001",
  "Date": "2026-01-31",
  "BusinessPlace": 1,
  "BaseAmount": 10000.00
}
```

</details>

<details>
<summary>getTaxInvoiceReport</summary>

Retrieves a single TaxInvoiceReport by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `taxInvoiceReportNumber` | <code>string</code> | Yes | Key property 'TaxInvoiceReportNumber' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTaxInvoiceReportQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `TaxInvoiceReport|error`

**Sample code:**

```ballerina
TaxInvoiceReport report = check client->getTaxInvoiceReport("TIR-001");
```

**Sample response:**

```json
{
  "TaxInvoiceReportNumber": "TIR-001",
  "Date": "2026-01-31",
  "NTSApproval": "Approved"
}
```

</details>

<details>
<summary>deleteTaxInvoiceReport</summary>

Deletes the TaxInvoiceReport identified by the given key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `taxInvoiceReportNumber` | <code>string</code> | Yes | Key property 'TaxInvoiceReportNumber' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTaxInvoiceReport("TIR-001");
```

</details>

<details>
<summary>updateTaxInvoiceReport</summary>

Partially updates a TaxInvoiceReport using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `taxInvoiceReportNumber` | <code>string</code> | Yes | Key property 'TaxInvoiceReportNumber' (Edm.String) |
| `payload` | <code>TaxInvoiceReport</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTaxInvoiceReport("TIR-001", {nTSApprovalNo: "APPR-2026-01"});
```

</details>

<details>
<summary>taxInvoiceReportCancelTaxInvoiceReport</summary>

Invokes the bound action 'CancelTaxInvoiceReport' on a TaxInvoiceReport entity (binding type TaxInvoiceReport) to cancel the tax invoice report; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `taxInvoiceReportNumber` | <code>string</code> | Yes | Key property 'TaxInvoiceReportNumber' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->taxInvoiceReportCancelTaxInvoiceReport("TIR-001");
```

</details>

#### AccountSegmentationCategories

<details>
<summary>listAccountSegmentationCategories</summary>

Queries the AccountSegmentationCategories collection and returns a page of entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAccountSegmentationCategoriesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer: odata.maxpagesize=100`) |
| `queries` | <code>ListAccountSegmentationCategoriesQueries</code> | No | OData query options such as `$filter`, `$select`, `$top`, `$skip`, `$orderby`, `$expand`, `$inlinecount` |

**Returns:** `AccountSegmentationCategoriesCollectionResponse|error`

**Sample code:**

```ballerina
AccountSegmentationCategoriesCollectionResponse response = check client->listAccountSegmentationCategories();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#AccountSegmentationCategories",
  "value": [
    {
      "SegmentID": 1,
      "Code": "100",
      "Name": "Head Office",
      "ShortName": "HO"
    }
  ]
}
```

</details>

<details>
<summary>createAccountSegmentationCategories</summary>

Creates a new AccountSegmentationCategory and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AccountSegmentationCategory</code> | Yes | Request payload representing the account segmentation category to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AccountSegmentationCategory|error`

**Sample code:**

```ballerina
AccountSegmentationCategory result = check client->createAccountSegmentationCategories({SegmentID: 1, Code: "100", Name: "Head Office"});
```

**Sample response:**

```json
{
  "SegmentID": 1,
  "Code": "100",
  "Name": "Head Office",
  "ShortName": "HO"
}
```

</details>

<details>
<summary>getAccountSegmentationCategories</summary>

Retrieves a single AccountSegmentationCategory by its composite key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `segmentID` | <code>int:Signed32</code> | Yes | Composite key part 'SegmentID' (Edm.Int32) |
| `code` | <code>string</code> | Yes | Composite key part 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAccountSegmentationCategoriesQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `AccountSegmentationCategory|error`

**Sample code:**

```ballerina
AccountSegmentationCategory category = check client->getAccountSegmentationCategories(1, "100");
```

**Sample response:**

```json
{
  "SegmentID": 1,
  "Code": "100",
  "Name": "Head Office"
}
```

</details>

<details>
<summary>deleteAccountSegmentationCategories</summary>

Deletes the AccountSegmentationCategory identified by the given composite key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `segmentID` | <code>int:Signed32</code> | Yes | Composite key part 'SegmentID' (Edm.Int32) |
| `code` | <code>string</code> | Yes | Composite key part 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAccountSegmentationCategories(1, "100");
```

</details>

<details>
<summary>updateAccountSegmentationCategories</summary>

Partially updates an AccountSegmentationCategory using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `segmentID` | <code>int:Signed32</code> | Yes | Composite key part 'SegmentID' (Edm.Int32) |
| `code` | <code>string</code> | Yes | Composite key part 'Code' (Edm.String) |
| `payload` | <code>AccountSegmentationCategory</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAccountSegmentationCategories(1, "100", {Name: "Headquarters"});
```

</details>

#### ChartOfAccounts

<details>
<summary>listChartOfAccounts</summary>

Queries the ChartOfAccounts collection and returns a page of entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListChartOfAccountsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer: odata.maxpagesize=100`) |
| `queries` | <code>ListChartOfAccountsQueries</code> | No | OData query options such as `$filter`, `$select`, `$top`, `$skip`, `$orderby`, `$expand`, `$inlinecount` |

**Returns:** `ChartOfAccountsCollectionResponse|error`

**Sample code:**

```ballerina
ChartOfAccountsCollectionResponse response = check client->listChartOfAccounts();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#ChartOfAccounts",
  "value": [
    {
      "Code": "100000",
      "Name": "Cash on Hand",
      "Balance": 15000.00,
      "ActiveAccount": "tYES",
      "AccountLevel": 3
    }
  ]
}
```

</details>

<details>
<summary>createChartOfAccounts</summary>

Creates a new ChartOfAccount and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ChartOfAccount</code> | Yes | Request payload representing the G/L account to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ChartOfAccount|error`

**Sample code:**

```ballerina
ChartOfAccount result = check client->createChartOfAccounts({Code: "100000", Name: "Cash on Hand"});
```

**Sample response:**

```json
{
  "Code": "100000",
  "Name": "Cash on Hand",
  "ActiveAccount": "tYES",
  "AccountLevel": 3
}
```

</details>

<details>
<summary>getChartOfAccounts</summary>

Retrieves a single ChartOfAccount by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetChartOfAccountsQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `ChartOfAccount|error`

**Sample code:**

```ballerina
ChartOfAccount account = check client->getChartOfAccounts("100000");
```

**Sample response:**

```json
{
  "Code": "100000",
  "Name": "Cash on Hand",
  "Balance": 15000.00
}
```

</details>

<details>
<summary>deleteChartOfAccounts</summary>

Deletes the ChartOfAccount identified by the given key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteChartOfAccounts("100000");
```

</details>

<details>
<summary>updateChartOfAccounts</summary>

Partially updates a ChartOfAccount using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>ChartOfAccount</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateChartOfAccounts("100000", {Name: "Petty Cash"});
```

</details>

#### DeductionTaxGroups

<details>
<summary>listDeductionTaxGroups</summary>

Queries the DeductionTaxGroups collection and returns a page of entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDeductionTaxGroupsHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer: odata.maxpagesize=100`) |
| `queries` | <code>ListDeductionTaxGroupsQueries</code> | No | OData query options such as `$filter`, `$select`, `$top`, `$skip`, `$orderby`, `$expand`, `$inlinecount` |

**Returns:** `DeductionTaxGroupsCollectionResponse|error`

**Sample code:**

```ballerina
DeductionTaxGroupsCollectionResponse response = check client->listDeductionTaxGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#DeductionTaxGroups",
  "value": [
    {
      "GroupKey": 1,
      "GroupCode": "dtgcPaidServices",
      "GroupName": "Paid Services",
      "MaxRedin": 0.0
    }
  ]
}
```

</details>

<details>
<summary>createDeductionTaxGroups</summary>

Creates a new DeductionTaxGroup and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DeductionTaxGroup</code> | Yes | Request payload representing the deduction tax group to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DeductionTaxGroup|error`

**Sample code:**

```ballerina
DeductionTaxGroup result = check client->createDeductionTaxGroups({GroupName: "Paid Services", GroupCode: "dtgcPaidServices"});
```

**Sample response:**

```json
{
  "GroupKey": 1,
  "GroupCode": "dtgcPaidServices",
  "GroupName": "Paid Services"
}
```

</details>

<details>
<summary>getDeductionTaxGroups</summary>

Retrieves a single DeductionTaxGroup by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `groupKey` | <code>int:Signed32</code> | Yes | Key property 'GroupKey' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDeductionTaxGroupsQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `DeductionTaxGroup|error`

**Sample code:**

```ballerina
DeductionTaxGroup group = check client->getDeductionTaxGroups(1);
```

**Sample response:**

```json
{
  "GroupKey": 1,
  "GroupCode": "dtgcPaidServices",
  "GroupName": "Paid Services"
}
```

</details>

<details>
<summary>deleteDeductionTaxGroups</summary>

Deletes the DeductionTaxGroup identified by the given key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `groupKey` | <code>int:Signed32</code> | Yes | Key property 'GroupKey' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDeductionTaxGroups(1);
```

</details>

<details>
<summary>updateDeductionTaxGroups</summary>

Partially updates a DeductionTaxGroup using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `groupKey` | <code>int:Signed32</code> | Yes | Key property 'GroupKey' (Edm.Int32) |
| `payload` | <code>DeductionTaxGroup</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDeductionTaxGroups(1, {GroupName: "Professional Services"});
```

</details>

#### SalesTaxAuthoritiesTypes

<details>
<summary>listSalesTaxAuthoritiesTypes</summary>

Queries the SalesTaxAuthoritiesTypes collection and returns a page of entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListSalesTaxAuthoritiesTypesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer: odata.maxpagesize=100`) |
| `queries` | <code>ListSalesTaxAuthoritiesTypesQueries</code> | No | OData query options such as `$filter`, `$select`, `$top`, `$skip`, `$orderby`, `$expand`, `$inlinecount` |

**Returns:** `SalesTaxAuthoritiesTypesCollectionResponse|error`

**Sample code:**

```ballerina
SalesTaxAuthoritiesTypesCollectionResponse response = check client->listSalesTaxAuthoritiesTypes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#SalesTaxAuthoritiesTypes",
  "value": [
    {
      "Numerator": 1,
      "Name": "State",
      "VAT": "tNO",
      "TaxCreditControl": "tYES"
    }
  ]
}
```

</details>

<details>
<summary>createSalesTaxAuthoritiesTypes</summary>

Creates a new SalesTaxAuthoritiesType and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SalesTaxAuthoritiesType</code> | Yes | Request payload representing the sales tax authorities type to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `SalesTaxAuthoritiesType|error`

**Sample code:**

```ballerina
SalesTaxAuthoritiesType result = check client->createSalesTaxAuthoritiesTypes({Name: "State"});
```

**Sample response:**

```json
{
  "Numerator": 1,
  "Name": "State",
  "VAT": "tNO"
}
```

</details>

<details>
<summary>getSalesTaxAuthoritiesTypes</summary>

Retrieves a single SalesTaxAuthoritiesType by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSalesTaxAuthoritiesTypesQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `SalesTaxAuthoritiesType|error`

**Sample code:**

```ballerina
SalesTaxAuthoritiesType taxType = check client->getSalesTaxAuthoritiesTypes(1);
```

**Sample response:**

```json
{
  "Numerator": 1,
  "Name": "State",
  "TaxCreditControl": "tYES"
}
```

</details>

<details>
<summary>deleteSalesTaxAuthoritiesTypes</summary>

Deletes the SalesTaxAuthoritiesType identified by the given key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSalesTaxAuthoritiesTypes(1);
```

</details>

<details>
<summary>updateSalesTaxAuthoritiesTypes</summary>

Partially updates a SalesTaxAuthoritiesType using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `payload` | <code>SalesTaxAuthoritiesType</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSalesTaxAuthoritiesTypes(1, {Name: "County"});
```

</details>

#### WTaxTypeCodes

<details>
<summary>wTaxTypeCodeServiceGetWTaxTypeCodeList</summary>

Invokes the WTaxTypeCodeService_GetWTaxTypeCodeList service action and returns the withholding tax type code list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_27|error`

**Sample code:**

```ballerina
inline_response_200_27 result = check client->wTaxTypeCodeServiceGetWTaxTypeCodeList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Collection(SAPB1.WTaxTypeCodeParams)",
  "value": [
    {
      "Code": 1
    }
  ]
}
```

</details>

<details>
<summary>listWTaxTypeCodes</summary>

Queries the WTaxTypeCodes collection and returns a page of entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWTaxTypeCodesHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer: odata.maxpagesize=100`) |
| `queries` | <code>ListWTaxTypeCodesQueries</code> | No | OData query options such as `$filter`, `$select`, `$top`, `$skip`, `$orderby`, `$expand`, `$inlinecount` |

**Returns:** `WTaxTypeCodesCollectionResponse|error`

**Sample code:**

```ballerina
WTaxTypeCodesCollectionResponse response = check client->listWTaxTypeCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#WTaxTypeCodes",
  "value": [
    {
      "Code": 1,
      "Description": "Withholding tax type 1"
    }
  ]
}
```

</details>

<details>
<summary>createWTaxTypeCodes</summary>

Creates a new WTaxTypeCode and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WTaxTypeCode</code> | Yes | Request payload representing the withholding tax type code to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WTaxTypeCode|error`

**Sample code:**

```ballerina
WTaxTypeCode result = check client->createWTaxTypeCodes({code: 1, description: "Withholding tax type 1"});
```

**Sample response:**

```json
{
  "Code": 1,
  "Description": "Withholding tax type 1"
}
```

</details>

<details>
<summary>getWTaxTypeCodes</summary>

Retrieves a single WTaxTypeCode by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWTaxTypeCodesQueries</code> | No | OData query options such as `$select` and `$expand` |

**Returns:** `WTaxTypeCode|error`

**Sample code:**

```ballerina
WTaxTypeCode taxTypeCode = check client->getWTaxTypeCodes(1);
```

**Sample response:**

```json
{
  "Code": 1,
  "Description": "Withholding tax type 1"
}
```

</details>

<details>
<summary>deleteWTaxTypeCodes</summary>

Deletes the WTaxTypeCode identified by the given key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWTaxTypeCodes(1);
```

</details>

<details>
<summary>updateWTaxTypeCodes</summary>

Partially updates a WTaxTypeCode using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>WTaxTypeCode</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWTaxTypeCodes(1, {description: "Updated withholding tax type"});
```

</details>
#### AccountSegmentations

<details>
<summary>listAccountSegmentations</summary>

Queries the AccountSegmentations collection and returns a page of account segmentation entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListAccountSegmentationsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListAccountSegmentationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `AccountSegmentationsCollectionResponse|error`

**Sample code:**

```ballerina
AccountSegmentationsCollectionResponse response = check client->listAccountSegmentations();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#AccountSegmentations",
  "value": [
    {
      "Numerator": 1,
      "Name": "Natural Account",
      "Size": 4,
      "Type": "ast_Numeric"
    }
  ],
  "odata.nextLink": "AccountSegmentations?$skip=20"
}
```

</details>

<details>
<summary>createAccountSegmentations</summary>

Creates a new AccountSegmentation entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AccountSegmentation</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AccountSegmentation|error`

**Sample code:**

```ballerina
AccountSegmentation result = check client->createAccountSegmentations({Name: "Region", Size: 3, Type: "ast_Alphanumeric"});
```

**Sample response:**

```json
{
  "Numerator": 2,
  "Name": "Region",
  "Size": 3,
  "Type": "ast_Alphanumeric"
}
```

</details>

<details>
<summary>getAccountSegmentations</summary>

Retrieves a single AccountSegmentation entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetAccountSegmentationsQueries</code> | No | Queries to be sent with the request |

**Returns:** `AccountSegmentation|error`

**Sample code:**

```ballerina
AccountSegmentation result = check client->getAccountSegmentations(1);
```

**Sample response:**

```json
{
  "Numerator": 1,
  "Name": "Natural Account",
  "Size": 4,
  "Type": "ast_Numeric"
}
```

</details>

<details>
<summary>deleteAccountSegmentations</summary>

Deletes an AccountSegmentation entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteAccountSegmentations(2);
```

</details>

<details>
<summary>updateAccountSegmentations</summary>

Partially updates an AccountSegmentation entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `payload` | <code>AccountSegmentation</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateAccountSegmentations(1, {Name: "Natural Account - Updated"});
```

</details>

#### BudgetDistributions

<details>
<summary>listBudgetDistributions</summary>

Queries the BudgetDistributions collection and returns a page of budget distribution entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBudgetDistributionsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBudgetDistributionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `BudgetDistributionsCollectionResponse|error`

**Sample code:**

```ballerina
BudgetDistributionsCollectionResponse response = check client->listBudgetDistributions();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#BudgetDistributions",
  "value": [
    {
      "DivisionCode": 1,
      "Description": "Equal Distribution",
      "BudgetAmount": 120000.0,
      "January": 10000.0,
      "February": 10000.0,
      "March": 10000.0
    }
  ],
  "odata.nextLink": "BudgetDistributions?$skip=20"
}
```

</details>

<details>
<summary>createBudgetDistributions</summary>

Creates a new BudgetDistribution entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BudgetDistribution</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BudgetDistribution|error`

**Sample code:**

```ballerina
BudgetDistribution result = check client->createBudgetDistributions({Description: "Ascending Order", BudgetAmount: 120000.0});
```

**Sample response:**

```json
{
  "DivisionCode": 3,
  "Description": "Ascending Order",
  "BudgetAmount": 120000.0,
  "January": 5000.0,
  "February": 7000.0,
  "March": 9000.0
}
```

</details>

<details>
<summary>getBudgetDistributions</summary>

Retrieves a single BudgetDistribution entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `divisionCode` | <code>int:Signed32</code> | Yes | Key property 'DivisionCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBudgetDistributionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `BudgetDistribution|error`

**Sample code:**

```ballerina
BudgetDistribution result = check client->getBudgetDistributions(1);
```

**Sample response:**

```json
{
  "DivisionCode": 1,
  "Description": "Equal Distribution",
  "BudgetAmount": 120000.0,
  "January": 10000.0,
  "February": 10000.0,
  "March": 10000.0
}
```

</details>

<details>
<summary>deleteBudgetDistributions</summary>

Deletes a BudgetDistribution entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `divisionCode` | <code>int:Signed32</code> | Yes | Key property 'DivisionCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBudgetDistributions(3);
```

</details>

<details>
<summary>updateBudgetDistributions</summary>

Partially updates a BudgetDistribution entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `divisionCode` | <code>int:Signed32</code> | Yes | Key property 'DivisionCode' (Edm.Int32) |
| `payload` | <code>BudgetDistribution</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBudgetDistributions(1, {Description: "Updated Distribution"});
```

</details>

#### CashFlowLineItems

<details>
<summary>listCashFlowLineItems</summary>

Queries the CashFlowLineItems collection and returns a page of cash flow line item entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCashFlowLineItemsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCashFlowLineItemsQueries</code> | No | Queries to be sent with the request |

**Returns:** `CashFlowLineItemsCollectionResponse|error`

**Sample code:**

```ballerina
CashFlowLineItemsCollectionResponse response = check client->listCashFlowLineItems();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#CashFlowLineItems",
  "value": [
    {
      "LineItemID": 1,
      "LineItemName": "Operating Activities",
      "Level": 1,
      "ParentArticle": 0,
      "Drawer": 1,
      "ActiveLineItem": "tYES"
    }
  ],
  "odata.nextLink": "CashFlowLineItems?$skip=20"
}
```

</details>

<details>
<summary>createCashFlowLineItems</summary>

Creates a new CashFlowLineItem entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CashFlowLineItem</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CashFlowLineItem|error`

**Sample code:**

```ballerina
CashFlowLineItem result = check client->createCashFlowLineItems({lineItemName: "Financing Activities", level: 1});
```

**Sample response:**

```json
{
  "LineItemID": 5,
  "LineItemName": "Financing Activities",
  "Level": 1,
  "ParentArticle": 0,
  "Drawer": 1,
  "ActiveLineItem": "tYES"
}
```

</details>

<details>
<summary>getCashFlowLineItems</summary>

Retrieves a single CashFlowLineItem entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `lineItemID` | <code>int:Signed32</code> | Yes | Key property 'LineItemID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCashFlowLineItemsQueries</code> | No | Queries to be sent with the request |

**Returns:** `CashFlowLineItem|error`

**Sample code:**

```ballerina
CashFlowLineItem result = check client->getCashFlowLineItems(1);
```

**Sample response:**

```json
{
  "LineItemID": 1,
  "LineItemName": "Operating Activities",
  "Level": 1,
  "ParentArticle": 0,
  "Drawer": 1,
  "ActiveLineItem": "tYES"
}
```

</details>

<details>
<summary>deleteCashFlowLineItems</summary>

Deletes a CashFlowLineItem entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `lineItemID` | <code>int:Signed32</code> | Yes | Key property 'LineItemID' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCashFlowLineItems(5);
```

</details>

<details>
<summary>updateCashFlowLineItems</summary>

Partially updates a CashFlowLineItem entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `lineItemID` | <code>int:Signed32</code> | Yes | Key property 'LineItemID' (Edm.Int32) |
| `payload` | <code>CashFlowLineItem</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCashFlowLineItems(1, {lineItemName: "Operating Activities - Updated"});
```

</details>

<details>
<summary>cashFlowLineItemsServiceGetCashFlowLineItemList</summary>

Invokes the CashFlowLineItemsService_GetCashFlowLineItemList operation and returns the list of cash flow line items.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_3|error`

**Sample code:**

```ballerina
inline_response_200_3 result = check client->cashFlowLineItemsServiceGetCashFlowLineItemList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.CashFlowLineItemParams)",
  "value": [
    {
      "LineItemID": 1,
      "LineItemName": "Operating Activities"
    }
  ]
}
```

</details>

#### ClosingDateProcedure

<details>
<summary>listClosingDateProcedure</summary>

Queries the ClosingDateProcedure collection and returns a page of closing date procedure entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListClosingDateProcedureHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListClosingDateProcedureQueries</code> | No | Queries to be sent with the request |

**Returns:** `ClosingDateProcedureCollectionResponse|error`

**Sample code:**

```ballerina
ClosingDateProcedureCollectionResponse response = check client->listClosingDateProcedure();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#ClosingDateProcedure",
  "value": [
    {
      "ClosingDateNum": 1,
      "ClosingDateCode": "CD01",
      "BaselineDate": "bocpdbld_PostingDate",
      "DueMonth": "bocpddm_MonthEnd",
      "ExtraMonth": 1,
      "ExtraDay": 15
    }
  ],
  "odata.nextLink": "ClosingDateProcedure?$skip=20"
}
```

</details>

<details>
<summary>createClosingDateProcedure</summary>

Creates a new ClosingDateProcedure entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>ClosingDateProcedure</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `ClosingDateProcedure|error`

**Sample code:**

```ballerina
ClosingDateProcedure result = check client->createClosingDateProcedure({ClosingDateCode: "CD02", BaselineDate: "bocpdbld_PostingDate", DueMonth: "bocpddm_MonthEnd"});
```

**Sample response:**

```json
{
  "ClosingDateNum": 2,
  "ClosingDateCode": "CD02",
  "BaselineDate": "bocpdbld_PostingDate",
  "DueMonth": "bocpddm_MonthEnd",
  "ExtraMonth": 0,
  "ExtraDay": 0
}
```

</details>

<details>
<summary>getClosingDateProcedure</summary>

Retrieves a single ClosingDateProcedure entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `closingDateNum` | <code>int:Signed32</code> | Yes | Key property 'ClosingDateNum' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetClosingDateProcedureQueries</code> | No | Queries to be sent with the request |

**Returns:** `ClosingDateProcedure|error`

**Sample code:**

```ballerina
ClosingDateProcedure result = check client->getClosingDateProcedure(1);
```

**Sample response:**

```json
{
  "ClosingDateNum": 1,
  "ClosingDateCode": "CD01",
  "BaselineDate": "bocpdbld_PostingDate",
  "DueMonth": "bocpddm_MonthEnd",
  "ExtraMonth": 1,
  "ExtraDay": 15
}
```

</details>

<details>
<summary>deleteClosingDateProcedure</summary>

Deletes a ClosingDateProcedure entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `closingDateNum` | <code>int:Signed32</code> | Yes | Key property 'ClosingDateNum' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteClosingDateProcedure(2);
```

</details>

<details>
<summary>updateClosingDateProcedure</summary>

Partially updates a ClosingDateProcedure entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `closingDateNum` | <code>int:Signed32</code> | Yes | Key property 'ClosingDateNum' (Edm.Int32) |
| `payload` | <code>ClosingDateProcedure</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateClosingDateProcedure(1, {ExtraDay: 20});
```

</details>

#### DeductionTaxHierarchies

<details>
<summary>listDeductionTaxHierarchies</summary>

Queries the DeductionTaxHierarchies collection and returns a page of deduction tax hierarchy entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDeductionTaxHierarchiesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListDeductionTaxHierarchiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `DeductionTaxHierarchiesCollectionResponse|error`

**Sample code:**

```ballerina
DeductionTaxHierarchiesCollectionResponse response = check client->listDeductionTaxHierarchies();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#DeductionTaxHierarchies",
  "value": [
    {
      "AbsEntry": 1,
      "BPCode": "C20000",
      "HierarchyCode": "H01",
      "HierarchyName": "Standard Hierarchy",
      "ValidFrom": "2026-01-01",
      "ValidUntil": "2026-12-31",
      "DeductionPercent": 5.0,
      "MaximumTotal": 10000.0
    }
  ],
  "odata.nextLink": "DeductionTaxHierarchies?$skip=20"
}
```

</details>

<details>
<summary>createDeductionTaxHierarchies</summary>

Creates a new DeductionTaxHierarchy entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DeductionTaxHierarchy</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DeductionTaxHierarchy|error`

**Sample code:**

```ballerina
DeductionTaxHierarchy result = check client->createDeductionTaxHierarchies({BPCode: "C20000", HierarchyCode: "H02", HierarchyName: "Reduced Rate", DeductionPercent: 2.5});
```

**Sample response:**

```json
{
  "AbsEntry": 2,
  "BPCode": "C20000",
  "HierarchyCode": "H02",
  "HierarchyName": "Reduced Rate",
  "DeductionPercent": 2.5,
  "MaximumTotal": 0.0
}
```

</details>

<details>
<summary>getDeductionTaxHierarchies</summary>

Retrieves a single DeductionTaxHierarchy entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDeductionTaxHierarchiesQueries</code> | No | Queries to be sent with the request |

**Returns:** `DeductionTaxHierarchy|error`

**Sample code:**

```ballerina
DeductionTaxHierarchy result = check client->getDeductionTaxHierarchies(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "BPCode": "C20000",
  "HierarchyCode": "H01",
  "HierarchyName": "Standard Hierarchy",
  "ValidFrom": "2026-01-01",
  "ValidUntil": "2026-12-31",
  "DeductionPercent": 5.0,
  "MaximumTotal": 10000.0
}
```

</details>

<details>
<summary>deleteDeductionTaxHierarchies</summary>

Deletes a DeductionTaxHierarchy entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDeductionTaxHierarchies(2);
```

</details>

<details>
<summary>updateDeductionTaxHierarchies</summary>

Partially updates a DeductionTaxHierarchy entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>DeductionTaxHierarchy</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDeductionTaxHierarchies(1, {DeductionPercent: 7.5});
```

</details>

#### Dimensions

<details>
<summary>listDimensions</summary>

Queries the Dimensions collection and returns a page of cost accounting dimension entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDimensionsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListDimensionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `DimensionsCollectionResponse|error`

**Sample code:**

```ballerina
DimensionsCollectionResponse response = check client->listDimensions();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Dimensions",
  "value": [
    {
      "DimensionCode": 1,
      "DimensionName": "Department",
      "IsActive": "tYES",
      "DimensionDescription": "Departmental cost dimension"
    }
  ],
  "odata.nextLink": "Dimensions?$skip=20"
}
```

</details>

<details>
<summary>createDimensions</summary>

Creates a new Dimension entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Dimension</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Dimension|error`

**Sample code:**

```ballerina
Dimension result = check client->createDimensions({DimensionName: "Project", IsActive: "tYES"});
```

**Sample response:**

```json
{
  "DimensionCode": 2,
  "DimensionName": "Project",
  "IsActive": "tYES",
  "DimensionDescription": ""
}
```

</details>

<details>
<summary>getDimensions</summary>

Retrieves a single Dimension entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `dimensionCode` | <code>int:Signed32</code> | Yes | Key property 'DimensionCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDimensionsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Dimension|error`

**Sample code:**

```ballerina
Dimension result = check client->getDimensions(1);
```

**Sample response:**

```json
{
  "DimensionCode": 1,
  "DimensionName": "Department",
  "IsActive": "tYES",
  "DimensionDescription": "Departmental cost dimension"
}
```

</details>

<details>
<summary>deleteDimensions</summary>

Deletes a Dimension entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `dimensionCode` | <code>int:Signed32</code> | Yes | Key property 'DimensionCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDimensions(2);
```

</details>

<details>
<summary>updateDimensions</summary>

Partially updates a Dimension entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `dimensionCode` | <code>int:Signed32</code> | Yes | Key property 'DimensionCode' (Edm.Int32) |
| `payload` | <code>Dimension</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDimensions(1, {DimensionDescription: "Updated description"});
```

</details>

<details>
<summary>dimensionsServiceGetDimensionList</summary>

Invokes the DimensionsService_GetDimensionList operation and returns the list of dimensions.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_9|error`

**Sample code:**

```ballerina
inline_response_200_9 result = check client->dimensionsServiceGetDimensionList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.DimensionParams)",
  "value": [
    {
      "DimensionCode": 1,
      "DimensionName": "Department"
    }
  ]
}
```

</details>

#### JournalEntryDocumentTypes

<details>
<summary>journalEntryDocumentTypeServiceGetList</summary>

Invokes the JournalEntryDocumentTypeService_GetList operation and returns the list of journal entry document types.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_13|error`

**Sample code:**

```ballerina
inline_response_200_13 result = check client->journalEntryDocumentTypeServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.JournalEntryDocumentTypeParams)",
  "value": [
    {
      "JournalEntryType": "30",
      "ShortName": "JE",
      "DocTypeDescription": "Journal Entry"
    }
  ]
}
```

</details>

<details>
<summary>listJournalEntryDocumentTypes</summary>

Queries the JournalEntryDocumentTypes collection and returns a page of journal entry document type entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListJournalEntryDocumentTypesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListJournalEntryDocumentTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `JournalEntryDocumentTypesCollectionResponse|error`

**Sample code:**

```ballerina
JournalEntryDocumentTypesCollectionResponse response = check client->listJournalEntryDocumentTypes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#JournalEntryDocumentTypes",
  "value": [
    {
      "JournalEntryType": "30",
      "ShortName": "JE",
      "DocTypeDescription": "Journal Entry"
    }
  ],
  "odata.nextLink": "JournalEntryDocumentTypes?$skip=20"
}
```

</details>

<details>
<summary>createJournalEntryDocumentTypes</summary>

Creates a new JournalEntryDocumentType entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>JournalEntryDocumentType</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `JournalEntryDocumentType|error`

**Sample code:**

```ballerina
JournalEntryDocumentType result = check client->createJournalEntryDocumentTypes({journalEntryType: "40", shortName: "AP", docTypeDescription: "AP Invoice"});
```

**Sample response:**

```json
{
  "JournalEntryType": "40",
  "ShortName": "AP",
  "DocTypeDescription": "AP Invoice"
}
```

</details>

<details>
<summary>getJournalEntryDocumentTypes</summary>

Retrieves a single JournalEntryDocumentType entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `journalEntryType` | <code>string</code> | Yes | Key property 'JournalEntryType' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetJournalEntryDocumentTypesQueries</code> | No | Queries to be sent with the request |

**Returns:** `JournalEntryDocumentType|error`

**Sample code:**

```ballerina
JournalEntryDocumentType result = check client->getJournalEntryDocumentTypes("30");
```

**Sample response:**

```json
{
  "JournalEntryType": "30",
  "ShortName": "JE",
  "DocTypeDescription": "Journal Entry"
}
```

</details>

<details>
<summary>deleteJournalEntryDocumentTypes</summary>

Deletes a JournalEntryDocumentType entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `journalEntryType` | <code>string</code> | Yes | Key property 'JournalEntryType' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteJournalEntryDocumentTypes("40");
```

</details>

<details>
<summary>updateJournalEntryDocumentTypes</summary>

Partially updates a JournalEntryDocumentType entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `journalEntryType` | <code>string</code> | Yes | Key property 'JournalEntryType' (Edm.String) |
| `payload` | <code>JournalEntryDocumentType</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateJournalEntryDocumentTypes("30", {docTypeDescription: "Manual Journal Entry"});
```

</details>

#### RecurringTransactionTemplates

<details>
<summary>listRecurringTransactionTemplates</summary>

Queries the RecurringTransactionTemplates collection and returns a page of recurring transaction template entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListRecurringTransactionTemplatesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRecurringTransactionTemplatesQueries</code> | No | Queries to be sent with the request |

**Returns:** `RecurringTransactionTemplatesCollectionResponse|error`

**Sample code:**

```ballerina
RecurringTransactionTemplatesCollectionResponse response = check client->listRecurringTransactionTemplates();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#RecurringTransactionTemplates",
  "value": [
    {
      "AbsoluteEntry": 1,
      "TemplateCode": "RT01",
      "TemplateDescription": "Monthly rent posting",
      "DocumentObjectType": "dc_ArInvoice",
      "Frequency": "rttf_Monthly",
      "Remind": "rttr_On1",
      "CardCode": "C20000",
      "StartDate": "2026-01-01",
      "EndDate": "2026-12-31",
      "DraftEntry": 12,
      "PriceUpdate": "tNO"
    }
  ],
  "odata.nextLink": "RecurringTransactionTemplates?$skip=20"
}
```

</details>

<details>
<summary>createRecurringTransactionTemplates</summary>

Creates a new RecurringTransactionTemplate entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>RecurringTransactionTemplate</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `RecurringTransactionTemplate|error`

**Sample code:**

```ballerina
RecurringTransactionTemplate result = check client->createRecurringTransactionTemplates({templateCode: "RT02", templateDescription: "Quarterly service invoice", frequency: "rttf_Quarterly", cardCode: "C20000"});
```

**Sample response:**

```json
{
  "AbsoluteEntry": 2,
  "TemplateCode": "RT02",
  "TemplateDescription": "Quarterly service invoice",
  "Frequency": "rttf_Quarterly",
  "CardCode": "C20000",
  "PriceUpdate": "tNO"
}
```

</details>

<details>
<summary>getRecurringTransactionTemplates</summary>

Retrieves a single RecurringTransactionTemplate entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRecurringTransactionTemplatesQueries</code> | No | Queries to be sent with the request |

**Returns:** `RecurringTransactionTemplate|error`

**Sample code:**

```ballerina
RecurringTransactionTemplate result = check client->getRecurringTransactionTemplates(1);
```

**Sample response:**

```json
{
  "AbsoluteEntry": 1,
  "TemplateCode": "RT01",
  "TemplateDescription": "Monthly rent posting",
  "Frequency": "rttf_Monthly",
  "CardCode": "C20000",
  "StartDate": "2026-01-01",
  "EndDate": "2026-12-31",
  "PriceUpdate": "tNO"
}
```

</details>

<details>
<summary>deleteRecurringTransactionTemplates</summary>

Deletes a RecurringTransactionTemplate entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteRecurringTransactionTemplates(2);
```

</details>

<details>
<summary>updateRecurringTransactionTemplates</summary>

Partially updates a RecurringTransactionTemplate entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsoluteEntry' (Edm.Int32) |
| `payload` | <code>RecurringTransactionTemplate</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateRecurringTransactionTemplates(1, {templateDescription: "Monthly rent posting - updated"});
```

</details>

<details>
<summary>recurringTransactionTemplatesServiceGetList</summary>

Invokes the RecurringTransactionTemplatesService_GetList operation and returns the list of recurring transaction templates.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_20|error`

**Sample code:**

```ballerina
inline_response_200_20 result = check client->recurringTransactionTemplatesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.RecurringTransactionTemplateParams)",
  "value": [
    {
      "AbsoluteEntry": 1
    }
  ]
}
```

</details>

#### SalesTaxCodes

<details>
<summary>listSalesTaxCodes</summary>

Queries the SalesTaxCodes collection and returns a page of sales tax code entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListSalesTaxCodesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSalesTaxCodesQueries</code> | No | Queries to be sent with the request |

**Returns:** `SalesTaxCodesCollectionResponse|error`

**Sample code:**

```ballerina
SalesTaxCodesCollectionResponse response = check client->listSalesTaxCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#SalesTaxCodes",
  "value": [
    {
      "Code": "NY",
      "Name": "New York Tax",
      "Rate": 8.875,
      "ValidForAR": "tYES",
      "ValidForAP": "tYES",
      "Freight": "tNO",
      "Inactive": "tNO"
    }
  ],
  "odata.nextLink": "SalesTaxCodes?$skip=20"
}
```

</details>

<details>
<summary>createSalesTaxCodes</summary>

Creates a new SalesTaxCode entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SalesTaxCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `SalesTaxCode|error`

**Sample code:**

```ballerina
SalesTaxCode result = check client->createSalesTaxCodes({Code: "CA", Name: "California Tax", Rate: 7.25});
```

**Sample response:**

```json
{
  "Code": "CA",
  "Name": "California Tax",
  "Rate": 7.25,
  "ValidForAR": "tYES",
  "ValidForAP": "tYES",
  "Inactive": "tNO"
}
```

</details>

<details>
<summary>getSalesTaxCodes</summary>

Retrieves a single SalesTaxCode entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSalesTaxCodesQueries</code> | No | Queries to be sent with the request |

**Returns:** `SalesTaxCode|error`

**Sample code:**

```ballerina
SalesTaxCode result = check client->getSalesTaxCodes("NY");
```

**Sample response:**

```json
{
  "Code": "NY",
  "Name": "New York Tax",
  "Rate": 8.875,
  "ValidForAR": "tYES",
  "ValidForAP": "tYES",
  "Freight": "tNO",
  "Inactive": "tNO"
}
```

</details>

<details>
<summary>deleteSalesTaxCodes</summary>

Deletes a SalesTaxCode entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSalesTaxCodes("CA");
```

</details>

<details>
<summary>updateSalesTaxCodes</summary>

Partially updates a SalesTaxCode entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>SalesTaxCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSalesTaxCodes("NY", {Rate: 9.0});
```

</details>

#### TaxWebSites

<details>
<summary>listTaxWebSites</summary>

Queries the TaxWebSites collection and returns a page of tax web site entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListTaxWebSitesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTaxWebSitesQueries</code> | No | Queries to be sent with the request |

**Returns:** `TaxWebSitesCollectionResponse|error`

**Sample code:**

```ballerina
TaxWebSitesCollectionResponse response = check client->listTaxWebSites();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#TaxWebSites",
  "value": [
    {
      "AbsEntry": 1,
      "WebSiteName": "National Tax Portal",
      "WebSiteURL": "https://tax.example.gov",
      "Description": "Primary tax reporting site"
    }
  ],
  "odata.nextLink": "TaxWebSites?$skip=20"
}
```

</details>

<details>
<summary>createTaxWebSites</summary>

Creates a new TaxWebSite entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TaxWebSite</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `TaxWebSite|error`

**Sample code:**

```ballerina
TaxWebSite result = check client->createTaxWebSites({webSiteName: "Regional Tax Portal", webSiteURL: "https://regional.tax.example.gov"});
```

**Sample response:**

```json
{
  "AbsEntry": 2,
  "WebSiteName": "Regional Tax Portal",
  "WebSiteURL": "https://regional.tax.example.gov",
  "Description": ""
}
```

</details>

<details>
<summary>getTaxWebSites</summary>

Retrieves a single TaxWebSite entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTaxWebSitesQueries</code> | No | Queries to be sent with the request |

**Returns:** `TaxWebSite|error`

**Sample code:**

```ballerina
TaxWebSite result = check client->getTaxWebSites(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "WebSiteName": "National Tax Portal",
  "WebSiteURL": "https://tax.example.gov",
  "Description": "Primary tax reporting site"
}
```

</details>

<details>
<summary>deleteTaxWebSites</summary>

Deletes a TaxWebSite entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTaxWebSites(2);
```

</details>

<details>
<summary>updateTaxWebSites</summary>

Partially updates a TaxWebSite entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>TaxWebSite</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTaxWebSites(1, {description: "Updated description"});
```

</details>

<details>
<summary>taxWebSitesSetAsDefault</summary>

Invokes the bound action 'SetAsDefault' on a TaxWebSite entity to mark it as the default web site; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->taxWebSitesSetAsDefault(1);
```

</details>

<details>
<summary>taxWebSitesServiceGetDefaultWebSite</summary>

Invokes the TaxWebSitesService_GetDefaultWebSite operation and returns the default tax web site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `TaxWebSiteParams|error`

**Sample code:**

```ballerina
TaxWebSiteParams result = check client->taxWebSitesServiceGetDefaultWebSite();
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "WebSiteName": "National Tax Portal"
}
```

</details>

<details>
<summary>taxWebSitesServiceGetTaxWebSiteList</summary>

Invokes the TaxWebSitesService_GetTaxWebSiteList operation and returns the list of tax web sites.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_25|error`

**Sample code:**

```ballerina
inline_response_200_25 result = check client->taxWebSitesServiceGetTaxWebSiteList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.TaxWebSiteParams)",
  "value": [
    {
      "AbsEntry": 1,
      "WebSiteName": "National Tax Portal"
    }
  ]
}
```

</details>

#### TransactionCodes

<details>
<summary>listTransactionCodes</summary>

Queries the TransactionCodes collection and returns a page of transaction code entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListTransactionCodesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTransactionCodesQueries</code> | No | Queries to be sent with the request |

**Returns:** `TransactionCodesCollectionResponse|error`

**Sample code:**

```ballerina
TransactionCodesCollectionResponse response = check client->listTransactionCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#TransactionCodes",
  "value": [
    {
      "Code": "TC01",
      "Description": "Month-end adjustment"
    }
  ],
  "odata.nextLink": "TransactionCodes?$skip=20"
}
```

</details>

<details>
<summary>createTransactionCodes</summary>

Creates a new TransactionCode entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TransactionCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `TransactionCode|error`

**Sample code:**

```ballerina
TransactionCode result = check client->createTransactionCodes({code: "TC02", description: "Accrual posting"});
```

**Sample response:**

```json
{
  "Code": "TC02",
  "Description": "Accrual posting"
}
```

</details>

<details>
<summary>getTransactionCodes</summary>

Retrieves a single TransactionCode entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTransactionCodesQueries</code> | No | Queries to be sent with the request |

**Returns:** `TransactionCode|error`

**Sample code:**

```ballerina
TransactionCode result = check client->getTransactionCodes("TC01");
```

**Sample response:**

```json
{
  "Code": "TC01",
  "Description": "Month-end adjustment"
}
```

</details>

<details>
<summary>deleteTransactionCodes</summary>

Deletes a TransactionCode entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTransactionCodes("TC02");
```

</details>

<details>
<summary>updateTransactionCodes</summary>

Partially updates a TransactionCode entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>TransactionCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTransactionCodes("TC01", {description: "Month-end adjustment - updated"});
```

</details>

<details>
<summary>transactionCodesServiceGetList</summary>

Invokes the TransactionCodesService_GetList operation and returns the list of transaction codes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_26|error`

**Sample code:**

```ballerina
inline_response_200_26 result = check client->transactionCodesServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.TransactionCodeParams)",
  "value": [
    {
      "Code": "TC01",
      "Description": "Month-end adjustment"
    }
  ]
}
```

</details>

#### WithholdingTaxCodes

<details>
<summary>listWithholdingTaxCodes</summary>

Queries the WithholdingTaxCodes collection and returns a page of withholding tax code entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListWithholdingTaxCodesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListWithholdingTaxCodesQueries</code> | No | Queries to be sent with the request |

**Returns:** `WithholdingTaxCodesCollectionResponse|error`

**Sample code:**

```ballerina
WithholdingTaxCodesCollectionResponse response = check client->listWithholdingTaxCodes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#WithholdingTaxCodes",
  "value": [
    {
      "WTCode": "W01",
      "WTName": "Standard Withholding",
      "Category": "wtcc_Payment",
      "BaseType": "wtcbt_Net",
      "BaseAmount": 100.0,
      "Account": "_SYS00000000101",
      "WithholdingType": "wt_IncomeTaxWithholding",
      "RoundingType": "rt_NoRounding"
    }
  ],
  "odata.nextLink": "WithholdingTaxCodes?$skip=20"
}
```

</details>

<details>
<summary>createWithholdingTaxCodes</summary>

Creates a new WithholdingTaxCode entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>WithholdingTaxCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `WithholdingTaxCode|error`

**Sample code:**

```ballerina
WithholdingTaxCode result = check client->createWithholdingTaxCodes({WTCode: "W02", WTName: "Invoice Withholding", Category: "wtcc_Invoice", BaseType: "wtcbt_Gross"});
```

**Sample response:**

```json
{
  "WTCode": "W02",
  "WTName": "Invoice Withholding",
  "Category": "wtcc_Invoice",
  "BaseType": "wtcbt_Gross",
  "BaseAmount": 100.0
}
```

</details>

<details>
<summary>getWithholdingTaxCodes</summary>

Retrieves a single WithholdingTaxCode entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `wTCode` | <code>string</code> | Yes | Key property 'WTCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetWithholdingTaxCodesQueries</code> | No | Queries to be sent with the request |

**Returns:** `WithholdingTaxCode|error`

**Sample code:**

```ballerina
WithholdingTaxCode result = check client->getWithholdingTaxCodes("W01");
```

**Sample response:**

```json
{
  "WTCode": "W01",
  "WTName": "Standard Withholding",
  "Category": "wtcc_Payment",
  "BaseType": "wtcbt_Net",
  "BaseAmount": 100.0,
  "Account": "_SYS00000000101",
  "WithholdingType": "wt_IncomeTaxWithholding",
  "RoundingType": "rt_NoRounding"
}
```

</details>

<details>
<summary>deleteWithholdingTaxCodes</summary>

Deletes a WithholdingTaxCode entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `wTCode` | <code>string</code> | Yes | Key property 'WTCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteWithholdingTaxCodes("W02");
```

</details>

<details>
<summary>updateWithholdingTaxCodes</summary>

Partially updates a WithholdingTaxCode entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `wTCode` | <code>string</code> | Yes | Key property 'WTCode' (Edm.String) |
| `payload` | <code>WithholdingTaxCode</code> | Yes | Request payload |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateWithholdingTaxCodes("W01", {WTName: "Standard Withholding - Updated"});
```

</details>
#### BudgetScenarios

<details>
<summary>listBudgetScenarios</summary>

Queries the BudgetScenarios collection and returns a page of budget scenario entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBudgetScenariosHeaders</code> | No | Headers to be sent with the request; supports `prefer` for Service Layer paging control (e.g. 'odata.maxpagesize=100') |
| `queries` | <code>ListBudgetScenariosQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `BudgetScenariosCollectionResponse|error`

**Sample code:**

```ballerina
BudgetScenariosCollectionResponse result = check client->listBudgetScenarios();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#BudgetScenarios",
  "value": [
    {
      "Numerator": 1,
      "Name": "Main Budget",
      "InitialRatioPercentage": 100.0,
      "StartofFiscalYear": "2026-01-01",
      "BasicBudget": 1
    }
  ]
}
```

</details>

<details>
<summary>createBudgetScenarios</summary>

Creates a new BudgetScenario entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BudgetScenario</code> | Yes | Request payload describing the budget scenario to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BudgetScenario|error`

**Sample code:**

```ballerina
BudgetScenario result = check client->createBudgetScenarios({Name: "Optimistic Budget", InitialRatioPercentage: 110.0});
```

**Sample response:**

```json
{
  "Numerator": 2,
  "Name": "Optimistic Budget",
  "InitialRatioPercentage": 110.0,
  "StartofFiscalYear": "2026-01-01"
}
```

</details>

<details>
<summary>getBudgetScenarios</summary>

Retrieves a single BudgetScenario by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBudgetScenariosQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `BudgetScenario|error`

**Sample code:**

```ballerina
BudgetScenario result = check client->getBudgetScenarios(1);
```

**Sample response:**

```json
{
  "Numerator": 1,
  "Name": "Main Budget",
  "InitialRatioPercentage": 100.0,
  "StartofFiscalYear": "2026-01-01",
  "BasicBudget": 1
}
```

</details>

<details>
<summary>deleteBudgetScenarios</summary>

Deletes a BudgetScenario identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteBudgetScenarios(2);
```

</details>

<details>
<summary>updateBudgetScenarios</summary>

Partially updates a BudgetScenario using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property 'Numerator' (Edm.Int32) |
| `payload` | <code>BudgetScenario</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateBudgetScenarios(1, {Name: "Revised Budget"});
```

</details>

#### CostCenterTypes

<details>
<summary>listCostCenterTypes</summary>

Queries the CostCenterTypes collection and returns a page of cost center type entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCostCenterTypesHeaders</code> | No | Headers to be sent with the request; supports `prefer` for Service Layer paging control (e.g. 'odata.maxpagesize=100') |
| `queries` | <code>ListCostCenterTypesQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `CostCenterTypesCollectionResponse|error`

**Sample code:**

```ballerina
CostCenterTypesCollectionResponse result = check client->listCostCenterTypes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#CostCenterTypes",
  "value": [
    {
      "CostCenterTypeCode": "T1",
      "CostCenterTypeName": "Production"
    }
  ]
}
```

</details>

<details>
<summary>createCostCenterTypes</summary>

Creates a new CostCenterType entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CostCenterType</code> | Yes | Request payload describing the cost center type to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CostCenterType|error`

**Sample code:**

```ballerina
CostCenterType result = check client->createCostCenterTypes({CostCenterTypeCode: "T2", CostCenterTypeName: "Sales"});
```

**Sample response:**

```json
{
  "CostCenterTypeCode": "T2",
  "CostCenterTypeName": "Sales"
}
```

</details>

<details>
<summary>getCostCenterTypes</summary>

Retrieves a single CostCenterType by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `costCenterTypeCode` | <code>string</code> | Yes | Key property 'CostCenterTypeCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCostCenterTypesQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `CostCenterType|error`

**Sample code:**

```ballerina
CostCenterType result = check client->getCostCenterTypes("T1");
```

**Sample response:**

```json
{
  "CostCenterTypeCode": "T1",
  "CostCenterTypeName": "Production"
}
```

</details>

<details>
<summary>deleteCostCenterTypes</summary>

Deletes a CostCenterType identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `costCenterTypeCode` | <code>string</code> | Yes | Key property 'CostCenterTypeCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCostCenterTypes("T2");
```

</details>

<details>
<summary>updateCostCenterTypes</summary>

Partially updates a CostCenterType using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `costCenterTypeCode` | <code>string</code> | Yes | Key property 'CostCenterTypeCode' (Edm.String) |
| `payload` | <code>CostCenterType</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCostCenterTypes("T1", {CostCenterTypeName: "Manufacturing"});
```

</details>

<details>
<summary>costCenterTypesServiceGetCostCenterTypeList</summary>

Invokes the `CostCenterTypesService_GetCostCenterTypeList` service operation to retrieve the list of cost center types.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_4|error`

**Sample code:**

```ballerina
inline_response_200_4 result = check client->costCenterTypesServiceGetCostCenterTypeList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.CostCenterTypeParams)",
  "value": [
    {
      "CostCenterTypeCode": "T1",
      "CostCenterTypeName": "Production"
    }
  ]
}
```

</details>

#### CostElements

<details>
<summary>costElementServiceGetCostElementList</summary>

Invokes the `CostElementService_GetCostElementList` service operation to retrieve the list of cost elements.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_5|error`

**Sample code:**

```ballerina
inline_response_200_5 result = check client->costElementServiceGetCostElementList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.CostElementParams)",
  "value": [
    {
      "Code": "CE001",
      "Description": "Labor Costs"
    }
  ]
}
```

</details>

<details>
<summary>listCostElements</summary>

Queries the CostElements collection and returns a page of cost element entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCostElementsHeaders</code> | No | Headers to be sent with the request; supports `prefer` for Service Layer paging control (e.g. 'odata.maxpagesize=100') |
| `queries` | <code>ListCostElementsQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `CostElementsCollectionResponse|error`

**Sample code:**

```ballerina
CostElementsCollectionResponse result = check client->listCostElements();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#CostElements",
  "value": [
    {
      "Code": "CE001",
      "Description": "Labor Costs",
      "IsActive": "tYES"
    }
  ]
}
```

</details>

<details>
<summary>createCostElements</summary>

Creates a new CostElement entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>CostElement</code> | Yes | Request payload describing the cost element to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `CostElement|error`

**Sample code:**

```ballerina
CostElement result = check client->createCostElements({code: "CE002", description: "Material Costs", isActive: "tYES"});
```

**Sample response:**

```json
{
  "Code": "CE002",
  "Description": "Material Costs",
  "IsActive": "tYES"
}
```

</details>

<details>
<summary>getCostElements</summary>

Retrieves a single CostElement by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCostElementsQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `CostElement|error`

**Sample code:**

```ballerina
CostElement result = check client->getCostElements("CE001");
```

**Sample response:**

```json
{
  "Code": "CE001",
  "Description": "Labor Costs",
  "IsActive": "tYES"
}
```

</details>

<details>
<summary>deleteCostElements</summary>

Deletes a CostElement identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCostElements("CE002");
```

</details>

<details>
<summary>updateCostElements</summary>

Partially updates a CostElement using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>CostElement</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCostElements("CE001", {description: "Direct Labor Costs"});
```

</details>

#### Currencies

<details>
<summary>listCurrencies</summary>

Queries the Currencies collection and returns a page of currency entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListCurrenciesHeaders</code> | No | Headers to be sent with the request; supports `prefer` for Service Layer paging control (e.g. 'odata.maxpagesize=100') |
| `queries` | <code>ListCurrenciesQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `CurrenciesCollectionResponse|error`

**Sample code:**

```ballerina
CurrenciesCollectionResponse result = check client->listCurrencies();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Currencies",
  "value": [
    {
      "Code": "USD",
      "Name": "US Dollar",
      "DocumentsCode": "$",
      "InternationalDescription": "US Dollar",
      "Rounding": "rsNoRounding"
    }
  ]
}
```

</details>

<details>
<summary>createCurrencies</summary>

Creates a new Currency entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Currency</code> | Yes | Request payload describing the currency to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Currency|error`

**Sample code:**

```ballerina
Currency result = check client->createCurrencies({Code: "EUR", Name: "Euro", DocumentsCode: "EUR"});
```

**Sample response:**

```json
{
  "Code": "EUR",
  "Name": "Euro",
  "DocumentsCode": "EUR",
  "InternationalDescription": "Euro"
}
```

</details>

<details>
<summary>getCurrencies</summary>

Retrieves a single Currency by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCurrenciesQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `Currency|error`

**Sample code:**

```ballerina
Currency result = check client->getCurrencies("USD");
```

**Sample response:**

```json
{
  "Code": "USD",
  "Name": "US Dollar",
  "DocumentsCode": "$",
  "Rounding": "rsNoRounding",
  "RoundingInPayment": "tNO"
}
```

</details>

<details>
<summary>deleteCurrencies</summary>

Deletes a Currency identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteCurrencies("EUR");
```

</details>

<details>
<summary>updateCurrencies</summary>

Partially updates a Currency using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>Currency</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateCurrencies("USD", {Name: "United States Dollar"});
```

</details>

#### DistributionRules

<details>
<summary>listDistributionRules</summary>

Queries the DistributionRules collection and returns a page of distribution rule entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListDistributionRulesHeaders</code> | No | Headers to be sent with the request; supports `prefer` for Service Layer paging control (e.g. 'odata.maxpagesize=100') |
| `queries` | <code>ListDistributionRulesQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `DistributionRulesCollectionResponse|error`

**Sample code:**

```ballerina
DistributionRulesCollectionResponse result = check client->listDistributionRules();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#DistributionRules",
  "value": [
    {
      "FactorCode": "DR001",
      "FactorDescription": "Head Office Split",
      "TotalFactor": 100.0,
      "InWhichDimension": 1,
      "Active": "tYES"
    }
  ]
}
```

</details>

<details>
<summary>createDistributionRules</summary>

Creates a new DistributionRule entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>DistributionRule</code> | Yes | Request payload describing the distribution rule to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `DistributionRule|error`

**Sample code:**

```ballerina
DistributionRule result = check client->createDistributionRules({FactorCode: "DR002", FactorDescription: "Regional Split", InWhichDimension: 1});
```

**Sample response:**

```json
{
  "FactorCode": "DR002",
  "FactorDescription": "Regional Split",
  "TotalFactor": 100.0,
  "InWhichDimension": 1,
  "Active": "tYES"
}
```

</details>

<details>
<summary>getDistributionRules</summary>

Retrieves a single DistributionRule by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `factorCode` | <code>string</code> | Yes | Key property 'FactorCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetDistributionRulesQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `DistributionRule|error`

**Sample code:**

```ballerina
DistributionRule result = check client->getDistributionRules("DR001");
```

**Sample response:**

```json
{
  "FactorCode": "DR001",
  "FactorDescription": "Head Office Split",
  "TotalFactor": 100.0,
  "InWhichDimension": 1,
  "Active": "tYES",
  "IsFixedAmount": "tNO"
}
```

</details>

<details>
<summary>deleteDistributionRules</summary>

Deletes a DistributionRule identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `factorCode` | <code>string</code> | Yes | Key property 'FactorCode' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteDistributionRules("DR002");
```

</details>

<details>
<summary>updateDistributionRules</summary>

Partially updates a DistributionRule using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `factorCode` | <code>string</code> | Yes | Key property 'FactorCode' (Edm.String) |
| `payload` | <code>DistributionRule</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateDistributionRules("DR001", {FactorDescription: "Updated Head Office Split"});
```

</details>

<details>
<summary>distributionRulesServiceGetDistributionRuleList</summary>

Invokes the `DistributionRulesService_GetDistributionRuleList` service operation to retrieve the list of distribution rules.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_10|error`

**Sample code:**

```ballerina
inline_response_200_10 result = check client->distributionRulesServiceGetDistributionRuleList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.DistributionRuleParams)",
  "value": [
    {
      "FactorCode": "DR001",
      "FactorDescription": "Head Office Split"
    }
  ]
}
```

</details>

#### Forms1099

<details>
<summary>listForms1099</summary>

Queries the Forms1099 collection and returns a page of 1099 form entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListForms1099Headers</code> | No | Headers to be sent with the request; supports `prefer` for Service Layer paging control (e.g. 'odata.maxpagesize=100') |
| `queries` | <code>ListForms1099Queries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `Forms1099CollectionResponse|error`

**Sample code:**

```ballerina
Forms1099CollectionResponse result = check client->listForms1099();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Forms1099",
  "value": [
    {
      "FormCode": 1,
      "Form1099": "1099 MISC"
    }
  ]
}
```

</details>

<details>
<summary>createForms1099</summary>

Creates a new Forms1099 entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Forms1099</code> | Yes | Request payload describing the 1099 form to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Forms1099|error`

**Sample code:**

```ballerina
Forms1099 result = check client->createForms1099({Form1099: "1099 INT"});
```

**Sample response:**

```json
{
  "FormCode": 2,
  "Form1099": "1099 INT"
}
```

</details>

<details>
<summary>getForms1099</summary>

Retrieves a single Forms1099 entity by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `formCode` | <code>int:Signed32</code> | Yes | Key property 'FormCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetForms1099Queries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `Forms1099|error`

**Sample code:**

```ballerina
Forms1099 result = check client->getForms1099(1);
```

**Sample response:**

```json
{
  "FormCode": 1,
  "Form1099": "1099 MISC",
  "Boxes1099": [
    {
      "BoxCode": 1,
      "Description": "Rents"
    }
  ]
}
```

</details>

<details>
<summary>deleteForms1099</summary>

Deletes a Forms1099 entity identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `formCode` | <code>int:Signed32</code> | Yes | Key property 'FormCode' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteForms1099(2);
```

</details>

<details>
<summary>updateForms1099</summary>

Partially updates a Forms1099 entity using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `formCode` | <code>int:Signed32</code> | Yes | Key property 'FormCode' (Edm.Int32) |
| `payload` | <code>Forms1099</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateForms1099(1, {Form1099: "1099 MISC Updated"});
```

</details>

#### NatureOfAssessees

<details>
<summary>listNatureOfAssessees</summary>

Queries the NatureOfAssessees collection and returns a page of nature of assessee entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListNatureOfAssesseesHeaders</code> | No | Headers to be sent with the request; supports `prefer` for Service Layer paging control (e.g. 'odata.maxpagesize=100') |
| `queries` | <code>ListNatureOfAssesseesQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `NatureOfAssesseesCollectionResponse|error`

**Sample code:**

```ballerina
NatureOfAssesseesCollectionResponse result = check client->listNatureOfAssessees();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#NatureOfAssessees",
  "value": [
    {
      "AbsEntry": 1,
      "Code": "COM",
      "Description": "Company",
      "AssesseeType": "atCompany"
    }
  ]
}
```

</details>

<details>
<summary>createNatureOfAssessees</summary>

Creates a new NatureOfAssessee entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>NatureOfAssessee</code> | Yes | Request payload describing the nature of assessee to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `NatureOfAssessee|error`

**Sample code:**

```ballerina
NatureOfAssessee result = check client->createNatureOfAssessees({code: "IND", description: "Individual"});
```

**Sample response:**

```json
{
  "AbsEntry": 2,
  "Code": "IND",
  "Description": "Individual"
}
```

</details>

<details>
<summary>getNatureOfAssessees</summary>

Retrieves a single NatureOfAssessee by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetNatureOfAssesseesQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `NatureOfAssessee|error`

**Sample code:**

```ballerina
NatureOfAssessee result = check client->getNatureOfAssessees(1);
```

**Sample response:**

```json
{
  "AbsEntry": 1,
  "Code": "COM",
  "Description": "Company",
  "AssesseeType": "atCompany"
}
```

</details>

<details>
<summary>deleteNatureOfAssessees</summary>

Deletes a NatureOfAssessee identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteNatureOfAssessees(2);
```

</details>

<details>
<summary>updateNatureOfAssessees</summary>

Partially updates a NatureOfAssessee using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absEntry` | <code>int:Signed32</code> | Yes | Key property 'AbsEntry' (Edm.Int32) |
| `payload` | <code>NatureOfAssessee</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateNatureOfAssessees(1, {description: "Domestic Company"});
```

</details>

<details>
<summary>natureOfAssesseesServiceGetNatureOfAssesseeList</summary>

Invokes the `NatureOfAssesseesService_GetNatureOfAssesseeList` service operation to retrieve the list of nature of assessees.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_14|error`

**Sample code:**

```ballerina
inline_response_200_14 result = check client->natureOfAssesseesServiceGetNatureOfAssesseeList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.NatureOfAssesseeParams)",
  "value": [
    {
      "AbsEntry": 1,
      "Code": "COM",
      "Description": "Company"
    }
  ]
}
```

</details>

#### SpecificWTHAmountsService

<details>
<summary>listSpecificWTHAmountsService</summary>

Queries the SpecificWTHAmountsService collection and returns a page of specific withholding tax amount entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListSpecificWTHAmountsServiceHeaders</code> | No | Headers to be sent with the request; supports `prefer` for Service Layer paging control (e.g. 'odata.maxpagesize=100') |
| `queries` | <code>ListSpecificWTHAmountsServiceQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `SpecificWTHAmountsServiceCollectionResponse|error`

**Sample code:**

```ballerina
SpecificWTHAmountsServiceCollectionResponse result = check client->listSpecificWTHAmountsService();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#SpecificWTHAmountsService",
  "value": [
    {
      "PaymentReasonCode": "A",
      "CardCode": "V10000",
      "CUSplit": "tNO",
      "TaxableAmount": 1000.0,
      "TaxAmount": 200.0
    }
  ]
}
```

</details>

<details>
<summary>createSpecificWTHAmountsService</summary>

Creates a new SpecificWTHAmounts entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>SpecificWTHAmounts</code> | Yes | Request payload describing the specific withholding tax amounts to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `SpecificWTHAmounts|error`

**Sample code:**

```ballerina
SpecificWTHAmounts result = check client->createSpecificWTHAmountsService({PaymentReasonCode: "A", CardCode: "V10000", CUSplit: "tNO", TaxableAmount: 1000.0});
```

**Sample response:**

```json
{
  "PaymentReasonCode": "A",
  "CardCode": "V10000",
  "CUSplit": "tNO",
  "TaxableAmount": 1000.0,
  "EarningYear": 2026
}
```

</details>

<details>
<summary>getSpecificWTHAmountsService</summary>

Retrieves a single SpecificWTHAmounts entity by its composite key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `paymentReasonCode` | <code>string</code> | Yes | Composite key part 'PaymentReasonCode' (Edm.String) |
| `cardCode` | <code>string</code> | Yes | Composite key part 'CardCode' (Edm.String) |
| `cUSplit` | <code>BoYesNoEnum</code> | Yes | Composite key part 'CUSplit' (SAPB1.BoYesNoEnum) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSpecificWTHAmountsServiceQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `SpecificWTHAmounts|error`

**Sample code:**

```ballerina
SpecificWTHAmounts result = check client->getSpecificWTHAmountsService("A", "V10000", "tNO");
```

**Sample response:**

```json
{
  "PaymentReasonCode": "A",
  "CardCode": "V10000",
  "CUSplit": "tNO",
  "TaxableAmount": 1000.0,
  "TaxAmount": 200.0,
  "EarningYear": 2026
}
```

</details>

<details>
<summary>deleteSpecificWTHAmountsService</summary>

Deletes a SpecificWTHAmounts entity identified by its composite key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `paymentReasonCode` | <code>string</code> | Yes | Composite key part 'PaymentReasonCode' (Edm.String) |
| `cardCode` | <code>string</code> | Yes | Composite key part 'CardCode' (Edm.String) |
| `cUSplit` | <code>BoYesNoEnum</code> | Yes | Composite key part 'CUSplit' (SAPB1.BoYesNoEnum) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSpecificWTHAmountsService("A", "V10000", "tNO");
```

</details>

<details>
<summary>updateSpecificWTHAmountsService</summary>

Partially updates a SpecificWTHAmounts entity identified by its composite key using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `paymentReasonCode` | <code>string</code> | Yes | Composite key part 'PaymentReasonCode' (Edm.String) |
| `cardCode` | <code>string</code> | Yes | Composite key part 'CardCode' (Edm.String) |
| `cUSplit` | <code>BoYesNoEnum</code> | Yes | Composite key part 'CUSplit' (SAPB1.BoYesNoEnum) |
| `payload` | <code>SpecificWTHAmounts</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateSpecificWTHAmountsService("A", "V10000", "tNO", {TaxableAmount: 1500.0});
```

</details>

<details>
<summary>specificWTHAmountsServiceGetList</summary>

Invokes the `SpecificWTHAmountsService_GetList` service operation to retrieve the list of specific withholding tax amounts.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_21|error`

**Sample code:**

```ballerina
inline_response_200_21 result = check client->specificWTHAmountsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.SpecificWTHAmountsParams)",
  "value": [
    {
      "PaymentReasonCode": "A",
      "CardCode": "V10000",
      "CUSplit": "tNO",
      "TaxableAmount": 1000.0
    }
  ]
}
```

</details>

#### TaxCodeDeterminationsTCD

<details>
<summary>listTaxCodeDeterminationsTCD</summary>

Queries the TaxCodeDeterminationsTCD collection and returns a page of tax code determination (TCD) entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListTaxCodeDeterminationsTCDHeaders</code> | No | Headers to be sent with the request; supports `prefer` for Service Layer paging control (e.g. 'odata.maxpagesize=100') |
| `queries` | <code>ListTaxCodeDeterminationsTCDQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `TaxCodeDeterminationsTCDCollectionResponse|error`

**Sample code:**

```ballerina
TaxCodeDeterminationsTCDCollectionResponse result = check client->listTaxCodeDeterminationsTCD();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#TaxCodeDeterminationsTCD",
  "value": [
    {
      "AbsId": 1,
      "DftApCode": "IN1",
      "DftArCode": "OUT1",
      "TcdType": "tcdtDeterminationByItems"
    }
  ]
}
```

</details>

<details>
<summary>createTaxCodeDeterminationsTCD</summary>

Creates a new TaxCodeDeterminationTCD entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TaxCodeDeterminationTCD</code> | Yes | Request payload describing the tax code determination to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `TaxCodeDeterminationTCD|error`

**Sample code:**

```ballerina
TaxCodeDeterminationTCD result = check client->createTaxCodeDeterminationsTCD({dftApCode: "IN1", dftArCode: "OUT1"});
```

**Sample response:**

```json
{
  "AbsId": 2,
  "DftApCode": "IN1",
  "DftArCode": "OUT1"
}
```

</details>

<details>
<summary>getTaxCodeDeterminationsTCD</summary>

Retrieves a single TaxCodeDeterminationTCD by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absId` | <code>int:Signed32</code> | Yes | Key property 'AbsId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTaxCodeDeterminationsTCDQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `TaxCodeDeterminationTCD|error`

**Sample code:**

```ballerina
TaxCodeDeterminationTCD result = check client->getTaxCodeDeterminationsTCD(1);
```

**Sample response:**

```json
{
  "AbsId": 1,
  "DftApCode": "IN1",
  "DftArCode": "OUT1",
  "TcdType": "tcdtDeterminationByItems"
}
```

</details>

<details>
<summary>deleteTaxCodeDeterminationsTCD</summary>

Deletes a TaxCodeDeterminationTCD identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absId` | <code>int:Signed32</code> | Yes | Key property 'AbsId' (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTaxCodeDeterminationsTCD(2);
```

</details>

<details>
<summary>updateTaxCodeDeterminationsTCD</summary>

Partially updates a TaxCodeDeterminationTCD using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absId` | <code>int:Signed32</code> | Yes | Key property 'AbsId' (Edm.Int32) |
| `payload` | <code>TaxCodeDeterminationTCD</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTaxCodeDeterminationsTCD(1, {dftApCode: "IN2"});
```

</details>

<details>
<summary>taxCodeDeterminationsTCDServiceGetTaxCodeDeterminationTCDList</summary>

Invokes the `TaxCodeDeterminationsTCDService_GetTaxCodeDeterminationTCDList` service operation to retrieve the list of tax code determinations (TCD).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_23|error`

**Sample code:**

```ballerina
inline_response_200_23 result = check client->taxCodeDeterminationsTCDServiceGetTaxCodeDeterminationTCDList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.TaxCodeDeterminationTCDParams)",
  "value": [
    {
      "AbsId": 1,
      "DftApCode": "IN1",
      "DftArCode": "OUT1"
    }
  ]
}
```

</details>

#### TaxExemptReasons

<details>
<summary>taxExemptReasonServiceGetList</summary>

Invokes the `TaxExemptReasonService_GetList` service operation to retrieve the list of tax exempt reasons.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_24|error`

**Sample code:**

```ballerina
inline_response_200_24 result = check client->taxExemptReasonServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#Collection(SAPB1.TaxExemptReasonParams)",
  "value": [
    {
      "Code": "EX1",
      "Description": "Export Exemption"
    }
  ]
}
```

</details>

<details>
<summary>listTaxExemptReasons</summary>

Queries the TaxExemptReasons collection and returns a page of tax exempt reason entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListTaxExemptReasonsHeaders</code> | No | Headers to be sent with the request; supports `prefer` for Service Layer paging control (e.g. 'odata.maxpagesize=100') |
| `queries` | <code>ListTaxExemptReasonsQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `TaxExemptReasonsCollectionResponse|error`

**Sample code:**

```ballerina
TaxExemptReasonsCollectionResponse result = check client->listTaxExemptReasons();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#TaxExemptReasons",
  "value": [
    {
      "Code": "EX1",
      "Description": "Export Exemption"
    }
  ]
}
```

</details>

<details>
<summary>createTaxExemptReasons</summary>

Creates a new TaxExemptReason entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>TaxExemptReason</code> | Yes | Request payload describing the tax exempt reason to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `TaxExemptReason|error`

**Sample code:**

```ballerina
TaxExemptReason result = check client->createTaxExemptReasons({code: "EX2", description: "Diplomatic Exemption"});
```

**Sample response:**

```json
{
  "Code": "EX2",
  "Description": "Diplomatic Exemption"
}
```

</details>

<details>
<summary>getTaxExemptReasons</summary>

Retrieves a single TaxExemptReason by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTaxExemptReasonsQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `TaxExemptReason|error`

**Sample code:**

```ballerina
TaxExemptReason result = check client->getTaxExemptReasons("EX1");
```

**Sample response:**

```json
{
  "Code": "EX1",
  "Description": "Export Exemption"
}
```

</details>

<details>
<summary>deleteTaxExemptReasons</summary>

Deletes a TaxExemptReason identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteTaxExemptReasons("EX2");
```

</details>

<details>
<summary>updateTaxExemptReasons</summary>

Partially updates a TaxExemptReason using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>TaxExemptReason</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateTaxExemptReasons("EX1", {description: "Export Tax Exemption"});
```

</details>

#### VatGroups

<details>
<summary>listVatGroups</summary>

Queries the VatGroups collection and returns a page of VAT group entities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListVatGroupsHeaders</code> | No | Headers to be sent with the request; supports `prefer` for Service Layer paging control (e.g. 'odata.maxpagesize=100') |
| `queries` | <code>ListVatGroupsQueries</code> | No | OData query options: `dollarSkip`, `dollarTop`, `dollarFilter`, `dollarOrderby`, `dollarExpand`, `dollarInlinecount`, `dollarSelect` |

**Returns:** `VatGroupsCollectionResponse|error`

**Sample code:**

```ballerina
VatGroupsCollectionResponse result = check client->listVatGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "https://server:50000/b1s/v2/$metadata#VatGroups",
  "value": [
    {
      "Code": "A1",
      "Name": "Output VAT 19%",
      "Category": "bovcOutputTax",
      "TaxAccount": "_SYS00000000082",
      "Inactive": "tNO"
    }
  ]
}
```

</details>

<details>
<summary>createVatGroups</summary>

Creates a new VatGroup entity and returns the created entity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>VatGroup</code> | Yes | Request payload describing the VAT group to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `VatGroup|error`

**Sample code:**

```ballerina
VatGroup result = check client->createVatGroups({Code: "A2", Name: "Input VAT 19%", Category: "bovcInputTax"});
```

**Sample response:**

```json
{
  "Code": "A2",
  "Name": "Input VAT 19%",
  "Category": "bovcInputTax",
  "Inactive": "tNO"
}
```

</details>

<details>
<summary>getVatGroups</summary>

Retrieves a single VatGroup by its key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetVatGroupsQueries</code> | No | OData query options: `dollarExpand`, `dollarSelect` |

**Returns:** `VatGroup|error`

**Sample code:**

```ballerina
VatGroup result = check client->getVatGroups("A1");
```

**Sample response:**

```json
{
  "Code": "A1",
  "Name": "Output VAT 19%",
  "Category": "bovcOutputTax",
  "TaxAccount": "_SYS00000000082",
  "EU": "tNO",
  "Inactive": "tNO"
}
```

</details>

<details>
<summary>deleteVatGroups</summary>

Deletes a VatGroup identified by its key; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteVatGroups("A2");
```

</details>

<details>
<summary>updateVatGroups</summary>

Partially updates a VatGroup using PATCH/MERGE semantics; no content is returned on success.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>string</code> | Yes | Key property 'Code' (Edm.String) |
| `payload` | <code>VatGroup</code> | Yes | Request payload containing the fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->updateVatGroups("A1", {Name: "Output VAT 20%"});
```

</details>
