var fs = require('fs');

var morgan = require('morgan');
var body_parser = require('body-parser');

var Connect = require('connect');
var Router = require('router');

var server = new Connect();
var router = new Router();

// server.use(morgan('combined'));
server.use(morgan(':date[iso] :method :status :http-version :url'));

server.use(body_parser.urlencoded({ 'extended' : true }));

router.get("/form", function (request, response) {

    fs.readFile('form.html', 'utf8', function (error, content) {
        
        if (!error) {
            
            response.writeHead(200, { 'Content-Type' : 'text/html' });
            response.end(content);
        }
        else {
            
            response.writeHead(501, { 'Content-Type' : 'text/plain' });
            response.end("Error while reading a file :(");
        }
    });
});

router.post("/form", function (request, response) {
    
    response.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8;' });
    
    response.write("name: " + request.body.name + "\n");
    response.write("password: " + request.body.password + "\n");
    response.write("gender: " + request.body.gender + "\n");
    response.write("timed_off: " + request.body.timed_off + "\n");
    response.write("profile: " + request.body.profile + "\n");
    
    response.end();
});


router.all("", function (request, response) {

    response.writeHead(200, { 'Content-Type' : 'text/plain' });
    response.end("Hello, Node with Connect / Router !!");
});


server.use(router);
server.listen(8080, function () {
    
    console.log("Server is running on port 8080 :)");
});