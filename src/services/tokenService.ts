import axios from "axios";
import redis from "../config/redis";
import {
  NFTokenMint,
  FungibleTokenHoldersResponse,
  NFTokenHoldingsResponse,
  NFTokenHistory,
} from "../types/tokenTypes";
import logger from "../utils/logger";
import { CACHE_KEYS, CACHE_EXPIRATION } from "../config/constants";

// Função para obter mintagens de NFTs
export const fetchNFTMints = async (): Promise<NFTokenMint> => {
  const cacheKey = CACHE_KEYS.NFT_MINTS;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("NFT mints fetched from cache.");
      return JSON.parse(cachedData);
    }

    const response = await axios.get<NFTokenMint>(
      `${process.env.BASE_URL}/extended/v1/tokens/nft/mints`
    );
    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  } catch (error) {
    logger.error(`Error fetching NFT mints: ${error}`);
    throw error;
  }
};

// Função para obter detentores de um token fungível
export const fetchFungibleTokenHolders = async (
  token: string
): Promise<FungibleTokenHoldersResponse> => {
  const cacheKey = `${CACHE_KEYS.FUNGIBLE_TOKEN_HOLDERS}-${token}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info(`Fungible token holders for ${token} fetched from cache.`);
      return JSON.parse(cachedData);
    }

    const response = await axios.get<FungibleTokenHoldersResponse>(
      `${process.env.BASE_URL}/extended/v1/tokens/ft/${token}/holders`
    );
    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  } catch (error) {
    logger.error(
      `Error fetching fungible token holders for ${token}: ${error}`
    );
    throw error;
  }
};

// Função para obter tokens não fungíveis detidos por um endereço
export const fetchNFTHoldings = async (): Promise<NFTokenHoldingsResponse> => {
  const cacheKey = CACHE_KEYS.NFT_HOLDINGS;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info(`NFT holdings fetched from cache.`);
      return JSON.parse(cachedData);
    }

    const response = await axios.get<NFTokenHoldingsResponse>(
      `${process.env.BASE_URL}/extended/v1/tokens/nft/holdings`
    );
    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  } catch (error) {
    logger.error(`Error fetching NFT holdings: ${error}`);
    throw error;
  }
};

// Função para obter o histórico de um token não fungível
export const fetchNFTokenHistory = async (): Promise<NFTokenHistory> => {
  const cacheKey = CACHE_KEYS.NFT_HISTORY;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info(`NFT history fetched from cache.`);
      return JSON.parse(cachedData);
    }

    const response = await axios.get<NFTokenHistory>(
      `${process.env.BASE_URL}/extended/v1/tokens/nft/history`
    );
    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  } catch (error) {
    logger.error(`Error fetching NFT history: ${error}`);
    throw error;
  }
};
