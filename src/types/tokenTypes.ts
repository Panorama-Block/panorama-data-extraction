// Tipo para Non-Fungible Token Mints
export interface NFTokenMint {
  limit: number;
  offset: number;
  total: number;
  results: Array<{
    tx_id: string;
    block_height: number;
    block_hash: string;
    contract_id: string;
    token_id: string;
    recipient: string;
  }>;
}

// Tipo para Fungible Token Holders
export interface FungibleTokenHolder {
  address: string;
  balance: string;
}

export interface FungibleTokenHoldersResponse {
  limit: number;
  offset: number;
  total: number;
  results: FungibleTokenHolder[];
}

// Tipo para Non-Fungible Token Holdings
export interface NFTokenHolding {
  token_id: string;
  contract_id: string;
  holder: string;
}

export interface NFTokenHoldingsResponse {
  limit: number;
  offset: number;
  total: number;
  results: NFTokenHolding[];
}

// Tipo para Non-Fungible Token History
export interface NFTokenHistory {
  limit: number;
  offset: number;
  total: number;
  results: Array<{
    tx_id: string;
    block_height: number;
    block_hash: string;
    contract_id: string;
    token_id: string;
    sender: string;
    recipient: string;
  }>;
}
