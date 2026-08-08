---
title: Actions
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.payment` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to Microsoft Dynamics 365 Finance Payment entities (currencies, exchange rates, payment calendars, payment days, payment instructions, payment methods, payment terms, voucher types, and VRM reference data) via OData. |

---

## Client

Provides access to Microsoft Dynamics 365 Finance Payment entities (currencies, exchange rates, payment calendars, payment days, payment instructions, payment methods, payment terms, voucher types, and VRM reference data) via OData.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `OAuth2ClientCredentialsGrantConfig` | Required | OAuth2 client credentials configuration containing `tokenUrl`, `clientId`, `clientSecret`, and `scopes` for authenticating against Microsoft Entra ID. |
| `httpVersion` | `http:HttpVersion` | `http:HTTP_2_0` | HTTP protocol version to use for outbound requests. |
| `http1Settings` | `http:ClientHttp1Settings` | `{}` | Configurations related to the HTTP/1.x protocol. |
| `secureSocket` | `http:ClientSecureSocket?` | `()` | SSL/TLS configuration for secure connections. |
| `proxy` | `http:ProxyConfig?` | `()` | HTTP proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/microsoft.dynamics365.finance.payment;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

payment:Client fo = check new (
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

#### Currencies

<details>
<summary>listCurrencies</summary>

Lists Currency records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListCurrenciesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CurrenciesCollection|error`

Sample code:

```ballerina
payment:CurrenciesCollection result = check fo->listCurrencies();
```

</details>

<details>
<summary>createCurrencies</summary>

Creates a new Currency.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Currency` | Yes | The Currency record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `Currency|error`

Sample code:

```ballerina
payment:Currency payload = {
    currencyCode: "USD",
    name: "US Dollar",
    symbol: "$",
    currencyGender: "Male",
    generalRoundingRule: 0.01,
    roundingMethodSalesOrders: "Ordinary"
};
payment:Currency result = check fo->createCurrencies(payload);
```

</details>

<details>
<summary>getCurrencies</summary>

Retrieves a single Currency by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `currencyCode` | `string` | Yes | The currency code key field, e.g. `"USD"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetCurrenciesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `Currency|error`

Sample code:

```ballerina
payment:Currency result = check fo->getCurrencies("USD");
```

</details>

<details>
<summary>deleteCurrencies</summary>

Deletes a Currency by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `currencyCode` | `string` | Yes | The currency code key field, e.g. `"USD"`. |
| `headers` | `DeleteCurrenciesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCurrencies("USD");
```

</details>

<details>
<summary>updateCurrencies</summary>

Updates an existing Currency.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `currencyCode` | `string` | Yes | The currency code key field, e.g. `"USD"`. |
| `payload` | `Currency` | Yes | The fields to update. |
| `headers` | `UpdateCurrenciesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `Currency|error`

Sample code:

```ballerina
payment:Currency payload = {
    symbol: "US$"
};
payment:Currency result = check fo->updateCurrencies("USD", payload);
```

</details>

#### Currency Rules

<details>
<summary>listCurrencyRules</summary>

Lists CurrencyRule records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListCurrencyRulesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `CurrencyRulesCollection|error`

Sample code:

```ballerina
payment:CurrencyRulesCollection result = check fo->listCurrencyRules();
```

</details>

<details>
<summary>createCurrencyRules</summary>

Creates a new CurrencyRule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CurrencyRule` | Yes | The CurrencyRule record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `CurrencyRule|error`

Sample code:

```ballerina
payment:CurrencyRule payload = {
    dataAreaId: "USMF",
    ruleGroup: "RG-01",
    currencyRuleGroup: "CRG-01",
    currency: "EUR",
    rateMethod: "ExchRates",
    currencyAction: "AmountCur"
};
payment:CurrencyRule result = check fo->createCurrencyRules(payload);
```

</details>

<details>
<summary>getCurrencyRules</summary>

Retrieves a single CurrencyRule by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `ruleGroup` | `string` | Yes | The rule group key field, e.g. `"RG-01"`. |
| `currencyRuleGroup` | `string` | Yes | The currency rule group key field, e.g. `"CRG-01"`. |
| `currency` | `string` | Yes | The currency key field, e.g. `"EUR"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetCurrencyRulesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `CurrencyRule|error`

Sample code:

```ballerina
payment:CurrencyRule result = check fo->getCurrencyRules("USMF", "RG-01", "CRG-01", "EUR");
```

</details>

<details>
<summary>deleteCurrencyRules</summary>

Deletes a CurrencyRule by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `ruleGroup` | `string` | Yes | The rule group key field, e.g. `"RG-01"`. |
| `currencyRuleGroup` | `string` | Yes | The currency rule group key field, e.g. `"CRG-01"`. |
| `currency` | `string` | Yes | The currency key field, e.g. `"EUR"`. |
| `headers` | `DeleteCurrencyRulesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCurrencyRules("USMF", "RG-01", "CRG-01", "EUR");
```

</details>

<details>
<summary>updateCurrencyRules</summary>

Updates an existing CurrencyRule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `ruleGroup` | `string` | Yes | The rule group key field, e.g. `"RG-01"`. |
| `currencyRuleGroup` | `string` | Yes | The currency rule group key field, e.g. `"CRG-01"`. |
| `currency` | `string` | Yes | The currency key field, e.g. `"EUR"`. |
| `payload` | `CurrencyRule` | Yes | The fields to update. |
| `headers` | `UpdateCurrencyRulesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `CurrencyRule|error`

Sample code:

```ballerina
payment:CurrencyRule payload = {
    rateMethod: "Indexes"
};
payment:CurrencyRule result = check fo->updateCurrencyRules("USMF", "RG-01", "CRG-01", "EUR", payload);
```

</details>

#### Denominations

<details>
<summary>listDenominations</summary>

Lists Denomination records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListDenominationsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `DenominationsCollection|error`

Sample code:

```ballerina
payment:DenominationsCollection result = check fo->listDenominations();
```

</details>

<details>
<summary>createDenominations</summary>

Creates a new Denomination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Denomination` | Yes | The Denomination record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `Denomination|error`

Sample code:

```ballerina
payment:Denomination payload = {
    dataAreaId: "USMF",
    name: "USD-100",
    currency: "USD",
    value: 100.00
};
payment:Denomination result = check fo->createDenominations(payload);
```

</details>

<details>
<summary>getDenominations</summary>

Retrieves a single Denomination by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `name` | `string` | Yes | The name key field, e.g. `"USD-100"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetDenominationsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `Denomination|error`

Sample code:

```ballerina
payment:Denomination result = check fo->getDenominations("USMF", "USD-100");
```

</details>

<details>
<summary>deleteDenominations</summary>

Deletes a Denomination by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `name` | `string` | Yes | The name key field, e.g. `"USD-100"`. |
| `headers` | `DeleteDenominationsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDenominations("USMF", "USD-100");
```

</details>

<details>
<summary>updateDenominations</summary>

Updates an existing Denomination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `name` | `string` | Yes | The name key field, e.g. `"USD-100"`. |
| `payload` | `Denomination` | Yes | The fields to update. |
| `headers` | `UpdateDenominationsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `Denomination|error`

Sample code:

```ballerina
payment:Denomination payload = {
    value: 100.50
};
payment:Denomination result = check fo->updateDenominations("USMF", "USD-100", payload);
```

</details>

#### Exchange Rates

<details>
<summary>listExchangeRates</summary>

Lists ExchangeRate records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListExchangeRatesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ExchangeRatesCollection|error`

Sample code:

```ballerina
payment:ExchangeRatesCollection result = check fo->listExchangeRates();
```

</details>

<details>
<summary>createExchangeRates</summary>

Creates a new ExchangeRate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExchangeRate` | Yes | The ExchangeRate record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `ExchangeRate|error`

Sample code:

```ballerina
payment:ExchangeRate payload = {
    rateTypeName: "CorporateRate",
    fromCurrency: "USD",
    toCurrency: "EUR",
    startDate: "2026-08-01",
    rate: 0.92,
    conversionFactor: "One"
};
payment:ExchangeRate result = check fo->createExchangeRates(payload);
```

</details>

<details>
<summary>getExchangeRates</summary>

Retrieves a single ExchangeRate by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rateTypeName` | `string` | Yes | The rate type name key field, e.g. `"CorporateRate"`. |
| `fromCurrency` | `string` | Yes | The from currency key field, e.g. `"USD"`. |
| `toCurrency` | `string` | Yes | The to currency key field, e.g. `"EUR"`. |
| `startDate` | `string` | Yes | The start date key field, e.g. `"2026-08-01"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetExchangeRatesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `ExchangeRate|error`

Sample code:

```ballerina
payment:ExchangeRate result = check fo->getExchangeRates("CorporateRate", "USD", "EUR", "2026-08-01");
```

</details>

<details>
<summary>deleteExchangeRates</summary>

Deletes an ExchangeRate by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rateTypeName` | `string` | Yes | The rate type name key field, e.g. `"CorporateRate"`. |
| `fromCurrency` | `string` | Yes | The from currency key field, e.g. `"USD"`. |
| `toCurrency` | `string` | Yes | The to currency key field, e.g. `"EUR"`. |
| `startDate` | `string` | Yes | The start date key field, e.g. `"2026-08-01"`. |
| `headers` | `DeleteExchangeRatesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteExchangeRates("CorporateRate", "USD", "EUR", "2026-08-01");
```

</details>

<details>
<summary>updateExchangeRates</summary>

Updates an existing ExchangeRate.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rateTypeName` | `string` | Yes | The rate type name key field, e.g. `"CorporateRate"`. |
| `fromCurrency` | `string` | Yes | The from currency key field, e.g. `"USD"`. |
| `toCurrency` | `string` | Yes | The to currency key field, e.g. `"EUR"`. |
| `startDate` | `string` | Yes | The start date key field, e.g. `"2026-08-01"`. |
| `payload` | `ExchangeRate` | Yes | The fields to update. |
| `headers` | `UpdateExchangeRatesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `ExchangeRate|error`

Sample code:

```ballerina
payment:ExchangeRate payload = {
    rate: 0.935
};
payment:ExchangeRate result = check fo->updateExchangeRates("CorporateRate", "USD", "EUR", "2026-08-01", payload);
```

</details>

#### Exchange Rates Non ISO

<details>
<summary>listExchangeRatesNonISO</summary>

Lists ExchangeRateNonISO (non-ISO currency exchange rate) records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListExchangeRatesNonISOQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `ExchangeRatesNonISOCollection|error`

Sample code:

```ballerina
payment:ExchangeRatesNonISOCollection result = check fo->listExchangeRatesNonISO();
```

</details>

<details>
<summary>createExchangeRatesNonISO</summary>

Creates a new ExchangeRateNonISO.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ExchangeRateNonISO` | Yes | The ExchangeRateNonISO record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `ExchangeRateNonISO|error`

Sample code:

```ballerina
payment:ExchangeRateNonISO payload = {
    rateTypeName: "CorporateRate",
    fromCurrency: "USD",
    toCurrency: "XOF",
    startDate: "2026-08-01",
    rate: 605.5,
    conversionFactor: "One"
};
payment:ExchangeRateNonISO result = check fo->createExchangeRatesNonISO(payload);
```

</details>

<details>
<summary>getExchangeRatesNonISO</summary>

Retrieves a single ExchangeRateNonISO by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rateTypeName` | `string` | Yes | The rate type name key field, e.g. `"CorporateRate"`. |
| `fromCurrency` | `string` | Yes | The from currency key field, e.g. `"USD"`. |
| `toCurrency` | `string` | Yes | The to currency key field, e.g. `"XOF"`. |
| `startDate` | `string` | Yes | The start date key field, e.g. `"2026-08-01"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetExchangeRatesNonISOQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `ExchangeRateNonISO|error`

Sample code:

```ballerina
payment:ExchangeRateNonISO result = check fo->getExchangeRatesNonISO("CorporateRate", "USD", "XOF", "2026-08-01");
```

</details>

<details>
<summary>deleteExchangeRatesNonISO</summary>

Deletes an ExchangeRateNonISO by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rateTypeName` | `string` | Yes | The rate type name key field, e.g. `"CorporateRate"`. |
| `fromCurrency` | `string` | Yes | The from currency key field, e.g. `"USD"`. |
| `toCurrency` | `string` | Yes | The to currency key field, e.g. `"XOF"`. |
| `startDate` | `string` | Yes | The start date key field, e.g. `"2026-08-01"`. |
| `headers` | `DeleteExchangeRatesNonISOHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteExchangeRatesNonISO("CorporateRate", "USD", "XOF", "2026-08-01");
```

</details>

<details>
<summary>updateExchangeRatesNonISO</summary>

Updates an existing ExchangeRateNonISO.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rateTypeName` | `string` | Yes | The rate type name key field, e.g. `"CorporateRate"`. |
| `fromCurrency` | `string` | Yes | The from currency key field, e.g. `"USD"`. |
| `toCurrency` | `string` | Yes | The to currency key field, e.g. `"XOF"`. |
| `startDate` | `string` | Yes | The start date key field, e.g. `"2026-08-01"`. |
| `payload` | `ExchangeRateNonISO` | Yes | The fields to update. |
| `headers` | `UpdateExchangeRatesNonISOHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `ExchangeRateNonISO|error`

Sample code:

```ballerina
payment:ExchangeRateNonISO payload = {
    rate: 610.0
};
payment:ExchangeRateNonISO result = check fo->updateExchangeRatesNonISO("CorporateRate", "USD", "XOF", "2026-08-01", payload);
```

</details>

#### Payment Calendar Rules

<details>
<summary>listPaymentCalendarRules</summary>

Lists PaymentCalendarRule records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListPaymentCalendarRulesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `PaymentCalendarRulesCollection|error`

Sample code:

```ballerina
payment:PaymentCalendarRulesCollection result = check fo->listPaymentCalendarRules();
```

</details>

<details>
<summary>createPaymentCalendarRules</summary>

Creates a new PaymentCalendarRule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PaymentCalendarRule` | Yes | The PaymentCalendarRule record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `PaymentCalendarRule|error`

Sample code:

```ballerina
payment:PaymentCalendarRule payload = {
    dataAreaId: "USMF",
    moduleType: "Vendor",
    priority: 1,
    name: "Vendor default calendar rule",
    ruleType: "LegalEntityLocation",
    isActive: "Yes"
};
payment:PaymentCalendarRule result = check fo->createPaymentCalendarRules(payload);
```

</details>

<details>
<summary>getPaymentCalendarRules</summary>

Retrieves a single PaymentCalendarRule by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `moduleType` | `string` | Yes | The module type key field, e.g. `"Vendor"`. |
| `priority` | `int` | Yes | The priority key field, e.g. `1`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetPaymentCalendarRulesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `PaymentCalendarRule|error`

Sample code:

```ballerina
payment:PaymentCalendarRule result = check fo->getPaymentCalendarRules("USMF", "Vendor", 1);
```

</details>

<details>
<summary>deletePaymentCalendarRules</summary>

Deletes a PaymentCalendarRule by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `moduleType` | `string` | Yes | The module type key field, e.g. `"Vendor"`. |
| `priority` | `int` | Yes | The priority key field, e.g. `1`. |
| `headers` | `DeletePaymentCalendarRulesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePaymentCalendarRules("USMF", "Vendor", 1);
```

</details>

<details>
<summary>updatePaymentCalendarRules</summary>

Updates an existing PaymentCalendarRule.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `moduleType` | `string` | Yes | The module type key field, e.g. `"Vendor"`. |
| `priority` | `int` | Yes | The priority key field, e.g. `1`. |
| `payload` | `PaymentCalendarRule` | Yes | The fields to update. |
| `headers` | `UpdatePaymentCalendarRulesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `PaymentCalendarRule|error`

Sample code:

```ballerina
payment:PaymentCalendarRule payload = {
    isActive: "No"
};
payment:PaymentCalendarRule result = check fo->updatePaymentCalendarRules("USMF", "Vendor", 1, payload);
```

</details>

#### Payment Days

<details>
<summary>listPaymentDays</summary>

Lists PaymentDay records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListPaymentDaysQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `PaymentDaysCollection|error`

Sample code:

```ballerina
payment:PaymentDaysCollection result = check fo->listPaymentDays();
```

</details>

<details>
<summary>createPaymentDays</summary>

Creates a new PaymentDay.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PaymentDay` | Yes | The PaymentDay record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `PaymentDay|error`

Sample code:

```ballerina
payment:PaymentDay payload = {
    dataAreaId: "USMF",
    name: "Month-end",
    frequency: "Month",
    dayOfWeek: "None",
    dayOfMonth: 30,
    description: "Month-end payment day"
};
payment:PaymentDay result = check fo->createPaymentDays(payload);
```

</details>

<details>
<summary>getPaymentDays</summary>

Retrieves a single PaymentDay by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `name` | `string` | Yes | The name key field, e.g. `"Month-end"`. |
| `frequency` | `string` | Yes | The frequency key field, e.g. `"Month"`. |
| `dayOfWeek` | `string` | Yes | The day of week key field, e.g. `"None"`. |
| `dayOfMonth` | `int` | Yes | The day of month key field, e.g. `30`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetPaymentDaysQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `PaymentDay|error`

Sample code:

```ballerina
payment:PaymentDay result = check fo->getPaymentDays("USMF", "Month-end", "Month", "None", 30);
```

</details>

<details>
<summary>deletePaymentDays</summary>

Deletes a PaymentDay by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `name` | `string` | Yes | The name key field, e.g. `"Month-end"`. |
| `frequency` | `string` | Yes | The frequency key field, e.g. `"Month"`. |
| `dayOfWeek` | `string` | Yes | The day of week key field, e.g. `"None"`. |
| `dayOfMonth` | `int` | Yes | The day of month key field, e.g. `30`. |
| `headers` | `DeletePaymentDaysHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePaymentDays("USMF", "Month-end", "Month", "None", 30);
```

</details>

<details>
<summary>updatePaymentDays</summary>

Updates an existing PaymentDay.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `name` | `string` | Yes | The name key field, e.g. `"Month-end"`. |
| `frequency` | `string` | Yes | The frequency key field, e.g. `"Month"`. |
| `dayOfWeek` | `string` | Yes | The day of week key field, e.g. `"None"`. |
| `dayOfMonth` | `int` | Yes | The day of month key field, e.g. `30`. |
| `payload` | `PaymentDay` | Yes | The fields to update. |
| `headers` | `UpdatePaymentDaysHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `PaymentDay|error`

Sample code:

```ballerina
payment:PaymentDay payload = {
    description: "Month-end payment day - revised"
};
payment:PaymentDay result = check fo->updatePaymentDays("USMF", "Month-end", "Month", "None", 30, payload);
```

</details>

#### Payment Instructions

<details>
<summary>listPaymentInstructions</summary>

Lists PaymentInstruction records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListPaymentInstructionsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `PaymentInstructionsCollection|error`

Sample code:

```ballerina
payment:PaymentInstructionsCollection result = check fo->listPaymentInstructions();
```

</details>

<details>
<summary>createPaymentInstructions</summary>

Creates a new PaymentInstruction.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PaymentInstruction` | Yes | The PaymentInstruction record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `PaymentInstruction|error`

Sample code:

```ballerina
payment:PaymentInstruction payload = {
    dataAreaId: "USMF",
    paymentInstructionCode: "PI-EFT",
    name: "Electronic funds transfer",
    description: "Standard EFT payment instruction"
};
payment:PaymentInstruction result = check fo->createPaymentInstructions(payload);
```

</details>

<details>
<summary>getPaymentInstructions</summary>

Retrieves a single PaymentInstruction by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `paymentInstructionCode` | `string` | Yes | The payment instruction code key field, e.g. `"PI-EFT"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetPaymentInstructionsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `PaymentInstruction|error`

Sample code:

```ballerina
payment:PaymentInstruction result = check fo->getPaymentInstructions("USMF", "PI-EFT");
```

</details>

<details>
<summary>deletePaymentInstructions</summary>

Deletes a PaymentInstruction by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `paymentInstructionCode` | `string` | Yes | The payment instruction code key field, e.g. `"PI-EFT"`. |
| `headers` | `DeletePaymentInstructionsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePaymentInstructions("USMF", "PI-EFT");
```

</details>

<details>
<summary>updatePaymentInstructions</summary>

Updates an existing PaymentInstruction.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `paymentInstructionCode` | `string` | Yes | The payment instruction code key field, e.g. `"PI-EFT"`. |
| `payload` | `PaymentInstruction` | Yes | The fields to update. |
| `headers` | `UpdatePaymentInstructionsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `PaymentInstruction|error`

Sample code:

```ballerina
payment:PaymentInstruction payload = {
    description: "Standard EFT payment instruction - revised"
};
payment:PaymentInstruction result = check fo->updatePaymentInstructions("USMF", "PI-EFT", payload);
```

</details>

#### Payment Methods

<details>
<summary>listPaymentMethods</summary>

Lists PaymentMethod records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListPaymentMethodsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `PaymentMethodsCollection|error`

Sample code:

```ballerina
payment:PaymentMethodsCollection result = check fo->listPaymentMethods();
```

</details>

<details>
<summary>createPaymentMethods</summary>

Creates a new PaymentMethod.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PaymentMethod` | Yes | The PaymentMethod record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `PaymentMethod|error`

Sample code:

```ballerina
payment:PaymentMethod payload = {
    dataAreaId: "USMF",
    payMethod: "CHECK",
    payedByTxt: "Company check",
    postMethod: "Bank",
    automaticPayment: "No",
    costOwner: "Company"
};
payment:PaymentMethod result = check fo->createPaymentMethods(payload);
```

</details>

<details>
<summary>getPaymentMethods</summary>

Retrieves a single PaymentMethod by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `payMethod` | `string` | Yes | The pay method key field, e.g. `"CHECK"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetPaymentMethodsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `PaymentMethod|error`

Sample code:

```ballerina
payment:PaymentMethod result = check fo->getPaymentMethods("USMF", "CHECK");
```

</details>

<details>
<summary>deletePaymentMethods</summary>

Deletes a PaymentMethod by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `payMethod` | `string` | Yes | The pay method key field, e.g. `"CHECK"`. |
| `headers` | `DeletePaymentMethodsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePaymentMethods("USMF", "CHECK");
```

</details>

<details>
<summary>updatePaymentMethods</summary>

Updates an existing PaymentMethod.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `payMethod` | `string` | Yes | The pay method key field, e.g. `"CHECK"`. |
| `payload` | `PaymentMethod` | Yes | The fields to update. |
| `headers` | `UpdatePaymentMethodsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `PaymentMethod|error`

Sample code:

```ballerina
payment:PaymentMethod payload = {
    automaticPayment: "Yes"
};
payment:PaymentMethod result = check fo->updatePaymentMethods("USMF", "CHECK", payload);
```

</details>

#### Payment Terms

<details>
<summary>listPaymentTerms</summary>

Lists PaymentTerm records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListPaymentTermsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `PaymentTermsCollection|error`

Sample code:

```ballerina
payment:PaymentTermsCollection result = check fo->listPaymentTerms();
```

</details>

<details>
<summary>createPaymentTerms</summary>

Creates a new PaymentTerm.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `PaymentTerm` | Yes | The PaymentTerm record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `PaymentTerm|error`

Sample code:

```ballerina
payment:PaymentTerm payload = {
    dataAreaId: "USMF",
    name: "Net30",
    description: "Net 30 days",
    paymentMethodType: "Net",
    numberOfDays: 30,
    isDefaultPaymentTerm: "No"
};
payment:PaymentTerm result = check fo->createPaymentTerms(payload);
```

</details>

<details>
<summary>getPaymentTerms</summary>

Retrieves a single PaymentTerm by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `name` | `string` | Yes | The name key field, e.g. `"Net30"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetPaymentTermsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `PaymentTerm|error`

Sample code:

```ballerina
payment:PaymentTerm result = check fo->getPaymentTerms("USMF", "Net30");
```

</details>

<details>
<summary>deletePaymentTerms</summary>

Deletes a PaymentTerm by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `name` | `string` | Yes | The name key field, e.g. `"Net30"`. |
| `headers` | `DeletePaymentTermsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deletePaymentTerms("USMF", "Net30");
```

</details>

<details>
<summary>updatePaymentTerms</summary>

Updates an existing PaymentTerm.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `name` | `string` | Yes | The name key field, e.g. `"Net30"`. |
| `payload` | `PaymentTerm` | Yes | The fields to update. |
| `headers` | `UpdatePaymentTermsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `PaymentTerm|error`

Sample code:

```ballerina
payment:PaymentTerm payload = {
    numberOfDays: 45
};
payment:PaymentTerm result = check fo->updatePaymentTerms("USMF", "Net30", payload);
```

</details>

#### VRM Currencies

<details>
<summary>listVRMCurrencies</summary>

Lists VRMCurrency (vendor registration and management currency) records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListVRMCurrenciesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `VRMCurrenciesCollection|error`

Sample code:

```ballerina
payment:VRMCurrenciesCollection result = check fo->listVRMCurrencies();
```

</details>

<details>
<summary>createVRMCurrencies</summary>

Creates a new VRMCurrency.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VRMCurrency` | Yes | The VRMCurrency record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `VRMCurrency|error`

Sample code:

```ballerina
payment:VRMCurrency payload = {
    currencyCode: "USD",
    name: "US Dollar"
};
payment:VRMCurrency result = check fo->createVRMCurrencies(payload);
```

</details>

<details>
<summary>getVRMCurrencies</summary>

Retrieves a single VRMCurrency by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `currencyCode` | `string` | Yes | The currency code key field, e.g. `"USD"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetVRMCurrenciesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `VRMCurrency|error`

Sample code:

```ballerina
payment:VRMCurrency result = check fo->getVRMCurrencies("USD");
```

</details>

<details>
<summary>deleteVRMCurrencies</summary>

Deletes a VRMCurrency by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `currencyCode` | `string` | Yes | The currency code key field, e.g. `"USD"`. |
| `headers` | `DeleteVRMCurrenciesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVRMCurrencies("USD");
```

</details>

<details>
<summary>updateVRMCurrencies</summary>

Updates an existing VRMCurrency.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `currencyCode` | `string` | Yes | The currency code key field, e.g. `"USD"`. |
| `payload` | `VRMCurrency` | Yes | The fields to update. |
| `headers` | `UpdateVRMCurrenciesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `VRMCurrency|error`

Sample code:

```ballerina
payment:VRMCurrency payload = {
    name: "United States Dollar"
};
payment:VRMCurrency result = check fo->updateVRMCurrencies("USD", payload);
```

</details>

#### VRM Languages

<details>
<summary>listVRMLanguages</summary>

Lists VRMLanguage (vendor registration and management language) records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListVRMLanguagesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `VRMLanguagesCollection|error`

Sample code:

```ballerina
payment:VRMLanguagesCollection result = check fo->listVRMLanguages();
```

</details>

<details>
<summary>createVRMLanguages</summary>

Creates a new VRMLanguage.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VRMLanguage` | Yes | The VRMLanguage record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `VRMLanguage|error`

Sample code:

```ballerina
payment:VRMLanguage payload = {
    languageId: "en-us",
    description: "English (United States)"
};
payment:VRMLanguage result = check fo->createVRMLanguages(payload);
```

</details>

<details>
<summary>getVRMLanguages</summary>

Retrieves a single VRMLanguage by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `languageId` | `string` | Yes | The language id key field, e.g. `"en-us"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetVRMLanguagesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `VRMLanguage|error`

Sample code:

```ballerina
payment:VRMLanguage result = check fo->getVRMLanguages("en-us");
```

</details>

<details>
<summary>deleteVRMLanguages</summary>

Deletes a VRMLanguage by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `languageId` | `string` | Yes | The language id key field, e.g. `"en-us"`. |
| `headers` | `DeleteVRMLanguagesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVRMLanguages("en-us");
```

</details>

<details>
<summary>updateVRMLanguages</summary>

Updates an existing VRMLanguage.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `languageId` | `string` | Yes | The language id key field, e.g. `"en-us"`. |
| `payload` | `VRMLanguage` | Yes | The fields to update. |
| `headers` | `UpdateVRMLanguagesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `VRMLanguage|error`

Sample code:

```ballerina
payment:VRMLanguage payload = {
    description: "English (US)"
};
payment:VRMLanguage result = check fo->updateVRMLanguages("en-us", payload);
```

</details>

#### VRM Parameters

<details>
<summary>listVRMParameters</summary>

Lists VRMParameter (vendor registration and management module parameter) records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListVRMParametersQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `VRMParametersCollection|error`

Sample code:

```ballerina
payment:VRMParametersCollection result = check fo->listVRMParameters();
```

</details>

<details>
<summary>createVRMParameters</summary>

Creates a new VRMParameter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VRMParameter` | Yes | The VRMParameter record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `VRMParameter|error`

Sample code:

```ballerina
payment:VRMParameter payload = {
    dataAreaId: "USMF",
    vendorAccountNumberSequenceCode: "Vend_1",
    isVendorAccountNumberSequenceManual: "No",
    mandatoryTaxGroup: "Yes"
};
payment:VRMParameter result = check fo->createVRMParameters(payload);
```

</details>

<details>
<summary>getVRMParameters</summary>

Retrieves a single VRMParameter by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `'key` | `int` | Yes | The entity key value, e.g. `1`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetVRMParametersQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `VRMParameter|error`

Sample code:

```ballerina
payment:VRMParameter result = check fo->getVRMParameters("USMF", 1);
```

</details>

<details>
<summary>deleteVRMParameters</summary>

Deletes a VRMParameter by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `'key` | `int` | Yes | The entity key value, e.g. `1`. |
| `headers` | `DeleteVRMParametersHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVRMParameters("USMF", 1);
```

</details>

<details>
<summary>updateVRMParameters</summary>

Updates an existing VRMParameter.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `'key` | `int` | Yes | The entity key value, e.g. `1`. |
| `payload` | `VRMParameter` | Yes | The fields to update. |
| `headers` | `UpdateVRMParametersHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `VRMParameter|error`

Sample code:

```ballerina
payment:VRMParameter payload = {
    mandatoryTaxGroup: "No"
};
payment:VRMParameter result = check fo->updateVRMParameters("USMF", 1, payload);
```

</details>

#### VRM People

<details>
<summary>listVRMPeople</summary>

Lists VRMPerson (vendor registration and management contact) records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListVRMPeopleQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `VRMPeopleCollection|error`

Sample code:

```ballerina
payment:VRMPeopleCollection result = check fo->listVRMPeople();
```

</details>

<details>
<summary>createVRMPeople</summary>

Creates a new VRMPerson.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VRMPerson` | Yes | The VRMPerson record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `VRMPerson|error`

Sample code:

```ballerina
payment:VRMPerson payload = {
    partyNumber: "VRM-000123",
    firstName: "Jordan",
    lastName: "Lee",
    primaryContactEmail: "jordan.lee@example.com",
    languageId: "en-us"
};
payment:VRMPerson result = check fo->createVRMPeople(payload);
```

</details>

<details>
<summary>getVRMPeople</summary>

Retrieves a single VRMPerson by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field, e.g. `"VRM-000123"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetVRMPeopleQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `VRMPerson|error`

Sample code:

```ballerina
payment:VRMPerson result = check fo->getVRMPeople("VRM-000123");
```

</details>

<details>
<summary>deleteVRMPeople</summary>

Deletes a VRMPerson by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field, e.g. `"VRM-000123"`. |
| `headers` | `DeleteVRMPeopleHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVRMPeople("VRM-000123");
```

</details>

<details>
<summary>updateVRMPeople</summary>

Updates an existing VRMPerson.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partyNumber` | `string` | Yes | The party number key field, e.g. `"VRM-000123"`. |
| `payload` | `VRMPerson` | Yes | The fields to update. |
| `headers` | `UpdateVRMPeopleHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `VRMPerson|error`

Sample code:

```ballerina
payment:VRMPerson payload = {
    primaryContactEmail: "jordan.lee2@example.com"
};
payment:VRMPerson result = check fo->updateVRMPeople("VRM-000123", payload);
```

</details>

#### VRM Tax Groups

<details>
<summary>listVRMTaxGroups</summary>

Lists VRMTaxGroup (vendor registration and management tax group) records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListVRMTaxGroupsQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `VRMTaxGroupsCollection|error`

Sample code:

```ballerina
payment:VRMTaxGroupsCollection result = check fo->listVRMTaxGroups();
```

</details>

<details>
<summary>createVRMTaxGroups</summary>

Creates a new VRMTaxGroup.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VRMTaxGroup` | Yes | The VRMTaxGroup record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `VRMTaxGroup|error`

Sample code:

```ballerina
payment:VRMTaxGroup payload = {
    dataAreaId: "USMF",
    taxGroupCode: "TG-STD",
    description: "Standard tax group"
};
payment:VRMTaxGroup result = check fo->createVRMTaxGroups(payload);
```

</details>

<details>
<summary>getVRMTaxGroups</summary>

Retrieves a single VRMTaxGroup by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `taxGroupCode` | `string` | Yes | The tax group code key field, e.g. `"TG-STD"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetVRMTaxGroupsQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `VRMTaxGroup|error`

Sample code:

```ballerina
payment:VRMTaxGroup result = check fo->getVRMTaxGroups("USMF", "TG-STD");
```

</details>

<details>
<summary>deleteVRMTaxGroups</summary>

Deletes a VRMTaxGroup by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `taxGroupCode` | `string` | Yes | The tax group code key field, e.g. `"TG-STD"`. |
| `headers` | `DeleteVRMTaxGroupsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVRMTaxGroups("USMF", "TG-STD");
```

</details>

<details>
<summary>updateVRMTaxGroups</summary>

Updates an existing VRMTaxGroup.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `taxGroupCode` | `string` | Yes | The tax group code key field, e.g. `"TG-STD"`. |
| `payload` | `VRMTaxGroup` | Yes | The fields to update. |
| `headers` | `UpdateVRMTaxGroupsHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `VRMTaxGroup|error`

Sample code:

```ballerina
payment:VRMTaxGroup payload = {
    description: "Standard tax group - revised"
};
payment:VRMTaxGroup result = check fo->updateVRMTaxGroups("USMF", "TG-STD", payload);
```

</details>

#### Voucher Types

<details>
<summary>listVoucherTypes</summary>

Lists VoucherType records, with optional OData query support.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `ListVoucherTypesQueries` | No | OData query options: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `VoucherTypesCollection|error`

Sample code:

```ballerina
payment:VoucherTypesCollection result = check fo->listVoucherTypes();
```

</details>

<details>
<summary>createVoucherTypes</summary>

Creates a new VoucherType.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VoucherType` | Yes | The VoucherType record to create. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |

Returns: `VoucherType|error`

Sample code:

```ballerina
payment:VoucherType payload = {
    dataAreaId: "USMF",
    voucherType: "GenJrn",
    description: "General journal voucher",
    journalName: "GenJrn",
    isDefaultType: "Yes"
};
payment:VoucherType result = check fo->createVoucherTypes(payload);
```

</details>

<details>
<summary>getVoucherTypes</summary>

Retrieves a single VoucherType by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `voucherType` | `string` | Yes | The voucher type key field, e.g. `"GenJrn"`. |
| `headers` | `map<string\|string[]>` | No | Optional HTTP headers to include in the request. |
| `queries` | `GetVoucherTypesQueries` | No | OData query options: `$expand`, `$select`. |

Returns: `VoucherType|error`

Sample code:

```ballerina
payment:VoucherType result = check fo->getVoucherTypes("USMF", "GenJrn");
```

</details>

<details>
<summary>deleteVoucherTypes</summary>

Deletes a VoucherType by its key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `voucherType` | `string` | Yes | The voucher type key field, e.g. `"GenJrn"`. |
| `headers` | `DeleteVoucherTypesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVoucherTypes("USMF", "GenJrn");
```

</details>

<details>
<summary>updateVoucherTypes</summary>

Updates an existing VoucherType.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier, e.g. `"USMF"`. |
| `voucherType` | `string` | Yes | The voucher type key field, e.g. `"GenJrn"`. |
| `payload` | `VoucherType` | Yes | The fields to update. |
| `headers` | `UpdateVoucherTypesHeaders` | No | Optional headers, including `ifMatch` (ETag for optimistic concurrency). |

Returns: `VoucherType|error`

Sample code:

```ballerina
payment:VoucherType payload = {
    description: "General journal voucher - revised"
};
payment:VoucherType result = check fo->updateVoucherTypes("USMF", "GenJrn", payload);
```

</details>
