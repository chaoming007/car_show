<template>
<div>
    <!--竖屏提示 start-->
		<Hint />
    <!--竖屏提示 end-->
    <!--页头 start-->
    <div class="header">
        <a href="javascript:;"  @click="goBackFun" class="lnk-return" data-action="touch"></a>
        <h6>车型对比</h6>
    </div>
    <!--页头 end-->
	<!--内容 start-->
    <div class="container">
        <div class="screen vs">
            <ul>
                <li v-for="(item,index) in contrastCarArr" :key="index">
                    <h6>{{item.dat.brandname}} </h6>
                    <p> {{item.dat.carname}}</p>
                    <div class="img-box">
                        <img :src="item.dat.imgurl" />
                    </div>
                </li>
            </ul>
            <a href="javascript:;" class="lnk-changecar" @click="goBackFun">更换车辆</a>
        </div>
         <!--视频 start -->
        <div class="video-content-box vs">
            <div class="video-load" v-show="isLoad">
              <div class="loading">
                正在加载...
              </div>
            </div>

            <Video
                :autoplay="isAutoPlay"
                :videoDat="contrastCarArr"
                :videoUrlId="vDat"
                :videoCallBack="callBack"
                :loadFn="loadFn"
                :controlFn="controlFn"
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
import SocketFn from '../config/socketOrder.js'
import { mapActions,mapGetters} from 'vuex'

export default {
    data(){
        return{
            isAutoPlay:true,
            vDat:[
                {id:"video_1",sound:false},
                {id:"video_2",sound:false}
            ],
            videoDat:[]
        }
    },
    methods:{
        goBackFun(){                        //返回选择对比车型
            this.$router.go(-1)
            // SocketFn({
            //     type:"selectcomparecar",
            //     videoNum:this.contrastCarArr
            // })
        },
        controlFn(val){						//播放器控制回调
			SocketFn(val)
		},
        callBack(){

        },
        loadFn(){
            this.isLoadFn(false)
			console.log("加载完成")
        },
        ...mapActions(["isLoadFn"])
    },
    computed:{
        ...mapGetters(["contrastCarArr","isLoad"])
    },
    mounted(){
        this.isLoadFn(true)
        SocketFn({
            type:"totwocar",
            videoNum:this.contrastCarArr
        })
    },
    components:{
        Hint,
        Video
    }
}

</script>
