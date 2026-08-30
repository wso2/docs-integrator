---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.vendor` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance Vendor entities via the OData REST API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance Vendor entities via the OData REST API.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials grant configuration used to obtain an access token from Microsoft Entra ID. |
| `httpVersion` | `string` | `"2.0"` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `ClientHttp1Settings` | `{}` | HTTP/1.x client settings including keep-alive, chunking, and proxy configuration. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.vendor;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

configurable string[] scopes = ["https://<your-org>.operations.dynamics.com/.default"];

vendor:Client fo = check new (
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

#### Vendor groups

<details>
<summary>listVendorGroups</summary>

Reads all vendor groups in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListVendorGroupsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `vendor:VendorGroupsCollection|error`

Sample code:

```ballerina
vendor:VendorGroupsCollection result = check fo->listVendorGroups(
    queries = {
        filter: "DefaultTaxGroupCode eq 'TAX-STD'",
        top: 20,
        'select: "VendorGroupId,Description,DefaultPaymentTermName"
    }
);
```

</details>

<details>
<summary>createVendorGroups</summary>

Creates a vendor group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VendorGroup` | Yes | The vendor group to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `vendor:VendorGroup|error`

Sample code:

```ballerina
vendor:VendorGroup created = check fo->createVendorGroups({
    dataAreaId: "USMF",
    vendorGroupId: "DOMESTIC",
    description: "Domestic vendors",
    defaultTaxGroupCode: "TAX-STD",
    defaultPaymentTermName: "NET30"
});
```

</details>

<details>
<summary>getVendorGroups</summary>

Reads a specific vendor group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier (e.g., `"USMF"`). |
| `vendorGroupId` | `string` | Yes | The vendor group id key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetVendorGroupsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `vendor:VendorGroup|error`

Sample code:

```ballerina
vendor:VendorGroup vendorGroup = check fo->getVendorGroups("USMF", "DOMESTIC");
```

</details>

<details>
<summary>deleteVendorGroups</summary>

Deletes a specific vendor group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vendorGroupId` | `string` | Yes | The vendor group id key field. |
| `headers` | `DeleteVendorGroupsHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVendorGroups("USMF", "DOMESTIC", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateVendorGroups</summary>

Updates a specific vendor group.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vendorGroupId` | `string` | Yes | The vendor group id key field. |
| `payload` | `VendorGroup` | Yes | Fields to update. |
| `headers` | `UpdateVendorGroupsHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `vendor:VendorGroup|error`

Sample code:

```ballerina
vendor:VendorGroup updated = check fo->updateVendorGroups(
    "USMF",
    "DOMESTIC",
    {defaultPaymentTermName: "NET45"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Vendor parameters

<details>
<summary>listVendorParameters</summary>

Reads the vendor (accounts payable) parameters for every company in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListVendorParametersQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `vendor:VendorParametersCollection|error`

Sample code:

```ballerina
vendor:VendorParametersCollection result = check fo->listVendorParameters(
    queries = {
        crossCompany: true
    }
);
```

</details>

<details>
<summary>createVendorParameters</summary>

Creates the vendor parameters record for a company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VendorParameter` | Yes | The vendor parameter fields to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `vendor:VendorParameter|error`

Sample code:

```ballerina
vendor:VendorParameter created = check fo->createVendorParameters({
    dataAreaId: "USMF",
    taxGroup: "TAX-STD",
    postingProfile: "VEND",
    mandatoryTaxGroup: "Yes"
});
```

</details>

<details>
<summary>getVendorParameters</summary>

Reads the vendor parameters for a specific company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetVendorParametersQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `vendor:VendorParameter|error`

Sample code:

```ballerina
vendor:VendorParameter parameters = check fo->getVendorParameters("USMF");
```

</details>

<details>
<summary>deleteVendorParameters</summary>

Deletes the vendor parameters record for a specific company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `headers` | `DeleteVendorParametersHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVendorParameters("USMF", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateVendorParameters</summary>

Updates the vendor parameters record for a specific company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `payload` | `VendorParameter` | Yes | Fields to update. |
| `headers` | `UpdateVendorParametersHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `vendor:VendorParameter|error`

Sample code:

```ballerina
vendor:VendorParameter updated = check fo->updateVendorParameters(
    "USMF",
    {mandatoryTaxGroup: "No"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Vendor reasons

<details>
<summary>listVendorReasons</summary>

Reads all vendor reason codes in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListVendorReasonsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `vendor:VendorReasonsCollection|error`

Sample code:

```ballerina
vendor:VendorReasonsCollection result = check fo->listVendorReasons(
    queries = {
        filter: "ForVendorTransactionType eq Microsoft.Dynamics.DataEntities.NoYes'Yes'"
    }
);
```

</details>

<details>
<summary>createVendorReasons</summary>

Creates a vendor reason code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VendorReasons` | Yes | The vendor reason code to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `vendor:VendorReasons|error`

Sample code:

```ballerina
vendor:VendorReasons created = check fo->createVendorReasons({
    dataAreaId: "USMF",
    reasonCode: "DUPLICATE",
    defaultComment: "Duplicate invoice received",
    cancellationReason: "Yes",
    forVendorTransactionType: "Yes"
});
```

</details>

<details>
<summary>getVendorReasons</summary>

Reads a specific vendor reason code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `reasonCode` | `string` | Yes | The reason code key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetVendorReasonsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `vendor:VendorReasons|error`

Sample code:

```ballerina
vendor:VendorReasons reason = check fo->getVendorReasons("USMF", "DUPLICATE");
```

</details>

<details>
<summary>deleteVendorReasons</summary>

Deletes a specific vendor reason code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `reasonCode` | `string` | Yes | The reason code key field. |
| `headers` | `DeleteVendorReasonsHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVendorReasons("USMF", "DUPLICATE", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateVendorReasons</summary>

Updates a specific vendor reason code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `reasonCode` | `string` | Yes | The reason code key field. |
| `payload` | `VendorReasons` | Yes | Fields to update. |
| `headers` | `UpdateVendorReasonsHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `vendor:VendorReasons|error`

Sample code:

```ballerina
vendor:VendorReasons updated = check fo->updateVendorReasons(
    "USMF",
    "DUPLICATE",
    {defaultComment: "Duplicate vendor invoice - written off"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Vendors

<details>
<summary>listVendors</summary>

Reads all vendors in the system.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `ListVendorsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `vendor:VendorsCollection|error`

Sample code:

```ballerina
vendor:VendorsCollection result = check fo->listVendors(
    queries = {
        filter: "VendorGroupId eq 'DOMESTIC'",
        top: 25,
        'select: "VendorAccountNumber,VendorName,CurrencyCode,OnHoldStatus"
    }
);
```

</details>

<details>
<summary>createVendors</summary>

Creates a vendor.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Vendor` | Yes | The vendor to create. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |

Returns: `vendor:Vendor|error`

Sample code:

```ballerina
vendor:Vendor created = check fo->createVendors({
    dataAreaId: "USMF",
    vendorAccountNumber: "US-100234",
    vendorName: "Contoso Office Supplies",
    vendorGroupId: "DOMESTIC",
    currencyCode: "USD",
    languageId: "en-us",
    defaultPaymentTermsName: "NET30",
    onHoldStatus: "No"
});
```

</details>

<details>
<summary>getVendors</summary>

Reads a specific vendor.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vendorAccountNumber` | `string` | Yes | The vendor account number key field. |
| `headers` | `map<string\|string[]>` | No | Additional HTTP request headers. |
| `queries` | `GetVendorsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `vendor:Vendor|error`

Sample code:

```ballerina
vendor:Vendor vendorRecord = check fo->getVendors(
    "USMF",
    "US-100234",
    queries = {
        'select: "VendorAccountNumber,VendorName,OnHoldStatus,CreditLimit"
    }
);
```

</details>

<details>
<summary>deleteVendors</summary>

Deletes a specific vendor.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vendorAccountNumber` | `string` | Yes | The vendor account number key field. |
| `headers` | `DeleteVendorsHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVendors("USMF", "US-100234", headers = {ifMatch: eTag});
```

</details>

<details>
<summary>updateVendors</summary>

Updates a specific vendor.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vendorAccountNumber` | `string` | Yes | The vendor account number key field. |
| `payload` | `Vendor` | Yes | Fields to update. |
| `headers` | `UpdateVendorsHeaders` | No | Additional HTTP request headers; set `ifMatch` to the entity's current ETag for optimistic concurrency. |

Returns: `vendor:Vendor|error`

Sample code:

```ballerina
vendor:Vendor updated = check fo->updateVendors(
    "USMF",
    "US-100234",
    {onHoldStatus: "Invoice", creditLimit: 50000.00},
    headers = {ifMatch: eTag}
);
```

</details>
