import { Router } from "express";
import { isAdmin, isAuth } from "../middlewares.js";
import User from "../Models/User.js";

const postsRouter = Router();

postsRouter.get('/', isAuth, isAdmin, async (req, res) =>{
    const _id = req.user._id 
    const users = await User.find({})
    res.send(users);
})

export default postsRouter;