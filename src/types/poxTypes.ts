// Estrutura para resposta de um ciclo PoX individual
export interface PoXCycle {
  block_height: number;
  index_block_hash: string;
  cycle_number: number;
  total_weight: number;
  total_stacked_amount: string;
  total_signers: number;
}

// Estrutura para a resposta de múltiplos ciclos PoX
export interface PoXCyclesResponse {
  limit: number;
  offset: number;
  total: number;
  results: PoXCycle[];
}

// Estrutura para um signer específico dentro de um ciclo PoX
export interface PoXSignerDetails {
  signing_key: string;
  signer_address: string;
  weight: number;
  stacked_amount: string;
  weight_percent: number;
  stacked_amount_percent: number;
  solo_stacker_count: number;
  pooled_stacker_count: number;
}

// Estrutura para a resposta de múltiplos signers em um ciclo PoX
export interface PoXSignersResponse {
  limit: number;
  offset: number;
  total: number;
  results: PoXSignerDetails[];
}

// Estrutura para um stacker específico associado a um signer em um ciclo PoX
export interface PoXStacker {
  stacker_address: string;
  stacked_amount: string;
  pox_address: string;
  stacker_type: "solo" | "pooled";
}

// Estrutura para a resposta de múltiplos stackers associados a um signer em um ciclo PoX
export interface PoXStackersResponse {
  limit: number;
  offset: number;
  total: number;
  results: PoXStacker[];
}
