import { Request, Response, NextFunction } from "express";
import redis from "../config/redis";

const cacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const cacheKey = `cache:${req.originalUrl}`;
  redis.get(cacheKey, (err, data) => {
    if (err) throw err;
    if (data) {
      res.json(JSON.parse(data));
    } else {
      next();
    }
  });
};

export default cacheMiddleware;
