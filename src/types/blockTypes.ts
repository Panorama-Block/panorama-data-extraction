export interface Block {
  canonical: boolean;
  height: number;
  hash: string;
  block_time: number;
  block_time_iso: string;
  index_block_hash: string;
  parent_block_hash: string;
  parent_index_block_hash: string;
  burn_block_time: number;
  burn_block_time_iso: string;
  burn_block_hash: string;
  burn_block_height: number;
  miner_txid: string;
  tx_count: number;
  execution_cost_read_count: number;
  execution_cost_read_length: number;
  execution_cost_runtime: number;
  execution_cost_write_count: number;
  execution_cost_write_length: number;
}

export interface BlockResponse {
  canonical: boolean;
  height: number;
  hash: string;
  block_time: number;
  block_time_iso: string;
  index_block_hash: string;
  parent_block_hash: string;
  parent_index_block_hash: string;
  burn_block_time: number;
  burn_block_time_iso: string;
  burn_block_hash: string;
  burn_block_height: number;
  miner_txid: string;
  tx_count: number;
  execution_cost_read_count: number;
  execution_cost_read_length: number;
  execution_cost_runtime: number;
  execution_cost_write_count: number;
  execution_cost_write_length: number;
}

export interface PaginatedBlocksResponse {
  limit: number;
  offset: number;
  total: number;
  results: Block[];
}

export interface BurnBlocksResponse {
  limit: number;
  offset: number;
  total: number;
  results: Block[];
}

export interface AverageBlockTimeResponse {
  last_1h: number;
  last_24h: number;
  last_7d: number;
  last_30d: number;
}
