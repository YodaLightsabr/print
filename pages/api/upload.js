import { handleUpload } from '@vercel/blob/client';
import { kv } from "@vercel/kv";

export default async function handler(
  request,
  response,
) {
  const body = (await request.body);
 
  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        // Generate a client token for the browser to upload the file
        // ⚠️ Authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.
 
        return {
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified of client upload completion
        // ⚠️ This will not work on `localhost` websites,
        // Use ngrok or similar to get the full upload flow
 
        console.log('blob upload completed', blob, tokenPayload);
      },
    });

 
    return response.status(200).json(jsonResponse);
  } catch (error) {
    // The webhook will retry 5 times waiting for a 200
    return response.status(400).json(
      { error: (error).message }
    );
  }
}