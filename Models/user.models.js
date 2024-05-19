import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema(
  {
    username:{
      type:String,
      require:true,
      unique:true
    },
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

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("Password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.Password, salt);
    user.Password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function (conditdatePassword) {
  try {
    const isMatch = await bcrypt.compare(conditdatePassword, this.Password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};


export const User = mongoose.model("User", UserSchema);
