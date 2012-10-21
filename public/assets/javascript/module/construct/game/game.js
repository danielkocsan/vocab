define(
    [
        'can/can.zepto.min'
    ],
    function () {
        var global = window;

        return can.Construct(
        {
            init: function (model) {
                this.bind();

                model.findAll(
                    {},
                    $.proxy(this.dictionarySuccess, this)
                );
            },

            bind: function () {
                $(global.document.body).bind(
                    'answer-got',
                    $.proxy(this.answerGot, this)
                );
            },

            dictionarySuccess: function (model) {
                this.model = model;
                this.wordCount = this.model.length;
                this.initWordSet();
            },

            initWordSet: function () {
                this.correctWord = this.getNextWord();
                can.trigger(
                    global.document.body,
                    'wordSet-ready',
                    {
                        "correct": this.correctWord,
                        "wrong1": this.getWrongWord(this.correctWord),
                        "wrong2": this.getWrongWord(this.correctWord)
                    }
                );
            },

            getNextWord: function () {
                var index = this.generateRandomDictionaryIndex();
                return this.model[index];
            },

            getWrongWord: function (correctWord) {
                var word;

                do {
                    word = this.getNextWord();
                } while (word.explanation === correctWord.explanation);

                return word;
            },

            generateRandomDictionaryIndex: function () {
                return Math.floor(Math.random() * this.wordCount);
            },

            answerGot: function (event) {
                var answer = event.data,
                    result = answer === this.correctWord.explanation;

                global.setTimeout($.proxy(this.initWordSet, this), 2000);
            }
        });
    }
);