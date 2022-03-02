const express = require("express");
const app = express();
app.use(express.json()); // allows us to read json data.

// All to Initiate own routes

// Janice
const protectedRoutes = require("./protected.routes");
const generalRoutes = require("./general.routes");
app.use(protectedRoutes);
app.use(generalRoutes);






// JianNan










// Michelle










// Norman















module.exports = app;