const { getConnection } = require("../config/dbConfig");

const connection = getConnection();

const connectionPromise = connection.promise();


const createTables = async () => {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;


    const createPostsTable = `
    CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT  NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        content MEDIUMTEXT NOT NULL,
        length VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
`;

    try {
        await connectionPromise.query(createUsersTable);
        console.log("Users table created successfully");

        await connectionPromise.query(createPostsTable);
        console.log("Books table created successfully");


    } catch (error) {
        console.log(`Error while creating the tables ${error}`);
    } finally {
        connectionPromise.end();
    }
}



module.exports = createTables;