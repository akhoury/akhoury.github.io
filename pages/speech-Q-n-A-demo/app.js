var express = require('express');
var app = express();

var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/public/templates');

app.use(express.static(__dirname + '/public'));

//fake
var list = require('./public/data/questions.json');

var Questions = require('./public/js/questions');

var questions = new Questions(list);

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/question', function (req, res) {
    res.json(questions.guess(req.query.q));
});

var server = app.listen(3000, function () {
    var address = server.address();
    console.log('app listening at http://%s:%s', address.address, address.port);
});