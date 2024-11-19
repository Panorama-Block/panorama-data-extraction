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

export const fetchFungibleTokenHolders = async (
  token: string,
  limit = 50,
  offset = 0
): Promise<FungibleTokenHoldersResponse> => {
  const cacheKey = `${CACHE_KEYS.FUNGIBLE_TOKEN_HOLDERS}-${token}-${limit}-${offset}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("Fungible token holders fetched from cache.");
      return JSON.parse(cachedData);
    }

    const response = await axios.get<FungibleTokenHoldersResponse>(
      `${process.env.BASE_URL}/extended/v1/tokens/ft/${token}/holders`,
      {
        params: { limit, offset },
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
    logger.error(`Error fetching fungible token holders: ${error}`);
    throw error;
  }
};

// Função para obter mintagens de NFTs
export const fetchNFTMints = async (
  asset_identifier: string,
  limit = 50,
  offset = 0,
  unanchored = false,
  tx_metadata = false
): Promise<NFTokenMint> => {
  const cacheKey = `${CACHE_KEYS.NFT_MINTS}-${asset_identifier}-${limit}-${offset}-${unanchored}-${tx_metadata}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("NFT mints fetched from cache.");
      return JSON.parse(cachedData);
    }

    const response = await axios.get<NFTokenMint>(
      `${process.env.BASE_URL}/extended/v1/tokens/nft/mints`,
      {
        params: {
          asset_identifier,
          limit,
          offset,
          unanchored,
          tx_metadata,
        },
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
    logger.error(`Error fetching NFT mints: ${error}`);
    throw error;
  }
};

export const fetchNFTHoldings = async (
  principal: string,
  asset_identifiers: string[] = [],
  limit = 50,
  offset = 0,
  unanchored = false,
  tx_metadata = false
): Promise<NFTokenHoldingsResponse> => {
  const cacheKey = `${
    CACHE_KEYS.NFT_HOLDINGS
  }-${principal}-${asset_identifiers.join(
    ","
  )}-${limit}-${offset}-${unanchored}-${tx_metadata}`;

  try {
    logger.info(`Cache Key: ${cacheKey}`);

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("NFT holdings fetched from cache.");
      return JSON.parse(cachedData);
    }

    logger.info("Fetching NFT holdings from API with parameters:", {
      principal,
      asset_identifiers,
      limit,
      offset,
      unanchored,
      tx_metadata,
    });

    const url = `${process.env.BASE_URL}/extended/v1/tokens/nft/holdings`;

    // Construindo os parâmetros da requisição, omitindo `asset_identifiers` se estiver vazio
    const params: any = {
      principal,
      limit,
      offset,
      unanchored,
      tx_metadata,
    };

    if (asset_identifiers.length > 0) {
      params.asset_identifiers = asset_identifiers.join(",");
    }

    logger.info(`URL: ${url}`);
    logger.info(`Params: ${JSON.stringify(params)}`);

    const response = await axios.get<NFTokenHoldingsResponse>(url, { params });

    if (!response || !response.data) {
      logger.error("Invalid response or no data received from API.");
      throw new Error("No data received from NFT holdings API.");
    }

    logger.info("Data fetched successfully from API");

    await redis.set(
      cacheKey,
      JSON.stringify(response.data),
      "EX",
      CACHE_EXPIRATION
    );

    return response.data;
  } catch (error: any) {
    logger.error(`Error fetching NFT holdings: ${error.message}`);
    if (error.response) {
      logger.error(
        `API Response Error: ${JSON.stringify(error.response.data)}`
      );
    }
    throw error;
  }
};

export const fetchNFTokenHistory = async (
  asset_identifier: string,
  value: string
): Promise<NFTokenHistory> => {
  const cacheKey = `${CACHE_KEYS.NFT_HISTORY}-${asset_identifier}-${value}`;
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      logger.info("NFT history fetched from cache.");
      return JSON.parse(cachedData);
    }

    const response = await axios.get<NFTokenHistory>(
      `${process.env.BASE_URL}/extended/v1/tokens/nft/history`,
      {
        params: {
          asset_identifier,
          value,
        },
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
    logger.error(`Error fetching NFT history: ${error}`);
    throw error;
  }
};
