import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

// ============================================
// ALLOWED HOSTS for og-image fetching
// ============================================
const ALLOWED_HOSTS = new Set([
  'postimg.cc',
  'i.postimg.cc',
  'res.cloudinary.com',
]);

const ALLOWED_HOST_SUFFIXES = [
  '.aniketpandey.website',
];

// ============================================
// PRIVATE / RESERVED IP RANGES
// ============================================
function isPrivateIP(ip: string): boolean {
  // IPv4
  if (isIP(ip) === 4) {
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return true;

    const [a, b] = parts;

    // Loopback 127.0.0.0/8
    if (a === 127) return true;
    // Private 10.0.0.0/8
    if (a === 10) return true;
    // Private 172.16.0.0/12 (172.16.0.0 – 172.31.255.255)
    if (a === 172 && b >= 16 && b <= 31) return true;
    // Private 192.168.0.0/16
    if (a === 192 && b === 168) return true;
    // Link-local 169.254.0.0/16 (includes AWS metadata 169.254.169.254)
    if (a === 169 && b === 254) return true;
    // 0.0.0.0/8
    if (a === 0) return true;
    // Carrier-grade NAT 100.64.0.0/10
    if (a === 100 && b >= 64 && b <= 127) return true;
    // Multicast 224.0.0.0/4
    if (a >= 224) return true;
    // Broadcast 255.255.255.255
    if (a === 255 && b === 255 && parts[2] === 255 && parts[3] === 255) return true;

    return false;
  }

  // IPv6
  if (isIP(ip) === 6) {
    const lower = ip.toLowerCase();
    // Loopback ::1
    if (lower === '::1') return true;
    // Unspecified ::
    if (lower === '::') return true;
    // Unique local fc00::/7
    if (lower.startsWith('fc') || lower.startsWith('fd')) return true;
    // Link-local fe80::/10
    if (lower.startsWith('fe8') || lower.startsWith('fe9') || lower.startsWith('fea') || lower.startsWith('feb')) return true;
    // IPv4-mapped ::ffff:0:0/96 — check embedded IPv4
    const v4MappedMatch = lower.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (v4MappedMatch) return isPrivateIP(v4MappedMatch[1]);

    return false;
  }

  // Not a valid IP at all — treat as private (reject)
  return true;
}

// ============================================
// HOSTNAME ALLOWLIST CHECK
// ============================================
function isHostAllowed(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (ALLOWED_HOSTS.has(lower)) return true;
  return ALLOWED_HOST_SUFFIXES.some(suffix => lower.endsWith(suffix));
}

// ============================================
// URL VALIDATION RESULT
// ============================================
export interface ValidationResult {
  valid: boolean;
  url: URL | null;
  reason?: string;
}

// ============================================
// MAIN VALIDATOR
// ============================================
export async function validateImageUrl(rawUrl: string): Promise<ValidationResult> {
  let parsed: URL;

  // 1. Parse URL
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { valid: false, url: null, reason: 'invalid-url' };
  }

  // 2. HTTPS only
  if (parsed.protocol !== 'https:') {
    return { valid: false, url: null, reason: 'non-https-scheme' };
  }

  // 3. Hostname allowlist
  if (!isHostAllowed(parsed.hostname)) {
    return { valid: false, url: null, reason: 'host-not-allowed' };
  }

  // 4. DNS resolve and check for private IPs
  try {
    const addresses = await lookup(parsed.hostname, { all: true });
    for (const addr of addresses) {
      if (isPrivateIP(addr.address)) {
        return { valid: false, url: null, reason: 'resolves-to-private-ip' };
      }
    }
  } catch {
    // DNS resolution failed — reject
    return { valid: false, url: null, reason: 'dns-resolution-failed' };
  }

  return { valid: true, url: parsed };
}
