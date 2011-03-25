/** @include "index.js" */

Crosspixel.init(
	{

		image: {
			'z-index': 255,

			centered: true,

			'margin-top': '0px',
			'margin-left': '0px',
			'margin-right': '0px',

			src: 'design.png',

			width: 300,
			height: 356
		},

		opacity: {
			opacity: 1,
			opacityStep: 0.05
		},

		gui: {
			toggler: {
				style: {
					position: "absolute",
					right: '10px',
					top: '10px'
				}
			},

			pane: {
				style: {
					position: "absolute",
					right: '10px',
					top: '35px'
				}
			}
		}

	}
);