import axios from "axios";
import redis from "../config/redis";
import { CACHE_KEYS, CACHE_EXPIRATION } from "../config/constants";
import logger from "../utils/logger";
import {
  StackingPoolMembersResponse,
  RewardSlotHoldersResponse,
  RewardSlotHolderEntriesResponse,
  BurnchainRewardsResponse,
  TotalBurnchainReward,
} from "../types/stakingTypes";

// Função para obter membros de um pool de stacking
export const fetchStackingPoolMembers = async (
  poolPrincipal: string,
  afterBlock?: number,
  unanchored = false,
  limit = 100,
  offset = 0
): Promise<StackingPoolMembersResponse> => {
  const cacheKey = `${CACHE_KEYS.STACKING_POOL_MEMBERS}-${poolPrincipal}-${afterBlock}-${unanchored}-${limit}-${offset}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("Stacking pool members fetched from cache.");
      return JSON.parse(cachedData);
    }

    const response = await axios.get<StackingPoolMembersResponse>(
      `${process.env.BASE_URL}/extended/v1/pox4/${poolPrincipal}/delegations`,
      {
        params: { after_block: afterBlock, unanchored, limit, offset },
      }
    );

    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  } catch (error) {
    logger.error(`Error fetching stacking pool members: ${error}`);
    throw error;
  }
};

// Função para obter lista de reward slot holders
export const fetchRewardSlotHolders = async (
  limit = 96,
  offset = 0
): Promise<RewardSlotHoldersResponse> => {
  const cacheKey = `${CACHE_KEYS.REWARD_SLOT_HOLDERS}-${limit}-${offset}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("Reward slot holders fetched from cache.");
      return JSON.parse(cachedData);
    }

    const response = await axios.get<RewardSlotHoldersResponse>(
      `${process.env.BASE_URL}/extended/v1/burnchain/reward_slot_holders`,
      { params: { limit, offset } }
    );

    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  } catch (error) {
    logger.error(`Error fetching reward slot holders: ${error}`);
    throw error;
  }
};

// Função para obter entries para um reward slot holder específico
export const fetchRewardSlotHolderEntries = async (
  address: string,
  limit = 96,
  offset = 0
): Promise<RewardSlotHolderEntriesResponse> => {
  const cacheKey = `${CACHE_KEYS.REWARD_SLOT_HOLDER_ENTRIES}-${address}-${limit}-${offset}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("Reward slot holder entries fetched from cache.");
      return JSON.parse(cachedData);
    }

    const response = await axios.get<RewardSlotHolderEntriesResponse>(
      `${process.env.BASE_URL}/extended/v1/burnchain/reward_slot_holders/${address}`,
      { params: { limit, offset } }
    );

    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  } catch (error) {
    logger.error(`Error fetching reward slot holder entries: ${error}`);
    throw error;
  }
};

// Função para obter recompensas de burnchain recentes
export const fetchBurnchainRewards = async (
  limit = 96,
  offset = 0
): Promise<BurnchainRewardsResponse> => {
  const cacheKey = `${CACHE_KEYS.BURNCHAIN_REWARDS}-${limit}-${offset}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("Burnchain rewards fetched from cache.");
      return JSON.parse(cachedData);
    }

    const response = await axios.get<BurnchainRewardsResponse>(
      `${process.env.BASE_URL}/extended/v1/burnchain/rewards`,
      { params: { limit, offset } }
    );

    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  } catch (error) {
    logger.error(`Error fetching burnchain rewards: ${error}`);
    throw error;
  }
};

// Função para obter recompensa total para um endereço específico
export const fetchTotalBurnchainReward = async (
  address: string
): Promise<TotalBurnchainReward> => {
  const cacheKey = `${CACHE_KEYS.TOTAL_BURNCHAIN_REWARD}-${address}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("Total burnchain reward fetched from cache.");
      return JSON.parse(cachedData);
    }

    const response = await axios.get<TotalBurnchainReward>(
      `${process.env.BASE_URL}/extended/v1/burnchain/rewards/${address}/total`
    );

    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  } catch (error) {
    logger.error(`Error fetching total burnchain reward: ${error}`);
    throw error;
  }
};
