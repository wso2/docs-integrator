---
title: Actions
---

# Actions

The `ballerinax/guidewire.insnow` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to the Guidewire InsuranceNow REST API for applications, policies, claims, drivers, documents, and addresses. |

---

## Client

Provides access to the Guidewire InsuranceNow REST API for applications, policies, claims, drivers, documents, and addresses.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|http:CredentialsConfig` | Required | Bearer token or username/password credentials for authentication. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `timeout` | `decimal` | `30` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `compression` | `http:Compression` | `COMPRESSION_AUTO` | Compression configuration for requests. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration. |
| `validation` | `boolean` | `true` | Enable or disable payload validation. |
| `laxDataBinding` | `boolean` | `true` | Enable lax data binding to ignore unmapped fields. |

### Initializing the client

```ballerina
import ballerinax/guidewire.insnow;

configurable string username = ?;
configurable string password = ?;
configurable string serviceUrl = ?;

insnow:Client insnowClient = check new (
    {
        auth: {
            username: username,
            password: password
        }
    },
    serviceUrl
);
```

### Operations

#### Address operations

<details>
<summary>Get supported countries</summary>

Retrieves the list of supported countries for address operations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional request headers. |
| `sortType` | `"asc"\|"desc"` | No | Sort order for the results. Defaults to `asc`. |

Returns: `ListCountry|error`

Sample code:

```ballerina
insnow:ListCountry countries = check insnowClient->/addresses/countries();
```

Sample response:

```ballerina
{
  "items": [
    {"isoCd": "US", "name": "United States"},
    {"isoCd": "CA", "name": "Canada"}
  ]
}
```

</details>

<details>
<summary>Get country address template</summary>

Retrieves the address template for a specific country by its ISO code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `isoCd` | `string` | Yes | ISO country code (e.g., `"US"`). |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `AddressCountryTemplate|error`

Sample code:

```ballerina
insnow:AddressCountryTemplate template = check insnowClient->/addresses/countries/["US"]();
```

Sample response:

```ballerina
{
  "isoCd": "US",
  "name": "United States",
  "stateProvinces": {
    "items": [
      {"code": "CA", "name": "California"},
      {"code": "NY", "name": "New York"}
    ]
  }
}
```

</details>

<details>
<summary>Fill address from Google Places</summary>

Fills an address from a Google Places place ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `placeId` | `string` | Yes | Google Places place ID. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `Address|error`

Sample code:

```ballerina
insnow:Address address = check insnowClient->/addresses/googlePlacesFill(placeId = "ChIJN1t_tDeuEmsRUsoyG83frY4");
```

Sample response:

```ballerina
{
  "addr1": "48 Pirrama Rd",
  "city": "Pyrmont",
  "stateProvCd": "NSW",
  "postalCode": "2009",
  "countryCd": "AU"
}
```

</details>

<details>
<summary>Verify address</summary>

Checks whether a given address is verified.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Address` | Yes | The address to verify. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check insnowClient->/addresses/isVerifiedRequest.post({
    addr1: "123 Main St",
    city: "Springfield",
    stateProvCd: "IL",
    postalCode: "62701",
    countryCd: "US"
});
```

</details>

<details>
<summary>Submit address verification request</summary>

Submits a batch address verification request.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ListAddress` | Yes | List of addresses to verify. |
| `addressType` | `"Combined"\|"Uncombined"` | No | Address type for verification. Defaults to `Combined`. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check insnowClient->/addresses/verificationRequest.post(
    {
        items: [
            {
                addr1: "123 Main St",
                city: "Springfield",
                stateProvCd: "IL",
                postalCode: "62701",
                countryCd: "US"
            }
        ]
    },
    addressType = "Combined"
);
```

</details>

#### Application management

<details>
<summary>List applications</summary>

Retrieves a list of applications (quotes) with optional filtering by customer, status, or date.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerId` | `string` | No | Filter by customer ID. |
| `status` | `string` | No | Filter by application status. |
| `quoteNumber` | `string` | No | Filter by quote number. |
| `limit` | `string` | No | Maximum number of results to return. |
| `continuationId` | `string` | No | Continuation ID for pagination. |
| `createdSinceDate` | `string` | No | Filter applications created after this date. |
| `masterQuoteRef` | `string` | No | Filter by master quote reference. |
| `optionalFields` | `string` | No | Comma-separated list of optional fields to include. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `ListApplication|error`

Sample code:

```ballerina
insnow:ListApplication applications = check insnowClient->/applications(customerId = "CUST-001");
```

Sample response:

```ballerina
{
  "items": [
    {
      "systemId": "APP-12345",
      "quoteNumber": "Q-2024-001",
      "status": "Draft",
      "customerId": "CUST-001",
      "productInfo": {"name": "Personal Auto"}
    }
  ]
}
```

</details>

<details>
<summary>Create a new application</summary>

Creates a new quote or quick-quote application for a given customer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Quote` | Yes | The quote payload containing application details. |
| `customerId` | `string` | Yes | The customer ID to associate with the application. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check insnowClient->/applications.post(
    {
        productInfo: {name: "Personal Auto"},
        insured: {
            nameInfo: {
                givenName: "John",
                surname: "Doe"
            }
        }
    },
    customerId = "CUST-001"
);
```

</details>

<details>
<summary>Delete an application</summary>

Deletes an application by its system ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the application to delete. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check insnowClient->/applications/["APP-12345"].delete();
```

</details>

<details>
<summary>Bind an application</summary>

Submits a bind request for an application, converting it to an active policy.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the application to bind. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check insnowClient->/applications/["APP-12345"]/bindRequest.post();
```

</details>

<details>
<summary>Convert to quote</summary>

Converts a quick-quote application into a full quote.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the application to convert. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check insnowClient->/applications/["APP-12345"]/convertToQuoteRequest.post();
```

</details>

#### Application documents

<details>
<summary>List application documents</summary>

Retrieves the list of documents attached to an application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the application. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `ListDocument|error`

Sample code:

```ballerina
insnow:ListDocument docs = check insnowClient->/applications/["APP-12345"]/documents();
```

Sample response:

```ballerina
{
  "items": [
    {
      "documentId": "DOC-001",
      "name": "Application Form",
      "mimeType": "application/pdf",
      "createdDate": "2024-01-15T10:30:00Z"
    }
  ]
}
```

</details>

<details>
<summary>Attach document to application</summary>

Attaches a document to an application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the application. |
| `payload` | `Attachment` | Yes | The attachment payload including file content and metadata. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check insnowClient->/applications/["APP-12345"]/documents.post({
    name: "drivers_license.pdf",
    mimeType: "application/pdf",
    content: encodedContent
});
```

</details>

<details>
<summary>Delete application document</summary>

Deletes a document from an application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the application. |
| `documentId` | `string` | Yes | The document ID to delete. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check insnowClient->/applications/["APP-12345"]/documents/["DOC-001"].delete();
```

</details>

<details>
<summary>Get application document content</summary>

Downloads the binary content of a document attached to an application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the application. |
| `documentId` | `string` | Yes | The document ID to download. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `byte[]|error`

Sample code:

```ballerina
byte[] content = check insnowClient->/applications/["APP-12345"]/documents/["DOC-001"]/content();
```

Sample response:

```ballerina
<binary content of the document>
```

</details>

#### Driver management

<details>
<summary>List drivers</summary>

Retrieves the list of drivers on an application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the application. |
| `typeCd` | `"Driver"\|"NonDriver"` | No | Filter by driver type. |
| `continuationId` | `string` | No | Continuation ID for pagination. |
| `limit` | `string` | No | Maximum number of results to return. |
| `includeDeleted` | `string` | No | Whether to include deleted drivers. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `ListDriver|error`

Sample code:

```ballerina
insnow:ListDriver drivers = check insnowClient->/applications/["APP-12345"]/drivers(typeCd = "Driver");
```

Sample response:

```ballerina
{
  "items": [
    {
      "driverNumber": 1,
      "typeCd": "Driver",
      "nameInfo": {"givenName": "John", "surname": "Doe"},
      "licenseNumber": "D1234567",
      "licenseStateCd": "CA"
    }
  ]
}
```

</details>

<details>
<summary>Add driver to application</summary>

Adds a new driver to an application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the application. |
| `payload` | `Driver` | Yes | The driver details. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check insnowClient->/applications/["APP-12345"]/drivers.post({
    typeCd: "Driver",
    nameInfo: {givenName: "Jane", surname: "Smith"},
    licenseNumber: "S9876543",
    licenseStateCd: "NY"
});
```

</details>

<details>
<summary>Get driver by number</summary>

Retrieves a specific driver from an application by driver number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the application. |
| `driverNumber` | `int:Signed32` | Yes | The driver number. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `Driver|error`

Sample code:

```ballerina
insnow:Driver driver = check insnowClient->/applications/["APP-12345"]/drivers/[1]();
```

Sample response:

```ballerina
{
  "driverNumber": 1,
  "typeCd": "Driver",
  "nameInfo": {"givenName": "John", "surname": "Doe"},
  "licenseNumber": "D1234567",
  "licenseStateCd": "CA",
  "dateOfBirth": "1985-06-15"
}
```

</details>

<details>
<summary>Replace driver</summary>

Replaces a driver record on an application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the application. |
| `driverNumber` | `int:Signed32` | Yes | The driver number to replace. |
| `payload` | `Driver` | Yes | The updated driver details. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `Driver|error`

Sample code:

```ballerina
insnow:Driver updated = check insnowClient->/applications/["APP-12345"]/drivers/[1].put({
    typeCd: "Driver",
    nameInfo: {givenName: "John", surname: "Doe"},
    licenseNumber: "D1234567",
    licenseStateCd: "TX"
});
```

Sample response:

```ballerina
{
  "driverNumber": 1,
  "typeCd": "Driver",
  "nameInfo": {"givenName": "John", "surname": "Doe"},
  "licenseNumber": "D1234567",
  "licenseStateCd": "TX"
}
```

</details>

<details>
<summary>Update driver fields</summary>

Partially updates specific fields on a driver record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the application. |
| `driverNumber` | `int:Signed32` | Yes | The driver number to update. |
| `payload` | `Driver` | Yes | The fields to update. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `Driver|error`

Sample code:

```ballerina
insnow:Driver patched = check insnowClient->/applications/["APP-12345"]/drivers/[1].patch({
    licenseStateCd: "FL"
});
```

Sample response:

```ballerina
{
  "driverNumber": 1,
  "typeCd": "Driver",
  "nameInfo": {"givenName": "John", "surname": "Doe"},
  "licenseNumber": "D1234567",
  "licenseStateCd": "FL"
}
```

</details>

<details>
<summary>Delete driver</summary>

Removes a driver from an application.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the application. |
| `driverNumber` | `int:Signed32` | Yes | The driver number to delete. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check insnowClient->/applications/["APP-12345"]/drivers/[1].delete();
```

</details>

#### Claims

<details>
<summary>List claim documents</summary>

Retrieves the list of documents attached to a claim.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the claim. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `ListDocument|error`

Sample code:

```ballerina
insnow:ListDocument claimDocs = check insnowClient->/claims/["CLM-56789"]/documents();
```

Sample response:

```ballerina
{
  "items": [
    {
      "documentId": "DOC-100",
      "name": "Accident Report",
      "mimeType": "application/pdf",
      "createdDate": "2024-02-20T14:00:00Z"
    }
  ]
}
```

</details>

<details>
<summary>Attach document to claim</summary>

Attaches a document to a claim.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the claim. |
| `payload` | `DocumentDetail` | Yes | The document detail payload. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check insnowClient->/claims/["CLM-56789"]/documents.post({
    name: "police_report.pdf",
    mimeType: "application/pdf",
    content: encodedContent
});
```

</details>

<details>
<summary>List claim notes</summary>

Retrieves the list of notes on a claim.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the claim. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `ListNote|error`

Sample code:

```ballerina
insnow:ListNote notes = check insnowClient->/claims/["CLM-56789"]/notes();
```

Sample response:

```ballerina
{
  "items": [
    {
      "noteId": "NOTE-001",
      "subject": "Initial Assessment",
      "body": "Reviewed damage photos. Estimated repair cost: $3,500.",
      "createdDate": "2024-02-21T09:15:00Z",
      "author": "adjuster@example.com"
    }
  ]
}
```

</details>

<details>
<summary>Add note to claim</summary>

Adds a note to a claim.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the claim. |
| `payload` | `NoteDetail` | Yes | The note detail payload. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `error?`

Sample code:

```ballerina
check insnowClient->/claims/["CLM-56789"]/notes.post({
    subject: "Follow-up",
    body: "Contacted insured to schedule inspection."
});
```

</details>

#### Policy operations

<details>
<summary>List policies</summary>

Retrieves a list of policies with optional filtering by customer, status, or policy number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `customerId` | `string` | No | Filter by customer ID. |
| `policyNumber` | `string` | No | Filter by policy number. |
| `status` | `string` | No | Filter by policy status. |
| `limit` | `string` | No | Maximum number of results to return. |
| `continuationId` | `string` | No | Continuation ID for pagination. |
| `createdSinceDate` | `string` | No | Filter policies created after this date. |
| `providerRef` | `string` | No | Filter by provider reference. |
| `recentlyViewed` | `string` | No | Filter recently viewed policies. |
| `expiredDateAfter` | `string` | No | Filter policies expiring after this date. |
| `includePriorTerms` | `string` | No | Whether to include prior term data. |
| `optionalFields` | `string` | No | Comma-separated list of optional fields to include. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `ListPolicy|error`

Sample code:

```ballerina
insnow:ListPolicy policies = check insnowClient->/policies(customerId = "CUST-001");
```

Sample response:

```ballerina
{
  "items": [
    {
      "systemId": "POL-99001",
      "policyNumber": "PA-2024-00123",
      "status": "Active",
      "effectiveDate": "2024-01-01",
      "expirationDate": "2025-01-01",
      "productInfo": {"name": "Personal Auto"}
    }
  ]
}
```

</details>

<details>
<summary>Get policy details</summary>

Retrieves detailed information about a specific policy.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the policy. |
| `optionalFields` | `string` | No | Comma-separated list of optional fields to include. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `PolicyDetails|error`

Sample code:

```ballerina
insnow:PolicyDetails policy = check insnowClient->/policies/["POL-99001"]();
```

Sample response:

```ballerina
{
  "systemId": "POL-99001",
  "policyNumber": "PA-2024-00123",
  "status": "Active",
  "effectiveDate": "2024-01-01",
  "expirationDate": "2025-01-01",
  "productInfo": {"name": "Personal Auto"},
  "insured": {
    "nameInfo": {"givenName": "John", "surname": "Doe"}
  },
  "totalPremium": 1250.00
}
```

</details>

<details>
<summary>Update policy</summary>

Partially updates a policy's details.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `systemId` | `string` | Yes | The system ID of the policy to update. |
| `payload` | `PolicyDetails` | Yes | The fields to update on the policy. |
| `headers` | `map<string\|string[]>` | No | Optional request headers. |

Returns: `PolicyDetails|error`

Sample code:

```ballerina
insnow:PolicyDetails updated = check insnowClient->/policies/["POL-99001"].patch({
    insured: {
        nameInfo: {givenName: "John", surname: "Doe-Smith"}
    }
});
```

Sample response:

```ballerina
{
  "systemId": "POL-99001",
  "policyNumber": "PA-2024-00123",
  "status": "Active",
  "insured": {
    "nameInfo": {"givenName": "John", "surname": "Doe-Smith"}
  }
}
```

</details>
