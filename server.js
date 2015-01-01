var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000))
app.use(require('express').static('public'));

http.listen(app.get('port'), function() {
  console.log("Node app is running at port:" + app.get('port'))
})