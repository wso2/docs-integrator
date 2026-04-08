---
sidebar_position: 2
title: Troubleshooting
description: Troubleshooting guide — common errors, strand dump tool, profiler usage, port conflicts, and dependency issues.
---

# Troubleshooting

This guide covers common issues encountered when developing, building, and running WSO2 Integrator projects powered by Ballerina, along with diagnostic tools and resolution steps.

## Common Build Errors

### Package Resolution Failures

**Symptom:** Build fails with "cannot resolve module" or "package not found" errors.

```
ERROR: cannot resolve module 'ballerinax/mysql:1.11.0'
```

**Causes and Solutions:**

| Cause | Solution |
|-------|----------|
| No internet connectivity | Check network connection; Ballerina Central requires HTTPS access |
| Incorrect module name or version | Verify the module name and version on [central.ballerina.io](https://central.ballerina.io) |
| Stale dependency cache | Delete `Dependencies.toml` and run `bal build` to re-resolve |
| Incompatible distribution version | Check `Ballerina.toml` for `distribution` field; use `bal dist use` to switch |
| Proxy configuration | Set `HTTP_PROXY` / `HTTPS_PROXY` environment variables |

```bash
# Force re-resolution of all dependencies
rm Dependencies.toml
bal build --sticky=false
```

### Type Checking Errors

**Symptom:** Compile errors related to type mismatches, incompatible types, or missing fields.

```
ERROR: incompatible types: expected 'string', found 'string?'
```

**Common Patterns:**

| Error Pattern | Cause | Solution |
|--------------|-------|----------|
| `expected 'T', found 'T?'` | Unhandled optional value | Use `check`, `is` type guard, or Elvis operator (`?:`) |
| `expected 'T', found 'T\|error'` | Unhandled error return | Use `check` or handle the error branch |
| `incompatible types: expected 'record' found 'map'` | Loose typing | Define explicit record types or use type casting |
| `missing required field 'X'` | Incomplete record literal | Add the required field to the record value |
| `undeclared field 'X'` | Closed record does not have the field | Add the field to the record type or use an open record |

### Compilation Performance

**Symptom:** `bal build` takes excessively long.

| Cause | Solution |
|-------|----------|
| Large number of dependencies | Reduce unnecessary imports; use `bal build --offline` after initial resolution |
| Antivirus scanning build directory | Exclude `target/` directory from real-time scanning |
| Insufficient memory | Increase JVM heap: `export BAL_JAVA_OPTS="-Xmx2g"` |
| Cold cache | First build is slower; subsequent builds reuse cached artifacts |

## Runtime Errors

### Port Conflicts

**Symptom:** Service fails to start with "address already in use" error.

```
ERROR: failed to start the listener on port 8080: Address already in use
```

**Solutions:**

```bash
# Find the process using the port (macOS/Linux)
lsof -i :8080

# Find the process using the port (Windows)
netstat -ano | findstr :8080

# Kill the process
kill -9 <PID>      # macOS/Linux
taskkill /PID <PID> /F    # Windows
```

**Prevention:** Use configurable ports to avoid hardcoding:

```ballerina
configurable int port = 8080;

service /api on new http:Listener(port) {
    // ...
}
```

```toml
# Config.toml
port = 9090
```

### Out of Memory Errors

**Symptom:** Application crashes with `java.lang.OutOfMemoryError`.

| OOM Type | Cause | Solution |
|----------|-------|----------|
| `Java heap space` | Heap memory exhausted | Increase heap: `-Xmx1g` in `BAL_JAVA_OPTS` |
| `Metaspace` | Too many loaded classes | Increase metaspace: `-XX:MaxMetaspaceSize=256m` |
| `Direct buffer memory` | Large I/O buffers | Increase direct memory: `-XX:MaxDirectMemorySize=512m` |
| `GC overhead limit exceeded` | Excessive garbage collection | Increase heap or investigate memory leaks |

```bash
# Set JVM options for Ballerina runtime
export BAL_JAVA_OPTS="-Xms256m -Xmx1g -XX:MaxMetaspaceSize=256m"
bal run
```

### Connection Timeouts

**Symptom:** HTTP client calls fail with timeout errors.

```
ERROR: idle timeout triggered before reading inbound response
```

**Solutions:**

```ballerina
// Configure client timeouts
http:Client client = check new ("https://api.example.com", {
    timeout: 60,                    // Request timeout in seconds
    httpVersion: http:HTTP_1_1,
    poolConfig: {
        maxActiveConnections: 50,   // Connection pool size
        maxIdleConnections: 25,
        waitTime: 30                // Wait for connection from pool
    },
    retryConfig: {
        count: 3,
        interval: 2,
        backOffFactor: 2.0
    }
});
```

## Diagnostic Tools

### Strand Dump Tool

The strand dump tool captures the state of all active strands in a running Ballerina application, similar to a thread dump in Java. It is useful for diagnosing deadlocks, stuck operations, and concurrency issues.

#### Generating a Strand Dump

```bash
# Find the PID of the running Ballerina process
ps aux | grep ballerina

# Send SIGTRAP signal to trigger strand dump (macOS/Linux)
kill -SIGTRAP <PID>

# Alternative: Use bal command
bal strand-dump <PID>
```

#### Strand Dump Output

The dump shows each strand's status, current function, and call stack:

```
=== Strand Dump ===
Timestamp: 2024-01-15T10:30:00.000Z

Strand [1] "main" [RUNNABLE]
    at mypackage:mainFunction(main.bal:25)
    at mypackage:init(main.bal:10)

Strand [2] "worker-1" [WAITING]
    at ballerina/http:Client.get(client.bal:150)
    at mypackage:fetchData(service.bal:45)
    Waiting for: HTTP response from https://api.example.com/data

Strand [3] "worker-2" [BLOCKED]
    at mypackage:processRecords(processor.bal:30)
    Blocked on: lock at processor.bal:28

=== Summary ===
Total strands: 3
Runnable: 1
Waiting: 1
Blocked: 1
```

#### Strand States

| State | Description |
|-------|-------------|
| `RUNNABLE` | Strand is actively executing or ready to execute |
| `WAITING` | Strand is waiting for an I/O operation or external event |
| `BLOCKED` | Strand is blocked on a lock or another strand |
| `COMPLETED` | Strand has finished execution |
| `FAILED` | Strand terminated with an error |

### Ballerina Profiler

The Ballerina profiler identifies performance bottlenecks by recording CPU and memory usage during execution.

#### Running with Profiler

```bash
# Profile a Ballerina program
bal profile <ballerina-file-or-package>

# Profile with specific options
bal profile --cpu --memory myservice.bal
```

#### Profiler Output

The profiler generates an HTML report at `target/profiler/index.html` containing:

| Section | Information |
|---------|-------------|
| CPU Hotspots | Functions consuming the most CPU time |
| Memory Allocation | Objects and records with highest allocation rates |
| Call Graph | Visual representation of call relationships and timing |
| Strand Activity | Timeline of strand creation, execution, and completion |
| I/O Wait Times | Time spent waiting for network and file I/O |

### Debug Logging

Enable detailed debug logging to diagnose issues:

```bash
# Enable debug logging for all modules
bal run -- -Cballerina.log.level=DEBUG

# Enable debug logging for specific modules
bal run -- -Cballerina.http.log.level=DEBUG
```

#### Log Levels

| Level | Description | Use Case |
|-------|-------------|----------|
| `OFF` | No logging | Production (minimal overhead) |
| `ERROR` | Error conditions only | Production default |
| `WARN` | Warnings and errors | Production with alerts |
| `INFO` | Informational messages | General operations |
| `DEBUG` | Detailed debug information | Development troubleshooting |
| `TRACE` | Very detailed trace output | Deep debugging (high overhead) |

## Dependency Issues

### Version Conflicts

**Symptom:** Build fails due to incompatible transitive dependency versions.

```
ERROR: version conflict for 'ballerina/io': required '1.6.0' by 'ballerinax/kafka' but '1.5.0' by 'ballerinax/rabbitmq'
```

**Solutions:**

| Approach | Steps |
|----------|-------|
| Update all dependencies | Delete `Dependencies.toml`; run `bal build --sticky=false` |
| Pin a specific version | Add explicit dependency in `Ballerina.toml` with the required version |
| Check compatibility | Ensure all dependencies target the same Ballerina distribution version |
| Use dependency override | Add `[[dependency]]` section in `Ballerina.toml` to force a version |

```toml
# Ballerina.toml - Force a specific dependency version
[[dependency]]
org = "ballerina"
name = "io"
version = "1.6.0"
```

### Missing Platform Dependencies

**Symptom:** Runtime error about missing Java classes or native libraries.

```
ERROR: java.lang.ClassNotFoundException: com.mysql.cj.jdbc.Driver
```

**Solutions:**

```toml
# Add platform-specific Java dependencies in Ballerina.toml
[[platform.java17.dependency]]
groupId = "mysql"
artifactId = "mysql-connector-java"
version = "8.0.33"
```

## VS Code Extension Issues

### Language Server Not Starting

**Symptom:** VS Code shows "Ballerina Language Server: Not Running" in the status bar.

| Cause | Solution |
|-------|----------|
| Ballerina not installed | Install Ballerina or verify `bal` is in `PATH` |
| Wrong Ballerina path | Set `ballerina.home` in VS Code settings |
| Java not found | Ensure JDK 17+ is installed and `JAVA_HOME` is set |
| Extension conflict | Disable other Ballerina-related extensions |
| Corrupted cache | Delete `~/.ballerina/` and restart VS Code |

### IntelliSense Not Working

**Symptom:** No code completions, hover information, or diagnostics.

```bash
# Restart the language server
# VS Code: Ctrl+Shift+P > "Ballerina: Restart Language Server"

# Clear the language server cache
rm -rf ~/.ballerina/ballerina-language-server/

# Rebuild the project
bal clean && bal build
```

## Docker and Deployment Issues

### Container Build Failures

**Symptom:** `bal build --cloud=docker` fails.

| Cause | Solution |
|-------|----------|
| Docker not running | Start Docker daemon |
| Insufficient disk space | Clean unused Docker images: `docker system prune` |
| Missing `Cloud.toml` | Create a `Cloud.toml` with container configuration |
| Build context too large | Add a `.dockerignore` file to exclude unnecessary files |

### Container Runtime Issues

**Symptom:** Container starts but service is not accessible.

| Issue | Solution |
|-------|----------|
| Port not exposed | Add port mapping: `docker run -p 8080:8080 myservice` |
| Health check failing | Configure `Cloud.toml` health check settings |
| Environment variables missing | Pass variables: `docker run -e DB_HOST=localhost myservice` |
| Config.toml not found | Mount config: `docker run -v ./Config.toml:/home/ballerina/Config.toml myservice` |

## Getting Help

| Resource | URL |
|----------|-----|
| WSO2 Integrator Documentation | This documentation site |
| Ballerina Discord | [discord.gg/ballerinalang](https://discord.gg/ballerinalang) |
| Ballerina GitHub Issues | [github.com/ballerina-platform/ballerina-lang/issues](https://github.com/ballerina-platform/ballerina-lang/issues) |
| Stack Overflow | [stackoverflow.com/questions/tagged/ballerina](https://stackoverflow.com/questions/tagged/ballerina) |
| WSO2 Support | [wso2.com/support/](https://wso2.com/support/) |

## See Also

- [System Requirements](system-requirements.md) -- Platform and version requirements
- [Installation Guide](/docs/get-started/install) -- Installation instructions
- [Error Codes Reference](/docs/reference/error-codes) -- All error codes with resolution steps
- [FAQ](/docs/reference/faq) -- Frequently asked questions
