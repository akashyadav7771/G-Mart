// import { io } from "../server.js";


// io.on("connection",(socket)=>{
//     console.log("User Connected",socket.id);

//     socket.on("joinRoom",(roomId)=>{
//         socket.join(roomId)
//          console.log(`Joined Room: ${roomId}`);
//     });

//     // socket.on("sendMessage",(data)=>{
//     //     io.to(data.roomId).emit("receiveMessage",data)
//     // });

//     socket.on("disconnect",()=>{
//         console.log("Disconnected");
        
//     })
    
// })