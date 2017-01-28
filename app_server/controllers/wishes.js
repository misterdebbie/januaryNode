/**
 * Created by debrachong on 1/26/17.
 */
var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://getting-mean-loc8r.herokuapp.com";
}
var renderWishpage = function(req,res, responseBody){
    var message;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No wishlist items found";
        }
    }
    res.render('w', {
        title: 'Your wishlist page!!!',
        pageHeader: {
            title: 'Yang Site',
            strapline: 'The edit'
        },
        wishlist: responseBody,
        message: message
    });
};
/* GET wish page */
module.exports.wishlistController = function(req, res) {
    var requestOptions, path;
    path = '/api/profiles';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions,
        function (err, response, body) {
            renderWishpage(req, res, body);
        });
};