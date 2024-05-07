import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import Home from "./Routes/home.routes.js";
import Signup from "./Routes/signup.routes.js";
import bodyParser from "body-parser";


// comfig dotenv
dotenv.config();

// define app using express and port using envfile
const app = express();
const Port = process.env.PORT || 8000;
app.use(bodyParser.json());


// routes section
app.use("/", Home);
app.use("/", Signup);

// conaction Database
connectDB();

// app listen

app.listen(Port, () => {
  console.log(`Server is runing: http://localhost:${Port}`);
});
