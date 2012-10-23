var express = require('express'),
    DatabaseLayer = require('./module.DatabaseLayer.js'),
    CollectionDataModel = require('./module.CollectionDataModel.js'),
    app = express(),
    server = require('http').createServer(),
    io = require('socket.io').listen(server);;

server.listen(8020);

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

var WordsetController = function (model) {
    this.model = model;
    this.idList = {};
}

WordsetController.prototype = {
    parse: function (action, arguments) {
        if (this[action] && typeof this[action] === 'function') {
            this[action].apply(this, arguments);
        }
    },

    wordset_needed: function (socket) {
        var that = this;

        if (!that.idList[socket.id]) {
            that.idList[socket.id] = [];
        }

        wordsetModel.getWordsRandom(
            that.idList[socket.id],
            function (cursor) {
                cursor.toArray(
                    function (error, docs) {
                        if (docs && docs.length === 3) { 
                            that.idList[socket.id].push(docs[0]._id);

                            socket.emit(
                                'wordset_ready', 
                                {
                                    correct: docs[0],
                                    wrong1: docs[1],
                                    wrong2: docs[2]
                                }
                            );
                        } else {
                            socket.emit('no_more_words');
                            delete that.idList[socket.id];
                        }
                    }
                );
            }
        );
    }
}

var wordsetController = new WordsetController(wordsetModel);

io.set('log level', 1); 

io.sockets.on(
    'connection',
    function (socket) {
        socket.on(
            'message',
            function (messageType) {
                wordsetController.parse(messageType, [socket]);                
            }
        );
    }
);