var express = require('express'),
    DatabaseLayer = require('./module.DatabaseLayer.js'),
    CollectionDataModel = require('./module.CollectionDataModel.js'),
    app = express();

var mydb = new DatabaseLayer('localhost', 'vocab');
var wordsetModel = new CollectionDataModel('wordset', mydb);

app.use(express.bodyParser());

app.get(
    '/',
    function (request, response) {
        wordsetModel.getAll(
            function (docs) {
                response.send(docs);
            }
        );
    }
);

app.post(
    '/addWordSet',
    function (request, response) {
        var parametes = request.body;

        if (
            typeof parametes.word === 'string'
            &&
            typeof parametes.expression === 'string'
        ) {
            wordsetModel.insert(
                {
                    word: parametes.word,
                    expression: parametes.expression
                },
                function (id) {
                    response.send('Record inserted with ID # ' + id);
                }
            );
        }
        else {
            response.status(500);
            response.send('Error');
        }
    }
);

app.listen(8010);