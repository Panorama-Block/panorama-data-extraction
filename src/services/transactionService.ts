import axios from "axios";
import redis from "../config/redis";
import {
  InboundSTXTransfers,
  Transaction,
  TransactionEvents,
  MempoolTransaction,
  PaginatedTransactions,
  TransactionDetails,
  TransactionStats,
  TransactionsByBlock,
} from "../types/transactionTypes";
import logger from "../utils/logger";
import { CACHE_KEYS, CACHE_EXPIRATION } from "../config/constants";

// Função para obter transações recentes
export const fetchRecentTransactions =
  async (): Promise<PaginatedTransactions> => {
    const cacheKey = CACHE_KEYS.RECENT_TRANSACTIONS;
    try {
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        logger.info(`Recent transactions fetched from cache.`);
        return JSON.parse(cachedData);
      }

      const response = await axios.get<PaginatedTransactions>(
        `${process.env.BASE_URL}/extended/v1/tx`
      );
      await redis.set(
        cacheKey,
        JSON.stringify(response.data),
        "EX",
        CACHE_EXPIRATION
      );
      return response.data;
    } catch (error) {
      logger.error(`Error fetching recent transactions: ${error}`);
      throw error;
    }
  };

// Função para obter transações na mempool
export const fetchMempoolTransactions = async (): Promise<
  MempoolTransaction[]
> => {
  const cacheKey = CACHE_KEYS.MEMPOOL_TRANSACTIONS;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info(`Mempool transactions fetched from cache.`);
      return JSON.parse(cachedData);
    }

    const response = await axios.get<MempoolTransaction[]>(
      `${process.env.BASE_URL}/extended/v1/tx/mempool`
    );
    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  } catch (error) {
    logger.error(`Error fetching mempool transactions: ${error}`);
    throw error;
  }
};

// Função para obter eventos de uma transação
export const fetchTransactionEvents = async (): Promise<TransactionEvents> => {
  const cacheKey = CACHE_KEYS.TX_EVENTS;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info(`Transaction events fetched from cache.`);
      return JSON.parse(cachedData);
    }

    const response = await axios.get<TransactionEvents>(
      `${process.env.BASE_URL}/extended/v1/tx/events`
    );
    await redis.set(cacheKey, JSON.stringify(response.data), "EX", CACHE_EXPIRATION);
    return response.data;
  } catch (error) {
    logger.error(`Error fetching transaction events: ${error}`);
    throw error;
  }
};


export const fetchTransaction = async (
  txId: string
): Promise<TransactionDetails> => {
  const cacheKey = `${CACHE_KEYS.TRANSACTION}-${txId}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info(`Transaction ${txId} fetched from cache.`);
      return JSON.parse(cachedData);
    }

    const response = await axios.get<TransactionDetails>(
      `${process.env.BASE_URL}/extended/v1/tx/${txId}`
    );
    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  } catch (error) {
    logger.error(`Error fetching transaction ${txId}: ${error}`);
    throw error;
  }
};

// Função para obter detalhes de transações
export const fetchTransactionDetails = async (): Promise<TransactionDetails[]> => {
  const cacheKey = CACHE_KEYS.TRANSACTION_DETAILS;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info(`Transaction details fetched from cache.`);
      return JSON.parse(cachedData);
    }

    const response = await axios.get<TransactionDetails[]>(
      `${process.env.BASE_URL}/extended/v1/tx/multiple`
    );
    await redis.set(cacheKey, JSON.stringify(response.data), "EX", CACHE_EXPIRATION);
    return response.data;
  } catch (error) {
    logger.error(`Error fetching transaction details: ${error}`);
    throw error;
  }
};

// Função para obter transações por bloco
export const fetchTransactionsByBlock = async (blockHash: string): Promise<TransactionsByBlock> => {
  const cacheKey = `${CACHE_KEYS.TRANSACTIONS_BY_BLOCK}-${blockHash}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info(`Transactions for block ${blockHash} fetched from cache.`);
      return JSON.parse(cachedData);
    }

    const response = await axios.get<TransactionsByBlock>(
      `${process.env.BASE_URL}/extended/v1/block/${blockHash}/tx`
    );
    await redis.set(cacheKey, JSON.stringify(response.data), "EX", CACHE_EXPIRATION);
    return response.data;
  } catch (error) {
    logger.error(`Error fetching transactions for block ${blockHash}: ${error}`);
    throw error;
  }
};


// Função para obter estatísticas da mempool
export const fetchMempoolStats = async (): Promise<TransactionStats> => {
  const cacheKey = CACHE_KEYS.MEMPOOL_STATS;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info(`Mempool stats fetched from cache.`);
      return JSON.parse(cachedData);
    }

    const response = await axios.get<TransactionStats>(
      `${process.env.BASE_URL}/extended/v1/tx/mempool/stats`
    );
    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    return response.data;
  } catch (error) {
    logger.error(`Error fetching mempool stats: ${error}`);
    throw error;
  }
};
