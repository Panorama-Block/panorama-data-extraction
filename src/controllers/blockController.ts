import { Request, Response } from "express";
import {
  fetchBlocks,
  fetchBlockByHash,
  fetchAverageBlockTime,
} from "../services/blockService";
import logger from "../utils/logger";

export const getBlocks = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await fetchBlocks();
    res.json(data);
  } catch (error) {
    logger.error(`Erro ao coletar blocks: ${(error as Error).message}`);
    res.status(500).json({ error: "Erro ao processar blocks" });
  }
};

export const getBlockByHash = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hash = req.params.hash;
    const data = await fetchBlockByHash(hash);
    res.json(data);
  } catch (error) {
    logger.error(`Erro ao coletar block por hash: ${(error as Error).message}`);
    res.status(500).json({ error: "Erro ao processar block" });
  }
};

export const getAverageBlockTime = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await fetchAverageBlockTime();
    res.json(data);
  } catch (error) {
    logger.error(
      `Erro ao coletar tempo médio de blocks: ${(error as Error).message}`
    );
    res.status(500).json({ error: "Erro ao processar tempo médio de blocks" });
  }
};

// Função para o cronjob atualizar o cache de blocks
export const updateBlockCache = async (): Promise<void> => {
  try {
    await fetchBlocks();
    await fetchAverageBlockTime();
    logger.info("Dados de blocks atualizados no cache.");
  } catch (error) {
    logger.error(
      `Erro ao atualizar dados de blocks no cache: ${(error as Error).message}`
    );
  }
};
