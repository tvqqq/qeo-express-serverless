require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const app = express();

// api json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// mongoose connect
const mongoose = require("./config/mongoose");
mongoose.connect();

// enable this if use redis stack
// require("./app/helpers/redis.helper");
const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);
global.redis = redis;

// cors
const cors = require("cors");
app.use(cors());

// lodash
const _ = require("lodash");
global._ = _;

// routes
const routes = require("./routes");
app.use("/", routes);

const slsHandler = serverless(app);

// cronjob
const slsCronHandler = async (event, context) => {
  // TODO: define the path to cron here
  // event.path = "/fb/friends/fetch";
  const result = await slsHandler(event, context);
  return result;
};

module.exports = {
  serverless: slsHandler,
  cron: slsCronHandler,
  default: app,
};
