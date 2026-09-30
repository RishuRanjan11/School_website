const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'school-media';

export function getStorageProxyUrl(imageUrl: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return imageUrl;

  try {
    const url = new URL(imageUrl);
    const projectUrl = new URL(supabaseUrl);
    if (url.origin !== projectUrl.origin) return imageUrl;

    const match = url.pathname.match(/^\/storage\/v1\/object\/(?:public|sign)\/([^/]+)\/(.+)$/);
    if (!match || decodeURIComponent(match[1]) !== STORAGE_BUCKET) return imageUrl;

    const fileName = match[2].split('/').map(decodeURIComponent).join('/');
    if (!fileName || fileName.split('/').some((part) => part === '.' || part === '..')) return imageUrl;

    return `/api/media/${fileName.split('/').map(encodeURIComponent).join('/')}`;
  } catch {
    return imageUrl;
  }
}
