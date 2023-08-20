const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const connectToServer = require('./config/config');
const postRoute = require('./routes/postRoute');
require('dotenv').config();


const app = express()

app.use(express.json())

app.get('/', (req,res)=>{
    res.send("Welcome to Backend")
})

app.use("/user", userRoute)


app.use("/post", postRoute)


app.listen(process.env.PORT, connectToServer())
