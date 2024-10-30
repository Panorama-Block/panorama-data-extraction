import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Stacks API',
      version: '1.0.0',
      description: 'API para consultar dados de blocks e accounts na Stacks',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Block: {
          type: 'object',
          properties: {
            canonical: { type: 'boolean' },
            height: { type: 'integer' },
            hash: { type: 'string' },
            block_time: { type: 'integer' },
            block_time_iso: { type: 'string', format: 'date-time' },
            miner_txid: { type: 'string' },
          },
        },
        UserBalances: {
          type: 'object',
          properties: {
            stx: { 
              type: 'object',
              properties: {
                balance: { type: 'string' },
                total_sent: { type: 'string' },
                total_received: { type: 'string' },
              },
            },
            fungible_tokens: {
              type: 'object',
              additionalProperties: { type: 'object', properties: { balance: { type: 'string' } } },
            },
            non_fungible_tokens: {
              type: 'object',
              additionalProperties: { type: 'object', properties: { count: { type: 'integer' } } },
            },
          },
        },
        AccountAssets: {
          type: 'object',
          properties: {
            assets: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  asset_type: { type: 'string' },
                  asset_id: { type: 'string' },
                  balance: { type: 'string' },
                },
              },
            },
          },
        },
            
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Application): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
