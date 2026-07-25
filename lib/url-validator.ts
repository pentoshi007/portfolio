import { promises as dns } from 'dns';

/**
 * SSRF defense-in-depth URL validator.
 *
 * Primary control: hostname allowlist (only known image hosts).
 * Secondary control: DNS resolve + reject private/loopback/link-local/reserved IPs
 *   (best-effort DNS-rebinding mitigation on serverless).
 */

const ALLOWED_HOSTNAMES = new Set([
  'postimg.cc',
  'i.postimg.cc',
  'res.cloudinary.com',
  'aniketpandey.website',
  'blogs.aniketpandey.website',
  'admin.aniketpandey.website',
]);

const ALLOWED_HOST_SUFFIXES = [
  '.aniketpandey.website',
  '.postimg.cc',
];

export type ValidationResult =
  | { ok: true; url: URL }
  | { ok: false; reason: string };

export function isAllowedHostname(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (ALLOWED_HOSTNAMES.has(h)) return true;
  return ALLOWED_HOST_SUFFIXES.some((suffix) => h.endsWith(suffix));
}

/** Returns true if the IPv4 is private, loopback, link-local, reserved, or invalid. */
export function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
    return true; // treat malformed as blocked
  }
  const [a, b] = parts;
  if (a === 0) return true; // 0.0.0.0/8 "this host"
  if (a === 10) return true; // 10.0.0.0/8 private
  if (a === 127) return true; // 127.0.0.0/8 loopback
  if (a === 169 && b === 254) return true; // 169.254.0.0/16 link-local + cloud metadata
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12 private
  if (a === 192 && b === 168) return true; // 192.168.0.0/16 private
  if (a === 100 && b >= 64 && b <= 127) return true; // 100.64.0.0/10 CGNAT
  if (a >= 224) return true; // 224.0.0.0/4 multicast + 240.0.0.0/4 reserved
  return false;
}

/** Returns true if the IPv6 is loopback, ULA, link-local, unspecified, or a mapped private IPv4. */
export function isPrivateIPv6(ip: string): boolean {
  const addr = ip.toLowerCase().replace(/^\[|\]$/g, '');
  if (addr === '::' || addr === '::1') return true; // unspecified / loopback
  if (addr.startsWith('fc') || addr.startsWith('fd')) return true; // fc00::/7 ULA
  if (addr.startsWith('fe8') || addr.startsWith('fe9') || addr.startsWith('fea') || addr.startsWith('feb')) {
    return true; // fe80::/10 link-local
  }
  // IPv4-mapped IPv6 (::ffff:a.b.c.d)
  const v4mapped = addr.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (v4mapped) return isPrivateIPv4(v4mapped[1]);
  return false;
}

function isIPv4Literal(hostname: string): boolean {
  return /^\d+\.\d+\.\d+\.\d+$/.test(hostname);
}

function isIPv6Literal(hostname: string): boolean {
  // URL.hostname wraps IPv6 in brackets, or contains a colon (never true for DNS names)
  return hostname.startsWith('[') || hostname.includes(':');
}

async function resolveHostname(hostname: string): Promise<string[]> {
  const ips: string[] = [];
  try {
    ips.push(...(await dns.resolve4(hostname)));
  } catch {
    /* no A records */
  }
  try {
    ips.push(...(await dns.resolve6(hostname)));
  } catch {
    /* no AAAA records */
  }
  return ips;
}

/**
 * Validate a URL for safe server-side fetching.
 * - HTTPS only (blocks file://, http://, gopher://, ftp://, etc.)
 * - No credentials in URL
 * - Hostname must be in the allowlist
 * - DNS-resolved IPs must not be private/loopback/link-local/reserved
 */
export async function validateFetchUrl(rawUrl: string): Promise<ValidationResult> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return { ok: false, reason: 'Invalid URL' };
  }

  if (url.protocol !== 'https:') {
    return { ok: false, reason: 'Only HTTPS URLs are allowed' };
  }

  if (url.username || url.password) {
    return { ok: false, reason: 'Credentials in URL are not allowed' };
  }

  const hostname = url.hostname.toLowerCase();
  if (!hostname) {
    return { ok: false, reason: 'Missing hostname' };
  }

  if (!isAllowedHostname(hostname)) {
    return { ok: false, reason: 'Hostname not in allowlist' };
  }

  // Defense-in-depth: if an IP literal slipped through (it shouldn't, since IPs
  // aren't in the allowlist), reject private ranges directly.
  if (isIPv4Literal(hostname) && isPrivateIPv4(hostname)) {
    return { ok: false, reason: 'Private/reserved IP address' };
  }
  if (isIPv6Literal(hostname) && isPrivateIPv6(hostname)) {
    return { ok: false, reason: 'Private/reserved IPv6 address' };
  }

  // DNS-rebinding best-effort: resolve and verify no resolved IP is private.
  // NOTE: fetch() re-resolves independently, so this is not a complete TOCTOU
  // fix — the allowlist is the primary control.
  if (!isIPv4Literal(hostname) && !isIPv6Literal(hostname)) {
    const ips = await resolveHostname(hostname);
    if (ips.length === 0) {
      return { ok: false, reason: 'DNS resolution failed' };
    }
    for (const ip of ips) {
      if (ip.includes(':')) {
        if (isPrivateIPv6(ip)) {
          return { ok: false, reason: 'Private/resolved IPv6 address' };
        }
      } else if (isPrivateIPv4(ip)) {
        return { ok: false, reason: 'Private/resolved IP address' };
      }
    }
  }

  return { ok: true, url };
}
