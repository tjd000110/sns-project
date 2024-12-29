const express = require('express');
const mainRouter = express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../middlewares/auth');

//checkAuthenticated => 로그인한 사람들만 접속 가능
mainRouter.get('/', checkAuthenticated, (req, res) => {
    res.render('index');
});

mainRouter.get('/login', checkNotAuthenticated, (req,res) => { //checkNotAuthenticated => 로그인 안한 사람들만 접속 가능
    res.render('login');
});

mainRouter.get('/signup', checkNotAuthenticated, (req,res) => { //checkNotAuthenticated => 로그인 안한 사람들만 접속 가능
    res.render('signup');
});

module.exports = mainRouter;