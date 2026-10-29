---
title: Expression Panel
---

# Expression Panel

The Expression Panel is the inline value-input surface used throughout WSO2 Agent Builder wherever a field accepts an expression. It provides syntax highlighting, inline validation, and a UI that adapts to the type expected at the cursor, so you can supply values without remembering the full Ballerina syntax for each context.

You can recognize the panel by the `fx` icon next to a field. Selecting it opens the inline panel. The expand control opens the same panel in a larger view for longer expressions.

## Where the expression panel appears

The Expression Panel appears in every side panel and form that takes a value, including:

- Variable initializers in the **Declare Variable** panel.
- Arguments to function calls and connector remote functions.
- Conditions in **If** and **While** nodes.
- Default values for configurable variables.
- Any field marked with the `fx` icon.

<ThemedImage
    alt="The Declare Variable panel for the ticket variable of type SupportTicket, with the Expression field outlined. The field holds the record value, with ticketId, subject, description, MEDIUM, OPEN, and customer shown as chips."
    sources={{
        light: useBaseUrl('/img/editor/panels/expression-panel/declare-variable-panel-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/expression-panel/declare-variable-panel-v1.0.png'),
    }}
/>

## Helper pane

The helper pane is a side menu that lists everything you can drop into the current expression. It opens automatically when you start typing in the Expression Panel, and you can also open or close it manually using the helper pane toggle next to the field. The pane groups available items into four categories: **Inputs**, **Variables**, **Configurables**, and **Functions**. This grouping helps you locate the right reference without leaving the panel.

<ThemedImage
    alt="The cleared Ticket field of the summarizeTicket node, with the helper pane open below it listing Inputs, Variables, Configurables, and Functions."
    sources={{
        light: useBaseUrl('/img/editor/panels/expression-panel/helper-pane-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/expression-panel/helper-pane-v1.0.png'),
    }}
/>

### Inputs

Lists the parameters and inputs available to the current scope, such as service path parameters, payload fields, and function arguments. Selecting an input inserts a reference to it at the cursor.

### Variables

Lists every variable that is in scope at the cursor, together with its type. Use this category to insert a reference to a variable you have already declared in the flow.

### Configurables

Lists configurable variables defined for the project. Use this category when an expression should read a value supplied through `Config.toml` or the runtime configuration, instead of being hardcoded.

### Functions

Lists standard library functions and user-defined functions available for the current package. Selecting a function inserts a call template with placeholders for each parameter.

## User experience

### Suggestions

The Expression Panel offers context-aware suggestions as you type. Typing `.` after a variable opens a list of the methods, fields, and remote functions available on that variable's type. Selecting one inserts the call at the cursor. Suggestions are filtered by the expected type at the cursor, so only compatible options appear first.

<ThemedImage
    alt="The Email field of the isValidEmail node after typing customer., with a list that starts with the id, name, and email fields of the CustomerProfile record, followed by functions such as reduce and hasKey."
    sources={{
        light: useBaseUrl('/img/editor/panels/expression-panel/suggestions-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/expression-panel/suggestions-v1.0.png'),
    }}
/>

### Chips

Variables render as compact chips inside the expression, whether they are variables you declared, service inputs, configurables, or function parameters. Chips keep long expressions readable and let you click a reference to inspect or replace it without editing the surrounding text.

<ThemedImage
    alt="The summarizeTicket node panel, where the outlined Ticket field shows the ticket variable as a chip."
    sources={{
        light: useBaseUrl('/img/editor/panels/expression-panel/chips-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/expression-panel/chips-v1.0.png'),
    }}
/>

### Function parameter type suggestions

While you fill in the arguments of a function call, the panel suggests values that match the type of the parameter you're filling. For example, inside a call to `summarizeTicket`, which takes a `SupportTicket`, the `ticket` variable of type `SupportTicket` is the first suggestion. Each suggestion shows its type.

<ThemedImage
    alt="The Msg field of the log:printInfo node showing summarizeTicket(t), with suggestions for the ticket variable of type SupportTicket and the ticketId variable of type string."
    sources={{
        light: useBaseUrl('/img/editor/panels/expression-panel/function-parameter-type-suggestions-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/expression-panel/function-parameter-type-suggestions-v1.0.png'),
    }}
/>

### Diagnostics

The panel validates the expression as you type and reports problems inline beneath the field. Diagnostics cover issues such as missing required arguments, incompatible types, undefined references, and syntax errors, so you can correct the value before saving the form.

<ThemedImage
    alt="The Msg field showing summarizeTicket(), with an inline error for the missing ticket parameter."
    sources={{
        light: useBaseUrl('/img/editor/panels/expression-panel/diagnostics-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/expression-panel/diagnostics-v1.0.png'),
    }}
/>

## Variations

The Expression Panel adapts its UI to the type expected at the cursor. The following variations cover the common cases.

### How a variation produces its value

Each variation contributes its value to the generated Ballerina code in a slightly different way:

- **Text mode** wraps the value in a Ballerina template string (`` string `...` ``) and inserts variables as `${variable}` interpolations.
- **SQL mode** wraps the value in a SQL template (`` sql `...` ``) and likewise inserts variables as `${variable}` interpolations so they bind as parameters.
- **Number**, **Boolean**, **Array**, **Record**, **Union**, **Nested**, **Select**, and **Prompt** insert the value exactly as shown in the panel, with no template wrapping.

Avoid switching the field between **Text** and **Expression** while you have a value in progress. The helper pane suggestions are tuned to the current mode, so values that were inserted in one mode (for example, an interpolated chip from Text mode) can produce unexpected output once the mode changes. Pick the mode first, then fill the value.

If you change the field's type after the expression has already been filled, the existing value can cause a validation failure because the panel still holds the previous variation's content. Update the value to match the new type, or clear the field to reset the panel and pick up the variation and helper pane suggestions for the new type.

### Switching the variation

Most fields support more than one variation. The current variation is shown by the toggle at the top right of the field (for example, **Record / Expression** for a record-typed field, or **Text / Expression** for a `string`-typed field). Select the toggle to switch between the form-style variation and free-form expression entry. For instance, a record field can be filled through the Record Configuration form, or, after switching to **Expression**, written directly as a record literal.

<ThemedImage
    alt="The Record and Expression toggle at the top right of the Expression field of the ticket variable, outlined."
    sources={{
        light: useBaseUrl('/img/editor/panels/expression-panel/variation-toggle-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/expression-panel/variation-toggle-v1.0.png'),
    }}
/>

### Text mode

Appears when the expected type is `string`. Provides string-literal entry with support for template strings and variable interpolation. When you insert a variable from the helper pane, it is added as `${variable}` so the value is interpolated into the surrounding text. Inserting the same variable from the **Expression** toggle drops the bare reference instead, with no `${ }` wrapper.

### Number

Appears for `int`, `float`, and `decimal` fields. Accepts numeric literals or numeric expressions and validates the value against the expected numeric type.

### Boolean

Appears for `boolean` fields. The panel renders a dropdown listing `true` and `false`, so you can pick the value without typing it. Switch to the **Expression** toggle if you need to supply a boolean expression instead of a literal.

### Array mode

Appears when the expected type is an array. You can add, reorder, and remove elements as discrete rows instead of editing one long literal, and each row uses the variation that matches the array's element type.

### Record mode

Appears when the expected type is a record. Select the field to open the **Record Configuration** editor, which lists every field of the record on the left and shows the resulting record expression on the right, so you can fill the record without writing braces or field names by hand. Each field uses the variation that matches its type, and any field can be excluded from the literal by clearing its checkbox.

For example, the following record type:

```ballerina
type TicketUpdate record {|
    int|string ticketRef;
    string[] tags;
    record {| string name; string email; |} assignee;
    boolean notifyCustomer;
|};
```

Renders in the Record Configuration editor as:

- `ticketRef` is a **union** of `int` and `string`. The panel shows a dropdown so you can pick which member type to supply, then accepts a value using that member's variation.
- `tags` is a `string[]` **array**. The panel shows an inline list with an **Add string** action so you can add elements one at a time, each using the Text variation.
- `assignee` is a **nested record**. The panel expands the inner record's fields directly inside the parent form, so the `name` and `email` fields of the inner record appear as `string` inputs under `assignee`.
- `notifyCustomer` is a **boolean**. Its value, `true` in this example, appears in the expression on the right.

<ThemedImage
    alt="The Record Configuration editor for TicketUpdate, with the ticketRef, tags, assignee, and notifyCustomer fields on the left and the resulting record expression on the right."
    sources={{
        light: useBaseUrl('/img/editor/panels/expression-panel/record-config-editor-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/expression-panel/record-config-editor-v1.0.png'),
    }}
/>

### Union mode

Appears when the expected type is a union. Prompts you to pick which member type to supply, then switches to that member's variation for the actual value.

### Nested variations

When types compose, for example a union of arrays, the panel nests the matching variations. You first pick the union member, and the panel then opens the corresponding inner variation (such as Array mode) for the selected type.

### Select

Appears for fields whose type is an enum or any other fixed set of values. The panel renders a dropdown listing every member of the type, so you can pick a valid value without recalling its exact spelling.

### SQL

Appears when you author SQL queries, for example in database connector parameters. The panel provides SQL-aware highlighting and lets you bind variables as query parameters. Variables you insert from the helper pane are added as `${variable}` interpolations inside the `` sql `...` `` template, which the database connector then binds as prepared-statement parameters. Inserting the same variable from the **Expression** toggle drops a bare reference instead.

### Prompt

Appears for fields that take a natural-language prompt, such as an agent's **Role** and **Instructions**. These fields show a **Prompt / Expression** toggle and support inserting variables as chips so prompt templates remain readable. For longer prompts, select **Open in Prompt Editor** below the field. The prompt editor accepts Markdown formatting (headings, bold, italics, lists, links, tables, and quotes) through a built-in toolbar, and you can switch between the rendered **Preview** and the raw **Source** view from the same toolbar. The toolbar also has an **Enhance Prompt with AI** action.

<ThemedImage
    alt="The Instructions prompt editor, with a toolbar (Insert, undo, redo, bold, italic, link, heading, quote, lists, table, and Enhance Prompt with AI) and Preview and Source tabs, showing a prompt where customer support assistant is in bold."
    sources={{
        light: useBaseUrl('/img/editor/panels/expression-panel/prompt-v1.0.png'),
        dark: useBaseUrl('/img/editor/panels/expression-panel/prompt-v1.0.png'),
    }}
/>

## What's next

- [Flow Canvas](../canvases/flow-canvas/flow-canvas.md): author expressions in flow nodes such as conditions, variable declarations, and function calls.
- [Data Mapper](../designers/data-mapper.md): use expressions to transform and map individual fields.
- [Type Panel](type-panel.md): define the types that determine which expression variation appears for a field.
