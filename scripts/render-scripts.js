"use strict"
const fs = require("fs")
const packageJSON = require("../package.json")
const path = require("path")
const sh = require("shelljs")

module.exports = function renderScript(filePath) {
  const destPath = filePath.replace(/src/, "dist")
  const copyright = `/*!
    * Yannick Lang - Personal Website
    * Copyright ${
      new Date().getFullYear() === 2020
        ? "2020"
        : "2020-" + new Date().getFullYear()
    } ${packageJSON.author}
    * Licensed under ${packageJSON.license}
    */
    `
  const destPathDirname = path.dirname(destPath)
  if (!sh.test("-e", destPathDirname)) {
    sh.mkdir("-p", destPathDirname)
  }
  const scriptsJS = fs.readFileSync(filePath)
  fs.writeFileSync(destPath, copyright + scriptsJS)
}
