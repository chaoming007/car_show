<template>
<div class="nav-bottom">
        <div class="swiper-container-car">
            <div class="swiper-wrapper">

                <div class="swiper-slide" :class="item.currentClass?'current':''" :data-id="item.id"  v-for="(item,index) in carDat" :key="index" >
                  <div class="content">
                    <i></i>
                      <div class="img-box">
                            <img :src="item.imgurl" />
                        </div>
                        <span>{{item.brandname + item.carname}}</span>
                    </div>
                 </div>
            </div>
        </div>
</div>
</template>
<script>
import { mapGetters,mapActions} from 'vuex'
import Vue from 'vue'
export default {
    data(){
        return{
             swiper:""
        }
    },
    computed:{
        ...mapGetters(["carDat","selectCarIndex","contrastCarArr","initVideoNum"])
    },
    methods:{
        dbCarFun(dat){
            this.contrastCarFun(dat)
        },
        addClassFun(){
            let _this=this
             for(var i=0;i<_this.swiper.swiperCar.slides.length;i++){
                 $(_this.swiper.swiperCar.slides[i]).removeClass('current');
            }
            for(var i=0;i<_this.swiper.swiperCar.slides.length;i++){
                for(var j=0;j<_this.contrastCarArr.length;j++){
                    if(_this.contrastCarArr[j].dat){
                        if($(_this.swiper.swiperCar.slides[i]).attr('data-id') == parseInt(_this.contrastCarArr[j].dat.id)){
                            $(_this.swiper.swiperCar.slides[i]).addClass('current');
                        }
                    }
                }
            }
        },
        removeClassFun(){
            let _this=this
            _this.$on('removeSwiperCar',function(currents){
                for(var i=0;i<_this.swiper.swiperCar.slides.length;i++){
                    if($(_this.swiper.swiperCar.slides[i]).attr('data-id') == parseInt(currents.dat.id)){
                        $(_this.swiper.swiperCar.slides[i]).removeClass('current');
                    }
                }
            })
        },
        swiperFun(){
            let _this = this;
            let setting ={
                slideIdx:_this.initVideoNum, 
                count:_this.carDat.length,
                click(swiper,event){
                    let id = $(swiper.clickedSlide).attr('data-id');
                    let o = $.grep(_this.carDat,function(n,i){
                        return n.id == id;
                    })[0];
                    o.index = $(swiper.clickedSlide).attr('data-index');
                    _this.dbCarFun(o);
                    _this.addClassFun()
                    // var currents = $.grep(_this.carDat,function(n,i){
                    //   return n.currentClass == true;
                    // })

                },
                slideChange:function(index){

                  
                    //let currentId=$(this.slides[this.activeIndex]).data("id")
                    // console.log(currentId)
                    //_this.currentVideo(currentId)
                    //var $current = this.slides[this.activeIndex];
                    //console.log($current)
                }
                 
            }
            _this.swiper = $('.swiper-container-car').swiperCar(setting);
            _this.addClassFun()
        },
        ...mapActions(["contrastCarFun","changeSelectCarIndex","currentVideo","deldbFun"])
    },
    mounted(){
        this.deldbFun(false) //删除第二个车
        this.swiperFun()
        this.removeClassFun()
        this.deldbFun(false) //删除第二个车
        //this.addClassFun()
        //console.log(swiper.getSlideIndex());
        //swiper.slideTo(4);

        
    }
}
</script>

