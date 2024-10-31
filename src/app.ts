import express, { Application } from "express";
import blockRoutes from "./routes/blockRoutes";
import accountRoutes from "./routes/accountRoutes";
import cacheMiddleware from "./middlewares/cacheMiddleware";
import { setupSwagger } from "./config/swagger";
import transactionRoutes from "./routes/transactionRoutes";
import tokenRoutes from "./routes/tokenRoutes";

const app: Application = express();

app.use(express.json());

// Configura o Swagger
setupSwagger(app);

// Definindo as rotas
app.use("/api/blocks", cacheMiddleware, blockRoutes);
app.use("/api/accounts", cacheMiddleware, accountRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/tokens", cacheMiddleware, tokenRoutes);

export default app;
