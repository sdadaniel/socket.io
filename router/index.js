const express = require("express")
const router = express.Router()

router.use((req, res, next) => {
  req.session.ID = Math.random().toString(36).substr(2,10)
  next()
})

router.get("/", (req, res) => {
  res.render("index.html")
})


module.exports = router;