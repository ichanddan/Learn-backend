import express from "express";
const route = express.Router();

route.get("/", (req, res) => {
  res.send("Learn Node");
});

export default route;
