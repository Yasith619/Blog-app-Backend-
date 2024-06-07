const express = require('express');
const getUserPosts=require('../controlers/users')

const router=express.Router()

router.get('/posts/:user_id',getUserPosts)

module.exports=router



