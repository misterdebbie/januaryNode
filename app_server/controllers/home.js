/**
 * Created by debrachong on 1/9/17.
 */

/*module.exports.homepageController = function(req,res){
    res.render('home', {title: 'The Homepage!!!'});
};*/

/*var renderTestpage = function(req, res){
    res.render('locTest', {
        title: 'Yang Site!',
        pageHeader: {
            title: 'Yang Test Site!!!',
            strapline: 'Must learn Angular and React!'
        },
        sidebar: "{{{{haha}}}!!!!!!"
});
};
module.exports.testController = function(req,res){
    renderTestpage(req,res);
};*/
module.exports.testController = function(req,res){
    res.render('yang', { title: 'yang!'});
};