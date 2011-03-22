/** @include "index.js */

Crosspixel.GUI.defaults = {

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

};