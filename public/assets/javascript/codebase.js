(function (can, global, $) {
    'use strict';
    

    var Game = can.Construct(
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
        }
    );

    var Word = can.Control(
        {
            init: function (element) {
                this.element = element;
                this.element.addClass('post-it');
                this.bind();
            },

            bind: function () {
                $(global.document.body).bind(
                    'wordSet-ready',
                     $.proxy(this.wordSetReady, this)
                );
            },

            wordSetReady: function (event) {
                var wordSet = event.data;

                this.element.html(wordSet.correct.word);
            }
        }
    );

    var Explanation = can.Control(
        {
            init: function (element) {
                this.element = element;
                this.element.addClass('answers');
                this.bind();

                this.containers = {};

                this.element.append(this.containers[0] = $('<li />'));
                this.element.append(this.containers[1] = $('<li />'));
                this.element.append(this.containers[2] = $('<li />'));

                this.containerCount = this.element.children().length;
            },

            bind: function () {
                $(global.document.body).bind(
                    'wordSet-ready',
                     $.proxy(this.wordSetReady, this)
                );

                this.element.bind(
                    'click',
                    $.proxy(this.clicked, this)
                );
            },

            wordSetReady: function (event) {
                var wordSet = event.data,
                    index,
                    randomSequence = [0, 1, 2].sort(
                        function () {
                            return !!Math.round(Math.random(1));
                        }
                    ),
                    wordSetArray = [wordSet['correct'], wordSet['wrong1'], wordSet['wrong2']];

                this.element.removeClass('show');

                for (index in randomSequence) {
                    this.containers[index].html(
                        (wordSetArray[randomSequence[index]]).explanation
                    );
                }

                this.element.children().removeClass('correct').addClass('wrong');
                this.containers[randomSequence[0]].removeClass('wrong').addClass('correct');
            },

            clicked: function (event) {
                event.preventDefault();

                this.element.addClass('show');

                can.trigger(
                    global.document.body,
                    'answer-got',
                    $(event.srcElement).html()
                );
            },

            insertExplanation: function (explanation) {
                this.cont1.html(explanation);
            }
        }
    );

    new Word($('<div />').appendTo(global.document.body));
    new Explanation($('<ul />').appendTo(global.document.body));
    new Game(Dictionary);
}(can, window, Zepto));