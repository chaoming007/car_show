<template>
<div>
    <!--竖屏提示 start-->
		<Hint />
    <!--竖屏提示 end-->
   
	<!--内容 start-->
    <div class="container">
       
         <!--视频 start -->
        <div class="video-content-box vs">
            <div class="video-load" v-show="isLoad">
                正在加载...
            </div>

            <Video 
                :autoplay="isAutoPlay"
                :videoDat="contrastCarArr"
                :videoUrlId="vDat"
                :videoCallBack="callBack"
                :loadFn="loadFn"
                :initVideoFun="initFun"
                
            ></Video>
        </div>
         <!--视频 end -->
    </div>
    <!--内容 end-->
</div>
</template>
<script>
import Hint from './component/Hint.vue'
import Video from './component/Video.vue'
import Socket from '../config/socketOrder'
import { mapActions,mapGetters} from 'vuex'

export default {
    data(){
        return{
            isAutoPlay:true,
            vDat:[
                {id:"video_1",sound:false},
                {id:"video_2",sound:false}
            ],
            videoDat:[],
            sFn:""
        }
    },
    methods:{
        callBack(){
            //console.log(1)
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
        videoControl(val){                            //socket指令返回首页
            let _this=this
            if(val.type==="selectcomparecar"){    	
                _this.$router.push("/onecar")
            }
            if(val.type==="comparecar"){
				this.isLoadFn(true) //加载
				this.sFn()
			}
        },
        ...mapActions(["isLoadFn"])
        // videoSetDat(){
        //     this.contrastCarArr.forEach((item,index)=>{
        //         this.videoDat.push(item.dat)
        //     })
        // }
    },
    
    computed:{
        ...mapGetters(["contrastCarArr","isLoad"])
    },
    mounted(){
        this.isLoadFn(true)
        Socket(this.videoControl)
    },
    components:{
        Hint,
        Video
    }
}

</script>