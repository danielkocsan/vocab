require.config(
	{
		baseUrl: '../public/assets/javascript/library',
		paths: {
			module: '../module'
		}
	}
);

require(
	[
		'zepto/zepto',
		'test-qunit.js',
		'module/control/word/tests',
		'module/control/explanation/tests'
	],
	function (
		Zepto,
		TestsQunit,
		TestsModuleControlWord,
		TestsModuleControlExplanation
	) {
		TestsQunit();
		TestsModuleControlWord();
		TestsModuleControlExplanation();
	}
);