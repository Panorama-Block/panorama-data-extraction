import { Request, Response } from "express";
import {
  fetchNFTMints,
  fetchNFTHoldings,
  fetchNFTokenHistory,
  fetchFungibleTokenHolders,
} from "../services/tokenService";
import logger from "../utils/logger";

export const getFungibleTokenHolders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.params;
    const limit = Number(req.query.limit) || 50;
    const offset = Number(req.query.offset) || 0;

    if (!token || typeof token !== "string") {
      res.status(400).json({
        error: "Parâmetro 'token' é obrigatório e deve ser uma string",
      });
      return;
    }

    const data = await fetchFungibleTokenHolders(token, limit, offset);
    res.json(data);
  } catch (error) {
    logger.error(`Error processing fungible token holders: ${error}`);
    res.status(500).json({ error: "Error processing fungible token holders" });
  }
};

export const getNFTMints = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { asset_identifier } = req.query;
    const limit = Number(req.query.limit) || 50;
    const offset = Number(req.query.offset) || 0;
    const unanchored = req.query.unanchored === "true";
    const tx_metadata = req.query.tx_metadata === "true";

    if (!asset_identifier || typeof asset_identifier !== "string") {
      res.status(400).json({
        error:
          "Parâmetro 'asset_identifier' é obrigatório e deve ser uma string",
      });
      return;
    }

    const data = await fetchNFTMints(
      asset_identifier,
      limit,
      offset,
      unanchored,
      tx_metadata
    );
    res.json(data);
  } catch (error) {
    logger.error(`Error processing NFT mints: ${error}`);
    res.status(500).json({ error: "Error processing NFT mints" });
  }
};

export const getNFTHoldings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { principal } = req.query;
    const asset_identifiers = req.query.asset_identifiers
      ? (req.query.asset_identifiers as string).split(",")
      : [];
    const limit = Number(req.query.limit) || 50;
    const offset = Number(req.query.offset) || 0;
    const unanchored = req.query.unanchored === "true";
    const tx_metadata = req.query.tx_metadata === "true";

    if (!principal || typeof principal !== "string") {
      res.status(400).json({
        error: "Parâmetro 'principal' é obrigatório e deve ser uma string",
      });
      return;
    }

    const data = await fetchNFTHoldings(
      principal,
      asset_identifiers,
      limit,
      offset,
      unanchored,
      tx_metadata
    );
    res.json(data);
  } catch (error) {
    logger.error(`Error processing NFT holdings: ${error}`);
    res.status(500).json({ error: "Error processing NFT holdings" });
  }
};

export const getNFTokenHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { asset_identifier, value } = req.query;

    if (!asset_identifier || typeof asset_identifier !== "string") {
      res.status(400).json({
        error:
          "Parâmetro 'asset_identifier' é obrigatório e deve ser uma string",
      });
      return;
    }

    if (!value || typeof value !== "string") {
      res.status(400).json({
        error:
          "Parâmetro 'value' é obrigatório e deve ser uma string hexadecimal",
      });
      return;
    }

    const data = await fetchNFTokenHistory(asset_identifier, value);
    res.json(data);
  } catch (error) {
    logger.error(`Error processing NFT token history: ${error}`);
    res.status(500).json({ error: "Error processing NFT token history" });
  }
};
