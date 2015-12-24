import _  from 'underscore';
import $  from 'jquery';
import TM from 'gsap';

const Globals = {
  _     : _,
  $     : $,
  TM    : TM,
  delay : function(func, time) { setTimeout(func, time); },
};

export default Globals;