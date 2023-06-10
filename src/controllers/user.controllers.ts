import {RequestHandler} from 'express'
import user from '../models/User'
const mongoose = require('mongoose')

export const getUser:RequestHandler = async (req, res) => {
    try {
        const User = await user.find();
    return res.json(User);
    } catch (error) {
        res.json(error);
    }
    
}

export const createUser:RequestHandler = async (req, res) => {
    const UserFound = await user.findOne({email: req.body.email})
    if (UserFound){
        return res.status(301).json({message: 'The email already exists'})
    }
    const User = new user(req.body)
    const savedUser = await User.save();
    res.json(savedUser);
}

export const getUserById:RequestHandler = async (req, res) => {
    const userFound = await user.findById(req.params.id);
    if(!userFound){
        return res.status(204).json()
    }
    return res.json(userFound);
}
export const deleteUser:RequestHandler = async (req, res) => {
    const userFound = await user.findByIdAndDelete(req.params.id);
    if(!userFound){
        return res.status(204).json()
    }
    return res.json(userFound);
}
export const updateUser:RequestHandler = async (req, res) => {
    
    const id = req.params.id; 

    if (!(mongoose.Types.ObjectId.isValid(id))) {
    return res.status(400).json();
    } 
    const userFind = await user.findById(req.params.id);
    if(!userFind){
        return res.status(400).json()
    }
    
    const userUpdate = await user.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(userUpdate);
}