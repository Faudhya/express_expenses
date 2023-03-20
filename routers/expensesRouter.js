const express = require("express");
const { expensesController } = require("../controllers/index");
const router = express.Router();

router.get("/", expensesController.fetchExpenses);
router.get("/:id", expensesController.fetchExpenseById);
router.delete("/:id", expensesController.deleteExpenseById);
router.post("/", expensesController.addExpenses);
router.put("/:id", expensesController.editExpenses);

module.exports = router;
