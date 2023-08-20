const express = require('express');
const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const userRoute = express.Router()


userRoute.post("/register", async(req,res)=>{

    try {

        const {name, email, password} = req.body

        let userEx = await UserModel.findOne({email:email})

        if(userEx){
           return res.json({error : "User already Exsist"})
        }

        const user = UserModel(req.body)

        bcrypt.hash(password, 10, async function(err, hash){
            user.password = hash

            await user.save()

            res.json({message : "User Registered", user:user})
        })

    } catch (error) {
        res.json({ error: error.message})
    }

})

userRoute.post("/login", async(req,res)=>{
    try {

        const {email, password} = req.body

        let user = await UserModel.findOne({email:email})

        if(!user){
            return res.json({err: "User Does not exsist"})
        }

        bcrypt.compare(password, user.password,  function(err, result) {
            

            if(!result){
                res.json({error:"invalid password"})
            }
            const token =  jwt.sign({ userID: user._id, userName:user.name }, "123");

            res.json({mesa:"user logged in", token:token})

        });


        
    } catch (error) {
        res.json({ error: error.message})
    }
})


module.exports = userRoute