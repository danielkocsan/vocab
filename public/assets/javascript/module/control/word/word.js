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
	}
);