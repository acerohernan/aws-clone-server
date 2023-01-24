const express = require("express");

const statusRouter = express.Router();

statusRouter.get("/", (req, res) => res.status(200).send("OK"));

module.exports = statusRouter;
