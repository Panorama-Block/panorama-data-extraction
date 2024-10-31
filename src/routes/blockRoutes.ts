import { Router } from "express";
import {
  getBlocks,
  getBlockByHash,
  getAverageBlockTime,
  getPreviousBlocks,
} from "../controllers/blockController";

const router = Router();

/**
 * @swagger
 * /api/blocks:
 *   get:
 *     summary: Retorna todos os blocos
 *     responses:
 *       200:
 *         description: Lista de blocos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 limit:
 *                   type: integer
 *                 offset:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Block'
 */
router.get("/", getBlocks);

/**
 * @swagger
 * /api/blocks/{hash}:
 *   get:
 *     summary: Retorna um bloco específico pelo hash
 *     parameters:
 *       - in: path
 *         name: hash
 *         required: true
 *         schema:
 *           type: string
 *         description: Hash do bloco
 *     responses:
 *       200:
 *         description: Dados do bloco
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Block'
 */
router.get("/:hash", getBlockByHash);

/**
 * @swagger
 * /api/blocks/average-times:
 *   get:
 *     summary: Retorna o tempo médio dos blocos
 *     responses:
 *       200:
 *         description: Tempo médio dos blocos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 last_1h:
 *                   type: integer
 *                 last_24h:
 *                   type: integer
 *                 last_7d:
 *                   type: integer
 *                 last_30d:
 *                   type: integer
 */
router.get("/average-times", getAverageBlockTime);

/**
 * @swagger
 * /api/blocks/previous/{hash}:
 *   get:
 *     summary: Retorna blocos anteriores a partir de um hash inicial
 *     parameters:
 *       - in: path
 *         name: hash
 *         required: true
 *         schema:
 *           type: string
 *         description: Hash do bloco inicial
 *       - in: query
 *         name: numberOfBlocks
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de blocos anteriores a serem retornados (padrão: 10)
 *     responses:
 *       200:
 *         description: Lista de blocos anteriores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Block'
 */
router.get("/previous/:hash", getPreviousBlocks);

export default router;
