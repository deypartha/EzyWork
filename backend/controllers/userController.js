import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import crypto from 'crypto';

const login = async(req, res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password' });
        }
        // Generate a token or perform further actions upon successful login
        const token = crypto.randomBytes(16).toString('hex');
        res.status(httpStatus.OK).json({ message: 'Login successful', token });
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during login', error: error.message });
    }
}
const register = async(req, res)=>{
    try{
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(httpStatus.CONFLICT).json({ message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(httpStatus.CREATED).json({ message: 'User registered successfully' });
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during registration', error: error.message });
    }
}
export { login, register };