const express=require('express')
const musicController=require('../controller/music.controller.js');
const multer=require('multer');
const authMiddleware=require('../middelware/auth.middleware.js');

const router=express.Router();

const upload=multer({
    storage:multer.memoryStorage()
})



router.post('/upload',authMiddleware.artistAuth, upload.single('music'),musicController.createMusic);
router.post('/album',authMiddleware.artistAuth,musicController.createAlbum);
router.get('/',authMiddleware.userAuth ,musicController.getAllMusic)

module.exports=router;
