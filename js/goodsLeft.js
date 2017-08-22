// JavaScript Document

var main_goods=document.getElementsByClassName('main_goods')[0];
var goods_left_pic=main_goods.getElementsByClassName('goods_left_pic')[0];			//选中图
var theBigBox=document.getElementById('goods_left_picHidden');
var theBigImg=theBigBox.children[0];			//放大后的图
var findtool=document.createElement('div');											//放大镜选中区域
goods_left_pic.appendChild(findtool);
findtool.style.cssText='width:200px; height:200px; background:yellow; position:absolute; opacity:0.3; top:0; left:0; z-index:10; display:none;'
var goods_select=main_goods.getElementsByClassName('goods_left_select')[0];
var goods_selectLi=goods_select.getElementsByTagName('li');
//按钮select 放大细节图
var selBtn=goods_select.getElementsByClassName('selBtn');
var changeData=0;													//移动值（判定值）

selBtn[1].onclick=function(){
	if(changeData<=-54){											//ul整体移动最大值54
	}else{
		var timer=setInterval(
			function(){
				changeData-=2;
				goods_selectLi[0].parentNode.style.left=changeData+'px';
				if(changeData<=-54){
					clearInterval(timer);
				};
			}
		,1);														//每1毫秒 移动2px;
	};
};

selBtn[0].onclick=function(){
	if(changeData<0){
		var timer=setInterval(
			function(){
				changeData+=2;
				goods_selectLi[0].parentNode.style.left=changeData+'px';
				if(changeData==0){
					clearInterval(timer);
				};
			}
		,1);
	}
};
//select 放大细节图
for(var i=0; i<goods_selectLi.length; i++){
	goods_selectLi[i].children[0].onmouseover=function(ev){
		goods_left_pic.children[0].children[0].src=theBigImg.src=this.src;			//分别用 li中 img 的src路径替换 图片选框中 和 放大后效果图片的 src
		for(var j=0; j<goods_selectLi.length; j++){									//每次选中li  所有li 的样式清空
			goods_selectLi[j].className='';
		};
		this.parentNode.className='colored2px';										//选中的 li 的样式 加上 colored2px；
	};
};

//放大镜
goods_left_pic.onmousemove=function(ev){
	var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;     //  document.Element 不兼容chrome  后者备注
	ev=ev||window.event;
	findtool.style.display='block';
	//找到 goods_left_pic 的offsetleft值
	function offsetleft(elm){
		var leftData=elm.offsetLeft;
		var parentElm=elm.offsetParent;
		while(parentElm!=null){
			leftData+=parentElm.offsetLeft;
			parentElm=parentElm.offsetParent;
		};
		return leftData;
	};
	var offleft=offsetleft(this);
	//找到 goods_left_pic 的offsettop值
	function offsettop(elm){
		var topData=elm.offsetTop;
		var parentElm=elm.offsetParent;
		while(parentElm!=null){
			topData+=parentElm.offsetTop;									//****** topDate 每次加上父级的 offsetTop
			parentElm=parentElm.offsetParent;
		};
		return topData;
	};
	var offtop=offsettop(this);
	var changeX=ev.clientX-offleft;
	var changeY=ev.clientY-(offtop-scrolltop);
	var l=changeX-findtool.offsetWidth/2;
	var t=changeY-findtool.offsetHeight/2;
	//限制放大镜移动区域 (left top值)
	if(changeX-findtool.offsetWidth/2<0){
		l=0;
	};
	if(changeY-findtool.offsetHeight/2<0){
		t=0;
	};
	if(changeX-findtool.offsetWidth/2>this.offsetWidth-findtool.offsetWidth){
		l=this.offsetWidth-findtool.offsetWidth;
	};
	if(changeY-findtool.offsetHeight/2>this.offsetHeight-findtool.offsetHeight){
		t=this.offsetHeight-findtool.offsetHeight;
	};
	findtool.style.left=l+'px';
	findtool.style.top=t+'px';
	// 移动速率
	var rateX=l/(this.offsetWidth-findtool.offsetWidth);
	var rateY=t/(this.offsetHeight-findtool.offsetHeight);
	theBigBox.style.display='block';
	theBigImg.style.left=-(theBigImg.offsetWidth-theBigBox.offsetWidth)*rateX+'px';
	theBigImg.style.top=-(theBigImg.offsetHeight-theBigBox.offsetHeight)*rateY+'px';
}
//移出 放大镜消失
goods_left_pic.onmouseout=function(ev){
	findtool.style.display=theBigBox.style.display='none';
};



//----------------------- goods_center



var goods_size=main_goods.getElementsByClassName('goods_size')[0];
var spanSize=goods_size.children[0].getElementsByTagName('span');
var payment=goods_size.children[1].getElementsByTagName('span');
function coloredSize(obj){
	for(var i=0; i<obj.length; i++){
		obj[i].onclick=function(){
			for(var j=0; j<obj.length; j++){
					obj[j].className='';
			};
			this.className='colored'	
		};
	};
};
coloredSize(spanSize);						// 选择 尺码
selPay(payment);							// 选择 付款方式
function selPay(obj){
	for(var i=0; i<obj.length; i++){
		obj[i].onclick=function(){
			if(this.className==''){
				for(var j=0; j<obj.length; j++){
						obj[j].className='';
				};
				this.className='colored'	
			}else{
				this.className='';
			}
		};
	};
};
//-----------选择 商品件数
var numberNum=main_goods.getElementsByClassName('goods_numberNum')[0];
var numberSel=main_goods.getElementsByClassName('goods_numberSel')[0];
numberSel.children[0].onclick=function(){
	numberNum.innerHTML=parseInt(numberNum.innerHTML)+1;
	if(numberNum.innerHTML>=5){
		numberNum.innerHTML=5;
		alert('允许单次最多购进5件,如有疑问请咨询客服');
	}
};
numberSel.children[1].onclick=function(){
	numberNum.innerHTML=parseInt(numberNum.innerHTML)-1;
	if(numberNum.innerHTML<=1){
		numberNum.innerHTML=1;
	};
};

//*******全局 阻止 文本选中事件***********************	
hxsd_tools.clearTextSelect(numberSel.children[0])
hxsd_tools.clearTextSelect(numberSel.children[1])
//--------------------goods_right
var pic_right=main_goods.getElementsByClassName('goods_right_picinner')[0];			// 图片长条框
var rightSelect=main_goods.getElementsByClassName('goods_right_select')[0];
rightSelect.children[0].onclick=function(){
	hxsd_tools.move(pic_right,{top:-480});
};
rightSelect.children[1].onclick=function(){
	hxsd_tools.move(pic_right,{top:0});
};
