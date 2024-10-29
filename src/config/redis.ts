import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL as string);

redis.on("connect", () => console.log("Redis conectado com sucesso."));
redis.on("error", (err) => console.error("Erro de conexão com Redis:", err));

export default redis;
