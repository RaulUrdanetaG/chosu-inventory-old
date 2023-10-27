const router = require("express").Router();

const userController = require("../../controllers/usersController");
// POST /users/register
router.post("/register", userController.userRegister);

// POST /users/login
router.post("/login", userController.userLogin);

module.exports = router;
