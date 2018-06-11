<template>
<div class="nav-bottom">
        <div class="swiper-container-car">
            <div class="swiper-wrapper">

                <div class="swiper-slide" :class="item.currentClass?'current':''" :data-id="item.id"  v-for="(item,index) in carDat" :key="index" >
                  <div class="content">
                    <i></i>
                      <div class="img-box">
                            <img src="../../assets/img/fukesi.png" />
                        </div>
                        <span>{{item.brandname}}</span>
                        <p>{{item.carname}}</p>
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

        }
    },
    computed:{
        ...mapGetters(["carDat"])
    },
    methods:{
        dbCarFun(dat){
            this.contrastCarFun(dat)
        },
        swiperFun(){
            let _this = this;
            let setting ={
                count:_this.carDat.length,
                click(swiper,event){
                    let id = $(swiper.clickedSlide).attr('data-id');

                    let o = $.grep(_this.carDat,function(n,i){
                        return n.id == id;
                    })[0];
                    o.$click = $(swiper.clickedSlide);
                    _this.dbCarFun(o);
                },
                slideChange:function(index){
                    var $current = this.slides[this.activeIndex];
                    //console.log($current)
                }
            }
            _this.swiper = $('.swiper-container-car').swiperCar(setting);
        },
        ...mapActions(["contrastCarFun"])
    },
    mounted(){
        //页底选车工具
         this.swiperFun();
        //console.log(swiper.getSlideIndex());
        //swiper.slideTo(4);
    }
}
</script>

