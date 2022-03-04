const express = require('express');
const router = express.Router();

router.get("/general", (req, res) => {
    return res.send("You have called a general route");
});

// All to Initialize Own General Routers Here

// Janice
const VehicleController = require("../controllers/vehicle.controller")
const vehicleController = new VehicleController();
router.get("/general/vehicle", vehicleController.showAll);












// JianNan















// Michelle















// Norman















// Manuspon























module.exports = router;