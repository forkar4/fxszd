$(function () {
	var stickyTop = 0,
	scrollTarget = false;

	var timeline = $('.timeline__nav'),
	items = $('li', timeline),
	milestones = $('.timeline__section .milestone'),
	offsetTop = parseInt(timeline.css('top'));

	var TIMELINE_VALUES = {
		start: 190,
		step: 30 };


	$(window).resize(function () {
		timeline.removeClass('fixed');

		stickyTop = timeline.offset().top - offsetTop;

		$(window).trigger('scroll');
	}).trigger('resize');

	$(window).scroll(function () {
		if ($(window).scrollTop() > stickyTop) {
			timeline.addClass('fixed');
		} else {
			timeline.removeClass('fixed');
		}
	}).trigger('scroll');

	items.find('span').click(function () {
		var li = $(this).parent(),
		index = li.index(),
		milestone = milestones.eq(index);

		if (!li.hasClass('active') && milestone.length) {
			scrollTarget = index;

			var scrollTargetTop = milestone.offset().top - 80;

			$('html, body').animate({ scrollTop: scrollTargetTop }, {
				duration: 400,
				complete: function complete() {
					scrollTarget = false;
				} });

		}
	});

	$(window).scroll(function () {
		var viewLine = $(window).scrollTop() + $(window).height() / 3,
		active = -1;

		if (scrollTarget === false) {
			milestones.each(function () {
				if ($(this).offset().top - viewLine > 0) {
					return false;
				}

				active++;
			});
		} else {
			active = scrollTarget;
		}

		timeline.css('top', -1 * active * TIMELINE_VALUES.step + TIMELINE_VALUES.start + 'px');

		items.filter('.active').removeClass('active');

		items.eq(active != -1 ? active : 0).addClass('active');
	}).trigger('scroll');
});

  var imgs = document.getElementsByTagName('img');
    // 获取视口高度与滚动条的偏移量
    function lazyload(){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var viewportSize = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        for(var i=0; i<imgs.length; i++) {
            var x =scrollTop+viewportSize-imgs[i].offsetTop;
            if(x>0){
                imgs[i].src = imgs[i].getAttribute('loadpic');   
            }
        }
    }

    setInterval(lazyload,1000);