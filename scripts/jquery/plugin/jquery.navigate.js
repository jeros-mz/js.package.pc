;
/**
 * @name : jquery.fn.navi
 */
(function( $, window, document){
	
	/** 
	 * @name : navi
	 */
	$.fn.navi = function(options) {
		var _this = this,
			defaults = {data : [], lnb: '', page : ''},
			config = $.extend(defaults, options),
            pageInfo = {
				'jquery' : 'page/jquery.selector',
				'plugin' : 'page/plugin.validate'
			};
			
		function renderer ($target, data, deep) {
			
			var html = getList(data);
			
            $('<ul></ul>').html(html).appendTo($target).fadeIn(400);
            
            function getList(data) {
            	
            	var html = '';
            	
            	$.each(data, function(i, v){
            		
	                html += '<li' + (v.cls !== undefined ? ' class="' + v.cls + '"' : '') + '><a ' + (v.link !== undefined ? 'href="' + v.link + '"' : '') + '>' + v.name + '</a>';
	                if(deep == true && v.child && v.child.length){
	                	html += '<ul>' + getList(v.child) + '</ul>';
	                }
	                html += '</li>';
	            });
	            
            	return html;
            }
		}
		
		function init() {
			
			var child = setCurrent();
			
			renderer(_this, config.data);
			
			getPage(getUrl());
			
			if(child){
				
				renderer(config.lnb, child);
				showlnb();
				// if(config.lnb.find('a'))
				
				config.lnb.find('a').each(function(i, v){
					
					var $this = $(this);
					
					if($this.attr('href') == location.hash){
						$(this).closest('li').addClass('on');
					}	
				});
				
				if(!config.lnb.find('li.on').length){
					config.lnb.find('li:first').addClass('on');
				}
				
			} else {
				
			}
		}
		
		window.onhashchange = function (event) {
	        getPage(getUrl());
	   	};
	   	
	   	
	   	function getUrl () {

	   		var url = location.hash.replace( /^#\//, '' );
	   		
	   		if(!url){
	   			url = location.pathname.replace($.config('contextPath'), '').split('/');
	   			url = url[url.length - 1];
	   			url = pageInfo[url.replace('.html', '')];
	   			
	   		}
	   		
	   		if(url){
	   			url = url + '.html';
	   		}
	   		
	        return url;
	   	}
	   	
	   	function getPage(url) {
	   		
	   		if(!url) return;
	   			   		
			$.ajax({
	            url : $.config('contextPath') + url
	        }).done(function (r) {
	            config.page.html(r);
	            SyntaxHighlighter.highlight();
	        });
	   	}
	   	
		function setCurrent() {
			var path = location.pathname.replace($.config('contextPath'), ''), 
				child;
			
			if(path === '/') return null;
			
			$.each(config.data, function(i, v){
        		if(v.link.indexOf(path) > -1 ){
        		// if(path === v.link){
        			v.cls = "on";
        			child = v.child;
        		}
            });
            
            return child;
		}
		
		function hidelnb(fn) {
			resizelnb(0, fn);
		}
		
		function showlnb(fn) {
			resizelnb(200, fn);
		}
		
		function resizelnb(size, cb){
			
			size = $.type(size) === 'number' ? size + 'px' : size;
			
			config.lnb.parent().animate({
				width: size
			}, 1000, cb);
		}
		
		init();
		
    	return this;
	};
	

})( jQuery, window, document );