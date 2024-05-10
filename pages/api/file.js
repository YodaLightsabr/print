import { kv } from "@vercel/kv";

export async function getFile (id) {
  const data = await kv.get(id);

  if (data?.expires > Date.now()) {
    return data;
  }

  return null;
}

export default async function handler(req, res) {
  const id = req.query.id;

  const file = await getFile(id);
  
  if (file) return res.status(200).json(file);

  return res.status(400).json({ error: true });
}
