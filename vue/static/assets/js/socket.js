(function(url){
    window.socket = io.connect(url)
    socket.emit("setName","PC")
})("192.168.199.229:3000")