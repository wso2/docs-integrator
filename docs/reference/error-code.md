---
title: Error Code Reference
---

# Error Code Reference

This page catalogs common error codes and error types encountered when developing and running integrations with WSO2 Integrator. Errors are organized by category to help you quickly identify the source and resolution.

## HTTP Errors

These errors originate from `ballerina/http` client and server operations.

| Error Type | HTTP Status | Common Causes | Resolution |
|------------|-------------|---------------|------------|
| `http:ClientRequestError` | 4xx | Malformed request sent by the HTTP client | Verify the request URL, headers, and payload format. Check that path parameters and query strings are properly encoded. |
| `http:BadRequest` | 400 | Invalid request payload or missing required parameters | Validate the request body against the expected schema. Ensure all required fields are present. |
| `http:Unauthorized` | 401 | Missing or invalid authentication credentials | Verify that the `Authorization` header is present and contains a valid token or credential. Check token expiry. |
| `http:Forbidden` | 403 | Authenticated but insufficient permissions | Confirm the authenticated user or service account has the required roles or scopes. |
| `http:NotFound` | 404 | Resource does not exist at the requested URL | Check the URL path, verify the resource exists, and confirm the service is deployed. |
| `http:MethodNotAllowed` | 405 | HTTP method not supported for the endpoint | Verify the HTTP method (GET, POST, PUT, etc.) matches the resource function definition. |
| `http:PayloadTooLarge` | 413 | Request body exceeds the configured size limit | Increase the `maxEntityBodySize` in the listener configuration or reduce the payload size. |
| `http:InternalServerError` | 500 | Unhandled error in the service logic | Check application logs for the root cause. Ensure all `error` values are properly handled with `check` or `do/on fail`. |
| `http:ServiceUnavailable` | 503 | Backend service is down or circuit breaker is open | Verify the backend service is running. Check circuit breaker configuration and retry settings. |
| `http:ClientConnectorError` | -- | Unable to establish a connection to the remote host | Verify the target URL is correct and reachable. Check network connectivity, DNS resolution, and firewall rules. |
| `http:SslError` | -- | TLS/SSL handshake failure | Verify certificate validity, ensure the truststore contains the server's CA certificate, and confirm TLS version compatibility. |
| `http:IdleTimeoutError` | -- | Connection timed out waiting for a response | Increase the `timeout` setting on the HTTP client or investigate why the backend is slow. |
| `http:ApplicationResponseError` | varies | Non-2xx HTTP response from backend | Check `detail().statusCode` and handle specific status codes accordingly. |
| `http:ClientAuthError` | -- | Authentication failure at client level | Refresh credentials, check OAuth config, or verify token endpoint availability. |
| `http:CircuitBreakerError` | -- | Circuit breaker is in open state | Wait for the reset period. Check backend health and circuit breaker thresholds. |
| `http:NoContentError` | -- | No response body returned | Check that the endpoint returns the expected content type and body. |

## Database (SQL) Errors

These errors originate from `ballerina/sql` and database connector packages (`ballerinax/mysql`, `ballerinax/postgresql`, etc.).

| Error Type | Common Causes | Resolution |
|------------|---------------|------------|
| `sql:Error` | Base type for all SQL errors | Check the error message for specifics. Inspect `detail()` for SQL state and vendor code. |
| `sql:DatabaseError` | SQL syntax error, constraint violation, or database-level failure | Check the query syntax and data constraints. Verify the database schema matches expectations. |
| `sql:ApplicationError` | Type mismatch during result mapping or serialization | Ensure the Ballerina record type matches the database column types and names. |
| `sql:NoRowsError` | `queryRow` returned no results | Handle the empty result case. Use `queryRow` with a union return type (e.g., `Order?`) or catch this error explicitly. |
| `sql:DuplicateKeyError` | INSERT violated a unique constraint | Check for existing records before inserting, or use `ON DUPLICATE KEY UPDATE` / `ON CONFLICT`. |
| `sql:ConnectionError` | Cannot connect to the database server | Verify the host, port, credentials, and database name. Ensure the database server is running and accessible. |
| `sql:PoolError` | Connection pool exhausted | Increase `maxOpenConnections` in the client configuration, or investigate connection leaks (unclosed clients). |
| `sql:BatchExecuteError` | One or more statements in a batch operation failed | Inspect the `detail()` record for per-statement error information. |

## Connector Errors

These errors occur when communicating with external systems through Ballerina connectors.

| Error Type | Common Causes | Resolution |
|------------|---------------|------------|
| `kafka:Error` | Broker unreachable, topic not found, serialization failure | Verify broker addresses, topic existence, and serializer/deserializer configuration. Check broker logs. |
| `rabbitmq:Error` | Connection refused, queue or exchange not found | Verify RabbitMQ connection parameters (host, port, credentials). Ensure the exchange and queue exist. |
| `email:Error` | SMTP authentication failure, invalid recipient | Verify mail server settings, credentials, and port. Ensure TLS is configured correctly for the mail server. |
| `ftp:Error` | FTP/SFTP authentication failure, path not found | Verify host, port, credentials, and file paths. Check server permissions for the target directory. |
| `grpc:Error` | gRPC call failure, deadline exceeded, unavailable | Verify the service URL, proto definition compatibility, and TLS configuration. |
| `graphql:Error` | Query syntax error, field name mismatch | Check the query syntax, field names, and variable types against the schema. |
| `websocket:Error` | Connection upgrade failure, message send failure | Verify the WebSocket URL and ensure the server supports WebSocket protocol upgrade. |
| `mqtt:Error` | Broker connection failure, subscription error | Verify broker URL, client ID uniqueness, and topic filter syntax. |

## Build and Compilation Errors

These errors appear during `bal build` or `bal run`.

| Error Pattern | Common Causes | Resolution |
|---------------|---------------|------------|
| `error: incompatible types` | Assigning a value to a variable of an incompatible type | Check the type of the expression and the target variable. Use type conversion or type guard. |
| `error: unreachable code` | Code after a `return`, `panic`, or guaranteed branch | Remove or restructure the unreachable code. |
| `error: undefined module` | Importing a module that is not in dependencies | Run `bal build` to auto-resolve, or add the dependency to `Ballerina.toml`. |
| `error: undefined symbol` | Using a variable or function that is not declared | Check spelling, import the correct module, or declare the symbol. |
| `error: missing required configurable` | A configurable variable with no default (`= ?`) is not provided | Supply the value in `Config.toml`, via environment variables, or as a command-line argument. |
| `error: cyclic dependency` | Two or more modules depend on each other | Refactor to break the circular dependency. Extract shared types into a separate module. |
| `error: ambiguous type` | The compiler cannot infer the type in a given context | Add an explicit type annotation to resolve the ambiguity. |
| `error: listener startup failed` | Port already in use or TLS configuration error | Check port availability and verify certificate file paths. |
| `PANIC: ...` | Unrecoverable runtime error | Check the panic message. Usually caused by configuration or initialization failure. |

## Configuration Errors

These errors occur when providing values to configurable variables.

| Error Pattern | Common Causes | Resolution |
|---------------|---------------|------------|
| `configurable variable not found` | TOML key does not match any `configurable` declaration | Check the variable name and module qualifier in `Config.toml`. |
| `invalid TOML value` | TOML value type does not match the Ballerina type | Ensure the TOML value matches the expected type (e.g., integer literal for an `int` configurable). |
| `missing required configurable` | A required configurable variable (`= ?`) has no value | Provide the value through `Config.toml`, `BAL_CONFIG_DATA`, `BAL_CONFIG_VAR_*`, or `-C` flag. |
| `invalid config file path` | `BAL_CONFIG_FILES` points to a nonexistent file | Verify the file path exists and is readable. |

## Handling Errors in Code

Use Ballerina's `do`/`on fail` pattern to handle specific error types differently:

```ballerina
// Pattern: Handle specific errors differently
function callApi() returns json|error {
    do {
        return check apiClient->get("/data");
    } on fail http:IdleTimeoutError e {
        log:printWarn("Timeout, retrying...");
        return check apiClient->get("/data");
    } on fail http:ApplicationResponseError e {
        int status = e.detail().statusCode;
        if status == 404 {
            return {message: "Not found"};
        }
        return error("API error: HTTP " + status.toString());
    } on fail error e {
        log:printError("Unexpected error", 'error = e);
        return error("Service unavailable");
    }
}
```

## What's Next

- [Error Handling Guide](/docs/develop/design-logic/error-handling) -- Error handling patterns and best practices
- [Troubleshooting](/docs/reference/appendix/troubleshooting) -- Resolve common development issues
