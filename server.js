import express from 'express';


const app = express()
const Port = 3000;

app.get('/home', (req , res)=>{
    res.send("Hello Dosto")
})

app.listen(Port, ()=>{
    console.log(`Server is runing: http://localhost:${Port}`)
})