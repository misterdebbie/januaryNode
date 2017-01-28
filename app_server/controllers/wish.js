
var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://getting-mean-loc8r.herokuapp.com";
}

var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else if (status === 500) {
        title = "500, internal server error";
        content = "How embarrassing. There's a problem with our server.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title : title,
        content : content
    });
};


/*var renderWishpage = function(req,res, responseBody){
    var message;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No wishlist found";
        }
    }
    res.render('wish', {
        title: 'Your wishlist page!!!',
        pageHeader: {
          title: 'Yang Site',
          strapline: 'The edit'
    },
        wishlist: [{
            itemname: 'acne adrianna sneaker',
            itemprice: 400.00,
            rating: 4,
            comments: ['i like these in patent leather']
        },{
            itemname: 'miu miu sherling tote',
            itemprice: 880.00,
            rating: 3,
            comments: ['is this availiable in cream?', 'what are the dimensions']
        },{
            itemname: 'dior double face knit',
            itemprice: 910,
            rating: 5,
            comments: ['was this designed by raf?']
        }]
    });
}*/

var renderWishpage = function(req,res, responseBody){
    res.render('w', {
        title: 'Your wishlist page!!!',
        pageHeader: {
            title: 'Yang Site',
            strapline: 'The edit'
        },
        wishlist: responseBody
    });
};


/*var renderWishpage = function(req,res, responseBody){
    res.render('wish', {
        title: 'Your wishlist page!!!',
        pageHeader: {
            title: 'Yang Site',
            strapline: 'The edit'
        },
        wishlist: responseBody
    });
};*/

/* GET 'home' page */
/*module.exports.wishlistController = function(req, res){
    var requestOptions, path;
    path = '/api/profiles';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json : {},
    };
    request(
        requestOptions,
        function(err, response, body){
            renderWishpage(req, res);
        }
    );
};*/

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
            var data;
            data = body;
            renderWishpage(req, res, data);
        });
};