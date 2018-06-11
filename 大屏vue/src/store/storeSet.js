import axios from 'axios'
import Vue from 'vue'
export default{
    state:{
        carDat:"",                                      //车型数据
        setVideoDat:[
            {
                name:"循环播放所有视频",
                setVal:0
            },
            {
                name:"循环播放当前视频",
                setVal:1
            },
            {
                name:"不循环播放",
                setVal:2
            }
        ],
        playVideoMode:0,                                  //当前播放模式
        currentVideoDat:{},                              //当前播放的视频
        contrastCarArr:[{dat:false},{dat:false}],        //对比数据
        timDotArr:"",                                   //时间点数据
        waringBox:false,                                 //提示框
        initVideoNum:0,                                //初始显示video
        stySetVal:true,
        isLoad:true                                    //是否加载完成
        //对比按钮状态
    },
    mutations:{
        contrastCarFun(state,dat){                   //加入对比
            if(state.contrastCarArr[0].dat && state.contrastCarArr[1].dat){
                console.log("对比超过两辆车")
                state.waringBox=true
                setTimeout(()=>{
                    state.waringBox=false
                },2000)
            }else{
                if(state.contrastCarArr[0].dat.id===dat.id || state.contrastCarArr[1].dat.id===dat.id ){
                    console.log("车辆已经加入对比了")
                }else{
                    if(!state.contrastCarArr[0].dat){
                        state.contrastCarArr[0].dat=dat
                    }else{
                        state.contrastCarArr[1].dat=dat
                    }
                    state.contrastCarArr.forEach((item,index)=>{
                        state.carDat.forEach((item1,index1)=>{
                            if(item.dat.id===item1.id){
                                item.dat.$click.addClass('current');
                            }
                        })
                    })

                    //是否添加2两款车对比
                    state.stySetVal = (state.contrastCarArr[0].dat && state.contrastCarArr[1].dat) == false;
                }
            }

        },
        delContrastCarFun(state,dat){               //删除对比
            state.carDat.forEach((item,index)=>{
                if(dat===item.id){
                    item.$click.removeClass('current');

                }
            })
            state.contrastCarArr.forEach((item,index)=>{
                if(item.dat.id===dat){
                    item.dat=false
                }
            })

            //是否添加2两款车对比
            state.stySetVal = (state.contrastCarArr[0].dat && state.contrastCarArr[1].dat) == false;
        },
        carDatFun(state,dat){                   //获得车型数据
            state.carDat=[...dat]
        },
        timDotFun(state,dat){                   //获得时间点
            state.timDotArr=dat
        },
        currentVideo(state,dat){                //当前播放视频
            for(let i=0;i<state.carDat.length;i++){
                if(dat==state.carDat[i].id){
                    state.currentVideoDat=state.carDat[i]
                    //console.log(dat,"--------")
                    break
                }
            }
            if(!state.currentVideoDat){
                state.currentVideoDat=state.carDat[0]
            }
        },
        changeInitVideoFun(state,dat){
            state.initVideoNum+=dat
        },
        setInitVideoFun(state,dat){
            state.initVideoNum=dat
        },
        setPlayMode(state,dat){                 //设置播放模式
            state.playVideoMode=dat
        },
        isLoadFn(state,dat){
            state.isLoad=dat
        },
        setContrastCarArr(state,dat){       //设置对比数据
            dat.forEach((item,index)=>{
                state.contrastCarArr[index].dat=item.dat
            })
        }

    },
    actions:{
        getCarDat({commit},dat){                //获得车型数据
            commit("carDatFun",dat)
            // axios.get("url").then((dat)=>{
            //     commit("carDatFun",dat)
            // })
        },
        contrastCarFun({commit},dat){            //加入对比
            commit("contrastCarFun",dat)
        },
        delContrastCarFun({commit},dat){
            commit("delContrastCarFun",dat)     //删除对比
        },
        currentVideo({commit},dat){             //当前播放的视频
            commit("currentVideo",dat)
        },
        changeInitVideoFun({commit},dat){
            commit("changeInitVideoFun",dat)
        },
        setInitVideoFun({commit},dat){
            commit("setInitVideoFun",dat)
        },
        setPlayMode({commit},dat){
            commit("setPlayMode",dat)
        },
        isLoadFn({commit},dat){
            commit("isLoadFn",dat)
        },
        setContrastCarArr({commit},dat){
            commit("setContrastCarArr",dat)
        }

    },
    getters:{
        carDat(state){                 //车型数据
            return state.carDat
        },
        timDot(state){                 //时间点
            return state.carDat[0].video.slot
        },
        setVideoDat(state){
            return state.setVideoDat
        },
        contrastCarArr(state){
            return state.contrastCarArr
        },
        waringBox(state){
            return state.waringBox
        },
        currentVideoDat(state){
            return state.currentVideoDat
        },
        initVideoNum(state){
            return state.initVideoNum
        },
        playVideoMode(state){
            return state.playVideoMode
        },
        stySetVal(state){
            return state.stySetVal
        },
        isLoad(state){
            return state.isLoad
        }


    }
}
