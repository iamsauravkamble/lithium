const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleware = require("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

router.put("/users/:userId", middleware.authenticate, middleware.authorise,  userController.updateUser)

router.post("/users/:userId/posts",  middleware.authenticate, middleware.authorise, userController.postMessage)

//The userId is sent by front end
router.get("/users/:userId", middleware.authenticate, middleware.authorise, userController.getUsersData)

 

// router.delete('/users/:userId', userController.deleteUser)


module.exports = router;