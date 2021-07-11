const SocketIO = require("socket.io")

module.exports = (server, app) => {
  const io = SocketIO(server)

  const room = io.of("/room")
  const roomList = []

  room.on("connection", (socket) => {

    socket.emit("init", roomList)
    socket.on("createRoom", (roomName) => {
      var obj = {
        name: roomName,
        id: (new Date()).getTime()
      }
      roomList.push(obj)
      room.emit("createRoom", roomName)
    })


    socket.on("deleteRoom", (roomName) => {
      const index = roomList.findIndex((elem) => elem.name == roomName)
      roomList.splice(index, 1)
      room.emit("deleteRoom", roomName)
    })


    socket.on("joinRoom", (data) => {
      socket.join(data)
      room.to(data).emit("msg", "입장했습니다.")
    })

    socket.on("msg", (data) => {
      const roomName = data.roomName
      const msg = data.msg;
      room.to(roomName).emit("msg", msg)
    })

    socket.on("leaveRoom", (data) => {
      socket.leave(data)
    })



  })
}