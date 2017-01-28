var mongoose = require('mongoose');
var Profile = mongoose.model('Profile');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* GET list of users */
module.exports.displayProfiles = function(req, res) {
    Profile
        .find()
        .exec(
            function(err, results) {
                if (err) {
                    console.log('results error:', err);
                    sendJSONresponse(res, 404, err);
                } else {
                    sendJSONresponse(res, 200, results);
                }
            });
};
/* GET a profile by the id */
module.exports.profileReadOne = function(req, res) {
    console.log('Finding profile details', req.params);
    if (req.params && req.params.profileid) {
        Profile
            .findById(req.params.profileid)
            .exec(function(err, profile) {
                if (!profile) {
                    sendJSONresponse(res, 404, {
                        "message": "profileid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(profile);
                sendJSONresponse(res, 200, profile);
            });
    } else {
        console.log('No profileid specified');
        sendJSONresponse(res, 404, {
            "message": "No profileid in request"
        });
    }
};
/* POST a new profile */
/* /api/profiles */
module.exports.createProfile = function(req, res) {
    console.log(req.body);
    Profile.create({
        name: req.body.name,
        password: req.body.password
    }, function(err, profile) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            console.log(profile);
            sendJSONresponse(res, 201, profile);
        }
    });
};
/* PUT /api/profiles/:profileid */
module.exports.profileUpdateOne = function(req, res) {
    if (!req.params.profileid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, profileid is required"
        });
        return;
    }
    Profile
        .findById(req.params.profileid)
        .select('name password')
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
                profile.name = req.body.name;
                profile.password = req.body.password;
                profile.save(function(err, profile) {
                    if (err) {
                        sendJSONresponse(res, 404, err);
                    } else {
                        sendJSONresponse(res, 200, profile);
                    }
                });
            }
        );
};

/* DELETE /api/profiles/:profileid */
module.exports.profileDeleteOne = function(req, res) {
    var profileid = req.params.profileid;
    if (profileid) {
        Profile
            .findByIdAndRemove(profileid)
            .exec(
                function(err, profile) {
                    if (err) {
                        console.log(err);
                        sendJSONresponse(res, 404, err);
                        return;
                    }
                    console.log("profile id " + profileid + " deleted");
                    sendJSONresponse(res, 204, null);
                }
            );
    } else {
        sendJSONresponse(res, 404, {
            "message": "No profileid"
        });
    }
};