import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Stacks API",
      version: "1.0.0",
      description: "API para consultar dados de blocks e accounts na Stacks",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Block: {
          type: "object",
          properties: {
            canonical: { type: "boolean" },
            height: { type: "integer" },
            hash: { type: "string" },
            block_time: { type: "integer" },
            block_time_iso: { type: "string", format: "date-time" },
            miner_txid: { type: "string" },
            tx_count: { type: "integer" },
            execution_cost_read_count: { type: "integer" },
            execution_cost_read_length: { type: "integer" },
            execution_cost_runtime: { type: "integer" },
            execution_cost_write_count: { type: "integer" },
            execution_cost_write_length: { type: "integer" },
          },
        },
        UserBalances: {
          type: "object",
          properties: {
            stx: {
              type: "object",
              properties: {
                balance: { type: "string" },
                total_sent: { type: "string" },
                total_received: { type: "string" },
              },
            },
            fungible_tokens: {
              type: "object",
              additionalProperties: {
                type: "object",
                properties: { balance: { type: "string" } },
              },
            },
            non_fungible_tokens: {
              type: "object",
              additionalProperties: {
                type: "object",
                properties: { count: { type: "integer" } },
              },
            },
          },
        },
        AccountAssets: {
          type: "object",
          properties: {
            assets: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  asset_type: { type: "string" },
                  asset_id: { type: "string" },
                  balance: { type: "string" },
                },
              },
            },
          },
        },
        InboundSTXTransfers: {
          type: "object",
          properties: {
            limit: { type: "integer" },
            offset: { type: "integer" },
            total: { type: "integer" },
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  sender: { type: "string" },
                  amount: { type: "string" },
                  memo: { type: "string" },
                  block_height: { type: "integer" },
                  tx_id: { type: "string" },
                  transfer_type: {
                    type: "string",
                    enum: ["bulk-send", "transfer", "mint", "burn"],
                  },
                  tx_index: { type: "integer" },
                },
              },
            },
          },
        },
        AccountSTXBalance: {
          type: "object",
          properties: {
            balance: { type: "string" },
            total_sent: { type: "string" },
            total_received: { type: "string" },
          },
        },
        Transaction: {
          type: "object",
          properties: {
            tx_id: { type: "string" },
            sender: { type: "string" },
            recipient: { type: "string" },
            amount: { type: "string" },
            fee: { type: "string" },
            nonce: { type: "integer" },
            block_hash: { type: "string" },
            block_height: { type: "integer" },
            tx_status: {
              type: "string",
              enum: ["pending", "success", "failed"],
            },
            post_conditions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  condition_code: { type: "string" },
                  condition_type: { type: "string" },
                  asset: {
                    type: "object",
                    properties: {
                      asset_type: { type: "string" },
                      contract_id: { type: "string" },
                      asset_name: { type: "string" },
                    },
                  },
                  amount: { type: "string" },
                },
              },
            },
            events: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  event_type: { type: "string" },
                  tx_id: { type: "string" },
                  contract_call: {
                    type: "object",
                    nullable: true,
                    properties: {
                      contract_id: { type: "string" },
                      function_name: { type: "string" },
                      function_args: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            type: { type: "string" },
                            value: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        TransactionEvents: {
          type: "object",
          properties: {
            events: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  event_type: { type: "string" },
                  tx_id: { type: "string" },
                  asset: {
                    type: "object",
                    properties: {
                      asset_type: { type: "string" },
                      asset_id: { type: "string" },
                      amount: { type: "string" },
                    },
                  },
                  contract_call: {
                    type: "object",
                    nullable: true,
                    properties: {
                      contract_id: { type: "string" },
                      function_name: { type: "string" },
                      function_args: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            type: { type: "string" },
                            value: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        TransactionStats: {
          type: "object",
          properties: {
            total_tx_in_mempool: { type: "integer" },
            total_stx_in_mempool: { type: "string" },
            total_fee_rate_in_mempool: { type: "string" },
            average_tx_fee: { type: "string" },
            average_tx_size: { type: "integer" },
            average_tx_fee_rate: { type: "string" },
          },
        },
        TransactionsByBlock: {
          type: "object",
          properties: {
            limit: { type: "integer" },
            offset: { type: "integer" },
            total: { type: "integer" },
            results: {
              type: "array",
              items: { $ref: "#/components/schemas/Transaction" },
            },
          },
        },
        NFTokenMint: {
          type: "object",
          properties: {
            limit: { type: "integer" },
            offset: { type: "integer" },
            total: { type: "integer" },
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  tx_id: { type: "string" },
                  block_height: { type: "integer" },
                  block_hash: { type: "string" },
                  contract_id: { type: "string" },
                  token_id: { type: "string" },
                  recipient: { type: "string" },
                },
              },
            },
          },
        },
        FungibleTokenHoldersResponse: {
          type: "object",
          properties: {
            limit: { type: "integer" },
            offset: { type: "integer" },
            total: { type: "integer" },
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  address: { type: "string" },
                  balance: { type: "string" },
                },
              },
            },
          },
        },
        NFTokenHoldingsResponse: {
          type: "object",
          properties: {
            limit: { type: "integer" },
            offset: { type: "integer" },
            total: { type: "integer" },
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  token_id: { type: "string" },
                  contract_id: { type: "string" },
                  holder: { type: "string" },
                },
              },
            },
          },
        },
        NFTokenHistory: {
          type: "object",
          properties: {
            limit: { type: "integer" },
            offset: { type: "integer" },
            total: { type: "integer" },
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  tx_id: { type: "string" },
                  block_height: { type: "integer" },
                  block_hash: { type: "string" },
                  contract_id: { type: "string" },
                  token_id: { type: "string" },
                  sender: { type: "string" },
                  recipient: { type: "string" },
                },
              },
            },
          },
        },
        PoXCycle: {
          type: "object",
          properties: {
            block_height: { type: "integer" },
            index_block_hash: { type: "string" },
            cycle_number: { type: "integer" },
            total_weight: { type: "integer" },
            total_stacked_amount: { type: "string" },
            total_signers: { type: "integer" },
          },
        },
        PoXCyclesResponse: {
          type: "object",
          properties: {
            limit: { type: "integer" },
            offset: { type: "integer" },
            total: { type: "integer" },
            results: {
              type: "array",
              items: { $ref: "#/components/schemas/PoXCycle" },
            },
          },
        },
        PoXSignersResponse: {
          type: "object",
          properties: {
            limit: { type: "integer" },
            offset: { type: "integer" },
            total: { type: "integer" },
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  signing_key: { type: "string" },
                  signer_address: { type: "string" },
                  weight: { type: "integer" },
                  stacked_amount: { type: "string" },
                  weight_percent: { type: "number" },
                  stacked_amount_percent: { type: "number" },
                  solo_stacker_count: { type: "integer" },
                  pooled_stacker_count: { type: "integer" },
                },
              },
            },
          },
        },
        PoXSignerDetails: {
          type: "object",
          properties: {
            signing_key: { type: "string" },
            signer_address: { type: "string" },
            weight: { type: "integer" },
            stacked_amount: { type: "string" },
            weight_percent: { type: "number" },
            stacked_amount_percent: { type: "number" },
            solo_stacker_count: { type: "integer" },
            pooled_stacker_count: { type: "integer" },
          },
        },
        PoXStackersResponse: {
          type: "object",
          properties: {
            limit: { type: "integer" },
            offset: { type: "integer" },
            total: { type: "integer" },
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  stacker_address: { type: "string" },
                  stacked_amount: { type: "string" },
                  pox_address: { type: "string" },
                  stacker_type: { type: "string", enum: ["solo", "pooled"] },
                },
              },
            },
          },
        },
        StackingPoolMembersResponse: {
          type: "object",
          properties: {
            limit: { type: "integer" },
            offset: { type: "integer" },
            total: { type: "integer" },
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  stacker: { type: "string" },
                  pox_addr: { type: "string" },
                  amount_ustx: { type: "string" },
                  burn_block_unlock_height: { type: "integer" },
                  block_height: { type: "integer" },
                  tx_id: { type: "string" },
                },
              },
            },
          },
        },

        RewardSlotHoldersResponse: {
          type: "object",
          properties: {
            limit: { type: "integer" },
            offset: { type: "integer" },
            total: { type: "integer" },
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  canonical: { type: "boolean" },
                  burn_block_hash: { type: "string" },
                  burn_block_height: { type: "integer" },
                  address: { type: "string" },
                  slot_index: { type: "integer" },
                },
              },
            },
          },
        },

        RewardSlotHolderEntriesResponse: {
          type: "object",
          properties: {
            limit: { type: "integer" },
            offset: { type: "integer" },
            total: { type: "integer" },
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  canonical: { type: "boolean" },
                  burn_block_hash: { type: "string" },
                  burn_block_height: { type: "integer" },
                  address: { type: "string" },
                  slot_index: { type: "integer" },
                },
              },
            },
          },
        },

        BurnchainRewardsResponse: {
          type: "object",
          properties: {
            limit: { type: "integer" },
            offset: { type: "integer" },
            results: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  canonical: { type: "boolean" },
                  burn_block_hash: { type: "string" },
                  burn_block_height: { type: "integer" },
                  burn_amount: { type: "string" },
                  reward_recipient: { type: "string" },
                  reward_amount: { type: "string" },
                  reward_index: { type: "integer" },
                },
              },
            },
          },
        },

        TotalBurnchainReward: {
          type: "object",
          properties: {
            reward_recipient: { type: "string" },
            reward_amount: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Application): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
