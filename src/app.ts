import express, { Application } from "express";
import blockRoutes from "./routes/blockRoutes";
import cacheMiddleware from "./middlewares/cacheMiddleware";

const app: Application = express();

app.use(express.json());
app.use("/api/blocks", cacheMiddleware, blockRoutes);

export default app;
