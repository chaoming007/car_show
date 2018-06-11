(function(url){
    window.socket = io.connect(url)
})("0.0.0.0:3000")