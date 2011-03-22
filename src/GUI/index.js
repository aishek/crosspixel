/**
 * @include "../index.js"
 * @include "defaults.js"
 */

Crosspixel.GUI = {

	params: null,

	togglerElement: null,

	paneElement: null,
	paneShowing: true,

	checkboxes: {},

	init: function(params) {
		this.params = Crosspixel.Utils.createParams(this.defaults, params);
	},

	create: function() {
		this.createToggler();
		this.createPane();
	},

	createToggler: function() {
		var self = this;

		self.togglerElement = document.createElement("button");
		self.togglerElement.innerHTML = self.params.toggler.label;

		var styleValue = Crosspixel.Utils.createStyleValue(self.params.toggler.style, {});
		self.togglerElement.setAttribute("style", styleValue);

		// добавляем элемент в DOM
		Crosspixel.Utils.getDocumentBodyElement().appendChild(self.togglerElement);


		self.togglerElement.onclick = function () {
			self.paneShowing = !self.paneShowing;

			self.paneElement.style.display = (self.paneShowing ? 'block' : 'none');
		}
	},

	createPaneCheckboxItemHTML: function (id, label, style) {
		var currentStyle = style || '';

		var html = '<div style="width:auto;' + currentStyle + '">';
		html += '<input type="checkbox" id="' + id + '">';
		html += '<label for="' + id + '">&nbsp;' + label + '</label>';
		html += '</div>';

		return html;
	},

	createPane: function() {
		var self = this;
		self.paneElement = document.createElement("div");

		var currentStyle = self.params.pane.style;
		var styleValue = Crosspixel.Utils.createStyleValue(currentStyle, {});
		self.paneElement.setAttribute("style", styleValue);

		var ids = {}, html = '';

		ids.image = self.generateId() + 'image';
		html += self.createPaneCheckboxItemHTML(ids.image, self.params.pane.labels.image, 'margin:0 0 1em');

		html += '<div style="width:auto;margin:1em 0 0">';
		ids.opacity_down = self.generateId() + 'opacitydown';
		ids.opacity_up = self.generateId() + 'opacityup';
		ids.opacity_value = self.generateId() + 'opacityvalue';
		if ( self.params.pane.labels.opacity )
			html += self.params.pane.labels.opacity.label + '<br>';
		html += self.params.pane.labels.opacity.less;
		html += '<button id="' + ids.opacity_down + '">-</button>&nbsp;';
		html += '<span id="' + ids.opacity_value +'">' + Crosspixel.OpacityChanger.params.opacity.toFixed(2) + '</span>';
		html += '&nbsp;<button id="' + ids.opacity_up + '">+</button>';
		html += self.params.pane.labels.opacity.more;
		html += '</div>';

		self.paneElement.innerHTML = html;

		// добавляем элемент в DOM
		Crosspixel.Utils.getDocumentBodyElement().appendChild(this.paneElement);

		self.checkboxes.image = document.getElementById(ids.image);
		if ( self.checkboxes.image ) {
			self.checkboxes.image.onclick = function () {
				Crosspixel.Image.toggleVisibility();
			};
			Crosspixel.Image.eventSender.addHandler(
				'visibilityChanged',
				function(visible) {
					self.checkboxes.image.checked = visible;
				}
			);
		}

		self.checkboxes.opacity_value = document.getElementById(ids.opacity_value);
		if ( self.checkboxes.opacity_value ) {
			Crosspixel.OpacityChanger.eventSender.addHandler(
				'opacityChanged',
				function(opacity) {
					self.checkboxes.opacity_value.innerHTML = opacity.toFixed(2);
				}
			);
		}

		self.checkboxes.opacity_up = document.getElementById(ids.opacity_up);
		if ( self.checkboxes.opacity_up ) {
			self.checkboxes.opacity_up.onclick = function () {
				Crosspixel.OpacityChanger.stepUpOpacity();
			}
		}

		self.checkboxes.opacity_down = document.getElementById(ids.opacity_down);
		if ( self.checkboxes.opacity_down ) {
			self.checkboxes.opacity_down.onclick = function () {
				Crosspixel.OpacityChanger.stepDownOpacity();
			}
		}
	},

	/**
	 * @private
	 * @return {String} уникальный идентификатор
	 */
	generateId: function() {
		var prefix = '_mdg', result = new Date();
		result = prefix + result.getTime();

		return result;
	}

}