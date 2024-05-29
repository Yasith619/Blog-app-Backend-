const express = require('express');
const getPost=require('../controlers/post')


const router=express.Router()

router.get('/test',getPost)

module.exports=router