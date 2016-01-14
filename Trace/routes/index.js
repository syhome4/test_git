var express = require('express');
var router = express.Router();

var gifts = [ 'apple', 'banana', 'carrot' ];
var next_gift = function (current) {
	
	var next = (gifts.indexOf(current) + 1) % gifts.length;
	return gifts[next];
};


router.get('/', function(request, response, next) {

    var cookies = request.cookies;
    var context = {};

    if(cookies.is_new === "no") {
        context.is_new = false;
        context.gift = next_gift(cookies.gift);
    }
    else {
        context.is_new = true;
        context.gift = gifts[0];
    }
    
    response.cookie('is_new', "no");
    response.cookie('gift', context.gift);
    response.render('index', context);
});

module.exports = router;