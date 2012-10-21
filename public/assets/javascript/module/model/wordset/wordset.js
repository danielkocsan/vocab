define(
	[
        'can/can.zepto.min'
    ],
	function () {
		return can.Model(
		    {
		        "findAll": "GET dictionary.json"
		    },
		    {}
		);
	}
);
