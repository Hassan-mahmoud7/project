const router = require("express").Router()
const auth = require("../app/middleware/auth.middleware")
const user = require("../app/controller/user.controller")

// router.get("/liston", user.liston)
router.post("/register", user.register)
router.get("/all", auth, user.allUsers)
router.get("/all/:id", user.singleUser)
router.post("/login", user.login)
router.get("/me", auth, user.me)
router.post("/logout", auth, user.logOut)
router.post("/logoutAll", auth, user.logOutAll)
router.patch('/editUser', auth, user.editUser)
router.patch('/activate', auth, user.activate)



module.exports = router