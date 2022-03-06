const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    return res.send("You have called a protected route");
});

// All to Initialize Own Protected Routers Here

// Janice
const UserController = require("../controller/user.controller")
const userController = new UserController();
router.get("/user", userController.showAll);
router.post("/user", userController.register);
router.delete("/user", userController.deleteUser);










// JianNan















// Michelle















// Norman















// Manuspon























module.exports = router;