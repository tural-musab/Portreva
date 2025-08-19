# SPRINT-000 — Portreva Core (2 weeks)

## Goal
Ship App+GPU+Ops baseline: identity-preserving generation, signed uploads, credits/payments.

## Tasks
- [ ] Monorepo skeleton (Next.js web, NestJS API, FastAPI GPU)
- [ ] Docker Compose (postgres, redis, minio, n8n main+worker, api, web, gpu)
- [ ] Prisma schema (User, Team, Upload, Job, Artifact, CreditWallet, CreditTxn, Package, WebhookEvent)
- [ ] Signed upload (S3 presigned / Cloudinary signed)
- [ ] BullMQ processors (generate/edit)
- [ ] Webhooks: Replicate HMAC, fal ED25519/JWKS (raw body, ±300s)
- [ ] remove.bg unified kept in n8n for ops
- [ ] Observability (Sentry/PostHog), rate limit, idempotency tables
