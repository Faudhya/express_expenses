const fs = require("fs");

module.exports = {
    fetchExpenses: async (req, res) => {
        let data = JSON.parse(fs.readFileSync("./db.json"));
        let expenses = data.expenses;

        //filter dari querry category
        if (req.query.category) {
            expenses = expenses.filter(
                (expense) => expense.category === req.query.category
            );
        }

        //filter dari querry date range
        if (req.query.start_date && req.query.end_date) {
            expenses = expenses.filter((expense) => {
                const expenseDate = new Date(expense.date);
                const startDate = new Date(req.query.start_date);
                const endDate = new Date(req.query.end_date);
                return expenseDate >= startDate && expenseDate <= endDate;
            });
        }
        res.status(200).send(expenses);
    },
    fetchExpenseById: async (req, res) => {
        let data = JSON.parse(fs.readFileSync("./db.json"));
        let expense = data.expenses.find(
            (expense) => expense.id === parseInt(req.params.id)
        );
        if (expense) {
            res.status(200).send(expense);
        } else {
            res.status(404).send("Expense not found");
        }
    },
    deleteExpenseById: async (req, res) => {
        let data = JSON.parse(fs.readFileSync("./db.json"));
        let expenses = data.expenses;
        let expenseIndex = expenses.findIndex(
            (expense) => expense.id === parseInt(req.params.id)
        );
        if (expenseIndex >= 0) {
            expenses.splice(expenseIndex, 1);
            fs.writeFileSync("./db.json", JSON.stringify(data));
            res.status(200).send("Expense deleted");
        } else {
            res.status(404).send("Expense not found");
        }
    },
    addExpenses: async (req, res) => {
        let data = JSON.parse(fs.readFileSync("./db.json"));
        let expenses = data.expenses;

        expenses.push({
            ...req.body,
            id: expenses[expenses.length - 1]["id"] + 1,
        });
        fs.writeFileSync("./db.json", JSON.stringify(data));
        res.status(200).send(expenses);
    },
    editExpenses: async (req, res) => {
        let idParams = parseInt(req.params.id);
        let data = JSON.parse(fs.readFileSync("./db.json"));
        let expenses = data.expenses;
        let selectedExpense = expenses.find(
            (expense) => expense.id === idParams
        );

        if (selectedExpense) {
            selectedExpense.date = req.body.date;
            selectedExpense.name = req.body.name;
            selectedExpense.nominal = req.body.nominal;
            selectedExpense.category = req.body.category;
            fs.writeFileSync("./db.json", JSON.stringify(data));
            res.status(200).json({
                isSuccess: true,
                message: `Expense no. ${idParams} has been edited`,
            });
        } else {
            res.status(400).json({
                isSuccess: false,
                message: "Error: Expense ID does not exist",
            });
        }
    },
    updateExpenses: async (req, res) => {
        let idParams = parseInt(req.params.id);
        let data = JSON.parse(fs.readFileSync("./db.json"));
        let expenses = data.expenses;
        let index = expenses.findIndex((expense) => expense.id == idParams);

        const keys = Object.keys(req.body);
        if (index == -1 || keys.length === 0) {
            res.status(400).send("Error: Expense ID does not exist");
        } else {
            keys.forEach((key) => {
                expenses[index][key] = req.body[key];
            });
            fs.writeFileSync("./db.json", JSON.stringify(data));
            res.status(200).send(`Expense no. ${idParams} has been updated`);
        }
    },
};
