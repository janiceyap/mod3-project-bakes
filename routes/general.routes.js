const express = require('express');
const router = express.Router();

router.use("/", (req, res, next) => {
    console.log("You have called a general route.");
    next();
});

// All to Initialize Own General Routers Here
// Janice
const UserController = require("../controller/user.controller")
const userController = new UserController();
router.post("/user", userController.register);
router.post("/user/login", userController.login);











// JianNan















// Michelle















// Norman















// Manuspon























module.exports = router;