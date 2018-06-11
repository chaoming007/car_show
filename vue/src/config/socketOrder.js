export default (val)=>{
        if(val.type==="play"){			//播放
            socket.emit("PLAY",val)
        }
        if(val.type==="stop"){          //暂停
            socket.emit("STOP",val)
        }
        if(val.type==="progress"){      //拖动控制条
            socket.emit("PROGRESS",val)
        }
        if(val.type==="jumptime"){      //点击控制条
            socket.emit("JUMPTIME",val)
        }
        if(val.type==="nextvideo"){      //下一个视频
            socket.emit("NEXTVIDEO",val)
        }
        if(val.type==="selectvideo"){      //滑动选择第几个视频
            socket.emit("SELECTVIDEO",val)
        }
        if(val.type==="comparecar"){        //对比指令
            socket.emit("COMPARECAR",val)
        }
        if(val.type==="toindex"){        //回到首页
            socket.emit("TOINDEX",val)
        }
        if(val.type==="totwocar"){        //进入对毕页
            socket.emit("TOTWOCAR",val)
        }
        if(val.type==="selectmode"){        //选择模式
            socket.emit("SELECTMODE",val)
        }
        if(val.type==="kbonoff"){        //关闭打开口碑弹层
            socket.emit("KBONOFF",val)
        }
        if(val.type==="synctime"){       //同步时间
            socket.emit("SYNCTIME",val)  
        }
        if(val.type==="selectcomparecar"){              //返回选择对比车型页面
            socket.emit("SELECTCOMPARECAR",val) 
        }
}