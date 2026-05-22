const {ImageKit}=require('@imagekit/nodejs');
require('dotenv').config()

const imageKitClient=new ImageKit({
    privateKey:process.env.IMAGEKIT_KEY ,
})

async function uploadFile(file){
    const result=await imageKitClient.files.upload({
        file,
        fileName:"music_"+Date.now(),
        folder:"yt-complete-backend/music"
    })
    return result;
}

module.exports={uploadFile}