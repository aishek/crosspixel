/** @include "namespace.js" */
Crosspixel.Image = {

	showing: false,
	parentElement: null,

	params: null,

	imgElement: null,
	/** @type {Crosspixel.Utils.EventSender} */
	eventSender: null,

	/**
	 * Устанавливает настройки для гайдов
	 *
	 * @param {Object}
	 *            params параметры гайдов
	 */
	init: function(params) {
		this.params = Crosspixel.Utils.createParams(this.defaults, params);
		this.eventSender = new Crosspixel.Utils.EventSender();
	},

	/**
	 * Создает корневой HTML-элемент и HTML для гайдов и добавляет его в DOM
	 *
	 * @private
	 * @param {Object}
	 *            params параметры создания элемента и гайдов
	 * @return {Element} корневой HTML-элемент
	 */
	createParentElement: function(params) {
		// создаем элемент и ресетим style
		var parentElement = document.createElement("div");

		var parentElementStyle = {
			position : 'absolute',
			left : '0',
			top : '0',

			width : '100%',
			height : params.height + 'px',

			opacity: 1,
			'z-index' : params['z-index']
		};

		parentElement.setAttribute("style", Crosspixel.Utils.createStyleValue(parentElementStyle));

		// создаём HTML гайдов
		parentElement.appendChild(this.createImageDOM(params));

		// добавляем элемент в DOM
		Crosspixel.Utils.getDocumentBodyElement().appendChild(parentElement);

		return parentElement;
	},

	/**
	 * Создает HTML-строку для отображения гайдов
	 *
	 * @private
	 * @param {Array}
	 *            items массив настроек для создания гайдов
	 * @return {String} HTML-строка для отображения гайдов
	 */
	createImageDOM: function(params) {
		var imageStyle = {
			width : 'auto',
			height : 'auto',

			opacity : Crosspixel.OpacityChanger.params.opacity
		};
		var imageContainerStyle = {
			'padding-top' : params.marginTop + 'px',

			width : 'auto',
			height : 'auto'
		};

		if (params.centered) {
			imageContainerStyle['text-align'] = 'center';
			imageStyle.margin = '0 auto';
		} else {
			imageContainerStyle['padding-left'] = params.marginLeft, imageContainerStyle['padding-right'] = params.marginRight;
		};

		var imageDOMParent = document.createElement('div');
		imageDOMParent.setAttribute("style", Crosspixel.Utils.createStyleValue(imageContainerStyle));

		this.imgElement = document.createElement('img');
		this.imgElement.setAttribute('src', params.src);
		this.imgElement.setAttribute('width', params.width);
		this.imgElement.setAttribute('height', params.height);
		this.imgElement.setAttribute('style', Crosspixel.Utils.createStyleValue(imageStyle));

		imageDOMParent.appendChild(this.imgElement);

		return imageDOMParent;
	},

	opacityHandler: function () {
		Crosspixel.OpacityChanger.changeElementOpacity(Crosspixel.Image.imgElement);
	},

	/**
	 * Скрывает-показывает гайды
	 */
	toggleVisibility: function() {
		this.showing = !this.showing;
		this.eventSender.occurEvent('visibilityChanged', this.showing);

		if (this.showing && this.parentElement == null) {
			this.parentElement = this.createParentElement(this.params);
		}

		if (this.parentElement)
			this.parentElement.style.display = (this.showing ? 'block' : 'none');
	}
};