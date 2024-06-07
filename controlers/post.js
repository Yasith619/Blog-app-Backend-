const db = require('../db')

// Get Blog all posts

const getPost = (req, res) => {
    try {
        const sql = 'SELECT * FROM posts '
        const values = []
        db.query(sql, values, (err, result) => {
            if (err) {
                return res.status(400).json({ error: "Database query error" });
            } else {
                res.json({
                    "Message": "success !",
                    "Data": result
                })
            }
        })
    } catch (err) {
        res.status(400).send(err);
    }
}

// Get Blog single post using user post id
const getSinglePost = (req, res) => {
    try {
        const sql = 'SELECT * FROM posts WHERE post_id=? '
        const value = [req.params.post_id]
        db.query(sql, value, (err, result) => {
            if (err) {
                return res.status(400).json({ error: "Database query error" });
            } if(result.length==0){
                return res.status(400).json("there is no post avilable  " );
            }else {
                res.status(200).json({
                    "Message": "success !",
                    "Data": result
                })
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
}

//Create Post

const createPost = (req, res) => {
    try {
        const sql = 'INSERT INTO posts(title,description,img,date,user_id) VALUES(?,?,?,?,?)'

        const { title, description, img, date, user_id } = req.body
        const values = [title, description, img, date, user_id]

        db.query(sql, values, (err) => {
            if (err) {
                return res.status(400).json({ error: "Database query error" });
            } else {
                return res.status(200).json({ message: "Post created successfully" })
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
}

const editPost = (req, res) => {

    try {
        const sql = 'UPDATE posts set title=?,description=?,img=?,date=? WHERE post_id=?'

        const { title, description, img, date, post_id } = req.body
        const values = [title, description, img, date, post_id]

        db.query(sql, values, (err) => {
            if (err) {
                res.status(400).json({ error: "Database query error" })
            } else {
                res.status(200).json({ message: "Post successfully updated" })
            }
        })
    } catch (err) {
        res.status(500).send(err);
    }
}

const deletePost = (req, res) => {

    const sql = 'DELETE FROM posts WHERE post_id=?'
    const value = [req.params.post_id]

    db.query(sql, value, (err) => {
        if (err) {
            res.status(400).json({ error: "Database query error" })

        } else {
            res.status(200).json({ message: "Post successfully deleted" })
        }
    })
}

module.exports = { getPost, getSinglePost, editPost, createPost,deletePost }