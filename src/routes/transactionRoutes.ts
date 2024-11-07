import { Router } from "express";
import {
  getRecentTransactions,
  getMempoolTransactions,
  getTransactionEvents,
  getTransaction,
  getTransactionDetails,
  getTransactionsByBlock,
  getMempoolStats,
} from "../controllers/transactionController";

const router = Router();

/**
 * @swagger
 * /api/transactions/recent:
 *   get:
 *     summary: Retorna transações recentes
 *     responses:
 *       200:
 *         description: Lista de transações recentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionsByBlock'
 */
router.get("/recent", getRecentTransactions);

/**
 * @swagger
 * /api/transactions/mempool:
 *   get:
 *     summary: Retorna transações na mempool
 *     responses:
 *       200:
 *         description: Lista de transações na mempool
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionsByBlock'
 */
router.get("/mempool", getMempoolTransactions);

/**
 * @swagger
 * /api/transactions/events:
 *   get:
 *     summary: Retorna eventos de transações
 *     responses:
 *       200:
 *         description: Lista de eventos de transações
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionEvents'
 */
router.get("/events", getTransactionEvents);

/**
 * @swagger
 * /api/transactions/{txId}:
 *   get:
 *     summary: Retorna uma transação específica
 *     parameters:
 *       - in: path
 *         name: txId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da transação
 *     responses:
 *       200:
 *         description: Detalhes de uma transação específica
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 */
router.get("/:txId", getTransaction);

/**
 * @swagger
 * /api/transactions/details:
 *   get:
 *     summary: Retorna detalhes de múltiplas transações
 *     responses:
 *       200:
 *         description: Detalhes de transações
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 */
router.get("/details", getTransactionDetails);

/**
 * @swagger
 * /api/transactions/block/{blockHash}:
 *   get:
 *     summary: Retorna transações de um bloco específico
 *     parameters:
 *       - in: path
 *         name: blockHash
 *         required: true
 *         schema:
 *           type: string
 *         description: Hash do bloco
 *     responses:
 *       200:
 *         description: Lista de transações do bloco especificado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionsByBlock'
 */
router.get("/block/:blockHash", getTransactionsByBlock);

/**
 * @swagger
 * /api/transactions/mempool/stats:
 *   get:
 *     summary: Retorna estatísticas da mempool
 *     responses:
 *       200:
 *         description: Estatísticas da mempool
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionStats'
 */
router.get("/mempool/stats", getMempoolStats);

export default router;
