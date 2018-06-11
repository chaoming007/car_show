<template>
<div>


		<!--内容 start-->
		<div class="video-content-box">
				<div class="video-load" v-show="isLoad">
					正在加载...
				</div>

				<Video 
					:autoplay="isAutoPlay"
					:videoDat="currentVideoDat"
					:videoUrlId="vDat"
					:videoCallBack="callBack"
					:initVideoFun="initFun"
					:loadFn="loadFn"

					
				/>

		</div>
		
		<!--内容 end-->
	
		<!--车型详情弹层 start-->
		<Layer v-show="kbBtn" :closeBtnFn="kbBtnFun"  :carDatObj="currentVideoDat"/>
		<!--车型详情弹层 end-->

</div>

</template>

<script>
import Hint from './component/Hint.vue'
import Setvideo from './component/Setvideo.vue'
import Carhead from './component/Carhead.vue'
import Video from './component/Video.vue'
import Selectvideocar from './component/Selectvideocar.vue'
import Layer from './component/Layer.vue'
import Scoket from '../config/socketOrder.js'
import { mapGetters,mapActions} from 'vuex'

export default {
	data(){
		return{
			typeval:false,
			kbBtn:false,
			sFn:"",
			vDat:[
                {id:"video_1",sound:false}
			],
			isAutoPlay:true,        //是否自动播放
			isTimer:null,
			playMode:""             //播放模式
		}
	},
	methods:{
		
		typeSelectFun(){
			this.typeval=!this.typeval
		},
		kbBtnFun(){
			this.kbBtn=!this.kbBtn
		},
		initFun(fn){
			if(fn && typeof fn==="function"){
				this.sFn=fn
			}
		},
		loadFn(){
			this.isLoadFn(false)
			console.log("加载完成")
		},
		playVideNumFun(){
			// if(this.playVideoMode===0){      //循环播放所有视频
			// 	this.isAutoPlay=true
			// 	this.changeInitVideoFun(1)    //下一个视频
			// 	console.log("下一个")
			// }
			// if(this.playVideoMode===1){      //循环播放当前视频
			// 	this.isAutoPlay=true
			// 	this.changeInitVideoFun(0)    
			// }
			// if(this.playVideoMode===2){      //不循环播放
			// 	this.isAutoPlay=false  
			// 	this.changeInitVideoFun(0) 
			// }
		},
		callBack(){			
			if(this.playMode===0 || this.playMode===0){
				window.isAutoPlay=true
			}
			if(this.playMode===2){
				window.isAutoPlay=false
			}
			console.log("播放结束")
			
			// this.playVideNumFun()
			// this.isLoadFn(true)
			// this.currentVideo(this.initVideoNum)
		},
		videoControl(val){								//视频跳转指令
			
	
			let _this=this
			if(val.type==="nextvideo"){    				//下一个视频
				_this.setInitVideoFun(val.videoNum)
				_this.currentVideo(val.videoNum) 		//滑动播放第几个视频
				_this.sFn()
				_this.$root.$emit("controlShow")

				
			}
			if(val.type==="selectvideo"){    			//选择第几个视频
				_this.setInitVideoFun(val.videoNum) 
				_this.currentVideo(val.videoNum) 		//滑动播放第几个视频
				_this.playMode=val.playMode
				//window.isAutoPlay=val.playMode
				_this.sFn()
				_this.$root.$emit("controlShow")
			}
			if(val.type==="comparecar"){
				_this.setContrastCarArr(val.data)
				_this.$router.push("/twocar")
				_this.sFn()
			}
			if(val.type==="kbonoff"){					//打开关闭口碑弹层
				if(val.videoNum===1){
					_this.kbBtn=true
				}
				if(val.videoNum===0){
					_this.kbBtn=false
				}
			}
			if(val.type==="selectmode"){				//选择播放模式
				_this.playMode=val.videoNum
				if(val.videoNum===2){					//不自动播放
					_this.isAutoPlay=false
					window.isAutoPlay=false
				}
				if(val.videoNum===0 || val.videoNum===1){
					_this.isAutoPlay=true
					window.isAutoPlay=true
				}
				_this.setPlayMode(val.videoNum)
			}
		},
		// swiperFun(){              		 //底部滑动
		// 	let _this = this
		// 	let currentId=0
        //     let setting ={
        //         count:_this.carDat.length,
        //         slideChange:function(index){
		// 			//_this.isLoadFn(true)                 //正在加载
		// 			// currentId=$(this.slides[this.activeIndex]).data("id")
		// 			// console.log(currentId)
		// 			// _this.setInitVideoFun(currentId)   
		// 			// _this.currentVideo(currentId) 		//滑动播放第几个视频
		// 			// _this.sFn() 							//初始化视频回掉
		// 			// _this.isLoadFn(true)                 //正在加载
					
        //         }
        //     }
		// 	this.swiper=$('.swiper-container-car').swiperCar(setting)
		// },

		...mapActions(["currentVideo","changeInitVideoFun","setInitVideoFun","isLoadFn","setContrastCarArr","setPlayMode"])
	},
	computed:{
		...mapGetters(["timDot","carDat","setVideoDat","currentVideoDat","initVideoNum","playVideoMode","isLoad"])
	},
	
	mounted(){
		//this.videoModeFun()
		//this.swiperFun()
		Scoket(this.videoControl)
		console.log(this)
	},
	components:{
		Hint,
		Setvideo,
		Carhead,
		Video,
		Selectvideocar,
		Layer
	}
}
</script>

