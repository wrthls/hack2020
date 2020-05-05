const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const glob = require("glob")

// module.exports = {
//   externals: { 'sqlite3':'commonjs sqlite3'},
//
// }
// module.exports = function(source) {
//   return source.replace(/^#! .*\n/, "");
// };