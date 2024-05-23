import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import user from "./Routes/user.routes.js";
import bodyParser from "body-parser";
import { passport } from "./Middleware/auth.js";




// comfig dotenv
dotenv.config();

// define app using express and port using envfile
const app = express();
const Port = process.env.PORT || 8000;
app.use(bodyParser.json());
// app.use(cookieParser())


app.use(passport.initialize())
const auth = passport.authenticate('local', {session:false})

// routes section
app.use("/", user);

// conaction Database
connectDB();



// app listen

app.listen(Port, () => {
  console.log(`Server is runing: http://localhost:${Port}`);
});
