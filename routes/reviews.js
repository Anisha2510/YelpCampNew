const express = require('express');
const router = express.Router({mergeparams: true});
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');


router.post('/:id/reviews', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:id/reviews/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;