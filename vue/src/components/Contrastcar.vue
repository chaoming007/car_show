<template>
<div>
    <!--页头 start-->
		<div class="header">
			<a href="javascript:;" @click="goBackFun" class="lnk-return"></a>
			<h6>车型对比</h6>
		</div>
	<!--页头 end-->
    <!--内容 start-->
		<div class="container">
			<div class="screen">
				<ul>
					<li v-for="(item,index) in contrastCarArr" :key="index">
						<div v-if="item.dat===false">
							<strong>请从下方列表中选取车辆</strong>
							<div class="img-box default">
								
							</div>
						</div>
						<div v-else>
							<h6>{{item.dat.brandname}}</h6>
							<p>{{item.dat.carname}}</p>
							<div class="img-box">
								<a href="javascript:;" @click="delCarFun(item)"  class="lnk-remove"></a>
								<img :src="item.dat.imgurl+'?'+new Date().getTime()" />
							</div>
						</div>
					</li>

				</ul>
			</div>
			<div class="center">
				<a  @click="dbLinkFun" :class="contrastCarArr[0].dat && contrastCarArr[1].dat? 'lnk-duibi':'lnk-duibi disable'" href="javascript:;" data-action="touch">开始对比</a>
			</div>
		</div>
	<!--内容 end-->
    <Selectcar  ref="selectcar"/>
    <!--提示 start-->
    <Alert v-show="waringBox" />
    <!--提示 end-->
</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
import Alert from './component/Alert.vue'
import Selectcar from './component/Selectcar.vue'
import SocketFn from '../config/socketOrder.js'
export default {
	data(){
		return{
			stySetVal:false
		}
	},
	computed:{
		...mapGetters(["contrastCarArr","waringBox","carDat"])
	},
	methods:{
		goBackFun(){
			this.$router.push("/")
			if(this.contrastCarArr[0].dat){
				this.currentVideo(this.contrastCarArr[0].dat.id)
				this.setInitVideoFun(this.contrastCarArr[0].dat.id)
			}
			
		},
		dbLinkFun(){
			if(!this.contrastCarArr[0].dat || !this.contrastCarArr[1].dat){
				console.log("请选择对比车辆")
				return false
			}else{
				this.$router.push("/twocar")
				SocketFn({
					type:"comparecar",
					data:this.contrastCarArr,
					play:true
				})
			}
		},
		delCarFun(obj){
		// var currents = $.grep(this.carDat,function(n,i){ return n.currentClass == true &&  n.id == id });
			this.$refs.selectcar.$emit('removeSwiperCar',obj);
			this.delContrastCarFun(obj.dat.id);
		},
		...mapActions(["delContrastCarFun","currentVideo","setInitVideoFun","deldbFun"])
	},
	mounted(){
		this.deldbFun(false) //删除第二个车
	},
    components:{
        Alert,
        Selectcar
    }
}

</script>
