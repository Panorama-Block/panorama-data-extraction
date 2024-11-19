import { Router } from "express";
import {
  getStackingPoolMembers,
  getRewardSlotHolders,
  getRewardSlotHolderEntries,
  getBurnchainRewards,
  getTotalBurnchainReward,
} from "../controllers/stakingController";

const router = Router();

/**
 * @swagger
 * /api/staking/pool/{poolPrincipal}/delegations:
 *   get:
 *     summary: Retorna membros de um pool de stacking
 *     parameters:
 *       - in: path
 *         name: poolPrincipal
 *         required: true
 *         schema:
 *           type: string
 *         description: Endereço principal do pool de stacking
 *       - in: query
 *         name: after_block
 *         schema:
 *           type: integer
 *         description: Filtro para eventos após um bloco específico (opcional)
 *       - in: query
 *         name: unanchored
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Incluir eventos não confirmados
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *           maximum: 200
 *         description: Número máximo de itens
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de itens a pular
 *     responses:
 *       200:
 *         description: Lista de membros do pool de stacking
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StackingPoolMembersResponse'
 */
router.get("/pool/:poolPrincipal/delegations", getStackingPoolMembers);

/**
 * @swagger
 * /api/staking/reward_slot_holders:
 *   get:
 *     summary: Retorna uma lista de reward slot holders
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 96
 *           maximum: 250
 *         description: Máximo de itens para buscar
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Índice do primeiro item
 *     responses:
 *       200:
 *         description: Lista de reward slot holders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RewardSlotHoldersResponse'
 */
router.get("/reward_slot_holders", getRewardSlotHolders);

/**
 * @swagger
 * /api/staking/reward_slot_holders/{address}:
 *   get:
 *     summary: Retorna entradas para um reward slot holder específico
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Endereço do reward slot holder
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 96
 *           maximum: 250
 *         description: Máximo de itens
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Índice do primeiro item
 *     responses:
 *       200:
 *         description: Entradas de reward slot holder
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RewardSlotHolderEntriesResponse'
 */
router.get("/reward_slot_holders/:address", getRewardSlotHolderEntries);

/**
 * @swagger
 * /api/staking/burnchain/rewards:
 *   get:
 *     summary: Retorna recompensas recentes de burnchain
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 96
 *           maximum: 250
 *         description: Máximo de recompensas
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Índice do primeiro item
 *     responses:
 *       200:
 *         description: Lista de recompensas de burnchain
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BurnchainRewardsResponse'
 */
router.get("/burnchain/rewards", getBurnchainRewards);

/**
 * @swagger
 * /api/staking/burnchain/rewards/{address}/total:
 *   get:
 *     summary: Retorna recompensa total para um endereço
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Endereço do reward recipient
 *     responses:
 *       200:
 *         description: Total de recompensas para o endereço
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TotalBurnchainReward'
 */
router.get("/burnchain/rewards/:address/total", getTotalBurnchainReward);

export default router;
