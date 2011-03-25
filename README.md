# Crosspixel | http://github.com/aishek/crosspixel

CrossPixel — небольшая программа на Javascript (около 15 Кб), которая позволяет накладывать изображение-макет поверх вёрстки. Работает как расширение PixelPerfect для Firefox, только во всех браузерах.


## Как начать пользоваться

1. Скачайте Crosspixel http://github.com/downloads/aishek/crosspixel/crosspixel-1.0.zip и сохраните файл crosspixel/build/crosspixel.js в директорию с вашим HTML-файлом
2. В конец HTML-файла, перед </body> вставьте <script type="text/javascript" src="crosspixel.js"></script>
3. Откройте crosspixel.js и измените путь к файлу изображения макета, его размеры, позицию на странице
4. Используйте контролы на панели в правом верхнем углу страницы для управления изображением

## Сочетания клавиш для быстрого управления изображением

В панели с контролами подписаны сочетания клавиш для быстрого управления изображением.

- Ctrl i — показать/скрыть изображение-макет
- Ctrl u — сделать более прозрачными
- Ctrl o — сделать менее прозрачными

## Настройки Crosspixel

Настройки задаются в виде ключей объекта, который передаётся в функцию init.

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
			 * Центрировать ли изображение относительно ширины рабочей области браузера.
			 * Если
			 * @type Boolean
			 */
			centered: true,

			/**
			 * Отступ от верхнего края рабочей области браузера до изображения в пикселах
			 * @type Number
			 */
			'margin-top': 100,
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


			opacity: 1.0,
			/**
			 * Шаг изменения значения прозрачности для изображения от 0 до 1
			 * @type Number
			 */
			opacityStep: 0.05
		},

		gui: {
			/**
			* Настройки для кнопки показа панели управления
			*/
			toggler: {
				style: {
					position: "absolute",
					right: '10px',
					top: '10px',
					'z-index': 1000
				},

				label: "Настройки"
			},

			/**
			* Настройки для панели управления
			*/
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

## Поддержка проекта и контакты

[Сообщайте о проблемах](https://github.com/aishek/crosspixel/issues)

Для благодарностей [aishek@gmail.com](mailto:aishek@gmail.com) %)