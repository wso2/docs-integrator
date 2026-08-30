---
title: Actions
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.dynamics365.finance.coreorg` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides full CRUD access to Microsoft Dynamics 365 Finance legal entities, warehouses, VAT registration numbers, and the supporting directory, name formatting, and posting configuration entities via the Dynamics 365 Finance and Operations OData API. |

---

## Client

Provides full CRUD access to Microsoft Dynamics 365 Finance legal entities, warehouses, VAT registration numbers, and the supporting directory, name formatting, and posting configuration entities via the Dynamics 365 Finance and Operations OData API.

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
import ballerinax/microsoft.dynamics365.finance.coreorg;

configurable string tokenUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string serviceUrl = ?;

coreorg:Client fo = check new (
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

#### Card Types

<details>
<summary>listCardTypes</summary>

Reads all card types used for expense and travel management.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCardTypesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `coreorg:CardTypesCollection|error`

Sample code:

```ballerina
coreorg:CardTypesCollection cardTypes = check fo->listCardTypes(
    queries = {
        filter: "dataAreaId eq 'USMF'",
        top: 20
    }
);
```

</details>

<details>
<summary>createCardTypes</summary>

Creates a card type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CardTypes` | Yes | The card type to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `coreorg:CardTypes|error`

Sample code:

```ballerina
coreorg:CardTypes cardType = check fo->createCardTypes({
    dataAreaId: "USMF",
    trvCreditCardType: "AMEX",
    trvCreditCardDesc: "American Express"
});
```

</details>

<details>
<summary>getCardTypes</summary>

Reads a specific card type by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `trvCreditCardType` | `string` | Yes | The trv credit card type key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCardTypesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `coreorg:CardTypes|error`

Sample code:

```ballerina
coreorg:CardTypes cardType = check fo->getCardTypes("USMF", "AMEX");
```

</details>

<details>
<summary>deleteCardTypes</summary>

Deletes a specific card type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `trvCreditCardType` | `string` | Yes | The trv credit card type key field. |
| `headers` | `DeleteCardTypesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCardTypes(
    "USMF",
    "AMEX",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCardTypes</summary>

Updates a specific card type.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `trvCreditCardType` | `string` | Yes | The trv credit card type key field. |
| `payload` | `CardTypes` | Yes | The fields to update. |
| `headers` | `UpdateCardTypesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `coreorg:CardTypes|error`

Sample code:

```ballerina
coreorg:CardTypes updated = check fo->updateCardTypes(
    "USMF",
    "AMEX",
    {trvCreditCardDesc: "American Express Corporate"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Categories

<details>
<summary>listCategories</summary>

Reads all categories used for project, production, and expense tracking.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListCategoriesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `coreorg:CategoriesCollection|error`

Sample code:

```ballerina
coreorg:CategoriesCollection categories = check fo->listCategories(
    queries = {
        filter: "UseInProject eq 'Yes'",
        'select: "CategoryId,CategoryName,UseInProject"
    }
);
```

</details>

<details>
<summary>createCategories</summary>

Creates a category.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Category` | Yes | The category to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `coreorg:Category|error`

Sample code:

```ballerina
coreorg:Category category = check fo->createCategories({
    dataAreaId: "USMF",
    categoryId: "TravelExp",
    categoryName: "Travel expenses",
    useInExpense: "Yes",
    useInProject: "No",
    useInProduction: "No"
});
```

</details>

<details>
<summary>getCategories</summary>

Reads a specific category by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `categoryId` | `string` | Yes | The category id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetCategoriesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `coreorg:Category|error`

Sample code:

```ballerina
coreorg:Category category = check fo->getCategories("USMF", "TravelExp");
```

</details>

<details>
<summary>deleteCategories</summary>

Deletes a specific category.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `categoryId` | `string` | Yes | The category id key field. |
| `headers` | `DeleteCategoriesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteCategories(
    "USMF",
    "TravelExp",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateCategories</summary>

Updates a specific category.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `categoryId` | `string` | Yes | The category id key field. |
| `payload` | `Category` | Yes | The fields to update. |
| `headers` | `UpdateCategoriesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `coreorg:Category|error`

Sample code:

```ballerina
coreorg:Category updated = check fo->updateCategories(
    "USMF",
    "TravelExp",
    {useInProduction: "Yes"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Dir Parameters

<details>
<summary>listDirParameters</summary>

Reads all global address book (directory) parameter records.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListDirParametersQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `coreorg:DirParametersCollection|error`

Sample code:

```ballerina
coreorg:DirParametersCollection params = check fo->listDirParameters();
```

</details>

<details>
<summary>createDirParameters</summary>

Creates a directory parameters record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `DirParameters` | Yes | The directory parameters record to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `coreorg:DirParameters|error`

Sample code:

```ballerina
coreorg:DirParameters params = check fo->createDirParameters({
    useDuplicateCheck: "Yes",
    defaultPartyType: "Organization",
    nameSequence: "OrganizationName"
});
```

</details>

<details>
<summary>getDirParameters</summary>

Reads a specific directory parameters record by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'key` | `int` | Yes | The entity key value. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetDirParametersQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `coreorg:DirParameters|error`

Sample code:

```ballerina
coreorg:DirParameters params = check fo->getDirParameters(5637144576);
```

</details>

<details>
<summary>deleteDirParameters</summary>

Deletes a specific directory parameters record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'key` | `int` | Yes | The entity key value. |
| `headers` | `DeleteDirParametersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteDirParameters(
    5637144576,
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateDirParameters</summary>

Updates a specific directory parameters record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'key` | `int` | Yes | The entity key value. |
| `payload` | `DirParameters` | Yes | The fields to update. |
| `headers` | `UpdateDirParametersHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `coreorg:DirParameters|error`

Sample code:

```ballerina
coreorg:DirParameters updated = check fo->updateDirParameters(
    5637144576,
    {useDuplicateCheck: "No"},
    headers = {ifMatch: eTag}
);
```

</details>

#### ELCOAs

<details>
<summary>listELCOAs</summary>

Reads all elimination charts of accounts (ELCOAs) used in financial consolidation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListELCOAsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `coreorg:ELCOAsCollection|error`

Sample code:

```ballerina
coreorg:ELCOAsCollection elcoas = check fo->listELCOAs(
    queries = {filter: "dataAreaId eq 'USMF'"}
);
```

</details>

<details>
<summary>createELCOAs</summary>

Creates an ELCOA record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ELCOA` | Yes | The ELCOA record to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `coreorg:ELCOA|error`

Sample code:

```ballerina
coreorg:ELCOA elcoa = check fo->createELCOAs({
    dataAreaId: "USMF",
    dimensionAttributeValueDisplayValue: "140100",
    groupCode: "INTERCO",
    groupCodeDescription: "Intercompany eliminations",
    mainAccountNum: "140100",
    mainAccountDescription: "Intercompany receivables"
});
```

</details>

<details>
<summary>getELCOAs</summary>

Reads a specific ELCOA record by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `dimensionAttributeValueDisplayValue` | `string` | Yes | The dimension attribute value display value key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetELCOAsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `coreorg:ELCOA|error`

Sample code:

```ballerina
coreorg:ELCOA elcoa = check fo->getELCOAs("USMF", "140100");
```

</details>

<details>
<summary>deleteELCOAs</summary>

Deletes a specific ELCOA record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `dimensionAttributeValueDisplayValue` | `string` | Yes | The dimension attribute value display value key field. |
| `headers` | `DeleteELCOAsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteELCOAs(
    "USMF",
    "140100",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateELCOAs</summary>

Updates a specific ELCOA record.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `dimensionAttributeValueDisplayValue` | `string` | Yes | The dimension attribute value display value key field. |
| `payload` | `ELCOA` | Yes | The fields to update. |
| `headers` | `UpdateELCOAsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `coreorg:ELCOA|error`

Sample code:

```ballerina
coreorg:ELCOA updated = check fo->updateELCOAs(
    "USMF",
    "140100",
    {groupCodeDescription: "Intercompany eliminations - revised"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Empl Postings

<details>
<summary>listEmplPostings</summary>

Reads all employee posting profiles used for ledger account determination.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListEmplPostingsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `coreorg:EmplPostingsCollection|error`

Sample code:

```ballerina
coreorg:EmplPostingsCollection postings = check fo->listEmplPostings(
    queries = {filter: "PostingProfile eq 'DEFAULT'"}
);
```

</details>

<details>
<summary>createEmplPostings</summary>

Creates an employee posting profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `EmplPosting` | Yes | The employee posting profile to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `coreorg:EmplPosting|error`

Sample code:

```ballerina
coreorg:EmplPosting posting = check fo->createEmplPostings({
    dataAreaId: "USMF",
    postingProfile: "DEFAULT",
    accountCode: "Table",
    num: "000178",
    name: "Employee expense posting",
    settlementByDimension: "None"
});
```

</details>

<details>
<summary>getEmplPostings</summary>

Reads a specific employee posting profile by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `postingProfile` | `string` | Yes | The posting profile key field. |
| `accountCode` | `string` | Yes | The account code key field. |
| `num` | `string` | Yes | The num key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetEmplPostingsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `coreorg:EmplPosting|error`

Sample code:

```ballerina
coreorg:EmplPosting posting = check fo->getEmplPostings("USMF", "DEFAULT", "Table", "000178");
```

</details>

<details>
<summary>deleteEmplPostings</summary>

Deletes a specific employee posting profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `postingProfile` | `string` | Yes | The posting profile key field. |
| `accountCode` | `string` | Yes | The account code key field. |
| `num` | `string` | Yes | The num key field. |
| `headers` | `DeleteEmplPostingsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteEmplPostings(
    "USMF",
    "DEFAULT",
    "Table",
    "000178",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateEmplPostings</summary>

Updates a specific employee posting profile.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `postingProfile` | `string` | Yes | The posting profile key field. |
| `accountCode` | `string` | Yes | The account code key field. |
| `num` | `string` | Yes | The num key field. |
| `payload` | `EmplPosting` | Yes | The fields to update. |
| `headers` | `UpdateEmplPostingsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `coreorg:EmplPosting|error`

Sample code:

```ballerina
coreorg:EmplPosting updated = check fo->updateEmplPostings(
    "USMF",
    "DEFAULT",
    "Table",
    "000178",
    {name: "Employee expense posting - updated"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Language Codes

<details>
<summary>listLanguageCodes</summary>

Reads all language codes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListLanguageCodesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `coreorg:LanguageCodesCollection|error`

Sample code:

```ballerina
coreorg:LanguageCodesCollection languages = check fo->listLanguageCodes(
    queries = {top: 50}
);
```

</details>

<details>
<summary>createLanguageCodes</summary>

Creates a language code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LanguageCode` | Yes | The language code to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `coreorg:LanguageCode|error`

Sample code:

```ballerina
coreorg:LanguageCode language = check fo->createLanguageCodes({
    languageCodeId: "en-us",
    description: "English (United States)"
});
```

</details>

<details>
<summary>getLanguageCodes</summary>

Reads a specific language code by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `languageCodeId` | `string` | Yes | The language code id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetLanguageCodesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `coreorg:LanguageCode|error`

Sample code:

```ballerina
coreorg:LanguageCode language = check fo->getLanguageCodes("en-us");
```

</details>

<details>
<summary>deleteLanguageCodes</summary>

Deletes a specific language code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `languageCodeId` | `string` | Yes | The language code id key field. |
| `headers` | `DeleteLanguageCodesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLanguageCodes(
    "en-us",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateLanguageCodes</summary>

Updates a specific language code.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `languageCodeId` | `string` | Yes | The language code id key field. |
| `payload` | `LanguageCode` | Yes | The fields to update. |
| `headers` | `UpdateLanguageCodesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `coreorg:LanguageCode|error`

Sample code:

```ballerina
coreorg:LanguageCode updated = check fo->updateLanguageCodes(
    "en-us",
    {description: "English (US)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Legal Entities

<details>
<summary>listLegalEntities</summary>

Reads all legal entities.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListLegalEntitiesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `coreorg:LegalEntitiesCollection|error`

Sample code:

```ballerina
coreorg:LegalEntitiesCollection entities = check fo->listLegalEntities(
    queries = {
        filter: "addressCountryRegionId eq 'USA'",
        'select: "LegalEntityId,Name,CompanyName"
    }
);
```

</details>

<details>
<summary>createLegalEntities</summary>

Creates a legal entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `LegalEntity` | Yes | The legal entity to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `coreorg:LegalEntity|error`

Sample code:

```ballerina
coreorg:LegalEntity entity = check fo->createLegalEntities({
    legalEntityId: "CORP",
    name: "Contoso Corporate",
    companyName: "Contoso Corporation",
    addressCountryRegionId: "USA",
    languageId: "en-us",
    timeZone: "GMTMINUS0500EASTERNTIME"
});
```

</details>

<details>
<summary>getLegalEntities</summary>

Reads a specific legal entity by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalEntityId` | `string` | Yes | The legal entity id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetLegalEntitiesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `coreorg:LegalEntity|error`

Sample code:

```ballerina
coreorg:LegalEntity entity = check fo->getLegalEntities("CORP");
```

</details>

<details>
<summary>deleteLegalEntities</summary>

Deletes a specific legal entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalEntityId` | `string` | Yes | The legal entity id key field. |
| `headers` | `DeleteLegalEntitiesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteLegalEntities(
    "CORP",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateLegalEntities</summary>

Updates a specific legal entity.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `legalEntityId` | `string` | Yes | The legal entity id key field. |
| `payload` | `LegalEntity` | Yes | The fields to update. |
| `headers` | `UpdateLegalEntitiesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `coreorg:LegalEntity|error`

Sample code:

```ballerina
coreorg:LegalEntity updated = check fo->updateLegalEntities(
    "CORP",
    {name: "Contoso Corporate Holdings"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Name Affixes

<details>
<summary>listNameAffixes</summary>

Reads all name affixes used for formatting party names.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListNameAffixesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `coreorg:NameAffixesCollection|error`

Sample code:

```ballerina
coreorg:NameAffixesCollection affixes = check fo->listNameAffixes(
    queries = {filter: "Type eq 'PersonalSuffix'"}
);
```

</details>

<details>
<summary>createNameAffixes</summary>

Creates a name affix.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `NameAffix` | Yes | The name affix to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `coreorg:NameAffix|error`

Sample code:

```ballerina
coreorg:NameAffix affix = check fo->createNameAffixes({
    'type: "PersonalSuffix",
    affix: "Jr.",
    description: "Junior"
});
```

</details>

<details>
<summary>getNameAffixes</summary>

Reads a specific name affix by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'type` | `DirNameAffixType` | Yes | The entity type identifier (`PersonalPrefix` or `PersonalSuffix`). |
| `affix` | `string` | Yes | The affix key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetNameAffixesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `coreorg:NameAffix|error`

Sample code:

```ballerina
coreorg:NameAffix affix = check fo->getNameAffixes("PersonalSuffix", "Jr.");
```

</details>

<details>
<summary>deleteNameAffixes</summary>

Deletes a specific name affix.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'type` | `DirNameAffixType` | Yes | The entity type identifier (`PersonalPrefix` or `PersonalSuffix`). |
| `affix` | `string` | Yes | The affix key field. |
| `headers` | `DeleteNameAffixesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteNameAffixes(
    "PersonalSuffix",
    "Jr.",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateNameAffixes</summary>

Updates a specific name affix.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `'type` | `DirNameAffixType` | Yes | The entity type identifier (`PersonalPrefix` or `PersonalSuffix`). |
| `affix` | `string` | Yes | The affix key field. |
| `payload` | `NameAffix` | Yes | The fields to update. |
| `headers` | `UpdateNameAffixesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `coreorg:NameAffix|error`

Sample code:

```ballerina
coreorg:NameAffix updated = check fo->updateNameAffixes(
    "PersonalSuffix",
    "Jr.",
    {description: "Junior (Jr.)"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Name Sequences

<details>
<summary>listNameSequences</summary>

Reads all name sequences used for formatting party names.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListNameSequencesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `coreorg:NameSequencesCollection|error`

Sample code:

```ballerina
coreorg:NameSequencesCollection sequences = check fo->listNameSequences(
    queries = {filter: "LanguageId eq 'en-us'"}
);
```

</details>

<details>
<summary>createNameSequences</summary>

Creates a name sequence.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `NameSequence` | Yes | The name sequence to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `coreorg:NameSequence|error`

Sample code:

```ballerina
coreorg:NameSequence sequence = check fo->createNameSequences({
    nameSequence: "PersonName",
    languageId: "en-us",
    firstPosition: "FirstName",
    secondPosition: "MiddleName",
    thirdPosition: "LastName",
    separator1: " ",
    separator2: " "
});
```

</details>

<details>
<summary>getNameSequences</summary>

Reads a specific name sequence by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nameSequence` | `string` | Yes | The name sequence key field. |
| `languageId` | `string` | Yes | The language id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetNameSequencesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `coreorg:NameSequence|error`

Sample code:

```ballerina
coreorg:NameSequence sequence = check fo->getNameSequences("PersonName", "en-us");
```

</details>

<details>
<summary>deleteNameSequences</summary>

Deletes a specific name sequence.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nameSequence` | `string` | Yes | The name sequence key field. |
| `languageId` | `string` | Yes | The language id key field. |
| `headers` | `DeleteNameSequencesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteNameSequences(
    "PersonName",
    "en-us",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateNameSequences</summary>

Updates a specific name sequence.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `nameSequence` | `string` | Yes | The name sequence key field. |
| `languageId` | `string` | Yes | The language id key field. |
| `payload` | `NameSequence` | Yes | The fields to update. |
| `headers` | `UpdateNameSequencesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `coreorg:NameSequence|error`

Sample code:

```ballerina
coreorg:NameSequence updated = check fo->updateNameSequences(
    "PersonName",
    "en-us",
    {separator1: ", "},
    headers = {ifMatch: eTag}
);
```

</details>

#### Salutations

<details>
<summary>listSalutations</summary>

Reads all salutations used for formatting party names.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListSalutationsQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `coreorg:SalutationsCollection|error`

Sample code:

```ballerina
coreorg:SalutationsCollection salutations = check fo->listSalutations(
    queries = {top: 20}
);
```

</details>

<details>
<summary>createSalutations</summary>

Creates a salutation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Salutation` | Yes | The salutation to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `coreorg:Salutation|error`

Sample code:

```ballerina
coreorg:Salutation salutation = check fo->createSalutations({
    dataAreaId: "USMF",
    salutationPhrase: "Dr."
});
```

</details>

<details>
<summary>getSalutations</summary>

Reads a specific salutation by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `salutationPhrase` | `string` | Yes | The salutation phrase key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetSalutationsQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `coreorg:Salutation|error`

Sample code:

```ballerina
coreorg:Salutation salutation = check fo->getSalutations("USMF", "Dr.");
```

</details>

<details>
<summary>deleteSalutations</summary>

Deletes a specific salutation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `salutationPhrase` | `string` | Yes | The salutation phrase key field. |
| `headers` | `DeleteSalutationsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteSalutations(
    "USMF",
    "Dr.",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateSalutations</summary>

Updates a specific salutation.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `salutationPhrase` | `string` | Yes | The salutation phrase key field. |
| `payload` | `Salutation` | Yes | The fields to update. |
| `headers` | `UpdateSalutationsHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `coreorg:Salutation|error`

Sample code:

```ballerina
coreorg:Salutation updated = check fo->updateSalutations(
    "USMF",
    "Dr.",
    {dataAreaId: "USMF", salutationPhrase: "Dr."},
    headers = {ifMatch: eTag}
);
```

</details>

#### VAT Num Tables

<details>
<summary>listVATNumTables</summary>

Reads all VAT registration numbers.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListVATNumTablesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `coreorg:VATNumTablesCollection|error`

Sample code:

```ballerina
coreorg:VATNumTablesCollection vatNumbers = check fo->listVATNumTables(
    queries = {filter: "CountryRegionId eq 'USA'"}
);
```

</details>

<details>
<summary>createVATNumTables</summary>

Creates a VAT registration number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `VATNumTable` | Yes | The VAT registration number to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `coreorg:VATNumTable|error`

Sample code:

```ballerina
coreorg:VATNumTable vatNumber = check fo->createVATNumTables({
    dataAreaId: "USMF",
    vATNum: "12-3456789",
    countryRegionId: "USA",
    name: "Federal EIN"
});
```

</details>

<details>
<summary>getVATNumTables</summary>

Reads a specific VAT registration number by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vATNum` | `string` | Yes | The v at num key field. |
| `countryRegionId` | `string` | Yes | The country region id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetVATNumTablesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `coreorg:VATNumTable|error`

Sample code:

```ballerina
coreorg:VATNumTable vatNumber = check fo->getVATNumTables("USMF", "12-3456789", "USA");
```

</details>

<details>
<summary>deleteVATNumTables</summary>

Deletes a specific VAT registration number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vATNum` | `string` | Yes | The v at num key field. |
| `countryRegionId` | `string` | Yes | The country region id key field. |
| `headers` | `DeleteVATNumTablesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteVATNumTables(
    "USMF",
    "12-3456789",
    "USA",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateVATNumTables</summary>

Updates a specific VAT registration number.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `vATNum` | `string` | Yes | The v at num key field. |
| `countryRegionId` | `string` | Yes | The country region id key field. |
| `payload` | `VATNumTable` | Yes | The fields to update. |
| `headers` | `UpdateVATNumTablesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `coreorg:VATNumTable|error`

Sample code:

```ballerina
coreorg:VATNumTable updated = check fo->updateVATNumTables(
    "USMF",
    "12-3456789",
    "USA",
    {name: "Federal Employer ID Number"},
    headers = {ifMatch: eTag}
);
```

</details>

#### Warehouses

<details>
<summary>listWarehouses</summary>

Reads all warehouses used across inventory and warehouse management processes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `ListWarehousesQueries` | No | OData query parameters: `$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `cross-company`, `$count`, `$select`. |

Returns: `coreorg:WarehousesCollection|error`

Sample code:

```ballerina
coreorg:WarehousesCollection warehouses = check fo->listWarehouses(
    queries = {
        filter: "dataAreaId eq 'USMF'",
        'select: "WarehouseId,WarehouseName,WarehouseType"
    }
);
```

</details>

<details>
<summary>createWarehouses</summary>

Creates a warehouse.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `Warehouse` | Yes | The warehouse to create. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |

Returns: `coreorg:Warehouse|error`

Sample code:

```ballerina
coreorg:Warehouse warehouse = check fo->createWarehouses({
    dataAreaId: "USMF",
    warehouseId: "WH-12",
    warehouseName: "Central Distribution Center",
    warehouseType: "Standard",
    isFallbackWarehouse: "No"
});
```

</details>

<details>
<summary>getWarehouses</summary>

Reads a specific warehouse by key.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `warehouseId` | `string` | Yes | The warehouse id key field. |
| `headers` | `map<string\|string[]>` | No | Headers to be sent with the request. |
| `queries` | `GetWarehousesQueries` | No | OData query parameters: `$expand`, `$select`. |

Returns: `coreorg:Warehouse|error`

Sample code:

```ballerina
coreorg:Warehouse warehouse = check fo->getWarehouses("USMF", "WH-12");
```

</details>

<details>
<summary>deleteWarehouses</summary>

Deletes a specific warehouse.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `warehouseId` | `string` | Yes | The warehouse id key field. |
| `headers` | `DeleteWarehousesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `error?`

Sample code:

```ballerina
check fo->deleteWarehouses(
    "USMF",
    "WH-12",
    headers = {ifMatch: eTag}
);
```

</details>

<details>
<summary>updateWarehouses</summary>

Updates a specific warehouse.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dataAreaId` | `string` | Yes | The company data area identifier. |
| `warehouseId` | `string` | Yes | The warehouse id key field. |
| `payload` | `Warehouse` | Yes | The fields to update. |
| `headers` | `UpdateWarehousesHeaders` | No | Optional `ifMatch` ETag header for optimistic concurrency; mapped to `If-Match`. |

Returns: `coreorg:Warehouse|error`

Sample code:

```ballerina
coreorg:Warehouse updated = check fo->updateWarehouses(
    "USMF",
    "WH-12",
    {warehouseName: "Central Distribution Center - East"},
    headers = {ifMatch: eTag}
);
```

</details>
