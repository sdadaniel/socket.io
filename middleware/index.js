const session = require("express-session");

exports.session = (req,res,next) => {

    const redis = require("redis")
    require("dotenv").config()

    const RedisStore = require("connect-redis")(session)
    const redisClient = redis.createClient({
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        password : process.env.REDIS_PASSWORD
    })

    const sessionOption = {
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        store: new RedisStore({client: redisClient})
    }
    if(process.env.NODE_ENV === "production"){
        sessionOption.proxy = true;
    }
    session(sessionOption)

    next()
}