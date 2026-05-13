---
sidebar_position: 1
title: Debugging & Troubleshooting
description: Diagnose and fix common build, runtime, IDE, and deployment issues in WSO2 Integrator projects.
keywords: [wso2 integrator, troubleshooting, errors, debugging, diagnostics]
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Debugging & Troubleshooting

Diagnose and fix issues in your integrations using editor debugging, remote debugging, strand dump analysis, and performance profiling. This page is the entry point for the section. Start here for triage, then follow the links to focused pages for deeper detail.

## Before you start

Collect the following before investigating. Missing even one item can significantly delay diagnosis.

| Item | How to get it | Why it matters |
|------|---------------|----------------|
| WSO2 Integrator version | `bal --version` | Bugs are version-specific |
| OS and architecture | `uname -a` (Linux/macOS) or `winver` (Windows) | Some issues are OS-specific |
| `Ballerina.toml` | Root of the project | Package metadata and dependency declarations |
| `Dependencies.toml` | Root of the project | Exact resolved dependency versions |
| Full error output | Terminal or log output | The complete stack trace, not just the last line |
| Steps to reproduce | Document what triggers the issue | A minimal description helps isolate the root cause |

## Where to start

| If you're seeing... | Start here |
|---|---|
| IDE shows errors but `bal build` succeeds | [WSO2 Integrator IDE issues](#wso2-integrator-ide-issues) below |
| No completions, hover, or diagnostics in the IDE | [WSO2 Integrator IDE issues](#wso2-integrator-ide-issues) below |
| A compiler error message | [Errors and Stack Traces](errors-and-stack-traces.md): error format and common fixes |
| Dependency or package resolution failure | [Package resolution failures](#package-resolution-failures) below |
| A runtime panic or unexpected crash | [Errors and Stack Traces](errors-and-stack-traces.md): reading panics and stack traces |
| Configurable values not loaded; defaults used | [Top configuration mistakes](#top-configuration-mistakes) below |
| HTTP, SQL, GraphQL, or messaging connector error | [Library Troubleshooting](library-troubleshooting.md): error hierarchies and connector-specific fixes |
| Unexpected output or wrong data | [Editor Debugging](editor.md): set breakpoints and inspect variables |
| Service hangs or doesn't respond | [Strand Dump Analysis](strand-dump-analysis.md): check for blocked strands |
| Intermittent failures under load | [Strand Dump Analysis](strand-dump-analysis.md): look for race conditions and connection pool exhaustion |
| Slow response times | [Performance Profiling](performance-profiling.md): identify bottlenecks |
| Works locally, fails when deployed | [Deployment Troubleshooting](deployment-troubleshooting.md): Docker, Kubernetes, GraalVM, Choreo |

## Top configuration mistakes

These mistakes account for a large share of issues. Rule them out before diving deeper.

| # | Mistake | What goes wrong | Fix |
|---|---------|-----------------|-----|
| 1 | Confusing `Ballerina.toml` with `Config.toml` | Build config placed in `Config.toml`, or runtime config placed in `Ballerina.toml` | `Ballerina.toml` = build-time package config. `Config.toml` = runtime configurable values. |
| 2 | `Config.toml` not in the working directory | Configurable values use defaults silently | Ensure `Config.toml` is in the directory where `bal run` runs. In Docker, mount it to `/home/ballerina/`. |
| 3 | Wrong module path in `Config.toml` | Configurable value not picked up; default used instead | Keys must match `[org.package.module]` hierarchy. For the default module, use `[org.package]`. |
| 4 | TOML syntax errors in `Config.toml` | Parse error on startup, or values silently wrong | Use `=` for key-value pairs (not `:`). Table headers use `[section]`. Strings must be quoted. |
| 5 | Missing SQL driver import | `No suitable driver found for jdbc:...` | Add `import ballerinax/mysql.driver as _;` (or the appropriate driver) |

## WSO2 Integrator IDE issues

### View the IDE output

The Ballerina output panel shows the current Ballerina distribution and additional diagnostic information when the IDE cannot detect a distribution. It is the first place to look when something feels off but no error is visible in the editor.

To open it: from the IDE menu, select **View** > **Output** (or press `Ctrl+Shift+U` on Windows/Linux, `Cmd+Shift+U` on macOS), then choose **Ballerina** from the output channel dropdown.

Two channels are available:

- **Ballerina**: IDE-level logs (startup, configuration)
- **Ballerina Language Server**: language server protocol messages and errors

<ThemedImage
    alt="Open the Ballerina output panel from View > Output and select the Ballerina channel"
    sources={{
        light: useBaseUrl('/img/develop/debugging/troubleshooting/view-ide-output-light.gif'),
        dark: useBaseUrl('/img/develop/debugging/troubleshooting/view-ide-output-dark.gif'),
    }}
/>

### Set up a custom Ballerina path

To use a Ballerina distribution other than the one bundled with the IDE, for example to test against a specific version, point the IDE to a custom path:

1. Download the Ballerina distribution and unpack it to a known location.
2. Open the IDE settings: click the **Manage** (gear) icon at the bottom of the activity bar and select **Settings** (or press `Ctrl+,` on Windows/Linux, `Cmd+,` on macOS).

   <ThemedImage
       alt="Open the IDE settings from the Manage menu"
       sources={{
           light: useBaseUrl('/img/develop/debugging/troubleshooting/open-settings-light.png'),
           dark: useBaseUrl('/img/develop/debugging/troubleshooting/open-settings-dark.png'),
       }}
   />

3. Search for `ballerina.home`.
4. Enter the path to the downloaded distribution in the **Ballerina: Home** field.
5. To activate the custom distribution, also enable **Ballerina: Plugin Dev Mode**.

   <ThemedImage
       alt="Ballerina Home and Plugin Dev Mode settings"
       sources={{
           light: useBaseUrl('/img/develop/debugging/troubleshooting/custom-ballerina-path-light.png'),
           dark: useBaseUrl('/img/develop/debugging/troubleshooting/custom-ballerina-path-dark.png'),
       }}
   />

### Enable IDE debug logs

When you need detailed diagnostic output from the IDE or the language server, open the IDE settings (`Ctrl+,` on Windows/Linux, `Cmd+,` on macOS), then search for and enable one or more of the following settings:

| Setting | What it enables |
|---|---|
| `ballerina.debugLog` | Debug-level messages on the Ballerina output channel |
| `ballerina.traceLog` | Trace-level messages on the Ballerina output channel (more verbose than debug) |
| `ballerina.enableLanguageServerDebug` | Language server debug mode |

<ThemedImage
    alt="Ballerina Debug Log setting in the IDE settings"
    sources={{
        light: useBaseUrl('/img/develop/debugging/troubleshooting/enable-debug-logs-light.png'),
        dark: useBaseUrl('/img/develop/debugging/troubleshooting/enable-debug-logs-dark.png'),
    }}
/>

Output appears in the Ballerina output panel. See [View the IDE output](#view-the-ide-output) above.

### Language server not starting

**Symptom:** The IDE shows "Ballerina Language Server: Not Running" in the status bar.

| Cause | Solution |
|-------|----------|
| Ballerina not installed | Install Ballerina, or verify `bal` is in `PATH` |
| Wrong Ballerina path | Set `ballerina.home` in the IDE settings |
| Java not found | Ensure JDK 17 or later is installed and `JAVA_HOME` is set |
| Extension conflict | Disable other Ballerina-related extensions |
| Corrupted cache | Delete `~/.ballerina/` and restart the IDE |

### Language server problems

Language server issues appear **only in the IDE**, not during `bal build`. If the error appears in both, it is a real compiler error. See [Errors and Stack Traces](errors-and-stack-traces.md).

| Symptom | Likely cause | Fix |
|---|---|---|
| No completions, hover, or diagnostics | Language server in a bad state | Run **Ballerina: Restart Language Server** from the command palette (`Ctrl+Shift+P` on Windows/Linux, `Cmd+Shift+P` on macOS). Then clear the cache: `rm -rf ~/.ballerina/ballerina-language-server/` and run `bal clean && bal build` |
| Language server crashes on startup | Incompatible Ballerina and IDE versions | Match the IDE version to the Ballerina distribution version |
| "Ballerina home not found" | `BALLERINA_HOME` not set or wrong path | Set `ballerina.home` in the IDE settings to the Ballerina installation path |
| IntelliSense works for stdlib but not custom modules | Module not built; `.jar` not generated | Run `bal build` from the terminal first |
| Extension prompts to "import project" repeatedly | Missing `Ballerina.toml` at the root | Open the Ballerina package root in the IDE |
| Incorrect errors shown after a code change | Stale language server state | Reload the window: `Ctrl+Shift+P` on Windows/Linux, `Cmd+Shift+P` on macOS, then run **Developer: Reload Window** |
| High CPU with Ballerina files open | Language server rebuilding large project | Open only the package root, not a parent folder |
| "Module not found" with a "Pull" option | Module declared in `Ballerina.toml` but not yet resolved locally | Click the **Pull** code action, or run `bal build` from the terminal |

## Common build errors

For compiler error messages (`incompatible types`, `undefined symbol`, syntax errors, etc.), see [Errors and Stack Traces](errors-and-stack-traces.md). This section covers errors that happen around the build itself: dependency resolution, network access, and overall build behavior.

### Package resolution failures

**Symptom:** Build fails with "cannot resolve module" or "package not found".

```bash
ERROR: cannot resolve module 'ballerinax/mysql:1.11.0'
```

| Cause | Solution |
|-------|----------|
| No internet connectivity | Check the network connection; Ballerina Central requires HTTPS access |
| Incorrect module name or version | Verify the module name and version on [central.ballerina.io](https://central.ballerina.io) |
| Stale dependency cache | Delete `Dependencies.toml` and run `bal build` to re-resolve |
| Incompatible distribution version | Check the `distribution` field in `Ballerina.toml`; use `bal dist use` to switch |
| Proxy configuration | Configure the proxy in `<USER_HOME>/.ballerina/Settings.toml` (see below) |

Force re-resolution of all dependencies:

```bash
rm Dependencies.toml
bal build --sticky=false
```

#### Proxy configuration

If a network proxy is required, add it to `<USER_HOME>/.ballerina/Settings.toml`:

```toml
[proxy]
host = "HOST_NAME"
port = PORT
username = "PROXY_USERNAME"   # or "" if no auth
password = "PROXY_PASSWORD"   # or "" if no auth
```

Required Ballerina Central endpoints (network must allow access):

| Endpoint | Purpose |
|---|---|
| `https://api.central.ballerina.io/` | Package metadata and search |
| `https://fileserver.central.ballerina.io/` | Package download |
| `https://repo.maven.apache.org/maven2` | Maven dependency resolution |

If the proxy performs TLS inspection and you see `PKIX path building failed`, import the proxy's certificate into the Ballerina JRE trust store:

```bash
<BALLERINA_HOME>/dependencies/jdk-<version>/bin/keytool -import \
    -trustcacerts \
    -file proxy-cert.pem \
    -alias my-proxy-cert \
    -keystore <BALLERINA_HOME>/dependencies/jdk-<version>/lib/security/cacerts
```

If multiple Ballerina distributions are installed, repeat this for each distribution's JRE.

### Compilation performance

**Symptom:** `bal build` takes excessively long.

| Cause | Solution |
|-------|----------|
| Large number of dependencies | Reduce unnecessary imports; use `bal build --offline` after initial resolution |
| Antivirus scanning the build directory | Exclude `target/` from real-time scanning |
| Insufficient memory | Increase JVM heap: `export BAL_JAVA_OPTS="-Xmx2g"` |
| Cold cache | First build is slower; subsequent builds reuse cached artifacts |

### Version conflicts

**Symptom:** Build fails due to incompatible transitive dependency versions.

```bash
ERROR: version conflict for 'ballerina/io': required '1.6.0' by 'ballerinax/kafka' but '1.5.0' by 'ballerinax/rabbitmq'
```

| Approach | Steps |
|----------|-------|
| Update all dependencies | Delete `Dependencies.toml`; run `bal build --sticky=false` |
| Pin a specific version | Add an explicit dependency in `Ballerina.toml` with the required version |
| Check compatibility | Ensure all dependencies target the same Ballerina distribution version |
| Use dependency override | Add a `[[dependency]]` section in `Ballerina.toml` to force a version |

```toml
[[dependency]]
org = "ballerina"
name = "io"
version = "1.6.0"
```

### Offline builds

If the build environment has no internet access:

1. Build once online and commit `Dependencies.toml` to source control.
2. Use offline mode on subsequent builds:

   ```bash
   bal build --offline
   ```

   Or in `Ballerina.toml`:

   ```toml
   [build-options]
   offline = true
   sticky = true
   ```

Offline mode only works if all required packages are already in the local cache (`~/.ballerina/repositories/`).

## Runtime errors

For runtime error messages and stack traces, see [Errors and Stack Traces](errors-and-stack-traces.md). This section covers operational issues that prevent the program from running cleanly: listener startup, missing native dependencies, and memory exhaustion.

### Port conflicts

**Symptom:** Service fails to start with "address already in use".

```bash
ERROR: failed to start the listener on port 8080: Address already in use
```

```bash
# Find the process using the port (macOS/Linux)
lsof -i :8080

# Find the process using the port (Windows)
netstat -ano | findstr :8080

# Kill the process
kill -9 <PID>            # macOS/Linux
taskkill /PID <PID> /F   # Windows
```

Prevent it by using a configurable port instead of hardcoding:

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

### Missing platform dependencies

**Symptom:** Runtime error about missing Java classes or native libraries.

```bash
ERROR: java.lang.ClassNotFoundException: com.mysql.cj.jdbc.Driver
```

Add the dependency to `Ballerina.toml`:

```toml
[[platform.java17.dependency]]
groupId = "mysql"
artifactId = "mysql-connector-java"
version = "8.0.33"
```

For most database drivers, importing the `*.driver` package is sufficient (see [Top configuration mistakes](#top-configuration-mistakes) row 3). Add a manual platform dependency only when the driver isn't published as a Ballerina driver package.

### Out of memory errors

The most common cause of `OutOfMemoryError` is a heap size that is too small for the workload. Increase JVM heap and capture a dump for analysis. For details, see [JVM memory tuning](performance-profiling.md#jvm-memory-tuning).

## Diagnostic tools

| Tool | When to use | Detail |
|---|---|---|
| Editor debugging | Step through code, set breakpoints, inspect variables | [Editor Debugging](editor.md) |
| Remote debugging | Attach to a service running outside the IDE | [Remote Debugging](remote.md) |
| Strand dump | Diagnose deadlocks, hangs, blocked strands | [Strand Dump Analysis](strand-dump-analysis.md) |
| Ballerina profiler | Find performance bottlenecks with flame graphs | [Performance Profiling](performance-profiling.md) |
| HTTP trace logs | Capture full HTTP request/response (headers, body) | [Library Troubleshooting](library-troubleshooting.md#http-trace-logs) |
| Log-based debugging | Add log statements to trace execution; tune verbosity per module | [Log-Based Debugging](logging.md) |
| Debug logging (quick reference) | Configure log level in `Config.toml` | [Debug logging](#debug-logging) below |

### Debug logging

Enable detailed logging in `Config.toml`:

```toml
[ballerina.log]
level = "DEBUG"
format = "json"
```

For package-level log control:

```toml
[[ballerina.log.modules]]
name = "ballerina/http"
level = "DEBUG"
```

Available log levels:

| Level | Description | Use case |
|-------|-------------|----------|
| `OFF` | No logging | Production (minimal overhead) |
| `ERROR` | Error conditions only | Production default |
| `WARN` | Warnings and errors | Production with alerts |
| `INFO` | Informational messages | General operations |
| `DEBUG` | Detailed debug information | Development troubleshooting |
| `TRACE` | Very detailed trace output | Deep debugging (high overhead) |

Log output goes to **stderr** in structured format by default. Redirect it if needed:

```bash
bal run . 2> app.log
```

## Getting help

| Resource | URL |
|----------|-----|
| Ballerina Discord | [discord.gg/ballerinalang](https://discord.gg/ballerinalang) |
| Ballerina GitHub Issues | [github.com/ballerina-platform/ballerina-lang/issues](https://github.com/ballerina-platform/ballerina-lang/issues) |
| Stack Overflow | [stackoverflow.com/questions/tagged/ballerina](https://stackoverflow.com/questions/tagged/ballerina) |
| WSO2 Support | [wso2.com/support/](https://wso2.com/support/) |

When reporting a bug, include everything from [Before you start](#before-you-start) above plus a minimal reproducible example (MRE): the smallest code snippet that reliably reproduces the issue.

## See also

- [Error Codes](/docs/reference/error-codes): Reference for all error codes
- [System Requirements](../../reference/appendix/system-requirements.md): Supported platforms and versions
- [FAQ](/docs/reference/faq): Frequently asked questions
