const express = require('express');
const router = express.Router();

router.get("/protected", (req, res) => {
    return res.send("You have called a protected route");
});

// All to Initialize Own Protected Routers Here

// Janice
const UserController = require("../controller/user.controller")
const userController = new UserController();
router.get("/protected/user", userController.showAll);
router.post("/protected/user", userController.register);











// JianNan















// Michelle















// Norman















// Manuspon























module.exports = router;