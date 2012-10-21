define(
    [
        'can/can.zepto.min'
    ],
    function () {
        var global = window;

        return can.Control(
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
    }
);