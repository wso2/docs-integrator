---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.vendorextended` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance vendor extended records across the `VendorsV2` and `VendorsV3` entity sets via the OData REST API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance vendor extended records across the `VendorsV2` and `VendorsV3` entity sets via the OData REST API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials grant configuration; includes `tokenUrl`, `clientId`, `clientSecret`, and `scopes`. |
| `httpVersion` | `string` | `"2.0"` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.vendorextended;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

configurable string[] scopes = ["https://<your-org>.operations.dynamics.com/data/.default"];

vendorextended:Client fo = check new (
    {
        auth: {
            tokenUrl,
            clientId,
            clientSecret,
            scopes
        }
    },
    serviceUrl
);
```

### Operations

#### Vendors V2

<details>
<summary>listVendorsV2</summary>

Reads all extended vendor records in the `VendorsV2` entity set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListVendorsV2Queries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `VendorsV2Collection|error`

Sample code:

```ballerina
vendorextended:VendorsV2Collection result = check fo->listVendorsV2(
    queries = {
        filter: "dataAreaId eq 'USMF'",
        top: 10,
        'select: "VendorAccountNumber,VendorOrganizationName,CurrencyCode,OnHoldStatus"
    }
);
```

</details>

<details>
<summary>createVendorsV2</summary>

Creates a new extended vendor record in the `VendorsV2` entity set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VendorV2` | Yes | The extended vendor record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `VendorV2|error`

Sample code:

```ballerina
vendorextended:VendorV2 created = check fo->createVendorsV2({
    dataAreaId: "USMF",
    vendorAccountNumber: "US-101",
    vendorOrganizationName: "Contoso Office Supplies",
    vendorSearchName: "CONTOSO OFFICE SUPPLIES",
    currencyCode: "USD",
    languageId: "en-us",
    addressStreet: "123 Industrial Way",
    addressCity: "Dallas",
    addressZipCode: "75201",
    addressCountryRegionId: "USA",
    primaryEmailAddress: "ap@contosooffice.example.com",
    vendorGroupId: "40",
    defaultPaymentTermsName: "Net30",
    onHoldStatus: "No"
});
```

</details>

<details>
<summary>getVendorsV2</summary>

Reads a specific extended vendor record from the `VendorsV2` entity set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier (e.g., `"USMF"`). |
| `vendorAccountNumber` | `string` | Yes | The vendor account number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetVendorsV2Queries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `VendorV2|error`

Sample code:

```ballerina
vendorextended:VendorV2 vendor = check fo->getVendorsV2(
    "USMF",
    "US-101",
    queries = {
        'select: "VendorAccountNumber,VendorOrganizationName,CreditLimit,OnHoldStatus"
    }
);
```

</details>

<details>
<summary>deleteVendorsV2</summary>

Deletes a specific extended vendor record from the `VendorsV2` entity set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vendorAccountNumber` | `string` | Yes | The vendor account number key field. |
| `headers` | `DeleteVendorsV2Headers` | No | Request headers, including an optional `ifMatch` ETag mapped to the `If-Match` header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVendorsV2(
    "USMF",
    "US-101",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateVendorsV2</summary>

Updates a specific extended vendor record in the `VendorsV2` entity set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vendorAccountNumber` | `string` | Yes | The vendor account number key field. |
| `payload` | `VendorV2` | Yes | Fields to update on the extended vendor record. |
| `headers` | `UpdateVendorsV2Headers` | No | Request headers, including an optional `ifMatch` ETag mapped to the `If-Match` header for optimistic concurrency. |

Returns: `VendorV2|error`

Sample code:

```ballerina
vendorextended:VendorV2 updated = check fo->updateVendorsV2(
    "USMF",
    "US-101",
    {
        creditLimit: 25000.00,
        onHoldStatus: "Invoice"
    },
    headers = {ifMatch: eTag}
);
```

</details>

#### Vendors V3

<details>
<summary>listVendorsV3</summary>

Reads all extended vendor records in the `VendorsV3` entity set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListVendorsV3Queries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `VendorsV3Collection|error`

Sample code:

```ballerina
vendorextended:VendorsV3Collection result = check fo->listVendorsV3(
    queries = {
        filter: "dataAreaId eq 'USMF' and OnHoldStatus eq Microsoft.Dynamics.DataEntities.CustVendorBlocked'No'",
        top: 10,
        crossCompany: true
    }
);
```

</details>

<details>
<summary>createVendorsV3</summary>

Creates a new extended vendor record in the `VendorsV3` entity set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VendorV3` | Yes | The extended vendor record to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `VendorV3|error`

Sample code:

```ballerina
vendorextended:VendorV3 created = check fo->createVendorsV3({
    dataAreaId: "USMF",
    vendorAccountNumber: "US-102",
    vendorOrganizationName: "Fabrikam Logistics",
    vendorSearchName: "FABRIKAM LOGISTICS",
    currencyCode: "USD",
    languageId: "en-us",
    addressStreet: "45 Harbor Road",
    addressCity: "Seattle",
    addressZipCode: "98101",
    addressCountryRegionId: "USA",
    primaryEmailAddress: "ap@fabrikamlogistics.example.com",
    vendorGroupId: "20",
    defaultPaymentTermsName: "Net45",
    onHoldStatus: "No"
});
```

</details>

<details>
<summary>getVendorsV3</summary>

Reads a specific extended vendor record from the `VendorsV3` entity set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier (e.g., `"USMF"`). |
| `vendorAccountNumber` | `string` | Yes | The vendor account number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetVendorsV3Queries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `VendorV3|error`

Sample code:

```ballerina
vendorextended:VendorV3 vendor = check fo->getVendorsV3(
    "USMF",
    "US-102",
    queries = {
        'select: "VendorAccountNumber,VendorOrganizationName,CreditLimit,OnHoldStatus"
    }
);
```

</details>

<details>
<summary>deleteVendorsV3</summary>

Deletes a specific extended vendor record from the `VendorsV3` entity set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vendorAccountNumber` | `string` | Yes | The vendor account number key field. |
| `headers` | `DeleteVendorsV3Headers` | No | Request headers, including an optional `ifMatch` ETag mapped to the `If-Match` header for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVendorsV3(
    "USMF",
    "US-102",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateVendorsV3</summary>

Updates a specific extended vendor record in the `VendorsV3` entity set.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vendorAccountNumber` | `string` | Yes | The vendor account number key field. |
| `payload` | `VendorV3` | Yes | Fields to update on the extended vendor record. |
| `headers` | `UpdateVendorsV3Headers` | No | Request headers, including an optional `ifMatch` ETag mapped to the `If-Match` header for optimistic concurrency. |

Returns: `VendorV3|error`

Sample code:

```ballerina
vendorextended:VendorV3 updated = check fo->updateVendorsV3(
    "USMF",
    "US-102",
    {
        creditLimit: 50000.00,
        defaultPaymentTermsName: "Net60"
    },
    headers = {ifMatch: eTag}
);
```

</details>
