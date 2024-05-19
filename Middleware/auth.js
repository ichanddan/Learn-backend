import LocalStrategy from 'passport-local'
import passport from "passport";
import { User } from "../Models/user.models.js";
const Lpassport = LocalStrategy.Strategy


passport.use(new Lpassport(async(username, password, done)=>{
    try {
      const user = await User.findOne({username: username})
      if (!user) 
        return done(null , false, {message:"invelide username or passwor"})
      const isPasswordMatch = user.comparePassword(password)
      if (isPasswordMatch) {
        return done(null, user)
      }else{
        return done(null, false, {message:"invelide username or passwor"} )
      }
    } catch (error) {
      return done(error)
    }
  }))
export {passport}