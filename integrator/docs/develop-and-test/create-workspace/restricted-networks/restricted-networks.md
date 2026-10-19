---
title: Work in a Restricted Network
---

# Work in a Restricted Network

WSO2 Integrator pulls packages from Ballerina Central when you create or open a project and when you build it, and it checks an update service for new releases. In many organizations, direct internet access is restricted and traffic goes through a proxy server. Use the guides below to set up WSO2 Integrator in such an environment.

| Approach | Use it when | Guide |
|---|---|---|
| Network proxy | Your traffic leaves the network through an HTTP or HTTPS proxy server. | [Configure a Network Proxy](configure-a-network-proxy.md) |
| Maven proxy repository | Your organization uses a repository manager, such as JFrog Artifactory or Sonatype Nexus, as a caching proxy for Ballerina Central. | [Proxy Ballerina Central with a Maven Repository](maven-proxy-repository.md) |

## Domain access

These domains must be accessible from your network:

1. Ballerina Central API - `https://api.central.ballerina.io/`
2. Ballerina Central File Server - `https://fileserver.central.ballerina.io/`
3. Maven Central Repository - `https://repo.maven.apache.org/maven2`
4. Docker Hub - `https://hub.docker.com/u/ballerina`
5. Alpine Linux Repository - `http://dl-cdn.alpinelinux.org/`
6. Update service - `https://apis.wso2.com/`, `https://integrator-updates-cdn.wso2.com/`

## Next steps

- [Develop a new integration](../create-a-project.md) — Create a new integration project and start building.
- [Open an existing integration](../open-a-project.md) — Continue working on a project you already have.
