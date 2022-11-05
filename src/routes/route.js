const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleware = require("../middlewares/middleware")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login-user", userController.login, middleware.createToken )

router.get("/users/:userId", middleware.tokenVerify, userController.getUserData)

router.put("/users/:userId", middleware.tokenVerify, userController.updateUser)

router.delete("/users/:userId", middleware.tokenVerify, userController.deletedData)


module.exports = router;
 
 
