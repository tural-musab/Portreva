export async function uploadUnsignedToCloudinary(file: File) {
  const cloud = process.env.NEXT_PUBLIC_CLD_CLOUD_NAME!;
  const preset = process.env.NEXT_PUBLIC_CLD_UNSIGNED_PRESET!;
  if (!cloud || !preset) throw new Error('Cloudinary env yok');

  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', preset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
    method: 'POST',
    body: fd,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || 'Cloudinary upload failed');
  }
  return data as {
    secure_url: string;
    public_id: string;
    bytes?: number;
    width?: number;
    height?: number;
    format?: string;
    created_at?: string;
  };
}
