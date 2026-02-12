// Get the base path for the application
export function getBasePath() {
  // In production (GitHub Pages), use the base from import.meta.env
  // In development, use root
  return import.meta.env.BASE_URL || '/';
}

// Helper to resolve paths relative to base
export function resolvePublicPath(path) {
  const base = getBasePath();
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Ensure base ends with slash
  const baseWithSlash = base.endsWith('/') ? base : base + '/';
  return baseWithSlash + cleanPath;
}
