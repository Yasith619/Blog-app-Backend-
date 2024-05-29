// auth controler module
const db = require('../db')
const bcrypt = require('bcrypt');
const saltRounds = 10;

//REGISTER A USER
const register = (req, res) => {
    try {
        //First Check if User already in the Database

        const sql = 'SELECT * from users WHERE username=? OR email=?'
        db.query(sql, [req.body.username, req.body.email], (err, data) => {
            if (err) {
                return res.status(400).json({ error: "Database query error" });

            } if (data.length) {
                return res.status(409).json({ error: "User Already Exists" });
                
            }
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
        })
    } catch (err) {
        res.status(400).send(err);
    }

}

const login = (req, res) => {
    res.send("this is login end point")
}
const logout = (req, res) => {
    res.send("this is logout end point")
}

module.exports = {
    register,
    login,
    logout
};