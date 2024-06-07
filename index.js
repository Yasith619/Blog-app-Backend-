const express = require('express');
const app=express();
const port=3000;
const cors=require('cors')
const bodyParser = require('body-parser');
const database=require('./db')
const postRoute=require('./routes/posts')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const cookieParser = require('cookie-parser')


app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser())

app.listen(port,()=>{
    console.log(`App listening on PORT ${port}`)
   
});


app.use('/Api/user',authRoute)
app.use('/Api/Blog/',postRoute)
app.use('/Api/Blog/user/',userRoute)



//db connect

  database.connect( (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("database successfully Connected!");
    }
  })