/**
 * @include "namespace.js"
 * @include "CookieStore.js"
 * @include "StateChanger.js"
 * @include "EventProvider.js"
 * @include "EventSender.js"
 */
Crosspixel.Utils = {

	documentBodyElement: null,

	/**
	 * @private
	 * @return {Element} body
	 */
	getDocumentBodyElement: function () {
		if ( this.documentBodyElement == null )
			this.documentBodyElement = document.getElementsByTagName("body")[0];

		return this.documentBodyElement;
	},

	/**
	 * Сливает два хэша
	 * @private
	 * @param {Object} defaults значения по-умолчанию
	 * @param {Object} params переопределенные значения
	 * @return {Object} объект из ключей и значений по-умолчанию и новых значений
	 */
	createParams: function (defaults, params) {
		result = defaults;
		Crosspixel.Utils.mergeParams(defaults || {}, params);

		return result;
	},

	/**
	 * Сливает два объекта
	 * @private
	 * @param {Object} result
	 * @param {Object} params
	 */
	mergeParams: function(result, params) {
		for ( var key in params ) {
			if ( params.hasOwnProperty(key) ) {
				if ( result[key] && Crosspixel.Utils.isObject(result[key]) ) {
					Crosspixel.Utils.mergeParams(result[key], params[key]);
				}
				else {
					result[key] = params[key];
				}
			}
		}
	},

	isObject: function(o) {
  		return Object.prototype.toString.call(o) === '[object Object]';
	},

	defaultStyleValueParams: {
		display: 'block',
		width: '100%',
		height: '100%',
		opacity: 1.0,
		background: 'transparent',
		'float': 'none',
		visibility: 'visible',
		border: '0'
	},

	/**
	 * Возвращает CSS-строку для свойства style
	 * @private
	 * @param {Object} params параметры для строки
	 * @return {String} CSS-строка для свойства style
	 */
	createStyleValue: function (params, defaultParams) {
		var fromParams = defaultParams || Crosspixel.Utils.defaultStyleValueParams;
		var styleParams = Crosspixel.Utils.createParams(fromParams, params);

		var result = '';
		for (var key in styleParams) {
			if ( styleParams[key] || styleParams[key] === 0 )
				result += key + ':' + styleParams[key] + ';';

			if ( styleParams[key] == 'opacity')
				result += '-khtml-opacity:' + styleParams[key] + ';-moz-opacity:' + styleParams[key] + ';filter:progid:DXImageTransform.Microsoft.Alpha(opacity=' + (styleParams[key] * 100) + ');';
		}

		return result;
	}

};