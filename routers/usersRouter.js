const express = require("express");
const { usersController } = require("../controllers/index");
const router = express.Router();

router.get("/", usersController.fetchUsers);
router.get("/:id", usersController.fetchUserById);

module.exports = router;
