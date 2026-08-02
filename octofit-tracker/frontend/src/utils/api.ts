export function buildApiUrl(path: string) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const trailingPath = normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api${trailingPath}`;
  }

  return `http://localhost:8000/api${trailingPath}`;
}
