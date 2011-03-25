/** @include "index.js" */

Crosspixel.Image.defaults = {
	/**
	 * Функция вызывается каждый раз при нажатии клавиш в браузере.
	 * @param {Object} params информация о нажатой комбинации клавиш (params.ctrlKey, params.altKey, params.keyCode)
	 * @return {Boolean} true, если нужно показать/скрыть изображение
	 */
	shouldToggleVisibility:
		function (params) {
			// Ctrl i
			var result = !params.occured_in_form && (params.ctrlKey && (params.character == 'i' || params.character == 'I' || params.character == 'ш' || params.character == 'Ш'));
			return result;
		},

	/**
	 * Значения CSS-свойства z-index HTML-контейнера изображения
	 * @type Number
	 */
	'z-index': 255,

	/**
	 * Центрировать ли изображение относительно рабочей области браузера
	 * @type Boolean
	 */
	centered: false,

	/**
	 * Отступ от верхнего края рабочей области браузера до изображения в пикселах
	 * @type Number
	 */
	'margin-top': 0,
	/**
	 * Отступ от левого края рабочей области браузера до изображения.
	 * Возможные значения аналогичны значениям CSS-свойства margin-left
	 * @type Number
	 */
	'margin-left': '0px',
	/**
	 * Отступ от правого края рабочей области браузера до изображения.
	 * Возможные значения аналогичны значениям CSS-свойства margin-left
	 * @type Number
	 */
	'margin-right': '0px',

	/**
	 * URL файла изображения
	 * @type String
	 */
	src: '',

	/**
	 * Ширина изображения в пикселах
	 * @type Number
	 */
	width: 100,
	/**
	 * Высота изображения в пикселах
	 * @type Number
	 */
	height: 100
};