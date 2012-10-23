define(
	['socket.io/socket.io'],
	function () {
		var global = window,
			Socket = function () {
				this.socket = io.connect('ws://localhost:8020');

				this.bind();
			}

		Socket.prototype = {
			bind: function () {
				$(global).on(
					'wordset_needed',
					$.proxy(this.onWordsetNeeded, this)
				);

				this.socket.on(
					'wordset_ready',
					$.proxy(this.wordsetReady, this)
				);

				this.socket.on(
					'no_more_words',
					function () {
						alert('Game ends');	
					}					
				);
			},

			onWordsetNeeded: function () {
				console.log('wordset_needed');
				this.socket.send('wordset_needed');
			},

			wordsetReady: function (wordset) {
				can.trigger(
					global,
					'wordset_ready',
					wordset
				);
			}
		}

		return new Socket();
	}
);