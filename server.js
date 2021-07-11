const app = require("./app.js");
const socketIO = require("./socket")

if (!process.env.PORT) {
  process.env.PORT = 8000
}

const server = app.listen(process.env.PORT, (() => {
  console.log(`${process.env.PORT}대기중`)
}))

socketIO(server,app)