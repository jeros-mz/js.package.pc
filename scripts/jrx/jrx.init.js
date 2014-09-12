;
/*
 * @method : jquery.init
 */
(function( $, window, document){
	
	//======================== Valiable ==========================
	var utils = $ || {};
	
	//============================================================
	
	//======================== mix $.utils =======================
	
	utils.jrx = jrx;
	
	$.each(jrx, function(v, i){
		
		if( utils[v] === undefined ){
			utils[v] = jrx[v];
		} else {
			jrx.log('ooora!');
		}
	});
	//============================================================
	
	//======================== Language ==========================
	
	//============================================================
	
	$(function(){			// document.ready
		
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
		if($.isFunction($.fn.datepicker)){
			$.datepicker.setDefaults({
				// showOn: "button",
                // buttonImage: $.config('staticPath') + "images/ico_calendar.gif",
                // buttonImageOnly: true,
                dateFormat: dateFormat
            });
            
			$('input[date]', $contents).datepicker();
		}
		//============================================================
		
	});
})( jQuery, window, document );