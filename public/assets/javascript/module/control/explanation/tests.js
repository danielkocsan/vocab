define(
	function () {
		return function () {
			var global = window;

			require(
				['module/control/explanation/explanation'],
				function (Explanation) {

					var element = $('<ul />').appendTo('#qunit'),
						instance = new Explanation(element);

					module(
						'Module.Control.Explanation Tests',
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
								typeof Explanation === 'function',
								'Explanation is a function'
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
								element.hasClass('answers'),
								"Element's get the 'answers' class"
							);

							strictEqual(
								element.children().length,
								3,
								'Three children created'
							);
						}
					);

					test(
						"module reacts for 'wordset_ready' event",
						function () {
							can.trigger(
			                    global,
			                    'wordset_ready',
			                    {
			                        correct: {
			                        	explanation: 'Correct'
			                        },
			                        wrong1: {
			                        	explanation: 'Wrong1'
			                        },
			                        wrong2: {
			                        	explanation: 'Wrong2'
			                        }
			                    }
			                );

			                strictEqual(
								element.children('.wrong').length,
								2,
								"There are two wrong exlanation signed"
							);

							strictEqual(
								element.children('.correct').length,
								1,
								"There are one correct exlanation signed"
							);

							strictEqual(
								element.children('.correct').html(),
								'Correct',
								"The correct explanation placed to the right placed"
							)
						}
					);

					test(
						"module triggers 'answer_got' on 'click' event",
						function () {

							stop();

							 $(global).bind(
								'answer_got',
								function () {
									ok(
										true,
										"Module triggered an 'answer_got' event"
									);
								}
							);

							global.setTimeout(						
								function () {
									start();

									$(global).unbind('answer_got');
								},
								100
							);


							can.trigger(
				                    element.children('.correct'),
				                    'click'
				                );
							}
					);

					test(
						"module doesn't react for 'click' event on element",
						function () {

							stop();

							 $(global).bind(
								'answer_got',
								function () {
									ok(
										false,
										"Element reacts for 'click event'"
									);
								}
							);

							global.setTimeout(						
								function () {
									ok('true');

									start();

									$(global).unbind('answer_got');
								},
								100
							);


							can.trigger(
				                    element,
				                    'click'
				                );
							}
					);

					element.remove();
				}
			);
		}
	}
);