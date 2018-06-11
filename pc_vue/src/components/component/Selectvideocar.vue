<template>
<div class="nav-bottom">
        <div class="swiper-container-car">
            <div class="swiper-wrapper">

                    <div class="swiper-slide" :class="item.currentClass?'current':''" :data-id="item.id"  v-for="(item,index) in carDat" :key="index" >
                            <div class="content">
                                <div class="img-box">
                                    <img :src="item.dat.imgurl" />
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
            var _this = this;
            var setting ={
                count:_this.carDat.length,
                slideChange:function(index){
                    console.log(index,'aa');
                }
            }
            var swiper = $('.swiper-container-car').swiperCar(setting);
        },
        ...mapActions(["contrastCarFun"])
    },
    mounted(){
        //this.swiperFun()
    }
}
</script>

