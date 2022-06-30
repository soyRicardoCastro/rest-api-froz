import { config } from "dotenv";
config();

export default {
  port: process.env.PORT,
  dbUri: process.env.MONGO_URI,
  logLevel: "info",
  accessTokenPrivateKey: "",
  refreshTokenPrivateKey: "",
  smtp: {
    user: "icqskc5mxzf3bwct@ethereal.email",
    pass: "mVSU79SbF3WmvGqy4V",
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
  },
};
