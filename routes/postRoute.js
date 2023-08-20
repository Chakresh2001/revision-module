const express = require('express');
const UserModel = require('../model/userModel');
const PostModel = require('../model/postModel');
const auth = require('../middleware/auth');


const postRoute = express.Router()

postRoute.post("/add",auth, async(req,res)=>{

    try {

        const {title, body, device} = req.body

        // console.log(req.userInfo)

        const obj = {
            title : title,
            body:body,
            device:device,
            userID:req.userInfo.userID,
            // userName:req.userInfo.userName
        }

        const post = PostModel(obj)
        await post.save()

        res.json({message:"Post Added", post:post})

        
    } catch (error) {
        res.json({ error: error.message})
    }

})


postRoute.get("/", auth, async(req,res)=>{

    try {

        const {userID, userName} = req.userInfo

        const posts = await PostModel.find({userID:userID})

        res.json({posts : posts})
        
    } catch (error) {
        res.json({ error: error.message})
    }

})

postRoute.get("/:id", auth, async(req,res)=>{

    try {

        const { id } = req.params

        const post = await PostModel.findById(id)

        res.json({message:post, me:"hello"})
        
    } catch (error) {
        res.json({ error: error.message})
    }

})


module.exports = postRoute