const { getConnection } = require('../config/dbConfig');


exports.getAllPosts = async (req, res) => {


    const connection = getConnection();

    try {
        const [posts] = await connection.promise().query('SELECT * from posts');
        if (posts) {
            res.status(200).json({ success: true, data: posts });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error while fecthing the posts' });
    }
}


exports.createPost = async (req, res) => {

    const connection = getConnection();

    const { userId, title, content, category, length } = req.body;

    if (title === "") {
        return res.status(400).json({ success: false, success: false, message: "Title is required" });
    }

    if (content === "") {
        return res.status(400).json({ success: false, success: false, message: "Content is required" });
    }

    if (category === "") {
        return res.status(400).json({ success: false, success: false, message: "Category is required" });
    }

    try {

        const query = `INSERT INTO posts (user_id, title, category, content, length) VALUES (?, ?, ?, ?, ?) `;
        await connection.promise().query(query, [userId, title, content, category, length]);
        return res.status(201).json({ success: true, message: 'Post created successfully!' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

