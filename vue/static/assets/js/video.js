
function Videofun(video,vDat,autoplay,fn,controlFn,getCurrentTime){
    this.mainContainer=document.querySelector("#"+video)
    this.oV=vDat
    this.timer=null
    this.dotDiv=[]
    this.videoArr=[]
    this.callBack=fn
    this.autoplay=autoplay
    this.isLoading=false
    this.loadTimer=null
    this.controlFn=controlFn            //控制回调
    this.getCurrentTime=getCurrentTime  //获得实时时间
    this.videoTimer=null                //视频延时播放
   
}
Videofun.prototype.setVideoArr=function(){
    let _this=this
    if(this.oV && typeof this.oV=="object"){
        _this.oV.forEach((item,index)=>{
            
            let videoObj=document.querySelector("#"+item.id);
            var source  = document.createElement('source');
            source.type = 'video/mp4';
            source.src = videoObj.getAttribute('src');
            videoObj.appendChild(source);
            videoObj.preload = "meta";
            _this.videoArr.push(videoObj)
           
        })
    }
}

//视频文件是否加载成功
Videofun.prototype.videoLoadSucceed = function(fn){
	 let _this=this;
     var j = 0;
	 for(var i=0;i<_this.videoArr.length;i++)
	 {
	 	_this.videoArr[i].addEventListener('loadedmetadata',function(){
            j++;
	 		if(j === _this.videoArr.length){
                fn.call(_this)
			}
	 	})
	 }
}

Videofun.prototype.init=function(dat,fn,touchObj){
  if(touchObj){
    this.touchstart = touchObj ? touchObj.touchstart : null
    this.touchmove = touchObj ? touchObj.touchmove : null
    this.touchend = touchObj ? touchObj.touchend : null
  }
  let _this=this
  this.setVideoArr()
  this.againFun()
  this._playFun()
  this._progressFun()
  this._jumpTime()
    
  this.videoLoadSucceed(function(){     //加载回调
    // _this.videoTimer&&clearTimeout(_this.clearTimeout)
    // _this.videoTimer=setTimeout(function(){
        _this._setTimeDot(dat)
        _this._autoPlayFun()
        _this._controlBox()
        _this._audioFun()
        fn && fn()    
   // },3000)
                       
  });

}
Videofun.prototype._autoPlayFun=function(){
    let playBtn=this.mainContainer.querySelectorAll(".play-btn")[0]
    let _this=this
    //if(this.autoplay){             //自动播放
    if(window.isAutoPlay){
        _this.videoArr.forEach((item,index)=>{
            item.play()    
        })
        playBtn.innerHTML="暂停"
        _this._addClass(playBtn,"stop-btn")
        clearInterval(_this.timer)
        _this.timer=setInterval(function(){
            _this._nowTime()
        },1000)
    }
}
Videofun.prototype.outputDat=function(){
    return this.videoArr[0].currentTime
}
Videofun.prototype._controlBox=function(){
    let controlSet=this.mainContainer.querySelectorAll(".control-set")[0]
    let _this=this
    this.mainContainer.onmouseenter=function(){
        _this._addClass(controlSet,"control-ant")
    }
    this.mainContainer.onmouseleave=function(){
        _this._removeClass(controlSet,"control-ant")
    }
}
Videofun.prototype._setTimeDot=function(dat){
    let timDotBox=this.mainContainer.querySelectorAll(".time-dot-box")[0]
    let arrTXTpos=[]
    let _this=this
    timDotBox.innerHTML=""
    dat.forEach((item,index)=>{
        let divObj=document.createElement("div")

       console.log(_this.videoArr[0].duration) 

        let lef=item.time/_this.videoArr[0].duration*timDotBox.offsetWidth
        //console.log(item.time,"----------------------------------")
        divObj.className="time-dot"
        divObj.style.left=lef+"px"
        arrTXTpos.push(lef)
        _this.dotDiv.push(divObj)
        timDotBox.appendChild(divObj)
    })
    _this._setTxtFun(arrTXTpos,dat)
}

Videofun.prototype._jumpTime=function(){
    let progressWarp=this.mainContainer.querySelectorAll(".progress-bg")[0]
    let dotBtn=this.mainContainer.querySelectorAll(".play-dot")[0]
    let progressBox=this.mainContainer.querySelectorAll(".progress-current")[0]
    let _this=this
    progressWarp.onclick=function(e){
        let ev = e || window.event
        let lef=ev.clientX-_this._getPosition(progressWarp)[0]
        dotBtn.style.left=lef+"px"
        progressBox.style.width=lef+"px"
        let scale=lef/progressWarp.offsetWidth
        let currentTim = scale * _this.videoArr[0].duration
        _this._socketFun({
            type:"jumptime",
            typeNum:3,
            currentTime:currentTim,
        })
        _this.videoContral("currentTime",currentTim)
        _this.outputDat()
        _this._nowTime()
    }
}
Videofun.prototype.videoContral=function(vTim,resTim){
    let _this=this
    let playBtn=this.mainContainer.querySelectorAll(".play-btn")[0]
    if(vTim==="currentTime"){
        _this.videoArr.forEach((item,index)=>{
            item[vTim]=resTim
        })
    }
    if(vTim==="paused" && resTim===true){
        _this.videoArr.forEach((item,index)=>{
            console.log(item)
            item.play()
        })
    }
    if(vTim==="paused" && resTim===false){
        _this.videoArr.forEach((item,index)=>{
            item.pause()
        })
    }

}

Videofun.prototype._setTxtFun=function(arr,dat){
    let progressTxt=this.mainContainer.querySelectorAll(".progress-txt")[0]
    progressTxt.innerHTML="";
    dat.forEach((item,index)=>{
        let divObj=document.createElement("div")
        divObj.className="progress-txt-sty"
        divObj.style.left=arr[index]-6+"px"
        divObj.innerHTML=item.title
        progressTxt.appendChild(divObj)
    })
}
Videofun.prototype._playFun=function(){
    let playBtn=this.mainContainer.querySelectorAll(".play-btn")[0]
    let _this=this
    playBtn.onclick=function(){

        _this._playStopFun()
    }
}
Videofun.prototype._playStopFun=function(){
    let playBtn=this.mainContainer.querySelectorAll(".play-btn")[0]
    let _this=this
    let params={
        type:"play",
        typeNum:1
    }
    if(_this.videoArr[0].paused){               //开始播放
        _this.videoContral("paused",true)
        playBtn.innerHTML="暂停"
        _this._addClass(playBtn,"stop-btn")
        _this._socketFun(params)
        clearInterval(_this.timer)
        _this.timer=setInterval(function(){
            _this._nowTime()
        },1000)
    }else{                                     //暂停
        params={
            type:"stop",
            typeNum:0
        }
        _this._socketFun(params)
        _this.videoContral("paused",false)
        playBtn.innerHTML="播放"
        _this._removeClass(playBtn,"stop-btn")
        clearInterval(_this.timer)
    }
}

Videofun.prototype._socketFun=function(val){          //socket函数
    let _this=this
    _this.controlFn&&_this.controlFn(val)            //控制回调
}

Videofun.prototype._progressFun=function(){

    let dotBtn=this.mainContainer.querySelectorAll(".play-dot")[0]
    let progressWarp=this.mainContainer.querySelectorAll(".progress-bg")[0]
    let progressBox=this.mainContainer.querySelectorAll(".progress-current")[0]
    let progressPos=this.mainContainer.querySelectorAll(".progress-pos")[0]
    let playBtn=this.mainContainer.querySelectorAll(".play-btn")[0]
    let _this=this
    let dotLeft=dotBtn.offsetLeft;
    var hasTouch = 'ontouchstart' in window,
	startEvent = hasTouch ? 'ontouchstart' : 'onmousedown',
	moveEvent = hasTouch ? 'ontouchmove' : 'onmousemove',
	endEvent = hasTouch ? 'ontouchend' : 'onmouseup';
    dotBtn[startEvent] = function(e){
        let ev = e || window.event
        var clientX = hasTouch ?ev.touches[0].clientX : ev.clientX;
        let disX= clientX-dotBtn.offsetLeft
        _this.touchstart && _this.touchstart.call(_this);
        document[moveEvent] = function(e){
            let ev = e || window.event;
            var clientX = hasTouch ? ev.touches[0].clientX : ev.clientX;
            let L = clientX - disX;
            if(L<=0){
                L = 0;
            }
            else if(L>=(progressPos.offsetWidth - dotBtn.offsetWidth)){
                L = (progressPos.offsetWidth - dotBtn.offsetWidth)
            }
            dotBtn.style.left = L + 'px'
            progressBox.style.width=L+'px'
            let scale = L/(progressPos.offsetWidth - dotBtn.offsetWidth)
            let currentTim = scale * _this.videoArr[0].duration
            _this.videoContral("currentTime",currentTim)
            _this._socketFun({
                type:"progress",
                typeNum:2,
                currentTime:currentTim,
            })
            _this.outputDat()
            _this._nowTime()
            if(_this.videoArr[0].currentTime==_this.videoArr[0].duration){
                _this.againFun()
            }
            _this.touchmove && _this.touchmove.call(_this,currentTim);
        };
        document[endEvent] = function(){
            document[endEvent] = null
            document[moveEvent] = null
            _this.touchend && _this.touchend.call(_this);
        };
        return false
    }
}

Videofun.prototype._fullScreenFun=function(){
    let fullScreenBtn=this.mainContainer.querySelectorAll(".fullscreen")[0]
    let _this=this
    fullScreenBtn.onclick=function(){
        _this.videoArr[0].webkitRequestFullScreen()
    }
}
Videofun.prototype._audioFun=function(){                                        //声音
    let audioBtn=this.mainContainer.querySelectorAll(".audio-btn")[0]
    let _this=this
    // audioBtn.onclick=function(){
    //     if(_this.oV.muted){
    //         _this.oV.volume=1
    //         audioBtn.innerHTML="静音"
    //         _this.oV.muted=!_this.oV.muted
    //     }else{
    //         _this.oV.volume=0
    //         audioBtn.innerHTML="取消静音"
    //         _this.oV.muted=!_this.oV.muted
    //     }
    // }

    _this.oV.forEach((item,index)=>{
        if(item.sound){
            _this.videoArr[index].volume=1
        }else{
            _this.videoArr[index].volume=0
        }
    })
}
Videofun.prototype._getTotalTime=function(){                                            //总时间
    let totalTim=this.mainContainer.querySelectorAll(".total-tim")[0]
    let _this=this
    totalTim.innerHTML=_this._timSetFun(_this.videoArr[0].duration)
}
Videofun.prototype._nowTime=function(){                                                 //当前时间
    let currentTim=this.mainContainer.querySelectorAll(".current-tim")[0]
    let progressWarp=this.mainContainer.querySelectorAll(".progress-bg")[0]
    let dotBtn=this.mainContainer.querySelectorAll(".play-dot")[0]
    let progressBox=this.mainContainer.querySelectorAll(".progress-current")[0]
    let progressPos=this.mainContainer.querySelectorAll(".progress-pos")[0]
    let playBtn=this.mainContainer.querySelectorAll(".play-btn")[0]
    var scale = this.videoArr[0].currentTime/this.videoArr[0].duration;
    let _this=this
    dotBtn.style.left = scale * (progressPos.offsetWidth-dotBtn.offsetWidth)+ 'px'
    progressBox.style.width=scale * (progressPos.offsetWidth-dotBtn.offsetWidth) + 'px'
    _this.outputDat()
    _this.dotDiv.forEach((item,index)=>{
        if(dotBtn.offsetLeft>item.offsetLeft && index!==0){
            item.className="time-dot time-dot-sty"
        }else{
            item.className="time-dot"
        }
    })
    //_this.getCurrentTime(_this.videoArr[0].currentTime)
    if(_this.videoArr[0].currentTime==_this.videoArr[0].duration){
        _this._endStopFun()
        _this.againFun()
        clearInterval(_this.timer)
        //if(_this.autoplay===false){
        if(window.isAutoPlay){
            clearInterval(_this.timer)
            _this.videoArr.forEach((item,index)=>{
                item.currentTime=0
            })
            _this.videoContral("paused",false)
            _this._playStopFun()
        }
    }
}

Videofun.prototype.againFun=function(){
    let currentTim=this.mainContainer.querySelectorAll(".current-tim")[0]
    let progressWarp=this.mainContainer.querySelectorAll(".progress-bg")[0]
    let dotBtn=this.mainContainer.querySelectorAll(".play-dot")[0]
    let progressBox=this.mainContainer.querySelectorAll(".progress-current")[0]
    let progressPos=this.mainContainer.querySelectorAll(".progress-pos")[0]
    let playBtn=this.mainContainer.querySelectorAll(".play-btn")[0]
    let _this=this
    _this.videoArr[0].currentTime=0
    dotBtn.style.left=0
    progressBox.style.width=0
    playBtn.innerHTML="播放"
    //playBtn.className="play-btn"
    _this._removeClass(playBtn,"stop-btn")
    _this.dotDiv.forEach((item,index)=>{
        item.className="time-dot"
    })
    clearInterval(_this.timer)
}

Videofun.prototype._timSetFun=function(tim){
    let iNum=parseInt(tim)
    let iH=toZero(Math.floor(iNum/3600))
    let iM=toZero(Math.floor(iNum%3600/60))
    let iS=toZero(Math.floor(iNum%60))
    return iH+":"+iM+":"+iS
    function toZero(num){
        if(num<=9) return '0' + num
        else return '' + num
    }
}
Videofun.prototype._endStopFun=function(){
    this.callBack()
}
Videofun.prototype._addClass=function(el,cls){
	var arrCls=cls.split(/ +/);
	if(el.className){
		for(var i=0;i<arrCls.length;i++){
			if(this._hasClass(el,cls)){
				cls=cls.replace(new RegExp('(^| +)'+arrCls[i]+'( +|$)'),' ');
			}
		}
		el.className=[el.className].concat(cls).join(' ');
	}
	else{
		el.className=cls;
	}
}
Videofun.prototype._removeClass=function(el,cls){
	if(!cls){
		el.className='';
	}else if(this._hasClass(el,cls)){
		el.className=el.className.replace(new RegExp('(^| +)'+cls+'( +|$)','g'),' ');
	}
}

Videofun.prototype._hasClass=function(el,cls){
	var className = typeof(el) == 'string' && el || el.className;
	if(!className||!cls)
		return false;
	var cls=cls.split(/[\. ]+/);
	var re;
	for(var i=cls.length-1;i>=0;i--){
		re=new RegExp('(^| +)'+cls[i]+'( +|$)');
		if(!re.test(className))
			return false;
	}
	return true;
}
Videofun.prototype._getPosition=function(obj){
    let position = [0,0];
    while(obj.offsetParent){
        position[0] += obj.offsetLeft;
        position[1] += obj.offsetTop;
        obj = obj.offsetParent;
    }
    position[0] + document.body.offsetLeft;
    position[1] + document.body.offsetTop;
    return position;
}
