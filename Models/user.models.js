import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Number: {
      type: Number,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    userType:{
      type:String,
      enum: ["Admin", "Seller", "User"],
      default: "User"
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
