require("dotenv").config();
const express =  require("express");
const userRouter = require("./features/user/user.routes");
const todoRouter = require("./features/Todo/todo.router");

const connect = require("./config/db");
const {authenticate} = require("./middlewares/authentication.js")


const PORT = process.env.PORT;

const app = express();
app.use(express.json())
app.use(authenticate)


app.use("/users", userRouter);
app.use("/todos", todoRouter);

app.listen(PORT, async () => {
    await  connect()
    console.log(`Listening on port:${PORT}`);
})