'use strict'

window.currentBg = 0;

function headerResize () {
	$('body').css('padding-top', $(window).height() + 'px');
	$('div[class=block]').css('min-height', $(window).height() + 'px');
}

var handle = {
	headerText: function (t, w) {
		$('header .title').css('top', (-t * 0.2) + 'px');
		$('header .slogan1').css('left', (-t * 1.2) + 'px');
		$('header .slogan2').css('left', (t * 1.2) + 'px');
	},
	changeBG: function (t, w) {
		var current = 0;
		var BGConfig = [{
			bg: 'bg5.jpg',
			init: -100,
			formula: -100 + (100 / w)
		}, {
			bg: 'bg3.jpg',
			init: -100,
			formula: -100
		}, {
			bg: 'bg6.jpg',
			init: -100,
			formula: -100
		}, {
			bg: 'bg4.jpg',
			init: -100,
			formula: -100
		}];
		
		var block = $('.block:nth-child(even)');
		for (var i = block.length - 1;i >= 0;i--) {
			var top = block.eq(i).position().top - (t + w);
			if (top < 0) {
				current = i + 1;
				break;
			}
		}

		$('header').css('background-position', '0 ' + BGConfig[current].formula + 'px');

		if (window.currentBg != current && current in BGConfig) {
			window.currentBg = current;
			console.log(current);

			var path = 'url(\'../img/' + BGConfig[current].bg + '\')';
			$('header').css({
				'background-image': path,
				'background-position': '0 ' + BGConfig[current].init + 'px'
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