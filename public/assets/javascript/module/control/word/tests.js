define(
	function () {
		return function () {
			var global = window;				

			require(
				['module/control/word/word'],
				function (Word) {

					var element = $('<div />').appendTo('#qunit'),
						instance = new Word(element);

					module(
						'Module.Control.Word Tests',
						{
							setup: function () {
							},
							teardown: function () {
							}
						}
					);	

					test(
						'module variable asserts',
						function () {
							ok(
								typeof Word === 'function',
								'Word is a function'
							);

							strictEqual(
								typeof instance,
								'object',
								'instance is an object'
							);
						}
					);

					test(
						'init function asserts',
						function () {
							ok(
								element.hasClass('post-it'),
								"Element's get the 'post-it' class"
							);
						}
					);

					test(
						"module reacts for 'wordset_ready' event",
						function () {
							strictEqual(
								element.html(),
								'',
								'Element is empty before event'
							);

							can.trigger(
			                    global,
			                    'wordset_ready',
			                    {
			                        "correct": {
			                        	word: 'Testing'
			                        }
			                    }
			                );

			                strictEqual(
								element.html(),
								'Testing',
								"Element's got the content"
							);
						}
					);

					element.remove();
				}
			);
		}
	}
);