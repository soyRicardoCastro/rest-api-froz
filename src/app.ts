import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import config from "config";
import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const app = express();

dotenv.config()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use(deserializeUser);
app.use(router);

const port = config.get("port");

app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);

  connectToDb();
});
