const app = require("./app.js")

app.set("PORT", 8000)

app.listen(app.get("PORT"), (() => {
    console.log(`${app.get("PORT")}대기중`)
}))