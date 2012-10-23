define(
    [
        'can/can.zepto.min'
    ],
    function () {
        var global = window;

        return can.Construct(
        {
            init: function () {
                this.bind();

                this.getNextWordSet();
            },

            bind: function () {
                $(global.document.body).bind(
                    'answer_got',
                    $.proxy(this.answerGot, this)
                );
            },

            getNextWordSet: function () {
                $(global).trigger('wordset_needed');
            },

            answerGot: function (event) {
                var answer = event.data;

                global.setTimeout($.proxy(this.getNextWordSet, this), 2000);
            }
        });
    }
);