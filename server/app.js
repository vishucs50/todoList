require('dotenv').config()
const express=require('express');
const app=express();
const cors=require('cors');
const todoRoute=require('./router/todo')
const Task = require("./models/task");
const userRoute=require('./router/user')
app.use(cors({ origin: "https://todolist-2-szc8.onrender.com" }));
app.use(express.json());
const mongoose = require("mongoose");
const PORT=3000;
const dbUrl =process.env.MONGO_URI || "mongodb://127.0.0.1:27017/TodoList";
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Database connected"));
app.use('/task', todoRoute);
app.use('/user',userRoute);

app.listen(PORT,()=>{
    console.log("Listening on port 3000");
})
