import Redis from "ioredis"

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379"
const isInvalidProdRedis = process.env.NODE_ENV === "production" && (redisUrl.includes("localhost") || redisUrl.includes("127.0.0.1"))

// BullMQ requires maxRetriesPerRequest: null to work properly with blocking commands,
// BUT if we're in production with a dummy localhost URL, we must fail fast instead of hanging forever.
export const queueConnection = new Redis(redisUrl, { 
  maxRetriesPerRequest: isInvalidProdRedis ? 0 : null,
  enableReadyCheck: false,
  lazyConnect: true,
  connectTimeout: isInvalidProdRedis ? 1000 : 10000,
  family: 0, // Force IPv4/IPv6 resolution for Vercel + Upstash
  retryStrategy(times) {
    if (times > 3) {
      return null; // Stop retrying after 3 attempts to prevent hanging API routes
    }
    return Math.min(times * 50, 2000);
  }
})

queueConnection.on("error", (err) => {
  // Suppress verbose connection refused errors in prod if using placeholder
  if (!isInvalidProdRedis) {
    console.error("Queue Redis connection error:", err)
  }
})
