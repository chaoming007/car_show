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
				<div class="control-set">
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

				<!--快进弹出层 start-->
				<Below v-show="vsbelow"  ref="below" />
				<!--快进弹出层 end-->
			</div>
		</div>
		<div class="h100"></div>
		<!--内容 end-->
		
</div>
</template>
<script>
import SocketFn from '../../config/socketOrder.js'
import Below from './Below.vue'
import { mapGetters,mapActions } from 'vuex'
export default {
    data(){
        return{
			timer:null,
			videoTime:null,
			dbVideoUrl:null,
			vsbelow:false
			
        }
	},
	props:{
		"autoplay":		{type:Boolean},             //是否自动播放
		"videoDat":		[Array,Object],				//视频数据
		"videoUrlId":	{type:Array},				//视频播放器数据
		"videoCallBack":{type:Function},			//视频播放完回调
		"initVideoFun":	{type:Function},			//视频初始化函数
		"loadFn":		{type:Function},			//视频加载完回调
		"controlFn":	{type:Function}				//控制回调
	},
    methods:{
		callbackfn(){
			this.videoCallBack()
			this.addNumFun()
		},
		getCurrentTime(val){
			SocketFn({
				type:"synctime",
				videoNum:val
			})
		},
        videoLoad(vdat,autoplay,fn,controlFn){

				console.log(this.currentVideoDat,"fdsifusdfuff")

			let _this=this
			let videoBox=_this.$refs.videoBox.id					 	//控制条元素
			// _this.videoTime&&clearTimeout(_this.videoTime)
			// _this.videoTime=setTimeout(function(){
			let v1=new Videofun(videoBox,_this.videoUrlId,autoplay,fn,controlFn,_this.getCurrentTime) 	//控制条id，播放器id,是否自动播放,播放完回调函数 , 控制回调函数 
			if(_this.videoDat.length>1){

				this.dbVideoUrl=this.contrastCarArr[0].dat.video.urlRoot+'_'+this.contrastCarArr[0].dat.video.videoNum+'_'+this.contrastCarArr[1].dat.video.videoNum+".mp4"
				//this.dbVideoUrl="http://47.105.100.82/0605/Merge/Car_compare_001_002.mp4"

				v1.init(_this.contrastCarArr[0].dat.video.twoslot,_this.loadFn)  ////视频时间点

			}else{

				////console.log(_this.videoDat.video.slot,"-=-=-=-=-=-=-=-=-")
				var touchObj = {
					touchstart:function(){
						_this.vsbelow = true;
						console.log('按下')
					},
					touchmove:function(currentTime){
						var currenttime = parseInt(currentTime);
						_this.currentVideoDat.video.coords.forEach((item,index) => {
							if(item.start <= currenttime && item.end > currenttime ){
								_this.$refs.below.$emit('setBelow',{video:_this.currentVideoDat.video,coord:item,currenttime:currenttime});
							}
						});
					},
					touchend:function(){
						_this.vsbelow = false;
						console.log('抬起')
					}
				}
				
				v1.init(_this.currentVideoDat.video.slot,_this.loadFn,touchObj)  
			}   

			
			// },3000)
		},
		addNumFun(){						 
			this.videoTapFun()  
		},
		videoTapFun(){
			let _this=this
			_this.videoLoad(_this.videoDat,_this.autoplay,_this.callbackfn,_this.controlFn)	
		}
	},
	computed:{
		...mapGetters(["currentVideoDat","contrastCarArr"])
	},
    mounted(){
		let _this=this
		_this.videoTapFun()
		if(_this.initVideoFun && typeof _this.initVideoFun==="function"){
			_this.initVideoFun(_this.videoTapFun)
		}
	},
	components:{
		Below
	}


}
</script>

