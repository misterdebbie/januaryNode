/**
 * Created by debrachong on 1/9/17.
 */

/*module.exports.homepageController = function(req,res){
    res.render('home', {title: 'The Homepage!!!'});
};*/

var renderTestpage = function(req, res){
    res.render('locTest', {
        title: 'Yang Site!',
        pageHeader: {
            title: 'Angular Yang Test Site!!!',
            strapline: 'Must learn Angular and React!'
        },
        sidebar: "{{{{haha}}}!!!!!!"
});
};
module.exports.testController = function(req,res){
    renderTestpage(req,res);
};