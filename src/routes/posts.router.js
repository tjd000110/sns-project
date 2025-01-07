const express = require('express');
const { checkAuthenticated } = require('../middlewares/auth');
const router = express.Router();
const Post = require('../models/posts.model');
const Comment = require('../models/comments.model');
const path = require('path');
const multer = require('multer');

const storageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../public/assets/images'))
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storageEngine }).single('image');

//핸들러 생성

router.post('/', checkAuthenticated, upload, (req, res, next) => {
    let desc = req.body.desc;
    let image = req.file ? req.file.filename : "";
    console.log('req.file', req.file);
    
    Post.create({
        image: image,
        description: desc,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }, (err, post) => {
        if(err) {
            next(err);
        }else {
            res.redirect("posts");
        }
    })
})

router.get('/', checkAuthenticated, (req, res) => {

    Post.find()
    .populate('comments')
    .sort({ createdAt: -1 })
    .exec((err, posts) => {
        if(err) {
            console.log(err);
        } else{

            res.render('posts', {
                posts: posts,
                currentUser: req.user
            });
            
        }
    })
    
})

module.exports = router;