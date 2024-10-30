// Chaves de Cache para Redis
export const CACHE_KEYS = {
  BLOCKS: "blocks",
  AVERAGE_BLOCK_TIME: "average-times",
  USER_BALANCES: "user-balances",
  ACCOUNT_ASSETS: "account-assets",
  INBOUND_TRANSFERS: "inbound-transfers",
  STX_BALANCE: "stx-balance",
};
export const CACHE_EXPIRATION = parseInt(
  process.env.CACHE_EXPIRATION || "900",
  10
); // 15 minutos

export const CRON_INTERVAL = parseInt(process.env.CRON_INTERVAL || "10", 10); // 10 minutos
