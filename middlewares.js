import jwt from 'jsonwebtoken';
import User from './Models/User.js';

export const isAuth = (req,res,next) =>{
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid token')
    }
}

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
}