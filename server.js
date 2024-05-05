import express from 'express';
import dotenv from 'dotenv'
import connectDB from './DB/index.js';
dotenv.config()

const app = express()
const Port = process.env.PORT || 8000;
connectDB()

app.get('/home', (req , res)=>{
    res.send("Hello Dosto")
})

app.listen(Port, ()=>{
    console.log(`Server is runing: http://localhost:${Port}`)
})