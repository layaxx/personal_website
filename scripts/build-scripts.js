"use strict"
const path = require("path")
const sh = require("shelljs")
const renderScript = require("./render-scripts")

const srcPath = path.resolve(path.dirname(__filename), "../src")

sh.find(srcPath).forEach(_processFile)

function _processFile(filePath) {
  if (filePath.match(/\.js$/)) {
    renderScript(filePath)
  }
}
