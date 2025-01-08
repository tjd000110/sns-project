const express = require('express');
const { checkAuthenticated } = require('../middlewares/auth');
const User = require('../models/users.model');
const router = express.Router();

router.get('/', checkAuthenticated, (req, res) => {
    User.find({}, (err, users) => {
        if(err) {
            req.flash('error', '유저를 가져오는데 오류가 발생했습니다.');
            res.redirect('/posts')
        } else{
            res.render('friends', {
                users: users,
            })
        }
    })
})


//상대방에게 친구 요청을 하기위한 핸들러러
router.put('/:id/add-friend', checkAuthenticated, (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err || !user) {
            req.flash('error', '유저가 없거나 유저를 찾는데 오류가 발생했습니다.');
            res.redirect('back');
        } else{
            //상대방 유저의 friendsRequest에 나의 유저 아이디 추가
            User.findByIdAndUpdate(user._id, {
                friendsRequests: user.friendsRequests.concat([req.user._id])
            }, (err, _) => {
                if(err) {
                    req.flash('error', '친구를 추가하는데 오류가 발생했습니다.');
                }else {
                    req.flash('success', '친구 요청을 보냈습니다.');
                }
                res.redirect('back');
            })
        }
    })
})

//상대방에게 보낸 친구요청 취소를 위한 핸들러
router.put('/:firstId/remove-friend-request/:secondId', checkAuthenticated, (req, res) => {
    User.findById(req.params.firstId, (err, user) => {
        if(err || !user) {
            req.flash('error', '유저를 찾지 못하였습니다.');
            res.redirect('back');
        } else {
            const filteredFriendsRequests = user.friendsRequests.filter(friendId => friendId !== req.params.secondId);
            User.findByIdAndUpdate(user._id, {
                friendsRequests: filteredFriendsRequests
            }, (err, _) => {
                if(err) {
                    req.flash('error', '친구 요청 취소를 하는데 오류가 발생했습니다.');
                    res.redirect('back');
                } else {
                    req.flash('success', '친구 요청 취소가 되었습니다.');
                }
                res.redirect('back');
            })
        }
    })
})

//친구 요청 수락을 위한 핸들러
router.put('/:id/accept-friend-request', checkAuthenticated, (req, res) => {
   User.findById(req.params.id, (err, senderUser) => {
    if(err|| !senderUser) {
        req.flash('error', '유저를 찾지 못했습니다.');
        res.redirect('back');
    } else {
        User.findByIdAndUpdate(senderUser._id, {
            friends : senderUser.friends.concat([req.user._id])
        }, (err, _) => {
            if(err) {
                req.flash('error', '친구 추가에 실패했습니다.')
                res.redirect('back');
            } else {
                User.findByIdAndUpdate(req.user._id, {
                    friends: req.user.friends.concat([senderUser._id]),
                    friendsRequests: req.user.friendsRequests.filter(friendId => friendId !== senderUser._id.toString())
                }, (err,_) => {
                    if(err) {
                        req.flash('error', '친구 추가에 실패했습니다.');
                        res.redirect('back');
                    }else {
                        req.flash('success', '친구 추가가 되었습니다.');
                        res.redirect('back');
                    }
                })
            }
        })
    }
   })
})

//추가된 친구 삭제에 대한 핸들러
router.put('/:id/remove-friend', checkAuthenticated, (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err || !user) {
            req.flash('error', '유저를 찾는데 실패했습니다.');
            res.redirect('back');
        } else{
            User.findByIdAndUpdate(user._id, {
                friends: user.friends.filter(friendId => friendId !== req.user._id.toString())
            }, (err, _) => {
                if(err) {
                    req.flash('error', '친구 삭제에 오류가 발생했습니다.');
                    res.redirect('back');
                } else {
                    User.findByIdAndUpdate(req.user._id, {
                        friends: req.user.friends.filter(friendId => friendId !== req.params.id.toString())
                    }, (err,_) => {
                        if(err) {
                            req.flash('error', '친구 삭제에 오류가 발생했습니다.');
                            res.redirect('back');
                        }else{
                            req.flash('success', '친구 삭제가 완료되었습니다.');
                            res.redirect('back');
                        }
                    })
                }
            })
        }
    })
})

module.exports = router;