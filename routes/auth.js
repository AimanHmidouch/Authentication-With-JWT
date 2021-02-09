import { Router } from "express";
import bcrypt from 'bcryptjs';
import User from "../Models/User.js";
import jwt from 'jsonwebtoken';
import {loginValidation, registerValidation} from '../validtion.js'

const authRouter = Router();

authRouter.post('/register', async (req,res) => {
    //LETS VALIDATE THE DATA BEFORE WE A USER
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
    
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //CREATE A NEW USER
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
})

authRouter.post('/login', async (req, res) =>{
    //LETS VALIDATE THE DATA BEFORE WE A USER
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check if the email exists
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email coesnt exist');
    
    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Password is wrong');

    // create token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({token})
})

export default authRouter;