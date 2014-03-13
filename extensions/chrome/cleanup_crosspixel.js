(function(){
  var elements = document.getElementsByClassName('crosspixel');

  var element, parent;
  for(var q = 0, l = elements.length; q < l; q++) {
    element = elements[q];

    if (parent = element.parentNode) {
      parent.removeChild(element);
    }
  }
})();
