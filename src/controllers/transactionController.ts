import { Request, Response } from "express";
import {
  fetchRecentTransactions,
  fetchMempoolTransactions,
  fetchTransactionEvents,
  fetchTransaction,
  fetchTransactionDetails,
  fetchTransactionsByBlock,
  fetchMempoolStats,
} from "../services/transactionService";
import logger from "../utils/logger";

// Controlador para transações recentes
export const getRecentTransactions = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await fetchRecentTransactions();
    res.json(data);
  } catch (error) {
    logger.error(`Error processing recent transactions: ${error}`);
    res.status(500).json({ error: "Error processing recent transactions" });
  }
};

// Controlador para transações na mempool
export const getMempoolTransactions = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await fetchMempoolTransactions();
    res.json(data);
  } catch (error) {
    logger.error(`Error processing mempool transactions: ${error}`);
    res.status(500).json({ error: "Error processing mempool transactions" });
  }
};

// Controlador para eventos de transação
export const getTransactionEvents = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await fetchTransactionEvents();
    res.json(data);
  } catch (error) {
    logger.error(`Error processing transaction events: ${error}`);
    res.status(500).json({ error: "Error processing transaction events" });
  }
};

// Controlador para uma transação específica
export const getTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { txId } = req.params;
    const data = await fetchTransaction(txId);
    res.json(data);
  } catch (error) {
    logger.error(`Error processing transaction ${error}`);
    res.status(500).json({ error: "Error processing transaction" });
  }
};

// Controlador para detalhes de múltiplas transações
export const getTransactionDetails = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await fetchTransactionDetails();
    res.json(data);
  } catch (error) {
    logger.error(`Error processing transaction details: ${error}`);
    res.status(500).json({ error: "Error processing transaction details" });
  }
};

// Controlador para transações por bloco
export const getTransactionsByBlock = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { blockHash } = req.params;
    const data = await fetchTransactionsByBlock(blockHash);
    res.json(data);
  } catch (error) {
    logger.error(
      `Error processing transactions for block ${error}`
    );
    res.status(500).json({ error: "Error processing transactions for block" });
  }
};

// Controlador para estatísticas da mempool
export const getMempoolStats = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await fetchMempoolStats();
    res.json(data);
  } catch (error) {
    logger.error(`Error processing mempool stats: ${error}`);
    res.status(500).json({ error: "Error processing mempool stats" });
  }
};
