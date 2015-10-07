define(['jquery'],function($){
	function Carousel(cfg){
		this.cfg = {	
			speed:500,
			interval:1500,
			src:["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg"],
			width:600,
			height:400,
			left:0,
			top:0,
			container:''
		};
		$.extend(this.cfg, cfg);
		var self = this;
		this.index = 0;
		this.timer = null;
		this.picLength = this.cfg.src.length;
		//渲染轮播图组件
		this.renderUI(this.cfg);
		//初始化组件，第一张图片和第一个底部按钮显示
		this.init(this.index);
		//给按钮绑定事件
		this.nextbtn.click(function(){
			self.index++;
			self.checkIndex();
			self.picShow(self.index);
			self.btnShow(self.index);
		});
		this.prevbtn.click(function(){
			self.index--;
			self.checkIndex();
			self.picShow(self.index);
			self.btnShow(self.index);
		});
		this.btmbtn.delegate('.carousel-bottom-btn', 'click', function() {
			self.index = $(this).attr('data-index');
			self.picShow(self.index);
			self.btnShow(self.index);
		});
		this.autoPlay();
		this.carousel.hover(function(){self.stopPlay();},function(){self.autoPlay();});
	}
	Carousel.prototype={
		renderUI:function(cfg){
			var picList = '';
			var btnList = '';
			var len = cfg.src.length; 
			this.carousel = $('<div class="carousel">');
			this.pic = $('<div class="carousel-view">');
			//这里用text()方法会解析错误
			this.nextbtn = $('<span class="carousel-sidebtn carousel-sidebtn-prev">').html('&lt;');
			this.prevbtn = $('<span class="carousel-sidebtn carousel-sidebtn-next">').html('&gt;');
			this.btmbtn = $('<div class="carousel-bottom">');
			for(var i=0;i<len;i++){
				picList+='<img src="'+cfg.src[i]+'" alt="" class="carousel-view-pic">';
				btnList+='<span class="carousel-bottom-btn" data-index="'+i+'"></span>'
			}
			this.pic.append(picList);
			this.btmbtn.append(btnList);
			this.carousel.append(this.pic,this.btmbtn,this.prevbtn,this.nextbtn);
			this.carousel.css({width:cfg.width,height:cfg.height,left:cfg.left,top:cfg.top});
			$(cfg.container||document.body).append(this.carousel);
		},
		init:function(index){
			this.pic.children().eq(index).css({opacity:1}).siblings().css({opacity:0});
			this.btmbtn.children().eq(index).css({'background-color':'orange'});
		},
		autoPlay:function(){
			var self = this;
			self.timer = setTimeout(function(){
				//模拟点击next按钮
				self.nextbtn.trigger('click');
				self.autoPlay();
			}, self.cfg.interval);
		},
		stopPlay:function(){
			var self = this;
			clearTimeout(self.timer);
		},
		picShow:function(index){
			this.pic.children().eq(index).animate({opacity:1}, this.cfg.speed).siblings().animate({opacity:0}, this.cfg.speed);
		},
		//判断索引值是否为有效值
		checkIndex:function() {
			var self = this;
			if(self.index === self.picLength){
				self.index = 0;
			}else if(self.index < 0){
				self.index = self.picLength-1;
			}
		},
		btnShow:function(index){
			this.btmbtn.children().eq(index).css({'background-color':'orange'}).siblings().css({'background-color':'#fff'});
		}
	}
	return{
		Carousel:Carousel
	}
})