

const userController = {

    signInPage: (req, res) => {
        res.redirect('/signin')
    },
    signIn: (req, res) => {
        req.flash('successMessage', '成功登入!')
        res.redirect('/home');
    },
    signout: (req, res) => {
        req.flash('successMessage', '登出成功！');
        req.logout();
        res.redirect('/login');
    },
}

module.exports = userController
