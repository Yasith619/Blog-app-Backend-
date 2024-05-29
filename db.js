const mysql=require('mysql')

const database=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"blog"

})
module.exports=database