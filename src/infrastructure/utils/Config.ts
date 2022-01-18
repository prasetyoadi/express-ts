import dotenv from "dotenv";

dotenv.config();

const config = Object.freeze({
  env: process.env.NODE_ENV ?? "development",
  debug: Boolean(process.env.DEBUG),
  port: Number(process.env.PORT ?? "9000"),
  cors: {
    origin: process.env.CORS_ORIGIN ?? "*"
  },
  logging: {
    label: process.env.LOG_LABEL ?? "",
    level: process.env.LOG_LEVEL ?? "debug",
  },
});

export default config;
