const express = require('express');
const usersRouter = express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../middlewares/auth');
const passport = require('passport');
const User = require('../models/users.model');

usersRouter.post('/login',(req,res,next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) { //express 에러 처리기로
            return next(err);
        }

        if(!user) { //user가 없거나 비밀번호가 틀렸을때
            return res.json({ msg: info });
        }

        req.logIn(user, function (err) {
            if(err) {return next(err);}
            res.redirect('/'); // 성공시 login 페이지에서 메인페이지로 이동
        })
    })(req,res,next) //미들웨어 안의 미들웨어 실행
})

usersRouter.post('/logout', (req,res,next) => {
    req.logOut(function(err){ //passport에서 제공하는 logout 함수
        if(err) {return next(err);}
        res.redirect('/login'); 
    })
})

usersRouter.post('/signup', async(req,res) => {
    //user객체 생성
    const user = new User(req.body);
    try{
        // user 컬렉션에 user 저장
        await user.save();

        //이메일 전송
        sendMail('tjd000110@gmail.com', '최미성', 'welcome');

        //로그인 성공
        res.redirect('/login'); 

    }catch(error){
        console.error(error);
    }
})


//구글 로그인
usersRouter.get('/google', passport.authenticate('google'));
usersRouter.get('/google/callback', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));

//카카오 로그인
usersRouter.get('/kakao', passport.authenticate('kakao'));
usersRouter.get('/kakao/callback', passport.authenticate('kakao', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));


module.exports = usersRouter;