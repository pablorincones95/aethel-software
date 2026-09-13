/**
 * In-memory sliding window rate limiter
 * Protects server actions and API endpoints against brute-force and DoS attacks
 */

interface RateLimitOptions {
  windowMs: number
  max: number
}

interface RateLimitRecord {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitRecord>()

// Periodic garbage collection to ensure zero memory leaks
if (typeof setInterval !== "undefined") {
  const gcTimer = setInterval(() => {
    const now = Date.now()
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key)
      }
    }
  }, 5 * 60 * 1000)

  // Avoid keeping the Node.js event loop alive in background workers
  if (typeof gcTimer.unref === "function") {
    gcTimer.unref()
  }
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { windowMs: 60 * 1000, max: 10 }
): { success: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + options.windowMs,
    })
    return {
      success: true,
      remaining: options.max - 1,
      retryAfterSeconds: Math.ceil(options.windowMs / 1000),
    }
  }

  if (record.count >= options.max) {
    return {
      success: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000),
    }
  }

  record.count += 1
  return {
    success: true,
    remaining: options.max - record.count,
    retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000),
  }
}
