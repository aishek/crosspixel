/**
 * @include "namespace.js"
 * @include "Utils/index.js"
 * @include "Resizer/index.js"
 * @include "OpacityChanger/index.js"
 * @include "GUI/index.js"
 */

Crosspixel.keyDownEventProvider = null;
Crosspixel.resizeEventProvider = null;

/**
 * Возвращает обертку для отлова события изменения размера окна браузера
 * @private
 * @return {Crosspixel.Utils.EventProvider} для события изменения размера окна браузера
 */
Crosspixel.getResizeEventProvider = function () {
	if ( this.resizeEventProvider == null ) {
		this.resizeEventProvider =
			new Crosspixel.Utils.EventProvider(
				'resize',
				function (event) {
					return {
						event: event
					};
				},
				'window'
			);
	};

	return this.resizeEventProvider;
};

/**
 * Возвращает обертку для отлова события нажатия клавиш
 * @private
 * @return {Crosspixel.Utils.EventProvider} для события нажатия клавиш
 */
Crosspixel.getKeyDownEventProvider = function () {
	if ( this.keyDownEventProvider == null ) {
		this.keyDownEventProvider =
			new Crosspixel.Utils.EventProvider(
				'keydown',
				function (event) {
					var keyboardEvent = ( event || window.event );
					var keyCode = (keyboardEvent.keyCode ? keyboardEvent.keyCode : (keyboardEvent.which ? keyboardEvent.which : keyboardEvent.keyChar));

					var character = String.fromCharCode(keyCode).toLowerCase();
					var shift_nums = {
						"`":"~",
						"1":"!",
						"2":"@",
						"3":"#",
						"4":"$",
						"5":"%",
						"6":"^",
						"7":"&",
						"8":"*",
						"9":"(",
						"0":")",
						"-":"_",
						"=":"+",
						";":":",
						"'":"\"",
						",":"<",
						".":">",
						"/":"?",
						"\\":"|"
					}
					if ( keyboardEvent.shiftKey && shift_nums[character] )
						character = shift_nums[character];

				var element = ( keyboardEvent.target ? keyboardEvent.target : keyboardEvent.srcElement );
				if ( element && element.nodeType == 3 )
					element = element.parentNode;
				var occured_in_form = ( element && (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA'));

					return {
						occured_in_form: occured_in_form,
						character: character,
						keyCode: keyCode,

						altKey: keyboardEvent.altKey,
						shiftKey: keyboardEvent.shiftKey,
						ctrlKey: keyboardEvent.ctrlKey,

						event: keyboardEvent
					};
				}
			);
	};

	return this.keyDownEventProvider;
};

/**
 * Устанавливает настройки модульной сетки и ставит обработчики событий для показа сетки
 * @param {Object} params параметры инициализации
 */
Crosspixel.init = function (params) {
	var self = this;
	var store = Crosspixel.Utils.CookieStore;

	this.OpacityChanger.init(params.opacity);
	var opacityUpChanger =
		new Crosspixel.Utils.StateChanger(
			this.getKeyDownEventProvider(),
			this.OpacityChanger.params.shouldStepUpOpacity,
			function () {
				self.OpacityChanger.stepUpOpacity();
			}
		);
	var opacityDownChanger =
		new Crosspixel.Utils.StateChanger(
			this.getKeyDownEventProvider(),
			this.OpacityChanger.params.shouldStepDownOpacity,
			function () {
				self.OpacityChanger.stepDownOpacity();
			}
		);
	this.OpacityChanger.eventSender.addHandler(
		'opacityChanged',
		function(opacity) {
			store.setValue('o', opacity);
		}
	);

	// изображение
	this.Image.init(params.image);
	this.OpacityChanger.eventSender.addHandler('opacityChanged', this.Image.opacityHandler);

	var imageStateChanger =
		new Crosspixel.Utils.StateChanger(
			this.getKeyDownEventProvider(),
			this.Image.params.shouldToggleVisibility,
			function () {
				self.Image.toggleVisibility();
			}
		);
	this.Image.eventSender.addHandler(
		'visibilityChanged',
		function (showing) {
			self.Resizer.toggleSize();

			var i_value = (showing ? 'true' : 'false');
			store.setValue('i', i_value);
		}
	);

	self.Resizer.init(this.Image.params);

	self.GUI.init(params.gui);
	self.GUI.create();

	// восстанавливаем состояния из кук
	// по-умолчанию: всё скрыто
	if ( store.getValue('i') == 'true' )
		self.Image.toggleVisibility();

	var image_opacity = parseFloat(store.getValue('o'));
	if ( !isNaN(image_opacity) ) {
		self.OpacityChanger.setOpacity( image_opacity );
	}
};