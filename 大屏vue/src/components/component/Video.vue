<template>
<div>
    <!--内容 start-->
		<div class="container">
			<div class="video-box" ref="videoBox" id="videoBox">
				<div class="video-container">
					<div class="video-warp" v-if="videoUrlId.length<=1">
						<video v-for="(item,index) in videoUrlId" :key="index" :src="videoDat.video.url" :id="item.id">
						</video>
					</div>
					<div class="video-warp video-more-sty" v-else>
						<video v-for="(item,index) in videoUrlId" :key="index" :src="dbVideoUrl" :id="item.id">
						</video>
					</div>
				</div>
				<!--视频播放操作面板 start-->
				<div :class="tuffClass?'control-set':'control-set showControl'">
		                <div class="control-box">
		                        <span class="play-btn" >播放</span>
		                            <div class="progress-box">
		                                <div class="progress-pos">
		                                    <div class="progress-bg">
		                                        <div class="time-dot-box"></div>
		                                        <div class="progress-current"></div>
		                                        <div class="progress-txt"></div>
		                                    </div>
		                                    <i class="play-dot"></i>
		                                </div>
		                            </div>
		                        <!-- <span class="tim-box">
		                            <em class="current-tim"></em>/<em class="total-tim" ></em>
		                        </span>
		                        <span class="audio-btn">
		                            静音
		                        </span> -->
		                        <!-- <span class="fullscreen"> 
		                            全屏
		                        </span> -->
		                </div>
		        </div>
				<!--视频播放操作面板 end-->
			</div>
		</div>
		<div class="h100"></div>
		<!--内容 end-->
</div>
</template>
<script>
import Scoket from '../../config/socketOrder.js'
import { mapGetters,mapActions } from 'vuex'
export default {
    data(){
        return{
			timer:null,
			v1:null,
			dbVideoUrl:null,
			tuffClass:true,
			timerControl:null
        }
	},
	props:{
		"autoplay":		{type:Boolean},             //是否自动播放
		"videoDat":		[Array,Object],				//视频数据
		"videoUrlId":	{type:Array},				//视频播放器数据
		"videoCallBack":{type:Function},			//视频播放完回调
		"initVideoFun":	{type:Function},			//视频初始化函数
		"loadFn":		{type:Function}				//视频加载完回调
		//"controlShow":	{type:Function}					//视频控制
	},
    methods:{
		callbackfn(){
			this.videoCallBack()
			this.addNumFun()
			this.v1._playStopFun()
		},
        videoLoad(vdat,autoplay,fn,controlFn){
			let _this=this
			if(_this.v1){
				this.v1._progressFun(0)
			}
			if(_this.$refs.videoBox){
				let videoBox=_this.$refs.videoBox.id   									//控制条元素
				_this.v1=new Videofun(videoBox,_this.videoUrlId,autoplay,fn,controlFn,_this.alertFnu) 	//控制条id，播放器id,是否自动播放,回调函数,播放器控制函数
				if(_this.videoDat.length>1){
					this.dbVideoUrl=this.videoDat[0].dat.video.urlRoot+'_'+this.videoDat[0].dat.video.videoNum+'_'+this.videoDat[1].dat.video.videoNum+".mp4"
					_this.v1.init(_this.videoDat[0].dat.video.twoslot,_this.loadFn)  						////视屏时间点
				}else{
					_this.v1.init(_this.videoDat.video.slot,_this.loadFn)  
				}   
			}
		},
		controlShow(){     //控制进度条
			this.tuffClass=false
			this.timerControl&&clearTimeout(this.timerControl)
			this.timerControl=setTimeout(()=>{
				this.tuffClass=true
			},2000)
		},
		controlFn(val){							//播放器控制
			let _this=this

			if(val.type==="play"){
				console.log(val)
				this.v1._playStopFun("play")
			}
			if(val.type==="stop"){
				this.v1._playStopFun("stop")
			}
			if(val.type==="progress"){			//拖动控制条
				this.v1._progressFun(val.currentTime)
				this.controlShow()

			}
			if(val.type==="jumptime"){			//点击跳动时间
				this.v1._progressFun(val.currentTime)
				this.controlShow()
			}
			if(val.type==="synctime"){			//同步时间
				console.log(val)
				this.v1._progressFun(val.videoNum)
			}
			// if(val.type==="comparecar"){
				
			// 	this.v1._playStopFun("play")
			// 	this.v1._progressFun(0)
			// }
		},

		
		addNumFun(){		
			this.videoTapFun()  
		},
		videoTapFun(){
			let _this=this
			_this.videoLoad(_this.videoDat,_this.autoplay,_this.callbackfn,_this.controlFn)		
		},
		alertFnu(){
			//alert(1)
			this.controlShow()
		}
	},
    mounted(){
		let _this=this
		_this.videoTapFun()
		Scoket(_this.controlFn)
		if(_this.initVideoFun && typeof _this.initVideoFun==="function"){
			_this.initVideoFun(_this.videoTapFun)
		}
		this.$root.$on("controlShow",()=>{
			//alert(1)
			this.controlShow()
		})
    }


}
</script>

