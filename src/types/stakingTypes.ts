export interface StackingPoolMembersResponse {
  limit: number;
  offset: number;
  total: number;
  results: {
    stacker: string;
    pox_addr: string;
    amount_ustx: string;
    burn_block_unlock_height: number;
    block_height: number;
    tx_id: string;
  }[];
}

export interface RewardSlotHoldersResponse {
  limit: number;
  offset: number;
  total: number;
  results: {
    canonical: boolean;
    burn_block_hash: string;
    burn_block_height: number;
    address: string;
    slot_index: number;
  }[];
}

export interface RewardSlotHolderEntriesResponse {
  limit: number;
  offset: number;
  total: number;
  results: {
    canonical: boolean;
    burn_block_hash: string;
    burn_block_height: number;
    address: string;
    slot_index: number;
  }[];
}

export interface BurnchainRewardsResponse {
  limit: number;
  offset: number;
  results: {
    canonical: boolean;
    burn_block_hash: string;
    burn_block_height: number;
    burn_amount: string;
    reward_recipient: string;
    reward_amount: string;
    reward_index: number;
  }[];
}

export interface TotalBurnchainReward {
  reward_recipient: string;
  reward_amount: string;
}
