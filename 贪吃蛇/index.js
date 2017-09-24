snake();

function snake() {
		var oTable=document.getElementById('otable');
		var score=document.getElementById('score');
		var timer=keytimer=null;
		var directionCode="";
		var speed=100;
		//创建游戏区域table
		var oTbody=document.createElement('tbody');
		for (var i = 0; i < 50; i++) {
			var oTr=document.createElement("tr");
			for(var j = 0;j < 50; j++){
				var oTd=document.createElement("td");
				oTr.appendChild(oTd);
			}
			oTbody.appendChild(oTr);
			oTable.appendChild(oTbody);
		}
		var oTbody=oTable.getElementsByTagName('tbody')[0];
		var oTd=oTbody.getElementsByTagName('td');

		createDiv();
		//创建要吃的小方块
		function createDiv() {
			var len=oTd.length;
			var num=Math.floor(Math.random()*len);
			for (var k = 0 ; k < len; k++) {
				//随机生成的方块一旦碰到蛇，就会被吃掉，在吃掉的时候再次调用再产生一个
				if (oTd[num].style.backgroundColor!="green") {
					oTd[num].style.backgroundColor="red";
				}else{
					createDiv();
				}
			}			
		}

	//初始化蛇的位置以及蛇的颜色
	var arr=[[3,5]];
	var oTr=oTbody.getElementsByTagName('tr');
	snakeColor();
	function snakeColor() {
		for (var i = 0; i < arr.length; i++) {
			//随着arr增加身体变长，然后将不是目标方块的单元格pop()
			oTr[arr[i][0]].getElementsByTagName('td')[arr[i][1]].style.backgroundColor="yellow";
		}
		//蛇的头部
		oTr[arr[0][0]].getElementsByTagName('td')[arr[0][1]].style.backgroundColor="green";
	}

	//触发按键
	document.onkeydown=function(ev) {
		var ev=event||window.event;
			doAction(ev.keyCode);
		// clearTimeout(keytimer);
		// keytimer = null;
		// keytimer=setTimeout(function() {
		// 	doAction(ev.keyCode);
		// },20)
		//确保蛇的运动方向正确，禁止与运动方向相反的按钮生效
		function doAction(keyCo) {
		if (keyCo==37||keyCo==38||keyCo==39||keyCo==40) {
			if (Math.abs(directionCode-keyCo)==2||directionCode==keyCo) {
				return;
			}else{
				directionCode=keyCo;
			}
		}
		//right
		if (keyCo==39) {
			clearInterval(timer);
			console.log("右"+keyCo);
			timer=setInterval(function() {
				doMove(0,1);			
			},speed)
			
		}
		//left
		if (keyCo==37) {
			clearInterval(timer);
			console.log("左"+keyCo);
			timer=setInterval(function() {
				doMove(0,-1);			
			},speed)			
		}	
		//up	
		if (keyCo==38) {
			clearInterval(timer);
			console.log("上"+keyCo);
			timer=setInterval(function() {
				doMove(-1,0);		
			},speed)				
		}
		//down		
		if (keyCo==40) {//down
			clearInterval(timer);
			console.log("d"+keyCo);
			timer=setInterval(function() {
				doMove(1,0);			
			},speed)				
		}		
		}
	}
	//蛇的运动
	function doMove(x,y) {
		console.log(speed);
		//触碰自己结束游戏
		for(var i=0;i<arr.length;i++){
			//头部与身体的任意一个单元格重合
			if (arr[0][0]+x==arr[i][0]&&arr[0][1]+y==arr[i][1]) {
				console.log("触碰自己");
				fail();
				return;
			}
		}
		//触碰边缘结束游戏
		for(var j=0;j<arr.length;j++){
			//头部与上下左右四个边缘触碰
			if (arr[0][0]+x==oTr[0].getElementsByTagName('td').length||arr[0][1]+y==oTr[0].getElementsByTagName('td').length||arr[0][0]+x==-1||arr[0][1]+y==-1) {
				console.log("触碰边缘");
				fail();
				return;				
			}
		}
		
		//蛇的长度变化，通过将经过的单元格push()入arr
		arr.unshift([arr[0][0]+x,arr[0][1]+y]);
		if (oTr[arr[0][0]].getElementsByTagName('td')[arr[0][1]].style.backgroundColor=="red") {
			//如果遇到了小方块则"吃掉"(将目标方块的样式变为蛇的样式),并加一分，再次调用生成目标方块函数
			score.innerHTML=arr.length-1;
			addSpeed(arr);			
			createDiv();
		}else{
			//如果向前移了一格，但是没遇到目标方块，则将其最后一个恢复成原来的样式
			oTr[arr[arr.length-1][0]].getElementsByTagName('td')[arr[arr.length-1][1]].style.backgroundColor="#000";
			//并且将arr最后一个pop()
			arr.pop();
		}
		snakeColor();
	}
	function addSpeed(arr) {
		if (arr.length>10) {
			speed=80;
		}
		if (arr.length>20) {
			speed=60;
		}
		if (arr.length>30) {
			speed=50;
		}				
	}
	//触碰后出发的函数
	function fail() {
		//停止计数器
		clearInterval(timer);
		clearTimeout(keytimer);
		alert("游戏结束,您的分数为："+score.innerHTML);
		//删掉上一把生成的tbody，然后再次调用游戏函数
		//分数归零
		score.innerHTML=0;		
		oTable.removeChild(oTbody);
		snake();
	}
}