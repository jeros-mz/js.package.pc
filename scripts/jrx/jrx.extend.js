;
/*
 * @method : jquery.init
 */
(function( $, window, document){
	'use strict';
	
	
	jrx.define('g', function(fn){
		$(function(){
			if($.isFunction(fn)){
				fn();
			}
		});
	});
	
	jrx.define('p', function(fn){
		$(function(){
			if($.isFunction(fn)){
				fn();
			}
		});
	});
	
	jrx.define('isString', function(obj){
		return $.type(obj) === 'string';
	});
	
	jrx.define('isNumber', function(obj){
		return $.type(obj) === 'number';
	});
	
	jrx.define('isBoolean', function(obj){
		return $.type(obj) === 'boolean';
	});
	
	jrx.define('isObject', function(obj){
		return $.type(obj) === 'object';
	});
	
	jrx.define('isEmail', function(obj){
		return $.regexp('email').test(obj);
	});
	
	jrx.define('isUrl', function(obj){
		return $.regexp('url').test(obj);
	});
	
	/*
	 * @define : validate
	 * @desc : init, extend validate
	 */
	jrx.define('validate.init', function(){
		/*
        * @name : set jquery.validate extend
        * @depends : {plugin} jquery.validate
        */
       	if($.type($.fn.validate) === 'function'){
   			   			
   			$.extend($.validator.messages, {
                required: jrx.language.validate.required,
                remote: jrx.language.validate.remote,
                email: jrx.language.validate.email,
                url: jrx.language.validate.url,
                date: jrx.language.validate.date,
                dateISO: jrx.language.validate.dateISO,
                number: jrx.language.validate.number,
                digits: jrx.language.validate.digits,
                creditcard: jrx.language.validate.creditcard,
                equalTo: jrx.language.validate.equalTo,
                length: $.validator.format(jrx.language.validate.length),
                maxlength: $.validator.format(jrx.language.validate.maxlength),
                minlength: $.validator.format(jrx.language.validate.minlength),
                rangelength: $.validator.format(jrx.language.validate.rangelength),
                range: $.validator.format(jrx.language.validate.range),
                max: $.validator.format(jrx.language.validate.max),
                min: $.validator.format(jrx.language.validate.min),
                engnum : $.validator.format(jrx.language.validate.engnum),
                count: $.validator.format(jrx.language.validate.count)
            });            

            $.validator.addMethod('engnum', function(value, element, params){
                return this.optional(element) || jrx.regexp('engnum').test(value);
		    });

            $.validator.addMethod('length', function(value, element, params){
			    return this.optional(element) || value.length == element.getAttribute('length');
		    });
            
            // addMethod : count
    		$.validator.addMethod('count', function(value, element, params){
    			return this.optional(element) || value >= params[0];
    		});
    		
            $.validator.setDefaults({
                ignore: '',
                onkeyup: false,
                onfocusout: false,
                focusInvalid: true,
                showErrors: function (errorMap, errorList) {

                    $.log('showErrors');
                    $.log(errorList);

                    if (errorList.length === 0) return false;

                    var labelWrap = $('<div />').addClass('label-lists'), textLabels = '', textAlert = '';

                    $.each(errorList, function (i, v) {
                        var _$element = $(v.element);
                        if (i != 0) return;
                        textLabels += $('<label />')
						    .attr('for', _$element.attr('id'))
						    .html('<strong>' + getMessage(_$element) + ' : </strong>' + (_$element.data('message') || v.message))
						    .appendTo(labelWrap);
                        if (i == 0) {
                            textAlert += getMessage(_$element) + (_$element.data('message') || v.message);
                        }
                    });

                    function getMessage(_$element) {
                        return _$element.data('title')
						    || $('[for=' + _$element.attr('id') + ']').text()
						    || _$element.parent('label').text()
						    || _$element.attr('placeholder')
						    || _$element.attr('name');
                    };

                    $.stateAlarm(textAlert);
                    return;
                },
                submitHandler: function (form) { form.submit(); }
            });
       	}
	});
	
})( jQuery, window, document );