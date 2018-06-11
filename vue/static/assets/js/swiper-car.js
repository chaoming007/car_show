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


var classNames = ['Webkit', 'ms', 'Moz', 'O', ''];
(function($){
 $.fn.addClass3 = function (name, value) {
      var o = this[0];
      var cName = name.charAt(0).toUpperCase() + name.substring(1);
      for (var i = 0; i < classNames.length; i++) {
          o.style[classNames[i] + cName] = value;
      }
      return $(o);
   }

 $.fn.swiperCar = function(options){
   var setting={
       click:null,
       slideNext:null,
       slidePrev:null,
       slideTo:null,
       getSlideIndex:null,
       slideChange:null,
       count:7,
       slideIdx:0,
       callBackIndex:null
   }
   options = Object.extend(options,setting);
   var _this = this;
   _this.istouch = false;
   _this.swiperCar = new Swiper(_this,{
    slidesPerView:5,
    loop:true,
    initialSlide:options.slideIdx,
    centeredSlides:true,
    loopAdditionalSlides:2,
    loopedSlides:options.count,
    onClick:function(swiper,event){
        options.click && options.click.call(_this,swiper,event);
    },
    onTouchEnd:function(swiper){
       _this.istouch = true;
    },
    onSlideChangeStart:function(swiper){
      var $current = $(swiper.slides[swiper.activeIndex]);

      $current.find('.content').addClass3('transform','scale(1.5,1.5)').css("left","0px");
      var $next = $current.next();
      if($next[0]){
        $next.find('.content').addClass3('transform','scale(1.3,1.3)').css("left","17px");
        var $nnt = $next.next();
        if($nnt){
          $nnt.find('.content').addClass3('transform','scale(1,1)').css("left","0px");
          var $nnnt = $next.next().next();
          if($nnnt){
            $nnnt.find('.content').addClass3('transform','scale(1,1)').css("left","0px");
          }
        }
      }

      var $prev = $current.prev();
        if($prev[0]){
          $prev.find('.content').addClass3('transform','scale(1.3,1.3)').css("left","-10px");
          var $ppr = $prev.prev();
          if($ppr[0]){
            $ppr.find('.content').addClass3('transform','scale(1,1)').css("left","0px");
            var $pppr = $prev.prev().prev();
            if($pppr[0]){
              $pppr.find('.content').addClass3('transform','scale(1,1)').css("left","0px");
            }

          }

          options.slideChange && options.slideChange.call(swiper,$current.data('swiper-slide-index'),_this)
          _this.istouch = false;
      }

      // var $current = $(swiper.slides[swiper.activeIndex]);
      // console.log($current.data("index"),"=============")
      // options.slideChange && options.slideChange.call(swiper,$current.data('swiper-slide-index'))
    },
    
    onInit:function(swiper){

        for(var i=0;i<swiper.slides.length;i++){
          $(swiper.slides[i]).attr('data-index',i);
        }

        for(var i=0;i<swiper.slides.length;i++){
          if(swiper.slides[i].className.indexOf('swiper-slide-active')>0){
             
            options.callBackIndex && options.callBackIndex.call(swiper.slides[i])
          }
        }
    }
  })


  //根据index切换
  _this.slideTo = function(index){
      _this.swiperCar.slideTo(index);
  }


  _this.slideNext = function(){
     _this.swiperCar.slideNext();
  }

  _this.slidePrev = function(){
    _this.swiperCar.slideNext();
 }

 _this.getSlideIndex = function(){
   return _this.swiperCar.activeIndex % options.count;
 }
   return _this;
 
 
 
    return _this
  }
})(jQuery);

