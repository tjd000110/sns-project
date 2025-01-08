const express = require('express');
const { checkAuthenticated } = require('../middlewares/auth');
const router = express.Router({
    mergeParams: true,
});
const Post = require('../models/posts.model');
const User = require('../models/users.model');

router.get('/', checkAuthenticated, (req, res) => {
    Post.find({ "author.id" : req.params.id })
    .populate('comments')
    .sort({ createdAt: -1 })
    .exec((err, posts) => {
        if(err) {
            req.flash('error', '게시글을 가져오는데 실패했습니다.');
            res.redirect('back');
        } else{
            User.findById(req.params.id, (err, user) => {
                if(err || !user) {
                    req.flash('error', '유저가 존재하지 않습니다.');
                    res.redirect('back');
                } else {
                    res.render('profile', {
                        posts: posts,
                        user: user
                    })
                }
            })
        }
    })
})

module.exports = router;