<template>

<div class="menu">
    <ul>
        <li v-for="(item,index) in setVideoDat" :key="index">
            <a href="javascript:;" @click="setModeFun(item)" :class="item.setVal===playVideoMode?'current':''">{{item.name}}</a>
        </li>
       
    </ul>
</div>

</template>
<script>
import SocketFn from '../../config/socketOrder.js'
import {mapGetters,mapActions} from 'vuex'
export default {
    data(){
        return{

        }
    },
    props:["showValFun"],
    methods:{
        setModeFun(item){
            this.setPlayMode(item.setVal)
            this.showValFun()
            SocketFn({
                type:"selectmode",
                videoNum:item.setVal
            })
        },
        ...mapActions(["setPlayMode"])
    },
    computed:{
        ...mapGetters(["setVideoDat","playVideoMode"])
    }
}
</script>

