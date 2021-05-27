
const session = require("express-session");

exports.session = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET
})