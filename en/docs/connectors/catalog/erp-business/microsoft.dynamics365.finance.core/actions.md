---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.core` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance companies, business units, branches, departments, address reference data, and CDS party records via the Dynamics 365 Finance and Operations OData API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance companies, business units, branches, departments, address reference data, and CDS party records via the Dynamics 365 Finance and Operations OData API.

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
import ballerinax/microsoft.dynamics365.finance.core;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

core:Client fo = check new (
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

#### Address Books

<details>
<summary>listAddressBooks</summary>

Reads all address books.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListAddressBooksQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `core:AddressBooksCollection|error`

Sample code:

```ballerina
core:AddressBooksCollection books = check fo->listAddressBooks(
    queries = {
        filter: "system eq 'No'",
        top: 20,
        'select: "name,description"
    }
);
```

</details>

<details>
<summary>createAddressBooks</summary>

Creates an address book.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AddressBooks` | Yes | The address book to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `core:AddressBooks|error`

Sample code:

```ballerina
core:AddressBooks book = check fo->createAddressBooks({
    name: "CUSTOMERS",
    description: "Customer address book",
    system: "No"
});
```

</details>

<details>
<summary>getAddressBooks</summary>

Reads a specific address book by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetAddressBooksQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `core:AddressBooks|error`

Sample code:

```ballerina
core:AddressBooks book = check fo->getAddressBooks("CUSTOMERS");
```

</details>

<details>
<summary>deleteAddressBooks</summary>

Deletes a specific address book.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field. |
| `headers` | `DeleteAddressBooksHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAddressBooks(
    "CUSTOMERS",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateAddressBooks</summary>

Updates a specific address book.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The name key field. |
| `payload` | `AddressBooks` | Yes | The fields to update. |
| `headers` | `UpdateAddressBooksHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `core:AddressBooks|error`

Sample code:

```ballerina
core:AddressBooks updated = check fo->updateAddressBooks(
    "CUSTOMERS",
    {description: "Primary customer address book"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Address Cities

<details>
<summary>listAddressCities</summary>

Reads all address cities.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListAddressCitiesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `core:AddressCitiesCollection|error`

Sample code:

```ballerina
core:AddressCitiesCollection cities = check fo->listAddressCities(
    queries = {
        filter: "countryRegionId eq 'USA'",
        orderby: "name",
        top: 25
    }
);
```

</details>

<details>
<summary>createAddressCities</summary>

Creates an address city.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AddressCity` | Yes | The address city to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `core:AddressCity|error`

Sample code:

```ballerina
core:AddressCity city = check fo->createAddressCities({
    cityKey: "US-NYC",
    name: "New York",
    countryRegionId: "USA",
    stateId: "NY",
    description: "New York City"
});
```

</details>

<details>
<summary>getAddressCities</summary>

Reads a specific address city by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cityKey` | `string` | Yes | The city key key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetAddressCitiesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `core:AddressCity|error`

Sample code:

```ballerina
core:AddressCity city = check fo->getAddressCities("US-NYC");
```

</details>

<details>
<summary>deleteAddressCities</summary>

Deletes a specific address city.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cityKey` | `string` | Yes | The city key key field. |
| `headers` | `DeleteAddressCitiesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAddressCities(
    "US-NYC",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateAddressCities</summary>

Updates a specific address city.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cityKey` | `string` | Yes | The city key key field. |
| `payload` | `AddressCity` | Yes | The fields to update. |
| `headers` | `UpdateAddressCitiesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `core:AddressCity|error`

Sample code:

```ballerina
core:AddressCity updated = check fo->updateAddressCities(
    "US-NYC",
    {description: "New York City, NY"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Address Formats

<details>
<summary>listAddressFormats</summary>

Reads all address formats.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListAddressFormatsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `core:AddressFormatsCollection|error`

Sample code:

```ballerina
core:AddressFormatsCollection formats = check fo->listAddressFormats(
    queries = {
        filter: "addressFormat eq 'US'"
    }
);
```

</details>

<details>
<summary>createAddressFormats</summary>

Creates an address format.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AddressFormat` | Yes | The address format to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `core:AddressFormat|error`

Sample code:

```ballerina
core:AddressFormat format = check fo->createAddressFormats({
    addressFormat: "US",
    description: "United States address format"
});
```

</details>

<details>
<summary>getAddressFormats</summary>

Reads a specific address format by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `addressFormat` | `string` | Yes | The address format key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetAddressFormatsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `core:AddressFormat|error`

Sample code:

```ballerina
core:AddressFormat format = check fo->getAddressFormats("US");
```

</details>

<details>
<summary>deleteAddressFormats</summary>

Deletes a specific address format.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `addressFormat` | `string` | Yes | The address format key field. |
| `headers` | `DeleteAddressFormatsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAddressFormats(
    "US",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateAddressFormats</summary>

Updates a specific address format.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `addressFormat` | `string` | Yes | The address format key field. |
| `payload` | `AddressFormat` | Yes | The fields to update. |
| `headers` | `UpdateAddressFormatsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `core:AddressFormat|error`

Sample code:

```ballerina
core:AddressFormat updated = check fo->updateAddressFormats(
    "US",
    {description: "US mailing address format"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Address Objects

<details>
<summary>listAddressObjects</summary>

Reads all address objects (localized address classifier records, e.g. Russian KLADR-style entries).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListAddressObjectsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `core:AddressObjectsCollection|error`

Sample code:

```ballerina
core:AddressObjectsCollection objects = check fo->listAddressObjects(
    queries = {
        filter: "dataAreaId eq 'USMF'",
        top: 50
    }
);
```

</details>

<details>
<summary>createAddressObjects</summary>

Creates an address object.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AddressObject` | Yes | The address object to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `core:AddressObject|error`

Sample code:

```ballerina
core:AddressObject object = check fo->createAddressObjects({
    dataAreaId: "USMF",
    aOId: "77000000000",
    shortName: "Moscow",
    offName: "Moscow",
    aOLevel: "1",
    regionCode: "77",
    postalCode: "101000"
});
```

</details>

<details>
<summary>getAddressObjects</summary>

Reads a specific address object by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `aOId` | `string` | Yes | The address object ID key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetAddressObjectsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `core:AddressObject|error`

Sample code:

```ballerina
core:AddressObject object = check fo->getAddressObjects("USMF", "77000000000");
```

</details>

<details>
<summary>deleteAddressObjects</summary>

Deletes a specific address object.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `aOId` | `string` | Yes | The address object ID key field. |
| `headers` | `DeleteAddressObjectsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAddressObjects(
    "USMF",
    "77000000000",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateAddressObjects</summary>

Updates a specific address object.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `aOId` | `string` | Yes | The address object ID key field. |
| `payload` | `AddressObject` | Yes | The fields to update. |
| `headers` | `UpdateAddressObjectsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `core:AddressObject|error`

Sample code:

```ballerina
core:AddressObject updated = check fo->updateAddressObjects(
    "USMF",
    "77000000000",
    {shortName: "Moscow city"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Address States

<details>
<summary>listAddressStates</summary>

Reads all address states/provinces.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListAddressStatesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `core:AddressStatesCollection|error`

Sample code:

```ballerina
core:AddressStatesCollection states = check fo->listAddressStates(
    queries = {
        filter: "countryRegionId eq 'USA'"
    }
);
```

</details>

<details>
<summary>createAddressStates</summary>

Creates an address state/province.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `AddressState` | Yes | The address state to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `core:AddressState|error`

Sample code:

```ballerina
core:AddressState state = check fo->createAddressStates({
    countryRegionId: "USA",
    state: "NY",
    name: "New York",
    timeZone: "GMTMINUS0500EASTERNTIME",
    defaultStateForCountryRegion: "No"
});
```

</details>

<details>
<summary>getAddressStates</summary>

Reads a specific address state by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `countryRegionId` | `string` | Yes | The country region id key field. |
| `state` | `string` | Yes | The state key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetAddressStatesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `core:AddressState|error`

Sample code:

```ballerina
core:AddressState state = check fo->getAddressStates("USA", "NY");
```

</details>

<details>
<summary>deleteAddressStates</summary>

Deletes a specific address state.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `countryRegionId` | `string` | Yes | The country region id key field. |
| `state` | `string` | Yes | The state key field. |
| `headers` | `DeleteAddressStatesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteAddressStates(
    "USA",
    "NY",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateAddressStates</summary>

Updates a specific address state.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `countryRegionId` | `string` | Yes | The country region id key field. |
| `state` | `string` | Yes | The state key field. |
| `payload` | `AddressState` | Yes | The fields to update. |
| `headers` | `UpdateAddressStatesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `core:AddressState|error`

Sample code:

```ballerina
core:AddressState updated = check fo->updateAddressStates(
    "USA",
    "NY",
    {name: "New York State"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Branches

<details>
<summary>listBranches</summary>

Reads all branches.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListBranchesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `core:BranchesCollection|error`

Sample code:

```ballerina
core:BranchesCollection branches = check fo->listBranches(
    queries = {
        filter: "dataAreaId eq 'USMF'"
    }
);
```

</details>

<details>
<summary>createBranches</summary>

Creates a branch.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Branch` | Yes | The branch to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `core:Branch|error`

Sample code:

```ballerina
core:Branch branch = check fo->createBranches({
    dataAreaId: "USMF",
    code: "B001",
    name: "Downtown Branch",
    headOffice: "No"
});
```

</details>

<details>
<summary>getBranches</summary>

Reads a specific branch by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `code` | `string` | Yes | The branch code key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetBranchesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `core:Branch|error`

Sample code:

```ballerina
core:Branch branch = check fo->getBranches("USMF", "B001");
```

</details>

<details>
<summary>deleteBranches</summary>

Deletes a specific branch.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `code` | `string` | Yes | The branch code key field. |
| `headers` | `DeleteBranchesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteBranches(
    "USMF",
    "B001",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateBranches</summary>

Updates a specific branch.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `code` | `string` | Yes | The branch code key field. |
| `payload` | `Branch` | Yes | The fields to update. |
| `headers` | `UpdateBranchesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `core:Branch|error`

Sample code:

```ballerina
core:Branch updated = check fo->updateBranches(
    "USMF",
    "B001",
    {name: "Downtown Branch - Renovated"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Business Units

<details>
<summary>listBusinessUnits</summary>

Reads all business units.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListBusinessUnitsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `core:BusinessUnitsCollection|error`

Sample code:

```ballerina
core:BusinessUnitsCollection units = check fo->listBusinessUnits(
    queries = {
        filter: "operatingUnitType eq 'OMBusinessUnit'",
        'select: "operatingUnitNumber,name"
    }
);
```

</details>

<details>
<summary>createBusinessUnits</summary>

Creates a business unit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `BusinessUnit` | Yes | The business unit to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `core:BusinessUnit|error`

Sample code:

```ballerina
core:BusinessUnit unit = check fo->createBusinessUnits({
    operatingUnitNumber: "BU-01",
    name: "North America Operations",
    operatingUnitType: "OMBusinessUnit",
    addressCity: "Seattle",
    addressCountryRegionId: "USA"
});
```

</details>

<details>
<summary>getBusinessUnits</summary>

Reads a specific business unit by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `operatingUnitNumber` | `string` | Yes | The operating unit number key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetBusinessUnitsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `core:BusinessUnit|error`

Sample code:

```ballerina
core:BusinessUnit unit = check fo->getBusinessUnits("BU-01");
```

</details>

<details>
<summary>deleteBusinessUnits</summary>

Deletes a specific business unit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `operatingUnitNumber` | `string` | Yes | The operating unit number key field. |
| `headers` | `DeleteBusinessUnitsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteBusinessUnits(
    "BU-01",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateBusinessUnits</summary>

Updates a specific business unit.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `operatingUnitNumber` | `string` | Yes | The operating unit number key field. |
| `payload` | `BusinessUnit` | Yes | The fields to update. |
| `headers` | `UpdateBusinessUnitsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `core:BusinessUnit|error`

Sample code:

```ballerina
core:BusinessUnit updated = check fo->updateBusinessUnits(
    "BU-01",
    {name: "North America Business Unit"},
    headers = {ifMatch: eTag}
);
```

</details>

#### CDS Parties

<details>
<summary>listCDSParties</summary>

Reads all CDS party records (organizations and people shared across Dynamics 365).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCDSPartiesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `core:CDSPartiesCollection|error`

Sample code:

```ballerina
core:CDSPartiesCollection parties = check fo->listCDSParties(
    queries = {
        filter: "partyType eq 'Person'",
        top: 20
    }
);
```

</details>

<details>
<summary>createCDSParties</summary>

Creates a CDS party record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CDSParty` | Yes | The party record to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `core:CDSParty|error`

Sample code:

```ballerina
core:CDSParty party = check fo->createCDSParties({
    partyNumber: "000789",
    partyType: "Person",
    personFirstName: "Alex",
    personLastName: "Rivera",
    personGender: "Male",
    languageId: "en-us"
});
```

</details>

<details>
<summary>getCDSParties</summary>

Reads a specific CDS party record by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCDSPartiesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `core:CDSParty|error`

Sample code:

```ballerina
core:CDSParty party = check fo->getCDSParties("000789");
```

</details>

<details>
<summary>deleteCDSParties</summary>

Deletes a specific CDS party record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `headers` | `DeleteCDSPartiesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCDSParties(
    "000789",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCDSParties</summary>

Updates a specific CDS party record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `payload` | `CDSParty` | Yes | The fields to update. |
| `headers` | `UpdateCDSPartiesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `core:CDSParty|error`

Sample code:

```ballerina
core:CDSParty updated = check fo->updateCDSParties(
    "000789",
    {knownAs: "A. Rivera"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Companies

<details>
<summary>listCompanies</summary>

Reads all companies (legal entities).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCompaniesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `core:CompaniesCollection|error`

Sample code:

```ballerina
core:CompaniesCollection companies = check fo->listCompanies(
    queries = {
        filter: "languageId eq 'en-us'",
        count: true
    }
);
```

</details>

<details>
<summary>createCompanies</summary>

Creates a company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Company` | Yes | The company to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `core:Company|error`

Sample code:

```ballerina
core:Company company = check fo->createCompanies({
    dataArea: "USMF",
    name: "Contoso Entertainment System USA",
    knownAs: "USMF",
    languageId: "en-us"
});
```

</details>

<details>
<summary>getCompanies</summary>

Reads a specific company by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataArea` | `string` | Yes | The data area key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCompaniesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `core:Company|error`

Sample code:

```ballerina
core:Company company = check fo->getCompanies("USMF");
```

</details>

<details>
<summary>deleteCompanies</summary>

Deletes a specific company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataArea` | `string` | Yes | The data area key field. |
| `headers` | `DeleteCompaniesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCompanies(
    "USMF",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCompanies</summary>

Updates a specific company.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataArea` | `string` | Yes | The data area key field. |
| `payload` | `Company` | Yes | The fields to update. |
| `headers` | `UpdateCompaniesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `core:Company|error`

Sample code:

```ballerina
core:Company updated = check fo->updateCompanies(
    "USMF",
    {name: "Contoso Entertainment System USA (Updated)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Departments

<details>
<summary>listDepartments</summary>

Reads all departments.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListDepartmentsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `core:DepartmentsCollection|error`

Sample code:

```ballerina
core:DepartmentsCollection departments = check fo->listDepartments(
    queries = {
        filter: "organizationType eq 'OMDepartment'"
    }
);
```

</details>

<details>
<summary>createDepartments</summary>

Creates a department.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Department` | Yes | The department to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `core:Department|error`

Sample code:

```ballerina
core:Department department = check fo->createDepartments({
    partyNumber: "000456",
    operatingUnitNumber: "DEPT-10",
    name: "Finance Department",
    organizationType: "OMDepartment",
    language: "en-us"
});
```

</details>

<details>
<summary>getDepartments</summary>

Reads a specific department by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetDepartmentsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `core:Department|error`

Sample code:

```ballerina
core:Department department = check fo->getDepartments("000456");
```

</details>

<details>
<summary>deleteDepartments</summary>

Deletes a specific department.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `headers` | `DeleteDepartmentsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDepartments(
    "000456",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateDepartments</summary>

Updates a specific department.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field. |
| `payload` | `Department` | Yes | The fields to update. |
| `headers` | `UpdateDepartmentsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `core:Department|error`

Sample code:

```ballerina
core:Department updated = check fo->updateDepartments(
    "000456",
    {name: "Finance and Accounting Department"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Departments V2

<details>
<summary>listDepartmentsV2</summary>

Reads all departments (V2 entity, keyed by operating unit number).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListDepartmentsV2Queries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `core:DepartmentsV2Collection|error`

Sample code:

```ballerina
core:DepartmentsV2Collection departments = check fo->listDepartmentsV2(
    queries = {
        filter: "operatingUnitTypes eq 'OMDepartment'"
    }
);
```

</details>

<details>
<summary>createDepartmentsV2</summary>

Creates a department (V2 entity).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DepartmentV2` | Yes | The department to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `core:DepartmentV2|error`

Sample code:

```ballerina
core:DepartmentV2 department = check fo->createDepartmentsV2({
    operatingUnitNumber: "DEPT-10",
    name: "Finance Department",
    organizationType: "OMDepartment",
    language: "en-us"
});
```

</details>

<details>
<summary>getDepartmentsV2</summary>

Reads a specific department (V2 entity) by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `operatingUnitNumber` | `string` | Yes | The operating unit number key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetDepartmentsV2Queries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `core:DepartmentV2|error`

Sample code:

```ballerina
core:DepartmentV2 department = check fo->getDepartmentsV2("DEPT-10");
```

</details>

<details>
<summary>deleteDepartmentsV2</summary>

Deletes a specific department (V2 entity).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `operatingUnitNumber` | `string` | Yes | The operating unit number key field. |
| `headers` | `DeleteDepartmentsV2Headers` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDepartmentsV2(
    "DEPT-10",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateDepartmentsV2</summary>

Updates a specific department (V2 entity).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `operatingUnitNumber` | `string` | Yes | The operating unit number key field. |
| `payload` | `DepartmentV2` | Yes | The fields to update. |
| `headers` | `UpdateDepartmentsV2Headers` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `core:DepartmentV2|error`

Sample code:

```ballerina
core:DepartmentV2 updated = check fo->updateDepartmentsV2(
    "DEPT-10",
    {name: "Finance and Accounting Department"},
    headers = {ifMatch: eTag}
);
```

</details>
