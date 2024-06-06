const express = require('express');
const {getPost,getSinglePost,editPost,createPost,deletePost}=require('../controlers/post')


const router=express.Router()

router.get('/posts',getPost)
router.get('/singlePost/:post_id',getSinglePost)
router.put('/edit/:post_id',editPost)
router.post('/create',createPost)
router.delete('/delete/:post_id',deletePost)

module.exports=router