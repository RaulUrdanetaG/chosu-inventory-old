const router = require("express").Router();

const userController = require("../../controllers/usersController");
const cartController = require("../../controllers/cartController");
// POST /users/register
router.post("/register", userController.userRegister);

// POST /users/login
router.post("/login", userController.userLogin);

router.use("/cart", require("./cart"));

module.exports = router;
