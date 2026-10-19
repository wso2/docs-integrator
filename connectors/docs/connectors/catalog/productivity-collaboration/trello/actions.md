---
title: Actions
---

# Actions

The `ballerinax/trello` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Trello REST API: boards, lists, cards, members, labels, checklists, search, webhooks. |

---

## Client

Trello REST API: boards, lists, cards, members, labels, checklists, search, webhooks.

### Configuration

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `apiKeyConfig` | `ApiKeysConfig` | Required | API key and token configuration containing `key` and `token` fields. |
| `config` | `ConnectionConfig` | `{}` | HTTP client connection configuration. |
| `serviceUrl` | `string` | `"https://api.trello.com/1"` | Base URL for the Trello API. |

### Initializing the client

```ballerina
import ballerinax/trello;

configurable string apiKey = ?;
configurable string apiToken = ?;

trello:Client trello = check new ({
    key: apiKey,
    token: apiToken
});
```

### Operations

#### Boards

<details>
<summary>Get a Board</summary>

Retrieves a board by its Trello ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the board. |

Returns: `Board|error`

Sample code:

```ballerina
trello:Board board = check trello->/boards/[boardId];
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678901", "name": "My Project Board", "desc": "Board for tracking tasks", "closed": false, "url": "https://trello.com/b/abc123/my-project-board"}
```

</details>

<details>
<summary>Create Board</summary>

Creates a new board.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `PostBoardsQueries` | Yes | Query parameters including `name` (required), `defaultLabels`, `defaultLists`, `desc`, `idOrganization`, and more. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/boards.post(queries = {name: "New Project Board"});
```

</details>

<details>
<summary>Update a Board</summary>

Updates a board's properties such as name, description, or closed status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the board. |
| `queries` | `PutBoardsIdQueries` | No | Query parameters for fields to update. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/boards/[boardId].put(queries = {name: "Updated Board Name", desc: "New description"});
```

</details>

<details>
<summary>Delete a Board</summary>

Permanently deletes a board.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the board. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/boards/[boardId].delete();
```

</details>

<details>
<summary>Get Lists on a Board</summary>

Retrieves all lists on a board.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the board. |

Returns: `TrelloList[]|error`

Sample code:

```ballerina
trello:TrelloList[] lists = check trello->/boards/[boardId]/lists;
```

Sample response:

```ballerina
[{"id": "60d5f2c8e4b0a12345678902", "name": "To Do", "closed": false, "pos": 16384, "idBoard": "60d5f2c8e4b0a12345678901"}, {"id": "60d5f2c8e4b0a12345678903", "name": "In Progress", "closed": false, "pos": 32768, "idBoard": "60d5f2c8e4b0a12345678901"}]
```

</details>

<details>
<summary>Create a List on a Board</summary>

Creates a new list on a board.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the board. |
| `queries` | `PostBoardsIdListsQueries` | Yes | Query parameters including `name` (required) and `pos`. |

Returns: `TrelloList|error`

Sample code:

```ballerina
trello:TrelloList newList = check trello->/boards/[boardId]/lists.post(queries = {name: "Done"});
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678904", "name": "Done", "closed": false, "pos": 49152, "idBoard": "60d5f2c8e4b0a12345678901"}
```

</details>

<details>
<summary>Get the Members of a Board</summary>

Retrieves all members of a board.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the board. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/boards/[boardId]/members;
```

</details>

<details>
<summary>Get Labels on a Board</summary>

Retrieves all labels on a board.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the board. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/boards/[boardId]/labels;
```

</details>

<details>
<summary>Create a Label on a Board</summary>

Creates a new label on a board.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the board. |
| `queries` | `PostBoardsIdLabelsQueries` | Yes | Query parameters including `name` and `color`. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/boards/[boardId]/labels.post(queries = {name: "Urgent", color: "red"});
```

</details>

<details>
<summary>Get Custom Fields for Board</summary>

Retrieves all custom field definitions on a board.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the board. |

Returns: `CustomField[]|error`

Sample code:

```ballerina
trello:CustomField[] fields = check trello->/boards/[boardId]/customFields;
```

Sample response:

```ballerina
[{"id": "60d5f2c8e4b0a12345678910", "idModel": "60d5f2c8e4b0a12345678901", "name": "Priority", "type": "list", "pos": 1}]
```

</details>

#### Lists

<details>
<summary>Get a List</summary>

Retrieves a list by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the list. |

Returns: `TrelloList|error`

Sample code:

```ballerina
trello:TrelloList list = check trello->/lists/[listId];
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678902", "name": "To Do", "closed": false, "pos": 16384, "idBoard": "60d5f2c8e4b0a12345678901"}
```

</details>

<details>
<summary>Update a List</summary>

Updates a list's properties such as name, position, or closed status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the list. |
| `queries` | `PutListsIdQueries` | No | Query parameters for fields to update. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/lists/[listId].put(queries = {name: "Completed"});
```

</details>

<details>
<summary>Get Cards in a List</summary>

Retrieves all cards in a list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the list. |

Returns: `Card[]|error`

Sample code:

```ballerina
trello:Card[] cards = check trello->/lists/[listId]/cards;
```

Sample response:

```ballerina
[{"id": "60d5f2c8e4b0a12345678905", "name": "Design mockups", "desc": "Create UI mockups", "closed": false, "idList": "60d5f2c8e4b0a12345678902", "pos": 16384}]
```

</details>

<details>
<summary>Archive all Cards in a List</summary>

Archives all cards in the specified list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the list. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/lists/[listId]/archiveAllCards.post();
```

</details>

<details>
<summary>Move all Cards in a List</summary>

Moves all cards in a list to another board and/or list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the list. |
| `queries` | `PostListsIdMoveallcardsQueries` | Yes | Query parameters including target `idBoard` and `idList`. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/lists/[listId]/moveAllCards.post(queries = {idBoard: targetBoardId, idList: targetListId});
```

</details>

<details>
<summary>Get Board of a List</summary>

Retrieves the board that a list belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the list. |

Returns: `Board|error`

Sample code:

```ballerina
trello:Board board = check trello->/lists/[listId]/board;
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678901", "name": "My Project Board", "closed": false}
```

</details>

#### Cards

<details>
<summary>Create a new Card</summary>

Creates a new card on a specified list.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `PostCardsQueries` | Yes | Query parameters including `idList` (required), `name`, `desc`, `pos`, `due`, `idMembers`, `idLabels`, and more. |

Returns: `Card|error`

Sample code:

```ballerina
trello:Card card = check trello->/cards.post(queries = {
    idList: listId,
    name: "Implement login feature",
    desc: "Add OAuth 2.0 login support"
});
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678905", "name": "Implement login feature", "desc": "Add OAuth 2.0 login support", "closed": false, "idList": "60d5f2c8e4b0a12345678902", "url": "https://trello.com/c/xyz789"}
```

</details>

<details>
<summary>Get a Card</summary>

Retrieves a card by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |

Returns: `Card|error`

Sample code:

```ballerina
trello:Card card = check trello->/cards/[cardId];
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678905", "name": "Implement login feature", "desc": "Add OAuth 2.0 login support", "closed": false, "idList": "60d5f2c8e4b0a12345678902", "pos": 16384, "due": "2026-04-01T12:00:00.000Z"}
```

</details>

<details>
<summary>Update a Card</summary>

Updates a card's properties such as name, description, due date, or list assignment.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |
| `queries` | `PutCardsIdQueries` | No | Query parameters for fields to update. |

Returns: `Card|error`

Sample code:

```ballerina
trello:Card updated = check trello->/cards/[cardId].put(queries = {name: "Updated card name"});
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678905", "name": "Updated card name", "closed": false, "idList": "60d5f2c8e4b0a12345678902"}
```

</details>

<details>
<summary>Delete a Card</summary>

Permanently deletes a card.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |

Returns: `TrelloList|error`

Sample code:

```ballerina
_ = check trello->/cards/[cardId].delete();
```

</details>

<details>
<summary>Get Actions on a Card</summary>

Retrieves the actions (activity history) on a card.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |

Returns: `Action[]|error`

Sample code:

```ballerina
trello:Action[] actions = check trello->/cards/[cardId]/actions;
```

Sample response:

```ballerina
[{"id": "60d5f2c8e4b0a12345678920", "type": "updateCard", "date": "2026-03-15T10:30:00.000Z", "idMemberCreator": "60d5f2c8e4b0a12345678930"}]
```

</details>

<details>
<summary>Get Attachments on a Card</summary>

Retrieves all attachments on a card.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |

Returns: `InlineResponseItems2001[]|error`

Sample code:

```ballerina
trello:InlineResponseItems2001[] attachments = check trello->/cards/[cardId]/attachments;
```

Sample response:

```ballerina
[{"id": "60d5f2c8e4b0a12345678940", "name": "design.png", "url": "https://trello.com/1/cards/abc/attachments/xyz/download/design.png", "bytes": 204800}]
```

</details>

<details>
<summary>Create Attachment On Card</summary>

Creates an attachment on a card.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |
| `queries` | `PostCardsIdAttachmentsQueries` | No | Query parameters including `name`, `url`, `mimeType`. |

Returns: `InlineResponseItems2002[]|error`

Sample code:

```ballerina
trello:InlineResponseItems2002[] attachment = check trello->/cards/[cardId]/attachments.post(
    queries = {name: "Reference Doc", url: "https://example.com/doc.pdf"}
);
```

Sample response:

```ballerina
[{"id": "60d5f2c8e4b0a12345678941", "name": "Reference Doc", "url": "https://example.com/doc.pdf"}]
```

</details>

<details>
<summary>Add a new comment to a Card</summary>

Adds a comment to a card.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |
| `queries` | `PostCardsIdActionsCommentsQueries` | Yes | Query parameters including `text` (required). |

Returns: `Action|error`

Sample code:

```ballerina
trello:Action comment = check trello->/cards/[cardId]/actions/comments.post(
    queries = {text: "This task is now in review."}
);
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678950", "type": "commentCard", "date": "2026-03-17T08:00:00.000Z", "data": {"text": "This task is now in review."}}
```

</details>

<details>
<summary>Add a Label to a Card</summary>

Adds an existing label to a card.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |
| `queries` | `PostCardsIdIdlabelsQueries` | Yes | Query parameters including `value` (the label ID). |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/cards/[cardId]/idLabels.post(queries = {value: labelId});
```

</details>

<details>
<summary>Add a Member to a Card</summary>

Adds a member to a card.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |
| `queries` | `PostCardsIdIdmembersQueries` | Yes | Query parameters including `value` (the member ID). |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/cards/[cardId]/idMembers.post(queries = {value: memberId});
```

</details>

<details>
<summary>Get Custom Field Items for a Card</summary>

Retrieves all custom field values set on a card.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |

Returns: `CustomFieldItems[]|error`

Sample code:

```ballerina
trello:CustomFieldItems[] items = check trello->/cards/[cardId]/customFieldItems;
```

Sample response:

```ballerina
[{"id": "60d5f2c8e4b0a12345678960", "idCustomField": "60d5f2c8e4b0a12345678910", "idModel": "60d5f2c8e4b0a12345678905", "value": {"text": "High"}}]
```

</details>

#### Checklists

<details>
<summary>Create a Checklist</summary>

Creates a new checklist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `PostChecklistsQueries` | Yes | Query parameters including `idCard` (required), `name`, `pos`, `idChecklistSource`. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/checklists.post(queries = {idCard: cardId, name: "Launch Checklist"});
```

</details>

<details>
<summary>Get a Checklist</summary>

Retrieves a checklist by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the checklist. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/checklists/[checklistId];
```

</details>

<details>
<summary>Get Checkitems on a Checklist</summary>

Retrieves all check items on a checklist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the checklist. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/checklists/[checklistId]/checkItems;
```

</details>

<details>
<summary>Create Checkitem on Checklist</summary>

Creates a new check item on a checklist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the checklist. |
| `queries` | `PostChecklistsIdCheckitemsQueries` | Yes | Query parameters including `name` (required), `pos`, `checked`. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/checklists/[checklistId]/checkItems.post(queries = {name: "Write unit tests"});
```

</details>

<details>
<summary>Delete Checkitem from Checklist</summary>

Deletes a check item from a checklist.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the checklist. |
| `idCheckItem` | `TrelloID` | Yes | The ID of the check item. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/checklists/[checklistId]/checkItems/[checkItemId].delete();
```

</details>

#### Labels

<details>
<summary>Get a Label</summary>

Retrieves a label by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the label. |

Returns: `Label|error`

Sample code:

```ballerina
trello:Label label = check trello->/labels/[labelId];
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678970", "name": "Urgent", "color": "red", "idBoard": "60d5f2c8e4b0a12345678901"}
```

</details>

<details>
<summary>Update a Label</summary>

Updates a label's name or color.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the label. |
| `queries` | `PutLabelsIdQueries` | No | Query parameters for fields to update. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/labels/[labelId].put(queries = {name: "Critical", color: "red"});
```

</details>

<details>
<summary>Delete a Label</summary>

Deletes a label.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the label. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/labels/[labelId].delete();
```

</details>

#### Members

<details>
<summary>Get a Member</summary>

Retrieves a member by their ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the member. |

Returns: `Member|error`

Sample code:

```ballerina
trello:Member member = check trello->/members/[memberId];
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678930", "fullName": "Jane Smith", "username": "janesmith", "email": "jane@example.com"}
```

</details>

<details>
<summary>Get Member (authenticated)</summary>

Retrieves the authenticated member's profile.

Returns: `Member|error`

Sample code:

```ballerina
trello:Member me = check trello->/members/me;
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678930", "fullName": "Jane Smith", "username": "janesmith", "email": "jane@example.com"}
```

</details>

<details>
<summary>Get Boards a Member belongs to</summary>

Retrieves all boards a member belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the member. |

Returns: `Board[]|error`

Sample code:

```ballerina
trello:Board[] boards = check trello->/members/[memberId]/boards;
```

Sample response:

```ballerina
[{"id": "60d5f2c8e4b0a12345678901", "name": "My Project Board", "closed": false}]
```

</details>

<details>
<summary>Get Cards a Member is on</summary>

Retrieves all cards assigned to a member.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the member. |

Returns: `Card[]|error`

Sample code:

```ballerina
trello:Card[] cards = check trello->/members/[memberId]/cards;
```

Sample response:

```ballerina
[{"id": "60d5f2c8e4b0a12345678905", "name": "Implement login feature", "idList": "60d5f2c8e4b0a12345678902"}]
```

</details>

<details>
<summary>Get Member's Organizations</summary>

Retrieves all organizations a member belongs to.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the member. |

Returns: `Organization[]|error`

Sample code:

```ballerina
trello:Organization[] orgs = check trello->/members/[memberId]/organizations;
```

Sample response:

```ballerina
[{"id": "60d5f2c8e4b0a12345678980", "name": "myteam", "displayName": "My Team"}]
```

</details>

#### Organizations

<details>
<summary>Get an Organization</summary>

Retrieves an organization (workspace) by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the organization. |

Returns: `Organization|error`

Sample code:

```ballerina
trello:Organization org = check trello->/organizations/[orgId];
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678980", "name": "myteam", "displayName": "My Team", "desc": "Our development team workspace"}
```

</details>

<details>
<summary>Get Boards of Organization</summary>

Retrieves all boards belonging to an organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the organization. |

Returns: `Board[]|error`

Sample code:

```ballerina
trello:Board[] boards = check trello->/organizations/[orgId]/boards;
```

Sample response:

```ballerina
[{"id": "60d5f2c8e4b0a12345678901", "name": "My Project Board", "closed": false, "idOrganization": "60d5f2c8e4b0a12345678980"}]
```

</details>

<details>
<summary>Get Members of Organization</summary>

Retrieves all members of an organization.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the organization. |

Returns: `Member[]|error`

Sample code:

```ballerina
trello:Member[] members = check trello->/organizations/[orgId]/members;
```

Sample response:

```ballerina
[{"id": "60d5f2c8e4b0a12345678930", "fullName": "Jane Smith", "username": "janesmith"}]
```

</details>

#### Actions

<details>
<summary>Get a specific field on an Action</summary>

Retrieves a specific field on an action.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the action. |
| `field` | `ActionFields` | Yes | The field to retrieve. |

Returns: `Action|error`

Sample code:

```ballerina
trello:Action action = check trello->/actions/[actionId]/data;
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678920", "type": "commentCard", "date": "2026-03-17T08:00:00.000Z"}
```

</details>

<details>
<summary>Update a Comment Action</summary>

Updates the text of a comment action.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the action. |
| `queries` | `PutActionsIdTextQueries` | Yes | Query parameters including `value` (the new comment text). |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/actions/[actionId]/text.put(queries = {value: "Updated comment text"});
```

</details>

<details>
<summary>Delete an Action</summary>

Deletes an action (only works for comment actions).

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the action. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/actions/[actionId].delete();
```

</details>

<details>
<summary>Get the Board for an Action</summary>

Retrieves the board associated with an action.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the action. |

Returns: `Board|error`

Sample code:

```ballerina
trello:Board board = check trello->/actions/[actionId]/board;
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678901", "name": "My Project Board"}
```

</details>

#### Search

<details>
<summary>Search Trello</summary>

Searches for boards, cards, members, and organizations matching a query.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetSearchQueries` | Yes | Query parameters including `query` (required), `modelTypes`, `idBoards`, `idOrganizations`, and more. |

Returns: `InlineResponse2001|error`

Sample code:

```ballerina
trello:InlineResponse2001 results = check trello->/search(queries = {query: "login feature"});
```

Sample response:

```ballerina
{"cards": [{"id": "60d5f2c8e4b0a12345678905", "name": "Implement login feature"}], "boards": [], "organizations": []}
```

</details>

<details>
<summary>Search Members</summary>

Searches for Trello members by name or username.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetSearchMembersQueries` | Yes | Query parameters including `query` (required), `limit`, `idBoard`, `idOrganization`. |

Returns: `Member[]|error`

Sample code:

```ballerina
trello:Member[] members = check trello->/search/members(queries = {query: "jane"});
```

Sample response:

```ballerina
[{"id": "60d5f2c8e4b0a12345678930", "fullName": "Jane Smith", "username": "janesmith"}]
```

</details>

#### Webhooks

<details>
<summary>Create Webhook</summary>

Creates a new webhook for receiving callbacks on model changes.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `WebhooksBody` | Yes | Request body with `callbackURL`, `idModel`, `description`, and `active` fields. |

Returns: `Webhook|error`

Sample code:

```ballerina
trello:Webhook webhook = check trello->/webhooks.post({
    callbackURL: "https://myapp.example.com/trello/webhook",
    idModel: boardId,
    description: "Board change notifications"
});
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678990", "description": "Board change notifications", "idModel": "60d5f2c8e4b0a12345678901", "callbackURL": "https://myapp.example.com/trello/webhook", "active": true}
```

</details>

<details>
<summary>Get a Webhook</summary>

Retrieves a webhook by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the webhook. |

Returns: `Webhook|error`

Sample code:

```ballerina
trello:Webhook webhook = check trello->/webhooks/[webhookId];
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678990", "description": "Board change notifications", "idModel": "60d5f2c8e4b0a12345678901", "callbackURL": "https://myapp.example.com/trello/webhook", "active": true}
```

</details>

<details>
<summary>Update Webhook</summary>

Updates a webhook's callback URL, model, or active status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the webhook. |
| `payload` | `WebhooksIdBody` | Yes | Request body with fields to update. |

Returns: `Webhook|error`

Sample code:

```ballerina
trello:Webhook updated = check trello->/webhooks/[webhookId].put({
    description: "Updated webhook",
    active: false
});
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678990", "description": "Updated webhook", "active": false}
```

</details>

<details>
<summary>Delete Webhook</summary>

Deletes a webhook.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the webhook. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/webhooks/[webhookId].delete();
```

</details>

#### Custom fields

<details>
<summary>Create a new Custom Field on a Board</summary>

Creates a new custom field definition on a board.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomFieldsBody` | Yes | Request body with custom field configuration. |

Returns: `CustomField|error`

Sample code:

```ballerina
trello:CustomField field = check trello->/customFields.post({
    idModel: boardId,
    modelType: "board",
    name: "Priority",
    'type: "list",
    pos: "bottom"
});
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678910", "idModel": "60d5f2c8e4b0a12345678901", "name": "Priority", "type": "list", "pos": 1}
```

</details>

<details>
<summary>Get a Custom Field</summary>

Retrieves a custom field definition by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the custom field. |

Returns: `CustomField|error`

Sample code:

```ballerina
trello:CustomField field = check trello->/customFields/[customFieldId];
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678910", "idModel": "60d5f2c8e4b0a12345678901", "name": "Priority", "type": "list"}
```

</details>

<details>
<summary>Delete a Custom Field definition</summary>

Deletes a custom field definition and removes it from all cards.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the custom field. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/customFields/[customFieldId].delete();
```

</details>

#### Notifications

<details>
<summary>Get a Notification</summary>

Retrieves a notification by its ID.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the notification. |

Returns: `Notification|error`

Sample code:

```ballerina
trello:Notification notif = check trello->/notifications/[notificationId];
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678995", "type": "addedToCard", "unread": true, "date": "2026-03-17T09:00:00.000Z"}
```

</details>

<details>
<summary>Update Notification</summary>

Updates a notification's read status.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the notification. |
| `queries` | `PutNotificationsIdQueries` | No | Query parameters including `unread`. |

Returns: `Notification|error`

Sample code:

```ballerina
trello:Notification notif = check trello->/notifications/[notificationId].put(queries = {unread: false});
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678995", "type": "addedToCard", "unread": false}
```

</details>

#### Tokens

<details>
<summary>Get a Token</summary>

Retrieves information about an API token.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tokenValue` | `string` | Yes | The token value. |

Returns: `Token|error`

Sample code:

```ballerina
trello:Token tokenInfo = check trello->/tokens/[apiToken];
```

Sample response:

```ballerina
{"id": "60d5f2c8e4b0a12345678998", "identifier": "Ballerina Connector", "idMember": "60d5f2c8e4b0a12345678930", "dateExpires": null}
```

</details>

<details>
<summary>Delete a Token</summary>

Revokes and deletes a token.

Parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tokenValue` | `string` | Yes | The token value. |

Returns: `error?`

Sample code:

```ballerina
_ = check trello->/tokens/[apiToken].delete();
```

</details>
