import { User } from "../Models/user.models.js";
import { genToken } from '../Middleware/jwt.auth.js';
import bcrypt from 'bcrypt';




// Signup controller
const Signup = async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    const paylod = {
      id: response.id,
      username: response.username
    }
    const token = await genToken(paylod)
    res.status(200).json({ message: "Signup successfully" , token: token});
  } catch (error) {
    console.log("Signup failed", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
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
  try {
    const { username, password } = req.body; 
    const user = await User.findOne({ username }); 
    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!user || !passwordMatch) {  
      return res.status(401).json({ message: "Username or password wrong" }); 
    }

    // Generate token
    const payload = {
      id: user.id,
      username: user.username,
      password: user.Password
    }; 
    const token = genToken(payload);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });  // Proper error response
  }
};


export { Signup, getUserData, deleteUserData, findbyIDandUpdate, Login };
