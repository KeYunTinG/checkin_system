const bcrypt = require('bcryptjs')
const db = require('../models');
const User = db.User;
const userController = {

    signInPage: (req, res) => {
        res.render('login')
    },
    signIn: (req, res) => {
        req.flash('successMessage', '成功登入!')
        res.redirect('/home');
    },
    signout: (req, res) => {
        req.flash('successMessage', '登出成功！')
        req.logout()
        res.redirect('/signin')
    },
    settingPage: (req, res) => {
        res.render('setting')
    },
    setting: (req, res) => {
        const password = req.body.password
        const checkPassword = req.body.checkPassword
        if (password === checkPassword) {
            return bcrypt.genSalt(10).then(salt => {
                return Promise.all([bcrypt.hash(password, salt), User.findByPk(req.user.id)])
            }).then(([hash, user]) => {
                return user.update({ password: hash })
            }).then(() => {
                req.flash('successMessage', '修改密碼成功')
                res.redirect('back')
            })
        } else {
            req.flash('errorMessage', '兩次密碼輸入不符')
            res.redirect('back')
        }
    },
}

module.exports = userController
