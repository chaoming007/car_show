<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions,mapGetters} from 'vuex'
import Scoket from './config/socketOrder'
import data from './config/data'
export default {
  name: 'App',
  methods:{
    videoControlFn(val){
        let _this=this
        if(val.type==="toindex"){					//转向首页
          _this.$router.push("/onecar")
          _this.setInitVideoFun(val.videoNum) 
          _this.currentVideo(val.videoNum) 		//滑动播放第几个视频
        }
    },
    ...mapActions(["getCarDat","currentVideo","setInitVideoFun"])
  },
  computed:{
    ...mapGetters(["initVideoNum"])
  },
  created(){
    this.getCarDat(data)
    this.currentVideo(this.initVideoNum)
  },
  watch:{
    "$route"(to){
        if(to.path=="/twocar"){
        }
    }
  },
  mounted(){
    Scoket(this.videoControlFn)
  }
}
</script>


