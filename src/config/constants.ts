// Chaves de Cache para Redis
export const CACHE_KEYS = {
  BLOCKS: "blocks",
  AVERAGE_BLOCK_TIME: "average-times",
  USER_BALANCES: "user-balances",
  ACCOUNT_ASSETS: "account-assets",
  INBOUND_TRANSFERS: "stx_inbound",
  STX_BALANCE: "stx-balance",
  RECENT_TRANSACTIONS: "recent-transactions",
  MEMPOOL_TRANSACTIONS: "mempool-transactions",
  TX_EVENTS: "tx-events",
  TRANSACTION: "transaction",
  TRANSACTION_DETAILS: "transaction-details",
  TRANSACTIONS_BY_BLOCK: "transactions-by-block",
  MEMPOOL_STATS: "mempool-stats",
  NFT_MINTS: 'nft-mints',
  FUNGIBLE_TOKEN_HOLDERS: 'fungible-token-holders',
  NFT_HOLDINGS: 'nft-holdings',
  NFT_HISTORY: 'nft-history',
};
export const CACHE_EXPIRATION = parseInt(
  process.env.CACHE_EXPIRATION || "900",
  10
); // 15 minutos

export const CRON_INTERVAL = parseInt(process.env.CRON_INTERVAL || "10", 10); // 10 minutos
