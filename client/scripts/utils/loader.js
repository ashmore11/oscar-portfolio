import Happens from 'happens';

const Loader = function() {

  Happens(this);

  this.$el = $('.loader');

  this.loadProgress = 0;
  this.loadInterval = null;

};

Loader.prototype.start = function() {

  this.$el.css({ width: 0, opacity: 1 });

  this.loadInterval = setInterval( () => {

    let num = (Math.random() * 20) + 5

    this.loadProgress += num;

    TM.to(this.$el, 0.15, { width: this.loadProgress });

  }, 250);

};

Loader.prototype.stop = function() {

  clearInterval(this.loadInterval);
  
  this.loadInterval = null;

  const params = {
    width: '100%',
    ease: Power4.easeOut,
    onComplete: () => {

      TM.to(this.$el, 0.5, { opacity: 0 });

      this.emit('load:complete');

      this.loadProgress = 0;

    }
  };

  TM.to(this.$el, 0.5, params);

};

export default Loader;