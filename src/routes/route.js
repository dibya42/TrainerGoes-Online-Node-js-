const express = require('express');
const router = express.Router();
const userController= require("../controller/userController");
const middleware = require('../middleware/auth');


//------------------------------USER API -----------------------------------***

router.post("/register", userController.createUser)

router.post('/login', userController.loginUser)

//----------------------- Axious Call  ----------------------------***

router.get('/search/instan', middleware.authentication, userController.axiousCall)




module.exports = router;