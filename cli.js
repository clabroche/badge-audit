#!/usr/bin/env node
const {launch} = require('./index.js')
const {version} = require('./package.json')
const program = require('commander');

program
  .version(version)
  .parse(process.argv);

;(async _ => {
    const nb = await launch()
    console.log(nb)
})()