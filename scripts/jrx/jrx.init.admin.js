;
/*
 * @method : jquery.init
 */
(function( $, window, document){
	$(function(){
		//========================= variable =========================
		var dateFormat = 'yy-mm-dd',
			timeFormat = 'HH:mm',
			appconfig = {
				"useLog" : true
			},
			content_type = {
				defaults : 'application/x-www-form-urlencoded; charset=UTF-8',
				json : 'application/json'
			},
			$logo = $('#header_logo'),
			$gnb = $('#nav'),
			$lnb = $('#lnb'),
			$contents = $('#contents'),
			$page = $contents.find('.sub-content');
		//============================================================
		
		//================== application configuration ===============
		$.config(appconfig);
		//============================================================
		
		//===================== set jquery ajax. ===================== contentType : content_type.defaults, 
		$.ajaxSetup({ cache: false,
        	converters: {
				// Convert anything to text
				"* text": window.String,
				// Text to html (true = no transformation)
				"text html": true,
				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,
				// Parse text as xml
				"text xml": jQuery.parseXML
			}
        });
		//============================================================
		
		//======================== datepicker ========================
		if($.type($.fn.datepicker) === 'function'){
			$.datepicker.setDefaults({
				// showOn: "button",
                // buttonImage: $.config('staticPath') + "images/ico_calendar.gif",
                // buttonImageOnly: true,
                dateFormat: dateFormat
            });
            
			$('input[date]', $contents).datepicker();
		}
		//============================================================
		
		//===================== global initialize ====================
		$logo.on('click', function () {
			location.href = '/';
			return false;
		});
		
		$contents.on('click', '#top', function(){
			location.href = "#";
			contentsScrollTop();
			return false;
		});
		//============================================================
		
		
		//========================== menu ============================
		var url = '/temp/json/menu.json';
		
		$.ajax({
            url : url,
            dataType : 'json'
        }).done(function (r) {
            $gnb.navi({lnb : $lnb, page:$page, data : r.menu});
        });
        
        $gnb.on('click', 'a', navigationHandler);
        $lnb.on('click', 'a', navigationHandler);
        
        function navigationHandler () {
        	
        	var $this = $(this);
        	
        	if($this.hasClass('on')) return false;

    		if($lnb.has($this).length){
    			$this.parent().addClass('on').siblings().removeClass('on');
    			contentsScrollTop();	
    		}
        }
		//============================================================
		
		//======================== functions =========================
		function contentsScrollTop() {
			$contents.find('.content-area').scrollTop(0);
		}
		//============================================================
		
		
	});
})( jQuery, window, document );