const express = require("express");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const router = require("./router");
const cookieParser = require("cookie-parser")
const path = require("path")
const {session} = require("./middleware");


class App {
    constructor() {
        this.app = express()
        this.middleware()
        this.routing()
        this.errorHandling()
    }

    routing() {
        this.app.use(router)
    }

    middleware() {
        //Init
        this.app.use(express.json())
        this.app.use(express.urlencoded({
            extended: false
        }))
        this.app.use(express.static(path.join(__dirname,"public")))

        //Session
        this.app.use(cookieParser(process.env.COOKIE_SECRET))
        this.app.use(session)


        //Dev
        this.app.use(morgan("dev"))


        //Front
        this.app.set("view engine", "html")
        nunjucks.configure("views", {
            express: this.app
        })
    }

    errorHandling() {
        this.app.use((req, res, next) => {
            var e = new Error("없는페이지")
            e.status = 404;
            next(e)
        })

        this.app.use((err, req, res, next) => {
            res.render("error.html", {
                error: err
            })
        })

    }
}


module.exports = new App().app