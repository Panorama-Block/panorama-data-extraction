import { Request, Response } from "express";
import {
  fetchUserBalances,
  fetchAccountAssets,
  fetchInboundSTXTransfers,
  fetchAccountSTXBalance,
} from "../services/accountService";
import logger from "../utils/logger";
import { log } from "console";

export const getUserBalances = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const address = req.params.address;
    const data = await fetchUserBalances(address);
    res.json(data);
  } catch (error) {
    logger.error(
      `Erro ao processar balanço do usuário: ${(error as Error).message}`
    );
    res.status(500).json({ error: "Erro ao processar balanço do usuário" });
  }
};

export const getAccountAssets = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const address = req.params.address;
    const data = await fetchAccountAssets(address);
    res.json(data);
  } catch (error) {
    logger.error(
      `Erro ao processar ativos da conta: ${(error as Error).message}`
    );
    res.status(500).json({ error: "Erro ao processar ativos da conta" });
  }
};

export const getInboundSTXTransfers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const address = req.params.address;
    logger.info(`Recebendo transferências de STX para o endereço ${address}`);
    const data = await fetchInboundSTXTransfers(address);
    res.json(data);
  } catch (error) {
    logger.error(
      `Erro ao processar transferências recebidas de STX: ${
        (error as Error).message
      }`
    );
    res
      .status(500)
      .json({ error: "Erro ao processar transferências recebidas de STX" });
  }
};

export const getAccountSTXBalance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const address = req.params.address;
    const data = await fetchAccountSTXBalance(address);
    res.json(data);
  } catch (error) {
    logger.error(
      `Erro ao processar balanço STX da conta: ${(error as Error).message}`
    );
    res.status(500).json({ error: "Erro ao processar balanço STX da conta" });
  }
};
