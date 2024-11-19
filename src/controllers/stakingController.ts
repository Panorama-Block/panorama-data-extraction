import { Request, Response } from "express";
import {
  fetchStackingPoolMembers,
  fetchRewardSlotHolders,
  fetchRewardSlotHolderEntries,
  fetchBurnchainRewards,
  fetchTotalBurnchainReward,
} from "../services/stakingService";
import logger from "../utils/logger";

export const getStackingPoolMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { poolPrincipal } = req.params;
    const afterBlock = req.query.after_block
      ? Number(req.query.after_block)
      : undefined;
    const unanchored = req.query.unanchored === "true";
    const limit = Number(req.query.limit) || 100;
    const offset = Number(req.query.offset) || 0;

    const data = await fetchStackingPoolMembers(
      poolPrincipal,
      afterBlock,
      unanchored,
      limit,
      offset
    );
    res.json(data);
  } catch (error) {
    logger.error(`Error processing stacking pool members: ${error}`);
    res.status(500).json({ error: "Error processing stacking pool members" });
  }
};

export const getRewardSlotHolders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const limit = Number(req.query.limit) || 96;
    const offset = Number(req.query.offset) || 0;

    const data = await fetchRewardSlotHolders(limit, offset);
    res.json(data);
  } catch (error) {
    logger.error(`Error processing reward slot holders: ${error}`);
    res.status(500).json({ error: "Error processing reward slot holders" });
  }
};

export const getRewardSlotHolderEntries = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { address } = req.params;
    const limit = Number(req.query.limit) || 96;
    const offset = Number(req.query.offset) || 0;

    const data = await fetchRewardSlotHolderEntries(address, limit, offset);
    res.json(data);
  } catch (error) {
    logger.error(`Error processing reward slot holder entries: ${error}`);
    res
      .status(500)
      .json({ error: "Error processing reward slot holder entries" });
  }
};

export const getBurnchainRewards = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const limit = Number(req.query.limit) || 96;
    const offset = Number(req.query.offset) || 0;

    const data = await fetchBurnchainRewards(limit, offset);
    res.json(data);
  } catch (error) {
    logger.error(`Error processing burnchain rewards: ${error}`);
    res.status(500).json({ error: "Error processing burnchain rewards" });
  }
};

export const getTotalBurnchainReward = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { address } = req.params;
    const data = await fetchTotalBurnchainReward(address);
    res.json(data);
  } catch (error) {
    logger.error(`Error processing total burnchain reward: ${error}`);
    res.status(500).json({ error: "Error processing total burnchain reward" });
  }
};
