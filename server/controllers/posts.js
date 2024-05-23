import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"


export const getPosts = async (req,res)=> {
    try {
        const postMessage = await PostMessage.find() 
        console.log(postMessage);
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
export const createPost = async (req,res)=> {
    const post = req.body

    const newPost = new PostMessage({...post, creator: req.userId , createAt: new Date().toISOString })
    
    try {
        await newPost.save()

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}


export const updatePost = async (req,res) =>{
        const{ id : _id } = req.params    
        const post  = req.body
        console.log(post);
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id exists');

        

        const updatedPost = await PostMessage.findByIdAndUpdate(_id,   { ...post, _id }, { new: true });
        console.log("updated");

        res.json(updatedPost)

}   

export const deletePost = async (req,res) =>{
        const{ id  } = req.params    
        
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id exists');
        
        await PostMessage.findByIdAndDelete (id);
        res.json({message: 'Post Deleted Successfully' })
        
    }   
    
    export const likePost = async (req,res)=> {
    const{ id  } = req.params    
    
    if(!req.userId) return res.json({message : "Unauthenticated"})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id exists');
    
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.like.push(req.userId)
    }else{
        post.likes = post.likes.filter((id)=> id !== String(req.userId)  )
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id,post, {new: true})


    res.json(updatedPost)
    

}
