/**
 * Created by debrachong on 1/9/17.
 */
module.exports.displayPage = function(req,res) {
    res.render('index', {title: 'The other page!!!'});
};
