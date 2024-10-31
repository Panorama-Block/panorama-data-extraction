// Tipo para transferências STX recebidas (Inbound Transfers)
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
    transfer_type: "bulk-send" | "transfer" | "mint" | "burn";
    tx_index: number;
  }>;
}

// Tipo para detalhes de uma transação específica (Transaction)
export interface Transaction {
  tx_id: string;
  sender: string;
  recipient: string;
  amount: string;
  fee: string;
  nonce: number;
  block_hash: string;
  block_height: number;
  tx_status: "pending" | "success" | "failed";
  post_conditions: Array<{
    condition_code: string;
    condition_type: string;
    asset: {
      asset_type: string;
      contract_id: string;
      asset_name: string;
    };
    amount: string;
  }>;
  events: Array<{
    event_type: string;
    tx_id: string;
    contract_call?: {
      contract_id: string;
      function_name: string;
      function_args: Array<{ type: string; value: string }>;
    };
  }>;
}

// Tipo para eventos associados a uma transação específica (TransactionEvents)
export interface TransactionEvents {
  events: Array<{
    event_type: string;
    tx_id: string;
    asset: {
      asset_type: string;
      asset_id: string;
      amount: string;
    };
    contract_call?: {
      contract_id: string;
      function_name: string;
      function_args: Array<{ type: string; value: string }>;
    };
  }>;
}

// Tipo para transações na mempool (MempoolTransaction)
export interface MempoolTransaction {
  tx_id: string;
  sender: string;
  nonce: number;
  fee: string;
  tx_status: "pending";
  function_call?: {
    contract_id: string;
    function_name: string;
    function_args: Array<{ type: string; value: string }>;
  };
}

// Tipo para transações paginadas (PaginatedTransactions)
export interface PaginatedTransactions {
  limit: number;
  offset: number;
  total: number;
  results: Transaction[];
}

// Tipo para detalhes completos de uma transação (TransactionDetails)
export interface TransactionDetails {
  tx_id: string;
  sender: string;
  recipient: string;
  amount: string;
  fee: string;
  nonce: number;
  block_hash: string;
  block_height: number;
  tx_status: "pending" | "success" | "failed";
  post_conditions: Array<{
    condition_code: string;
    condition_type: string;
    asset: {
      asset_type: string;
      contract_id: string;
      asset_name: string;
    };
    amount: string;
  }>;
  events: Array<{
    event_type: string;
    tx_id: string;
    asset?: {
      asset_type: string;
      asset_id: string;
      amount: string;
    };
    contract_call?: {
      contract_id: string;
      function_name: string;
      function_args: Array<{ type: string; value: string }>;
    };
  }>;
}

// Tipo para transações por bloco (TransactionsByBlock)
export interface TransactionsByBlock {
  limit: number;
  offset: number;
  total: number;
  results: Transaction[];
}

// Tipo para estatísticas da mempool (TransactionStats)
export interface TransactionStats {
  total_tx_in_mempool: number;
  total_stx_in_mempool: string;
  total_fee_rate_in_mempool: string;
  average_tx_fee: string;
  average_tx_size: number;
  average_tx_fee_rate: string;
}
