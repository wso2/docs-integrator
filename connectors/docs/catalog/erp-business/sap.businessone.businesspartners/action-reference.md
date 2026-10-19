# Actions

The `ballerinax/sap.businessone.businesspartners` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages SAP Business One business partner master data — customers, vendors, leads, contacts, and their related setup entities — via the Service Layer OData API. |

---

## Client

The `Client` provides access to all business partner master data and related setup entities exposed by the SAP Business One Service Layer OData API — business partners, contacts, groups, properties, relationships, payment terms types, priorities, VAT exemptions, industries, territories, address services, and opening balances.

### Configuration

`sap.businessone:SessionConfig` (required session credentials, passed as the first argument to `new`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `companyDb` | <code>string</code> | Required | The company database (schema) to connect to |
| `username` | <code>string</code> | Required | SAP Business One user code |
| `password` | <code>string</code> | Required | SAP Business One user password |

`ConnectionConfig` (optional HTTP client configuration, passed as the second argument to `new`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | - | Configurations associated with Redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | - | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | - | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | - | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | - | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | - | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | - | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side |

### Initializing the client

```ballerina
import ballerinax/sap.businessone;
import ballerinax/sap.businessone.businesspartners;

businesspartners:Client bpClient = check new (
    {companyDb: "SBODemoUS", username: "manager", password: "<password>"},
    {secureSocket: {enable: false}},
    "https://localhost:50000/b1s/v1"
);
```

### Operations

#### Business Partners

<details>
<summary>listBusinessPartners</summary>

Queries the `BusinessPartners` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBusinessPartnersHeaders</code> | No | Headers to be sent with the request (e.g. `Prefer` for server paging) |
| `queries` | <code>ListBusinessPartnersQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `BusinessPartnersCollectionResponse|error`

**Sample code:**

```ballerina
businesspartners:BusinessPartnersCollectionResponse result = check bpClient->listBusinessPartners(
    queries = {dollarSelect: "CardCode,CardName,CardType", dollarTop: 20}
);
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BusinessPartners",
  "value": [
    {"CardCode": "C20000", "CardName": "Example Customer Ltd", "CardType": "cCustomer"}
  ],
  "odata.nextLink": "BusinessPartners?$skip=20"
}
```

</details>

<details>
<summary>createBusinessPartners</summary>

Creates a new `BusinessPartner`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BusinessPartner</code> | Yes | The business partner to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BusinessPartner|error`

**Sample code:**

```ballerina
businesspartners:BusinessPartner created = check bpClient->createBusinessPartners({
    CardCode: "C20000",
    CardName: "Example Customer Ltd",
    CardType: "cCustomer",
    GroupCode: 100,
    Currency: "USD"
});
```

**Sample response:**

```json
{
  "CardCode": "C20000",
  "CardName": "Example Customer Ltd",
  "CardType": "cCustomer",
  "GroupCode": 100,
  "Currency": "USD",
  "Valid": "tYES"
}
```

</details>

<details>
<summary>getBusinessPartners</summary>

Gets a single `BusinessPartner` by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `cardCode` | <code>string</code> | Yes | Key property `CardCode` (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBusinessPartnersQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `BusinessPartner|error`

**Sample code:**

```ballerina
businesspartners:BusinessPartner bp = check bpClient->getBusinessPartners("C20000",
    queries = {dollarSelect: "CardCode,CardName,City,Country"}
);
```

**Sample response:**

```json
{
  "CardCode": "C20000",
  "CardName": "Example Customer Ltd",
  "City": "Boston",
  "Country": "US"
}
```

</details>

<details>
<summary>deleteBusinessPartners</summary>

Deletes a `BusinessPartner`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `cardCode` | <code>string</code> | Yes | Key property `CardCode` (Edm.String) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->deleteBusinessPartners("C20000");
```

</details>

<details>
<summary>updateBusinessPartners</summary>

Partially updates a `BusinessPartner` (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `cardCode` | <code>string</code> | Yes | Key property `CardCode` (Edm.String) |
| `payload` | <code>BusinessPartner</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->updateBusinessPartners("C20000", {Phone1: "+1-555-0199"});
```

</details>

<details>
<summary>businessPartnersServiceCreateOpenBalance</summary>

Creates an opening balance for one or more business partners.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BusinessPartnersService_CreateOpenBalance_body</code> | Yes | Opening balance account and business partner debit/credit lines |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->businessPartnersServiceCreateOpenBalance({
    openningBalanceAccount: {openBalanceAccount: "_SYS00000000001", date: "2026-01-01"},
    bPCodes: [{code: "C20000", debit: 1000.00d}]
});
```

</details>

<details>
<summary>businessPartnersServiceInitData</summary>

Returns a template `BusinessPartner` populated with server-side default values, to be used as the basis for a new record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BusinessPartner|error`

**Sample code:**

```ballerina
businesspartners:BusinessPartner template = check bpClient->businessPartnersServiceInitData();
```

**Sample response:**

```json
{
  "CardType": "cCustomer",
  "VatLiable": "vLiable",
  "Valid": "tYES",
  "Currency": "##"
}
```

</details>

#### Contacts

<details>
<summary>listContacts</summary>

Queries the `Contacts` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListContactsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListContactsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `ContactsCollectionResponse|error`

**Sample code:**

```ballerina
businesspartners:ContactsCollectionResponse result = check bpClient->listContacts(
    queries = {dollarFilter: "CardCode eq 'C20000'"}
);
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Contacts",
  "value": [
    {"CardCode": "C20000", "ContactCode": 1, "Activity": "cn_Note", "Details": "Follow-up call"}
  ]
}
```

</details>

<details>
<summary>createContacts</summary>

Creates a new `Contact` entry (a logged activity/contact note against a business partner).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Contact</code> | Yes | The contact entry to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Contact|error`

**Sample code:**

```ballerina
businesspartners:Contact created = check bpClient->createContacts({
    CardCode: "C20000",
    Activity: "cn_Note",
    ContactDate: "2026-07-10",
    Details: "Follow-up call regarding open invoice"
});
```

**Sample response:**

```json
{
  "CardCode": "C20000",
  "ContactCode": 5,
  "Activity": "cn_Note",
  "ContactDate": "2026-07-10",
  "Details": "Follow-up call regarding open invoice"
}
```

</details>

<details>
<summary>getContacts</summary>

Gets a single `Contact` by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `contactCode` | <code>int:Signed32</code> | Yes | Key property `ContactCode` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetContactsQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `Contact|error`

**Sample code:**

```ballerina
businesspartners:Contact contact = check bpClient->getContacts(5);
```

**Sample response:**

```json
{
  "CardCode": "C20000",
  "ContactCode": 5,
  "Activity": "cn_Note",
  "Details": "Follow-up call regarding open invoice"
}
```

</details>

<details>
<summary>deleteContacts</summary>

Deletes a `Contact`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `contactCode` | <code>int:Signed32</code> | Yes | Key property `ContactCode` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->deleteContacts(5);
```

</details>

<details>
<summary>updateContacts</summary>

Partially updates a `Contact` (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `contactCode` | <code>int:Signed32</code> | Yes | Key property `ContactCode` (Edm.Int32) |
| `payload` | <code>Contact</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->updateContacts(5, {Closed: "tYES"});
```

</details>

#### Business Partner Groups

<details>
<summary>listBusinessPartnerGroups</summary>

Queries the `BusinessPartnerGroups` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBusinessPartnerGroupsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBusinessPartnerGroupsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `BusinessPartnerGroupsCollectionResponse|error`

**Sample code:**

```ballerina
businesspartners:BusinessPartnerGroupsCollectionResponse result = check bpClient->listBusinessPartnerGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BusinessPartnerGroups",
  "value": [
    {"Code": 100, "Name": "Customers - Domestic", "Type": "bpgt_CustomersGroup"}
  ]
}
```

</details>

<details>
<summary>createBusinessPartnerGroups</summary>

Creates a new `BusinessPartnerGroup`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BusinessPartnerGroup</code> | Yes | The group to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BusinessPartnerGroup|error`

**Sample code:**

```ballerina
businesspartners:BusinessPartnerGroup created = check bpClient->createBusinessPartnerGroups({
    Name: "Customers - Export",
    Type: "bpgt_CustomersGroup"
});
```

**Sample response:**

```json
{"Code": 101, "Name": "Customers - Export", "Type": "bpgt_CustomersGroup"}
```

</details>

<details>
<summary>getBusinessPartnerGroups</summary>

Gets a single `BusinessPartnerGroup` by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property `Code` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBusinessPartnerGroupsQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `BusinessPartnerGroup|error`

**Sample code:**

```ballerina
businesspartners:BusinessPartnerGroup group = check bpClient->getBusinessPartnerGroups(100);
```

**Sample response:**

```json
{"Code": 100, "Name": "Customers - Domestic", "Type": "bpgt_CustomersGroup"}
```

</details>

<details>
<summary>deleteBusinessPartnerGroups</summary>

Deletes a `BusinessPartnerGroup`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property `Code` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->deleteBusinessPartnerGroups(101);
```

</details>

<details>
<summary>updateBusinessPartnerGroups</summary>

Partially updates a `BusinessPartnerGroup` (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `code` | <code>int:Signed32</code> | Yes | Key property `Code` (Edm.Int32) |
| `payload` | <code>BusinessPartnerGroup</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->updateBusinessPartnerGroups(101, {Name: "Customers - International"});
```

</details>

#### Business Partner Properties

<details>
<summary>listBusinessPartnerProperties</summary>

Queries the `BusinessPartnerProperties` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBusinessPartnerPropertiesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBusinessPartnerPropertiesQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `BusinessPartnerPropertiesCollectionResponse|error`

**Sample code:**

```ballerina
businesspartners:BusinessPartnerPropertiesCollectionResponse result = check bpClient->listBusinessPartnerProperties();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BusinessPartnerProperties",
  "value": [
    {"PropertyCode": 1, "PropertyName": "VIP Customer"}
  ]
}
```

</details>

<details>
<summary>createBusinessPartnerProperties</summary>

Creates a new `BusinessPartnerProperty`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BusinessPartnerProperty</code> | Yes | The property to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BusinessPartnerProperty|error`

**Sample code:**

```ballerina
businesspartners:BusinessPartnerProperty created = check bpClient->createBusinessPartnerProperties({
    PropertyName: "Preferred Vendor"
});
```

**Sample response:**

```json
{"PropertyCode": 2, "PropertyName": "Preferred Vendor"}
```

</details>

<details>
<summary>getBusinessPartnerProperties</summary>

Gets a single `BusinessPartnerProperty` by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `propertyCode` | <code>int:Signed32</code> | Yes | Key property `PropertyCode` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBusinessPartnerPropertiesQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `BusinessPartnerProperty|error`

**Sample code:**

```ballerina
businesspartners:BusinessPartnerProperty prop = check bpClient->getBusinessPartnerProperties(1);
```

**Sample response:**

```json
{"PropertyCode": 1, "PropertyName": "VIP Customer"}
```

</details>

<details>
<summary>deleteBusinessPartnerProperties</summary>

Deletes a `BusinessPartnerProperty`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `propertyCode` | <code>int:Signed32</code> | Yes | Key property `PropertyCode` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->deleteBusinessPartnerProperties(2);
```

</details>

<details>
<summary>updateBusinessPartnerProperties</summary>

Partially updates a `BusinessPartnerProperty` (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `propertyCode` | <code>int:Signed32</code> | Yes | Key property `PropertyCode` (Edm.Int32) |
| `payload` | <code>BusinessPartnerProperty</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->updateBusinessPartnerProperties(2, {PropertyName: "Preferred Supplier"});
```

</details>

<details>
<summary>businessPartnerPropertiesServiceGetBusinessPartnerPropertyList</summary>

Returns the list of business partner property name/code pairs configured in the company.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_1|error`

**Sample code:**

```ballerina
businesspartners:inline_response_200_1 result = check bpClient->businessPartnerPropertiesServiceGetBusinessPartnerPropertyList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BusinessPartnerPropertiesService_GetBusinessPartnerPropertyList",
  "value": [
    {"PropertyName": "VIP Customer", "PropertyCode": 1}
  ]
}
```

</details>

#### Payment Terms Types

<details>
<summary>listPaymentTermsTypes</summary>

Queries the `PaymentTermsTypes` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListPaymentTermsTypesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPaymentTermsTypesQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `PaymentTermsTypesCollectionResponse|error`

**Sample code:**

```ballerina
businesspartners:PaymentTermsTypesCollectionResponse result = check bpClient->listPaymentTermsTypes();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#PaymentTermsTypes",
  "value": [
    {"GroupNumber": 3, "PaymentTermsGroupName": "Net 30", "NumberOfAdditionalDays": 30}
  ]
}
```

</details>

<details>
<summary>createPaymentTermsTypes</summary>

Creates a new `PaymentTermsType`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentTermsType</code> | Yes | The payment terms type to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `PaymentTermsType|error`

**Sample code:**

```ballerina
businesspartners:PaymentTermsType created = check bpClient->createPaymentTermsTypes({
    PaymentTermsGroupName: "Net 60",
    NumberOfAdditionalDays: 60
});
```

**Sample response:**

```json
{"GroupNumber": 4, "PaymentTermsGroupName": "Net 60", "NumberOfAdditionalDays": 60}
```

</details>

<details>
<summary>getPaymentTermsTypes</summary>

Gets a single `PaymentTermsType` by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `groupNumber` | <code>int:Signed32</code> | Yes | Key property `GroupNumber` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPaymentTermsTypesQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `PaymentTermsType|error`

**Sample code:**

```ballerina
businesspartners:PaymentTermsType terms = check bpClient->getPaymentTermsTypes(3);
```

**Sample response:**

```json
{"GroupNumber": 3, "PaymentTermsGroupName": "Net 30", "NumberOfAdditionalDays": 30}
```

</details>

<details>
<summary>deletePaymentTermsTypes</summary>

Deletes a `PaymentTermsType`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `groupNumber` | <code>int:Signed32</code> | Yes | Key property `GroupNumber` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->deletePaymentTermsTypes(4);
```

</details>

<details>
<summary>updatePaymentTermsTypes</summary>

Partially updates a `PaymentTermsType` (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `groupNumber` | <code>int:Signed32</code> | Yes | Key property `GroupNumber` (Edm.Int32) |
| `payload` | <code>PaymentTermsType</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->updatePaymentTermsTypes(4, {GeneralDiscount: 5});
```

</details>

<details>
<summary>paymentTermsTypesClose</summary>

Invokes the bound action `Close` on a `PaymentTermsType`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `groupNumber` | <code>int:Signed32</code> | Yes | Key property `GroupNumber` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->paymentTermsTypesClose(4);
```

</details>

<details>
<summary>paymentTermsTypesServiceUpdateWithBPs</summary>

Updates a payment terms type and propagates the change to all business partners assigned to it.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>PaymentTermsTypesService_UpdateWithBPs_body</code> | Yes | The payment terms type to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->paymentTermsTypesServiceUpdateWithBPs({
    paymentTermsType: {GroupNumber: 3, PaymentTermsGroupName: "Net 30", NumberOfAdditionalDays: 30}
});
```

</details>

#### Priorities

<details>
<summary>listBPPriorities</summary>

Queries the `BPPriorities` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBPPrioritiesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBPPrioritiesQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `BPPrioritiesCollectionResponse|error`

**Sample code:**

```ballerina
businesspartners:BPPrioritiesCollectionResponse result = check bpClient->listBPPriorities();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BPPriorities",
  "value": [
    {"Priority": 1, "PriorityDescription": "High"}
  ]
}
```

</details>

<details>
<summary>createBPPriorities</summary>

Creates a new `BPPriority`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BPPriority</code> | Yes | The priority to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BPPriority|error`

**Sample code:**

```ballerina
businesspartners:BPPriority created = check bpClient->createBPPriorities({PriorityDescription: "Low"});
```

**Sample response:**

```json
{"Priority": 2, "PriorityDescription": "Low"}
```

</details>

<details>
<summary>getBPPriorities</summary>

Gets a single `BPPriority` by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `priority` | <code>int:Signed32</code> | Yes | Key property `Priority` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBPPrioritiesQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `BPPriority|error`

**Sample code:**

```ballerina
businesspartners:BPPriority priority = check bpClient->getBPPriorities(1);
```

**Sample response:**

```json
{"Priority": 1, "PriorityDescription": "High"}
```

</details>

<details>
<summary>deleteBPPriorities</summary>

Deletes a `BPPriority`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `priority` | <code>int:Signed32</code> | Yes | Key property `Priority` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->deleteBPPriorities(2);
```

</details>

<details>
<summary>updateBPPriorities</summary>

Partially updates a `BPPriority` (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `priority` | <code>int:Signed32</code> | Yes | Key property `Priority` (Edm.Int32) |
| `payload` | <code>BPPriority</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->updateBPPriorities(2, {PriorityDescription: "Low priority"});
```

</details>

#### VAT Exemptions

<details>
<summary>listBPVatExemptions</summary>

Queries the `BPVatExemptions` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBPVatExemptionsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBPVatExemptionsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `BPVatExemptionsCollectionResponse|error`

**Sample code:**

```ballerina
businesspartners:BPVatExemptionsCollectionResponse result = check bpClient->listBPVatExemptions();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BPVatExemptions",
  "value": [
    {"AbsoluteEntry": 1, "Remarks": "Exempt for export sales", "BPCode": "C20000"}
  ]
}
```

</details>

<details>
<summary>createBPVatExemptions</summary>

Creates a new `BPVatExemptions` entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BPVatExemptions</code> | Yes | The VAT exemption to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BPVatExemptions|error`

**Sample code:**

```ballerina
businesspartners:BPVatExemptions created = check bpClient->createBPVatExemptions({
    bPCode: "C20000",
    remarks: "Exempt for export sales"
});
```

**Sample response:**

```json
{"AbsoluteEntry": 2, "BPCode": "C20000", "Remarks": "Exempt for export sales"}
```

</details>

<details>
<summary>getBPVatExemptions</summary>

Gets a single `BPVatExemptions` entry by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property `AbsoluteEntry` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBPVatExemptionsQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `BPVatExemptions|error`

**Sample code:**

```ballerina
businesspartners:BPVatExemptions exemption = check bpClient->getBPVatExemptions(1);
```

**Sample response:**

```json
{"AbsoluteEntry": 1, "BPCode": "C20000", "Remarks": "Exempt for export sales"}
```

</details>

<details>
<summary>deleteBPVatExemptions</summary>

Deletes a `BPVatExemptions` entry.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property `AbsoluteEntry` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->deleteBPVatExemptions(2);
```

</details>

<details>
<summary>updateBPVatExemptions</summary>

Partially updates a `BPVatExemptions` entry (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `absoluteEntry` | <code>int:Signed32</code> | Yes | Key property `AbsoluteEntry` (Edm.Int32) |
| `payload` | <code>BPVatExemptions</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->updateBPVatExemptions(2, {remarks: "Updated exemption reason"});
```

</details>

<details>
<summary>bPVatExemptionsServiceGetList</summary>

Returns the list of configured VAT exemption absolute entries and their associated business partner codes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200|error`

**Sample code:**

```ballerina
businesspartners:inline_response_200 result = check bpClient->bPVatExemptionsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BPVatExemptionsService_GetList",
  "value": [
    {"AbsoluteEntry": 1, "BPCode": "C20000"}
  ]
}
```

</details>

#### Industries

<details>
<summary>listIndustries</summary>

Queries the `Industries` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListIndustriesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListIndustriesQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `IndustriesCollectionResponse|error`

**Sample code:**

```ballerina
businesspartners:IndustriesCollectionResponse result = check bpClient->listIndustries();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Industries",
  "value": [
    {"IndustryCode": 1, "IndustryName": "Manufacturing", "IndustryDescription": "Manufacturing sector"}
  ]
}
```

</details>

<details>
<summary>createIndustries</summary>

Creates a new `Industry`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Industry</code> | Yes | The industry to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Industry|error`

**Sample code:**

```ballerina
businesspartners:Industry created = check bpClient->createIndustries({
    IndustryName: "Retail",
    IndustryDescription: "Retail sector"
});
```

**Sample response:**

```json
{"IndustryCode": 2, "IndustryName": "Retail", "IndustryDescription": "Retail sector"}
```

</details>

<details>
<summary>getIndustries</summary>

Gets a single `Industry` by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `industryCode` | <code>int:Signed32</code> | Yes | Key property `IndustryCode` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetIndustriesQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `Industry|error`

**Sample code:**

```ballerina
businesspartners:Industry industry = check bpClient->getIndustries(1);
```

**Sample response:**

```json
{"IndustryCode": 1, "IndustryName": "Manufacturing", "IndustryDescription": "Manufacturing sector"}
```

</details>

<details>
<summary>deleteIndustries</summary>

Deletes an `Industry`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `industryCode` | <code>int:Signed32</code> | Yes | Key property `IndustryCode` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->deleteIndustries(2);
```

</details>

<details>
<summary>updateIndustries</summary>

Partially updates an `Industry` (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `industryCode` | <code>int:Signed32</code> | Yes | Key property `IndustryCode` (Edm.Int32) |
| `payload` | <code>Industry</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->updateIndustries(2, {IndustryDescription: "General retail sector"});
```

</details>

#### Territories

<details>
<summary>listTerritories</summary>

Queries the `Territories` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListTerritoriesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTerritoriesQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `TerritoriesCollectionResponse|error`

**Sample code:**

```ballerina
businesspartners:TerritoriesCollectionResponse result = check bpClient->listTerritories();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Territories",
  "value": [
    {"TerritoryID": 1, "Description": "Northeast", "Inactive": "tNO"}
  ]
}
```

</details>

<details>
<summary>createTerritories</summary>

Creates a new `Territory`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Territory</code> | Yes | The territory to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Territory|error`

**Sample code:**

```ballerina
businesspartners:Territory created = check bpClient->createTerritories({Description: "Southwest"});
```

**Sample response:**

```json
{"TerritoryID": 2, "Description": "Southwest", "Inactive": "tNO"}
```

</details>

<details>
<summary>getTerritories</summary>

Gets a single `Territory` by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `territoryID` | <code>int:Signed32</code> | Yes | Key property `TerritoryID` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTerritoriesQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `Territory|error`

**Sample code:**

```ballerina
businesspartners:Territory territory = check bpClient->getTerritories(1);
```

**Sample response:**

```json
{"TerritoryID": 1, "Description": "Northeast", "Inactive": "tNO"}
```

</details>

<details>
<summary>deleteTerritories</summary>

Deletes a `Territory`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `territoryID` | <code>int:Signed32</code> | Yes | Key property `TerritoryID` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->deleteTerritories(2);
```

</details>

<details>
<summary>updateTerritories</summary>

Partially updates a `Territory` (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `territoryID` | <code>int:Signed32</code> | Yes | Key property `TerritoryID` (Edm.Int32) |
| `payload` | <code>Territory</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->updateTerritories(2, {Inactive: "tYES"});
```

</details>

#### Relationships

<details>
<summary>listRelationships</summary>

Queries the `Relationships` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListRelationshipsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListRelationshipsQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `RelationshipsCollectionResponse|error`

**Sample code:**

```ballerina
businesspartners:RelationshipsCollectionResponse result = check bpClient->listRelationships();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#Relationships",
  "value": [
    {"RelationshipCode": 1, "RelationshipDescription": "Parent Company"}
  ]
}
```

</details>

<details>
<summary>createRelationships</summary>

Creates a new `Relationship`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>Relationship</code> | Yes | The relationship to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Relationship|error`

**Sample code:**

```ballerina
businesspartners:Relationship created = check bpClient->createRelationships({RelationshipDescription: "Subsidiary"});
```

**Sample response:**

```json
{"RelationshipCode": 2, "RelationshipDescription": "Subsidiary"}
```

</details>

<details>
<summary>getRelationships</summary>

Gets a single `Relationship` by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `relationshipCode` | <code>int:Signed32</code> | Yes | Key property `RelationshipCode` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetRelationshipsQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `Relationship|error`

**Sample code:**

```ballerina
businesspartners:Relationship relationship = check bpClient->getRelationships(1);
```

**Sample response:**

```json
{"RelationshipCode": 1, "RelationshipDescription": "Parent Company"}
```

</details>

<details>
<summary>deleteRelationships</summary>

Deletes a `Relationship`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `relationshipCode` | <code>int:Signed32</code> | Yes | Key property `RelationshipCode` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->deleteRelationships(2);
```

</details>

<details>
<summary>updateRelationships</summary>

Partially updates a `Relationship` (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `relationshipCode` | <code>int:Signed32</code> | Yes | Key property `RelationshipCode` (Edm.Int32) |
| `payload` | <code>Relationship</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->updateRelationships(2, {RelationshipDescription: "Wholly-owned subsidiary"});
```

</details>

#### Fiscal Registry IDs

<details>
<summary>listBPFiscalRegistryID</summary>

Queries the `BPFiscalRegistryID` collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>ListBPFiscalRegistryIDHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListBPFiscalRegistryIDQueries</code> | No | OData query options ($skip, $top, $filter, $orderby, $expand, $inlinecount, $select) |

**Returns:** `BPFiscalRegistryIDCollectionResponse|error`

**Sample code:**

```ballerina
businesspartners:BPFiscalRegistryIDCollectionResponse result = check bpClient->listBPFiscalRegistryID();
```

**Sample response:**

```json
{
  "odata.metadata": "https://localhost:50000/b1s/v1/$metadata#BPFiscalRegistryID",
  "value": [
    {"Numerator": 1, "CNAECode": "6201-5", "Description": "Software development services"}
  ]
}
```

</details>

<details>
<summary>createBPFiscalRegistryID</summary>

Creates a new `BPFiscalRegistryID`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BPFiscalRegistryID</code> | Yes | The fiscal registry ID to create |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `BPFiscalRegistryID|error`

**Sample code:**

```ballerina
businesspartners:BPFiscalRegistryID created = check bpClient->createBPFiscalRegistryID({
    CNAECode: "4711-3",
    Description: "Retail trade"
});
```

**Sample response:**

```json
{"Numerator": 2, "CNAECode": "4711-3", "Description": "Retail trade"}
```

</details>

<details>
<summary>getBPFiscalRegistryID</summary>

Gets a single `BPFiscalRegistryID` by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property `Numerator` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetBPFiscalRegistryIDQueries</code> | No | `$expand` and `$select` query options |

**Returns:** `BPFiscalRegistryID|error`

**Sample code:**

```ballerina
businesspartners:BPFiscalRegistryID registry = check bpClient->getBPFiscalRegistryID(1);
```

**Sample response:**

```json
{"Numerator": 1, "CNAECode": "6201-5", "Description": "Software development services"}
```

</details>

<details>
<summary>deleteBPFiscalRegistryID</summary>

Deletes a `BPFiscalRegistryID`.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property `Numerator` (Edm.Int32) |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->deleteBPFiscalRegistryID(2);
```

</details>

<details>
<summary>updateBPFiscalRegistryID</summary>

Partially updates a `BPFiscalRegistryID` (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `numerator` | <code>int:Signed32</code> | Yes | Key property `Numerator` (Edm.Int32) |
| `payload` | <code>BPFiscalRegistryID</code> | Yes | Fields to update |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->updateBPFiscalRegistryID(2, {Description: "General retail trade"});
```

</details>

#### Opening Balances

<details>
<summary>bPOpeningBalanceServiceCreateOpenBalance</summary>

Creates an opening balance entry directly against one or more business partner codes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>BPOpeningBalanceService_CreateOpenBalance_body</code> | Yes | Opening balance account and business partner debit/credit lines |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->bPOpeningBalanceServiceCreateOpenBalance({
    openningBalanceAccount: {openBalanceAccount: "_SYS00000000001", date: "2026-01-01"},
    bPCodes: [{code: "C20000", debit: 1000.00d}]
});
```

</details>

#### Address Services

<details>
<summary>addressServiceGetAddressFormat</summary>

Resolves the address format definition for a given format code/name.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AddressService_GetAddressFormat_body</code> | Yes | The address format lookup parameters |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AddressFormat|error`

**Sample code:**

```ballerina
businesspartners:AddressFormat format = check bpClient->addressServiceGetAddressFormat({
    addressFormatParams: {code: 1, name: "US Address Format"}
});
```

**Sample response:**

```json
{"Code": 1, "Name": "US Address Format", "Format": "%Street%, %City%, %State% %ZipCode%"}
```

</details>

<details>
<summary>addressServiceGetFullAddress</summary>

Resolves the fully formatted, single-line address for a given set of address components.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `payload` | <code>AddressService_GetFullAddress_body</code> | Yes | The address components to resolve |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `AddressReturnParams|error`

**Sample code:**

```ballerina
businesspartners:AddressReturnParams fullAddress = check bpClient->addressServiceGetFullAddress({
    addressParams: {Street: "Main St", StreetNo: "123", City: "Boston", State: "MA", ZipCode: "02110", Country: "US"}
});
```

**Sample response:**

```json
{"FullAddress": "123 Main St, Boston, MA 02110"}
```

</details>

#### Session

<details>
<summary>logout</summary>

Ends the active SAP Business One Service Layer session.

**Parameters:**

_None_

**Returns:** `error?`

**Sample code:**

```ballerina
check bpClient->logout();
```

</details>
