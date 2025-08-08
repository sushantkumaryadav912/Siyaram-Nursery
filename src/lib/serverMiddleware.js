import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import xss from 'xss';

const rateMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; 
const RATE_LIMIT_MAX = 200;

export function ipRateLimiter(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, reset: now + RATE_LIMIT_WINDOW };
  if (now > entry.reset) {
    entry.count = 1;
    entry.reset = now + RATE_LIMIT_WINDOW;
    rateMap.set(ip, entry);
    return { ok: true, remaining: RATE_LIMIT_MAX - entry.count };
  }
  entry.count++;
  rateMap.set(ip, entry);
  if (entry.count > RATE_LIMIT_MAX) {
    return { ok: false, retryAfterMs: entry.reset - now };
  }
  return { ok: true, remaining: RATE_LIMIT_MAX - entry.count };
}

export function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  return xss(str);
}

export function validateMimeType(mime) {
  const allowed = ['image/png', 'image/jpeg', 'image/webp'];
  return allowed.includes(mime);
}
