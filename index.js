const express = require('express')
const path = require('path');
const fs = require("fs")
require("dotenv").config()
const log = require("streamlogs").defLog
const app = express()
app.disable('x-powered-by');

if(process.env.ForceHTTPS == 1) {
  app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "upgrade-insecure-requests;")
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
    if(req.protocol == "https") {
      next()
    } else {
      return res.redirect("https://" + req.headers.host + req.url)
    }
  })
}
app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "origin-when-cross-origin")
  res.setHeader("X-Frame-Options", "SAMEORIGIN")
  res.setHeader("X-Content-Type-Options", "nosniff")
  res.setHeader("X-XSS-Protection", "1;")
  next()
})


// API routing
fs.readdirSync("./routes").forEach((route) => {
  app.use("/api/" + route.replace(".js", ""), require("./routes/" + route))
})

// static files
app.use(express.static(path.join(__dirname, "/public")))

app.get("*", (req, res) => {
  if(fs.existsSync(path.join(__dirname, "/public/404.html"))) {
    res.status(404)
    res.sendFile(path.join(__dirname, "/public/404.html"))
  } else {
    res.sendStatus(404)
  }
})
console.log(process.env.PORT, process.env.ForceHTTPS)
app.listen(process.env.PORT ? process.env.PORT : 80, () => {
  log.info("App listen on port " + (process.env.PORT ? process.env.PORT : 80) + "!", "web-main")
})