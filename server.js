var express = require('express');

var app = express();

var port = process.env.port || 8080 ;

app.use(express.static(__dirname));

app.get('/',function(req,res){
    res.send();
})

app.listen(port,function(){
    console.log('server is running at '+ port);
})