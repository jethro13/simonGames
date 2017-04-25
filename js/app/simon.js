define(['jquery'], function($) {
	'use strict';

	var Simon = {
		sequence: [],
		copy: [],
		round: 0,
		active: true,
		mode: 'normal',

		init: function() {
			var that = this;
			$('[data-action=start]').on('click', function() {
				that.startGame();
			});
			$('input[name=mode]').on('change', function(e) {
				that.changeMode(e);
			});
		},

		startGame: function() {
			this.sequence = [];
			this.copy = [];
			this.round = 0;
			this.active = true;
			$('p[data-action="lose"]').hide();
			this.newRound();
		},


		newRound: function() {
			$('[data-round]').text(++this.round);
			this.sequence.push(this.randomNumber());
			this.copy = this.sequence.slice(0);
			this.animate(this.sequence);
		},

		registerClick: function(e) {
			var desiredResponse = this.copy.shift();
			var actualResponse = $(e.target).data('tile');
			this.active = (desiredResponse === actualResponse);
			this.checkLose();
		},

		checkLose: function() {
			// copy array will be empty when user has successfully completed sequence
			if (this.copy.length === 0 && this.active) {
				this.deactivateSimonBoard();
				this.newRound();

			} else if (!this.active) { // user lost
				this.deactivateSimonBoard();
				this.endGame();
			}
		},

		endGame: function() {
			if (this.mode !== 'free-board') {
				$('p[data-action=lose]').show();
				$($('[data-round]').get(0)).text('0');
			}
		},

		changeMode: function(e) {
			this.mode = e.target.value;
		},

		activateSimonBoard: function() {
			var that = this;
			$('.simon')
				.on('click', '[data-tile]', function(e) {
					that.registerClick(e);
				})

				.on('mousedown', '[data-tile]', function(){
					$(this).addClass('active');
					that.playSound($(this).data('tile'));
				})

				.on('mouseup', '[data-tile]', function(){
					$(this).removeClass('active');
				});

			$('[data-tile]').addClass('hoverable');
		},

		deactivateSimonBoard: function() {
			if (this.mode !== 'free-board') {
				$('.simon')
					.off('click', '[data-tile]')
					.off('mousedown', '[data-tile]')
					.off('mouseup', '[data-tile]');

				$('[data-tile]').removeClass('hoverable');
			}
		},

		animate: function(sequence) {
			var i = 0;
			var that = this;
			var interval = setInterval(function() {
				that.playSound(sequence[i]);
				that.lightUp(sequence[i]);

				i++;
				if (i >= sequence.length) {
					clearInterval(interval);
					that.activateSimonBoard();
				}
			}, 600);
		},

		lightUp: function(tile) {
			if (this.mode !== 'sound-only') {
				var $tile = $('[data-tile=' + tile + ']').addClass('lit');
				window.setTimeout(function() {
					$tile.removeClass('lit');
				}, 300);
			}

		},

		playSound: function(tile) {
			if (this.mode !== 'light-only') {
				var audio = $('<audio autoplay></audio>');
				audio.append('<source src="sounds/' + tile + '.wav" type="audio/wav" />');
				audio.append('<source src="sounds/' + tile + '.mp3" type="audio/mp3" />');
				$('[data-action=sound]').html(audio);
			}
		},

		randomNumber: function() {
			// between 1 and 4
			return Math.floor((Math.random()*4)+1);
		}
	};

	return Simon;
});
