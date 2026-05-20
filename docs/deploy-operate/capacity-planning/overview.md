---
title: Overview and Sizing Guidelines
---

# Overview and Sizing Guidelines

Proper capacity planning ensures your integrations have sufficient resources to handle expected workloads while maintaining performance SLAs. This page provides sizing guidelines, resource configuration recommendations, and scaling guidance based on performance benchmarking of the WSO2 Integration Platform.

Capacity planning data on this page currently covers the **HTTP passthrough** scenario. Additional integration patterns will be added as benchmarks become available.

## Key metrics for sizing

Before choosing a resource configuration, identify the following characteristics of your workload:

| Metric | Description |
|--------|-------------|
| Requests per second (RPS) | Expected peak throughput your integration must sustain |
| Payload size | Average request/response payload size |
| Concurrent connections | Number of simultaneous client connections maintained toward the integration endpoint |
| Response latency (p99) | Maximum acceptable 99th percentile response time under load |

## Resource configuration tiers

The following tiers reflect configurations tested in WSO2 Integration Platform capacity planning. Start with the **S tier** as your baseline for most workloads.

| Tier | CPU | Memory | Recommended For |
|------|-----|--------|-----------------|
| XS | 0.2 vCPU | 512 MB | ≤100 RPS with small payloads (≤100 KB) |
| S | 0.5 vCPU | 1 GB | 100–500 RPS — **recommended baseline** |
| M | 1.0 vCPU | 1 GB | 500+ RPS, or medium-to-large payloads (50–100 KB) |
| L | 2.0 vCPU | 1 GB | High-throughput scenarios (marginal benefit over M) |

## Payload size impact

Payload size is one of the strongest determinants of achievable throughput. Larger payloads increase round-trip latency, which reduces the number of requests that can be in flight at any time.

| Payload Size | Maximum Achievable RPS | Minimum Concurrent Connections Required |
|:---:|:---:|:---:|
| 1 KB | 5,000 | 500 |
| 10 KB | 2,000 | 500 |
| 50 KB | 2,000 | 500 |
| 100 KB | 500 | ≥100 |
| 250 KB | 200 | ≥50 |
| 1 MB | 100 | ≥50 |

For payloads larger than 100 KB, consider compressing data before transmission to stay within achievable throughput limits.

## Resource configuration reference

Use the table below to find the recommended CPU, memory, and replica count for your target throughput and payload size. All configurations assume adequate concurrent connections (see [Concurrent connections guide](#concurrent-connections-guide) below).

| Target Throughput | Payload Size | Recommended CPU | Recommended Memory | Expected Replicas |
|:---|:---|:---|:---|:---|
| Up to 50 RPS | Up to 250 KB | 0.2 vCPU | 512 MB | 1 |
| Up to 50 RPS | 1 MB | 0.5 vCPU | 1 GB | 1 |
| Up to 100 RPS | Up to 100 KB | 0.2 vCPU | 512 MB | 1 |
| Up to 100 RPS | 250 KB | 0.5 vCPU | 1 GB | 1 |
| Up to 100 RPS | 1 MB | 1.0 vCPU | 1 GB | 1 |
| 101–200 RPS | Up to 250 KB | 0.5 vCPU | 1 GB | 1 |
| 101–200 RPS | 1 MB | Not achievable | — | — |
| 201–500 RPS | Up to 10 KB | 0.5 vCPU | 1 GB | 1 |
| 201–500 RPS | 50 KB | 1.0 vCPU | 1 GB | 1 |
| 201–500 RPS | 100 KB | 1.0 vCPU | 1 GB | 1 |
| 201–500 RPS | 250 KB+ | Not achievable | — | — |
| 501–1000 RPS | Up to 10 KB | 0.5 vCPU | 1 GB | 1 |
| 501–1000 RPS | 50 KB | 1.0 vCPU | 1 GB | 1 |
| 501–1000 RPS | 100 KB+ | Not achievable | — | — |
| 1001–2000 RPS | 1 KB | 0.5 vCPU | 1 GB | 1 |
| 1001–2000 RPS | 10 KB | 0.5 vCPU | 1 GB | 1 |
| 1001–2000 RPS | 50 KB | 1.0 vCPU | 1 GB | 1 |
| 1001–2000 RPS | 100 KB+ | Not achievable | — | — |
| 2001–5000 RPS | 1 KB | 0.5 vCPU | 1 GB | 1 |
| 2001–5000 RPS | 10 KB+ | Not achievable | — | — |

> **"Not achievable"** means this throughput cannot be reached for the given payload size regardless of resource allocation, due to network latency constraints.

## Concurrent connections guide

The number of concurrent connections your client applications maintain toward the integration endpoint directly limits the throughput you can achieve. Insufficient connections create a bottleneck regardless of how many replicas are running.

| Target Throughput | Minimum Concurrent Connections |
|:---|:---|
| Up to 100 RPS | 10 (payloads ≤100 KB) |
| 200 RPS | 50 |
| 500 RPS | 50 (small payloads); 100 (medium payloads) |
| 1,000 RPS | 100 (1 KB payload); 200 (10 KB payload) |
| 2,000 RPS | 200 (1 KB); 500 (10–50 KB) |
| 5,000 RPS | 500 (1 KB only) |

Ensure your client connection pools are sized to maintain at least the minimum concurrent connections for your target throughput.

## Deployment recommendations

1. **Start with S tier (0.5 vCPU / 1 GB)** as your baseline — it provides the best cost-to-performance ratio for most workloads.
2. **Scale to M tier (1.0 vCPU / 1 GB)** for payloads of 50–100 KB at moderate-to-high throughput (200–500 RPS).
3. **Right-size your client connection pools** — throughput is often limited by client-side concurrency, not server resources.
4. **Compress payloads larger than 100 KB** — this significantly expands the achievable throughput range.
5. **512 MB memory is sufficient** for HTTP passthrough across all tested scenarios; increase memory only if monitoring indicates otherwise.

## Scaling strategies

| Strategy | When to Use |
|----------|-------------|
| Vertical scaling | Quick adjustment when a single instance is under-resourced |
| Horizontal scaling | Stateless services requiring high availability |
| Auto-scaling (HPA/KEDA) | Variable or event-driven traffic patterns |

## What's next

- [Performance benchmarks](performance-benchmarks.md) — Detailed benchmark results for the HTTP passthrough scenario
- [Scaling and high availability](../deploy/scaling-high-availability.md) — Configure horizontal scaling and HA deployments
