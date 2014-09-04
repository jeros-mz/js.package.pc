;
/*
 * @method : jquery.util
 */
(function( $, window, document){
	'use strict';
	
	/**
	 * @constructor
	 * @class : JRX > javascript runtime extension.
	 * @type : Class
	 * @method JRX
	 * @param {} $
	 * @param {} window
	 * @param {} document
	 * @return 
	 */
	function JRX ($, window, document) {
		
		/*
	     * @method : _config
	     * @params : object
	     * @depends: config [Object]
	     */
	    var _config = {
	        'useLog': 		{ 'editable': true, 	'value': true },
	        'isLogin': 		{ 'editable': true, 	'value': false },
	        'root': 		{ 'editable': true, 	'value': '/' },
	        'staticPath': 	{ 'editable': true, 	'value': '/' },
	        'loginUrl':  	{ 'editable': true, 	'value': ''},
	        'logoutUrl':  	{ 'editable': true, 	'value': ''}
	    };
	    
	    /**
    	 * @depends: _config (private)
    	 * @type : method 
    	 * @name : config
    	 * @param {object or string} p
    	 * @return 
    	 */
    	this.config = function (p) {
	        
	        if ($.type(p) === 'object') {
	        	set(p);
	        } else if($.type(p) === 'string'){
	        	return get(p);
	        } else {
	        	throw new Error('parameter is only json or string. current type : ' + $.type(v));
	        }
	        
	        /**
        	 * Description
        	 * @method set
        	 * @param {} obj
        	 * @return 
        	 */
        	function set(obj) {
	        	
	        	$.each(obj, function(n){
	        		
	        		if (_config[n] && _config[n].editable) {	
		                if (typeof obj[n] === 'string' && (obj[n] === 'True' || obj[n] === 'False')) {
		                    obj[n] = obj[n] == 'True';
		                }
		                
		                _config[n].value = obj[n];
		                _config[n].editable = false;
		            }	
	        	});
	        }
	        
	        /**
        	 * Description
        	 * @method get
        	 * @param {} n
        	 * @return MemberExpression
        	 */
        	function get(n) {
	        	
	            if(_config[n] === undefined){
	                throw new Error('undefined property name : ' + n);
	            }
	            return _config[n].value; 
	        }
	    };
	    
		/**
		 * Description
		 * @params : object
		 * @method log
		 * @param {} obj
		 * @return ThisExpression
		 */
		this.log = function (obj) {
			var useLog = this.config('useLog') == true && window.console;
	        if (useLog) {
	            if (typeof obj == "object" && console.dir) {
	                console.dir && console.dir(obj);
	            } else {
	                console.log && console.log(obj);
	            }
	        }
	        return this;
		};
	    
		/**
		 * Description
		 * @desc : define namespace.
		 * @method define
		 * @param {} ns
		 * @param {} fn
		 * @return self
		 */
		this.define = function (ns, fn) {
			
			var gns = 'jrx',
				self = this, 
				arrNS = ns.split('.'), i, len;
			
			if(arrNS[0] === gns) arrNS = arrNS.slice(1);
			
			for(i = 0, len = arrNS.length; i < len; i += 1){
				if(!self.hasOwnProperty(arrNS[i])){
					
					self[arrNS[i]] = {};
					
					if (i === (len - 1)){
						self[arrNS[i]] = fn;	
					}
				}
				self = self[arrNS[i]];
			}
			
			return self;
		};
		
		/*
		 * @name : _REG_EXP
		 * @desc : reqular expression literal.
		 */
		var _REG_EXP = {
				tag : /(<([^>]+)>)/ig,
			    trim: /(^[\s　]+)|([\s　]+$)/g,
			    number: /(\d{3})(?=\d)/g,
			    date: /(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi,
			    rgb : /\d+, \d+, \d+/,
			    engnum : /^[A-Za-z0-9+]*$/
			};
		/*
		 * @method : regexp
		 */
		this.regexp = function(s){
			return _REG_EXP[s];
		};
		
		/*
		 * @method : strip
		 * @desc : remove tag
		 */	
		this.strip = function(s) {
			
			if($.trim(s) === '') return s;
			
		    var reg_tag = this.regexp('tag'), r = '';
		    
		    s = s.replace(reg_tag, '');
		    
		    if(this.decodeEntities){
		    	s = this.decodeEntities(s);
		    }
		    r = s.replace(reg_tag, '');
		    
		    return r;
		};
		/*
		 * @method : decodeEntities [function]
		 * @desc : decode html entities.
		 */	
		this.decodeEntities = function(s){
		    var r, t = document.createElement('textarea');
		    t.innerHTML= s;
		    r = t.textContent || t.innerText;
		    t = null;
		    return r;
		};
		
		/*
	     * @name : toHexFromRGB [Function]
	     * @desc : convert RGB to Hex.
	     */
	    this.toHexFromRGB = function (rgb) {
	        var hex = [
				rgb.r.toString(16),
				rgb.g.toString(16),
				rgb.b.toString(16)
			];
	        $.each(hex, function (nr, val) {
	            if (val.length == 1) {
	                hex[nr] = '0' + val;
	            }
	        });
	        return hex.join('');
	    };
	    /*
	     * @method : toRGBFromHex [Function]
	     * @desc : convert Hex to RGB.
	     */
	    this.toRGBFromHex = function (hex) {
	    	
	        var _hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
	        
	        return { r: _hex >> 16, g: (_hex & 0x00FF00) >> 8, b: (_hex & 0x0000FF) };
	    };
	    /*
	     * @method : toRGBFromRGBA [Function]
	     * @desc : get rgb from background.
	     */
	    this.toRGBFromRGBA = function (rgba) {
	        
	        var rgbMatch = this.regexp('rgb'),
				matchRGB = rgba.match(rgbMatch).length && rgba.match(rgbMatch)[0].split(',');
				
	        return { r: parseInt(matchRGB[0].trim(), 10), g: parseInt(matchRGB[1].trim(), 10), b: parseInt(matchRGB[2].trim(), 10) };
	    };
	    /*
	     * @method : stringify [Function]
	     * @desc : parse string
	     */
	    this.stringify = function (obj) {
	        var t = typeof (obj);
	        if (t != "object" || obj === null) {
	            // simple data type
	            if (t == "string") obj = '"' + obj + '"';
	            return String(obj);
	        } else {
	            // recurse array or object
	            var n, v, json = [], arr = (obj && obj.constructor == Array);
	 
	            for (n in obj) {
	                v = obj[n];
	                t = typeof(v);
	                if (obj.hasOwnProperty(n)) {
	                    if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = app.stringify(v);
	                    json.push((arr ? "" : '"' + n + '":') + String(v));
	                }
	            }
	            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	        }
	    };
	    
	    /*
	     * @name : imageLoadResize [Function]
	     * @TODO : 추가 작업 필요 이미지를 다시 로딩하여 사이즈를 읽어들이는 방식이 필요함.
	     * 플러그인 형태로 제작되는게 좋겠다.
	     */
	    // this.imageLoadResize = function (_this, maxSize) {
	        // var $this = $(_this),
				// n_width = $this.prop('naturalWidth'),
				// n_height = $this.prop('naturalHeight');
// 	
	        // maxSize = maxSize ? maxSize : 192;
	        // //108*192
	        // //192*108
// 	
	        // if (n_width < n_height) {
	            // if (n_height > maxSize) {
	                // $this.css('height', maxSize);
	            // }
	        // } else {
	            // if (n_width > maxSize) {
	                // $this.css('width', maxSize);
	            // }
	        // }
	    // };

	};

	//======================== new JRX ===========================
	
	var jrx = new JRX($, window, document);;
	
	//============================================================
	
	/*
	 * @define : cookie
	 */
	jrx.define('cookie', new function(){
		/*
		 * @method : get
		 */
		this.get = function (name) {
			var prefix = name + "=",
				startIndex = document.cookie.indexOf(prefix),
				endIndex = document.cookie.indexOf(";", startIndex + prefix.length);
	
			if (startIndex == -1) return null;
	
			if (endIndex == -1) endIndex = document.cookie.length;
	
			return (unescape(document.cookie.substring(startIndex + prefix.length, endIndex)));
		};
	
		/*
		* @method : set
		* @param : cookie name
		* @param : value
		* @param : expireDays
		*/
		this.set = function (name, value, expireDays) {
			if(value === undefined) throw new Error('should be add second parameter, value');
			if(!expireDays) {
				document.cookie = name + "=" + escape(value) + "; path=/; ";
			} else {
				var today = new Date();
				today.setDate(today.getDate() + expireDays);
				document.cookie = name + "=" + escape(value) + "; path=/; expires=" + today.toGMTString() + ";";
			}
		};
	
		/*
		 * @method : remove
		 * @param name
		 */
		this.remove = function (name) {
			this.set(name, "", -1);
		};
	
		/*
		 * @method : clear
		 */
		this.clear = function () {
			var cookies = document.cookie.split(';');
			for (cookie in cookies) {
				this.remove(cookies[cookie].split('=')[0].trim());
			}
		};
	});
	
	/*
	 * @define : storage
	 * @desc : local & session Storage wrapper
	 */
	jrx.define('storage', (new function (){
		var storage = _getStorage('local');
	
		function _getStorage(type) {
			if (typeof(Storage) !== 'undefined') {
				//console.log('this browser support storage');
				if(type === 'local') {
					return window['localStorage'];
				} else if (type === 'session') {
					return window['sessionStorage'];
				}
			} else {			
				//console.log('this browser does not support storage');
				//console.log('it will be saved as windows object');
				// use this instance on unsupported localstorage brower			
				window[type] = {
					_data       : {},
					setItem     : function(id, val) { return this._data[id] = String(val); },
					getItem     : function(id) { return this._data.hasOwnProperty(id) ? this._data[id] : this._data; },
					removeItem  : function(id) { return delete this._data[id]; },
					clear       : function() { return this._data = {}; }
				};
				return window[type];
			}	
		}
	
		return {
			/**
			* get Storage value by name
			* @param name
			*/
			get : function (name) {
				if (name) {
					return storage.getItem(name);
				} else {
					return storage;
				}
			},
	
			/**
			* set Storage data
			* @param name
			* @param value
			*/
			set : function (name, value) {
				storage.setItem(name, value);
			},
	
			/**
			* remove data by name
			* @param name
			*/
			remove : function (name) {
				storage.removeItem(name);
			},
	
			/**
			* clear all Storage data
			*/
			clear : function () {
				storage.clear();
			}
		};
	}));
	
	
	/*
	 * @define : loading
	 * @desc : loading layer
	 * @css : .loading{position:fixed; top:0; left:0; width:100%; height:100%; z-index:5000; background:url('./images/loading_medium.gif') no-repeat 50% 50%}
	 */
	jrx.define('loading', new function(){
		var id = 'loading',
	    	cls = 'loading',
	        isLoading = false, isTimeout = false, delay = 800;
	    
	    /*
		 * @method : show
		 */
	    this.show = function () {
	        
	        if(!isLoading){
	            jrx.mask && jrx.mask.show();
	            
	            var msk = document.createElement('div');
	            msk.setAttribute('id', id);
	            msk.setAttribute('class', id);
	            
	            if (!document.getElementById(id)) document.body.appendChild(msk);
	            isLoading= true;
	            isTimeout = false;
	            
	            setTimeout(function () {
	                
	                if(isTimeout) {
	                    jrx.loading.hide();
	                } else {
	                    isTimeout = true;
	                }
	            }, delay);
	        }
	    };
	    
	    /*
		 * @method : hide
		 */
	    this.hide = function () {
	        
	        if(isLoading) {
	            if(isTimeout) {
	                jrx.mask && jrx.mask.hide();
	                var loading = document.getElementById(id);
	                if(loading) document.body.removeChild(loading);
	                isLoading= false;
	            } else {
	                isTimeout = true;
	            }
	        }
	    };
	});
	
	/*
	 * @define : mask
	 * @desc : mask layer
	 * @css : .mask{ position:absolute; top:0; left:0; width:100%; height:100%; background-color:#fff; opacity: 0.4; filter:alpha(opacity=40); z-index: 4000;}
	 */
	jrx.define('mask', new function(){
		var id = 'mask',
	    	cls = 'mask';
	    
	    /*
		 * @method : show
		 */
	    this.show = function () {
	        
	        var msk = document.createElement('div');
	        msk.setAttribute('id', id);
	        msk.setAttribute('class', cls);
	        
	        if (!document.getElementById(id)) document.body.appendChild(msk);
	        
	        return msk;
	    };
	    /*
		 * @method : hide
		 */
	    this.hide = function () {
	        var msk = document.getElementById(id);
	        if(msk) document.body.removeChild(msk);
	    };
	});
	
	/*
	* @method : stateAlarm
	* @desc : 상태 알림.
	* @params : text or object
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
	jrx.define('stateAlarm', function(alarm, sec){
		
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

			// markup version 1.
//				utils.log($target.find('div'));

			$target.find('div').html(alarm);
			setPosition();
			return false;

			// markup version 2.
	        if(type == 'string'){
	        	$target.find('> div > p').html(alarm);
	        } else {
	        	var title = alarm.title, contents = alarm.contents || '', text = '<strong>' + title + '</strong> ' + (contents && '<br />'+ contents);
	        	$target.find('> div > p').html(text);
	        }
	        setPosition();
	    };

	    function create() {

			// markup version 1.
	        var $html = $('<div id="stateAlarm" class="state_alram"><div style="padding:30px;"></div></div>');

	        $(document.body).append($html);
	        $target = $html;
	        return $target;
	    };
	});
	
	
	
	/*
	 * @define : validate
	 * @desc : init, extend validate
	 */
	jrx.define('validate.extend', function(){
		/*
        * @name : set jquery.validate extend
        * @depends : {plugin} jquery.validate
        */
       	if($.type($.fn.validate) === 'function'){
   		
            $.extend($.validator.messages, {
                required: "는(은) 필수 입력 항목입니다.",
                remote: "이 항목을 수정해주세요.",
                email: " 올바른 이메일형식으로 입력해주세요.",
                url: "http://을 포함한 올바른 URL 을 입력해주세요.",
                date: "올바른 날짜를 입력해주세요.",
                dateISO: "ISO 표준에 맞는 날짜형식으로 입력해주세요.",
                number: "올바른 값을 입력해주세요.",
                digits: "숫자만 입력이 가능합니다.",
                creditcard: "올바른 카드번호를 입력해주세요.",
                equalTo: "입력하신 내용이 일치하지 않습니다.",
                length: $.validator.format("{0} 자리로 입력해주세요."),
                maxlength: $.validator.format("{0}자 이하로 입력해주세요."),
                minlength: $.validator.format("{0}자 이상 입력해주세요."),
                rangelength: $.validator.format("{0}자 이상 {1}자 이하로 입력해주세요."),
                range: $.validator.format("{0} ~ {1} 사이의 값만 입력해주세요."),
                max: $.validator.format("{0} 이하의 값을 입력해주세요."),
                min: $.validator.format("{0} 이상의 값을 입력해주세요."),
                engnum : $.validator.format("영문 또는 숫자만 입력해주세요.."),
                count: $.validator.format("{0} 개 이상 등록되어야 합니다.")
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
       	}
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
	
	
	
	//======================== mix $.utils =======================
	var utils = $ || {};
	utils.jrx = jrx;
	
	$.each(jrx, function(v, i){
		
		if( utils[v] === undefined ){
			utils[v] = jrx[v];
		} else {
			jrx.log('ooora');
		}
	});
	//============================================================
	
	//======================== poly fill =========================
	
	/*
	* @name : trim [String]
	* @desc : 공백 제거
	* @param : 
	*/
	if (typeof String.prototype.trim != 'function') {
	    String.prototype.trim = function () {
	        return this.replace(_REGEXP.trim, "");
	    };
	};
	
	/*
	* @name : getByteLength [String]
	* @desc : 문자열의 Byte 값 반환.
	* @param : 
	*/
	if (typeof String.prototype.getByteLength != 'function') {
	    String.prototype.getByteLength = function () {
	        var _this = this, b, i, c;
	        for (b = i = 0; c = _this.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? c : 1);
	        return b;
	    };
	};
	
	/*
	* @name : filter [Array]
	* @desc : 배열을 필터하여 새로운 배열 반환
	* @param : [filter condition function.]
	*/
	if (typeof Array.prototype.filter != 'function') {
	    Array.prototype.filter = function (_function) {
	        var newArray = [],
	            _this = this;
	
	        for (var i = 0, len = _this.length; i < len; i++) {
	            if (_function(_this[i], i, _this)) {
	                newArray.push(_this[i]);
	            }
	        }
	        return newArray;
	    };
	};
	/*
	* @name : forEach [Array]
	* @desc : 배열 순환하며 조건 처리.
	* @param : 
	*/
	if (typeof Array.prototype.forEach != 'function') {
	    Array.prototype.forEach = function (_function) {
	        var _this = this;
	        
	        for (var i = 0, len = _this.length; i < len; i++) {
	            _function.call(_this, _this[i], i, _this);
	        }
	    };
	};
	/*
	* @name : contains [Array]
	* @desc : 배열에 존재하는 원소인지 확인.
	* @param : 
	*/
	if (typeof Array.prototype.contains != 'function') {
	    Array.prototype.contains = function (compareValue) {
	        var _this = this;
	        for (var i = 0, len = _this.length; i < len; i++) {
	            if (_this[i] === compareValue) {
	                return true;
	                break;
	            }
	        }
	        return false;
	    };
	};

	//============================================================

})( jQuery, window, document );