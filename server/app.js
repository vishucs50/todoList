const express=require('express');
const app=express();
const cors=require('cors');
const todoroute=require('./router/todo')
const Task = require("./models/task");
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
const mongoose = require("mongoose");
const dbUrl = "mongodb://127.0.0.1:27017/TodoList";
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Database connected"));
const tt = async () => {
    const tasks = [
    { text: "Learn Zustand", category: "Study" },
    { text: "Buy Groceries", category: "Personal" },
    ];
    await Task.insertMany(tasks);
    console.log("✅ Tasks added successfully");
}
app.use('/task', todoroute);
// tt();
app.listen(3000,()=>{
    console.log("Listening on port 3000");
})