const express = require('express');
const dotenv = require('dotenv');
const postRouter = require('./routes/post.route');
const createTables = require('./migrations/create-table');
const userRouter = require('./routes/userRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

(async () => {
    console.log("Starting the table creation...");
    await createTables();
    console.log("All tables created successfully");
})();

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});