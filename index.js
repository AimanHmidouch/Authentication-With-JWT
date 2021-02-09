import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';

const app = express()
app.use(express.json());
dotenv.config();
// connect to mongoDb
mongoose.connect(
    process.env.MONGO_ATLAS,
    {useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to db!')
    );

app.use('/api/posts', postsRouter)
app.use('/api/user', authRouter)

app.listen(5000, () => console.log(`server is running on 5000`));