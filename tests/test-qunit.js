
define(
	function () {
		return function () {
			module(
				'Qunit Setup Tests'
			);

			test(
				'Test qunit works',
				function () {
			  		ok( 1 == '1', 'Passed!' );
				}
			);
		};
	}
);