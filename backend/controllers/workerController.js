import httpStatus from 'http-status';
import Worker from '../models/Worker.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const login = async(req, res)=>{
    try{
        const { email, password} = req.body;
        const worker = await Worker.findOne({ email }); 
        if(!worker){
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, worker.password);
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
        const { name, email, password,number } = req.body;
        const existingWorker = await Worker.findOne({ email });
        if(existingWorker){
            return res.status(httpStatus.CONFLICT).json({ message: 'Email already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newWorker = new Worker({ name, email, password: hashedPassword,number });
        await newWorker.save();
        res.status(httpStatus.CREATED).json({ message: 'Worker registered successfully' });
    }catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during registration', error: error.message });
    }
}

export { login, register };

