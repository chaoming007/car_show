/*默认值*/
Object.extend = function(destination, source) {
    if (!destination) return source;
    for (var property in source) {
        if (!destination[property]) {
            destination[property] = source[property];
        }
    }
    return destination;
};

var viewportType = {
    fullscreen: 0,
    smallscreen: 1
};

function isIphoneX(){
  return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
}


//屏幕旋转完成事件(横屏:horizontal|竖屏:vertical)
function rotateEnd(fn) {
    var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

    function getWidth() {
        return document.documentElement.clientWidth || document.body.clientWidth;
    }

    function getHeight() {
        return document.documentElement.clientHeight || document.body.clientHeight;
    }
    window.addEventListener(orientationEvent, function() {
        setTimeout(function() { fn && fn(getWidth() > getHeight() ? "horizontal" : "vertical"); }, 300);
    }, false);
    fn(getWidth() > getHeight() ? "horizontal" : "vertical");
};


(function($){
	$.fn.viewport = function(options) {
        var setting = {
            width: 375,
            name: '[name=viewport]',
           typeArr: [
                ['width', 'initial-scale', 'maximum-scale', 'user-scalable','viewport-fit'],
                ['width', 'initial-scale', 'target-densitydpi', 'minimum-scale', 'maximum-scale', 'user-scalable','viewport-fit']
            ],
            currentType: 0 //smallscreen
        }
        options = Object.extend(options, setting);
        var $viewport = this.find(options.name);

        var contentArr = [];
        options.typeArr[options.currentType].forEach(function(current, index) {
            switch (current) {
                case 'width':
                    contentArr.push('width=' + options.width);
                    break;
                case 'initial-scale':
                    var ch = 0
                    if (screen.height < 568) {
                        ch = 50;
                    }
                    contentArr.push('initial-scale=' + screen.width / (options.width + ch));
                    break;
                case 'target-densitydpi':
                    contentArr.push('target-densitydpi=target-densitydpi');
                    break;
                case 'minimum-scale':
                    contentArr.push('minimum-scale=0.5');
                    break;
                case 'maximum-scale':
                    contentArr.push('maximum-scale=1.5');
                    break;
                case 'user-scalable':
                    contentArr.push('user-scalable=no');
                    break;
                case 'viewport-fit':
                if(isIphoneX()){
                  contentArr.push('viewport-fit=cover')}
               		break;
            }
        });
        $viewport.attr('content', contentArr.join(','));
   }
})(jQuery);


$(function() {
    rotateEnd(function() {
        /*分辨率自适应*/
        $(document.head).viewport({ type: viewportType.smallscreen, width: 1080 });
    });
});
