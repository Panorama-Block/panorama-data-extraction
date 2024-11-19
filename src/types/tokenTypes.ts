export interface FungibleTokenHoldersResponse {
  limit: number;
  offset: number;
  total: number;
  total_supply: string;
  results: {
    address: string;
    balance: string;
  }[];
}

export interface NFTokenMint {
  limit: number;
  offset: number;
  total: number;
  results: Array<{
    recipient: string;
    event_index: number;
    value: {
      hex: string;
      repr: string;
    };
    tx_id: string;
  }>;
}

export interface NFTokenHoldingsResponse {
  limit: number;
  offset: number;
  total: number;
  results: Array<{
    asset_identifier: string;
    value: {
      hex: string;
      repr: string;
    };
    block_height: number;
    tx_id: string;
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
  total_supply: string;
  results: FungibleTokenHolder[];
}

// Tipo para Non-Fungible Token History
export interface NFTokenHistory {
  limit: number;
  offset: number;
  total: number;
  results: Array<{
    sender: string;
    recipient: string;
    event_index: number;
    asset_event_type: string;
    tx_id: string;
  }>;
}
