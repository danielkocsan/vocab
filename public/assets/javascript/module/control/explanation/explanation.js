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

                    this.containers = {};

                    this.element.append(this.containers[0] = $('<li />'));
                    this.element.append(this.containers[1] = $('<li />'));
                    this.element.append(this.containers[2] = $('<li />'));

                    this.containerCount = this.element.children().length;
                },

                '{window} wordset_ready': function (element, event) {
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
                        this.containers[randomSequence[index]].html(
                            (wordSetArray[index]).explanation
                        );
                    }

                    this.element.children().removeClass('correct').addClass('wrong');
                    this.containers[randomSequence[0]].removeClass('wrong').addClass('correct');
                },

                'li click': function (element, event) {
                    event.preventDefault();

                    this.element.addClass('show');

                    can.trigger(
                        global.document.body,
                        'answer_got',
                        $(event.srcElement).html()
                    );
                }
            }
        );
    }
);