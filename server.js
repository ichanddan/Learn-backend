import express from 'express';
import dotenv from 'dotenv'
import connectDB from './DB/index.js';
import { User } from './Models/user.models.js';
import bodyParser from 'body-parser';

dotenv.config()

const app = express()
const Port = process.env.PORT || 8000;
connectDB()
app.use(bodyParser.json())

app.post('/user', async(req , res)=>{
    try {
        const data = req.body
        const newda = new User(data)
        const finnal = await newda.save()
        res.status(200).json(finnal)
        console.log("Data send succesfully", finnal)
    } catch (error) {
        console.log("Data not send", error)
    }
})


app.post("/user/:UserT", async (req, res)=>{
    try {
        const UserT = req.params.UserT;
        if (UserT == "Admin" || UserT == "Seller" || UserT == "User") {
            const Data = await User.find({userType:UserT})
            res.status(200).json(Data)
            console.log("Data fatched", Data)
        } else {
            console.log("User Type not find")
        }
    } catch (error) {
        console.error(error)
    }
})



app.get('/user', async (req , res)=>{
    try {
        const data = await User.find()
        res.status(200).json(data)
        console.log("Data Fatched")
    } catch (error) {
        console.log("Data not Fatched", error)
    }
})

app.listen(Port, ()=>{
    console.log(`Server is runing: http://localhost:${Port}`)
})