import axios from "axios";
import redis from "../config/redis";
import {
  Block,
  PaginatedBlocksResponse,
  AverageBlockTimeResponse,
} from "../types/blockTypes";
import logger from "../utils/logger";
import { CACHE_KEYS, CACHE_EXPIRATION } from "../config/constants";

export const fetchBlocks = async (): Promise<PaginatedBlocksResponse> => {
  const cacheKey = CACHE_KEYS.BLOCKS;
  const cachedData = await redis.get(cacheKey);
  if (cachedData) return JSON.parse(cachedData);

  const response = await axios.get<PaginatedBlocksResponse>(
    `${process.env.BASE_URL}/extended/v2/blocks`
  );
  await redis.set(
    cacheKey,
    JSON.stringify(response.data),
    "EX",
    CACHE_EXPIRATION
  );
  return response.data;
};

export const fetchBlockByHash = async (hash: string): Promise<Block> => {
  const cacheKey = `${CACHE_KEYS.BLOCKS}-${hash}`;
  const cachedData = await redis.get(cacheKey);
  if (cachedData) return JSON.parse(cachedData);

  const response = await axios.get<Block>(
    `${process.env.BASE_URL}/extended/v2/blocks/${hash}`
  );
  await redis.set(
    cacheKey,
    JSON.stringify(response.data),
    "EX",
    CACHE_EXPIRATION
  );
  return response.data;
};

export const fetchAverageBlockTime = async (): Promise<AverageBlockTimeResponse> => {
    const cacheKey = CACHE_KEYS.AVERAGE_BLOCK_TIME;

    logger.info("Fetching average block time from API");

    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData);

    logger.info("Fetching average block time from API 2");

    const response = await axios.get<AverageBlockTimeResponse>(
      `${process.env.BASE_URL}/extended/v2/blocks/average-times`
    );

    logger.info("Fetching average block time from API 3");
    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  };