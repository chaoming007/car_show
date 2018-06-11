(function(url){
    window.socket = io.connect(url)
    socket.emit("setName","PC")
})("0.0.0.0:3000")