// auth controler module
const db = require('../db')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt=require('jsonwebtoken');
require('dotenv').config()


//REGISTER A USER
const register = (req, res) => {
    try {
        //First Check if User already in the Database
        const sql = 'SELECT * from users WHERE username=? OR email=?'
        db.query(sql, [req.body.username, req.body.email], (err, data) => {
            if (err) {
                return res.status(400).json({ error: "Database query error" });

            } if (data.length) {
                return res.status(409).json( "User Already Exists" );
                
            }else{
             //CREATE USER AND HASH PASSWORDS

                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(req.body.password, salt);
    
                const sql = 'INSERT INTO users(username,email,password) VALUES(?,?,?)'
                const values = [
                    req.body.username,
                    req.body.email,
                    hash
                ]
    
                db.query(sql, values, (err) => {
                    if (err) {
                        return res.status(400).json({ "error": err.message })
    
                    } else {
                        return res.status(200).json({ message: "User created successfully" });
                    }
                })
            }   
        })
    } catch (err) {
        res.status(400).send(err);
    }

}
//LOGIN A USER

const login = (req, res) => {
    try {
        //CHECK USER 
        const sql = 'SELECT * from users WHERE username=?'
        db.query(sql, [req.body.username], (err, data) => {

            if (err) {
                return res.status(400).json({ error: "Database query error" });
            } if (data.length == 0) {
                return res.status(404).json({ error: "User not found" });

            } else {
                //CHECK PASSWORD
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
                if (!isPasswordCorrect) {
                    return res.status(401).json('User or password incorrect')
                }
                const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET_KEY)
                const { password:_, ...other } = data[0]
                return res.status(200).cookie('access_token', token, { httpOnly: true }).json(other)
            }

        })
    } catch (err) {
        res.status(400).send(err);
    }
}


const logout = (req, res) => {
    res.send("this is logout end point")
}

module.exports = {
    register,
    login,
    logout
};