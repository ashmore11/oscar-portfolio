const BaseView = {

  el : null,

};

BaseView.bindEvent = function(el,type,func) {

  el.on(type, func);

};

export default BaseView;