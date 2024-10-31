import dotenv from "dotenv";
dotenv.config();

import app from "./src/app";
import logger from "./src/utils/logger";
import { updateBlockCache } from "./src/controllers/blockController";
import cron from "node-cron";
import { CRON_INTERVAL } from "./src/config/constants";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Cronjob para atualizar dados de blocks a cada 10 minutos
  cron.schedule(`*/${CRON_INTERVAL} * * * *`, updateBlockCache);

  app.listen(PORT, () => {
    logger.info(`Servidor rodando na porta ${PORT}`);
  });
};

startServer();
