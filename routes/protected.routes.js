const express = require('express');
const router = express.Router();

router.get("/protected", (req, res) => {
    return res.send("You have called a protected route");
});

// All to Initialize Own Protected Routers Here

// Janice
const VehicleController = require("../controllers/vehicle.controller")
const vehicleController = new VehicleController();
router.get("/protected/vehicle", vehicleController.showAll);












// JianNan















// Michelle















// Norman















// Manuspon























module.exports = router;