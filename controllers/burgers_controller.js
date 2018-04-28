var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	burger.selectAll(function (data) {
		var hbsObject = { burgers: data };
		res.render('index', hbsObject);
	});
});

router.post('/burgers/add', function (req, res) {
	burger.insertOne('burger_name', req.body.burger_name, function () {
		res.redirect('/burgers');
	});
});

// router.put('/burgers/devour/', function (req, res) {
// 	var condition = 'id = ' + req.params.id;
// 	burger.updateOne({ devoured: req.body.devoured }, condition, function () {
// 		res.redirect('/burgers');
// 	});
// });


router.put("/burgers/devour/:id", function (req, res) {
	var condition = "id = " + req.params.id;

	console.log("condition", condition);

	burger.updateOne({
		devoured: req.body.devoured
	}, condition, function (result) {
		if (result.changedRows == 0) {
			// If no rows were changed, then the ID must not exist, so 404
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
});
module.exports = router;