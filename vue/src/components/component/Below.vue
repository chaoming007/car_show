<template>
    <!--快进提示框 start-->
		<div class="model-below">
			<div class="img-content">
				<img :src="src">
				<span>{{ title }}</span>
			</div>
		</div>
    <!--快进提示框 end-->
</template>
<script>
export default{
    data(){
			return {
				 title:"",
				 src:""
			}
		},
		mounted(){
			var _this = this;
			_this.$on('setBelow',function(params){
					_this.title = params.coord.title;
					//拼接图片
					_this.src = params.video.url + "?second="+params.currenttime+"&width=240";
						//console.log(_this.src);
			})
		}
}

</script>