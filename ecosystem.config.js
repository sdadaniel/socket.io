module.exports = {
  apps: [{
    name: "App",
    script: "./server.js",
    env: {
      PORT: "7000",
      NODE_ENV: "development",
    },
    env_production: {
      PORT: "80",
      NODE_ENV: "production",
    },
    error_file: './log/err.log',
    out_file: './log/out.log',
    log_file: './log/combined.log',
    time: true
  }]
}