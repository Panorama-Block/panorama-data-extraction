import axios from "axios";
import redis from "../config/redis";
import { CACHE_KEYS, CACHE_EXPIRATION } from "../config/constants";
import logger from "../utils/logger";
import {
  PoXCycle,
  PoXCyclesResponse,
  PoXSignersResponse,
  PoXSignerDetails,
  PoXStackersResponse,
} from "../types/poxTypes";

// Função para obter ciclos de PoX
export const fetchPoXCycles = async (
  limit = 20,
  offset = 0
): Promise<PoXCyclesResponse> => {
  const cacheKey = `${CACHE_KEYS.POX_CYCLES}-${limit}-${offset}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("PoX cycles fetched from cache.");
      return JSON.parse(cachedData);
    }

    const response = await axios.get<PoXCyclesResponse>(
      `${process.env.BASE_URL}/extended/v2/pox/cycles`,
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
    logger.error(`Error fetching PoX cycles: ${error}`);
    throw error;
  }
};

// Função para obter um ciclo específico de PoX
export const fetchPoXCycle = async (cycleNumber: number): Promise<PoXCycle> => {
  const cacheKey = `${CACHE_KEYS.POX_CYCLE}-${cycleNumber}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("PoX cycle fetched from cache.");
      return JSON.parse(cachedData);
    }

    const response = await axios.get<PoXCycle>(
      `${process.env.BASE_URL}/extended/v2/pox/cycles/${cycleNumber}`
    );

    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  } catch (error) {
    logger.error(`Error fetching PoX cycle: ${error}`);
    throw error;
  }
};

// Função para obter signers de um ciclo PoX específico
export const fetchPoXCycleSigners = async (
  cycleNumber: number,
  limit = 20,
  offset = 0
): Promise<PoXSignersResponse> => {
  const cacheKey = `${CACHE_KEYS.POX_CYCLE_SIGNERS}-${cycleNumber}-${limit}-${offset}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("PoX cycle signers fetched from cache.");
      return JSON.parse(cachedData);
    }

    const response = await axios.get<PoXSignersResponse>(
      `${process.env.BASE_URL}/extended/v2/pox/cycles/${cycleNumber}/signers`,
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
    logger.error(`Error fetching PoX cycle signers: ${error}`);
    throw error;
  }
};

// Função para obter detalhes de um signer específico em um ciclo PoX
export const fetchPoXCycleSignerDetails = async (
  cycleNumber: number,
  signerKey: string
): Promise<PoXSignerDetails> => {
  const cacheKey = `${CACHE_KEYS.POX_CYCLE_SIGNER}-${cycleNumber}-${signerKey}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("PoX cycle signer details fetched from cache.");
      return JSON.parse(cachedData);
    }

    const response = await axios.get<PoXSignerDetails>(
      `${process.env.BASE_URL}/extended/v2/pox/cycles/${cycleNumber}/signers/${signerKey}`
    );

    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  } catch (error) {
    logger.error(`Error fetching PoX cycle signer details: ${error}`);
    throw error;
  }
};

// Função para obter stackers de um signer em um ciclo PoX
export const fetchPoXCycleSignerStackers = async (
  cycleNumber: number,
  signerKey: string,
  limit = 20,
  offset = 0
): Promise<PoXStackersResponse> => {
  const cacheKey = `${CACHE_KEYS.POX_CYCLE_SIGNER_STACKERS}-${cycleNumber}-${signerKey}-${limit}-${offset}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("PoX cycle signer stackers fetched from cache.");
      return JSON.parse(cachedData);
    }

    const response = await axios.get<PoXStackersResponse>(
      `${process.env.BASE_URL}/extended/v2/pox/cycles/${cycleNumber}/signers/${signerKey}/stackers`,
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
    logger.error(`Error fetching PoX cycle signer stackers: ${error}`);
    throw error;
  }
};
