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
 * /api/tokens/ft/{token}/holders:
 *   get:
 *     summary: Retorna os detentores de um token fungível específico
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do token fungível
 *     responses:
 *       200:
 *         description: Lista de detentores do token fungível
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FungibleTokenHoldersResponse'
 */
router.get("/ft/:token/holders", getFungibleTokenHolders);

/**
 * @swagger
 * /api/tokens/nft/holdings:
 *   get:
 *     summary: Retorna todos os NFTs detidos
 *     responses:
 *       200:
 *         description: Lista de NFTs detidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NFTokenHoldingsResponse'
 */
router.get("/nft/holdings", getNFTHoldings);

/**
 * @swagger
 * /api/tokens/nft/history:
 *   get:
 *     summary: Retorna o histórico de tokens não fungíveis
 *     responses:
 *       200:
 *         description: Histórico de tokens não fungíveis
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NFTokenHistory'
 */
router.get("/nft/history", getNFTokenHistory);

export default router;
