import fetch from "node-fetch";
import * as crypto from "crypto";
import sodium from "libsodium-wrappers";

const JWKS_URL = process.env.FAL_JWKS_URL || "https://rest.alpha.fal.ai/.well-known/jwks.json";
let cache: any[] = []; let fetchedAt = 0;

async function getJwks() {
  const now = Date.now();
  if (!cache.length || now - fetchedAt > 24*60*60*1000) {
    const res = await fetch(JWKS_URL);
    if (!res.ok) throw new Error(`JWKS fetch failed ${res.status}`);
    const { keys } = await res.json();
    cache = keys || []; fetchedAt = now;
  }
  return cache;
}

export async function falVerify(req: any, res: any, next: any) {
  await sodium.ready;
  const id = req.header("X-Fal-Webhook-Request-Id");
  const uid = req.header("X-Fal-Webhook-User-Id");
  const ts = req.header("X-Fal-Webhook-Timestamp");
  const sigHex = req.header("X-Fal-Webhook-Signature");
  if (!id || !uid || !ts || !sigHex) return res.sendStatus(400);

  const now = Math.floor(Date.now()/1000);
  if (Math.abs(now - Number(ts)) > 300) return res.sendStatus(401);

  const raw: Buffer = req.rawBody;
  const hash = crypto.createHash("sha256").update(raw).digest("hex");
  const msg = Buffer.from([id, uid, ts, hash].join("\n"), "utf8");
  const sig = Buffer.from(sigHex, "hex");

  const keys = await getJwks();
  for (const k of keys) {
    const pub = Buffer.from(k.x, "base64url");
    const ok = sodium.crypto_sign_verify_detached(sig, msg, pub);
    if (ok) return next();
  }
  return res.sendStatus(401);
}
