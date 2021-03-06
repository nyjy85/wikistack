var express = require('express');
var router = express.Router();
var models = require('../models/index');
// models.User
// models.Page

/* GET users listing. */
router.get('/', function(req, res, next) {
	// console.log(models.Page.db.collections)
	res.render('addpage'); // the action of form

  // res.send('respond with a resource');
});

router.post('/', function(req, res){
	// create Title, Body
	var title = req.body.title;
	var body = req.body.content;
	var url = generateUrlName(title);
	var tagArr = req.body.tags.split(",");
	console.log(tagArr);

	var page = new models.Page({
		title: title,
		body: body,
		url_name: url,
		tags: tagArr
	});
	page.save(function(err, doc) {
		res.redirect(page.full_route);
	});

})


var generateUrlName = function(name) {
  if (typeof name != "undefined" && name !== "") {
    // Removes all non-alphanumeric characters from name
    // And make spaces underscore
    return name.replace(/\s/ig, '_').replace(/\W/ig,'');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2,7);
  }
};
module.exports = router;
