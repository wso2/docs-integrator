---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.customermain` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance customer master data via the Customer Main OData API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance customer master data via the Customer Main OData API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth 2.0 client credentials grant configuration; includes `tokenUrl`, `clientId`, `clientSecret`, and `scopes`. |
| `httpVersion` | `string` | `"2.0"` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.customermain;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

customermain:Client fo = check new (
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

#### Customers V2

<details>
<summary>listCustomersV2</summary>

Reads all `CustomersV2` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListCustomersV2Queries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `CustomersV2Collection|error`

Sample code:

```ballerina
customermain:CustomersV2Collection result = check fo->listCustomersV2(
    queries = {
        filter: "CustomerGroupId eq '10'",
        top: 20,
        'select: "CustomerAccount,OrganizationName,CreditLimit,SalesCurrencyCode"
    }
);
```

</details>

<details>
<summary>createCustomersV2</summary>

Creates a `CustomersV2` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomerV2` | Yes | The customer master record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `CustomerV2|error`

Sample code:

```ballerina
customermain:CustomerV2 created = check fo->createCustomersV2({
    dataAreaId: "USMF",
    customerAccount: "US-101",
    organizationName: "Contoso Retail Inc.",
    customerGroupId: "10",
    invoiceAccount: "US-101",
    salesCurrencyCode: "USD",
    paymentTerms: "Net30",
    creditLimit: 50000,
    addressStreet: "500 Boylston Street",
    addressCity: "Boston",
    addressZipCode: "02116",
    addressCountryRegionId: "USA",
    primaryContactEmail: "ap@contosoretail.example",
    languageId: "en-us"
});
```

</details>

<details>
<summary>getCustomersV2</summary>

Reads a specific `CustomersV2` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier (e.g., `"USMF"`). |
| `customerAccount` | `string` | Yes | The customer account key field (e.g., `"US-101"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomersV2Queries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `CustomerV2|error`

Sample code:

```ballerina
customermain:CustomerV2 customer = check fo->getCustomersV2(
    "USMF",
    "US-101",
    queries = {
        'select: "CustomerAccount,OrganizationName,CreditLimit,OnHoldStatus"
    }
);
```

</details>

<details>
<summary>deleteCustomersV2</summary>

Deletes a specific `CustomersV2` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerAccount` | `string` | Yes | The customer account key field of the record to delete. |
| `headers` | `DeleteCustomersV2Headers` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCustomersV2(
    "USMF",
    "US-101",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCustomersV2</summary>

Updates a specific `CustomersV2` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerAccount` | `string` | Yes | The customer account key field of the record to update. |
| `payload` | `CustomerV2` | Yes | The fields to update. |
| `headers` | `UpdateCustomersV2Headers` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `CustomerV2|error`

Sample code:

```ballerina
customermain:CustomerV2 updated = check fo->updateCustomersV2(
    "USMF",
    "US-101",
    {
        creditLimit: 75000,
        onHoldStatus: "Invoice"
    },
    headers = {ifMatch: eTag}
);
```

</details>

#### Customers V3

<details>
<summary>listCustomersV3</summary>

Reads all `CustomersV3` records in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListCustomersV3Queries` | No | OData query parameters, set via the record fields `skip` (`$skip`), `top` (`$top`), `filter` (`$filter`), `orderby` (`$orderby`), `expand` (`$expand`), `crossCompany` (`cross-company`), `count` (`$count`), and `'select` (`$select`). |

Returns: `CustomersV3Collection|error`

Sample code:

```ballerina
customermain:CustomersV3Collection result = check fo->listCustomersV3(
    queries = {
        filter: "CredManGroupId eq 'STD'",
        orderby: "OrganizationName asc",
        'select: "CustomerAccount,OrganizationName,CreditLimit,CredManGroupId"
    }
);
```

</details>

<details>
<summary>createCustomersV3</summary>

Creates a `CustomersV3` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomerV3` | Yes | The customer master record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `CustomerV3|error`

Sample code:

```ballerina
customermain:CustomerV3 created = check fo->createCustomersV3({
    dataAreaId: "USMF",
    customerAccount: "US-102",
    organizationName: "Fabrikam Industrial Supply",
    customerGroupId: "20",
    invoiceAccount: "US-102",
    salesCurrencyCode: "USD",
    paymentTerms: "Net45",
    creditLimit: 120000,
    credManGroupId: "STD",
    credManCustUnlimitedCredit: "No",
    fulfillmentPolicyName: "StandardFulfillment",
    collectionLetterCode: "CollectionLetter1",
    addressStreet: "88 Industrial Parkway",
    addressCity: "Cleveland",
    addressZipCode: "44101",
    addressCountryRegionId: "USA",
    languageId: "en-us"
});
```

</details>

<details>
<summary>getCustomersV3</summary>

Reads a specific `CustomersV3` record by its composite key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier (e.g., `"USMF"`). |
| `customerAccount` | `string` | Yes | The customer account key field (e.g., `"US-102"`). |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetCustomersV3Queries` | No | OData query parameters, set via the record fields `expand` (`$expand`) and `'select` (`$select`). |

Returns: `CustomerV3|error`

Sample code:

```ballerina
customermain:CustomerV3 customer = check fo->getCustomersV3(
    "USMF",
    "US-102",
    queries = {
        'select: "CustomerAccount,OrganizationName,CreditLimit,CredManGroupId,OnHoldStatus"
    }
);
```

</details>

<details>
<summary>deleteCustomersV3</summary>

Deletes a specific `CustomersV3` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerAccount` | `string` | Yes | The customer account key field of the record to delete. |
| `headers` | `DeleteCustomersV3Headers` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCustomersV3(
    "USMF",
    "US-102",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCustomersV3</summary>

Updates a specific `CustomersV3` record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerAccount` | `string` | Yes | The customer account key field of the record to update. |
| `payload` | `CustomerV3` | Yes | The fields to update. |
| `headers` | `UpdateCustomersV3Headers` | No | Request headers; supports an optional `ifMatch` field mapped to the `If-Match` header, used for optimistic concurrency. |

Returns: `CustomerV3|error`

Sample code:

```ballerina
customermain:CustomerV3 updated = check fo->updateCustomersV3(
    "USMF",
    "US-102",
    {
        creditLimit: 150000,
        credManCustUnlimitedCredit: "Yes"
    },
    headers = {ifMatch: eTag}
);
```

</details>
