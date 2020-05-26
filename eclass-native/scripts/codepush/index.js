const fs = require('fs')
const path = require('path')

const newIndexJS = path.join(__dirname, './repalceIndex.js')
const originalIndexJS = path.join(__dirname, '../../rn_temp/index.js')
if (fs.statSync(newIndexJS).isFile() && fs.statSync(originalIndexJS).isFile()) {
  fs.writeFileSync(originalIndexJS, fs.readFileSync(newIndexJS))
}