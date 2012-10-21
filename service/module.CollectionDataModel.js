var CollectionDataModel = function (collectionName, databaseLayer) {
    this.collectionName = collectionName;
    this.db = databaseLayer;
    this.collection = null;

    this.init();
}

CollectionDataModel.prototype = {
    init: function () {
        this.db.getCollection(
            this.collectionName,
            (function (that) {
                return function (collection) {
                    that.collection = collection;
                };
            }(this))
        );
    },

    getAll: function (callback) {
        this.collection.find(
            function (error, cursor) {
                cursor.toArray(
                    function (error, docs) {
                        callback(docs);
                    }
                );
            }
        );
    },

    insert: function (object, callback) {
        this.collection.insert(
            object,
            {},
            function (result) {
                callback(result);
            }
        );
    }
}

module.exports = CollectionDataModel;