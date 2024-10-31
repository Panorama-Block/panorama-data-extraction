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

export const fetchPreviousBlocks = async (
  initialHash: string,
  numberOfBlocks: number
): Promise<Block[]> => {
  const blocks: Block[] = [];
  let currentHash = initialHash;

  try {
    for (let i = 0; i < numberOfBlocks; i++) {
      const block = await fetchBlockByHash(currentHash);
      blocks.push(block);

      if (block.parent_block_hash) {
        currentHash = block.parent_block_hash;
      } else {
        logger.info(
          `Não há mais blocos anteriores após ${blocks.length} blocos.`
        );
        break;
      }
    }
    logger.info(
      `Obtidos ${blocks.length} blocos anteriores a partir do hash inicial.`
    );
    return blocks;
  } catch (error) {
    logger.error(
      `Erro ao buscar blocos anteriores: ${(error as Error).message}`
    );
    throw error;
  }
};

export const fetchAverageBlockTime = async (): Promise<AverageBlockTimeResponse> => {
    const cacheKey = CACHE_KEYS.AVERAGE_BLOCK_TIME;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) return JSON.parse(cachedData);

    const response = await axios.get<AverageBlockTimeResponse>(
      `${process.env.BASE_URL}/extended/v2/blocks/average-times`
    );

    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  };

  
