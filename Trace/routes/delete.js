var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next) {
    
    response.clearCookie("is_new");
    response.render('delete');
});

module.exports = router;