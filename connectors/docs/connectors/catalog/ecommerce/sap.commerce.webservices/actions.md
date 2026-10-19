---
title: Actions
---

# Actions

The `ballerinax/sap.commerce.webservices` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | OCC v2 REST API: product catalog, carts, orders, customers, B2B procurement, stores, and tickets. |

---

## Client

OCC v2 REST API: product catalog, carts, orders, customers, B2B procurement, stores, and tickets.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2ClientCredentialsGrantConfig` | Required | OAuth 2.0 client credentials config or bearer token for authentication. |
| `httpVersion` | `string` | `"2.0"` | HTTP protocol version. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:SecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |
| `circuitBreaker` | `http:CircuitBreakerConfig` | `()` | Circuit breaker configuration for fault tolerance. |
| `compression` | `http:Compression` | `()` | HTTP compression configuration. |
| `cache` | `http:CacheConfig` | `()` | HTTP caching configuration. |
| `poolConfig` | `http:PoolConfiguration` | `()` | Connection pool configuration. |

### Initializing the client

```ballerina
import ballerinax/sap.commerce.webservices as sapCommerce;

configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string tokenUrl = ?;
configurable string serviceUrl = ?;

sapCommerce:Client sapCommerceClient = check new (
    {
        auth: {
            clientId: clientId,
            clientSecret: clientSecret,
            tokenUrl: tokenUrl
        }
    },
    serviceUrl
);
```

### Operations

#### Base sites & configuration

<details>
<summary>getBaseSites</summary>

Retrieves the list of available base sites.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers. |
| `queries` | `GetBaseSitesQueries` | No | Query parameters including `fields`. |

Returns: `BaseSiteList|xml|error`

Sample code:

```ballerina
sapCommerce:BaseSiteList|xml baseSites = check sapCommerceClient->getBaseSites({}, {fields: "DEFAULT"});
```

Sample response:

```ballerina
{"baseSites": [{"uid": "electronics", "name": "Electronics Site", "channel": "B2C", "defaultLanguage": {"isocode": "en"}}, {"uid": "powertools", "name": "Powertools Site", "channel": "B2B"}]}
```

</details>

<details>
<summary>getCountries</summary>

Retrieves a list of countries for the given base site.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `queries` | `GetCountriesQueries` | No | Query parameters including `fields` and `type` (SHIPPING or BILLING). |

Returns: `CountryList|xml|error`

Sample code:

```ballerina
sapCommerce:CountryList|xml countries = check sapCommerceClient->getCountries("electronics", {}, {fields: "DEFAULT"});
```

Sample response:

```ballerina
{"countries": [{"isocode": "US", "name": "United States"}, {"isocode": "DE", "name": "Germany"}, {"isocode": "JP", "name": "Japan"}]}
```

</details>

<details>
<summary>getCurrencies</summary>

Retrieves a list of available currencies for the given base site.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `queries` | `GetCurrenciesQueries` | No | Query parameters including `fields`. |

Returns: `CurrencyList|xml|error`

Sample code:

```ballerina
sapCommerce:CurrencyList|xml currencies = check sapCommerceClient->getCurrencies("electronics", {}, {fields: "DEFAULT"});
```

Sample response:

```ballerina
{"currencies": [{"isocode": "USD", "name": "US Dollar", "symbol": "$", "active": true}, {"isocode": "EUR", "name": "Euro", "symbol": "€", "active": true}]}
```

</details>

#### Product catalog

<details>
<summary>getCatalogs</summary>

Retrieves a list of catalogs for the given base site.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `queries` | `GetCatalogsQueries` | No | Query parameters including `fields`. |

Returns: `CatalogList|xml|error`

Sample code:

```ballerina
sapCommerce:CatalogList|xml catalogs = check sapCommerceClient->getCatalogs("electronics", {}, {fields: "FULL"});
```

Sample response:

```ballerina
{"catalogs": [{"id": "electronicsProductCatalog", "name": "Electronics Product Catalog", "catalogVersions": [{"id": "Online", "active": true}, {"id": "Staged", "active": false}]}]}
```

</details>

<details>
<summary>getCatalogVersion</summary>

Retrieves information about a specific catalog version.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `catalogId` | `string` | Yes | Catalog identifier. |
| `catalogVersionId` | `string` | Yes | Catalog version identifier (e.g., `"Online"`). |
| `queries` | `GetCatalogVersionQueries` | No | Query parameters including `fields`. |

Returns: `CatalogVersion|xml|error`

Sample code:

```ballerina
sapCommerce:CatalogVersion|xml catalogVersion = check sapCommerceClient->getCatalogVersion(
    "electronics", "electronicsProductCatalog", "Online", {}, {fields: "FULL"}
);
```

Sample response:

```ballerina
{"id": "Online", "lastModifiedTime": "2024-01-15T10:30:00Z", "categories": [{"id": "cameras", "name": "Cameras"}, {"id": "smartphones", "name": "Smartphones"}]}
```

</details>

<details>
<summary>getProductsByCategory</summary>

Retrieves a list of products for a category.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `categoryId` | `string` | Yes | Category identifier. |
| `queries` | `GetProductsByCategoryQueries` | No | Query parameters including `pageSize`, `currentPage`, `sort`, `query`, and `fields`. |

Returns: `ProductSearchPage|xml|error`

Sample code:

```ballerina
sapCommerce:ProductSearchPage|xml products = check sapCommerceClient->getProductsByCategory(
    "electronics", "cameras", {}, {pageSize: 25, currentPage: 0, fields: "FULL", sort: "name-asc"}
);
```

Sample response:

```ballerina
{"pagination": {"pageSize": 25, "currentPage": 0, "totalResults": 42, "totalPages": 2}, "products": [{"code": "1382080", "name": "EOS 450D", "price": {"value": 574.88, "currencyIso": "USD"}, "stock": {"stockLevelStatus": "inStock"}}], "sorts": [{"code": "name-asc", "name": "Name (ascending)", "selected": true}]}
```

</details>

#### Products

<details>
<summary>getProducts</summary>

Retrieves a list of products with search and filtering.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `queries` | `GetProductsQueries` | No | Query parameters including `query`, `pageSize`, `currentPage`, `sort`, and `fields`. |

Returns: `ProductSearchPage|xml|error`

Sample code:

```ballerina
sapCommerce:ProductSearchPage|xml searchResults = check sapCommerceClient->getProducts(
    "electronics", {}, {query: "camera", pageSize: 10, fields: "DEFAULT"}
);
```

Sample response:

```ballerina
{"pagination": {"pageSize": 10, "currentPage": 0, "totalResults": 15}, "products": [{"code": "1382080", "name": "EOS 450D", "summary": "Digital SLR camera"}, {"code": "2934302", "name": "PowerShot A480", "summary": "Compact digital camera"}]}
```

</details>

<details>
<summary>getProduct</summary>

Retrieves details for a specific product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `productCode` | `string` | Yes | Product identifier. |
| `queries` | `GetProductQueries` | No | Query parameters including `fields`. |

Returns: `Product|xml|error`

Sample code:

```ballerina
sapCommerce:Product|xml product = check sapCommerceClient->getProduct(
    "electronics", "1382080", {}, {fields: "FULL"}
);
```

Sample response:

```ballerina
{"code": "1382080", "name": "EOS 450D", "description": "12.2 megapixel CMOS sensor", "price": {"value": 574.88, "currencyIso": "USD", "formattedValue": "$574.88"}, "stock": {"stockLevel": 241, "stockLevelStatus": "inStock"}, "averageRating": 4.5, "numberOfReviews": 12, "purchasable": true, "categories": [{"code": "cameras", "name": "Cameras"}]}
```

</details>

<details>
<summary>getProductReviews</summary>

Retrieves the reviews of a product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `productCode` | `string` | Yes | Product identifier. |
| `queries` | `GetProductReviewsQueries` | No | Query parameters including `fields` and `maxCount`. |

Returns: `ReviewList|xml|error`

Sample code:

```ballerina
sapCommerce:ReviewList|xml reviews = check sapCommerceClient->getProductReviews(
    "electronics", "1382080", {}, {fields: "FULL"}
);
```

Sample response:

```ballerina
{"reviews": [{"id": "8796093055001", "headline": "Great camera", "comment": "Excellent image quality for the price.", "rating": 5.0, "alias": "PhotoFan", "date": "2024-03-10T14:22:00Z"}]}
```

</details>

<details>
<summary>createProductReview</summary>

Creates a customer review for a product.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `productCode` | `string` | Yes | Product identifier. |
| `payload` | `Review` | Yes | Review data including `headline`, `comment`, `rating`, and `alias`. |
| `queries` | `CreateProductReviewQueries` | No | Query parameters including `fields`. |

Returns: `Review|xml|error`

Sample code:

```ballerina
sapCommerce:Review|xml review = check sapCommerceClient->createProductReview(
    "electronics", "1382080",
    {headline: "Great camera", comment: "Excellent image quality.", rating: 5.0, alias: "PhotoFan"},
    {}, {fields: "DEFAULT"}
);
```

Sample response:

```ballerina
{"id": "8796093055002", "headline": "Great camera", "comment": "Excellent image quality.", "rating": 5.0, "alias": "PhotoFan", "date": "2024-06-15T09:30:00Z"}
```

</details>

#### Customer management

<details>
<summary>createUser</summary>

Registers a new customer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `payload` | `UserSignUp` | Yes | User registration data including `uid`, `firstName`, `lastName`, and `password`. |
| `queries` | `CreateUserQueries` | No | Query parameters including `fields`. |

Returns: `User|xml|error`

Sample code:

```ballerina
sapCommerce:User|xml user = check sapCommerceClient->createUser(
    "electronics",
    {uid: "john.doe@example.com", firstName: "John", lastName: "Doe", password: "SecurePass123!"},
    {}, {fields: "DEFAULT"}
);
```

Sample response:

```ballerina
{"uid": "john.doe@example.com", "name": "John Doe", "firstName": "John", "lastName": "Doe", "currency": {"isocode": "USD"}, "language": {"isocode": "en"}}
```

</details>

<details>
<summary>getUser</summary>

Retrieves the customer profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `userId` | `string` | Yes | User identifier or `'current'` for the authenticated user. |
| `queries` | `GetUserQueries` | No | Query parameters including `fields`. |

Returns: `User|xml|error`

Sample code:

```ballerina
sapCommerce:User|xml user = check sapCommerceClient->getUser(
    "electronics", "john.doe@example.com", {}, {fields: "FULL"}
);
```

Sample response:

```ballerina
{"uid": "john.doe@example.com", "name": "John Doe", "firstName": "John", "lastName": "Doe", "displayUid": "john.doe@example.com", "currency": {"isocode": "USD"}, "language": {"isocode": "en"}}
```

</details>

<details>
<summary>getAddresses</summary>

Retrieves the addresses of a customer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `userId` | `string` | Yes | User identifier. |
| `queries` | `GetAddressesQueries` | No | Query parameters including `fields`. |

Returns: `AddressList|xml|error`

Sample code:

```ballerina
sapCommerce:AddressList|xml addresses = check sapCommerceClient->getAddresses(
    "electronics", "john.doe@example.com", {}, {fields: "DEFAULT"}
);
```

Sample response:

```ballerina
{"addresses": [{"id": "8796093710359", "firstName": "John", "lastName": "Doe", "line1": "123 Main St", "town": "New York", "postalCode": "10001", "country": {"isocode": "US"}, "defaultAddress": true}]}
```

</details>

<details>
<summary>createAddress</summary>

Creates a new address for a customer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `userId` | `string` | Yes | User identifier. |
| `payload` | `Address` | Yes | Address data including `firstName`, `lastName`, `line1`, `town`, `postalCode`, and `country`. |
| `queries` | `CreateAddressQueries` | No | Query parameters including `fields`. |

Returns: `Address|xml|error`

Sample code:

```ballerina
sapCommerce:Address|xml address = check sapCommerceClient->createAddress(
    "electronics", "john.doe@example.com",
    {
        firstName: "John",
        lastName: "Doe",
        line1: "123 Main St",
        town: "New York",
        postalCode: "10001",
        country: {isocode: "US"}
    },
    {}, {fields: "DEFAULT"}
);
```

Sample response:

```ballerina
{"id": "8796093710359", "firstName": "John", "lastName": "Doe", "line1": "123 Main St", "town": "New York", "postalCode": "10001", "country": {"isocode": "US"}, "defaultAddress": false}
```

</details>

#### Cart management

<details>
<summary>createCart</summary>

Creates or restores a cart for a user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `userId` | `string` | Yes | User identifier or `'current'` / `'anonymous'`. |
| `queries` | `CreateCartQueries` | No | Query parameters including `fields`, `oldCartId`, and `toMergeCartGuid`. |

Returns: `Cart|xml|error`

Sample code:

```ballerina
sapCommerce:Cart|xml cart = check sapCommerceClient->createCart(
    "electronics", "john.doe@example.com", {}, {fields: "DEFAULT"}
);
```

Sample response:

```ballerina
{"code": "00001001", "guid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "totalItems": 0, "totalPrice": {"value": 0.0, "currencyIso": "USD", "formattedValue": "$0.00"}}
```

</details>

<details>
<summary>getCarts</summary>

Retrieves all carts of a customer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `userId` | `string` | Yes | User identifier. |
| `queries` | `GetCartsQueries` | No | Query parameters including `fields`, `savedCartsOnly`, `currentPage`, and `pageSize`. |

Returns: `CartList|xml|error`

Sample code:

```ballerina
sapCommerce:CartList|xml carts = check sapCommerceClient->getCarts(
    "electronics", "john.doe@example.com", {}, {fields: "DEFAULT"}
);
```

Sample response:

```ballerina
{"carts": [{"code": "00001001", "totalItems": 2, "totalPrice": {"value": 1149.76, "currencyIso": "USD", "formattedValue": "$1,149.76"}}]}
```

</details>

<details>
<summary>getCart</summary>

Retrieves a specific cart.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `cartId` | `string` | Yes | Cart identifier or `'current'` for the last modified cart. |
| `userId` | `string` | Yes | User identifier. |
| `queries` | `GetCartQueries` | No | Query parameters including `fields`. |

Returns: `Cart|xml|error`

Sample code:

```ballerina
sapCommerce:Cart|xml cart = check sapCommerceClient->getCart(
    "electronics", "00001001", "john.doe@example.com", {}, {fields: "FULL"}
);
```

Sample response:

```ballerina
{"code": "00001001", "totalItems": 2, "totalPrice": {"value": 1149.76, "currencyIso": "USD"}, "entries": [{"entryNumber": 0, "product": {"code": "1382080", "name": "EOS 450D"}, "quantity": 2, "totalPrice": {"value": 1149.76}}], "deliveryMode": {"code": "standard-gross"}}
```

</details>

#### Orders

<details>
<summary>placeOrder</summary>

Creates an order from the current cart.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `userId` | `string` | Yes | User identifier. |
| `queries` | `PlaceOrderQueries` | No | Query parameters including `cartId`, `termsChecked`, `securityCode`, and `fields`. |

Returns: `Order|xml|error`

Sample code:

```ballerina
sapCommerce:Order|xml placedOrder = check sapCommerceClient->placeOrder(
    "electronics", "john.doe@example.com",
    {}, {cartId: "00001001", termsChecked: true, fields: "FULL"}
);
```

Sample response:

```ballerina
{"code": "00002001", "status": "CREATED", "statusDisplay": "created", "created": "2024-06-15T14:30:00Z", "totalPrice": {"value": 1149.76, "currencyIso": "USD", "formattedValue": "$1,149.76"}, "entries": [{"entryNumber": 0, "product": {"code": "1382080", "name": "EOS 450D"}, "quantity": 2}]}
```

</details>

<details>
<summary>getOrders</summary>

Retrieves the order history for a customer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `userId` | `string` | Yes | User identifier. |
| `queries` | `GetOrdersQueries` | No | Query parameters including `pageSize`, `currentPage`, `sort`, `statuses`, and `fields`. |

Returns: `OrderHistoryList|xml|error`

Sample code:

```ballerina
sapCommerce:OrderHistoryList|xml orders = check sapCommerceClient->getOrders(
    "electronics", "john.doe@example.com", {}, {pageSize: 10, fields: "DEFAULT"}
);
```

Sample response:

```ballerina
{"orders": [{"code": "00002001", "status": "COMPLETED", "statusDisplay": "completed", "placed": "2024-06-15T14:30:00Z", "total": {"value": 1149.76, "currencyIso": "USD"}}], "pagination": {"pageSize": 10, "currentPage": 0, "totalResults": 1}}
```

</details>

<details>
<summary>getOrder</summary>

Retrieves a specific order by code or GUID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `code` | `string` | Yes | Order GUID or order code. |
| `queries` | `GetOrderQueries` | No | Query parameters including `fields`. |

Returns: `Order|xml|error`

Sample code:

```ballerina
sapCommerce:Order|xml retrievedOrder = check sapCommerceClient->getOrder(
    "electronics", "00002001", {}, {fields: "FULL"}
);
```

Sample response:

```ballerina
{"code": "00002001", "status": "COMPLETED", "statusDisplay": "completed", "created": "2024-06-15T14:30:00Z", "totalPrice": {"value": 1149.76, "currencyIso": "USD"}, "deliveryAddress": {"firstName": "John", "lastName": "Doe", "line1": "123 Main St", "town": "New York"}, "entries": [{"entryNumber": 0, "product": {"code": "1382080", "name": "EOS 450D"}, "quantity": 2}]}
```

</details>

#### Store locator

<details>
<summary>getStoreLocations</summary>

Retrieves store locations with optional geo-search.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `queries` | `GetStoreLocationsQueries` | No | Query parameters including `query`, `latitude`, `longitude`, `radius`, `pageSize`, and `fields`. |

Returns: `StoreFinderSearchPage|xml|error`

Sample code:

```ballerina
sapCommerce:StoreFinderSearchPage|xml stores = check sapCommerceClient->getStoreLocations(
    "electronics", {},
    {query: "New York", latitude: 40.7128, longitude: -74.006, radius: 50000.0, pageSize: 10, fields: "FULL"}
);
```

Sample response:

```ballerina
{"stores": [{"name": "Manhattan Store", "displayName": "Manhattan Electronics", "address": {"line1": "456 Broadway", "town": "New York", "postalCode": "10013", "country": {"isocode": "US"}}, "geoPoint": {"latitude": 40.7209, "longitude": -73.9984}}], "pagination": {"pageSize": 10, "totalResults": 3}}
```

</details>

<details>
<summary>getStoreLocation</summary>

Retrieves details for a specific store location.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `storeId` | `string` | Yes | Store identifier (store name). |
| `queries` | `GetStoreLocationQueries` | No | Query parameters including `fields`. |

Returns: `PointOfService|xml|error`

Sample code:

```ballerina
sapCommerce:PointOfService|xml store = check sapCommerceClient->getStoreLocation(
    "electronics", "Manhattan Store", {}, {fields: "FULL"}
);
```

Sample response:

```ballerina
{"name": "Manhattan Store", "displayName": "Manhattan Electronics", "address": {"line1": "456 Broadway", "town": "New York", "postalCode": "10013", "country": {"isocode": "US"}, "phone": "+1-212-555-0100"}, "geoPoint": {"latitude": 40.7209, "longitude": -73.9984}, "openingHours": {"weekDayOpeningList": [{"weekDay": "Mon", "openingTime": {"formattedHour": "09:00 AM"}, "closingTime": {"formattedHour": "09:00 PM"}}]}}
```

</details>

#### Support tickets

<details>
<summary>getTicketCategories</summary>

Retrieves the available ticket categories.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `queries` | `GetTicketCategoriesQueries` | No | Query parameters including `fields`. |

Returns: `TicketCategoryList|error`

Sample code:

```ballerina
sapCommerce:TicketCategoryList categories = check sapCommerceClient->getTicketCategories(
    "electronics", {}, {fields: "DEFAULT"}
);
```

Sample response:

```ballerina
{"ticketCategories": [{"id": "COMPLAINT", "name": "Product Complaint"}, {"id": "RETURNS", "name": "Product Returns"}, {"id": "ENQUIRY", "name": "General Enquiry"}]}
```

</details>

<details>
<summary>createTicket</summary>

Creates a new support ticket for a customer.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `userId` | `string` | Yes | User identifier. |
| `payload` | `TicketStarter` | Yes | Ticket data including `subject`, `message`, `ticketCategory`, and `associatedTo`. |
| `queries` | `CreateTicketQueries` | No | Query parameters including `fields`. |

Returns: `Ticket|error`

Sample code:

```ballerina
sapCommerce:Ticket ticket = check sapCommerceClient->createTicket(
    "electronics", "customer@example.com",
    {
        subject: "Defective smartphone screen",
        message: "Screen started flickering after 3 days of normal use.",
        ticketCategory: {id: "COMPLAINT", name: "Product Complaint"},
        associatedTo: {code: "00001234", 'type: "Order"}
    },
    {}, {fields: "DEFAULT"}
);
```

Sample response:

```ballerina
{"id": "TKT-000042", "subject": "Defective smartphone screen", "status": {"id": "OPEN", "name": "Open"}, "createdAt": "2024-06-15T10:00:00Z", "ticketCategory": {"id": "COMPLAINT", "name": "Product Complaint"}}
```

</details>

<details>
<summary>createTicketEvent</summary>

Adds a follow-up event or status update to an existing ticket.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `ticketId` | `string` | Yes | Ticket identifier. |
| `userId` | `string` | Yes | User identifier. |
| `payload` | `TicketEvent` | Yes | Event data including `message`, `addedByAgent`, and optional `toStatus`. |
| `queries` | `CreateTicketEventQueries` | No | Query parameters including `fields`. |

Returns: `TicketEvent|error`

Sample code:

```ballerina
sapCommerce:TicketEvent event = check sapCommerceClient->createTicketEvent(
    "electronics", "TKT-000042", "customer@example.com",
    {
        message: "Escalating to technical team for warranty replacement.",
        addedByAgent: true,
        author: "support.agent@company.com"
    },
    {}, {fields: "DEFAULT"}
);
```

Sample response:

```ballerina
{"code": "EVT-001", "message": "Escalating to technical team for warranty replacement.", "author": "support.agent@company.com", "addedByAgent": true, "createdAt": "2024-06-15T11:30:00Z"}
```

</details>

#### B2B procurement

<details>
<summary>createCostCenter</summary>

Creates a new cost center for B2B organizational budgeting.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `payload` | `B2BCostCenter` | Yes | Cost center data including `code`, `name`, `activeFlag`, and `currency`. |
| `queries` | `CreateCostCenterQueries` | No | Query parameters including `fields`. |

Returns: `B2BCostCenter|error`

Sample code:

```ballerina
sapCommerce:B2BCostCenter costCenter = check sapCommerceClient->createCostCenter(
    "powertools",
    {
        code: "CC-MKTG-2024",
        name: "Marketing Department Cost Center 2024",
        activeFlag: true,
        currency: {isocode: "USD", name: "US Dollar", symbol: "$", active: true}
    },
    {}, {fields: "FULL"}
);
```

Sample response:

```ballerina
{"code": "CC-MKTG-2024", "name": "Marketing Department Cost Center 2024", "activeFlag": true, "currency": {"isocode": "USD", "name": "US Dollar", "symbol": "$"}}
```

</details>

<details>
<summary>doAddBudgetToCostCenter</summary>

Associates a budget with a cost center.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `costCenterCode` | `string` | Yes | Cost center code to which the budget will be added. |
| `queries` | `DoAddBudgetToCostCenterQueries` | No | Query parameters including `budgetCode` and `fields`. |

Returns: `B2BSelectionData|error`

Sample code:

```ballerina
sapCommerce:B2BSelectionData budgetAssignment = check sapCommerceClient->doAddBudgetToCostCenter(
    "powertools", "CC-MKTG-2024",
    {}, {budgetCode: "BUDGET-MKTG-2024", fields: "DEFAULT"}
);
```

Sample response:

```ballerina
{"id": "BUDGET-MKTG-2024", "active": true, "selected": true, "normalizedCode": "budget-mktg-2024"}
```

</details>

<details>
<summary>createQuote</summary>

Creates a quote request from an existing cart.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `baseSiteId` | `string` | Yes | Base site identifier. |
| `userId` | `string` | Yes | User identifier. |
| `payload` | `QuoteStarter` | Yes | Quote starter data including `cartId`. |
| `queries` | `CreateQuoteQueries` | No | Query parameters including `fields`. |

Returns: `Quote|error`

Sample code:

```ballerina
sapCommerce:Quote quote = check sapCommerceClient->createQuote(
    "powertools", "procurement.manager@company.com",
    {cartId: "00001234"},
    {}, {fields: "FULL"}
);
```

Sample response:

```ballerina
{"code": "QT-000001", "state": "BUYER_DRAFT", "version": 1, "name": "Quote QT-000001", "creationTime": "2024-06-15T09:00:00Z", "totalPrice": {"value": 2450.00, "currencyIso": "USD"}}
```

</details>
