
/**
 * Toast，类似Android的toast
 * create time 	:	2016-01-07
 * author		:	janchou
 */

// $.toast({'message':'显示消息'}).show();
// $.toastx('显示消息...');

;(function(jQuery){
	var Toast = function(){  
		this.defaultOptions = {
			'appendToCtxSel':	'body',//上下文  
			'message':	'消息内容...',//显示内容  
			'durationTime':4000,//持续时间  
			'left':null,//距容器左边的距离  
			'top':null,//距容器上方的距离  
		};
		this.options = {};
		this.msgEntity = null;
		
		//初始化显示的位置内容等  
		this.initOpts = function(optionsParam){  
			this.options = jQuery.extend({},this.defaultOptions,optionsParam);
			return this;
		};
		
		//渲染DIV块
		this.render = function(){  
			//设置消息体  
			var msgDIV = new Array();  
			msgDIV.push('<div class="toastMessage">');  
			msgDIV.push('<span>'+this.options.message+'</span>');  
			msgDIV.push('</div>');  
			this.msgEntity = $(msgDIV.join('')).appendTo(this.options.appendToCtxSel);  
			
			//设置消息样式  
			var left = this.options.left == null ? $(this.options['appendToCtxSel']).width()/2 - this.msgEntity.find('span').width()/2 : this.options.left;  
			var top = this.options.top == null ? (screen.availHeight/4)*1.2 : this.options.top;  
			this.msgEntity.css({position:'fixed',top:top,'z-index':'99',left:left,'background-color':'black',color:'white','font-size':'18px',padding:'10px',margin:'10px','border-radius':'5px'});  
			this.msgEntity.hide();  
			return this;
		};
		
		//初始化配置和渲染内容
		this.init = function(optionsParam){
			this.initOpts(optionsParam);
			this.render();
			return this;
		};
		
		//显示动画  
		this.show = function(){  
			var thisTemp = this;
			this.msgEntity.fadeIn(this.options.durationTime/4);
			this.msgEntity.fadeOut(this.options.durationTime*3/4,function(){
				thisTemp.msgEntity.remove();
			});  
			return this;
		};
	};
	
	//注册对象
	jQuery.extend({
		toast: function(options) {
			var toast =  new Toast();
			toast.init(options);
			return toast;
		},
		toastx: function(message) {
			var options = {
				'message':message
			};
			var toast = new Toast();
			toast.init(options);
			toast.show();
		},
	});
})(jQuery);

