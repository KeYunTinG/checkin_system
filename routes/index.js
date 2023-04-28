const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const checkinController = require('../controllers/checkin-controller')
const adminController = require('../controllers/admin-controller')
const passport = require('../config/passport')
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticated, adminAuthenticated } = require('../middleware/auth')


router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/home', authenticated, checkinController.homepage)
router.post('/checkin', authenticated, checkinController.checkin)
router.get('/setting', authenticated, userController.settingPage)
router.post('/setting', authenticated, userController.setting)
router.get('/logout', userController.signout)

router.get('/admin/absent', adminAuthenticated, adminController.getAbsents)
router.put('/admin/absent/:id', adminAuthenticated, adminController.editAbsent)
router.get('/admin', (req, res) => res.render('login'))

router.get('/', (req, res) => res.render('login'))
router.use('/', generalErrorHandler)

module.exports = router
