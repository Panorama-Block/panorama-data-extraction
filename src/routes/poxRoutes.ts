import { Router } from "express";
import {
  getPoXCycles,
  getPoXCycle,
  getPoXCycleSigners,
  getPoXCycleSignerDetails,
  getPoXCycleSignerStackers,
} from "../controllers/poxController";

const router = Router();

/**
 * @swagger
 * /api/pox/cycles:
 *   get:
 *     summary: Retorna uma lista de ciclos PoX
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Número máximo de ciclos para buscar (opcional)
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Índice do primeiro ciclo a buscar (opcional)
 *     responses:
 *       200:
 *         description: Lista de ciclos PoX
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PoXCyclesResponse'
 */
router.get("/cycles", getPoXCycles);

/**
 * @swagger
 * /api/pox/cycles/{cycleNumber}:
 *   get:
 *     summary: Retorna detalhes de um ciclo PoX específico
 *     parameters:
 *       - in: path
 *         name: cycleNumber
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número do ciclo PoX
 *     responses:
 *       200:
 *         description: Detalhes de um ciclo PoX específico
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PoXCycle'
 */
router.get("/cycles/:cycleNumber", getPoXCycle);

/**
 * @swagger
 * /api/pox/cycles/{cycleNumber}/signers:
 *   get:
 *     summary: Retorna uma lista de signers em um ciclo PoX
 *     parameters:
 *       - in: path
 *         name: cycleNumber
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número do ciclo PoX
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Número máximo de signers para buscar (opcional)
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Índice do primeiro signer a buscar (opcional)
 *     responses:
 *       200:
 *         description: Lista de signers do ciclo PoX
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PoXSignersResponse'
 */
router.get("/cycles/:cycleNumber/signers", getPoXCycleSigners);

/**
 * @swagger
 * /api/pox/cycles/{cycleNumber}/signers/{signerKey}:
 *   get:
 *     summary: Retorna detalhes de um signer específico em um ciclo PoX
 *     parameters:
 *       - in: path
 *         name: cycleNumber
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número do ciclo PoX
 *       - in: path
 *         name: signerKey
 *         required: true
 *         schema:
 *           type: string
 *         description: Chave do signer
 *     responses:
 *       200:
 *         description: Detalhes de um signer específico
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PoXSignerDetails'
 */
router.get("/cycles/:cycleNumber/signers/:signerKey", getPoXCycleSignerDetails);

/**
 * @swagger
 * /api/pox/cycles/{cycleNumber}/signers/{signerKey}/stackers:
 *   get:
 *     summary: Retorna uma lista de stackers de um signer em um ciclo PoX
 *     parameters:
 *       - in: path
 *         name: cycleNumber
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número do ciclo PoX
 *       - in: path
 *         name: signerKey
 *         required: true
 *         schema:
 *           type: string
 *         description: Chave do signer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Número máximo de stackers para buscar (opcional)
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Índice do primeiro stacker a buscar (opcional)
 *     responses:
 *       200:
 *         description: Lista de stackers de um signer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PoXStackersResponse'
 */
router.get(
  "/cycles/:cycleNumber/signers/:signerKey/stackers",
  getPoXCycleSignerStackers
);

export default router;
