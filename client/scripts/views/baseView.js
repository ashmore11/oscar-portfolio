const BaseView = {

  $el : null,

};

BaseView.bindEvent = function(el, type, func) {

  el.on(type, func);

};

BaseView.disposeEvent = function(el, type) {

  el.off(type);

};

export default BaseView;