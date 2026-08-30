---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.customer` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance customers, customer groups, customer parameters, and base customer records via the Dynamics 365 Finance and Operations OData API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance customers, customer groups, customer parameters, and base customer records via the Dynamics 365 Finance and Operations OData API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials grant configuration used to authenticate with Microsoft Entra ID (Azure AD): `tokenUrl`, `clientId`, `clientSecret`, and optional `scopes`. |
| `httpVersion` | `http:HttpVersion` | `2.0` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.customer;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

customer:Client fo = check new (
    {
        auth: {
            tokenUrl,
            clientId,
            clientSecret
        }
    },
    serviceUrl
);
```

### Operations

#### Customer groups

<details>
<summary>listCustomerGroups</summary>

Reads all customer groups.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCustomerGroupsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `customer:CustomerGroupsCollection|error`

Sample code:

```ballerina
customer:CustomerGroupsCollection groups = check fo->listCustomerGroups(
    queries = {
        filter: "TaxGroupId eq 'VAT-STD'",
        top: 20,
        'select: "CustomerGroupId,Description,PaymentTermId,TaxGroupId"
    }
);
```

</details>

<details>
<summary>createCustomerGroups</summary>

Creates a customer group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomerGroup` | Yes | The customer group to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `customer:CustomerGroup|error`

Sample code:

```ballerina
customer:CustomerGroup group = check fo->createCustomerGroups({
    dataAreaId: "usmf",
    customerGroupId: "DOM-RETAIL",
    description: "Domestic retail customers",
    paymentTermId: "Net30",
    taxGroupId: "VAT-STD",
    customerAccountNumberSequence: "Cust_DOM",
    isPublicSectorIT: "No"
});
```

</details>

<details>
<summary>getCustomerGroups</summary>

Reads a specific customer group by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerGroupId` | `string` | Yes | The customer group id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCustomerGroupsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `customer:CustomerGroup|error`

Sample code:

```ballerina
customer:CustomerGroup group = check fo->getCustomerGroups("usmf", "DOM-RETAIL");
```

</details>

<details>
<summary>deleteCustomerGroups</summary>

Deletes a specific customer group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerGroupId` | `string` | Yes | The customer group id key field. |
| `headers` | `DeleteCustomerGroupsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCustomerGroups(
    "usmf",
    "DOM-RETAIL",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCustomerGroups</summary>

Updates a specific customer group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerGroupId` | `string` | Yes | The customer group id key field. |
| `payload` | `CustomerGroup` | Yes | The fields to update. |
| `headers` | `UpdateCustomerGroupsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `customer:CustomerGroup|error`

Sample code:

```ballerina
customer:CustomerGroup updated = check fo->updateCustomerGroups(
    "usmf",
    "DOM-RETAIL",
    {paymentTermId: "Net45"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Customer parameters

<details>
<summary>listCustomerParameters</summary>

Reads customer parameters for all legal entities.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCustomerParametersQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `customer:CustomerParametersCollection|error`

Sample code:

```ballerina
customer:CustomerParametersCollection parameters = check fo->listCustomerParameters(
    queries = {
        'select: "dataAreaId,CreditCardAuthorization,SettlementWriteOffEnabled,DefaultLanguage"
    }
);
```

</details>

<details>
<summary>createCustomerParameters</summary>

Creates the customer parameters record for a legal entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomerParameters` | Yes | The customer parameters to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `customer:CustomerParameters|error`

Sample code:

```ballerina
customer:CustomerParameters parameters = check fo->createCustomerParameters({
    dataAreaId: "usmf",
    creditCardAuthorization: "Yes",
    settlementWriteOffEnabled: "No",
    defaultLanguage: "InvoiceAccount",
    creditLimitCheckType: "Balance"
});
```

</details>

<details>
<summary>getCustomerParameters</summary>

Reads the customer parameters for a specific legal entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCustomerParametersQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `customer:CustomerParameters|error`

Sample code:

```ballerina
customer:CustomerParameters parameters = check fo->getCustomerParameters("usmf");
```

</details>

<details>
<summary>deleteCustomerParameters</summary>

Deletes the customer parameters record for a specific legal entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `headers` | `DeleteCustomerParametersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCustomerParameters(
    "usmf",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCustomerParameters</summary>

Updates the customer parameters for a specific legal entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `payload` | `CustomerParameters` | Yes | The fields to update. |
| `headers` | `UpdateCustomerParametersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `customer:CustomerParameters|error`

Sample code:

```ballerina
customer:CustomerParameters updated = check fo->updateCustomerParameters(
    "usmf",
    {settlementWriteOffEnabled: "Yes"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Customers

<details>
<summary>listCustomers</summary>

Reads all customers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCustomersQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `customer:CustomersCollection|error`

Sample code:

```ballerina
customer:CustomersCollection customers = check fo->listCustomers(
    queries = {
        filter: "CustomerGroupId eq 'DOM-RETAIL' and OnHoldStatus eq 'No'",
        top: 25,
        'select: "CustomerAccount,Name,CustomerGroupId,CreditLimit,SalesCurrencyCode"
    }
);
```

</details>

<details>
<summary>createCustomers</summary>

Creates a customer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Customer` | Yes | The customer to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `customer:Customer|error`

Sample code:

```ballerina
customer:Customer newCustomer = check fo->createCustomers({
    dataAreaId: "usmf",
    customerAccount: "CUST-10045",
    name: "Contoso Retail Ltd",
    customerGroupId: "DOM-RETAIL",
    paymentTerms: "Net30",
    salesCurrencyCode: "USD",
    creditLimit: 50000.0,
    onHoldStatus: "No"
});
```

</details>

<details>
<summary>getCustomers</summary>

Reads a specific customer by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerAccount` | `string` | Yes | The customer account key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCustomersQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `customer:Customer|error`

Sample code:

```ballerina
customer:Customer existingCustomer = check fo->getCustomers(
    "usmf",
    "CUST-10045",
    queries = {'select: "CustomerAccount,Name,CreditLimit,OnHoldStatus"}
);
```

</details>

<details>
<summary>deleteCustomers</summary>

Deletes a specific customer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerAccount` | `string` | Yes | The customer account key field. |
| `headers` | `DeleteCustomersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCustomers(
    "usmf",
    "CUST-10045",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCustomers</summary>

Updates a specific customer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerAccount` | `string` | Yes | The customer account key field. |
| `payload` | `Customer` | Yes | The fields to update. |
| `headers` | `UpdateCustomersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `customer:Customer|error`

Sample code:

```ballerina
customer:Customer updated = check fo->updateCustomers(
    "usmf",
    "CUST-10045",
    {creditLimit: 75000.0, onHoldStatus: "Invoice"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Customers base

<details>
<summary>listCustomersBase</summary>

Reads all customer base records — a lightweight view of core customer identification fields.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCustomersBaseQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `customer:CustomersBaseCollection|error`

Sample code:

```ballerina
customer:CustomersBaseCollection customers = check fo->listCustomersBase(
    queries = {
        filter: "CustomerGroupId eq 'DOM-RETAIL'",
        'select: "CustomerAccount,Name,PersonFirstName,PersonLastName,CustomerGroupId"
    }
);
```

</details>

<details>
<summary>createCustomersBase</summary>

Creates a customer base record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomerBase` | Yes | The customer base record to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `customer:CustomerBase|error`

Sample code:

```ballerina
customer:CustomerBase newCustomer = check fo->createCustomersBase({
    dataAreaId: "usmf",
    customerAccount: "CUST-10046",
    name: "Fabrikam Distribution",
    customerGroupId: "DOM-RETAIL",
    languageId: "en-us",
    salesCurrencyCode: "USD"
});
```

</details>

<details>
<summary>getCustomersBase</summary>

Reads a specific customer base record by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerAccount` | `string` | Yes | The customer account key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCustomersBaseQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `customer:CustomerBase|error`

Sample code:

```ballerina
customer:CustomerBase existingCustomer = check fo->getCustomersBase("usmf", "CUST-10046");
```

</details>

<details>
<summary>deleteCustomersBase</summary>

Deletes a specific customer base record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerAccount` | `string` | Yes | The customer account key field. |
| `headers` | `DeleteCustomersBaseHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCustomersBase(
    "usmf",
    "CUST-10046",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCustomersBase</summary>

Updates a specific customer base record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerAccount` | `string` | Yes | The customer account key field. |
| `payload` | `CustomerBase` | Yes | The fields to update. |
| `headers` | `UpdateCustomersBaseHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `customer:CustomerBase|error`

Sample code:

```ballerina
customer:CustomerBase updated = check fo->updateCustomersBase(
    "usmf",
    "CUST-10046",
    {salesCurrencyCode: "CAD"},
    headers = {ifMatch: eTag}
);
```

</details>
