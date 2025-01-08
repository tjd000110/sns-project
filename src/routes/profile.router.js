const express = require('express');
const { checkAuthenticated, checkIsMe } = require('../middlewares/auth');
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

router.get('/edit', checkIsMe, (req,res) => {
    res.render('profile/edit', {
        user: req.user
    })
})

router.put('/', checkIsMe, (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, 
        (err, user) => {
            if(err || !user) {
                req.flash('error', '데이터를 수정하는데 오류가 발생했습니다.');
                res.redirect('back');
            } else{
                req.flash('success', '프로필 데이터가 수정되었습니다.')
                res.redirect('/profile/' + req.params.id);
            }
        })
})

module.exports = router;