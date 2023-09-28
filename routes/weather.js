// this is example api

const express = require('express');
const log = require("streamlogs").defLog
const router = express.Router()

router.get("/", (req, res) => {
  res.send("This is weather api!")
})

module.exports = router;