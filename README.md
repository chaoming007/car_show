# 双屏显示系统


**项目简介**

1.通过移动端（pad或者手机）等移动设备控制pc端大屏来展示车辆信息，进行车辆对比，和视屏控制播放等操作！
2.自定义视频播放器，支持拖拽时间点，拖动显示视频图片简介等，也支持全屏，音量控制等如需要这些功能可以在基础上扩展！

#### 软件架构

1.pc和移动端都采用vue+vue-router+vuex+swiper架构模式，由于是演示系统所以暂时采用了本地文件数据，如想采用线上地址可以直接采用axios或者fetch直接请求线上数据。

2.服务端采用node.js和express搭建服务器，websocket进行控制指令传输，由于只作为一个中间转发的服务所以只做了一个简单的转发服务器。如需要更复杂的功能可以扩展完善！

3.目前服务都采用的本机ip地址如果想用线上服务器，请修改socket的服务器ip地址为线上服务器ip地址
修改目录为：static/assets/js/socket.js






#### 安装教程


1. cd node > npm install
2. cd vue > npm install
3. cd pc_vue > npm install


#### 使用说明

1. cd node > node index.js
2. cd vue > npm run dev
3. cd pc_vue > npm run dev





**系统还在完善中，希望大家多提意见，谢谢！**

