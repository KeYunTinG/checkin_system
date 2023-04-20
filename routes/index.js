const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const checkinController = require('../controllers/checkin-controller')
const passport = require('../config/passport')
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticated, adminAuthenticated } = require('../middleware/auth')


router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/home', authenticated, checkinController.homepage)
router.post('/checkin', authenticated, checkinController.checkin)
// router.get('/logout', userController.signout)


router.get('/', (req, res) => res.render('login'))
router.use('/', generalErrorHandler)

module.exports = router
