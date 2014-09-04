;
/**
 * @name : jquery.fn.sample
 */
(function( $, window, document){
	
	/** 
	 * @name : sample
	 */
	$.fn.sample = function(options) {
		var defaults = {},
			config = $.extend(true, defaults, options);
		
    	return this.each(function (i, v) {});
	};
	

})( jQuery, window, document );