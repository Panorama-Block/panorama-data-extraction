import { Router } from "express";
import {
  getNFTMints,
  getFungibleTokenHolders,
  getNFTHoldings,
  getNFTokenHistory,
} from "../controllers/tokenController";

const router = Router();

/**
 * @swagger
 * /api/tokens/nft/mints:
 *   get:
 *     summary: Retorna mintagens de NFTs
 *     responses:
 *       200:
 *         description: Lista de mintagens de NFTs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NFTokenMint'
 */
router.get("/nft/mints", getNFTMints);

/**
 * @swagger
 * /api/tokens/fungible/{contractId}/holders:
 *   get:
 *     summary: Retorna os detentores de um token fungível específico
 *     parameters:
 *       - in: path
 *         name: contractId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contrato do token fungível
 *     responses:
 *       200:
 *         description: Lista de detentores do token fungível
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FungibleTokenHoldersResponse'
 */
router.get("/fungible/:contractId/holders", getFungibleTokenHolders);

/**
 * @swagger
 * /api/tokens/nft/{address}/holdings:
 *   get:
 *     summary: Retorna os NFTs detidos por um endereço específico
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Endereço da conta
 *     responses:
 *       200:
 *         description: Lista de NFTs detidos pelo endereço
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NFTokenHoldingsResponse'
 */
router.get("/nft/:address/holdings", getNFTHoldings);

/**
 * @swagger
 * /api/tokens/nft/{contractId}/history/{tokenId}:
 *   get:
 *     summary: Retorna o histórico de um token não fungível específico
 *     parameters:
 *       - in: path
 *         name: contractId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contrato do token não fungível
 *       - in: path
 *         name: tokenId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do token
 *     responses:
 *       200:
 *         description: Histórico do token não fungível
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NFTokenHistory'
 */
router.get("/nft/:contractId/history/:tokenId", getNFTokenHistory);

export default router;
