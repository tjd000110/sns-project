const express = require('express');
const { checkAuthenticated, checkCommentOwnership } = require('../middlewares/auth');
const router = express.Router({
    mergeParams: true
});
const Post = require('../models/posts.model');
const Comment = require('../models/comments.model');


router.post('/',checkAuthenticated, (req, res) => {
    console.log(req.params.id);
    Post.findById(req.params.id, (err, post) => {
        if(err || !post) {
            req.flash('error', '댓글 생성 중 게시글을 찾지 못했거나, 오류가 발생했습니다.');
            res.redirect('back');
        } else {
            Comment.create(req.body, (err, comment) => {
                if(err) {
                    req.flash('error', '댓글 생성 중 오류가 발생했습니다.');
                res.redirect('back');
                } else {
                    //생성한 댓글에 작성자 정보 넣어주기
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

                    //포스트에 댓글 데이터 넣어주기
                    post.comments.push(comment);
                    post.save();
                    req.flash('success', '댓글이 정상적으로 생성되었습니다.');
                    res.redirect('back');
                }
            })
        }
    })
})

router.delete("/:commentId", checkCommentOwnership, (req, res) => {
    //댓글 찾은 후 삭제
    Comment.findByIdAndDelete(req.params.commentId, (err, _) => {
        if(err) {
            req.flash('error', '댓글 삭제 중 오류가 발생하였습니다.');
        }else {
            req.flash('success', '댓글을 삭제했습니다.');
        }
        res.redirect('back');
    })
})

router.get("/:commentId/edit", checkCommentOwnership, (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if(err || !post) {
            req.flash('error', '댓글에 해당하는 게시글이 없거나, 오류가 발생하였습니다.');
            res.redirect('back');
        } else {
            res.render('comments/edit', {
                post: post,
                comment: req.comment,
            })
        }
    })
})

router.put("/:commentId", checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.commentId, req.body, (err, _) => {
        if(err) {
            req.flash('error', '댓글을 수정하는 중 오류가 발생하였습니다.');
            res.redirect('back');
        } else{
            req.flash('success', '댓글 수정이 완료되었습니다.');
            res.redirect('/posts');
        }
    })
})

module.exports = router;