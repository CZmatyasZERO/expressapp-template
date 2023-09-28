const express = require('express')
const path = require('path');
const fs = require("fs")
const config = require("./config.json")
const log = require("streamlogs").defLog
const app = express()
app.disable('x-powered-by');

if(config.forceHttps) {
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



fs.readdirSync("./routes").forEach((route) => {
  app.use("/api/" + route.replace(".js", ""), require("./routes/" + route))
})

app.get("/*", (req, res) => {
  file = path.resolve(path.join("./public/", req.url))
  if(file.startsWith(path.resolve("./public"))) {
    if(fs.existsSync(file)) {
      if(fs.statSync(file).isFile()) {
        res.sendFile(file)
        return
      } else {
        if(fs.existsSync(path.resolve(path.join(file, "/index.html")))) {
          file = path.resolve(path.join(file, "/index.html"))
          res.sendFile(file)
          return
        }
      }
    }
  }
  if(fs.existsSync("./public/404.html")) {
    res.status(404)
    res.sendFile(path.resolve("./public/404.html"))
  }
})

app.listen(80, () => {
  log.info("App listen on port 80!", "web-main")
})


process.on("unhandledRejection", (reason, p) => {
  log.error("Internal error: " + reason + " " + p, "anticrash")
})
process.on("uncaughtException", (err, origin) => {
  log.error("Internal error: " + err + " " + origin, "anticrash")
})