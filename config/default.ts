import { config } from "dotenv";
config();

export default {
  port: process.env.PORT,
  dbUri: process.env.MONGO_URI,
  logLevel: "info",
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
};
