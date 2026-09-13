---
connector: true
connector_name: "sap.successfactors.ecpersonalinformation"
toc_max_heading_level: 4
---

# Actions

The `ballerinax/sap.successfactors.ecpersonalinformation` package exposes the following clients:

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Manages ecpersonalinformation objects: PerEmergencyContacts, PerPhone, PersonKey, PerPersonal, PerSocialAccount, PerPerson, PerPersonRelationship, PerEmail…, over the SAP SuccessFactors OData v2 API. |

---

## Client

You can use these APIs to access the personal information of an employee including emergency contact information, social media accounts, email address, and non-effective-dated biographical information such as date of birth, country of birth and national identification card information.

### Configuration

#### ConnectionConfig

Provides a set of configurations for controlling the behaviours when communicating with the SAP SuccessFactors OData endpoint. Passed as the argument to the client initializer.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | <code>http:CredentialsConfig</code> | Required | Configurations related to client authentication |
| `httpVersion` | <code>http:HttpVersion</code> | See default | The HTTP version understood by the client |
| `http1Settings` | <code>http:ClientHttp1Settings</code> | See default | Configurations related to HTTP/1.x protocol |
| `http2Settings` | <code>http:ClientHttp2Settings</code> | See default | Configurations related to HTTP/2 protocol |
| `timeout` | <code>decimal</code> | See default | The maximum time to wait (in seconds) for a response before closing the connection |
| `forwarded` | <code>string</code> | See default | The choice of setting `forwarded`/`x-forwarded` header |
| `followRedirects` | <code>http:FollowRedirects</code> | Optional | Configurations associated with Redirection |
| `poolConfig` | <code>http:PoolConfiguration</code> | Optional | Configurations associated with request pooling |
| `cache` | <code>http:CacheConfig</code> | See default | HTTP caching related configurations |
| `compression` | <code>http:Compression</code> | See default | Specifies the way of handling compression (`accept-encoding`) header |
| `circuitBreaker` | <code>http:CircuitBreakerConfig</code> | Optional | Configurations associated with the behaviour of the Circuit Breaker |
| `retryConfig` | <code>http:RetryConfig</code> | Optional | Configurations associated with retrying |
| `cookieConfig` | <code>http:CookieConfig</code> | Optional | Configurations associated with cookies |
| `responseLimits` | <code>http:ResponseLimitConfigs</code> | See default | Configurations associated with inbound response size limits |
| `secureSocket` | <code>http:ClientSecureSocket</code> | Optional | SSL/TLS-related options |
| `proxy` | <code>http:ProxyConfig</code> | Optional | Proxy server related options |
| `socketConfig` | <code>http:ClientSocketConfig</code> | See default | Provides settings related to client socket configuration |
| `validation` | <code>boolean</code> | See default | Enables the inbound payload validation functionality which provided by the constraint package. Enabled by default |
| `laxDataBinding` | <code>boolean</code> | See default | Enables relaxed data binding on the client side. When enabled, `nil` values are treated as optional, and absent fields are handled as `nilable` types. Enabled by default. |

The client also accepts a `hostname` string parameter (the SAP SuccessFactors API server host) and an optional `port` (defaults to `443`).

### Initializing the client

```ballerina
import ballerinax/sap.successfactors.ecpersonalinformation;

configurable string hostname = ?;
configurable string username = ?;
configurable string password = ?;

ecpersonalinformation:Client client = check new (
    {
        auth: { username, password }
    },
    hostname
);
```

### Operations
#### PerEmergencyContacts

<details>
<summary>listPerEmergencyContactss</summary>

<div>

Queries the PerEmergencyContacts collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerEmergencyContactssQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper&#124;error`

**Sample code:**

```ballerina
Wrapper result = check client->listPerEmergencyContactss();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerEmergencyContacts</summary>

<div>

Retrieves a single PerEmergencyContacts entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `name` | <code>string</code> | Yes | key: name |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `relationship` | <code>string</code> | Yes | key: relationship |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerEmergencyContactsQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerEmergencyContacts&#124;error`

**Sample code:**

```ballerina
PerEmergencyContacts result = check client->getPerEmergencyContacts(name, personIdExternal, relationship);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### PerPhone

<details>
<summary>listPerPhones</summary>

<div>

Queries the PerPhone collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerPhonesQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_1&#124;error`

**Sample code:**

```ballerina
Wrapper_1 result = check client->listPerPhones();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "personIdExternal": "1000",
        "phoneType": "string",
        "personNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerPhone</summary>

<div>

Retrieves a single PerPhone entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `phoneType` | <code>string</code> | Yes | key: phoneType |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerPhoneQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerPhone&#124;error`

**Sample code:**

```ballerina
PerPhone result = check client->getPerPhone(personIdExternal, phoneType);
```

**Sample response:**

```json
{
  "personIdExternal": "1000",
  "phoneType": "string",
  "personNav": {
    "personIdExternal": "1000",
    "emailNav": {
      "results": []
    },
    "emergencyContactNav": {
      "results": []
    },
    "homeAddressNavDEFLT": {
      "results": []
    },
    "nationalIdNav": {
      "results": []
    },
    "personRerlationshipNav": {
      "results": []
    },
    "personalInfoNav": {
      "results": []
    },
    "phoneNav": {
      "results": []
    },
    "socialAccountNav": {
      "results": []
    }
  }
}
```

</div>
</details>

#### PersonKey

<details>
<summary>listPersonKeys</summary>

<div>

Queries the PersonKey collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPersonKeysQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_2&#124;error`

**Sample code:**

```ballerina
Wrapper_2 result = check client->listPersonKeys();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "personIdExternal": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPersonKey</summary>

<div>

Retrieves a single PersonKey entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPersonKeyQueries</code> | No | Queries to be sent with the request |

**Returns:** `PersonKey&#124;error`

**Sample code:**

```ballerina
PersonKey result = check client->getPersonKey(personIdExternal);
```

**Sample response:**

```json
{
  "personIdExternal": "1000"
}
```

</div>
</details>

#### PerPersonal

<details>
<summary>listPerPersonals</summary>

<div>

Queries the PerPersonal collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerPersonalsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_3&#124;error`

**Sample code:**

```ballerina
Wrapper_3 result = check client->listPerPersonals();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerPersonal</summary>

<div>

Retrieves a single PerPersonal entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerPersonalQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerPersonal&#124;error`

**Sample code:**

```ballerina
PerPersonal result = check client->getPerPersonal(personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### PerSocialAccount

<details>
<summary>listPerSocialAccounts</summary>

<div>

Queries the PerSocialAccount collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerSocialAccountsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_4&#124;error`

**Sample code:**

```ballerina
Wrapper_4 result = check client->listPerSocialAccounts();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "domain": "string",
        "personIdExternal": "1000",
        "personNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerSocialAccount</summary>

<div>

Retrieves a single PerSocialAccount entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `domain` | <code>string</code> | Yes | key: domain |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerSocialAccountQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerSocialAccount&#124;error`

**Sample code:**

```ballerina
PerSocialAccount result = check client->getPerSocialAccount(domain, personIdExternal);
```

**Sample response:**

```json
{
  "domain": "string",
  "personIdExternal": "1000",
  "personNav": {
    "personIdExternal": "1000",
    "emailNav": {
      "results": []
    },
    "emergencyContactNav": {
      "results": []
    },
    "homeAddressNavDEFLT": {
      "results": []
    },
    "nationalIdNav": {
      "results": []
    },
    "personRerlationshipNav": {
      "results": []
    },
    "personalInfoNav": {
      "results": []
    },
    "phoneNav": {
      "results": []
    },
    "socialAccountNav": {
      "results": []
    }
  }
}
```

</div>
</details>

#### PerPerson

<details>
<summary>listPerPersons</summary>

<div>

Queries the PerPerson collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerPersonsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_5&#124;error`

**Sample code:**

```ballerina
Wrapper_5 result = check client->listPerPersons();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "personIdExternal": "1000",
        "emailNav": {},
        "emergencyContactNav": {},
        "homeAddressNavDEFLT": {},
        "nationalIdNav": {},
        "personRerlationshipNav": {},
        "personalInfoNav": {},
        "phoneNav": {},
        "socialAccountNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerPerson</summary>

<div>

Retrieves a single PerPerson entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerPersonQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerPerson&#124;error`

**Sample code:**

```ballerina
PerPerson result = check client->getPerPerson(personIdExternal);
```

**Sample response:**

```json
{
  "personIdExternal": "1000",
  "emailNav": {
    "results": [
      {
        "d": {}
      }
    ]
  },
  "emergencyContactNav": {
    "results": [
      {
        "d": {}
      }
    ]
  },
  "homeAddressNavDEFLT": {
    "results": [
      {
        "d": {}
      }
    ]
  },
  "nationalIdNav": {
    "results": [
      {
        "d": {}
      }
    ]
  },
  "personRerlationshipNav": {
    "results": [
      {
        "d": {}
      }
    ]
  },
  "personalInfoNav": {
    "results": [
      {
        "d": {}
      }
    ]
  },
  "phoneNav": {
    "results": [
      {
        "personIdExternal": "1000",
        "phoneType": "string",
        "personNav": {}
      }
    ]
  },
  "socialAccountNav": {
    "results": [
      {
        "domain": "string",
        "personIdExternal": "1000",
        "personNav": {}
      }
    ]
  }
}
```

</div>
</details>

#### PerPersonRelationship

<details>
<summary>listPerPersonRelationships</summary>

<div>

Queries the PerPersonRelationship collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerPersonRelationshipsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_6&#124;error`

**Sample code:**

```ballerina
Wrapper_6 result = check client->listPerPersonRelationships();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerPersonRelationship</summary>

<div>

Retrieves a single PerPersonRelationship entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `relatedPersonIdExternal` | <code>string</code> | Yes | key: relatedPersonIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerPersonRelationshipQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerPersonRelationship&#124;error`

**Sample code:**

```ballerina
PerPersonRelationship result = check client->getPerPersonRelationship(personIdExternal, relatedPersonIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### PerEmail

<details>
<summary>listPerEmails</summary>

<div>

Queries the PerEmail collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerEmailsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_7&#124;error`

**Sample code:**

```ballerina
Wrapper_7 result = check client->listPerEmails();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerEmail</summary>

<div>

Retrieves a single PerEmail entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `emailType` | <code>string</code> | Yes | key: emailType |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerEmailQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerEmail&#124;error`

**Sample code:**

```ballerina
PerEmail result = check client->getPerEmail(emailType, personIdExternal);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### HrisEmergencyContactAddressDEFLT

<details>
<summary>listHrisEmergencyContactAddressDEFLTs</summary>

<div>

Queries the HrisEmergencyContactAddressDEFLT collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListHrisEmergencyContactAddressDEFLTsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_8&#124;error`

**Sample code:**

```ballerina
Wrapper_8 result = check client->listHrisEmergencyContactAddressDEFLTs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getHrisEmergencyContactAddressDEFLT</summary>

<div>

Retrieves a single HrisEmergencyContactAddressDEFLT entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `addressId` | <code>string</code> | Yes | key: addressId |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetHrisEmergencyContactAddressDEFLTQueries</code> | No | Queries to be sent with the request |

**Returns:** `HrisEmergencyContactAddressDEFLT&#124;error`

**Sample code:**

```ballerina
HrisEmergencyContactAddressDEFLT result = check client->getHrisEmergencyContactAddressDEFLT(addressId);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### PerNationalId

<details>
<summary>listPerNationalIds</summary>

<div>

Queries the PerNationalId collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerNationalIdsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_9&#124;error`

**Sample code:**

```ballerina
Wrapper_9 result = check client->listPerNationalIds();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerNationalId</summary>

<div>

Retrieves a single PerNationalId entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `cardType` | <code>string</code> | Yes | key: cardType |
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerNationalIdQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerNationalId&#124;error`

**Sample code:**

```ballerina
PerNationalId result = check client->getPerNationalId(cardType, country, personIdExternal);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### PerNationalIdWithValidityPeriod

<details>
<summary>listPerNationalIdWithValidityPeriods</summary>

<div>

Queries the PerNationalIdWithValidityPeriod collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerNationalIdWithValidityPeriodsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_10&#124;error`

**Sample code:**

```ballerina
Wrapper_10 result = check client->listPerNationalIdWithValidityPeriods();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "recordId": "1000",
        "validFrom": "1000",
        "validTo": "1000",
        "cardType": "string",
        "country": "string",
        "personIdExternal": "1000",
        "personNav": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerNationalIdWithValidityPeriod</summary>

<div>

Retrieves a single PerNationalIdWithValidityPeriod entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `recordId` | <code>string</code> | Yes | key: recordId |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerNationalIdWithValidityPeriodQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerNationalIdWithValidityPeriod&#124;error`

**Sample code:**

```ballerina
PerNationalIdWithValidityPeriod result = check client->getPerNationalIdWithValidityPeriod(recordId, personIdExternal);
```

**Sample response:**

```json
{
  "recordId": "1000",
  "validFrom": "1000",
  "validTo": "1000",
  "cardType": "string",
  "country": "string",
  "personIdExternal": "1000",
  "personNav": {
    "personIdExternal": "1000",
    "emailNav": {
      "results": []
    },
    "emergencyContactNav": {
      "results": []
    },
    "homeAddressNavDEFLT": {
      "results": []
    },
    "nationalIdNav": {
      "results": []
    },
    "personRerlationshipNav": {
      "results": []
    },
    "personalInfoNav": {
      "results": []
    },
    "phoneNav": {
      "results": []
    },
    "socialAccountNav": {
      "results": []
    }
  }
}
```

</div>
</details>

#### PerAddressDEFLT

<details>
<summary>listPerAddressDEFLTs</summary>

<div>

Queries the PerAddressDEFLT collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerAddressDEFLTsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_11&#124;error`

**Sample code:**

```ballerina
Wrapper_11 result = check client->listPerAddressDEFLTs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerAddressDEFLT</summary>

<div>

Retrieves a single PerAddressDEFLT entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `addressType` | <code>string</code> | Yes | key: addressType |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `startDate` | <code>string</code> | Yes | key: startDate |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerAddressDEFLTQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerAddressDEFLT&#124;error`

**Sample code:**

```ballerina
PerAddressDEFLT result = check client->getPerAddressDEFLT(addressType, personIdExternal, startDate);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### generateNextPersonID

<details>
<summary>creategenerateNextPersonID</summary>

<div>

Creates a new generateNextPersonID entity from the supplied payload.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |

**Returns:** `Result&#124;error`

**Sample code:**

```ballerina
Result result = check client->creategenerateNextPersonID();
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### NameFormatGO

<details>
<summary>listNameFormatGOs</summary>

<div>

Queries the NameFormatGO collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListNameFormatGOsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_12&#124;error`

**Sample code:**

```ballerina
Wrapper_12 result = check client->listNameFormatGOs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getNameFormatGO</summary>

<div>

Retrieves a single NameFormatGO entity identified by its key property.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetNameFormatGOQueries</code> | No | Queries to be sent with the request |

**Returns:** `NameFormatGO&#124;error`

**Sample code:**

```ballerina
NameFormatGO result = check client->getNameFormatGO(externalCode);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### NameElementGO

<details>
<summary>listNameElementGOs</summary>

<div>

Queries the NameElementGO collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListNameElementGOsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_13&#124;error`

**Sample code:**

```ballerina
Wrapper_13 result = check client->listNameElementGOs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "NameFormatGO_externalCode": "1000",
        "externalCode": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getNameElementGO</summary>

<div>

Retrieves a single NameElementGO entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `NameFormatGO_externalCode` | <code>string</code> | Yes | key: NameFormatGO_externalCode |
| `externalCode` | <code>string</code> | Yes | key: externalCode |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetNameElementGOQueries</code> | No | Queries to be sent with the request |

**Returns:** `NameElementGO&#124;error`

**Sample code:**

```ballerina
NameElementGO result = check client->getNameElementGO(NameFormatGO_externalCode, externalCode);
```

**Sample response:**

```json
{
  "NameFormatGO_externalCode": "1000",
  "externalCode": "1000"
}
```

</div>
</details>

#### PerBiographicalInfoLocBRA

<details>
<summary>listPerBiographicalInfoLocBRAs</summary>

<div>

Queries the PerBiographicalInfoLocBRA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerBiographicalInfoLocBRAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_14&#124;error`

**Sample code:**

```ballerina
Wrapper_14 result = check client->listPerBiographicalInfoLocBRAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerBiographicalInfoLocBRA</summary>

<div>

Retrieves a single PerBiographicalInfoLocBRA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerBiographicalInfoLocBRAQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerBiographicalInfoLocBRA&#124;error`

**Sample code:**

```ballerina
PerBiographicalInfoLocBRA result = check client->getPerBiographicalInfoLocBRA(country, personIdExternal);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### PerBiographicalInfoLocCHL

<details>
<summary>listPerBiographicalInfoLocCHLs</summary>

<div>

Queries the PerBiographicalInfoLocCHL collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerBiographicalInfoLocCHLsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_15&#124;error`

**Sample code:**

```ballerina
Wrapper_15 result = check client->listPerBiographicalInfoLocCHLs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerBiographicalInfoLocCHL</summary>

<div>

Retrieves a single PerBiographicalInfoLocCHL entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerBiographicalInfoLocCHLQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerBiographicalInfoLocCHL&#124;error`

**Sample code:**

```ballerina
PerBiographicalInfoLocCHL result = check client->getPerBiographicalInfoLocCHL(country, personIdExternal);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

#### PerBiographicalInfoLocFRA

<details>
<summary>listPerBiographicalInfoLocFRAs</summary>

<div>

Queries the PerBiographicalInfoLocFRA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerBiographicalInfoLocFRAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_16&#124;error`

**Sample code:**

```ballerina
Wrapper_16 result = check client->listPerBiographicalInfoLocFRAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerBiographicalInfoLocFRA</summary>

<div>

Retrieves a single PerBiographicalInfoLocFRA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerBiographicalInfoLocFRAQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerBiographicalInfoLocFRA&#124;error`

**Sample code:**

```ballerina
PerBiographicalInfoLocFRA result = check client->getPerBiographicalInfoLocFRA(country, personIdExternal);
```

**Sample response:**

```json
{
  "country": "string",
  "personIdExternal": "1000"
}
```

</div>
</details>

#### PerBiographicalInfoLocITA

<details>
<summary>listPerBiographicalInfoLocITAs</summary>

<div>

Queries the PerBiographicalInfoLocITA collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerBiographicalInfoLocITAsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_17&#124;error`

**Sample code:**

```ballerina
Wrapper_17 result = check client->listPerBiographicalInfoLocITAs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "country": "string",
        "personIdExternal": "1000"
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerBiographicalInfoLocITA</summary>

<div>

Retrieves a single PerBiographicalInfoLocITA entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerBiographicalInfoLocITAQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerBiographicalInfoLocITA&#124;error`

**Sample code:**

```ballerina
PerBiographicalInfoLocITA result = check client->getPerBiographicalInfoLocITA(country, personIdExternal);
```

**Sample response:**

```json
{
  "country": "string",
  "personIdExternal": "1000"
}
```

</div>
</details>

#### PerBiographicalInfoLocVEN

<details>
<summary>listPerBiographicalInfoLocVENs</summary>

<div>

Queries the PerBiographicalInfoLocVEN collection and returns a page of entities, optionally filtered, sorted, and paged via OData query options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>ListPerBiographicalInfoLocVENsQueries</code> | No | Queries to be sent with the request |

**Returns:** `Wrapper_18&#124;error`

**Sample code:**

```ballerina
Wrapper_18 result = check client->listPerBiographicalInfoLocVENs();
```

**Sample response:**

```json
{
  "d": {
    "results": [
      {
        "d": {}
      }
    ]
  }
}
```

</div>
</details>

<details>
<summary>getPerBiographicalInfoLocVEN</summary>

<div>

Retrieves a single PerBiographicalInfoLocVEN entity identified by its key properties.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `country` | <code>string</code> | Yes | key: country |
| `personIdExternal` | <code>string</code> | Yes | key: personIdExternal |
| `headers` | <code>map&#60;string&#124;string[]&#62;</code> | No | Headers to be sent with the request |
| `queries` | <code>GetPerBiographicalInfoLocVENQueries</code> | No | Queries to be sent with the request |

**Returns:** `PerBiographicalInfoLocVEN&#124;error`

**Sample code:**

```ballerina
PerBiographicalInfoLocVEN result = check client->getPerBiographicalInfoLocVEN(country, personIdExternal);
```

**Sample response:**

```json
{
  "d": {}
}
```

</div>
</details>

