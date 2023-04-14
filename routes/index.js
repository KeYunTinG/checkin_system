const express = require('express')
const router = express.Router()
//const userController = require('../controllers/user-controller')
//const adminController = require('../controllers/admin-controller')
//const passport = require('../config/passport')
//const helpers = require('../_helpers')
//const { generalErrorHandler } = require('../middleware/error-handler')
//const { authenticated, adminAuthenticated } = require('../middleware/auth')


// router.get('/signup', userController.registerPage)
// router.post('/signup', userController.signup)

// router.get('/signin', userController.loginPage)
// router.post('/signin', passport.authenticate('local', { successRedirect: '/tweets', failureRedirect: '/signin' }))
// router.get('/logout', userController.signout)


router.get('/', (req, res) => res.render('home'))
//router.use('/', generalErrorHandler)

module.exports = router
