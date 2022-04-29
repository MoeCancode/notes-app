const express = require("express");
const indexRouter = express.Router();
const nRouter = require("./notes");

indexRouter.use("/notes", nRouter);

module.exports = indexRouter;
