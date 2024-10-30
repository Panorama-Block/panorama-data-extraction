import { Request, Response } from "express";
import {
  fetchNFTMints,
  fetchFungibleTokenHolders,
  fetchNFTHoldings,
  fetchNFTokenHistory,
} from "../services/tokenService";
import logger from "../utils/logger";

export const getNFTMints = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await fetchNFTMints();
    res.json(data);
  } catch (error) {
    logger.error(`Error processing NFT mints: ${error}`);
    res.status(500).json({ error: "Error processing NFT mints" });
  }
};

export const getFungibleTokenHolders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.params;
    const data = await fetchFungibleTokenHolders(token);
    res.json(data);
  } catch (error) {
    logger.error(
      `Error processing fungible token holders for ${req.params.token}: ${error}`
    );
    res.status(500).json({ error: "Error processing fungible token holders" });
  }
};

export const getNFTHoldings = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await fetchNFTHoldings();
    res.json(data);
  } catch (error) {
    logger.error(`Error processing NFT holdings: ${error}`);
    res.status(500).json({ error: "Error processing NFT holdings" });
  }
};

export const getNFTokenHistory = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await fetchNFTokenHistory();
    res.json(data);
  } catch (error) {
    logger.error(`Error processing NFT token history: ${error}`);
    res.status(500).json({ error: "Error processing NFT token history" });
  }
};
