<template>
<div>

		<Hint />
		<!--车型头 start-->
		<div class="video-header">
			<h6>搜车库</h6>
			<div class="setting">
				<a class="lnk-config" @click="typeSelectFun" href="javascript:;">设置</a>
				<Setvideo v-show="typeval"  :showValFun="typeSelectFun"   />
			</div>

		</div>
		<!--车型头 end-->
		<div class="first-title">
			<span>{{currentVideoDat.brandname}} {{currentVideoDat.carname}}</span>
			<a class="lnk-yellow" href="javascript:;" @click="kbBtnFun" data-action="touch">车辆口碑</a>
			<router-link to="/duibi" class="lnk-yellow lnk-koubei" data-action="touch">车辆对比</router-link>
		</div>
		<!--内容 start-->
		<div class="video-content-box">
				<div class="video-load" v-show="isLoad">
          <div class="loading">
					  正在加载...
          </div>
				</div>


				<Video
					:autoplay="isAutoPlay"
					:videoDat="currentVideoDat"
					:videoUrlId="vDat"
					:videoCallBack="callBack"
					:initVideoFun="initFun"
					:loadFn="loadFn"
					:controlFn="controlFn"
				/>
				
	

		</div>

		<!--内容 end-->
		<!--页底选车控件 start-->
		<Selectvideocar />
		<!--页底选车控件 end-->
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
import SocketFn from '../config/socketOrder.js'
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
			videoTimer:null,
			currentDat:null
		}
	},
	methods:{
		typeSelectFun(){
			this.typeval=!this.typeval
		},
		kbBtnFun(){
			let params={
				type:"kbonoff",
				videoNum:0
			}
			this.kbBtn=!this.kbBtn
			if(this.kbBtn===true){
				params.videoNum=1
			}else{
				params.videoNum=0
			}
			SocketFn(params)
		},
		initFun(fn){
			if(fn && typeof fn==="function"){
				this.sFn=fn
			}
		},
		controlFn(val){						//播放器控制回调
			SocketFn(val)
		},
		loadFn(){
      this.isLoadFn(false)
			console.log("加载完成")
		},
		playVideNumFun(){
			//console.log("next")
			if(this.playVideoMode===0){      //循环播放所有视频
				this.isAutoPlay=true
				window.isAutoPlay=true
				this.changeInitVideoFun(1)    //下一个视频
				this.swiper.slideNext()
				SocketFn({
					type:"nextvideo",
					videoNum:this.initVideoNum
				})
				this.isLoadFn(true)
				console.log("下一个")
			}
			if(this.playVideoMode===1){      //循环播放当前视频
				this.isAutoPlay=true
				window.isAutoPlay=true
				this.changeInitVideoFun(0)
			}
			if(this.playVideoMode===2){      //不循环播放
				this.isAutoPlay=false
				window.isAutoPlay=false
				this.changeInitVideoFun(0)
			}
		},
		callBack(){							//播放完回调
				this.playVideNumFun()
				this.currentVideo(this.initVideoNum)
		},
		swiperFun(ind){              		 //底部滑动
			let _this = this
			let currentId=0
			let currentIndex=0
            let setting ={
                count:_this.carDat.length,
				slideIdx:_this.initVideoNum,
				callBackIndex:function(){
					currentIndex=$(this).data("index")
					currentId=$(this).data("id")
					_this.initCarDat(currentId,currentIndex)
				},
                slideChange:function(index,sthis){
					let that=this
					console.log(sthis.istouch)
					_this.videoTimer&&clearTimeout(_this.videoTimer)
					if(!sthis.istouch){
						currentId=$(that.slides[that.activeIndex]).data("id")
						currentIndex=$(that.slides[that.activeIndex]).data("index")
						if(currentIndex == undefined){
							return
						}		
						_this.initCarDat(currentId,currentIndex)
					}else{
						_this.videoTimer&&clearTimeout(_this.videoTimer)
						
						_this.videoTimer=setTimeout(function(){
							currentId=$(that.slides[that.activeIndex]).data("id")
							currentIndex=$(that.slides[that.activeIndex]).data("index")
							if(currentIndex == undefined){
								return
							}		
							_this.initCarDat(currentId,currentIndex)
						},3000)
					}

					// // indexJson.id=currentId
					// // indexJson.index=currentIndex
					// _this.changeSelectCarIndex(ind)
					// _this.setInitVideoFun(currentId)    //设置当前播放视频id
					// _this.currentVideo(currentId) 		//滑动播放第几个视频
					// _this.sFn() 						//初始化视频播放器回掉
					// _this.isLoadFn(true)                //正在加载

					// arrJson.type="selectvideo"
					// arrJson.videoNum=currentId
					// arrJson.playMode=_this.playVideoMode  //设置大屏播放模式
					// SocketFn(arrJson)
					//_this.initSwiperFun()
				}
				
			}
			this.swiper =$('.swiper-container-car').swiperCar(setting)
			// indexJson.index=this.swiper.swiperCar.activeIndex
			// _this.changeSelectCarIndex(indexJson)
			//console.log(this.swiper.swiperCar.activeIndex)
		},
		initCarDat(id,ind){
			let _this=this
			let arrJson={}
			let indJson={}

			indJson.index=ind
			indJson.id=id

			this.currentDat =  $.grep(_this.carDat,function(n,i){
				return n.id == id
			})[0]
			// indexJson.id=currentId
			// indexJson.index=currentIndex
			_this.changeSelectCarIndex(indJson)
			_this.setInitVideoFun(id)    //设置当前播放视频id
			_this.currentVideo(id) 		//滑动播放第几个视频
			_this.sFn() 						//初始化视频播放器回掉
			_this.isLoadFn(true)                //正在加载

			arrJson.type="selectvideo"
			arrJson.videoNum=id
			arrJson.playMode=_this.playVideoMode  //设置大屏播放模式
			SocketFn(arrJson)
			//_this.initSwiperFun()
		},
		initSwiperFun(){
			let _this=this
			if(_this.contrastCarArr[0].dat){
				_this.setInitVideoFun(_this.contrastCarArr[0].dat.id)
			}
		},
		...mapActions(["currentVideo","changeInitVideoFun","setInitVideoFun","isLoadFn","changeSelectCarIndex"])
	},
	computed:{
		...mapGetters(["timDot","carDat","setVideoDat","currentVideoDat","initVideoNum","playVideoMode","isLoad","selectCarIndex","contrastCarArr"])
	},
	mounted(){
		//this.videoModeFun()
		SocketFn({
			type:"toindex",
			videoNum:this.initVideoNum
		})
		
		this.swiperFun(0)     //默认初始index
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

