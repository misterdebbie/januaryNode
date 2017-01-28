/**
 * Created by debrachong on 1/9/17.
 */

module.exports.homepageController = function(req,res){
    res.render('home', {title: 'The Homepage!!!'});
};