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
	            },

	            '{window} wordset_ready': function (element, event) {
	            	var wordSet = event.data;

	                this.element.html(wordSet.correct.word);
	            }
	        }
	    );
	}
);