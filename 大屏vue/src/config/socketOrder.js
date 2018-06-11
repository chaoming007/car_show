export default (fn)=>{
    socket.on('videoControl',(data) => {  
        fn(data)
    }) 
}