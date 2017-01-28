var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var wishlistSchema = Schema({
    itemname: {type: String, required: true},
    itemprice: {type: String, required: true},
    rating: {type: Number, "default": 0, min: 0, max: 5},
    comments: [String],
    createdOn: {type: Date, "default": Date.now}
});
var profileSchema = Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    wishlist: [wishlistSchema]
});

module.exports = mongoose.model('Profile', profileSchema);