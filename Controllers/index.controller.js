import { User } from "../Models/user.models.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../Service/auth.js";
import {jwtauth, genToken} from '../Middleware/jwt.auth.js'
// Signup controller
const Signup = async (req, res) => {
  try {
    const data = req.body;
    const newda = new User(data);
    const respons = await newda.save();
    const payload = {
      id: respons.id,
      username: respons.username
    }
    const token = genToken(payload);
    res.status(200).json({ respons: respons, token: token });

    console.log("Data send succesfully", respons);
  } catch (error) {
    console.log("Data not send", error);
  }
};



const getUserData = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
    console.log("Data Fatched");
  } catch (error) {
    console.log("Data not Fatched", error);
  }
};

const deleteUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const respons = await User.findByIdAndDelete(id);
    if (!respons) {
      console.log("User is not find", id);
      return res.status(404).json({ message: "user is not find" });
    }
    console.log("user is delete", id);
    res.status(200).json({ message: "delte suscesfuly" });
  } catch (error) {
    console.log("faceing somne issuse", error);
  }
};

const findbyIDandUpdate = async (req, res) => {
  try {
    const updted_data = req.body;
    const id = req.params.id;
    const respons = await User.findByIdAndUpdate(id, updted_data);
    res.status(200).json(respons);
    console.log("user update");
  } catch (error) {
    console.error(error);
  }
};

const Login = async (req, res) => {
  const { Number, Password } = req.body;
  const user = await User.findOne({ Number, Password });
  if (!user) {
    return res.render("index", {
      error: " number or password wrong",
    });
  }
  const sissionId = uuidv4();
  setUser(sissionId, user);
  res.cookie("uid", sissionId);
  console.log("login");
  res.redirect("/");
};

export {
  Signup,
  getUserData,
  deleteUserData,
  findbyIDandUpdate,
  Login,
};
