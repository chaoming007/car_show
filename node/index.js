var express = require('express');
var app = express();
var http = require('http').Server(app);
//服务器端存在了一个io对象：
var io = require("socket.io")(http);
app.use(express.static("public"));
app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html")
})
//增加中间件
//定义连接对象
let usocket={}
io.on("connection",(socket)=>{
    socket.on('setName',(data)=>{
        usocket[data]=socket.id
    })
    socket.on("PLAY",(msg)=>{              //接收播放指令
        console.log("播放------",msg)
        io.emit('videoControl',msg)
    })
    socket.on("STOP",(msg)=>{              //接收暂停指令
        console.log("暂停------",msg)
        io.emit('videoControl',msg)
    })
    socket.on("PROGRESS",(msg)=>{          //接收滑动进度指令
        console.log("滑动-------",msg)
        io.emit('videoControl',msg)
    })
    socket.on("JUMPTIME",(msg)=>{           //接收点击跳转播放指令
        console.log("跳转时间点----------",msg)
        io.emit('videoControl',msg)
    })
    socket.on("NEXTVIDEO",(msg)=>{          //接收下一个视频指令
        console.log("下一个视频---------",msg)
        io.emit('videoControl',msg)
    })
    socket.on("SELECTVIDEO",(msg)=>{         //接收滑动选择第几个视频指令
        console.log("滑动到第几个视频--------",msg)
        io.emit('videoControl',msg)
    })
    socket.on("COMPARECAR",(msg)=>{           //接收对比指令
        console.log(msg)
        io.emit('videoControl',msg)
    })
    socket.on("TOINDEX",(msg)=>{          //接收回到首页
        console.log(msg)
        io.emit('videoControl',msg)
    })
    socket.on("TOTWOCAR",(msg)=>{         //接收进入对比页指令
        console.log(msg)
        io.emit('videoControl',msg)
    })
    socket.on("SELECTMODE",(msg)=>{          //接收选择模式
        console.log(msg)
        io.emit('videoControl',msg)
    })
    socket.on("KBONOFF",(msg)=>{         //接收是否打开弹层
        console.log(msg)
        io.emit('videoControl',msg)
    })
    socket.on("SYNCTIME",(msg)=>{         //同步时间
        console.log(msg)
        io.emit('videoControl',msg)
    })
    socket.on("SELECTCOMPARECAR",(msg)=>{         //返回选车页面
        console.log(msg)
        io.emit('videoControl',msg)
    })

})


http.listen(3000, function(){
  console.log('监听3000端口');
});