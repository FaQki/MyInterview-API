import {RequestHandler} from 'express'
import Video from './videos'
const mongoose = require('mongoose')

export const getVideos:RequestHandler = async (req, res) => {
    try {
        const videos = await Video.find();
    return res.json(videos);
    } catch (error) {
        res.json(error);
    }
    
}

export const createVideos:RequestHandler = async (req, res) => {
    const videoFound = await Video.findOne({url: req.body.url})
    if (videoFound){
        return res.status(301).json({message: 'The URL already exists'})
    }
    const video = new Video(req.body)
    const savedVideo = await video.save();
    res.json(savedVideo);
}

export const getVideo:RequestHandler = async (req, res) => {
    const videoFound = await Video.findById(req.params.id);
    if(!videoFound){
        return res.status(204).json()
    }
    return res.json(videoFound);
}
export const deleteVideos:RequestHandler = async (req, res) => {
    const videoFound = await Video.findByIdAndDelete(req.params.id);
    if(!videoFound){
        return res.status(204).json()
    }
    return res.json(videoFound);
}
export const updateVideos:RequestHandler = async (req, res) => {
    
    const id = req.params.id; 

    if (!(mongoose.Types.ObjectId.isValid(id))) {
    return res.status(400).json();
    } 
    const videoFind = await Video.findById(req.params.id);
    if(!videoFind){
        return res.status(400).json()
    }
    
    const videoUpdate = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(videoUpdate);
}