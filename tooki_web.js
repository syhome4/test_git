var express = require('express');
var app = express();
var fs = require('fs');

app.listen(3303, function ()
    
   console.log('Sever Start . ')
   
});

app.get('/', function (req, res) {
    fs.readFile('image.html',function(error, data)
               {
        if(error)
            {
                console.log(error);
            }
        else
            {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
    });
});
