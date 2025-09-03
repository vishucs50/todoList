require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const todoRoute = require("./router/todo");
const userRoute = require("./router/user");
const Task = require("./models/task");

const app = express();
const PORT = process.env.PORT || 3000;
const dbUrl = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/TodoList";

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// MongoDB connection
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("DB connection error:", err));


// Routes
app.use("/task", todoRoute);
app.use("/user", userRoute);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
