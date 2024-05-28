import { kv } from "@vercel/kv";

async function generateId () {
    const id = Array.from({length: 5}, () => "ABCDEFHJKLMNPQRTUVWXY0123456789".charAt(Math.floor(Math.random() * 31))).join('');

    if ((await kv.get(id))?.expires > Date.now()) return await generateId();

    return id;
}

export default async function handler (req, res) {
    const { blob } = req.body;

    const id = await generateId();

    await kv.set(id, {
        blob,
        expires: Date.now() + 1_000 * 60 * 30 // 30 minutes
    });

    res.status(200).json({
        id
    });
}