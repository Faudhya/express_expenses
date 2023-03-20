const express = require("express");
const { expensesRouter, usersRouter } = require("./routers/index");
const PORT = 2000;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});

app.use("/expenses", expensesRouter);
app.use("/users", usersRouter);
