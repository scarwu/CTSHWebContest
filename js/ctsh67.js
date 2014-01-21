'use strict'

window.currentBg = 0;

function headerResize () {
	$('body').css('padding-top', $(window).height() + 'px');
	$('div[class=block]').css('height', $(window).height() + 'px');
}

var handle = {
	headerText: function (t, w) {
		$('header .title').css('top', (-t * 0.2) + 'px');
		$('header .slogan1').css('left', (-t * 1.2) + 'px');
		$('header .slogan2').css('left', (t * 1.2) + 'px');
	},
	changeBG: function (t, w) {
		var current = parseInt((t + w) / w / 2);
		var BGConfig = [{
			bg: 'bg5.jpg',
			init: '0 -' + (w * 0.1) + 'px',
			formula: t * 0.1 - (w * 0.1)
		}, {
			bg: 'bg3.jpg',
			init: '0 -' + (w * 0.2) + 'px',
			formula: (t - w) * 0.1 - (w * 0.2)
		}, {
			bg: 'bg6.jpg',
			init: '0 -' + (w * 0.2) + 'px',
			formula: (t - 3 * w) * 0.1 - (w * 0.2)
		}, {
			bg: 'bg4.jpg',
			init: '0 -' + (w * 0.2) + 'px',
			formula: (t - 5 * w) * 0.1 - (w * 0.2)
		}];

		$('header').css('background-position', '0 ' + BGConfig[current].formula + 'px');

		if (window.currentBg != current && current in BGConfig) {
			window.currentBg = current;

			var path = 'url(\'../img/' + BGConfig[current].bg + '\')';
			$('header').css({
				'background-image': path,
				'background-position': BGConfig[current].init
			});
		}
	}
}

$(document).ready(function () {
	$('nav a').on('click', function (event) {
		event.preventDefault();

		var target = $(this).attr('href');
		var moveTo = $(target).position().top;

		$('html, body').stop().animate({
			scrollTop: moveTo
		}, 750);
	});

	$(window).on('resize', function () {
		var scrollTop = $(document).scrollTop();
		var windowHeight = $(window).height();

		for (var i in handle) {
			handle[i](scrollTop, windowHeight);
		}
		
		headerResize();
	}).on('scroll', function () {
		var scrollTop = $(document).scrollTop();
		var windowHeight = $(window).height();

		for (var i in handle) {
			handle[i](scrollTop, windowHeight);
		}
	});

	headerResize();
});