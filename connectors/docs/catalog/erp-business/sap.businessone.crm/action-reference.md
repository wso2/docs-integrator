# Actions

The `ballerinax/sap.businessone.crm` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manage SAP Business One CRM entities — activities, campaigns, target groups, and sales opportunities — through the Service Layer OData API. |

---

## Client

The `Client` provides operations to create, read, update, and delete SAP Business One CRM entities — activities, campaigns, target groups, sales opportunities, and their related setup/lookup entities — through the Service Layer OData API, plus a set of bound functions and function imports for specialized queries.

### Configuration

**Session configuration** (`businessone:SessionConfig`, passed as the first constructor argument)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `companyDb` | <code>string</code> | Required | The SAP Business One company database name |
| `username` | <code>string</code> | Required | The Service Layer user name |
| `password` | <code>string</code> | Required | The Service Layer password |

**ConnectionConfig** (passed as the second constructor argument)

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

The `serviceUrl` (default `"https://localhost:50000/b1s/v1"`) is passed as the third constructor argument.

### Initializing the client

```ballerina
import ballerinax/sap.businessone.crm;

configurable string serviceUrl = ?;
configurable string companyDb = ?;
configurable string username = ?;
configurable string password = ?;

crm:Client b1Client = check new (
    {companyDb, username, password},
    {},
    serviceUrl
);
```

### Operations

#### Activities

<details>
<summary>listActivities</summary>

Query the Activities collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListActivitiesHeaders</code> | No | Headers to be sent with the request (`Prefer` for Service Layer paging control) |
| `queries` | <code>ListActivitiesQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `ActivitiesCollectionResponse|error`

**Sample code:**

```ballerina
crm:ActivitiesCollectionResponse result = check b1Client->listActivities(queries = {
    dollarFilter: "Activity eq 'cn_Note'",
    dollarTop: 20
});
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Activities",
  "value": [
    {
      "ActivityCode": 1023,
      "Activity": "cn_Note",
      "ActivityDate": "2026-07-10",
      "Details": "Logged from the Ballerina sap.businessone.crm connector",
      "Notes": "Connectivity test note",
      "Closed": "tNO"
    }
  ]
}
```

</details>

<details>
<summary>createActivities</summary>

Create a new Activity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>Activity</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `Activity|error`

**Sample code:**

```ballerina
crm:Activity created = check b1Client->createActivities({
    Activity: "cn_Note",
    ActivityDate: "2026-07-10",
    Details: "Logged from the Ballerina sap.businessone.crm connector",
    Notes: "Connectivity test note — safe to delete."
});
```

**Sample response:**

```json
{
  "ActivityCode": 1023,
  "Activity": "cn_Note",
  "ActivityDate": "2026-07-10",
  "Details": "Logged from the Ballerina sap.businessone.crm connector",
  "Notes": "Connectivity test note — safe to delete.",
  "Closed": "tNO"
}
```

</details>

<details>
<summary>getActivities</summary>

Get a single Activity by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `activityCode` | <code>int:Signed32</code> | Yes | Key property 'ActivityCode' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetActivitiesQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `Activity|error`

**Sample code:**

```ballerina
crm:Activity fetched = check b1Client->getActivities(1023, queries = {
    dollarSelect: "ActivityCode,Activity,ActivityDate,Details,Notes"
});
```

**Sample response:**

```json
{
  "ActivityCode": 1023,
  "Activity": "cn_Note",
  "ActivityDate": "2026-07-10",
  "Details": "Logged from the Ballerina sap.businessone.crm connector",
  "Notes": "Connectivity test note — safe to delete."
}
```

</details>

<details>
<summary>deleteActivities</summary>

Delete a Activity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `activityCode` | <code>int:Signed32</code> | Yes | Key property 'ActivityCode' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteActivities(1023);
```

</details>

<details>
<summary>updateActivities</summary>

Partially update a Activity (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `activityCode` | <code>int:Signed32</code> | Yes | Key property 'ActivityCode' (Edm.Int32) |
| `payload` | <code>Activity</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateActivities(1023, {Notes: "Updated notes"});
```

</details>

<details>
<summary>activitiesServiceDeleteSingleInstanceFromSeries</summary>

Delete single instance from series.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ActivitiesService_DeleteSingleInstanceFromSeries_body</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->activitiesServiceDeleteSingleInstanceFromSeries({
    ActivityInstanceParams: {activityCode: 1023, instanceDate: "2026-07-15"}
});
```

</details>

<details>
<summary>activitiesServiceGetActivityList</summary>

Get activity list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200|error`

**Sample code:**

```ballerina
crm:inline_response_200 result = check b1Client->activitiesServiceGetActivityList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ActivityParams",
  "value": [
    {"activityCode": 1023, "activity": "cn_Note", "cardCode": "C20000"}
  ]
}
```

</details>

<details>
<summary>activitiesServiceGetListByAttendUser</summary>

Get list by attend user.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ActivitiesService_GetListByAttendUser_body</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_1|error`

**Sample code:**

```ballerina
crm:inline_response_200_1 result = check b1Client->activitiesServiceGetListByAttendUser({
    Activity: {ActivityCode: 1023}
});
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ActivityParams",
  "value": [
    {"activityCode": 1023, "handledBy": 12}
  ]
}
```

</details>

<details>
<summary>activitiesServiceGetSingleInstanceFromSeries</summary>

Get single instance from series.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ActivitiesService_GetSingleInstanceFromSeries_body</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `Activity|error`

**Sample code:**

```ballerina
crm:Activity instance = check b1Client->activitiesServiceGetSingleInstanceFromSeries({
    ActivityInstanceParams: {activityCode: 1023, instanceDate: "2026-07-15"}
});
```

**Sample response:**

```json
{
  "ActivityCode": 1023,
  "Activity": "cn_Meeting",
  "ActivityDate": "2026-07-15"
}
```

</details>

<details>
<summary>activitiesServiceGetTopNActivityInstances</summary>

Get top N activity instances.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ActivitiesService_GetTopNActivityInstances_body</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_2|error`

**Sample code:**

```ballerina
crm:inline_response_200_2 result = check b1Client->activitiesServiceGetTopNActivityInstances({
    ActivityInstancesListParams: {startDate: "2026-07-01", instanceCount: 5}
});
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ActivityInstanceParams",
  "value": [
    {"activityCode": 1023, "instanceDate": "2026-07-15"}
  ]
}
```

</details>

<details>
<summary>activitiesServiceInitData</summary>

Init data.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `Activity|error`

**Sample code:**

```ballerina
crm:Activity template = check b1Client->activitiesServiceInitData();
```

**Sample response:**

```json
{
  "ActivityCode": 0,
  "Activity": "cn_Note",
  "Closed": "tNO"
}
```

</details>

<details>
<summary>activitiesServiceUpdateSingleInstanceInSeries</summary>

Update single instance in series.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ActivitiesService_UpdateSingleInstanceInSeries_body</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `ActivityParams|error`

**Sample code:**

```ballerina
crm:ActivityParams result = check b1Client->activitiesServiceUpdateSingleInstanceInSeries({});
```

**Sample response:**

```json
{
  "activityCode": 1023,
  "startDate": "2026-07-15",
  "notes": "Rescheduled instance"
}
```

</details>

#### Activity Locations

<details>
<summary>listActivityLocations</summary>

Query the ActivityLocations collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListActivityLocationsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListActivityLocationsQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `ActivityLocationsCollectionResponse|error`

**Sample code:**

```ballerina
crm:ActivityLocationsCollectionResponse result = check b1Client->listActivityLocations();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ActivityLocations",
  "value": [
    {"Code": 3, "Name": "Head Office - Conference Room"}
  ]
}
```

</details>

<details>
<summary>createActivityLocations</summary>

Create a new ActivityLocation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ActivityLocation</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `ActivityLocation|error`

**Sample code:**

```ballerina
crm:ActivityLocation created = check b1Client->createActivityLocations({Name: "Head Office - Conference Room"});
```

**Sample response:**

```json
{"Code": 3, "Name": "Head Office - Conference Room"}
```

</details>

<details>
<summary>getActivityLocations</summary>

Get a single ActivityLocation by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetActivityLocationsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `ActivityLocation|error`

**Sample code:**

```ballerina
crm:ActivityLocation location = check b1Client->getActivityLocations(3);
```

**Sample response:**

```json
{"Code": 3, "Name": "Head Office - Conference Room"}
```

</details>

<details>
<summary>deleteActivityLocations</summary>

Delete a ActivityLocation.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteActivityLocations(3);
```

</details>

<details>
<summary>updateActivityLocations</summary>

Partially update a ActivityLocation (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>ActivityLocation</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateActivityLocations(3, {Name: "Main Office - Room A"});
```

</details>

#### Activity Recipient Lists

<details>
<summary>listActivityRecipientLists</summary>

Query the ActivityRecipientLists collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListActivityRecipientListsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListActivityRecipientListsQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `ActivityRecipientListsCollectionResponse|error`

**Sample code:**

```ballerina
crm:ActivityRecipientListsCollectionResponse result = check b1Client->listActivityRecipientLists();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ActivityRecipientLists",
  "value": [
    {"Code": 5, "Name": "Sales Team", "Active": "tYES", "IsMultiple": "tYES"}
  ]
}
```

</details>

<details>
<summary>createActivityRecipientLists</summary>

Create a new ActivityRecipientList.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ActivityRecipientList</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `ActivityRecipientList|error`

**Sample code:**

```ballerina
crm:ActivityRecipientList created = check b1Client->createActivityRecipientLists({Name: "Sales Team", Active: "tYES"});
```

**Sample response:**

```json
{"Code": 5, "Name": "Sales Team", "Active": "tYES", "IsMultiple": "tYES"}
```

</details>

<details>
<summary>getActivityRecipientLists</summary>

Get a single ActivityRecipientList by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetActivityRecipientListsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `ActivityRecipientList|error`

**Sample code:**

```ballerina
crm:ActivityRecipientList list = check b1Client->getActivityRecipientLists(5);
```

**Sample response:**

```json
{"Code": 5, "Name": "Sales Team", "Active": "tYES", "IsMultiple": "tYES"}
```

</details>

<details>
<summary>deleteActivityRecipientLists</summary>

Delete a ActivityRecipientList.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteActivityRecipientLists(5);
```

</details>

<details>
<summary>updateActivityRecipientLists</summary>

Partially update a ActivityRecipientList (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>ActivityRecipientList</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateActivityRecipientLists(5, {Active: "tNO"});
```

</details>

<details>
<summary>activityRecipientListsServiceGetList</summary>

Get list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_3|error`

**Sample code:**

```ballerina
crm:inline_response_200_3 result = check b1Client->activityRecipientListsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ActivityRecipientListParams",
  "value": [
    {"code": 5, "name": "Sales Team", "active": "tYES"}
  ]
}
```

</details>

#### Activity Statuses

<details>
<summary>listActivityStatuses</summary>

Query the ActivityStatuses collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListActivityStatusesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListActivityStatusesQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `ActivityStatusesCollectionResponse|error`

**Sample code:**

```ballerina
crm:ActivityStatusesCollectionResponse result = check b1Client->listActivityStatuses();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ActivityStatuses",
  "value": [
    {"StatusId": 2, "StatusName": "Open", "StatusDescription": "Open activity"}
  ]
}
```

</details>

<details>
<summary>createActivityStatuses</summary>

Create a new ActivityStatus.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ActivityStatus</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `ActivityStatus|error`

**Sample code:**

```ballerina
crm:ActivityStatus created = check b1Client->createActivityStatuses({StatusName: "Open", StatusDescription: "Open activity"});
```

**Sample response:**

```json
{"StatusId": 2, "StatusName": "Open", "StatusDescription": "Open activity"}
```

</details>

<details>
<summary>getActivityStatuses</summary>

Get a single ActivityStatus by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `statusId` | <code>int:Signed32</code> | Yes | Key property 'StatusId' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetActivityStatusesQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `ActivityStatus|error`

**Sample code:**

```ballerina
crm:ActivityStatus status = check b1Client->getActivityStatuses(2);
```

**Sample response:**

```json
{"StatusId": 2, "StatusName": "Open", "StatusDescription": "Open activity"}
```

</details>

<details>
<summary>deleteActivityStatuses</summary>

Delete a ActivityStatus.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `statusId` | <code>int:Signed32</code> | Yes | Key property 'StatusId' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteActivityStatuses(2);
```

</details>

<details>
<summary>updateActivityStatuses</summary>

Partially update a ActivityStatus (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `statusId` | <code>int:Signed32</code> | Yes | Key property 'StatusId' (Edm.Int32) |
| `payload` | <code>ActivityStatus</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateActivityStatuses(2, {StatusName: "In Progress"});
```

</details>

#### Activity Subjects & Types

<details>
<summary>activitySubjectServiceGetActivitySubjectList</summary>

Get activity subject list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_4|error`

**Sample code:**

```ballerina
crm:inline_response_200_4 result = check b1Client->activitySubjectServiceGetActivitySubjectList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ActivitySubjectParams",
  "value": [
    {"code": 10, "description": "Follow-up call"}
  ]
}
```

</details>

<details>
<summary>activitySubjectServiceGetListByTypeCode</summary>

Get list by type code.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ActivitySubjectService_GetListByTypeCode_body</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_5|error`

**Sample code:**

```ballerina
crm:inline_response_200_5 result = check b1Client->activitySubjectServiceGetListByTypeCode({
    ActivitySubject: {code: 10}
});
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ActivitySubjectParams",
  "value": [
    {"code": 10, "description": "Follow-up call"}
  ]
}
```

</details>

<details>
<summary>listActivitySubjects</summary>

Query the ActivitySubjects collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListActivitySubjectsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListActivitySubjectsQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `ActivitySubjectsCollectionResponse|error`

**Sample code:**

```ballerina
crm:ActivitySubjectsCollectionResponse result = check b1Client->listActivitySubjects();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ActivitySubjects",
  "value": [
    {"Code": 10, "Description": "Follow-up call", "IsActive": "tYES", "ActivityType": 1}
  ]
}
```

</details>

<details>
<summary>createActivitySubjects</summary>

Create a new ActivitySubject.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ActivitySubject</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `ActivitySubject|error`

**Sample code:**

```ballerina
crm:ActivitySubject created = check b1Client->createActivitySubjects({Description: "Follow-up call", IsActive: "tYES", ActivityType: 1});
```

**Sample response:**

```json
{"Code": 10, "Description": "Follow-up call", "IsActive": "tYES", "ActivityType": 1}
```

</details>

<details>
<summary>getActivitySubjects</summary>

Get a single ActivitySubject by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetActivitySubjectsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `ActivitySubject|error`

**Sample code:**

```ballerina
crm:ActivitySubject subject = check b1Client->getActivitySubjects(10);
```

**Sample response:**

```json
{"Code": 10, "Description": "Follow-up call", "IsActive": "tYES", "ActivityType": 1}
```

</details>

<details>
<summary>deleteActivitySubjects</summary>

Delete a ActivitySubject.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteActivitySubjects(10);
```

</details>

<details>
<summary>updateActivitySubjects</summary>

Partially update a ActivitySubject (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>ActivitySubject</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateActivitySubjects(10, {IsActive: "tNO"});
```

</details>

<details>
<summary>listActivityTypes</summary>

Query the ActivityTypes collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListActivityTypesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListActivityTypesQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `ActivityTypesCollectionResponse|error`

**Sample code:**

```ballerina
crm:ActivityTypesCollectionResponse result = check b1Client->listActivityTypes();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#ActivityTypes",
  "value": [
    {"Code": 1, "Name": "Phone Call"}
  ]
}
```

</details>

<details>
<summary>createActivityTypes</summary>

Create a new ActivityType.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>ActivityType</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `ActivityType|error`

**Sample code:**

```ballerina
crm:ActivityType created = check b1Client->createActivityTypes({Name: "Phone Call"});
```

**Sample response:**

```json
{"Code": 1, "Name": "Phone Call"}
```

</details>

<details>
<summary>getActivityTypes</summary>

Get a single ActivityType by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetActivityTypesQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `ActivityType|error`

**Sample code:**

```ballerina
crm:ActivityType activityType = check b1Client->getActivityTypes(1);
```

**Sample response:**

```json
{"Code": 1, "Name": "Phone Call"}
```

</details>

<details>
<summary>deleteActivityTypes</summary>

Delete a ActivityType.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteActivityTypes(1);
```

</details>

<details>
<summary>updateActivityTypes</summary>

Partially update a ActivityType (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `code` | <code>int:Signed32</code> | Yes | Key property 'Code' (Edm.Int32) |
| `payload` | <code>ActivityType</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateActivityTypes(1, {Name: "Call"});
```

</details>

#### Campaigns & Campaign Response Types

<details>
<summary>listCampaignResponseType</summary>

Query the CampaignResponseType collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListCampaignResponseTypeHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCampaignResponseTypeQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `CampaignResponseTypeCollectionResponse|error`

**Sample code:**

```ballerina
crm:CampaignResponseTypeCollectionResponse result = check b1Client->listCampaignResponseType();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#CampaignResponseType",
  "value": [
    {"ResponseType": "RT01", "ResponseTypeDescription": "Interested", "IsActive": "tYES"}
  ]
}
```

</details>

<details>
<summary>createCampaignResponseType</summary>

Create a new CampaignResponseType.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>CampaignResponseType</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `CampaignResponseType|error`

**Sample code:**

```ballerina
crm:CampaignResponseType created = check b1Client->createCampaignResponseType({
    ResponseType: "RT01",
    ResponseTypeDescription: "Interested",
    IsActive: "tYES"
});
```

**Sample response:**

```json
{"ResponseType": "RT01", "ResponseTypeDescription": "Interested", "IsActive": "tYES"}
```

</details>

<details>
<summary>getCampaignResponseType</summary>

Get a single CampaignResponseType by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `responseType` | <code>string</code> | Yes | Key property 'ResponseType' (Edm.String) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCampaignResponseTypeQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `CampaignResponseType|error`

**Sample code:**

```ballerina
crm:CampaignResponseType responseType = check b1Client->getCampaignResponseType("RT01");
```

**Sample response:**

```json
{"ResponseType": "RT01", "ResponseTypeDescription": "Interested", "IsActive": "tYES"}
```

</details>

<details>
<summary>deleteCampaignResponseType</summary>

Delete a CampaignResponseType.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `responseType` | <code>string</code> | Yes | Key property 'ResponseType' (Edm.String) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteCampaignResponseType("RT01");
```

</details>

<details>
<summary>updateCampaignResponseType</summary>

Partially update a CampaignResponseType (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `responseType` | <code>string</code> | Yes | Key property 'ResponseType' (Edm.String) |
| `payload` | <code>CampaignResponseType</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateCampaignResponseType("RT01", {IsActive: "tNO"});
```

</details>

<details>
<summary>campaignResponseTypeServiceGetResponseTypeList</summary>

Get response type list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_6|error`

**Sample code:**

```ballerina
crm:inline_response_200_6 result = check b1Client->campaignResponseTypeServiceGetResponseTypeList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#CampaignResponseTypeParams",
  "value": [
    {"responseType": "RT01", "responseTypeDescription": "Interested"}
  ]
}
```

</details>

<details>
<summary>listCampaigns</summary>

Query the Campaigns collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListCampaignsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListCampaignsQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `CampaignsCollectionResponse|error`

**Sample code:**

```ballerina
crm:CampaignsCollectionResponse result = check b1Client->listCampaigns(queries = {
    dollarFilter: "Status eq 'csOpen'"
});
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#Campaigns",
  "value": [
    {
      "CampaignNumber": 15,
      "CampaignName": "Summer Promotion",
      "CampaignType": "ctEmail",
      "Status": "csOpen",
      "StartDate": "2026-06-01",
      "FinishDate": "2026-08-31"
    }
  ]
}
```

</details>

<details>
<summary>createCampaigns</summary>

Create a new Campaign.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>Campaign</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `Campaign|error`

**Sample code:**

```ballerina
crm:Campaign created = check b1Client->createCampaigns({
    CampaignName: "Summer Promotion",
    CampaignType: "ctEmail",
    StartDate: "2026-06-01",
    FinishDate: "2026-08-31"
});
```

**Sample response:**

```json
{
  "CampaignNumber": 15,
  "CampaignName": "Summer Promotion",
  "CampaignType": "ctEmail",
  "Status": "csOpen",
  "StartDate": "2026-06-01",
  "FinishDate": "2026-08-31"
}
```

</details>

<details>
<summary>getCampaigns</summary>

Get a single Campaign by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignNumber` | <code>int:Signed32</code> | Yes | Key property 'CampaignNumber' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetCampaignsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `Campaign|error`

**Sample code:**

```ballerina
crm:Campaign campaign = check b1Client->getCampaigns(15);
```

**Sample response:**

```json
{
  "CampaignNumber": 15,
  "CampaignName": "Summer Promotion",
  "CampaignType": "ctEmail",
  "Status": "csOpen"
}
```

</details>

<details>
<summary>deleteCampaigns</summary>

Delete a Campaign.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignNumber` | <code>int:Signed32</code> | Yes | Key property 'CampaignNumber' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteCampaigns(15);
```

</details>

<details>
<summary>updateCampaigns</summary>

Partially update a Campaign (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignNumber` | <code>int:Signed32</code> | Yes | Key property 'CampaignNumber' (Edm.Int32) |
| `payload` | <code>Campaign</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateCampaigns(15, {Remarks: "Extended by two weeks"});
```

</details>

<details>
<summary>campaignsCancel</summary>

Bound action 'Cancel' on Campaigns (binding type Campaign).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `campaignNumber` | <code>int:Signed32</code> | Yes | Key property 'CampaignNumber' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->campaignsCancel(15);
```

</details>

<details>
<summary>campaignsServiceGetList</summary>

Get list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_7|error`

**Sample code:**

```ballerina
crm:inline_response_200_7 result = check b1Client->campaignsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#CampaignParams",
  "value": [
    {"campaignNumber": 15, "campaignName": "Summer Promotion"}
  ]
}
```

</details>

#### Partners Setups

<details>
<summary>listPartnersSetups</summary>

Query the PartnersSetups collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListPartnersSetupsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPartnersSetupsQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `PartnersSetupsCollectionResponse|error`

**Sample code:**

```ballerina
crm:PartnersSetupsCollectionResponse result = check b1Client->listPartnersSetups();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#PartnersSetups",
  "value": [
    {"PartnerID": 4, "Name": "Reseller", "DefaultRelationship": 1, "RelatedBP": "C20000"}
  ]
}
```

</details>

<details>
<summary>createPartnersSetups</summary>

Create a new PartnersSetup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>PartnersSetup</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `PartnersSetup|error`

**Sample code:**

```ballerina
crm:PartnersSetup created = check b1Client->createPartnersSetups({Name: "Reseller", RelatedBP: "C20000"});
```

**Sample response:**

```json
{"PartnerID": 4, "Name": "Reseller", "DefaultRelationship": 1, "RelatedBP": "C20000"}
```

</details>

<details>
<summary>getPartnersSetups</summary>

Get a single PartnersSetup by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partnerID` | <code>int:Signed32</code> | Yes | Key property 'PartnerID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPartnersSetupsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `PartnersSetup|error`

**Sample code:**

```ballerina
crm:PartnersSetup setup = check b1Client->getPartnersSetups(4);
```

**Sample response:**

```json
{"PartnerID": 4, "Name": "Reseller", "DefaultRelationship": 1, "RelatedBP": "C20000"}
```

</details>

<details>
<summary>deletePartnersSetups</summary>

Delete a PartnersSetup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partnerID` | <code>int:Signed32</code> | Yes | Key property 'PartnerID' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deletePartnersSetups(4);
```

</details>

<details>
<summary>updatePartnersSetups</summary>

Partially update a PartnersSetup (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `partnerID` | <code>int:Signed32</code> | Yes | Key property 'PartnerID' (Edm.Int32) |
| `payload` | <code>PartnersSetup</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updatePartnersSetups(4, {Details: "Updated partner details"});
```

</details>

<details>
<summary>partnersSetupsServiceGetList</summary>

Get list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_8|error`

**Sample code:**

```ballerina
crm:inline_response_200_8 result = check b1Client->partnersSetupsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#PartnersSetupParams",
  "value": [
    {"partnerID": 4, "name": "Reseller"}
  ]
}
```

</details>

#### Sales Opportunities

<details>
<summary>listSalesOpportunities</summary>

Query the SalesOpportunities collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListSalesOpportunitiesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSalesOpportunitiesQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `SalesOpportunitiesCollectionResponse|error`

**Sample code:**

```ballerina
crm:SalesOpportunitiesCollectionResponse result = check b1Client->listSalesOpportunities(queries = {
    dollarFilter: "Status eq 'sos_Open'",
    dollarTop: 20
});
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SalesOpportunities",
  "value": [
    {
      "SequentialNo": 305,
      "CardCode": "C20000",
      "OpportunityName": "New ERP Deal",
      "Status": "sos_Open",
      "StartDate": "2026-07-01",
      "PredictedClosingDate": "2026-09-30",
      "MaxLocalTotal": 50000
    }
  ]
}
```

</details>

<details>
<summary>createSalesOpportunities</summary>

Create a new SalesOpportunities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SalesOpportunities</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `SalesOpportunities|error`

**Sample code:**

```ballerina
crm:SalesOpportunities created = check b1Client->createSalesOpportunities({
    CardCode: "C20000",
    OpportunityName: "New ERP Deal",
    StartDate: "2026-07-01",
    PredictedClosingDate: "2026-09-30"
});
```

**Sample response:**

```json
{
  "SequentialNo": 305,
  "CardCode": "C20000",
  "OpportunityName": "New ERP Deal",
  "Status": "sos_Open",
  "StartDate": "2026-07-01",
  "PredictedClosingDate": "2026-09-30"
}
```

</details>

<details>
<summary>getSalesOpportunities</summary>

Get a single SalesOpportunities by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequentialNo` | <code>int:Signed32</code> | Yes | Key property 'SequentialNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSalesOpportunitiesQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `SalesOpportunities|error`

**Sample code:**

```ballerina
crm:SalesOpportunities opportunity = check b1Client->getSalesOpportunities(305);
```

**Sample response:**

```json
{
  "SequentialNo": 305,
  "CardCode": "C20000",
  "OpportunityName": "New ERP Deal",
  "Status": "sos_Open"
}
```

</details>

<details>
<summary>deleteSalesOpportunities</summary>

Delete a SalesOpportunities.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequentialNo` | <code>int:Signed32</code> | Yes | Key property 'SequentialNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteSalesOpportunities(305);
```

</details>

<details>
<summary>updateSalesOpportunities</summary>

Partially update a SalesOpportunities (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequentialNo` | <code>int:Signed32</code> | Yes | Key property 'SequentialNo' (Edm.Int32) |
| `payload` | <code>SalesOpportunities</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateSalesOpportunities(305, {Remarks: "Customer requested a revised quote"});
```

</details>

<details>
<summary>salesOpportunitiesClose</summary>

Bound action 'Close' on SalesOpportunities (binding type SalesOpportunities).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequentialNo` | <code>int:Signed32</code> | Yes | Key property 'SequentialNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->salesOpportunitiesClose(305);
```

</details>

#### Sales Opportunity Competitor / Interest / Reason / Source Setups

<details>
<summary>listSalesOpportunityCompetitorsSetup</summary>

Query the SalesOpportunityCompetitorsSetup collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListSalesOpportunityCompetitorsSetupHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSalesOpportunityCompetitorsSetupQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `SalesOpportunityCompetitorsSetupCollectionResponse|error`

**Sample code:**

```ballerina
crm:SalesOpportunityCompetitorsSetupCollectionResponse result = check b1Client->listSalesOpportunityCompetitorsSetup();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SalesOpportunityCompetitorsSetup",
  "value": [
    {"SequenceNo": 1, "Name": "Acme Corp", "ThreatLevel": "tlMedium"}
  ]
}
```

</details>

<details>
<summary>createSalesOpportunityCompetitorsSetup</summary>

Create a new SalesOpportunityCompetitorSetup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SalesOpportunityCompetitorSetup</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `SalesOpportunityCompetitorSetup|error`

**Sample code:**

```ballerina
crm:SalesOpportunityCompetitorSetup created = check b1Client->createSalesOpportunityCompetitorsSetup({Name: "Acme Corp", ThreatLevel: "tlMedium"});
```

**Sample response:**

```json
{"SequenceNo": 1, "Name": "Acme Corp", "ThreatLevel": "tlMedium"}
```

</details>

<details>
<summary>getSalesOpportunityCompetitorsSetup</summary>

Get a single SalesOpportunityCompetitorSetup by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSalesOpportunityCompetitorsSetupQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `SalesOpportunityCompetitorSetup|error`

**Sample code:**

```ballerina
crm:SalesOpportunityCompetitorSetup competitor = check b1Client->getSalesOpportunityCompetitorsSetup(1);
```

**Sample response:**

```json
{"SequenceNo": 1, "Name": "Acme Corp", "ThreatLevel": "tlMedium"}
```

</details>

<details>
<summary>deleteSalesOpportunityCompetitorsSetup</summary>

Delete a SalesOpportunityCompetitorSetup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteSalesOpportunityCompetitorsSetup(1);
```

</details>

<details>
<summary>updateSalesOpportunityCompetitorsSetup</summary>

Partially update a SalesOpportunityCompetitorSetup (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `payload` | <code>SalesOpportunityCompetitorSetup</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateSalesOpportunityCompetitorsSetup(1, {ThreatLevel: "tlHigh"});
```

</details>

<details>
<summary>salesOpportunityCompetitorsSetupServiceGetSalesOpportunityCompetitorSetupList</summary>

Get sales opportunity competitor setup list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_9|error`

**Sample code:**

```ballerina
crm:inline_response_200_9 result = check b1Client->salesOpportunityCompetitorsSetupServiceGetSalesOpportunityCompetitorSetupList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SalesOpportunityCompetitorSetupParams",
  "value": [
    {"sequenceNo": 1, "name": "Acme Corp", "threatLevel": "tlMedium"}
  ]
}
```

</details>

<details>
<summary>listSalesOpportunityInterestsSetup</summary>

Query the SalesOpportunityInterestsSetup collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListSalesOpportunityInterestsSetupHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSalesOpportunityInterestsSetupQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `SalesOpportunityInterestsSetupCollectionResponse|error`

**Sample code:**

```ballerina
crm:SalesOpportunityInterestsSetupCollectionResponse result = check b1Client->listSalesOpportunityInterestsSetup();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SalesOpportunityInterestsSetup",
  "value": [
    {"SequenceNo": 1, "Description": "Cloud Migration"}
  ]
}
```

</details>

<details>
<summary>createSalesOpportunityInterestsSetup</summary>

Create a new SalesOpportunityInterestSetup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SalesOpportunityInterestSetup</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `SalesOpportunityInterestSetup|error`

**Sample code:**

```ballerina
crm:SalesOpportunityInterestSetup created = check b1Client->createSalesOpportunityInterestsSetup({Description: "Cloud Migration"});
```

**Sample response:**

```json
{"SequenceNo": 1, "Description": "Cloud Migration"}
```

</details>

<details>
<summary>getSalesOpportunityInterestsSetup</summary>

Get a single SalesOpportunityInterestSetup by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSalesOpportunityInterestsSetupQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `SalesOpportunityInterestSetup|error`

**Sample code:**

```ballerina
crm:SalesOpportunityInterestSetup interest = check b1Client->getSalesOpportunityInterestsSetup(1);
```

**Sample response:**

```json
{"SequenceNo": 1, "Description": "Cloud Migration"}
```

</details>

<details>
<summary>deleteSalesOpportunityInterestsSetup</summary>

Delete a SalesOpportunityInterestSetup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteSalesOpportunityInterestsSetup(1);
```

</details>

<details>
<summary>updateSalesOpportunityInterestsSetup</summary>

Partially update a SalesOpportunityInterestSetup (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `payload` | <code>SalesOpportunityInterestSetup</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateSalesOpportunityInterestsSetup(1, {Description: "Cloud & AI Migration"});
```

</details>

<details>
<summary>salesOpportunityInterestsSetupServiceGetSalesOpportunityInterestSetupList</summary>

Get sales opportunity interest setup list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_10|error`

**Sample code:**

```ballerina
crm:inline_response_200_10 result = check b1Client->salesOpportunityInterestsSetupServiceGetSalesOpportunityInterestSetupList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SalesOpportunityInterestSetupParams",
  "value": [
    {"sequenceNo": 1, "description": "Cloud Migration"}
  ]
}
```

</details>

<details>
<summary>listSalesOpportunityReasonsSetup</summary>

Query the SalesOpportunityReasonsSetup collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListSalesOpportunityReasonsSetupHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSalesOpportunityReasonsSetupQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `SalesOpportunityReasonsSetupCollectionResponse|error`

**Sample code:**

```ballerina
crm:SalesOpportunityReasonsSetupCollectionResponse result = check b1Client->listSalesOpportunityReasonsSetup();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SalesOpportunityReasonsSetup",
  "value": [
    {"SequenceNo": 1, "Description": "Better pricing"}
  ]
}
```

</details>

<details>
<summary>createSalesOpportunityReasonsSetup</summary>

Create a new SalesOpportunityReasonSetup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SalesOpportunityReasonSetup</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `SalesOpportunityReasonSetup|error`

**Sample code:**

```ballerina
crm:SalesOpportunityReasonSetup created = check b1Client->createSalesOpportunityReasonsSetup({Description: "Better pricing"});
```

**Sample response:**

```json
{"SequenceNo": 1, "Description": "Better pricing"}
```

</details>

<details>
<summary>getSalesOpportunityReasonsSetup</summary>

Get a single SalesOpportunityReasonSetup by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSalesOpportunityReasonsSetupQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `SalesOpportunityReasonSetup|error`

**Sample code:**

```ballerina
crm:SalesOpportunityReasonSetup reason = check b1Client->getSalesOpportunityReasonsSetup(1);
```

**Sample response:**

```json
{"SequenceNo": 1, "Description": "Better pricing"}
```

</details>

<details>
<summary>deleteSalesOpportunityReasonsSetup</summary>

Delete a SalesOpportunityReasonSetup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteSalesOpportunityReasonsSetup(1);
```

</details>

<details>
<summary>updateSalesOpportunityReasonsSetup</summary>

Partially update a SalesOpportunityReasonSetup (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `payload` | <code>SalesOpportunityReasonSetup</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateSalesOpportunityReasonsSetup(1, {Description: "Better pricing and support"});
```

</details>

<details>
<summary>salesOpportunityReasonsSetupServiceGetSalesOpportunityReasonSetupList</summary>

Get sales opportunity reason setup list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_11|error`

**Sample code:**

```ballerina
crm:inline_response_200_11 result = check b1Client->salesOpportunityReasonsSetupServiceGetSalesOpportunityReasonSetupList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SalesOpportunityReasonSetupParams",
  "value": [
    {"sequenceNo": 1, "description": "Better pricing"}
  ]
}
```

</details>

<details>
<summary>listSalesOpportunitySourcesSetup</summary>

Query the SalesOpportunitySourcesSetup collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListSalesOpportunitySourcesSetupHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSalesOpportunitySourcesSetupQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `SalesOpportunitySourcesSetupCollectionResponse|error`

**Sample code:**

```ballerina
crm:SalesOpportunitySourcesSetupCollectionResponse result = check b1Client->listSalesOpportunitySourcesSetup();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SalesOpportunitySourcesSetup",
  "value": [
    {"SequenceNo": 1, "Description": "Trade Show"}
  ]
}
```

</details>

<details>
<summary>createSalesOpportunitySourcesSetup</summary>

Create a new SalesOpportunitySourceSetup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SalesOpportunitySourceSetup</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `SalesOpportunitySourceSetup|error`

**Sample code:**

```ballerina
crm:SalesOpportunitySourceSetup created = check b1Client->createSalesOpportunitySourcesSetup({Description: "Trade Show"});
```

**Sample response:**

```json
{"SequenceNo": 1, "Description": "Trade Show"}
```

</details>

<details>
<summary>getSalesOpportunitySourcesSetup</summary>

Get a single SalesOpportunitySourceSetup by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSalesOpportunitySourcesSetupQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `SalesOpportunitySourceSetup|error`

**Sample code:**

```ballerina
crm:SalesOpportunitySourceSetup source = check b1Client->getSalesOpportunitySourcesSetup(1);
```

**Sample response:**

```json
{"SequenceNo": 1, "Description": "Trade Show"}
```

</details>

<details>
<summary>deleteSalesOpportunitySourcesSetup</summary>

Delete a SalesOpportunitySourceSetup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteSalesOpportunitySourcesSetup(1);
```

</details>

<details>
<summary>updateSalesOpportunitySourcesSetup</summary>

Partially update a SalesOpportunitySourceSetup (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `payload` | <code>SalesOpportunitySourceSetup</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateSalesOpportunitySourcesSetup(1, {Description: "Trade Show 2026"});
```

</details>

<details>
<summary>salesOpportunitySourcesSetupServiceGetSalesOpportunitySourceSetupList</summary>

Get sales opportunity source setup list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_12|error`

**Sample code:**

```ballerina
crm:inline_response_200_12 result = check b1Client->salesOpportunitySourcesSetupServiceGetSalesOpportunitySourceSetupList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SalesOpportunitySourceSetupParams",
  "value": [
    {"sequenceNo": 1, "description": "Trade Show"}
  ]
}
```

</details>

#### Sales Stages

<details>
<summary>listSalesStages</summary>

Query the SalesStages collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListSalesStagesHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListSalesStagesQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `SalesStagesCollectionResponse|error`

**Sample code:**

```ballerina
crm:SalesStagesCollectionResponse result = check b1Client->listSalesStages();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#SalesStages",
  "value": [
    {"SequenceNo": 1, "Name": "Qualification", "ClosingPercentage": 10, "IsSales": "tYES"}
  ]
}
```

</details>

<details>
<summary>createSalesStages</summary>

Create a new SalesStage.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>SalesStage</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `SalesStage|error`

**Sample code:**

```ballerina
crm:SalesStage created = check b1Client->createSalesStages({Name: "Qualification", ClosingPercentage: 10, IsSales: "tYES"});
```

**Sample response:**

```json
{"SequenceNo": 1, "Name": "Qualification", "ClosingPercentage": 10, "IsSales": "tYES"}
```

</details>

<details>
<summary>getSalesStages</summary>

Get a single SalesStage by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetSalesStagesQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `SalesStage|error`

**Sample code:**

```ballerina
crm:SalesStage stage = check b1Client->getSalesStages(1);
```

**Sample response:**

```json
{"SequenceNo": 1, "Name": "Qualification", "ClosingPercentage": 10, "IsSales": "tYES"}
```

</details>

<details>
<summary>deleteSalesStages</summary>

Delete a SalesStage.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteSalesStages(1);
```

</details>

<details>
<summary>updateSalesStages</summary>

Partially update a SalesStage (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sequenceNo` | <code>int:Signed32</code> | Yes | Key property 'SequenceNo' (Edm.Int32) |
| `payload` | <code>SalesStage</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateSalesStages(1, {ClosingPercentage: 15});
```

</details>

#### Target Groups

<details>
<summary>listTargetGroups</summary>

Query the TargetGroups collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>ListTargetGroupsHeaders</code> | No | Headers to be sent with the request |
| `queries` | <code>ListTargetGroupsQueries</code> | No | OData query parameters (`$skip`, `$top`, `$filter`, `$orderby`, `$expand`, `$inlinecount`, `$select`) |

**Returns:** `TargetGroupsCollectionResponse|error`

**Sample code:**

```ballerina
crm:TargetGroupsCollectionResponse result = check b1Client->listTargetGroups();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#TargetGroups",
  "value": [
    {"TargetGroupCode": "TG-001", "TargetGroupName": "Enterprise Prospects", "TargetGroupType": "tgtCustomer"}
  ]
}
```

</details>

<details>
<summary>createTargetGroups</summary>

Create a new TargetGroup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | <code>TargetGroup</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `TargetGroup|error`

**Sample code:**

```ballerina
crm:TargetGroup created = check b1Client->createTargetGroups({
    TargetGroupCode: "TG-001",
    TargetGroupName: "Enterprise Prospects",
    TargetGroupType: "tgtCustomer"
});
```

**Sample response:**

```json
{"TargetGroupCode": "TG-001", "TargetGroupName": "Enterprise Prospects", "TargetGroupType": "tgtCustomer"}
```

</details>

<details>
<summary>getTargetGroups</summary>

Get a single TargetGroup by key.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `targetGroupCode` | <code>string</code> | Yes | Key property 'TargetGroupCode' (Edm.String) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetTargetGroupsQueries</code> | No | Queries to be sent with the request (`$expand`, `$select`) |

**Returns:** `TargetGroup|error`

**Sample code:**

```ballerina
crm:TargetGroup targetGroup = check b1Client->getTargetGroups("TG-001");
```

**Sample response:**

```json
{"TargetGroupCode": "TG-001", "TargetGroupName": "Enterprise Prospects", "TargetGroupType": "tgtCustomer"}
```

</details>

<details>
<summary>deleteTargetGroups</summary>

Delete a TargetGroup.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `targetGroupCode` | <code>string</code> | Yes | Key property 'TargetGroupCode' (Edm.String) |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->deleteTargetGroups("TG-001");
```

</details>

<details>
<summary>updateTargetGroups</summary>

Partially update a TargetGroup (PATCH/MERGE semantics).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `targetGroupCode` | <code>string</code> | Yes | Key property 'TargetGroupCode' (Edm.String) |
| `payload` | <code>TargetGroup</code> | Yes | Request payload |
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `error?`

**Sample code:**

```ballerina
check b1Client->updateTargetGroups("TG-001", {TargetGroupName: "Key Enterprise Prospects"});
```

</details>

<details>
<summary>targetGroupsServiceGetList</summary>

Get list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `headers` | <code>map&#124;string&#124;string[]&#124;&#124;</code> | No | Headers to be sent with the request |

**Returns:** `inline_response_200_13|error`

**Sample code:**

```ballerina
crm:inline_response_200_13 result = check b1Client->targetGroupsServiceGetList();
```

**Sample response:**

```json
{
  "odata.metadata": "$metadata#TargetGroupParams",
  "value": [
    {"targetGroupCode": "TG-001", "targetGroupName": "Enterprise Prospects"}
  ]
}
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
check b1Client->logout();
```

</details>
