import { Router } from "express";
import {
  getNFTMints,
  getNFTHoldings,
  getNFTokenHistory,
  getFungibleTokenHolders,
} from "../controllers/tokenController";

const router = Router();

/**
 * @swagger
 * /api/tokens/ft/{token}/holders:
 *   get:
 *     summary: Retorna a lista de holders de um token fungível específico
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador do token fungível
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Número máximo de holders para buscar (opcional)
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Índice do primeiro holder a buscar (opcional)
 *     responses:
 *       200:
 *         description: Lista de holders do token fungível
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FungibleTokenHoldersResponse'
 */
router.get("/ft/:token/holders", getFungibleTokenHolders);

/**
 * @swagger
 * /api/tokens/nft/mints:
 *   get:
 *     summary: Retorna mintagens de NFTs
 *     parameters:
 *       - in: query
 *         name: asset_identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador do ativo NFT
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Número máximo de mintagens para buscar
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de resultados a pular
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
 * /api/tokens/nft/holdings:
 *   get:
 *     summary: Retorna todos os NFTs detidos
 *     parameters:
 *       - in: query
 *         name: principal
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador do proprietário dos NFTs
 *       - in: query
 *         name: asset_identifiers
 *         schema:
 *           type: string
 *           description: Lista de identificadores de ativos (separados por vírgula, opcional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Número máximo de NFTs para buscar
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de resultados a pular
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
 *     parameters:
 *       - in: query
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *           pattern: ^[0-9a-fA-F]+$
 *         description: Valor hexadecimal associado ao histórico do NFT
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
