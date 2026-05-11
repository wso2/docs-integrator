---
title: Control
---

# Control

The **Control** section of the node panel shapes the path the flow takes. Use it to branch on a condition, dispatch on a pattern, repeat steps, iterate over a collection, or return a value to the caller. Every form in this section accepts Ballerina expressions; author them with assistance from the [Expression editor](../expression-editor.md).

## If

Branches the flow on a Boolean condition and runs the matching block. Add **Else If** blocks for additional conditions and an **Else** block for a fallback path when none of the conditions match.

![If button in the Control section](/img/develop/flow-design-elements/if-node.png)

| Field | Description |
|---|---|
| **Condition** | Boolean condition. |

The form provides **Add Else IF Block** and **Add Else Block** to extend the branch.

![If form with Condition field and Add Else IF Block and Add Else Block actions](/img/develop/flow-design-elements/if-form.png)

## Match

Matches a value against one or more patterns and runs the steps under the first matching pattern. Use **Match** instead of a chain of **If/Else If** blocks when dispatching on a finite set of values or shapes.

![Match button in the Control section](/img/develop/flow-design-elements/match-node.png)

| Field | Description |
|---|---|
| **Target** | Match target expression. |
| **Pattern 1** | Binding pattern that the target is matched against. |

The form provides **Add Case Block** to add more patterns and **Add Default Case Block** for a fallback that runs when no pattern matches.

![Match form with Target and Pattern fields](/img/develop/flow-design-elements/match-form.png)

## While

Loops over a block of code as long as a Boolean condition holds. The condition is evaluated before each iteration; the loop ends when it becomes `false`.

![While button in the Control section](/img/develop/flow-design-elements/while-node.png)

| Field | Description |
|---|---|
| **Condition** | Boolean condition. |

![While form with Condition field](/img/develop/flow-design-elements/while-form.png)

## Foreach

Iterates over a block of code for each item in a collection. Use it for arrays, query results, ranges, and any other iterable value.

![Foreach button in the Control section](/img/develop/flow-design-elements/for-each-node.png)

| Field | Description |
|---|---|
| **Collection** | Collection to iterate. |
| **Variable Name** | Name of the loop variable bound to each element. |
| **Variable Type** | Type of the loop variable. Define new types inline with the [Type editor](../type-editor.md). |

![Foreach form with Collection, Variable Name, and Variable Type fields](/img/develop/flow-design-elements/for-each-form.png)

## Return

Ends the current function or service flow and produces a value to the caller. The operation has no required parameters; the optional **Expression** field configures the value to return.

![Return button in the Control section](/img/develop/flow-design-elements/return-node.png)

| Field | Description |
|---|---|
| **Expression** | Return value. Leave it empty for `()` returns. |

![Return form with Expression field](/img/develop/flow-design-elements/return-form.png)

## What's next

- [Statement](./statement) — Variables, function calls, and data mapping.
- [Error handling](./error-handling) — Catch errors and raise failures inside branches.
- [Concurrency](./concurrency) — Fork, wait, and lock for parallel work.
- [Expression editor](../expression-editor) — Author Ballerina expressions with autocomplete and validation.
