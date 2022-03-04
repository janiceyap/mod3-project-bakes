const express = require("express");
const app = express();
app.use(express.json()); // allows us to read json data.

const protectedRoutes = require("./protected.routes");
const generalRoutes = require("./general.routes");
app.use(protectedRoutes);
app.use(generalRoutes);

module.exports = app;