
const express = require("express");

const Todo = require("./todo.model");


const app = express.Router();
// /todos - should give all todos
// /todos?status=pending - should give only those todos which are pending, and same for status=done
// /todos?status=done&tag=personal - should give all todos which are 'done' and have 'personal' tag. Similarly, for all other possible combinations.
// /todos/:todoID - should give only the todo with the matching ID and only if it belongs to that user.


app.get("/", async (req, res) => {
    try {
        let todos = await Todo.find({
            user: req.userId,
        }).limit(3).populate(["todo"]);
        res.send(todos);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})




app.post("/", async (req, res) => {
    try {
        let todo = await Todo.create({
            ...req, body,
        });
        res.send(todo);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});


app.get("/todoID", async (req, res) => {
    let id = req.params.id;
    try {
        let todo = await Todo.findByIdAndUpdate(id, { ...req.body }, { new: true });
        res.send(todo);
    }
    catch (e) {
        res.status(404).send(e.message);
    }
});



app.get("/status=pending", async (req, res) => {
    try {
        let todos = await Todo.findByStatus('pending', function (err, docs) {
            if (err) {
                res.send("No Pending")
            }
            res.send(todos);
        })
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})



app.get("/status=done&tag=personal", async (req, res) => {
    try {
        let todos = await Todo.findByStatus('pending', function (err, docs) {
            if (err) {
                res.send("No Pending")
            }
            res.send(todos);
        })
    }
    catch (e) {
        res.status(500).send(e.message);
    }
})



module.exports = app;
