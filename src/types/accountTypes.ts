export interface UserBalances {
  stx: {
    balance: string;
    total_sent: string;
    total_received: string;
  };
  fungible_tokens: Record<string, { balance: string }>;
  non_fungible_tokens: Record<string, { count: number }>;
}

export interface AccountAssets {
  assets: Array<{
    asset_type: string;
    asset_id: string;
    balance: string;
  }>;
}

export interface InboundSTXTransfers {
  limit: number;
  offset: number;
  total: number;
  results: Array<{
    sender: string;
    amount: string;
    memo: string;
    block_height: number;
    tx_id: string;
    transfer_type: string;
    tx_index: number;
  }>;
}

export interface AccountSTXBalance {
  balance: string;
  total_sent: string;
  total_received: string;
}
