import { Router } from "express";
import {
  getUserBalances,
  getAccountAssets,
  getInboundSTXTransfers,
  getAccountSTXBalance,
} from "../controllers/accountController";

const router = Router();

/**
 * @swagger
 * /api/accounts/{address}/balances:
 *   get:
 *     summary: Retorna o balanço do usuário
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Endereço do usuário
 *     responses:
 *       200:
 *         description: Balanço do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserBalances'
 */
router.get("/:address/balances", getUserBalances);

/**
 * @swagger
 * /api/accounts/{address}/assets:
 *   get:
 *     summary: Retorna os ativos de uma conta
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Endereço da conta
 *     responses:
 *       200:
 *         description: Ativos da conta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountAssets'
 */
router.get("/:address/assets", getAccountAssets);

/**
 * @swagger
 * /api/accounts/{address}/stx_inbound:
 *   get:
 *     summary: Retorna transferências de STX recebidas
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Endereço da conta
 *     responses:
 *       200:
 *         description: Transferências recebidas de STX
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InboundSTXTransfers'
 */
router.get("/:address/stx_inbound", getInboundSTXTransfers);

/**
 * @swagger
 * /api/accounts/{address}/stx:
 *   get:
 *     summary: Retorna o balanço STX da conta
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Endereço da conta
 *     responses:
 *       200:
 *         description: Balanço STX da conta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountSTXBalance'
 */
router.get("/:address/stx", getAccountSTXBalance);

export default router;
