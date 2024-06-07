const db = require('../db')

const getUserPosts = (req, res) => {

    try {

        const sql = 'SELECT posts.post_id, posts.title, posts.description, posts.img, posts.date FROM posts INNER JOIN users ON posts.user_id = users.id WHERE posts.user_id=?'

        const value = [req.params.user_id]
        
        db.query(sql, value, (err, result) => {
            if (err) {
                return res.status(400).json({ error: "Database query error" });
            } if (result.length == 0) {
                return res.status(400).json("there is no post avilable  ");
            } else {
                res.status(200).json({
                    "Message": "success !",
                    "Data": result
                })
            }
        })
    } catch (err) {
        res.status(400).send(err);
    }
}
module.exports = getUserPosts;
