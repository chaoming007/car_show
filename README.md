# 双屏显示系统


**项目简介**

通过移动端（pad或者手机）等移动设备控制pc端大屏来展示车辆信息，进行车辆对比，和视屏控制播放等操作！

#### 软件架构

1.pc和移动端都采用vue+vue-router+vuex+swiper架构模式，由于是演示系统所以暂时采用了本地文件数据，如想采用线上地址可以直接采用axios或者fetch直接请求线上数据。

2.服务端采用node.js和express搭建服务器，websocket进行控制指令传输，由于只作为一个中间转发的服务所以只做了一个简单的转发服务器。如需要更复杂的功能可以扩展完善！


#### 安装教程


1. cd node > npm install
2. cd vue > npm install
3. cd pc_vue > npm install


#### 使用说明

1. cd node > node index.js
2. cd vue > npm run dev
3. cd pc_vue > npm run dev





**系统还在完善中，希望大家多提意见，谢谢！**

