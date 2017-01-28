var mongoose = require('mongoose');
var Profile = mongoose.model('Profile');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* POST a new wish, providing a profileid */
/* /api/profiles/:profileid/wishlist */
module.exports.wishCreate = function(req, res) {
    if (req.params.profileid) {
        Profile
            .findById(req.params.profileid)
            .select('wishlist')
            .exec(
                function(err, profile) {
                    if (err) {
                        sendJSONresponse(res, 400, err);
                    } else {
                        doAddWish(req, res, profile);
                    }
                }
            );
    } else {
        sendJSONresponse(res, 404, {
            "message": "Not found, profileid required"
        });
    }
};

var doAddWish = function(req, res, profile) {
    if (!profile) {
        sendJSONresponse(res, 404, "profileid not found");
    } else {
        profile.wishlist.push({
            itemname: req.body.itemname,
            itemprice: req.body.itemprice,
            rating: req.body.rating,
            comments: req.body.comments,
            bidText: req.body.bidText
        });
        profile.save(function(err, thisWish) {
            var thisWish;
            if (err) {
                sendJSONresponse(res, 400, err);
            } else {
                sendJSONresponse(res, 201, thisWish);
            }
        });
    }
};

module.exports.wishUpdateOne = function(req, res) {
    if (!req.params.wishid || !req.params.wishid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, profileid and wishid are both required"
        });
        return;
    }
    Profile
        .findById(req.params.profileid)
        .select('wishlist')
        .exec(
            function(err, profile) {
                var thisWish;
                if (!profile) {
                    sendJSONresponse(res, 404, {
                        "message": "profileid not found"
                    });
                    return;
                } else if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }
                if (profile.wishlist && profile.wishlist.length > 0) {
                    thisWish = profile.wishlist.id(req.params.wishid);
                    if (!thisWish) {
                        sendJSONresponse(res, 404, {
                            "message": "wishid not found"
                        });
                    } else {
                        thisWish.itemname = req.body.itemname;
                        thisWish.itemprice = req.body.itemprice;
                        thisWish.rating = req.body.rating;
                        thisWish.comments = req.body.comments;
                        thisWish.createdOn = req.body.createdOn;
                        profile.save(function(err, profile) {
                            if (err) {
                                sendJSONresponse(res, 404, err);
                            } else {
                                sendJSONresponse(res, 200, thisWish);
                            }
                        });
                    }
                } else {
                    sendJSONresponse(res, 404, {
                        "message": "No wish to update"
                    });
                }
            }
        );
};

module.exports.wishReadOne = function(req, res) {
    console.log("Getting wishlist item");
    if (req.params && req.params.profileid && req.params.wishid) {
        Profile
            .findById(req.params.profileid)
            .select('itemname itemprice rating comments')
            .exec(
                function(err, profile) {
                    console.log(profile);
                    var response, wish;
                    if (!profile) {
                        sendJSONresponse(res, 404, {
                            "message": "profileid not found"
                        });
                        return;
                    } else if (err) {
                        sendJSONresponse(res, 400, err);
                        return;
                    }
                    if (profile.wishlist && profile.wishlist.length > 0) {
                        wish = profile.wishlist.id(req.params.wishid);
                        if (!wish) {
                            sendJSONresponse(res, 404, {
                                "message": "wishid not found"
                            });
                        } else {
                            response = {
                                profile: {
                                    username: profile.username,
                                    id: req.params.profileid
                                },
                                wish: wish
                            };
                            sendJSONresponse(res, 200, response);
                        }
                    } else {
                        sendJSONresponse(res, 404, {
                            "message": "No wishlist items found"
                        });
                    }
                }
            );
    } else {
        sendJSONresponse(res, 404, {
            "message": "Not found, profileid and wishid are both required"
        });
    }
};

// app.delete('/api/profiles/:profileid/wishlist/:wishid'
module.exports.wishDeleteOne = function(req, res) {
    if (!req.params.profileid || !req.params.wishid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, profileid and wishid are both required"
        });
        return;
    }
    Profile
        .findById(req.params.profileid)
        .select('wishlist')
        .exec(
            function(err, profile) {
                if (!profile) {
                    sendJSONresponse(res, 404, {
                        "message": "profileid not found"
                    });
                    return;
                } else if (err) {
                    sendJSONresponse(res, 400, err);
                    return;
                }
                if (profile.wishlist && profile.wishlist.length > 0) {
                    if (!profile.wishlist.id(req.params.wishid)) {
                        sendJSONresponse(res, 404, {
                            "message": "wishid not found"
                        });
                    } else {
                        profile.wishlist.id(req.params.wishid).remove();
                        profile.save(function(err) {
                            if (err) {
                                sendJSONresponse(res, 404, err);
                            } else {
                                sendJSONresponse(res, 204, null);
                            }
                        });
                    }
                } else {
                    sendJSONresponse(res, 404, {
                        "message": "No wishlist to delete"
                    });
                }
            }
        );
};
