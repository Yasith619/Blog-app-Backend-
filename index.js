const express = require('express');
const app=express();
const port=3000;
const cors=require('cors')
const bodyParser = require('body-parser');


app.use(cors())
app.use(bodyParser.json());

app.listen(port,()=>{
    console.log(`App listening on PORT ${port}`)
});

app.get('/', (req, res) => {
    res.send('<h1>hellow i am port 3000<h1/>')
  })