export function validateImage(src: string): Promise<boolean> {
  if (!src) return Promise.resolve(false);

  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}
