import axios from "axios";
import redis from "../config/redis";
import {
  UserBalances,
  AccountAssets,
  InboundSTXTransfers,
  AccountSTXBalance,
} from "../types/accountTypes";
import logger from "../utils/logger";
import { CACHE_KEYS, CACHE_EXPIRATION } from "../config/constants";

// Função para obter o balanço do usuário
export const fetchUserBalances = async (
  address: string
): Promise<UserBalances> => {
  const cacheKey = `${CACHE_KEYS.USER_BALANCES}-${address}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info(`Balanço do usuário ${address} obtido do cache Redis.`);
      return JSON.parse(cachedData);
    }

    const response = await axios.get<UserBalances>(
      `${process.env.BASE_URL}/extended/v1/address/${address}/balances`
    );
    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    logger.info(`Balanço do usuário ${address} armazenado no cache Redis.`);
    return response.data;
  } catch (error) {
    logger.error(
      `Erro ao buscar balanço do usuário ${address}: ${
        (error as Error).message
      }`
    );
    throw error;
  }
};

// Função para obter ativos da conta
export const fetchAccountAssets = async (
  address: string
): Promise<AccountAssets> => {
  const cacheKey = `${CACHE_KEYS.ACCOUNT_ASSETS}-${address}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info(`Ativos da conta ${address} obtidos do cache Redis.`);
      return JSON.parse(cachedData);
    }

    const response = await axios.get<AccountAssets>(
      `${process.env.BASE_URL}/extended/v1/address/${address}/assets`
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
      `Erro ao buscar ativos da conta ${address}: ${(error as Error).message}`
    );
    throw error;
  }
};

// Função para obter transferências STX recebidas
export const fetchInboundSTXTransfers = async (
  address: string
): Promise<InboundSTXTransfers> => {
  const cacheKey = `${CACHE_KEYS.INBOUND_TRANSFERS}-${address}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info(
        `Transferências recebidas de STX para ${address} obtidas do cache Redis.`
      );
      return JSON.parse(cachedData);
    }

    const response = await axios.get<InboundSTXTransfers>(
      `${process.env.BASE_URL}/extended/v1/address/${address}/stx_inbound`
    );
    logger.info(`ss`)
    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    logger.info(
      `Transferências recebidas de STX para ${address} armazenadas no cache Redis.`
    );
    return response.data;
  } catch (error) {
    logger.error(
      `Erro ao buscar transferências recebidas de STX para ${address}: ${
        (error as Error).message
      }`
    );
    throw error;
  }
};

// Função para obter o balanço STX da conta
export const fetchAccountSTXBalance = async (
  address: string
): Promise<AccountSTXBalance> => {
  const cacheKey = `${CACHE_KEYS.STX_BALANCE}-${address}`;
  try {
    const cachedData = await redis.get(cacheKey);
    logger.info(`Balanço STX da conta ${address} obtido do cache Redis.`);
    if (cachedData) {
      logger.info(`Balanço STX da conta ${address} obtido do cache Redis.`);
      return JSON.parse(cachedData);
    }

    const response = await axios.get<AccountSTXBalance>(
      `${process.env.BASE_URL}/extended/v1/address/${address}/stx`
    );
    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );
    logger.info(`Balanço STX da conta ${address} armazenado no cache Redis.`);
    return response.data;
  } catch (error) {
    logger.error(
      `Erro ao buscar balanço STX da conta ${address}: ${
        (error as Error).message
      }`
    );
    throw error;
  }
};
