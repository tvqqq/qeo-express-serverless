const { Router } = require("express");
const router = Router();
const configRoutes = require("./config.route");

router.get("/", (req, res) => res.send("Hello World!"));

router.use("/configs", configRoutes);

module.exports = router;
