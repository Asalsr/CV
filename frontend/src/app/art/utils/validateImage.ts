export function validateImage(src: string): Promise<boolean> {
  if (!src) return Promise.resolve(false);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const resolvedSrc = src.startsWith('/') ? `${basePath}${src}` : src;

  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = resolvedSrc;
  });
}
