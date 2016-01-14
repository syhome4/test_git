var fs = require('fs');

var express = require('express');
var ejs = require('ejs');
var uuid = require('node-uuid');

var router = express.Router();

// TODO : Load from database.
var test_id = 'user';
var test_pw = 'password';
var user_name = 'Hojun Ji';


router.get('/', function (request, response, next) {
	
	var context = { };
	
	if (request.session.key == undefined) {
		
		context.authorized = false;
	}
	else {
		
		context.authorized = true;
		context.user_name = request.session.user_name;
	}
	
	response.render('index', context);
});

router.post('/sign_in', function (request, response, next) {
	
	if (request.session.key == undefined &&
	    request.body.id == test_id && request.body.password == test_pw) {
		
		request.session.key = uuid.v4();
		request.session.user_name = user_name;
	}
	
	response.redirect("/");
});

router.get('/sign_out', function (request, response, next) {
	
	if (request.session.key != undefined) {
		
		request.session.key = undefined;
		request.session.user_name = undefined;
	}
	
	response.redirect("/");
});



module.exports = router;