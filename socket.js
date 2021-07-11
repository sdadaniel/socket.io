const SocketIO = require("socket.io")

module.exports = (server, app) => {
  const io = SocketIO(server)

  const room = io.of("/room")
  const chat = io.of("/chat")

  const roomList = []

  room.on("connection", (socket) => {
    console.log("ROOM - connection")

    socket.emit("init",roomList )

    socket.on("createRoom", (data) => {
      var obj = {
        name: data,
        id: (new Date()).getTime()
      }
      roomList.push(obj)
    })

    socket.on("deleteRoom",(data)=>{
      const index = roomList.findIndex((elem)=>elem.name == data)
      roomList.splice(index,1)
    })

    socket.on("joinRoom",(data)=>{
      socket.join(data)
      room.to(data).emit("msg","입장했습니다.")
    })

    socket.on("msg",(data)=>{
      const roomName = data.roomName
      const msg = data.msg;
      console.log(roomName)
      room.to(roomName).emit("msg",msg)
    })

    socket.on("leaveRoom",(data)=>{
      console.log(socket.adapter.rooms)
      socket.leave(data)
      console.log(socket.adapter.rooms)
    })



  })
}