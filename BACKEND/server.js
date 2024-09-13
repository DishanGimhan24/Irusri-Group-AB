const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

// Import user routes
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

// Use user routes
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);


const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Mongodb Connection Success!");
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
