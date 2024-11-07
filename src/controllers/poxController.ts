import { Request, Response } from "express";
import {
  fetchPoXCycles,
  fetchPoXCycle,
  fetchPoXCycleSigners,
  fetchPoXCycleSignerDetails,
  fetchPoXCycleSignerStackers,
} from "../services/poxService";
import logger from "../utils/logger";

export const getPoXCycles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;
    const data = await fetchPoXCycles(limit, offset);
    res.json(data);
  } catch (error) {
    logger.error(`Error processing PoX cycles: ${error}`);
    res.status(500).json({ error: "Error processing PoX cycles" });
  }
};

export const getPoXCycle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cycleNumber } = req.params;
    const data = await fetchPoXCycle(Number(cycleNumber));
    res.json(data);
  } catch (error) {
    logger.error(`Error processing PoX cycle: ${error}`);
    res.status(500).json({ error: "Error processing PoX cycle" });
  }
};

export const getPoXCycleSigners = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cycleNumber } = req.params;
    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;
    const data = await fetchPoXCycleSigners(Number(cycleNumber), limit, offset);
    res.json(data);
  } catch (error) {
    logger.error(`Error processing PoX cycle signers: ${error}`);
    res.status(500).json({ error: "Error processing PoX cycle signers" });
  }
};

export const getPoXCycleSignerDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cycleNumber, signerKey } = req.params;
    const data = await fetchPoXCycleSignerDetails(
      Number(cycleNumber),
      signerKey
    );
    res.json(data);
  } catch (error) {
    logger.error(`Error processing PoX cycle signer details: ${error}`);
    res
      .status(500)
      .json({ error: "Error processing PoX cycle signer details" });
  }
};

export const getPoXCycleSignerStackers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cycleNumber, signerKey } = req.params;
    const limit = Number(req.query.limit) || 20;
    const offset = Number(req.query.offset) || 0;
    const data = await fetchPoXCycleSignerStackers(
      Number(cycleNumber),
      signerKey,
      limit,
      offset
    );
    res.json(data);
  } catch (error) {
    logger.error(`Error processing PoX cycle signer stackers: ${error}`);
    res
      .status(500)
      .json({ error: "Error processing PoX cycle signer stackers" });
  }
};
