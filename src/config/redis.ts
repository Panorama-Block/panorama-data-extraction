import Redis from "ioredis";
import logger from "../utils/logger";

const redis = new Redis(process.env.REDIS_URL as string);

redis.on("connect", () => {
  logger.info("Redis conectado com sucesso.");
});

redis.on("error", (err) => {
  logger.error(`Erro de conexão com Redis: ${err}`);
});

export default redis;
