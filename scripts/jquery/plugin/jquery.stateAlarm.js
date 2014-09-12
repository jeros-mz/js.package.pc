;
/*	
 *	jQuery stateAlarm 1.0.0
 *	
 *	Copyright (c) 2014 MZ jeros
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
(function( $, window, document){
	
	/** 
	 * @name : stateAlarm
	 * @type : method 
	 * @param {object or string} alarm
	 * @param {number} sec
	 * @css 
		.state_alram {color:#ccc; line-height:1.4; position:absolute; z-index:10000; overflow:hidden; border-radius:5px; border:1px solid #111; box-shadow:0 0 10px 0 rgba(0, 0, 0, 0.5);}
		.state_alram > div {padding:10px;
			background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjkiLz4KICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZ3JhZC11Y2dnLWdlbmVyYXRlZCkiIC8+Cjwvc3ZnPg==);
			background: -moz-linear-gradient(top,  rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 100%);
			background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.9)), color-stop(100%,rgba(0,0,0,0.8)));
			background: -webkit-linear-gradient(top,  rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.8) 100%);
			background: -o-linear-gradient(top,  rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.8) 100%);
			background: -ms-linear-gradient(top,  rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.8) 100%);
			background: linear-gradient(to bottom,  rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.8) 100%);
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e6000000', endColorstr='#cc000000',GradientType=0 );
		}
	 */
	$.stateAlarm = function(alarm, sec) {
		
	    var el_id = 'stateAlarm', 
	    	$target = $('#' + el_id),
	    	type = typeof alarm, 
	    	mSec = sec ? sec * 1000 : 1500,
			body = document.body;
	
	    if (alarm && $.trim(alarm) == '') return;
	
	    setText(alarm);
	    $target.show({ complete: setTimer });
	
	    function setTimer() {
	        setTimeout(function () {
	            $target.fadeOut({
	                duration: 1500,
	                complete: function () {
	                    $target = null;
	                    $(this).remove();
	                }
	            });
	        }, mSec);
	    };
	
	    function setPosition() {
	        var $wrap = $(document.body),
				left = (($wrap.width() / 2) - ($target.width() / 2)) + 'px',
				top = (($wrap.height() / 2) - ($target.height() / 2)) + 'px';
	
	        $target.css({'top': top, 'left': left, position : 'fixed'});
	    };
	
	    function setText(alarm) {
	        if ($target && $target.length > 0) {
	            $target.remove();
	        }
	        $target = create();
		
			$target.find('div').html(alarm);
			setPosition();
	    };
	
	    function create() {
	
			// markup version 1.
	        var $html = $('<div id="stateAlarm" class="state_alram"><div style="padding:30px;"></div></div>');
	
	        $(document.body).append($html);
	        $target = $html;
	        return $target;
	    };
	};
	

})( jQuery, window, document );