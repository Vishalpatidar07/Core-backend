const musicModel=require('../models/music.model.js');
const albumModel=require('../models/album.model.js');
const jwt=require('jsonwebtoken');
const {uploadFile}=require('../services/storage.service.js');
const cookie=require('cookie-parser');

async function createMusic(req,res){
    
   
    const {title}=req.body;
    const uri=req.file;

    const result=await uploadFile(uri.buffer.toString('base64'))

    const music=await musicModel.create({
        uri:result.url,
        title,
        artist:req.user.id
    })

    res.status(201).json({
        meassage:"music created successfully",
        music:music
    })
}

 
async function createAlbum(req,res){

    
     const {title,music}=req.body;
    

    const album=await albumModel.create({
        title,
        music:music,
        artist:req.user.id 
    })

    res.status(201).json({
        message:"sucessfully created",
        album:album
    })

    
}

async function getAllMusic(req,res){

    const music=await musicModel.find().populate("artist");

    res.status(200).json({
        message:"fetch success",
        music:music
    })

}

module.exports={createMusic,createAlbum,getAllMusic};