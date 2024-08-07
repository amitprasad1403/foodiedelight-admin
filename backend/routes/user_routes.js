const express = require('express')
const {addUserDetails,loginUser,getUserById} = require('../controller/User_controller')
const router = express.Router()

router.post("/addUser",addUserDetails)
router.post("/login",loginUser)
router.get("/get/:id",getUserById)


module.exports = router
