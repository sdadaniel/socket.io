const app = require("./app.js");

if(!process.env.PORT){
    process.env.PORT = 8000
}

app.listen(process.env.PORT, (() => {
    console.log(`${process.env.PORT}대기중`)
}))