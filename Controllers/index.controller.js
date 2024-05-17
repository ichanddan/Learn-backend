import { User } from "../Models/user.models.js";


// Signup controller
const Signup = async (req, res) =>{
    try {
        const data = req.body;
        const newda = new User(data);
        const finnal = await newda.save();
        res.status(200).json(finnal);
        console.log("Data send succesfully", finnal);
      } catch (error) {
        console.log("Data not send", error);
      }
}

// find user by user type like admin, seller, user
const FundUserType = async (req, res) => {
    try {
      const UserT = req.params.UserT;
      if (UserT == "Admin" || UserT == "Seller" || UserT == "User") {
        const Data = await User.find({ userType: UserT });
        res.status(200).json(Data);
        console.log("Data fatched", Data);
      } else {
        console.log("User Type not find");
      }
    } catch (error) {
      console.error(error);
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
  }

const deleteUserData = async (req, res) => {
    try {
      const id = req.params.id;
      const respons = await User.findByIdAndDelete(id);
      if (!respons) {
        console.log("User is not find", id);
        return res.status(404).json({ message: "user is not find" });
      }
      console.log("user is delete", id);
      res.status(200).json({message:"delte suscesfuly"})
    } catch (error) {
      console.log("faceing somne issuse", error);
    }
  }

const findbyIDandUpdate = async (req, res)=>{
    try {
      const updted_data =req.body
      const id = req.params.id;
      const respons = await User.findByIdAndUpdate(id, updted_data)
      res.status(200).json(respons)
      console.log("user update")
    } catch (error) {
      console.error(error)
    }
  }
  
export {Signup, FundUserType, getUserData, deleteUserData, findbyIDandUpdate}