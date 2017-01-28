var express = require('express');
var router = express.Router();
var ctrlProfile = require('../controllers/profiles');
var ctrlWish = require('../controllers/wish');

// profile
router.get('/profiles', ctrlProfile.displayProfiles);
router.post('/profiles', ctrlProfile.createProfile);
router.get('/profiles/:profileid', ctrlProfile.profileReadOne);
router.put('/profiles/:profileid', ctrlProfile.profileUpdateOne);
router.delete('/profiles/:profileid', ctrlProfile.profileDeleteOne);

// wishlist
router.post('/profiles/:profileid/wishlist', ctrlWish.wishCreate);
router.get('/profiles/:profileid/wishlist/:wishid', ctrlWish.wishReadOne);
router.put('/profiles/:profileid/wishlist/:wishid', ctrlWish.wishUpdateOne);
router.delete('/profiles/:profileid/wishlist/:wishid', ctrlWish.wishDeleteOne);

module.exports = router;