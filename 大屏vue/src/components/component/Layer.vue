<template>
<div>
   <div class="mark"></div>
		<div class="model model-show">
			<div class="model-detail">
				<a href="javascript:;" @click="closeBtnFn" class="lnk-close"></a>
				<div class="title">
					<h6>{{carDatObj.brandname}} {{carDatObj.carname}}</h6>
					<p>{{carDatObj.modelname}}</p>
				</div>
				
				<div class="list">
					<ul>
						<li v-for="(item,index) in carDatObj.koubei.detail" :key="index">
							<span>{{item.title}}</span>
							<p>{{item.desc}}</p>
						</li>
						
					</ul>
				</div>
			</div>
		</div>
</div>
</template>
<script>
export default {
	data(){
		return{

		}
	},
	props:{
		"carDatObj":{
			type:Object
		},
		"closeBtnFn":{
			type:Function
		}
	}


}
</script>

