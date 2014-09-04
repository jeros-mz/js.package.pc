;
/**
 * @name : jquery.fn.layer
 */
(function( $, window, document){
	
	// layer popup origins
	function LayerBase() {
		this.base = document.createElement('div');

		this.add = function(t) {
			var target = (typeof t == 'object') ? t : document.getElementById(t);
			target.appendChild(this.base);
		};

		this.show = function() {
			this.base.style.display = 'block';
		};

		this.hide = function() {
			this.base.style.display = 'none';
		};

		this.remove = function() {
			this.base.remove();
		};

		this.clear = function(id) {
			// popup allowed to exist only one.
			$('#' + id).remove();
		};
	};

	function LayerPopup(options) {		
		var self = this,
			defaults = {
				id: 'layer',
				html: '<header><h4>test</h4></header><button class="closePopup" type="button">close</button><div><span>this is layer</span></div>',
				attr: {
					style:'background-color:#ddd; position:absolute; left:50%; top:50%; width:200px; height:200px; margin: -100px 0 0 -100px;'
				},
				target: document.body
			},
			config = $.extend(defaults, options);

		LayerBase.call(this);

		setAttr(this.base, config);
		self.clear(config.id);
		self.add(config.target);
				
		$('.closePopup').on('click', function() {
			self.remove();
		});
	};
	
	
	function LayerTooltip(options, $parent) {
		var self = this, $self = $(this),
			defaults = {
				id: 'tooltip',
				html: '<header><h4>test</h4></header><div><span>this is layer</span></div>',
				attr: {
					style:'background-color:#ddd; position:absolute;'
				}
			},
			config = $.extend(defaults, options);
		
		LayerBase.call(this);
		setAttr(this.base, config);
		$(this.base).css({ left: $parent.position().x, top: $parent.position().y });
		self.clear(config.id);
		
		if(config.invisible) self.hide();
	};
	
	function setAttr(target, options) {
		target.setAttribute('id', options.id);
		target.innerHTML = options.html;			
		var keys = Object.keys(options.attr);
		for(var i = 0; i < keys.length; i++) {
			var keyVal = keys[i];
			target.setAttribute(keyVal, options.attr[keyVal]);
		}
	};
		
	$.layerPopup = function (options) {	
		return new LayerPopup(options);
	};
	
	$.fn.layerTooltip = function (options) {	
		var $tooltips = $(this);
		
		$tooltips.each(function() {
			var self = this, $self = $(this),
				tooltip = new LayerTooltip({ invisible: true, html: $self.data('tooltip') }, $self);
				
			tooltip.add(self);
			
			$self
			.on('mouseenter', function(e) {
				tooltip.show();
			})
			.on('mouseleave', function(e) {
				tooltip.hide();
			});
		});
	};
	
})( jQuery, window, document );