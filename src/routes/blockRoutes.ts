import { Router } from "express";
import {
  getBlocks,
  getBlockByHash,
  getAverageBlockTime,
} from "../controllers/blockController";

const router = Router();

router.get("/", getBlocks);
router.get("/:hash", getBlockByHash);
router.get("/average_block_time", getAverageBlockTime);

export default router;
