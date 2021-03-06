var url = require('url');
var db = require('../db/db.js');

module.exports = {
	//expects username and password,
	//serves board ids and board names that belong to user
	//serves user id, name
	login: {
		post: function(req, res) {
			var responseObj = {};
			let reqParams = url.parse(req.url, true).query;
			//findOne returns one object
			//findAll returns an array of objects
			db.User
				.findOne({
					where: { username: req.body.username }
				})
				.then(function(data) {
					// This is now the found user
					if (data === null) {
						throw 'none';
					} else if (data.password !== req.body.password) {
						throw 'password';
          }
          let newUser = {
            id: data.id,
            info: data.info,
            profilepic: data.profilepic,
            username: data.username
          }
					responseObj.user = newUser;
					return db.Board.findAll({
						attributes: ['id', 'name'],
						where: { id: data.id }
					});
				})
				.then(function(data) {
					// Check for boards, pass back empty array if null
					responseObj.boards = data || [];
					res.status(200).send(responseObj);
				})
				.catch(function(err) {
					if (err === 'none') {
						res.sendStatus(404);
					} else {
						res.sendStatus(401);
					}
					console.log(err);
				});
		}
	},

	//receive user and password
	//serve 201 or 400
	signup: {
		post: function(req, res) {
			db.User
				.create({
					username: req.body.username,
					password: req.body.password,
					profilepic: req.body.profilepic,
					info: req.body.info
				})
				.then(function(user) {
					console.log('User created!');
					res.status(201).send(user);
				})
				.catch(function(err) {
          console.log('User was NOT created!');
          console.log(err);
					res.sendStatus(400);
				});
		}
  },
  
  /**
   * For when sessions are implemented
   */
  logout: {
    get: function(req, res) {
      res.sendStatus(200);
    }
  }
};
