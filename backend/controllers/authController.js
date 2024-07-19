import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) =>{
    const {userName, name, email, password, mobileNo} = req.body;

    try {
        let user = await User.findOne({email});
        if(user){
            res.status(400).json({msg:'user is already exist'});
        }
        let userNam = await User.findOne({userName});
        if(userNam){
            res.status(400).json({msg:'username is already exist'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);
        user  = new User({
            userName,
            name,
            email,
            password : hashedPwd,
            mobileNo,
        })

        await user.save();

        const payload = {
            user:{
                id:user._id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn:'5h'
            },
            (err,token) =>{
                if(err) throw err;
                res.staus(200).json({token});
            }
        )
    } catch (error) {
        console.error(error.message);
       return res.status(500).send('Server Error');
    }
}

export const login = async (req, res) =>{
    const {userName, password} = req.body;
    try {
        let user = await User.findOne({userName});
        if(!user){
            res.status(400).json({msg:'user does not exist'});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({msg:'Invalid Credential'});
        }
        const payload = {
            user:{
                id:user._id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn:'5h'
            },
            (err,token) =>{
                if(err) throw err;
                res.staus(200).json({token});
            }
        )
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
}

