var models = require('../db/db.js');
var express = require('express');
var router = express.Router();

router.post('/post', function(req, res) {
	db.Post
		.create({
			photourl: req.body.photourl,
			info: reg.body.info
		})
		.then(function() {
			console.log('Post created!');
			res.redirect('/');
		});
});
//
// router.get('/:user_id/posts/:post_id/destroy', function(req, res) {
// 	db.Post
// 		.destroy({
// 			where: {
// 				id: req.params.post_id
// 			}
// 		})
// 		.then(function() {
// 			res.redirect('/');
// 		});
// });

module.exports = router;