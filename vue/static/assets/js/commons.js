/*默认值*/
Object.extend = function (destination, source) {
  if (!destination) return source;
  for (var property in source) {
      if (!destination[property]) {
          destination[property] = source[property];
      }
  }
  return destination;
};


(function($){
   //触摸屏事件
   $.fn.touches = function (options) {
      var setting = {
          init: null,//初始化
          touchstart: null,  //按下
          touchmove: null, //滑动
          touchend: null //抬起
      };
      options = Object.extend(options, setting);
      var $this = this, touchesDiv = $this[0];
      if (!$this[0]) return;
      touchesDiv.addEventListener('touchstart', function (ev) {
          options.touchstart && options.touchstart.call($this, ev);
          function fnMove(ev) {
              options.touchmove && options.touchmove.call($this, ev);
          };

          function fnEnd(ev) {
              options.touchend && options.touchend.call($this, ev);
              document.removeEventListener('touchmove', fnMove, false);
              document.removeEventListener('touchend', fnEnd, false);
          };
          document.addEventListener('touchmove', fnMove, false);
          document.addEventListener('touchend', fnEnd, false);
          return false;
      }, false)
      options.init && options.init.call($this);
  }
})(jQuery);

$(function(){
    $('[data-action=touch]').each(function(index,current){
          (function($o){
             $o.touches({
                touchstart:function(ev){
                    this.addClass('press');
                },
                touchend:function(ev){
                    this.removeClass('press');
                }
             })
          })($(current));
    })
})
