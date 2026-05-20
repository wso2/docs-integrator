---
title: Performance Benchmarks
---

# Performance Benchmarks

This page presents performance benchmark results for WSO2 Integrator deployments on WSO2 Integration Platform PDP. Use these results as a baseline for your capacity planning decisions.

Benchmarks currently cover the **HTTP passthrough** scenario. Results for additional integration patterns will be published as testing is completed.

## Test environment

| Component | Specification |
|-----------|--------------|
| Product | WSO2 Integrator 5.0.0 |
| Ballerina Version | Ballerina 2201.13.4 (Swan Lake Update 13) |
| Passthrough service | WSO2 Integration Platform PDP (Azure) |
| Load generator | AWS EC2 m6a.xlarge (4 vCPU, 16 GiB RAM, up to 12.5 Gbps) |
| Backend | Netty echo server on AWS EC2 c5.xlarge |
| Scale-to-zero | Disabled (for consistent baseline measurements) |
| Endpoint authentication | Enabled |

## Test methodology

Tests use a **stress testing** approach: the load generator targets a specific constant throughput (RPS) and the minimum number of replicas required to sustain that throughput is determined.

- **Warmup**: 2 minutes at 10% of target RPS
- **Test duration**: 10 minutes per configuration (with 30-second ramp-up)
- **Success criteria**: Error rate < 1% and achieved RPS within ±5% of target
- **Resource configurations tested per replica**: 0.2 vCPU/512 MB, 0.5 vCPU/1 GB, 1.0 vCPU/1 GB, 2.0 vCPU/1 GB

**N/A results** indicate that the target throughput cannot be achieved regardless of replica count, due to network latency constraints. When N/A results occur, CPU and memory on the replicas are not saturated — network round-trip time between the client, WSO2 Integration Platform PDP, and the backend is the limiting factor.

## HTTP passthrough results

The HTTP passthrough scenario forwards requests unmodified to a backend service and returns the response to the caller. No transformation or routing logic is applied.

### Maximum throughput by payload size

The table below shows the upper throughput limit for each payload size, assuming adequate concurrent connections are maintained.

| Payload Size | Maximum Achievable RPS | Minimum Concurrent Connections |
|:---:|:---:|:---:|
| 1 KB | 5,000 | 500 |
| 10 KB | 2,000 | 500 |
| 50 KB | 2,000 | 500 |
| 100 KB | 500 | ≥100 |
| 250 KB | 200 | ≥50 |
| 1 MB | 100 | ≥50 |

### Response latency

The following table shows typical response times under normal operating conditions (1.0 vCPU, 1 GB memory, no CPU/memory saturation). Use these values to set latency expectations and configure client timeouts.

| Payload Size | Avg Response Time | 99th Percentile |
|:---|:---|:---|
| 1 KB | 74–84 ms | 80–160 ms |
| 10 KB | 73–116 ms | 83–192 ms |
| 50 KB | 88–228 ms | 216–340 ms |
| 100 KB | 95–295 ms | 280–429 ms |
| 250 KB | 100–374 ms | 340–572 ms |
| 1 MB | 265–702 ms | 602–966 ms |

> Ranges reflect measurements across 10 to 500 concurrent connections. Higher concurrency slightly increases average response time.

### Resource optimization recommendations

The table below maps throughput targets and payload sizes to the recommended resource configuration and minimum concurrent connections required.

| Throughput Target | Payload Size | Recommended CPU | Recommended Memory | Expected Replicas | Min Concurrent Connections |
|---:|---:|---:|---:|---:|---:|
| ≤50 RPS | ≤250 KB | 0.2 vCPU | 512 MB | 1 | 50 |
| ≤100 RPS | ≤100 KB | 0.2 vCPU | 512 MB | 1 | 10 |
| ≤100 RPS | 250 KB | 0.5 vCPU | 1 GB | 1 | 50 |
| ≤100 RPS | 1 MB | 1.0 vCPU | 1 GB | 1 | 50 |
| 101–200 RPS | ≤100 KB | 0.5 vCPU | 1 GB | 1 | 50 |
| 101–200 RPS | 250 KB | 0.5 vCPU | 1 GB | 1 | 50 |
| 201–500 RPS | ≤10 KB | 0.5 vCPU | 1 GB | 1 | 50 |
| 201–500 RPS | 50 KB | 1.0 vCPU | 1 GB | 1 | 50 |
| 501–1000 RPS | ≤10 KB | 0.5 vCPU | 1 GB | 1 | 100–200 |
| 501–1000 RPS | 50 KB | 1.0 vCPU | 1 GB | 1 | 500 |
| 1001–2000 RPS | 1 KB | 0.5 vCPU | 1 GB | 1 | 200 |
| 1001–2000 RPS | 10–50 KB | 0.5 vCPU | 1 GB | 1 | 500 |
| 2001–5000 RPS | 1 KB | 0.5 vCPU | 1 GB | 1 | 500 |

## Known limitations

| Scenario | Details |
|:---|:---|
| 1 MB payloads | Maximum achievable throughput is 100 RPS; not achievable at 200 RPS+ |
| 250 KB payloads | Maximum achievable throughput is 200 RPS |
| High throughput (≥1000 RPS) | Only small payloads (≤50 KB) with high concurrency (≥100–500 connections) |
| Low concurrency (&lt;50 connections) | Cannot achieve throughput above 100–200 RPS regardless of resources |
| Network latency as bottleneck | When N/A results occur, CPU and memory are not saturated — network round-trip latency is the limiting factor |

## What's next

- [Overview and sizing guidelines](overview.md) — Use these results to size your deployments
- [Scaling and high availability](../deploy/scaling-high-availability.md) — Scale based on throughput requirements
