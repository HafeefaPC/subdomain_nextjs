// src/utils/subdomain.js
export const getValidSubdomain = (host) => {
  let subdomain = null;
  if (host && host.includes('.')) {
    const candidate = host.split('.')[0];
    if (candidate && !candidate.includes('localhost')) {
      subdomain = candidate;
    }
  }
  return subdomain;
};
  