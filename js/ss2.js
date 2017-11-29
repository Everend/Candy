$(document).ready(function(){
	var play, status, rotate1, rotate2, rotate3, rotate4, rotate5, one = drag = flag = permit = direction = false, arg = [0,0], condi = [1,1], num = pageNum = rota = opac =  0;
//	文字动画
	$('h5').animate({opacity:0},10000);
	$('.walk:eq(0)').animate({left:-$('.walk').width()+'px'},10000,'linear',function(){
		$(this).css('left',$('#container').width());
	});
	$('.walk').mouseover(function(){
		$('.walk').css('color','khaki');
	});
	$('.walk').mouseout(function(){
		$('.walk').css('color','');
	});
//	头像动画
	$('.avatar').mouseover(function(){
		clearInterval(rotate2);
		$('.avatar a').css('animation','none');
		rotate1 = setInterval(function(){
			rota += 2;
			$('.avatar a').css({transform:'rotateY(' + rota + 'deg)',boxShadow:'0 0 10px 3px #80FFFF'});
		},20);
	});
	$('.avatar').mouseout(function(){
		clearInterval(rotate1);
		rotate2 = setInterval(function(){
			rota += 2;
			if(rota % 360){
				$('.avatar a').css({transform:'rotateY(' + rota + 'deg)',boxShadow:'0 0 10px 3px #80FFFF'});
			}else{
				clearInterval(rotate2),$('.avatar a').css('box-shadow','');
			}
		},1);
	});
//	导航栏动画
	$('.nav li').each(function(index){
		$(this).click(function(){
			$('html').animate({scrollTop:$('.part:eq('+ index +')').offset().top},500);
		});
	});
	$('.down').click(function(){
		$('html').animate({scrollTop:$('#about').offset().top},1000);
	});
	$('.top').click(function(){
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		if(scrollTop < $('#home').offset().top - 1) return false;
		$('html').animate({scrollTop:0},500);
	});
	//回到顶部缩放定位
	window.onresize = function(){
		var bottom = $(window).height() - $('.top').height();
		var right = ($(window).width() - $('#container').width()) / 2;
		$('.top').css({top: bottom - 10 +'px', right: right + 10 +'px'});
	}
//	切图动画
	$('.left:eq(0)').click(function(){
		left();
		flag = true;
	});
	$('.right').click(function(){
		right();
		flag = true;
	});
	$('.point li').each(function(index){
		$(this).click(function(){
			if(index - num == 1 || index - num == -2){
				right();
				flag = true;
			}else if(index - num == -1 || index - num == 2){
				left();
				flag = true;
			}
		});
	});
	function left(){
		if(flag) return false;
		$('.cover h1,h2').css('animation','none');
		$('.cover').stop(true,true).animate({marginLeft:0},500,function(){
			$(this).css({marginLeft:'-1349px'}).prepend($('.cover div:eq(-1)').clone())
			$('.cover div:eq(-1)').remove();
			num > 0? num-- : num = 2;
			$('.point li').css('background','transparent');
			$('.point li:eq('+ num +')').css('background','darkorange');
			flag = false;
		});
	}
	function right(){
		if(flag) return false;
		$('.cover h1,.cover h2').css('animation','none');
		$('.cover').stop(true,true).animate({marginLeft:'-2698px'},500,function(){
			$(this).css({marginLeft:'-1349px'}).append($('.cover div:eq(0)').clone().css('animation','none'))
			$('.cover div:eq(0)').remove();
			num < 2? num++ : num = 0;
			$('.point li').css('background','transparent');
			$('.point li:eq('+ num +')').css('background','darkorange');
			flag = false;
		});
	}
//	自动播放
	function auto(){
		play = setInterval(right,5000);
	}
	auto();
	$('#home').mouseenter(function(){
		clearInterval(play);
		$('.left').css('display','block');
	});
	$('#home').mouseleave(function(){
		auto();
		$('.left').css('display','');
	});
//	换色栏动画
	$('.tool p').click(function(){
		$('.tool').css('margin-left') == '0px'? $('.tool').animate({marginLeft:'-100px'},500) : $('.tool').animate({marginLeft:0},500);
	})
	$('.tool li').each(function(){
		$(this).click(function(){
			$('.down').css('border-top-color',$(this).css('background-color'));
		});
	});
//	弹出层动画
	$('.heart').each(function(index){
		$(this).click(function(){
			$(this).css('background-position-x') == '-23px'? $(this).css('background-position-x',0) : $(this).css('background-position-x','-23px');
		});
	});
	$('.enlarge').each(function(index){
		$(this).click(function(){
			pageNum = index;
			$('.full').fadeIn(500);
			$('.page').css('background-image',$(this).siblings('.picture').css('background-image'));
			$('h4').html('Page' + (pageNum + 1));
		});
	});
	$('.close:eq(0)').click(function(){
		$('.full').fadeOut(300);
	});
	$('.fleft').click(function(){
		direction = true;
		fade();
		flag = true;
	});
	$('.fright').click(function(){
		direction = false;
		fade();
		flag = true;
	});
	function fade(){
		if(flag) return false;
		direction? (pageNum > 0? pageNum-- : pageNum = 7) : (pageNum < 7? pageNum++ : pageNum = 0);
		$('.page').animate({opacity:0},300,function(){
			$(this).animate({opacity:1},300);
			$(this).css('background-image','url(img/page0'+ (pageNum + 1) + '.jpg)');
			$('h4').html('Page'+( pageNum + 1));
			flag = false;
		});
	}
//	拖拽动画
	var clickX, actorX, limit1 = $('.book').position().left;
	$('.book').mousedown(function(e){
		drag = true;
		$('.book').css('cursor','move');
		clickX = e.clientX - $('.book').position().left;
	})
	$(document).mousemove(function(e){
		if(!drag) return;
		actorX = e.clientX - clickX;
		actorX < 0 && (actorX = 0);
		actorX > 2 * limit1 && (actorX = 2 * limit1);
		$('.book').css('left', actorX + 'px');
		e.preventDefault();
	});
	$(document).mouseup(function(){
		drag = false;
		actorX != limit1 && ($('.book').animate({left: limit1 + 'px'},100));
		$('.book').css('cursor','pointer');
	});
//	翻页动画
	var turn1, turn2, x=180 ,y=0;
	$('.book div:eq(1), .book li:eq(1)').mouseover(function(){
		clearInterval(turn1);
		clearInterval(turn2);
		turn1 = setInterval(function(){
			if(x>0){
				x-=2,y-=2;
				x<0 && (x=0, y=-180, clearInterval(turn1));
				$('.book li:eq(0)').css('transform','rotateY(' + x + 'deg)');
				$('.book li:eq(1)').css('transform','rotateY(' + y + 'deg)');
			}
		},5)
	})
	$('.book div:eq(0), .book li:eq(0)').mouseover(function(){
		clearInterval(turn1);
		clearInterval(turn2);
		turn2 = setInterval(function(){
			if(x<180){
				x+=2,y+=2;
				x>180 && (x=180, y=0, clearInterval(turn2));
				$('.book li:eq(0)').css('transform','rotateY(' + x + 'deg)')
				$('.book li:eq(1)').css('transform','rotateY(' + y + 'deg)')
			}
		},5)
	})
//	demo动画
	$('.ss').each(function(index){
		$(this).mouseenter(function(){
			condi[index] = 1;
			clearInterval(rotate3);
			clearInterval(eval('rotate' + (index + 4)));
			rotate3 = setInterval(function(){
				arg[index] > 10 && (condi[index] = 0)
				arg[index] < -10 && (condi[index] = 1)
				condi[index]? arg[index]++ : arg[index]--;
				$('.ss:eq(' + index + ')').css({transform:'rotate(' + arg[index] + 'deg)'});
			},40);
		});
		$(this).mouseleave(function(){
			clearInterval(rotate3);
			index == 0 && (rotate4 = setInterval(release,40));
			index == 1 && (rotate5 = setInterval(release,40));
		});
		function release(){
			arg[index] > 0? arg[index]-- : arg[index]++;
			$('.ss:eq(' + index + ')').css({transform:'rotate(' + arg[index] + 'deg)'});
			!arg[index] && clearInterval(eval('rotate' + (index + 4)));
		}
	});
//	info动画
	$('.old').each(function(index){
		$(this).click(function(){
			var x = $('.new:eq(' + index + ')');
			if(x.css('display') == 'block'){
				$(this).find('span').html('+');
				x.slideUp(300);
			}else{
				$(this).find('span').html('-');
				x.slideDown(300);
			}
		});
	});
	//表单判断
	var a = $('input:eq(0)'), b = $('input:eq(1)'), c = $('input:eq(2)'), d = $('textarea');
	a.keyup(function(){
		name();
	})
	b.keyup(function(){
		photo();
	})
	c.keyup(function(){
		email();
	})
	d.keyup(function(){
		message();
	})
	$('button').click(function(){
		name();
		photo();
		email();
		message();
		if(!a.next().html() && !b.next().html() && !c.next().html() && !d.next().html()){
			permit = true;
			$(this).html('Your message has been sent.');
			$(this).animate({opacity:0.2},2000);
			$(this).css({color:'blue',cursor:'not-allowed',background:'transparent'});
		}
	});
	function name(){
		if(permit) return false;
		if(nameCheck(a.val()) == ''){
			a.next().html('Please enter your name.');
		}else if(nameCheck(a.val()).length < 2){
			a.next().html('Your name must consist of at least 2 characters.');
		}else{
			a.next().html('');
		}
	}
	function photo(){
		if(permit) return false;
		if(phoneCheck(b.val()) == ''){
			b.next().html('Please enter your phone number.');
		}else if(phoneCheck(b.val()).length < 3){
			b.next().html('Your photo number must contain at least 3 digits.');
		}else{
			b.next().html('');
		}
	}
	function email(){
		if(permit) return false;
		if(c.val() == ''){
			c.next().html('Please enter your email address.')
		}else if(!emailCheck(c.val())){
			c.next().html('Not a valid email address.')
		}else{
			c.next().html('');
		}
	}
	function message(){
		if(permit) return false;
		if(d.val() == ''){
			d.next().html('Please Write Something.');
		}else{
			d.next().html('');
		}
	}
	function nameCheck(str){
		return str.replace(/\ /g,'')
	}
	function phoneCheck(str){
		return str.replace(/\ |\D/g,'')
	}
	function emailCheck(str){
		var reg = /^\w+@\w+\.\w{2,}$/;
   		return reg.test(str);
	}
//	滚轮动画
	window.onscroll = function(){
		//导航栏及回到顶部位置变化
		var high = $(window).height();
		var scrollTop = $(document).scrollTop()
		var bottom = high - $('.top').height();
		var right = ($(window).width() - $('#container').width()) / 2;
		if(scrollTop >= $('#home').offset().top - 1){
			$('.nav').css({position:'fixed',top:0,cursor:'pointer'});
			$('.top').css({top: bottom - 10 +'px',right: right + 10 +'px',cursor:'pointer'});
		}else{
			$('.nav').css({position:'',top:''});
			$('.top').css({cursor:''});
		}
		//导航栏及回到顶部位透明度变化
		clearInterval(status);
		status = setInterval(function(){
			scrollTop >= $('#home').offset().top - 1? opac += 0.1 : opac -= 0.1;
			(opac >= 0 && opac <= 1)? $('.gradient,.top').css('opacity',opac) : clearInterval(status);
			opac < 0 && (opac = 0);
			opac > 1 && (opac = 1);
		},50);
		//导航栏背景随活动区域变化
		$('.nav li p').each(function(index){
			if(scrollTop >= $('.part:eq('+ index +')').offset().top - 1){
				$('.nav li p').removeClass('active');
				$(this).addClass('active');
			}else if(scrollTop < $('#home').offset().top - 1){
				$('.nav p').removeClass('active');
			}
		});
		//各部分动画
		$('.title').each(function(index){
			if(scrollTop >=  $('.note:eq('+ index +')').offset().top + 20 - high){
				$('.title:eq('+ index +'),.note:eq('+ index +')').css('animation','show 2s 0.5s');
			}
		});
		if(scrollTop >= $('.gallery').offset().top - high){
			$('.gallery li:eq(0)').css('animation','group1 1s');
			$('.gallery li:eq(1)').css('animation','group2 1.07s');
			$('.gallery li:eq(2)').css('animation','group3 1.54s');
			$('.gallery li:eq(3)').css('animation','group4 2s');
		}
		if(scrollTop >= $('.gallery li:eq(4)').offset().top - high){
			$('.gallery li:eq(4)').css('animation','group1 1s');
			$('.gallery li:eq(5)').css('animation','group2 1.07s');
			$('.gallery li:eq(6)').css('animation','group3 1.54s');
			$('.gallery li:eq(7)').css('animation','group4 2s');
		}
		if(scrollTop >=  $('.ss:eq(0)').offset().top - high){
			$('.ss:eq(0)').css('animation','shake 3s');
		}
		if(scrollTop >=  $('.fcc').offset().top - high){
			$('.fcc').css('animation','shake 3s');
		}
		if(scrollTop >=  $('.book').offset().top - high){
			$('.book div:eq(0)').css('animation','open 3s both');
		}
		if(scrollTop >=  $('.old:eq(0)').offset().top + $('.old').height()- high){
			!one && ($('.old span').html('-'),$('.new').slideDown(3000));
			one = true;
		}
	}
});