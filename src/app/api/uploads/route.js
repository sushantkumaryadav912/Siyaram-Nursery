import { createClient } from '@supabase/supabase-js';
import { validateMimeType } from '@/lib/serverMiddleware';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; 

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('Supabase not configured; uploads disabled');
}

const supabaseAdmin = SUPABASE_URL
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  : null;

export async function POST(req) {
  try {
    if (!supabaseAdmin) return new Response(JSON.stringify({ error: 'Storage not configured' }), { status: 500 });

    const { filename, contentType } = await req.json();
    if (!filename || !contentType) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }
    if (!validateMimeType(contentType)) {
      return new Response(JSON.stringify({ error: 'Invalid mime type' }), { status: 400 });
    }

    const uuid = crypto.randomUUID();
    const ext = filename.split('.').pop();
    const safePath = `product-images/${uuid}.${ext}`;
    const { data, error } = await supabaseAdmin.storage
      .from('public') 
      .createSignedUploadUrl(safePath, 60 * 5); 

    if (error) {
      console.error('Supabase signed url error', error);
      return new Response(JSON.stringify({ error: 'Upload error' }), { status: 500 });
    }

    return new Response(JSON.stringify({ uploadUrl: data.signedURL, path: safePath }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('POST /api/uploads error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
