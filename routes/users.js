const express = require('express');
const router = express.Router({mergeparams: true});
const User = require('../models/user');
const user = require('../controllers/users')
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');


router.route('/register')
    .get(user.renderRegister)
    .post(catchAsync(user.register));

router.route('/login')
    .get(user.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), user.login)

router.get('/logout',user.logout);


module.exports = router;