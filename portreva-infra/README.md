# Portreva v3.3 — Async AI Ops Stack (n8n Queue Mode)

**Logline:** Portreva: production‑grade async image ops for headshots — n8n (Queue Mode) + Redis + Postgres orchestrating Replicate, fal.ai and remove.bg with Cloudinary/S3 output.

This package ships a minimal, battle-tested *Ops/Orchestration* layer ready to run:
- Docker Compose for Postgres, Redis, n8n (main) and n8n worker
- Hardened environment template (`.env.example`)
- Five importable n8n workflows (Replicate FLUX 1.1 Pro, Replicate Real-ESRGAN, fal.ai Kontext queue, remove.bg unified, global on-error notify)
- Drop‑in webhook signature verification middlewares (Replicate HMAC + fal.ai ED25519/JWKS)
- Sprint checklist to go beyond Ops and build the product layer later

> **Name:** Portreva  •  **Mission:** clean ops for headshot generation/editing with async webhooks and safe storage.

---

## Quick start

1) Copy `.env.example` to `.env` and fill the values (see inline comments).
2) `docker compose up -d` (first run pulls images; give n8n ~20s to boot).
3) Open n8n UI at `http://localhost:5678` → **Import** the JSONs in `workflows/` (top‑right menu).
4) In each imported workflow, open the **Webhook** node and ensure it's **Active** (for triggers) and that **Wait** nodes show “Resume: On Webhook Call” (already set in JSON but verify visually).
5) Hit the test endpoints listed inside each workflow’s **Webhook** node (n8n shows a “Test URL”). The flow immediately responds **202 Accepted**, then finishes asynchronously after provider callback. Final images are uploaded to Cloudinary (or ZIP as `raw`).

## Notes

- This Ops layer is **provider‑agnostic** and aims for reliability: idempotency checks, deterministic formats, and verified webhooks.
- For the full “Portreva” product (credits, payments, identity‑preserving generation, dashboards), see `SPRINT-000.md` for the recommended App + GPU + Ops split.
