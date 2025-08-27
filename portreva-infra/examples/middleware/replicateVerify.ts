import * as crypto from "crypto";

const secretBase64 = process.env.REPLICATE_WEBHOOK_SECRET?.replace(/^whsec_/, "") || "";

export function replicateVerify(req: any, res: any, next: any) {
  const id = req.header("webhook-id");
  const ts = req.header("webhook-timestamp");
  const sigHeader = req.header("webhook-signature"); // e.g. "v1,BASE64"
  if (!id || !ts || !sigHeader || !secretBase64) return res.sendStatus(400);

  const raw = (req.rawBody as Buffer).toString("utf8");
  const signed = `${id}.${ts}.${raw}`;
  const expected = crypto.createHmac("sha256", Buffer.from(secretBase64, "base64")).update(signed).digest("base64");

  const parts = sigHeader.split(" ").map(s=>s.split(",")[1]).filter(Boolean);
  const match = parts.some(p => crypto.timingSafeEqual(Buffer.from(p), Buffer.from(expected)));
  const fresh = Math.abs(Math.floor(Date.now()/1000) - Number(ts)) <= 300;

  return (match && fresh) ? next() : res.sendStatus(401);
}
