var express = require('express');
var router = express.Router();
//var ctrlHome = require('../controllers/home');
var ctrlHome = require('../controllers/home');
/*var ctrlLogin = require('../controllers/login');
var ctrlShop = require('../controllers/shop');
var ctrlRun = require('../controllers/run');
var ctrlWish = require('../controllers/wishes');*/


/* GET home page */
//router.get('/', ctrlHome.homepageController);
/* GET home page */
router.get('/', ctrlHome.testController);

/* GET login page */
//router.get('/login', ctrlLogin.loginController);

/* GET shop page */
//router.get('/shop', ctrlShop.shopController);

/* GET runway page */
//router.get('/runway', ctrlRun.runController);


/* GET wishlist page */
//router.get('/wish', ctrlWish.wishlistController);

module.exports = router;
