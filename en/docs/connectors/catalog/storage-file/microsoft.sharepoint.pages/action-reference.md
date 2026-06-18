---
connector: true
connector_name: "microsoft.sharepoint.pages"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/microsoft.sharepoint.pages` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage SharePoint site pages, canvas layouts, horizontal and vertical sections, web parts, and page metadata through the Microsoft Graph v1.0 API |

---

## Client

Provides operations to create, read, update, delete, and publish SharePoint site pages, canvas layouts, horizontal and vertical sections, and web parts through the Microsoft Graph v1.0 API.

### Configuration

**ConnectionConfig**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>OAuth2ClientCredentialsGrantConfig&#124;http:BearerTokenConfig&#124;OAuth2RefreshTokenGrantConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | <code>http:HTTP_2_0</code> | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | <code>&#123;&#125;</code> | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | <code>30</code> | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | <code>"disable"</code> | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | — | Configurations associated with redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | — | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | <code>&#123;&#125;</code> | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | <code>http:COMPRESSION_AUTO</code> | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | — | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | — | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | — | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | <code>&#123;&#125;</code> | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | — | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | — | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | <code>&#123;&#125;</code> | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | <code>true</code> | Enables the inbound payload validation functionality provided by the constraint package |
| `laxDataBinding` | <code>boolean</code> | <code>true</code> | Enables relaxed data binding on the client side |

**OAuth2ClientCredentialsGrantConfig** (extends `http:OAuth2ClientCredentialsGrantConfig`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `tokenUrl` | <code>string</code> | `https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token` | The token endpoint URL for OAuth2 client credentials grant |

### Initializing the client

```ballerina
import ballerinax/microsoft.sharepoint.pages;

pages:ConnectionConfig config = {
    auth: {
        clientId: "<clientId>",
        clientSecret: "<clientSecret>",
        tokenUrl: "https://login.microsoftonline.com/<tenantId>/oauth2/v2.0/token",
        scopes: ["https://graph.microsoft.com/.default"]
    }
};
pages:Client sharepointClient = check new (config);
```

### Operations

#### Page Management

<details>
<summary>listPages</summary>

<div>

Lists all base site pages in the pages list of a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListPagesQueries</code> | No | OData query parameters (`$orderby`, `$select`, `$expand`) |

**Returns:** `BaseSitePageCollectionResponse|error`

**Sample code:**

```ballerina
pages:BaseSitePageCollectionResponse result = check client->listPages("site-id");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites('site-id')/pages",
  "value": [
    {
      "id": "page-id-1",
      "name": "home.aspx",
      "title": "Home",
      "webUrl": "https://contoso.sharepoint.com/SitePages/home.aspx",
      "createdDateTime": "2024-01-15T10:00:00Z",
      "lastModifiedDateTime": "2024-06-01T08:30:00Z"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createPages</summary>

<div>

Creates a page in the site pages list of a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `payload` | <code>BaseSitePage</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `BaseSitePage|error`

**Sample code:**

```ballerina
pages:BaseSitePage payload = {
    name: "new-page.aspx",
    title: "New Page"
};
pages:BaseSitePage result = check client->createPages("site-id", payload);
```

**Sample response:**

```json
{
  "id": "page-id-2",
  "name": "new-page.aspx",
  "title": "New Page",
  "webUrl": "https://contoso.sharepoint.com/SitePages/new-page.aspx",
  "createdDateTime": "2024-06-11T10:00:00Z",
  "lastModifiedDateTime": "2024-06-11T10:00:00Z"
}
```

</div>
</details>

<details>
<summary>getPages</summary>

<div>

Retrieves the metadata of a base site page by its identifier.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetPagesQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `BaseSitePage|error`

**Sample code:**

```ballerina
pages:BaseSitePage result = check client->getPages("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "id": "page-id-1",
  "name": "home.aspx",
  "title": "Home",
  "webUrl": "https://contoso.sharepoint.com/SitePages/home.aspx",
  "createdDateTime": "2024-01-15T10:00:00Z",
  "lastModifiedDateTime": "2024-06-01T08:30:00Z"
}
```

</div>
</details>

<details>
<summary>deletePages</summary>

<div>

Deletes a base site page from the site pages list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>DeletePagesHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deletePages("site-id", "page-id-1");
```

</div>
</details>

<details>
<summary>updatePages</summary>

<div>

Updates the navigation property pages in sites with new property values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `payload` | <code>BaseSitePage</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
pages:BaseSitePage payload = {title: "Updated Home"};
check client->updatePages("site-id", "page-id-1", payload);
```

</div>
</details>

<details>
<summary>getPagesCount</summary>

<div>

Gets the total count of base site pages in the pages list of a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetPagesCountQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->getPagesCount("site-id");
```

**Sample response:**

```json
"5"
```

</div>
</details>

<details>
<summary>listSitePages</summary>

<div>

Lists all SitePage-typed pages in the site pages list of a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListSitePagesQueries</code> | No | OData query parameters (`$orderby`, `$select`, `$expand`) |

**Returns:** `SitePageCollectionResponse|error`

**Sample code:**

```ballerina
pages:SitePageCollectionResponse result = check client->listSitePages("site-id");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites('site-id')/pages/microsoft.graph.sitePage",
  "value": [
    {
      "id": "page-id-1",
      "@odata.type": "#microsoft.graph.sitePage",
      "name": "home.aspx",
      "title": "Home",
      "pageLayout": "article",
      "promotionKind": "page",
      "webUrl": "https://contoso.sharepoint.com/SitePages/home.aspx"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getSitePagesCount</summary>

<div>

Gets the total count of SitePage-typed pages in the pages list of a site.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetSitePagesCountQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->getSitePagesCount("site-id");
```

**Sample response:**

```json
"3"
```

</div>
</details>

#### Site Page Operations

<details>
<summary>getSitePage</summary>

<div>

Retrieves the full SitePage entity, including canvas layout details, for a specific page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetSitePageQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `SitePage|error`

**Sample code:**

```ballerina
pages:SitePage result = check client->getSitePage("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "id": "page-id-1",
  "@odata.type": "#microsoft.graph.sitePage",
  "name": "home.aspx",
  "title": "Home",
  "pageLayout": "article",
  "promotionKind": "page",
  "webUrl": "https://contoso.sharepoint.com/SitePages/home.aspx",
  "createdDateTime": "2024-01-15T10:00:00Z",
  "lastModifiedDateTime": "2024-06-01T08:30:00Z"
}
```

</div>
</details>

<details>
<summary>publishSitePage</summary>

<div>

Publishes a site page, making it publicly visible to site members.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->publishSitePage("site-id", "page-id-1");
```

</div>
</details>

<details>
<summary>getSitePageWebPartsByPosition</summary>

<div>

Retrieves web parts from a site page filtered by their position within the canvas layout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetSitePageWebPartsByPositionQueries</code> | No | OData query parameters for position-based filtering |

**Returns:** `WebPartCollectionResponse|error`

**Sample code:**

```ballerina
pages:WebPartCollectionResponse result = check client->getSitePageWebPartsByPosition("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#Collection(microsoft.graph.webPart)",
  "value": [
    {
      "id": "webpart-id-1",
      "@odata.type": "#microsoft.graph.textWebPart",
      "innerHtml": "<p>Welcome to our intranet!</p>"
    }
  ]
}
```

</div>
</details>

#### Canvas Layout

<details>
<summary>getSitePageCanvasLayout</summary>

<div>

Retrieves the canvas layout of a site page, including its horizontal and vertical sections.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetSitePageCanvasLayoutQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `CanvasLayout|error`

**Sample code:**

```ballerina
pages:CanvasLayout result = check client->getSitePageCanvasLayout("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "horizontalSections": [
    {
      "id": "1",
      "emphasis": "none",
      "layout": "oneColumn"
    }
  ],
  "verticalSection": {
    "emphasis": "soft"
  }
}
```

</div>
</details>

<details>
<summary>deleteSitePageCanvasLayout</summary>

<div>

Deletes the canvas layout navigation property from a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>DeleteSitePageCanvasLayoutHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSitePageCanvasLayout("site-id", "page-id-1");
```

</div>
</details>

<details>
<summary>updateSitePageCanvasLayout</summary>

<div>

Updates the canvas layout navigation property in sites with new section and column configuration.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `payload` | <code>CanvasLayout</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
pages:CanvasLayout payload = {
    horizontalSections: [
        {
            id: "last-reviewed-section",
            emphasis: "strong",
            columns: [
                {id: "col-1", width: 12, webparts: [{id: "wp-1"}]}
            ]
        }
    ]
};
check client->updateSitePageCanvasLayout("site-id", "page-id-1", payload);
```

</div>
</details>

#### Horizontal Section Management

<details>
<summary>listHorizontalSections</summary>

<div>

Lists all horizontal sections in the canvas layout of a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListHorizontalSectionsQueries</code> | No | OData query parameters (`$orderby`, `$select`, `$expand`) |

**Returns:** `HorizontalSectionCollectionResponse|error`

**Sample code:**

```ballerina
pages:HorizontalSectionCollectionResponse result = check client->listHorizontalSections("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#...",
  "value": [
    {
      "id": "1",
      "emphasis": "none",
      "layout": "oneColumn"
    },
    {
      "id": "2",
      "emphasis": "strong",
      "layout": "twoColumns"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createHorizontalSection</summary>

<div>

Creates a new horizontal section in the canvas layout of a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `payload` | <code>HorizontalSection</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `HorizontalSection|error`

**Sample code:**

```ballerina
pages:HorizontalSection payload = {
    id: "new-section",
    emphasis: "strong",
    columns: [{id: "col-1", width: 12}]
};
pages:HorizontalSection result = check client->createHorizontalSection("site-id", "page-id-1", payload);
```

**Sample response:**

```json
{
  "id": "new-section",
  "emphasis": "strong",
  "layout": "oneColumn",
  "columns": [
    {
      "id": "col-1",
      "width": 12
    }
  ]
}
```

</div>
</details>

<details>
<summary>getHorizontalSection</summary>

<div>

Retrieves a specific horizontal section from the canvas layout of a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetHorizontalSectionQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `HorizontalSection|error`

**Sample code:**

```ballerina
pages:HorizontalSection result = check client->getHorizontalSection("site-id", "page-id-1", "section-id-1");
```

**Sample response:**

```json
{
  "id": "1",
  "emphasis": "none",
  "layout": "oneColumn",
  "columns": [
    {
      "id": "col-1",
      "width": 12
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteHorizontalSection</summary>

<div>

Deletes a horizontal section navigation property from the canvas layout of a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `headers` | <code>DeleteHorizontalSectionHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteHorizontalSection("site-id", "page-id-1", "section-id-1");
```

</div>
</details>

<details>
<summary>updateHorizontalSection</summary>

<div>

Updates the navigation property horizontalSections in sites with new property values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `payload` | <code>HorizontalSection</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
pages:HorizontalSection payload = {emphasis: "soft"};
check client->updateHorizontalSection("site-id", "page-id-1", "section-id-1", payload);
```

</div>
</details>

<details>
<summary>getHSectionsCount</summary>

<div>

Gets the total count of horizontal sections in the canvas layout of a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetHSectionsCountQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->getHSectionsCount("site-id", "page-id-1");
```

**Sample response:**

```json
"2"
```

</div>
</details>

#### Horizontal Section Column Management

<details>
<summary>listHSectionColumns</summary>

<div>

Lists all columns in a specific horizontal section of a site page's canvas layout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListHSectionColumnsQueries</code> | No | OData query parameters (`$orderby`, `$select`, `$expand`) |

**Returns:** `HorizontalSectionColumnCollectionResponse|error`

**Sample code:**

```ballerina
pages:HorizontalSectionColumnCollectionResponse result = check client->listHSectionColumns("site-id", "page-id-1", "section-id-1");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#...",
  "value": [
    {
      "id": "col-1",
      "width": 6
    },
    {
      "id": "col-2",
      "width": 6
    }
  ]
}
```

</div>
</details>

<details>
<summary>createHSectionColumn</summary>

<div>

Creates a new column in a specific horizontal section of a site page's canvas layout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `payload` | <code>HorizontalSectionColumn</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `HorizontalSectionColumn|error`

**Sample code:**

```ballerina
pages:HorizontalSectionColumn payload = {id: "new-col", width: 12};
pages:HorizontalSectionColumn result = check client->createHSectionColumn("site-id", "page-id-1", "section-id-1", payload);
```

**Sample response:**

```json
{
  "id": "new-col",
  "width": 12
}
```

</div>
</details>

<details>
<summary>getHSectionColumn</summary>

<div>

Retrieves a specific column from a horizontal section of a site page's canvas layout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `horizontalSectionColumnId` | <code>string</code> | Yes | The unique identifier of the horizontalSectionColumn |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetHSectionColumnQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `HorizontalSectionColumn|error`

**Sample code:**

```ballerina
pages:HorizontalSectionColumn result = check client->getHSectionColumn("site-id", "page-id-1", "section-id-1", "col-id-1");
```

**Sample response:**

```json
{
  "id": "col-id-1",
  "width": 6
}
```

</div>
</details>

<details>
<summary>deleteHSectionColumn</summary>

<div>

Deletes a column navigation property from a horizontal section of a site page's canvas layout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `horizontalSectionColumnId` | <code>string</code> | Yes | The unique identifier of the horizontalSectionColumn |
| `headers` | <code>DeleteHSectionColumnHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteHSectionColumn("site-id", "page-id-1", "section-id-1", "col-id-1");
```

</div>
</details>

<details>
<summary>updateHSectionColumn</summary>

<div>

Updates the navigation property columns in sites with new property values for a specific horizontal section column.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `horizontalSectionColumnId` | <code>string</code> | Yes | The unique identifier of the horizontalSectionColumn |
| `payload` | <code>HorizontalSectionColumn</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
pages:HorizontalSectionColumn payload = {width: 4};
check client->updateHSectionColumn("site-id", "page-id-1", "section-id-1", "col-id-1", payload);
```

</div>
</details>

<details>
<summary>getHSectionColumnsCount</summary>

<div>

Gets the total count of columns in a specific horizontal section of a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetHSectionColumnsCountQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->getHSectionColumnsCount("site-id", "page-id-1", "section-id-1");
```

**Sample response:**

```json
"2"
```

</div>
</details>

#### Horizontal Section Column Web Part Management

<details>
<summary>listHSectionColumnWebparts</summary>

<div>

Lists all web parts in a specific column of a horizontal section in a site page's canvas layout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `horizontalSectionColumnId` | <code>string</code> | Yes | The unique identifier of the horizontalSectionColumn |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListHSectionColumnWebpartsQueries</code> | No | OData query parameters (`$orderby`, `$select`, `$expand`) |

**Returns:** `WebPartCollectionResponse|error`

**Sample code:**

```ballerina
pages:WebPartCollectionResponse result = check client->listHSectionColumnWebparts("site-id", "page-id-1", "section-id-1", "col-id-1");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#...",
  "value": [
    {
      "id": "webpart-id-1",
      "@odata.type": "#microsoft.graph.textWebPart",
      "innerHtml": "<p>Hello World</p>"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createHSectionColumnWebpart</summary>

<div>

Creates a new web part in a specific column of a horizontal section in a site page's canvas layout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `horizontalSectionColumnId` | <code>string</code> | Yes | The unique identifier of the horizontalSectionColumn |
| `payload` | <code>WebPart</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `WebPart|error`

**Sample code:**

```ballerina
pages:WebPart payload = {id: "new-webpart"};
pages:WebPart result = check client->createHSectionColumnWebpart("site-id", "page-id-1", "section-id-1", "col-id-1", payload);
```

**Sample response:**

```json
{
  "id": "new-webpart",
  "@odata.type": "#microsoft.graph.textWebPart"
}
```

</div>
</details>

<details>
<summary>getHSectionColumnWebpart</summary>

<div>

Retrieves a specific web part from a column in a horizontal section of a site page's canvas layout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `horizontalSectionColumnId` | <code>string</code> | Yes | The unique identifier of the horizontalSectionColumn |
| `webPartId` | <code>string</code> | Yes | The unique identifier of the webPart |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetHSectionColumnWebpartQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `WebPart|error`

**Sample code:**

```ballerina
pages:WebPart result = check client->getHSectionColumnWebpart("site-id", "page-id-1", "section-id-1", "col-id-1", "webpart-id-1");
```

**Sample response:**

```json
{
  "id": "webpart-id-1",
  "@odata.type": "#microsoft.graph.textWebPart",
  "innerHtml": "<p>Hello World</p>"
}
```

</div>
</details>

<details>
<summary>deleteHSectionColumnWebpart</summary>

<div>

Deletes a web part navigation property from a column in a horizontal section of a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `horizontalSectionColumnId` | <code>string</code> | Yes | The unique identifier of the horizontalSectionColumn |
| `webPartId` | <code>string</code> | Yes | The unique identifier of the webPart |
| `headers` | <code>DeleteHSectionColumnWebpartHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteHSectionColumnWebpart("site-id", "page-id-1", "section-id-1", "col-id-1", "webpart-id-1");
```

</div>
</details>

<details>
<summary>updateHSectionColumnWebpart</summary>

<div>

Updates the navigation property webparts in sites with new property values for a specific horizontal section column web part.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `horizontalSectionColumnId` | <code>string</code> | Yes | The unique identifier of the horizontalSectionColumn |
| `webPartId` | <code>string</code> | Yes | The unique identifier of the webPart |
| `payload` | <code>WebPart</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
pages:WebPart payload = {id: "webpart-id-1"};
check client->updateHSectionColumnWebpart("site-id", "page-id-1", "section-id-1", "col-id-1", "webpart-id-1", payload);
```

</div>
</details>

<details>
<summary>getHSectionColumnWebpartPosition</summary>

<div>

Invokes the getPositionOfWebPart action to retrieve the position details of a web part within a horizontal section column.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `horizontalSectionColumnId` | <code>string</code> | Yes | The unique identifier of the horizontalSectionColumn |
| `webPartId` | <code>string</code> | Yes | The unique identifier of the webPart |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `WebPartPositionResponse|error`

**Sample code:**

```ballerina
pages:WebPartPositionResponse result = check client->getHSectionColumnWebpartPosition("site-id", "page-id-1", "section-id-1", "col-id-1", "webpart-id-1");
```

**Sample response:**

```json
{
  "columnId": "col-id-1",
  "horizontalSectionId": "section-id-1",
  "isInVerticalSection": false,
  "webPartIndex": 0
}
```

</div>
</details>

<details>
<summary>getHSectionColumnWebpartsCount</summary>

<div>

Gets the total count of web parts in a specific horizontal section column of a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `horizontalSectionId` | <code>string</code> | Yes | The unique identifier of the horizontalSection |
| `horizontalSectionColumnId` | <code>string</code> | Yes | The unique identifier of the horizontalSectionColumn |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetHSectionColumnWebpartsCountQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->getHSectionColumnWebpartsCount("site-id", "page-id-1", "section-id-1", "col-id-1");
```

**Sample response:**

```json
"3"
```

</div>
</details>

#### Vertical Section Management

<details>
<summary>getVerticalSection</summary>

<div>

Retrieves the vertical section from the canvas layout of a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetVerticalSectionQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `VerticalSection|error`

**Sample code:**

```ballerina
pages:VerticalSection result = check client->getVerticalSection("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "emphasis": "soft",
  "webparts": [
    {
      "id": "webpart-id-1",
      "@odata.type": "#microsoft.graph.textWebPart"
    }
  ]
}
```

</div>
</details>

<details>
<summary>deleteVerticalSection</summary>

<div>

Deletes the vertical section navigation property from the canvas layout of a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>DeleteVerticalSectionHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteVerticalSection("site-id", "page-id-1");
```

</div>
</details>

<details>
<summary>updateVerticalSection</summary>

<div>

Updates the navigation property verticalSection in sites with new property values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `payload` | <code>VerticalSection</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
pages:VerticalSection payload = {emphasis: "strong"};
check client->updateVerticalSection("site-id", "page-id-1", payload);
```

</div>
</details>

#### Vertical Section Web Part Management

<details>
<summary>listVSectionWebparts</summary>

<div>

Lists all web parts in the vertical section of a site page's canvas layout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListVSectionWebpartsQueries</code> | No | OData query parameters (`$orderby`, `$select`, `$expand`) |

**Returns:** `WebPartCollectionResponse|error`

**Sample code:**

```ballerina
pages:WebPartCollectionResponse result = check client->listVSectionWebparts("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#...",
  "value": [
    {
      "id": "webpart-id-1",
      "@odata.type": "#microsoft.graph.textWebPart",
      "innerHtml": "<p>Vertical section content</p>"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createVSectionWebpart</summary>

<div>

Creates a new web part in the vertical section of a site page's canvas layout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `payload` | <code>WebPart</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `WebPart|error`

**Sample code:**

```ballerina
pages:WebPart newWebPart = {id: "new-announcement-webpart"};
pages:WebPart result = check client->createVSectionWebpart("site-id", "page-id-1", newWebPart);
```

**Sample response:**

```json
{
  "id": "new-announcement-webpart",
  "@odata.type": "#microsoft.graph.textWebPart"
}
```

</div>
</details>

<details>
<summary>getVSectionWebpart</summary>

<div>

Retrieves a specific web part from the vertical section of a site page's canvas layout.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `webPartId` | <code>string</code> | Yes | The unique identifier of the webPart |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetVSectionWebpartQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `WebPart|error`

**Sample code:**

```ballerina
pages:WebPart result = check client->getVSectionWebpart("site-id", "page-id-1", "webpart-id-1");
```

**Sample response:**

```json
{
  "id": "webpart-id-1",
  "@odata.type": "#microsoft.graph.textWebPart",
  "innerHtml": "<p>Vertical section content</p>"
}
```

</div>
</details>

<details>
<summary>deleteVSectionWebpart</summary>

<div>

Deletes a web part navigation property from the vertical section of a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `webPartId` | <code>string</code> | Yes | The unique identifier of the webPart |
| `headers` | <code>DeleteVSectionWebpartHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteVSectionWebpart("site-id", "page-id-1", "webpart-id-1");
```

</div>
</details>

<details>
<summary>updateVSectionWebpart</summary>

<div>

Updates the navigation property webparts in the vertical section of a site page with new property values.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `webPartId` | <code>string</code> | Yes | The unique identifier of the webPart |
| `payload` | <code>WebPart</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
pages:WebPart updatedWebPart = {id: "webpart-id-1"};
check client->updateVSectionWebpart("site-id", "page-id-1", "webpart-id-1", updatedWebPart);
```

</div>
</details>

<details>
<summary>getVSectionWebpartPosition</summary>

<div>

Invokes the getPositionOfWebPart action to retrieve the position details of a web part within the vertical section.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `webPartId` | <code>string</code> | Yes | The unique identifier of the webPart |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `WebPartPositionResponse|error`

**Sample code:**

```ballerina
pages:WebPartPositionResponse result = check client->getVSectionWebpartPosition("site-id", "page-id-1", "webpart-id-1");
```

**Sample response:**

```json
{
  "columnId": null,
  "horizontalSectionId": null,
  "isInVerticalSection": true,
  "webPartIndex": 0
}
```

</div>
</details>

<details>
<summary>getVSectionWebpartsCount</summary>

<div>

Gets the total count of web parts in the vertical section of a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetVSectionWebpartsCountQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->getVSectionWebpartsCount("site-id", "page-id-1");
```

**Sample response:**

```json
"2"
```

</div>
</details>

#### Site Page Web Part Management

<details>
<summary>listSitePageWebParts</summary>

<div>

Lists all web parts associated with a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListSitePageWebPartsQueries</code> | No | OData query parameters (`$orderby`, `$select`, `$expand`) |

**Returns:** `WebPartCollectionResponse|error`

**Sample code:**

```ballerina
pages:WebPartCollectionResponse result = check client->listSitePageWebParts("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#...",
  "value": [
    {
      "id": "webpart-id-1",
      "@odata.type": "#microsoft.graph.textWebPart",
      "innerHtml": "<p>Welcome to our intranet!</p>"
    },
    {
      "id": "webpart-id-2",
      "@odata.type": "#microsoft.graph.standardWebPart",
      "webPartType": "d1d91016-032f-456d-98a4-721247c305e8"
    }
  ]
}
```

</div>
</details>

<details>
<summary>createSitePageWebPart</summary>

<div>

Creates a new web part and associates it with a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `payload` | <code>WebPart</code> | Yes | New navigation property |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `WebPart|error`

**Sample code:**

```ballerina
pages:WebPart payload = {id: "new-webpart"};
pages:WebPart result = check client->createSitePageWebPart("site-id", "page-id-1", payload);
```

**Sample response:**

```json
{
  "id": "new-webpart",
  "@odata.type": "#microsoft.graph.textWebPart"
}
```

</div>
</details>

<details>
<summary>getSitePageWebPart</summary>

<div>

Retrieves a specific web part from a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `webPartId` | <code>string</code> | Yes | The unique identifier of the webPart |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetSitePageWebPartQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `WebPart|error`

**Sample code:**

```ballerina
pages:WebPart result = check client->getSitePageWebPart("site-id", "page-id-1", "webpart-id-1");
```

**Sample response:**

```json
{
  "id": "webpart-id-1",
  "@odata.type": "#microsoft.graph.textWebPart",
  "innerHtml": "<p>Welcome to our intranet!</p>"
}
```

</div>
</details>

<details>
<summary>deleteSitePageWebPart</summary>

<div>

Deletes a web part from a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `webPartId` | <code>string</code> | Yes | The unique identifier of the webPart |
| `headers` | <code>DeleteSitePageWebPartHeaders</code> | No | Headers to be sent with the request (supports `If-Match` ETag) |

**Returns:** `error?`

**Sample code:**

```ballerina
check client->deleteSitePageWebPart("site-id", "page-id-1", "webpart-id-1");
```

</div>
</details>

<details>
<summary>updateSitePageWebPart</summary>

<div>

Updates the navigation property webParts in sites with new property values for a specific site page web part.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `webPartId` | <code>string</code> | Yes | The unique identifier of the webPart |
| `payload` | <code>WebPart</code> | Yes | New navigation property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
pages:WebPart payload = {id: "webpart-id-1"};
check client->updateSitePageWebPart("site-id", "page-id-1", "webpart-id-1", payload);
```

</div>
</details>

<details>
<summary>getSitePageWebPartPosition</summary>

<div>

Invokes the getPositionOfWebPart action to retrieve the position of a web part within the canvas layout of a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `webPartId` | <code>string</code> | Yes | The unique identifier of the webPart |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `WebPartPositionResponse|error`

**Sample code:**

```ballerina
pages:WebPartPositionResponse result = check client->getSitePageWebPartPosition("site-id", "page-id-1", "webpart-id-1");
```

**Sample response:**

```json
{
  "columnId": "col-id-1",
  "horizontalSectionId": "section-id-1",
  "isInVerticalSection": false,
  "webPartIndex": 1
}
```

</div>
</details>

<details>
<summary>getSitePageWebPartsCount</summary>

<div>

Gets the total count of web parts associated with a site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetSitePageWebPartsCountQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->getSitePageWebPartsCount("site-id", "page-id-1");
```

**Sample response:**

```json
"4"
```

</div>
</details>

#### User Metadata (Base Site Page)

<details>
<summary>getPageCreator</summary>

<div>

Retrieves the user who created a base site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetPageCreatorQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `User|error`

**Sample code:**

```ballerina
pages:User result = check client->getPageCreator("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "id": "user-id-1",
  "displayName": "John Doe",
  "userPrincipalName": "john.doe@contoso.com",
  "mail": "john.doe@contoso.com"
}
```

</div>
</details>

<details>
<summary>getPageCreatorMailbox</summary>

<div>

Retrieves the mailbox settings of the user who created a base site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetPageCreatorMailboxQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `MailboxSettings|error`

**Sample code:**

```ballerina
pages:MailboxSettings result = check client->getPageCreatorMailbox("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "timeZone": "Pacific Standard Time",
  "language": {
    "locale": "en-US",
    "displayName": "English (United States)"
  },
  "automaticRepliesSetting": {
    "status": "disabled"
  }
}
```

</div>
</details>

<details>
<summary>updatePageCreatorMailbox</summary>

<div>

Updates the mailbox settings property value of the user who created a base site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `payload` | <code>MailboxSettings</code> | Yes | New property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
pages:MailboxSettings payload = {timeZone: "Eastern Standard Time"};
check client->updatePageCreatorMailbox("site-id", "page-id-1", payload);
```

</div>
</details>

<details>
<summary>listPageCreatorServiceErrors</summary>

<div>

Retrieves the service provisioning errors for the user who created a base site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListPageCreatorServiceErrorsQueries</code> | No | OData query parameters (`$orderby`, `$select`, `$expand`) |

**Returns:** `ServiceProvisioningErrorCollectionResponse|error`

**Sample code:**

```ballerina
pages:ServiceProvisioningErrorCollectionResponse result = check client->listPageCreatorServiceErrors("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#...",
  "value": [
    {
      "createdDateTime": "2024-01-01T00:00:00Z",
      "isResolved": false,
      "serviceInstance": "exchange"
    }
  ]
}
```

</div>
</details>

<details>
<summary>getPageCreatorServiceErrorsCount</summary>

<div>

Gets the total count of service provisioning errors for the user who created a base site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetPageCreatorServiceErrorsCountQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->getPageCreatorServiceErrorsCount("site-id", "page-id-1");
```

**Sample response:**

```json
"0"
```

</div>
</details>

<details>
<summary>getPageModifier</summary>

<div>

Retrieves the user who last modified a base site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetPageModifierQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `User|error`

**Sample code:**

```ballerina
pages:User result = check client->getPageModifier("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "id": "user-id-2",
  "displayName": "Jane Smith",
  "userPrincipalName": "jane.smith@contoso.com",
  "mail": "jane.smith@contoso.com"
}
```

</div>
</details>

<details>
<summary>getPageModifierMailbox</summary>

<div>

Retrieves the mailbox settings of the user who last modified a base site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetPageModifierMailboxQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `MailboxSettings|error`

**Sample code:**

```ballerina
pages:MailboxSettings result = check client->getPageModifierMailbox("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "timeZone": "Eastern Standard Time",
  "language": {
    "locale": "en-US",
    "displayName": "English (United States)"
  },
  "automaticRepliesSetting": {
    "status": "disabled"
  }
}
```

</div>
</details>

<details>
<summary>updatePageModifierMailbox</summary>

<div>

Updates the mailbox settings property value of the user who last modified a base site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `payload` | <code>MailboxSettings</code> | Yes | New property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
pages:MailboxSettings payload = {timeZone: "Pacific Standard Time"};
check client->updatePageModifierMailbox("site-id", "page-id-1", payload);
```

</div>
</details>

<details>
<summary>listPageModifierServiceErrors</summary>

<div>

Retrieves the service provisioning errors for the user who last modified a base site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListPageModifierServiceErrorsQueries</code> | No | OData query parameters (`$orderby`, `$select`, `$expand`) |

**Returns:** `ServiceProvisioningErrorCollectionResponse|error`

**Sample code:**

```ballerina
pages:ServiceProvisioningErrorCollectionResponse result = check client->listPageModifierServiceErrors("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#...",
  "value": []
}
```

</div>
</details>

<details>
<summary>getPageModifierServiceErrorsCount</summary>

<div>

Gets the total count of service provisioning errors for the user who last modified a base site page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetPageModifierServiceErrorsCountQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->getPageModifierServiceErrorsCount("site-id", "page-id-1");
```

**Sample response:**

```json
"0"
```

</div>
</details>

#### User Metadata (Site Page)

<details>
<summary>getSitePageCreator</summary>

<div>

Retrieves the user who created a SitePage-typed page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetSitePageCreatorQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `User|error`

**Sample code:**

```ballerina
pages:User result = check client->getSitePageCreator("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "id": "user-id-1",
  "displayName": "John Doe",
  "userPrincipalName": "john.doe@contoso.com",
  "mail": "john.doe@contoso.com"
}
```

</div>
</details>

<details>
<summary>getSitePageCreatorMailbox</summary>

<div>

Retrieves the mailbox settings of the user who created a SitePage-typed page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetSitePageCreatorMailboxQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `MailboxSettings|error`

**Sample code:**

```ballerina
pages:MailboxSettings result = check client->getSitePageCreatorMailbox("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "timeZone": "Pacific Standard Time",
  "language": {
    "locale": "en-US",
    "displayName": "English (United States)"
  },
  "automaticRepliesSetting": {
    "status": "disabled"
  }
}
```

</div>
</details>

<details>
<summary>updateSitePageCreatorMailbox</summary>

<div>

Updates the mailbox settings property value of the user who created a SitePage-typed page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `payload` | <code>MailboxSettings</code> | Yes | New property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
pages:MailboxSettings payload = {timeZone: "Central Standard Time"};
check client->updateSitePageCreatorMailbox("site-id", "page-id-1", payload);
```

</div>
</details>

<details>
<summary>listSitePageCreatorServiceErrors</summary>

<div>

Retrieves the service provisioning errors for the user who created a SitePage-typed page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListSitePageCreatorServiceErrorsQueries</code> | No | OData query parameters (`$orderby`, `$select`, `$expand`) |

**Returns:** `ServiceProvisioningErrorCollectionResponse|error`

**Sample code:**

```ballerina
pages:ServiceProvisioningErrorCollectionResponse result = check client->listSitePageCreatorServiceErrors("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#...",
  "value": []
}
```

</div>
</details>

<details>
<summary>getSitePageCreatorServiceErrorsCount</summary>

<div>

Gets the total count of service provisioning errors for the user who created a SitePage-typed page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetSitePageCreatorServiceErrorsCountQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->getSitePageCreatorServiceErrorsCount("site-id", "page-id-1");
```

**Sample response:**

```json
"0"
```

</div>
</details>

<details>
<summary>getSitePageModifier</summary>

<div>

Retrieves the user who last modified a SitePage-typed page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetSitePageModifierQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `User|error`

**Sample code:**

```ballerina
pages:User result = check client->getSitePageModifier("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "id": "user-id-2",
  "displayName": "Jane Smith",
  "userPrincipalName": "jane.smith@contoso.com",
  "mail": "jane.smith@contoso.com"
}
```

</div>
</details>

<details>
<summary>getSitePageModifierMailbox</summary>

<div>

Retrieves the mailbox settings of the user who last modified a SitePage-typed page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetSitePageModifierMailboxQueries</code> | No | OData query parameters (`$select`, `$expand`) |

**Returns:** `MailboxSettings|error`

**Sample code:**

```ballerina
pages:MailboxSettings result = check client->getSitePageModifierMailbox("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "timeZone": "Eastern Standard Time",
  "language": {
    "locale": "en-US",
    "displayName": "English (United States)"
  },
  "automaticRepliesSetting": {
    "status": "disabled"
  }
}
```

</div>
</details>

<details>
<summary>updateSitePageModifierMailbox</summary>

<div>

Updates the mailbox settings property value of the user who last modified a SitePage-typed page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `payload` | <code>MailboxSettings</code> | Yes | New property values |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
pages:MailboxSettings payload = {timeZone: "UTC"};
check client->updateSitePageModifierMailbox("site-id", "page-id-1", payload);
```

</div>
</details>

<details>
<summary>listSitePageModifierServiceErrors</summary>

<div>

Retrieves the service provisioning errors for the user who last modified a SitePage-typed page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*ListSitePageModifierServiceErrorsQueries</code> | No | OData query parameters (`$orderby`, `$select`, `$expand`) |

**Returns:** `ServiceProvisioningErrorCollectionResponse|error`

**Sample code:**

```ballerina
pages:ServiceProvisioningErrorCollectionResponse result = check client->listSitePageModifierServiceErrors("site-id", "page-id-1");
```

**Sample response:**

```json
{
  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#...",
  "value": []
}
```

</div>
</details>

<details>
<summary>getSitePageModifierServiceErrorsCount</summary>

<div>

Gets the total count of service provisioning errors for the user who last modified a SitePage-typed page.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `siteId` | <code>string</code> | Yes | The unique identifier of the site |
| `baseSitePageId` | <code>string</code> | Yes | The unique identifier of the baseSitePage |
| `headers` | <code>map\<string&#124;string[]\></code> | No | Headers to be sent with the request |
| `queries` | <code>\*GetSitePageModifierServiceErrorsCountQueries</code> | No | OData query parameters (`$filter`, `$search`) |

**Returns:** `string|error`

**Sample code:**

```ballerina
string result = check client->getSitePageModifierServiceErrorsCount("site-id", "page-id-1");
```

**Sample response:**

```json
"0"
```

</div>
</details>
