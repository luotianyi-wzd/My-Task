(function($) {
	//要播放的歌曲
	var playList=[
		["洛天依 - 外婆桥","http://ouwxeg0q0.bkt.clouddn.com/%E6%B4%9B%E5%A4%A9%E4%BE%9D%20-%20%E5%A4%96%E5%A9%86%E6%A1%A5.mp3"],
		["洛天依 - 权御天下","http://ouwxeg0q0.bkt.clouddn.com/%E6%B4%9B%E5%A4%A9%E4%BE%9D%20-%20%E6%9D%83%E5%BE%A1%E5%A4%A9%E4%B8%8B.mp3"],
		["洛天依 - 红尘客栈","http://ouwxeg0q0.bkt.clouddn.com/%E6%B4%9B%E5%A4%A9%E4%BE%9D%20-%20%E7%BA%A2%E5%B0%98%E5%AE%A2%E6%A0%88.mp3"],
		["洛天依 - 落花霁","http://ouwxeg0q0.bkt.clouddn.com/%E6%B4%9B%E5%A4%A9%E4%BE%9D,%E4%B9%90%E6%AD%A3%E7%BB%AB,%E7%A0%96%E5%8E%82%E6%B5%AA%E4%BA%BA%20-%20%E8%90%BD%E8%8A%B1%E9%9C%81%EF%BC%88%E5%8D%97%E5%8C%97%E7%89%88%EF%BC%89.mp3"],
		["洛天依 - 白石溪","http://ouwxeg0q0.bkt.clouddn.com/%E6%B4%9B%E5%A4%A9%E4%BE%9D,%E4%B9%90%E6%AD%A3%E7%BB%AB,%E7%B4%94%E7%99%BDP%20-%20%E7%99%BD%E7%9F%B3%E6%BA%AA.mp3"],
		["洛天依 - 谷雨","http://ouwxeg0q0.bkt.clouddn.com/%E6%A1%91%E8%91%9A%E4%B8%8A%E7%9A%84%E7%8C%B4%E5%AD%90%20-%20%E8%B0%B7%E9%9B%A8.mp3"]
	];	
	//定义要用到的变量
	var isPlay=false,
		player=null,
		playMode="list",	
		radio=0,
		num=0,
		btn_index;
	//播放
	var play=function() {
		audio.play();
		$(".btn1").addClass("pause");
		isPlay=true;
		progress();
	}
	//暂停
	var pause=function() {
		audio.pause();
		$(".btn1").removeClass("pause");
		isPlay=false;
		clearInterval(player);
	}
	//切歌
	var toggleSong=function(arg) {
		audio.src=playList[arg][1];
	 	$("#title").html(playList[arg][0]);			
	}
	//设置进度
	var setProgress=function(arg) {
		//时间变化	
		var miao=parseInt(arg%60)<10?"0"+parseInt(arg%60):parseInt(arg%60);
			radio=arg/audio.duration*100;
		$(".time").html(parseInt(arg/60)+":"+miao);
		//进度条前进
		$(".progress .slider .pace").css('width', radio + '%');
		$(".progress .slider").slider({'value':radio});
		// console.log(radio);
	}
	var progress=function() {
		player=setInterval(function() {
			setProgress(audio.currentTime);
		},500)
	}
	//设置声音及其进度条
	var setSound=function(arg) {
		audio.volume=localStorage.volume=arg;
		$(".volume .slider .pace").css('width',(audio.volume)*100+"%");
		// console.log(arg);
	}	
	//上一曲，下一曲
	var nextPre=function(arg){
		if (arg=="next") {
			num++;
			if (num>=playList.length) {
				alert("这是最后一首");
				num=playList.length-1;
			}
		}
	 	if (arg=="pre") {
	 		num--;
	 		if (num<0) {
	 			num=0;
	 			alert("这是第一首");
	 		}
	 	}
		toggleSong(num);
	 	audio.currentTime=0;
	 	$(".progress .slider").slider({'value':0});
	 	$(".progress .slider .pace").css('width', 0);
	 	if (isPlay==true) {
	 		play();
	 	}else{
	 		pause();
	 	}
	}
	//创建播放列表
	var musicList=function() {
		for (var i = 0; i < playList.length; i++) {
			$("#playList ol").append("<li><a href='#'>"+playList[i][0]+"</a></li>");
		}
	}
	musicList();
	//随机播放
	var random_list=function() {
		num=Math.floor(Math.random()*playList.length);
	}	
	$("#playList ol li").on("click",function() {
		num=$(this).index();
		toggleSong(num);
	 	play();
	})	
	//拖动进度条事件
	$(".progress .slider").slider({
		step:0.01,
		slide:function(event,ui) {
			clearInterval(player);
			setProgress(audio.duration * ui.value / 100);
		},
		stop:function(event,ui) {
			audio.currentTime = audio.duration * ui.value / 100;
			play();
		}
	});				
	$(".volume .slider").slider({
		step:0.1,
		max:1,
		min:0,
		slide:function(event,ui) {
			setSound(ui.value);
		}
	});	
	//静音按钮				
	$(".sound").on("click",function() {
		console.log(audio.volume);
		if (audio.volume==0) {
			setSound($(this).data("volume"));
			$(".sound").removeClass("mute");
		}else{
			$(this).data("volume",audio.volume);
			setSound(0);
			$(".sound").addClass("mute");
		}
	})
	//播放暂停按钮
	$(".btn1").on("click",function() {
		if (audio.paused) {
			play();
		}else{
			pause();
		}
	})
	//上一曲按钮
	$(".btn2").on("click",function() {
		nextPre("pre");
	});
	//下一曲按钮
	$(".btn3").on("click",function() {
		nextPre("next");
	});
	//隐藏说明
	$("#explan").on("click",function() {
		$(this).css("display","none");
	})
	//实现随机播放，单曲循环，列表播放，单曲播放
	var click_btn=function() {
		$("#playMode .btn4").on("click",function() {
			playMode="random";
			btn_index=$("#playMode .btn").index(this);
			$("#playMode .btn").eq(btn_index).css('opacity',1).siblings().css('opacity',0.5);
		})		
		$("#playMode .btn5").on("click",function() {
			playMode="repeat";
			btn_index=$("#playMode .btn").index(this);
			$("#playMode .btn").eq(btn_index).css('opacity',1).siblings().css('opacity',0.5);
		})
		/*$(".btn6").on("click",function() {
			playMode="list";
		})					
		$(".btn7").on("click",function() {
			playMode="stop";
		})	*/					
	}	
	//监听歌曲结束时，播放顺序
	audio.addEventListener("ended",function() {
		if (playMode=="list") {
			num++;
			if (num>playList.length-1) {
				num=0;
			}
		}
		if (playMode=="random") {
			random_list();
		}
		if (playMode=="repeat") {
			num=num;
		}
		if (playMode=="stop") {
			pause();
		}
		toggleSong(num);
	 	play();			
	})	
	var init=function() {
		click_btn();
		setSound(0.3);			
	}	
	init();			
})(jQuery);
