const fs = require("fs");

module.exports = {
    fetchUsers: async (req, res) => {
        let data = JSON.parse(fs.readFileSync("./db.json"));
        let users = data.users;

        //filter dari querry role
        if (req.query.role) {
            users = users.filter((user) => user.role === req.query.role);
        }

        //filter dari querry name
        if (req.query.name) {
            users = users.filter((user) => user.name === req.query.name);
        }

        res.status(200).send(users);
    },
    fetchUserById: async (req, res) => {
        let data = JSON.parse(fs.readFileSync("./db.json"));
        let users = data.users.find(
            (user) => user.id === parseInt(req.params.id)
        );
        if (users) {
            res.status(200).send(users);
        } else {
            res.status(404).send("Expense not found");
        }
    },
};
