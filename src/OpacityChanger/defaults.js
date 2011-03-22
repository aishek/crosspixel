/** @include "index.js" */

Crosspixel.OpacityChanger.defaults = {
	/**
	 * Функция вызывается каждый раз при нажатии клавиш в браузере.
	 * @param {Object} params информация о нажатой комбинации клавиш (params.ctrlKey, params.altKey, params.keyCode)
	 * @return {Boolean} true, если нужно сделать изображение менее прозрачным на opacityStep процентов
	 */
	shouldStepUpOpacity:
		function (params) {
			// Ctrl o
			var result = !params.occured_in_form && (params.ctrlKey && (params.character == 'o' || params.character == 'O' || params.character == 'щ' || params.character == 'Щ'));
			return result;
		},
	/**
	 * Функция вызывается каждый раз при нажатии клавиш в браузере.
	 * @param {Object} params информация о нажатой комбинации клавиш (params.ctrlKey, params.altKey, params.keyCode)
	 * @return {Boolean} true, если нужно сделать изображение более прозрачным на opacityStep процентов
	 */
	shouldStepDownOpacity:
		function (params) {
			// Ctrl u
			var result = !params.occured_in_form && (params.ctrlKey && (params.character == 'u' || params.character == 'U' || params.character == 'г' || params.character == 'Г'));
			return result;
		},

	/**
	 * Начальное значение прозрачности изображения от 0 до 1 (0 - абсолютно прозрачное, 1 - абсолютно непрозрачное)
	 * @type Number
	 */
	opacity: 0.25,
	/**
	 * Шаг изменения значения прозрачности для изображения от 0 до 1
	 * @type Number
	 */
	opacityStep: 0.05
};