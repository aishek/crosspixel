/** @include "index.js" */

/**
 * Настройки
 */
Crosspixel.init(
	{

		image: {
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
			 * Центрировать ли изображение относительно ширины рабочей области браузера
			 * @type Boolean
			 */
			centered: true,

			/**
			 * Отступ от верхнего края рабочей области браузера до изображения в пикселах
			 * @type Number
			 */
			marginTop: 100,
			/**
			 * Отступ от левого края рабочей области браузера до изображения.
			 * Возможные значения аналогичны значениям CSS-свойства margin-left
			 * @type Number
			 */
			marginLeft: '0px',
			/**
			 * Отступ от правого края рабочей области браузера до изображения.
			 * Возможные значения аналогичны значениям CSS-свойства margin-left
			 * @type Number
			 */
			marginRight: '0px',

			/**
			 * URL файла изображения
			 * @type String
			 */
			src: 'design.png',

			/**
			 * Ширина изображения в пикселах
			 * @type Number
			 */
			width: 300,
			/**
			 * Высота изображения в пикселах
			 * @type Number
			 */
			height: 356
		},

		opacity: {
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


			opacity: 0.25,
			/**
			 * Шаг изменения значения прозрачности для изображения от 0 до 1
			 * @type Number
			 */
			opacityStep: 0.05
		},

		gui: {
			toggler: {
				style: {
					position: "absolute",
					right: '10px',
					top: '10px',
					'z-index': 1000
				},

				label: "Настройки"
			},

			pane: {
				style: {
					position: "absolute",
					right: '10px',
					top: '35px',

					width: 'auto',
					height: 'auto',

					margin: '0',
					padding: '7px 5px',

					background: '#FFF',
					border: '2px solid #CCC',

					'z-index': 1000
				},

				labels: {
					image: 'изображение-макет <span style="color:#555;font-size:80%;margin-left:0.75em">Ctrl i</span>',
					opacity: {
						label: '<span style="margin-left:3.7em">прозрачность</span>',
						less: '<span style="color:#555;font-size:80%;margin:0 0.75em 0 1em">Ctrl u</span> ',
						more: ' <span style="color:#555;font-size:80%;margin-left:0.75em">Ctrl o</span>'
					}
				}
			}
		}

	}
);