import jwt from 'jsonwebtoken';
import User from '../models/User.js';

 const authMiddleware = async (req, res, next) =>{
    const token  = req.header('auth-token');
    if(!token){
        return res.status(401).json({msg:'No token'})
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET, 
        )

        req.user= await User.findById(decoded.user.id);
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Token is not valid');
    }
}

export default authMiddleware;