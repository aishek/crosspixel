(function(w, d, path, opacity_step, background_color){
  function serialize_properties(properties) {
    var serialized = '',
        key;

    for(key in properties) {
      serialized += key + ': ' + properties[key] + ';';
    }
    if (properties['opacity'] === 0) serialized += 'display: none;'

    return serialized;
  };

  var html_node = d.getElementsByTagName('html');
  if ( html_node.length > 0 ) html_node = html_node[0];

  var opacity = opacity_step;

  var style_properties = {
    'position': 'absolute',
    'left': '0',
    'right': '0',
    'top': '0',
    'bottom': '0',
    'z-index': '16777271',

    '-moz-transition': 'opacity 0.1s linear',
    '-o-transition': 'opacity 0.1s linear',
    '-webkit-transition': 'opacity 0.1s linear',
    'transition': 'opacity 0.1s linear',

    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-o-user-select': 'none',
    'user-select': 'none',

    'background-color': background_color,

    // feel free to change styles below,
    // it using only for "failed to load" message
    'padding': '36px 42px',

    'font-family': '"Helvetica Neue", Helvetica, Arial, Tahoma, sans-serif',
    'font-size': '18px',
    'line-height': '1.45',
    'text-align': 'left',
    'color': '#fff',
    'text-shadow': '1px 1px 0 #000',
    '-webkit-font-smoothing': 'antialiased'
  };

  var image_node = d.createElement('div');
  image_node.setAttribute('class', 'crosspixel');
  image_node.setAttribute('style', serialize_properties(style_properties));
  image_node.innerHTML = 'Loading design image...'

  var parent = d.getElementsByTagName('body')[0],
      image_node_appended = false;

  function render_fail() {
    if ( image_node_appended === false ) {
      parent.appendChild(image_node);
      image_node_appended = true;
    }

    style_properties['color'] = '#ff6';
    style_properties['text-shadow'] = '1px 1px 0 #000';

    image_node.innerHTML = 'Failed to load ' + path;

    // try to ask to drag and drop image
    if (!!FileReader) {
      image_node.innerHTML = image_node.innerHTML + '.<br>Drag and drop image here.';

      function prevent(e) {
        e.stopPropagation();
        e.preventDefault();
      }

      image_node.addEventListener("dragenter", prevent, false);
      image_node.addEventListener("dragover", prevent, false);

      function drop(e) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        if (dt) {
          var files = dt.files;
          if (files.length > 0) {
            var file = files[0];
            if (file.type.match(/image.*/)) {
              console.log(file);

              var reader = new FileReader();

              reader.onload = function (e) {
                var i = new Image();
                i.src = e.target.result;

                render_image(e.target.result, i.width, i.height);
              };

              reader.readAsDataURL(file);
            }
          }
        }
      }

      image_node.addEventListener("drop", drop, false);
    }

    image_node.setAttribute('style', serialize_properties(style_properties));

    if (console && console.warn) {
      console.warn('Crosspixel: failed to load ' + path);
    }
  };

  function cycle_opacity(sign) {
    opacity = opacity + sign * opacity_step;
    if ( opacity > 1 ) opacity = 0;
    if ( opacity < 0 ) opacity = 1;

    style_properties['opacity'] = opacity;
    if (!!image_node.style && !!image_node.style.opacity) {
      image_node.style.opacity = opacity;
    }
    else {
      image_node.setAttribute('style', serialize_properties(style_properties));
    }
  }

  // renders image as background for image_node,
  // enables cycling opacity on mouse clicks
  //
  // width and height used for console output,
  // to help developer change window size to specified size
  function render_image(path, width, height) {
    if ( image_node_appended === false ) {
      parent.appendChild(image_node);
      image_node_appended = true;
    }

    style_properties['padding'] = '0';
    style_properties['opacity'] = opacity;

    if ( height ) style_properties['min-height'] = height + 'px';

    style_properties['background-position'] = 'center top';
    style_properties['background-repeat'] = 'no-repeat';
    style_properties['background-image'] = 'url("' + path + '")';

    image_node.innerHTML = '';
    image_node.setAttribute('title', 'To change opacity left click and right click');
    image_node.setAttribute('style', serialize_properties(style_properties));

    var handler = function(event) {
      if (event.preventDefault) event.preventDefault();
      if (event.stopPropagation) event.stopPropagation();

      var sign = (event.which == 3 ? +1 : -1)
      cycle_opacity(sign);

      return true;
    };
    image_node.onmousedown = handler;

    if ( html_node ) {
      if (html_node.addEventListener) {
        html_node.addEventListener('mousedown', handler, false);
      } else {
        html_node.attachEvent('onmousedown', handler);
      }
    }

    image_node.oncontextmenu = function() {
      return false;
    };

    if (console && console.info) {
      console.info('Crosspixel: loaded ' + width + 'x' + height + ' image');
    }
  };

  // try to load default image
  var image = new Image();
  image.onload = function() {
    render_image(path, image.width, image.height);
  };
  image.onerror = render_fail;
  image.src = path;

})(window, document, 'design.png', 0.25, 'rgba(0, 0, 255, 0.35)');
