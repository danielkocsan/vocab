var Mongodb = require('mongodb'),
    Db = Mongodb.Db,
    Connection = Mongodb.Connection,
    Server = Mongodb.Server,
    DatabaseLayer;


DatabaseLayer = function (host, databaseName) {
    this.init(host, databaseName);
}

DatabaseLayer.prototype = {
    init: function (host, databaseName) {
        this.dbConfig = new Db(
            databaseName,
            new Server(
                host,
                Connection.DEFAULT_PORT,
                {}
            ),
            {
                safe: true
            }
        );
    },

    getDbInstance: function (callback) {
        if (!!this.dbInstance) {
            callback(this.dbInstance);
        } else {
            this.dbConfig.open(
                (function (that) {
                    return function (error, dbInstance) {
                        that.dbInstance = dbInstance;
                        callback(that.dbInstance);
                    };    
                }(this))
            );    
        }    
    },
    
    getCollection: function (collectionName, callback) {
        this.getDbInstance(
            function (dbInstance) {
                if (!dbInstance) {
                    throw new Error('no dbInstance found');
                }
                dbInstance.collection(
                    collectionName,
                    function (error, collection) {
                        if (!error) {
                            callback(collection);    
                        };
                    }
                );
            }
        );
    }
}

module.exports = DatabaseLayer;