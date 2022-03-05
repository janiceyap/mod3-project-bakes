const express = require('express');
const router = express.Router();

router.get("/general", (req, res) => {
    return res.send("You have called a general route");
});

// All to Initialize Own General Routers Here

// Janice
// const UserController = require("../controller/user.controller")
// const userController = new UserController();
// router.get("/general/vehicle", vehicleController.showAll);












// JianNan















// Michelle















// Norman















// Manuspon























module.exports = router;