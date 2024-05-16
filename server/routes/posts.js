import express, { response } from 'express';
import { getPosts , createPost } from '../controllers/posts.js';
getPosts

const router = express.Router()

router.get('/',getPosts ); 
router.post('/', createPost ); 

export default router