import express from "express";
import { User } from "../Models/user.models.js";
import { FundUserType, Signup, deleteUserData, findbyIDandUpdate, getUserData } from "../Controllers/index.controller.js";

const route = express.Router();

route.post("/user", Signup);
route.get("/user/:UserT", FundUserType);
route.get("/user", getUserData);
route.delete("/user/:id", deleteUserData);
route.patch("/user/:id", findbyIDandUpdate)



export default route;
