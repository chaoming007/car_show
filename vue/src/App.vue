<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions,mapGetters} from 'vuex'
import data from './config/data'
export default {
  name: 'App',
  methods:{
    ...mapActions(["getCarDat","currentVideo"])
  },
  computed:{
    ...mapGetters(["initVideoNum"])
  },
  created(){
    this.getCarDat(data)
    this.currentVideo(this.initVideoNum)
  }
}
</script>


