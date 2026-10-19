---
title: Actions
---

# Actions

The `ballerinax/twitter` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Provides access to Twitter API v2 endpoints: tweets, users, DMs, bookmarks, likes, lists, and more. |

---

## Client

Provides access to Twitter API v2 endpoints: tweets, users, DMs, bookmarks, likes, lists, and more.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `auth` | `http:BearerTokenConfig\|OAuth2RefreshTokenGrantConfig` | Required | OAuth 2.0 bearer token or refresh token grant configuration. |
| `httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version to use. |
| `timeout` | `decimal` | `60` | Request timeout in seconds. |
| `retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the client

```ballerina
import ballerinax/twitter;

configurable string token = ?;

twitter:Client twitter = check new ({
    auth: {
        token: token
    }
});
```

### Operations

#### Tweet operations

<details>
<summary>Create a Tweet</summary>

Creates a new tweet on behalf of the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `TweetCreateRequest` | Yes | The tweet content including `text` and optional fields like `reply`, `media`, `poll`, and `quote_tweet_id`. |

Returns: `TweetCreateResponse|error`

Sample code:

```ballerina
twitter:TweetCreateResponse result = check twitter->/tweets.post(
    payload = {
        text: "Hello from Ballerina!"
    }
);
```

Sample response:

```ballerina
{
  "data": {
    "id": "1849041379283947520",
    "text": "Hello from Ballerina!"
  }
}
```

</details>

<details>
<summary>Delete a Tweet</summary>

Deletes a tweet owned by the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TweetId` | Yes | The ID of the tweet to delete. |

Returns: `TweetDeleteResponse|error`

Sample code:

```ballerina
twitter:TweetDeleteResponse result = check twitter->/tweets/["1849041379283947520"].delete();
```

Sample response:

```ballerina
{
  "data": {
    "deleted": true
  }
}
```

</details>

<details>
<summary>Retrieve a Tweet by ID</summary>

Returns the details of a single tweet specified by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TweetId` | Yes | The ID of the tweet to retrieve. |
| `tweet.fields` | `string[]?` | No | Comma-separated list of tweet fields to include (e.g., `created_at`, `public_metrics`). |
| `expansions` | `string[]?` | No | Expansions to include (e.g., `author_id`, `attachments.media_keys`). |

Returns: `Get2TweetsIdResponse|error`

Sample code:

```ballerina
twitter:Get2TweetsIdResponse result = check twitter->/tweets/["1849041379283947520"](
    tweet\.fields = ["created_at", "public_metrics", "author_id"]
);
```

Sample response:

```ballerina
{
  "data": {
    "id": "1849041379283947520",
    "text": "Hello from Ballerina!",
    "created_at": "2024-10-15T12:00:00.000Z",
    "author_id": "123456789",
    "public_metrics": {
      "retweet_count": 5,
      "reply_count": 2,
      "like_count": 15,
      "quote_count": 1
    }
  }
}
```

</details>

<details>
<summary>Search recent Tweets</summary>

Returns tweets from the last 7 days that match a search query.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `string` | Yes | The search query string (up to 512 characters). |
| `max_results` | `int?` | No | Maximum number of results per page (10–100, default 10). |
| `tweet.fields` | `string[]?` | No | Tweet fields to include in the response. |

Returns: `Get2TweetsSearchRecentResponse|error`

Sample code:

```ballerina
twitter:Get2TweetsSearchRecentResponse result = check twitter->/tweets/search/recent(
    query = "ballerina lang",
    max_results = 10,
    tweet\.fields = ["created_at", "public_metrics", "author_id"]
);
```

Sample response:

```ballerina
{
  "data": [
    {
      "id": "1849041379283947520",
      "text": "Ballerina makes integration easy!",
      "created_at": "2024-10-15T12:00:00.000Z",
      "author_id": "987654321",
      "public_metrics": {
        "retweet_count": 3,
        "reply_count": 1,
        "like_count": 10,
        "quote_count": 0
      }
    }
  ],
  "meta": {
    "newest_id": "1849041379283947520",
    "oldest_id": "1849041379283947520",
    "result_count": 1
  }
}
```

</details>

#### User operations

<details>
<summary>Retrieve a User by ID</summary>

Returns information about a user specified by their ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `UserId` | Yes | The ID of the user to look up. |
| `user.fields` | `string[]?` | No | User fields to include (e.g., `created_at`, `description`, `public_metrics`). |

Returns: `Get2UsersIdResponse|error`

Sample code:

```ballerina
twitter:Get2UsersIdResponse result = check twitter->/users/["123456789"](
    user\.fields = ["name", "username", "description", "public_metrics"]
);
```

Sample response:

```ballerina
{
  "data": {
    "id": "123456789",
    "name": "Ballerina Dev",
    "username": "ballerinadev",
    "description": "Official Ballerina developer account.",
    "public_metrics": {
      "followers_count": 5000,
      "following_count": 200,
      "tweet_count": 1500,
      "listed_count": 50
    }
  }
}
```

</details>

<details>
<summary>Retrieve a User by Username</summary>

Returns information about a user specified by their username (handle).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `username` | `string` | Yes | The Twitter username (without the `@` symbol). |
| `user.fields` | `string[]?` | No | User fields to include in the response. |

Returns: `Get2UsersByUsernameUsernameResponse|error`

Sample code:

```ballerina
twitter:Get2UsersByUsernameUsernameResponse result = check twitter->/users/by/username/["ballerinadev"](
    user\.fields = ["name", "description", "public_metrics", "profile_image_url"]
);
```

Sample response:

```ballerina
{
  "data": {
    "id": "123456789",
    "name": "Ballerina Dev",
    "username": "ballerinadev",
    "description": "Official Ballerina developer account.",
    "profile_image_url": "https://pbs.twimg.com/profile_images/.../photo.jpg",
    "public_metrics": {
      "followers_count": 5000,
      "following_count": 200,
      "tweet_count": 1500,
      "listed_count": 50
    }
  }
}
```

</details>

<details>
<summary>Retrieve the authenticated user</summary>

Returns information about the currently authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `user.fields` | `string[]?` | No | User fields to include in the response. |

Returns: `Get2UsersMeResponse|error`

Sample code:

```ballerina
twitter:Get2UsersMeResponse result = check twitter->/users/me(
    user\.fields = ["name", "username", "public_metrics"]
);
```

Sample response:

```ballerina
{
  "data": {
    "id": "123456789",
    "name": "My App User",
    "username": "myappuser",
    "public_metrics": {
      "followers_count": 150,
      "following_count": 300,
      "tweet_count": 500,
      "listed_count": 5
    }
  }
}
```

</details>

#### Follows

<details>
<summary>Follow a user</summary>

Causes the authenticated user to follow the target user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `UserId` | Yes | The ID of the authenticated user. |
| `payload` | `UsersFollowingCreateRequest` | Yes | Request body containing `target_user_id` to follow. |

Returns: `UsersFollowingCreateResponse|error`

Sample code:

```ballerina
twitter:UsersFollowingCreateResponse result = check twitter->/users/["123456789"]/following.post(
    payload = {
        target_user_id: "987654321"
    }
);
```

Sample response:

```ballerina
{
  "data": {
    "following": true,
    "pending_follow": false
  }
}
```

</details>

<details>
<summary>Get a user's followers</summary>

Returns a list of users who are followers of the specified user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `UserId` | Yes | The ID of the user whose followers to retrieve. |
| `max_results` | `int?` | No | Maximum number of results per page (1–1000, default 100). |

Returns: `Get2UsersIdFollowersResponse|error`

Sample code:

```ballerina
twitter:Get2UsersIdFollowersResponse result = check twitter->/users/["123456789"]/followers(
    max_results = 50
);
```

Sample response:

```ballerina
{
  "data": [
    {
      "id": "111111111",
      "name": "Jane Doe",
      "username": "janedoe"
    }
  ],
  "meta": {
    "result_count": 1,
    "next_token": "abc123"
  }
}
```

</details>

#### Likes

<details>
<summary>Like a Tweet</summary>

Causes the authenticated user to like the specified tweet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `UserId` | Yes | The ID of the authenticated user. |
| `payload` | `UsersLikesCreateRequest` | Yes | Request body containing `tweet_id` to like. |

Returns: `UsersLikesCreateResponse|error`

Sample code:

```ballerina
twitter:UsersLikesCreateResponse result = check twitter->/users/["123456789"]/likes.post(
    payload = {
        tweet_id: "1849041379283947520"
    }
);
```

Sample response:

```ballerina
{
  "data": {
    "liked": true
  }
}
```

</details>

<details>
<summary>Get tweets liked by a user</summary>

Returns tweets liked by the specified user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `UserId` | Yes | The ID of the user whose liked tweets to retrieve. |
| `max_results` | `int?` | No | Maximum number of results per page (10–100, default 10). |

Returns: `Get2UsersIdLikedTweetsResponse|error`

Sample code:

```ballerina
twitter:Get2UsersIdLikedTweetsResponse result = check twitter->/users/["123456789"]/liked_tweets(
    max_results = 20
);
```

Sample response:

```ballerina
{
  "data": [
    {
      "id": "1849041379283947520",
      "text": "Great Ballerina tutorial!"
    }
  ],
  "meta": {
    "result_count": 1
  }
}
```

</details>

#### Bookmarks

<details>
<summary>Bookmark a Tweet</summary>

Adds a tweet to the authenticated user's bookmarks.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `UserId` | Yes | The ID of the authenticated user. |
| `payload` | `BookmarkAddRequest` | Yes | Request body containing `tweet_id` to bookmark. |

Returns: `BookmarkMutationResponse|error`

Sample code:

```ballerina
twitter:BookmarkMutationResponse result = check twitter->/users/["123456789"]/bookmarks.post(
    payload = {
        tweet_id: "1849041379283947520"
    }
);
```

Sample response:

```ballerina
{
  "data": {
    "bookmarked": true
  }
}
```

</details>

<details>
<summary>Get bookmarked Tweets</summary>

Returns tweets bookmarked by the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `UserId` | Yes | The ID of the authenticated user. |
| `max_results` | `int?` | No | Maximum number of results per page (1–100). |

Returns: `Get2UsersIdBookmarksResponse|error`

Sample code:

```ballerina
twitter:Get2UsersIdBookmarksResponse result = check twitter->/users/["123456789"]/bookmarks(
    max_results = 25
);
```

Sample response:

```ballerina
{
  "data": [
    {
      "id": "1849041379283947520",
      "text": "Bookmark-worthy tweet!"
    }
  ],
  "meta": {
    "result_count": 1
  }
}
```

</details>

#### Direct messages

<details>
<summary>Send a DM in a one-to-one conversation</summary>

Creates a new DM in a one-to-one conversation with the specified user. If no conversation exists, one is created.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `participant_id` | `UserId` | Yes | The ID of the other participant. |
| `payload` | `CreateMessageRequest` | Yes | The message content including `text` and optional `attachments`. |

Returns: `CreateDmEventResponse|error`

Sample code:

```ballerina
twitter:CreateDmEventResponse result = check twitter->/dm_conversations/with/["987654321"]/messages.post(
    payload = {
        text: "Hello! Thanks for mentioning us."
    }
);
```

Sample response:

```ballerina
{
  "data": {
    "dm_conversation_id": "1234567890-9876543210",
    "dm_event_id": "1849099900000000001"
  }
}
```

</details>

<details>
<summary>Get DM events</summary>

Returns DM events for the authenticated user across all conversations.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `max_results` | `int?` | No | Maximum number of results per page (1–100, default 100). |
| `dm_event.fields` | `string[]?` | No | DM event fields to include (e.g., `created_at`, `sender_id`, `text`). |

Returns: `Get2DmEventsResponse|error`

Sample code:

```ballerina
twitter:Get2DmEventsResponse result = check twitter->/dm_events(
    max_results = 50,
    dm_event\.fields = ["created_at", "sender_id", "text"]
);
```

Sample response:

```ballerina
{
  "data": [
    {
      "id": "1849099900000000001",
      "event_type": "MessageCreate",
      "text": "Hello! Thanks for mentioning us.",
      "sender_id": "123456789",
      "created_at": "2024-10-15T14:00:00.000Z"
    }
  ],
  "meta": {
    "result_count": 1
  }
}
```

</details>

#### Retweets

<details>
<summary>Retweet a Tweet</summary>

Causes the authenticated user to retweet the specified tweet.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `UserId` | Yes | The ID of the authenticated user. |
| `payload` | `UsersRetweetsCreateRequest` | Yes | Request body containing `tweet_id` to retweet. |

Returns: `UsersRetweetsCreateResponse|error`

Sample code:

```ballerina
twitter:UsersRetweetsCreateResponse result = check twitter->/users/["123456789"]/retweets.post(
    payload = {
        tweet_id: "1849041379283947520"
    }
);
```

Sample response:

```ballerina
{
  "data": {
    "retweeted": true
  }
}
```

</details>

#### User timeline

<details>
<summary>Get a user's Tweets</summary>

Returns tweets composed by the specified user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `UserId` | Yes | The ID of the user whose tweets to retrieve. |
| `max_results` | `int?` | No | Maximum number of results per page (5–100, default 10). |
| `tweet.fields` | `string[]?` | No | Tweet fields to include in the response. |

Returns: `Get2UsersIdTweetsResponse|error`

Sample code:

```ballerina
twitter:Get2UsersIdTweetsResponse result = check twitter->/users/["123456789"]/tweets(
    max_results = 20,
    tweet\.fields = ["created_at", "public_metrics"]
);
```

Sample response:

```ballerina
{
  "data": [
    {
      "id": "1849041379283947520",
      "text": "Hello from Ballerina!",
      "created_at": "2024-10-15T12:00:00.000Z",
      "public_metrics": {
        "retweet_count": 5,
        "reply_count": 2,
        "like_count": 15,
        "quote_count": 1
      }
    }
  ],
  "meta": {
    "result_count": 1,
    "newest_id": "1849041379283947520",
    "oldest_id": "1849041379283947520"
  }
}
```

</details>

<details>
<summary>Get a user's mentions</summary>

Returns tweets that mention the specified user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `UserId` | Yes | The ID of the user whose mentions to retrieve. |
| `max_results` | `int?` | No | Maximum number of results per page (5–100, default 10). |
| `tweet.fields` | `string[]?` | No | Tweet fields to include in the response. |

Returns: `Get2UsersIdMentionsResponse|error`

Sample code:

```ballerina
twitter:Get2UsersIdMentionsResponse result = check twitter->/users/["123456789"]/mentions(
    max_results = 10,
    tweet\.fields = ["created_at", "author_id", "public_metrics"]
);
```

Sample response:

```ballerina
{
  "data": [
    {
      "id": "1849200000000000001",
      "text": "@myappuser Great integration tool!",
      "created_at": "2024-10-15T16:00:00.000Z",
      "author_id": "987654321",
      "public_metrics": {
        "retweet_count": 0,
        "reply_count": 0,
        "like_count": 3,
        "quote_count": 0
      }
    }
  ],
  "meta": {
    "result_count": 1
  }
}
```

</details>

#### Mutes & blocks

<details>
<summary>Mute a user</summary>

Causes the authenticated user to mute the specified target user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `UserId` | Yes | The ID of the authenticated user. |
| `payload` | `MuteUserRequest` | Yes | Request body containing `target_user_id` to mute. |

Returns: `MuteUserMutationResponse|error`

Sample code:

```ballerina
twitter:MuteUserMutationResponse result = check twitter->/users/["123456789"]/muting.post(
    payload = {
        target_user_id: "999999999"
    }
);
```

Sample response:

```ballerina
{
  "data": {
    "muting": true
  }
}
```

</details>

<details>
<summary>Block a user</summary>

Causes the authenticated user to block the specified target user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `UserId` | Yes | The ID of the authenticated user. |
| `payload` | `BlockUserRequest` | Yes | Request body containing `target_user_id` to block. |

Returns: `BlockUserMutationResponse|error`

Sample code:

```ballerina
twitter:BlockUserMutationResponse result = check twitter->/users/["123456789"]/blocking.post(
    payload = {
        target_user_id: "999999999"
    }
);
```

Sample response:

```ballerina
{
  "data": {
    "blocking": true
  }
}
```

</details>

#### Lists

<details>
<summary>Create a List</summary>

Creates a new list for the authenticated user.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `ListCreateRequest` | Yes | Request body containing `name`, optional `description`, and `private` flag. |

Returns: `ListCreateResponse|error`

Sample code:

```ballerina
twitter:ListCreateResponse result = check twitter->/lists.post(
    payload = {
        name: "Ballerina Developers",
        description: "A curated list of Ballerina developers",
        'private: false
    }
);
```

Sample response:

```ballerina
{
  "data": {
    "id": "1500000000000000001",
    "name": "Ballerina Developers"
  }
}
```

</details>

<details>
<summary>Get a List by ID</summary>

Returns the details of a specified list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `ListId` | Yes | The ID of the list to retrieve. |
| `list.fields` | `string[]?` | No | List fields to include (e.g., `created_at`, `member_count`, `description`). |

Returns: `Get2ListsIdResponse|error`

Sample code:

```ballerina
twitter:Get2ListsIdResponse result = check twitter->/lists/["1500000000000000001"](
    list\.fields = ["created_at", "member_count", "description"]
);
```

Sample response:

```ballerina
{
  "data": {
    "id": "1500000000000000001",
    "name": "Ballerina Developers",
    "description": "A curated list of Ballerina developers",
    "created_at": "2024-10-15T10:00:00.000Z",
    "member_count": 25
  }
}
```

</details>
