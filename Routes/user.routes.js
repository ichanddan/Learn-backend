import express from "express";
import {  Login, Signup, deleteUserData, findbyIDandUpdate, getUserData } from "../Controllers/index.controller.js";
import { genToken, jwtauth } from "../Middleware/jwt.auth.js";
const route = express.Router();

// route.post("/user", Signup);
route.post("/signup" ,Signup);
route.post("/login", Login);
route.get("/user" , getUserData);
route.delete("/user/:id", deleteUserData);
route.patch("/user/:id", findbyIDandUpdate)



export default route;
