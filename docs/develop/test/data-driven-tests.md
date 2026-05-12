---
title: Data-driven tests
---

# Data-driven tests

A data-driven test decouples the test logic from the test data. Instead of writing a separate test function for each input combination, you write one function and point it at a data provider — a function that returns a collection of input sets. The framework calls the test function once per set, passing each row as arguments.

Set the `dataProvider` field in `@test:Config` to the name of the provider function.

## Map data provider

Use a map when you want each case to have a meaningful name that appears in the test output and can be targeted individually on the command line. The map key is the case identifier and the map value is a tuple of the parameters the test function expects. The data provider can return an `error` to signal a problem with the data set.

```ballerina
import ballerina/test;

@test:Config {
    dataProvider: discountDataProvider
}
function testDiscountCalculation(decimal originalPrice, decimal discountPct, decimal expectedFinal) returns error? {
    decimal discounted = originalPrice * (1 - discountPct / 100);
    test:assertEquals(discounted, expectedFinal, msg = "Discount calculation is incorrect");
}

function discountDataProvider() returns map<[decimal, decimal, decimal]>|error {
    return {
        "ten-percent":    [100.0d, 10.0d, 90.0d],
        "half-price":     [200.0d, 50.0d, 100.0d],
        "no-discount":    [50.0d,  0.0d,  50.0d]
    };
}
```

Output:

```
Running Tests

    dataproviders

        3 passing
        0 failing
        0 skipped
```

Each case name appears in the output, so failures are immediately traceable to a specific scenario rather than an opaque index.

## List data provider

Use a list when the cases are a series of equivalent inputs and names would add little value. Cases are identified by their zero-based index.

```ballerina
import ballerina/test;

@test:Config {
    dataProvider: additionDataProvider
}
function testAddition(string a, string b, string expected) returns error? {
    int x = check int:fromString(a);
    int y = check int:fromString(b);
    int result = check int:fromString(expected);
    test:assertEquals(x + y, result, msg = "Addition result is wrong");
}

function additionDataProvider() returns string[][] {
    return [
        ["1",  "2",  "3"],
        ["10", "20", "30"],
        ["5",  "6",  "11"]
    ];
}
```

Output:

```
Running Tests

    dataproviders

        3 passing
        0 failing
        0 skipped
```

## Run a specific case

Running the entire data set during development is slow when you only care about one failing case. Target a specific case by appending `#` and the identifier to the test function name.

For map data sets, use the key in double quotes:

```
bal test --tests testDiscountCalculation#"half-price"
```

Output:

```
Running Tests

    dataproviders

        1 passing
        0 failing
        0 skipped
```

For list data sets, use the zero-based index:

```
bal test --tests testAddition#1
```

Output:

```
Running Tests

    dataproviders

        1 passing
        0 failing
        0 skipped
```

Use the `*` wildcard to run all cases whose key matches a pattern:

```
bal test --tests testDiscountCalculation#"*-percent"
```

## What's next

- [Test groups](groups.md) — partition tests into named groups and run or skip subsets
- [Execute tests](execute-tests.md) — full CLI reference for filtering, rerunning, and parallel execution
