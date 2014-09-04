;
/*
 * @method : jquery.init
 */
(function( $, window, document){
	$(function(){
		//============================ var ===========================
		var dateFormat = 'yy-mm-dd',
			timeFormat = 'HH:mm',
			appconfig = {
				"useLog" : true
			},
			content_type = {
				defaults : 'application/x-www-form-urlencoded; charset=UTF-8',
				json : 'application/json'
			};
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
            
			$('input[date]').datepicker();
		}
		//============================================================
		
		//===================== global initialize ====================
		//
		//============================================================
		
		
	});
})( jQuery, window, document );