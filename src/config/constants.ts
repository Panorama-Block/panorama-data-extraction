// src/config/constants.ts

// Cache keys
export const CACHE_KEYS = {
  BLOCKS: "blocks",
  AVERAGE_BLOCK_TIME: "average-block-time",
};

// Redis e Cronjob configs
export const CACHE_EXPIRATION = parseInt(
  process.env.CACHE_EXPIRATION || "900",
  10
);
export const CRON_INTERVAL = parseInt(process.env.CRON_INTERVAL || "10", 10);
