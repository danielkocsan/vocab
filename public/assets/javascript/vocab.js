require.config(
	{
		baseUrl: 'assets/javascript/library',
		paths: {
			module: '../module'
		}
	}
);

require(
	[
		'zepto/zepto',
		'module/construct/game/game',
		'module/model/socket/socket',
		'module/control/word/word',
		'module/control/explanation/explanation',
	],
	function (Zepto, GameConstruct, SocketModel, WordControl, ExplanationControl) {
		var global = window;

		new WordControl($('<div />').appendTo(global.document.body));
		new ExplanationControl($('<ul />').appendTo(global.document.body));
		new GameConstruct();
	}
);