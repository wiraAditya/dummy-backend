import express from "express";
import cors from "cors";

import * as dotenv from "dotenv";

import pool from "./utils/databasev2";
import DummyRouter from "./routes/dummyRouter";

dotenv.config();
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

server.use("/dummy", DummyRouter);

const port = process.env.SERVER_PORT;
// this called, imidiately function expression
// to make we can use the async await
process.on("SIGINT", async () => {
  console.log("Received SIGINT. Closing MySQL pool...");
  // if (!!pool) {
  await Promise.all([
    pool.end().then(() => console.log("Pool closed")),
    // poolTracker.end().then(() => console.log("poolTracker closed")),
  ]);
  // }
  process.exit(0);
});
server.listen(port, async () => {
  console.log("running server");
});
