'use strict'
const fs = require('fs-extra')
const path = require('path')

var pkg = fs.readJsonSync(path.join(__dirname, '../package.json'))

delete pkg.scripts
delete pkg.devDependencies
delete pkg.browserify

console.log(JSON.stringify(pkg, null, 2))
