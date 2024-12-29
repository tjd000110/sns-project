const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { createBaseVNode } = require('vue');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true //동일한 이메일 없도록 유효성 체크
    },
    password: {
        type: String,
        minLength:5
    },
    googleId: {
        type: String,
        unique: true, // googleId로 유일한 계정
        sparse: true
    },
    kakaoId: {
        type: String,
        unique: true, // googleId로 유일한 계정
        sparse: true
    }
})

const saltRouncs = 10;
userSchema.pre('save', function(next){ //저장되기 전, 비밀번호 암호화
    let user = this;
    //비밀번호가 변경될 때만
    if(user.isModified('password')){
        //salt를 생성
        bcrypt.genSalt(saltRouncs, function (err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else{
        next();
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //bcrypt compare 비교
    //plain password => client에서 받아온 비밀번호 / this.password => 데이터베이스에 있는 비밀번호
   
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

const User = mongoose.model('User', userSchema);



module.exports = User;