function rotate(selector, deg) {
	var el = document.querySelector(selector);
	el.style.webkitTransform = 'rotate('+ deg + 'deg)';
	el.style.transform = 'rotate('+ deg +'deg)';
};

// 设置模拟时钟
function setAnalog() {

	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();
	var delayTime;
	var tables = document.querySelector('.analog-surface');
	if(h >= 18 || h <= 6) {
		tables.classList.add('night-analog');
		if(h >= 18)
		delayTime = (12*3600 - ((h-18)*60*60 + m*60 + s))*1000;
		if(h <= 6)
		delayTime = ((5-h)*3600 + (59-m)*60 + (60-s))*1000;
	} else {
		delayTime = ((17-h)*3600 + (59-m)*60 + (60-s))*1000;
	}
	// console.log('delayTime'+delayTime);

	// test delay
	// delayTime = 5000;
	// 每分钟查询下当前时钟大小，判断是否显示为夜晚
	var DayOrNight = function (time) {
	// console.info('delayTime'+time);

		setTimeout(function() {
			tables.classList.toggle('night-analog');
			delayTime = 12* 60 * 60 * 1000;
			// delayTime = 3000;
			DayOrNight(delayTime);
		}, time);
	}
	DayOrNight(delayTime);

	h = (h> 11) ? h-12: h;
	rotate('.analog-hour', ((h*3600 + m*60 + s)/43200 * 360));
	rotate('.analog-min', ((m*60+s)/3600*360));
	rotate('.analog-sec', (s/60*360));
}
setAnalog();

/* =====================================================
 * 数字时间 请修改时修改digital.html不要修改此下面内容
 * ================================================== */

function defSet(num, element) {
	var chtml = '';

	if (num > 6) {
		console.error('时间最多6位！或是4位！');
		return;
	}

	for (var i = 0; i < num/2; i++) {
		chtml += '<div class="tims-mod">';
		for (var s = 0; s < 2; s++) {
			chtml += '<span><i class="c-old">9</i><i class="c-now">0</i><i class="c-new">1</i></span>';
		}
		chtml += '</div>';
		if (i != num/2 -1) {
			if (num == 4) {
				chtml += '<b class="flash">';
			} else {
				chtml += '<b>';
			}
			chtml += ':</b>';

		}
	}

	$(element).html(chtml);
};

function update(num) {
	num = !num ? '231422': num;

	var nowTime = '';
	$('.c-now').each(function() {
		nowTime += $(this).html();
	});

	for ( var i = 0; i < num.length; i++) {

		if (num[i] != nowTime[i]) {
			$('.digital-display span:eq('+i+') i').each(function() {
				if ($(this).hasClass('c-now')) {
					$(this).addClass('c-old').removeClass('c-now');

				} else if ($(this).hasClass('c-new')) {
					$(this).addClass('c-now').removeClass('c-new').html(num[i]);
				} else {
					$(this).addClass('c-new').removeClass('c-old');
				}
			});

			document.querySelector('title').text = nowTime.substr(0,2)+':'+nowTime.substr(2) + ' z-ios date';
		}
	}
}

function setNum(num) {
	if (num <= 9) {
		return ('0'+num.toString());
	} else {
		return num.toString();
	}
}

function clockAnimation() {
	var ctime = new Date();
	
	update(setNum(ctime.getHours()) + setNum(ctime.getMinutes()) + setNum(ctime.getSeconds()) );

	var self = this;
	setTimeout(function() {
		self.clockAnimation();
	}, 1000)

}

defSet(4,'.digital-display');
clockAnimation();