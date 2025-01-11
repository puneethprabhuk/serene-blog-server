const { getConnection } = require("../config/dbConfig");
const bcrypt = require('bcrypt');
const { generateAccessToken } = require("../helpers/accessToken");
const { genereateRefreshToken } = require("../helpers/refreshToken");

exports.createUser = async (req, res) => {

    const connection = getConnection();

    const { name, email, password } = req.body;

    if (name === '') {
        res.status(400).json({ message: 'Enter your name' });
        return;
    }
    if (email === '') {
        res.status(400).json({ message: 'Enter your email' });
        return;
    }
    if (password === '') {
        res.status(400).json({ message: 'Enter the password' });
        return;
    }


    try {
        const [user] = await connection.promise().query(`SELECT * FROM users WHERE email = '${email}'`);
        if (user && user?.length > 0) {
            res.status(409).json({ message: 'Email already already in use' });
            return;
        }

        const securedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        await connection.promise().query(query, [name, email, securedPassword]);
        return res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error while signing up', error });
    }
}


exports.signin = async (req, res) => {
    const connection = getConnection();

    const { email, password } = req.body;

    if (email === '') {
        res.status(400).json({ message: 'Enter your email' });
        return;
    }
    if (password === '') {
        res.status(400).json({ message: 'Enter the password' });
        return;
    }

    try {
        const [rows] = await connection.promise().query(`SELECT * FROM users WHERE email = '${email}'`);
        if (rows && rows?.length > 0) {
            const user = rows[0];
            const comparePassword = await bcrypt.compare(password, user.password);

            if (!comparePassword) {
                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }

            const userDetails = {
                id: user.id,
                name: user.name,
                email: user.email
            };

            const accessToken = generateAccessToken(userDetails);
            const refreshToken = genereateRefreshToken(userDetails);

            return res.status(200).json({ message: 'Login Successful', accessToken, refreshToken, userDetails });
        } else {

            return res.status(404).json({ message: "User not found" });

        }







    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}