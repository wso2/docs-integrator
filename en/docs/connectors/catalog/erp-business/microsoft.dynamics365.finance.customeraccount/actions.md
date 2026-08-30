---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.customeraccount` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance customer electronic addresses, postal addresses, payment methods, payment journal headers and lines, and posting profiles via the Dynamics 365 Finance and Operations OData API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance customer electronic addresses, postal addresses, payment methods, payment journal headers and lines, and posting profiles via the Dynamics 365 Finance and Operations OData API.

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
import ballerinax/microsoft.dynamics365.finance.customeraccount;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

customeraccount:Client fo = check new (
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

#### Customer electronic addresses

<details>
<summary>listCustomerElectronicAddresses</summary>

Reads all customer electronic addresses (phone, email, URL, and other contact methods).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCustomerElectronicAddressesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `customeraccount:CustomerElectronicAddressesCollection|error`

Sample code:

```ballerina
customeraccount:CustomerElectronicAddressesCollection addresses = check fo->listCustomerElectronicAddresses(
    queries = {
        filter: "CustomerAccount eq 'CUST-3001' and Type eq 'Email'",
        top: 20,
        'select: "CustomerAccount,ElectronicAddressId,Type,Locator,IsPrimary"
    }
);
```

</details>

<details>
<summary>createCustomerElectronicAddresses</summary>

Creates a customer electronic address.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomerElectronicAddress` | Yes | The customer electronic address to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `customeraccount:CustomerElectronicAddress|error`

Sample code:

```ballerina
customeraccount:CustomerElectronicAddress address = check fo->createCustomerElectronicAddresses({
    dataAreaId: "USMF",
    customerAccount: "CUST-3001",
    electronicAddressId: "EA-0001",
    'type: "Email",
    locator: "ap@contoso.com",
    purpose: "Business",
    description: "Primary accounts payable contact",
    isPrimary: "Yes",
    isPrivate: "No"
});
```

</details>

<details>
<summary>getCustomerElectronicAddresses</summary>

Reads a specific customer electronic address by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `electronicAddressId` | `string` | Yes | The electronic address id key field. |
| `customerAccount` | `string` | Yes | The customer account key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCustomerElectronicAddressesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `customeraccount:CustomerElectronicAddress|error`

Sample code:

```ballerina
customeraccount:CustomerElectronicAddress address = check fo->getCustomerElectronicAddresses(
    "USMF",
    "EA-0001",
    "CUST-3001"
);
```

</details>

<details>
<summary>deleteCustomerElectronicAddresses</summary>

Deletes a specific customer electronic address.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `electronicAddressId` | `string` | Yes | The electronic address id key field. |
| `customerAccount` | `string` | Yes | The customer account key field. |
| `headers` | `DeleteCustomerElectronicAddressesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCustomerElectronicAddresses(
    "USMF",
    "EA-0001",
    "CUST-3001",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCustomerElectronicAddresses</summary>

Updates a specific customer electronic address.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `electronicAddressId` | `string` | Yes | The electronic address id key field. |
| `customerAccount` | `string` | Yes | The customer account key field. |
| `payload` | `CustomerElectronicAddress` | Yes | The fields to update. |
| `headers` | `UpdateCustomerElectronicAddressesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `customeraccount:CustomerElectronicAddress|error`

Sample code:

```ballerina
customeraccount:CustomerElectronicAddress updated = check fo->updateCustomerElectronicAddresses(
    "USMF",
    "EA-0001",
    "CUST-3001",
    {isPrimary: "No"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Customer payment journal headers

<details>
<summary>listCustomerPaymentJournalHeaders</summary>

Reads all customer payment journal headers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCustomerPaymentJournalHeadersQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `customeraccount:CustomerPaymentJournalHeadersCollection|error`

Sample code:

```ballerina
customeraccount:CustomerPaymentJournalHeadersCollection headers = check fo->listCustomerPaymentJournalHeaders(
    queries = {
        filter: "JournalName eq 'CustPayment' and IsPosted eq 'No'",
        top: 20
    }
);
```

</details>

<details>
<summary>createCustomerPaymentJournalHeaders</summary>

Creates a customer payment journal header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomerPaymentJournalHeader` | Yes | The customer payment journal header to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `customeraccount:CustomerPaymentJournalHeader|error`

Sample code:

```ballerina
customeraccount:CustomerPaymentJournalHeader header = check fo->createCustomerPaymentJournalHeaders({
    dataAreaId: "USMF",
    journalBatchNumber: "CustPmt-000123",
    journalName: "CustPayment",
    description: "Customer payments - August batch",
    isPosted: "No",
    overrideSalesTax: "No"
});
```

</details>

<details>
<summary>getCustomerPaymentJournalHeaders</summary>

Reads a specific customer payment journal header by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCustomerPaymentJournalHeadersQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `customeraccount:CustomerPaymentJournalHeader|error`

Sample code:

```ballerina
customeraccount:CustomerPaymentJournalHeader header = check fo->getCustomerPaymentJournalHeaders(
    "USMF",
    "CustPmt-000123"
);
```

</details>

<details>
<summary>deleteCustomerPaymentJournalHeaders</summary>

Deletes a specific customer payment journal header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `headers` | `DeleteCustomerPaymentJournalHeadersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCustomerPaymentJournalHeaders(
    "USMF",
    "CustPmt-000123",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCustomerPaymentJournalHeaders</summary>

Updates a specific customer payment journal header.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `payload` | `CustomerPaymentJournalHeader` | Yes | The fields to update. |
| `headers` | `UpdateCustomerPaymentJournalHeadersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `customeraccount:CustomerPaymentJournalHeader|error`

Sample code:

```ballerina
customeraccount:CustomerPaymentJournalHeader updated = check fo->updateCustomerPaymentJournalHeaders(
    "USMF",
    "CustPmt-000123",
    {description: "Customer payments - August batch (revised)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Customer payment journal lines

<details>
<summary>listCustomerPaymentJournalLines</summary>

Reads all customer payment journal lines.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCustomerPaymentJournalLinesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `customeraccount:CustomerPaymentJournalLinesCollection|error`

Sample code:

```ballerina
customeraccount:CustomerPaymentJournalLinesCollection lines = check fo->listCustomerPaymentJournalLines(
    queries = {
        filter: "JournalBatchNumber eq 'CustPmt-000123'",
        orderby: "LineNumber asc"
    }
);
```

</details>

<details>
<summary>createCustomerPaymentJournalLines</summary>

Creates a customer payment journal line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomerPaymentJournalLine` | Yes | The customer payment journal line to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `customeraccount:CustomerPaymentJournalLine|error`

Sample code:

```ballerina
customeraccount:CustomerPaymentJournalLine line = check fo->createCustomerPaymentJournalLines({
    dataAreaId: "USMF",
    journalBatchNumber: "CustPmt-000123",
    lineNumber: 1,
    accountType: "Cust",
    accountDisplayValue: "CUST-3001",
    offsetAccountType: "Bank",
    offsetAccountDisplayValue: "USMF OPER USD",
    creditAmount: 1500.00,
    currencyCode: "USD",
    transactionText: "Payment received - INV-000456",
    paymentMethodName: "CHECK",
    customerName: "Contoso Retail"
});
```

</details>

<details>
<summary>getCustomerPaymentJournalLines</summary>

Reads a specific customer payment journal line by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCustomerPaymentJournalLinesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `customeraccount:CustomerPaymentJournalLine|error`

Sample code:

```ballerina
customeraccount:CustomerPaymentJournalLine line = check fo->getCustomerPaymentJournalLines(
    "USMF",
    "CustPmt-000123",
    1
);
```

</details>

<details>
<summary>deleteCustomerPaymentJournalLines</summary>

Deletes a specific customer payment journal line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `headers` | `DeleteCustomerPaymentJournalLinesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCustomerPaymentJournalLines(
    "USMF",
    "CustPmt-000123",
    1,
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCustomerPaymentJournalLines</summary>

Updates a specific customer payment journal line.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `journalBatchNumber` | `string` | Yes | The journal batch number key field. |
| `lineNumber` | `decimal` | Yes | The line number key field. |
| `payload` | `CustomerPaymentJournalLine` | Yes | The fields to update. |
| `headers` | `UpdateCustomerPaymentJournalLinesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `customeraccount:CustomerPaymentJournalLine|error`

Sample code:

```ballerina
customeraccount:CustomerPaymentJournalLine updated = check fo->updateCustomerPaymentJournalLines(
    "USMF",
    "CustPmt-000123",
    1,
    {creditAmount: 1600.00},
    headers = {ifMatch: eTag}
);
```

</details>

#### Customer payment methods

<details>
<summary>listCustomerPaymentMethods</summary>

Reads all customer payment methods.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCustomerPaymentMethodsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `customeraccount:CustomerPaymentMethodsCollection|error`

Sample code:

```ballerina
customeraccount:CustomerPaymentMethodsCollection methods = check fo->listCustomerPaymentMethods(
    queries = {
        filter: "PaymentType eq 'Check'",
        'select: "Name,Description,PaymentType,IsSEPA,DirectDebit"
    }
);
```

</details>

<details>
<summary>createCustomerPaymentMethods</summary>

Creates a customer payment method.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomerPaymentMethod` | Yes | The customer payment method to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `customeraccount:CustomerPaymentMethod|error`

Sample code:

```ballerina
customeraccount:CustomerPaymentMethod method = check fo->createCustomerPaymentMethods({
    dataAreaId: "USMF",
    name: "CHECK",
    description: "Check payment",
    paymentType: "Check",
    accountType: "Cust",
    isSEPA: "No",
    directDebit: "No",
    paymentJournalName: "CustPayment"
});
```

</details>

<details>
<summary>getCustomerPaymentMethods</summary>

Reads a specific customer payment method by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `name` | `string` | Yes | The name key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCustomerPaymentMethodsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `customeraccount:CustomerPaymentMethod|error`

Sample code:

```ballerina
customeraccount:CustomerPaymentMethod method = check fo->getCustomerPaymentMethods(
    "USMF",
    "CHECK"
);
```

</details>

<details>
<summary>deleteCustomerPaymentMethods</summary>

Deletes a specific customer payment method.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `name` | `string` | Yes | The name key field. |
| `headers` | `DeleteCustomerPaymentMethodsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCustomerPaymentMethods(
    "USMF",
    "CHECK",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCustomerPaymentMethods</summary>

Updates a specific customer payment method.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `name` | `string` | Yes | The name key field. |
| `payload` | `CustomerPaymentMethod` | Yes | The fields to update. |
| `headers` | `UpdateCustomerPaymentMethodsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `customeraccount:CustomerPaymentMethod|error`

Sample code:

```ballerina
customeraccount:CustomerPaymentMethod updated = check fo->updateCustomerPaymentMethods(
    "USMF",
    "CHECK",
    {directDebit: "Yes"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Customer postal addresses

<details>
<summary>listCustomerPostalAddressesV2</summary>

Reads all customer postal addresses.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCustomerPostalAddressesV2Queries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `customeraccount:CustomerPostalAddressesV2Collection|error`

Sample code:

```ballerina
customeraccount:CustomerPostalAddressesV2Collection addresses = check fo->listCustomerPostalAddressesV2(
    queries = {
        filter: "CustomerAccount eq 'CUST-3001' and IsPrimary eq 'Yes'",
        top: 10
    }
);
```

</details>

<details>
<summary>createCustomerPostalAddressesV2</summary>

Creates a customer postal address.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomerPostalAddressV2` | Yes | The customer postal address to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `customeraccount:CustomerPostalAddressV2|error`

Sample code:

```ballerina
customeraccount:CustomerPostalAddressV2 address = check fo->createCustomerPostalAddressesV2({
    dataAreaId: "USMF",
    customerAccount: "CUST-3001",
    addressLocationId: "LOC-001",
    addressDescription: "Head office",
    addressStreet: "123 Market Street",
    addressStreetNumber: "123",
    addressCity: "Seattle",
    addressState: "WA",
    addressZipCode: "98101",
    addressCountryRegionId: "USA",
    addressCountryRegionISOCode: "US",
    isPrimary: "Yes",
    isPrivate: "No"
});
```

</details>

<details>
<summary>getCustomerPostalAddressesV2</summary>

Reads a specific customer postal address by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerAccount` | `string` | Yes | The customer account key field. |
| `addressLocationId` | `string` | Yes | The address location id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCustomerPostalAddressesV2Queries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `customeraccount:CustomerPostalAddressV2|error`

Sample code:

```ballerina
customeraccount:CustomerPostalAddressV2 address = check fo->getCustomerPostalAddressesV2(
    "USMF",
    "CUST-3001",
    "LOC-001"
);
```

</details>

<details>
<summary>deleteCustomerPostalAddressesV2</summary>

Deletes a specific customer postal address.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerAccount` | `string` | Yes | The customer account key field. |
| `addressLocationId` | `string` | Yes | The address location id key field. |
| `headers` | `DeleteCustomerPostalAddressesV2Headers` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCustomerPostalAddressesV2(
    "USMF",
    "CUST-3001",
    "LOC-001",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCustomerPostalAddressesV2</summary>

Updates a specific customer postal address.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `customerAccount` | `string` | Yes | The customer account key field. |
| `addressLocationId` | `string` | Yes | The address location id key field. |
| `payload` | `CustomerPostalAddressV2` | Yes | The fields to update. |
| `headers` | `UpdateCustomerPostalAddressesV2Headers` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `customeraccount:CustomerPostalAddressV2|error`

Sample code:

```ballerina
customeraccount:CustomerPostalAddressV2 updated = check fo->updateCustomerPostalAddressesV2(
    "USMF",
    "CUST-3001",
    "LOC-001",
    {addressZipCode: "98104"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Customer posting profiles

<details>
<summary>listCustomerPostingProfiles</summary>

Reads all customer posting profiles.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCustomerPostingProfilesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `customeraccount:CustomerPostingProfilesCollection|error`

Sample code:

```ballerina
customeraccount:CustomerPostingProfilesCollection profiles = check fo->listCustomerPostingProfiles(
    queries = {
        filter: "dataAreaId eq 'USMF'"
    }
);
```

</details>

<details>
<summary>createCustomerPostingProfiles</summary>

Creates a customer posting profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomerPostingProfile` | Yes | The customer posting profile to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `customeraccount:CustomerPostingProfile|error`

Sample code:

```ballerina
customeraccount:CustomerPostingProfile profile = check fo->createCustomerPostingProfiles({
    dataAreaId: "USMF",
    postingProfile: "CustDefault",
    description: "Default customer posting profile",
    isTransactionIncludedInAutoSettlement: "Yes",
    isTransactionIncludedInInterestCalculation: "Yes",
    isTransactionIncludedInCollectionLetterGeneration: "Yes"
});
```

</details>

<details>
<summary>getCustomerPostingProfiles</summary>

Reads a specific customer posting profile by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `postingProfile` | `string` | Yes | The posting profile key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCustomerPostingProfilesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `customeraccount:CustomerPostingProfile|error`

Sample code:

```ballerina
customeraccount:CustomerPostingProfile profile = check fo->getCustomerPostingProfiles(
    "USMF",
    "CustDefault"
);
```

</details>

<details>
<summary>deleteCustomerPostingProfiles</summary>

Deletes a specific customer posting profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `postingProfile` | `string` | Yes | The posting profile key field. |
| `headers` | `DeleteCustomerPostingProfilesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCustomerPostingProfiles(
    "USMF",
    "CustDefault",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCustomerPostingProfiles</summary>

Updates a specific customer posting profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `postingProfile` | `string` | Yes | The posting profile key field. |
| `payload` | `CustomerPostingProfile` | Yes | The fields to update. |
| `headers` | `UpdateCustomerPostingProfilesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `customeraccount:CustomerPostingProfile|error`

Sample code:

```ballerina
customeraccount:CustomerPostingProfile updated = check fo->updateCustomerPostingProfiles(
    "USMF",
    "CustDefault",
    {isTransactionIncludedInCollectionLetterGeneration: "No"},
    headers = {ifMatch: eTag}
);
```

</details>
